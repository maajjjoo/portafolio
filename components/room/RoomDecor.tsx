import LampSwitch from "@/components/room/LampSwitch";

/** Lo que hay en la sala: pared, suelo, altavoces, planta. Todo es decorativo salvo la lámpara, que cambia la luz. */

const leaves = [
  [58, 26, 22, -18], [34, 62, 24, 28], [76, 84, 22, -30], [44, 120, 26, 22], [84, 148, 22, -24],
  [40, 186, 24, 30], [72, 216, 24, -18], [34, 256, 22, 24], [62, 288, 24, -26], [40, 330, 20, 26],
  [66, 362, 20, -14], [46, 398, 18, 18],
] as const;

function Leaf({ x, y, size, angle, fill }: { x: number; y: number; size: number; angle: number; fill: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${size / 24})`}>
      <path d="M0-16C10-14 16-4 14 6 12 14 5 19 0 24-5 19-12 14-14 6-16-4-10-14 0-16Z" fill={fill} />
      {/* Mitad de la hoja en sombra y nervio central. */}
      <path d="M0-16C-10-14-16-4-14 6-12 14-5 19 0 24Z" fill="#000" opacity="0.2" />
      <path d="M0-14V22" stroke="#c6d3a8" strokeWidth="0.7" opacity="0.28" />
    </g>
  );
}

function HangingVine() {
  return (
    <svg viewBox="0 0 120 430" className="room-vine" aria-hidden="true">
      <path d="M56 0C70 40 40 70 58 118s-22 76-6 124-16 74 2 120" fill="none" stroke="#2d3a26" strokeWidth="2.5" />
      {leaves.map(([x, y, size, angle], i) => (
        <Leaf key={`${x}-${y}`} x={x} y={y} size={size} angle={angle} fill={i % 3 === 0 ? "#566b48" : i % 3 === 1 ? "#47573f" : "#384830"} />
      ))}
    </svg>
  );
}

// Hojas de la planta, de atrás adelante: posición, tamaño, giro y color (más clara cuanto más cerca de la lámpara).
const plantLeaves = [
  [26, 44, 15, -62, "#2f3d29"], [40, 22, 17, -26, "#34432d"], [60, 12, 17, 2, "#3f4f37"], [82, 22, 17, 28, "#47573f"], [98, 44, 15, 64, "#566b48"],
  [34, 54, 15, -44, "#3f4f37"], [50, 34, 17, -12, "#47573f"], [70, 34, 17, 14, "#566b48"], [86, 56, 15, 46, "#647a52"],
] as const;

function DeskPlant() {
  return (
    <svg viewBox="0 0 124 112" className="room-plant" aria-hidden="true">
      {/* Maceta de cerámica vidriada: la lámpara la ilumina desde la derecha. */}
      <defs>
        <linearGradient id="ceramica" x1="0" x2="1">
          <stop offset="0" stopColor="#100e0c" />
          <stop offset="0.55" stopColor="#2c2721" />
          <stop offset="0.86" stopColor="#6a5a44" />
          <stop offset="1" stopColor="#3a3228" />
        </linearGradient>
      </defs>
      {plantLeaves.map(([x, y]) => (
        <path key={`${x}-${y}`} d={`M62 78Q${(62 + x) / 2} ${y + 22} ${x} ${y + 14}`} fill="none" stroke="#2d3a26" strokeWidth="1.4" />
      ))}
      {plantLeaves.map(([x, y, size, angle, fill]) => (
        <Leaf key={`${x}-${y}`} x={x} y={y} size={size} angle={angle} fill={fill} />
      ))}
      <path d="M40 80H84L78 110Q62 113 46 110Z" fill="url(#ceramica)" />
      <ellipse cx="62" cy="80" rx="23" ry="4.5" fill="#6a5a44" />
      <ellipse cx="62" cy="80" rx="20" ry="3.4" fill="#120d09" />
    </svg>
  );
}

const PLATTER = { x: 150, y: 62, rx: 106, ry: 24 };
const grooves = Array.from({ length: 21 }, (_, i) => 98 - i * 3);
const strobeDots = Array.from({ length: 56 }, (_, i) => (i / 56) * Math.PI * 2);

/** Tocadiscos visto desde un poco arriba: tapa abierta, nogal, plato de metal, surcos y brazo. */
function Turntable() {
  const { x, y, rx, ry } = PLATTER;
  const squash = ry / rx;

  return (
    <div className="room-turntable" aria-hidden="true">
      <svg viewBox="0 0 390 112">
        <defs>
          <linearGradient id="tt-wood" x1="0" x2="1" y1="0" y2="0.3">
            <stop offset="0" style={{ stopColor: "var(--tt-wood-a, #5c3a20)" }} />
            <stop offset="0.55" style={{ stopColor: "var(--tt-wood-b, #8a5a33)" }} />
            <stop offset="1" style={{ stopColor: "var(--tt-wood-c, #6b4426)" }} />
          </linearGradient>
          <linearGradient id="tt-front" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" style={{ stopColor: "var(--tt-front-a, #3a2413)" }} />
            <stop offset="1" style={{ stopColor: "var(--tt-front-b, #1c1008)" }} />
          </linearGradient>
          <linearGradient id="tt-metal" x1="0" x2="1">
            <stop offset="0" stopColor="#6a665e" />
            <stop offset="0.3" stopColor="#ddd8cc" />
            <stop offset="0.55" stopColor="#8a857b" />
            <stop offset="0.8" stopColor="#e6e0d2" />
            <stop offset="1" stopColor="#5e5a52" />
          </linearGradient>
          <linearGradient id="tt-lid" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#ffe6b8" stopOpacity="0.24" />
            <stop offset="0.45" stopColor="#ffe6b8" stopOpacity="0.03" />
            <stop offset="1" stopColor="#ffe6b8" stopOpacity="0.14" />
          </linearGradient>
          <clipPath id="tt-vinyl">
            <ellipse cx={x} cy={y} rx="99" ry={99 * squash} />
          </clipPath>
        </defs>

        {/* Tapa abierta, apoyada en las bisagras traseras. */}
        <path className="tt-lid" d="M34 34 44 13H346L356 34Z" fill="url(#tt-lid)" stroke="#ffe6b8" strokeOpacity="0.32" strokeWidth="0.8" />
        <path className="tt-lid" d="M44 13H346" stroke="#fff1d6" strokeOpacity="0.5" strokeWidth="0.8" />

        {/* Base de nogal: cara superior y frontal. */}
        <path d="M26 32H364L386 84H4Z" fill="url(#tt-wood)" />
        <path d="M26 32H364L365 34H25Z" fill="#ffd79a" opacity="0.5" />
        <path d="M4 84H386V108H4Z" fill="url(#tt-front)" />
        <path d="M4 84H386" stroke="#c98f55" strokeWidth="0.8" />
        <path d="M22 108h26v4H22ZM342 108h26v4H342Z" fill="#0b0907" />

        {/* Plato: grosor, borde metálico y marcas estroboscópicas. */}
        <ellipse cx={x} cy={y + 5} rx={rx} ry={ry} fill="#0a0806" opacity="0.8" />
        <ellipse cx={x} cy={y + 3} rx={rx} ry={ry} fill="#3e3a33" />
        <ellipse cx={x} cy={y} rx={rx} ry={ry} fill="url(#tt-metal)" />
        {strobeDots.map((angle) => (
          <circle key={angle} cx={x + Math.cos(angle) * (rx - 2.5)} cy={y + Math.sin(angle) * (ry - 0.6)} r="0.6" fill="#1a1712" />
        ))}

        {/* Disco: los surcos y los reflejos no giran a la vista; sí la etiqueta. */}
        <ellipse cx={x} cy={y} rx="99" ry={99 * squash} fill="#0c0b0a" />
        {grooves.map((r) => (
          <ellipse key={r} cx={x} cy={y} rx={r} ry={r * squash} fill="none" stroke="#fff" strokeOpacity={r % 2 === 0 ? 0.09 : 0.035} strokeWidth="0.5" />
        ))}
        <g clipPath="url(#tt-vinyl)">
          <path d={`M${x} ${y}L${x - 76} ${y - 24}L${x - 28} ${y - 26}Z`} fill="#ffe0ac" opacity="0.2" />
          <path d={`M${x} ${y}L${x + 78} ${y + 22}L${x + 26} ${y + 26}Z`} fill="#ffe0ac" opacity="0.14" />
        </g>
        <g transform={`translate(${x} ${y}) scale(1 ${squash})`}>
          <g className="tt-spin">
            <circle r="31" fill="#d2963f" />
            <circle r="31" fill="none" stroke="#7a4f1c" strokeWidth="1" />
            <circle r="22" fill="none" stroke="#1a100a" strokeWidth="0.8" opacity="0.5" />
            <path d="M-20-9H20M-14 13H14" stroke="#1a100a" strokeWidth="2.6" opacity="0.65" />
          </g>
        </g>
        <ellipse cx={x} cy={y} rx="2.4" ry="1.4" fill="#ece6d8" />

        {/* Brazo: pivote, contrapeso, tubo en S y cápsula sobre los surcos. */}
        <ellipse cx="314" cy="50" rx="17" ry="6.5" fill="#1a1712" />
        <ellipse cx="314" cy="48" rx="17" ry="6.5" fill="url(#tt-metal)" />
        <rect x="309" y="36" width="10" height="12" fill="url(#tt-metal)" />
        <path d="M314 40 334 28" stroke="#d9d3c6" strokeWidth="2" />
        <rect x="331" y="21" width="15" height="10" rx="1.5" transform="rotate(-31 338 26)" fill="url(#tt-metal)" />
        <path d="M314 40C288 44 280 55 262 61S232 68 222 70" fill="none" stroke="#000" strokeOpacity="0.45" strokeWidth="3" transform="translate(1 5)" />
        <path d="M314 40C288 44 280 55 262 61S232 68 222 70" fill="none" stroke="url(#tt-metal)" strokeWidth="2.4" />
        <path d="M210 67 224 66 226 72 214 76Z" fill="#e8e2d4" />
        <path d="M212 74h7v3h-7Z" fill="#141210" />

        {/* Mandos: velocidad en el tablero; encendido y luz en el frontal. */}
        <rect x="326" y="65" width="36" height="4" rx="1" fill="#1a100a" />
        <rect x="338" y="60" width="9" height="14" rx="1" fill="url(#tt-metal)" />
        <path d="M342.5 61v12" stroke="#1a1712" strokeWidth="1" />
        <g style={{ fontFamily: "var(--font-hanken)", fontWeight: 600 }} fontSize="10" textAnchor="middle">
          <circle cx="29" cy="96" r="9" fill="#0b0907" />
          <circle cx="29" cy="96" r="7.5" fill="url(#tt-metal)" />
          <path d="M29 90v5" stroke="#1a1712" strokeWidth="1.6" />
          <rect x="50" y="89" width="32" height="14" rx="1.5" fill="url(#tt-metal)" />
          <text x="66" y="99.5" fill="#15130f">33</text>
          <rect x="87" y="89" width="32" height="14" rx="1.5" fill="#46413a" />
          <text x="103" y="99.5" fill="#ece6d8">45</text>
          <circle cx="133" cy="96" r="3" fill="#ffc06a" />
          <circle cx="133" cy="96" r="3" fill="none" stroke="#6b4a1c" strokeWidth="0.8" />
        </g>
      </svg>
    </div>
  );
}

/** Grabado original del marco: surcos de un disco, sin referencias a obras reales. */
function FramedPrint() {
  return (
    <div className="room-frame" aria-hidden="true">
      <svg viewBox="0 0 100 140" className="size-full">
        <rect width="100" height="140" fill="#1f1a15" />
        {[40, 34, 28, 22, 16].map((r) => (
          <circle key={r} cx="50" cy="62" r={r} fill="none" stroke="#c9a46a" strokeWidth="0.7" opacity="0.8" />
        ))}
        <circle cx="50" cy="62" r="7" fill="#c9a46a" />
        <rect x="26" y="118" width="48" height="1.5" fill="#c9a46a" />
      </svg>
    </div>
  );
}

const spineColors = ["#6e2f1c", "#d6c7ab", "#2d3a26", "#8a5a34", "#1f1b17", "#b8842f", "#3c4a52", "#e0d3b8", "#51291a", "#6b6252", "#a03f22", "#2a2119"];

function Spines() {
  return (
    <div className="room-spines" aria-hidden="true">
      {Array.from({ length: 74 }, (_, i) => (
        <span
          key={i}
          style={{
            height: `${86 + ((i * 37) % 13)}%`,
            backgroundColor: spineColors[(i * 7 + (i % 5)) % spineColors.length],
            filter: `brightness(${0.42 + ((i * 13) % 5) * 0.09})`,
          }}
        />
      ))}
    </div>
  );
}

function Speaker({ side }: { side: "l" | "r" }) {
  return (
    <div className={`room-speaker room-speaker-${side}`} aria-hidden="true">
      <span className="room-driver room-driver-sm" />
      <span className="room-driver room-driver-lg" />
      <span className="room-driver room-driver-lg" />
    </div>
  );
}

function Console() {
  return (
    <div className="room-console">
      <Turntable />
      <div className="room-amp" aria-hidden="true">
        <span className="room-knob" />
        <span className="room-amp-dial" />
        <span className="room-knob" />
      </div>
      <DeskPlant />
      <LampSwitch />
      <div className="room-slab" aria-hidden="true" />
      <div className="room-body" aria-hidden="true">
        <Spines />
      </div>
    </div>
  );
}

export function RoomBackdrop() {
  return (
    <>
      <div className="room-veil" aria-hidden="true" />
      <div className="room-slats" aria-hidden="true">
        <FramedPrint />
      </div>
      <div className="room-floor" aria-hidden="true" />
    </>
  );
}

export function RoomFurniture() {
  return (
    <>
      <HangingVine />
      <div aria-hidden="true" className="room-rug" />
      <Speaker side="l" />
      <Speaker side="r" />
      <Console />
    </>
  );
}
