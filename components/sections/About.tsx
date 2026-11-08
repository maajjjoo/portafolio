import type { CSSProperties } from "react";

import SectionHeading from "@/components/ui/SectionHeading";
import { sectionIds } from "@/config/navigation";
import { portfolio } from "@/config/portfolio";

const revealDelay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

// Lo que me gusta fuera de la carrera. Solo lo que María José contó; amplíalo con sus palabras.
const likes = [
  { id: "sobre-mi-musica", name: "Música", text: "Escucho de todo. No me quedo con un solo género." },
  { id: "sobre-mi-moda", name: "Moda", text: "Me gusta mucho la moda; para mí también es una forma de expresarse." },
  { id: "sobre-mi-series", name: "Series", text: "Ver series es de las cosas que más disfruto para desconectarme." },
];

export default function About() {
  return (
    <section id={sectionIds.about} aria-labelledby="sobre-mi-titulo">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
        <SectionHeading title="Un poco más de mí" titleId="sobre-mi-titulo" />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16">
          <p data-reveal className="font-display text-3xl leading-snug text-balance sm:text-4xl">
            Soy {portfolio.shortName.split(" ").slice(0, 2).join(" ")}. Además de estudiar, esto es lo que me gusta.
          </p>

          <ul data-reveal style={revealDelay(150)} className="border-t border-line">
            {likes.map((like) => (
              <li
                key={like.id}
                id={like.id}
                className="grid gap-2 border-b border-line py-6 sm:grid-cols-[10rem_1fr] sm:items-baseline sm:gap-6"
              >
                <h3 className="font-display text-3xl">{like.name}</h3>
                <p className="text-lg leading-relaxed text-muted">{like.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
