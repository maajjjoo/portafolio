import type { Album } from "@/data/albums";

interface VinylDiscProps {
  album: Album;
  /** Gira continuamente (en la vista del álbum). */
  spinning?: boolean;
  className?: string;
}

/** Disco de vinilo dibujado con CSS: surcos, brillo y la etiqueta central con los colores del álbum. */
export default function VinylDisc({ album, spinning = false, className = "" }: VinylDiscProps) {
  return (
    <div aria-hidden="true" className={`vinyl ${spinning ? "vinyl-spin" : ""} ${className}`}>
      <div
        className="vinyl-label"
        style={{
          backgroundColor: album.cover.background,
          // Etiqueta sin texto: solo el color del álbum y un anillo de su acento.
          backgroundImage: `radial-gradient(circle, transparent 56%, ${album.cover.accent} 57% 61%, transparent 62%)`,
        }}
      >
        <span className="vinyl-label-hole" />
      </div>
    </div>
  );
}
