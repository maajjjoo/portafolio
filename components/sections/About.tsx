import type { CSSProperties } from "react";

import SectionHeading from "@/components/ui/SectionHeading";
import SemesterStatus from "@/components/ui/SemesterStatus";
import { sectionIds } from "@/config/navigation";
import { portfolio } from "@/config/portfolio";
import { getAcademicSnapshot } from "@/lib/academic";
import { formatSemester } from "@/lib/semester";

const revealDelay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

// Datos extra, fuera de la carrera. Solo lo que María José contó; amplíalo con sus palabras.
const likes = [
  { name: "Música", text: "Escucho de todo. No me quedo con un solo género." },
  { name: "Moda", text: "Me gusta mucho la moda; para mí también es una forma de expresarse." },
  { name: "Series", text: "Ver series es de las cosas que más disfruto para desconectarme." },
];

export default async function About() {
  const { semester } = await getAcademicSnapshot();

  const facts = [
    { label: "Carrera", value: portfolio.academic.degree },
    { label: "Universidad", value: portfolio.university },
    { label: "Semestre actual", value: <SemesterStatus result={semester} /> },
    ...(portfolio.location ? [{ label: "Ubicación", value: portfolio.location }] : []),
  ];

  return (
    <section id={sectionIds.about} aria-labelledby="sobre-mi-titulo">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
        <SectionHeading title="Un poco más de mí" titleId="sobre-mi-titulo" />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16">
          <div data-reveal className="space-y-6 text-lg leading-relaxed">
            <p className="font-display text-3xl leading-snug sm:text-4xl">
              Soy María José, estudiante de {portfolio.academic.degree} en la {portfolio.university}. Actualmente curso
              el <span className="text-accent italic">{formatSemester(semester.semester)}</span>.
            </p>
            <p id="sobre-mi-intereses" className="text-muted">
              Me interesan las interfaces, el backend y cómo usar la inteligencia artificial dentro de aplicaciones
              que le sirvan a alguien. Los he ido probando en proyectos de clase y personales, en web, en móvil y en
              escritorio.
            </p>
            <p className="text-muted">
              Todavía estoy en formación, así que cada proyecto es también una forma de aprender algo nuevo.
            </p>
          </div>

          <dl id="sobre-mi-formacion" data-reveal style={revealDelay(150)} className="self-start border-t border-line">
            {facts.map((fact) => (
              <div key={fact.label} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[9rem_1fr] sm:gap-4">
                <dt className="label pt-1 text-muted">{fact.label}</dt>
                <dd className="text-lg font-semibold">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Datos extra: lo que me gusta fuera de clase. */}
        <div id="sobre-mi-gustos" data-reveal className="mt-16 border-t border-line pt-10">
          <h3 className="font-display text-2xl">Fuera de clase</h3>
          <ul className="mt-6 grid gap-8 sm:grid-cols-3">
            {likes.map((like) => (
              <li key={like.name}>
                <p className="font-semibold">{like.name}</p>
                <p className="mt-1 leading-relaxed text-muted">{like.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
