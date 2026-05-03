/**
 * Flow 03 — Sam, Regional Sales Director (West), Tuesday on his phone.
 *
 * Two design stories (mirrors Maya / Jordan):
 *   I  · Mobile surface — today squish, brief, drill, act (presets + AgentDock)
 *   II · Out to legal — Chen inbox read after Send
 *
 * CONTENT: `plan/10-flow-sam-mobile.md`, `samDemoContext.ts`.
 */

import FlowChrome, { Note, Surface, type FlowStep } from '../components/FlowChrome'
import { SAM_FLOW_PERSONA } from '../data/personaFlowMeta'
import { SamActBoard, SamBriefBoard, SamDrillBoard, SamTodayBoard } from '../components/dashboard/samBoards'
import { SamLegalInboxBoard } from '../components/dashboard/samHandoffBoards'
import { SAM_MOBILE } from '../components/dashboard/samDemoContext'

const steps: FlowStep[] = [
  {
    label: 'Today',
    designStory: 'Before · capture',
    surface: 'iPhone · Tableau Mobile, today',
    immersive: true,
    body: (
      <div className="space-y-4">
        <div className="max-w-3xl">
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Scene 01 · Mobile today</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            Between meetings. Tableau on his phone is Tableau on his desktop, squished.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Real capture: <span className="font-mono text-2xs">key/05-mobile-squished.png</span>. One composition — no tap grid on this
            beat. The Brief step shows the Coworker surface and presets.
          </p>
        </div>
        <Surface chrome="mobile">
          <SamTodayBoard squishOnly />
        </Surface>
      </div>
    ),
    notes: (
      <>
        <Note title="Evidence">flow-e-mobile — scroll states show the same desktop metaphor.</Note>
        <Note title="Pillar 03">Before state defines what we reject for consumption.</Note>
      </>
    ),
  },

  {
    label: 'Brief',
    designStory: 'I · Mobile surface',
    surface: 'iPhone · Sam, West region',
    immersive: true,
    body: (
      <div className="space-y-4">
        <div className="max-w-3xl">
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Scene 02 · The briefing</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            Same substrate. Different surface. Built for two thumbs and ninety seconds.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Cards route to the dock — <strong className="font-semibold text-ink-800">Jump brief state</strong> scrubs the same layout
            Maya/Jordan bind to v2.
          </p>
        </div>
        <Surface chrome="mobile">
          <SamBriefBoard presetStrip />
        </Surface>
      </div>
    ),
    notes: (
      <>
        <Note title="Pillar 01 + 03">Composed mobile layout; no configure step for Sam.</Note>
        <Note title="Pillar 04">West + Tuesday inferred from role and habit.</Note>
      </>
    ),
  },

  {
    label: 'Drill',
    designStory: 'I · Mobile surface',
    surface: 'iPhone · deal context',
    immersive: true,
    body: (
      <div className="space-y-4">
        <div className="max-w-3xl">
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Scene 03 · Drilldown</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">Sam tapped Acme Co. Context is already assembled.</h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            <strong className="font-semibold text-ink-800">Jump drill state</strong> for stall, legal check, pre-draft — Send stays one
            thumb away.
          </p>
        </div>
        <Surface chrome="mobile">
          <SamDrillBoard presetStrip />
        </Surface>
      </div>
    ),
    notes: (
      <>
        <Note title="Pillar 03">Inline next step without chat thread chrome.</Note>
      </>
    ),
  },

  {
    label: 'Act',
    designStory: 'I · Mobile surface',
    surface: 'iPhone · receipt',
    immersive: true,
    body: (
      <div className="space-y-4">
        <div className="max-w-3xl">
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Scene 04 · Receipt</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">Sent. The brief ends as completed work.</h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Upstream: Maya staff footnote; Jordan queue unchanged for this path. Presets rehearse receipt vs watcher read.
          </p>
        </div>
        <Surface chrome="mobile">
          <SamActBoard presetStrip />
        </Surface>
      </div>
    ),
    notes: (
      <>
        <Note title="Substrate seam">Escalation time aligns with Maya narrative; copy from single demo context.</Note>
      </>
    ),
  },

  {
    label: 'Legal',
    designStory: 'II · Out to legal',
    surface: 'iPhone · recipient inbox',
    immersive: true,
    body: (
      <div className="space-y-4">
        <div className="max-w-3xl">
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Design story II · Legal handoff</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            What Chen sees — notification shape, then the pre-draft body.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Same pattern as Maya&apos;s Jordan inbox and Jordan&apos;s Finance mail — recipient triage with audit context, not a paste
            from chat.
          </p>
        </div>
        <SamLegalInboxBoard />
      </div>
    ),
    notes: (
      <>
        <Note title="Why a second story">Send is not the end state for cross-functional stalls — legal needs a legible receipt.</Note>
      </>
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
      steps={steps}
    />
  )
}
