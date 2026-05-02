import { Link } from 'react-router-dom'
import { ArrowRight, Quote, Layers } from '../components/Icons'

const CAP = `${import.meta.env.BASE_URL}captures/`

export default function WhatsBroken() {
  return (
    <article className="max-w-4xl mx-auto px-6 py-14">
      <header className="mb-12">
        <div className="h-eyebrow mb-4">01 · What&apos;s broken today</div>
        <h1 className="h-display mb-6">
          Tableau isn&apos;t failing on vision. It&apos;s failing on{' '}
          <span className="italic">surface hierarchy</span> — the dashboard still behaves like a
          printed report in a world where the data moved on Tuesday.
        </h1>
        <p className="text-lg text-ink-600 max-w-3xl">
          The complaints read like feature bullets: slow loads, license cost, &quot;sprawl.&quot; Those
          are symptoms. The structural issue is that the primary canvas still asks every human to
          behave like an analyst — synthesize tiles, maps, and trend strips — while the best
          machine-read narratives live in panels and side products you have to summon. The evidence
          below is from a Tableau Cloud trial walk captured in this repo; every frame cites a file.
        </p>
      </header>

      <section className="prose-body">
        <p>
          Below is the diagnosis I&apos;d bring to week one as Head of Design. It isn&apos;t a bug
          list. It&apos;s six structural gaps verified in screenshots — not reconstructed from
          memory of what BI tools are &quot;usually like.&quot;
        </p>

        <h3 id="root-causes">The six structural gaps</h3>

        <RootCause
          number="01"
          title="The default surface is still a wall of widgets."
          capturePath="key/04-exec-wall-of-widgets.png"
          captureAlt="Tableau Executive Overview — KPI tiles, map, trend charts, no narrative layer"
          captureSource="flow-d-explore-superstore/06-overview-exec-dashboard.png"
          body={[
            'The Superstore Executive Overview is Tableau\'s canonical sample for a sales leadership view: seven KPI tiles, a color-encoded map, two stacked trend blocks, filters on the right, toolbar across the top. Nothing on the canvas answers "what changed since Friday" or "what needs a decision before staff."',
            'For a CRO-shaped persona, the gap isn\'t missing data — it\'s missing synthesis. The product assumes the viewer will knit the wall into a story. That was a reasonable bet when dashboards were scarce; it\'s a weak default when plain-language reads are already technically possible in the same product.',
          ]}
        />

        <RootCause
          number="02"
          title="Sprawl ships as normal; curation doesn&apos;t exist on the path."
          capturePath="key/03-dashboard-sprawl.png"
          captureAlt="Superstore workbook — nine published views in one workbook"
          captureSource="flow-d-explore-superstore/02-superstore-views-list.png"
          body={[
            'One sample workbook publishes nine alternate views. Enterprise tenants multiply that pattern across hundreds of workbooks. Industry write-ups (Atlan, Zenoptics) cite thirty to forty percent redundancy at scale — I\'m citing the pattern visible in the trial, not the industry percentage, as primary evidence. Confidence: high for the sample; moderate for extrapolation to your tenant.',
            'Admin Settings → Users (`flow-c-admin-settings/01-settings-users.png`) shows people and roles, not which dashboards are canonical, stale, or drifting. The product empowers publishing; it doesn\'t yet own governance as a first-class surface.',
          ]}
        />

        <RootCause
          number="03"
          title="Authoring power still rents headspace — shelves, marks, and expressions."
          capturePath="key/01-chart-builder-shelves.png"
          captureAlt="Web authoring — data pane, shelves, Show Me"
          captureSource="flow-b-first-authoring/07-chart-builder-shelves.png"
          body={[
            'Building from blank canvas means learning the Tableau model: dimensions, measures, shelves, marks. G2-style reviews repeatedly cite multi-week ramps for analysts and longer for business authors — third-party pain, not re-proven pixel by pixel in one capture.',
            'Serious work still runs through calculated fields and LOD syntax (`key/07-lod-formula-editor.png`, `flow-g-edit-with-lod/03-lod-formula-editor.png`). That power is why professionals tolerate Tableau; it is also why "everyone can self-serve" oversells the real cost.',
          ]}
          secondaryCapture={{
            path: 'key/07-lod-formula-editor.png',
            alt: 'LOD expression editor — { FIXED [Region] : SUM([Sales]) }',
            source: 'flow-g-edit-with-lod/03-lod-formula-editor.png',
          }}
        />

        <RootCause
          number="04"
          title="Mobile inherits desktop layout; thumb-first consumption loses."
          capturePath="key/05-mobile-squished.png"
          captureAlt="Executive overview at mobile viewport — dense, scroll-heavy"
          captureSource="flow-e-mobile/01-overview-mobile-top.png"
          body={[
            'The same Executive Overview at phone width is not a different information architecture — it\'s the desktop sheet squeezed. Filters, legends, and multi-pane grids assume precision pointing. A regional director between meetings doesn\'t get a briefing; they get homework.',
            'Tableau Mobile the product exists; this capture stack documents the browser-width pain in the trial. Confidence: high for "desktop metaphors dominate small screens" on this path.',
          ]}
        />

        <RootCause
          number="05"
          title="Pulse and Agent are real — and structurally sidebar."
          capturePath="key/06-pulse-home.png"
          captureAlt="Tableau Pulse empty / get started state"
          captureSource="flow-f-pulse/01-pulse-empty-state.png"
          body={[
            'Pulse opens as its own track: empty state, metric setup, narrated metric detail (`key/06b-pulse-metric-detail.png`). That validates AI in the ecosystem; it also leaves the classic dashboard paradigm untouched for the user who never opts into Pulse.',
            'In web authoring, Tableau Agent appears as a tooltip affordance on the existing shell (`key/02-web-authoring.png`). The strategic read is not "no AI" — it\'s "AI compensates for complexity instead of replacing the default canvas."',
          ]}
          secondaryCapture={{
            path: 'key/02-web-authoring.png',
            alt: 'Web authoring with Tableau Agent tooltip',
            source: 'flow-g-edit-with-lod/01-web-authoring-with-tableau-agent.png',
          }}
        />

        <RootCause
          number="06"
          title="The good output is already there — behind activation, disclaimers, and panels."
          capturePath="key/10-tableau-agent-with-insights.png"
          captureAlt="Tableau Agent — Insights summary for Executive Overview (Ohio, Colorado profit ratios)"
          captureSource="flow-h-ai-agent/22-overview-dashboard-agent-with-insights.png"
          body={[
            'On the same Executive Overview, the agent produces a concise read — e.g. Ohio and Colorado called out with specific profit ratios and a sensible "what this implies" sentence. That sentence is the class of content a sales ops lead would paste into email for their CRO.',
            'Getting there in the trial required toggling multiple AI features in settings (`key/09-settings-ai-activation.png`) and stepping through guided overlays — not a single "make it smart" switch. Disclaimers appear even after activation (`key/11-tableau-agent-disclaimer.png`). The machine read exists; the trust and packaging friction train users to treat it as exceptional, not default.',
          ]}
          secondaryCapture={{
            path: 'key/09-settings-ai-activation.png',
            alt: 'Settings — list of Tableau AI features to enable individually',
            source: 'flow-h-ai-agent/02-settings-ai-features-list.png',
          }}
        />
      </section>

      <h3 id="swot" className="mt-16 editorial text-2xl text-ink-900">
        A SWOT, condensed
      </h3>
      <p className="text-ink-600 text-sm mt-2 mb-6">
        The matrix is for orientation; the captures above carry the burden of proof.
      </p>

      <section className="mt-2 grid sm:grid-cols-2 gap-4">
        <SwotCell
          color="success"
          title="Strengths"
          items={[
            'Visual grammar and interactivity remain category-defining for exploratory analysis.',
            'Salesforce distribution and services footprint; Tableau Cloud lowers operational friction for many buyers.',
            'Pulse + Agent prove the org can ship narrated reads and structured AI — the work is integration, not invention from zero.',
          ]}
        />
        <SwotCell
          color="danger"
          title="Weaknesses"
          items={[
            'Default dashboard experience is still 2015-shaped — widgets first, meaning second.',
            'Sprawl and trust debt scale faster than headcount in mature deployments.',
            'Mobile and executive consumption modes lag a generation behind desktop authoring.',
            'AI is administratively and spatially gated — strong output, wrong default placement.',
          ]}
        />
        <SwotCell
          color="accent"
          title="Opportunities"
          items={[
            'Make narrated briefings the landing state; keep charts as drill-in evidence.',
            'Observed usage drives curation queues — retire stale and duplicated surfaces without a manual audit industry.',
            'Unify Pulse-like reads and classic dashboards so executives don\'t pick a product sub-brand to get English.',
          ]}
        />
        <SwotCell
          color="warning"
          title="Threats"
          items={[
            'Power BI ecosystem leverage inside Microsoft 365; Looker on the warehouse; Sigma and Hex on the modern data stack.',
            'Buyers renegotiating cloud seat economics; shelfware dashboards inflate both cost and cynicism.',
            'Every quarter, LLMs make "ask the data in language" cheaper —Tableau\'s moat shifts from viz novelty to trust and workflow.',
          ]}
        />
      </section>

      <section className="mt-16">
        <div className="h-eyebrow mb-4">What users actually say</div>
        <h3 className="editorial text-2xl text-ink-900 mb-2">
          Representative complaints — cross-checked with public review themes
        </h3>
        <p className="text-sm text-ink-500 mb-6">
          Paraphrases of patterns that show up across G2, Mode&apos;s Tableau roundup, and similar
          sources; not verbatim quotes from your trial account.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Voice
            src="G2-style analyst reviews (compiled)"
            body="Basic charts come fast; serious modeling still means calculated fields, LOD expressions, and weeks of ramp for business users who were sold self-serve."
          />
          <Voice
            src="Enterprise commentary on dashboard inventory"
            body="At scale, a large share of dashboards are redundant or unused — they keep driving cloud cost and eroding trust in which number is canonical."
          />
          <Voice
            src="Mobile / consumer persona reviews"
            body="Dashboards built for desktop don’t translate to phone; the team checks on a laptop or gives up until later."
          />
          <Voice
            src="Practitioner blogs (web vs Desktop)"
            body="Web authoring improved but still trails Desktop for heavy work; analysts keep two contexts in their head."
          />
        </div>
      </section>

      <section className="mt-16 card-raised p-8">
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
        <h3 id="impact">What this costs an org</h3>
        <p>Three downstream effects worth naming for a hiring conversation — not as universal laws for every tenant, but as predictable failure modes once Tableau is mission-critical:</p>

        <h4>1. Executive attention is the scarcest asset</h4>
        <p>
          Every minute a CRO spends decoding tiles is a minute not spent on customers and people.
          When the same product can generate Ohio-and-Colorado-grade copy in a side flow but not on
          the default surface, the bottleneck is IA — not model quality.
        </p>

        <h4>2. Governance debt compounds as headcount compounds</h4>
        <p>
          Workbooks multiply faster than anyone retires them. Without an observed-usage curation
          layer, Jordan-shaped owners become human garbage collectors — or the org stops trusting
          any single dashboard.
        </p>

        <h4>3. The agentic era rewards the system of action, not the system of charts</h4>
        <p>
          Competitors are not standing still on natural language and embedded analytics. Tableau
          wins when trust, drill-down, and narration ship as one loop — not when narration is a
          product line you find if you know where to click.
        </p>
      </section>

      <section className="mt-16 card-raised p-8 bg-accent-soft border-accent/20">
        <Layers className="text-accent mb-4" size={22} />
        <div className="h-eyebrow text-accent-ink mb-2">The takeaway</div>
        <p className="text-lg text-ink-900 leading-relaxed editorial italic">
          The widgets aren&apos;t the disease. Hiding meaning behind widgets while the same vendor
          ships good machine reads elsewhere is. The redesign bet is surface hierarchy — not another
          chart type.
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
    <div className="mt-12">
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
      <div className="editorial text-4xl text-ink-900 mb-1">{big}</div>
      <div className="text-sm font-semibold text-ink-800 mb-1">{label}</div>
      <div className="text-xs text-ink-500 leading-relaxed font-mono">{sub}</div>
    </div>
  )
}
