/** Elige la pista actual de un álbum a partir de la posición de sus anclas en la ventana. */

export interface TrackTarget {
  top: number;
  left: number;
  right: number;
}

/** Anclas con el borde izquierdo a esta distancia o menos forman una misma columna. */
const COLUMN_TOLERANCE = 8;

interface Column extends TrackTarget {
  index: number;
}

/**
 * Cada columna aporta la última pista que cruzó la línea de lectura. Si hay varias columnas,
 * gana la más cercana a donde mira el visitante (`attentionX`) y, si no se sabe, la que
 * cruzó la línea más recientemente. Devuelve 0 si ninguna pista la ha cruzado.
 */
export function pickActiveTrack(targets: readonly (TrackTarget | null)[], line: number, attentionX: number | null): number {
  const columns: Column[] = [];

  targets.forEach((target, index) => {
    if (!target || target.top > line) return;
    const column = columns.find((candidate) => Math.abs(candidate.left - target.left) <= COLUMN_TOLERANCE);
    if (!column) {
      columns.push({ ...target, index });
      return;
    }
    column.right = Math.max(column.right, target.right);
    if (target.top > column.top) {
      column.top = target.top;
      column.index = index;
    }
  });

  const distance = (column: Column) =>
    attentionX === null ? 0 : Math.max(column.left - attentionX, attentionX - column.right, 0);

  const [best] = columns.sort((a, b) => distance(a) - distance(b) || b.top - a.top || a.index - b.index);
  return best?.index ?? 0;
}
