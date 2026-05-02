import { Link } from 'react-router-dom'
import { ArrowRight, Sparkle } from '../components/Icons'

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="grid-backdrop absolute inset-0 opacity-60 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-24 relative">
          <div className="max-w-3xl">
            <div className="h-eyebrow mb-5">Design exploration · Tableau</div>
            <h1 className="h-display mb-6">
              Tableau dashboards are static artifacts<br/>
              in a world where data is alive.<br/>
              <span className="text-accent italic">The next Tableau is a living surface.</span>
            </h1>
            <p className="text-lg text-ink-600 max-w-2xl mb-8">
              A strategic and interactive reimagining of Tableau Cloud for the AI era — grounded in
              real trial captures, shipped as a React prototype. Same thesis three personas
              (Acme SaaS): Maya, Jordan, Sam.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/whats-broken" className="btn-primary">
                Start with what's broken <ArrowRight size={14} />
              </Link>
              <Link to="/flows" className="btn-secondary">
                Or jump to the flows
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Three pillars TL;DR */}
      <section className="border-t border-ink-100 bg-canvas-raised">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="h-eyebrow mb-3">Four strategic bets</div>
          <h2 className="h-section max-w-3xl mb-12">
            Tableau already ships strong AI. The shell still treats the 2015
            dashboard as the default state. These pillars invert that hierarchy.
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Pillar
              num="01"
              title="The default dashboard is generated, not configured."
              body="Composed for role, recency, and what changed — not empty home cards and a hunt through Explore. The tradeoff is honest: we demote the blank-slate builder fantasy for consumers who never wanted it."
            />
            <Pillar
              num="02"
              title="Every chart explains itself."
              body="The narrative is the surface; the viz is evidence. Anomalies and reads show up with the metric, not after someone finds Tableau Agent in the toolbar."
            />
            <Pillar
              num="03"
              title="Three modes, all first-class."
              body="Mouse drill, mobile briefing, inline next-question prompts — conversation is a modality, not a chatbot that replaces the canvas."
            />
            <Pillar
              num="04"
              title="Personalization is observed, not configured."
              body="No admin-built dashboard cascade. The system learns what people open, skip, and return to; every adaptive choice exposes a &quot;why am I seeing this?&quot; line."
            />
          </div>

          <div className="mt-12 pt-8 border-t border-ink-100">
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-md bg-signal-soft text-signal-ink grid place-items-center shrink-0">
                <Sparkle size={16} />
              </div>
              <div>
                <div className="text-sm font-semibold text-ink-900 mb-1">Evidence, not vibes</div>
                <p className="text-sm text-ink-600 max-w-2xl">
                  The critique on <Link to="/whats-broken" className="text-accent hover:underline">What&apos;s broken</Link>{' '}
                  cites real captures from a Tableau Cloud trial (<span className="font-mono text-2xs">public/captures/</span>).
                  If a claim isn&apos;t tied to a file, we don&apos;t ship the claim.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flow trailers */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="h-eyebrow mb-3">Three flows, brought to life</div>
        <h2 className="h-section max-w-3xl mb-10">
          Each flow is a complete, clickable demonstration of the thesis. They share
          a design system, a voice, and an opinion.
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <FlowCard
            to="/flows/maya"
            number="Flow 01"
            title="Maya — Monday before staff"
            blurb="CRO lands on a generated briefing: narrative, three metric cards, drill-to-evidence — not the executive wall of widgets. Charts come forward on demand."
            tag="Maya Chen · CRO"
          />
          <FlowCard
            to="/flows/jordan"
            number="Flow 02"
            title="Jordan — the curator queue"
            blurb="VP Sales Ops triages sprawl: stale workbooks, duplicates, data-quality flags from observed usage — then resolves the item tied to canonical metrics."
            tag="Jordan Patel · Sales Ops"
          />
          <FlowCard
            to="/flows/sam"
            number="Flow 03"
            title="Sam — mobile, between meetings"
            blurb="Regional director gets a region-scoped briefing and exception cards on the phone — not the squished Superstore desktop sheet."
            tag="Sam Reyes · West RSD"
          />
        </div>
      </section>

      {/* Reading order */}
      <section className="border-t border-ink-100 bg-canvas-sunken">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <div className="h-eyebrow mb-3">How to read this</div>
              <h3 className="editorial text-2xl text-ink-900 mb-4">
                If you have 5 minutes, read the summary. If you have 25, read everything.
              </h3>
              <p className="prose-body text-base">
                The deliverable is laid out in the order it was thought through.
                The strategy stands on what's broken; the flows stand on the strategy.
                Each section is also self-contained — feel free to skim.
              </p>
            </div>
            <div className="space-y-3">
              <ReadCard num="1" to="/whats-broken" title="What's broken today"     mins="6 min" />
              <ReadCard num="2" to="/strategy"     title="Strategy for the future" mins="7 min" />
              <ReadCard num="3" to="/flows"        title="The three flows"          mins="10 min · interactive" />
              <ReadCard num="4" to="/summary"      title="Summary &amp; next steps" mins="2 min" />
              <ReadCard num="5" to="/competitive"  title="Competitive scan (appendix)" mins="4 min" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function Pillar({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div>
      <div className="text-2xs font-mono text-accent mb-2">{num}</div>
      <h3 className="text-lg font-semibold text-ink-900 mb-3 leading-snug">{title}</h3>
      <p className="text-sm text-ink-600 leading-relaxed">{body}</p>
    </div>
  )
}

function FlowCard({ to, number, title, blurb, tag }: { to: string; number: string; title: string; blurb: string; tag: string }) {
  return (
    <Link to={to} className="card hover:shadow-raised transition-shadow p-6 group block">
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xs font-mono text-ink-400">{number}</span>
        <span className="pill bg-accent-soft text-accent-ink">{tag}</span>
      </div>
      <h3 className="text-lg font-semibold text-ink-900 mb-2 group-hover:text-accent transition-colors">{title}</h3>
      <p className="text-sm text-ink-600 leading-relaxed mb-5">{blurb}</p>
      <div className="text-sm text-accent flex items-center gap-1.5">
        Open the flow <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
      </div>
    </Link>
  )
}

function ReadCard({ num, to, title, mins }: { num: string; to: string; title: string; mins: string }) {
  return (
    <Link to={to} className="flex items-center gap-4 p-4 bg-canvas-raised border border-ink-100 rounded-md hover:border-accent/40 hover:shadow-card transition-all group">
      <div className="w-7 h-7 rounded-full bg-ink-100 text-ink-500 grid place-items-center text-xs font-mono shrink-0 group-hover:bg-accent-soft group-hover:text-accent-ink transition-colors">
        {num}
      </div>
      <div className="flex-1 text-sm font-medium text-ink-800" dangerouslySetInnerHTML={{ __html: title }} />
      <div className="text-xs text-ink-400">{mins}</div>
      <ArrowRight size={14} className="text-ink-400 group-hover:text-accent transition-colors" />
    </Link>
  )
}
