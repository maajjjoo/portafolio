# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Now, primary: the course evaluator.** A professor of Interfaces de Software checks the site against the course submission's requirements and judges the interactive concept.
- **Later, primary once the course is submitted: recruiters and hiring contacts.** They are deciding whether a Software Engineering student is worth contacting about an internship or job, often with little time.

Both read the site in Spanish, on desktop or on a phone.

## Product Purpose

The personal portfolio of María José De La Cruz Madroñero, a Software Engineering student at Universidad Cooperativa de Colombia. It presents the owner's profile, the projects they have built and how to reach them.

It first has to pass the course submission. Beyond that, success means a visitor is convinced enough by the projects to get in touch about work.

## Positioning

"The Vinyl Archive": the portfolio is a collection of eight records, and each record is one section. Picking a record from the shelf opens it as an album with its own URL. The work itself is reported with unusual honesty: real project status, verified links only, and no invented percentages.

## Operating Context

- Delivered as a course project, assessed against the checklist in `README.md`.
- Visitors can land directly on any album URL, such as `/album/proyectos`, so each album has to make sense without the library.
- The "Escuchado" mark is stored per browser and isn't shared between devices.

## Capabilities and Constraints

- **Required by the course, so future work must keep them:** navigation with name or initials, hero with personal profile, CV download, About, Projects with repository and demo links, at least three real testimonials, academic and professional experience, public email, working contact form, footer with name and current year, and at least one additional section (Habilidades).
- **Required by the course for the interaction:** a shelf of record sleeves, one album per section, an opening transition, the correct content in each album, return to the library, previous/next, working direct URLs, touch support and keyboard accessibility.
- **Spaces for missing content stay in place until it's filled.** The CV, testimonials, contact form and photo keep their place on the site. They aren't removed or hidden, and the owner will supply the content.
- **Terminology:** a section is an "álbum" or "disco", and the collection is "The Vinyl Archive". Album titles are artistic (Repositorio) and each maps to a plain section name (Proyectos).
- **Stack:** Next.js App Router, React, TypeScript and Tailwind CSS, intended for deployment on Vercel. Not yet deployed.
- **Undecided:** the portfolio's direction after the course is submitted, including whether the structure changes for recruiters.

## Brand Commitments

- Name: María José De La Cruz Madroñero, with the initials "MJ".
- Collection name: "The Vinyl Archive".
- Site language: Spanish.
- Voice: modest and precise, stating the real state of things.

## Evidence on Hand

- **Projects (`data/projects.ts`):** AI Code Tutor, PollyStock, Studia and SmartControl, all in development or at an early stage.
- **Links:** public repositories for AI Code Tutor (frontend only), PollyStock and Studia. SmartControl has no public repository. AI Code Tutor is the only project with a demo, and its backend returned 503 when last checked.
- **Education:** Ingeniería de Software at Universidad Cooperativa de Colombia, last confirmed as 5th semester.
- **Contact:** public email, GitHub and LinkedIn (`config/portfolio.ts`).

**Absent, and must not be fabricated:**

- CV (`public/cv.pdf`)
- Portrait photo
- Testimonials (three pending)
- Professional experience
- Project screenshots
- Formspree endpoint
- Academic reference date and career start date
- Location, deliberately unpublished for now

## Product Principles

1. **Meet the course requirements first.** Nothing the checklist requires gets removed to make the site tidier.
2. **Never fake evidence.** Unverified links, invented testimonials and inflated skills are never acceptable, and missing content is shown honestly as pending.
3. **Pending is for visitors; setup notes are for the owner.** Public copy can say something is coming, but it doesn't expose configuration instructions.
4. **The concept has to lead to the work.** The vinyl metaphor earns its place by helping people reach the projects and get in touch.
5. **Every path ends at contact.** Reaching out about work should stay easy from anywhere on the site.

## Accessibility & Inclusion

Keyboard accessibility and touch support are course requirements. The site also respects reduced-motion preferences, and it must stay usable in browsers without View Transitions support.
