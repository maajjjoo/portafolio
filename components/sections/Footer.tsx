import Link from "next/link";

import { ArrowUpIcon, GitHubIcon, LinkedInIcon, SparkleIcon } from "@/components/ui/Icons";
import RollText from "@/components/ui/RollText";
import { portfolio } from "@/config/portfolio";
import { albums } from "@/data/albums";
import { getAcademicSnapshot } from "@/lib/academic";
import { albumHref, sortedAlbums } from "@/lib/albums";

const ordered = sortedAlbums(albums);

// Pie común a todas las páginas. Usa siempre colores oscuros fijos, en ambos temas.
export default async function Footer() {
  const { currentYear } = await getAcademicSnapshot();

  return (
    <footer className="mt-auto bg-[#0e0809] text-[#eedfd0]">
      <div className="mx-auto max-w-7xl px-5 pt-16 pb-10 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <p aria-hidden="true" className="font-display text-[clamp(3rem,10vw,8rem)] leading-[0.85] tracking-tight">
            María José<span className="text-[#e8a3b0] italic">.</span>
          </p>
          <p className="label text-[#b5a49a]">
            {portfolio.libraryTitle} · {albums.length} discos
          </p>
        </div>

        <div className="mt-12 grid gap-10 border-t border-[#36262a] pt-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1.4fr)_auto]">
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
            <p className="label mb-4 text-[#b5a49a]">Lista de discos</p>
            <ol className="grid gap-x-6 gap-y-1 sm:grid-cols-2">
              {ordered.map((album) => (
                <li key={album.slug}>
                  <Link
                    href={albumHref(album.slug)}
                    transitionTypes={["nav-forward"]}
                    className="flex items-baseline gap-3 py-1 transition-colors hover:text-[#e8a3b0] focus-visible:outline-[#e8a3b0]"
                  >
                    <span className="label text-[0.6rem] text-[#b5a49a]">{String(album.order).padStart(2, "0")}</span>
                    <RollText>{album.section}</RollText>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>

          <div className="flex flex-col items-start gap-3 md:items-end">
            <a
              href="#contenido"
              className="label inline-flex min-h-12 items-center gap-2 rounded-full border border-[#eedfd0] px-6 transition-colors hover:bg-[#eedfd0] hover:text-[#0e0809] focus-visible:outline-[#e8a3b0]"
            >
              <ArrowUpIcon width={16} height={16} />
              <RollText>Volver arriba</RollText>
            </a>
            <Link
              href="/"
              transitionTypes={["nav-back"]}
              className="label inline-flex min-h-12 items-center gap-2 px-2 text-[#b5a49a] transition-colors hover:text-[#eedfd0] focus-visible:outline-[#e8a3b0]"
            >
              <RollText>Volver a la biblioteca</RollText>
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 text-sm text-[#b5a49a] sm:flex-row sm:justify-between">
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
