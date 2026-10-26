import ContactForm from "@/components/ContactForm";
import { ArrowUpRightIcon, GitHubIcon, LinkedInIcon, MailIcon } from "@/components/ui/Icons";
import SectionHeading from "@/components/ui/SectionHeading";
import { sectionIds } from "@/config/navigation";
import { portfolio } from "@/config/portfolio";
import { parseFormspreeEndpoint } from "@/lib/contact";

// Variable pública (se incrusta al compilar). Ver .env.example y README.
const formEndpoint = parseFormspreeEndpoint(process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT);

const channels = [
  {
    label: "Correo",
    value: portfolio.email,
    href: `mailto:${portfolio.email}`,
    Icon: MailIcon,
    external: false,
  },
  {
    label: portfolio.social.github.label,
    value: "github.com/maajjjoo",
    href: portfolio.social.github.href,
    Icon: GitHubIcon,
    external: true,
  },
  {
    label: portfolio.social.linkedin.label,
    value: "María José De La Cruz",
    href: portfolio.social.linkedin.href,
    Icon: LinkedInIcon,
    external: true,
  },
];

export default function Contact() {
  return (
    <section id={sectionIds.contact} aria-labelledby="contacto-titulo" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <SectionHeading
          index="05"
          eyebrow="Contacto"
          title="Hablemos"
          titleId="contacto-titulo"
          intro="Si quieres comentarme algo sobre mis proyectos, proponer una colaboración o simplemente saludar, escríbeme."
        />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-12">
          <ul className="space-y-3">
            {channels.map(({ label, value, href, Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-4 rounded-[var(--radius-card)] border border-line bg-surface p-5 transition-colors hover:border-accent"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-surface-2 text-ink transition-colors group-hover:bg-accent group-hover:text-on-accent">
                    <Icon />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-xs tracking-wide text-muted uppercase">{label}</span>
                    <span className="block truncate font-semibold">{value}</span>
                  </span>
                  <ArrowUpRightIcon className="shrink-0 text-muted transition-colors group-hover:text-accent" />
                  {external ? <span className="sr-only">(se abre en una pestaña nueva)</span> : null}
                </a>
              </li>
            ))}
          </ul>

          <ContactForm endpoint={formEndpoint} fallbackEmail={portfolio.email} />
        </div>
      </div>
    </section>
  );
}
