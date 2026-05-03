import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Sparkle, Layers, Clock } from '../Icons'
import { Sparkline } from '../viz/DataViz'
import AgentDock, { type AgentInsight } from './AgentDock'
import { CHART, CHART_AXIS, CHART_FONT_MONO, chartTooltip } from './chartTokens'
import { JORDAN_QUEUE_COPY, JORDAN_TENANT } from './jordanDemoContext'
import { DEMO_PRESET_STRIP_HELP, JumpPresetButton, JumpStateStrip } from './JumpStateStrip'
import { JORDAN_AGENT_DATA_SURFACE } from '../../data/personaFlowMeta'

const CAP = `${import.meta.env.BASE_URL}captures/`

/** Scene 01 · Sprawl — evidence `key/03-dashboard-sprawl.png` */
const SPRAWL_VIEWS = [
  { name: 'Overview', load: 100 },
  { name: 'Profit Map', load: 72 },
  { name: 'Product Mix', load: 58 },
  { name: 'Regional', load: 54 },
  { name: 'Trends', load: 48 },
  { name: 'Shipping', load: 41 },
  { name: 'Returns', load: 36 },
  { name: 'People', load: 32 },
  { name: 'Stories', load: 28 },
]

const sprawlTotalLoad = SPRAWL_VIEWS.reduce((s, v) => s + v.load, 0)
const sprawlTop3Load = [...SPRAWL_VIEWS]
  .sort((a, b) => b.load - a.load)
  .slice(0, 3)
  .reduce((s, v) => s + v.load, 0)
const SPRAWL_PIE = [
  { name: 'Top 3 sheets', value: sprawlTop3Load, segment: 'top3' as const },
  { name: 'Other 6 views', value: sprawlTotalLoad - sprawlTop3Load, segment: 'tail' as const },
]

type SprawlSel =
  | { kind: 'view'; name: string; load: number }
  | { kind: 'workbook' }
  | { kind: 'followup'; q: string }
  | { kind: 'concentration'; segment: 'top3' | 'tail' }
  | null

function agentSprawl(sel: SprawlSel): AgentInsight {
  if (!sel) {
    return {
      title: 'Sprawl read',
      body:
        'Nine views ship in one workbook on the Superstore sample — a faithful proxy for tenant sprawl. Bars, donut, and workbook header all bind the dock — hover bars for emphasis before you click.',
      confidence: 'moderate',
    }
  }
  if (sel.kind === 'workbook') {
    return {
      title: 'Single workbook · many surfaces',
      body:
        `Jordan’s ${JORDAN_TENANT.workbooks}-workbook tenant scales this pattern: alphabetical sort, no health score, no canonical marker. Curation queue (next step) is computed — not toggled in Site settings.`,
      confidence: 'high',
    }
  }
  if (sel.kind === 'followup') {
    return {
      title: 'Follow-up',
      body:
        sel.q === 'Which are canonical?'
          ? 'Heuristic: most-opened workbook per subject area in 90d, crossed with Jordan publishes — prototype highlights conflicts, not moral judgments.'
          : 'Stale here means zero qualifying opens in 90d with active downstream subscribers — PDF schedules count as “opens” only when humans click through.',
      confidence: 'moderate',
    }
  }
  if (sel.kind === 'concentration') {
    const topPct = Math.round((sprawlTop3Load / sprawlTotalLoad) * 100)
    return sel.segment === 'top3'
      ? {
          title: 'Attention concentration',
          body: `Top three sheets hold ~${topPct}% of modeled opens in this workbook — good for a “hero” narrative, bad for knowing which tail views are dead weight. Hover bars for share; pie encodes the same split.`,
          confidence: 'moderate · prototype weights',
        }
      : {
          title: 'The long tail',
          body:
            'Six views split the remainder — each looks small in isolation, but together they burn share links, schedules, and “which tab?” tax. That is the curation-queue math in the next step.',
          confidence: 'moderate · prototype weights',
        }
  }
  return {
    title: `View · ${sel.name}`,
    body: `${sel.name} carries ${sel.load}% of last-90d opens in this workbook — illustrative. The sprawl issue isn’t that nine tabs exist; it’s that no surface says which ones still earn their keep.`,
    confidence: 'low on load share — structure is real',
  }
}

export function JordanSprawlBoard({ presetStrip = false }: { presetStrip?: boolean }) {
  const [sel, setSel] = useState<SprawlSel>(null)
  const [barHover, setBarHover] = useState<number | null>(null)
  const insight = useMemo(() => agentSprawl(sel), [sel])
  const idx = sel?.kind === 'view' ? SPRAWL_VIEWS.findIndex(v => v.name === sel.name) : -1
  const pieActive = sel?.kind === 'concentration' ? (sel.segment === 'top3' ? 0 : 1) : -1

  return (
    <div className="rounded-xl border border-ink-200 bg-canvas-raised overflow-hidden shadow-sm">
      <div className="flex flex-col xl:flex-row xl:items-stretch">
        <div className="flex-1 min-w-0 border-b xl:border-b-0 xl:border-r border-ink-100">
          <div className="px-4 py-4 border-b border-ink-100 bg-gradient-to-br from-accent-soft/45 via-canvas to-canvas-sunken/40">
            <div className="text-2xs font-mono uppercase tracking-[0.14em] text-accent-ink">{JORDAN_TENANT.moment}</div>
            <p className="text-sm text-ink-800 m-0 mt-2 leading-relaxed max-w-3xl">
              Maya asked whether <span className="font-mono text-xs text-ink-700">{JORDAN_TENANT.mayaAsk}</span> — Jordan opens the
              tenant and maps <strong className="font-semibold text-ink-900">attention vs sprawl</strong> before touching the queue.
            </p>
          </div>
          <div className="p-4 md:p-5 space-y-5 bg-canvas">
            {presetStrip ? (
              <JumpStateStrip
                label="Jump sprawl state"
                description={DEMO_PRESET_STRIP_HELP}
                className="pb-3 mb-1 -mx-4 md:-mx-5 px-4 md:px-5"
              >
                <JumpPresetButton tone="neutral" active={sel === null} onClick={() => setSel(null)}>
                  Idle
                </JumpPresetButton>
                <JumpPresetButton
                  active={sel?.kind === 'view' && sel.name === 'Overview'}
                  onClick={() => setSel({ kind: 'view', name: 'Overview', load: 100 })}
                >
                  Overview · 100%
                </JumpPresetButton>
                <JumpPresetButton active={sel?.kind === 'workbook'} onClick={() => setSel({ kind: 'workbook' })}>
                  Workbook meta
                </JumpPresetButton>
                <JumpPresetButton
                  active={sel?.kind === 'concentration' && sel.segment === 'top3'}
                  onClick={() => setSel({ kind: 'concentration', segment: 'top3' })}
                >
                  Top-3 pie
                </JumpPresetButton>
                <JumpPresetButton
                  active={sel?.kind === 'concentration' && sel.segment === 'tail'}
                  onClick={() => setSel({ kind: 'concentration', segment: 'tail' })}
                >
                  Tail pie
                </JumpPresetButton>
                <JumpPresetButton
                  active={sel?.kind === 'followup' && sel.q === 'Which are canonical?'}
                  onClick={() => setSel({ kind: 'followup', q: 'Which are canonical?' })}
                >
                  Canonical?
                </JumpPresetButton>
              </JumpStateStrip>
            ) : null}
            <button
              type="button"
              onClick={() => setSel({ kind: 'workbook' })}
              className={`group w-full text-left rounded-xl border px-4 py-3.5 transition-all duration-200 ease-smooth ${
                sel?.kind === 'workbook'
                  ? 'border-accent bg-accent-soft/45 ring-2 ring-accent/25 shadow-sm'
                  : 'border-ink-200 bg-canvas-raised hover:border-accent/35 hover:shadow-md'
              }`}
            >
              <div className="text-2xs font-mono uppercase text-ink-500 mb-1 group-hover:text-accent-ink transition-colors">
                Workbook · Superstore sample
              </div>
              <div className="text-sm font-semibold text-ink-900">9 views published together — click for workbook-level read in dock</div>
            </button>
            <div className="rounded-xl border border-ink-100 overflow-hidden bg-canvas-sunken/20">
              <img
                src={`${CAP}key/03-dashboard-sprawl.png`}
                alt="Tableau Superstore workbook — nine views in a single dashboard"
                className="block w-full"
              />
            </div>
            <div className="grid lg:grid-cols-5 gap-4">
              <div className="lg:col-span-3 card p-4 md:p-5 shadow-sm border-ink-200/80">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div>
                    <div className="text-sm font-semibold text-ink-900">Observed open share · by view</div>
                    <div className="text-2xs text-ink-500 font-mono mt-1">Prototype weights · hover · click selects</div>
                  </div>
                  <span className="pill bg-signal-soft text-signal-ink text-2xs shrink-0">Interactive</span>
                </div>
                <div className="h-[280px] w-full mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={SPRAWL_VIEWS} layout="vertical" margin={{ top: 8, right: 16, left: 78, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 6" stroke={CHART.grid} horizontal={false} />
                      <XAxis type="number" domain={[0, 100]} tickFormatter={v => `${v}%`} tick={{ fontSize: 10, fill: CHART_AXIS.tick, fontFamily: CHART_FONT_MONO }} />
                      <YAxis type="category" dataKey="name" width={74} tick={{ fontSize: 10, fill: CHART_AXIS.label }} axisLine={false} tickLine={false} />
                      <Tooltip
                        cursor={{ fill: 'rgba(91, 46, 145, 0.06)' }}
                        formatter={(v: number) => [`${v}%`, 'Open share']}
                        contentStyle={chartTooltip({
                          borderRadius: 10,
                          border: `1px solid ${CHART.grid}`,
                          boxShadow: '0 8px 24px rgba(14,15,18,0.08)',
                        })}
                      />
                      <Bar
                        dataKey="load"
                        radius={[0, 8, 8, 0]}
                        cursor="pointer"
                        activeBar={{ fill: CHART.signal, fillOpacity: 0.92 }}
                        onClick={(_d: unknown, i: number) => {
                          const row = SPRAWL_VIEWS[i]
                          if (row) setSel({ kind: 'view', name: row.name, load: row.load })
                        }}
                        onMouseLeave={() => setBarHover(null)}
                        onMouseEnter={(_d: unknown, i: number) => setBarHover(i)}
                      >
                        {SPRAWL_VIEWS.map((_, i) => {
                          const selected = i === idx
                          const dim = idx >= 0 && i !== idx
                          const hover = barHover === i
                          const fill = selected ? CHART.accentInk : hover ? CHART.signal : CHART.accent
                          return (
                            <Cell
                              key={i}
                              fill={fill}
                              fillOpacity={dim ? 0.32 : hover && !selected ? 0.88 : 1}
                              className="transition-[fill-opacity] duration-150"
                            />
                          )
                        })}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="lg:col-span-2 card p-4 md:p-5 shadow-sm border-ink-200/80 flex flex-col">
                <div className="text-sm font-semibold text-ink-900 mb-0.5">Attention split</div>
                <div className="text-2xs text-ink-500 font-mono mb-2">Donut · click a slice for dock read</div>
                <div className="flex-1 min-h-[220px] w-full relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={SPRAWL_PIE}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={58}
                        outerRadius={82}
                        paddingAngle={2}
                        strokeWidth={2}
                        stroke={CHART.canvasPage}
                        cursor="pointer"
                        onClick={(_d, i: number) => {
                          const row = SPRAWL_PIE[i]
                          if (row) setSel({ kind: 'concentration', segment: row.segment })
                        }}
                      >
                        {SPRAWL_PIE.map((entry, i) => (
                          <Cell
                            key={entry.segment}
                            fill={entry.segment === 'top3' ? CHART.accent : CHART.signal}
                            fillOpacity={pieActive >= 0 && i !== pieActive ? 0.35 : 1}
                            className="outline-none focus:opacity-100"
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(v: number, name: string) => [`${v} index units`, name]}
                        contentStyle={chartTooltip({ borderRadius: 10, border: `1px solid ${CHART.grid}` })}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="font-mono text-xl text-ink-900 tabular-nums leading-none">
                        {Math.round((sprawlTop3Load / sprawlTotalLoad) * 100)}%
                      </div>
                      <div className="text-2xs text-ink-500 font-mono mt-1">top 3</div>
                    </div>
                  </div>
                </div>
                <p className="text-2xs text-ink-600 leading-relaxed mt-2 m-0">
                  Same workbook as the capture — concentration is a curator signal, not vanity traffic.
                </p>
              </div>
            </div>
          </div>
        </div>
        <AgentDock
          insight={insight}
          followups={['Which are canonical?', 'How is stale defined?']}
          onFollowup={q => setSel({ kind: 'followup', q })}
          onClear={() => setSel(null)}
          selectionActive={!!sel}
          productTagline="Workbook sprawl · observed open share"
          dataSurface={JORDAN_AGENT_DATA_SURFACE}
        />
      </div>
    </div>
  )
}

const PORTFOLIO_SEGS = JORDAN_TENANT.portfolio.map(p => ({ ...p }))

const PORTFOLIO_PIE = PORTFOLIO_SEGS.map(p => ({
  name: p.label,
  value: p.pct,
  id: p.id,
  fill: p.color,
}))

const QUEUE_ITEMS = [
  {
    id: 'q1' as const,
    tone: 'warning' as const,
    title: 'West Region — Weekly Pipe v4',
    meta: 'last open · 94d ago · viewers 90d · 2',
    reason:
      'Both viewers now default-open Revenue Command Center. This workbook still publishes West_Coverage_v4 — downstream risk: low, but it creates conflicting URLs in Slack history.',
  },
  {
    id: 'q2' as const,
    tone: 'warning' as const,
    title: 'Q4 Board — Backup / do not edit',
    meta: 'opens 90d · 0',
    reason:
      'Created for a single deck read in November. No scheduled refresh. Deprecating loses nothing except a bookmark three people forgot they had.',
  },
  {
    id: 'q3' as const,
    tone: 'accent' as const,
    title: 'Pipeline Health Tracker ↔ Sales Pipeline by Region',
    meta: 'overlap · 3 charts · model · RevOps Master',
    reason:
      'Same regions, same time grain. Tracker adds a forecast band Region lacks. Recommended merge target: Pipeline — single source (v2) — canonical Jordan published 18 days ago.',
  },
  {
    id: 'q4' as const,
    tone: 'danger' as const,
    title: 'Exec ARR roll-up (Finance)',
    meta: 'drift · $2.1M vs v2',
    reason:
      "ARR_PACING still binds to legacy pipeline LOD. Maya's Monday briefing uses Pipeline Coverage v2. This workbook still teaches the old story to the board pack exporter.",
  },
]

const QUEUE_ROW_SPARKS: Record<(typeof QUEUE_ITEMS)[number]['id'], number[]> = {
  q1: [3, 4, 3, 5, 4, 6, 5, 7],
  q2: [8, 6, 4, 2, 1, 1, 0, 0],
  q3: [2, 3, 4, 5, 6, 5, 4, 4],
  q4: [1, 2, 3, 6, 8, 9, 10, 11],
}

const QUEUE_SEVERITY_BARS = [
  { id: 'stale' as const, label: 'Stale', count: JORDAN_TENANT.tiles.stale },
  { id: 'dup' as const, label: 'Duplicates', count: JORDAN_TENANT.tiles.dup },
  { id: 'dq' as const, label: 'Data-quality', count: JORDAN_TENANT.tiles.dq },
]

type QueueSel =
  | { kind: 'seg'; id: 'active' | 'stale' | 'dup' | 'dq' }
  | { kind: 'row'; id: (typeof QUEUE_ITEMS)[number]['id'] }
  | { kind: 'tile'; id: 'stale' | 'dup' | 'dq' }
  | { kind: 'why' }
  | { kind: 'followup'; q: string }
  | null

function agentQueue(sel: QueueSel): AgentInsight {
  if (!sel) {
    return {
      title: 'Curation queue',
      body:
        'Stacked bar, donut, severity chart, tiles, and rows all drive the same dock — hover charts for affordance, click to pin a curator read. Ordering mixes observed triage with dependency edges.',
      confidence: 'moderate',
    }
  }
  if (sel.kind === 'seg') {
    const row = PORTFOLIO_SEGS.find(s => s.id === sel.id)!
    return {
      title: row.label,
      body: `${row.pct}% of the ${JORDAN_TENANT.workbooks}-workbook tenant maps to this bucket — computed from opens, overlaps, and lineage drift. Tap a queue row to tie a human story to the math.`,
      confidence: 'moderate',
    }
  }
  if (sel.kind === 'tile') {
    const t = JORDAN_TENANT.tiles
    const m = {
      stale: {
        title: 'Stale tile',
        body: `${t.stale} workbooks crossed the 90d no-human-open bar while still attaching subscribers.`,
        confidence: 'high',
      },
      dup: {
        title: 'Duplicates tile',
        body: `${t.dup} pairs flagged by chart overlap + same model LOD — merge candidates surfaced with a canonical target.`,
        confidence: 'high',
      },
      dq: {
        title: 'Data-quality',
        body: `${t.dq} open definition conflicts — largest is Finance Exec ARR vs v2 coverage bind.`,
        confidence: 'high',
      },
    }
    return m[sel.id]
  }
  if (sel.kind === 'row') {
    const row = QUEUE_ITEMS.find(q => q.id === sel.id)!
    return {
      title: row.title,
      body: row.reason,
      confidence: row.tone === 'danger' ? 'high' : 'moderate',
    }
  }
  if (sel.kind === 'why') {
    return {
      title: 'Queue ordering',
      body: JORDAN_QUEUE_COPY.orderingNote,
      confidence: 'moderate',
    }
  }
  if (sel.kind === 'followup') {
    return {
      title: 'Follow-up',
      body:
        sel.q === 'Batch merges?'
          ? 'Batch Pipeline pair after Finance remap — fewer duplicate rows before stale sweeps.'
          : 'Optional owner nudge with template: «definition conflict resolved — verify bookmark URLs». Reduces silent surprises.',
      confidence: 'low',
    }
  }
  const _exhaustive: never = sel
  return { title: '', body: String(_exhaustive), confidence: 'low' }
}

function SummaryTile({
  icon,
  count,
  label,
  tone,
  onClick,
  active,
}: {
  icon: ReactNode
  count: string
  label: string
  tone: 'warning' | 'accent' | 'danger'
  onClick: () => void
  active: boolean
}) {
  const toneClass =
    tone === 'warning'
      ? 'border-warning/30 bg-warning-soft text-warning'
      : tone === 'accent'
        ? 'border-accent/30 bg-accent-soft text-accent-ink'
        : 'border-danger/30 bg-danger-soft text-danger'
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border p-3.5 text-left w-full transition-all duration-200 ease-smooth ${toneClass} ${
        active ? 'ring-2 ring-signal/40 shadow-sm' : 'hover:shadow-sm'
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-2xs uppercase tracking-wider font-mono font-semibold">{label}</span>
      </div>
      <div className="font-mono text-2xl font-semibold tabular-nums text-ink-900 leading-none">{count}</div>
    </button>
  )
}

function QueueRow({
  tone,
  title,
  meta,
  reason,
  onClick,
  active,
  spark,
}: {
  tone: 'warning' | 'accent' | 'danger'
  title: string
  meta: string
  reason?: string
  onClick: () => void
  active: boolean
  spark?: number[]
}) {
  const dotClass = tone === 'warning' ? 'bg-warning' : tone === 'accent' ? 'bg-accent' : 'bg-danger'
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-start gap-3 p-3.5 rounded-xl w-full text-left border transition-all duration-200 ease-smooth ${
        active
          ? 'border-accent bg-accent-soft/35 ring-2 ring-accent/20 shadow-sm'
          : 'bg-canvas-raised border-ink-200 hover:border-accent/30 hover:shadow-sm'
      }`}
    >
      <span className={`dot ${dotClass} mt-1.5 shrink-0`} />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-ink-900">{title}</div>
        {reason ? <div className="text-xs text-ink-600 mt-1.5 leading-relaxed line-clamp-3">{reason}</div> : null}
        {spark && spark.length > 1 ? (
          <div className="mt-2 max-w-[200px]">
            <Sparkline values={spark} stroke={tone === 'danger' ? CHART.danger : tone === 'accent' ? CHART.accent : CHART.warning} height={22} />
          </div>
        ) : null}
      </div>
      <div className="text-2xs text-ink-400 font-mono shrink-0 text-right max-w-[38%] leading-snug">{meta}</div>
    </button>
  )
}

export function JordanQueueBoard({ presetStrip = false }: { presetStrip?: boolean }) {
  const [sel, setSel] = useState<QueueSel>(null)
  const insight = useMemo(() => agentQueue(sel), [sel])
  const segPieIdx = sel?.kind === 'seg' ? PORTFOLIO_PIE.findIndex(p => p.id === sel.id) : -1
  const tileBarIdx = sel?.kind === 'tile' ? QUEUE_SEVERITY_BARS.findIndex(b => b.id === sel.id) : -1

  return (
    <div className="rounded-xl border border-ink-200 bg-canvas-raised overflow-hidden shadow-sm">
      <div className="flex flex-col xl:flex-row xl:items-stretch">
        <div className="flex-1 min-w-0 p-6 min-h-[460px] border-b xl:border-b-0 xl:border-r border-ink-100 bg-gradient-to-b from-canvas via-canvas to-canvas-sunken/25 space-y-5">
          {presetStrip ? (
            <JumpStateStrip label="Jump queue state" description={DEMO_PRESET_STRIP_HELP} className="py-2.5 -mt-1 mb-1">
              <JumpPresetButton tone="neutral" active={sel === null} onClick={() => setSel(null)}>
                Idle
              </JumpPresetButton>
              <JumpPresetButton
                active={sel?.kind === 'seg' && sel.id === 'stale'}
                onClick={() => setSel({ kind: 'seg', id: 'stale' })}
              >
                Stale segment
              </JumpPresetButton>
              <JumpPresetButton active={sel?.kind === 'tile' && sel.id === 'dq'} onClick={() => setSel({ kind: 'tile', id: 'dq' })}>
                DQ summary
              </JumpPresetButton>
              <JumpPresetButton active={sel?.kind === 'row' && sel.id === 'q4'} onClick={() => setSel({ kind: 'row', id: 'q4' })}>
                Finance row
              </JumpPresetButton>
              <JumpPresetButton active={sel?.kind === 'row' && sel.id === 'q3'} onClick={() => setSel({ kind: 'row', id: 'q3' })}>
                Duplicate pair
              </JumpPresetButton>
              <JumpPresetButton active={sel?.kind === 'why'} onClick={() => setSel({ kind: 'why' })}>
                Why order
              </JumpPresetButton>
            </JumpStateStrip>
          ) : null}
          <div className="flex items-baseline justify-between">
            <div>
              <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Curation queue · for Jordan</div>
              <div className="editorial text-xl text-ink-900">{JORDAN_TENANT.queueThisWeek} items · this week</div>
            </div>
            <div className="text-xs text-ink-500 font-mono">Updated {JORDAN_TENANT.updatedAgo}</div>
          </div>

          <div className="grid lg:grid-cols-2 gap-4 items-stretch">
            <div className="card p-4 md:p-5 border-ink-200/80 shadow-sm space-y-3">
              <div>
                <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-2">Tenant portfolio · observed health</div>
                <div
                  className="flex h-3.5 rounded-full overflow-hidden border border-ink-200 shadow-inner"
                  role="img"
                  aria-label="Portfolio mix"
                >
                  {PORTFOLIO_SEGS.map(s => (
                    <button
                      key={s.id}
                      type="button"
                      style={{ width: `${s.pct}%`, backgroundColor: s.color }}
                      className="h-full min-w-[12px] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas cursor-pointer transition-transform duration-150 ease-smooth hover:brightness-105 hover:scale-y-110 origin-center"
                      title={`${s.label}: ${s.pct}%`}
                      onClick={() => setSel({ kind: 'seg', id: s.id })}
                    />
                  ))}
                </div>
              </div>
              <ul className="grid grid-cols-2 gap-2 text-2xs">
                {PORTFOLIO_SEGS.map(s => (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => setSel({ kind: 'seg', id: s.id })}
                      className={`flex items-center gap-2 text-ink-700 text-left rounded-lg px-2 py-1 w-full transition-colors ${
                        sel?.kind === 'seg' && sel.id === s.id ? 'bg-accent-soft/60 ring-1 ring-accent/25' : 'hover:bg-ink-100/80'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-sm shrink-0" style={{ backgroundColor: s.color }} />
                      <span className="truncate">{s.label}</span>
                      <span className="font-mono text-ink-500 tabular-nums">{s.pct}%</span>
                    </button>
                  </li>
                ))}
              </ul>
              <p className="text-2xs text-ink-500 font-mono m-0">
                n = {JORDAN_TENANT.workbooks} workbooks · Acme tenant · observed opens 90d
              </p>
            </div>
            <div className="card p-4 md:p-5 border-ink-200/80 shadow-sm flex flex-col">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-sm font-semibold text-ink-900">Same mix · donut</div>
                  <div className="text-2xs text-ink-500 font-mono mt-0.5">Click a slice · dock binds</div>
                </div>
                <span className="pill bg-signal-soft text-signal-ink text-2xs">Interactive</span>
              </div>
              <div className="flex-1 min-h-[200px] w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={PORTFOLIO_PIE}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={52}
                      outerRadius={76}
                      paddingAngle={1.5}
                      strokeWidth={2}
                      stroke={CHART.canvasPage}
                      cursor="pointer"
                      onClick={(_e, i: number) => {
                        const row = PORTFOLIO_PIE[i]
                        if (row) setSel({ kind: 'seg', id: row.id })
                      }}
                    >
                      {PORTFOLIO_PIE.map((entry, i) => (
                        <Cell
                          key={entry.id}
                          fill={entry.fill}
                          fillOpacity={segPieIdx >= 0 && i !== segPieIdx ? 0.3 : 1}
                          className="outline-none"
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(v: number) => [`${v}%`, 'Share']}
                      contentStyle={chartTooltip({ borderRadius: 10, border: `1px solid ${CHART.grid}` })}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="card p-4 md:p-5 border-ink-200/80 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="text-sm font-semibold text-ink-900">Queue pressure · flags this week</div>
              <span className="text-2xs font-mono text-ink-500">Hover · click selects summary tile in dock</span>
            </div>
            <div className="h-[132px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={QUEUE_SEVERITY_BARS} layout="vertical" margin={{ top: 4, right: 12, left: 100, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 6" stroke={CHART.grid} horizontal={false} />
                  <XAxis type="number" domain={[0, 12]} tick={{ fontSize: 10, fill: CHART_AXIS.tick }} />
                  <YAxis type="category" dataKey="label" width={96} tick={{ fontSize: 11, fill: CHART_AXIS.label }} axisLine={false} tickLine={false} />
                  <Tooltip
                    cursor={{ fill: 'rgba(199, 132, 28, 0.08)' }}
                    formatter={(v: number) => [v, 'Items']}
                    contentStyle={chartTooltip({ borderRadius: 10, border: `1px solid ${CHART.grid}` })}
                  />
                  <Bar
                    dataKey="count"
                    radius={[0, 8, 8, 0]}
                    cursor="pointer"
                    activeBar={{ fill: CHART.signal, fillOpacity: 0.85 }}
                    onClick={(_d: unknown, i: number) => {
                      const row = QUEUE_SEVERITY_BARS[i]
                      if (row) setSel({ kind: 'tile', id: row.id })
                    }}
                  >
                    {QUEUE_SEVERITY_BARS.map((b, i) => {
                      const fill = b.id === 'stale' ? CHART.warning : b.id === 'dup' ? CHART.accent : CHART.danger
                      const dim = tileBarIdx >= 0 && i !== tileBarIdx
                      return <Cell key={b.id} fill={fill} fillOpacity={dim ? 0.35 : 1} />
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <SummaryTile
              icon={<Clock size={14} />}
              count={String(JORDAN_TENANT.tiles.stale)}
              label="Stale"
              tone="warning"
              onClick={() => setSel({ kind: 'tile', id: 'stale' })}
              active={sel?.kind === 'tile' && sel.id === 'stale'}
            />
            <SummaryTile
              icon={<Layers size={14} />}
              count={String(JORDAN_TENANT.tiles.dup)}
              label="Duplicates"
              tone="accent"
              onClick={() => setSel({ kind: 'tile', id: 'dup' })}
              active={sel?.kind === 'tile' && sel.id === 'dup'}
            />
            <SummaryTile
              icon={<Sparkle size={14} />}
              count={String(JORDAN_TENANT.tiles.dq)}
              label="Data-quality flags"
              tone="danger"
              onClick={() => setSel({ kind: 'tile', id: 'dq' })}
              active={sel?.kind === 'tile' && sel.id === 'dq'}
            />
          </div>

          <div className="space-y-2">
            {QUEUE_ITEMS.map(q => (
              <QueueRow
                key={q.id}
                tone={q.tone}
                title={q.title}
                meta={q.meta}
                reason={q.reason}
                spark={QUEUE_ROW_SPARKS[q.id]}
                onClick={() => setSel({ kind: 'row', id: q.id })}
                active={sel?.kind === 'row' && sel.id === q.id}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setSel({ kind: 'why' })}
            className={`w-full text-left text-sm text-ink-600 border rounded-xl p-4 bg-canvas-raised transition-all duration-200 ease-smooth ${
              sel?.kind === 'why' ? 'border-signal ring-2 ring-signal/25 shadow-sm' : 'border-ink-200 hover:border-ink-300'
            }`}
          >
            <span className="font-medium text-ink-800">Why I&apos;m seeing this queue order</span>
            <p className="mt-2 leading-relaxed text-xs">
              Triage habit + dependency graph — tap to pin the ordering rationale in the dock.
            </p>
          </button>
        </div>

        <AgentDock
          insight={insight}
          followups={['Batch merges?', 'Notify owners?']}
          onFollowup={q => setSel({ kind: 'followup', q })}
          onClear={() => setSel(null)}
          selectionActive={!!sel}
          productTagline="Curation queue · triage order"
          dataSurface={JORDAN_AGENT_DATA_SURFACE}
        />
      </div>
    </div>
  )
}

const DRIFT_ROWS = [
  { wb: 'Exec ARR (Finance)', legacy: 12.4, v2: 10.3 },
  { wb: 'West Weekly v4', legacy: 4.1, v2: 3.9 },
  { wb: 'Board pack feed', legacy: 11.0, v2: 8.9 },
]

/** Illustrative weekly decline in tenant-wide definition conflicts — supports velocity read in dock */
const CLEARING_TREND = [
  { w: 'W1', issues: 5 },
  { w: 'W2', issues: 5 },
  { w: 'W3', issues: 4 },
  { w: 'W4', issues: 4 },
  { w: 'W5', issues: 3 },
  { w: 'W6', issues: 2 },
]

type DiagnoseSel =
  | { kind: 'wb'; name: string }
  | { kind: 'node'; id: 'field' | 'workbook' | 'board' }
  | { kind: 'capture' }
  | { kind: 'clearing'; idx: number }
  | { kind: 'followup'; q: string }
  | null

function agentDiagnose(sel: DiagnoseSel): AgentInsight {
  if (!sel) {
    return {
      title: 'Diagnosis surface',
      body:
        'Drift bars (legacy + v2), lineage chips, remediation curve, and authoring capture all feed the dock — hover bars first; either bar selects the same workbook.',
      confidence: 'moderate',
    }
  }
  if (sel.kind === 'wb') {
    const row = DRIFT_ROWS.find(r => r.wb === sel.name)
    return {
      title: sel.name,
      body: row
        ? `Legacy bind reads ${row.legacy}M ARR pace vs ${row.v2}M on v2 — delta is the staff-meeting risk, not refresh latency.`
        : 'Workbook-level drift — inspect LOD and catalog fingerprint before merge.',
      confidence: 'high',
    }
  }
  if (sel.kind === 'node') {
    const m = {
      field: {
        title: 'ARR_PACING field',
        body: 'Catalog fingerprint matches deprecated LOD text from April 2 — Finance publish never picked up the v2 bind.',
        confidence: 'high',
      },
      workbook: {
        title: 'Finance workbook',
        body: 'Last publish Feb 14 — owner R. Okonkwo. Downstream subscribers include board pack exporter.',
        confidence: 'high',
      },
      board: {
        title: 'Board pack exporter',
        body: 'Pulls Finance Exec ARR into the deck Maya reviews — why this row is elevated in Jordan’s queue.',
        confidence: 'moderate',
      },
    }
    return m[sel.id]
  }
  if (sel.kind === 'clearing') {
    const row = CLEARING_TREND[sel.idx]
    return {
      title: `Definition debt · ${row.w}`,
      body:
        row.issues >= 4
          ? 'Higher conflict bucket earlier in the window — Jordan’s batch clears duplicates first; Finance LOD stayed pinned until this row.'
          : `Down to ${row.issues} open conflicts — velocity is illustrative, but direction matches post-queue behavior before Finance remap.`,
      confidence: 'low on exact counts — high on sequencing story',
    }
  }
  if (sel.kind === 'capture') {
    return {
      title: 'Authoring shell today',
      body:
        'Tableau Agent as tooltip is real — placement argument is governance-first surfacing in the queue.',
      confidence: 'high',
    }
  }
  return {
    title: 'Follow-up',
    body:
      sel.q === 'Remap steps?'
        ? 'Remap ARR_PACING to catalog bind v2_coverage_won, validate desktop + mobile thumbnails, republish, verify downstream PDF.'
        : 'Finance owner confirms; Maya gets passive footnote when board pack refreshes.',
    confidence: 'moderate',
  }
}

export function JordanDiagnoseBoard({ presetStrip = false }: { presetStrip?: boolean }) {
  const [sel, setSel] = useState<DiagnoseSel>(null)
  const insight = useMemo(() => agentDiagnose(sel), [sel])
  const barIdx = sel?.kind === 'wb' ? DRIFT_ROWS.findIndex(r => r.wb === sel.name) : -1
  const clearIdx = sel?.kind === 'clearing' ? sel.idx : -1

  return (
    <div className="rounded-xl border border-ink-200 bg-canvas-raised overflow-hidden shadow-sm">
      <div className="flex flex-col xl:flex-row xl:items-stretch">
        <div className="flex-1 min-w-0 p-6 md:p-8 space-y-6 border-b xl:border-b-0 xl:border-r border-ink-100 bg-gradient-to-b from-canvas to-canvas-sunken/20">
          {presetStrip ? (
            <JumpStateStrip label="Jump diagnose state" description={DEMO_PRESET_STRIP_HELP} className="pb-4 mb-2">
              <JumpPresetButton tone="neutral" active={sel === null} onClick={() => setSel(null)}>
                Idle
              </JumpPresetButton>
              <JumpPresetButton
                active={sel?.kind === 'wb' && sel.name === 'Exec ARR (Finance)'}
                onClick={() => setSel({ kind: 'wb', name: 'Exec ARR (Finance)' })}
              >
                Finance drift bar
              </JumpPresetButton>
              <JumpPresetButton active={sel?.kind === 'node' && sel.id === 'field'} onClick={() => setSel({ kind: 'node', id: 'field' })}>
                Field node
              </JumpPresetButton>
              <JumpPresetButton active={sel?.kind === 'capture'} onClick={() => setSel({ kind: 'capture' })}>
                Authoring capture
              </JumpPresetButton>
              <JumpPresetButton active={sel?.kind === 'clearing' && sel.idx === 5} onClick={() => setSel({ kind: 'clearing', idx: 5 })}>
                W6 curve
              </JumpPresetButton>
              <JumpPresetButton
                active={sel?.kind === 'followup' && sel.q === 'Remap steps?'}
                onClick={() => setSel({ kind: 'followup', q: 'Remap steps?' })}
              >
                Remap Q
              </JumpPresetButton>
            </JumpStateStrip>
          ) : null}
          <div>
            <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-2">Row D · Exec ARR roll-up (Finance)</div>
            <div className="rounded-md border border-danger/25 bg-danger-soft/30 px-4 py-4 text-sm text-ink-800 space-y-3">
              <p>
                <strong>Exec ARR roll-up (Finance)</strong> binds <code className="font-mono text-xs bg-canvas px-1 rounded">ARR_PACING</code> to
                the legacy LOD you deprecated on <strong>April 2</strong>.
              </p>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    ['field', 'Catalog field'],
                    ['workbook', 'Workbook publish'],
                    ['board', 'Board pack'],
                  ] as const
                ).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSel({ kind: 'node', id })}
                    className={`text-xs px-3 py-1.5 rounded-md border transition-all duration-150 ease-smooth ${
                      sel?.kind === 'node' && sel.id === id
                        ? 'border-accent bg-accent-soft/50 shadow-sm'
                        : 'border-ink-200 bg-canvas-raised hover:border-accent/35 hover:shadow-sm'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="card p-4 md:p-5 min-h-[240px] border-ink-200/80 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
              <div>
                <div className="text-sm font-semibold text-ink-900">Modeled ARR drift · legacy vs v2 ($M)</div>
                <div className="text-2xs text-ink-500 font-mono mt-1">Hover · click either bar for workbook read</div>
              </div>
              <span className="pill bg-signal-soft text-signal-ink text-2xs">Dual select</span>
            </div>
            <div className="h-[210px] w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DRIFT_ROWS} layout="vertical" margin={{ top: 8, right: 20, left: 108, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 6" stroke={CHART.grid} horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 10, fill: CHART_AXIS.tick }} />
                  <YAxis type="category" dataKey="wb" width={102} tick={{ fontSize: 9, fill: CHART_AXIS.label }} axisLine={false} tickLine={false} />
                  <Tooltip
                    cursor={{ fill: 'rgba(91, 46, 145, 0.06)' }}
                    contentStyle={chartTooltip({ borderRadius: 10, border: `1px solid ${CHART.grid}` })}
                  />
                  <Bar
                    dataKey="legacy"
                    name="legacy"
                    fill={CHART.danger}
                    radius={[0, 6, 6, 0]}
                    cursor="pointer"
                    activeBar={{ fill: CHART.signal, fillOpacity: 0.9 }}
                    onClick={(_d: unknown, i: number) => {
                      const row = DRIFT_ROWS[i]
                      if (row) setSel({ kind: 'wb', name: row.wb })
                    }}
                  >
                    {DRIFT_ROWS.map((_, i) => (
                      <Cell key={i} fillOpacity={barIdx >= 0 && i !== barIdx ? 0.35 : 1} />
                    ))}
                  </Bar>
                  <Bar
                    dataKey="v2"
                    name="v2"
                    fill={CHART.accent}
                    radius={[0, 6, 6, 0]}
                    cursor="pointer"
                    activeBar={{ fill: CHART.accentInk, fillOpacity: 0.92 }}
                    onClick={(_d: unknown, i: number) => {
                      const row = DRIFT_ROWS[i]
                      if (row) setSel({ kind: 'wb', name: row.wb })
                    }}
                  >
                    {DRIFT_ROWS.map((_, i) => (
                      <Cell key={i} fillOpacity={barIdx >= 0 && i !== barIdx ? 0.35 : 1} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card p-4 md:p-5 border-ink-200/80 shadow-sm">
            <div className="text-sm font-semibold text-ink-900 mb-0.5">Tenant definition debt · rolling window</div>
            <div className="text-2xs text-ink-500 font-mono mb-3">Illustrative curve · click points · dock explains pacing</div>
            <div className="h-[160px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CLEARING_TREND} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                  <defs>
                    <linearGradient id="clearGradJordan" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={CHART.accent} stopOpacity={0.22} />
                      <stop offset="100%" stopColor={CHART.accent} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 6" stroke={CHART.grid} vertical={false} />
                  <XAxis dataKey="w" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 6]} tick={{ fontSize: 10, fontFamily: 'JetBrains Mono' }} width={28} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={chartTooltip({ borderRadius: 10, border: `1px solid ${CHART.grid}` })} />
                  <Area
                    type="monotone"
                    dataKey="issues"
                    stroke={CHART.accent}
                    strokeWidth={2}
                    fill="url(#clearGradJordan)"
                    dot={(props: { cx?: number; cy?: number; index?: number }) => {
                      const { cx, cy, index } = props
                      if (cx == null || cy == null || index == null) return <g />
                      const on = index === clearIdx
                      return (
                        <circle
                          role="button"
                          tabIndex={0}
                          cx={cx}
                          cy={cy}
                          r={on ? 9 : 5}
                          fill={on ? CHART.accentInk : CHART.canvas}
                          stroke={CHART.accent}
                          strokeWidth={2}
                          className="cursor-pointer"
                          onClick={() => setSel({ kind: 'clearing', idx: index })}
                        />
                      )
                    }}
                    activeDot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-2">Reference · authoring shell today</div>
            <button type="button" className="block w-full" onClick={() => setSel({ kind: 'capture' })}>
              <img
                src={`${CAP}key/02-web-authoring.png`}
                alt="Tableau web authoring shell — Tableau Agent tooltip visible"
                className={`block w-full rounded-md border ${sel?.kind === 'capture' ? 'border-signal ring-2 ring-signal/30' : 'border-ink-100'}`}
              />
            </button>
          </div>
        </div>

        <AgentDock
          insight={insight}
          followups={['Remap steps?', 'Who confirms?']}
          onFollowup={q => setSel({ kind: 'followup', q })}
          onClear={() => setSel(null)}
          selectionActive={!!sel}
          productTagline="Lineage + authoring receipt"
          dataSurface={JORDAN_AGENT_DATA_SURFACE}
        />
      </div>
    </div>
  )
}

const GOV_POINTS = [
  { day: 'Mon', score: 78 },
  { day: 'Tue', score: 79 },
  { day: 'Wed', score: 80 },
  { day: 'Thu', score: 81 },
  { day: 'Fri', score: 82 },
]

/** Illustrative subscriber mix for v2 publish blast — click bars → “Subscribers” banner + dock */
const SUBSCRIBER_BREAKDOWN = [
  { role: 'RevOps', n: 4 },
  { role: 'Finance', n: 3 },
  { role: 'Field', n: 3 },
  { role: 'Exec readers', n: 2 },
] as const

type ResolveSel =
  | { kind: 'pulse'; idx: number }
  | { kind: 'banner'; id: 'publish' | 'subs' | 'queue' }
  | { kind: 'followup'; q: string }
  | null

function agentResolve(sel: ResolveSel): AgentInsight {
  if (!sel) {
    return {
      title: 'Loop closed',
      body:
        'Gradient pulse line plus subscriber mix chart — hover points, click DOTS or bars, or the receipt sentences. Dock narrates publish, fan-out, and queue closure together.',
      confidence: 'moderate',
    }
  }
  if (sel.kind === 'pulse') {
    const pt = GOV_POINTS[sel.idx]
    return {
      title: `Governance composite · ${pt.day}`,
      body: `Score ${pt.score} — illustrative composite of stale cleared, duplicate rate, and definition conflicts. Low confidence on the exact number; high confidence on visibility.`,
      confidence: 'low',
    }
  }
  if (sel.kind === 'followup') {
    return {
      title: 'Follow-up',
      body:
        sel.q === 'Rollback path?'
          ? 'One-click revert to Apr 30 snapshot for Finance workbook — audit retains both lineage versions.'
          : 'Maya’s briefing adds a passive footnote on next sync; no manual ping required unless board pack job fails.',
      confidence: 'low',
    }
  }
  const m = {
    publish: {
      title: 'Published',
      body: 'Exec ARR roll-up now binds v2 — audit lineage snapshot stored with actor Jordan Patel.',
      confidence: 'high',
    },
    subs: {
      title: 'Subscribers notified',
      body: '12 downstream consumers — Maya and Sam’s surfaces pick up v2 on next sync; loud failure preferred to quiet drift.',
      confidence: 'moderate',
    },
    queue: {
      title: 'Queue state',
      body: 'Row D closed — Row C duplicate merge still open; Jordan batches merges next.',
      confidence: 'high',
    },
  }
  return m[sel.id]
}

export function JordanResolveBoard({ presetStrip = false }: { presetStrip?: boolean }) {
  const [sel, setSel] = useState<ResolveSel>(null)
  const insight = useMemo(() => agentResolve(sel), [sel])
  const pulseIdx = sel?.kind === 'pulse' ? sel.idx : -1
  const subsActive = sel?.kind === 'banner' && sel.id === 'subs'

  return (
    <div className="rounded-xl border border-ink-200 bg-canvas-raised overflow-hidden shadow-sm">
      <div className="flex flex-col xl:flex-row xl:items-stretch">
        <div className="flex-1 min-w-0 p-8 space-y-5 border-b xl:border-b-0 xl:border-r border-ink-100 bg-gradient-to-b from-success-soft/15 via-canvas to-canvas">
          {presetStrip ? (
            <JumpStateStrip label="Jump resolve state" description={DEMO_PRESET_STRIP_HELP} className="pb-4 mb-1">
              <JumpPresetButton tone="neutral" active={sel === null} onClick={() => setSel(null)}>
                Idle
              </JumpPresetButton>
              <JumpPresetButton
                active={sel?.kind === 'banner' && sel.id === 'publish'}
                onClick={() => setSel({ kind: 'banner', id: 'publish' })}
              >
                Published
              </JumpPresetButton>
              <JumpPresetButton
                active={sel?.kind === 'banner' && sel.id === 'subs'}
                onClick={() => setSel({ kind: 'banner', id: 'subs' })}
              >
                Subscribers
              </JumpPresetButton>
              <JumpPresetButton
                active={sel?.kind === 'banner' && sel.id === 'queue'}
                onClick={() => setSel({ kind: 'banner', id: 'queue' })}
              >
                Queue
              </JumpPresetButton>
              <JumpPresetButton active={sel?.kind === 'pulse' && sel.idx === 2} onClick={() => setSel({ kind: 'pulse', idx: 2 })}>
                Wed pulse
              </JumpPresetButton>
            </JumpStateStrip>
          ) : null}
          <div
            className={`rounded-md border border-success/25 bg-success-soft/30 px-4 py-4 text-sm text-ink-800 space-y-2 ${
              sel?.kind === 'banner' && sel.id === 'publish' ? 'ring-2 ring-signal/30' : ''
            }`}
          >
            <button type="button" className="text-left w-full" onClick={() => setSel({ kind: 'banner', id: 'publish' })}>
              <p>
                <strong>Published.</strong> Exec ARR roll-up (Finance) now binds <strong>v2</strong>.
              </p>
            </button>
            <button type="button" className="text-left w-full" onClick={() => setSel({ kind: 'banner', id: 'subs' })}>
              <p>
                <strong>Subscribers notified (12)</strong> — Maya Chen · S. Reyes · …
              </p>
            </button>
            <button type="button" className="text-left w-full" onClick={() => setSel({ kind: 'banner', id: 'queue' })}>
              <p className="text-ink-600">
                Queue · Row D <strong>closed</strong> · duplicate merge (Row C) still open.
              </p>
            </button>
          </div>

          <p className="font-mono text-2xs text-ink-400">
            {JORDAN_TENANT.audit.id} · {JORDAN_TENANT.audit.action} · {JORDAN_TENANT.audit.time} · actor:{' '}
            {JORDAN_TENANT.audit.actor} · audit: lineage snapshot stored
          </p>

          <div className="card p-4 md:p-5 border-ink-200/80 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="text-sm font-semibold text-ink-900">Governance health · composite pulse</div>
              <span className="text-2xs font-mono text-ink-500">Hover · click points</span>
            </div>
            <div className="h-[210px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={GOV_POINTS}
                  margin={{ top: 12, right: 12, left: -12, bottom: 0 }}
                  onClick={e => {
                    if (e?.activeTooltipIndex != null) setSel({ kind: 'pulse', idx: e.activeTooltipIndex })
                  }}
                >
                  <defs>
                    <linearGradient id="govGradJordan" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={CHART.accent} stopOpacity={0.2} />
                      <stop offset="100%" stopColor={CHART.accent} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 6" stroke={CHART.grid} vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: CHART_AXIS.label }} axisLine={false} tickLine={false} />
                  <YAxis domain={[76, 84]} tick={{ fontSize: 10, fontFamily: 'JetBrains Mono' }} width={32} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={chartTooltip({ borderRadius: 10, border: `1px solid ${CHART.grid}` })} />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="none"
                    fill="url(#govGradJordan)"
                    fillOpacity={1}
                    isAnimationActive={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke={CHART.accent}
                    strokeWidth={2.5}
                    dot={(props: { cx?: number; cy?: number; index?: number }) => {
                      const { cx, cy, index } = props
                      if (cx == null || cy == null || index == null) return <g />
                      const active = index === pulseIdx
                      return (
                        <circle
                          role="button"
                          tabIndex={0}
                          cx={cx}
                          cy={cy}
                          r={active ? 9 : 5}
                          fill={active ? CHART.accentInk : CHART.canvas}
                          stroke={CHART.accent}
                          strokeWidth={2}
                          className="cursor-pointer hover:opacity-90"
                          onClick={e => {
                            e.stopPropagation()
                            setSel({ kind: 'pulse', idx: index })
                          }}
                        />
                      )
                    }}
                    activeDot={false}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card p-4 md:p-5 border-ink-200/80 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="text-sm font-semibold text-ink-900">v2 publish · who gets pinged</div>
              <span className="pill bg-signal-soft text-signal-ink text-2xs">n = 12</span>
            </div>
            <p className="text-2xs text-ink-500 font-mono m-0 mb-3">Illustrative cohort · click a bar to pin subscriber narrative</p>
            <div className="h-[148px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[...SUBSCRIBER_BREAKDOWN]} layout="vertical" margin={{ top: 4, right: 16, left: 4, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 6" stroke={CHART.grid} horizontal={false} />
                  <XAxis type="number" domain={[0, 6]} hide />
                  <YAxis type="category" dataKey="role" width={88} tick={{ fontSize: 11, fill: CHART_AXIS.label }} axisLine={false} tickLine={false} />
                  <Tooltip formatter={(v: number) => [v, 'Recipients']} contentStyle={chartTooltip({ borderRadius: 10, border: `1px solid ${CHART.grid}` })} />
                  <Bar
                    dataKey="n"
                    radius={[0, 8, 8, 0]}
                    cursor="pointer"
                    activeBar={{ fill: CHART.signal, fillOpacity: 0.88 }}
                    onClick={() => setSel({ kind: 'banner', id: 'subs' })}
                  >
                    {[...SUBSCRIBER_BREAKDOWN].map((_, i) => (
                      <Cell key={i} fill={i % 2 === 0 ? CHART.accent : CHART.accentInk} fillOpacity={subsActive ? 1 : 0.88} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <p className="annotation editorial text-sm text-ink-700 italic m-0">
            Done. Maya&apos;s Monday surface pulls the same v2 ARR_PACING as Finance. If this breaks Okonkwo&apos;s offline sheet,
            they&apos;ll tell us — and the queue will reopen.
          </p>
        </div>

        <AgentDock
          insight={insight}
          followups={['Rollback path?', 'Alert Maya?']}
          onFollowup={q => setSel({ kind: 'followup', q })}
          onClear={() => setSel(null)}
          selectionActive={!!sel}
          productTagline="Publish loop · downstream readers"
          dataSurface={JORDAN_AGENT_DATA_SURFACE}
        />
      </div>
    </div>
  )
}
