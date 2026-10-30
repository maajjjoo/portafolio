# Design: La sala de escucha

Working version, updated as the redesign progresses. It is rewritten from the finished site at the end.

## World

One listening room, seen once, from one point of view, following `design-references/listening-room-reference.jpg`. The reference's album covers are real and copyrighted: only its composition and light are used. All artwork here is original SVG and CSS.

The room has two times of day, set by the theme control:

- **Night (default):** olive-charcoal plaster, walnut, charcoal furniture, amber LED strips and a lit lamp.
- **Day:** the same objects in window light. Pale plaster with soft window panes, sunlit oak, an off-white painted cabinet, brass plate, LEDs and lamp off, and shadow where night has glow. Speakers and records stay black.

## Colour

| Role | Night | Day |
|---|---|---|
| Wall | `#383428` | `#e2d8c6` |
| Text | `#efe3cf` | `#21160e` |
| Secondary text | `#b8a68d` | `#5f4d3c` |
| Accent | `#e8ad5a` | `#8a4f10` |
| Wood | `#5a3a24` walnut | `#c9a06e` oak |
| Sheet | `rgb(84 75 60)` at 58% | `#fbf6ec` at 62% |
| Plant green | `#47573f` | `#47573f` |

## Type

- **Gloock:** titles and sleeves, set larger than everything else and never below `1.25rem`.
- **Hanken Grotesk:** everything else.
- No uppercase labels and no added letter spacing. Small text stays at `0.8125rem` or above, except 12px minimums on scaled room labels.

## Materials and light

- Wood is a streaked noise texture over a gradient, with grain running along the piece.
- At night, light comes only from the LED strips and the lamp. Strips sit under the ledges, so light runs down the wall and fades; the wash stays within the ledge's width.
- Each material has its own treatment: oiled wood, matte doors with seams, brushed aluminium and brass plates, paper sleeves with a card edge, vinyl with static reflections, wool rug.

## Composition

- The scene is sized in one unit, `--u`, so the whole room scales as one object and never crops a record.
- Desktop: two ledges of four sleeves (Lado A, Lado B) above a credenza, with speakers either side.
- Below 900px: a deliberately tall wall, with the name plate and category filter first. Speakers, rug, amplifier and plant are dropped on phones so the turntable stays legible.

## Corners

Everything that holds text is rounded: the album sheet at `1.5rem`, grouped grids and notes at `1rem`, fields and small tags at `0.5–0.75rem`, buttons as pills. Physical objects (sleeves, furniture, speakers) keep their real, square edges.

## Records

- Every sleeve is a real link, with its plain section name under it at all times. "Escuchado" sits beside that name, never on the cover.
- **Hover and focus:** the sleeve leans out and its disc slides out to the right.
- **Filtered out:** the sleeve dims and sinks into the wall in place, and leaves the tab order. Records never reflow.

## Albums: the booklet

- The room's wall stays behind, fixed. Cover and title sit directly on it.
- The content sits on one translucent sheet (`.album-sheet`). Inside it, sections use rules and space rather than nested cards.
- A one-line index of text links replaces the tracklist. A small translucent pager follows the reader through the parts.
- Previous and next are quiet text links at the end.
- Translucency is reserved for the sheet, the pager and the return link. Its blur stays controlled.

## Motion

- The lights rise once per session at the intro. The visitor can enter at any moment.
- **Opening a record:** only that sleeve and vinyl travel. They get transition names just for the transition (`lib/roomCamera.ts`). The room never moves: it dims and falls out of focus. Then the vinyl slides out and spins.
- **Browser Back and Forward:** React restores those pages inside `popstate`, so View Transitions can't run. `HistoryCamera` measures the record before Next navigates and animates the real elements afterwards (FLIP), without intercepting navigation. It skips hash-only changes, album-to-album moves, reduced motion and browser gesture animations.
- Never give records permanent transition names: visited albums stay mounted but hidden, and React would pair them again and animate them.
- Reduced motion: no travel, no spin, no lean.

## Accessibility

- Text meets 4.5:1 in both themes, and focus rings use the accent colour with an offset.
- Decoration is `aria-hidden`. The room's content is plain HTML under the intro, so direct links, screen readers and no-JavaScript visits get the portfolio.
