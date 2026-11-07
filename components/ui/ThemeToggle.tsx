"use client";

import { useSyncExternalStore } from "react";

import { MoonIcon, SunIcon } from "@/components/ui/Icons";
import { readTheme, subscribeTheme, switchTheme, type Theme } from "@/lib/theme";

export default function ThemeToggle() {
  // En el servidor no se conoce el tema: se renderiza un estado neutro.
  const theme = useSyncExternalStore<Theme | null>(subscribeTheme, readTheme, () => null);
  const next: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={(event) => switchTheme(next, event.currentTarget)}
      aria-label={theme === null ? "Cambiar tema" : `Activar modo ${next === "dark" ? "oscuro" : "claro"}`}
      className="group grid size-11 place-items-center rounded-full text-ink transition-colors hover:bg-ink/10 hover:text-accent"
    >
      <span className="transition-transform duration-500 group-hover:rotate-45">
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </span>
    </button>
  );
}
