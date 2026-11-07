"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import CoverArt from "@/components/library/CoverArt";
import { CloseIcon, MenuIcon } from "@/components/ui/Icons";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { portfolio } from "@/config/portfolio";
import { albums } from "@/data/albums";
import { albumHref, sortedAlbums } from "@/lib/albums";

const ordered = sortedAlbums(albums);

/**
 * Barra de navegación del sitio: identidad, regreso a la sala y un
 * panel "Álbumes" con acceso directo a todas las secciones.
 */
export default function LibraryHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const onLibrary = pathname === "/";

  // Cierra el panel cuando cambia la ruta (por ejemplo, con el botón Atrás).
  if (open && openedAt !== pathname) {
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!panelRef.current?.contains(target) && !buttonRef.current?.contains(target)) setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  function toggle() {
    setOpenedAt(pathname);
    setOpen((value) => !value);
  }

  return (
    <header style={{ viewTransitionName: "site-header" }} className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
      <nav aria-label="Principal" className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-3 px-5 sm:px-8">
        <Link href="/" transitionTypes={["room-close"]} className="group flex items-center gap-3" aria-label={`${portfolio.fullName}: ir a la sala`}>
          <span className="grid size-10 place-items-center rounded-full bg-wine font-display text-lg text-on-wine transition-transform duration-700 group-hover:rotate-[360deg]">
            {portfolio.initials}
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block font-display text-lg">María José</span>
            <span className="block text-[0.8125rem] text-muted">Portafolio</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            ref={buttonRef}
            type="button"
            onClick={toggle}
            aria-expanded={open}
            aria-controls="panel-albumes"
            className="label inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 transition-colors hover:border-ink"
          >
            {open ? <CloseIcon width={16} height={16} /> : <MenuIcon width={16} height={16} />}
            Álbumes
          </button>
          <ThemeToggle />
        </div>
      </nav>

      <div ref={panelRef} id="panel-albumes" hidden={!open} className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-line bg-bg">
        <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8">
          <p className="label mb-4 text-muted">Toda la colección · elige un disco</p>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            <li className="sm:hidden">
              <Link
                href="/"
                transitionTypes={["room-close"]}
                onClick={() => setOpen(false)}
                aria-current={onLibrary ? "page" : undefined}
                className="flex min-h-14 items-center gap-3 rounded-xl border border-line px-3 py-2 transition-colors hover:border-ink aria-[current=page]:border-wine"
              >
                <span className="font-display text-xl">Sala de escucha</span>
              </Link>
            </li>
            {ordered.map((album) => {
              const href = albumHref(album.slug);
              const current = pathname === href;
              return (
                <li key={album.slug}>
                  <Link
                    href={href}
                    transitionTypes={["nav-forward"]}
                    onClick={() => setOpen(false)}
                    aria-current={current ? "page" : undefined}
                    className="group flex min-h-14 items-center gap-3 rounded-xl border border-line px-3 py-2 transition-colors hover:border-ink aria-[current=page]:border-wine aria-[current=page]:bg-surface"
                  >
                    <span className="size-10 shrink-0 overflow-hidden rounded-[2px]">
                      <CoverArt album={album} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.8125rem] text-muted">{album.section}</span>
                      <span className="block truncate font-display text-xl">{album.title}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </header>
  );
}
