/**
 * La colección de discos. Cada álbum es una sección del portafolio.
 * El orden (`order`) sigue el orden de las secciones que pide la entrega.
 * Este archivo solo describe los álbumes; el contenido de cada uno está en
 * components/sections y se asocia por `slug` en components/album/AlbumContent.tsx.
 */

import { projects, projectStatusLabels } from "./projects.ts";
import { skillCategories } from "./skills.ts";

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

export interface AlbumTrack {
  title: string;
  /** `id` del elemento al que lleva la pista. Debe ser único en toda la colección. */
  anchor: string;
  /** Dato breve junto al título (por ejemplo, el estado de un proyecto). */
  note?: string;
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
  /** Lista de canciones: lo que encontrarás dentro, enlazado a cada parte. */
  tracks: AlbumTrack[];
  cover: AlbumCover;
}

const palette = {
  cream: "#e9dcc4",
  burgundy: "#6e2f1c",
  charcoal: "#1a1512",
  green: "#3f4f3a",
  gold: "#d2a04f",
  rose: "#d9976a",
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
    tracks: [
      { title: "Presentación", anchor: "hero-titulo" },
      { title: "Perfil académico", anchor: "bienvenida-perfil" },
      { title: "Descargar CV", anchor: "bienvenida-cv" },
      { title: "Redes", anchor: "bienvenida-redes" },
    ],
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
    tracks: [
      { title: "Introducción", anchor: "sobre-mi-titulo" },
      { title: "Formación", anchor: "sobre-mi-formacion" },
      { title: "Intereses", anchor: "sobre-mi-intereses" },
      { title: "Tecnologías", anchor: "sobre-mi-tecnologias" },
    ],
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
    tracks: projects.map((project) => ({
      title: project.title,
      anchor: `proyecto-${project.id}`,
      note: projectStatusLabels[project.status],
    })),
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
    description: "Testimonios de profesores y compañeros, a medida que los voy reuniendo.",
    tracks: [
      { title: "Testimonio 1", anchor: "testimonio-1" },
      { title: "Testimonio 2", anchor: "testimonio-2" },
      { title: "Testimonio 3", anchor: "testimonio-3" },
    ],
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
    description: "Mis estudios y, cuando la tenga, mi experiencia laboral.",
    tracks: [
      { title: "Experiencia académica", anchor: "experiencia-academica" },
      { title: "Experiencia profesional", anchor: "experiencia-profesional" },
    ],
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
    tracks: [
      { title: "Correo", anchor: "contacto-correo" },
      { title: "GitHub", anchor: "contacto-github" },
      { title: "LinkedIn", anchor: "contacto-linkedin" },
      { title: "Formulario", anchor: "contacto-formulario" },
    ],
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
    description: "Las tecnologías que he utilizado en mis proyectos.",
    tracks: skillCategories.map((category) => ({ title: category.title, anchor: `skills-${category.id}` })),
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
    tracks: [
      { title: "Catálogo", anchor: "creditos-catalogo" },
      { title: "Ficha técnica", anchor: "creditos-ficha" },
      { title: "Redes", anchor: "creditos-redes" },
      { title: "Derechos", anchor: "creditos-derechos" },
    ],
    cover: { motif: "back-cover", background: palette.cream, foreground: palette.charcoal, accent: palette.burgundy },
  },
];
