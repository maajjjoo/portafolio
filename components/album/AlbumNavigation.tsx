import Link from "next/link";

import { ArrowRightIcon } from "@/components/ui/Icons";
import type { Album } from "@/data/albums";
import { albumHref, type AdjacentAlbums } from "@/lib/albums";

/** Disco anterior y siguiente al final de cada álbum: discretos, para no competir con el contenido. */
export default function AlbumNavigation({ adjacent }: { adjacent: AdjacentAlbums }) {
  return (
    <nav aria-label="Discos anterior y siguiente" className="mx-auto max-w-[76rem] px-5 pt-10 pb-16 sm:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        {adjacent.previous ? <NeighborLink album={adjacent.previous} direction="previous" /> : <RoomLink />}
        {adjacent.next ? <NeighborLink album={adjacent.next} direction="next" /> : <RoomLink alignEnd />}
      </div>
    </nav>
  );
}

function NeighborLink({ album, direction }: { album: Album; direction: "previous" | "next" }) {
  const isNext = direction === "next";

  return (
    <Link
      href={albumHref(album.slug)}
      transitionTypes={[isNext ? "nav-forward" : "nav-back"]}
      rel={isNext ? "next" : "prev"}
      className={`group inline-flex min-h-11 items-center gap-3 transition-colors hover:text-accent ${isNext ? "sm:flex-row-reverse sm:text-right" : ""}`}
    >
      <ArrowRightIcon width={18} height={18} className={`shrink-0 text-muted transition-transform group-hover:text-accent ${isNext ? "group-hover:translate-x-1" : "rotate-180 group-hover:-translate-x-1"}`} />
      <span>
        <span className="block text-sm text-muted">{isNext ? "Siguiente disco" : "Disco anterior"}</span>
        <span className="block font-display text-xl leading-snug">{album.title}</span>
      </span>
    </Link>
  );
}

function RoomLink({ alignEnd = false }: { alignEnd?: boolean }) {
  return (
    <Link href="/" transitionTypes={["room-close"]} className={`inline-flex min-h-11 flex-col justify-center transition-colors hover:text-accent ${alignEnd ? "sm:items-end sm:text-right" : ""}`}>
      <span className="text-sm text-muted">{alignEnd ? "Fin de la colección" : "Inicio de la colección"}</span>
      <span className="font-display text-xl leading-snug">Volver a la sala</span>
    </Link>
  );
}
