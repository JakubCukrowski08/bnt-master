# DESIGN.md — <client name>

The human source of the look. Its machine form is `src/design/tokens.ts`; the two must agree
(`ipal-doctor` compares them). Values go into `tokens.ts`, never into components.
Sections are fixed: fill every one, write "default" where the brand keeps the standard.

## 1. Brand in one sentence
<what the site is, for whom, the feeling>. Audience: <…>.
The one memorable element (where the boldness goes): <…>. Everything else stays quiet.

## 2. Colour
| Role (`--ipal-*`) | Light | Dark | Used for |
|---|---|---|---|
| primary | oklch(…) | (carried over) | main buttons, key accents |
| secondary | default | default | second button |
| accent | default (= primary) | | badges, highlights |
| bg / surface / surface-muted | default | default | page, cards, alternate sections |

Contrast (paste `pnpm exec ipal-tokens --report`; every ✗ fixed before launch):
```
<report>
```

## 3. Type
Body: <family> <weights> (`--font-family-body`). Headings: <family> <weight> (`--font-family-heading`).
Max 2 families × 2–3 weights, `subsets: ['latin', 'latin-ext']`. Scale overrides (`fs`): <none | h1 2.25→4rem …>.
Heading style: <case, tracking, weight>.

## 4. Shape and depth
Radius: control <…>, card <…>, media <…>. Depth: <borders | shadow-sm on cards | none>.

## 5. Layout
Scale: fluid-wide (default) | fluid. Container <80rem>, narrow <48rem> (legal, articles), measure 68ch.
Section rhythm: py-section; compact bands py-section-sm. Alignment: <left | centred hero only>.

## 6. Motion
What moves and why (max one orchestrated moment): <…>. Durations: default (fast 150 / base 250 / slow 400 ms).
Reduced motion: every duration token is 0 ms; nothing essential is animated.

## 7. Imagery and icons
Photo style: <…>. Focal points set in Media. Icons: lucide set, <stroke width>.

## 8. Theme
<light only | dark only | both>, default <light | dark | system> (Site settings → Theme), toggle <yes | no>.

## 9. Deviations from the standard
Every override of a default, and every project-only token or breakpoint, with the reason:
- <none>
