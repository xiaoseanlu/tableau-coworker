/**
 * Flow 03 — Sam, Regional Sales Director (West), Tuesday on his phone.
 *
 * CONTENT: Filled from `plan/10-flow-sam-mobile.md` (May 2026).
 */

import FlowChrome, { Note, Surface, type FlowStep } from '../components/FlowChrome'
import { Phone, Send } from '../components/Icons'

const CAP = `${import.meta.env.BASE_URL}captures/`

const steps: FlowStep[] = [
  {
    label: 'Today',
    surface: 'iPhone · Tableau Mobile, today',
    body: (
      <div className="space-y-4">
        <div>
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Scene 01 · Mobile today</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            7:52 AM Tuesday. Sam&apos;s between customer meetings. Tableau on his phone is Tableau on his desktop, squished.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Real capture: same Superstore Executive Overview at iPhone width — KPIs, map, filters reflowed, not redesigned.
          </p>
        </div>
        <Surface chrome="mobile">
          <img
            src={`${CAP}key/05-mobile-squished.png`}
            alt="Tableau Superstore Executive Overview on iPhone — squished desktop dashboard"
            className="block w-full h-full object-cover"
          />
        </Surface>
        <p className="text-xs text-signal-ink bg-signal-soft/40 border border-signal/30 rounded-md px-3 py-2 leading-relaxed">
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
    body: (
      <div className="space-y-4">
        <div>
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Scene 02 · The briefing</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            Same substrate. Different surface. Built for two thumbs and ninety seconds.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Region-scoped cards — not a reflowed dashboard. Sources: CRM sync 7:48 AM · v2 definitions (Jordan, Apr 30).
          </p>
        </div>
        <Surface chrome="mobile">
          <div className="bg-canvas h-full overflow-hidden flex flex-col min-h-[520px]">
            <div className="px-5 pt-10 pb-4 border-b border-ink-100 flex gap-3">
              <Phone size={20} className="text-accent shrink-0 mt-0.5" aria-hidden />
              <div>
                <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">
                  Tue · 7:52 AM · West region
                </div>
                <div className="editorial text-xl text-ink-900 leading-tight">Three things since you last looked.</div>
              </div>
            </div>
            <div className="flex-1 px-5 py-4 space-y-3 overflow-y-auto">
              <MobileCard tone="warning" title="Stuck · 3">
                <ul className="mt-2 space-y-2 text-xs text-ink-800">
                  <li>
                    <strong>Acme Co</strong> · $840K · <span className="font-mono">11d</span> legal — MSA redlines ·{' '}
                    <span className="text-accent font-medium">Nudge legal</span>
                  </li>
                  <li>
                    <strong>Lumen Analytics</strong> · $290K · <span className="font-mono">8d</span> legal — chain stalled ·{' '}
                    <span className="text-accent font-medium">Ping AE</span>
                  </li>
                  <li>
                    <strong>Brightwave Labs</strong> · $175K · <span className="font-mono">7d</span> deal desk ·{' '}
                    <span className="text-accent font-medium">View thread</span>
                  </li>
                </ul>
              </MobileCard>
              <MobileCard tone="success" title="Wins · 2">
                <ul className="mt-2 space-y-1.5 text-xs text-ink-800">
                  <li>
                    <strong>Northwind Health</strong> closed Fri — East handoff clean.
                  </li>
                  <li>
                    Pipeline hygiene · your West reps cleared <strong>14</strong> stale opps Mon.
                  </li>
                </ul>
              </MobileCard>
              <MobileCard tone="danger" title="Q-end risk · 1">
                <p className="mt-2 text-xs text-ink-800 leading-relaxed">
                  West coverage dipped <strong>−0.2 WoW</strong> (v2). Not staff-level yet — watch. Same model as Maya&apos;s cards.
                </p>
              </MobileCard>
            </div>
          </div>
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
    body: (
      <div className="space-y-4">
        <div>
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Scene 03 · Drilldown</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">Sam tapped Acme Co. Context is already assembled.</h2>
          <p className="text-sm text-ink-600 leading-relaxed">One screen — no open in Desktop.</p>
        </div>
        <Surface chrome="mobile">
          <div className="bg-canvas min-h-[480px] flex flex-col">
            <div className="px-5 pt-8 pb-4 border-b border-ink-100">
              <div className="text-2xs font-mono text-ink-500 mb-1">Acme Co · $840K</div>
              <div className="editorial text-lg text-ink-900">Stalled in legal · MSA redlines</div>
            </div>
            <div className="px-5 py-4 flex-1 space-y-4">
              <div className="rounded-md bg-signal-soft/70 border border-signal/25 px-4 py-3 text-sm text-signal-ink leading-relaxed">
                Deal stalled in legal review since <strong>Apr 23</strong>. Owner on file: <strong>M. Chen</strong>, legal ops. AE{' '}
                <strong>Patel</strong> last note Apr 29: waiting on liability cap language. <strong>Confidence: high</strong> — CRM +
                email thread index.
              </div>
              <div className="text-xs text-ink-600">
                <span className="font-mono text-2xs uppercase text-ink-500">What I checked</span>
                <ul className="mt-1 space-y-0.5 list-disc pl-4">
                  <li>Closed-won risk flag</li>
                  <li>Legal stage duration</li>
                  <li>Duplicate opps on account — ruled out</li>
                </ul>
              </div>
              <div>
                <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Pre-draft</div>
                <p className="text-sm text-ink-800 bg-canvas-raised border border-ink-100 rounded-md p-3 leading-relaxed">
                  Chen — Acme Co needs liability language by EOD; staff meeting may call this out. Can we clear or escalate to GC?
                </p>
              </div>
              <div className="flex gap-2 pt-2">
                <button type="button" className="btn-primary text-sm inline-flex items-center gap-1.5 flex-1 justify-center">
                  <Send size={14} /> Send
                </button>
                <button type="button" className="btn-secondary text-sm flex-1">
                  Edit
                </button>
              </div>
            </div>
          </div>
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
    body: (
      <div className="space-y-4">
        <div>
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Scene 04 · Receipt</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">Sent. The brief ends as completed work.</h2>
          <p className="text-sm text-ink-600 leading-relaxed">Upstream: Maya&apos;s staff footnote; Jordan&apos;s queue unaffected for this path (deal metadata).</p>
        </div>
        <Surface chrome="mobile">
          <div className="bg-canvas min-h-[360px] px-5 py-8 space-y-4">
            <div className="rounded-md border border-success/30 bg-success-soft/40 px-4 py-3 text-sm text-ink-800">
              <strong>Sent.</strong> M. Chen notified · logged to deal timeline · Maya&apos;s briefing footnote will pick this up before 9:00 staff.
            </div>
            <p className="text-sm text-ink-700">
              I&apos;ll check at <strong>5:00 PM PT</strong>; if stage unchanged, back to your queue tomorrow 7:45 AM.
            </p>
            <details className="text-xs text-ink-500 border-t border-ink-100 pt-3">
              <summary className="cursor-pointer text-ink-600">Why am I seeing this order?</summary>
              <p className="mt-2 leading-relaxed">
                West region first · Tuesday 7:45–8:15 habit · last 6 weeks observed. Same primitive as Maya&apos;s briefing shape control.
              </p>
            </details>
          </div>
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

function MobileCard({
  tone,
  title,
  children,
}: {
  tone: 'warning' | 'success' | 'danger'
  title: string
  children: React.ReactNode
}) {
  const border =
    tone === 'warning'
      ? 'border-warning/30'
      : tone === 'success'
        ? 'border-success/30'
        : 'border-danger/30'
  return (
    <div className={`rounded-md border ${border} bg-canvas-raised p-3.5`}>
      <div className="text-2xs uppercase tracking-wider font-mono font-semibold text-ink-700">{title}</div>
      {children}
    </div>
  )
}

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
