import type { CSSProperties } from "react";
import Link from "next/link";

import CoverArt from "@/components/library/CoverArt";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/ui/Icons";
import SectionHeading from "@/components/ui/SectionHeading";
import { sectionIds } from "@/config/navigation";
import { portfolio } from "@/config/portfolio";
import { albums } from "@/data/albums";
import { getAcademicSnapshot } from "@/lib/academic";
import { albumHref, sortedAlbums } from "@/lib/albums";

const ordered = sortedAlbums(albums);

const colophon = [
  { label: "Colección", value: portfolio.libraryTitle },
  { label: "Idea, diseño y desarrollo", value: portfolio.fullName },
  { label: "Tecnologías", value: "Next.js, React, TypeScript y Tailwind CSS" },
  { label: "Tipografías", value: "Gloock y Hanken Grotesk" },
  { label: "Portadas", value: "Ilustraciones originales hechas con SVG y CSS" },
  { label: "Transiciones", value: "View Transitions de React y animaciones CSS" },
];

/** Contraportada: catálogo completo, ficha técnica, redes y derechos. */
export default async function Credits() {
  const { currentYear } = await getAcademicSnapshot();

  return (
    <section id={sectionIds.credits} aria-labelledby="creditos-titulo">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
        <SectionHeading
          title="La contraportada"
          titleId="creditos-titulo"
          intro="Todos los discos de la colección y la ficha técnica de este sitio."
        />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div data-reveal>
            <h3 id="creditos-catalogo" className="label mb-4 text-muted">Catálogo</h3>
            <ol className="border-t border-line">
              {ordered.map((album) => (
                <li key={album.slug} className="border-b border-line">
                  <Link
                    href={albumHref(album.slug)}
                    transitionTypes={["nav-forward"]}
                    className="group flex items-center gap-4 py-3 transition-colors hover:text-accent"
                  >
                    <span className="label w-14 shrink-0 text-muted">{album.catalog}</span>
                    <span className="size-10 shrink-0 overflow-hidden rounded-[2px]">
                      <CoverArt album={album} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-2xl leading-tight">{album.title}</span>
                      <span className="block text-sm text-muted">{album.section}</span>
                    </span>
                    <span className="label hidden text-muted sm:block">Lado {album.side}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>

          <div data-reveal style={{ "--reveal-delay": "150ms" } as CSSProperties} className="space-y-10">
            <div>
              <h3 id="creditos-ficha" className="label mb-4 text-muted">Ficha técnica</h3>
              <dl className="border-t border-line">
                {colophon.map((item) => (
                  <div key={item.label} className="grid gap-1 border-b border-line py-3 sm:grid-cols-[11rem_1fr] sm:gap-4">
                    <dt className="label pt-0.5 text-muted">{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <h3 id="creditos-redes" className="label mb-4 text-muted">Redes</h3>
              <ul className="flex flex-wrap gap-2">
                <li>
                  <a href={`mailto:${portfolio.email}`} className="label inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 transition-colors hover:border-ink">
                    <MailIcon width={16} height={16} />
                    Correo
                  </a>
                </li>
                {[
                  { ...portfolio.social.github, Icon: GitHubIcon },
                  { ...portfolio.social.linkedin, Icon: LinkedInIcon },
                ].map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="label inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 transition-colors hover:border-ink"
                    >
                      <Icon width={16} height={16} />
                      {label}
                      <span className="sr-only">(se abre en una pestaña nueva)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <p id="creditos-derechos" className="border-l-2 border-wine pl-4 text-sm leading-relaxed text-muted">
              © {currentYear} {portfolio.fullName}. Este sitio es un portafolio personal inspirado en una colección de
              vinilos; no es un servicio de música ni está asociado a ningún sello discográfico.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
