import Link from "next/link";

import CoverArt from "@/components/library/CoverArt";
import { ArrowRightIcon } from "@/components/ui/Icons";
import type { Album } from "@/data/albums";
import { albumHref, type AdjacentAlbums } from "@/lib/albums";

/** Disco anterior y siguiente al final de cada álbum. */
export default function AlbumNavigation({ adjacent }: { adjacent: AdjacentAlbums }) {
  return (
    <nav aria-label="Discos anterior y siguiente" className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
      <div className="grid gap-4 border-t border-line pt-10 sm:grid-cols-2">
        {adjacent.previous ? <NeighborLink album={adjacent.previous} direction="previous" /> : <EdgeLink label="Inicio de la colección" />}
        {adjacent.next ? <NeighborLink album={adjacent.next} direction="next" /> : <EdgeLink label="Fin de la colección" alignEnd />}
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
      className={`group flex items-center gap-4 border border-line p-4 transition-colors hover:border-ink hover:bg-surface ${
        isNext ? "sm:flex-row-reverse sm:text-right" : ""
      }`}
    >
      <span className="size-16 shrink-0 overflow-hidden rounded-[2px] shadow-card transition-transform duration-500 group-hover:-rotate-3">
        <CoverArt album={album} />
      </span>
      <span className="min-w-0 flex-1">
        <span className={`label flex items-center gap-2 text-muted ${isNext ? "sm:justify-end" : ""}`}>
          {isNext ? null : <ArrowRightIcon width={14} height={14} className="rotate-180" />}
          {isNext ? "Siguiente disco" : "Disco anterior"}
          {isNext ? <ArrowRightIcon width={14} height={14} /> : null}
        </span>
        <span className="mt-1 block font-display text-2xl leading-tight">{album.title}</span>
        <span className="block text-sm text-muted">{album.section}</span>
      </span>
    </Link>
  );
}

function EdgeLink({ label, alignEnd = false }: { label: string; alignEnd?: boolean }) {
  return (
    <Link
      href="/"
      transitionTypes={["nav-back"]}
      className={`flex flex-col justify-center border border-dashed border-line p-4 text-muted transition-colors hover:border-ink hover:text-ink ${
        alignEnd ? "sm:items-end sm:text-right" : ""
      }`}
    >
      <span className="label">{label}</span>
      <span className="mt-1 font-display text-2xl text-ink">Volver al estante</span>
    </Link>
  );
}
