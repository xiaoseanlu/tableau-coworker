/**
 * Flow 02 — Jordan, VP Sales Ops, the curator.
 *
 * CONTENT: Filled from `plan/09-flow-jordan-curation.md` (May 2026).
 *
 * PERSONA (from CONTEXT.md):
 *   Jordan — VP Sales Ops at Acme SaaS Inc. Daily power user. Builds and
 *   governs the data model. Surface becomes: underlying dashboard with
 *   deeper metrics + curation queue (47 dashboards, 12 stale, 3 data-
 *   quality flags).
 *
 * PILLARS DEMONSTRATED (from CONTEXT.md §"Four strategic pillars"):
 *   01 — The default dashboard is generated, not configured (Jordan's
 *        view is the same substrate, different surface from Maya's).
 *   04 — Personalization is observed, not configured (system tracks
 *        what Jordan reads, asks, returns to; staleness is computed,
 *        not set).
 *
 * CAPTURE EVIDENCE WIRED:
 *   Scene 1 (sprawl)   — key/03-dashboard-sprawl.png · 9 views in one workbook, sprawl proxy
 *   Scene 2 (queue)    — placeholder, awaiting plan/09
 *   Scene 3 (diagnose) — key/02-web-authoring.png · current authoring shell + Tableau Agent tooltip
 *   Scene 4 (resolve)  — placeholder, awaiting plan/09
 */

import FlowChrome, { Note, Surface, type FlowStep } from '../components/FlowChrome'
import { Sparkle, Layers, Clock } from '../components/Icons'
import { PortfolioMixBar } from '../components/viz/DataViz'

const CAP = `${import.meta.env.BASE_URL}captures/`

const steps: FlowStep[] = [
  // ─────────────────────────────────────────────────────────────────────
  // SCENE 01 — "Sprawl" : Jordan's actual problem. Forty-seven dashboards
  // in the Acme tenant, half of them stale, no one knows which are the
  // canonical ones. Anchor capture: Tableau's own Superstore workbook
  // ships with 9 views — proxy for the sprawl pattern.
  // ─────────────────────────────────────────────────────────────────────
  {
    label: 'Sprawl',
    surface: 'Web · workbook overview',
    body: (
      <div className="space-y-4">
        <div>
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Scene 01 · The sprawl</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            Jordan owns 47 dashboards across the Acme tenant. They&apos;re not sure which ones the company actually uses.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            One workbook, nine views — and that&apos;s a sample. Multiply by every team that published without a retirement policy. The platform sorts alphabetically. It does not tell you what is dead, what duplicates what, or which definition of pipeline coverage lands in Maya&apos;s staff meeting.
          </p>
        </div>
        <Surface chrome="web">
          <img
            src={`${CAP}key/03-dashboard-sprawl.png`}
            alt="Tableau Superstore workbook — nine views in a single dashboard sprawl"
            className="block w-full"
          />
        </Surface>
      </div>
    ),
    notes: (
      <>
        <Note title="Real evidence, not invented">
          The capture is Tableau's own Superstore sample workbook — nine dashboards shipped together. The
          "sprawl" critique starts with what Tableau itself models as a healthy product.
        </Note>
        <Note title="Spec">
          Scene 01 headline and lead from <span className="font-mono text-2xs">plan/09-flow-jordan-curation.md</span>.
        </Note>
      </>
    ),
  },

  // ─────────────────────────────────────────────────────────────────────
  // SCENE 02 — "Queue" : The curation queue. Twelve stale dashboards
  // (no views in 90 days), three data-quality flags, two duplicates. The
  // system computed this from observed usage — not configured.
  // ─────────────────────────────────────────────────────────────────────
  {
    label: 'Queue',
    surface: 'Web · curation queue',
    body: (
      <div className="space-y-4">
        <div>
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Scene 02 · The queue</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            The system flagged 17 things this week. Each has a reason.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Stale dashboards, redundant pairs, and definitions that drifted. Nothing here was turned on in Site settings. The queue is computed from opens, viewers, chart overlap, and field lineage.
          </p>
        </div>

        <Surface chrome="web">
          <div className="bg-canvas p-6 min-h-[460px]">
            <div className="flex items-baseline justify-between mb-5">
              <div>
                <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">
                  Curation queue · for Jordan
                </div>
                <div className="editorial text-xl text-ink-900">17 items · this week</div>
              </div>
              <div className="text-xs text-ink-500 font-mono">Updated 8m ago</div>
            </div>

            <div className="mb-6">
              <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-2">Tenant portfolio · observed health</div>
              <PortfolioMixBar />
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <SummaryTile icon={<Clock size={14} />} count="9" label="Stale" tone="warning" />
              <SummaryTile icon={<Layers size={14} />} count="5" label="Duplicates" tone="accent" />
              <SummaryTile icon={<Sparkle size={14} />} count="3" label="Data-quality flags" tone="danger" />
            </div>

            <div className="space-y-2">
              <QueueRow
                tone="warning"
                title="West Region — Weekly Pipe v4"
                meta="last open · 94d ago · viewers 90d · 2"
                reason="Both viewers now default-open Revenue Command Center. This workbook still publishes West_Coverage_v4 — downstream risk: low, but it creates conflicting URLs in Slack history."
              />
              <QueueRow
                tone="warning"
                title="Q4 Board — Backup / do not edit"
                meta="opens 90d · 0"
                reason="Created for a single deck read in November. No scheduled refresh. Deprecating loses nothing except a bookmark three people forgot they had."
              />
              <QueueRow
                tone="accent"
                title="Pipeline Health Tracker ↔ Sales Pipeline by Region"
                meta="overlap · 3 charts · model · RevOps Master"
                reason="Same regions, same time grain. Tracker adds a forecast band Region lacks. Recommended merge target: Pipeline — single source (v2) — canonical Jordan published 18 days ago."
              />
              <QueueRow
                tone="danger"
                title="Exec ARR roll-up (Finance)"
                meta="drift · $2.1M vs v2"
                reason="ARR_PACING still binds to legacy pipeline LOD. Maya's Monday briefing uses Pipeline Coverage v2. This workbook still teaches the old story to the board pack exporter."
              />
            </div>

            <details className="mt-5 text-sm text-ink-600 border border-ink-100 rounded-md p-4 bg-canvas-raised">
              <summary className="cursor-pointer font-medium text-ink-800">Why I&apos;m seeing this queue order</summary>
              <p className="mt-3 leading-relaxed">
                You resolve data-quality before duplicate before stale in 73% of triage sessions we observed. I surfaced the Finance Exec roll-up third in the stack even though it is only three rows down — because Maya asked you about the number on Wednesday. Confidence: moderate on the psychology ordering; high on the dependency graph (Finance roll-up → board pack → Maya).
              </p>
            </details>

            <p className="text-xs text-ink-500 mt-4 italic leading-relaxed">
              Twelve people will argue that &quot;stale&quot; insults their work. I&apos;d rather insult a dashboard than ship two definitions of ARR into a staff meeting. Confidence: high on duplicate detection; moderate on stale when a workbook is opened only as a scheduled PDF.
            </p>
          </div>
        </Surface>
      </div>
    ),
    notes: (
      <>
        <Note title="Pillar 04 in action">
          The queue exists because the system has been watching. Jordan didn't have to set up a "stale
          dashboard alert." Per plan/05, configuration as a feature is design debt; observation is the
          inverse.
        </Note>
        <Note title="The agent here is the curator, not the analyst">
          Different role from Maya's flow. Same voice rules per plan/03 — evidence-led, unflashy.
        </Note>
      </>
    ),
  },

  // ─────────────────────────────────────────────────────────────────────
  // SCENE 03 — "Diagnose" : Jordan opens one flagged dashboard. The
  // agent shows what's wrong: stale metric definition, source schema
  // changed, last-edited four months ago. Anchor capture: today's web
  // authoring shell with the Tableau Agent tooltip — evidence that AI
  // is in Tableau today, but bolted to the existing surface.
  // ─────────────────────────────────────────────────────────────────────
  {
    label: 'Diagnose',
    surface: 'Web · authoring + agent',
    body: (
      <div className="space-y-4">
        <div>
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Scene 03 · Diagnosis</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            One flagged dashboard. The agent's read takes 30 seconds; the fix takes 3 minutes.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            Today, Tableau's "Tableau Agent" lives as a tooltip on the side of the web authoring view. It can
            already explain, summarize, and suggest. The redesign moves it to where Jordan does the work.
          </p>
        </div>
        <Surface chrome="web">
          <div className="bg-canvas p-6 md:p-8 space-y-6">
            <div>
              <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-2">
                Row D · Exec ARR roll-up (Finance)
              </div>
              <div className="rounded-md border border-danger/25 bg-danger-soft/30 px-4 py-4 text-sm text-ink-800 leading-relaxed space-y-3">
                <p>
                  <strong>Exec ARR roll-up (Finance)</strong> binds <code className="font-mono text-xs bg-canvas px-1 rounded">ARR_PACING</code> to the legacy LOD you deprecated on <strong>April 2</strong>. Maya&apos;s briefing and Sam&apos;s West mobile deck already read <strong>v2</strong>. Finance&apos;s published workbook did not auto-migrate — Tableau does not enforce catalog binds on publish today.
                </p>
                <div>
                  <div className="text-2xs uppercase tracking-wider font-mono text-ink-500 mb-1">What I checked</div>
                  <ul className="text-xs text-ink-700 space-y-1 list-disc pl-4">
                    <li>Catalog field ARR_PACING fingerprint vs workbook calculation text</li>
                    <li>Last publish: Feb 14 (owner: R. Okonkwo, Finance)</li>
                    <li>Downstream subscribers: 12 — includes Maya&apos;s default briefing source list and the board pack connection</li>
                  </ul>
                </div>
                <div>
                  <div className="text-2xs uppercase tracking-wider font-mono text-ink-500 mb-1">What I ruled out</div>
                  <ul className="text-xs text-ink-700 space-y-1 list-disc pl-4">
                    <li>Extract refresh failure — refresh succeeded Apr 30</li>
                    <li>Region filter mismatch — not material (&lt;$40K)</li>
                  </ul>
                </div>
                <p className="text-xs font-medium">I&apos;d want Maya to stop getting asked if the number is &quot;real.&quot; <strong>Confidence: high.</strong></p>
              </div>
              <p className="text-sm text-accent font-medium mt-4">
                Next: Remap ARR_PACING → catalog bind <strong>v2_coverage_won</strong> and republish — or reject and document why Finance must keep legacy until May 15. Reject requires a one-line rationale.
              </p>
            </div>
            <div>
              <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-2">Reference · authoring shell today</div>
              <img
                src={`${CAP}key/02-web-authoring.png`}
                alt="Tableau web authoring shell — Tableau Agent tooltip visible"
                className="block w-full rounded-md border border-ink-100"
              />
              <p className="text-xs text-ink-500 mt-2">
                Agent assistance is real on this surface — as a tooltip. The argument is placement: governance reads belong in the queue, not only in edit mode.
              </p>
            </div>
          </div>
        </Surface>
      </div>
    ),
    notes: (
      <>
        <Note title="The capability is already shipping">
          Tableau Agent (Beta) is real. flow-g/01 captures the tooltip. The redesign argument is not "build
          AI" — it's "stop hiding the AI you already have."
        </Note>
        <Note title="Spec">
          Diagnosis copy from <span className="font-mono text-2xs">plan/09</span> scene 03; capture below for receipts.
        </Note>
      </>
    ),
  },

  // ─────────────────────────────────────────────────────────────────────
  // SCENE 04 — "Resolve" : Jordan accepts the agent's recommendation.
  // The dashboard updates; the queue closes the item; downstream
  // consumers (Maya, Sam) see the corrected number on their next visit.
  // The governance loop closes itself.
  // ─────────────────────────────────────────────────────────────────────
  {
    label: 'Resolve',
    surface: 'Web · governance loop',
    body: (
      <div className="space-y-4">
        <div>
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Scene 04 · Loop closes</div>
          <h2 className="editorial text-2xl text-ink-900 leading-snug mb-2">
            Jordan accepts the fix. Maya's Monday briefing updates. Sam's next mobile check-in is correct.
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed">
            One substrate, three personas, one corrected number. Governance isn't a separate workflow — it's
            the thing that makes the other two flows trustworthy.
          </p>
        </div>

        <Surface chrome="web">
          <div className="bg-canvas p-8 space-y-5">
            <div className="rounded-md border border-success/25 bg-success-soft/30 px-4 py-4 text-sm text-ink-800 space-y-2">
              <p>
                <strong>Published.</strong> Exec ARR roll-up (Finance) now binds <strong>v2</strong>.
              </p>
              <p>
                <strong>Subscribers notified (12)</strong> — Maya Chen · S. Reyes · … (show list in full product)
              </p>
              <p className="text-ink-600">
                Queue · Row D <strong>closed</strong> · duplicate merge (Row C) still open — Jordan batches that next.
              </p>
            </div>
            <p className="font-mono text-2xs text-ink-400">
              G-2026-0514-0892 · remap ARR_PACING → v2 · 2:26 PM PT · actor: Jordan Patel · audit: lineage snapshot stored
            </p>
            <p className="text-sm text-ink-600 leading-relaxed">
              <strong>Governance health</strong> · 78 → 82 this week (composite — stale cleared, duplicate rate down, zero open critical definition conflicts). Method: internal spec; not a Tableau shipped metric. Confidence: low on the exact score — the hook is visibility moved.
            </p>
            <p className="text-sm text-ink-700 italic border-l-2 border-signal pl-3">
              Done. Maya&apos;s Monday surface pulls the same v2 ARR_PACING as Finance. If this breaks Okonkwo&apos;s offline sheet, they&apos;ll tell us — and the queue will reopen. I&apos;d rather a loud failure than a quiet drift.
            </p>
          </div>
        </Surface>
      </div>
    ),
    notes: (
      <>
        <Note title="The flows are connected on purpose">
          Same substrate, three personas, three surfaces. Jordan's resolve in scene 04 is what makes Maya's
          briefing trustworthy and Sam's mobile briefing accurate.
        </Note>
        <Note title="Scene 04 from plan/09">
          Closure UI is native — propagation to Maya&apos;s briefing sources is the substrate seam.
        </Note>
      </>
    ),
  },
]

// === Local helpers ====================================================

function SummaryTile({ icon, count, label, tone }: {
  icon: React.ReactNode
  count: string
  label: string
  tone: 'warning' | 'accent' | 'danger'
}) {
  const toneClass =
    tone === 'warning' ? 'border-warning/30 bg-warning-soft text-warning' :
    tone === 'accent'  ? 'border-accent/30 bg-accent-soft text-accent-ink' :
                         'border-danger/30 bg-danger-soft text-danger'
  return (
    <div className={`rounded-md border p-3 ${toneClass}`}>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-2xs uppercase tracking-wider font-mono font-semibold">{label}</span>
      </div>
      <div className="editorial text-2xl text-ink-900 leading-none">{count}</div>
    </div>
  )
}

function QueueRow({ tone, title, meta, reason }: {
  tone: 'warning' | 'accent' | 'danger'
  title: string
  meta: string
  reason?: string
}) {
  const dotClass = tone === 'warning' ? 'bg-warning' : tone === 'accent' ? 'bg-accent' : 'bg-danger'
  return (
    <div className="flex items-start gap-3 p-3 rounded-md bg-canvas-raised border border-ink-100">
      <span className={`dot ${dotClass} mt-1.5 shrink-0`} />
      <div className="flex-1 min-w-0">
        <div className="text-sm text-ink-900">{title}</div>
        {reason ? <div className="text-xs text-ink-600 mt-1.5 leading-relaxed">{reason}</div> : null}
      </div>
      <div className="text-2xs text-ink-400 font-mono shrink-0 text-right max-w-[40%]">{meta}</div>
    </div>
  )
}

// === Default export ===================================================

export default function JordanCuration() {
  return (
    <FlowChrome
      flowNumber="02"
      title="The curator's queue — observed, not configured"
      thesis="Governance is generated from observed usage. The platform has an opinion about which dashboards earn their keep."
      steps={steps}
    />
  )
}
