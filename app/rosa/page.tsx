import type { Metadata } from "next";
import { ViewTransition } from "react";

import LookSetter from "@/components/room/LookSetter";
import RoomCollection from "@/components/room/RoomCollection";
import { RoomBackdrop, RoomFurniture } from "@/components/room/RoomDecor";
import { portfolio } from "@/config/portfolio";
import { albums, type Album, type AlbumCover, type AlbumSlug } from "@/data/albums";
import { sortedAlbums } from "@/lib/albums";

// Demo para comparar con la sala de siempre; no se indexa.
export const metadata: Metadata = {
  title: `Sala rosa · ${portfolio.fullName}`,
  robots: { index: false },
};

// Las portadas con tintas rosas: frambuesa, ciruela, malva y rubor, con un verde salvia de contraste.
const plum = "#3a1f2d";
const blush = "#fbeff2";
const rosaColors: Record<AlbumSlug, Pick<AlbumCover, "background" | "foreground" | "accent">> = {
  bienvenida: { background: "#8c2f55", foreground: "#fde8ef", accent: "#f6b7cb" },
  "sobre-mi": { background: blush, foreground: plum, accent: "#e86a92" },
  proyectos: { background: plum, foreground: "#fde8ef", accent: "#f48fb1" },
  testimonios: { background: "#f6d5dd", foreground: "#8c2f55", accent: "#7d9a84" },
  experiencia: { background: "#b98aa0", foreground: "#fff4f7", accent: "#5e2340" },
  contacto: { background: "#e86a92", foreground: "#fbd3df", accent: "#fff4f7" },
  habilidades: { background: "#2a1520", foreground: "#f6b7cb", accent: "#c0507c" },
  creditos: { background: blush, foreground: plum, accent: "#e86a92" },
};

const repaint = (album: Album): Album => ({ ...album, cover: { ...album.cover, ...rosaColors[album.slug] } });

export default function RosaRoomPage() {
  return (
    <ViewTransition
      enter={{ "room-close": "room-return", "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      exit={{ "room-open": "room-dolly", "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      default="none"
    >
      <LookSetter look="rosa" />
      <section aria-label="Sala de escucha" className="room">
        <RoomBackdrop />
        <div className="room-scene">
          <RoomFurniture />
          <RoomCollection albums={sortedAlbums(albums).map(repaint)} />
        </div>
      </section>
    </ViewTransition>
  );
}
