import type { Album } from "@/data/albums";

interface CoverArtProps {
  album: Album;
  /** Distingue los id internos del SVG cuando la misma portada está dos veces en la página (sala y álbum). */
  place?: "room" | "album";
  className?: string;
}

/**
 * Portada original en SVG, impresa como un cartel: formas grandes de color plano, tintas que se
 * solapan y grano de papel. Solo lleva el título. Es decorativa: el nombre accesible lo da el
 * enlace o el título que la acompaña.
 */
export default function CoverArt({ album, place = "room", className = "" }: CoverArtProps) {
  const { background: bg, foreground: fg } = album.cover;
  // En el sobre, el título va en claro sobre la solapa de abajo.
  const titleInk = album.cover.motif === "waves" ? album.cover.accent : fg;
  const id = `${place}-${album.slug}`;

  return (
    <svg viewBox="0 0 300 300" aria-hidden="true" className={`block size-full ${className}`}>
      <defs>
        <filter id={`grano-${id}`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" seed={album.order} />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0.55" />
          </feComponentTransfer>
        </filter>
        <linearGradient id={`luz-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.16" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.22" />
        </linearGradient>
      </defs>

      <rect width="300" height="300" fill={bg} />
      <Motif album={album} id={id} />
      <text x="20" y="278" fill={titleInk} fontSize="33" style={{ fontFamily: "var(--font-gloock)" }}>
        {album.title}
      </text>

      {/* Papel: grano y la luz que cae sobre la funda. */}
      <rect width="300" height="300" filter={`url(#grano-${id})`} opacity="0.32" style={{ mixBlendMode: "overlay" }} />
      <rect width="300" height="300" fill={`url(#luz-${id})`} />
    </svg>
  );
}

const ink = { mixBlendMode: "multiply" } as const;

function Motif({ album, id }: { album: Album; id: string }) {
  const { background: bg, foreground: fg, accent } = album.cover;

  switch (album.cover.motif) {
    // Hola, mundo: un sol que sale, cortado por franjas, y las iniciales encima.
    case "monogram":
      return (
        <g>
          <circle cx="150" cy="150" r="104" fill={accent} />
          {/* Franjas cada vez más anchas, cortadas a la medida del sol. */}
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const y = 150 + i * 17;
            const half = Math.sqrt(104 * 104 - (y - 150) ** 2) + 1;
            return <rect key={i} x={150 - half} y={y} width={half * 2} height={3 + i * 2.2} fill={bg} />;
          })}
          <text x="150" y="146" textAnchor="middle" fill={fg} fontSize="96" style={{ fontFamily: "var(--font-gloock)" }}>
            MJ
          </text>
        </g>
      );

    // Quién soy: una puerta en arco, y un círculo que no cabe del todo dentro.
    case "portrait":
      return (
        <g>
          <path d="M66 236V128a84 84 0 0 1 168 0v108Z" fill={fg} />
          <path d="M80 248V140a84 84 0 0 1 168 0v108" fill="none" stroke={accent} strokeWidth="2.5" />
          <circle cx="196" cy="96" r="46" fill={accent} style={ink} />
          <circle cx="196" cy="96" r="46" fill="none" stroke={bg} strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="2 5" />
        </g>
      );

    // Repositorio: el grafo de ramas de un repositorio, sobre unas llaves enormes.
    case "grid":
      return (
        <g>
          <text x="-14" y="236" fill={accent} fillOpacity="0.16" fontSize="270" style={{ fontFamily: "var(--font-gloock)" }}>
            {"{ }"}
          </text>
          <g fill="none" strokeWidth="5" strokeLinecap="round">
            <path d="M24 176H276" stroke={fg} />
            <path d="M74 176C110 176 104 104 142 104H190C226 104 222 176 252 176" stroke={accent} />
            <path d="M118 176C140 176 138 140 162 140C184 140 186 176 210 176" stroke={fg} strokeOpacity="0.55" />
          </g>
          {[
            [46, 176, fg], [74, 176, fg], [142, 104, accent], [190, 104, accent], [162, 140, fg], [118, 176, fg], [210, 176, fg], [252, 176, fg],
          ].map(([x, y, c]) => (
            <circle key={`${x}-${y}`} cx={x as number} cy={y as number} r="9" fill={bg} stroke={c as string} strokeWidth="4.5" />
          ))}
          <circle cx="252" cy="176" r="5" fill={accent} />
        </g>
      );

    // Otras voces: dos bocadillos que se solapan, como dos tintas.
    case "quotes":
      return (
        <g>
          <path d="M42 138a82 74 0 1 1 52 69l-38 22 10-36A73 73 0 0 1 42 138Z" fill={fg} style={ink} />
          <path d="M268 152a72 66 0 1 0-44 61l34 20-8-32a64 64 0 0 0 18-49Z" fill={accent} style={ink} />
          <text x="72" y="196" fill={bg} fontSize="150" style={{ fontFamily: "var(--font-gloock)" }}>
            “
          </text>
        </g>
      );

    // Línea de tiempo: un camino que sube entre curvas de nivel, con sus hitos.
    case "timeline":
      return (
        <g fill="none">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <path key={i} d={`M-20 ${236 - i * 26}C80 ${206 - i * 26} 170 ${266 - i * 26} 320 ${196 - i * 26}`} stroke={fg} strokeOpacity="0.12" strokeWidth="1.5" />
          ))}
          <path d="M18 236C96 236 74 160 150 156S214 70 286 54" stroke={fg} strokeWidth="12" strokeLinecap="round" />
          {[
            [56, 228, 7], [118, 170, 7], [190, 128, 7], [262, 60, 13],
          ].map(([x, y, r], i) => (
            <circle key={x} cx={x} cy={y} r={r} fill={i === 3 ? accent : bg} stroke={i === 3 ? fg : accent} strokeWidth="4" />
          ))}
        </g>
      );

    // Escríbeme: el sobre ocupa toda la funda, con su lacre.
    case "waves":
      return (
        <g>
          <path d="M0 300 150 168 300 300Z" fill={fg} fillOpacity="0.75" style={ink} />
          <path d="M0 40 150 168 0 300Z" fill={fg} fillOpacity="0.55" style={ink} />
          <path d="M300 40 150 168 300 300Z" fill={fg} fillOpacity="0.4" style={ink} />
          <path d="M0 40H300L150 168Z" fill={accent} />
          <path d="M0 40H300L150 168Z" fill="#000" fillOpacity="0.08" transform="translate(0 6)" />
          <circle cx="150" cy="160" r="30" fill={bg} />
          <circle cx="150" cy="160" r="21" fill="none" stroke={accent} strokeWidth="2" />
          <text x="150" y="171" textAnchor="middle" fill={accent} fontSize="30" style={{ fontFamily: "var(--font-gloock)" }}>
            M
          </text>
        </g>
      );

    // Stack: capas apiladas, vistas en isométrico.
    case "rings":
      return (
        <g>
          {[3, 2, 1, 0].map((level) => {
            const y = 66 + level * 38;
            const top = `M150 ${y - 44}L242 ${y}L150 ${y + 44}L58 ${y}Z`;
            return (
              <g key={level}>
                <path d={`M58 ${y}L150 ${y + 44}V${y + 66}L58 ${y + 22}Z`} fill={accent} />
                <path d={`M242 ${y}L150 ${y + 44}V${y + 66}L242 ${y + 22}Z`} fill={accent} style={{ filter: "brightness(0.6)" }} />
                <path d={top} fill={level === 0 ? fg : bg} stroke={fg} strokeWidth="2" />
                {level !== 0 ? <path d={top} fill={fg} fillOpacity={0.12 + (3 - level) * 0.08} /> : null}
              </g>
            );
          })}
        </g>
      );

    // Créditos finales: los créditos suben y se pierden, con el código de barras de la contraportada.
    case "back-cover":
      return (
        <g>
          <defs>
            <linearGradient id={`sube-${id}`} x1="0" y1="1" x2="0" y2="0">
              <stop offset="0" stopColor="#fff" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <mask id={`creditos-${id}`}>
              <rect x="0" y="20" width="300" height="200" fill={`url(#sube-${id})`} />
            </mask>
          </defs>
          <g mask={`url(#creditos-${id})`} fill={fg}>
            {Array.from({ length: 9 }, (_, i) => (
              <g key={i}>
                <rect x={130 - 30 - ((i * 23) % 40)} y={36 + i * 20} width={30 + ((i * 23) % 40)} height="6" rx="3" fillOpacity="0.45" />
                <rect x="146" y={36 + i * 20} width={36 + ((i * 41) % 50)} height="6" rx="3" />
              </g>
            ))}
          </g>
          <circle cx="138" cy="219" r="5" fill={accent} />
          {Array.from({ length: 16 }, (_, i) => (
            <rect key={i} x={214 + i * 4} y="20" width={i % 3 === 0 ? 2.5 : 1.2} height="46" fill={fg} />
          ))}
        </g>
      );
  }
}
