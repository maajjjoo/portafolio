/** IDs de sección usados por la navegación, el pie de página y las anclas. */
export const sectionIds = {
  hero: "inicio",
  about: "sobre-mi",
  projects: "proyectos",
  testimonials: "testimonios",
  experience: "experiencia",
  contact: "contacto",
  skills: "habilidades",
} as const;

export type SectionId = (typeof sectionIds)[keyof typeof sectionIds];

export interface NavItem {
  id: SectionId;
  label: string;
}

/** En el mismo orden en que aparecen las secciones en la página. */
export const navItems: NavItem[] = [
  { id: sectionIds.about, label: "Sobre mí" },
  { id: sectionIds.projects, label: "Proyectos" },
  { id: sectionIds.testimonials, label: "Testimonios" },
  { id: sectionIds.experience, label: "Experiencia" },
  { id: sectionIds.contact, label: "Contacto" },
  { id: sectionIds.skills, label: "Habilidades" },
];
