/**
 * Flow 03 — Sam, Regional Sales Director (West), Tuesday on his phone.
 *
 * CONTENT: Filled from `plan/10-flow-sam-mobile.md` (May 2026).
 */

import FlowChrome, { Note, Surface, type FlowStep } from '../components/FlowChrome'
import { SamActBoard, SamBriefBoard, SamDrillBoard, SamTodayBoard } from '../components/dashboard/samBoards'

const steps: FlowStep[] = [
  {
    label: 'Today',
    surface: 'iPhone · Tableau Mobile, today',
    immersive: true,
    body: (
      <div className="space-y-4">
        <div className="max-w-3xl">
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Scene 01 · Mobile today</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            7:52 AM Tuesday. Sam&apos;s between customer meetings. Tableau on his phone is Tableau on his desktop, squished.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Capture plus an interactive legibility strip — tap bars; Coworker narrates why the squish fails and what the Brief surface fixes.
          </p>
        </div>
        <Surface chrome="mobile">
          <SamTodayBoard />
        </Surface>
        <p className="text-xs text-signal-ink bg-signal-soft/40 border border-signal/30 rounded-md px-3 py-2 leading-relaxed max-w-3xl">
          <strong className="font-semibold">Next paint (proposed):</strong> push from Tableau Coworker — &quot;3 deals stuck in legal &gt;7 days. Tap to review.&quot; We lead with the squish because it&apos;s what the capture proves.
        </p>
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
            Cards, deals, and risk sparkline route to the Coworker dock — same pattern as Maya, thumb height.
          </p>
        </div>
        <Surface chrome="mobile">
          <SamBriefBoard />
        </Surface>
      </div>
    ),
    notes: (
      <>
        <Note title="Pillar 01 + 03">Composed mobile layout; no configure step for Sam.</Note>
        <Note title="Pillar 04">West + Tuesday morning inferred from role and habit — not a settings toggle.</Note>
      </>
    ),
  },

  {
    label: 'Drill',
    surface: 'iPhone · deal context',
    immersive: true,
    body: (
      <div className="space-y-4">
        <div className="max-w-3xl">
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Scene 03 · Drilldown</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">Sam tapped Acme Co. Context is already assembled.</h2>
          <p className="text-sm text-ink-600 leading-relaxed">Evidence rows and draft are tappable; Send stays one thumb away.</p>
        </div>
        <Surface chrome="mobile">
          <SamDrillBoard />
        </Surface>
      </div>
    ),
    notes: (
      <>
        <Note title="Pillar 03">Inline next step without chat thread chrome.</Note>
        <Note title="Voice">Confidence rated; evidence named — plan/03.</Note>
      </>
    ),
  },

  {
    label: 'Act',
    surface: 'iPhone · receipt',
    immersive: true,
    body: (
      <div className="space-y-4">
        <div className="max-w-3xl">
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Scene 04 · Receipt</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">Sent. The brief ends as completed work.</h2>
          <p className="text-sm text-ink-600 leading-relaxed">Upstream: Maya&apos;s staff footnote; Jordan&apos;s queue unaffected for this path (deal metadata).</p>
        </div>
        <Surface chrome="mobile">
          <SamActBoard />
        </Surface>
      </div>
    ),
    notes: (
      <>
        <Note title="Substrate seam">Escalation time aligns with Maya flow narrative; adjust copy if you need one canonical timestamp.</Note>
        <Note title="No screenshot handoff">Text receipt + timeline log — mirrors Maya scene 04 principle.</Note>
      </>
    ),
  },
]

export default function SamMobile() {
  return (
    <FlowChrome
      flowNumber="03"
      title="The mobile briefing — same substrate, different surface"
      thesis="Mobile is not a reflowed desktop. It's a first-class surface, composed for two thumbs and ninety seconds."
      steps={steps}
    />
  )
}
