/** Utilidades puras para recorrer la colección de álbumes. */

import { albums as allAlbums, type Album } from "../data/albums.ts";

export function sortedAlbums(albums: readonly Album[] = allAlbums): Album[] {
  return [...albums].sort((a, b) => a.order - b.order);
}

export function getAlbum(slug: string, albums: readonly Album[] = allAlbums): Album | undefined {
  return albums.find((album) => album.slug === slug);
}

export interface AdjacentAlbums {
  previous: Album | null;
  next: Album | null;
  position: number;
  total: number;
}

/** Álbum anterior y siguiente según el orden. No da la vuelta: el primero no tiene anterior. */
export function getAdjacentAlbums(slug: string, albums: readonly Album[] = allAlbums): AdjacentAlbums | null {
  const ordered = sortedAlbums(albums);
  const index = ordered.findIndex((album) => album.slug === slug);
  if (index === -1) return null;
  return {
    previous: ordered[index - 1] ?? null,
    next: ordered[index + 1] ?? null,
    position: index + 1,
    total: ordered.length,
  };
}

function normalize(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

/** Filtra por categoría y por texto (título, sección, descripción y canciones), sin distinguir tildes. */
export function filterAlbums(albums: readonly Album[], query: string, category: string | null): Album[] {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  return sortedAlbums(albums).filter((album) => {
    if (category && album.category !== category) return false;
    if (terms.length === 0) return true;
    const haystack = normalize(
      [album.title, album.section, album.category, album.description, album.catalog, ...album.tracks].join(" "),
    );
    return terms.every((term) => haystack.includes(term));
  });
}

export function albumHref(slug: string) {
  return `/album/${slug}`;
}
