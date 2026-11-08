import type { CSSProperties } from "react";

import SectionHeading from "@/components/ui/SectionHeading";
import SemesterStatus from "@/components/ui/SemesterStatus";
import { sectionIds } from "@/config/navigation";
import { portfolio } from "@/config/portfolio";
import { skillCategories } from "@/data/skills";
import { getAcademicSnapshot } from "@/lib/academic";
import { formatSemester } from "@/lib/semester";

const mainTechnologies = skillCategories
  .flatMap((category) => category.skills)
  .map((skill) => skill.name)
  .slice(0, 10);

const revealDelay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

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
        <SectionHeading title="Aprendo haciendo proyectos" titleId="sobre-mi-titulo" />

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
              Todavía estoy en formación, así que cada proyecto es también una forma de aprender algo nuevo: una
              tecnología, una buena práctica o una manera distinta de resolver un problema.
            </p>
          </div>

          <div data-reveal style={revealDelay(150)} className="space-y-8">
            <dl id="sobre-mi-formacion" className="border-t border-line">
              {facts.map((fact) => (
                <div key={fact.label} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[9rem_1fr] sm:gap-4">
                  <dt className="label pt-1 text-muted">{fact.label}</dt>
                  <dd className="text-lg font-semibold">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <div id="sobre-mi-tecnologias">
              <h3 className="label mb-4 text-muted">Tecnologías que he usado</h3>
              <ul className="flex flex-wrap gap-2">
                {mainTechnologies.map((name) => (
                  <li
                    key={name}
                    className="rounded-lg border border-line px-3 py-1.5 text-sm transition-colors hover:border-accent hover:text-accent"
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
