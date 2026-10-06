# The WWW Project — From Terminal to Modern Web

> A scroll-driven reimagining of the first web page:
> `info.cern.ch/hypertext/WWW/TheProject.html` (Tim Berners-Lee, 1990).
> Same root content, four styles: terminal → 1990 original → 2010 web → 2026 modern.

## Vision

The web was born as plain text in a line-mode terminal. This project lets you
scroll through that history without leaving the page:

1. **Terminal (~1989)** — black screen, phosphor green, `>` prompt, line-by-line render.
   Inspired by the [line-mode browser simulator](http://line-mode.cern.ch/www/hypertext/WWW/TheProject.html).
2. **Original (1990)** — faithful replica of TheProject.html: white background,
   Times serif, blue underlined links, introduced with a quiet scroll reveal.
3. **Retro (circa 2010)** — the same content dressed as Web 2.0: glossy header,
   two-column layout, pills and sidebars. Deliberately dated.
4. **Modern (2026)** — clean reinterpretation with intentional typography and generous
   whitespace. Designed with our frontend design system, quiet throughout.

No routers, no reloads. Scroll is the time machine.

## Original content preserved

All eras render from a single source:

- Intro `WorldWideWeb (W3)` + hypermedia vision
- Executive summary, mailing lists, policy, news, FAQ
- `What's out there?`, `Help`, `Software Products`
- `Technical`, `Bibliography`, `People`, `History`
- `How can I help`, `Getting code`

We do not invent history. Modern copy may summarize but always links back to the CERN originals.

See [the first website](http://info.cern.ch/hypertext/WWW/TheProject.html) and
[the birth of the web](https://home.web.cern.ch/topics/birth-web).

## Tech stack

- **Svelte 5** (runes), **TypeScript** strict, **Vite 8**
- Vanilla CSS with era theming via `[data-era]` + CSS custom properties
- Native `IntersectionObserver` + `requestAnimationFrame` for quiet scroll reveals, no scroll library
- No router, no Tailwind, no UI kit

## Getting started

```bash
npm install
npm run dev      # local dev at http://localhost:5173
npm run build    # production build to dist/
npm run preview  # preview the production build
npm run check    # svelte-check + tsc, run before every PR
```

Requirements: Node 20+.

## Project structure

```
src/
  App.svelte                 # journey orchestrator, natural stacked sections
  lib/
    content/www-content.ts   # single source of truth for all sections/links
    useScrubReveal.ts        # scroll-scrubbed entry transitions, respects prefers-reduced-motion
  components/
    HeroIntro.svelte        # timeline hero with quiet atom canvas
    ThemeToggle.svelte       # light/dark toggle, persisted, pre-paint in index.html
    TerminalChrome.svelte    # terminal frame only
    TheProject.svelte        # semantic, era-agnostic markup
    Era2010Chrome.svelte     # 2010 wrapper chrome only
    ModernChrome.svelte      # modern wrapper chrome only
    CernParticles.svelte     # discreet canvas detail for the modern era only
  styles/
    eras.css                 # theme vars + 4 skins via [data-era]
AGENTS.md                    # contributor rules, styling guide, DoD
```

Rule: **era = CSS + chrome wrapper only.** Never duplicate section text per era.

## Design notes

- Terminal: `#0A0F0A` bg, `#33FF33` ink, monospace, subtle scanlines.
- Original: white `#FFFFFF`, Times serif, `#0000EE` links, zero radius.
- 2010: `Arial/Helvetica`, glossy gradients, pills, shadows — intentionally dated.
- Modern: paper `#FAFAF9`, ink `#111111`, one CERN-blue accent, two distinct type families.

Quiet scroll reveals only. Everything else stays still.
Respects `prefers-reduced-motion`, keyboard navigable, mobile-first (`<80ch` in early eras).

## Roadmap

- [x] Phase 0 — docs (this README + AGENTS.md)
- [ ] Phase 1 — `www-content.ts` + faithful 1990 `TheProject.svelte`
- [ ] Phase 2 — `TerminalChrome` + sticky scroll container
- [ ] Phase 3 — scroll-scrubbed `useScrubReveal` transitions
- [ ] Phase 4 — 2010 theme
- [ ] Phase 5 — modern theme, a11y polish, deploy

See `AGENTS.md` for definition of done and contributor conventions.

## Credits

Built by Ian Díaz Sandi and Emily Navarro Santamaría at **[COVAO de Costa Rica](https://covao.ed.cr/)**, in collaboration with **[CodePixels Studio](https://codepixels.dev)**.

Educational tribute to CERN and the World Wide Web inventors. Original content belongs to CERN.
This is not an official CERN site — please visit
[info.cern.ch](http://info.cern.ch/) and [home.web.cern.ch](https://home.web.cern.ch/) for the real history.
