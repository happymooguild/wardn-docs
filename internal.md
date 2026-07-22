# wardn-docs — internal notes

The marketing + docs site for **wardn** ("did that deploy make things worse?").
Built from the Claude Design project _Wardn hackathon website design_
(`Wardn Site.dc.html`), re-implemented as a real React app with motion.

---

## Tech stack

| Piece | Choice | Why |
| :--- | :--- | :--- |
| Build tool | **Vite 5** | Fast dev server + instant HMR |
| UI | **React 18** | Component model for the sectioned page |
| Routing | **react-router-dom 6** | `/` (site) and `/docs` as real, shareable URLs |
| Animation | **framer-motion 11** | Scroll reveals, SVG path-draw, magnetic buttons, page transitions |
| Fonts | Space Grotesk / IBM Plex Sans / IBM Plex Mono | Loaded from Google Fonts in `index.html` |
| Styling | Plain CSS + CSS custom properties | Design tokens in one place, no build-time CSS framework |

No backend. Everything is static/client-side.

---

## Run it locally

Prereqs: **Node 18+** (developed on Node 25) and npm.

```bash
cd wardn-docs
npm install      # first time only
npm run dev      # start the dev server
```

Then open **http://localhost:5173/**. The dev server has HMR — save any file
under `src/` and the browser updates instantly without a full reload.

Other scripts:

```bash
npm run build    # production build → dist/
npm run preview  # serve the built dist/ locally to sanity-check the prod bundle
```

The dev server is set to `host: true` (see `vite.config.js`), so it's also
reachable from other devices on your network at the printed `Network:` URL —
handy for checking the responsive layout on a phone.

### Seeing your changes

- **Content / copy** lives inside the section components in `src/sections/`
  and `src/pages/Docs.jsx`. Edit the JSX text and it hot-reloads.
- **Colors, spacing, fonts** are all CSS variables in
  `src/styles/tokens.css`. Change a token once and it propagates everywhere.
- **The GitHub URL and the ArgoCD YAML snippet** are in `src/lib/config.js` —
  swap `GITHUB_URL` for the real repo.

---

## Project layout

```
wardn-docs/
├─ index.html                # HTML shell, font <link>s, meta
├─ vite.config.js
├─ public/favicon.svg        # the wardn "W" chart mark
└─ src/
   ├─ main.jsx               # entry: mounts <App> inside <BrowserRouter>, imports CSS
   ├─ App.jsx                # <Nav> + routes + <AnimatePresence> page transitions
   ├─ lib/
   │  ├─ config.js           # GITHUB_URL, ArgoCD ConfigMap YAML  ← edit real values here
   │  └─ scroll.js           # smooth scroll-to-id with sticky-nav offset
   ├─ hooks/
   │  └─ useMagnetic.js      # cursor-follow spring for buttons (reduced-motion aware)
   ├─ components/
   │  ├─ Nav.jsx  Footer.jsx  Logo.jsx  CopyButton.jsx
   │  ├─ Reveal.jsx          # fade+lift on scroll into view (framer-motion whileInView)
   │  ├─ DrawPath.jsx        # SVG line that draws itself on (pathLength animation)
   │  └─ charts.jsx          # HeroChart, Sparkline, TimelineChart (hand-built SVG)
   ├─ pages/
   │  ├─ Home.jsx            # composes the marketing sections
   │  └─ Docs.jsx            # sidebar + doc sections + scroll-spy
   ├─ sections/              # one file per Home section
   │  ├─ Hero.jsx  Gap.jsx  Detection.jsx  Dashboard.jsx
   │  └─ Features.jsx  Architecture.jsx  Rollback.jsx  CTA.jsx
   └─ styles/
      ├─ tokens.css          # design tokens (colors, fonts, easing) ← single source of truth
      ├─ global.css          # resets, layout, buttons, cards, code blocks
      ├─ components.css       # nav, footer, docs, copy button
      └─ home.css            # per-section styles
```

---

## Effects / animations added

These go beyond the static design — applied tastefully (every one respects
`prefers-reduced-motion`, and transforms/opacity only, so they stay at 60fps):

- **Hero staggered entrance** — badge → headline → subcopy → buttons lift in one
  after another (`Hero.jsx`).
- **Signature chart draw** — in the hero and dashboard, the "before" baseline
  draws first, then the regression line climbs after it, via SVG
  `pathLength` (`DrawPath.jsx`, `charts.jsx`). The regression endpoint dot pulses.
- **Scroll reveals** — every section fades + lifts into view the first time it's
  reached, with small per-item stagger on card grids (`Reveal.jsx`).
- **Magnetic buttons** — primary CTAs and the nav GitHub button pull gently
  toward the cursor and spring back (`useMagnetic.js`).
- **Tab crossfade** — the Direct CI / GitOps toggle in Detection animates
  between code samples (`AnimatePresence` in `Detection.jsx`).
- **Page transitions** — Home ↔ Docs crossfade instead of hard-cutting
  (`AnimatePresence` in `App.jsx`).
- **Docs scroll-spy** — the sidebar highlights the section currently in view
  (`IntersectionObserver` in `Docs.jsx`).

---

## Notes / TODO

- `GITHUB_URL` in `src/lib/config.js` still points at the design's placeholder
  repo (`happymooguild/wardn`). Update when the real repo is known.
- The charts are hand-authored SVG matching the design exactly (not a charting
  library) — if the data becomes dynamic, swap them for a real chart lib.
- For production hosting behind a static server, add an SPA fallback so
  `/docs` deep-links resolve to `index.html` (Vite dev + preview already do this).
- Source design lives in the Claude Design project
  `Wardn hackathon website design` (also has `Wardn Dashboards.dc.html` and
  `Wardn Hero Options.dc.html` — not yet ported).
```
