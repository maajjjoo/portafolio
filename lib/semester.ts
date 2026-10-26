/**
 * Cálculo del semestre actual a partir de una fecha de referencia.
 *
 * semestreActual = semestreDeReferencia + periodosCompletos
 * periodosCompletos = floor(mesesCompletosTranscurridos / mesesPorSemestre)
 *
 * Un mes cuenta como completo solo cuando se alcanza el mismo día del mes de
 * la fecha de referencia. Este módulo no depende de Next.js para poder
 * probarse directamente con `node --test`.
 */

export interface AcademicConfig {
  degree: string;
  referenceSemester: number;
  /** Fecha en formato "AAAA-MM-DD", o `null` si aún no se ha configurado. */
  referenceDate: string | null;
  monthsPerSemester: number;
  timeZone: string;
}

export interface CalendarDate {
  year: number;
  month: number;
  day: number;
}

export type SemesterResult =
  | {
      status: "calculated";
      semester: number;
      periodsElapsed: number;
    }
  | {
      status: "unconfigured" | "invalid";
      /** Último semestre confirmado (el de referencia). */
      semester: number;
      reason: string;
    };

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

/** Convierte "AAAA-MM-DD" en una fecha de calendario válida, o `null`. */
export function parseCalendarDate(value: string): CalendarDate | null {
  const match = ISO_DATE.exec(value.trim());
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12 || day < 1) return null;

  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  if (day > daysInMonth) return null;

  return { year, month, day };
}

/** Meses completos entre dos fechas de calendario (negativo si `to` es anterior). */
export function completedMonthsBetween(from: CalendarDate, to: CalendarDate): number {
  const rawMonths = (to.year - from.year) * 12 + (to.month - from.month);
  if (rawMonths > 0 && to.day < from.day) return rawMonths - 1;
  if (rawMonths < 0 && to.day > from.day) return rawMonths + 1;
  return rawMonths;
}

function compareDates(a: CalendarDate, b: CalendarDate): number {
  return a.year - b.year || a.month - b.month || a.day - b.day;
}

/** Fecha de calendario de un instante en una zona horaria concreta. */
export function calendarDateInTimeZone(instant: Date, timeZone: string): CalendarDate {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(instant);
  const get = (type: string) => Number(parts.find((part) => part.type === type)?.value);
  return { year: get("year"), month: get("month"), day: get("day") };
}

export function calculateSemester(config: AcademicConfig, today: CalendarDate): SemesterResult {
  const { referenceSemester, referenceDate, monthsPerSemester } = config;

  if (!Number.isInteger(referenceSemester) || referenceSemester < 1) {
    return {
      status: "invalid",
      semester: 1,
      reason: "El semestre de referencia debe ser un número entero positivo.",
    };
  }

  if (!Number.isInteger(monthsPerSemester) || monthsPerSemester < 1) {
    return {
      status: "invalid",
      semester: referenceSemester,
      reason: "La duración del semestre debe ser un número entero de meses.",
    };
  }

  if (referenceDate === null || referenceDate.trim() === "") {
    return {
      status: "unconfigured",
      semester: referenceSemester,
      reason: "Falta configurar la fecha académica de referencia.",
    };
  }

  const reference = parseCalendarDate(referenceDate);
  if (!reference) {
    return {
      status: "invalid",
      semester: referenceSemester,
      reason: "La fecha de referencia no es válida (usa el formato AAAA-MM-DD).",
    };
  }

  if (compareDates(today, reference) < 0) {
    return {
      status: "invalid",
      semester: referenceSemester,
      reason: "La fecha de referencia está en el futuro.",
    };
  }

  const periodsElapsed = Math.floor(completedMonthsBetween(reference, today) / monthsPerSemester);
  return {
    status: "calculated",
    semester: referenceSemester + periodsElapsed,
    periodsElapsed,
  };
}

/** "5.º semestre" */
export function formatSemester(semester: number): string {
  return `${semester}.º semestre`;
}
