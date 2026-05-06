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
            Sam’s between meetings. On the phone, Tableau is still the desktop sheet — just narrower.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            I framed this from a real Tableau Mobile-style capture: same composition as desktop at a small width. The Brief step is where
            I swap in the Coworker surface and presets.
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
            Same numbers as Maya and Jordan — different shell. I built it for two thumbs and about ninety seconds.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Cards feed the dock; the preset strip scrubs the same layout contract as desktop v2. West scope and Tuesday rhythm come from
            role and habit in my story — I’m not making Sam run a setup wizard before he gets value.
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
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">Sam tapped Acme Co. I’d already assembled the stall context.</h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            The preset strip covers stall, legal check, pre-draft — Send stays one thumb away. I kept the next step to a single line of
            copy; I’m not turning a field escalation into a chat thread by default.
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
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">Sent — I want the brief to end as finished work, not a vague ping.</h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Upstream is Maya’s staff moment; Jordan’s queue is untouched on this path. The presets rehearse receipt versus watcher read so
            escalation timing still lines up with the exec narrative — small detail, but I’ve watched those misalignments blow up deals.
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
            What Legal sees — notification first, then the pre-draft body with audit context.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Same pattern as Maya’s shared read and Jordan’s Finance mail — triage with receipts, not a paste from chat. Cross-functional
            stalls deserve something you could defend later; I’m not trusting Slack alone for that.
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
      thesis="I’d give a regional director a thumb-first West brief and drill, then a legal-grade receipt — not a squeezed desktop grid."
      persona={SAM_FLOW_PERSONA}
      orientationHint="West RSD on the phone: brief, drill, handoff — same data as the other flows, thumb-first layout."
      steps={steps}
    />
  )
}
