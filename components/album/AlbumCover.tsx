import type { CSSProperties } from "react";

import CoverArt from "@/components/library/CoverArt";
import VinylDisc from "@/components/library/VinylDisc";
import type { Album } from "@/data/albums";

/**
 * Portada grande del álbum abierto. Sus nombres de transición (app/room.css) la emparejan
 * con el disco elegido en la sala, que viaja hasta aquí; al llegar, el vinilo sale y gira.
 */
export default function AlbumCover({ album }: { album: Album }) {
  return (
    <div className="relative w-[68%] max-w-[22rem] sm:w-[56%] lg:w-[74%]">
      <div className="album-disc absolute top-[4%] left-[4%] w-[92%]">
        <div className="disc-out" style={{ "--disc-offset": "36%" } as CSSProperties}>
          <VinylDisc album={album} spinning />
        </div>
      </div>
      <div className="album-sleeve relative aspect-square overflow-hidden rounded-[2px] shadow-card">
        <CoverArt album={album} place="album" />
      </div>
    </div>
  );
}
