# Tableau Coworker — design system & why I built it this way

I wrote this for design and product review: how the visual language works, why I walked away from default Tableau chrome, and how each interactive flow ties a pain I saw in captures to a screen I’d rather ship.

**Interactive deep-dive:** `#/design-system` — tokens, how I map **FT Visual Vocabulary** intent (`VizStoryMeta`) onto `VizSpec`, capture roots, layers, and responsive layout. Links out to `plan/03-design-system.md` and `plan/14-design-system-architecture.md` when deploy sets `VITE_GITHUB_URL`.

**Live prototype** (after `npm run dev` or the hosted site):

| Route | Persona | What I’d click |
|-------|---------|----------------|
| `#/flows/maya` | CRO (Maya) | Walk **Open**, then **Brief**, **Drill**, **Send**. Brief shows the **interactive coverage trend**; Drill pairs copy with the **concentration chart**. |
| `#/flows/jordan` | VP Sales Ops | Walk **Sprawl**, **Queue**, **Diagnose**, **Resolve**. Queue shows **portfolio composition** and triage rows. |
| `#/flows/sam` | Regional director | Walk **Today**, **Brief**, **Drill**, **Act**. Brief uses **thumb-first cards** with inline **spark trends**. |

I used **real Tableau Cloud trial captures** for “today” (`public/captures/`). Everything “tomorrow” is **designed and built here** — type, color, density, and **interactive charts** in React (SVG), not screenshots I’m pretending are live product.

---

## 1. Principles (why I didn’t do “Tableau skin v2”)

1. **I put language before the grid.** Tableau’s exec defaults still open on a **wall of widgets**; the reader does the synthesis alone. I flipped the order: **short read, confidence, provenance up front**, and charts when you need proof.
2. **I chose warm paper over cold enterprise grey.** Cloud Tableau reads utilitarian blue-grey. I wanted a **warm canvas** so generated copy feels closer to a morning brief than to a builder tool.
3. **I picked aubergine on purpose — not another “trust blue”.** Primary accent is **aubergine** (`#5B2E91`): distinct from Salesforce/Tableau defaults. I use it for navigation, emphasis, and human actions.
4. **I mark machine copy in gold.** AI/agent reads use **warm gold** (`#C7841C`) so skimming separates **what the model said** from neutral chrome — without pretending it’s “just UI.”
5. **I set numbers in mono.** KPIs and deltas use **JetBrains Mono** for alignment and audit habits finance and ops already trust.

---

## 2. Tokens (source: `tailwind.config.js`)

| Token | Hex / use | Role |
|-------|-------------|------|
| `canvas` | `#FAFAF7` | Page background — warm off-white |
| `canvas-raised` | `#FFFFFF` | Cards, surfaces |
| `ink-900` … `ink-100` | Neutral scale | Text and borders |
| `accent` | `#5B2E91` | Primary emphasis, links, active flow step |
| `signal` | `#C7841C` | Agent narrative, insight callouts |
| `success` / `warning` / `danger` | See config | Triage semantics (Jordan, Sam) |

**Typography:** Inter (UI), Source Serif 4 (headlines), JetBrains Mono (numbers, labels).

**Elevation:** Soft shadow (`shadow-card`, `shadow-raised`) — paper-like, not glass.

**Chart picking (FT-aligned):** When a chart is model-driven, I set `story.category` using the Financial Times Visual Vocabulary (relationship first, then `VizSpec.type`). See `plan/14-design-system-architecture.md` §6.3a for correlation language, spatial rates, bar baselines, part-to-whole legibility.

---

## 3. From capture to screen (what I mapped)

Each row is: something I could point to in a screenshot, then what I redesigned, then where I built it in the prototype.

| What I saw (evidence) | What I changed | Where it ships |
|------------------------|----------------|----------------|
| Exec wall of widgets, no “what changed” (`key/04`) | **Briefing opens first:** headline, three short paragraphs, KPIs, **trend chart** with hover | Maya · **Brief** |
| Strong agent analysis tucked in a side panel (`key/10`) | **Drill pairs copy + concentration chart**; I still anchor to real Agent capture | Maya · **Drill** |
| Dashboard sprawl, alphabetical lists (`key/03`) | **Curation queue** + **portfolio mix** + a reason on each row | Jordan · **Queue** |
| Mobile inherits desktop layout (`key/05`) | **Region briefing cards**, spark trends, no map grid | Sam · **Brief** |

---

## 4. Components (code)

| Primitive | Location | Purpose |
|-----------|----------|---------|
| `FlowChrome` | `src/components/FlowChrome.tsx` | Flow shell: step nav, notes, keyboard-friendly pills |
| `Surface` | same | Web / mobile / Slack chrome so device reads honestly |
| `Sparkline`, `CoverageTrendChart`, `PortfolioMixBar`, `ConcentrationBars` | `src/components/viz/DataViz.tsx` | **Interactive** SVG visualizations |

---

## 5. What “wow” means here

I’m not optimizing for a Figma handoff. I wanted a **running** prototype with **real evidence frames** and **designed** follow-on states.

I only added interactive charts where they carry the story (trend, concentration, portfolio mix). If it’s decoration, I cut it.

If you only click one thing, make it **Maya’s Brief** step at `#/flows/maya` — that’s where I tried to prove the short read and a **live hover chart** in the same breath.

---

## 6. Accessibility & motion

Charts expose **visible text** for values (tooltips / labels on hover).

I kept **semantic HTML** in flow bodies; step navigation uses `aria-current="step"` in `FlowChrome`.

For production I’d wire `prefers-reduced-motion` through chart transitions; the prototype keeps motion light on purpose.

---

## License

Design exploration only. Not affiliated with Salesforce or Tableau.
