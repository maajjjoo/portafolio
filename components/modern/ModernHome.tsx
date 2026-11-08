"use client";

import Link from "next/link";
import { useLayoutEffect, type CSSProperties, type MouseEvent } from "react";

import CoverArt from "@/components/library/CoverArt";
import VinylDisc from "@/components/library/VinylDisc";
import { portfolio } from "@/config/portfolio";
import type { Album } from "@/data/albums";
import { albumHref } from "@/lib/albums";
import { markOpening, nameRecord, returnToLastRecord } from "@/lib/roomCamera";
import { useExplored } from "@/lib/useExplored";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** Prueba de una portada moderna: el nombre grande y los ocho discos sueltos, sin la sala. */
export default function ModernHome({ albums }: { albums: Album[] }) {
  const explored = useExplored();
  useLayoutEffect(returnToLastRecord, []);

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
              <ModernRecord album={album} heard={explored.includes(album.slug)} />
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
