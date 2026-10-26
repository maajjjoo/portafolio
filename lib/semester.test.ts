import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  calculateSemester,
  calendarDateInTimeZone,
  completedMonthsBetween,
  formatSemester,
  parseCalendarDate,
  type AcademicConfig,
  type CalendarDate,
} from "./semester.ts";

const base: AcademicConfig = {
  degree: "Ingeniería de Software",
  referenceSemester: 5,
  referenceDate: "2026-02-15",
  monthsPerSemester: 6,
  timeZone: "America/Bogota",
};

const day = (value: string): CalendarDate => {
  const parsed = parseCalendarDate(value);
  assert.ok(parsed, `fecha de prueba inválida: ${value}`);
  return parsed;
};

const semesterOn = (today: string, overrides: Partial<AcademicConfig> = {}) =>
  calculateSemester({ ...base, ...overrides }, day(today));

describe("parseCalendarDate", () => {
  it("acepta fechas reales en formato AAAA-MM-DD", () => {
    assert.deepEqual(parseCalendarDate("2026-02-15"), { year: 2026, month: 2, day: 15 });
    assert.deepEqual(parseCalendarDate("2024-02-29"), { year: 2024, month: 2, day: 29 });
  });

  it("rechaza fechas imposibles o con otro formato", () => {
    assert.equal(parseCalendarDate("2025-02-29"), null);
    assert.equal(parseCalendarDate("2026-13-01"), null);
    assert.equal(parseCalendarDate("2026-04-31"), null);
    assert.equal(parseCalendarDate("15/02/2026"), null);
    assert.equal(parseCalendarDate("2026-2-15"), null);
    assert.equal(parseCalendarDate(""), null);
  });
});

describe("completedMonthsBetween", () => {
  it("no cuenta el mes hasta alcanzar el mismo día", () => {
    assert.equal(completedMonthsBetween(day("2026-02-15"), day("2026-03-14")), 0);
    assert.equal(completedMonthsBetween(day("2026-02-15"), day("2026-03-15")), 1);
    assert.equal(completedMonthsBetween(day("2026-02-15"), day("2027-02-15")), 12);
  });
});

describe("calculateSemester", () => {
  it("mantiene el semestre de referencia el mismo día de referencia", () => {
    assert.deepEqual(semesterOn("2026-02-15"), {
      status: "calculated",
      semester: 5,
      periodsElapsed: 0,
    });
  });

  it("no avanza el día justo antes de cumplirse seis meses", () => {
    const result = semesterOn("2026-08-14");
    assert.equal(result.status, "calculated");
    assert.equal(result.semester, 5);
  });

  it("avanza exactamente al cumplirse seis meses", () => {
    const result = semesterOn("2026-08-15");
    assert.equal(result.status, "calculated");
    assert.equal(result.semester, 6);
  });

  it("maneja el segundo cambio y el cruce de año", () => {
    assert.equal(semesterOn("2027-02-14").semester, 6);
    assert.equal(semesterOn("2027-02-15").semester, 7);
    assert.equal(semesterOn("2028-08-15").semester, 10);
  });

  it("no asume un número total de semestres en la carrera", () => {
    assert.equal(semesterOn("2031-02-15").semester, 15);
  });

  it("maneja una referencia a final de mes", () => {
    const opts = { referenceDate: "2026-08-31" };
    assert.equal(semesterOn("2027-02-28", opts).semester, 5);
    assert.equal(semesterOn("2027-03-01", opts).semester, 6);
  });

  it("devuelve el último semestre confirmado si falta la fecha", () => {
    const result = semesterOn("2026-10-25", { referenceDate: null });
    assert.equal(result.status, "unconfigured");
    assert.equal(result.semester, 5);
  });

  it("marca como inválida una fecha mal escrita", () => {
    const result = semesterOn("2026-10-25", { referenceDate: "2026-02-30" });
    assert.equal(result.status, "invalid");
    assert.equal(result.semester, 5);
  });

  it("marca como inválida una fecha de referencia futura", () => {
    const result = semesterOn("2026-10-25", { referenceDate: "2027-01-10" });
    assert.equal(result.status, "invalid");
    assert.equal(result.semester, 5);
  });

  it("rechaza configuraciones numéricas incoherentes", () => {
    assert.equal(semesterOn("2026-10-25", { monthsPerSemester: 0 }).status, "invalid");
    assert.equal(semesterOn("2026-10-25", { referenceSemester: 0 }).status, "invalid");
    assert.equal(semesterOn("2026-10-25", { referenceSemester: 4.5 }).status, "invalid");
  });
});

describe("calendarDateInTimeZone", () => {
  it("usa el día local de la zona horaria, no el de UTC", () => {
    // 2026-08-15 03:00 UTC sigue siendo 14 de agosto en Bogotá (UTC-5).
    const instant = new Date("2026-08-15T03:00:00Z");
    assert.deepEqual(calendarDateInTimeZone(instant, "America/Bogota"), {
      year: 2026,
      month: 8,
      day: 14,
    });
    assert.equal(calculateSemester(base, calendarDateInTimeZone(instant, "America/Bogota")).semester, 5);
  });
});

describe("formatSemester", () => {
  it("usa el ordinal en español", () => {
    assert.equal(formatSemester(5), "5.º semestre");
  });
});
