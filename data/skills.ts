/**
 * Tecnologías que he utilizado en mis proyectos, agrupadas por categoría.
 * Sin porcentajes ni niveles: solo va lo que de verdad he usado.
 */

export interface Skill {
  name: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "lenguajes",
    title: "Lenguajes",
    description: "Los que he usado en clase y en mis proyectos.",
    skills: [
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "Java" },
      { name: "Python" },
      { name: "Rust" },
      { name: "Kotlin" },
      { name: "C#" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    description: "Para hacer interfaces web y de escritorio.",
    skills: [
      { name: "React" },
      { name: "HTML y CSS" },
      { name: "Tailwind CSS" },
      { name: "Vite" },
      { name: "Next.js" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    description: "Para los servidores y las APIs de mis aplicaciones.",
    skills: [
      { name: "Node.js" },
      { name: "Express" },
      { name: "Spring Boot" },
      { name: "Prisma" },
      { name: ".NET" },
    ],
  },
  {
    id: "movil-escritorio",
    title: "Móvil y escritorio",
    description: "Aplicaciones fuera del navegador.",
    skills: [
      { name: "React Native" },
      { name: "Expo" },
      { name: "Tauri" },
      { name: "Wear OS" },
    ],
  },
  {
    id: "bases-de-datos",
    title: "Bases de datos",
    description: "Persistencia local y en servidor.",
    skills: [
      { name: "PostgreSQL" },
      { name: "SQLite" },
    ],
  },
  {
    id: "herramientas",
    title: "Herramientas",
    description: "Para guardar versiones, publicar y usar IA.",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Vercel" },
      { name: "API de Gemini" },
      { name: "Android Studio" },
    ],
  },
];
