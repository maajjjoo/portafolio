import type { ReactNode } from "react";

import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Credits from "@/components/sections/Credits";
import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Testimonials from "@/components/sections/Testimonials";
import type { AlbumSlug } from "@/data/albums";

/** Qué sección del portafolio contiene cada disco. */
const contentBySlug: Record<AlbumSlug, () => ReactNode> = {
  bienvenida: () => <Hero />,
  "sobre-mi": () => <About />,
  proyectos: () => <Projects />,
  testimonios: () => <Testimonials />,
  experiencia: () => <Experience />,
  contacto: () => <Contact />,
  habilidades: () => <Skills />,
  creditos: () => <Credits />,
};

export default function AlbumContent({ slug }: { slug: AlbumSlug }) {
  return contentBySlug[slug]();
}
