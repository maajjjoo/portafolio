"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { albumHref } from "@/lib/albums";
import { markExplored } from "@/lib/useExplored";

interface AlbumKeyboardProps {
  slug: string;
  previousHref: string | null;
  nextHref: string | null;
}

function isTyping(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
  );
}

/**
 * Comportamiento del álbum abierto:
 * - lo marca como escuchado,
 * - mueve el foco al título (para lectores de pantalla),
 * - ← / → pasan al disco anterior o siguiente, Escape vuelve a la biblioteca.
 */
export default function AlbumKeyboard({ slug, previousHref, nextHref }: AlbumKeyboardProps) {
  const router = useRouter();

  useEffect(() => {
    markExplored(slug);
    // Puede haber títulos de álbumes ocultos (páginas conservadas por Next); se enfoca el visible.
    const titles = document.querySelectorAll<HTMLElement>('[id="album-titulo"]');
    [...titles].find((title) => title.getClientRects().length > 0)?.focus({ preventScroll: true });
  }, [slug]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      // Next conserva ocultas las páginas visitadas; solo responde el álbum visible.
      if (window.location.pathname !== albumHref(slug)) return;
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (isTyping(event.target)) return;
      // Si el panel de álbumes está abierto, Escape solo lo cierra.
      if (document.getElementById("panel-albumes")?.hidden === false) return;

      if (event.key === "Escape") {
        router.push("/", { transitionTypes: ["nav-back"] });
      } else if (event.key === "ArrowLeft" && previousHref) {
        router.push(previousHref, { transitionTypes: ["nav-back"] });
      } else if (event.key === "ArrowRight" && nextHref) {
        router.push(nextHref, { transitionTypes: ["nav-forward"] });
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router, slug, previousHref, nextHref]);

  return null;
}
