"use client";

import { useEffect } from "react";

/** Activa una paleta de demo (<html data-look>) mientras esta página está abierta. */
export default function LookSetter({ look }: { look: string }) {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.look = look;
    return () => {
      delete root.dataset.look;
    };
  }, [look]);

  return null;
}
