/**
 * Flow 01 — Maya the CRO, Monday morning.
 *
 * Two design stories (not one linear “user journey”):
 *   I  · Living surface — same web canvas, all viz interactive, AgentDock on the side
 *   II · Out to the org — share sheet, Slack, recipient read, Calendar (handoff + triage)
 *
 * Capures: `plan/08-flow-maya-cro-monday.md`, Open=`flow-d-explore-superstore/06-overview-exec-dashboard.png`
 * (mirrored `key/04-exec-wall-of-widgets.png`), Drill receipt=`flow-h-ai-agent/22-...` / `key/10-...`.
 */

import FlowChrome, { Note, type FlowStep } from '../components/FlowChrome'
import { MAYA_FLOW_PERSONA } from '../data/personaFlowMeta'
import MayaInteractiveDashboard from '../components/dashboard/MayaInteractiveDashboard'
import { MayaDrillBoard, MayaOpenBoard } from '../components/dashboard/mayaBoards'
import {
  MayaGoogleCalendarHandoffBoard,
  MayaRecipientBriefBoard,
  MayaShareSheetBoard,
  MayaSlackHandoffBoard,
} from '../components/dashboard/mayaHandoffBoards'

const steps: FlowStep[] = [
  {
    label: 'Today',
    designStory: 'Before · capture',
    surface: 'Web · Tableau today',
    immersive: true,
    body: (
      <div className="space-y-4">
        <div className="max-w-3xl">
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Receipt</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            The wall Tableau ships today — widgets first, narrative absent.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Real capture: Superstore Executive Overview (
            <span className="font-mono text-2xs">flow-d-explore-superstore/06-overview-exec-dashboard.png</span>). Tap zones
            show what the chrome cannot answer in eighteen minutes.
          </p>
        </div>
        <MayaOpenBoard />
      </div>
    ),
    notes: (
      <>
        <Note title="Design beat, not step 1 of a diary">
          This frame exists so the next beat reads as <em>designed interaction</em>, not marketing.
        </Note>
        <Note title="Spec">
          Anchored in <span className="font-mono text-2xs">plan/08-flow-maya-cro-monday.md</span> scene 01.
        </Note>
      </>
    ),
  },

  {
    label: 'Canvas',
    designStory: 'I · Living surface',
    surface: 'Web · one canvas',
    immersive: true,
    body: (
      <div className="space-y-4">
        <div className="max-w-3xl">
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Design story I · A</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            One screen — KPIs, region rows, trend geometry — AgentDock binds to every selection.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Use <strong className="font-semibold text-ink-800">Jump UI state</strong> to scrub the same layout, or click any viz.
            The story we are telling is <em>selection → read → confidence</em>, not “Maya clicked next.”
          </p>
        </div>
        <MayaInteractiveDashboard presetStrip />
      </div>
    ),
    notes: (
      <>
        <Note title="Interaction design">
          Presets demonstrate multiple <em>states of one surface</em> — the craft reviewers grade on a redesign exercise.
        </Note>
        <Note title="Tech">
          Recharts + shared dock contract — same pattern as the design system demos.
        </Note>
      </>
    ),
  },

  {
    label: 'Evidence',
    designStory: 'I · Living surface',
    surface: 'Web · proof + receipt',
    immersive: true,
    body: (
      <div className="space-y-4">
        <div className="max-w-3xl">
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Design story I · B</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            Evidence layer — charts, ruled-out checks, and the real Agent capture as receipt.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Still one design language: left canvas, right dock. The Tableau Agent output in{' '}
            <span className="font-mono text-2xs">flow-h-ai-agent/22-overview-dashboard-agent-with-insights.png</span> proves the
            analysis class already exists — we are showing placement and trust primitives.
          </p>
        </div>
        <MayaDrillBoard />
      </div>
    ),
    notes: (
      <>
        <Note title="key/10">
          Ohio / Colorado read is the strongest capture-backed defense in the project.
        </Note>
        <Note title="Conversation as mode">
          Follow-ups stay editorial chips — not a thread replacing the surface.
        </Note>
      </>
    ),
  },

  {
    label: 'Share',
    designStory: 'II · Out to the org',
    surface: 'Web · handoff sheet',
    immersive: true,
    body: (
      <div className="space-y-4">
        <div className="max-w-3xl">
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Design story II · A</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            Where the briefing goes — folder, Slack, Calendar, mail, link.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Maya checks <strong className="font-semibold text-ink-800">payload freeze</strong>, optional pinned drill + ruled-out for
            Legal/Finance, and a live preview before anything leaves Tableau. Coworker explains what recipients inherit.
          </p>
        </div>
        <MayaShareSheetBoard />
      </div>
    ),
    notes: (
      <>
        <Note title="Why a separate story">
          Handoff UI is its own design problem — permissions, audit, and unfurl metadata are not “step four of Monday.”
        </Note>
      </>
    ),
  },

  {
    label: 'Slack',
    designStory: 'II · Out to the org',
    surface: 'Slack · mock',
    immersive: true,
    body: (
      <div className="space-y-4">
        <div className="max-w-3xl">
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Design story II · B</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            Message shape: prose body, link, unfurl card.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            KPI strip, staff bullets, verdict block — recipients decide in-channel whether to open the brief. Unfurl subtitle carries
            confidence scopes (West vs EMEA).
          </p>
        </div>
        <MayaSlackHandoffBoard />
      </div>
    ),
    notes: (
      <>
        <Note title="Message shape">
          Numbers are the hook; narrative is skimmable; link is the only mutable source of truth for charts.
        </Note>
      </>
    ),
  },

  {
    label: 'Inbox',
    designStory: 'II · Out to the org',
    surface: 'Web · shared read',
    immersive: true,
    body: (
      <div className="space-y-4">
        <div className="max-w-3xl">
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Design story II · C</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            Jordan opens the link — same v18, scoped dock, pinned evidence.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Recipient perspective: triage <strong className="font-semibold text-ink-800">dig in vs skim</strong> from KPI + verdict
            row; expand Maya’s pinned West read without edit rights. Agent here never outruns RLS or the frozen snapshot.
          </p>
        </div>
        <MayaRecipientBriefBoard />
      </div>
    ),
    notes: (
      <>
        <Note title="Post-share agent">
          “Ask next” only about this brief — cites v18 and pinned tables; no org-wide surfacing. That is how you keep trust after
          share.
        </Note>
      </>
    ),
  },

  {
    label: 'Calendar',
    designStory: 'II · Out to the org',
    surface: 'Calendar · mock',
    immersive: true,
    body: (
      <div className="space-y-4">
        <div className="max-w-3xl">
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Design story II · D</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            9:00 invite carries the live link — staff opens Coworker, not a PDF.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Google-calendar-style layout as illustration; disclaimers on the card. Completes the “out of Tableau” arc.
          </p>
        </div>
        <MayaGoogleCalendarHandoffBoard />
      </div>
    ),
    notes: (
      <>
        <Note title="Seam to Jordan / Sam">
          Same canonical URL + RLS as Tableau; Jordan’s definitions and Sam’s escalations stay the substrate.
        </Note>
      </>
    ),
  },
]

export default function MayaCroMonday() {
  return (
    <FlowChrome
      flowNumber="01"
      title="Maya — living surface, then handoff"
      thesis="CRO briefing: one canvas where every viz drives the dock. Then handoff — same frozen v18 to staff, Slack, and calendar."
      persona={MAYA_FLOW_PERSONA}
      steps={steps}
    />
  )
}
