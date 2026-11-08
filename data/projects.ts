/**
 * Proyectos mostrados en el portafolio.
 *
 * Reglas para mantener este archivo honesto:
 * - `repositories` y `demo` solo contienen URLs verificadas como públicas.
 * - Si falta un enlace, deja el arreglo vacío o `demo: null` y explica el motivo.
 * - Para añadir una captura real, guárdala en public/images/projects/ y usa `image`.
 */

export type ProjectStatus = "en-desarrollo" | "etapa-inicial" | "terminado";

export type ProjectMotif = "editor" | "mobile" | "desktop" | "watch";

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectDemo extends ProjectLink {
  /** Aclaración visible junto al enlace (por ejemplo, limitaciones conocidas). */
  note?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  highlights: string[];
  tags: string[];
  status: ProjectStatus;
  repositories: ProjectLink[];
  demo: ProjectDemo | null;
  /** Por qué no hay demo pública, cuando `demo` es `null`. */
  demoUnavailableReason?: string;
  /** Captura real del proyecto (opcional). */
  image?: { src: string; alt: string };
  /** Ilustración usada mientras no haya captura real. */
  motif: ProjectMotif;
  /** Proyecto principal de este semestre: va arriba, antes que los demás. */
  featured?: boolean;
}

export const projectStatusLabels: Record<ProjectStatus, string> = {
  "en-desarrollo": "En desarrollo",
  "etapa-inicial": "Etapa inicial",
  terminado: "Terminado",
};

export const projects: Project[] = [
  // Primero los principales de este semestre (featured), luego los demás.
  {
    id: "caso-404",
    title: "El Caso 404",
    description:
      "Videojuego 3D de investigación criminal en primera persona. Exploras escenas, recolectas evidencias, interrogas a personajes controlados por IA y tomas decisiones que llevan a distintos finales. ALEX, tu asistente de IA, parece ayudarte, pero manipula la investigación.",
    highlights: [
      "Proyecto en equipo de tres personas, hecho en Unity.",
      "La verdad de cada caso está en los datos del juego; la IA solo da voz a los personajes.",
      "Los diálogos con IA pasan por un servidor propio, así que las claves no quedan dentro del juego.",
    ],
    tags: ["Unity", "C#", "JavaScript"],
    status: "en-desarrollo",
    repositories: [{ label: "Juego", url: "https://github.com/Josecampoe/CriminalisticaGame" }],
    demo: null,
    demoUnavailableReason: "Es un juego para computador y todavía no tiene una versión pública para jugar.",
    image: {
      src: "/images/projects/caso-404.png",
      alt: "Captura de El Caso 404 en desarrollo: un bar en penumbra visto en primera persona, con la barra, taburetes y un personaje sentado al fondo.",
    },
    motif: "desktop",
    featured: true,
  },
  {
    id: "smartcontrol",
    title: "SmartControl",
    description:
      "Proyecto en etapa inicial que explora cómo controlar un computador con Windows mediante gestos de la muñeca, usando un smartwatch con Wear OS.",
    highlights: [
      "Alcance inicial: modo presentación (avanzar y retroceder diapositivas) y modo multimedia (reproducir y pausar).",
      "Primera versión del reconocimiento basada en reglas sobre el giroscopio; aún no hay modelo de aprendizaje automático.",
      "Aplicación complementaria para Windows con una lista blanca de acciones permitidas, en construcción.",
    ],
    tags: ["Kotlin", "Wear OS", "C#", ".NET"],
    status: "etapa-inicial",
    repositories: [{ label: "Prototipo", url: "https://github.com/maajjjoo/smartwatch-vista" }],
    demo: {
      label: "Ver prototipo",
      url: "https://smartwatch-vista.vercel.app",
      note: "Prototipo interactivo de la interfaz del reloj en el navegador; la conexión con el computador es simulada.",
    },
    image: {
      src: "/images/projects/smartcontrol.jpg",
      alt: "Captura del prototipo de SmartControl: la pantalla redonda del reloj con los modos Presentación y Música, junto a los controles del prototipo.",
    },
    motif: "watch",
    featured: true,
  },
  {
    id: "studia",
    title: "Studia",
    description:
      "Aplicación de escritorio para organizar la vida académica: materias, horarios, tareas y sesiones de estudio con concentración.",
    highlights: [
      "Gestión de materias, horario de clases, tareas y calendario.",
      "Modo enfoque con temporizador Pomodoro y bloqueo de aplicaciones y sitios web en Windows.",
      "Asistente académico con IA a través de un backend que mantiene la clave de la API fuera de la app.",
    ],
    tags: ["Tauri", "React", "TypeScript", "Rust", "Vite", "Node.js", "Gemini"],
    status: "en-desarrollo",
    repositories: [
      { label: "App de escritorio", url: "https://github.com/maajjjoo/studia-frontend" },
      { label: "Backend", url: "https://github.com/maajjjoo/studia-backend" },
    ],
    demo: null,
    demoUnavailableReason: "Es una aplicación de escritorio para Windows; no tiene demo web.",
    motif: "desktop",
    featured: true,
  },
  {
    id: "pollystock",
    title: "PollyStock",
    description:
      "Aplicación móvil de gestión de inventario pensada para distintos tipos de negocio, con análisis asistido por IA.",
    highlights: [
      "Registro de productos con foto desde la galería o la cámara.",
      "Movimientos de entrada y salida de inventario.",
      "Alertas de stock bajo según un mínimo configurable.",
      "Asistente con IA (Gemini) para consultar el inventario, a través de un backend propio.",
    ],
    tags: ["React Native", "Expo", "TypeScript", "Node.js", "Express", "Prisma", "SQLite", "Gemini"],
    status: "en-desarrollo",
    repositories: [
      { label: "App móvil", url: "https://github.com/maajjjoo/pollystock-frontend" },
      { label: "Backend", url: "https://github.com/maajjjoo/pollystock-backend" },
    ],
    demo: null,
    demoUnavailableReason: "Es una aplicación móvil; todavía no tiene una versión pública para probar.",
    motif: "mobile",
    featured: true,
  },
  {
    id: "ai-code-tutor",
    title: "AI Code Tutor",
    description:
      "Tutor de programación asistido por IA, pensado para que los estudiantes entiendan los conceptos y lleguen a la solución por sí mismos en lugar de recibir la tarea resuelta.",
    highlights: [
      "Editor de código integrado en el navegador con Monaco Editor.",
      "Frontend en React y TypeScript; backend en Java con Spring Boot y PostgreSQL.",
    ],
    tags: ["React", "TypeScript", "Monaco Editor", "Java", "Spring Boot", "PostgreSQL"],
    status: "en-desarrollo",
    repositories: [{ label: "Frontend", url: "https://github.com/maajjjoo/ai-code-tutor-frontend" }],
    demo: {
      label: "Ver demo",
      url: "https://code-tutor-frontend.vercel.app",
      note: "Frontend publicado. Algunas funciones dependen del backend, que puede tardar en responder o no estar disponible.",
    },
    motif: "editor",
  },
];
