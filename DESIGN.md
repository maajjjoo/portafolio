# Design: The Listening Experience

Approved direction, updated as the work progresses. It is rewritten from the finished site at the end.

## Idea

A room you never leave: opening a record keeps you in the listening room, with that record's booklet in your hands.

- **One space:** the room stays recognizable behind every album, out of focus and in its own light.
- **One booklet per record:** each album has a genuinely different composition, driven by its content, in a shared visual language.
- **Night and day are the same room:** the light changes, not the objects.

Decoration that neither orients nor informs is left out. The reference is `design-references/listening-room-reference.jpg`, for composition and light only: its album covers are copyrighted, and all artwork here is original SVG and CSS.

## Colour

| Role | Night | Day |
|---|---|---|
| Wall | `#383428` charcoal olive | `#e2d8c6` warm ivory |
| Wood | `#5a3a24` walnut | `#c9a06e` light oak |
| Text | `#efe3cf` | `#21160e` |
| Secondary text | `#b8a68d`, `#d3c4ac` over the lit wall | `#5f4d3c` |
| Accent | `#e8ad5a` amber | `#8a4f10`, `#754206` over the sunlit wall |
| Light | Warm LEDs and lamp | Side window light |
| Plant green | `#47573f` | `#47573f` |

## Type

- **Gloock:** titles and sleeves. `title-album` reaches 4.5rem and `title-section` 3rem.
- **Hanken Grotesk:** everything else. `read` sets 1.0625rem, line height 1.6, 65 characters wide.
- No uppercase labels and no added letter spacing. Smallest text is 0.8125rem, except 12px minimums on scaled room labels.

## Surfaces

There are three, each with a job:

- **Wall:** the ground. Text can sit directly on it, in a colour measured against the light behind it.
- **Paper (`paper`):** near-opaque, only where long text or a form needs it. Never a large panel hiding the room.
- **Glass (`glass`):** translucent with controlled blur, only for small pieces: the header, return control, data strips.

Shared tokens: `--radius-sheet`, `--radius-group`, `--radius-field`, `--space-section`, `--ease-object`, `--paper`, `--glass`, `--glass-edge`.

## Corners

Everything that holds text is rounded: large surfaces at `1.5rem`, groups and notes at `1rem`, fields and small tags at `0.5–0.75rem`, buttons as pills. Physical objects (sleeves, furniture, speakers) keep their real, square edges.

## Materials and light

- Wood layers a broad figure (`--figure`) and fine grain (`--grain`) over a gradient, running unbroken along each whole piece. Ledges have a lip that holds the sleeves, a front face and a light strip beneath.
- Contact shadows ground heavy objects, in `--shade`, the room's shadow colour for each theme.
- At night, light comes only from the LED strips and the lamp. Strips sit under the ledges, so light runs down the wall and fades, within the ledge's exact width.
- By day, window light replaces them: LEDs and lamp are off, and shadow sits where night has glow. Speakers and records stay black.
- Shadows always have a direction from the room's light. No coloured halos.
- Each material has its own treatment: oiled wood, matte doors with seams, brushed aluminium and brass plates, paper sleeves with a card edge, vinyl with static reflections. The credenza stores records on edge: mostly black spines with an occasional cream, amber or wine one. No rug.

## The room

- Sized in one unit, `--u`, so it scales as one object and never crops a record.
- The wall runs up behind the floating header; the header fades what scrolls under it.
- Desktop: two ledges of four sleeves (Lado A, Lado B) above a credenza, with speakers either side.
- Below 900px: a deliberately tall wall, with the name plate first. Speakers are dropped, and on phones also the amplifier and plant, so the turntable stays legible.
- Every sleeve is a real link, with its plain section name under it. A small amber dot beside the name marks a record already heard; the link's label says it in words.

## Covers

- Printed like posters: one large flat-colour idea per record, inks that overlap (multiply) and paper grain (`feTurbulence`). Covers carry no text at all; catalogue numbers live in Créditos.
- Hola, mundo a striped rising sun with the initials; Quién soy an arched door with a circle that does not fit; Repositorio a branch graph over huge braces; Otras voces two overlapping speech bubbles; Línea de tiempo a road climbing through contour lines; Escríbeme an envelope with its seal; Stack isometric layers; Créditos finales credits rolling up beside a barcode.
- SVG ids carry where the cover is drawn (`place`: room or album), because both can be in the page at once.

## Less on screen

- Records are named only by their plain section (Bienvenida, Sobre mí, Proyectos…), everywhere: under the sleeve, as the album heading, in the menu, in previous/next and in the page title. The artistic titles in `data/albums.ts` are no longer shown. Each album opens with its section name and nothing else: no index and no floating pager, because every album is short.
- The header is a floating glass pill: initials and first name, Álbumes and the light switch. Vinyl labels carry no text, only the album colour and an accent ring. The footer is one line: copyright, profiles and back to top.
- **Hover and focus:** the sleeve leans out and its disc slides out to the right.

## The eight albums

| Album | Composition | Paper | Glass |
|---|---|---|---|
| Hola, mundo | Open scene: name and arched portrait directly on the wall | None | Strip with the university |
| Quién soy | Magazine text: large opening line, narrow column | Margin strip with education | None |
| Repositorio | One spread per project, alternating image and text | Under text, only if needed to read | None |
| Otras voces | Quiet slots while pending; large staggered quotes when real | Small, per quote | None |
| Línea de tiempo | A vinyl groove as axis, academic and professional either side | None | Dates |
| Escríbeme | A letter over the room; the form is the only large paper | The form | Contact strip |
| Stack | Typographic index on the wall: large category, skills in line | None | None |
| Créditos finales | Back cover: catalogue, colophon, rights, way back to the room | Colophon strip | None |

Shared navigation: return to the room, and previous and next, quiet at the end.

## Content rules

- All existing content, anchors, routes, IDs, keyboard behaviour, history and accessibility stay. A repeated title may be hidden visually only if it stays available to screen readers.
- Nothing is invented: no testimonials, screenshots, CV, experience or links. Missing material stays marked as pending.
- Project images: a clear "Captura pendiente" frame until real screenshots exist. Illustrations must not pass for screenshots.

## Motion

- One authored moment: the record's journey. Everything else stays under 300ms and answers an action.
- No intro: the room is there from the first frame.
- **Changing the light:** the desk lamp is the switch (on is night, off is day), alongside the header button. The new light spreads across the room from whatever was pressed, with a soft edge (`lib/theme.ts`, `.light-switching` in `app/camera.css`). Instant with reduced motion or without View Transitions.
- **Opening a record:** only that sleeve and vinyl travel. They get transition names just for the transition (`lib/roomCamera.ts`). The room never moves: it dims and falls out of focus. Then the vinyl slides out and spins.
- **Browser Back and Forward:** React restores those pages inside `popstate`, so View Transitions can't run. `HistoryCamera` measures the record before Next navigates and animates the real elements afterwards (FLIP), without intercepting navigation. It skips hash-only changes, album-to-album moves, reduced motion and browser gesture animations.
- Never give records permanent transition names: visited albums stay mounted but hidden, and React would pair them again and animate them.
- Reduced motion: no travel, no spin, no lean.

## Accessibility

- Text meets 4.5:1 in both themes, measured against real pixels, and focus rings use the accent colour with an offset.
- Decoration is `aria-hidden`, except the lamp, a labelled button. The room's content is plain HTML, so direct links, screen readers and no-JavaScript visits get the portfolio.
