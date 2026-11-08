import { portfolio } from "@/config/portfolio";

/**
 * Experiencia académica y profesional.
 *
 * - Las fechas usan el formato "AAAA-MM". Usa `null` si aún no la confirmas.
 * - En "profesional" solo va trabajo real relacionado con software
 *   (empleo, prácticas o freelance verificable). Los proyectos personales
 *   y académicos van en data/projects.ts.
 */

export type ExperienceType = "academica" | "profesional";

export interface ExperienceItem {
  id: string;
  type: ExperienceType;
  title: string;
  organization: string;
  startDate: string | null;
  endDate: string | null;
  isCurrent: boolean;
  description: string;
}

export const experienceTypeLabels: Record<ExperienceType, string> = {
  academica: "Académica",
  profesional: "Profesional",
};

export const experience: ExperienceItem[] = [
  {
    id: "ucc-ingenieria-software",
    type: "academica",
    title: `Pregrado en ${portfolio.academic.degree}`,
    organization: portfolio.university,
    startDate: null,
    endDate: null,
    isCurrent: true,
    description: "Pregrado en curso.",
  },
];
