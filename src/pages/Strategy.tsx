import { Link } from 'react-router-dom'
import { ArrowRight, Sparkle } from '../components/Icons'

export default function Strategy() {
  return (
    <article className="ds-page py-14">
      <header className="mb-12">
        <div className="h-eyebrow mb-4">02 · How I&apos;d pitch what comes next</div>
        <h1 className="h-display mb-6">
          I wouldn&apos;t ship another AI feature on top.{' '}
          <span className="italic text-accent">I&apos;d change what loads first.</span>
        </h1>
        <p className="text-lg text-ink-600 max-w-3xl">
          I watched Tableau generate analyst-grade language on a real dashboard in trial — see{' '}
          <span className="font-mono text-2xs text-ink-500">
            flow-h-ai-agent/22-overview-dashboard-agent-with-insights.png
          </span>
          . My move is to promote that read to the opening screen and push the wall of widgets one deliberate step back — still there,
          but not the greeting.
        </p>
      </header>

      <section className="prose-body">
        <h3 id="vision">If this works, what does Monday feel like?</h3>
        <p>
          I want a Maya-shaped exec to open Cloud and read <strong>what changed and what to say in the next meeting</strong> before
          she sees a map. I want a Jordan-shaped ops lead to land on a <strong>curation queue</strong> built from stale workbooks,
          duplicate metrics, and lineage drift — not another alphabetical list. I want Sam on his phone to get a <strong>West
          briefing</strong> with exceptions and one-tap actions, not the Executive Overview at phone width. I&apos;m not trying to
          kneecap authoring for analysts; I am trying to stop consumption from cosplaying construction.
        </p>

        <h3 id="pillars">Four bets I&apos;d fund</h3>
      </section>

      <section className="space-y-10 mt-8">
        <PillarBlock
          number="01"
          title={'I’d generate the landing view — I wouldn’t ask every reader to “build their dashboard” first.'}
          summary="The reason is simple: most people paid to read never wanted a blank canvas. I’d compose Monday’s layout from role, recency, and signal, and I’d push bespoke layout setup to the edge case."
          consequences={[
            'Maya: her briefing paints first; I’m not teaching her to pin KPIs before she gets value.',
            'Jordan: the queue is home — staleness and redundancy computed, not collected by email survey.',
            'Sam: region briefing is the push or first tap — I’m not marching him through Browse and then Workbooks on a 5-inch screen.',
          ]}
          tradeoff="Power users who love a fixed wall will be loud. I’d give them pinned evidence and escape hatches — but I’d stop letting the org optimize for the minority that publishes."
        />

        <PillarBlock
          number="02"
          title="I’d marry copy to the metric — confidence, drivers, what I ruled out."
          summary="The chart isn’t the read. The read is language with the number attached; the viz is where you go when you don’t believe me or you need to fork the question."
          consequences={[
            'Proactive language on the briefing; drill keeps the agent patterns I verified in trial — inline, not only in a dismissible rail.',
            'When the model is wrong I want it wrong loudly — explicit confidence, fields and time range on display — not wrong in private.',
          ]}
          tradeoff="Executives will eat a bad sentence in public once. I’m designing for contestability — audit, override, feedback — not for hiding narration until every general counsel is comfy."
        />

        <PillarBlock
          number="03"
          title="I’d keep three input styles — mouse, thumb, short prompts — as peers."
          summary="Mouse drill, mobile briefing, and lightweight conversation (inline next-step prompts, optional deep panel) are the same product. Chat-as-the-whole-UI is the thing I’m refusing; conversation is one affordance, not the shell."
          consequences={[
            'Same metric definitions whether Maya reads, Jordan edits, or Sam escalates on the phone.',
            'Prompts under a chart suggest the next question; they don’t replace the canvas.',
          ]}
          tradeoff="Three grammars cost more than bolting on a chatbot. I’d take the hit to keep execs and field folks from bouncing to email because mobile felt like punishment."
        />

        <PillarBlock
          number="04"
          title="I’d personalize from what people actually did — not from an admin wizard."
          summary='"Why am I seeing this?" is always one tap away. I’m not asking HR to wire an 18-click landing assignment for every hire.'
          consequences={[
            'Signals: opens, skips, time-of-week, role, escalation history — observable, not declared in a form.',
            'Governance time goes to policy and lineage — not to tricking dashboards down org trees by hand.',
          ]}
          tradeoff="Buyers who think control means per-user config will push back. I’d tell the story with trust scores and audit replacing whack-a-mole assignments — and I’m not sure every procurement team buys that. That’s a sales risk I’d name early."
        />
      </section>

      <section className="mt-20">
        <div className="h-eyebrow mb-3">Where I’d put money</div>
        <h2 className="h-section mb-8">I’d fund this. I’d starve that.</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="card-raised p-6 border-success/30 bg-success-soft/30">
            <div className="flex items-center gap-2 mb-4">
              <span className="dot bg-success" />
              <h3 className="text-sm font-semibold uppercase tracking-wide text-success">Invest</h3>
            </div>
            <ul className="space-y-3 text-sm text-ink-800">
              <Bullet>I’d harden a briefing engine — one semantic layer feeding exec, curator, and mobile card layouts.</Bullet>
              <Bullet>I’d graph real opens, viewers, lineage, and drift — the substrate for Jordan’s queue.</Bullet>
              <Bullet>I’d ship trust UX: override, diff two definitions, receipts when something merges or retires.</Bullet>
              <Bullet>I’d design mobile information architecture for thumbs — not fluid-width desktop squeezed down.</Bullet>
              <Bullet>I’d lower the gates to read-only narration and be blunt about what an autonomous send is allowed to do.</Bullet>
            </ul>
          </div>
          <div className="card-raised p-6 border-danger/30 bg-danger-soft/30">
            <div className="flex items-center gap-2 mb-4">
              <span className="dot bg-danger" />
              <h3 className="text-sm font-semibold uppercase tracking-wide text-danger">Say no</h3>
            </div>
            <ul className="space-y-3 text-sm text-ink-800">
              <Bullet>Another AI SKU execs have to discover separately from the dashboard tab they already live in</Bullet>
              <Bullet>Homepage shuffles that only rearrange Explore tiles</Bullet>
              <Bullet>Personal dashboard builder as the default onboarding for people who will never publish</Bullet>
              <Bullet>Narration that only unlocks after Pulse setup on every KPI</Bullet>
              <Bullet>Pretending analysts go away — their job tilts toward governance and semantics, and I’d say that out loud</Bullet>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-20">
        <div className="h-eyebrow mb-3">Sequencing</div>
        <h2 className="h-section mb-8">If I sequenced it — three bands, illustrative.</h2>

        <div className="space-y-6">
          <Phase
            label="Phase I"
            timing="0–9 months"
            title="Default briefing plus receipts."
            body="I’d pilot a generated Monday briefing for exec viewers, ship a real ‘why am I seeing this’ control, and keep the classic wall one intentional click back. I’d instrument whether people finish the read and how long to first useful insight compared to the tile baseline."
            metric="weekly read-through and time-to-first-useful-insight against the legacy tile wall."
          />
          <Phase
            label="Phase II"
            timing="6–18 months"
            title="Curation queue goes broad."
            body="I'd generalize the observed-usage queue for creators and explorers, tighten merge and retire flows, and wire every exec metric card to a curator resolution path so nothing rots quietly."
            metric="duplicate workbooks and ‘which number is real?’ escalations in pilots — both should fall."
          />
          <Phase
            label="Phase III"
            timing="12–24 months"
            title="One spine for readers."
            body="I'd make Pulse-style reads and classic dashboards share the same landing grammar, bring mobile briefings to parity on exceptions, and simplify how AI features turn on so admins stop being the gate."
            metric="whether sales can tell one coherent story instead of Cloud versus Pulse versus Agent."
          />
        </div>
      </section>

      <section className="mt-20">
        <div className="h-eyebrow mb-3">What could go wrong</div>
        <h2 className="h-section mb-6">Three risks I’d scenario-plan on day one.</h2>
        <div className="space-y-4">
          <Risk
            title="The briefing whiffs in the staff meeting."
            body="I’d ship confidence-rated copy, visible sources, one-click flagging, and capture human edits as signal — not bury the mistake in a chat nobody reads."
          />
          <Risk
            title="Curators don’t trust the ranking."
            body="I’d log every deprecate, show the cost of sprawl in numbers they recognize, and force accepts on risky moves — closer to code review than silent deletes."
          />
          <Risk
            title="Salesforce’s roadmap collides with mine."
            body="I’d narrate this as reshaping surfaces under Einstein, not inventing a rogue skunkworks; I’d protect semantic contracts so CRM and BI don’t fork ‘the number.’"
          />
        </div>
      </section>

      <section className="mt-20 card-raised p-8 bg-accent-soft border-accent/20">
        <Sparkle className="text-accent mb-4" size={22} />
        <div className="h-eyebrow text-accent-ink mb-2">The bet I’m staking</div>
        <p className="text-lg text-ink-900 leading-relaxed editorial italic">
          I still buy Tableau on trusted semantics at scale. The fight I care about is Monday’s first screen — tile wall, or the tight
          read that wall was supposed to save you from assembling by hand.
        </p>
      </section>

      <p className="text-sm text-ink-600 mt-12 mb-0">
        <Link to="/competitive" className="text-accent-ink font-semibold hover:underline">
          Competitive scan (appendix)
        </Link>
        <span className="text-ink-400"> · my qualitative vendor notes, not market share math.</span>
      </p>

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
      <div className="text-2xs uppercase tracking-wider text-ink-500 mb-2">Where you’d feel it</div>
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
        <span className="font-semibold text-ink-700 not-italic">I&apos;d measure </span>
        {metric}
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
