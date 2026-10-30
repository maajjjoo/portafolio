import type { Album } from "@/data/albums";

/** Índice del libreto: una línea breve con enlaces a cada parte del contenido. */
export default function AlbumTracklist({ album }: { album: Album }) {
  return (
    <nav id={`pistas-${album.slug}`} aria-label="En este álbum" className="mt-7">
      <ul className="flex flex-wrap gap-x-5 gap-y-1">
        {album.tracks.map((track) => (
          <li key={track.anchor}>
            <a
              href={`#${track.anchor}`}
              className="inline-flex min-h-11 items-center text-base font-medium underline decoration-line decoration-1 underline-offset-[6px] transition-colors hover:text-accent hover:decoration-accent"
            >
              {track.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
