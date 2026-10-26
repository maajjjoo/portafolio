import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";

import AlbumExperience from "@/components/album/AlbumExperience";
import { portfolio } from "@/config/portfolio";
import { albums } from "@/data/albums";
import { getAdjacentAlbums, getAlbum } from "@/lib/albums";

// Todos los álbumes se generan al compilar; cualquier otro slug muestra not-found.tsx.
export function generateStaticParams() {
  return albums.map((album) => ({ slug: album.slug }));
}

export async function generateMetadata({ params }: PageProps<"/album/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const album = getAlbum(slug);
  if (!album) return { title: `Disco no encontrado · ${portfolio.libraryTitle}` };
  return {
    title: `${album.section} — ${album.title} · ${portfolio.fullName}`,
    description: album.description,
  };
}

export default async function AlbumPage({ params }: PageProps<"/album/[slug]">) {
  const { slug } = await params;
  const album = getAlbum(slug);
  const adjacent = getAdjacentAlbums(slug);
  if (!album || !adjacent) notFound();

  return (
    <ViewTransition
      enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      default="none"
    >
      {/* scroll-mt: al navegar, Next desplaza hasta aquí; deja sitio para la cabecera fija. */}
      <div className="scroll-mt-[4.5rem]">
        <AlbumExperience album={album} adjacent={adjacent} />
      </div>
    </ViewTransition>
  );
}
