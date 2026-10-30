import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { pickActiveTrack, type TrackTarget } from "./tracks.ts";

const LINE = 400;
const LEFT = { left: 100, right: 600 };
const RIGHT = { left: 700, right: 1200 };
const at = (top: number, column: typeof LEFT): TrackTarget => ({ top, ...column });

describe("pickActiveTrack en una sola columna", () => {
  const stacked = [at(-500, LEFT), at(100, LEFT), at(900, LEFT)];

  it("elige la última pista que cruzó la línea", () => {
    assert.equal(pickActiveTrack(stacked, LINE, null), 1);
  });

  it("no depende de la atención", () => {
    assert.equal(pickActiveTrack(stacked, LINE, 1000), 1);
  });

  it("devuelve la primera pista si ninguna ha cruzado", () => {
    assert.equal(pickActiveTrack([at(500, LEFT), at(900, LEFT)], LINE, null), 0);
  });
});

describe("pickActiveTrack con pistas a la misma altura", () => {
  // Como Proyectos: dos filas de dos columnas.
  const grid = [at(-900, LEFT), at(-900, RIGHT), at(100, LEFT), at(100, RIGHT)];

  it("elige la columna donde está la atención", () => {
    assert.equal(pickActiveTrack(grid, LINE, 300), 2);
    assert.equal(pickActiveTrack(grid, LINE, 1000), 3);
  });

  it("sin atención elige la primera de la fila", () => {
    assert.equal(pickActiveTrack(grid, LINE, null), 2);
  });

  it("en el hueco entre columnas elige la más cercana", () => {
    assert.equal(pickActiveTrack(grid, LINE, 620), 2);
    assert.equal(pickActiveTrack(grid, LINE, 680), 3);
  });

  it("funciona con tres columnas, como Testimonios", () => {
    const third = { left: 1300, right: 1800 };
    assert.equal(pickActiveTrack([at(50, LEFT), at(50, RIGHT), at(50, third)], LINE, 1500), 2);
  });

  it("tolera pequeñas diferencias de alineación en una columna", () => {
    assert.equal(pickActiveTrack([at(-100, LEFT), at(50, { left: 104, right: 600 })], LINE, 300), 1);
  });
});

describe("pickActiveTrack con columnas de distinta altura", () => {
  // Como Contacto: tres enlaces a la izquierda y un formulario alto a la derecha.
  const contact = [at(150, LEFT), at(250, LEFT), at(350, LEFT), at(-50, RIGHT)];

  it("permite llegar a la pista alta de la otra columna", () => {
    assert.equal(pickActiveTrack(contact, LINE, 1000), 3);
  });

  it("en la columna izquierda sigue el recorrido normal", () => {
    assert.equal(pickActiveTrack(contact, LINE, 300), 2);
  });

  it("sin atención elige la que cruzó más recientemente", () => {
    assert.equal(pickActiveTrack(contact, LINE, null), 2);
  });

  it("ignora la columna que todavía no ha cruzado la línea", () => {
    assert.equal(pickActiveTrack([at(100, LEFT), at(600, RIGHT)], LINE, 1000), 0);
  });
});

describe("pickActiveTrack con anclas ausentes", () => {
  it("ignora las que no existen", () => {
    assert.equal(pickActiveTrack([null, at(100, LEFT), null], LINE, null), 1);
  });

  it("devuelve la primera pista si no hay ninguna", () => {
    assert.equal(pickActiveTrack([null, null], LINE, 300), 0);
  });
});
