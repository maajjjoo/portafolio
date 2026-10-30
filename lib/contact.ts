/** Validación del formulario de contacto y lectura de su configuración. */

export interface ContactValues {
  name: string;
  email: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const FORMSPREE_PATTERN = /^https:\/\/formspree\.io\/f\/[A-Za-z0-9]+$/;

export const MESSAGE_MIN_LENGTH = 10;
export const MESSAGE_MAX_LENGTH = 5000;

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) errors.name = "Escribe tu nombre.";
  else if (name.length > 100) errors.name = "El nombre es demasiado largo (máximo 100 caracteres).";

  if (!email) errors.email = "Escribe tu correo electrónico.";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "Revisa el formato del correo, por ejemplo nombre@dominio.com.";

  if (!message) errors.message = "Escribe un mensaje.";
  else if (message.length < MESSAGE_MIN_LENGTH)
    errors.message = `El mensaje debe tener al menos ${MESSAGE_MIN_LENGTH} caracteres.`;
  else if (message.length > MESSAGE_MAX_LENGTH)
    errors.message = `El mensaje no puede superar los ${MESSAGE_MAX_LENGTH} caracteres.`;

  return errors;
}

/** Explica en español una respuesta de error del servicio, sin mostrar códigos ni su texto en inglés. */
export function contactErrorMessage(status: number): string {
  if (status === 429) return "Se han enviado demasiados mensajes en poco tiempo.";
  if (status >= 500) return "El servicio de envío no está disponible en este momento.";
  return "El servicio de envío rechazó el mensaje.";
}

/** Devuelve el endpoint de Formspree solo si tiene un formato válido. */
export function parseFormspreeEndpoint(value: string | undefined): string | null {
  const endpoint = value?.trim();
  return endpoint && FORMSPREE_PATTERN.test(endpoint) ? endpoint : null;
}
