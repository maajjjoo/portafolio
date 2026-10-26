/**
 * La colección de discos. Cada álbum es una sección del portafolio.
 * El orden (`order`) sigue el orden de las secciones que pide la entrega.
 * Este archivo solo describe los álbumes; el contenido de cada uno está en
 * components/sections y se asocia por `slug` en components/album/AlbumContent.tsx.
 */

export const albumSlugs = [
  "bienvenida",
  "sobre-mi",
  "proyectos",
  "testimonios",
  "experiencia",
  "contacto",
  "habilidades",
  "creditos",
] as const;

export type AlbumSlug = (typeof albumSlugs)[number];

export type AlbumCategory = "Presentación" | "Trabajo" | "Personas" | "Trayectoria" | "Contacto" | "Extras";

export type CoverMotif = "monogram" | "portrait" | "grid" | "quotes" | "timeline" | "waves" | "rings" | "back-cover";

export interface AlbumCover {
  motif: CoverMotif;
  /** Colores fijos de la portada (no cambian con el tema). */
  background: string;
  foreground: string;
  accent: string;
}

export interface Album {
  slug: AlbumSlug;
  order: number;
  /** Número de catálogo impreso en la funda y en la etiqueta del disco. */
  catalog: string;
  side: "A" | "B";
  /** Título artístico del álbum. */
  title: string;
  /** Nombre de la sección del portafolio que contiene. */
  section: string;
  category: AlbumCategory;
  description: string;
  /** Lista de canciones decorativa: lo que encontrarás dentro. */
  tracks: string[];
  cover: AlbumCover;
}

const palette = {
  cream: "#efe3d3",
  burgundy: "#7b1e34",
  charcoal: "#1b1416",
  green: "#3f5a48",
  gold: "#c9a46a",
  rose: "#e8a3b0",
} as const;

export const albums: Album[] = [
  {
    slug: "bienvenida",
    order: 1,
    catalog: "MJ-001",
    side: "A",
    title: "Hola, mundo",
    section: "Bienvenida",
    category: "Presentación",
    description: "Quién soy en pocas palabras, mi perfil y mi CV.",
    tracks: ["Presentación", "Perfil académico", "Descargar CV", "Redes"],
    cover: { motif: "monogram", background: palette.burgundy, foreground: palette.cream, accent: palette.gold },
  },
  {
    slug: "sobre-mi",
    order: 2,
    catalog: "MJ-002",
    side: "A",
    title: "Quién soy",
    section: "Sobre mí",
    category: "Presentación",
    description: "Mi formación, lo que me interesa del desarrollo y las tecnologías que he usado.",
    tracks: ["Introducción", "Formación", "Intereses", "Tecnologías"],
    cover: { motif: "portrait", background: palette.cream, foreground: palette.charcoal, accent: palette.burgundy },
  },
  {
    slug: "proyectos",
    order: 3,
    catalog: "MJ-003",
    side: "A",
    title: "Repositorio",
    section: "Proyectos",
    category: "Trabajo",
    description: "Las aplicaciones que he construido, con su estado real y sus enlaces.",
    tracks: ["AI Code Tutor", "PollyStock", "Studia", "SmartControl"],
    cover: { motif: "grid", background: palette.charcoal, foreground: palette.cream, accent: palette.rose },
  },
  {
    slug: "testimonios",
    order: 4,
    catalog: "MJ-004",
    side: "A",
    title: "Otras voces",
    section: "Testimonios",
    category: "Personas",
    description: "Lo que dicen profesores y compañeros que han trabajado conmigo.",
    tracks: ["Testimonio 1", "Testimonio 2", "Testimonio 3"],
    cover: { motif: "quotes", background: palette.cream, foreground: palette.burgundy, accent: palette.green },
  },
  {
    slug: "experiencia",
    order: 5,
    catalog: "MJ-005",
    side: "B",
    title: "Línea de tiempo",
    section: "Experiencia",
    category: "Trayectoria",
    description: "Mi trayectoria académica y profesional, de lo más reciente a lo más antiguo.",
    tracks: ["Experiencia académica", "Experiencia profesional"],
    cover: { motif: "timeline", background: palette.green, foreground: palette.cream, accent: palette.gold },
  },
  {
    slug: "contacto",
    order: 6,
    catalog: "MJ-006",
    side: "B",
    title: "Escríbeme",
    section: "Contacto",
    category: "Contacto",
    description: "Correo, redes y un formulario para enviarme un mensaje.",
    tracks: ["Correo", "GitHub", "LinkedIn", "Formulario"],
    cover: { motif: "waves", background: palette.burgundy, foreground: palette.rose, accent: palette.cream },
  },
  {
    slug: "habilidades",
    order: 7,
    catalog: "MJ-007",
    side: "B",
    title: "Stack",
    section: "Habilidades",
    category: "Extras",
    description: "Las tecnologías que he usado en proyectos y las que estoy aprendiendo.",
    tracks: ["Lenguajes", "Frontend", "Backend", "Móvil y escritorio", "Bases de datos", "Herramientas"],
    cover: { motif: "rings", background: palette.charcoal, foreground: palette.gold, accent: palette.burgundy },
  },
  {
    slug: "creditos",
    order: 8,
    catalog: "MJ-008",
    side: "B",
    title: "Créditos finales",
    section: "Créditos",
    category: "Extras",
    description: "La contraportada: cómo está hecho este sitio, redes y derechos.",
    tracks: ["Catálogo", "Ficha técnica", "Redes", "Derechos"],
    cover: { motif: "back-cover", background: palette.cream, foreground: palette.charcoal, accent: palette.burgundy },
  },
];
