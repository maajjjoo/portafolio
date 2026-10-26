import { cacheLife } from "next/cache";

import { portfolio } from "@/config/portfolio";
import { calculateSemester, calendarDateInTimeZone, type SemesterResult } from "@/lib/semester";

export interface AcademicSnapshot {
  semester: SemesterResult;
  currentYear: number;
}

/**
 * Lee la fecha actual una vez y la comparte con todos los componentes.
 * Se cachea por días: en Vercel la página se regenera sola, así que el
 * semestre y el año del pie cambian sin volver a desplegar.
 */
export async function getAcademicSnapshot(): Promise<AcademicSnapshot> {
  "use cache";
  cacheLife("days");

  const today = calendarDateInTimeZone(new Date(), portfolio.academic.timeZone);
  return {
    semester: calculateSemester(portfolio.academic, today),
    currentYear: today.year,
  };
}
