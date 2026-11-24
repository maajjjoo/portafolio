/**
 * Testimonios. Solo deben publicarse testimonios reales, con permiso de
 * la persona. Para añadir uno, reemplaza una entrada "pendiente" por:
 *
 * {
 *   id: "nombre-apellido",
 *   status: "publicado",
 *   name: "Nombre Apellido",
 *   relationship: "Profesor de Interfaces de Software",
 *   quote: "Texto exacto que la persona aprobó.",
 *   photo: { src: "/images/testimonials/nombre.jpg", alt: "Foto de Nombre Apellido" }, // opcional
 * }
 */

export interface PublishedTestimonial {
  id: string;
  status: "publicado";
  name: string;
  /** Relación o rol, por ejemplo "Profesora" o "Compañero de clase". */
  relationship: string;
  quote: string;
  /** Foto autorizada. Si no hay, se muestran las iniciales. */
  photo?: { src: string; alt: string };
}

export interface PendingTestimonial {
  id: string;
  status: "pendiente";
  label: string;
}

export type Testimonial = PublishedTestimonial | PendingTestimonial;

// Los profesores autorizaron a sus estudiantes a publicar un testimonio a su nombre.
export const testimonials: Testimonial[] = [
  {
    id: "ivonne-barco",
    status: "publicado",
    name: "Ivonne Barco",
    relationship: "Docente, electiva de NestJS · Universidad Cooperativa de Colombia",
    quote:
      "María José lleva lo que vemos en clase a sus propios proyectos: sus backends en Node.js y TypeScript tienen una estructura ordenada y los conecta con aplicaciones reales. Es responsable con sus entregas.",
    photo: { src: "/images/testimonials/ivonne-barco.webp", alt: "Foto de Ivonne Barco" },
  },
  {
    id: "javier-mendieta",
    status: "publicado",
    name: "Javier Alexander Mendieta Ortega",
    relationship: "Docente de Arquitectura de Software y Computacional · Universidad Cooperativa de Colombia",
    quote:
      "María José es una estudiante dedicada y con ganas de aprender. Le interesa entender cómo encajan las partes de un sistema y tiene buena proyección como ingeniera de software.",
    photo: { src: "/images/testimonials/javier-mendieta.webp", alt: "Foto de Javier Alexander Mendieta Ortega" },
  },
  { id: "pendiente-3", status: "pendiente", label: "Testimonio 3, por grabar" },
];
