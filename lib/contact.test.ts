import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { contactErrorMessage, parseFormspreeEndpoint, validateContact } from "./contact.ts";

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

describe("contactErrorMessage", () => {
  it("distingue límite de envíos, caída del servicio y rechazo", () => {
    assert.match(contactErrorMessage(429), /demasiados/);
    assert.match(contactErrorMessage(503), /no está disponible/);
    assert.match(contactErrorMessage(422), /rechazó/);
  });

  it("no muestra el código de estado", () => {
    for (const status of [400, 422, 429, 500, 503]) {
      assert.doesNotMatch(contactErrorMessage(status), /\d/);
    }
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
