import { SparkleIcon } from "@/components/ui/Icons";
import { skillCategories } from "@/data/skills";

const technologies = skillCategories
  .flatMap((category) => category.skills)
  .filter((skill) => skill.level === "proyectos")
  .map((skill) => skill.name);

/** Cinta decorativa con las tecnologías usadas en proyectos (también listadas en Habilidades). */
export default function Marquee() {
  const items = [...technologies, ...technologies];

  return (
    // El contenedor recorta la cinta inclinada para que no cause desplazamiento horizontal.
    <div aria-hidden="true" className="overflow-hidden py-6">
      <div className="marquee -mx-4 -rotate-1 overflow-hidden border-y border-wine bg-wine py-4 text-on-wine">
        <div className="marquee-track flex w-max items-center gap-8">
          {items.map((name, i) => (
            <span key={i} className="flex items-center gap-8 font-display text-3xl whitespace-nowrap italic sm:text-4xl">
              {name}
              <SparkleIcon width={18} height={18} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
