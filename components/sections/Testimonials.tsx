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
  const hasPending = testimonials.some((item) => item.status === "pendiente");

  let intro = "Comentarios de profesores y compañeros con quienes he compartido clases o proyectos.";
  if (!hasPublished) intro = "Todavía estoy reuniendo testimonios de profesores y compañeros. Cuando los tenga, aparecerán aquí.";
  else if (hasPending) intro += " Sigo reuniendo más.";

  return (
    <section id={sectionIds.testimonials} aria-labelledby="testimonios-titulo">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
        <SectionHeading
          title="Lo que dicen profesores y compañeros"
          titleId="testimonios-titulo"
          intro={intro}
        />

        <ul className="grid overflow-hidden rounded-2xl border border-line md:grid-cols-3">
          {testimonials.map((item, index) => (
            <li
              key={item.id}
              id={`testimonio-${index + 1}`}
              data-reveal
              style={{ "--reveal-delay": `${index * 120}ms` } as CSSProperties}
              className="flex border-b border-line last:border-b-0 md:border-r md:border-b-0 md:last:border-r-0"
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
    <figure className="flex w-full flex-col px-5 py-8 md:px-8">
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
    <div className="flex w-full flex-col px-5 py-8 md:px-8">
      <span aria-hidden="true" className="font-display text-7xl leading-none text-line">
        “
      </span>
      <p className="mt-2 font-display text-2xl text-muted italic">{item.label}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Aquí irá la opinión de un profesor o compañero, con su nombre y su permiso.
      </p>
    </div>
  );
}
