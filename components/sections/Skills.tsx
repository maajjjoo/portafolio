import type { CSSProperties } from "react";

import SectionHeading from "@/components/ui/SectionHeading";
import { sectionIds } from "@/config/navigation";
import { skillCategories, skillLevelLabels, type SkillLevel } from "@/data/skills";

function LevelMark({ level }: { level: SkillLevel }) {
  return level === "proyectos" ? (
    <span aria-hidden="true" className="size-2.5 shrink-0 rotate-45 bg-accent" />
  ) : (
    <span aria-hidden="true" className="size-2.5 shrink-0 rotate-45 border border-muted" />
  );
}

export default function Skills() {
  return (
    <section id={sectionIds.skills} aria-labelledby="habilidades-titulo">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
        <SectionHeading
          title="Tecnologías que he usado"
          titleId="habilidades-titulo"
          intro="No me considero experta en ninguna. Separo las que ya usé en algún proyecto de las que apenas estoy aprendiendo."
        />

        <ul data-reveal className="mb-10 flex flex-wrap gap-6 text-sm" aria-label="Leyenda">
          {(Object.keys(skillLevelLabels) as SkillLevel[]).map((level) => (
            <li key={level} className="label flex items-center gap-3 text-muted">
              <LevelMark level={level} />
              {skillLevelLabels[level]}
            </li>
          ))}
        </ul>

        <div className="grid overflow-hidden rounded-2xl border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => (
            <article
              key={category.id}
              data-reveal
              style={{ "--reveal-delay": `${(index % 3) * 100}ms` } as CSSProperties}
              aria-labelledby={`skills-${category.id}`}
              className="group border-r border-b border-line p-6 sm:p-8"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 id={`skills-${category.id}`} className="font-display text-2xl">
                  {category.title}
                </h3>
              </div>
              <p className="mt-2 mb-6 text-sm text-muted">{category.description}</p>
              <ul className="grid grid-cols-2 gap-2">
                {category.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className={`flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm transition-transform duration-300 hover:-translate-y-0.5 ${
                      skill.level === "proyectos" ? "border-line" : "border-dashed border-line text-muted"
                    }`}
                  >
                    <LevelMark level={skill.level} />
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
