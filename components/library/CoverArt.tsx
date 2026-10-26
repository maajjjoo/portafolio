import type { Album } from "@/data/albums";

/**
 * Portada original en SVG. Todas comparten la misma retícula tipográfica
 * (catálogo arriba, título abajo) para que se lean como una colección.
 * Es decorativa: el nombre accesible lo da el enlace o el título que la acompaña.
 */
export default function CoverArt({ album, className = "" }: { album: Album; className?: string }) {
  const { background: bg, foreground: fg, accent } = album.cover;

  return (
    <svg viewBox="0 0 300 300" aria-hidden="true" className={`block size-full ${className}`}>
      <rect width="300" height="300" fill={bg} />
      <Motif album={album} />
      {/* Brillo de papel. */}
      <rect width="300" height="300" fill={`url(#sheen-${album.slug})`} opacity="0.35" />
      <defs>
        <linearGradient id={`sheen-${album.slug}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <text x="18" y="30" fill={fg} fontSize="10" letterSpacing="2.5" style={{ fontFamily: "var(--font-manrope)" }} fontWeight="700">
        {album.catalog}
      </text>
      <text x="282" y="30" fill={fg} fontSize="10" letterSpacing="2.5" textAnchor="end" style={{ fontFamily: "var(--font-manrope)" }} opacity="0.8">
        LADO {album.side}
      </text>
      <text x="18" y="276" fill={fg} fontSize="34" style={{ fontFamily: "var(--font-instrument)" }}>
        {album.title}
      </text>
      <rect x="18" y="286" width="40" height="2" fill={accent} />
    </svg>
  );
}

function Motif({ album }: { album: Album }) {
  const { background: bg, foreground: fg, accent } = album.cover;

  switch (album.cover.motif) {
    case "monogram":
      return (
        <g>
          {[110, 90, 70, 50].map((r) => (
            <circle key={r} cx="150" cy="138" r={r} fill="none" stroke={fg} strokeOpacity="0.18" />
          ))}
          <circle cx="232" cy="62" r="9" fill={accent} />
          <text x="150" y="172" textAnchor="middle" fill={fg} fontSize="104" style={{ fontFamily: "var(--font-instrument)" }}>
            M<tspan fontStyle="italic" fill={accent}>J</tspan>
          </text>
        </g>
      );
    case "portrait":
      return (
        <g>
          <path d="M80 245 V150 a70 70 0 0 1 140 0 V245 Z" fill={fg} />
          <circle cx="150" cy="128" r="34" fill={accent} />
          <path d="M80 245 V150 a70 70 0 0 1 140 0" fill="none" stroke={bg} strokeOpacity="0.25" strokeWidth="10" transform="translate(0 14)" />
          <circle cx="236" cy="70" r="16" fill="none" stroke={accent} strokeWidth="2" />
        </g>
      );
    case "grid":
      return (
        <g>
          {Array.from({ length: 6 }, (_, row) =>
            Array.from({ length: 6 }, (_, col) => {
              const filled = (row * 7 + col * 3) % 5 === 0;
              return (
                <rect
                  key={`${row}-${col}`}
                  x={48 + col * 34}
                  y={52 + row * 28}
                  width="26"
                  height="20"
                  rx="3"
                  fill={filled ? accent : fg}
                  fillOpacity={filled ? 0.95 : 0.12}
                />
              );
            }),
          )}
          <text x="150" y="168" textAnchor="middle" fill={fg} fontSize="40" style={{ fontFamily: "var(--font-manrope)" }} fontWeight="300" opacity="0.9">
            {"</>"}
          </text>
        </g>
      );
    case "quotes":
      return (
        <g>
          <text x="40" y="200" fill={fg} fontSize="230" style={{ fontFamily: "var(--font-instrument)" }}>
            “
          </text>
          <text x="150" y="232" fill={fg} fontSize="230" style={{ fontFamily: "var(--font-instrument)" }} opacity="0.35">
            ”
          </text>
          <circle cx="226" cy="86" r="22" fill={accent} />
        </g>
      );
    case "timeline":
      return (
        <g>
          {Array.from({ length: 9 }, (_, i) => (
            <line key={i} x1={-40 + i * 44} y1="240" x2={60 + i * 44} y2="40" stroke={fg} strokeOpacity="0.1" strokeWidth="14" />
          ))}
          <line x1="40" y1="150" x2="260" y2="150" stroke={fg} strokeWidth="2" />
          {[60, 120, 180, 240].map((x, i) => (
            <circle key={x} cx={x} cy="150" r={i === 3 ? 12 : 7} fill={i === 3 ? accent : fg} />
          ))}
        </g>
      );
    case "waves":
      return (
        <g fill="none" stroke={fg} strokeWidth="2.5">
          {Array.from({ length: 8 }, (_, i) => (
            <path key={i} d={`M-10 ${70 + i * 20} q 40 -24 80 0 t 80 0 t 80 0 t 80 0`} strokeOpacity={0.25 + i * 0.09} />
          ))}
          <rect x="196" y="48" width="64" height="44" rx="4" stroke={accent} />
          <path d="M196 52 l32 22 l32 -22" stroke={accent} />
        </g>
      );
    case "rings":
      return (
        <g>
          {Array.from({ length: 7 }, (_, i) => (
            <circle key={i} cx="150" cy="140" r={104 - i * 14} fill="none" stroke={fg} strokeOpacity={0.2 + i * 0.1} strokeDasharray={i % 2 ? "4 6" : undefined} />
          ))}
          <circle cx="150" cy="140" r="18" fill={accent} />
          <circle cx="150" cy="140" r="3" fill={bg} />
        </g>
      );
    case "back-cover":
      return (
        <g>
          {Array.from({ length: 8 }, (_, i) => (
            <g key={i}>
              <text x="40" y={70 + i * 20} fill={fg} fontSize="9" style={{ fontFamily: "var(--font-manrope)" }} opacity="0.7">
                {String(i + 1).padStart(2, "0")}
              </text>
              <rect x="62" y={63 + i * 20} width={90 + ((i * 37) % 80)} height="5" rx="2.5" fill={fg} fillOpacity="0.2" />
            </g>
          ))}
          {Array.from({ length: 22 }, (_, i) => (
            <rect key={i} x={208 + i * 3} y="186" width={i % 3 === 0 ? 2 : 1} height="40" fill={fg} />
          ))}
          <rect x="226" y="54" width="34" height="34" fill="none" stroke={accent} strokeWidth="2" />
        </g>
      );
  }
}
