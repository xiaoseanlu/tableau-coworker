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

/** Qualitative scores: posture = AI/narration integrated in primary workflow; craft = default consumption UX. */
const competitors: CompRow[] = [
  {
    vendor: 'Tableau (Salesforce)',
    agentName: 'Tableau Agent, Pulse, Einstein layer',
    postureScore: 4,
    craftScore: 3,
    strengths:
      'Category-defining viz and trust semantics. Agent output on Executive Overview is genuinely strong in trial — Ohio/Colorado-class insights. Pulse proves metric narration.',
    gap: 'Narration and Agent sit beside or above a dashboard paradigm that still loads first. Exec and mobile consumers still synthesize tiles by hand unless they summon AI.',
    notes: 'Position for this exercise: move up-right by changing first paint, not by hiding existing tech.',
  },
  {
    vendor: 'Microsoft Power BI',
    agentName: 'Copilot for Power BI, Fabric, Teams adjacency',
    postureScore: 5,
    craftScore: 4,
    strengths:
            'Copilot plus Microsoft 365 distribution; natural-language questions and summaries are central in most pitch decks; hard to ignore if you already live in Teams and Excel.',
    gap: 'Semantic and viz fidelity expectations differ from Tableau shops; migration and dual-BI politics are the battlefield, not chart novelty.',
    notes: 'Primary distribution threat — meets users where Tableau often does not.',
  },
  {
    vendor: 'ThoughtSpot',
    agentName: 'Search & AI-first analytics',
    postureScore: 5,
    craftScore: 3,
    strengths:
      'AI-native positioning; strong "ask" and narrative workflow for many buyers; challenges Tableau on who owns the English layer.',
    gap: 'Enterprise BI incumbent status and embedded depth vary vs decades of Tableau footprint; implementation patterns differ by segment.',
    notes: 'Positioning threat more than legacy dashboard replica.',
  },
  {
    vendor: 'Looker (Google Cloud)',
    agentName: 'LookML semantic layer, embedded analytics',
    postureScore: 3,
    craftScore: 3,
    strengths:
      'Governed metrics and LookML; tight Google Cloud data story; embedded-first for product teams.',
    gap: 'Builder-centric norms; exec consumption often still arrives as traditional dashboards or exports.',
    notes: 'Overlap on "canonical numbers" with Jordan-shaped governance narrative.',
  },
  {
    vendor: 'Mode',
    agentName: 'Notebooks + SQL + reports',
    postureScore: 3,
    craftScore: 4,
    strengths:
      'Analyst-loved workflow; strong storytelling and delivery to stakeholders; hybrid code + viz.',
    gap: 'Less often the single company-wide BI standard; different ICP than global Tableau enterprise deals.',
    notes: 'Useful craft reference for narrative + evidence together.',
  },
  {
    vendor: 'Hex',
    agentName: 'Collaborative analytics, Hex app sharing',
    postureScore: 4,
    craftScore: 4,
    strengths:
      'Data team collaboration; app-like sharing; modern stack buyers; strong outward narrative from notebooks.',
    gap: 'Overlap with Tableau on exec surface is partial — often complementary or upstream.',
    notes: 'Benchmark for "narrative out" without assuming warehouse vendor.',
  },
  {
    vendor: 'Sigma Computing',
    agentName: 'Spreadsheet UI on cloud warehouses',
    postureScore: 3,
    craftScore: 4,
    strengths:
      'Rapid adoption in cloud-native firms; familiar grid metaphor; governance narrative improving.',
    gap: 'Enterprise feature depth and historical Tableau displacement cycles still evolving.',
    notes: 'Consumption UX reference for business authors.',
  },
  {
    vendor: 'Metabase',
    agentName: 'Open-source BI + Metabase AI direction',
    postureScore: 2,
    craftScore: 3,
    strengths:
      'Fast time-to-first-dashboard; beloved for simple questions; low friction for departmental analytics.',
    gap: 'Different enterprise motion; often adjacent to — not replacing — global BI standards.',
    notes: 'Often embedded in engineering-facing stacks; useful comparison for “good enough” operational BI.',
  },
]

export default function Competitive() {
  return (
    <article className="ds-page py-14">
      <header className="mb-10">
        <div className="h-eyebrow mb-4">Appendix · Competitive scan</div>
        <h1 className="h-display mb-6">
          The fight is narration + trust at scale — not who has the most chart types.
        </h1>
        <p className="text-lg text-ink-600 max-w-3xl">
          Qualitative read — April 2026 framing for this prototype. X-axis: AI and narration integrated
          into the primary workflow. Y-axis: craft of the default consumption experience (briefing vs
          wall-of-widgets).{' '}
          <strong className="text-ink-800">Not market share data.</strong>
        </p>
      </header>

      <section className="card-raised p-8 mb-12">
        <h3 className="text-base font-semibold text-ink-900 mb-1">
          The 2×2: Narration in workflow vs. consumption UX
        </h3>
        <p className="text-sm text-ink-500 mb-6">Bubble position is qualitative; size is not revenue.</p>
        <TwoByTwo />
      </section>

      <section className="space-y-4">
        <h3 className="text-base font-semibold text-ink-900 mb-2">Per-vendor read</h3>
        {competitors.map((c) => (
          <Vendor key={c.vendor} c={c} />
        ))}
      </section>

      <section className="mt-16 card-raised p-8 bg-canvas-sunken">
        <div className="h-eyebrow mb-3">Synthesis</div>
        <h3 className="editorial text-2xl text-ink-900 mb-4">
          Open space: governed semantics + narration-first landing at Fortune scale.
        </h3>
        <p className="prose-body text-base">
          Power BI is the <strong>distribution</strong> threat — Copilot and Teams meet people where they
          work. ThoughtSpot is the <strong>positioning</strong> threat — AI-native analytics as category
          expectation. Tableau&apos;s verified advantage in this repo is <strong>viz depth + agent copy
          quality</strong>; the gap is <strong>what loads first</strong> for consumers. Winning means
          unifying Pulse-grade reads and classic dashboards into one consumption spine — not winning a
          third SKU in the buyer&apos;s mental map.
        </p>
        <p className="prose-body text-base mt-4">
          <strong>Evidence discipline:</strong> product claims on{' '}
          <Link to="/whats-broken" className="text-accent hover:underline">
            What&apos;s broken
          </Link>{' '}
          stay tied to <span className="font-mono text-xs">public/captures/</span>. This appendix is
          strategic framing only — moderate confidence without per-bullet screenshots.
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
        aria-label="Narration in workflow versus consumption UX, qualitative vendor positions"
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
          AI &amp; narration in primary workflow →
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
          Consumption UX craft →
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
          Narration-native · space to win
        </text>
        <text x={padX + 8} y={H - padY - 8} fontSize="10" fill="#858B9C" fontFamily="Inter, sans-serif">
          Legacy dashboard-first
        </text>
        <text
          x={W - padX - 8}
          y={H - padY - 8}
          textAnchor="end"
          fontSize="10"
          fill="#858B9C"
          fontFamily="Inter, sans-serif"
        >
          Strong tech, weak landing
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
          ↑ where Tableau should land
        </text>
      </svg>
    </div>
  )
}
