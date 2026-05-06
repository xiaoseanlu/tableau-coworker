/**
 * Flow 02 — Jordan, VP Sales Ops, the curator.
 *
 * Two design stories (mirrors Maya flow structure):
 *   I  · Tenant loop — sprawl, queue, diagnose, resolve (preset strips + AgentDock)
 *   II · Out to the org — broadcast surfaces, Finance recipient inbox
 */

import FlowChrome, { type FlowStep } from '../components/FlowChrome'
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
    designStory: 'Tenant loop',
    surface: 'Web · workbook overview',
    immersive: true,
    body: (
      <div className="space-y-4">
        <div className="max-w-3xl">
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Sprawl</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            Jordan owns {JORDAN_TENANT.workbooks} dashboards across the Acme tenant. Here, sprawl stops reading like a filing problem and
            starts reading like a <strong className="font-semibold text-ink-800">queue with a reason on every row</strong> — not another
            workbook list sorted by name.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            One workbook, nine views on the sample — use <strong className="font-semibold text-ink-800">Jump sprawl state</strong> or tap the
            workbook, bars, or follow-ups. The frame matches Tableau&apos;s own Superstore sample; the bars are a scripted share-of-views mix
            for this walkthrough, not a live usage roll-up.
          </p>
        </div>
        <JordanSprawlBoard presetStrip />
      </div>
    ),
  },

  {
    label: 'Queue',
    designStory: 'Tenant loop',
    surface: 'Web · curation queue',
    immersive: true,
    body: (
      <div className="space-y-4">
        <div className="max-w-3xl">
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Queue</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            The system flagged {JORDAN_TENANT.queueThisWeek} things this week. Each has a reason.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            <strong className="font-semibold text-ink-800">Jump queue state</strong> scrubs selection; portfolio segments, tiles,
            rows, and ordering rationale all bind to the same dock contract as Maya. Risk is surfaced from usage and lineage — not
            from alert rules Jordan had to configure by hand.
          </p>
        </div>
        <JordanQueueBoard presetStrip />
      </div>
    ),
  },

  {
    label: 'Diagnose',
    designStory: 'Tenant loop',
    surface: 'Web · authoring + agent',
    immersive: true,
    body: (
      <div className="space-y-4">
        <div className="max-w-3xl">
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Diagnosis</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            One flagged dashboard. The agent&apos;s read takes 30 seconds; the fix takes 3 minutes.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Drift bars, lineage chips, and the web authoring context from the trial — use{' '}
            <strong className="font-semibold text-ink-800">Jump diagnose state</strong> to move through triage moments on one surface.
            Agent-assisted authoring is already shipping; the argument here is how it sits inside governance, not whether it exists.
          </p>
        </div>
        <JordanDiagnoseBoard presetStrip />
      </div>
    ),
  },

  {
    label: 'Resolve',
    designStory: 'Tenant loop',
    surface: 'Web · governance loop',
    immersive: true,
    body: (
      <div className="space-y-4">
        <div className="max-w-3xl">
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Closure</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            Jordan accepts the fix. Maya&apos;s Monday briefing updates. Sam&apos;s next mobile check-in is correct.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Receipt, subscribers, queue, and pulse share one audit id —{' '}
            <strong className="font-semibold text-ink-800">Jump resolve state</strong> walks the same shell. What closes here is what
            makes the revenue surfaces trustworthy on the latest definitions.
          </p>
        </div>
        <JordanResolveBoard presetStrip />
      </div>
    ),
  },

  {
    label: 'Out',
    designStory: 'Handoff',
    surface: 'Web · broadcast + recipient',
    immersive: true,
    body: (
      <div className="space-y-4">
        <div className="max-w-3xl">
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Broadcast</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            Same audit id — notify surfaces, then what Finance opens.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Payload preview and destinations on the left; R. Okonkwo&apos;s inbox on the right — one governance object, two moments in
            the loop. Permissions and unfurl metadata stay explicit.
          </p>
        </div>
        <div className="grid xl:grid-cols-2 gap-6 items-start">
          <JordanBroadcastBoard />
          <JordanFinanceRecipientBoard />
        </div>
      </div>
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
      orientationHint="Jordan’s VP Sales Ops loop: from sprawl and queue through diagnosis to a single audited publish out to the org. Dismiss anytime."
      steps={steps}
    />
  )
}
