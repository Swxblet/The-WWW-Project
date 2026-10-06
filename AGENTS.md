# AGENTS.md — The WWW Project

> Reimagining of `info.cern.ch/hypertext/WWW/TheProject.html` as a scroll-driven journey:
> terminal → 1990 original → 2010 web → 2026 modern. Same root content, only style changes.

## 1. Project concept

- **Source of truth:** the original "World Wide Web" page by Tim Berners-Lee (info.cern.ch).
  Sections to preserve: intro `WorldWideWeb (W3)`, executive summary, mailing lists, policy,
  news, FAQ, `What's out there?`, `Help`, `Software Products`, `Technical`,
  `Bibliography`, `People`, `History`, `How can I help`, `Getting code`.
- **Experience:** one long scroll journey in 4 eras:
  1. `terminal` — line-mode browser simulator (~1989). Black `#0A0F0A`, phosphor green, monospace, `>` prompt, line-by-line render.
  2. `original` — faithful 1990 replica. Gray background, Times serif, blue underlined links, plain H1.
  3. `retro-2010` — Web 2.0 skin. Two-column + glossy header, pills, sidebars, dated on purpose.
  4. `modern` — 2026 reinterpretation. Follows `frontend-design` skill: intentional type, quiet layout, quiet scroll reveals.
- **Core transition:** stacked full-bleed sections with a quiet scroll reveal. No page reloads, no router.

## 2. Stack

- Svelte 5 (runes), TypeScript strict, Vite 8. No SvelteKit, no router, no Tailwind.
- Vanilla CSS with era theming via `[data-era]` + CSS custom properties. No UI kit.
- Motion: native `IntersectionObserver` + `requestAnimationFrame`. No scroll library unless justified.
- MCP servers (`magicuidesign`, `reactbits`) may be consulted **only for the modern era**. Never for terminal/original.

## 3. Commands

```bash
npm install
npm run dev      # local dev
npm run build    # production build
npm run preview  # preview build
npm run check    # svelte-check + tsc (run before every PR)
```

## 4. Structure (target)

```
src/
  App.svelte                  # journey orchestrator, natural stacked sections
  lib/
    content/www-content.ts    # SINGLE source of content (links, sections). All eras render from here.
    useScrubReveal.ts         # scroll-scrubbed entry transitions, respects reduced-motion
  components/
    HeroIntro.svelte            # timeline hero with quiet atom canvas, no content duplication
    ThemeToggle.svelte          # light/dark toggle, persisted, pre-paint in index.html
    TerminalChrome.svelte     # terminal frame only, no content duplication
    TheProject.svelte         # semantic markup, era-agnostic (h1, sections, links)
    Era2010Chrome.svelte      # 2010 wrapper chrome only
    ModernChrome.svelte       # modern wrapper chrome only
    CernParticles.svelte      # discreet canvas detail for the modern era only
  styles/
    eras.css                  # 4 themes via [data-era="terminal|original|retro-2010|modern"]
```

## 5. Hard rules

1. **Single-source content.** Never duplicate section text per era. Era = CSS + chrome wrapper only.
2. **No branding in UI.** No CodePixels / COVAO logos in `src/`. Only exception: minimal text credit in `site-footer` (`App.svelte` > `.hub-credits`). No other names or links inside `src/`. Full credits live in `README.md` / docs.
3. **Fidelity first.** Do not invent history. Base copy on the original TheProject.html. Modern copy may summarize but must link back to original anchors.
4. **English code and comments.** UI copy in English (matches original page).
5. **Accessibility:** semantic HTML, visible keyboard focus, `prefers-reduced-motion` disables reveal animation and jumps to final state. Maintain readable contrast in every era.
6. **Responsive:** mobile-first, narrow `<80ch` column in terminal/original, opens to asymmetric grid in modern.
7. **Small components, typed props.** Prefer Svelte 5 runes (`$state`, `$derived`, `$effect`). No `any`.

## 6. Styling guide (eras.css)

- Define interpolated vars: `--bg, --ink, --link, --font-body, --font-mono, --radius, --shadow`.
- Terminal: `#0A0F0A` bg, `#33FF33` ink, monospace (`IBM Plex Mono`, `VT323` fallback), subtle scanlines.
- Original 1990: white `#FFFFFF`, Times serif, classic `#0000EE` links, zero radius, zero shadow.
- Retro 2010: `Arial/Helvetica`, glossy gradient header, rounded pills, sidebar, drop shadows — intentionally dated.
- Modern: paper `#FAFAF9`, ink `#111111`, single CERN-blue accent, 2 distinct families, generous whitespace. Avoid generic tells: no ALL-CAPS eyebrows everywhere, no `→` on every link, no `01/02/03` numbering unless real sequence, no SaaS card grid.
- Motion stays quiet (scroll reveals only). Cut decoration that does not serve the brief.

## 7. Design process (frontend-design skill)

- Plan tokens (color/type/layout) before coding, review against brief, then build.
- Spend boldness in one place. Cut decoration that does not serve the brief.
- Critique own work; check specificity collisions (e.g. `.section` vs element selectors for padding).

## 8. Definition of Done

- `npm run check` passes.
- All 4 eras render same content from `www-content.ts`.
- Scroll reveals are smooth on desktop and mobile, disabled under reduced-motion.
- No branding strings in `src/` except minimal text credit in `site-footer` (`grep -ri "codepixels\|covao" src/` returns only `App.svelte` > `.hub-credits`).
- Keyboard navigable, focus visible, Lighthouse a11y ≥ 95.

## 9. Roadmap

- [x] Phase 0 — docs (README + AGENTS)
- [ ] Phase 1 — `www-content.ts` + `TheProject.svelte` faithful 1990
- [ ] Phase 2 — `TerminalChrome` + sticky scroll container
- [ ] Phase 3 — scroll-scrubbed `useScrubReveal` transitions
- [ ] Phase 4 — 2010 theme
- [ ] Phase 5 — modern theme + polish + deploy
