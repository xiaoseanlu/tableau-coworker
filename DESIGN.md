# Tableau Coworker — design system & redesign rationale

This document is meant for **design and product review**: how the visual language works, why it diverges from default Tableau chrome, and how each **interactive flow** maps customer pain to a redesigned surface.

**Interactive design-system overview:** `#/design-system` — scannable summary of tokens, typography, capture roots, atoms → organisms, and dynamic layout (`Region` / `AdaptiveGrid`), with links to `plan/03-design-system.md` and `plan/14-design-system-architecture.md` when the deploy sets `VITE_GITHUB_URL`.

**Live prototype (after `npm run dev` or the hosted site):**

| Route | Persona | What to click |
|-------|---------|---------------|
| `#/flows/maya` | CRO (Maya) | Step through **Open → Brief → Drill → Send**. Brief shows **interactive coverage trend**; Drill pairs narrative with **concentration chart**. |
| `#/flows/jordan` | VP Sales Ops | **Sprawl → Queue → Diagnose → Resolve**. Queue includes **portfolio composition** bar and triage rows. |
| `#/flows/sam` | Regional director | **Today → Brief → Drill → Act**. Brief uses **thumb-first cards** with inline **spark trends**. |

The **“today”** states use **real Tableau Cloud trial captures** (`public/captures/`). The **“tomorrow”** states are **designed here** — typography, color, density, and **interactive charts** built in React (SVG), not screenshots.

---

## 1. Design principles (why this isn’t “Tableau skin v2”)

1. **Narrative before pixels.** Tableau’s executive surfaces default to a **wall of widgets**; readers synthesize alone. We invert hierarchy: **story + confidence + provenance** first, **charts as evidence** on demand.
2. **Warm paper, not cold enterprise grey.** Tableau’s Cloud UI reads utilitarian blue-grey. We use a **warm canvas** so generated content feels **editorial**, closer to a morning brief than a builder tool.
3. **Aubergine, not another “trust blue”.** Primary accent is **aubergine** (`#5B2E91`) — premium, distinct from Salesforce/Tableau defaults — for navigation, emphasis, and “human” actions.
4. **Gold signal for machine reads.** AI/agent content uses **warm gold** (`#C7841C`) so **machine-generated** reads are **visible and skimmable** without pretending to be neutral UI chrome.
5. **Numeric truth in mono.** KPIs and deltas use **JetBrains Mono** for **tabular alignment** and auditability (finance/Ops trust pattern).

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

**Elevation:** Soft shadow (`shadow-card`, `shadow-raised`) — paper-like, not glassmorphism.

---

## 3. Pain → redesign mapping

| Observed pain (evidence) | Design response | Where it ships |
|--------------------------|-----------------|----------------|
| Exec wall of widgets, no “what changed” (`key/04`) | **Briefing surface**: headline, 3 paragraphs, 3 KPI cards, **trend chart** with hover | Maya · **Brief** |
| Good agent analysis buried in side panel (`key/10`) | **Evidence-first drill**: agent copy + **concentration chart** + still cite real Agent capture | Maya · **Drill** |
| Dashboard sprawl, alphabetical lists (`key/03`) | **Curation queue** + **portfolio mix** visualization + reasons | Jordan · **Queue** |
| Mobile = desktop squished (`key/05`) | **Region briefing cards**, spark trends, no map grid | Sam · **Brief** |

---

## 4. Components (code)

| Primitive | Location | Purpose |
|-----------|----------|---------|
| `FlowChrome` | `src/components/FlowChrome.tsx` | Flow shell: step nav, design notes, keyboard-friendly step pills |
| `Surface` | same | Web / mobile / Slack chrome for “device truth” |
| `Sparkline`, `CoverageTrendChart`, `PortfolioMixBar`, `ConcentrationBars` | `src/components/viz/DataViz.tsx` | **Interactive / hoverable** SVG visualizations |

---

## 5. What “wow” means here

- **Not** a Figma handoff — a **running** prototype with **real evidence** frames and **designed** follow-on states.
- **Interactive data viz** is implemented where it supports the **story** (trend, concentration, portfolio mix) — not chart junk for decoration.
- If you only read one path: **`#/flows/maya` scene Brief** — narrative + **live hover chart**.

---

## 6. Accessibility & motion

- Charts expose **visible text** for values (tooltips / labels on hover).
- Prefer **semantic HTML** in flow bodies; step navigation uses `aria-current="step"` in `FlowChrome`.
- For production you’d add `prefers-reduced-motion` on chart transitions; prototype keeps motion minimal.

---

## License

Design exploration only. Not affiliated with Salesforce or Tableau.
