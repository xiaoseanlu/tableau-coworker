/**
 * Flow 02 — Jordan, VP Sales Ops, the curator.
 *
 * CONTENT: Filled from `plan/09-flow-jordan-curation.md` (May 2026).
 *
 * PERSONA (from CONTEXT.md):
 *   Jordan — VP Sales Ops at Acme SaaS Inc. Daily power user. Builds and
 *   governs the data model. Surface becomes: underlying dashboard with
 *   deeper metrics + curation queue (47 dashboards, 12 stale, 3 data-
 *   quality flags).
 *
 * PILLARS DEMONSTRATED (from CONTEXT.md §"Four strategic pillars"):
 *   01 — The default dashboard is generated, not configured (Jordan's
 *        view is the same substrate, different surface from Maya's).
 *   04 — Personalization is observed, not configured (system tracks
 *        what Jordan reads, asks, returns to; staleness is computed,
 *        not set).
 *
 * CAPTURE EVIDENCE WIRED:
 *   Scene 1 (sprawl)   — key/03-dashboard-sprawl.png · 9 views in one workbook, sprawl proxy
 *   Scene 2 (queue)    — placeholder, awaiting plan/09
 *   Scene 3 (diagnose) — key/02-web-authoring.png · current authoring shell + Tableau Agent tooltip
 *   Scene 4 (resolve)  — placeholder, awaiting plan/09
 */

import FlowChrome, { Note, type FlowStep } from '../components/FlowChrome'
import {
  JordanDiagnoseBoard,
  JordanQueueBoard,
  JordanResolveBoard,
  JordanSprawlBoard,
} from '../components/dashboard/jordanBoards'

const steps: FlowStep[] = [
  // ─────────────────────────────────────────────────────────────────────
  // SCENE 01 — "Sprawl" : Jordan's actual problem. Forty-seven dashboards
  // in the Acme tenant, half of them stale, no one knows which are the
  // canonical ones. Anchor capture: Tableau's own Superstore workbook
  // ships with 9 views — proxy for the sprawl pattern.
  // ─────────────────────────────────────────────────────────────────────
  {
    label: 'Sprawl',
    surface: 'Web · workbook overview',
    immersive: true,
    body: (
      <div className="space-y-4">
        <div className="max-w-3xl">
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Scene 01 · The sprawl</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            Jordan owns 47 dashboards across the Acme tenant. They&apos;re not sure which ones the company actually uses.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            One workbook, nine views on the sample — tap the workbook card, bars, or follow-ups. The capture stays the receipt; the chart is prototype load-share to make sprawl legible.
          </p>
        </div>
        <JordanSprawlBoard />
      </div>
    ),
    notes: (
      <>
        <Note title="Real evidence, not invented">
          The capture is Tableau's own Superstore sample workbook — nine dashboards shipped together. The
          "sprawl" critique starts with what Tableau itself models as a healthy product.
        </Note>
        <Note title="Spec">
          Scene 01 headline and lead from <span className="font-mono text-2xs">plan/09-flow-jordan-curation.md</span>.
        </Note>
      </>
    ),
  },

  // ─────────────────────────────────────────────────────────────────────
  // SCENE 02 — "Queue" : The curation queue. Twelve stale dashboards
  // (no views in 90 days), three data-quality flags, two duplicates. The
  // system computed this from observed usage — not configured.
  // ─────────────────────────────────────────────────────────────────────
  {
    label: 'Queue',
    surface: 'Web · curation queue',
    immersive: true,
    body: (
      <div className="space-y-4">
        <div className="max-w-3xl">
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Scene 02 · The queue</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            The system flagged 17 things this week. Each has a reason.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Stale dashboards, redundant pairs, and definitions that drifted. Tap portfolio segments, tiles, rows, or the ordering rationale — Coworker narrates each slice.
          </p>
        </div>
        <JordanQueueBoard />
      </div>
    ),
    notes: (
      <>
        <Note title="Pillar 04 in action">
          The queue exists because the system has been watching. Jordan didn't have to set up a "stale
          dashboard alert." Per plan/05, configuration as a feature is design debt; observation is the
          inverse.
        </Note>
        <Note title="The agent here is the curator, not the analyst">
          Different role from Maya's flow. Same voice rules per plan/03 — evidence-led, unflashy.
        </Note>
      </>
    ),
  },

  // ─────────────────────────────────────────────────────────────────────
  // SCENE 03 — "Diagnose" : Jordan opens one flagged dashboard. The
  // agent shows what's wrong: stale metric definition, source schema
  // changed, last-edited four months ago. Anchor capture: today's web
  // authoring shell with the Tableau Agent tooltip — evidence that AI
  // is in Tableau today, but bolted to the existing surface.
  // ─────────────────────────────────────────────────────────────────────
  {
    label: 'Diagnose',
    surface: 'Web · authoring + agent',
    immersive: true,
    body: (
      <div className="space-y-4">
        <div className="max-w-3xl">
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Scene 03 · Diagnosis</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            One flagged dashboard. The agent&apos;s read takes 30 seconds; the fix takes 3 minutes.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Drift bars, lineage nodes, and the authoring capture are all tappable — same Agent class as the tooltip in key/02, surfaced as the governance read.
          </p>
        </div>
        <JordanDiagnoseBoard />
      </div>
    ),
    notes: (
      <>
        <Note title="The capability is already shipping">
          Tableau Agent (Beta) is real. flow-g/01 captures the tooltip. The redesign argument is not "build
          AI" — it's "stop hiding the AI you already have."
        </Note>
        <Note title="Spec">
          Diagnosis copy from <span className="font-mono text-2xs">plan/09</span> scene 03; capture below for receipts.
        </Note>
      </>
    ),
  },

  // ─────────────────────────────────────────────────────────────────────
  // SCENE 04 — "Resolve" : Jordan accepts the agent's recommendation.
  // The dashboard updates; the queue closes the item; downstream
  // consumers (Maya, Sam) see the corrected number on their next visit.
  // The governance loop closes itself.
  // ─────────────────────────────────────────────────────────────────────
  {
    label: 'Resolve',
    surface: 'Web · governance loop',
    immersive: true,
    body: (
      <div className="space-y-4">
        <div className="max-w-3xl">
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Scene 04 · Loop closes</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            Jordan accepts the fix. Maya&apos;s Monday briefing updates. Sam&apos;s next mobile check-in is correct.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Tap receipt sentences or the governance pulse — downstream readers and queue closure narrate together.
          </p>
        </div>
        <JordanResolveBoard />
      </div>
    ),
    notes: (
      <>
        <Note title="The flows are connected on purpose">
          Same substrate, three personas, three surfaces. Jordan's resolve in scene 04 is what makes Maya's
          briefing trustworthy and Sam's mobile briefing accurate.
        </Note>
        <Note title="Scene 04 from plan/09">
          Closure UI is native — propagation to Maya&apos;s briefing sources is the substrate seam.
        </Note>
      </>
    ),
  },
]

// === Default export ===================================================

export default function JordanCuration() {
  return (
    <FlowChrome
      flowNumber="02"
      title="The curator's queue — observed, not configured"
      thesis="Governance is generated from observed usage. The platform has an opinion about which dashboards earn their keep."
      steps={steps}
    />
  )
}
