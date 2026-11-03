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

export function albumHref(slug: string) {
  return `/album/${slug}`;
}
