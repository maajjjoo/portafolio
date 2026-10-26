import { ViewTransition, type CSSProperties } from "react";

import CoverArt from "@/components/library/CoverArt";
import VinylDisc from "@/components/library/VinylDisc";
import type { Album } from "@/data/albums";

/**
 * Portada grande del álbum abierto. Comparte nombre de transición con la funda
 * del estante, así que la funda "vuela" hasta aquí al abrir el álbum.
 * Después, el disco sale hacia la derecha y empieza a girar.
 */
export default function AlbumCover({ album }: { album: Album }) {
  return (
    <div className="relative w-[70%] max-w-[24rem] sm:w-[62%] lg:w-[78%]">
      <div className="disc-out absolute top-[4%] left-[4%] w-[92%]" style={{ "--disc-offset": "36%" } as CSSProperties}>
        <VinylDisc album={album} spinning />
      </div>
      <ViewTransition name={`portada-${album.slug}`} share="morph" default="none">
        <div className="relative aspect-square overflow-hidden rounded-[3px] shadow-card ring-1 ring-black/10">
          <CoverArt album={album} />
        </div>
      </ViewTransition>
    </div>
  );
}
