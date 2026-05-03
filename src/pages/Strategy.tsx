import { Link } from 'react-router-dom'
import { ArrowRight, Sparkle } from '../components/Icons'

export default function Strategy() {
  return (
    <article className="ds-page py-14">
      <header className="mb-12">
        <div className="h-eyebrow mb-4">02 · Strategy for the future</div>
        <h1 className="h-display mb-6">
          Don&apos;t add another AI feature.{' '}
          <span className="italic text-accent">Change what loads first.</span>
        </h1>
        <p className="text-lg text-ink-600 max-w-3xl">
          Tableau already generates analyst-grade narrative on real dashboards — verified in trial
          captures (
          <span className="font-mono text-2xs text-ink-500">
            flow-h-ai-agent/22-overview-dashboard-agent-with-insights.png
          </span>
          ). The strategic move is to promote that read to the default surface while demoting the wall of
          widgets to evidence you open on purpose.
        </p>
      </header>

      <section className="prose-body">
        <h3 id="vision">The vision in one paragraph</h3>
        <p>
          In the steady state, a CRO-shaped user opens Tableau Cloud and reads{' '}
          <strong>what changed and what to say in the next meeting</strong> before they see a map. A Sales
          Ops owner lands on a <strong>curation queue</strong> computed from observed opens — stale
          workbooks, duplicate metrics, lineage drift — not an alphabetical workbook list. A regional
          director on a phone gets a <strong>region briefing</strong> with exceptions and one-tap actions,
          not the Executive Overview at phone width. Desktop authoring stays powerful for the people paid
          to wield it; <strong>consumption</strong> stops impersonating <strong>construction</strong>.
        </p>

        <h3 id="pillars">The four strategic pillars</h3>
      </section>

      <section className="space-y-10 mt-8">
        <PillarBlock
          number="01"
          title="The default dashboard is generated, not configured."
          summary="The landing state is composed per role, recency, and signal — not an empty home gallery or a 'set up your dashboard' tour. Configuration of layout drifts to the edge case."
          consequences={[
            'Maya: Monday briefing is the first paint. No lesson in pinning KPIs.',
            'Jordan: Curation queue is home. Staleness and redundancy are computed, not surveyed by email.',
            'Sam: Region-scoped briefing is the push or first screen — not Browse → Workbooks.',
          ]}
          tradeoff="Power users who love a fixed canvas will push back. Offer pinned evidence and escape hatches — but stop optimizing the org for the minority that publishes."
        />

        <PillarBlock
          number="02"
          title="Every chart explains itself."
          summary="Narration sits with the metric — confidence, drivers, what was ruled out. The viz is evidence; the default read is language, not pixels alone."
          consequences={[
            'Proactive reads on the briefing; drill preserves verified agent patterns, inline — not only in a dismissible sidecar.',
            'Wrong loudly beats wrong quietly: explicit confidence; cite fields and time range.',
          ]}
          tradeoff="The agent will misfire in front of executives. Design for contestability — audit, override, feedback — not for hiding the read until it feels safe."
        />

        <PillarBlock
          number="03"
          title="Three modes of interaction, all first-class."
          summary="Mouse drill, mobile thumb briefing, and conversation (inline next-step prompts, optional deep panel) are peers. Not chat-as-UI."
          consequences={[
            'Same canonical metric definitions whether Maya reads them, Jordan fixes them, or Sam escalates on the phone.',
            'Inline prompts under a chart suggest the next question; they do not replace the canvas.',
          ]}
          tradeoff="Three interaction grammars cost more than bolting a chatbot. The bet is retention of exec and field users who currently bounce to email."
        />

        <PillarBlock
          number="04"
          title="Personalization is observed, not configured."
          summary='"Why am I seeing this?" is always one tap away. No admin-built landing page per user.'
          consequences={[
            'Signals: opens, skips, time-of-week, role, escalation history.',
            'Governance focuses on policy and lineage — not eighteen-click dashboard assignment wizards.',
          ]}
          tradeoff="Buyers who equate control with per-user configuration need a story about trust scores and audit replacing manual whack-a-mole."
        />
      </section>

      <section className="mt-20">
        <div className="h-eyebrow mb-3">Investment posture</div>
        <h2 className="h-section mb-8">Where to invest. Where to say no.</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="card-raised p-6 border-success/30 bg-success-soft/30">
            <div className="flex items-center gap-2 mb-4">
              <span className="dot bg-success" />
              <h3 className="text-sm font-semibold uppercase tracking-wide text-success">Invest</h3>
            </div>
            <ul className="space-y-3 text-sm text-ink-800">
              <Bullet>Briefing engine — exec / curator / mobile card layouts from one semantic layer</Bullet>
              <Bullet>Observed-usage graph — opens, viewers, lineage, field drift</Bullet>
              <Bullet>Trust UX — override, diff-two-definitions, receipt on merge / retire</Bullet>
              <Bullet>Mobile IA — purpose-built briefing, not fluid-width desktop</Bullet>
              <Bullet>Activation — fewer gates to read-only narration; clear trust model for autonomous sends</Bullet>
            </ul>
          </div>
          <div className="card-raised p-6 border-danger/30 bg-danger-soft/30">
            <div className="flex items-center gap-2 mb-4">
              <span className="dot bg-danger" />
              <h3 className="text-sm font-semibold uppercase tracking-wide text-danger">Say no</h3>
            </div>
            <ul className="space-y-3 text-sm text-ink-800">
              <Bullet>Another AI SKU executives must discover separately from the dashboard they already open</Bullet>
              <Bullet>Homepage tweaks that only rearrange Explore tiles</Bullet>
              <Bullet>Personal dashboard builder as the default onboarding for consumers</Bullet>
              <Bullet>Narration locked only behind per-metric Pulse setup for every KPI</Bullet>
              <Bullet>Pitching this as replacing analysts — their job shifts to governance and semantics</Bullet>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-20">
        <div className="h-eyebrow mb-3">Sequencing</div>
        <h2 className="h-section mb-8">Three phases (illustrative).</h2>

        <div className="space-y-6">
          <Phase
            label="Phase I"
            timing="0–9 months"
            title="Briefing default + receipts."
            body="Pilot generated Monday briefing for exec Viewers; ship 'why am I seeing this'; keep the wall behind one click. Instrument read completion vs legacy dashboard dwell."
            metric="Target: higher weekly briefing read-through; shorter time-to-first-insight vs wall-of-widgets baseline."
          />
          <Phase
            label="Phase II"
            timing="6–18 months"
            title="Curation queue GA."
            body="Observed-usage queue for Creators/Explorers; merge and deprecate workflows; tie every exec metric card to a curator resolution path."
            metric="Target: fewer duplicate workbooks in pilot sites; fewer 'which number is real?' escalations."
          />
          <Phase
            label="Phase III"
            timing="12–24 months"
            title="One consumption spine."
            body="Pulse-style reads and classic dashboards share the same landing grammar; mobile briefing parity for exceptions; simpler AI activation path."
            metric="Target: one product story in sales — not Cloud vs Pulse vs Agent as three religions."
          />
        </div>
      </section>

      <section className="mt-20">
        <div className="h-eyebrow mb-3">What could go wrong</div>
        <h2 className="h-section mb-6">Three risks to plan for from day one.</h2>
        <div className="space-y-4">
          <Risk
            title="Narration wrong in the staff meeting."
            body="Mitigation: confidence-rated copy; cite sources; one-click flag; human edits as training signal — not embarrassment buried in chat."
          />
          <Risk
            title="Curators reject observed ranking."
            body="Mitigation: audit log for every deprecate; show cost of sprawl; recommendations that require human accept — like code review, not silent deletion."
          />
          <Risk
            title="Salesforce roadmap collision."
            body="Mitigation: frame strategy as surface hierarchy under Einstein branding; protect semantic contracts so CRM and BI stories don't fork the number line."
          />
        </div>
      </section>

      <section className="mt-20 card-raised p-8 bg-accent-soft border-accent/20">
        <Sparkle className="text-accent mb-4" size={22} />
        <div className="h-eyebrow text-accent-ink mb-2">The strategic bet</div>
        <p className="text-lg text-ink-900 leading-relaxed editorial italic">
          Tableau&apos;s moat is trusted semantics at scale. The next moat is who loads first on Monday —
          tiles, or the sentence those tiles were always trying to become.
        </p>
      </section>

      <nav className="mt-16 pt-8 border-t border-ink-100 flex items-center justify-between">
        <Link to="/whats-broken" className="btn-ghost">
          ← What&apos;s broken
        </Link>
        <Link to="/flows" className="btn-primary">
          See the flows <ArrowRight size={14} />
        </Link>
      </nav>
    </article>
  )
}

function PillarBlock({
  number,
  title,
  summary,
  consequences,
  tradeoff,
}: {
  number: string
  title: string
  summary: string
  consequences: string[]
  tradeoff: string
}) {
  return (
    <div className="border-l-2 border-accent/40 pl-6 py-2">
      <div className="font-mono text-xs text-accent mb-2">Pillar {number}</div>
      <h3 className="text-2xl editorial text-ink-900 leading-snug mb-3">{title}</h3>
      <p className="text-base text-ink-700 leading-relaxed mb-5">{summary}</p>
      <div className="text-2xs uppercase tracking-wider text-ink-500 mb-2">What this means in practice</div>
      <ul className="space-y-1.5 text-sm text-ink-700 mb-5">
        {consequences.map((c, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-accent shrink-0">·</span>
            <span>{c}</span>
          </li>
        ))}
      </ul>
      <div className="bg-ink-50 border border-ink-100 rounded-md p-3 text-sm text-ink-700">
        <span className="font-semibold text-ink-900">Tradeoff: </span>
        {tradeoff}
      </div>
    </div>
  )
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2">
      <span className="text-ink-400 shrink-0">·</span>
      <span>{children}</span>
    </li>
  )
}

function Phase({
  label,
  timing,
  title,
  body,
  metric,
}: {
  label: string
  timing: string
  title: string
  body: string
  metric: string
}) {
  return (
    <div className="card-raised p-6">
      <div className="flex flex-wrap items-baseline gap-3 mb-3">
        <span className="pill bg-accent text-white">{label}</span>
        <span className="text-xs font-mono text-ink-500">{timing}</span>
      </div>
      <h4 className="text-lg font-semibold text-ink-900 mb-2">{title}</h4>
      <p className="text-sm text-ink-700 leading-relaxed mb-3">{body}</p>
      <div className="text-xs text-ink-500 italic">
        <span className="font-semibold text-ink-700">→</span> {metric}
      </div>
    </div>
  )
}

function Risk({ title, body }: { title: string; body: string }) {
  return (
    <div className="card p-5">
      <h4 className="text-sm font-semibold text-ink-900 mb-2">{title}</h4>
      <p className="text-sm text-ink-600 leading-relaxed">{body}</p>
    </div>
  )
}
