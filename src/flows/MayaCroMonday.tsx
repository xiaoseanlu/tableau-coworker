/**
 * Flow 01 — Maya the CRO, Monday morning.
 *
 * CONTENT: Filled from `plan/08-flow-maya-cro-monday.md` (May 2026).
 *
 * PERSONA (from CONTEXT.md):
 *   Maya — Chief Revenue Officer at Acme SaaS Inc. Mondays before the
 *   exec staff meeting. Cares about story over data. Surface becomes:
 *   3-paragraph narrative, 3 metric cards, 3 things-to-know-for-the-meeting.
 *   Charts hidden until clicked.
 *
 * PILLARS DEMONSTRATED (from CONTEXT.md §"Four strategic pillars"):
 *   01 — The default dashboard is generated, not configured.
 *   02 — Every chart explains itself (charts are evidence; narrative is the surface).
 *
 * CAPTURE EVIDENCE WIRED:
 *   Scene 1 — key/04 · wall of widgets today
 *   Scene 2 — redesigned briefing + CoverageTrendChart (interactive)
 *   Scene 3 — ConcentrationBars + key/10 · agent quality proof
 *   Scene 4 — share / provenance (designed UI)
 */

import FlowChrome, { Note, Surface, type FlowStep } from '../components/FlowChrome'
import { TrendDown, Trend } from '../components/Icons'
import { ConcentrationBars, CoverageTrendChart } from '../components/viz/DataViz'

const CAP = `${import.meta.env.BASE_URL}captures/`

const steps: FlowStep[] = [
  // ─────────────────────────────────────────────────────────────────────
  // SCENE 01 — "Open" : Maya opens Tableau Cloud Monday 8:42 AM and lands
  // on the executive dashboard as it ships today. Wall of widgets, no
  // narrative, no signal of what changed since Friday. Anchor for the
  // "what's broken" claim.
  // ─────────────────────────────────────────────────────────────────────
  {
    label: 'Open',
    surface: 'Web · Tableau today',
    body: (
      <div className="space-y-4">
        <div>
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Scene 01 · Tableau today</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            8:42 AM Monday. Maya opens the executive dashboard. It looks the same as it did in 2015.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            This is a real capture from a Tableau Cloud trial. Seven KPI tiles, a map, trend blocks — no narrative.
            No signal of what moved since Friday. Maya has eighteen minutes before staff. She has to read the wall.
          </p>
        </div>
        <Surface chrome="web">
          <img
            src={`${CAP}key/04-exec-wall-of-widgets.png`}
            alt="Tableau Superstore Executive Overview — wall of widgets"
            className="block w-full"
          />
        </Surface>
      </div>
    ),
    notes: (
      <>
        <Note title="Why we open with the real product">
          The whole flow is a contrast. If scene 01 isn't the real Tableau, the contrast in scene 02 lands as
          marketing. The capture is from the Superstore Executive Overview — the canonical sample dashboard.
        </Note>
        <Note title="Spec">
          Scene 01 copy and structure match <span className="font-mono text-2xs">plan/08-flow-maya-cro-monday.md</span>.
        </Note>
      </>
    ),
  },

  // ─────────────────────────────────────────────────────────────────────
  // SCENE 02 — "Brief" : Same data substrate, recomposed for Maya. Three
  // paragraphs of narrative, three metric cards, three things-to-know-
  // for-the-meeting. Charts hidden until clicked. The dashboard becomes
  // a briefing.
  // ─────────────────────────────────────────────────────────────────────
  {
    label: 'Brief',
    surface: 'Web · CRO briefing view',
    body: (
      <div className="space-y-4">
        <div>
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Scene 02 · The briefing</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            Same data. Composed for who's looking, narrating what changed.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Three paragraphs. Three metrics. Three things to bring to staff. Charts are still here — but as
            evidence, one click away.
          </p>
        </div>

        {/* Placeholder briefing layout — visual proof the structure works. */}
        <Surface chrome="web">
          <div className="bg-canvas p-8">
            <div className="max-w-2xl">
              <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-2">
                Monday · May 4 · 8:42 AM · For Maya
              </div>
              <h3 className="editorial text-3xl text-ink-900 leading-tight mb-6">
                The story of the week is the West softening. The number to bring to staff is the Acme Co deal.
              </h3>

              <div className="space-y-4 text-sm text-ink-700 leading-relaxed mb-6">
                <p>
                  Net-new ARR is pacing <strong className="text-ink-900">$2.1M behind plan</strong> at the eight-week mark of the quarter — a 4.8% gap, narrower than last week&apos;s. Three of the top-five enterprise deals advanced. One,{' '}
                  <strong className="text-ink-900">Acme Co ($840K)</strong>, slipped past its expected May 4 close into legal review. The plan still gets there if the West holds; the West did not hold over the weekend.
                </p>
                <p>
                  West-region pipeline coverage dropped <strong className="text-ink-900">−2.1 points week-over-week to 2.6×</strong>, the steepest single-week move this quarter. Three reps account for most of it — the deals that thinned in their pipelines were mid-market, not enterprise, and concentrated in the manufacturing vertical. EMEA conversion held flat; Germany is still the variable, but the data hasn&apos;t moved enough to call it.
                </p>
                <p>
                  Two things to keep on your radar. <strong className="text-ink-900">Sam (West)</strong> escalated the Acme Co deal to legal at 8:14 this morning from his phone — the escalation is logged; you can mention it in staff without checking in with him first. <strong className="text-ink-900">Jordan</strong> rebuilt the pipeline-coverage definition last Thursday (v2 is the live model); the West delta above is computed against the new model, the WoW comparison still holds.
                </p>
              </div>

              <div className="rounded-md border border-signal/25 bg-signal-soft/50 px-4 py-3 text-xs text-ink-700 mb-8">
                I&apos;d want a manager to know this. <strong>Confidence: moderate</strong> on the West read; <strong>low</strong> on the EMEA-Germany call. Sources: Acme SaaS CRM (HubSpot, last sync 8:38 AM PT) · Q2 plan (v3, locked Apr 2) · Jordan&apos;s pipeline-coverage definition (v2, Apr 30).
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <MetricCard label="ARR pacing" value="$87.4M" delta="−$2.1M vs plan · ↓ narrowing" tone="neutral" />
                <MetricCard label="West coverage" value="2.6×" delta="−0.2 WoW" tone="down" />
                <MetricCard label="Q-end coverage" value="3.4×" delta="+0.1 WoW" tone="up" />
              </div>

              <div className="card p-4 mb-8">
                <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">
                  West pipeline coverage · trailing 8 weeks (Jordan&apos;s v2 definition)
                </div>
                <p className="text-xs text-ink-600 mb-4 leading-relaxed">
                  Interactive: hover the week markers. Same metric class as the wall-of-widgets — recomposed as one trajectory
                  instead of a KPI tile without history.
                </p>
                <CoverageTrendChart />
              </div>

              <div className="border-t border-ink-100 pt-5">
                <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-3">
                  Three things for staff
                </div>
                <ol className="space-y-3 text-sm text-ink-700">
                  <li className="flex gap-3">
                    <span className="font-mono text-2xs text-ink-400 pt-0.5">01</span>
                    <span>
                      <strong>Acme Co ($840K) slipped from the May 4 close.</strong> Sam has already escalated to legal counsel at 8:14 AM. No action needed from you in staff — naming it is the action.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-2xs text-ink-400 pt-0.5">02</span>
                    <span>
                      <strong>The West softened −2.1 points on coverage week-over-week.</strong> Three reps thinned at once. Worth a 60-second mention; not a five-minute autopsy. I&apos;d ask Sam to bring next week&apos;s read.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-2xs text-ink-400 pt-0.5">03</span>
                    <span className="flex flex-wrap items-baseline gap-2">
                      <span>
                        <strong>EMEA conversion is the watch-item, not the alarm.</strong> Held flat, but Germany is still the variable. Confidence: low. I&apos;d defer this to next week&apos;s staff unless someone raises it.
                      </span>
                      <span className="pill bg-accent-soft text-accent-ink text-2xs shrink-0">Forecast watch</span>
                    </span>
                  </li>
                </ol>
              </div>

              <p className="text-xs text-ink-500 mt-6 leading-relaxed">
                Two quiet wins worth naming if time allows: <strong className="text-ink-700">Northwind ($420K)</strong> closed Friday in the East; <strong className="text-ink-700">expansion ARR</strong> crossed $14.2M for the quarter, a record. Neither needs a paragraph; both are in the CRM if anyone asks.
              </p>
            </div>
          </div>
        </Surface>
      </div>
    ),
    notes: (
      <>
        <Note title="Pillar 01 made literal">
          The dashboard is generated, not configured. No "set up your dashboard" tour. The composition is the
          consequence of who's looking and what changed.
        </Note>
        <Note title="Charts hidden until clicked">
          Maya's job is the story. The chart grid still exists — Jordan's view, scene 02 of flow 02 — but it
          is not Maya's surface.
        </Note>
        <Note title="Filled from plan/08">
          Verbatim briefing copy, metric cards, and staff list from the approved spec.
        </Note>
      </>
    ),
  },

  // ─────────────────────────────────────────────────────────────────────
  // SCENE 03 — "Drill" : Maya clicks a number; the agent shows its work.
  // The chart appears as evidence; the narrative-of-the-narrative explains
  // why the system flagged this. Anchor capture: the real Tableau Agent
  // output proving the underlying analysis is good.
  // ─────────────────────────────────────────────────────────────────────
  {
    label: 'Drill',
    surface: 'Web · evidence panel',
    body: (
      <div className="space-y-4">
        <div>
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Scene 03 · Drilldown</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            Maya clicks the West region delta. The agent shows its work.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Tableau already produces analysis this good — Ohio (-21.7%), Colorado (-20.3%), with specific
            recommendations. Today it lives in a side panel you have to summon. Here it's the surface.
          </p>
        </div>

        <Surface chrome="web">
          <div className="bg-canvas p-6 md:p-8 space-y-6">
            <div className="rounded-md border border-signal/25 bg-signal-soft/60 px-4 py-4 text-sm text-signal-ink leading-relaxed">
              <div className="text-2xs uppercase tracking-wider font-mono text-signal mb-2">Agent read · West coverage</div>
              West-region pipeline coverage dropped 2.1 points week-over-week to 2.6×. The cause is concentrated,
              not systemic — three reps account for 78% of the move, all in the manufacturing vertical, and all against
              deals that originated in February. <strong>Confidence: moderate.</strong> I&apos;d want a manager to know
              this before staff at 9.
            </div>

            <div className="card p-4">
              <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-3">
                Concentration · share of WoW move (West)
              </div>
              <ConcentrationBars
                rows={[
                  { name: 'A. Morales', pct: 34, color: '#5B2E91' },
                  { name: 'J. Okonkwo', pct: 28, color: '#7A4D9A' },
                  { name: 'T. Brennan', pct: 16, color: '#9B7AB8' },
                ]}
              />
              <p className="text-2xs text-ink-500 mt-3 leading-relaxed">
                Illustrative bars for the agent&apos;s “concentrated, not systemic” read — paired with CRM opportunity attribution.
              </p>
            </div>

            <div>
              <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-2">What I checked and ruled out</div>
              <ul className="text-sm text-ink-600 space-y-1.5 list-disc pl-4">
                <li>Checked enterprise renewal slippage — ruled out. Three of the four were Q2 mid-market deals; renewals held.</li>
                <li>
                  Checked the new pipeline-coverage model (Jordan&apos;s v2, Apr 30) — the WoW comparison uses both old and new definitions; the delta holds either way.
                </li>
                <li>Checked seasonality — ruled out. The same week last quarter and the same week last year were both above 2.8× for the West.</li>
              </ul>
            </div>

            <p className="text-sm text-accent font-medium">
              Want to know if this is repeat-account drag or new-account acquisition?
            </p>

            <div>
              <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-2">Reference · Tableau Agent today</div>
              <img
                src={`${CAP}key/10-tableau-agent-with-insights.png`}
                alt="Real Tableau Agent output identifying Ohio and Colorado as worst-performing states"
                className="block w-full rounded-md border border-ink-100"
              />
              <p className="text-xs text-ink-500 mt-3 leading-relaxed">
                Tableau already generates analysis at this level on the Superstore Executive Overview — Ohio (−21.7%) and Colorado (−20.3%) with specific recommendations. Today that read lives in a side panel you summon from the toolbar. Here, the same class of read is the surface.
              </p>
            </div>
          </div>
        </Surface>
      </div>
    ),
    notes: (
      <>
        <Note title="The most important capture in the deck">
          flow-h-ai-agent/22 (mirrored as key/10) is the strongest single piece of evidence in the project.
          The agent's analysis is genuinely good. The redesign argues that capability already exists — the
          courage to make it the surface does not.
        </Note>
        <Note title="Conversation as a mode, not a chatbot">
          Per plan/03 voice rules: the next-question affordance is inline and editorial, not a chat thread.
        </Note>
      </>
    ),
  },

  // ─────────────────────────────────────────────────────────────────────
  // SCENE 04 — "Send" : Maya forwards the briefing to staff, or saves it
  // as the talking-points doc. The artifact has provenance — links back
  // to the data, the agent's reasoning, the moment of generation. The
  // dashboard ends as a document, not a screen.
  // ─────────────────────────────────────────────────────────────────────
  {
    label: 'Send',
    surface: 'Web · share & audit',
    body: (
      <div className="space-y-4">
        <div>
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Scene 04 · Hand off</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            The briefing becomes the staff-meeting doc. Provenance attached.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Every claim links to the data. Every adaptive choice has a "why am I seeing this?" affordance.
            Maya forwards a paragraph, not a screenshot.
          </p>
        </div>

        <Surface chrome="web">
          <div className="bg-canvas p-8 space-y-6">
            <div className="rounded-md border border-signal/30 bg-signal-soft/50 px-4 py-3 text-sm text-ink-800">
              Saved. Briefing&apos;s in your Monday folder. The link is also on your 9:00 staff calendar invite.
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="button" className="btn-primary text-sm">
                Save to Monday folder
              </button>
              <button type="button" className="btn-secondary text-sm">
                Forward as paragraph
              </button>
            </div>
            <details className="text-sm text-ink-600 border border-ink-100 rounded-md p-4 bg-canvas-raised">
              <summary className="cursor-pointer text-ink-700 font-medium">Why am I seeing this?</summary>
              <p className="mt-3 leading-relaxed">
                You&apos;re seeing this version because you&apos;re the CRO and you opened the Sales Executive Overview every Monday between 8:36 and 8:48 for the last seven weeks. Three paragraphs, three metrics, three things-for-staff is the shape that shipped to you because that&apos;s the shape you read all the way through three weeks running. If the shape&apos;s wrong, change it on a Tuesday and I&apos;ll learn.
              </p>
            </details>
            <p className="font-mono text-2xs text-ink-400">
              Briefing v18 · generated 8:38 AM PT · sources synced 8:38 AM PT · agent: Tableau Coworker (briefing model, May 1 release)
            </p>
          </div>
        </Surface>
      </div>
    ),
    notes: (
      <>
        <Note title="Pillar 04 made tangible">
          Personalization is observed, not configured — and the observation itself is auditable. Every choice
          has a reason; the reason is a click away.
        </Note>
        <Note title="Scene 04 from plan/08">
          Native UI only — no Tableau capture for &quot;briefing became a doc.&quot;
        </Note>
      </>
    ),
  },
]

// === Local helpers ====================================================

function MetricCard({ label, value, delta, tone }: {
  label: string
  value: string
  delta: string
  tone: 'up' | 'down' | 'neutral'
}) {
  const ToneIcon = tone === 'up' ? Trend : tone === 'down' ? TrendDown : null
  const toneClass = tone === 'up' ? 'text-success' : tone === 'down' ? 'text-danger' : 'text-ink-500'
  return (
    <div className="card p-3">
      <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1.5">{label}</div>
      <div className="editorial text-2xl text-ink-900 leading-none mb-1.5">{value}</div>
      <div className={`flex items-center gap-1 text-xs ${toneClass}`}>
        {ToneIcon ? <ToneIcon size={12} /> : null}
        <span className="font-mono">{delta}</span>
      </div>
    </div>
  )
}

// === Default export ===================================================

export default function MayaCroMonday() {
  return (
    <FlowChrome
      flowNumber="01"
      title="The CRO's Monday — generated, not configured"
      thesis="Same data substrate, composed for who's looking. The dashboard ends as a document; the agent's evidence is the surface."
      steps={steps}
    />
  )
}
