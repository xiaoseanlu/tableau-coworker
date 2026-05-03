/**
 * Flow 01 — Maya the CRO, Monday morning.
 *
 * Two design stories (not one linear “user journey”):
 *   I  · Living surface — same web canvas, all viz interactive, AgentDock on the side
 *   II · Out to the org — share sheet, Slack, recipient read, Calendar (handoff + triage)
 *
 * Captures: `plan/08-flow-maya-cro-monday.md`, Open=`flow-d-explore-superstore/06-overview-exec-dashboard.png`
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
        <Note title="Capture-first beat">
          Tap zones name the wall&apos;s failure modes before the redesign begins.
        </Note>
        <Note title="Spec">
          Anchored in <span className="font-mono text-2xs">plan/08-flow-maya-cro-monday.md</span> scene 01.
        </Note>
      </>
    ),
  },

  {
    label: 'Living canvas',
    designStory: 'I · Living surface',
    surface: 'Web · one canvas',
    immersive: true,
    body: (
      <div className="space-y-4">
        <div className="max-w-3xl">
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Design story I</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            Thesis at first paint — language leads; the grid is evidence underneath.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Default is <strong className="font-semibold text-ink-800">narrative leads</strong> (same Acme numbers as always). Use{' '}
            <strong className="font-semibold text-ink-800">Jump UI state</strong> to compare classic grid, selections, and dock reads.
            Scroll for the drill layer and the real Agent capture as receipt.
          </p>
          <p className="text-sm text-ink-600 leading-relaxed mt-3 border-l-2 border-signal/30 pl-3">
            <strong className="text-ink-800">In this slice:</strong> narrative-first shell, frozen handoffs, and RLS-scoped recipient
            read — enough to argue hierarchy and trust in-days. <strong className="text-ink-800">A bolder vNext</strong> would let generation
            precede chart scaffolding, choreograph permissions inside the same beats, and branch mobile without a linear tour.{' '}
            <span className="text-ink-500">Not claiming live Agent routing or warehouse fidelity here.</span>
          </p>
        </div>
        <MayaInteractiveDashboard presetStrip initialLayout="narrativeLeads" />
        <div className="max-w-3xl pt-6 border-t border-ink-200 space-y-3">
          <h3 className="editorial text-xl text-ink-900 m-0">Evidence · drill + capture receipt</h3>
          <p className="text-sm text-ink-600 leading-relaxed m-0">
            One design language: chart clicks still drive the dock. The Tableau Agent output in{' '}
            <span className="font-mono text-2xs">flow-h-ai-agent/22-overview-dashboard-agent-with-insights.png</span> proves the
            analysis class already exists — this beat is placement and trust.
          </p>
        </div>
        <MayaDrillBoard />
      </div>
    ),
    notes: (
      <>
        <Note title="Same surface, multiple states">
          Presets rehearse how one Monday canvas behaves before and after selection — no linear “click next.”
        </Note>
        <Note title="Build">
          Recharts + shared dock contract — repeated wherever the agent narrates selection.
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
          Handoff UI is its own design problem — permissions, audit, and unfurl metadata are not a footnote in Monday prep.
        </Note>
      </>
    ),
  },

  {
    label: 'Hand off',
    designStory: 'II · Out to the org',
    surface: 'Slack + Web · two views',
    immersive: true,
    body: (
      <div className="space-y-4">
        <div className="max-w-3xl">
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Design story II · B–C</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            One payload — channel shape, then recipient read.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Slack shows the unfurl and triage copy; Jordan opens the same frozen brief in a read-only shell. Same v18, scoped dock,
            pinned evidence.
          </p>
        </div>
        <div className="grid xl:grid-cols-2 gap-6 items-start">
          <MayaSlackHandoffBoard />
          <MayaRecipientBriefBoard />
        </div>
      </div>
    ),
    notes: (
      <>
        <Note title="Message shape">
          Numbers are the hook; narrative is skimmable; link is the only mutable source of truth for charts.
        </Note>
        <Note title="Post-share agent">
          “Ask next” only about this brief — cites v18 and pinned tables; no org-wide surfacing past RLS and snapshot.
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
      thesis="CRO briefing: narrative-first Monday canvas, then handoff — same frozen v18 to staff, Slack, and calendar."
      persona={MAYA_FLOW_PERSONA}
      steps={steps}
    />
  )
}
