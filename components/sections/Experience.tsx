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
  academica: { dot: "bg-gold", badge: "bg-gold-soft text-gold" },
  profesional: { dot: "bg-wine", badge: "bg-accent-soft text-accent" },
};

export default async function Experience() {
  const { semester } = await getAcademicSnapshot();
  const items = [...experience].sort((a, b) => sortKey(b).localeCompare(sortKey(a)));
  const hasProfessional = items.some((item) => item.type === "profesional");

  return (
    <section id={sectionIds.experience} aria-labelledby="experiencia-titulo">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
        <SectionHeading
          index="04"
          eyebrow="Experiencia"
          title="Trayectoria académica y profesional"
          titleId="experiencia-titulo"
          intro="Ordenada de lo más reciente a lo más antiguo."
        />

        <div className="grid gap-10 lg:grid-cols-[14rem_minmax(0,1fr)]">
          <ul data-reveal className="flex flex-wrap gap-3 lg:flex-col lg:items-start" aria-label="Leyenda">
            {(Object.keys(experienceTypeLabels) as ExperienceType[]).map((type) => (
              <li key={type} className={`label rounded-full px-3 py-1.5 ${typeStyles[type].badge}`}>
                {experienceTypeLabels[type]}
              </li>
            ))}
          </ul>

          <ol className="relative max-w-3xl border-l border-line pl-8 sm:pl-12">
            {items.map((item) => (
              <TimelineItem key={item.id} item={item} semester={semester} />
            ))}

            {!hasProfessional ? (
              <li data-reveal className="relative">
                <span
                  aria-hidden="true"
                  className="absolute top-3 -left-[calc(2rem+6px)] size-3 rotate-45 border-2 border-wine bg-bg sm:-left-[calc(3rem+6px)]"
                />
                <div className="border border-dashed border-line p-6 sm:p-8">
                  <span className={`label rounded-full px-3 py-1.5 ${typeStyles.profesional.badge}`}>
                    {experienceTypeLabels.profesional}
                  </span>
                  <h3 className="mt-5 font-display text-3xl">Experiencia profesional pendiente</h3>
                  <p className="mt-3 leading-relaxed text-muted">
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
      </div>
    </section>
  );
}

function TimelineItem({ item, semester }: { item: ExperienceItem; semester: SemesterResult }) {
  const styles = typeStyles[item.type];

  return (
    <li data-reveal className="relative pb-12">
      <span
        aria-hidden="true"
        className={`absolute top-3 -left-[calc(2rem+6px)] size-3 rotate-45 ring-4 ring-bg sm:-left-[calc(3rem+6px)] ${styles.dot}`}
      />
      <article className="border border-line bg-surface p-6 shadow-card sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className={`label rounded-full px-3 py-1.5 ${styles.badge}`}>{experienceTypeLabels[item.type]}</span>
          <span className="label text-muted">{formatPeriod(item)}</span>
        </div>
        <h3 className="mt-5 font-display text-3xl">{item.title}</h3>
        <p className="mt-1 text-muted">{item.organization}</p>
        <p className="mt-4 leading-relaxed">{item.description}</p>
        {item.showCurrentSemester ? (
          <p className="mt-5 border-l-2 border-gold bg-surface-2 px-4 py-3 text-sm font-semibold">
            Semestre actual: <SemesterStatus result={semester} />
          </p>
        ) : null}
      </article>
    </li>
  );
}
