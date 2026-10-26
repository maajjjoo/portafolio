import type { Album } from "@/data/albums";

/** Lista de canciones del álbum: un índice decorativo de lo que contiene. */
export default function AlbumTracklist({ album }: { album: Album }) {
  return (
    <div className="mt-8">
      <h2 className="label mb-3 text-muted">Lista de canciones</h2>
      <ol className="border-t border-line">
        {album.tracks.map((track, i) => (
          <li key={track} className="flex items-baseline gap-4 border-b border-line py-2.5">
            <span className="label w-8 text-accent">
              {album.side}
              {i + 1}
            </span>
            <span className="flex-1">{track}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
