# UH PCS Design System — Master Reference

Consolidated single-file reference for the approved design system. This file
exists so a fresh session can load one document and have the full token
architecture + component spec + motion system + narrative model in one pass,
instead of re-deriving it from `tailwind.config.ts` and six separate docs.

**Precedence:** [DESIGN.md](../../DESIGN.md) is the approved visual contract
(concept, narrative, GPU states) — it wins on any conflict. This file is the
implementation-level token/component breakdown of that contract. The
per-topic docs in [docs/design/](../../docs/design/) remain the detailed
backing reference for each layer; update all three together when a decision
changes, don't let them drift.

## 1. Concept

GPU Spatial Narrative with editorial publication typography: the GPU moves
through narrative states while ordinary HTML content carries the mission,
learning opportunities, projects, and community message. Full concept and
per-section GPU states: [DESIGN.md](../../DESIGN.md).

## 2. Token Architecture

Three layers: **primitive** (raw values) → **semantic** (role names, what
`tailwind.config.ts` actually exposes) → **component** (where each semantic
token gets used). Don't invent a new primitive without adding it to this
table and to `tailwind.config.ts` in the same change.

### Primitive

| Primitive | Hex |
| --- | --- |
| `black` | `#000000` |
| `gray-950` | `#0A0A0A` |
| `gray-925` | `#111113` |
| `gray-900` | `#161618` |
| `gray-850` | `#1F1F22` |
| `gray-100` | `#EDEDED` |
| `gray-500` | `#9A9AA0` |
| `gray-600` | `#5C5C63` |
| `white` | `#FAFAFA` |
| `green-500` | `#22C55E` |
| `green-600` | `#16A34A` |
| `uh-red` | `#C8102E` |

### Semantic (Tailwind tokens, `tailwind.config.ts`)

| Semantic token | Primitive | Role |
| --- | --- | --- |
| `black` | `black` | Form input / thumbnail backgrounds |
| `ink` | `gray-950` | Page background |
| `panel` | `gray-925` | Surface background (`Card`) |
| `panelHover` | `gray-900` | Surface hover background |
| `line` | `gray-850` | The one border/divider color |
| `white` | `white` | Heading text |
| `text` | `gray-100` | Default body text |
| `textMuted` | `gray-500` | Secondary copy |
| `textFaint` | `gray-600` | Tertiary metadata |
| `accent` | `green-500` | The one brand color — primary actions, active/focus states |
| `accentHover` | `green-600` | Hover state for `accent` backgrounds |
| `uhred` | `uh-red` | ≤5% micro-accent only |

No semantic token carries a green tint except `accent`/`accentHover` — see
`docs/design/DESIGN-ANTI-PATTERNS.md`.

### Component-level tokens

| Component | Uses |
| --- | --- |
| `Card` | `border-line`, `bg-panel` → hover `border-textFaint`, `bg-panelHover` |
| `Heading` eyebrow | `font-mono`, `text-xs`, `uppercase`, `tracking-[0.16em]`, `text-textMuted` |
| `Heading` title | `font-sans`, `font-semibold`, `tracking-tight`, `text-white` |
| `Heading` subtitle | `text-textMuted`, `leading-relaxed` |
| `Tag` (neutral/accent/red) | border+text = `textMuted`/`accent`/`uhred`; dot fill matches tone |
| Primary button | `bg-accent text-black` → hover `bg-accentHover` |
| Secondary button | `border-line text-white` → hover `border-textFaint` |
| Tertiary button/link | `text-textMuted` → hover `text-white`, no border |
| Form input | `border-line bg-black text-white` → focus `border-accent` |
| Form error | `text-uhred`, `role="alert"` |

Full component behavior/props: `docs/design/DESIGN-SYSTEM.md`.

## 3. Typography

- **Display/heading:** `font-sans` (Inter var), `font-semibold`,
  `tracking-tight`. Editorial and distinctive per `DESIGN.md` — not a
  default SaaS heading stack.
- **Body:** `font-sans`, `text-sm`/`text-base`, `leading-relaxed`,
  `text-textMuted`. Highly readable, narrow measure (`max-w-xl`/`max-w-lg`
  on paragraph containers).
- **Metadata:** `font-mono` (JetBrains Mono var) — eyebrows, tags, stack
  chips, literal command strings only. Never body or headings.

## 4. Layout & Spacing

- Container: `mx-auto max-w-site px-4 sm:px-6 lg:px-10` (`site` = `1440px`).
- Section rhythm: `border-t border-line`, `py-24 md:py-32`.
- Radius scale is effectively flat: every step in `tailwind.config.ts`
  (`sm`→`full`) resolves to `2px`–`4px`. Mostly-square corners per
  `DESIGN.md`.
- Borders thin, low-contrast: always `border-line`, never a heavier or
  higher-contrast border color.
- Glow: none by default: rare, localized, and only where `DESIGN.md`
  explicitly calls for it (e.g. a GPU-state annotation) — not a general
  surface treatment.

## 5. Motion System

- **`Reveal`** (scroll-in default): `opacity 0→1, y 28→0`, `duration 0.65`,
  `ease [0.21, 0.65, 0.36, 1]`, `whileInView` once, `margin: -64px`.
- **Hero entrance:** parent stagger `staggerChildren 0.08, delayChildren
  0.1`; item `y 16→0`, `duration 0.5`, `ease [0.16, 1, 0.3, 1]`.
- **Nav active-tab:** `layoutId` spring, `stiffness 350, damping 30` — the
  one spring-based (non-eased-tween) motion on the site.
- **GPU pose:** continuous lerp toward scroll-derived target,
  `THREE.MathUtils.lerp(current, target, 0.055)` per frame; opacity fades
  `1→0.25` across scroll `0.82–1.0` near the final CTA.
- **Reduced motion (three layers, keep in sync):** global CSS floor in
  `globals.css`; `usePrefersReducedMotion()` zeroes 3D float/rotation and
  snaps pose instead of lerping; `useTabVisible()` pauses the render loop
  off-screen.
- Hard constraints from `DESIGN.md`: no scroll-jacking, no continuous
  aggressive rotation, no excessive parallax, nothing that delays access to
  content. Every motion must communicate hierarchy, continuity, navigation,
  or state — not decoration.

Full detail: `docs/design/MOTION-SPEC.md`.

## 6. GPU Narrative States

Landing-page sequence and the GPU's behavior at each stage — this is the
part of the system most likely to require new implementation (GSAP scroll
choreography per `CLAUDE.md`'s Implementation Rules) rather than reuse of
what exists today:

1. **Hero** — centered, dominant, restrained movement.
2. **Mission** — moves right and slightly back, opens reading space.
3. **Learn / Build / Connect** — GPU secondary; annotations connect
   hardware to workshops and projects.
4. **GitHub** — darkens and recedes, hardware→software transition.
5. **Membership** — GPU exits; typography and whitespace dominate.

Today's implementation (`ScrollGpuScene.tsx` / `GpuModel.tsx`) has a single
continuous lerp-toward-pose model driven by one shared scroll value, and the
landing page has no dedicated Learn/Build/Connect sections or on-page
Membership section yet (see `TASK.md` for what's in scope for the current
pass, and `docs/design/DESIGN-BRIEF.md` for how the current Mission
component's 01/02/03 pillars relate to the future Learn/Build/Connect
split).

## 6a. Content Composition (added after Session-2 review)

Two treatments, chosen per section: **boxed** (`Card`, for grid/list content
unrelated to the GPU's position — Officers/Projects/Events) vs.
**borderless + annotated** (Hero/Mission/Learn/Build/Connect — no box, copy
flows near the model, sparse monospace leader-line callouts with real specs
point at the GPU itself). Background is a low-opacity radial atmosphere
behind the GPU layer, not a flat fill — still no scanlines/glassmorphism.
Full detail: `docs/design/DESIGN-SYSTEM.md` §Borderless composition,
`DESIGN.md` §Content Composition, anti-pattern carve-out in
`docs/design/DESIGN-ANTI-PATTERNS.md`.

## 7. Anti-Patterns

Do not reintroduce: glassmorphism/blur, corner-bracket HUD framing, scanline/
terminal chrome, pulsing status dots, pill shapes, fake system-code copy,
green tint on neutral tokens, monospace body text, UH red as a primary
color, or motion that ignores `prefers-reduced-motion`. Full list with
rationale: `docs/design/DESIGN-ANTI-PATTERNS.md`.
