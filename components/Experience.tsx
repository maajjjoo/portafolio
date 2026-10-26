import SectionHeading from "@/components/ui/SectionHeading";
import SemesterStatus from "@/components/ui/SemesterStatus";
import { sectionIds } from "@/config/navigation";
import { experience, experienceTypeLabels, type ExperienceItem, type ExperienceType } from "@/data/experience";
import { getAcademicSnapshot } from "@/lib/academic";
import type { SemesterResult } from "@/lib/semester";

const monthFormatter = new Intl.DateTimeFormat("es-CO", { month: "short", year: "numeric", timeZone: "UTC" });

function formatMonth(value: string) {
  const [year, month] = value.split("-").map(Number);
  return monthFormatter.format(new Date(Date.UTC(year, month - 1, 1)));
}

function formatPeriod(item: ExperienceItem) {
  const start = item.startDate ? formatMonth(item.startDate) : "Inicio por confirmar";
  const end = item.isCurrent ? "Actualidad" : item.endDate ? formatMonth(item.endDate) : "Fin por confirmar";
  return `${start} — ${end}`;
}

/** Más reciente primero: lo actual arriba, luego por fecha de fin o inicio. */
function sortKey(item: ExperienceItem) {
  if (item.isCurrent) return "9999-99";
  return item.endDate ?? item.startDate ?? "0000-00";
}

const typeStyles: Record<ExperienceType, { dot: string; badge: string }> = {
  academica: { dot: "bg-academic", badge: "bg-academic-soft text-academic" },
  profesional: { dot: "bg-accent", badge: "bg-accent-soft text-accent" },
};

export default async function Experience() {
  const { semester } = await getAcademicSnapshot();
  const items = [...experience].sort((a, b) => sortKey(b).localeCompare(sortKey(a)));
  const hasProfessional = items.some((item) => item.type === "profesional");

  return (
    <section id={sectionIds.experience} aria-labelledby="experiencia-titulo" className="border-t border-line bg-surface-2/40">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <SectionHeading
          index="04"
          eyebrow="Experiencia"
          title="Trayectoria académica y profesional"
          titleId="experiencia-titulo"
        />

        <ul className="mb-10 flex flex-wrap gap-3" aria-label="Leyenda">
          {(Object.keys(experienceTypeLabels) as ExperienceType[]).map((type) => (
            <li key={type} className={`rounded-full px-3 py-1 font-mono text-xs uppercase ${typeStyles[type].badge}`}>
              {experienceTypeLabels[type]}
            </li>
          ))}
        </ul>

        <ol className="relative max-w-3xl border-l border-line pl-8 sm:pl-10">
          {items.map((item) => (
            <TimelineItem key={item.id} item={item} semester={semester} />
          ))}

          {!hasProfessional ? (
            <li className="relative">
              <span
                aria-hidden="true"
                className="absolute top-2 -left-[calc(2rem+5px)] size-2.5 rounded-full border-2 border-accent bg-bg sm:-left-[calc(2.5rem+5px)]"
              />
              <div className="rounded-[var(--radius-card)] border border-dashed border-line p-6">
                <span className={`rounded-full px-3 py-1 font-mono text-xs uppercase ${typeStyles.profesional.badge}`}>
                  {experienceTypeLabels.profesional}
                </span>
                <h3 className="mt-4 font-display text-2xl font-medium">Experiencia profesional pendiente</h3>
                <p className="mt-2 leading-relaxed text-muted">
                  Todavía no tengo experiencia laboral en desarrollo de software para mostrar aquí. Mientras tanto,
                  puedes ver mi trabajo en la sección de{" "}
                  <a href={`#${sectionIds.projects}`} className="font-semibold text-ink underline decoration-accent underline-offset-4">
                    proyectos
                  </a>
                  .
                </p>
              </div>
            </li>
          ) : null}
        </ol>
      </div>
    </section>
  );
}

function TimelineItem({ item, semester }: { item: ExperienceItem; semester: SemesterResult }) {
  const styles = typeStyles[item.type];

  return (
    <li className="relative pb-10">
      <span
        aria-hidden="true"
        className={`absolute top-2 -left-[calc(2rem+5px)] size-2.5 rounded-full ring-4 ring-bg sm:-left-[calc(2.5rem+5px)] ${styles.dot}`}
      />
      <article className="rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-card">
        <div className="flex flex-wrap items-center gap-3">
          <span className={`rounded-full px-3 py-1 font-mono text-xs uppercase ${styles.badge}`}>
            {experienceTypeLabels[item.type]}
          </span>
          <span className="font-mono text-xs text-muted">{formatPeriod(item)}</span>
        </div>
        <h3 className="mt-4 font-display text-2xl font-medium">{item.title}</h3>
        <p className="text-muted">{item.organization}</p>
        <p className="mt-3 leading-relaxed">{item.description}</p>
        {item.showCurrentSemester ? (
          <p className="mt-4 rounded-xl bg-surface-2 px-4 py-3 text-sm font-semibold">
            Semestre actual: <SemesterStatus result={semester} />
          </p>
        ) : null}
      </article>
    </li>
  );
}
