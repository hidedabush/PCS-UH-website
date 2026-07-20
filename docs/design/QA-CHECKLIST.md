# QA Checklist

Run through this before calling any page or component finished. Most items
map directly back to a rule in `DESIGN-SYSTEM.md`, `DESIGN-ANTI-PATTERNS.md`,
or `MOTION-SPEC.md` — if something fails, that's where to look for the
correct pattern.

## Visual system

- [ ] Uses `Card` / `Heading` / `Tag` / `Reveal` instead of one-off markup
      wherever those primitives apply.
- [ ] No blur, glow, corner brackets, pill shapes, or pulsing dots
      introduced — cross-check `DESIGN-ANTI-PATTERNS.md`.
- [ ] Section follows the standard rhythm: `border-t border-line`,
      `py-24 md:py-32`, `mx-auto max-w-site px-4 sm:px-6 lg:px-10`.
- [ ] `font-mono` only on eyebrows/tags/code strings — never body copy or
      headings.
- [ ] Green (`accent`) used sparingly and intentionally; `uhred` only as a
      ≤5% micro-accent, never a primary color.

## Content

- [ ] Copy pulled from `data/*.ts`, not hardcoded — or if inline, that's a
      deliberate, noted exception (see `CONTENT.md`).
- [ ] No fake system-code flavor text, no invented stats.
- [ ] Any new placeholder link/value is marked `// TODO` and listed in
      `CONTENT.md`'s outstanding-placeholders section.

## Motion & accessibility

- [ ] New animation goes through `Reveal` or reuses an existing Framer
      pattern (`MOTION-SPEC.md`) — no new one-off `matchMedia` check.
- [ ] Verified with the OS "reduce motion" setting on: canvas/3D motion
      stops or snaps instead of animating; CSS/Framer transitions collapse.
- [ ] Keyboard-navigable: logical tab order, `Escape` closes the mobile
      menu/dialogs, all inputs have associated `<label>`s, validation errors
      use `role="alert"`.
- [ ] Visible focus state on every interactive element — rely on the global
      `:focus-visible` style, don't suppress or override it per-component.
- [ ] Every icon-only or icon+text interactive element has an accessible
      name (`aria-label` on icon-only buttons, `aria-hidden` on decorative
      icons paired with visible text).

## Responsive & cross-cutting

- [ ] No horizontal scroll at 375px, 768px, and 1440px widths.
- [ ] External links use `target="_blank" rel="noopener noreferrer"`.
- [ ] 3D/canvas content degrades sensibly on mobile (dpr cap, particle/heavy
      effect scale-down already established in `GpuModel.tsx` — match it,
      don't skip it, for any new WebGL content).
- [ ] `npm run lint` and `npm run build` both pass.
- [ ] Manually exercised in a real browser at the golden path (not just
      type-checked) — see the root `CLAUDE.md` UI/frontend testing note.
