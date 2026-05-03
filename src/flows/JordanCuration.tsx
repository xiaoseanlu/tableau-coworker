/**
 * Flow 02 — Jordan, VP Sales Ops, the curator.
 *
 * Two design stories (mirrors Maya flow structure):
 *   I  · Tenant loop — sprawl, queue, diagnose, resolve (preset strips + AgentDock)
 *   II · Out to the org — broadcast surfaces, Finance recipient inbox
 *
 * CONTENT: `plan/09-flow-jordan-curation.md`, demo context `jordanDemoContext.ts`.
 */

import FlowChrome, { Note, type FlowStep } from '../components/FlowChrome'
import { JORDAN_FLOW_PERSONA } from '../data/personaFlowMeta'
import {
  JordanDiagnoseBoard,
  JordanQueueBoard,
  JordanResolveBoard,
  JordanSprawlBoard,
} from '../components/dashboard/jordanBoards'
import { JordanBroadcastBoard, JordanFinanceRecipientBoard } from '../components/dashboard/jordanHandoffBoards'
import { JORDAN_TENANT } from '../components/dashboard/jordanDemoContext'

const steps: FlowStep[] = [
  {
    label: 'Sprawl',
    designStory: 'I · Tenant loop',
    surface: 'Web · workbook overview',
    immersive: true,
    body: (
      <div className="space-y-4">
        <div className="max-w-3xl">
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Scene 01 · The sprawl</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            Jordan owns {JORDAN_TENANT.workbooks} dashboards across the Acme tenant. They&apos;re not sure which ones the company
            actually uses.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            One workbook, nine views on the sample — use <strong className="font-semibold text-ink-800">Jump sprawl state</strong> or
            tap the workbook, bars, or follow-ups. The capture stays the receipt; the chart is prototype load-share.
          </p>
        </div>
        <JordanSprawlBoard presetStrip />
      </div>
    ),
    notes: (
      <>
        <Note title="Real evidence, not invented">
          The capture is Tableau&apos;s own Superstore sample workbook — nine dashboards shipped together.
        </Note>
        <Note title="Spec">
          Scene 01 from <span className="font-mono text-2xs">plan/09-flow-jordan-curation.md</span>.
        </Note>
      </>
    ),
  },

  {
    label: 'Queue',
    designStory: 'I · Tenant loop',
    surface: 'Web · curation queue',
    immersive: true,
    body: (
      <div className="space-y-4">
        <div className="max-w-3xl">
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Scene 02 · The queue</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            The system flagged {JORDAN_TENANT.queueThisWeek} things this week. Each has a reason.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            <strong className="font-semibold text-ink-800">Jump queue state</strong> scrubs selection; portfolio segments, tiles,
            rows, and ordering rationale all bind to the same dock contract as Maya.
          </p>
        </div>
        <JordanQueueBoard presetStrip />
      </div>
    ),
    notes: (
      <>
        <Note title="Pillar 04 in action">Stale and duplicate risk are observed — not alert rules Jordan configured.</Note>
        <Note title="Agent role">Curator read — different job from Maya&apos;s exec surface, same voice rules in plan/03.</Note>
      </>
    ),
  },

  {
    label: 'Diagnose',
    designStory: 'I · Tenant loop',
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
            Drift bars, lineage chips, and <span className="font-mono text-2xs">key/02-web-authoring.png</span> — use{' '}
            <strong className="font-semibold text-ink-800">Jump diagnose state</strong> to show multiple triage moments on one
            surface.
          </p>
        </div>
        <JordanDiagnoseBoard presetStrip />
      </div>
    ),
    notes: (
      <>
        <Note title="Capability already shipping">Tableau Agent in authoring is the receipt; argument is placement in governance.</Note>
      </>
    ),
  },

  {
    label: 'Resolve',
    designStory: 'I · Tenant loop',
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
            Receipt, subscribers, queue, and pulse share one audit id —{' '}
            <strong className="font-semibold text-ink-800">Jump resolve state</strong> walks the same shell.
          </p>
        </div>
        <JordanResolveBoard presetStrip />
      </div>
    ),
    notes: (
      <>
        <Note title="Substrate seam">Closure in Jordan&apos;s tenant is what makes Maya and Sam trustworthy on v2.</Note>
      </>
    ),
  },

  {
    label: 'Broadcast',
    designStory: 'II · Out to the org',
    surface: 'Web · notify + payload',
    immersive: true,
    body: (
      <div className="space-y-4">
        <div className="max-w-3xl">
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Design story II · A</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            Same audit object in Slack, mail, and Jira — Finance does not learn about v2 from Maya&apos;s staff deck alone.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Tap destinations and follow-ups; payload preview shows the hash-locked copy before anything leaves Tableau.
          </p>
        </div>
        <JordanBroadcastBoard />
      </div>
    ),
    notes: (
      <>
        <Note title="Mirrors Maya share beat">Handoff is its own design problem — permissions and unfurl metadata, not step five of a diary.</Note>
      </>
    ),
  },

  {
    label: 'Finance',
    designStory: 'II · Out to the org',
    surface: 'Web · recipient inbox',
    immersive: true,
    body: (
      <div className="space-y-4">
        <div className="max-w-3xl">
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Design story II · B</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            What lands for R. Okonkwo — archive, open Tableau, or reply to Jordan.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Scannable mail card ties republish to board-pack delta and audit id — no screenshot handoff.
          </p>
        </div>
        <JordanFinanceRecipientBoard />
      </div>
    ),
    notes: (
      <>
        <Note title="Recipient lens">Completes the governance loop outside the curator&apos;s session — same pattern as Maya inbox.</Note>
      </>
    ),
  },
]

export default function JordanCuration() {
  return (
    <FlowChrome
      flowNumber="02"
      title="Jordan — tenant loop, then broadcast"
      thesis="Curator loop: observed sprawl and lineage into a triage queue, then publish with one audit id to Slack, mail, and Finance."
      persona={JORDAN_FLOW_PERSONA}
      steps={steps}
    />
  )
}
