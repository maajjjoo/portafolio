import Image from "next/image";

import { portfolio } from "@/config/portfolio";

// Se calcula al compilar en next.config.ts: "" si no existe public/images/perfil.*.
const photoSrc = process.env.PROFILE_PHOTO_SRC ?? "";

/**
 * Foto de perfil en un marco de arco. Mientras no exista la foto se muestra
 * un monograma. Para añadirla, guarda public/images/perfil.png (o .jpg/.webp)
 * y vuelve a compilar.
 */
export default function Portrait() {
  return (
    <div className="relative">
      <div className="relative aspect-[3/4] overflow-hidden rounded-t-full rounded-b-[2rem] border border-line bg-wine shadow-card">
        {photoSrc ? (
          <Image
            src={photoSrc}
            alt={`Foto de ${portfolio.fullName}`}
            fill
            preload
            sizes="(min-width: 1024px) 24rem, 70vw"
            className="object-cover object-top"
          />
        ) : (
          <div aria-hidden="true" className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,#a33a52_0%,#7b1e34_45%,#2a0b13_100%)]" />
            <div className="absolute inset-[7%] rounded-t-full rounded-b-[1.6rem] border border-[#f3e6d8]/25" />
            <div className="absolute inset-0 grid place-items-center">
              <span className="font-display text-[clamp(6rem,22vw,10rem)] leading-none text-[#f3e6d8]">
                M<span className="italic">J</span>
              </span>
            </div>
            <p className="label absolute inset-x-0 bottom-[10%] text-center text-[#f3e6d8]/70">Foto próximamente</p>
          </div>
        )}
      </div>

      {/* Insignia circular que gira. */}
      <div aria-hidden="true" className="absolute -top-4 -right-6 size-28 sm:-right-10 sm:size-32">
        <div className="absolute inset-0 grid place-items-center rounded-full border border-line bg-bg/90 backdrop-blur">
          <span className="font-script text-3xl text-accent">mj</span>
        </div>
        <svg viewBox="0 0 100 100" className="spin-slow absolute inset-0 text-ink">
          <defs>
            <path id="circulo-insignia" d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1-76 0" />
          </defs>
          <text fontSize="8.4" fill="currentColor">
            <textPath href="#circulo-insignia" textLength="234" lengthAdjust="spacing">SOFTWARE ✦ CÓDIGO ✦ DISEÑO ✦ IDEAS ✦</textPath>
          </text>
        </svg>
      </div>
    </div>
  );
}
