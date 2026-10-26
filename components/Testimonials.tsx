import Image from "next/image";

import { QuoteIcon } from "@/components/ui/Icons";
import SectionHeading from "@/components/ui/SectionHeading";
import { sectionIds } from "@/config/navigation";
import { testimonials, type PendingTestimonial, type PublishedTestimonial } from "@/data/testimonials";

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

export default function Testimonials() {
  const hasPublished = testimonials.some((item) => item.status === "publicado");

  return (
    <section id={sectionIds.testimonials} aria-labelledby="testimonios-titulo" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <SectionHeading
          index="03"
          eyebrow="Testimonios"
          title="Lo que dicen quienes han trabajado conmigo"
          titleId="testimonios-titulo"
          intro={
            hasPublished
              ? "Comentarios de profesores y compañeros con quienes he trabajado."
              : "Todavía estoy reuniendo testimonios de profesores y compañeros. Cuando los tenga, aparecerán aquí."
          }
        />

        <ul className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <li key={item.id} className="flex">
              {item.status === "publicado" ? <TestimonialCard item={item} /> : <PendingCard item={item} />}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function TestimonialCard({ item }: { item: PublishedTestimonial }) {
  return (
    <figure className="flex w-full flex-col rounded-[var(--radius-card)] border border-line bg-surface p-7 shadow-card">
      <QuoteIcon className="text-accent" width={28} height={28} />
      <blockquote className="mt-4 flex-1 font-display text-xl leading-snug">{item.quote}</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        {item.photo ? (
          <Image src={item.photo.src} alt={item.photo.alt} width={44} height={44} className="size-11 rounded-full object-cover" />
        ) : (
          <span aria-hidden="true" className="grid size-11 place-items-center rounded-full bg-ink font-semibold text-bg">
            {initialsOf(item.name)}
          </span>
        )}
        <span>
          <span className="block font-semibold">{item.name}</span>
          <span className="block text-sm text-muted">{item.relationship}</span>
        </span>
      </figcaption>
    </figure>
  );
}

function PendingCard({ item }: { item: PendingTestimonial }) {
  return (
    <div className="flex w-full flex-col rounded-[var(--radius-card)] border border-dashed border-line p-7">
      <QuoteIcon className="text-line" width={28} height={28} />
      <p className="mt-4 font-display text-xl text-muted">{item.label}</p>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        Espacio reservado para un testimonio real. Aún no se ha publicado ninguno.
      </p>
      <div aria-hidden="true" className="mt-6 flex items-center gap-3">
        <span className="size-11 rounded-full border border-dashed border-line" />
        <span className="space-y-2">
          <span className="block h-2 w-24 rounded-full bg-surface-2" />
          <span className="block h-2 w-16 rounded-full bg-surface-2" />
        </span>
      </div>
    </div>
  );
}
