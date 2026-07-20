# Motion Spec

Every animated component on this site goes through one of the patterns
below. Don't write a new one-off Framer Motion variant or a raw
`matchMedia("(prefers-reduced-motion)")` check — extend `Reveal` or use the
existing hooks in `lib/hooks.ts`.

## Scroll-reveal (`Reveal`)

`components/Reveal.tsx` — the default entrance animation for nearly every
piece of content on the site.

- `hidden`: `opacity: 0, y: 28`
- `visible`: `opacity: 1, y: 0`, `duration: 0.65`, `ease: [0.21, 0.65, 0.36, 1]`
- Triggers via `whileInView`, `viewport={{ once: true, margin: "-64px" }}` —
  fires once, ~64px before the element enters the viewport, never replays.
- Stagger pattern: pass an increasing `delay` prop across a list, typically
  `i * 0.05` to `i * 0.08` for a modulo'd column index (e.g.
  `(i % 2) * 0.08` for a 2-column grid so rows stagger rather than the
  whole list cascading end to end).

## Hero entrance

`components/Hero.tsx` uses its own Framer `variants` (not `Reveal`, because
it needs a shared parent stagger rather than independent viewport triggers):

- Container: `staggerChildren: 0.08, delayChildren: 0.1`.
- Item: `opacity: 0, y: 16` → `opacity: 1, y: 0`, `duration: 0.5`,
  `ease: [0.16, 1, 0.3, 1]`.

This is a deliberately different (snappier, no viewport-margin delay) curve
than `Reveal` because it plays once on load, not on scroll — don't merge it
into `Reveal` just to reduce duplication; the timing needs differ.

## Nav active-tab indicator

`components/Navbar.tsx` — the underline beneath the active nav link uses
`layoutId="nav-active"` with `transition={{ type: "spring", stiffness: 350,
damping: 30 }}`, the only spring (vs. eased tween) animation on the site.

## Hover-reveal content

`components/Projects.tsx` stat row: `max-h-0 opacity-0` →
`group-hover:max-h-24 group-hover:opacity-100`, plain CSS
`transition-all duration-300`. Use CSS transitions (not Framer) for simple
hover-triggered reveals like this — Framer is reserved for viewport/gesture
-driven or shared-layout animation.

## The GPU model (`GpuModel.tsx` via `ScrollGpuScene.tsx`)

- Mounted once at page root inside `ScrollProgressProvider`, reading a
  **shared** scroll progress value — never starts its own `useScroll()`
  listener. If you add a component that needs scroll position, consume
  `useSharedScrollProgress()`; don't wire a second scroll listener.
- Pose (rotation/position) is driven by lerping toward a scroll-derived
  target every frame: `THREE.MathUtils.lerp(current, target, 0.055)` — this
  damping factor (`0.055`) is the site's one "physical" motion feel; reuse
  it for any future continuous 3D lerp rather than picking a new one ad hoc.
- Fades to a faint silhouette near the final CTA:
  `useTransform(scrollYProgress, [0.82, 1], [1, 0.25])` — not a hero-only
  prop that disappears after the fold.
- `dpr={[1, mobile ? 1.5 : 2]}` — device pixel ratio is capped lower on
  mobile for performance; keep this pattern for any future `Canvas`.

## Reduced motion

Three layers, all must stay in sync — don't rely on only one:

1. **Global floor** (`globals.css`, `@media (prefers-reduced-motion:
   reduce)`): forces `animation-duration: 0.01ms`, one iteration, and caps
   CSS transitions to `0.15s`. This alone is not enough for anything
   canvas/3D-driven.
2. **`usePrefersReducedMotion()`** (`lib/hooks.ts`): read explicitly inside
   `GpuModel.tsx` to zero out `<Float>`'s `speed`/`rotationIntensity`/
   `floatIntensity` and to snap the group's rotation directly to the target
   pose instead of lerping toward it frame-by-frame.
3. **`useTabVisible()`** (`lib/hooks.ts`): pauses the 3D render loop
   (`paused = reduced || !tabVisible`) when the tab isn't visible, so it
   isn't burning cycles (or motion) off-screen.

Any new animated component — especially anything canvas/WebGL or
`requestAnimationFrame`-driven — must check `usePrefersReducedMotion()`
itself. The global CSS floor only covers CSS/Framer transitions, not manual
render loops.
