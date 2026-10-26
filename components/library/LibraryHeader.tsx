"use client";

import { useEffect, useState } from "react";

import ThemeToggle from "@/components/ThemeToggle";
import RollText from "@/components/ui/RollText";
import { CloseIcon, MenuIcon } from "@/components/ui/Icons";
import { navItems, sectionIds, type SectionId } from "@/config/navigation";
import { portfolio } from "@/config/portfolio";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<SectionId | null>(null);
  const [scrolled, setScrolled] = useState(false);

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

  // La barra se vuelve sólida al bajar un poco.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-500 ${
        scrolled || open ? "border-line bg-bg/85 backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
    >
      <nav aria-label="Principal" className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href={`#${sectionIds.hero}`} className="group flex items-center gap-3" aria-label={`${portfolio.fullName}, ir al inicio`}>
          <span className="grid size-10 place-items-center rounded-full bg-wine font-display text-lg text-on-wine transition-transform duration-500 group-hover:rotate-[360deg]">
            {portfolio.initials}
          </span>
          <span className="hidden font-script text-2xl leading-none text-accent sm:block">María José</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? "true" : undefined}
                className={`label relative inline-flex px-3 py-2 transition-colors hover:text-ink ${
                  active === item.id ? "text-ink" : "text-muted"
                }`}
              >
                <RollText>{item.label}</RollText>
                <span
                  aria-hidden="true"
                  className={`absolute right-3 bottom-1 left-3 h-px origin-left bg-accent transition-transform duration-500 ${
                    active === item.id ? "scale-x-100" : "scale-x-0"
                  }`}
                />
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
        <ul className="mx-auto grid max-w-7xl px-5 py-4 sm:px-8">
          {navItems.map((item, index) => (
            <li key={item.id} className="border-b border-line last:border-b-0">
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                aria-current={active === item.id ? "true" : undefined}
                className="flex items-baseline gap-4 px-1 py-4 font-display text-3xl transition-colors hover:text-accent"
              >
                <span className="label text-accent">{String(index + 1).padStart(2, "0")}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
