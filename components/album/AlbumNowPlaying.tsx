"use client";

import { useEffect, useRef, useState } from "react";

import { ArrowRightIcon } from "@/components/ui/Icons";
import type { Album, AlbumTrack } from "@/data/albums";
import { pickActiveTrack } from "@/lib/tracks";

/** Altura de la línea de lectura en la ventana (ver lib/tracks.ts). */
const READING_LINE = 0.45;
const HEADER_HEIGHT = 72;
/** Respaldo para navegadores sin `scrollend`. */
const JUMP_LOCK_MS = 1500;

/**
 * Barra «sonando» que acompaña al contenido cuando la lista de canciones ya no se ve:
 * muestra la pista actual y lleva a la anterior o la siguiente. Son enlaces normales,
 * así que el contenido sigue siendo accesible sin esta barra.
 */
export default function AlbumNowPlaying({ album }: { album: Album }) {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const jumping = useRef(false);
  const attentionX = useRef<number | null>(null);

  const { tracks, slug } = album;

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const list = document.getElementById(`pistas-${slug}`);
      if (list) setVisible(list.getBoundingClientRect().bottom < HEADER_HEIGHT);
      if (jumping.current) return;

      const targets = tracks.map((track) => {
        const rect = document.getElementById(track.anchor)?.getBoundingClientRect();
        return rect && rect.width > 0 ? { top: rect.top, left: rect.left, right: rect.right } : null;
      });
      setActive(pickActiveTrack(targets, window.innerHeight * READING_LINE, attentionX.current));
    };

    const aimAt = (element: Element | null) => {
      if (!element) return;
      const rect = element.getBoundingClientRect();
      attentionX.current = rect.left + rect.width / 2;
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    const release = () => {
      jumping.current = false;
    };

    // Al elegir una pista (en la lista o en la barra) manda la elección,
    // no lo que pase por la línea de lectura durante el recorrido.
    let lock = 0;
    const choose = (hash: string | null | undefined) => {
      const index = tracks.findIndex((track) => `#${track.anchor}` === hash);
      if (index === -1) return;
      aimAt(document.getElementById(tracks[index].anchor));
      jumping.current = true;
      setActive(index);
      window.clearTimeout(lock);
      lock = window.setTimeout(release, JUMP_LOCK_MS);
    };
    const onClick = (event: MouseEvent) => {
      choose((event.target as Element).closest?.('a[href^="#"]')?.getAttribute("href"));
    };
    // Atrás y Adelante del navegador.
    const onHashChange = () => choose(window.location.hash);

    // Dónde mira el visitante. No cuentan la cabecera ni la barra, que flotan sobre las columnas.
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch" || (event.target as Element).closest?.("header, nav")) return;
      attentionX.current = event.clientX;
    };
    const onFocusIn = (event: FocusEvent) => {
      const control = (event.target as Element).closest?.("a, button, input, textarea, select");
      if (control && !control.closest("header, nav")) aimAt(control);
    };

    aimAt(window.location.hash ? document.querySelector(`[id="${CSS.escape(window.location.hash.slice(1))}"]`) : null);
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("scrollend", release);
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("click", onClick);
    document.addEventListener("focusin", onFocusIn);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.clearTimeout(lock);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("scrollend", release);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("click", onClick);
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [slug, tracks]);

  const current = tracks[active];

  return (
    <div className="sticky bottom-0 z-40 h-0">
      <nav
        aria-label="Partes de este álbum"
        className={`glass absolute inset-x-0 bottom-4 mx-auto flex w-[min(calc(100%-1rem),24rem)] items-center gap-3 rounded-full py-1 pr-1 pl-2 shadow-card transition-[opacity,transform,visibility] duration-500 ease-[cubic-bezier(0.2,0.75,0.15,1)] ${
          visible ? "visible translate-y-0 opacity-100" : "invisible translate-y-6 opacity-0"
        }`}
      >
        <span aria-hidden="true" className={`vinyl size-9 shrink-0 ${visible ? "vinyl-spin" : ""}`}>
          <span className="absolute inset-[30%] rounded-full" style={{ backgroundColor: album.cover.accent }} />
        </span>

        <p className="flex min-w-0 flex-1 items-baseline gap-2.5">
          <span className="shrink-0 text-sm text-muted">
            <span className="sr-only">Parte actual: </span>
            {active + 1}/{tracks.length}
          </span>
          <span className="truncate font-medium">{current.title}</span>
        </p>

        <TrackStep track={tracks[active - 1]} direction="previous" />
        <TrackStep track={tracks[active + 1]} direction="next" />
      </nav>
    </div>
  );
}

interface TrackStepProps {
  track: AlbumTrack | undefined;
  direction: "previous" | "next";
}

function TrackStep({ track, direction }: TrackStepProps) {
  const icon = <ArrowRightIcon width={16} height={16} aria-hidden="true" className={direction === "previous" ? "rotate-180" : ""} />;

  if (!track) {
    return (
      <span aria-hidden="true" className="grid size-11 shrink-0 place-items-center rounded-full opacity-35">
        {icon}
      </span>
    );
  }

  return (
    <a
      href={`#${track.anchor}`}
      className="grid size-11 shrink-0 place-items-center rounded-full transition-colors hover:bg-ink hover:text-bg"
    >
      {icon}
      <span className="sr-only">
        {direction === "previous" ? "Parte anterior" : "Parte siguiente"}: {track.title}
      </span>
    </a>
  );
}
