"use client";

import Link from "next/link";
import { useLayoutEffect, type MouseEvent } from "react";

import CoverArt from "@/components/library/CoverArt";
import VinylDisc from "@/components/library/VinylDisc";
import { portfolio } from "@/config/portfolio";
import type { Album } from "@/data/albums";
import { albumHref } from "@/lib/albums";
import { markOpening, nameRecord, returnToLastRecord } from "@/lib/roomCamera";
import { useExplored } from "@/lib/useExplored";

/** La placa con el nombre y las repisas con los ocho discos. */
export default function RoomCollection({ albums }: { albums: Album[] }) {
  const explored = useExplored();

  // Antes de pintar: la transición de regreso necesita saber a qué disco vuelve.
  useLayoutEffect(returnToLastRecord, []);

  return (
    <>
      <div className="room-door">
        <div className="room-plate">
          <h1>{portfolio.fullName}</h1>
          <p className="room-engraved">{portfolio.title}</p>
        </div>
        <p className="room-hint">Elige un disco para abrirlo</p>
      </div>

      <div className="room-shelves">
        {(["A", "B"] as const).map((side) => (
          <ul key={side} className="room-ledge" aria-label={`Lado ${side}`}>
            {albums
              .filter((album) => album.side === side)
              .map((album) => (
                <RoomRecord key={album.slug} album={album} heard={explored.includes(album.slug)} />
              ))}
          </ul>
        ))}
      </div>
    </>
  );
}

function RoomRecord({ album, heard }: { album: Album; heard: boolean }) {
  const openRecord = (event: MouseEvent<HTMLAnchorElement>) => {
    nameRecord(event.currentTarget);
    markOpening();
  };

  return (
    <li className="room-slot">
      <Link
        href={albumHref(album.slug)}
        transitionTypes={["room-open"]}
        onClick={openRecord}
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
