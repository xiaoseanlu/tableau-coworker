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

import FlowChrome, { Note, Surface, type FlowStep } from '../components/FlowChrome'
import MayaInteractiveDashboard from '../components/dashboard/MayaInteractiveDashboard'
import { ConcentrationBars } from '../components/viz/DataViz'

const CAP = `${import.meta.env.BASE_URL}captures/`

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
    body: (
      <div className="space-y-4">
        <div>
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Scene 01 · Tableau today</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            8:42 AM Monday. Maya opens the executive dashboard. It looks the same as it did in 2015.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            This is a real capture from a Tableau Cloud trial. Seven KPI tiles, a map, trend blocks — no narrative.
            No signal of what moved since Friday. Maya has eighteen minutes before staff. She has to read the wall.
          </p>
        </div>
        <Surface chrome="web">
          <img
            src={`${CAP}key/04-exec-wall-of-widgets.png`}
            alt="Tableau Superstore Executive Overview — wall of widgets"
            className="block w-full"
          />
        </Surface>
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
    body: (
      <div className="space-y-4">
        <div>
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Scene 03 · Drilldown</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            Maya clicks the West region delta. The agent shows its work.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Tableau already produces analysis this good — Ohio (-21.7%), Colorado (-20.3%), with specific
            recommendations. Today it lives in a side panel you have to summon. Here it's the surface.
          </p>
        </div>

        <Surface chrome="web">
          <div className="bg-canvas p-6 md:p-8 space-y-6">
            <div className="rounded-md border border-signal/25 bg-signal-soft/60 px-4 py-4 text-sm text-signal-ink leading-relaxed">
              <div className="text-2xs uppercase tracking-wider font-mono text-signal mb-2">Agent read · West coverage</div>
              West-region pipeline coverage dropped 2.1 points week-over-week to 2.6×. The cause is concentrated,
              not systemic — three reps account for 78% of the move, all in the manufacturing vertical, and all against
              deals that originated in February. <strong>Confidence: moderate.</strong> I&apos;d want a manager to know
              this before staff at 9.
            </div>

            <div className="card p-4">
              <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-3">
                Concentration · share of WoW move (West)
              </div>
              <ConcentrationBars
                rows={[
                  { name: 'A. Morales', pct: 34, color: '#5B2E91' },
                  { name: 'J. Okonkwo', pct: 28, color: '#7A4D9A' },
                  { name: 'T. Brennan', pct: 16, color: '#9B7AB8' },
                ]}
              />
              <p className="text-2xs text-ink-500 mt-3 leading-relaxed">
                Illustrative bars for the agent&apos;s “concentrated, not systemic” read — paired with CRM opportunity attribution.
              </p>
            </div>

            <div>
              <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-2">What I checked and ruled out</div>
              <ul className="text-sm text-ink-600 space-y-1.5 list-disc pl-4">
                <li>Checked enterprise renewal slippage — ruled out. Three of the four were Q2 mid-market deals; renewals held.</li>
                <li>
                  Checked the new pipeline-coverage model (Jordan&apos;s v2, Apr 30) — the WoW comparison uses both old and new definitions; the delta holds either way.
                </li>
                <li>Checked seasonality — ruled out. The same week last quarter and the same week last year were both above 2.8× for the West.</li>
              </ul>
            </div>

            <p className="text-sm text-accent font-medium">
              Want to know if this is repeat-account drag or new-account acquisition?
            </p>

            <div>
              <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-2">Reference · Tableau Agent today</div>
              <img
                src={`${CAP}key/10-tableau-agent-with-insights.png`}
                alt="Real Tableau Agent output identifying Ohio and Colorado as worst-performing states"
                className="block w-full rounded-md border border-ink-100"
              />
              <p className="text-xs text-ink-500 mt-3 leading-relaxed">
                Tableau already generates analysis at this level on the Superstore Executive Overview — Ohio (−21.7%) and Colorado (−20.3%) with specific recommendations. Today that read lives in a side panel you summon from the toolbar. Here, the same class of read is the surface.
              </p>
            </div>
          </div>
        </Surface>
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
    body: (
      <div className="space-y-4">
        <div>
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Scene 04 · Hand off</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            The briefing becomes the staff-meeting doc. Provenance attached.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Every claim links to the data. Every adaptive choice has a "why am I seeing this?" affordance.
            Maya forwards a paragraph, not a screenshot.
          </p>
        </div>

        <Surface chrome="web">
          <div className="bg-canvas p-8 space-y-6">
            <div className="rounded-md border border-signal/30 bg-signal-soft/50 px-4 py-3 text-sm text-ink-800">
              Saved. Briefing&apos;s in your Monday folder. The link is also on your 9:00 staff calendar invite.
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="button" className="btn-primary text-sm">
                Save to Monday folder
              </button>
              <button type="button" className="btn-secondary text-sm">
                Forward as paragraph
              </button>
            </div>
            <details className="text-sm text-ink-600 border border-ink-100 rounded-md p-4 bg-canvas-raised">
              <summary className="cursor-pointer text-ink-700 font-medium">Why am I seeing this?</summary>
              <p className="mt-3 leading-relaxed">
                You&apos;re seeing this version because you&apos;re the CRO and you opened the Sales Executive Overview every Monday between 8:36 and 8:48 for the last seven weeks. Three paragraphs, three metrics, three things-for-staff is the shape that shipped to you because that&apos;s the shape you read all the way through three weeks running. If the shape&apos;s wrong, change it on a Tuesday and I&apos;ll learn.
              </p>
            </details>
            <p className="font-mono text-2xs text-ink-400">
              Briefing v18 · generated 8:38 AM PT · sources synced 8:38 AM PT · agent: Tableau Coworker (briefing model, May 1 release)
            </p>
          </div>
        </Surface>
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
