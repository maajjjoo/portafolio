import type { Metadata, Viewport } from "next";
import { Gloock, Hanken_Grotesk } from "next/font/google";

import LibraryHeader from "@/components/library/LibraryHeader";
import HistoryCamera from "@/components/providers/HistoryCamera";
import ScrollReveal from "@/components/providers/ScrollReveal";
import Footer from "@/components/sections/Footer";
import { portfolio } from "@/config/portfolio";
import "./globals.css";
import "./room.css";
import "./album.css";
import "./camera.css";
import "./modern.css";

const gloock = Gloock({
  variable: "--font-gloock",
  subsets: ["latin"],
  weight: "400",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${portfolio.fullName} · ${portfolio.title}`,
  description: `Portafolio de ${portfolio.fullName}, estudiante de ${portfolio.academic.degree} en la ${portfolio.university}. Proyectos, experiencia y contacto.`,
  authors: [{ name: portfolio.fullName }],
  openGraph: {
    title: `${portfolio.fullName} · Portafolio`,
    description: `${portfolio.title}. Proyectos, experiencia y contacto.`,
    locale: "es_CO",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#14100c" },
    { media: "(prefers-color-scheme: dark)", color: "#14100c" },
  ],
};

// Aplica la luz guardada antes de pintar, para evitar parpadeos, y marca que hay JavaScript
// para activar las animaciones.
const themeScript = `(function(){var d=document.documentElement;d.classList.add("js");try{var t=localStorage.getItem("theme");d.setAttribute("data-theme",t==="light"?"light":"dark")}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${gloock.variable} ${hanken.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col overflow-x-clip">
        <a
          href="#contenido"
          className="sr-only z-[110] rounded-full bg-wine px-4 py-2 font-semibold text-on-wine focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Saltar al contenido
        </a>
        <LibraryHeader />
        <main id="contenido" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
        <ScrollReveal />
        <HistoryCamera />
      </body>
    </html>
  );
}
