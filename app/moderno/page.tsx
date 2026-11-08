import type { Metadata } from "next";
import { ViewTransition } from "react";

import ModernHome from "@/components/modern/ModernHome";
import { portfolio } from "@/config/portfolio";
import { albums } from "@/data/albums";
import { sortedAlbums } from "@/lib/albums";

// Página de prueba para comparar con la sala; no se indexa.
export const metadata: Metadata = {
  title: `Versión moderna · ${portfolio.fullName}`,
  robots: { index: false },
};

export default function ModernPage() {
  return (
    <ViewTransition
      enter={{ "room-close": "room-return", "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      exit={{ "room-open": "room-dolly", "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      default="none"
    >
      <ModernHome albums={sortedAlbums(albums)} />
    </ViewTransition>
  );
}
