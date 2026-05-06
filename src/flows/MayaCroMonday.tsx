/**
 * Flow 01 — Maya the CRO, Monday morning.
 *
 * Two design stories (not one linear “user journey”):
 *   I  · Living surface — same web canvas, all viz interactive, AgentDock on the side
 *   II · Out to the org — share sheet, Slack, recipient read, Calendar (handoff + triage)
 *
 * Captures (repo): Superstore Executive Overview; Tableau Agent on same exec wall — indexed under public/captures/.
 */

import FlowChrome, { type FlowStep } from '../components/FlowChrome'
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
    designStory: 'Before',
    surface: 'Web · Tableau today',
    immersive: true,
    body: (
      <div className="space-y-4">
        <div className="max-w-3xl">
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Before</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            The wall Tableau ships today — widgets first, narrative absent.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            This is the Sales Executive Overview from a Tableau Cloud trial — the closest thing to a revenue lead&apos;s home page.
            Tap the highlighted zones to see what the chrome cannot answer when you only have a few minutes before staff.
          </p>
        </div>
        <MayaOpenBoard />
      </div>
    ),
  },

  {
    label: 'Living canvas',
    designStory: 'Living surface',
    surface: 'Web · one canvas',
    immersive: true,
    body: (
      <div className="space-y-4">
        <div className="max-w-3xl">
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Living surface</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            Thesis at first paint — language leads; the grid is evidence underneath.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Default is <strong className="font-semibold text-ink-800">narrative leads</strong> (same Acme numbers as always). Use{' '}
            <strong className="font-semibold text-ink-800">Jump UI state</strong> to compare classic grid, selections, and dock reads.
            Scroll for the drill layer and a side-by-side with Tableau Agent output on the same executive wall — the analysis class is
            already there; this step is about placement and trust.
          </p>
        </div>
        <MayaInteractiveDashboard presetStrip initialLayout="narrativeLeads" />
        <div className="max-w-3xl pt-6 border-t border-ink-200 space-y-3">
          <h3 className="editorial text-xl text-ink-900 m-0">Drill and receipt</h3>
          <p className="text-sm text-ink-600 leading-relaxed m-0">
            One design language: chart clicks still drive the dock. Tableau Agent already produces reads like this on the real Executive
            Overview; here they sit where a CRO can use them before 9:00.
          </p>
        </div>
        <MayaDrillBoard />
      </div>
    ),
  },

  {
    label: 'Share',
    designStory: 'Handoff',
    surface: 'Web · handoff sheet',
    immersive: true,
    body: (
      <div className="space-y-4">
        <div className="max-w-3xl">
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Share</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            Where the briefing goes — folder, Slack, Calendar, mail, link.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Maya checks <strong className="font-semibold text-ink-800">payload freeze</strong>, optional pinned drill and
            &quot;ruled out&quot; lines for Legal or Finance, and a live preview before anything leaves Tableau. Coworker spells out what
            recipients inherit.
          </p>
        </div>
        <MayaShareSheetBoard />
      </div>
    ),
  },

  {
    label: 'Hand off',
    designStory: 'Handoff',
    surface: 'Slack + Web · two views',
    immersive: true,
    body: (
      <div className="space-y-4">
        <div className="max-w-3xl">
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Channels and inbox</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            One payload — channel shape, then recipient read.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Slack shows the unfurl and triage copy; Jordan opens the same frozen brief in a read-only shell. Same version, scoped dock,
            pinned evidence.
          </p>
        </div>
        <div className="grid xl:grid-cols-2 gap-6 items-start">
          <MayaSlackHandoffBoard />
          <MayaRecipientBriefBoard />
        </div>
      </div>
    ),
  },

  {
    label: 'Calendar',
    designStory: 'Handoff',
    surface: 'Calendar · mock',
    immersive: true,
    body: (
      <div className="space-y-4">
        <div className="max-w-3xl">
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Staff meeting</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            The 9:00 invite carries the live link — staff opens Coworker, not a PDF.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Calendar layout is illustrative — the point is the meeting inherits the same canonical link and permissions as Tableau Cloud.
          </p>
        </div>
        <MayaGoogleCalendarHandoffBoard />
      </div>
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
      orientationHint="You’re walking Maya’s Monday before staff: a real Tableau Executive Overview first, then the narrative-first Coworker canvas and handoff. Dismiss anytime."
      steps={steps}
    />
  )
}
