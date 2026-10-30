"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

import { markOpening } from "@/lib/roomCamera";

const ALBUM_PATH = /^\/album\/([^/]+)$/;
const TRAVEL = { duration: 1000, easing: "cubic-bezier(0.55, 0, 0.15, 1)" };
const REFOCUS = { duration: 950, easing: "cubic-bezier(0.3, 0, 0.1, 1)" };

interface Departure {
  slug: string;
  to: string;
  sleeve: DOMRect;
  disc: DOMRect;
}

const isVisible = (element: HTMLElement) => element.getClientRects().length > 0;

/** La funda y el vinilo de un disco, en la sala o en su álbum abierto (Next conserva otros ocultos). */
function findRecord(path: string, slug: string) {
  const inRoom = path === "/";
  const scope = inRoom ? document.querySelector(`.record[href="/album/${CSS.escape(slug)}"]`) : document;
  const find = (selector: string) => [...(scope?.querySelectorAll<HTMLElement>(selector) ?? [])].find(isVisible);
  const sleeve = find(inRoom ? ".record-sleeve" : ".album-sleeve");
  const disc = find(inRoom ? ".record-disc" : ".album-disc");
  return sleeve && disc ? { sleeve, disc } : null;
}

/** Lleva un elemento desde donde estaba hasta su sitio actual. */
function travelFrom(element: HTMLElement, from: DOMRect) {
  const to = element.getBoundingClientRect();
  if (!to.width || !to.height) return;
  const start = `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${from.width / to.width}, ${from.height / to.height})`;
  element.animate([{ transformOrigin: "0 0", transform: start }, { transformOrigin: "0 0", transform: "none" }], { ...TRAVEL, fill: "backwards" });
}

/** Al volver a la sala: el disco regresa mientras lo demás vuelve a enfocarse. Nada se desplaza. */
function refocusRoom(sleeve: HTMLElement) {
  const slot = sleeve.closest<HTMLElement>(".room-slot");
  const room = sleeve.closest<HTMLElement>(".room");
  if (!slot || !room) return;

  const focus = [{ filter: "brightness(0.3) blur(7px)" }, { filter: "brightness(1) blur(0)" }];
  const others = room.querySelectorAll<HTMLElement>(".room-slats, .room-floor, .room-scene > :not(.room-shelves), .room-slot");
  others.forEach((element) => {
    if (element !== slot) element.animate(focus, REFOCUS);
  });
  room.querySelector(".room-veil")?.animate([{ opacity: 0.7 }, { opacity: 0 }], REFOCUS);

  // De su propio hueco se enfoca todo menos el disco, que viaja nítido y por encima de sus vecinos.
  slot.animate(focus, { ...REFOCUS, pseudoElement: "::before" });
  slot.animate(focus, { ...REFOCUS, pseudoElement: "::after" });
  slot.querySelector(".record-name")?.animate(focus, REFOCUS);
  slot.style.zIndex = "4";
  window.setTimeout(() => {
    slot.style.zIndex = "";
  }, TRAVEL.duration);
}

/** Al avanzar a un álbum: el contenido aparece cuando el disco ya casi ha llegado. */
function revealAlbum(sleeve: HTMLElement) {
  sleeve.closest("article")?.querySelectorAll("[data-album-fade]").forEach((element) => {
    element.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 560, delay: 480, easing: "ease-out", fill: "backwards" });
  });
}

/**
 * La transición de la cámara con Atrás y Adelante del navegador. React restaura esas páginas de
 * inmediato (renderiza en el mismo popstate), así que no admite una View Transition. Aquí no se
 * intercepta nada: se mide el disco antes de que Next navegue y se anima después, desde allí.
 */
export default function HistoryCamera() {
  const pathname = usePathname();
  const current = useRef(pathname);
  const departure = useRef<Departure | null>(null);

  useEffect(() => {
    const onPopState = (event: PopStateEvent & { hasUAVisualTransition?: boolean }) => {
      departure.current = null;
      // El navegador ya anima (gesto de deslizar), o la persona prefiere menos movimiento.
      if (event.hasUAVisualTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const from = current.current;
      const to = window.location.pathname;
      // Solo entre la sala y un álbum: los cambios de hash y de álbum a álbum no llevan cámara.
      const slug = from === "/" ? ALBUM_PATH.exec(to)?.[1] : to === "/" ? ALBUM_PATH.exec(from)?.[1] : undefined;
      if (!slug) return;

      const record = findRecord(from, slug);
      if (!record) return;
      departure.current = { slug, to, sleeve: record.sleeve.getBoundingClientRect(), disc: record.disc.getBoundingClientRect() };
      if (to !== "/") markOpening();
    };

    // En captura: hay que medir antes de que el enrutador cambie la página en este mismo evento.
    window.addEventListener("popstate", onPopState, { capture: true });
    return () => window.removeEventListener("popstate", onPopState, { capture: true });
  }, []);

  useLayoutEffect(() => {
    current.current = pathname;
    const leaving = departure.current;
    departure.current = null;
    if (leaving?.to !== pathname) return;

    const record = findRecord(pathname, leaving.slug);
    if (!record) return;
    travelFrom(record.sleeve, leaving.sleeve);
    travelFrom(record.disc, leaving.disc);
    if (pathname === "/") refocusRoom(record.sleeve);
    else revealAlbum(record.sleeve);
  }, [pathname]);

  return null;
}
