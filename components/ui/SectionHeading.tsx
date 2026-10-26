import type { ReactNode } from "react";

import { SparkleIcon } from "@/components/ui/Icons";
import SplitText from "@/components/ui/SplitText";

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  titleId: string;
  intro?: string;
  /** Enlace o acción alineada a la derecha, como en "Ver todos →". */
  action?: ReactNode;
}

export default function SectionHeading({ index, eyebrow, title, titleId, intro, action }: SectionHeadingProps) {
  return (
    <header data-reveal className="mb-12 md:mb-16">
      <div className="mb-8 flex items-center justify-between gap-4 border-b border-line pb-4">
        <p className="label flex items-center gap-3 text-muted">
          <span className="text-accent">{index}</span>
          {eyebrow}
          <SparkleIcon className="spin-slow text-accent" width={14} height={14} />
        </p>
        {action}
      </div>
      <div className="grid gap-6 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-end md:gap-12">
        <h2 id={titleId} className="font-display text-5xl leading-[0.95] text-balance sm:text-6xl lg:text-7xl">
          <SplitText text={title} step={28} />
        </h2>
        {intro ? <p className="max-w-prose text-base leading-relaxed text-muted md:text-lg">{intro}</p> : null}
      </div>
    </header>
  );
}
