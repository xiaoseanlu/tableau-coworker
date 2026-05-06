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
            Jordan owns {JORDAN_TENANT.workbooks} dashboards in my Acme tenant. I refused to show another alphabetical list — every row
            here is a queue item with a reason.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Same sample workbook with nine views you saw in capture — use the preset strip or tap the workbook, bars, follow-ups. The
            frame matches Tableau’s Superstore; the mix bars are scripted for this walk, not a live usage roll-up. I’m illustrating the
            shape I want, not claiming telemetry I didn’t wire.
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
            The system flagged {JORDAN_TENANT.queueThisWeek} things this week — each line says why it’s there.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            The preset strip scrubs selection. Portfolio segments, tiles, rows, and the ordering rationale share the same dock contract as
            Maya — I wanted ops and execs to feel like one product. Risk comes from usage and lineage, not from alert rules Jordan hand-tuned.
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
            One flagged dashboard. I’ll give Jordan a 30-second agent read; the fix still takes three minutes of human judgment.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Drift bars, lineage chips, web authoring context from trial — the preset strip walks triage on one surface. Agent-assisted
            authoring already ships; I’m arguing for where it lives inside governance, not whether Salesforce can build it.
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
            Jordan accepts the fix — Maya’s Monday brief and Sam’s next phone check-in inherit the same corrected definition.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Receipt, subscribers, queue, and pulse share one audit id; the preset strip runs through the same shell. What closes here is what
            keeps revenue surfaces honest on the latest numbers — I’m tired of silent forked definitions.
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
            Same audit id — broadcast surfaces on the left, Finance’s inbox on the right.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Payload preview and destinations face R. Okonkwo’s read-only inbox — one governance object, two beats in the loop. I keep
            permissions and unfurl metadata explicit because cross-functional stalls need receipts, not vibes.
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
      thesis="I turn sprawl into a triage queue from real signals, then publish once with an audit id to Slack, mail, and Finance."
      persona={JORDAN_FLOW_PERSONA}
      orientationHint="VP Sales Ops: sprawl, queue, diagnose, then one audited publish to the org."
      steps={steps}
    />
  )
}
