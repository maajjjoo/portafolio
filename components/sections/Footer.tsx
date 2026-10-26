import { ArrowUpIcon, GitHubIcon, LinkedInIcon, SparkleIcon } from "@/components/ui/Icons";
import RollText from "@/components/ui/RollText";
import { navItems, sectionIds } from "@/config/navigation";
import { portfolio } from "@/config/portfolio";
import { getAcademicSnapshot } from "@/lib/academic";

// El pie usa siempre colores oscuros fijos, en ambos temas.
export default async function Footer() {
  const { currentYear } = await getAcademicSnapshot();

  return (
    <footer className="mt-auto bg-[#0e0809] text-[#eedfd0]">
      <div className="mx-auto max-w-7xl px-5 pt-20 pb-10 sm:px-8">
        <p aria-hidden="true" className="font-display text-[clamp(3.5rem,13vw,11rem)] leading-[0.85] tracking-tight">
          María José<span className="text-[#e8a3b0] italic">.</span>
        </p>

        <div className="mt-14 grid gap-10 border-t border-[#36262a] pt-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_auto]">
          <div>
            <p className="font-display text-2xl">{portfolio.fullName}</p>
            <p className="mt-1 text-[#b5a49a]">{portfolio.title}</p>
            <ul className="mt-6 flex gap-2" aria-label="Perfiles">
              {[
                { ...portfolio.social.github, Icon: GitHubIcon },
                { ...portfolio.social.linkedin, Icon: LinkedInIcon },
              ].map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid size-11 place-items-center rounded-full border border-[#36262a] transition-colors hover:border-[#e8a3b0] hover:text-[#e8a3b0] focus-visible:outline-[#e8a3b0]"
                  >
                    <Icon />
                    <span className="sr-only">{label} (se abre en una pestaña nueva)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Enlaces rápidos">
            <p className="label mb-4 text-[#b5a49a]">Secciones</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="inline-block py-1 transition-colors hover:text-[#e8a3b0] focus-visible:outline-[#e8a3b0]"
                  >
                    <RollText>{item.label}</RollText>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:justify-self-end">
            <a
              href={`#${sectionIds.hero}`}
              className="label inline-flex min-h-12 items-center gap-2 rounded-full border border-[#eedfd0] px-6 transition-colors hover:bg-[#eedfd0] hover:text-[#0e0809] focus-visible:outline-[#e8a3b0]"
            >
              <ArrowUpIcon width={16} height={16} />
              <RollText>Volver arriba</RollText>
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 text-sm text-[#b5a49a] sm:flex-row sm:justify-between">
          <p>
            © {currentYear} {portfolio.fullName}
          </p>
          <p>Hecho con Next.js + Tailwind CSS</p>
        </div>
      </div>

      <p className="label flex items-center justify-center gap-3 bg-[#7b1e34] py-4 text-[#f3e6d8]">
        Gracias por tu visita
        <SparkleIcon className="spin-slow" width={12} height={12} />
      </p>
    </footer>
  );
}
