import { Link } from 'react-router-dom'
import { ArrowRight } from '../components/Icons'

interface CompRow {
  vendor: string
  agentName: string
  postureScore: 1 | 2 | 3 | 4 | 5
  craftScore: 1 | 2 | 3 | 4 | 5
  strengths: string
  gap: string
  notes: string
}

/** Qualitative scores: posture = how central AI/narration is in day-to-day use; craft = quality of the default reader experience. */
const competitors: CompRow[] = [
  {
    vendor: 'Tableau (Salesforce)',
    agentName: 'Tableau Agent, Pulse, Einstein layer',
    postureScore: 4,
    craftScore: 3,
    strengths:
      'Still the reference for charts people trust in the room. In trial, the agent’s written take on an exec dashboard was specific and useful. Pulse shows the product already knows how to narrate a metric.',
    gap: 'That narration still lives next to a classic dashboard that loads first. Busy readers piece the story together from tiles unless they go hunt for the AI.',
    notes: 'This exercise: win by changing the first screen, not by pretending the underlying tech is missing.',
  },
  {
    vendor: 'Microsoft Power BI',
    agentName: 'Copilot for Power BI, Fabric, Teams adjacency',
    postureScore: 5,
    craftScore: 4,
    strengths:
      'Copilot shows up where many companies already work: Teams, Excel, Microsoft 365. For a lot of buyers, “ask in plain language” is already the story.',
    gap: 'Expectations for model polish and chart semantics differ from long-time Tableau shops. The fight is often migration and politics, not a missing feature on a slide.',
    notes: 'Wins on reach: it meets people in their default apps.',
  },
  {
    vendor: 'ThoughtSpot',
    agentName: 'Search & AI-first analytics',
    postureScore: 5,
    craftScore: 3,
    strengths:
      'Marketed as analytics you question in English first; strong “ask and explain” workflow for buyers who never loved report builders.',
    gap: 'Not the same footprint as decades of Tableau in large enterprises; depth and buying motion vary a lot by segment.',
    notes: 'Competes for the same story in the RFP more than it clones Tableau screen for screen.',
  },
  {
    vendor: 'Looker (Google Cloud)',
    agentName: 'LookML semantic layer, embedded analytics',
    postureScore: 3,
    craftScore: 3,
    strengths:
      'Serious about one definition of a metric (LookML) and about putting charts inside other products.',
    gap: 'Day-to-day use still skews toward builders; executives often consume through familiar dashboard or export patterns.',
    notes: 'Overlaps with the “ops lead keeps numbers honest” story in this prototype.',
  },
  {
    vendor: 'Mode',
    agentName: 'Notebooks + SQL + reports',
    postureScore: 3,
    craftScore: 4,
    strengths:
      'Popular with analysts who want SQL, notebooks, and a clean handoff to stakeholders in one place.',
    gap: 'Rarely the single mandated BI standard across a global org; buyer profile differs from classic Tableau enterprise.',
    notes: 'Good reference for pairing narrative and evidence without pretending everyone is an analyst.',
  },
  {
    vendor: 'Hex',
    agentName: 'Collaborative analytics, Hex app sharing',
    postureScore: 4,
    craftScore: 4,
    strengths:
      'Built for data teams shipping collaborative work; easy to turn analysis into something app-like for readers.',
    gap: 'Often sits upstream or beside Tableau rather than replacing the exec dashboard wholesale.',
    notes: 'Useful benchmark for “story out” without tying the story to one warehouse vendor.',
  },
  {
    vendor: 'Sigma Computing',
    agentName: 'Spreadsheet UI on cloud warehouses',
    postureScore: 3,
    craftScore: 4,
    strengths:
      'Spreadsheet familiarity on top of cloud warehouses; fast adoption in cloud-native companies.',
    gap: 'Breadth of enterprise feature set and long replacement cycles vs Tableau still play out case by case.',
    notes: 'Good study for how business authors want to consume and explore.',
  },
  {
    vendor: 'Metabase',
    agentName: 'Open-source BI + Metabase AI direction',
    postureScore: 2,
    craftScore: 3,
    strengths:
      'Quick first dashboard; friendly for simple questions; low friction inside a team.',
    gap: 'Usually not the named global standard next to Tableau; often sits alongside it.',
    notes: 'Helpful contrast for “good enough” operational BI, especially in engineering-heavy stacks.',
  },
]

export default function Competitive() {
  return (
    <article className="ds-page py-14">
      <header className="mb-10">
        <div className="h-eyebrow mb-4">Appendix · Competitive scan</div>
        <h1 className="h-display mb-6">
          Where analytics products lean: narration in the workflow versus the first screen readers get.
        </h1>
        <p className="text-lg text-ink-600 max-w-3xl">
          Quick, opinionated map — not revenue rankings. Across: how much plain-language and AI help live in the path people already
          use. Up: how polished the default reading experience is when you are not building the view yourself.{' '}
          <strong className="text-ink-800">Scores and bubble spots are judgment calls, not data exports.</strong>
        </p>
      </header>

      <section className="card-raised p-8 mb-12">
        <h3 className="text-base font-semibold text-ink-900 mb-1">
          Sketch: narration built-in vs. how the busy reader is treated
        </h3>
        <p className="text-sm text-ink-500 mb-6">
          Dot placement is directional only; bubble size is not market share.
        </p>
        <TwoByTwo />
      </section>

      <section className="space-y-4">
        <h3 className="text-base font-semibold text-ink-900 mb-2">Vendor-by-vendor</h3>
        {competitors.map((c) => (
          <Vendor key={c.vendor} c={c} />
        ))}
      </section>

      <section className="mt-16 card-raised p-8 bg-canvas-sunken">
        <div className="h-eyebrow mb-3">What I take from this</div>
        <h3 className="editorial text-2xl text-ink-900 mb-4">Three different ways to lose a deal</h3>
        <p className="prose-body text-base">
          Microsoft wins on showing up in the apps people already open. ThoughtSpot wins on resetting buyer expectations toward &quot;ask
          first.&quot; Tableau&apos;s edge in this repo is depth of charts people trust and agent writing that already works — the miss is
          what you see before you dig.
        </p>
        <p className="prose-body text-base mt-4">
          The opening for a Tableau-sized player is to make{' '}
          <strong>one reader experience</strong> that treats Pulse-style narration and classic dashboards as the same product — briefing
          up front, charts as proof — instead of another pane or SKU buyers have to remember. Governance (who can see what, and which
          definition is &quot;the number&quot;) still has to hold at Fortune scale; the chart grid does not go away, it stops being the greeting.
        </p>
        <p className="prose-body text-base mt-4">
          <strong>How this relates to evidence in the repo:</strong> claims on{' '}
          <Link to="/whats-broken" className="text-accent hover:underline">
            What&apos;s broken
          </Link>{' '}
          tie back to screenshots under <span className="font-mono text-xs">public/captures/</span>. This page is framing only — I would
          not defend every line here under cross-examination without fresh captures per vendor.
        </p>
      </section>

      <nav className="mt-16 pt-8 border-t border-ink-100 flex items-center justify-between">
        <Link to="/summary" className="btn-ghost">
          ← Summary
        </Link>
        <Link to="/" className="btn-primary">
          Back to start <ArrowRight size={14} />
        </Link>
      </nav>
    </article>
  )
}

function Vendor({ c }: { c: CompRow }) {
  return (
    <details className="card p-5 group [&_summary::-webkit-details-marker]:hidden">
      <summary className="cursor-pointer flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h4 className="text-base font-semibold text-ink-900">{c.vendor}</h4>
            <span className="text-xs text-ink-500">{c.agentName.split('(')[0].trim()}</span>
          </div>
        </div>
        <div className="flex items-center gap-5 shrink-0">
          <ScoreBar label="Narration" value={c.postureScore} color="bg-accent" />
          <ScoreBar label="Craft" value={c.craftScore} color="bg-signal" />
          <span className="text-ink-300 text-xs group-open:rotate-90 transition-transform">▶</span>
        </div>
      </summary>
      <div className="mt-4 pt-4 border-t border-ink-100 grid md:grid-cols-3 gap-5 text-sm">
        <Cell label="Product / AI focus">{c.agentName}</Cell>
        <Cell label="Strengths">{c.strengths}</Cell>
        <Cell label="Gap">{c.gap}</Cell>
        {c.notes && (
          <Cell label="Notes" full>
            {c.notes}
          </Cell>
        )}
      </div>
    </details>
  )
}

function ScoreBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-2xs text-ink-500 hidden sm:inline">{label}</span>
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={`w-2 h-3.5 rounded-sm ${i <= value ? color : 'bg-ink-100'}`} />
        ))}
      </div>
    </div>
  )
}

function Cell({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <div className={full ? 'md:col-span-3' : ''}>
      <div className="text-2xs uppercase tracking-wider text-ink-500 mb-1">{label}</div>
      <div className="text-sm text-ink-700 leading-relaxed">{children}</div>
    </div>
  )
}

interface Bubble {
  name: string
  x: number
  y: number
  r: number
  tone: 'accent' | 'signal' | 'ink'
}

const bubbles: Bubble[] = [
  { name: 'Tableau', x: 0.74, y: 0.44, r: 30, tone: 'accent' },
  { name: 'Power BI', x: 0.91, y: 0.78, r: 26, tone: 'ink' },
  { name: 'ThoughtSpot', x: 0.87, y: 0.58, r: 22, tone: 'ink' },
  { name: 'Hex', x: 0.64, y: 0.82, r: 18, tone: 'ink' },
  { name: 'Sigma', x: 0.52, y: 0.8, r: 17, tone: 'ink' },
  { name: 'Mode', x: 0.46, y: 0.68, r: 16, tone: 'ink' },
  { name: 'Looker', x: 0.55, y: 0.6, r: 19, tone: 'ink' },
  { name: 'Metabase', x: 0.28, y: 0.52, r: 14, tone: 'ink' },
]

function TwoByTwo() {
  const W = 720
  const H = 420
  const padX = 72
  const padY = 50
  const innerW = W - padX * 2
  const innerH = H - padY * 2

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full max-w-[760px]"
        role="img"
        aria-label="Qualitative map: narration in daily workflow versus default reader experience"
      >
        <line x1={padX} y1={H - padY} x2={W - padX} y2={H - padY} stroke="#B4B9C6" strokeWidth="1" />
        <line x1={padX} y1={padY} x2={padX} y2={H - padY} stroke="#B4B9C6" strokeWidth="1" />
        <line
          x1={padX + innerW / 2}
          y1={padY}
          x2={padX + innerW / 2}
          y2={H - padY}
          stroke="#DDE0E8"
          strokeDasharray="3 3"
        />
        <line
          x1={padX}
          y1={padY + innerH / 2}
          x2={W - padX}
          y2={padY + innerH / 2}
          stroke="#DDE0E8"
          strokeDasharray="3 3"
        />

        <text x={W / 2} y={H - 14} textAnchor="middle" fontSize="11" fill="#5B6070" fontFamily="Inter, sans-serif">
          AI and plain-language help in the daily path →
        </text>
        <text
          x={18}
          y={H / 2}
          textAnchor="middle"
          fontSize="11"
          fill="#5B6070"
          fontFamily="Inter, sans-serif"
          transform={`rotate(-90, 18, ${H / 2})`}
        >
          Default reader experience →
        </text>

        <text x={padX + 8} y={padY + 16} fontSize="10" fill="#858B9C" fontFamily="Inter, sans-serif">
          Polished, AI bolt-on
        </text>
        <text
          x={W - padX - 8}
          y={padY + 16}
          textAnchor="end"
          fontSize="10"
          fill="#858B9C"
          fontFamily="Inter, sans-serif"
        >
          Narration-first · room to win
        </text>
        <text x={padX + 8} y={H - padY - 8} fontSize="10" fill="#858B9C" fontFamily="Inter, sans-serif">
          Dashboard grid loads first
        </text>
        <text
          x={W - padX - 8}
          y={H - padY - 8}
          textAnchor="end"
          fontSize="10"
          fill="#858B9C"
          fontFamily="Inter, sans-serif"
        >
          Strong under the hood, weak first screen
        </text>

        {bubbles.map((b) => {
          const cx = padX + b.x * innerW
          const cy = padY + (1 - b.y) * innerH
          const fill = b.tone === 'accent' ? '#5B2E91' : b.tone === 'signal' ? '#C7841C' : '#3D414C'
          const stroke = b.tone === 'accent' ? '#3A1B5E' : '#2A2D36'
          return (
            <g key={b.name}>
              <circle
                cx={cx}
                cy={cy}
                r={b.r}
                fill={fill}
                fillOpacity={b.tone === 'accent' ? 0.85 : 0.18}
                stroke={stroke}
                strokeWidth={b.tone === 'accent' ? 2 : 1}
              />
              <text
                x={cx}
                y={cy + b.r + 14}
                textAnchor="middle"
                fontSize="11"
                fill="#1A1C22"
                fontFamily="Inter, sans-serif"
                fontWeight={b.tone === 'accent' ? 600 : 500}
              >
                {b.name}
              </text>
            </g>
          )
        })}

        <text
          x={W - padX - 10}
          y={padY + 36}
          textAnchor="end"
          fontSize="10"
          fill="#5B2E91"
          fontFamily="Inter, sans-serif"
          fontStyle="italic"
        >
          ↑ stretch goal for Tableau
        </text>
      </svg>
    </div>
  )
}
