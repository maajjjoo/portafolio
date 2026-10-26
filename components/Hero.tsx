import { ArrowDownIcon, DownloadIcon, GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { sectionIds } from "@/config/navigation";
import { portfolio } from "@/config/portfolio";
import { getAcademicSnapshot } from "@/lib/academic";
import { formatSemester } from "@/lib/semester";

// Se calcula al compilar en next.config.ts según exista public/cv.pdf.
const cvAvailable = process.env.CV_AVAILABLE === "true";

export default async function Hero() {
  const { semester } = await getAcademicSnapshot();
  const [firstLine, ...rest] = portfolio.fullName.split(" De ");

  return (
    <section id={sectionIds.hero} aria-labelledby="hero-titulo" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pt-14 pb-20 sm:px-8 md:pt-20 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:pb-28">
        <div>
          <p className="reveal mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-xs tracking-wide text-muted">
            <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
            {portfolio.academic.degree} · {formatSemester(semester.semester)}
          </p>

          <h1
            id="hero-titulo"
            className="reveal reveal-delay-1 font-display text-5xl leading-[0.95] font-medium tracking-tight text-balance sm:text-6xl lg:text-7xl"
          >
            {firstLine}{" "}
            {rest.length > 0 ? (
              <span className="block text-muted">
                <span className="italic">De</span> {rest.join(" De ")}
              </span>
            ) : null}
          </h1>

          <p className="reveal reveal-delay-2 mt-6 font-display text-2xl text-accent italic sm:text-3xl">{portfolio.title}</p>

          <p className="reveal reveal-delay-2 mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Estudio Ingeniería de Software y aprendo construyendo: aplicaciones web, móviles y de escritorio que
            intentan resolver problemas reales, como organizar el estudio o llevar el inventario de un negocio.
          </p>

          <div className="reveal reveal-delay-3 mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start">
            {cvAvailable ? (
              <a
                href="/cv.pdf"
                download
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 font-semibold text-on-accent shadow-card transition-transform hover:-translate-y-0.5"
              >
                <DownloadIcon />
                Descargar CV
              </a>
            ) : (
              <div className="flex flex-col items-center gap-1.5 sm:items-start">
                <button
                  type="button"
                  disabled
                  aria-describedby="cv-estado"
                  className="inline-flex min-h-12 cursor-not-allowed items-center justify-center gap-2 rounded-full border border-dashed border-line bg-surface-2 px-6 font-semibold text-muted max-sm:w-full"
                >
                  <DownloadIcon />
                  Descargar CV
                </button>
                <span id="cv-estado" className="font-mono text-xs text-muted">
                  CV en preparación
                </span>
              </div>
            )}

            <a
              href={`#${sectionIds.projects}`}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-ink px-6 font-semibold transition-colors hover:bg-ink hover:text-bg"
            >
              Ver proyectos
              <ArrowDownIcon />
            </a>
          </div>

          <ul className="reveal reveal-delay-3 mt-9 flex gap-2" aria-label="Perfiles">
            {[
              { ...portfolio.social.github, Icon: GitHubIcon },
              { ...portfolio.social.linkedin, Icon: LinkedInIcon },
            ].map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid size-11 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon />
                  <span className="sr-only">{label} (se abre en una pestaña nueva)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <Monogram />
      </div>
    </section>
  );
}

/**
 * Avatar abstracto con iniciales. Para usar una foto real, reemplaza el
 * contenido del círculo central por <Image src="/images/..." /> de next/image.
 */
function Monogram() {
  return (
    <div aria-hidden="true" className="reveal reveal-delay-2 relative mx-auto aspect-square w-full max-w-[22rem] lg:max-w-[26rem]">
      <div className="dot-grid absolute inset-0 rounded-[2.5rem] text-line" />
      <div className="orbit absolute inset-[8%] rounded-full border border-dashed border-muted/40">
        <span className="absolute -top-2 left-1/2 size-4 -translate-x-1/2 rounded-full bg-accent" />
      </div>
      <div className="absolute inset-[18%] grid place-items-center rounded-full border border-line bg-[#0f1b36] shadow-card">
        <span className="font-display text-[clamp(4rem,14vw,7rem)] leading-none font-medium tracking-tight text-[#f4f1ea]">
          M<span className="text-[#ff8a66] italic">J</span>
        </span>
      </div>
      <span className="absolute right-[6%] bottom-[10%] rounded-full border border-line bg-surface px-3 py-1 font-mono text-[0.7rem] tracking-wide text-muted">
        {"<dev />"}
      </span>
    </div>
  );
}
