/**
 * Tecnologías agrupadas por categoría. No se usan porcentajes:
 * - "proyectos": la he usado en al menos un proyecto propio o académico.
 * - "aprendizaje": la estoy aprendiendo o la uso en un proyecto que apenas empieza.
 */

export type SkillLevel = "proyectos" | "aprendizaje";

export interface Skill {
  name: string;
  level: SkillLevel;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: Skill[];
}

export const skillLevelLabels: Record<SkillLevel, string> = {
  proyectos: "La he manejado",
  aprendizaje: "Estoy aprendiendo",
};

export const skillCategories: SkillCategory[] = [
  {
    id: "lenguajes",
    title: "Lenguajes",
    description: "Los que he usado en clase y en mis proyectos.",
    skills: [
      { name: "TypeScript", level: "proyectos" },
      { name: "JavaScript", level: "proyectos" },
      { name: "Java", level: "proyectos" },
      { name: "Python", level: "proyectos" },
      { name: "Rust", level: "aprendizaje" },
      { name: "Kotlin", level: "aprendizaje" },
      { name: "C#", level: "aprendizaje" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    description: "Para hacer interfaces web y de escritorio.",
    skills: [
      { name: "React", level: "proyectos" },
      { name: "HTML y CSS", level: "proyectos" },
      { name: "Tailwind CSS", level: "proyectos" },
      { name: "Vite", level: "proyectos" },
      { name: "Next.js", level: "aprendizaje" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    description: "Para los servidores y las APIs de mis aplicaciones.",
    skills: [
      { name: "Node.js", level: "proyectos" },
      { name: "Express", level: "proyectos" },
      { name: "Spring Boot", level: "proyectos" },
      { name: "Prisma", level: "proyectos" },
      { name: ".NET", level: "aprendizaje" },
    ],
  },
  {
    id: "movil-escritorio",
    title: "Móvil y escritorio",
    description: "Aplicaciones fuera del navegador.",
    skills: [
      { name: "React Native", level: "proyectos" },
      { name: "Expo", level: "proyectos" },
      { name: "Tauri", level: "proyectos" },
      { name: "Wear OS", level: "aprendizaje" },
    ],
  },
  {
    id: "bases-de-datos",
    title: "Bases de datos",
    description: "Persistencia local y en servidor.",
    skills: [
      { name: "PostgreSQL", level: "proyectos" },
      { name: "SQLite", level: "proyectos" },
    ],
  },
  {
    id: "herramientas",
    title: "Herramientas",
    description: "Para guardar versiones, publicar y usar IA.",
    skills: [
      { name: "Git", level: "proyectos" },
      { name: "GitHub", level: "proyectos" },
      { name: "Vercel", level: "proyectos" },
      { name: "API de Gemini", level: "proyectos" },
      { name: "Android Studio", level: "aprendizaje" },
    ],
  },
];
