import { ArrowRightIcon } from "@/components/ui/Icons";
import type { Album } from "@/data/albums";

/** Lista de canciones del álbum: cada pista lleva a su parte del contenido. */
export default function AlbumTracklist({ album }: { album: Album }) {
  return (
    <div id={`pistas-${album.slug}`} className="mt-8">
      <h2 className="label mb-3 text-muted">Lista de canciones</h2>
      <ol className="border-t border-line">
        {album.tracks.map((track, i) => (
          <li key={track.anchor} className="border-b border-line">
            <a
              href={`#${track.anchor}`}
              className="group flex min-h-11 items-baseline gap-4 py-2.5 transition-colors hover:text-accent"
            >
              <span className="label w-8 shrink-0 text-accent">
                {album.side}
                {i + 1}
              </span>
              <span className="min-w-0 flex-1 transition-transform duration-300 group-hover:translate-x-1">{track.title}</span>
              {track.note ? <span className="label shrink-0 text-muted max-sm:hidden">{track.note}</span> : null}
              <ArrowRightIcon
                width={14}
                height={14}
                aria-hidden="true"
                className="shrink-0 translate-y-0.5 rotate-90 text-muted transition-transform duration-300 group-hover:translate-y-1.5 group-hover:text-accent"
              />
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}
