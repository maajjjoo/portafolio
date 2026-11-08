import Link from "next/link";
import type { CSSProperties } from "react";

import Portrait from "@/components/sections/Portrait";
import { ArrowRightIcon, CapIcon, DownloadIcon, GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";
import RollText from "@/components/ui/RollText";
import { sectionIds } from "@/config/navigation";
import { portfolio } from "@/config/portfolio";
import { albumHref } from "@/lib/albums";

// Se calcula al compilar en next.config.ts según exista public/cv.pdf.
const cvAvailable = process.env.CV_AVAILABLE === "true";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export default function Hero() {
  return (
    <section id={sectionIds.hero} aria-labelledby="hero-titulo" className="relative isolate overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,22rem)]">
        <div>
          <h2 id="hero-titulo" className="fade-up font-display text-4xl leading-[1.05] text-balance sm:text-5xl lg:text-6xl" style={delay(300)}>
            {portfolio.fullName}
          </h2>
          <p className="fade-up mt-3 text-lg font-medium text-accent" style={delay(350)}>
            {portfolio.title}
          </p>
          <p className="fade-up mt-7 max-w-xl text-2xl leading-snug" style={delay(450)}>
            Construyo software que intenta resolver problemas reales
          </p>
          <p className="fade-up mt-6 max-w-xl text-lg leading-relaxed text-muted" style={delay(550)}>
            Estudio Ingeniería de Software y aprendo construyendo: aplicaciones web, móviles y de escritorio, como una
            herramienta para organizar el estudio o una app para llevar el inventario de un negocio.
          </p>

          <p id="bienvenida-perfil" className="fade-up mt-8 flex items-center gap-4" style={delay(650)}>
            <span className="grid size-12 shrink-0 place-items-center rounded-full border border-line text-accent">
              <CapIcon />
            </span>
            <span className="label leading-relaxed">{portfolio.university}</span>
          </p>

          <div id="bienvenida-cv" className="fade-up mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start" style={delay(750)}>
            {cvAvailable ? (
              <a
                href="/cv.pdf"
                download
                className="label inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-wine px-6 text-on-wine shadow-card transition-transform hover:-translate-y-0.5"
              >
                <DownloadIcon width={16} height={16} />
                <RollText>Descargar CV</RollText>
              </a>
            ) : (
              <div className="flex flex-col items-center gap-1.5 sm:items-start">
                <button
                  type="button"
                  disabled
                  aria-describedby="cv-estado"
                  className="label inline-flex min-h-12 cursor-not-allowed items-center justify-center gap-2 rounded-full border border-dashed border-line px-6 text-muted max-sm:w-full"
                >
                  <DownloadIcon width={16} height={16} />
                  Descargar CV
                </button>
                <span id="cv-estado" className="text-xs text-muted">
                  CV en preparación
                </span>
              </div>
            )}

            <Link
              href={albumHref("proyectos")}
              transitionTypes={["nav-forward"]}
              className="label inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-ink px-6 transition-colors hover:bg-ink hover:text-bg"
            >
              <RollText>Ver proyectos</RollText>
              <ArrowRightIcon width={16} height={16} />
            </Link>
            <Link
              href={albumHref("contacto")}
              transitionTypes={["nav-forward"]}
              className="label inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-4 text-muted transition-colors hover:text-ink"
            >
              <RollText>Contactarme</RollText>
            </Link>
          </div>

          <ul id="bienvenida-redes" className="fade-up mt-8 flex gap-2" aria-label="Perfiles" style={delay(850)}>
            {[
              { ...portfolio.social.github, Icon: GitHubIcon },
              { ...portfolio.social.linkedin, Icon: LinkedInIcon },
            ].map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid size-12 place-items-center rounded-full border border-line text-muted transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                >
                  <Icon />
                  <span className="sr-only">{label} (se abre en una pestaña nueva)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="fade-up mx-auto w-[min(72vw,20rem)] lg:w-full" style={delay(500)}>
          <Portrait />
        </div>
      </div>
    </section>
  );
}
