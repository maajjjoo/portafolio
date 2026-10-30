import type { CSSProperties } from "react";

import AlbumContent from "@/components/album/AlbumContent";
import AlbumCover from "@/components/album/AlbumCover";
import AlbumKeyboard from "@/components/album/AlbumKeyboard";
import AlbumNavigation from "@/components/album/AlbumNavigation";
import AlbumNowPlaying from "@/components/album/AlbumNowPlaying";
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

/** Un álbum abierto como libreto: portada y título sobre la pared de la sala, y su contenido en una hoja translúcida. */
export default function AlbumExperience({ album, adjacent }: AlbumExperienceProps) {
  return (
    <article aria-labelledby="album-titulo" className="album-booklet relative">
      <div aria-hidden="true" className="album-wall" />

      <div className="mx-auto max-w-[76rem] px-5 pt-6 sm:px-8">
        <div data-album-fade className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <BackToLibrary />
          <p className="text-sm text-muted">
            Disco {adjacent.position} de {adjacent.total} · {album.catalog} · Lado {album.side}
          </p>
        </div>

        <div className="grid items-center gap-10 py-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:py-16">
          <AlbumCover album={album} />

          <div data-album-fade className="max-w-[38rem]">
            <h1 id="album-titulo" tabIndex={-1} className="font-display text-5xl leading-[1.02] focus:outline-none sm:text-6xl lg:text-7xl">
              <SplitText text={album.title} delay={350} step={40} />
            </h1>
            <p className="fade-up mt-3 text-lg font-medium text-accent" style={delay(600)}>
              {album.section === album.category ? album.section : `${album.section} · ${album.category}`}
            </p>
            <p className="fade-up mt-5 text-lg leading-relaxed text-muted" style={delay(700)}>
              {album.description}
            </p>
            <div className="fade-up" style={delay(850)}>
              <AlbumTracklist album={album} />
            </div>
          </div>
        </div>
      </div>

      <div data-album-fade className="mx-auto max-w-[76rem] px-3 sm:px-8">
        <div className="album-sheet">
          <AlbumContent slug={album.slug} />
        </div>
        <AlbumNowPlaying album={album} />
      </div>

      <AlbumNavigation adjacent={adjacent} />

      <AlbumKeyboard
        slug={album.slug}
        previousHref={adjacent.previous ? albumHref(adjacent.previous.slug) : null}
        nextHref={adjacent.next ? albumHref(adjacent.next.slug) : null}
      />
    </article>
  );
}
