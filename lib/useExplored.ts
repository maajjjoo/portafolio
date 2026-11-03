"use client";

import { useSyncExternalStore } from "react";

/**
 * Recuerda en este navegador qué álbumes ya se abrieron, para marcarlos
 * como "Escuchado" en la sala. Si el almacenamiento no está
 * disponible, simplemente no se marca nada.
 */

const STORAGE_KEY = "albumes-escuchados";
const CHANGE_EVENT = "albumes-escuchados-cambio";
const EMPTY = "[]";

function read(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? EMPTY;
  } catch {
    return EMPTY;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

function parse(raw: string): string[] {
  try {
    const value: unknown = JSON.parse(raw);
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function markExplored(slug: string) {
  const current = parse(read());
  if (current.includes(slug)) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...current, slug]));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  } catch {
    // Sin almacenamiento: no pasa nada.
  }
}

/** Lista de slugs explorados. En el servidor siempre está vacía. */
export function useExplored(): string[] {
  const raw = useSyncExternalStore(subscribe, read, () => EMPTY);
  return parse(raw);
}
