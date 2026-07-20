# Content Guide

## Where copy lives

All editable content is centralized in `data/*.ts` so officers can update it
each semester without touching JSX:

| File | Content |
| --- | --- |
| `data/nav.ts` | Nav links, social/contact URLs (several still `TODO` placeholders) |
| `data/events.ts` | Event titles, dates, times, locations, tags |
| `data/officers.ts` | Officer names, roles, majors, focus, contact links |
| `data/projects.ts` | Project names, descriptions, stack, status, repo links |
| `data/offerings.ts` | The four "Programs" cards on the landing page |
| `data/sponsors.ts` | Sponsorship benefits |
| `data/site.ts` | Landing-page copy blocks (mission pillars, KPIs, membership benefits) |
| `data/telemetry.ts` | Legacy — check before adding new content here (see note below) |

**Current inconsistency:** some landing-page copy is still inline in the
component (`Hero.tsx`, `Mission.tsx`'s `pillars` array, `Offerings.tsx`'s
icon map, `FinalCTA.tsx`) rather than pulled from `data/`. When you touch one
of these components for a content change, prefer moving that copy into the
matching `data/*.ts` file rather than editing it in place — don't feel
obligated to migrate everything in one pass, but don't add new inline copy
either.

## Outstanding placeholders (must be real before launch)

All marked `// TODO` in source — grep for `TODO` in `data/` to find the
current set. As of this writing:

- `data/nav.ts`: `GITHUB_URL`, `DISCORD_URL`, `LINKEDIN_URL`,
  `INSTAGRAM_URL`, `CONTACT_EMAIL` are placeholders/`#` links.
- `data/officers.ts`: confirm names/majors/contacts are the current board,
  not filler.
- `data/projects.ts`: confirm `repo` links point at real repos before
  "View Repository" ships live.
- Sponsor benefits in `data/sponsors.ts` — confirm against whatever's
  actually been promised to sponsors this semester.

## Voice

Direct and plain-spoken, aimed at a student with zero GPU/CUDA background
who might be intimidated by the subject matter. See representative lines
already in the codebase:

- "The future of computing is parallel." (confident, not cute)
- "No prior GPU experience required." (removes the barrier immediately)
- "Start before you feel ready." (second-person invitation, not a command)
- "You do not need CUDA experience to join. PCS is built for students who
  are curious, ambitious, and ready to learn by building."

**Do:**
- State the real thing plainly ("Hands-on workshops in CUDA, GPU
  architecture, and systems thinking").
- Use real numbers when you have them (`data/site.ts`'s `kpis`,
  `aiMarketChart` — cited sources, not invented stats).
- Write eyebrows as real words/phrases: `"Mission"`, `"What we offer"`,
  `"Open source"`.

**Don't:**
- Invent a fake system-code readout for flavor (`SEC.01 //`,
  `> INIT_SEQUENCE`) — see `DESIGN-ANTI-PATTERNS.md`.
- Stack buzzwords without a concrete referent ("cutting-edge next-gen
  compute paradigm").
- Write vague hype copy in place of a real number when a real one exists.

## Form content constraints

`components/Join.tsx`'s Zod schema enforces a `uh.edu` email suffix and a
4-digit graduation year starting `20`. If you change membership copy that
references eligibility or email requirements, keep it consistent with these
actual validation rules — don't promise something the form doesn't enforce
(or vice versa).
