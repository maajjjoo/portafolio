import Link from "next/link";

import VinylDisc from "@/components/library/VinylDisc";
import { albums } from "@/data/albums";
import { albumHref, sortedAlbums } from "@/lib/albums";

/** Página para rutas y discos que no existen en la colección. */
export default function NotFound() {
  return (
    <section aria-labelledby="no-encontrado-titulo" className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 md:grid-cols-[minmax(0,16rem)_1fr]">
      <div className="mx-auto w-48 opacity-70 grayscale md:w-full">
        <VinylDisc album={albums[albums.length - 1]} />
      </div>
      <div>
        <p className="label text-accent">Error 404 · Disco no encontrado</p>
        <h1 id="no-encontrado-titulo" className="mt-4 font-display text-5xl leading-tight sm:text-6xl">
          Este disco no está en la colección
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted">
          Puede que el enlace esté mal escrito o que el álbum ya no exista. Estos son los discos disponibles:
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {sortedAlbums(albums).map((album) => (
            <li key={album.slug}>
              <Link href={albumHref(album.slug)} className="label inline-flex min-h-11 items-center rounded-full border border-line px-4 transition-colors hover:border-ink">
                {album.section}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/"
          className="label mt-8 inline-flex min-h-12 items-center rounded-full bg-wine px-6 text-on-wine transition-transform hover:-translate-y-0.5"
        >
          Volver a la sala
        </Link>
      </div>
    </section>
  );
}
