# Captures — real product evidence from a Tableau Cloud trial

These are real screenshots taken from a Tableau Cloud trial account on
April 30, 2026. They anchor the "what's broken" critique with actual
product evidence rather than synthesized workflow descriptions.

The captures are organized into seven flows that mirror real user
journeys. Each flow has a brief description below; files within each
flow are numbered chronologically (`01-...`, `02-...`, etc.) to
preserve the timeline.

The `key/` folder contains nine canonical captures referenced directly
by the React build's "What's broken" page. Files in `key/` are copies
of the most representative shot from each flow, with stable filenames
the React components import.

---

## flow-a-onboarding/  (3 files)
The first-time-user moment. Trial signup confirmation through to the
empty-state Tableau Cloud home.

- `01-trial-confirmation.png` — signup confirmation
- `02-cloud-home.png` — Cloud home, "Welcome Xiao Lu", 13 days in trial
- `03-cloud-home-alt.png` — alternate home state

## flow-b-first-authoring/  (9 files)
A first-time user trying to build a viz from scratch — no template, no
help. Surfaces the chart-builder learning curve.

- `01-blank-canvas.png` through `09-test1-published.png` — chronological
  states of building a US-map viz, renaming the workbook to "test1",
  and publishing it.

## flow-c-admin-settings/  (1 file)
The admin surface — Settings → Users.

## flow-d-explore-superstore/  (9 files)
The "consumer" path. A user lands on Tableau Cloud, browses samples,
opens the Superstore sample workbook, and explores its 9 dashboards.
This is where Maya (CRO persona) lives — opens a dashboard, stares at
a wall of widgets.

- `01-samples-gallery.png` — sample workbook gallery
- `02-superstore-views-list.png` — Superstore's 9 views (sprawl proxy)
- `03-...` through `09-...` — the nine Superstore dashboards in
  chronological click-through order

## flow-e-mobile/  (7 files)
Same Superstore Executive Overview rendered on iPhone XR width.
Multiple scroll states demonstrate that the dashboard was designed for
desktop and never properly adapted to mobile.

## flow-f-pulse/  (7 files)
The Tableau Pulse onboarding flow. Empty state → metric setup wizard
→ created metric with AI-generated narrative + "Discover Top Insights".
Demonstrates that Pulse exists, lives as a side product, and requires
its own setup tax.

- `01-pulse-empty-state.png` — empty state with "Get started" callout
- `02-new-metric-start.png` through `05-new-metric-config-final.png`
  — the metric setup wizard
- `06-pulse-metric-detail.png` — created metric, AI narrative, top insights
- `07-pulse-metric-detail-alt.png` — alternate detail view

## flow-g-edit-with-lod/  (3 files)
The deep authoring moment — opening a real dashboard for editing,
finding the calculated field menu, and writing an LOD expression.

- `01-web-authoring-with-tableau-agent.png` — Web Authoring with the
  "Tableau Agent" tooltip visible (key evidence: AI bolted onto the
  existing shell)
- `02-analysis-menu-open.png` — Analysis menu showing "Create
  Calculated Field..."
- `03-lod-formula-editor.png` — LOD formula editor with
  `{ FIXED [Region] : SUM([Sales]) }` typed in

## flow-h-ai-agent/  (24 files)
The full Tableau Agent activation + first-use journey. Captures
prove that (a) AI features are admin-gated and require turning on
multiple individual toggles, (b) the agent ships with multiple
disclaimers and a guided onboarding tour, and (c) once activated, the
agent's output is genuinely good — but lives in a side panel that
must be summoned, on a dashboard that itself remains unchanged.

- `01-home-pre-activation.png` — Cloud home before any AI features on
- `02-settings-ai-features-list.png` through `07-settings-ai-features-saved.png` —
  The Settings → General page with **7 separate AI feature toggles**
  (Tableau Pulse Summarize, Pulse Better Semantic Match, Pulse
  Discover, Tableau Viz Authoring, Dashboard Narratives Beta,
  Tableau Prep AI, Tableau Catalog), each turned on individually with
  a guided overlay walking through the steps. Plus the disclaimers.
- `08-home-post-activation-with-guide.png` & `09-...alt.png` — Cloud
  home after activation, now showing a guided overlay introducing
  Tableau Agent
- `10-new-workbook-connect-data-guide.png` through
  `18-new-workbook-final-state.png` — Building a viz from scratch
  with Tableau Agent's help. Includes the agent disclaimer popup
  ("Generative AI can produce inaccurate responses. Review responses
  carefully") and the agent's side panel
- `19-product-dashboard-agent-overview.png` &
  `20-product-dashboard-agent-step-2.png` — Tableau Agent (Beta) on
  the Superstore Product Drilldown dashboard. Agent introduces
  itself, offers "Get Dashboard Overview" / "Get Dashboard Insights"
  prompts. Generates a written description of the dashboard.
- `21-overview-dashboard-agent-1.png` through
  `24-overview-dashboard-agent-4.png` — Tableau Agent on the
  Superstore Executive Overview. **`22` is the strongest evidence**:
  agent's "Insights Summary" identifies Ohio (-21.7%) and Colorado
  (-20.3%) as the worst-performing states for profit ratio, with
  specific narrative recommending "targeted cost management or
  revenue optimization strategies." The agent works.

---

## key/  (12 files — canonical captures for direct React embedding)

These are copies of the most representative shot from each flow. The
React build references these stable filenames directly in the
"What's broken" page and flow demos (`src/pages/WhatsBroken.tsx`, `src/flows/*`).

| Filename | Source flow | Pain point it anchors |
|---|---|---|
| `01-chart-builder-shelves.png` | flow-b/07 | Chart builder learning curve |
| `02-web-authoring.png` | flow-g/01 | Web authoring + Tableau Agent context |
| `03-dashboard-sprawl.png` | flow-d/02 | One workbook, nine views (sprawl proxy) |
| `04-exec-wall-of-widgets.png` | flow-d/06 | Executive dashboard, wall of widgets |
| `05-mobile-squished.png` | flow-e/01 | Mobile experience, dashboard squish |
| `06-pulse-home.png` | flow-f/01 | Pulse empty state |
| `06b-pulse-metric-detail.png` | flow-f/06 | Pulse AI-narrated metric |
| `07-lod-formula-editor.png` | flow-g/03 | LOD formula barrier |
| `08-cloud-home.png` | flow-a/02 | Tableau Cloud home / first surface |
| `09-settings-ai-activation.png` | flow-h/02 | The activation tax — 7 individual AI features to toggle |
| `10-tableau-agent-with-insights.png` | flow-h/22 | Agent's actual output — Ohio & Colorado profit insights |
| `11-tableau-agent-disclaimer.png` | flow-h/14 | Generative AI disclaimer overlay (“review responses carefully”) |

---

## How to use these in the build

When the React rebuild reaches the "What's broken" page, components
import canonical captures from `key/`:

```tsx
import chartBuilder from '/captures/key/01-chart-builder-shelves.png'
```

When we want to show a *sequence* of states (e.g., "here's the path to
build a viz" — Flow B's 9 files in order), components reference the
flow folder directly. Story flows can use the chronological files.

For the on-site walkthrough, the seven flow folders are themselves the
proof of work — "I signed up for a trial, walked the canonical user
journeys, captured each, and grounded my critique in what I saw."
