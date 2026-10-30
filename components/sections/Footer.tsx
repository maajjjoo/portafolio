import Link from "next/link";

import { ArrowUpIcon, GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";
import RollText from "@/components/ui/RollText";
import { portfolio } from "@/config/portfolio";
import { albums } from "@/data/albums";
import { getAcademicSnapshot } from "@/lib/academic";
import { albumHref, sortedAlbums } from "@/lib/albums";

const ordered = sortedAlbums(albums);

// Pie común a todas las páginas. Sus colores cambian con la luz de la sala (--foot-* en globals.css).
export default async function Footer() {
  const { currentYear } = await getAcademicSnapshot();

  return (
    <footer className="mt-auto bg-[var(--foot-bg)] text-[var(--foot-ink)]">
      <div className="mx-auto max-w-[76rem] px-5 pt-14 pb-10 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1.4fr)_auto]">
          <div>
            <p className="font-display text-3xl leading-tight text-balance">{portfolio.fullName}</p>
            <p className="mt-2 text-[var(--foot-muted)]">{portfolio.title}</p>
            <p className="text-[var(--foot-muted)]">
              {portfolio.libraryTitle} · {albums.length} discos
            </p>
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
                    className="grid size-11 place-items-center rounded-full border border-[var(--foot-line)] transition-colors hover:border-[var(--foot-accent)] hover:text-[var(--foot-accent)] focus-visible:outline-[var(--foot-accent)]"
                  >
                    <Icon />
                    <span className="sr-only">{label} (se abre en una pestaña nueva)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Enlaces rápidos">
            <p className="label mb-3 text-[var(--foot-muted)]">Discos</p>
            <ol className="grid gap-x-6 sm:grid-cols-2">
              {ordered.map((album) => (
                <li key={album.slug}>
                  <Link
                    href={albumHref(album.slug)}
                    transitionTypes={["nav-forward"]}
                    className="inline-flex min-h-9 items-center transition-colors hover:text-[var(--foot-accent)] focus-visible:outline-[var(--foot-accent)]"
                  >
                    <RollText>{album.section}</RollText>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>

          <div className="flex flex-col items-start gap-2 md:items-end">
            <a
              href="#contenido"
              className="label inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--foot-line)] px-5 transition-colors hover:border-[var(--foot-ink)] focus-visible:outline-[var(--foot-accent)]"
            >
              <ArrowUpIcon width={16} height={16} />
              <RollText>Volver arriba</RollText>
            </a>
            <Link
              href="/"
              transitionTypes={["room-close"]}
              className="label inline-flex min-h-11 items-center px-2 text-[var(--foot-muted)] transition-colors hover:text-[var(--foot-ink)] focus-visible:outline-[var(--foot-accent)]"
            >
              <RollText>Volver a la sala</RollText>
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-[var(--foot-line)] pt-6 text-sm text-[var(--foot-muted)] sm:flex-row sm:justify-between">
          <p>
            © {currentYear} {portfolio.fullName}
          </p>
          <p>Gracias por tu visita</p>
          <p>Hecho con Next.js + Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
