import { useMemo, useState, useId } from 'react'
import { Link } from 'react-router-dom'
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
import { CHART, CHART_AXIS, CHART_FONT_MONO, chartTooltip } from './chartTokens'
import { DEMO_PRESET_STRIP_HELP } from './JumpStateStrip'
import { MAYA_BRIEF } from './mayaDemoContext'
import { MAYA_AGENT_DATA_SURFACE } from '../../data/personaFlowMeta'

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

function agentForSelection(sel: Selection): { title: string; body: string; confidence: string } {
  if (!sel) {
    return {
      title: 'Coworker',
      body:
        'Click the curve, a rep bar, a region row, a KPI tile, or the ARR vs plan line. Answers land here with sources and confidence—no second chat tab to hunt for.',
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
        body: `${sel.coverage.toFixed(2)}× — right in line with the last month. Nobody owns more than 22% of this slice; I would not put this week on the staff deck unless someone brings it up.`,
      confidence: 'moderate',
    }
  }
  if (sel.kind === 'rep') {
    return {
      title: `${sel.name} · rep read`,
      body: `${sel.share}% of the week-over-week move, mostly ${sel.segment}. Nine smaller opps thinned; nothing in the enterprise top 20. Have Sam name three accounts in stand-up instead of a full pipeline postmortem.`,
      confidence: 'high on share attribution · moderate on call',
    }
  }
  if (sel.kind === 'region') {
    return {
      title: `${sel.region} · regional lens`,
      body:
        sel.region === 'West'
          ? `${sel.coverage.toFixed(2)}× coverage (${sel.delta.toFixed(2)} WoW). Only region below the rolling eight-week median—the line you will want in staff if the room gets nervous about West.`
          : `${sel.region} at ${sel.coverage.toFixed(2)}×. Delta ${sel.delta >= 0 ? '+' : ''}${sel.delta.toFixed(2)} WoW — within noise for EMEA; Germany still the watch item with low signal this week.`,
      confidence: sel.region === 'West' ? 'high' : 'low–moderate',
    }
  }
  if (sel.kind === 'kpi') {
    const bodies: Record<string, string> = {
      arr:
        '$87.4M YTD against $89.5M plan — still $2.1M light, but a little better than last week. Top five enterprise deals moved; Acme Co is the slip in legal. Quarter-end is still plausible if West stops sliding.',
      west:
        '2.6× West coverage on Jordan’s v2 bind (Apr 30). East is at 3.1×—that gap is the thing people feel in the room even when Finance says the roll-up is fine.',
      qend: '3.4× on Q-end buffer—up a tenth week over week. Gives Finance a little air cover for West in the board pack.',
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
        'Gap opens vs plan after week six as West thins. CRM synced at 8:38—this is not a spreadsheet glitch. Show this next to the West coverage point you picked; it should be one story, not two.',
      confidence: 'moderate',
    }
  }
  return {
    title: 'Follow-up',
    body:
      sel.q === 'Why did West drop?'
        ? 'Combination of mid-market manufacturing thinning and timing — not renewal cliff, not definition drift (v2 holds on old vs new bind).'
        : sel.q === 'Which deals moved?'
          ? 'Nine deals moved stage or cut ACV—the list is in CRM under «West_WoW_exceptions»; same rows are in Maya’s staff pack.'
          : 'East +0.04 and EMEA flat — West is the outlier; worth one sentence in staff, not a regional compare.',
    confidence: 'moderate',
  }
}

function NarrativeLeadBlock({ compact = false }: { compact?: boolean }) {
  const para = compact ? 'text-sm' : 'text-sm md:text-base'
  return (
    <div className="border-l-[3px] border-signal bg-signal-soft/20 px-4 py-4 md:px-5 md:py-5 space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="pill bg-signal-soft text-signal-ink text-2xs font-mono">Confidence: high · same numbers as the grid</span>
        <span className="text-2xs font-mono text-ink-500">{MAYA_BRIEF.dateLabel}</span>
      </div>
      <p className={`editorial ${compact ? 'text-base' : 'text-base md:text-lg'} text-ink-900 leading-snug m-0`}>
        {MAYA_BRIEF.headline} {MAYA_BRIEF.subline}
      </p>
      <p className={`editorial ${para} text-ink-700 leading-relaxed m-0`}>{MAYA_BRIEF.staffBullets[0]?.text}</p>
      <p className={`editorial ${para} text-ink-700 leading-relaxed m-0`}>{MAYA_BRIEF.staffBullets[1]?.text}</p>
      <p className={`editorial ${para} text-ink-700 leading-relaxed m-0`}>
        {MAYA_BRIEF.staffBullets[2]?.text} ARR is at{' '}
        <span className="font-mono tabular-nums font-semibold text-ink-900">{MAYA_BRIEF.kpis[0]?.value}</span>; West coverage is{' '}
        <span className="font-mono tabular-nums font-semibold text-ink-900">{MAYA_BRIEF.kpis[1]?.value}</span> on Jordan&apos;s v2 bind.
        Down below is the chart grid for proving the story—not the first screen Maya reads on Monday.
      </p>
    </div>
  )
}

export type MayaDashboardLayout = 'classic' | 'narrativeLeads'

export default function MayaInteractiveDashboard({
  presetStrip = false,
  initialLayout = 'classic',
  compactHero = false,
  /** Home hero: single column, no scaling, compact Coworker strip — avoids half-width dock looking like a broken modal */
  homeEmbed = false,
}: {
  presetStrip?: boolean
  initialLayout?: MayaDashboardLayout
  compactHero?: boolean
  homeEmbed?: boolean
}) {
  const [layoutMode, setLayoutMode] = useState<MayaDashboardLayout>(initialLayout)
  const [sel, setSel] = useState<Selection>(null)
  const agent = useMemo(() => agentForSelection(sel), [sel])

  const repIdx = useMemo(() => {
    if (sel?.kind !== 'rep') return -1
    return REPS.findIndex(r => r.name === sel.name)
  }, [sel])
  const covGradId = useId().replace(/:/g, '')

  const regionIdx = useMemo(() => {
    if (sel?.kind !== 'region') return -1
    return REGIONS.findIndex(r => r.region === sel.region)
  }, [sel])

  const weekIdx = sel?.kind === 'week' ? sel.idx : -1

  const dockTag =
    layoutMode === 'narrativeLeads'
      ? 'Follow-ups and drill — primary read is above'
      : 'Default briefing surface · not a summoned side chat'

  return (
    <div className="rounded-xl border border-ink-200/90 bg-canvas-raised overflow-hidden shadow-lift-sm ring-1 ring-ink-900/[0.035]">
      {presetStrip ? (
        <div className="border-b border-ink-100 bg-accent-soft/30 px-4 py-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-2xs font-mono uppercase tracking-wide text-accent-ink shrink-0 mr-1">Jump UI state</span>
            <button
              type="button"
              onClick={() => setLayoutMode('narrativeLeads')}
              className={`rounded-full px-2.5 py-1 text-2xs font-medium border bg-canvas-raised text-ink-700 hover:border-accent/40 ${
                layoutMode === 'narrativeLeads' ? 'border-signal ring-1 ring-signal/35' : 'border-ink-200'
              }`}
            >
              Thesis · narrative leads
            </button>
            <button
              type="button"
              onClick={() => setLayoutMode('classic')}
              className={`rounded-full px-2.5 py-1 text-2xs font-medium border bg-canvas-raised text-ink-700 hover:border-accent/40 ${
                layoutMode === 'classic' ? 'border-accent ring-1 ring-accent/25' : 'border-ink-200'
              }`}
            >
              Classic grid
            </button>
            <button
              type="button"
              onClick={() => setSel(null)}
              className="rounded-full px-2.5 py-1 text-2xs font-medium border border-ink-200 bg-canvas-raised text-ink-700 hover:border-accent/40"
            >
              Idle dock
            </button>
            <button
              type="button"
              onClick={() =>
                setSel({ kind: 'kpi', id: 'west', title: 'West pipeline coverage', value: '2.6×' })
              }
              className="rounded-full px-2.5 py-1 text-2xs font-medium border border-ink-200 bg-canvas-raised text-ink-700 hover:border-accent/40"
            >
              West KPI
            </button>
            <button
              type="button"
              onClick={() => {
                const w = WEEKLY[WEEKLY.length - 1]
                setSel({ kind: 'week', week: w.week, coverage: w.coverage, idx: WEEKLY.length - 1 })
              }}
              className="rounded-full px-2.5 py-1 text-2xs font-medium border border-ink-200 bg-canvas-raised text-ink-700 hover:border-accent/40"
            >
              Apr 28 week
            </button>
            <button
              type="button"
              onClick={() => {
                const r = REPS[0]
                if (r) setSel({ kind: 'rep', name: r.name, share: r.share, segment: r.segment })
              }}
              className="rounded-full px-2.5 py-1 text-2xs font-medium border border-ink-200 bg-canvas-raised text-ink-700 hover:border-accent/40"
            >
              Rep Morales
            </button>
            <button
              type="button"
              onClick={() => setSel({ kind: 'region', region: 'West', coverage: 2.6, delta: -0.21 })}
              className="rounded-full px-2.5 py-1 text-2xs font-medium border border-ink-200 bg-canvas-raised text-ink-700 hover:border-accent/40"
            >
              Region row
            </button>
            <span className="text-2xs text-ink-500 ml-auto max-sm:hidden">
              {layoutMode === 'narrativeLeads' ? 'Narrative first — grid is evidence' : 'Same canvas — selection drives the dock'}
            </span>
          </div>
          <p className="text-2xs text-ink-600 mt-2.5 mb-0 leading-relaxed max-w-prose">{DEMO_PRESET_STRIP_HELP}</p>
        </div>
      ) : null}
      {layoutMode === 'classic' ? (
        <div
          className={`border-b border-ink-100 bg-gradient-to-b from-canvas to-canvas-raised px-6 py-5 md:px-8 ${compactHero ? 'py-4' : ''}`}
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <div className="text-2xs font-mono uppercase tracking-wider text-ink-500 mb-2">
                Monday · May 4 · 8:42 AM · Maya Chen · CRO
              </div>
              <h2 className="editorial text-2xl md:text-3xl text-ink-900 leading-tight max-w-3xl">
                {MAYA_BRIEF.headline}
                <span className="block mt-2 text-lg md:text-xl text-ink-700 font-normal">
                  What changed, what to flag for staff, what to leave alone — click the viz; the dock carries confidence.
                </span>
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-ink-500 font-mono shrink-0">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" aria-hidden />
              {MAYA_BRIEF.sourcesLine.split('·')[0]?.trim()} · v2 definitions
            </div>
          </div>
        </div>
      ) : (
        <div className={`border-b border-ink-100 px-4 py-3 md:px-6 ${compactHero ? 'py-2' : ''}`}>
          <div className="text-2xs font-mono uppercase tracking-wider text-ink-500 mb-2">Thesis at first paint</div>
          <NarrativeLeadBlock compact={compactHero} />
        </div>
      )}

      <div className={homeEmbed ? 'flex flex-col' : 'flex flex-col xl:flex-row xl:items-start'}>
        {/* Main canvas */}
        <div
          className={`flex-1 min-w-0 ${
            homeEmbed ? 'border-b border-ink-100' : 'border-b xl:border-b-0 xl:border-r border-ink-100'
          } ${
            layoutMode === 'narrativeLeads'
              ? `${compactHero ? 'p-3 md:p-4' : 'p-4 md:p-5'} space-y-4`
              : `${compactHero ? 'p-3 md:p-4' : 'p-4 md:p-6'} space-y-5`
          }`}
        >
          <div
            className={`space-y-5 ${
              homeEmbed || layoutMode !== 'narrativeLeads'
                ? ''
                : `${compactHero ? 'origin-top scale-[0.82] xl:scale-[0.88]' : 'origin-top scale-[0.88] xl:scale-90'} max-xl:scale-[0.82]`
            }`}
          >
          {/* KPI strip — clickable */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() =>
                setSel({ kind: 'kpi', id: 'arr', title: 'ARR pacing YTD', value: '$87.4M' })
              }
              className={`text-left card p-4 transition-colors hover:border-accent/40 ${
                sel?.kind === 'kpi' && sel.id === 'arr' ? 'ring-2 ring-accent/40 border-accent/40' : ''
              }`}
            >
              <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">ARR · YTD</div>
              <div className="font-mono text-2xl font-semibold tabular-nums text-ink-900 tracking-tight">{MAYA_BRIEF.kpis[0].value}</div>
              <div className="metric-delta text-warning mt-1">{MAYA_BRIEF.kpis[0].delta} · narrowing</div>
            </button>
            <button
              type="button"
              onClick={() =>
                setSel({ kind: 'kpi', id: 'west', title: 'West pipeline coverage', value: '2.6×' })
              }
              className={`text-left card p-4 transition-colors hover:border-accent/40 ${
                sel?.kind === 'kpi' && sel.id === 'west' ? 'ring-2 ring-accent/40 border-accent/40' : ''
              }`}
            >
              <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">West coverage</div>
              <div className="font-mono text-2xl font-semibold tabular-nums text-ink-900 tracking-tight">{MAYA_BRIEF.kpis[1].value}</div>
              <div className="metric-delta text-danger mt-1">{MAYA_BRIEF.kpis[1].delta} · v2</div>
            </button>
            <button
              type="button"
              onClick={() =>
                setSel({ kind: 'kpi', id: 'qend', title: 'Q-end coverage buffer', value: '3.4×' })
              }
              className={`text-left card p-4 transition-colors hover:border-accent/40 ${
                sel?.kind === 'kpi' && sel.id === 'qend' ? 'ring-2 ring-accent/40 border-accent/40' : ''
              }`}
            >
              <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Q-end coverage</div>
              <div className="font-mono text-2xl font-semibold tabular-nums text-ink-900 tracking-tight">{MAYA_BRIEF.kpis[2].value}</div>
              <div className="metric-delta text-success mt-1">{MAYA_BRIEF.kpis[2].delta}</div>
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
                      <linearGradient id={covGradId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={CHART.accent} stopOpacity={0.22} />
                        <stop offset="100%" stopColor={CHART.accent} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 6" stroke={CHART.grid} vertical={false} />
                    <XAxis dataKey="label" tick={{ fontSize: 10, fill: CHART_AXIS.tick }} axisLine={false} tickLine={false} />
                    <YAxis
                      domain={[2.4, 3.05]}
                      tick={{ fontSize: 10, fill: CHART_AXIS.tick, fontFamily: 'JetBrains Mono' }}
                      axisLine={false}
                      tickLine={false}
                      width={36}
                      tickFormatter={v => `${v}×`}
                    />
                    <Tooltip
                      contentStyle={chartTooltip({
                        boxShadow: '0 4px 12px rgba(14,15,18,0.06)',
                      })}
                      formatter={(v: number) => [`${v.toFixed(2)}×`, 'Coverage']}
                    />
                    <Area
                      type="monotone"
                      dataKey="coverage"
                      stroke={CHART.accent}
                      strokeWidth={2.5}
                      fill={`url(#${covGradId})`}
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
                            fill={active ? CHART.accent : CHART.canvas}
                            stroke={CHART.accent}
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
                    <CartesianGrid strokeDasharray="3 6" stroke={CHART.grid} horizontal={false} />
                    <XAxis
                      type="number"
                      domain={[0, 40]}
                      tickFormatter={v => `${v}%`}
                      tick={{ fontSize: 10, fill: CHART_AXIS.tick, fontFamily: CHART_FONT_MONO }}
                    />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: CHART_AXIS.label }} width={68} axisLine={false} tickLine={false} />
                    <Tooltip formatter={(v: number) => [`${v}%`, 'Share of move']} contentStyle={chartTooltip()} />
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
                          fill={i === repIdx ? CHART.accentInk : CHART.accent}
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
                    className={`w-full flex items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors hover:border-ink-400 ${
                      regionIdx === i ? 'border-accent bg-accent-soft/50 ring-1 ring-accent/30' : 'border-ink-100 bg-canvas'
                    }`}
                  >
                    <span className="w-20 text-sm font-medium text-ink-800">{r.region}</span>
                    <div className="flex-1 h-2 rounded-full bg-ink-100 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(r.coverage / 3.4) * 100}%`,
                          backgroundColor: r.region === 'West' ? CHART.signal : CHART.accent,
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
                    <CartesianGrid strokeDasharray="3 6" stroke={CHART.grid} vertical={false} />
                    <XAxis dataKey="w" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis
                      domain={[78, 94]}
                      tick={{ fontSize: 10, fontFamily: 'JetBrains Mono' }}
                      axisLine={false}
                      tickLine={false}
                      width={34}
                    />
                    <Tooltip contentStyle={chartTooltip()} />
                    <Line type="monotone" dataKey="plan" stroke={CHART_AXIS.muted} strokeWidth={2} strokeDasharray="6 4" dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="actual" stroke={CHART.accent} strokeWidth={2.5} dot={{ r: 4, cursor: 'pointer' }} />
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
        </div>

        {homeEmbed ? (
          <div className="shrink-0 border-t border-ink-200/90 bg-canvas-sunken/30 px-4 py-3">
            <div className="text-2xs font-mono uppercase tracking-wide text-ink-500 mb-1">Tableau Coworker on this canvas</div>
            <p className="text-xs text-ink-800 m-0 leading-relaxed">
              {sel ? (
                <>
                  <span className="font-semibold text-ink-900">{agent.title}.</span>{' '}
                  <span className="text-ink-600 line-clamp-3">{agent.body}</span>
                </>
              ) : (
                <>
                  Tap a KPI, week, bar, or row — the same read model as Pulse + Agent, but{' '}
                  <strong className="font-semibold text-ink-900">default on the surface</strong>, not buried in a side panel.
                </>
              )}
            </p>
            <Link
              to="/flows/maya"
              className="inline-flex items-center gap-1 mt-2.5 text-xs font-medium text-accent hover:underline underline-offset-2"
            >
              Full Maya walkthrough with dock + handoff
              <span aria-hidden> →</span>
            </Link>
          </div>
        ) : (
          <AgentDock
            insight={agent}
            followups={['Why did West drop?', 'Which deals moved?', 'Compare regions']}
            onFollowup={q => setSel({ kind: 'followup', q })}
            onClear={() => setSel(null)}
            selectionActive={!!sel}
            productTagline={dockTag}
            dataSurface={MAYA_AGENT_DATA_SURFACE}
          />
        )}
      </div>
    </div>
  )
}
