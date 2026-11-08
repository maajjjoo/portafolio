/**
 * Fuente única de verdad para la información personal del portafolio.
 * Cualquier componente que muestre estos datos debe leerlos desde aquí.
 */

export interface SocialLink {
  label: string;
  href: string;
}

export interface PortfolioConfig {
  fullName: string;
  shortName: string;
  initials: string;
  title: string;
  /** Nombre de la colección: un detalle del pie y los créditos; la identidad del sitio es el nombre propio. */
  libraryTitle: string;
  email: string;
  /** Ciudad o país a mostrar. Déjalo en `null` si prefieres no publicarlo. */
  location: string | null;
  social: {
    github: SocialLink;
    linkedin: SocialLink;
  };
  university: string;
  academic: {
    degree: string;
    /** Zona horaria usada para saber en qué año estamos. */
    timeZone: string;
  };
}

export const portfolio: PortfolioConfig = {
  fullName: "María José De La Cruz Madroñero",
  shortName: "María José De La Cruz",
  initials: "MJ",
  title: "Estudiante de Ingeniería de Software",
  libraryTitle: "The Vinyl Archive",
  email: "majose2006@gmail.com",
  location: null,
  social: {
    github: {
      label: "GitHub",
      href: "https://github.com/maajjjoo",
    },
    linkedin: {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/mar%C3%ADa-jos%C3%A9-de-la-cruz-855440409/",
    },
  },
  university: "Universidad Cooperativa de Colombia",
  academic: {
    degree: "Ingeniería de Software",
    timeZone: "America/Bogota",
  },
};
