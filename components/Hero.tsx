import type { CSSProperties } from "react";

import Portrait from "@/components/Portrait";
import { ArrowDownIcon, CapIcon, DownloadIcon, GitHubIcon, LinkedInIcon, SparkleIcon } from "@/components/ui/Icons";
import RollText from "@/components/ui/RollText";
import SplitText from "@/components/ui/SplitText";
import { sectionIds } from "@/config/navigation";
import { portfolio } from "@/config/portfolio";
import { getAcademicSnapshot } from "@/lib/academic";
import { formatSemester } from "@/lib/semester";

// Se calcula al compilar en next.config.ts según exista public/cv.pdf.
const cvAvailable = process.env.CV_AVAILABLE === "true";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export default async function Hero() {
  const { semester, currentYear } = await getAcademicSnapshot();

  return (
    <section id={sectionIds.hero} aria-labelledby="hero-titulo" className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="float absolute top-[18%] left-1/2 -z-10 size-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--glow)_0%,transparent_65%)]"
      />

      <div className="mx-auto max-w-7xl px-5 pt-6 pb-20 sm:px-8 lg:pb-28">
        <div className="fade-up label flex justify-between gap-4 text-muted" style={delay(100)}>
          <span>{portfolio.title}</span>
          <span className="hidden sm:inline">Portafolio · {currentYear}</span>
        </div>

        {/* Palabra gigante decorativa; el nombre real está en el h1. */}
        <p
          aria-hidden="true"
          className="mt-4 text-center font-display text-[min(calc((100vw_-_2.5rem)/4.7),16.5rem)] leading-[0.8] tracking-[-0.02em] whitespace-nowrap text-ink uppercase select-none"
        >
          <SplitText text="Portafolio" delay={150} step={70} />
        </p>

        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)_minmax(0,1fr)] lg:gap-12">
          <div className="fade-up relative z-10 mx-auto -mt-[5vw] w-[min(72vw,20rem)] lg:order-2 lg:-mt-[11rem] lg:w-full" style={delay(700)}>
            <Portrait />
          </div>

          <div className="lg:order-1">
            <h1 id="hero-titulo" className="fade-up font-display text-4xl leading-none sm:text-5xl" style={delay(900)}>
              {portfolio.fullName}
            </h1>
            <p className="fade-up label mt-5 text-accent" style={delay(1000)}>
              {portfolio.title}
            </p>
            <p className="fade-up mt-6 text-2xl leading-tight font-light tracking-wide uppercase" style={delay(1100)}>
              Construyo software que intenta resolver problemas reales
            </p>
            <a
              href={`#${sectionIds.projects}`}
              className="fade-up label mt-8 inline-flex min-h-12 items-center gap-3 rounded-full border border-ink px-6 transition-colors hover:bg-ink hover:text-bg"
              style={delay(1200)}
            >
              <RollText>Ver proyectos</RollText>
              <ArrowDownIcon width={16} height={16} />
            </a>
            <p aria-hidden="true" className="write-in mt-8 -rotate-3 font-script text-5xl text-accent" style={delay(1500)}>
              María José
            </p>
          </div>

          <div className="lg:order-3 lg:pb-4">
            <p className="fade-up text-lg leading-relaxed text-muted" style={delay(1100)}>
              Estudio Ingeniería de Software y aprendo construyendo: aplicaciones web, móviles y de escritorio, como una
              herramienta para organizar el estudio o una app para llevar el inventario de un negocio.
            </p>

            <p className="fade-up mt-6 flex items-center gap-4" style={delay(1200)}>
              <span className="grid size-12 shrink-0 place-items-center rounded-full border border-line text-accent">
                <CapIcon />
              </span>
              <span className="label leading-relaxed">
                {portfolio.university}
                <br />
                <span className="text-muted">{formatSemester(semester.semester)}</span>
              </span>
            </p>

            <div className="fade-up mt-8 flex flex-col gap-3 sm:flex-row sm:items-start" style={delay(1300)}>
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

              <ul className="flex justify-center gap-2" aria-label="Perfiles">
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
          </div>
        </div>
      </div>

      <SparkleIcon aria-hidden="true" className="spin-slow absolute top-[38%] right-[6%] hidden text-accent lg:block" width={28} height={28} />
    </section>
  );
}
