"use client";

import Link from "next/link";
import { ViewTransition } from "react";

import CoverArt from "@/components/library/CoverArt";
import VinylDisc from "@/components/library/VinylDisc";
import { ArrowRightIcon } from "@/components/ui/Icons";
import type { Album } from "@/data/albums";
import { albumHref } from "@/lib/albums";

interface RecordCardProps {
  album: Album;
  explored: boolean;
}

/** Funda en el estante. Es un enlace real: funciona con clic, toque, Enter y lectores de pantalla. */
export default function RecordCard({ album, explored }: RecordCardProps) {
  const number = String(album.order).padStart(2, "0");

  return (
    <Link
      href={albumHref(album.slug)}
      transitionTypes={["nav-forward"]}
      aria-label={`${album.title}: ${album.section}. Disco ${album.order}, lado ${album.side}.${explored ? " Ya escuchado." : ""} Abrir álbum`}
      className="record-card group relative flex h-full flex-col"
    >
      <div className="relative">
        {/* El disco queda detrás de la funda y sale hacia la derecha. */}
        <div className="relative w-[76%]">
          <div className="record-disc absolute top-[4%] left-[4%] w-[92%]">
            <VinylDisc album={album} />
          </div>
          <ViewTransition name={`portada-${album.slug}`} share="morph" default="none">
            <div className="record-sleeve relative aspect-square overflow-hidden rounded-[3px] shadow-card ring-1 ring-black/10">
              <CoverArt album={album} />
            </div>
          </ViewTransition>
          {explored ? (
            <span className="label absolute -top-2 -left-2 rounded-full bg-gold-soft px-2 py-1 text-[0.6rem] text-gold shadow-card">
              Escuchado
            </span>
          ) : null}
        </div>
      </div>

      {/* Repisa: se extiende hacia el hueco entre columnas para formar una tabla continua. */}
      <div aria-hidden="true" className="shelf-plank -mx-4 mt-0 sm:-mx-5" />

      <div className="mt-4 flex flex-1 flex-col">
        <p className="label text-muted">
          Nº {number} · Lado {album.side}
        </p>
        <h3 className="mt-1 font-display text-2xl leading-tight sm:text-3xl">{album.title}</h3>
        <p className="mt-1 text-sm text-muted">
          {album.section} · {album.category}
        </p>
        <span className="label mt-auto inline-flex items-center gap-2 pt-3 text-accent">
          Abrir álbum
          <ArrowRightIcon width={14} height={14} className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
