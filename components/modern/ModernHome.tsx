"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, type CSSProperties, type MouseEvent } from "react";

import CoverArt from "@/components/library/CoverArt";
import VinylDisc from "@/components/library/VinylDisc";
import { portfolio } from "@/config/portfolio";
import type { Album, AlbumCover, AlbumSlug } from "@/data/albums";
import { albumHref } from "@/lib/albums";
import { markOpening, nameRecord, returnToLastRecord } from "@/lib/roomCamera";
import { useExplored } from "@/lib/useExplored";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

// Colores de las portadas en esta versión: el mismo dibujo con tintas actuales.
const ink = "#14141b";
const paper = "#f6f4ef";
const modernColors: Record<AlbumSlug, Pick<AlbumCover, "background" | "foreground" | "accent">> = {
  bienvenida: { background: "#ff6b4a", foreground: "#fff3ec", accent: ink },
  "sobre-mi": { background: "#e4ddff", foreground: ink, accent: "#7c5cff" },
  proyectos: { background: ink, foreground: "#f2f2f5", accent: "#c6f432" },
  testimonios: { background: paper, foreground: "#ff6b4a", accent: "#3d5afe" },
  experiencia: { background: "#3d5afe", foreground: "#eef0ff", accent: "#c6f432" },
  contacto: { background: "#7c5cff", foreground: "#ffd3ef", accent: paper },
  habilidades: { background: ink, foreground: "#6ee7b7", accent: "#7c5cff" },
  creditos: { background: paper, foreground: ink, accent: "#ff6b4a" },
};

const repaint = (album: Album): Album => ({ ...album, cover: { ...album.cover, ...modernColors[album.slug] } });

/** Prueba de una portada moderna: el nombre grande y los ocho discos sueltos, sin la sala. */
export default function ModernHome({ albums }: { albums: Album[] }) {
  const explored = useExplored();
  useLayoutEffect(returnToLastRecord, []);

  // La paleta moderna vale para toda la página (cabecera y pie incluidos) solo mientras esta está abierta.
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.look = "modern";
    return () => {
      delete root.dataset.look;
    };
  }, []);

  return (
    <section aria-labelledby="moderno-nombre" className="modern">
      <div className="modern-inner">
        <header className="modern-head">
          <h1 id="moderno-nombre" className="fade-up" style={delay(0)}>
            {portfolio.fullName}
          </h1>
          <p className="fade-up" style={delay(120)}>
            {portfolio.title} · {portfolio.university}
          </p>
        </header>

        <ul className="modern-grid" aria-label="Discos">
          {albums.map((album, index) => (
            <li key={album.slug} className="fade-up" style={delay(220 + index * 60)}>
              <ModernRecord album={repaint(album)} heard={explored.includes(album.slug)} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ModernRecord({ album, heard }: { album: Album; heard: boolean }) {
  const open = (event: MouseEvent<HTMLAnchorElement>) => {
    nameRecord(event.currentTarget);
    markOpening();
  };

  return (
    <Link
      href={albumHref(album.slug)}
      transitionTypes={["room-open"]}
      onClick={open}
      data-record
      aria-label={`${album.section}.${heard ? " Ya escuchado." : ""} Abrir álbum`}
      className="modern-record"
    >
      <span className="modern-stage">
        <span className="modern-disc" data-camera="disc">
          <VinylDisc album={album} />
        </span>
        <span className="modern-sleeve" data-camera="sleeve">
          <CoverArt album={album} place="modern" />
        </span>
      </span>
      <span className="modern-name">
        {album.section}
        {heard ? <span className="record-heard" aria-hidden="true" /> : null}
      </span>
    </Link>
  );
}
