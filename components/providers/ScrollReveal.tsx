"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Añade `is-visible` a cada elemento con `data-reveal` cuando entra en pantalla.
 * Se vuelve a ejecutar en cada cambio de ruta, porque cada álbum trae elementos nuevos.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
