import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { albums, albumSlugs } from "../data/albums.ts";
import { albumHref, filterAlbums, getAdjacentAlbums, getAlbum, sortedAlbums } from "./albums.ts";

describe("colección de álbumes", () => {
  it("tiene un álbum por cada slug, sin duplicados", () => {
    assert.equal(albums.length, albumSlugs.length);
    assert.equal(new Set(albums.map((album) => album.slug)).size, albums.length);
    assert.equal(new Set(albums.map((album) => album.catalog)).size, albums.length);
  });

  it("respeta el orden de las secciones de la entrega", () => {
    assert.deepEqual(
      sortedAlbums().map((album) => album.section),
      ["Bienvenida", "Sobre mí", "Proyectos", "Testimonios", "Experiencia", "Contacto", "Habilidades", "Créditos"],
    );
  });

  it("cada pista lleva a un ancla única en toda la colección", () => {
    const anchors = albums.flatMap((album) => album.tracks.map((track) => track.anchor));
    assert.ok(anchors.every(Boolean));
    assert.equal(new Set(anchors).size, anchors.length);
  });

  it("usa órdenes consecutivos desde 1", () => {
    assert.deepEqual(
      sortedAlbums().map((album) => album.order),
      albums.map((_, i) => i + 1),
    );
  });
});

describe("getAlbum", () => {
  it("encuentra un álbum por slug", () => {
    assert.equal(getAlbum("proyectos")?.section, "Proyectos");
  });

  it("devuelve undefined para un slug desconocido", () => {
    assert.equal(getAlbum("no-existe"), undefined);
  });
});

describe("getAdjacentAlbums", () => {
  it("el primero no tiene anterior", () => {
    const adjacent = getAdjacentAlbums("bienvenida");
    assert.equal(adjacent?.previous, null);
    assert.equal(adjacent?.next?.slug, "sobre-mi");
    assert.equal(adjacent?.position, 1);
  });

  it("el último no tiene siguiente", () => {
    const adjacent = getAdjacentAlbums("creditos");
    assert.equal(adjacent?.next, null);
    assert.equal(adjacent?.previous?.slug, "habilidades");
    assert.equal(adjacent?.position, adjacent?.total);
  });

  it("devuelve null para un slug desconocido", () => {
    assert.equal(getAdjacentAlbums("no-existe"), null);
  });
});

describe("filterAlbums", () => {
  it("sin filtros devuelve todo en orden", () => {
    assert.equal(filterAlbums(albums, "", null).length, albums.length);
  });

  it("busca sin distinguir tildes ni mayúsculas", () => {
    assert.deepEqual(
      filterAlbums(albums, "SOBRE MI", null).map((album) => album.slug),
      ["sobre-mi"],
    );
  });

  it("busca también en las canciones", () => {
    assert.ok(filterAlbums(albums, "pollystock", null).some((album) => album.slug === "proyectos"));
  });

  it("filtra por categoría", () => {
    const extras = filterAlbums(albums, "", "Extras").map((album) => album.slug);
    assert.deepEqual(extras, ["habilidades", "creditos"]);
  });

  it("combina texto y categoría", () => {
    assert.deepEqual(filterAlbums(albums, "stack", "Presentación"), []);
  });
});

describe("albumHref", () => {
  it("construye la ruta del álbum", () => {
    assert.equal(albumHref("contacto"), "/album/contacto");
  });
});
