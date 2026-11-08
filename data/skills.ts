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

// Primero los frameworks, que es con lo que más he construido. Solo lo que he usado varias veces.
export const skillCategories: SkillCategory[] = [
  {
    id: "frameworks",
    title: "Frameworks",
    description: "Con los que he construido mis aplicaciones.",
    skills: [
      { name: "React" },
      { name: "React Native" },
      { name: "Expo" },
      { name: "Spring Boot" },
      { name: "Express" },
      { name: "Tauri" },
      { name: "Unity" },
      { name: "Tailwind CSS" },
    ],
  },
  {
    id: "lenguajes",
    title: "Lenguajes",
    description: "Los que he usado en clase y en mis proyectos.",
    skills: [
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "Java" },
      { name: "Python" },
      { name: "C#" },
      { name: "HTML y CSS" },
    ],
  },
  {
    id: "backend-datos",
    title: "Backend y datos",
    description: "Para los servidores, las APIs y las bases de datos.",
    skills: [
      { name: "Node.js" },
      { name: "Prisma" },
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
      { name: "Vite" },
      { name: "Vercel" },
      { name: "API de Gemini" },
    ],
  },
];
