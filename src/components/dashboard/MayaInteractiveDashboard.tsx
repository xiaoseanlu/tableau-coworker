import { useMemo, useState } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import AgentDock from './AgentDock'

const WEEKLY = [
  { week: 'Mar 10', coverage: 2.95, label: 'Mar 10' },
  { week: 'Mar 17', coverage: 2.92, label: 'Mar 17' },
  { week: 'Mar 24', coverage: 2.9, label: 'Mar 24' },
  { week: 'Mar 31', coverage: 2.88, label: 'Mar 31' },
  { week: 'Apr 7', coverage: 2.86, label: 'Apr 7' },
  { week: 'Apr 14', coverage: 2.84, label: 'Apr 14' },
  { week: 'Apr 21', coverage: 2.82, label: 'Apr 21' },
  { week: 'Apr 28', coverage: 2.6, label: 'Apr 28' },
]

const REPS = [
  { name: 'A. Morales', share: 34, segment: 'Manufacturing' },
  { name: 'J. Okonkwo', share: 28, segment: 'Manufacturing' },
  { name: 'T. Brennan', share: 16, segment: 'Mfg · Feb pipe' },
]

const REGIONS = [
  { region: 'West', coverage: 2.6, delta: -0.21 },
  { region: 'East', coverage: 3.1, delta: 0.04 },
  { region: 'EMEA', coverage: 2.78, delta: 0 },
]

const ARR_TREND = [
  { w: 'W1', plan: 82.5, actual: 81.2 },
  { w: 'W2', plan: 83.8, actual: 82.9 },
  { w: 'W3', plan: 85, actual: 84.1 },
  { w: 'W4', plan: 86.2, actual: 85.3 },
  { w: 'W5', plan: 87.4, actual: 86.1 },
  { w: 'W6', plan: 88.6, actual: 86.8 },
  { w: 'W7', plan: 89.8, actual: 87.4 },
  { w: 'W8', plan: 91, actual: 87.4 },
]

type Selection =
  | { kind: 'week'; week: string; coverage: number; idx: number }
  | { kind: 'rep'; name: string; share: number; segment: string }
  | { kind: 'region'; region: string; coverage: number; delta: number }
  | { kind: 'kpi'; id: 'arr' | 'west' | 'qend'; title: string; value: string }
  | { kind: 'arr'; week: string }
  | { kind: 'followup'; q: string }
  | null

const ACCENT = '#5B2E91'
const SIGNAL = '#C7841C'

function agentForSelection(sel: Selection): { title: string; body: string; confidence: string } {
  if (!sel) {
    return {
      title: 'Coworker',
      body:
        'Click any point on the West coverage curve, a rep bar, a region tile, a KPI card, or the ARR vs plan lines. I surface reads with sources and confidence — not a chat thread grafted on the grid.',
      confidence: 'n/a — awaiting your selection',
    }
  }
  if (sel.kind === 'week') {
    if (sel.idx === WEEKLY.length - 1) {
      return {
        title: 'West coverage · Apr 28',
        body:
          '2.6× is the steepest week-over-week drop this quarter (−0.22 vs Apr 21). Three reps drove 78% of the move; deals were mid-market manufacturing with February pipe. Not renewal — checked enterprise slippage',
        confidence: 'high on magnitude · moderate on root cause',
      }
    }
    return {
      title: `West coverage · ${sel.week}`,
      body: `${sel.coverage.toFixed(2)}× — in band with prior four weeks. No single-rep concentration flagged above 22% for this slice. I’d leave this week off the staff deck unless someone asks.`,
      confidence: 'moderate',
    }
  }
  if (sel.kind === 'rep') {
    return {
      title: `${sel.name} · rep read`,
      body: `${sel.share}% of the WoW coverage move — heavily weighted to ${sel.segment}. Opportunity-level: 9 opps thinned; none enterprise top-20. Suggest Sam names three accounts in stand-up, not a pipeline autopsy.`,
      confidence: 'high on share attribution · moderate on call',
    }
  }
  if (sel.kind === 'region') {
    return {
      title: `${sel.region} · regional lens`,
      body:
        sel.region === 'West'
          ? `${sel.coverage.toFixed(2)}× coverage (${sel.delta.toFixed(2)} WoW). This is the only region underwater vs rolling 8-week median — narrative anchor for Maya’s staff.`
          : `${sel.region} at ${sel.coverage.toFixed(2)}×. Delta ${sel.delta >= 0 ? '+' : ''}${sel.delta.toFixed(2)} WoW — within noise for EMEA; Germany still the watch item with low signal this week.`,
      confidence: sel.region === 'West' ? 'high' : 'low–moderate',
    }
  }
  if (sel.kind === 'kpi') {
    const bodies: Record<string, string> = {
      arr:
        '$87.4M YTD vs $89.5M plan — gap $2.1M but narrowing vs prior week. Top 5 enterprise advanced; Acme Co slipped legal. Still feasible on Q-end if West stabilizes.',
      west: '2.6× West coverage (v2 definition, Jordan Apr 30). Compare to East 3.1× — the spread is politically noticeable at staff even if finance is calm.',
      qend: '3.4× Q-end coverage — +0.1 WoW buffer. Helps offset West noise in roll-up models Finance shows the board.',
    }
    return {
      title: sel.title,
      body: bodies[sel.id],
      confidence: 'high on numbers · moderate on forecast',
    }
  }
  if (sel.kind === 'arr') {
    return {
      title: `ARR vs plan · ${sel.week}`,
      body:
        'Gap widens from plan line after W6 as West thins. Not a model bug — CRM sync 8:38 AM confirms. I’d couple this chart with the coverage click, not as a separate story.',
      confidence: 'moderate',
    }
  }
  return {
    title: 'Follow-up',
    body:
      sel.q === 'Why did West drop?'
        ? 'Combination of mid-market manufacturing thinning and timing — not renewal cliff, not definition drift (v2 holds on old vs new bind).'
        : sel.q === 'Which deals moved?'
          ? 'Nine opportunities moved stage back or reduced ACV — list pinned to CRM view «West_WoW_exceptions» (prototype: copy in staff appendix).'
          : 'East +0.04 and EMEA flat — West is the outlier; worth one sentence in staff, not a regional compare.',
    confidence: 'moderate',
  }
}

export default function MayaInteractiveDashboard() {
  const [sel, setSel] = useState<Selection>(null)
  const agent = useMemo(() => agentForSelection(sel), [sel])

  const repIdx = useMemo(() => {
    if (sel?.kind !== 'rep') return -1
    return REPS.findIndex(r => r.name === sel.name)
  }, [sel])

  const regionIdx = useMemo(() => {
    if (sel?.kind !== 'region') return -1
    return REGIONS.findIndex(r => r.region === sel.region)
  }, [sel])

  const weekIdx = sel?.kind === 'week' ? sel.idx : -1

  return (
    <div className="rounded-xl border border-ink-200 bg-canvas-raised shadow-raised overflow-hidden">
      {/* Product header */}
      <div className="border-b border-ink-100 bg-gradient-to-b from-canvas to-canvas-raised px-6 py-5 md:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <div className="text-2xs font-mono uppercase tracking-wider text-ink-500 mb-2">
              Monday · May 4 · 8:42 AM · Maya Chen · CRO
            </div>
            <h2 className="editorial text-2xl md:text-3xl text-ink-900 leading-tight max-w-3xl">
              West softened. Acme Co is the staff name. Everything below is live — click the viz.
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-ink-500 font-mono shrink-0">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" aria-hidden />
            Sources synced 8:38 AM PT · v2 definitions
          </div>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row xl:items-start">
        {/* Main canvas */}
        <div className="flex-1 min-w-0 p-4 md:p-6 space-y-5 border-b xl:border-b-0 xl:border-r border-ink-100">
          {/* KPI strip — clickable */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() =>
                setSel({ kind: 'kpi', id: 'arr', title: 'ARR pacing YTD', value: '$87.4M' })
              }
              className={`text-left card p-4 transition-all hover:shadow-raised hover:border-accent/30 ${
                sel?.kind === 'kpi' && sel.id === 'arr' ? 'ring-2 ring-accent/40 border-accent/40' : ''
              }`}
            >
              <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">ARR · YTD</div>
              <div className="font-mono text-2xl text-ink-900">$87.4M</div>
              <div className="text-xs text-warning font-medium mt-1">−$2.1M vs plan · narrowing</div>
            </button>
            <button
              type="button"
              onClick={() =>
                setSel({ kind: 'kpi', id: 'west', title: 'West pipeline coverage', value: '2.6×' })
              }
              className={`text-left card p-4 transition-all hover:shadow-raised hover:border-accent/30 ${
                sel?.kind === 'kpi' && sel.id === 'west' ? 'ring-2 ring-accent/40 border-accent/40' : ''
              }`}
            >
              <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">West coverage</div>
              <div className="font-mono text-2xl text-ink-900">2.6×</div>
              <div className="text-xs text-danger font-medium mt-1">−0.22 WoW · v2</div>
            </button>
            <button
              type="button"
              onClick={() =>
                setSel({ kind: 'kpi', id: 'qend', title: 'Q-end coverage buffer', value: '3.4×' })
              }
              className={`text-left card p-4 transition-all hover:shadow-raised hover:border-accent/30 ${
                sel?.kind === 'kpi' && sel.id === 'qend' ? 'ring-2 ring-accent/40 border-accent/40' : ''
              }`}
            >
              <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Q-end coverage</div>
              <div className="font-mono text-2xl text-ink-900">3.4×</div>
              <div className="text-xs text-success font-medium mt-1">+0.1 WoW</div>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Area — West coverage */}
            <div className="card p-4 min-h-[300px]">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <div className="text-sm font-semibold text-ink-900">West pipeline coverage</div>
                  <div className="text-2xs text-ink-500 font-mono mt-0.5">Click a week · trailing 8</div>
                </div>
                <span className="pill bg-signal-soft text-signal-ink text-2xs">Interactive</span>
              </div>
              <div className="h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={WEEKLY} margin={{ top: 6, right: 6, left: -18, bottom: 0 }}>
                    <defs>
                      <linearGradient id="covGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={ACCENT} stopOpacity={0.22} />
                        <stop offset="100%" stopColor={ACCENT} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 6" stroke="#DDE0E8" vertical={false} />
                    <XAxis dataKey="label" tick={{ fontSize: 10, fill: '#5B6070' }} axisLine={false} tickLine={false} />
                    <YAxis
                      domain={[2.4, 3.05]}
                      tick={{ fontSize: 10, fill: '#5B6070', fontFamily: 'JetBrains Mono' }}
                      axisLine={false}
                      tickLine={false}
                      width={36}
                      tickFormatter={v => `${v}×`}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 8,
                        border: '1px solid #EEF0F4',
                        fontSize: 12,
                        boxShadow: '0 4px 12px rgba(14,15,18,0.06)',
                      }}
                      formatter={(v: number) => [`${v.toFixed(2)}×`, 'Coverage']}
                    />
                    <Area
                      type="monotone"
                      dataKey="coverage"
                      stroke={ACCENT}
                      strokeWidth={2.5}
                      fill="url(#covGrad)"
                      dot={(props: {
                        cx?: number
                        cy?: number
                        payload?: (typeof WEEKLY)[0]
                        index?: number
                      }) => {
                        const { cx, cy, payload, index } = props
                        if (cx == null || cy == null || payload == null || index == null) {
                          return <g />
                        }
                        const active = index === weekIdx
                        return (
                          <circle
                            role="button"
                            tabIndex={0}
                            cx={cx}
                            cy={cy}
                            r={active ? 8 : 5}
                            fill={active ? ACCENT : '#fff'}
                            stroke={ACCENT}
                            strokeWidth={2}
                            className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-signal"
                            onClick={() =>
                              setSel({
                                kind: 'week',
                                week: payload.week,
                                coverage: payload.coverage,
                                idx: index,
                              })
                            }
                            onKeyDown={e => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                setSel({
                                  kind: 'week',
                                  week: payload.week,
                                  coverage: payload.coverage,
                                  idx: index,
                                })
                              }
                            }}
                          />
                        )
                      }}
                      activeDot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bar — rep concentration */}
            <div className="card p-4 min-h-[300px]">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <div className="text-sm font-semibold text-ink-900">WoW move · by rep</div>
                  <div className="text-2xs text-ink-500 font-mono mt-0.5">Click a bar</div>
                </div>
              </div>
              <div className="h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={REPS} layout="vertical" margin={{ top: 6, right: 12, left: 72, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 6" stroke="#DDE0E8" horizontal={false} />
                    <XAxis type="number" domain={[0, 40]} tickFormatter={v => `${v}%`} tick={{ fontSize: 10 }} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#3D414C' }} width={68} axisLine={false} tickLine={false} />
                    <Tooltip
                      formatter={(v: number) => [`${v}%`, 'Share of move']}
                      contentStyle={{ borderRadius: 8, border: '1px solid #EEF0F4', fontSize: 12 }}
                    />
                    <Bar
                      dataKey="share"
                      radius={[0, 6, 6, 0]}
                      cursor="pointer"
                      onClick={(_data: unknown, index: number) => {
                        const row = REPS[index]
                        if (row) setSel({ kind: 'rep', name: row.name, share: row.share, segment: row.segment })
                      }}
                    >
                      {REPS.map((_, i) => (
                        <Cell
                          key={i}
                          fill={i === repIdx ? '#3A1B5E' : ACCENT}
                          fillOpacity={repIdx >= 0 && i !== repIdx ? 0.35 : 1}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Regions + ARR dual-axis row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="card p-4">
              <div className="text-sm font-semibold text-ink-900 mb-3">Coverage by region</div>
              <div className="space-y-2">
                {REGIONS.map((r, i) => (
                  <button
                    key={r.region}
                    type="button"
                    onClick={() => setSel({ kind: 'region', region: r.region, coverage: r.coverage, delta: r.delta })}
                    className={`w-full flex items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-all hover:shadow-card ${
                      regionIdx === i ? 'border-accent bg-accent-soft/50 ring-1 ring-accent/30' : 'border-ink-100 bg-canvas'
                    }`}
                  >
                    <span className="w-20 text-sm font-medium text-ink-800">{r.region}</span>
                    <div className="flex-1 h-2 rounded-full bg-ink-100 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(r.coverage / 3.4) * 100}%`,
                          backgroundColor: r.region === 'West' ? SIGNAL : ACCENT,
                        }}
                      />
                    </div>
                    <span className="font-mono text-sm text-ink-900 tabular-nums w-14">{r.coverage.toFixed(2)}×</span>
                    <span
                      className={`font-mono text-xs w-16 text-right ${
                        r.delta < 0 ? 'text-danger' : r.delta > 0 ? 'text-success' : 'text-ink-500'
                      }`}
                    >
                      {r.delta > 0 ? '+' : ''}
                      {r.delta.toFixed(2)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="card p-4 min-h-[200px]">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="text-sm font-semibold text-ink-900">ARR pace · $M vs plan</div>
                  <div className="text-2xs text-ink-500 font-mono mt-0.5">Click a point · plan dashed</div>
                </div>
              </div>
              <div className="h-[180px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={ARR_TREND}
                    margin={{ top: 8, right: 8, left: -18, bottom: 0 }}
                    onClick={e => {
                      if (e && e.activeLabel != null) {
                        setSel({ kind: 'arr', week: String(e.activeLabel) })
                      }
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 6" stroke="#DDE0E8" vertical={false} />
                    <XAxis dataKey="w" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis
                      domain={[78, 94]}
                      tick={{ fontSize: 10, fontFamily: 'JetBrains Mono' }}
                      axisLine={false}
                      tickLine={false}
                      width={34}
                    />
                    <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                    <Line type="monotone" dataKey="plan" stroke="#858B9C" strokeWidth={2} strokeDasharray="6 4" dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="actual" stroke={ACCENT} strokeWidth={2.5} dot={{ r: 4, cursor: 'pointer' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <p className="text-2xs text-ink-500 leading-relaxed px-1">
            Prototype data — interactions are real; warehouse isn’t. Intent: agent narrates what you touch, same class of read Tableau
            Agent already produces in trial captures.
          </p>
        </div>

        <AgentDock
          insight={agent}
          followups={['Why did West drop?', 'Which deals moved?', 'Compare regions']}
          onFollowup={q => setSel({ kind: 'followup', q })}
          onClear={() => setSel(null)}
          selectionActive={!!sel}
        />
      </div>
    </div>
  )
}
