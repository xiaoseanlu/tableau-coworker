import { Link } from 'react-router-dom'
import { ArrowRight, Quote, Layers } from '../components/Icons'

const CAP = `${import.meta.env.BASE_URL}captures/`

const WHATS_BROKEN_MAIN_TOC: Array<{ id: string; label: string }> = [
  { id: 'swot', label: 'SWOT' },
  { id: 'voices', label: 'What people say' },
  { id: 'stats', label: 'By the numbers' },
  { id: 'impact', label: 'What it costs' },
  { id: 'takeaway', label: 'Takeaway' },
]

const GAP_JUMP = ['01', '02', '03', '04', '05', '06'] as const

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function WhatsBrokenMainToc() {
  return (
    <nav
      className="not-prose mb-8 rounded-xl border border-ink-200/85 bg-canvas-raised p-4 md:p-5 shadow-edge"
      aria-label="Jump to sections on this page"
    >
      <div className="text-xs font-semibold text-ink-800 mb-3">Jump to a section</div>
      <ul className="flex flex-wrap gap-2">
        <li>
          <button
            type="button"
            onClick={() => scrollToSection('gaps')}
            className="rounded-lg border border-ink-200/80 bg-canvas-sunken/30 px-3 py-1.5 text-sm text-ink-600 hover:border-accent/35 hover:bg-accent-soft/30 hover:text-ink-900 motion-safe:transition-colors"
          >
            Six gaps
          </button>
        </li>
        {WHATS_BROKEN_MAIN_TOC.map(item => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => scrollToSection(item.id)}
              className="rounded-lg border border-ink-200/80 bg-canvas-sunken/30 px-3 py-1.5 text-sm text-ink-600 hover:border-accent/35 hover:bg-accent-soft/30 hover:text-ink-900 motion-safe:transition-colors"
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function WhatsBrokenGapJumpRow() {
  return (
    <div className="not-prose mb-8">
      <div className="text-xs font-semibold text-ink-700 mb-2">Jump to a gap</div>
      <div className="flex flex-wrap gap-1.5">
        {GAP_JUMP.map(n => (
          <button
            key={n}
            type="button"
            onClick={() => scrollToSection(`gap-${n}`)}
            className="rounded-md border border-ink-200/70 px-2.5 py-1.5 font-mono text-sm text-ink-600 hover:bg-ink-50 hover:text-ink-900"
          >
            Gap {n}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function WhatsBroken() {
  return (
    <article className="ds-page py-14">
      <header className="mb-12">
        <div className="h-eyebrow mb-4">01 · What I think is broken today</div>
        <h1 className="h-display mb-6">
          I don&apos;t think Tableau is blind to AI. I think it still optimizes for the builder — and forgets the reader when the tab
          first opens.
        </h1>
        <p className="text-lg text-ink-600 max-w-3xl">
          Slow loads, price, sprawl — people say all of that. The pattern I care about is simpler: the main view still expects you to
          turn charts into a story yourself, while the best machine-written summaries sit off in panels you have to go find. Everything
          below is from my Tableau Cloud trial; filenames are on the figures so you can check I didn&apos;t fake the UI.
        </p>
      </header>

      <WhatsBrokenMainToc />

      <section className="prose-body">
        <h3 id="gaps" className="scroll-mt-28">
          Six gaps I keep hitting
        </h3>
        <p>
          Six problems I can show in screenshots. If it isn&apos;t in this repo&apos;s captures, I don&apos;t claim it here.
        </p>

        <WhatsBrokenGapJumpRow />

        <RootCause
          number="01"
          title="The default exec screen is still a wall of widgets."
          capturePath="key/04-exec-wall-of-widgets.png"
          captureAlt="Tableau Executive Overview — KPI tiles, map, trend charts, no narrative layer"
          captureSource="flow-d-explore-superstore/06-overview-exec-dashboard.png"
          body={[
            'I took the Superstore Executive Overview as the stock revenue-lead view: seven KPI tiles, a color map, two stacked trends, filters on the right, the chrome across the top. Nothing on the canvas answers “what changed since Friday” or “what needs a decision before staff.”',
            'For a Maya-shaped reader the problem isn’t missing data — it’s that Tableau makes her assemble the story. That was fine when dashboards were scarce; it feels like the wrong default now that plain-language reads already exist in the same product.',
          ]}
        />

        <RootCause
          number="02"
          title="Sprawl feels normal — curation never meets you at the door."
          capturePath="key/03-dashboard-sprawl.png"
          captureAlt="Superstore workbook — nine published views in one workbook"
          captureSource="flow-d-explore-superstore/02-superstore-views-list.png"
          body={[
            'One sample workbook publishes nine alternate views. Real tenants multiply that across hundreds of workbooks. I’ve read industry write-ups quoting huge redundancy rates — I’m not quoting those here. I’m showing the pattern in trial: many views, no obvious “canonical versus cruft” story on the path.',
            'Admin, then Users (`flow-c-admin-settings/01-settings-users.png`), lists people and roles — not which dashboards are canonical, stale, or drifting. I think Tableau is great at empowering publishing; I don’t yet see governance as a first-class reader surface.',
          ]}
        />

        <RootCause
          number="03"
          title="Authoring still steals your attention — shelves, marks, LOD."
          capturePath="key/01-chart-builder-shelves.png"
          captureAlt="Web authoring — data pane, shelves, Show Me"
          captureSource="flow-b-first-authoring/07-chart-builder-shelves.png"
          body={[
            'Building from a blank sheet means learning Tableau’s model: dimensions, measures, shelves, marks. G2-style reviews talk about multi-week ramps — that’s third-party pain; I’m not re-proving it pixel by pixel. My point is simpler: “everyone self-serves” oversells the tax.',
            'Hard work still routes through calculated fields and LOD syntax (`key/07-lod-formula-editor.png`, `flow-g-edit-with-lod/03-lod-formula-editor.png`). I respect that power; it’s also why casual business readers bounce. The product isn’t lazy — it’s optimized for people paid to climb the cliff.',
          ]}
          secondaryCapture={{
            path: 'key/07-lod-formula-editor.png',
            alt: 'LOD expression editor — { FIXED [Region] : SUM([Sales]) }',
            source: 'flow-g-edit-with-lod/03-lod-formula-editor.png',
          }}
        />

        <RootCause
          number="04"
          title="On the phone, you get the desktop layout — just narrower."
          capturePath="key/05-mobile-squished.png"
          captureAlt="Executive overview at mobile viewport — dense, scroll-heavy"
          captureSource="flow-e-mobile/01-overview-mobile-top.png"
          body={[
            'The Executive Overview at phone width isn’t a different IA — it’s the same sheet squeezed. Filters and small legends assume precise taps. A Sam-shaped reader between meetings isn’t getting a briefing; he’s getting homework.',
            'Tableau Mobile exists as a product; this stack is the browser-width pain I saw in trial. I’m confident about “desktop metaphors won” on this path; I’m less sure how native app compares across every tenant.',
          ]}
        />

        <RootCause
          number="05"
          title="Pulse and Agent are real — and they still feel like side tracks."
          capturePath="key/06-pulse-home.png"
          captureAlt="Tableau Pulse empty / get started state"
          captureSource="flow-f-pulse/01-pulse-empty-state.png"
          body={[
            'Pulse opens as its own thread: empty state, metric setup, then narrated metric detail (`key/06b-pulse-metric-detail.png`). That proves the org can ship reads; it also leaves the classic dashboard world untouched if you never opt in.',
            'In web authoring the Agent shows up as a tooltip on the existing shell (`key/02-web-authoring.png`). My read isn’t “no AI” — it’s that AI is compensating for complexity instead of replacing what first loads for the reader.',
          ]}
          secondaryCapture={{
            path: 'key/02-web-authoring.png',
            alt: 'Web authoring with Tableau Agent tooltip',
            source: 'flow-g-edit-with-lod/01-web-authoring-with-tableau-agent.png',
          }}
        />

        <RootCause
          number="06"
          title="The good paragraph already exists — it’s gated, disclaimered, and off to the side."
          capturePath="key/10-tableau-agent-with-insights.png"
          captureAlt="Tableau Agent — Insights summary for Executive Overview (Ohio, Colorado profit ratios)"
          captureSource="flow-h-ai-agent/22-overview-dashboard-agent-with-insights.png"
          body={[
            'On the same Executive Overview the agent produced a tight read — Ohio and Colorado with specific profit ratios plus a sensible “what this implies” line. That’s the class of sentence an ops lead would paste into email for their CRO.',
            'Getting there meant flipping multiple AI toggles in settings (`key/09-settings-ai-activation.png`) and stepping through guided overlays — not one obvious “turn it on” switch. Disclaimers still show after activation (`key/11-tableau-agent-disclaimer.png`). I think the copy exists; I think the packaging trains people to treat it as exceptional, not everyday.',
          ]}
          secondaryCapture={{
            path: 'key/09-settings-ai-activation.png',
            alt: 'Settings — list of Tableau AI features to enable individually',
            source: 'flow-h-ai-agent/02-settings-ai-features-list.png',
          }}
        />
      </section>

      <h3 id="swot" className="mt-16 editorial text-2xl text-ink-900 scroll-mt-28">
        SWOT, compressed
      </h3>
      <p className="text-ink-600 text-sm mt-2 mb-6">
        I use this for orientation. The captures above are what I’d actually defend in a room.
      </p>

      <section className="mt-2 grid sm:grid-cols-2 gap-4">
        <SwotCell
          color="success"
          title="Strengths"
          items={[
            'I still think Tableau owns exploratory chart grammar and interaction depth.',
            'Salesforce’s footprint and Cloud Tableau lower ops friction for a lot of buyers.',
            'Pulse plus Agent proved the org can ship narrated reads; my argument is about placement, not capability from zero.',
          ]}
        />
        <SwotCell
          color="danger"
          title="Weaknesses"
          items={[
            'The default dashboard experience still opens like it’s 2015 — tiles first, meaning second.',
            'Sprawl and trust debt outrun headcount in mature installs.',
            'Mobile and exec reading modes lag a generation behind desktop authoring.',
            'AI is strong but administratively and spatially fenced — great output, wrong front door.',
          ]}
        />
        <SwotCell
          color="accent"
          title="Opportunities"
          items={[
            'I’d open on a narrated Monday briefing and keep charts as drill-in proof.',
            'I’d rank cleanup work from real opens and lineage so Jordan isn’t running a manual audit industry.',
            'I’d melt Pulse-style reads into the same shell as classic dashboards so execs don’t pick a sub-brand to get English.',
          ]}
        />
        <SwotCell
          color="warning"
          title="Threats"
          items={[
            'Power BI lives inside Microsoft 365; Looker hugs the warehouse; Sigma and Hex pitch the modern stack.',
            'Buyers haggle cloud seat economics; shelfware dashboards inflate cost and cynicism together.',
            'Every quarter, “ask in plain language” gets cheaper somewhere else — Tableau’s moat shifts toward trust and workflow, not chart novelty.',
          ]}
        />
      </section>

      <section id="voices" className="mt-16 scroll-mt-28">
        <div className="h-eyebrow mb-4">What I hear in the market</div>
        <h3 className="editorial text-2xl text-ink-900 mb-2">
          Patterns from reviews and practitioner writing — not quotes from my trial account
        </h3>
        <p className="text-sm text-ink-500 mb-6">
          I paraphrased recurring themes from G2, Mode’s Tableau roundup, and similar sources. Treat these as temperature checks, not
          court evidence.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Voice
            src="G2-style analyst reviews (compiled)"
            body="Basic charts come fast; serious modeling still means calculated fields, LOD, and weeks of ramp for business users who were sold self-serve."
          />
          <Voice
            src="Enterprise commentary on dashboard inventory"
            body="At scale a large share of dashboards sit unused or duplicated — they keep driving cloud cost and eroding trust about which number is real."
          />
          <Voice
            src="Mobile / consumer persona reviews"
            body="Dashboards built for desktop don’t translate to the phone; people wait for a laptop or punt until later."
          />
          <Voice
            src="Practitioner blogs (web vs Desktop)"
            body="Web authoring improved but still trails Desktop for heavy work; analysts keep two contexts loaded in their heads."
          />
        </div>
      </section>

      <section id="stats" className="mt-16 card-raised p-8 scroll-mt-28">
        <div className="grid sm:grid-cols-3 gap-8">
          <Stat
            big="9"
            label="Views in one Superstore workbook"
            sub="Sprawl proxy — flow-d-explore-superstore/02-superstore-views-list.png"
          />
          <Stat
            big="7+"
            label="AI feature toggles in activation"
            sub="Sequence starts at flow-h-ai-agent/02-settings-ai-features-list.png"
          />
          <Stat
            big="14"
            label="Day trial banner on generic home"
            sub="flow-a-onboarding/02-cloud-home.png — first run is cards, not a role briefing"
          />
        </div>
      </section>

      <section className="prose-body mt-16">
        <h3 id="impact" className="scroll-mt-28">
          What I think this costs in the wild
        </h3>
        <p>
          Three failure modes I’d name in a stakeholder conversation — not universal laws, but patterns I’ve seen once Tableau becomes
          load-bearing:
        </p>

        <h4>1. Executive attention is the scarcest thing in the building</h4>
        <p>
          Every minute a CRO spends decoding tiles is a minute not spent with customers or her team. When the product can already write
          Ohio-and-Colorado-grade copy in a side flow but won’t put that on the default surface, I blame information architecture — not
          model quality.
        </p>

        <h4>2. Governance debt compounds faster than hiring</h4>
        <p>
          Workbooks multiply faster than anyone retires them. Without a curation layer grounded in what people actually open, a
          Jordan-shaped owner becomes human landfill — or the org stops trusting any single dashboard.
        </p>

        <h4>3. Competitors sell the loop, not the screenshot</h4>
        <p>
          Natural language and embedded analytics aren’t standing still. I think Tableau keeps its seat when trust, drill-down, and
          narration ride together — not when narration is a product line you discover if you already know where to click.
        </p>
      </section>

      <section id="takeaway" className="mt-16 card-raised p-8 bg-accent-soft border-accent/20 scroll-mt-28">
        <Layers className="text-accent mb-4" size={22} />
        <div className="h-eyebrow text-accent-ink mb-2">What I’d leave you with</div>
        <p className="text-lg text-ink-900 leading-relaxed editorial italic">
          The widgets aren’t the disease — hiding the story behind widgets while the same vendor ships good machine reads elsewhere is.
          I’m betting on what loads first, not on inventing another chart species.
        </p>
      </section>

      <nav className="mt-16 pt-8 border-t border-ink-100 flex items-center justify-between">
        <Link to="/" className="btn-ghost">
          ← Home
        </Link>
        <Link to="/strategy" className="btn-primary">
          Read the strategy <ArrowRight size={14} />
        </Link>
      </nav>
    </article>
  )
}

function RootCause({
  number,
  title,
  body,
  capturePath,
  captureAlt,
  captureSource,
  secondaryCapture,
}: {
  number: string
  title: string
  body: string[]
  capturePath: string
  captureAlt: string
  captureSource: string
  secondaryCapture?: { path: string; alt: string; source: string }
}) {
  return (
    <div id={`gap-${number}`} className="mt-12 scroll-mt-28">
      <div className="flex items-baseline gap-3 mb-4">
        <span className="font-mono text-xs text-accent">{number}</span>
        <h4 className="text-xl font-semibold text-ink-900 leading-snug">{title}</h4>
      </div>
      {body.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
      <figure className="mt-6 rounded-lg border border-ink-100 overflow-hidden bg-canvas-raised">
        <img src={`${CAP}${capturePath}`} alt={captureAlt} className="block w-full" />
        <figcaption className="px-3 py-2 text-2xs font-mono text-ink-400 border-t border-ink-100">
          {capturePath} · source {captureSource}
        </figcaption>
      </figure>
      {secondaryCapture && (
        <figure className="mt-4 rounded-lg border border-ink-100 overflow-hidden bg-canvas-raised">
          <img
            src={`${CAP}${secondaryCapture.path}`}
            alt={secondaryCapture.alt}
            className="block w-full"
          />
          <figcaption className="px-3 py-2 text-2xs font-mono text-ink-400 border-t border-ink-100">
            {secondaryCapture.path} · source {secondaryCapture.source}
          </figcaption>
        </figure>
      )}
    </div>
  )
}

function SwotCell({
  color,
  title,
  items,
}: {
  color: 'success' | 'danger' | 'accent' | 'warning'
  title: string
  items: string[]
}) {
  const colorMap = {
    success: 'border-success/30 bg-success-soft',
    danger: 'border-danger/30 bg-danger-soft',
    accent: 'border-accent/30 bg-accent-soft',
    warning: 'border-warning/30 bg-warning-soft',
  }
  const dotMap = {
    success: 'bg-success',
    danger: 'bg-danger',
    accent: 'bg-accent',
    warning: 'bg-warning',
  }
  return (
    <div className={`p-5 rounded-lg border ${colorMap[color]}`}>
      <div className="flex items-center gap-2 mb-3">
        <span className={`dot ${dotMap[color]}`} />
        <h4 className="text-sm font-semibold uppercase tracking-wide text-ink-800">{title}</h4>
      </div>
      <ul className="space-y-2 text-sm text-ink-700">
        {items.map((it, i) => (
          <li key={i}>· {it}</li>
        ))}
      </ul>
    </div>
  )
}

function Voice({ src, body }: { src: string; body: string }) {
  return (
    <blockquote className="card p-5">
      <Quote size={14} className="text-ink-300 mb-2" />
      <p className="text-sm text-ink-800 leading-relaxed editorial italic">&ldquo;{body}&rdquo;</p>
      <div className="text-xs text-ink-400 mt-3">— {src}</div>
    </blockquote>
  )
}

function Stat({ big, label, sub }: { big: string; label: string; sub: string }) {
  return (
    <div>
      <div className="font-mono font-semibold tabular-nums text-4xl text-ink-900 tracking-tight mb-1">{big}</div>
      <div className="text-sm font-semibold text-ink-800 mb-1">{label}</div>
      <div className="text-xs text-ink-500 leading-relaxed font-mono">{sub}</div>
    </div>
  )
}
