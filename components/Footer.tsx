import { ArrowUpIcon, GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { navItems, sectionIds } from "@/config/navigation";
import { portfolio } from "@/config/portfolio";
import { getAcademicSnapshot } from "@/lib/academic";

export default async function Footer() {
  const { currentYear } = await getAcademicSnapshot();

  return (
    <footer className="mt-auto border-t border-[#27335a] bg-[#0a1124] text-[#e8ecf5]">
      <div className="mx-auto max-w-6xl px-5 pt-16 pb-10 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_auto]">
          <div>
            <p className="font-display text-3xl font-medium">{portfolio.fullName}</p>
            <p className="mt-2 text-[#9ea9c2]">{portfolio.title}</p>
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
                    className="grid size-11 place-items-center rounded-full border border-[#27335a] transition-colors hover:border-[#ff8a66] hover:text-[#ff8a66] focus-visible:outline-[#ff8a66]"
                  >
                    <Icon />
                    <span className="sr-only">{label} (se abre en una pestaña nueva)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Enlaces rápidos">
            <p className="mb-4 font-mono text-xs tracking-[0.2em] text-[#9ea9c2] uppercase">Secciones</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="inline-block py-1 transition-colors hover:text-[#ff8a66] focus-visible:outline-[#ff8a66]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:justify-self-end">
            <a
              href={`#${sectionIds.hero}`}
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#ff8a66] px-5 font-semibold text-[#0a1124] transition-transform hover:-translate-y-0.5 focus-visible:outline-[#ff8a66]"
            >
              <ArrowUpIcon />
              Volver arriba
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-[#27335a] pt-6 text-sm text-[#9ea9c2] sm:flex-row sm:justify-between">
          <p>
            © {currentYear} {portfolio.fullName}
          </p>
          <p>Hecho con Next.js + Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
