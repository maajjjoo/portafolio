import type { CSSProperties } from "react";

import VinylDisc from "@/components/library/VinylDisc";
import { SparkleIcon } from "@/components/ui/Icons";
import SplitText from "@/components/ui/SplitText";
import { portfolio } from "@/config/portfolio";
import { albums } from "@/data/albums";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;
const sideA = albums.filter((album) => album.side === "A").length;
const sideB = albums.length - sideA;

/** Bienvenida de la biblioteca: título de la colección y cómo usarla. */
export default function LibraryWelcome() {
  return (
    <section aria-labelledby="biblioteca-titulo" className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 -z-10 size-[44rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--glow)_0%,transparent_65%)]"
      />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 pt-10 pb-12 sm:px-8 md:pt-16 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-end">
        <div>
          <p className="fade-up label flex items-center gap-3 text-muted" style={delay(80)}>
            <SparkleIcon className="spin-slow text-accent" width={12} height={12} />
            La colección de {portfolio.fullName}
          </p>
          <h1 id="biblioteca-titulo" className="mt-5 font-display text-[clamp(3.6rem,11vw,9.5rem)] leading-[0.85] tracking-tight">
            <SplitText text={portfolio.libraryTitle} delay={150} step={50} />
          </h1>
          <p className="fade-up mt-6 max-w-xl text-lg leading-relaxed text-muted" style={delay(900)}>
            Te doy la bienvenida a mi archivo. Soy estudiante de {portfolio.academic.degree} y cada disco de esta colección es
            una parte de mi portafolio: quién soy, mis proyectos, mi experiencia y cómo contactarme.
          </p>
        </div>

        <div className="fade-up border-l-2 border-wine pl-6" style={delay(1100)}>
          <p className="label text-accent">Cómo explorar</p>
          <ol className="mt-4 space-y-3 text-sm leading-relaxed">
            <li className="flex gap-3">
              <span className="font-display text-xl leading-none text-accent">1</span>
              Elige un disco del estante (con clic, toque o la tecla Tab y Enter).
            </li>
            <li className="flex gap-3">
              <span className="font-display text-xl leading-none text-accent">2</span>
              El disco sale de su funda y se abre el álbum con su contenido.
            </li>
            <li className="flex gap-3">
              <span className="font-display text-xl leading-none text-accent">3</span>
              Pasa al disco anterior o siguiente, o vuelve a la biblioteca cuando quieras.
            </li>
          </ol>
          <p className="label mt-6 text-muted">
            {albums.length} discos · lado A: {sideA} · lado B: {sideB}
          </p>
        </div>
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute top-24 -right-24 hidden w-72 opacity-80 xl:block">
        <VinylDisc album={albums[0]} spinning />
      </div>
    </section>
  );
}
