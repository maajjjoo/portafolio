import Image from "next/image";
import type { CSSProperties } from "react";

import { ArrowRightIcon, ArrowUpRightIcon, GitHubIcon } from "@/components/ui/Icons";
import RollText from "@/components/ui/RollText";
import SectionHeading from "@/components/ui/SectionHeading";
import { sectionIds } from "@/config/navigation";
import { portfolio } from "@/config/portfolio";
import { projects, projectStatusLabels, type Project, type ProjectMotif } from "@/data/projects";

export default function Projects() {
  return (
    <section id={sectionIds.projects} aria-labelledby="proyectos-titulo">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
        <SectionHeading
          index="02"
          eyebrow="Proyectos"
          title="Lo que he estado construyendo"
          titleId="proyectos-titulo"
          intro="Proyectos académicos y personales. Indico el estado real de cada uno y solo enlazo repositorios y demos que están publicados."
          action={
            <a
              href={portfolio.social.github.href}
              target="_blank"
              rel="noopener noreferrer"
              className="label hidden items-center gap-3 text-muted transition-colors hover:text-ink sm:inline-flex"
            >
              <RollText>Mi perfil de GitHub</RollText>
              <ArrowRightIcon width={16} height={16} />
              <span className="sr-only">(se abre en una pestaña nueva)</span>
            </a>
          }
        />

        <ul className="grid border-t border-l border-line md:grid-cols-2">
          {projects.map((project, index) => (
            <li
              key={project.id}
              data-reveal
              style={{ "--reveal-delay": `${(index % 2) * 120}ms` } as CSSProperties}
              className="flex border-r border-b border-line"
            >
              <ProjectCard project={project} index={index} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const titleId = `proyecto-${project.id}`;

  return (
    <article aria-labelledby={titleId} className="group flex w-full flex-col p-5 transition-colors duration-500 hover:bg-surface sm:p-7">
      <header className="mb-5 flex items-start justify-between gap-4">
        <div className="flex items-baseline gap-4">
          <span className="font-display text-3xl text-accent">{String(index + 1).padStart(2, "0")}</span>
          <div>
            <h3 id={titleId} className="label text-base text-ink">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-muted">{projectStatusLabels[project.status]}</p>
          </div>
        </div>
      </header>

      <div className="relative aspect-[16/10] overflow-hidden border border-line bg-surface-2">
        {project.image ? (
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <ProjectVisual motif={project.motif} title={project.title} />
        )}
      </div>

      <p className="mt-6 leading-relaxed text-muted">{project.description}</p>

      <ul className="mt-5 space-y-2 text-sm">
        {project.highlights.map((highlight) => (
          <li key={highlight} className="flex gap-3">
            <span aria-hidden="true" className="mt-[0.45rem] size-1.5 shrink-0 rotate-45 bg-accent" />
            {highlight}
          </li>
        ))}
      </ul>

      <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Tecnologías">
        {project.tags.map((tag) => (
          <li key={tag} className="label border border-line px-2.5 py-1.5 text-[0.65rem] text-muted">
            {tag}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-7">
        <div className="flex flex-wrap gap-2">
          {project.repositories.map((repo) => (
            <a
              key={repo.url}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="label inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 text-[0.68rem] transition-colors hover:border-ink"
            >
              <GitHubIcon width={15} height={15} />
              <RollText>{project.repositories.length > 1 ? `Código ${repo.label}` : "Código"}</RollText>
              <span className="sr-only">de {project.title} en GitHub (se abre en una pestaña nueva)</span>
            </a>
          ))}
          {project.demo ? (
            <a
              href={project.demo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="label inline-flex min-h-11 items-center gap-2 rounded-full bg-wine px-4 text-[0.68rem] text-on-wine transition-transform hover:-translate-y-0.5"
            >
              <RollText>{project.demo.label}</RollText>
              <ArrowUpRightIcon width={15} height={15} />
              <span className="sr-only">de {project.title} (se abre en una pestaña nueva)</span>
            </a>
          ) : null}
        </div>

        {project.repositories.length === 0 ? <p className="mt-3 text-xs text-muted">El repositorio todavía no es público.</p> : null}
        {project.demo?.note ? <p className="mt-3 text-xs text-muted">{project.demo.note}</p> : null}
        {!project.demo && project.demoUnavailableReason ? (
          <p className="mt-3 text-xs text-muted">{project.demoUnavailableReason}</p>
        ) : null}
      </div>
    </article>
  );
}

/** Ilustración en CSS que sustituye a una captura mientras no exista una real. */
function ProjectVisual({ motif, title }: { motif: ProjectMotif; title: string }) {
  return (
    <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(90%_90%_at_20%_0%,var(--glow)_0%,transparent_70%)]">
      <div className="dot-grid absolute inset-0 text-line opacity-70" />
      <span className="absolute bottom-3 left-4 font-display text-4xl text-ink/80 italic sm:text-5xl">{title}</span>
      <div className="absolute inset-0 grid place-items-center pb-10 transition-transform duration-700 group-hover:scale-[1.06] group-hover:-rotate-1">
        {motif === "editor" ? <EditorMotif /> : null}
        {motif === "mobile" ? <MobileMotif /> : null}
        {motif === "desktop" ? <DesktopMotif /> : null}
        {motif === "watch" ? <WatchMotif /> : null}
      </div>
    </div>
  );
}

const bar = "h-2 rounded-full";

function EditorMotif() {
  return (
    <div className="w-[58%] rounded-lg border border-line bg-surface p-4 shadow-card">
      <div className="mb-3 flex gap-1.5">
        <span className="size-2 rounded-full bg-wine" />
        <span className="size-2 rounded-full bg-line" />
        <span className="size-2 rounded-full bg-line" />
      </div>
      <div className="space-y-2">
        <div className={`${bar} w-1/2 bg-gold/60`} />
        <div className={`${bar} ml-4 w-2/3 bg-line`} />
        <div className={`${bar} ml-4 w-1/3 bg-wine`} />
        <div className={`${bar} w-1/4 bg-line`} />
      </div>
    </div>
  );
}

function MobileMotif() {
  return (
    <div className="flex h-[70%] w-[20%] min-w-20 flex-col gap-2 rounded-[1.2rem] border border-line bg-surface p-2.5 shadow-card">
      <div className={`${bar} mx-auto w-1/3 bg-line`} />
      <div className="mt-1 grid grid-cols-2 gap-1.5">
        <div className="h-7 rounded bg-wine" />
        <div className="h-7 rounded bg-surface-2" />
      </div>
      <div className={`${bar} w-full bg-line`} />
      <div className={`${bar} w-4/5 bg-line`} />
      <div className={`${bar} w-3/5 bg-gold/60`} />
    </div>
  );
}

function DesktopMotif() {
  return (
    <div className="grid h-[55%] w-[62%] grid-cols-[1fr_3fr] gap-2 rounded-lg border border-line bg-surface p-3 shadow-card">
      <div className="space-y-2 rounded bg-surface-2 p-2">
        <div className={`${bar} w-full bg-wine`} />
        <div className={`${bar} w-3/4 bg-line`} />
        <div className={`${bar} w-2/3 bg-line`} />
      </div>
      <div className="grid grid-cols-3 grid-rows-2 gap-1.5">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className={`rounded ${i === 1 ? "bg-gold/50" : "bg-surface-2"}`} />
        ))}
      </div>
    </div>
  );
}

function WatchMotif() {
  return (
    <div className="flex items-center gap-5">
      <div className="grid size-20 place-items-center rounded-[1.5rem] border-4 border-ink/70 bg-surface shadow-card">
        <div className="spin-slow size-8 rounded-full border-2 border-dashed border-accent" />
      </div>
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-px w-4 bg-muted" style={{ opacity: 1 - i * 0.3 }} />
        ))}
      </div>
      <div className="h-14 w-20 rounded border border-line bg-surface p-2 shadow-card">
        <div className={`${bar} w-2/3 bg-line`} />
        <div className={`${bar} mt-2 w-1/2 bg-wine`} />
      </div>
    </div>
  );
}
