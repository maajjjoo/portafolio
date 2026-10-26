"use client";

import { useMemo, useState } from "react";

import LibraryControls from "@/components/library/LibraryControls";
import RecordCard from "@/components/library/RecordCard";
import type { Album, AlbumCategory } from "@/data/albums";
import { filterAlbums } from "@/lib/albums";
import { useExplored } from "@/lib/useExplored";

export default function VinylLibrary({ albums }: { albums: Album[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<AlbumCategory | null>(null);
  const explored = useExplored();

  const categories = useMemo(() => [...new Set(albums.map((album) => album.category))], [albums]);
  const visible = useMemo(() => filterAlbums(albums, query, category), [albums, query, category]);

  return (
    <div>
      <LibraryControls
        query={query}
        onQueryChange={setQuery}
        categories={categories}
        category={category}
        onCategoryChange={setCategory}
        resultCount={visible.length}
        total={albums.length}
      />

      {visible.length > 0 ? (
        <ul className="grid grid-cols-2 gap-x-8 gap-y-14 sm:gap-x-10 md:grid-cols-3 lg:grid-cols-4">
          {visible.map((album) => (
            <li key={album.slug}>
              <RecordCard album={album} explored={explored.includes(album.slug)} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="border border-dashed border-line px-6 py-14 text-center">
          <p className="font-display text-3xl">No hay discos que coincidan</p>
          <p className="mt-2 text-muted">Prueba con otra palabra o muestra toda la colección.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory(null);
            }}
            className="label mt-6 min-h-11 rounded-full border border-ink px-6 transition-colors hover:bg-ink hover:text-bg"
          >
            Ver todos los discos
          </button>
        </div>
      )}
    </div>
  );
}
