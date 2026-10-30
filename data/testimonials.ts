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

export const testimonials: Testimonial[] = [
  { id: "pendiente-1", status: "pendiente", label: "Testimonio 1, por grabar" },
  { id: "pendiente-2", status: "pendiente", label: "Testimonio 2, por grabar" },
  { id: "pendiente-3", status: "pendiente", label: "Testimonio 3, por grabar" },
];
