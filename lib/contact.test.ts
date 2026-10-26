import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { parseFormspreeEndpoint, validateContact } from "./contact.ts";

const valid = { name: "Ana", email: "ana@example.com", message: "Hola, me gustaría hablar contigo." };

describe("validateContact", () => {
  it("acepta datos completos y válidos", () => {
    assert.deepEqual(validateContact(valid), {});
  });

  it("exige todos los campos", () => {
    const errors = validateContact({ name: " ", email: "", message: "" });
    assert.ok(errors.name);
    assert.ok(errors.email);
    assert.ok(errors.message);
  });

  it("valida el formato del correo", () => {
    for (const email of ["ana", "ana@", "ana@dominio", "ana @dominio.com", "@dominio.com"]) {
      assert.ok(validateContact({ ...valid, email }).email, `debería rechazar ${email}`);
    }
    assert.equal(validateContact({ ...valid, email: "ana.maria+web@uni.edu.co" }).email, undefined);
  });

  it("rechaza mensajes demasiado cortos", () => {
    assert.ok(validateContact({ ...valid, message: "Hola" }).message);
  });
});

describe("parseFormspreeEndpoint", () => {
  it("acepta un endpoint de Formspree", () => {
    assert.equal(parseFormspreeEndpoint("https://formspree.io/f/abc123"), "https://formspree.io/f/abc123");
  });

  it("rechaza valores vacíos o con otro formato", () => {
    assert.equal(parseFormspreeEndpoint(undefined), null);
    assert.equal(parseFormspreeEndpoint(""), null);
    assert.equal(parseFormspreeEndpoint("tu-id-aqui"), null);
    assert.equal(parseFormspreeEndpoint("http://formspree.io/f/abc123"), null);
    assert.equal(parseFormspreeEndpoint("https://example.com/f/abc123"), null);
  });
});
