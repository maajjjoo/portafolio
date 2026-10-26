import Image from "next/image";

import { ArrowUpRightIcon, GitHubIcon } from "@/components/ui/Icons";
import SectionHeading from "@/components/ui/SectionHeading";
import { sectionIds } from "@/config/navigation";
import { projects, projectStatusLabels, type Project, type ProjectMotif } from "@/data/projects";

export default function Projects() {
  return (
    <section id={sectionIds.projects} aria-labelledby="proyectos-titulo" className="border-t border-line bg-surface-2/40">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <SectionHeading
          index="02"
          eyebrow="Proyectos"
          title="Lo que he estado construyendo"
          titleId="proyectos-titulo"
          intro="Proyectos académicos y personales. Indico el estado real de cada uno y solo enlazo repositorios y demos que están publicados."
        />

        <ul className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <li key={project.id} className="flex">
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
    <article
      aria-labelledby={titleId}
      className="group flex w-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface shadow-card transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-accent/60"
    >
      <div className="relative aspect-[16/9] overflow-hidden border-b border-line bg-surface-2">
        {project.image ? (
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <ProjectVisual motif={project.motif} letter={project.title.charAt(0)} />
        )}
        <span className="absolute top-4 left-4 font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
        <span
          className={`absolute top-4 right-4 rounded-full px-3 py-1 font-mono text-[0.7rem] tracking-wide uppercase ${
            project.status === "terminado" ? "bg-ink text-bg" : "border border-line bg-surface text-ink"
          }`}
        >
          {projectStatusLabels[project.status]}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 id={titleId} className="font-display text-3xl font-medium tracking-tight">
          {project.title}
        </h3>
        <p className="mt-3 leading-relaxed text-muted">{project.description}</p>

        <ul className="mt-5 space-y-2 text-sm">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-3">
              <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
              {highlight}
            </li>
          ))}
        </ul>

        <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Tecnologías">
          {project.tags.map((tag) => (
            <li key={tag} className="rounded-md bg-surface-2 px-2 py-1 font-mono text-xs">
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-7">
          <div className="flex flex-wrap gap-2 border-t border-line pt-5">
            {project.repositories.map((repo) => (
              <a
                key={repo.url}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 text-sm font-semibold transition-colors hover:border-ink"
              >
                <GitHubIcon width={16} height={16} />
                {project.repositories.length > 1 ? `Código: ${repo.label}` : "Código"}
                <span className="sr-only">de {project.title} en GitHub (se abre en una pestaña nueva)</span>
              </a>
            ))}
            {project.demo ? (
              <a
                href={project.demo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-bg transition-colors hover:bg-accent hover:text-on-accent"
              >
                {project.demo.label}
                <ArrowUpRightIcon width={16} height={16} />
                <span className="sr-only">de {project.title} (se abre en una pestaña nueva)</span>
              </a>
            ) : null}
          </div>

          {project.repositories.length === 0 ? (
            <p className="mt-3 text-xs text-muted">El repositorio todavía no es público.</p>
          ) : null}
          {project.demo?.note ? <p className="mt-3 text-xs text-muted">{project.demo.note}</p> : null}
          {!project.demo && project.demoUnavailableReason ? (
            <p className="mt-3 text-xs text-muted">{project.demoUnavailableReason}</p>
          ) : null}
        </div>
      </div>
    </article>
  );
}

/** Ilustración en CSS que sustituye a una captura mientras no exista una real. */
function ProjectVisual({ motif, letter }: { motif: ProjectMotif; letter: string }) {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <div className="dot-grid absolute inset-0 text-line" />
      <span className="absolute -bottom-10 -left-2 font-display text-[11rem] leading-none text-ink/5 italic">{letter}</span>
      <div className="absolute inset-0 grid place-items-center transition-transform duration-500 group-hover:scale-[1.03]">
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
    <div className="w-[62%] rounded-xl border border-line bg-surface p-4 shadow-card">
      <div className="mb-3 flex gap-1.5">
        <span className="size-2 rounded-full bg-accent" />
        <span className="size-2 rounded-full bg-line" />
        <span className="size-2 rounded-full bg-line" />
      </div>
      <div className="space-y-2">
        <div className={`${bar} w-1/2 bg-academic/60`} />
        <div className={`${bar} ml-4 w-2/3 bg-line`} />
        <div className={`${bar} ml-4 w-1/3 bg-accent/70`} />
        <div className={`${bar} w-1/4 bg-line`} />
      </div>
    </div>
  );
}

function MobileMotif() {
  return (
    <div className="flex h-[80%] w-[22%] min-w-24 flex-col gap-2 rounded-[1.4rem] border border-line bg-surface p-3 shadow-card">
      <div className={`${bar} mx-auto w-1/3 bg-line`} />
      <div className="mt-1 grid grid-cols-2 gap-1.5">
        <div className="h-8 rounded-md bg-accent/70" />
        <div className="h-8 rounded-md bg-surface-2" />
      </div>
      <div className={`${bar} w-full bg-line`} />
      <div className={`${bar} w-4/5 bg-line`} />
      <div className={`${bar} w-3/5 bg-academic/50`} />
    </div>
  );
}

function DesktopMotif() {
  return (
    <div className="grid h-[62%] w-[66%] grid-cols-[1fr_3fr] gap-2 rounded-xl border border-line bg-surface p-3 shadow-card">
      <div className="space-y-2 rounded-md bg-surface-2 p-2">
        <div className={`${bar} w-full bg-accent/70`} />
        <div className={`${bar} w-3/4 bg-line`} />
        <div className={`${bar} w-2/3 bg-line`} />
      </div>
      <div className="grid grid-cols-3 grid-rows-2 gap-1.5">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className={`rounded-md ${i === 1 ? "bg-academic/40" : "bg-surface-2"}`} />
        ))}
      </div>
    </div>
  );
}

function WatchMotif() {
  return (
    <div className="flex items-center gap-6">
      <div className="grid size-24 place-items-center rounded-[1.75rem] border-4 border-ink/80 bg-surface shadow-card">
        <div className="size-9 rounded-full border-2 border-dashed border-accent" />
      </div>
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-px w-4 bg-muted" style={{ opacity: 1 - i * 0.3 }} />
        ))}
      </div>
      <div className="h-16 w-24 rounded-md border border-line bg-surface p-2 shadow-card">
        <div className={`${bar} w-2/3 bg-line`} />
        <div className={`${bar} mt-2 w-1/2 bg-accent/60`} />
      </div>
    </div>
  );
}
