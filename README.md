# Portafolio — María José De La Cruz Madroñero

Portafolio personal de una estudiante de Ingeniería de Software, construido con **Next.js (App Router)**, **React**, **TypeScript** y **Tailwind CSS**, listo para desplegarse en **Vercel**.

Secciones, en este orden: barra de navegación, inicio, sobre mí, proyectos, testimonios, experiencia, contacto, habilidades y pie de página.

## Requisitos

- Node.js **22.18 o superior** (las pruebas usan el soporte nativo de TypeScript de Node).
- npm 10 o superior.

## Comandos

```bash
npm install        # instalar dependencias
npm run dev        # servidor de desarrollo en http://localhost:3000
npm run lint       # ESLint
npm run typecheck  # comprobación de tipos de TypeScript
npm test           # pruebas unitarias (semestre y formulario)
npm run build      # compilación de producción
npm run start      # servir la compilación de producción
```

## Estructura

```text
app/            layout, página principal, estilos globales e ícono
components/     una sección por archivo (Navbar, Hero, About, …) y componentes ui/
config/         portfolio.ts (datos personales y semestre) y navigation.ts (secciones)
data/           projects.ts, testimonials.ts, experience.ts, skills.ts
lib/            semester.ts (cálculo del semestre), contact.ts (validación) y sus pruebas
public/         archivos estáticos (aquí va cv.pdf cuando esté listo)
```

Todo el contenido sale de `config/` y `data/`: para actualizar el sitio normalmente basta con editar esos archivos.

## Lo que falta por completar

### 1. CV

El botón **Descargar CV** aparece deshabilitado con la etiqueta «CV en preparación» porque no existe `public/cv.pdf`.

1. Guarda tu CV real como **`public/cv.pdf`** (exactamente ese nombre, en minúsculas).
2. Vuelve a compilar (`npm run build`) o haz un nuevo despliegue en Vercel.

La comprobación se hace al compilar (`next.config.ts`), así que el botón se activa solo en la siguiente compilación.

### 2. Semestre automático

El semestre se calcula en `lib/semester.ts` a partir de `config/portfolio.ts → academic`:

| Campo | Valor actual | Significado |
| --- | --- | --- |
| `referenceSemester` | `5` | Semestre que cursabas en la fecha de referencia. |
| `referenceDate` | `null` ⚠️ | **Pendiente.** Fecha real (`"AAAA-MM-DD"`) en que empezó tu 5.º semestre. |
| `monthsPerSemester` | `6` | Meses por semestre. |
| `timeZone` | `"America/Bogota"` | Zona horaria para saber qué día es hoy. |

Cálculo: `semestreActual = referenceSemester + floor(mesesCompletos / monthsPerSemester)`. Un mes cuenta como completo solo cuando se llega al mismo día del mes de la fecha de referencia. Por ejemplo, con `referenceDate: "2026-02-15"`, el 14 de agosto de 2026 sigue mostrando 5.º semestre y el 15 de agosto pasa a 6.º.

- Mientras `referenceDate` sea `null`, el sitio muestra **5.º semestre** con la nota «Último semestre confirmado. Falta configurar la fecha académica de referencia.».
- Si la fecha es inválida (por ejemplo `2026-02-30`) o está en el futuro, también se muestra el último semestre confirmado con una nota.
- No se asume un número total de semestres en la carrera.
- La página se regenera automáticamente una vez al día en Vercel (`cacheLife("days")` en `lib/academic.ts`), así que el semestre y el año del pie se actualizan sin redesplegar.

### 3. Testimonios (se necesitan al menos tres reales)

`data/testimonials.ts` tiene tres entradas marcadas como **pendientes**, que se muestran como espacios reservados, no como opiniones reales. Para cada testimonio real:

1. Pide a un profesor, compañero o colaborador un texto breve y su **permiso** para publicarlo con su nombre (y foto, si la quieres usar).
2. Reemplaza una entrada pendiente por:

   ```ts
   {
     id: "nombre-apellido",
     status: "publicado",
     name: "Nombre Apellido",
     relationship: "Profesor de Interfaces de Software",
     quote: "Texto exacto que la persona aprobó.",
     // photo: { src: "/images/testimonials/nombre.jpg", alt: "Foto de Nombre Apellido" },
   }
   ```

3. Si añades fotos, guárdalas en `public/images/testimonials/`. Sin foto se muestran las iniciales.

### 4. Formulario de contacto (Formspree)

El formulario está implementado (validación, estados de carga, éxito y error), pero **no envía mensajes hasta que lo configures**. Mientras tanto aparece deshabilitado con un aviso y el enlace a tu correo.

1. Crea una cuenta en [formspree.io](https://formspree.io) y un formulario nuevo; confirma tu correo `majose2006@gmail.com`.
2. Copia el endpoint, con la forma `https://formspree.io/f/xxxxxxx`.
3. En local: copia `.env.example` como `.env.local` y rellena `NEXT_PUBLIC_FORMSPREE_ENDPOINT`.
4. En Vercel: *Project → Settings → Environment Variables* → añade `NEXT_PUBLIC_FORMSPREE_ENDPOINT` y vuelve a desplegar.
5. Envía un mensaje de prueba desde el sitio publicado y confirma que te llega.

El endpoint de Formspree es público por diseño (no es una clave secreta). Aun así, no subas archivos `.env*` con valores reales; `.gitignore` ya los excluye, salvo `.env.example`.

### 5. Proyectos: enlaces y capturas

Enlaces verificados (públicos en GitHub el 25/10/2026):

| Proyecto | Repositorio | Demo |
| --- | --- | --- |
| AI Code Tutor | [ai-code-tutor-frontend](https://github.com/maajjjoo/ai-code-tutor-frontend) | [code-tutor-frontend.vercel.app](https://code-tutor-frontend.vercel.app) (carga el frontend; el backend respondió 503 en la verificación) |
| PollyStock | [pollystock-frontend](https://github.com/maajjjoo/pollystock-frontend), [pollystock-backend](https://github.com/maajjjoo/pollystock-backend) | — |
| Studia | [studia-frontend](https://github.com/maajjjoo/studia-frontend), [studia-backend](https://github.com/maajjjoo/studia-backend) | — |
| SmartControl | — (el repositorio local no tiene remoto) | — |

Tareas pendientes de despliegue:

- **AI Code Tutor:** confirmar cuál es el repositorio público del backend (hay un repo `backenddd` con un proyecto Spring Boot llamado `ai-platform`, pero no se pudo confirmar que sea este) y revisar por qué `https://ai-code-tutor-backend.onrender.com` responde 503.
- **PollyStock:** publicar una demo (por ejemplo, la versión web de Expo o un enlace de Expo Go) si la entrega exige demo en vivo.
- **Studia:** al ser una app de escritorio, considera publicar un instalador en *GitHub Releases* y enlazarlo como demo.
- **SmartControl:** crear el repositorio en GitHub y añadir su URL.

Para añadir un enlace, edita `repositories` o `demo` en `data/projects.ts`. Para añadir capturas reales, guárdalas en `public/images/projects/` y añade `image: { src: "/images/projects/nombre.png", alt: "Descripción" }` al proyecto; mientras no haya captura se muestra una ilustración.

### 6. Otros datos opcionales

- **Ubicación:** `config/portfolio.ts → location` (está en `null`, así que no se muestra).
- **Fecha de inicio de la carrera:** `data/experience.ts → startDate` (formato `"AAAA-MM"`).
- **Experiencia profesional:** añade entradas con `type: "profesional"` solo para trabajo real en software. Mientras no haya ninguna, se muestra un estado «pendiente».
- **Habilidades:** revisa `data/skills.ts`. Las tecnologías salen de tus repositorios y de lo que indicaste; ajusta los niveles si algo no te representa.
- **Foto:** el avatar es un monograma «MJ» (`components/Hero.tsx → Monogram`). Puedes reemplazarlo por una foto con `next/image`.

## Publicar en GitHub

El repositorio Git local ya existe, con un commit por etapa. Para subirlo:

1. Crea un repositorio vacío en GitHub (por ejemplo `portafolio`), sin README ni `.gitignore`.
2. Desde esta carpeta:

   ```bash
   git remote add origin https://github.com/maajjjoo/portafolio.git
   git push -u origin main
   ```

## Desplegar en Vercel

1. Entra en [vercel.com](https://vercel.com) con tu cuenta de GitHub → *Add New → Project* → importa el repositorio.
2. Vercel detecta Next.js automáticamente; no hace falta cambiar comandos.
3. Añade la variable `NEXT_PUBLIC_FORMSPREE_ENDPOINT` (opcional hasta que configures Formspree).
4. Pulsa *Deploy* y abre la URL pública para verificarla: navegación, modo oscuro, menú móvil, formulario y botón del CV.

## Checklist de la entrega

- [x] Proyecto Next.js con TypeScript
- [x] Tailwind CSS configurado
- [x] Diseño responsive
- [x] Navbar con nombre y navegación por secciones
- [x] Sección de inicio
- [ ] Descarga del CV con el PDF real
- [x] Sección sobre mí
- [x] Sección de proyectos
- [ ] Cada proyecto con repositorio de GitHub verificado
- [ ] Cada proyecto con demo en vivo verificada
- [ ] Al menos tres testimonios reales
- [ ] Experiencia académica completa (falta la fecha de inicio)
- [x] Experiencia profesional marcada honestamente como pendiente
- [ ] Correo y redes verificados (GitHub verificado; abre tú el enlace de LinkedIn y envía un correo de prueba)
- [ ] Formulario de contacto configurado y probado con el servicio real
- [x] Pie de página
- [x] Sección adicional (Habilidades)
- [ ] Cálculo del semestre configurado (falta `referenceDate`) — implementado y probado
- [x] Vista móvil verificada
- [x] Lint y TypeScript sin errores
- [x] Compilación de producción correcta
- [ ] Código subido a GitHub
- [ ] Despliegue en Vercel
- [ ] URL pública verificada
