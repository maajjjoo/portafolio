import SectionHeading from "@/components/ui/SectionHeading";
import { sectionIds } from "@/config/navigation";
import { skillCategories, skillLevelLabels, type SkillLevel } from "@/data/skills";

const levelStyles: Record<SkillLevel, string> = {
  proyectos: "border-ink/15 bg-surface-2 text-ink",
  aprendizaje: "border-dashed border-muted/50 text-muted",
};

export default function Skills() {
  return (
    <section id={sectionIds.skills} aria-labelledby="habilidades-titulo" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <SectionHeading
          index="06"
          eyebrow="Habilidades"
          title="Con qué trabajo"
          titleId="habilidades-titulo"
          intro="Sin porcentajes inventados: distingo entre lo que ya he usado en proyectos y lo que estoy aprendiendo ahora."
        />

        <ul className="mb-8 flex flex-wrap gap-4 text-sm" aria-label="Leyenda">
          {(Object.keys(skillLevelLabels) as SkillLevel[]).map((level) => (
            <li key={level} className="flex items-center gap-2 text-muted">
              <span aria-hidden="true" className={`h-4 w-7 rounded-full border ${levelStyles[level]}`} />
              {skillLevelLabels[level]}
            </li>
          ))}
        </ul>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category) => (
            <article
              key={category.id}
              aria-labelledby={`skills-${category.id}`}
              className="rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-card transition-transform hover:-translate-y-1"
            >
              <h3 id={`skills-${category.id}`} className="font-display text-2xl font-medium">
                {category.title}
              </h3>
              <p className="mt-1 mb-5 text-sm text-muted">{category.description}</p>
              <ul className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <li key={skill.name} className={`rounded-full border px-3 py-1 text-sm ${levelStyles[skill.level]}`}>
                    {skill.name}
                    <span className="sr-only">: {skillLevelLabels[skill.level]}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
