interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  titleId: string;
  intro?: string;
}

export default function SectionHeading({ index, eyebrow, title, titleId, intro }: SectionHeadingProps) {
  return (
    <header className="mb-10 grid gap-4 md:mb-14 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:items-end md:gap-12">
      <div>
        <p className="mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
          <span className="text-accent">{index}</span>
          <span aria-hidden="true" className="h-px w-8 bg-line" />
          {eyebrow}
        </p>
        <h2
          id={titleId}
          className="font-display text-4xl leading-[1.05] font-medium tracking-tight text-balance sm:text-5xl"
        >
          {title}
        </h2>
      </div>
      {intro ? <p className="max-w-prose text-base leading-relaxed text-muted md:text-lg">{intro}</p> : null}
    </header>
  );
}
