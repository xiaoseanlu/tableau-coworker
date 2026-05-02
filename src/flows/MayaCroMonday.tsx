/**
 * Flow 01 — Maya the CRO, Monday morning.
 *
 * CONTENT: Filled from `plan/08-flow-maya-cro-monday.md` (May 2026).
 *
 * PERSONA (from CONTEXT.md):
 *   Maya — Chief Revenue Officer at Acme SaaS Inc. Mondays before the
 *   exec staff meeting. Cares about story over data. Surface becomes:
 *   3-paragraph narrative, 3 metric cards, 3 things-to-know-for-the-meeting.
 *   Charts hidden until clicked.
 *
 * PILLARS DEMONSTRATED (from CONTEXT.md §"Four strategic pillars"):
 *   01 — The default dashboard is generated, not configured.
 *   02 — Every chart explains itself (charts are evidence; narrative is the surface).
 *
 * CAPTURE EVIDENCE WIRED:
 *   Scene 1 — key/04 · wall of widgets today
 *   Scene 2 — full interactive dashboard (Recharts + agent dock)
 *   Scene 3 — ConcentrationBars + key/10 · agent quality proof
 *   Scene 4 — share / provenance (designed UI)
 */

import FlowChrome, { Note, type FlowStep } from '../components/FlowChrome'
import MayaInteractiveDashboard from '../components/dashboard/MayaInteractiveDashboard'
import { MayaDrillBoard, MayaOpenBoard, MayaSendBoard } from '../components/dashboard/mayaBoards'

const steps: FlowStep[] = [
  // ─────────────────────────────────────────────────────────────────────
  // SCENE 01 — "Open" : Maya opens Tableau Cloud Monday 8:42 AM and lands
  // on the executive dashboard as it ships today. Wall of widgets, no
  // narrative, no signal of what changed since Friday. Anchor for the
  // "what's broken" claim.
  // ─────────────────────────────────────────────────────────────────────
  {
    label: 'Open',
    surface: 'Web · Tableau today',
    immersive: true,
    body: (
      <div className="space-y-4">
        <div className="max-w-3xl">
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Scene 01 · Tableau today</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            8:42 AM Monday. Maya opens the executive dashboard. It looks the same as it did in 2015.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Real capture from a Tableau Cloud trial — seven KPI tiles, a map, trend blocks. Tap zones on the board or rely on the dock to name what the wall cannot do: deltas vs Friday, narrative spine, Agent surfaced by default.
          </p>
        </div>
        <MayaOpenBoard />
      </div>
    ),
    notes: (
      <>
        <Note title="Why we open with the real product">
          The whole flow is a contrast. If scene 01 isn't the real Tableau, the contrast in scene 02 lands as
          marketing. The capture is from the Superstore Executive Overview — the canonical sample dashboard.
        </Note>
        <Note title="Spec">
          Scene 01 copy and structure match <span className="font-mono text-2xs">plan/08-flow-maya-cro-monday.md</span>.
        </Note>
      </>
    ),
  },

  // ─────────────────────────────────────────────────────────────────────
  // SCENE 02 — "Brief" : Same data substrate, recomposed for Maya. Three
  // paragraphs of narrative, three metric cards, three things-to-know-
  // for-the-meeting. Charts hidden until clicked. The dashboard becomes
  // a briefing.
  // ─────────────────────────────────────────────────────────────────────
  {
    label: 'Brief',
    surface: 'Web · interactive revenue command',
    immersive: true,
    body: (
      <div className="space-y-4">
        <div className="max-w-3xl">
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Scene 02 · Redesigned dashboard</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            One surface: KPIs, multi-chart analytics, and the agent fused into every click.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Click week dots, rep bars, region rows, KPI tiles, or ARR points — the Coworker dock narrates each slice with confidence, the way Tableau Agent already can today when summoned. Here, the read is default, not a side panel.
          </p>
        </div>
        <MayaInteractiveDashboard />
      </div>
    ),
    notes: (
      <>
        <Note title="Craft bar">
          Built with Recharts: real SVG geometry, tooltips, and click handlers. Selection state drives the gold agent dock — same pattern you’d wire to a model in production.
        </Note>
        <Note title="Pillar alignment">
          Generated landing for Maya’s role; every chart is interrogable; personalization and provenance can sit in the same shell (scene 04).
        </Note>
        <Note title="Vs Tableau today">
          Scene 01 is still the wall of widgets. This step is the quantified redesign: dense BI that stays legible because hierarchy and agent reads are first-class.
        </Note>
      </>
    ),
  },

  // ─────────────────────────────────────────────────────────────────────
  // SCENE 03 — "Drill" : Maya clicks a number; the agent shows its work.
  // The chart appears as evidence; the narrative-of-the-narrative explains
  // why the system flagged this. Anchor capture: the real Tableau Agent
  // output proving the underlying analysis is good.
  // ─────────────────────────────────────────────────────────────────────
  {
    label: 'Drill',
    surface: 'Web · evidence panel',
    immersive: true,
    body: (
      <div className="space-y-4">
        <div className="max-w-3xl">
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Scene 03 · Drilldown</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            Maya clicks the West region delta. The agent shows its work.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Tableau already produces analysis this good — Ohio (-21.7%), Colorado (-20.3%), with specific recommendations.
            Today it lives in a side panel you have to summon. Here it is the surface: every bar, check row, and the capture receipt are wired to the dock.
          </p>
        </div>
        <MayaDrillBoard />
      </div>
    ),
    notes: (
      <>
        <Note title="The most important capture in the deck">
          flow-h-ai-agent/22 (mirrored as key/10) is the strongest single piece of evidence in the project.
          The agent's analysis is genuinely good. The redesign argues that capability already exists — the
          courage to make it the surface does not.
        </Note>
        <Note title="Conversation as a mode, not a chatbot">
          Per plan/03 voice rules: the next-question affordance is inline and editorial, not a chat thread.
        </Note>
      </>
    ),
  },

  // ─────────────────────────────────────────────────────────────────────
  // SCENE 04 — "Send" : Maya forwards the briefing to staff, or saves it
  // as the talking-points doc. The artifact has provenance — links back
  // to the data, the agent's reasoning, the moment of generation. The
  // dashboard ends as a document, not a screen.
  // ─────────────────────────────────────────────────────────────────────
  {
    label: 'Send',
    surface: 'Web · share & audit',
    immersive: true,
    body: (
      <div className="space-y-4">
        <div className="max-w-3xl">
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Scene 04 · Hand off</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            The briefing becomes the staff-meeting doc. Provenance attached.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Every action, personalization receipt, and propagation point is clickable — the dock carries the audit narrative. Maya forwards a paragraph, not a screenshot.
          </p>
        </div>
        <MayaSendBoard />
      </div>
    ),
    notes: (
      <>
        <Note title="Pillar 04 made tangible">
          Personalization is observed, not configured — and the observation itself is auditable. Every choice
          has a reason; the reason is a click away.
        </Note>
        <Note title="Scene 04 from plan/08">
          Native UI only — no Tableau capture for &quot;briefing became a doc.&quot;
        </Note>
      </>
    ),
  },
]

// === Default export ===================================================

export default function MayaCroMonday() {
  return (
    <FlowChrome
      flowNumber="01"
      title="The CRO's Monday — generated, not configured"
      thesis="Same data substrate, composed for who's looking. The dashboard ends as a document; the agent's evidence is the surface."
      steps={steps}
    />
  )
}
