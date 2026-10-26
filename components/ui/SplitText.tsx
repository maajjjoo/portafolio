import type { CSSProperties } from "react";

interface SplitTextProps {
  text: string;
  /** Retraso inicial en milisegundos. */
  delay?: number;
  /** Separación entre letras en milisegundos. */
  step?: number;
  className?: string;
}

/**
 * Divide un texto en letras animadas (ver .split-char en globals.css).
 * Las letras visibles se ocultan a lectores de pantalla; el texto completo
 * se lee una sola vez desde el span `sr-only`.
 */
export default function SplitText({ text, delay = 0, step = 45, className }: SplitTextProps) {
  let index = 0;
  const words = text.split(" ");

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" style={{ "--d": `${delay}ms`, "--step": `${step}ms` } as CSSProperties}>
        {words.map((word, wordIndex) => (
          <span key={wordIndex}>
            <span className="split-word">
              {Array.from(word).map((char) => {
                const i = index++;
                return (
                  <span key={i} className="split-char" style={{ "--i": i } as CSSProperties}>
                    {char}
                  </span>
                );
              })}
            </span>
            {wordIndex < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </span>
  );
}
