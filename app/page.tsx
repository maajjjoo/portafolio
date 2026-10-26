import { ViewTransition } from "react";

import LibraryWelcome from "@/components/library/LibraryWelcome";
import VinylLibrary from "@/components/library/VinylLibrary";
import Marquee from "@/components/sections/Marquee";
import { albums } from "@/data/albums";
import { sortedAlbums } from "@/lib/albums";

export default function LibraryPage() {
  return (
    <ViewTransition
      enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      default="none"
    >
      <div className="scroll-mt-[4.5rem]">
        <LibraryWelcome />
        <section aria-labelledby="estante-titulo" className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
          <h2 id="estante-titulo" className="sr-only">
            Estante de discos
          </h2>
          <VinylLibrary albums={sortedAlbums(albums)} />
        </section>
        <Marquee />
      </div>
    </ViewTransition>
  );
}
