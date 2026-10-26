import type { CSSProperties } from "react";

/**
 * Texto cuyas letras ruedan hacia arriba, una tras otra, al pasar el cursor
 * o enfocar el enlace o botón que lo contiene (ver .roll en globals.css).
 */
export default function RollText({ children }: { children: string }) {
  return (
    <>
      <span className="sr-only">{children}</span>
      <span aria-hidden="true" className="roll">
        {Array.from(children).map((char, i) => (
          <span key={i} className="roll-char" data-char={char} style={{ "--i": i } as CSSProperties}>
            {char}
          </span>
        ))}
      </span>
    </>
  );
}
