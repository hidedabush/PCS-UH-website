# Design Anti-Patterns

Concrete list of what was removed from this site on purpose, and what to do
instead. If you're about to add something on the left column, stop — check
the right column first. This list is binding, not a style suggestion.

| Banned | Why it was removed | Do this instead |
| --- | --- | --- |
| Glassmorphism / `backdrop-blur` panels | Read as decoration bolted onto content, not structure. Fought the one real 3D element for attention. | `Card` — flat `border-line` border, `bg-panel`, no blur. |
| Corner-bracket / HUD-frame decoration | Costume, not signal — "serious org" doesn't need sci-fi framing to read as serious. | A plain border. If a panel needs emphasis, use `hover:border-textFaint`, not more chrome. |
| CRT scanlines / terminal chrome / boot sequence | Cute once, noisy on every subsequent page load; also blocked content behind a skippable animation for no real payoff. | Nothing — the page just renders. Motion budget goes to `Reveal` scroll-ins and the GPU model. |
| Pulsing / animated status dots | Implied a live system state that doesn't exist (nothing on this site is actually real-time). | `Tag`'s `dot` prop — a static square, no animation. |
| Pill-shaped badges/buttons | Softens the flat, structural feel the borders are going for. | Rectangular tags and buttons — see the radius scale in `DESIGN-SYSTEM.md` (2–4px everywhere, nothing rounder). |
| Fake system-code copy as an eyebrow (`SEC.01 //`, `> INIT_SEQUENCE`, `[GPU_CLUSTER_ONLINE]`) | Cosplay of a terminal, not real information — actively working against the plain-spoken voice. | `Heading`'s `eyebrow` prop takes "a real word/phrase" (see the type comment in `Heading.tsx`) — e.g. `"Mission"`, `"What we offer"`. |
| Green tint bleeding into neutral tokens (a "black" or "gray" with green baked in) | Made the whole palette read as one green-tinted wash instead of a true neutral base with one disciplined accent. | Green exists in exactly one token family: `accent` / `accentHover`. Neutrals (`ink`, `panel`, `panelHover`, `line`, `text`, `textMuted`, `textFaint`) stay true gray. |
| Monospace for body copy or headings | Mono reads as "system output" — fine for a tag or a git command, wrong for a paragraph a prospective member is supposed to read comfortably. | `font-mono` only for eyebrows, `Tag`, and literal code/command strings. Everything else is `font-sans`. |
| UH red as a primary or decorative color | It's the university's brand red, not the club's — using it broadly makes the site look like a UH admin page, not a student org. | ≤5% micro-accent only: footer copyright mark, form validation errors (`FieldError`, `text-uhred`). |
| Decorative motion that ignores `prefers-reduced-motion` | Motion-triggered discomfort for users who explicitly opted out at the OS level. | Gate through the existing hooks (`usePrefersReducedMotion`, `useIsMobile`, `useTabVisible` in `lib/hooks.ts`) — see `MOTION-SPEC.md`. The global reduced-motion media query in `globals.css` is a floor, not a substitute for checking in 3D/canvas code. |
| Generic stock profile photos for officers | Cheap-looking, and usually fake anyway before real headshots exist. | The deterministic `NodeAvatar` pattern in `Officers.tsx` (seeded abstract grid, no external images). |

If a new component seems to need one of the banned patterns to look
"finished," that's a signal the layout is trying to be something other than
a flat editorial page — revisit the layout, not the ban.

## Carve-out: GPU annotation callouts

`DESIGN.md`'s Content Composition section allows small monospace
leader-line callouts pointing at the GPU itself (e.g. `24GB GDDR6X`). This
is **not** a reversal of the fake-system-code ban above — the difference is
content, not style: a callout must state a real, verifiable spec, never an
invented readout, fake command, or decorative status string. If you can't
cite where the number came from, it doesn't qualify for this carve-out —
it's the banned pattern wearing a costume.
