import type { Album } from "@/data/albums";

interface VinylDiscProps {
  album: Album;
  /** Gira continuamente (en la vista del álbum). */
  spinning?: boolean;
  className?: string;
}

/** Disco de vinilo dibujado con CSS: surcos, brillo y etiqueta central del álbum. */
export default function VinylDisc({ album, spinning = false, className = "" }: VinylDiscProps) {
  return (
    <div aria-hidden="true" className={`vinyl ${spinning ? "vinyl-spin" : ""} ${className}`}>
      <div
        className="vinyl-label"
        style={{ backgroundColor: album.cover.background, color: album.cover.foreground }}
      >
        <span className="vinyl-label-catalog">{album.catalog}</span>
        <span className="vinyl-label-title">{album.title}</span>
        <span className="vinyl-label-hole" />
      </div>
    </div>
  );
}
