# Design System

Source of truth for tokens is `tailwind.config.ts`. This doc explains how
those tokens map to the actual component vocabulary — don't reintroduce a
token or pattern that isn't listed here without updating both.

## Color

| Token | Value | Use |
| --- | --- | --- |
| `black` | `#000000` | Form inputs, thumbnail backgrounds |
| `ink` | `#0A0A0A` | Page background (`body`) |
| `panel` | `#111113` | `Card` background |
| `panelHover` | `#161618` | `Card` hover background |
| `line` | `#1F1F22` | The one border/divider color, everywhere |
| `white` | `#FAFAFA` | Reserved, rarely used directly (`text-white` on headings uses this) |
| `text` | `#EDEDED` | Body text color (`body` default) |
| `textMuted` | `#9A9AA0` | Secondary copy, nav links, descriptions |
| `textFaint` | `#5C5C63` | Tertiary metadata (index numbers, timestamps, `dt` labels) |
| `accent` | `#22C55E` | The one brand color — primary buttons, active nav underline, focus rings, list-item dots |
| `accentHover` | `#16A34A` | Hover state for anything using `accent` as a background |
| `uhred` | `#C8102E` | ≤5% micro-accent only — footer mark, form errors |

Neutrals are true gray on purpose (see `DESIGN-ANTI-PATTERNS.md` — no green
tint baked into "black" or "gray"). Don't add a new neutral shade without
checking it doesn't drift toward warm or green.

## Typography

- **Sans** (`font-sans`, var `--font-sans`, Inter fallback): all body copy
  and headings.
- **Mono** (`font-mono`, var `--font-mono`, JetBrains Mono fallback):
  eyebrows, `Tag` labels, stack/tech chips, literal command strings
  (`git clone …`). Never body paragraphs or `h1`–`h3`.
- Heading scale (via `Heading` / page `h1`s): `text-3xl sm:text-4xl
  md:text-5xl` for section titles, up to `md:text-6xl` for page `h1`s.
  `font-semibold`, `tracking-tight`, always `text-white`.
- Body copy: `text-sm` or `text-base`, `leading-relaxed`, `text-textMuted`.
- Eyebrows: `text-xs uppercase tracking-[0.16em]` (or `tracking-[0.1em]` for
  the smaller "Navigate"/"Follow"-style footer labels), `font-mono`,
  `text-textMuted` or `text-textFaint`.
- Tags/metadata: `text-[11px]` or `text-xs`, `uppercase`, `tracking-[0.08em]`.

## Radius

Effectively flat. `borderRadius` in `tailwind.config.ts` maps every scale
step (`sm` through `full`) to `2px`–`4px` — there is no true "rounded"
option available. If a design calls for a pill or a large radius, that's
the anti-pattern list, not a missing token.

## Layout rhythm

- Container: `mx-auto max-w-site px-4 sm:px-6 lg:px-10` (`site` = `1440px`).
- Section spacing: `border-t border-line`, `py-24 md:py-32` (page-`h1` hero
  sections use `pt-36 md:pt-44` instead, no top border).
- Card grids: `grid gap-4`, responsive column counts per content
  (`sm:grid-cols-2`, `lg:grid-cols-3`, etc.) — never a magic one-off gap
  value.

## Core primitives

These four components are the entire visual vocabulary. Extend them; don't
duplicate their behavior inline.

- **`Card`** (`components/Card.tsx`) — the one surface treatment used
  everywhere: `border border-line bg-panel`, hover lightens to
  `border-textFaint` + `bg-panelHover`. Accepts `as="div" | "article" | "li"`.
  No blur, no glow, no corner brackets.
- **`Heading`** (`components/Heading.tsx`) — section headers, used
  identically everywhere: optional `eyebrow` (a real word/phrase, mono,
  uppercase), `title` (sans, semibold), optional `subtitle`. `align="left" |
  "center"`.
- **`Tag`** (`components/Tag.tsx`) — small rectangular metadata/status
  label. `tone="neutral" | "accent" | "red"`, optional static `dot` (no
  pulse). No pill shape.
- **`Reveal`** (`components/Reveal.tsx`) — the shared scroll-in wrapper.
  See `MOTION-SPEC.md` for its exact easing/timing.

## Buttons

- **Primary:** `bg-accent text-black`, `hover:bg-accentHover`, e.g. "Join
  PCS", "Become a Member", "Request Access".
- **Secondary:** `border border-line text-white`, `hover:border-textFaint`,
  e.g. "Explore GitHub", "View Repository".
- **Tertiary/text link:** no border, `text-textMuted`, `hover:text-white`,
  e.g. "View Workshops →", "Contact Officers".

All buttons: `text-sm font-medium`, `transition-colors`. Icon-bearing
buttons use `inline-flex items-center gap-2` with a `lucide-react` icon at
`h-4 w-4` (or `h-3.5 w-3.5` in tighter contexts), always `aria-hidden`.

## Forms

Inputs: `border border-line bg-black px-3.5 py-2.5 text-sm text-white`,
`placeholder:text-textFaint`, `focus:border-accent focus:outline-none` (see
`inputClasses` in `Join.tsx`). Validation errors render via a shared
`FieldError` pattern: `role="alert"`, `text-xs text-uhred`. Checkbox-style
multi-select uses a visually-hidden real checkbox (`peer sr-only`) plus a
styled `<span>` sibling — never a custom div-based fake checkbox without the
underlying input.

## Borderless composition + GPU annotations

Per `DESIGN.md`'s Content Composition section: narrative sections where the
GPU is a visual anchor (Hero, Mission, Learn/Build/Connect) use borderless
flowing copy instead of `Card` — no border, no background fill, just the
type scale and spacing rules above. Grid/list sections unrelated to the
GPU's position (Officers, Projects, Events) keep `Card` as before.

`GpuAnnotation` (`components/GpuAnnotation.tsx`): a small monospace label
plus a thin `line`-colored leader segment, absolutely positioned to
approximate the GPU's on-screen location for the current section (not
projection-tracked — a static per-section position, documented as a known
simplification in the component). Label copy must be a real, citable spec
string — see `DESIGN-ANTI-PATTERNS.md`'s carve-out.

## Background atmosphere

The page background is not a flat fill: a low-opacity radial gradient
(`accent` at very low alpha, or a neutral glow — never a hue outside the
existing palette) sits behind the GPU layer, giving the page depth without
introducing scanlines, grid overlays, or glassmorphism. Implemented once in
`ScrollGpuScene`/`globals.css`, not per-section.

## Focus & interaction floor

Global in `globals.css`: `:focus-visible` gets a `2px solid` accent outline
with `3px` offset, site-wide — don't override this per-component. Cursor is
forced to `pointer` on `button`, `a`, `label[for]`, checkboxes, and
`select`.
