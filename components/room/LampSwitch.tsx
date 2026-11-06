"use client";

import { useSyncExternalStore } from "react";

import { readTheme, subscribeTheme, switchTheme, type Theme } from "@/lib/theme";

/**
 * Lámpara de mesa que también es el interruptor de la sala: encendida es de noche,
 * apagada entra la luz del día. Pantalla de metal lacado, vástago y base de latón.
 */
export default function LampSwitch() {
  const theme = useSyncExternalStore<Theme | null>(subscribeTheme, readTheme, () => null);
  const label =
    theme === null
      ? "Cambiar la luz de la sala"
      : theme === "dark"
        ? "Apagar la lámpara (modo claro)"
        : "Encender la lámpara (modo oscuro)";

  return (
    <button
      type="button"
      className="room-lamp"
      // Fuera del orden de tabulación: con teclado, el mismo cambio está en el botón de la cabecera,
      // justo antes de los discos, y así el recorrido por la sala no cambia.
      tabIndex={-1}
      aria-label={label}
      title={label}
      onClick={(event) => switchTheme(theme === "dark" ? "light" : "dark", event.currentTarget)}
    >
      <svg viewBox="0 0 76 78" aria-hidden="true">
        <defs>
          <radialGradient id="lamp-shade" cx="0.68" cy="0.2" r="0.85">
            <stop offset="0" stopColor="#5b5346" />
            <stop offset="0.35" stopColor="#262219" />
            <stop offset="1" stopColor="#0d0b09" />
          </radialGradient>
          <linearGradient id="lamp-brass" x1="0" x2="1">
            <stop offset="0" stopColor="#3b2a12" />
            <stop offset="0.6" stopColor="#c79a55" />
            <stop offset="1" stopColor="#6b4c20" />
          </linearGradient>
          <radialGradient id="lamp-light">
            <stop offset="0" stopColor="#ffd38f" stopOpacity="0.42" />
            <stop offset="0.55" stopColor="#ffd38f" stopOpacity="0.12" />
            <stop offset="1" stopColor="#ffd38f" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse className="lamp-glow" cx="38" cy="50" rx="50" ry="30" fill="url(#lamp-light)" />
        <rect x="35.5" y="30" width="5" height="42" fill="url(#lamp-brass)" />
        <ellipse cx="38" cy="73" rx="17" ry="4" fill="#1a1208" />
        <ellipse cx="38" cy="71.5" rx="17" ry="4" fill="url(#lamp-brass)" />
        <path d="M4 34C4 12 20 3 38 3S72 12 72 34Z" fill="url(#lamp-shade)" />
        <ellipse className="lamp-rim" cx="38" cy="34" rx="34" ry="3.6" fill="#ffd79a" />
        <ellipse className="lamp-bulb" cx="38" cy="34" rx="12" ry="2.2" fill="#fff4dc" />
        <circle cx="38" cy="2.5" r="2.5" fill="url(#lamp-brass)" />
      </svg>
    </button>
  );
}
