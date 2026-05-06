/**
 * Flow 03 — Sam, Regional Sales Director (West), Tuesday on his phone.
 *
 * Two design stories (mirrors Maya / Jordan):
 *   I  · Mobile surface — today squish, brief, drill, act (presets + AgentDock)
 *   II · Out to legal — Chen inbox read after Send
 */

import FlowChrome, { Surface, type FlowStep } from '../components/FlowChrome'
import { SAM_FLOW_PERSONA } from '../data/personaFlowMeta'
import { SamActBoard, SamBriefBoard, SamDrillBoard, SamTodayBoard } from '../components/dashboard/samBoards'
import { SamLegalInboxBoard } from '../components/dashboard/samHandoffBoards'

const steps: FlowStep[] = [
  {
    label: 'Today',
    designStory: 'Before',
    surface: 'iPhone · Tableau Mobile, today',
    immersive: true,
    body: (
      <div className="space-y-4">
        <div className="max-w-3xl">
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Mobile today</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            Between meetings. Tableau on his phone is Tableau on his desktop, squished.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Framed from a real Tableau Mobile capture — same composition as desktop, narrow width. The Brief step shows the Coworker
            surface and presets.
          </p>
        </div>
        <Surface chrome="mobile">
          <SamTodayBoard squishOnly />
        </Surface>
      </div>
    ),
  },

  {
    label: 'Brief',
    designStory: 'Mobile surface',
    surface: 'iPhone · Sam, West region',
    immersive: true,
    body: (
      <div className="space-y-4">
        <div className="max-w-3xl">
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Briefing</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            Same substrate. Different surface. Built for two thumbs and ninety seconds.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Cards route to the dock — <strong className="font-semibold text-ink-800">Jump brief state</strong> scrubs the same layout
            Maya and Jordan bind to on v2. West scope and Tuesday rhythm are inferred from role and habit, not a setup wizard.
          </p>
        </div>
        <Surface chrome="mobile">
          <SamBriefBoard presetStrip />
        </Surface>
      </div>
    ),
  },

  {
    label: 'Drill',
    designStory: 'Mobile surface',
    surface: 'iPhone · deal context',
    immersive: true,
    body: (
      <div className="space-y-4">
        <div className="max-w-3xl">
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Drilldown</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">Sam tapped Acme Co. Context is already assembled.</h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            <strong className="font-semibold text-ink-800">Jump drill state</strong> for stall, legal check, pre-draft — Send stays one
            thumb away. Next step is a single line of copy, not a chat thread.
          </p>
        </div>
        <Surface chrome="mobile">
          <SamDrillBoard presetStrip />
        </Surface>
      </div>
    ),
  },

  {
    label: 'Act',
    designStory: 'Mobile surface',
    surface: 'iPhone · receipt',
    immersive: true,
    body: (
      <div className="space-y-4">
        <div className="max-w-3xl">
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Receipt</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">Sent. The brief ends as completed work.</h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Upstream: Maya&apos;s staff moment; Jordan&apos;s queue unchanged on this path. Presets rehearse receipt versus watcher read
            so escalation time lines up with the exec narrative.
          </p>
        </div>
        <Surface chrome="mobile">
          <SamActBoard presetStrip />
        </Surface>
      </div>
    ),
  },

  {
    label: 'Legal',
    designStory: 'Legal handoff',
    surface: 'iPhone · recipient inbox',
    immersive: true,
    body: (
      <div className="space-y-4">
        <div className="max-w-3xl">
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Legal inbox</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            What Chen sees — notification shape, then the pre-draft body.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Same pattern as Maya&apos;s shared read and Jordan&apos;s Finance mail — recipient triage with audit context, not a paste
            from chat. Cross-functional stalls need a legible receipt, not only a sent message.
          </p>
        </div>
        <SamLegalInboxBoard />
      </div>
    ),
  },
]

export default function SamMobile() {
  return (
    <FlowChrome
      flowNumber="03"
      title="Sam — mobile surface, then legal inbox"
      thesis="Regional director: thumb-first West brief and drill on phone, then a legal-quality receipt — not a squeezed desktop grid."
      persona={SAM_FLOW_PERSONA}
      orientationHint="Sam on the West: thumb-first mobile brief and drill, then handoff — same Acme substrate as Maya and Jordan, different surface. Dismiss anytime."
      steps={steps}
    />
  )
}
