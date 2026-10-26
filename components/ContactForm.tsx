"use client";

import { useRef, useState, type FormEvent } from "react";

import { validateContact, type ContactErrors, type ContactValues } from "@/lib/contact";

type Status = "idle" | "sending" | "success" | "error";

interface ContactFormProps {
  /** Endpoint de Formspree; `null` si el formulario aún no está configurado. */
  endpoint: string | null;
  fallbackEmail: string;
}

const emptyValues: ContactValues = { name: "", email: "", message: "" };

const fields: { name: keyof ContactValues; label: string; type: "text" | "email" | "textarea"; autoComplete?: string }[] = [
  { name: "name", label: "Nombre", type: "text", autoComplete: "name" },
  { name: "email", label: "Correo electrónico", type: "email", autoComplete: "email" },
  { name: "message", label: "Mensaje", type: "textarea" },
];

export default function ContactForm({ endpoint, fallbackEmail }: ContactFormProps) {
  const [values, setValues] = useState<ContactValues>(emptyValues);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const configured = endpoint !== null;

  function update(name: keyof ContactValues, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
    if (status === "success" || status === "error") setStatus("idle");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!endpoint || status === "sending") return;

    const found = validateContact(values);
    setErrors(found);
    const firstInvalid = fields.find((field) => found[field.name]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid.name}"]`)?.focus();
      return;
    }

    const honeypot = new FormData(event.currentTarget).get("_gotcha");
    setStatus("sending");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
          _subject: `Nuevo mensaje del portafolio de ${values.name.trim()}`,
          _gotcha: honeypot ?? "",
        }),
      });

      if (!response.ok) {
        const data: unknown = await response.json().catch(() => null);
        const detail =
          data && typeof data === "object" && "errors" in data && Array.isArray(data.errors)
            ? data.errors.map((item: { message?: string }) => item.message).filter(Boolean).join(" ")
            : "";
        throw new Error(detail || `El servicio respondió con el código ${response.status}.`);
      }

      setValues(emptyValues);
      setStatus("success");
    } catch (error) {
      setErrorMessage(error instanceof Error && error.message ? error.message : "No se pudo conectar con el servicio.");
      setStatus("error");
    }
  }

  const inputClass = (invalid: boolean) =>
    `w-full rounded-xl border bg-bg px-4 py-3 text-base text-ink placeholder:text-muted/70 transition-colors focus:border-accent focus:outline-none focus-visible:outline-2 disabled:cursor-not-allowed disabled:opacity-60 ${
      invalid ? "border-accent" : "border-line"
    }`;

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      aria-labelledby="formulario-titulo"
      className="rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-card sm:p-8"
    >
      <h3 id="formulario-titulo" className="font-display text-2xl font-medium">
        Escríbeme
      </h3>

      {!configured ? (
        <p role="note" className="mt-4 rounded-xl border border-dashed border-line bg-surface-2 px-4 py-3 text-sm leading-relaxed">
          El formulario todavía no está conectado a un servicio de envío, así que por ahora no puede mandar mensajes.
          Mientras tanto, escríbeme directamente a{" "}
          <a href={`mailto:${fallbackEmail}`} className="font-semibold underline decoration-accent underline-offset-4">
            {fallbackEmail}
          </a>
          .
        </p>
      ) : null}

      <fieldset disabled={!configured || status === "sending"} className="mt-6 space-y-5">
        <legend className="sr-only">Datos del mensaje</legend>
        {fields.map((field) => {
          const error = errors[field.name];
          const id = `contacto-${field.name}`;
          const common = {
            id,
            name: field.name,
            value: values[field.name],
            required: true,
            "aria-invalid": error ? true : undefined,
            "aria-describedby": error ? `${id}-error` : undefined,
            className: inputClass(Boolean(error)),
          } as const;

          return (
            <div key={field.name}>
              <label htmlFor={id} className="mb-2 block text-sm font-semibold">
                {field.label} <span aria-hidden="true" className="text-accent">*</span>
              </label>
              {field.type === "textarea" ? (
                <textarea {...common} rows={5} onChange={(event) => update(field.name, event.target.value)} />
              ) : (
                <input
                  {...common}
                  type={field.type}
                  autoComplete={field.autoComplete}
                  inputMode={field.type === "email" ? "email" : undefined}
                  onChange={(event) => update(field.name, event.target.value)}
                />
              )}
              {error ? (
                <p id={`${id}-error`} className="mt-2 text-sm font-medium text-accent">
                  {error}
                </p>
              ) : null}
            </div>
          );
        })}

        {/* Campo trampa para bots: los usuarios no lo ven. */}
        <div aria-hidden="true" className="hidden">
          <label htmlFor="contacto-gotcha">No llenar</label>
          <input id="contacto-gotcha" type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
        </div>

        <p className="text-xs text-muted">
          <span aria-hidden="true" className="text-accent">*</span> Todos los campos son obligatorios.
        </p>

        <button
          type="submit"
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 font-semibold text-on-accent transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {status === "sending" ? (
            <>
              <span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Enviando…
            </>
          ) : (
            "Enviar mensaje"
          )}
        </button>
      </fieldset>

      <div aria-live="polite" className="mt-5">
        {status === "success" ? (
          <p role="status" className="rounded-xl bg-academic-soft px-4 py-3 text-sm font-semibold text-academic">
            ¡Gracias! Tu mensaje se envió correctamente. Te responderé lo antes posible.
          </p>
        ) : null}
        {status === "error" ? (
          <p role="alert" className="rounded-xl bg-accent-soft px-4 py-3 text-sm text-accent">
            <strong>No se pudo enviar el mensaje.</strong> {errorMessage} Inténtalo de nuevo o escríbeme a{" "}
            <a href={`mailto:${fallbackEmail}`} className="font-semibold underline underline-offset-4">
              {fallbackEmail}
            </a>
            .
          </p>
        ) : null}
      </div>
    </form>
  );
}
