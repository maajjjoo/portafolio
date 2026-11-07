import { ArrowUpIcon, GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";
import RollText from "@/components/ui/RollText";
import { portfolio } from "@/config/portfolio";
import { getAcademicSnapshot } from "@/lib/academic";

// Pie común a todas las páginas: una sola línea. Sus colores cambian con la luz de la sala (--foot-* en globals.css).
export default async function Footer() {
  const { currentYear } = await getAcademicSnapshot();

  return (
    <footer className="mt-auto bg-[var(--foot-bg)] text-[var(--foot-ink)]">
      <div className="mx-auto flex max-w-[76rem] flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="text-sm text-[var(--foot-muted)]">
          © {currentYear} {portfolio.fullName}
        </p>

        <div className="flex items-center gap-2">
          <ul className="flex gap-2" aria-label="Perfiles">
            {[
              { ...portfolio.social.github, Icon: GitHubIcon },
              { ...portfolio.social.linkedin, Icon: LinkedInIcon },
            ].map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid size-11 place-items-center rounded-full border border-[var(--foot-line)] transition-colors hover:border-[var(--foot-accent)] hover:text-[var(--foot-accent)] focus-visible:outline-[var(--foot-accent)]"
                >
                  <Icon />
                  <span className="sr-only">{label} (se abre en una pestaña nueva)</span>
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contenido"
            className="label inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--foot-line)] px-5 transition-colors hover:border-[var(--foot-ink)] focus-visible:outline-[var(--foot-accent)]"
          >
            <ArrowUpIcon width={16} height={16} />
            <RollText>Volver arriba</RollText>
          </a>
        </div>
      </div>
    </footer>
  );
}
