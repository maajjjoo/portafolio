import type { CSSProperties } from "react";

import AlbumContent from "@/components/album/AlbumContent";
import AlbumCover from "@/components/album/AlbumCover";
import AlbumKeyboard from "@/components/album/AlbumKeyboard";
import AlbumNavigation from "@/components/album/AlbumNavigation";
import AlbumTracklist from "@/components/album/AlbumTracklist";
import BackToLibrary from "@/components/ui/BackToLibrary";
import SplitText from "@/components/ui/SplitText";
import type { Album } from "@/data/albums";
import { albumHref, type AdjacentAlbums } from "@/lib/albums";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

interface AlbumExperienceProps {
  album: Album;
  adjacent: AdjacentAlbums;
}

/** Vista de un álbum abierto: portada y disco, ficha, contenido de la sección y discos vecinos. */
export default function AlbumExperience({ album, adjacent }: AlbumExperienceProps) {
  return (
    <article aria-labelledby="album-titulo">
      <div className="mx-auto max-w-7xl px-5 pt-6 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
          <BackToLibrary />
          <p className="label text-muted">
            Disco {adjacent.position} de {adjacent.total} · {album.catalog} · Lado {album.side}
          </p>
        </div>

        <div className="grid items-center gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16 lg:py-16">
          <AlbumCover album={album} />

          <div>
            <p className="fade-up label text-accent" style={delay(300)}>
              {album.category} · Sección: {album.section}
            </p>
            <h1
              id="album-titulo"
              tabIndex={-1}
              className="mt-4 font-display text-6xl leading-[0.9] focus:outline-none sm:text-7xl lg:text-8xl"
            >
              <SplitText text={album.title} delay={350} step={40} />
            </h1>
            <p className="fade-up mt-6 max-w-xl text-lg leading-relaxed text-muted" style={delay(700)}>
              {album.description}
            </p>
            <div className="fade-up" style={delay(850)}>
              <AlbumTracklist album={album} />
            </div>
            <p className="label mt-6 hidden text-[0.62rem] text-muted lg:block">
              Atajos: ← disco anterior · → disco siguiente · Esc volver a la biblioteca
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-line bg-surface/40">
        <AlbumContent slug={album.slug} />
      </div>

      <div className="pt-10">
        <AlbumNavigation adjacent={adjacent} />
      </div>

      <AlbumKeyboard
        slug={album.slug}
        previousHref={adjacent.previous ? albumHref(adjacent.previous.slug) : null}
        nextHref={adjacent.next ? albumHref(adjacent.next.slug) : null}
      />
    </article>
  );
}
