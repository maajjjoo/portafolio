"use client";

import Link from "next/link";
import { useLayoutEffect, useMemo, useState, type MouseEvent } from "react";

import CoverArt from "@/components/library/CoverArt";
import VinylDisc from "@/components/library/VinylDisc";
import { portfolio } from "@/config/portfolio";
import type { Album, AlbumCategory } from "@/data/albums";
import { albumHref, filterByCategory } from "@/lib/albums";
import { markOpening, nameRecord, returnToLastRecord } from "@/lib/roomCamera";
import { useExplored } from "@/lib/useExplored";

/** Placa con el nombre, filtro de categorías y las repisas. Los discos filtrados no se mueven de sitio. */
export default function RoomCollection({ albums }: { albums: Album[] }) {
  const [category, setCategory] = useState<AlbumCategory | null>(null);
  const explored = useExplored();

  const categories = useMemo(() => [...new Set(albums.map((album) => album.category))], [albums]);
  const visible = useMemo(() => new Set(filterByCategory(albums, category).map((album) => album.slug)), [albums, category]);

  // Antes de pintar: la transición de regreso necesita saber a qué disco vuelve.
  useLayoutEffect(returnToLastRecord, []);

  return (
    <>
      <div className="room-door">
        <div className="room-plate">
          <h1>{portfolio.fullName}</h1>
          <p className="room-engraved">
            {portfolio.title}
            <br />
            {portfolio.libraryTitle}
          </p>
        </div>

        <div className="room-file">
          <label htmlFor="filtrar-discos" className="room-engraved">
            Categoría
          </label>
          <select
            id="filtrar-discos"
            value={category ?? ""}
            onChange={(event) => setCategory((event.target.value || null) as AlbumCategory | null)}
            className="room-field"
          >
            <option value="">Todas</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <p role="status" className="room-status">
            {category ? (
              <>
                {visible.size === 1 ? "1 disco" : `${visible.size} discos`} de {albums.length} ·{" "}
                <button type="button" onClick={() => setCategory(null)}>
                  Ver todos
                </button>
              </>
            ) : (
              "Elige un disco para abrirlo"
            )}
          </p>
        </div>
      </div>

      <div className="room-shelves">
        {(["A", "B"] as const).map((side) => (
          <ul key={side} className="room-ledge" aria-label={`Lado ${side}`}>
            {albums
              .filter((album) => album.side === side)
              .map((album) => (
                <RoomRecord key={album.slug} album={album} heard={explored.includes(album.slug)} hidden={!visible.has(album.slug)} />
              ))}
          </ul>
        ))}
      </div>
    </>
  );
}

function RoomRecord({ album, heard, hidden }: { album: Album; heard: boolean; hidden: boolean }) {
  const openRecord = (event: MouseEvent<HTMLAnchorElement>) => {
    nameRecord(event.currentTarget);
    markOpening();
  };

  return (
    <li className="room-slot" data-dim={hidden ? "" : undefined} aria-hidden={hidden || undefined}>
      <Link
        href={albumHref(album.slug)}
        transitionTypes={["room-open"]}
        onClick={openRecord}
        tabIndex={hidden ? -1 : undefined}
        aria-label={`${album.title}: ${album.section}. Disco ${album.order}, lado ${album.side}.${heard ? " Ya escuchado." : ""} Abrir álbum`}
        className="record"
      >
        <span className="record-stage">
          <span className="record-disc">
            <VinylDisc album={album} />
          </span>
          <span className="record-sleeve">
            <CoverArt album={album} />
          </span>
        </span>
        {/* Fuera de la portada, para no tapar el catálogo ni el título. */}
        <span className="record-name">
          {album.section}
          {heard ? <span className="record-heard"> · Escuchado</span> : null}
        </span>
      </Link>
    </li>
  );
}
