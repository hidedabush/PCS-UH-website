# Design Brief

## What this site is

The public site for UH PCS (Parallel Computing Society), a student
organization at the University of Houston focused on GPU computing, CUDA,
and high-performance/parallel systems. The site's job: convince a UH student
with zero GPU experience that this club is worth their time, and give
current members/officers/sponsors a credible front door.

## Audience

- **Primary:** UH undergrads, any major, any year, most with no prior CUDA
  or systems background. Copy throughout ("No prior GPU experience
  required", "Start before you feel ready") is written directly at this
  reader.
- **Secondary:** sponsors, recruiters, and industry guests evaluating
  whether the org is technically serious enough to invest time or money in.
- **Tertiary:** current officers, who edit `data/*.ts` each semester.

The design has to satisfy both ends at once — approachable enough for a
first-semester student, credible enough for a recruiter — without switching
tone between pages.

## Positioning

A serious technical organization, not a hobby club or a cosplay of one.
"Serious" is expressed through restraint (flat surfaces, real copy, one
disciplined accent color) rather than through sci-fi costuming (terminal
chrome, HUD brackets, scanlines). The org teaches real, hard material — the
site shouldn't need decorative signaling to convince anyone of that.

## The pivot: terminal/HUD → flat editorial

The first version of this site leaned hard into a "GPU command center"
skin: glassmorphism HUD panels, a terminal boot sequence, CRT scanlines,
pulsing status badges, corner-bracket framing, fake system-code labels
(`SEC.01 //`, `> INIT_SEQUENCE`). That layer was deliberately stripped out
(see the component deletions in git history — `BootSequence`, `Scanlines`,
`TerminalCard`, `TerminalLabel`, `TerminalLog`, `TerminalTitlebar`,
`StatusBadge`, `TelemetryStrip`, `GlassCard`, `AnimatedGrid`,
`SectionLabel`) and replaced with three plain primitives: `Card`, `Heading`,
`Tag` (see [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md)).

Why: the HUD aesthetic read as a costume rather than a substance signal, it
fought the one thing worth spending the "spectacle" budget on (the real
GPU render), and it aged like every faux-terminal skin does — cute once,
noisy on every subsequent page. Full list of what's banned and why lives in
[DESIGN-ANTI-PATTERNS.md](DESIGN-ANTI-PATTERNS.md) — treat that as binding,
not historical trivia.

## Brand anchors

- **Base:** near-black (`ink` / `panel` / `black`), true neutral grays with
  no color tint baked in.
- **Accent:** one green (`accent` / `accentHover`), used for primary CTAs,
  active states, and small structural marks (list dots, focus rings). It is
  the only color used freely.
- **UH red (`uhred`):** the university's brand color, not the club's. Used
  as a ≤5% micro-accent only — footer copyright mark, form error states.
  Never a button, section background, or decorative element.
- **The GPU model:** an RTX 4090 render, persistent across the whole scroll
  (mounted once at page root, never remounted per-section) rather than a
  hero-only decoration. It is the one place the site spends visual budget on
  spectacle — everything else stays deliberately plain so the render doesn't
  have to compete with its own chrome.

## Voice

Direct and plain-spoken. State the real thing plainly instead of dressing
it up as a system readout. See [CONTENT.md](CONTENT.md) for the concrete
do/don't version of this.
