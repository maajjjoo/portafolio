# Portafolio — María José De La Cruz Madroñero

**The Listening Experience**: portafolio personal de una estudiante de Ingeniería de Software, presentado como una colección de discos de vinilo. Construido con **Next.js (App Router)**, **React**, **TypeScript** y **Tailwind CSS**, listo para desplegarse en **Vercel**.

## Cómo funciona la sala

- La página principal (`/`) es un **estante de discos**. Cada disco es una sección del portafolio.
- Al pasar el cursor o enfocar una funda con el teclado, el vinilo asoma y gira. En pantallas táctiles el disco ya asoma un poco y el rótulo «Abrir álbum» siempre está visible.
- Al elegir un disco, la funda **se transforma** en la portada del álbum (`<ViewTransition>` de React 19.3), el vinilo sale de la funda y empieza a girar, y debajo aparece el contenido de la sección.
- Cada álbum tiene su propia ruta (`/album/proyectos`, `/album/contacto`…): se puede abrir directamente, compartir y usar con los botones Atrás/Adelante del navegador. Un slug que no existe muestra una página 404 propia.
- Dentro de un álbum: «Volver a la sala», disco anterior/siguiente y atajos de teclado (← →, Esc).
- El contenido se presenta como un **libreto**: un índice breve enlaza con cada parte y, cuando deja de verse, un paginador muestra la parte actual con enlaces a la anterior y la siguiente. Para añadir una parte, indica en `data/albums.ts` el `id` del elemento al que lleva.
- El botón **Álbumes** de la barra superior da acceso directo a las ocho secciones desde cualquier página.
- La sala tiene dos luces, de noche y de día (la lámpara del mueble es el interruptor), y marca como «Escuchado» los discos ya abiertos (solo en ese navegador).
- Si el sistema pide reducir el movimiento, no hay giros ni deslizamientos.

| Nº | Álbum | Sección de la entrega | Ruta |
| --- | --- | --- | --- |
| 01 | Hola, mundo | Hero y CV | `/album/bienvenida` |
| 02 | Quién soy | Sobre mí | `/album/sobre-mi` |
| 03 | Repositorio | Proyectos | `/album/proyectos` |
| 04 | Otras voces | Testimonios | `/album/testimonios` |
| 05 | Línea de tiempo | Experiencia | `/album/experiencia` |
| 06 | Escríbeme | Contacto | `/album/contacto` |
| 07 | Stack | Habilidades (sección adicional) | `/album/habilidades` |
| 08 | Créditos finales | Contraportada | `/album/creditos` |

La barra de navegación (logo «MJ», nombre, Sala y Álbumes) y el pie de página (nombre, año, enlaces a los discos, redes, «Volver arriba» y «Hecho con Next.js + Tailwind CSS») aparecen en todas las páginas.

## Requisitos

- Node.js **22.18 o superior** (las pruebas usan el soporte nativo de TypeScript de Node).
- npm 10 o superior.

## Comandos

```bash
npm install        # instalar dependencias
npm run dev        # servidor de desarrollo en http://localhost:3000
npm run lint       # ESLint
npm run typecheck  # comprobación de tipos de TypeScript
npm test           # pruebas unitarias (álbumes, semestre y formulario)
npm run build      # compilación de producción
npm run start      # servir la compilación de producción
```

## Estructura

```text
app/
  layout.tsx            cabecera, <main> y pie comunes; tema y fuentes
  page.tsx              la sala de escucha (repisas de discos)
  album/[slug]/page.tsx un álbum abierto (generado al compilar para cada disco)
  not-found.tsx         «Este disco no está en la colección»
components/
  library/              cabecera, bienvenida, estante, funda, vinilo, portadas SVG, búsqueda
  album/                vista del álbum, portada, lista de canciones, anterior/siguiente, teclado
  sections/             el contenido de cada sección (Hero, About, Projects, …, Credits, Footer)
  ui/                   piezas reutilizables (iconos, textos animados, tema, volver)
  providers/            animaciones al hacer scroll
config/                 portfolio.ts (datos personales y semestre), navigation.ts (IDs)
data/                   albums.ts, projects.ts, testimonials.ts, experience.ts, skills.ts
lib/                    albums.ts, semester.ts, contact.ts (+ pruebas) y useExplored.ts
public/                 archivos estáticos (cv.pdf e images/perfil.* cuando estén listos)
```

Todo el contenido sale de `config/` y `data/`. Cada sección se escribe una sola vez en `components/sections/` y el álbum correspondiente la muestra (`components/album/AlbumContent.tsx`). Para cambiar títulos, colores o canciones de un disco, edita `data/albums.ts`.

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

- Mientras `referenceDate` sea `null`, el sitio muestra **5.º semestre** con la nota «Último semestre confirmado.». El motivo aparece solo como aviso en la consola del servidor.
- Si la fecha es inválida (por ejemplo `2026-02-30`) o está en el futuro, también se muestra el último semestre confirmado con la misma nota y el motivo en la consola.
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
- **Foto:** mientras no exista, el álbum «Hola, mundo» muestra un arco vinotinto con el monograma «MJ» y la nota «Foto próximamente». Para poner tu foto, guárdala como **`public/images/perfil.png`** (también sirve `.jpg`, `.jpeg` o `.webp`) y vuelve a compilar o desplegar: se detecta sola (`next.config.ts`). Funciona mejor una foto vertical (proporción 3:4) con la cara en la parte superior, porque el marco recorta los lados y la parte de abajo.

## Publicar en GitHub

El repositorio Git local ya existe, con un commit por etapa. Para subirlo:

1. Crea un repositorio vacío en GitHub (por ejemplo `portafolio`), sin README ni `.gitignore`.
2. Desde esta carpeta:

   ```bash
   git remote add origin https://github.com/maajjjoo/portafolio.git
   git branch -M main
   git push -u origin main
   ```

## Desplegar en Vercel

1. Entra en [vercel.com](https://vercel.com) con tu cuenta de GitHub → *Add New → Project* → importa el repositorio.
2. Vercel detecta Next.js automáticamente; no hace falta cambiar comandos.
3. Añade la variable `NEXT_PUBLIC_FORMSPREE_ENDPOINT` (opcional hasta que configures Formspree).
4. Pulsa *Deploy* y abre la URL pública para verificarla: sala, abrir varios discos, anterior/siguiente, una URL directa como `/album/proyectos`, modo oscuro, panel Álbumes en el móvil, formulario y botón del CV.

## Limitaciones conocidas

- **Slug inexistente (`/album/lo-que-sea`):** siempre muestra la página «Este disco no está en la colección» con `noindex`. La **primera** visita a un slug nuevo responde HTTP 200 y las siguientes 404. Es el comportamiento documentado de Next.js 16 con Cache Components: el estado queda en 200 si el streaming ya empezó. Se probó forzar el 404 desde `proxy.ts`, pero Next no aplica el estado de un `rewrite`.
- **Transiciones:** la funda que se transforma en portada usa la API View Transitions (Chromium 125+, Safari y Firefox recientes). En navegadores sin soporte todo funciona igual, solo que sin animación.
- **«Escuchado»:** se guarda en el navegador de cada visitante (`localStorage`); no se comparte entre dispositivos.

## Checklist de la entrega

### Tecnologías y estructura

- [x] Next.js inicializado con `create-next-app` y TypeScript
- [x] Tailwind CSS configurado
- [x] Estructura de componentes reutilizables
- [x] Clases responsive aplicadas
- [x] El proyecto corre en local

### Secciones principales

- [x] Navegación con nombre, logo o iniciales
- [x] Hero con perfil personal
- [ ] Descarga del CV con el PDF real (pendiente: `public/cv.pdf`)
- [x] Sobre mí con presentación personal
- [x] Sección de proyectos
- [ ] Repositorio de GitHub verificado en cada proyecto (falta SmartControl)
- [ ] Demo en vivo verificada en cada proyecto (solo AI Code Tutor tiene, y su backend respondió 503)
- [ ] Al menos tres testimonios reales
- [ ] Experiencia académica completa (está la universidad y el programa; falta la fecha de inicio)
- [ ] Experiencia profesional (no hay; se muestra honestamente como pendiente)
- [x] Correo público
- [ ] Formulario de contacto funcional (implementado y probado con respuestas simuladas; falta configurar Formspree)
- [x] Pie de página con nombre y año actual
- [x] Al menos una sección adicional (Habilidades)

### Interacción creativa

- [x] Sala con fundas de discos
- [x] Cada sección representada por un álbum
- [x] Seleccionar un álbum funciona
- [x] La transición de apertura funciona
- [x] Cada álbum muestra el contenido correcto
- [x] Volver a la sala funciona
- [x] Disco anterior/siguiente funciona
- [x] Las URL directas de los álbumes funcionan
- [x] Interacción táctil verificada (en emulación móvil)
- [x] Accesibilidad con teclado verificada

### Entrega

- [x] Sitio revisado en móvil
- [x] Sitio revisado en tablet y escritorio
- [x] Lint completado
- [x] TypeScript sin errores
- [x] Compilación de producción correcta
- [ ] Repositorio de GitHub actualizado (requiere tu autorización)
- [x] Commits creados
- [ ] Despliegue en Vercel (requiere tu autorización)
- [ ] URL pública verificada
