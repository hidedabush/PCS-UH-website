# UH PCS Website

Next.js (App Router) + TypeScript site for the University of Houston Parallel
Computing Society. Dark, flat, editorial design with one persistent
scroll-linked 3D GPU render (RTX 4090) as the site's single "spectacle"
element, confined to the landing page.

## Required Context

Before making meaningful UI changes, read:

- [DESIGN.md](DESIGN.md) — the approved visual contract (concept, landing-page sequence, GPU states, visual system). Supersedes prior drafts where it conflicts.
- [design-system/uh-pcs/MASTER.md](design-system/uh-pcs/MASTER.md) — consolidated token architecture (primitive→semantic→component), typography, spacing, motion, and GPU-state reference in one file
- [TASK.md](TASK.md) — the current implementation scope. Replaced before each pass; only build what it lists, don't touch what it excludes.
- [docs/design/DESIGN-BRIEF.md](docs/design/DESIGN-BRIEF.md) — audience, positioning, the terminal→flat pivot
- [docs/design/DESIGN-ANTI-PATTERNS.md](docs/design/DESIGN-ANTI-PATTERNS.md) — what was removed on purpose, don't reintroduce it
- [docs/design/DESIGN-SYSTEM.md](docs/design/DESIGN-SYSTEM.md) — tokens, primitives, layout rhythm
- [docs/design/MOTION-SPEC.md](docs/design/MOTION-SPEC.md) — exact easing/timing for existing animation
- [docs/design/CONTENT.md](docs/design/CONTENT.md) — where copy lives, voice, outstanding placeholders
- [docs/design/QA-CHECKLIST.md](docs/design/QA-CHECKLIST.md) — pre-ship checklist

## Required Skills

For UI work, explicitly use:

- `frontend-design`
- `ui-ux-pro-max`
- 21st tools when searching for individual components
- Chrome DevTools when reviewing rendered UI

Do not claim a skill was used unless its instructions or tools were actually
loaded and followed.

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion
("Motion"), GSAP (scroll choreography — not yet a dependency, see
Implementation Rules), Three.js via `@react-three/fiber` + `drei`, React Hook
Form + Zod, Lucide icons.

## Structure

```
app/          routes (layout, page, about/contact/events/membership/projects, api/join)
components/   shared UI — see DESIGN-SYSTEM.md for the primitive set
data/         all editable copy (nav, events, officers, projects, offerings, site, sponsors, telemetry)
lib/          cn(), media-query hooks, shared scroll-progress context
public/models/ the RTX 4090 .glb used by GpuModel.tsx
```

## Design Rules

- The landing page is built around the RTX 4090 model.
- Secondary pages must not load the 3D GPU.
- Prioritize whitespace, readability, pacing, and clear information hierarchy.
- Do not start implementation before producing and reviewing design concepts.
- Do not use generic SaaS landing-page composition.
- Do not assemble the page from unrelated component-library blocks.
- Use design tokens instead of arbitrary one-off values.
- Consecutive sections must not repeat the same layout.
- Motion must communicate continuity, hierarchy, state, or navigation.
- Respect `prefers-reduced-motion`.
- Inspect desktop and mobile renders after meaningful UI changes.

## Implementation Rules

- Keep the GPU canvas isolated from normal content.
- Dynamically load 3D code on the landing page only.
- Use GSAP for primary scroll choreography.
- Use Motion for contained UI interactions.
- Never let GSAP and Motion control the same property on the same element.
- Provide static fallbacks for WebGL, reduced motion, and low-power devices.
- Run `npm run build` before declaring a phase complete.

**Current state vs. this rule set:** all existing scroll-driven motion
(`ScrollGpuScene`, `GpuModel`, `Reveal`) is Framer Motion only — GSAP isn't
installed yet. `MOTION-SPEC.md` documents what exists today. Once a phase
introduces GSAP-driven scroll choreography, update `MOTION-SPEC.md` with the
new GSAP timelines and the explicit split of which properties GSAP owns vs.
which Motion owns, so the "never both control the same property" rule stays
checkable.

## Non-negotiable design-system rules

- Reuse `Card`, `Heading`, `Tag`, `Reveal` — the entire current visual
  vocabulary for surfaces, section headers, metadata labels, and scroll-in
  motion. Extend, don't duplicate.
- No visual flourish without checking `DESIGN-ANTI-PATTERNS.md` first.
- Green (`accent`) is the only brand color used freely. UH red (`uhred`) is
  a ≤5% micro-accent only.
- `font-mono` is reserved for eyebrows, tags, and code-like strings — never
  body copy or headings.
- Copy lives in `data/*.ts`, not hardcoded in components.

## Working Process

1. Inspect
2. Plan
3. Implement a small representative slice
4. Run the application
5. Inspect the rendered result
6. Critique it
7. Revise
8. Continue

## Commands

```bash
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

## Conventions

- Mark a component `"use client"` only when it needs state, effects, or a
  browser API.
- Use `cn()` from `lib/utils.ts` for any conditional className.
- Section rhythm is consistent site-wide: `border-t border-line`,
  `py-24 md:py-32`, wrapped in `mx-auto max-w-site px-4 sm:px-6 lg:px-10`.
- External links: always `target="_blank" rel="noopener noreferrer"`.

Run through `docs/design/QA-CHECKLIST.md` before considering any page or
component finished.
