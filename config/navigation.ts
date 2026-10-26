/**
 * IDs de las secciones dentro de cada álbum. Sirven para enlazar a una parte
 * concreta (por ejemplo /album/proyectos#proyectos) y para los lectores de pantalla.
 * La navegación entre secciones se hace con los álbumes (data/albums.ts).
 */
export const sectionIds = {
  hero: "inicio",
  about: "sobre-mi",
  projects: "proyectos",
  testimonials: "testimonios",
  experience: "experiencia",
  contact: "contacto",
  skills: "habilidades",
  credits: "creditos",
} as const;

export type SectionId = (typeof sectionIds)[keyof typeof sectionIds];
