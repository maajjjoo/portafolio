"use client";

import type { AlbumCategory } from "@/data/albums";

interface LibraryControlsProps {
  query: string;
  onQueryChange: (value: string) => void;
  categories: AlbumCategory[];
  category: AlbumCategory | null;
  onCategoryChange: (value: AlbumCategory | null) => void;
  resultCount: number;
  total: number;
}

export default function LibraryControls({
  query,
  onQueryChange,
  categories,
  category,
  onCategoryChange,
  resultCount,
  total,
}: LibraryControlsProps) {
  const chip = (active: boolean) =>
    `label min-h-10 rounded-full border px-4 transition-colors ${
      active ? "border-wine bg-wine text-on-wine" : "border-line text-muted hover:border-ink hover:text-ink"
    }`;

  return (
    <div className="mb-12 grid gap-5 border-y border-line py-6 lg:grid-cols-[minmax(0,20rem)_1fr] lg:items-center lg:gap-10">
      <div>
        <label htmlFor="buscar-discos" className="label mb-2 block text-muted">
          Buscar en la colección
        </label>
        <input
          id="buscar-discos"
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Ej.: proyectos, contacto, habilidades…"
          className="w-full border-0 border-b-2 border-line bg-transparent px-1 py-2 text-base text-ink placeholder:text-muted focus:border-accent focus:outline-none"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filtrar por categoría">
        <button type="button" aria-pressed={category === null} onClick={() => onCategoryChange(null)} className={chip(category === null)}>
          Todos
        </button>
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={category === item}
            onClick={() => onCategoryChange(category === item ? null : item)}
            className={chip(category === item)}
          >
            {item}
          </button>
        ))}
        <p aria-live="polite" className="label ml-auto w-full text-muted sm:w-auto">
          {resultCount === total ? `${total} discos` : `${resultCount} de ${total} discos`}
        </p>
      </div>
    </div>
  );
}
