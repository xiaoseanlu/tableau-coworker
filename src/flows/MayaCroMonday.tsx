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
            This is the wall Tableau still opens on — charts first, no story on the glass.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            I pulled this from the Sales Executive Overview in my Cloud trial; it’s the closest thing to a revenue lead’s home page.
            Tap the highlighted zones if you want to see what the chrome won’t answer when you only have a few minutes before staff.
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
            I’d open on language — same Acme numbers — and tuck the grid under it as proof.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            The short read leads here by default. Use the preset strip to flip between the classic grid, selections, and dock reads — I
            wanted one surface you could argue in. Scroll for drill; I parked a side-by-side with Tableau Agent language on the same exec
            wall because the quality is already real in capture — I’m fighting placement and trust, not wishing for a smarter model.
          </p>
        </div>
        <MayaInteractiveDashboard presetStrip initialLayout="narrativeLeads" />
        <div className="max-w-3xl pt-6 border-t border-ink-200 space-y-3">
          <h3 className="editorial text-xl text-ink-900 m-0">Drill and receipt</h3>
          <p className="text-sm text-ink-600 leading-relaxed m-0">
            I kept one language for interaction: clicking a chart still drives the dock. Tableau Agent already writes reads like this on the
            real Executive Overview — I’m just refusing to hide them until after the tiles load.
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
            Where the brief leaves Tableau — folder, Slack, Calendar, mail, link.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            I made Maya check a <strong className="font-semibold text-ink-800">payload freeze</strong>, optional pinned drill and
            &quot;ruled out&quot; lines if Legal or Finance care, and a live preview before anything ships. Coworker spells out what
            recipients actually inherit — I’m allergic to mysterious forwards.
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
            One frozen payload — Slack unfurl first, then the recipient read.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Slack gets the unfurl and triage copy; Jordan opens the same frozen brief in a read-only shell. Same version, scoped dock,
            pinned evidence — I’m trying to kill “which link was canon?”
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
            The 9:00 invite carries the live link — I want staff in Coworker, not a dead PDF.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            The calendar mock is illustrative. The point I care about is the meeting inherits the same canonical link and permissions as
            Cloud — no parallel deck that quietly diverges.
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
      thesis="I start Maya on a Monday read that leads, not a grid — then I freeze one v18 packet for staff, Slack, and the calendar."
      persona={MAYA_FLOW_PERSONA}
      orientationHint="Monday before staff: trial Exec Overview, then Coworker read and handoff."
      steps={steps}
    />
  )
}
