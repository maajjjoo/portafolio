import Image from "next/image";
import type { CSSProperties } from "react";

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
    <section id={sectionIds.testimonials} aria-labelledby="testimonios-titulo" className="bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
        <SectionHeading
          title="Palabras de quienes han trabajado conmigo"
          titleId="testimonios-titulo"
          intro={
            hasPublished
              ? "Comentarios de profesores y compañeros con quienes he trabajado."
              : "Todavía estoy reuniendo testimonios de profesores y compañeros. Cuando los tenga, aparecerán aquí."
          }
        />

        <ul className="grid border-t border-line md:grid-cols-3 md:border-t-0 md:border-l">
          {testimonials.map((item, index) => (
            <li
              key={item.id}
              data-reveal
              style={{ "--reveal-delay": `${index * 120}ms` } as CSSProperties}
              className="flex border-b border-line md:border-r md:border-b-0"
            >
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
    <figure className="flex w-full flex-col px-2 py-8 md:px-8">
      <span aria-hidden="true" className="font-display text-7xl leading-none text-accent">
        “
      </span>
      <blockquote className="mt-2 flex-1 font-display text-2xl leading-snug">{item.quote}</blockquote>
      <figcaption className="mt-8 flex items-center gap-3">
        {item.photo ? (
          <Image src={item.photo.src} alt={item.photo.alt} width={44} height={44} className="size-11 rounded-full object-cover" />
        ) : (
          <span aria-hidden="true" className="grid size-11 place-items-center rounded-full bg-wine font-semibold text-on-wine">
            {initialsOf(item.name)}
          </span>
        )}
        <span>
          <span className="label block text-ink">{item.name}</span>
          <span className="mt-1 block text-sm text-muted">{item.relationship}</span>
        </span>
      </figcaption>
    </figure>
  );
}

function PendingCard({ item }: { item: PendingTestimonial }) {
  return (
    <div className="flex w-full flex-col px-2 py-8 md:px-8">
      <span aria-hidden="true" className="font-display text-7xl leading-none text-line">
        “
      </span>
      <p className="mt-2 font-display text-2xl text-muted italic">{item.label}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
        Espacio reservado para un testimonio real. Aún no se ha publicado ninguno.
      </p>
      <div aria-hidden="true" className="mt-8 flex items-center gap-3">
        <span className="size-11 rounded-full border border-dashed border-line" />
        <span className="space-y-2">
          <span className="block h-2 w-24 rounded-full bg-surface-2" />
          <span className="block h-2 w-16 rounded-full bg-surface-2" />
        </span>
      </div>
    </div>
  );
}
