import type { ReactNode } from "react";

import SplitText from "@/components/ui/SplitText";

interface SectionHeadingProps {
  title: string;
  titleId: string;
  intro?: string;
  /** Enlace o acción alineada a la derecha, como en "Ver todos →". */
  action?: ReactNode;
}

/** Título de una sección dentro de un álbum, con las letras animadas al aparecer. */
export default function SectionHeading({ title, titleId, intro, action }: SectionHeadingProps) {
  return (
    <header data-reveal className="mb-12 md:mb-16">
      <div className="grid gap-6 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-end md:gap-12">
        <h2 id={titleId} className="font-display text-4xl leading-[1.08] text-balance sm:text-5xl">
          <SplitText text={title} step={28} />
        </h2>
        <div className="space-y-4">
          {intro ? <p className="max-w-prose text-base leading-relaxed text-muted md:text-lg">{intro}</p> : null}
          {action}
        </div>
      </div>
    </header>
  );
}
