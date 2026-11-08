/**
 * La transición entre la sala y un álbum. Solo el disco elegido recibe nombres de transición,
 * y únicamente mientras dura: si todos los discos los tuvieran siempre, React los volvería a
 * emparejar con los álbumes ya visitados (Next los conserva ocultos) y también se animarían.
 * El lado del álbum lleva los mismos nombres en app/room.css.
 */

/** Lo que dura la coreografía de apertura, incluido el disco saliendo de la funda. */
const OPENING_MS = 2200;
const NAMED_MS = 2000;

let openingTimer = 0;
let namedTimer = 0;
let named: HTMLElement[] = [];

function clearNames() {
  named.forEach((element) => {
    element.style.viewTransitionName = "";
  });
  named = [];
}

/** Da a la funda y al vinilo de este disco, y a ningún otro, su papel en la transición. */
export function nameRecord(record: HTMLElement) {
  clearNames();
  const sleeve = record.querySelector<HTMLElement>(".record-sleeve, [data-camera=sleeve]");
  const disc = record.querySelector<HTMLElement>(".record-disc, [data-camera=disc]");
  if (!sleeve || !disc) return;

  sleeve.style.viewTransitionName = "camera-sleeve";
  disc.style.viewTransitionName = "camera-disc";
  named = [sleeve, disc];
  window.clearTimeout(namedTimer);
  namedTimer = window.setTimeout(clearNames, NAMED_MS);
}

/** Marca la apertura para que, en el álbum, el disco espere a que termine el viaje. */
export function markOpening() {
  const root = document.documentElement;
  root.dataset.dolly = "open";
  window.clearTimeout(openingTimer);
  openingTimer = window.setTimeout(() => delete root.dataset.dolly, OPENING_MS);
}

/** Recuerda el álbum abierto, para volver a su disco al regresar a la sala. */
export function rememberAlbum(slug: string) {
  document.documentElement.dataset.lastAlbum = slug;
}

/** Al volver a la sala: la funda regresa a su sitio y el foco de teclado también. */
export function returnToLastRecord() {
  const root = document.documentElement;
  const slug = root.dataset.lastAlbum;
  if (!slug) return;
  delete root.dataset.lastAlbum;

  const href = `/album/${CSS.escape(slug)}`;
  const record = document.querySelector<HTMLElement>(`.record[href="${href}"], [data-record][href="${href}"]`);
  if (!record) return;
  nameRecord(record);
  record.focus({ preventScroll: true });
}
