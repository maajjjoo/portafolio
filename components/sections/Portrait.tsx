import Image from "next/image";

import { portfolio } from "@/config/portfolio";

// Se calcula al compilar en next.config.ts: "" si no existe public/images/perfil.*.
const photoSrc = process.env.PROFILE_PHOTO_SRC ?? "";

/**
 * Foto de perfil como la portada de un disco: la foto completa, sin recortes, y detrás un vinilo
 * que sale deslizándose y gira despacio. Mientras no exista la foto se muestra un monograma.
 * Para añadirla, guarda public/images/perfil.png (o .jpg/.webp) y vuelve a compilar.
 */
export default function Portrait() {
  return (
    <div className="portrait">
      <div aria-hidden="true" className="portrait-disc">
        <div className="vinyl vinyl-spin">
          <div className="vinyl-label portrait-disc-label">
            <span className="vinyl-label-hole" />
          </div>
        </div>
      </div>

      <div className="portrait-photo">
        {photoSrc ? (
          <Image
            src={photoSrc}
            alt={`Foto de ${portfolio.fullName}`}
            fill
            preload
            sizes="(min-width: 1024px) 18rem, 60vw"
            className="object-cover"
          />
        ) : (
          <div aria-hidden="true" className="absolute inset-0 grid place-items-center bg-wine">
            <span className="font-display text-[clamp(5rem,18vw,8rem)] leading-none text-on-wine">
              M<span className="italic">J</span>
            </span>
            <p className="label absolute inset-x-0 bottom-[8%] text-center text-on-wine/85">Foto próximamente</p>
          </div>
        )}
      </div>
    </div>
  );
}
