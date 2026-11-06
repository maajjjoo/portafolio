/**
 * La luz de la sala: noche (lámpara encendida) o día (lámpara apagada).
 * La comparten el botón de la cabecera y la lámpara del mueble.
 */

export type Theme = "light" | "dark";

export function subscribeTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

export function readTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

function applyTheme(next: Theme) {
  document.documentElement.setAttribute("data-theme", next);
  try {
    localStorage.setItem("theme", next);
  } catch {
    // Sin almacenamiento (modo privado, etc.): el cambio dura solo esta visita.
  }
}

/**
 * Cambia la luz. Si el navegador lo permite, la nueva luz se extiende por la sala desde
 * el objeto pulsado (la lámpara o el botón). Con movimiento reducido el cambio es inmediato.
 */
export function switchTheme(next: Theme, origin?: Element | null) {
  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!origin || reduce || typeof document.startViewTransition !== "function") {
    applyTheme(next);
    return;
  }

  const box = origin.getBoundingClientRect();
  const x = box.left + box.width / 2;
  const y = box.top + box.height / 2;
  const reach = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
  root.style.setProperty("--light-x", `${Math.round(x)}px`);
  root.style.setProperty("--light-y", `${Math.round(y)}px`);
  root.style.setProperty("--light-reach", `${Math.ceil(reach)}px`);
  root.classList.add("light-switching");

  const transition = document.startViewTransition(() => applyTheme(next));
  transition.finished.finally(() => root.classList.remove("light-switching"));
}
