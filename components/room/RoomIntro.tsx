"use client";

import { useEffect, useRef } from "react";

const SEEN_KEY = "intro-vista";
const LEAVE_MS = 1100;

/**
 * Bienvenida de la sala. El script de app/layout.tsx decide antes de pintar si se muestra,
 * así que nunca aparece en enlaces directos, sin JavaScript ni al volver de un álbum.
 */
export default function RoomIntro() {
  const enterRef = useRef<HTMLButtonElement>(null);
  const enter = useRef<() => void>(() => {});

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("intro-pending")) return;

    const covered = [...document.querySelectorAll<HTMLElement>("body > a, body > header, body > footer, .room-lit")];
    covered.forEach((element) => {
      element.inert = true;
    });
    enterRef.current?.focus({ preventScroll: true });

    let timer = 0;
    const leave = () => {
      if (root.classList.contains("intro-leaving")) return;
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        // Sin almacenamiento: la introducción se verá otra vez, sin más.
      }
      covered.forEach((element) => {
        element.inert = false;
      });
      root.classList.add("intro-leaving");
      root.classList.remove("intro-pending");
      document.querySelector<HTMLElement>("#contenido")?.focus({ preventScroll: true });
      timer = window.setTimeout(() => root.classList.remove("intro-leaving"), LEAVE_MS);
    };
    enter.current = leave;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") leave();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="intro-frase" className="room-intro">
      <div>
        <p id="intro-frase" className="room-intro-phrase">
          <span>Cada historia tiene su propia banda sonora.</span>
          <span>Esta es la mía.</span>
        </p>
        <button ref={enterRef} type="button" onClick={() => enter.current()} className="room-intro-enter">
          Entrar a mi colección
        </button>
      </div>
    </div>
  );
}
