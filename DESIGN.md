# UH PCS Approved Design

## Concept

GPU Spatial Narrative with editorial publication typography.

The GPU moves through narrative states while normal HTML content communicates
UH PCS's mission, learning opportunities, projects, and community.

## Landing-Page Sequence

1. Hero
2. Mission
3. Learn
4. Build
5. Connect
6. GitHub
7. Membership

## GPU States

### Hero
Centered and dominant. Arrives with a deliberate one-time dolly-in entrance
(zooms/settles into frame on load) — after that settles, ongoing idle
movement stays restrained (subtle sway, not continuous rotation). Movement
between narrative states should read as real spatial travel — zoom/dolly
and lateral traversal — not just the card spinning in place.

Composition (added after a reference pass, Dogstudio/Dept-style editorial
hero): oversized, stacked display type is allowed to overlap the GPU
directly — this reverses the earlier "copy stays in its own column, GPU
stays clear" rule for the hero specifically. Confirm legibility by screenshot
whenever the pose or type scale changes; overlap is a deliberate device
here, not the accidental collision the anti-patterns doc warns about
elsewhere. A thin diagonal accent line (structural device, `line`/
`textFaint` weight — never `uhred`, which stays a ≤5% micro-accent) may
cross the frame. A small chevron-prefixed label may sit near the top,
pointing at a real destination (not decorative).

### Mission
Moves right and slightly backward to create reading space.

### Offerings
Becomes secondary while annotations connect hardware to workshops and projects.

### GitHub
Darkens and recedes as the narrative transitions from hardware to software.

### Membership
GPU exits; typography and whitespace dominate.

## Visual System

- Background: deep obsidian and graphite, with a low, localized ambient
  atmosphere (soft radial glow/gradient) behind the GPU rather than a flat
  solid fill — the page should read as having depth and a light source,
  not a plain dark rectangle. Still no scanlines, grid overlays, or
  glassmorphism panels: atmosphere lives in the background layer only.
- Accent: restrained compute green
- Display typography: editorial and distinctive
- Body typography: highly readable sans-serif
- Metadata: monospace
- Borders: thin and low contrast
- Corners: mostly square or minimally rounded
- Glow: rare and localized — the background atmosphere above is the one
  place it's allowed to be a little more present; content surfaces stay flat
- Spacing: large section gaps and narrow readable text measures

## Content Composition

Two allowed treatments, chosen per section by whether the section reads
*around* the GPU or independent of it:

- **Boxed** (`Card`): grid/list content that doesn't relate spatially to
  the GPU — officer grids, project cards, event lists. Flat border, no
  chrome, unchanged from before.
- **Borderless + annotated**: narrative sections where the GPU is a visual
  anchor (Hero, Mission, Learn/Build/Connect). No box around the copy —
  it flows in a shaped column near the model. The GPU itself may carry a
  small number of monospace annotation callouts (thin leader line + a real,
  short spec string, e.g. `24GB GDDR6X`) as a restrained, factual echo of
  the terminal aesthetic this site otherwise avoids. Annotations state real
  information, never invented flavor text — see DESIGN-ANTI-PATTERNS.md.
  Positioning approximates the GPU's on-screen location per section rather
  than tracking it pixel-perfectly; that's an acceptable simplification.

## Motion

Motion must communicate hierarchy, continuity, navigation, or state change.

No scroll-jacking, continuous aggressive rotation, excessive parallax,
or animations that delay access to content.
