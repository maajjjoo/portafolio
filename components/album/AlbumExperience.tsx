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
        <div data-album-fade>
          <BackToLibrary />
        </div>

        <div className="grid items-center gap-10 py-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:py-16">
          <AlbumCover album={album} />

          <div data-album-fade className="max-w-[38rem]">
            <h1 id="album-titulo" tabIndex={-1} className="title-album focus:outline-none">
              <SplitText text={album.section} delay={350} step={40} />
            </h1>
            <div className="fade-up" style={delay(600)}>
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
