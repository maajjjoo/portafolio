import type { CSSProperties } from "react";

import ContactForm from "@/components/sections/ContactForm";
import { ArrowUpRightIcon, GitHubIcon, LinkedInIcon, MailIcon } from "@/components/ui/Icons";
import { sectionIds } from "@/config/navigation";
import { portfolio } from "@/config/portfolio";
import { parseFormspreeEndpoint } from "@/lib/contact";

// Variable pública (se incrusta al compilar). Ver .env.example y README.
const formEndpoint = parseFormspreeEndpoint(process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT);

const channels = [
  { id: "contacto-correo", label: "Correo", value: portfolio.email, href: `mailto:${portfolio.email}`, Icon: MailIcon, external: false },
  {
    id: "contacto-github",
    label: portfolio.social.github.label,
    value: "github.com/maajjjoo",
    href: portfolio.social.github.href,
    Icon: GitHubIcon,
    external: true,
  },
  {
    id: "contacto-linkedin",
    label: portfolio.social.linkedin.label,
    value: "María José De La Cruz",
    href: portfolio.social.linkedin.href,
    Icon: LinkedInIcon,
    external: true,
  },
];

export default function Contact() {
  return (
    <section id={sectionIds.contact} aria-labelledby="contacto-titulo" className="relative isolate overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
          <div>
            <h2 id="contacto-titulo" data-reveal className="font-display text-4xl leading-[1.08] text-balance sm:text-5xl">
              Hablemos de algo <span className="text-accent">increíble</span>
            </h2>
            <p data-reveal className="mt-8 max-w-md text-lg leading-relaxed text-muted">
              Si quieres comentarme algo sobre mis proyectos, proponer una colaboración o simplemente saludar,
              escríbeme.
            </p>

            <ul data-reveal className="mt-10 border-t border-line">
              {channels.map(({ id, label, value, href, Icon, external }) => (
                <li key={label} id={id} className="border-b border-line">
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center gap-4 py-5 transition-colors hover:text-accent"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line transition-colors group-hover:border-wine group-hover:bg-wine group-hover:text-on-wine">
                      <Icon width={18} height={18} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="label block text-muted">{label}</span>
                      <span className="mt-1 block truncate font-semibold">{value}</span>
                    </span>
                    <ArrowUpRightIcon className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    {external ? <span className="sr-only">(se abre en una pestaña nueva)</span> : null}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div id="contacto-formulario" data-reveal style={{ "--reveal-delay": "150ms" } as CSSProperties}>
            <ContactForm endpoint={formEndpoint} fallbackEmail={portfolio.email} />
          </div>
        </div>
      </div>
    </section>
  );
}
