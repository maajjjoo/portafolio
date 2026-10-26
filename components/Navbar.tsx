"use client";

import { useEffect, useState } from "react";

import ThemeToggle from "@/components/ThemeToggle";
import { CloseIcon, MenuIcon } from "@/components/ui/Icons";
import { navItems, sectionIds, type SectionId } from "@/config/navigation";
import { portfolio } from "@/config/portfolio";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<SectionId | null>(null);

  // Resalta el enlace de la sección visible.
  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActive(visible.target.id as SectionId);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onResize = () => desktop.matches && setOpen(false);
    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  const linkClass = (id: SectionId) =>
    `rounded-full px-3 py-2 text-sm font-medium transition-colors hover:text-accent ${
      active === id ? "text-accent" : "text-muted"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-bg/85 backdrop-blur-md">
      <nav aria-label="Principal" className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <a
          href={`#${sectionIds.hero}`}
          className="group flex items-center gap-3"
          aria-label={`${portfolio.fullName}, ir al inicio`}
        >
          <span className="grid size-10 place-items-center rounded-full bg-ink font-display text-base font-semibold text-bg transition-colors group-hover:bg-accent group-hover:text-on-accent">
            {portfolio.initials}
          </span>
          <span className="hidden font-display text-lg leading-none font-medium sm:block">{portfolio.shortName}</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className={linkClass(item.id)} aria-current={active === item.id ? "true" : undefined}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-line lg:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      <div id="menu-movil" hidden={!open} className="border-t border-line bg-bg lg:hidden">
        <ul className="mx-auto grid max-w-6xl gap-1 px-5 py-4 sm:px-8">
          {navItems.map((item, index) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                aria-current={active === item.id ? "true" : undefined}
                className="flex items-baseline gap-4 rounded-xl px-3 py-3 text-lg font-medium transition-colors hover:bg-surface-2"
              >
                <span className="font-mono text-xs text-accent">{String(index + 1).padStart(2, "0")}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
