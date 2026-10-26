import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope, Pinyon_Script } from "next/font/google";

import ScrollReveal from "@/components/ScrollReveal";
import { portfolio } from "@/config/portfolio";
import "./globals.css";

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const pinyon = Pinyon_Script({
  variable: "--font-pinyon",
  subsets: ["latin"],
  weight: "400",
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
    { media: "(prefers-color-scheme: light)", color: "#f5ece3" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0809" },
  ],
};

// Aplica el tema guardado (o el del sistema) antes de pintar, para evitar parpadeos,
// y marca que hay JavaScript para activar las animaciones al hacer scroll.
const themeScript = `(function(){var d=document.documentElement;d.classList.add("js");try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}d.setAttribute("data-theme",t)}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${instrument.variable} ${manrope.variable} ${pinyon.variable} h-full antialiased`}
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
        {children}
        <ScrollReveal />
      </body>
    </html>
  );
}
