import SectionHeading from "@/components/ui/SectionHeading";
import SemesterStatus from "@/components/ui/SemesterStatus";
import { sectionIds } from "@/config/navigation";
import { portfolio } from "@/config/portfolio";
import { skillCategories } from "@/data/skills";
import { getAcademicSnapshot } from "@/lib/academic";
import { formatSemester } from "@/lib/semester";

const mainTechnologies = skillCategories
  .flatMap((category) => category.skills)
  .filter((skill) => skill.level === "proyectos")
  .map((skill) => skill.name)
  .slice(0, 10);

export default async function About() {
  const { semester } = await getAcademicSnapshot();

  const facts = [
    { label: "Carrera", value: portfolio.academic.degree },
    { label: "Universidad", value: portfolio.university },
    { label: "Semestre actual", value: <SemesterStatus result={semester} /> },
    ...(portfolio.location ? [{ label: "Ubicación", value: portfolio.location }] : []),
  ];

  return (
    <section id={sectionIds.about} aria-labelledby="sobre-mi-titulo" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <SectionHeading index="01" eyebrow="Sobre mí" title="Aprendo construyendo cosas útiles" titleId="sobre-mi-titulo" />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="space-y-5 text-lg leading-relaxed">
            <p>
              Soy María José, estudiante de {portfolio.academic.degree} en la {portfolio.university}. Actualmente
              curso el {formatSemester(semester.semester)}.
            </p>
            <p className="text-muted">
              Me interesa el desarrollo de interfaces, la construcción de APIs y la integración de herramientas de
              inteligencia artificial en aplicaciones que de verdad ayuden a alguien. Son temas que he explorado en
              mis proyectos académicos y personales, tanto en web como en móvil y escritorio.
            </p>
            <p className="text-muted">
              Todavía estoy en formación, así que cada proyecto es también una forma de aprender algo nuevo: una
              tecnología, una buena práctica o una manera distinta de resolver un problema.
            </p>
          </div>

          <div className="space-y-6">
            <dl className="divide-y divide-line rounded-[var(--radius-card)] border border-line bg-surface shadow-card">
              {facts.map((fact) => (
                <div key={fact.label} className="grid gap-1 px-6 py-4 sm:grid-cols-[8.5rem_1fr] sm:gap-4">
                  <dt className="font-mono text-xs tracking-wide text-muted uppercase sm:pt-1">{fact.label}</dt>
                  <dd className="font-semibold">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <div>
              <h3 className="mb-3 font-mono text-xs tracking-wide text-muted uppercase">Tecnologías que he usado</h3>
              <ul className="flex flex-wrap gap-2">
                {mainTechnologies.map((name) => (
                  <li key={name} className="rounded-full border border-line px-3 py-1 text-sm">
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
