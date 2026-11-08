import { cacheLife } from "next/cache";

import { portfolio } from "@/config/portfolio";
export interface AcademicSnapshot {
  currentYear: number;
}

/**
 * Lee el año actual una vez y lo comparte con el pie y los créditos.
 * Se cachea por días: en Vercel la página se regenera sola, así que el
 * año cambia sin volver a desplegar.
 */
export async function getAcademicSnapshot(): Promise<AcademicSnapshot> {
  "use cache";
  cacheLife("days");

  const year = new Intl.DateTimeFormat("en-CA", { timeZone: portfolio.academic.timeZone, year: "numeric" }).format(new Date());
  return { currentYear: Number(year) };
}
