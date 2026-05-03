import { useEffect, useId, useState } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Brush,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Sparkline } from '../viz/DataViz'
import { CHART, CHART_AXIS } from '../dashboard/chartTokens'

/** Fintech-grade: legible ticks, hairline axes, horizontal bands only (no chart junk). */
const tickProps = {
  fill: CHART_AXIS.tick,
  fontSize: 11,
  fontFamily: 'Inter, system-ui, sans-serif',
  fontWeight: 500,
} as const

const xAxisProps = {
  tick: tickProps,
  tickLine: false,
  tickMargin: 8,
  axisLine: { stroke: 'rgba(14, 15, 18, 0.09)', strokeWidth: 1 },
}

const yAxisProps = {
  tick: tickProps,
  tickLine: false,
  axisLine: false,
  width: 36,
}

const marginPlot = { top: 12, right: 14, left: 2, bottom: 6 }
const marginVHBar = { top: 10, right: 16, left: 6, bottom: 6 }

/** Fixed plot height inside ChartFrame (Recharts needs explicit px height, not min-height). */
const CHART_FRAME_PLOT_PX = 192

/** Docs gallery tile — flat surface; separation = border + padding (Robinhood-adjacent). */
function ChartFrame({ label, children }: { label: string; children: React.ReactNode }) {
  const capId = useId()
  return (
    <figure
      className="rounded-2xl border border-ink-200 bg-canvas-raised overflow-hidden"
      aria-labelledby={capId}
    >
      <figcaption
        id={capId}
        className="px-5 py-3 border-b border-ink-200 bg-canvas-sunken/50"
      >
        <span className="text-xs font-semibold text-ink-800 tracking-tight">{label}</span>
        <span className="mt-0.5 block text-[0.65rem] font-mono font-medium uppercase tracking-wide text-ink-500">
          VizSpec demo
        </span>
      </figcaption>
      <div className="bg-canvas-raised p-5">
        <div className="w-full min-w-0" style={{ height: CHART_FRAME_PLOT_PX }}>
          {children}
        </div>
      </div>
    </figure>
  )
}

const W = [
  { x: 'W1', y: 41 },
  { x: 'W2', y: 44 },
  { x: 'W3', y: 43 },
  { x: 'W4', y: 48 },
  { x: 'W5', y: 52 },
  { x: 'W6', y: 49 },
]
const W_STACK = [
  { x: 'Q1', a: 12, b: 8, c: 5 },
  { x: 'Q2', a: 14, b: 7, c: 6 },
  { x: 'Q3', a: 11, b: 9, c: 7 },
  { x: 'Q4', a: 15, b: 6, c: 8 },
]
const MAG = [
  { n: 'East', v: 42 },
  { n: 'West', v: 28 },
  { n: 'Central', v: 35 },
]
const MAG_SORT = [...MAG].sort((a, b) => b.v - a.v)
const DIV = [
  { n: 'Alpha', v: 18 },
  { n: 'Beta', v: -6 },
  { n: 'Gamma', v: 11 },
  { n: 'Delta', v: -14 },
]
const COMBO = [
  { m: 'Jan', rev: 120, margin: 0.22 },
  { m: 'Feb', rev: 132, margin: 0.24 },
  { m: 'Mar', rev: 128, margin: 0.21 },
  { m: 'Apr', rev: 145, margin: 0.26 },
]
const HIST = [
  { b: '0-10', c: 3 },
  { b: '10-20', c: 8 },
  { b: '20-30', c: 14 },
  { b: '30-40', c: 9 },
  { b: '40+', c: 4 },
]
const SCAT = [
  { q: 12, r: 8, z: 120 },
  { q: 18, r: 11, z: 200 },
  { q: 22, r: 9, z: 90 },
  { q: 28, r: 15, z: 160 },
  { q: 35, r: 14, z: 240 },
]
const SLOPE = [
  { cat: 'A', t0: 3, t1: 8 },
  { cat: 'B', t0: 7, t1: 5 },
  { cat: 'C', t0: 4, t1: 9 },
  { cat: 'D', t0: 9, t1: 6 },
]

function MiniAxisChart({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full min-w-0 [&_.recharts-responsive-container]:!h-full">
      <ResponsiveContainer width="100%" height="100%">
        {children as React.ReactElement}
      </ResponsiveContainer>
    </div>
  )
}

/** ComposedChart + unique gradient id (LineChart + Area is unsupported / flaky; duplicate SVG ids break fills). */
function GalleryLineWithArea() {
  const gid = useId().replace(/:/g, '')
  const gradId = `ds-line-fill-${gid}`
  return (
    <MiniAxisChart>
      <ComposedChart data={W} margin={marginPlot}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={CHART.accent} stopOpacity={0.18} />
            <stop offset="100%" stopColor={CHART.accent} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={CHART_AXIS.gridSubtle} strokeWidth={1} vertical={false} />
        <XAxis dataKey="x" {...xAxisProps} />
        <YAxis {...yAxisProps} domain={['dataMin - 2', 'dataMax + 2']} />
        <Area type="monotone" dataKey="y" stroke="none" fill={`url(#${gradId})`} fillOpacity={1} isAnimationActive={false} />
        <Line
          type="monotone"
          dataKey="y"
          stroke={CHART.accent}
          strokeWidth={2.25}
          strokeLinecap="round"
          isAnimationActive={false}
          dot={props => {
            const { cx, cy, index } = props
            if (index !== W.length - 1) return <g />
            return <circle cx={cx} cy={cy} r={5} fill={CHART.accent} stroke="#fff" strokeWidth={2} />
          }}
          activeDot={{ r: 6, fill: CHART.accent, stroke: '#fff', strokeWidth: 2 }}
        />
      </ComposedChart>
    </MiniAxisChart>
  )
}

export function DesignSystemUISamples() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 items-center">
        <button type="button" className="btn-primary text-sm">
          Primary
        </button>
        <button type="button" className="btn-accent text-sm">
          Accent
        </button>
        <button type="button" className="btn-secondary text-sm">
          Secondary
        </button>
        <button type="button" className="btn-ghost text-sm">
          Ghost
        </button>
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        <span className="pill bg-accent-soft text-accent-ink">Accent pill</span>
        <span className="pill bg-signal-soft text-signal-ink">Signal pill</span>
        <span className="pill bg-success-soft text-success">Success</span>
        <span className="pill bg-warning-soft text-warning">Warning</span>
      </div>
      <div className="flex flex-wrap gap-6 items-center text-sm text-ink-600">
        <span className="inline-flex items-center gap-2">
          <span className="dot bg-success" /> Live
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="dot bg-warning" /> Stale
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="dot bg-danger" /> Risk
        </span>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="card p-4 text-sm text-ink-700">Card · flat elevation</div>
        <div className="agent-card p-4 text-sm text-ink-800">Agent card · signal outline</div>
      </div>
    </div>
  )
}

/** Mini figure showing viz.* roles on one line chart */
export function DesignSystemVizRolesDemo() {
  return (
    <figure className="card-raised border border-ink-100 p-4 m-0">
      <figcaption className="text-2xs font-mono text-ink-500 mb-3">
        viz.gridline · viz.axis · viz.selection (signal) · viz.hover trail
      </figcaption>
      <svg
        viewBox="0 0 280 100"
        className="w-full max-w-md"
        role="img"
        aria-label="Schematic line chart: gridlines, axes, series stroke, selection dot and signal fill, hover band"
      >
        {[20, 45, 70].map(y => (
          <line key={y} x1="32" x2="260" y1={y} y2={y} stroke={CHART_AXIS.gridSubtle} strokeOpacity={0.6} strokeWidth={1} />
        ))}
        <line x1="32" x2="32" y1="12" y2="88" stroke={CHART_AXIS.tick} strokeWidth={1} />
        <line x1="32" x2="260" y1="88" y2="88" stroke={CHART_AXIS.tick} strokeWidth={1} />
        <path
          d="M 48 72 L 88 58 L 128 62 L 168 48 L 208 42 L 248 28"
          fill="none"
          stroke={CHART.accent}
          strokeWidth={2}
          strokeLinecap="round"
        />
        <circle cx="248" cy="28" r="5" fill={CHART.signal} fillOpacity={0.95} stroke="#fff" strokeWidth={1.5} />
        <rect x="220" y="18" width="44" height="20" rx="4" fill={CHART.accent} fillOpacity={0.12} />
      </svg>
    </figure>
  )
}

export function DesignSystemAgentSurfaceMock() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="agent-card p-5 space-y-3">
        <div className="text-2xs font-semibold uppercase tracking-wide text-signal-ink">AgentDock</div>
        <p className="text-sm text-ink-800 leading-relaxed">
          West coverage dipped after W6. CRM sync at 08:38 confirms thin pipeline, not a definition drift.
        </p>
        <div className="text-2xs text-ink-500 font-mono">Confidence: moderate · fields: coverage, region, week</div>
      </div>
      <div className="space-y-2">
        <div className="text-2xs font-semibold uppercase tracking-wide text-ink-500">AskNextChips</div>
        <div className="flex flex-wrap gap-2">
          {['Compare to Central', 'Show rep-level', 'Last year same week'].map(t => (
            <button
              key={t}
              type="button"
              className="px-2.5 py-1 rounded-md border border-signal/35 bg-signal-soft/80 text-xs font-medium text-signal-ink hover:bg-signal-soft"
            >
              {t}
            </button>
          ))}
        </div>
        <div className="annotation text-xs mt-3">
          <strong>InsightBlock</strong> pairs with selection; chips never open a full chat thread.
        </div>
      </div>
    </div>
  )
}

export function DesignSystemLayoutDiagram() {
  return (
    <div className="rounded-lg border border-ink-200 overflow-hidden bg-canvas-sunken p-3 font-mono text-2xs text-ink-600">
      <div className="grid grid-cols-6 grid-rows-4 gap-1 min-h-[140px]">
        <div className="col-span-6 bg-canvas-raised border border-ink-100 rounded px-2 py-1.5 flex items-center">header</div>
        <div className="col-span-2 row-span-2 bg-accent-soft/40 border border-accent/25 rounded px-2 py-1">narrative</div>
        <div className="col-span-2 row-span-2 bg-canvas-raised border border-ink-100 rounded px-2 py-1">primaryViz</div>
        <div className="col-span-2 row-span-3 bg-signal-soft/35 border border-signal/30 rounded px-2 py-1">agent</div>
        <div className="col-span-2 bg-canvas-raised border border-ink-100 rounded px-2 py-1">kpi strip</div>
        <div className="col-span-2 bg-canvas-raised border border-ink-100 rounded px-2 py-1">secondaryViz</div>
        <div className="col-span-4 bg-canvas-raised border border-dashed border-ink-200 rounded px-2 py-1 text-ink-400">filters · footer</div>
      </div>
    </div>
  )
}

export function DesignSystemVizTypeGallery() {
  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
      <ChartFrame label="kpiScalar + sparkInline">
        <div className="flex h-full flex-col justify-center gap-1">
          <div className="font-mono text-2xl font-semibold tabular-nums tracking-tight text-ink-900 md:text-[1.65rem]">
            $2.84M
          </div>
          <div className="font-mono text-xs font-medium tabular-nums text-danger">−6.2% WoW</div>
          <div className="mt-2 rounded-xl border border-ink-200 bg-canvas-sunken/40 px-3 py-2">
            <Sparkline values={[2.95, 2.92, 2.9, 2.88, 2.82, 2.6]} stroke={CHART.accent} height={40} />
          </div>
        </div>
      </ChartFrame>

      <ChartFrame label="line">
        <GalleryLineWithArea />
      </ChartFrame>

      <ChartFrame label="area (stacked · part-to-whole)">
        <MiniAxisChart>
          <AreaChart data={W_STACK} margin={marginPlot}>
            <defs>
              <linearGradient id="ds-area-a" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={CHART.accent} stopOpacity={0.45} />
                <stop offset="100%" stopColor={CHART.accent} stopOpacity={0.12} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={CHART_AXIS.gridSubtle} strokeWidth={1} vertical={false} />
            <XAxis dataKey="x" {...xAxisProps} />
            <YAxis {...yAxisProps} />
            <Area
              type="monotone"
              dataKey="a"
              stackId="1"
              stroke={CHART.accent}
              strokeWidth={1.5}
              fill="url(#ds-area-a)"
            />
            <Area
              type="monotone"
              dataKey="b"
              stackId="1"
              stroke={CHART_AXIS.label}
              strokeWidth={1}
              fill={CHART_AXIS.label}
              fillOpacity={0.22}
            />
            <Area
              type="monotone"
              dataKey="c"
              stackId="1"
              stroke={CHART.signal}
              strokeWidth={1}
              fill={CHART.signal}
              fillOpacity={0.2}
            />
          </AreaChart>
        </MiniAxisChart>
      </ChartFrame>

      <ChartFrame label="bar · magnitude">
        <MiniAxisChart>
          <BarChart data={MAG} margin={marginPlot}>
            <CartesianGrid stroke={CHART_AXIS.gridSubtle} strokeWidth={1} vertical={false} />
            <XAxis dataKey="n" {...xAxisProps} />
            <YAxis {...yAxisProps} />
            <Bar dataKey="v" fill={CHART.accent} fillOpacity={0.92} radius={[5, 5, 0, 0]} stroke="rgba(255,255,255,0.35)" strokeWidth={1} />
          </BarChart>
        </MiniAxisChart>
      </ChartFrame>

      <ChartFrame label="bar · ranking (sorted)">
        <MiniAxisChart>
          <BarChart layout="vertical" data={MAG_SORT} margin={marginVHBar}>
            <CartesianGrid stroke={CHART_AXIS.gridSubtle} strokeWidth={1} vertical={false} />
            <XAxis type="number" {...xAxisProps} />
            <YAxis type="category" dataKey="n" {...yAxisProps} width={52} tick={{ ...tickProps, fontSize: 10 }} />
            <Bar dataKey="v" fill={CHART.accent} fillOpacity={0.92} radius={[0, 5, 5, 0]} stroke="rgba(255,255,255,0.35)" strokeWidth={1} />
          </BarChart>
        </MiniAxisChart>
      </ChartFrame>

      <ChartFrame label="divergingBar">
        <MiniAxisChart>
          <BarChart layout="vertical" data={DIV} margin={marginVHBar}>
            <CartesianGrid stroke={CHART_AXIS.gridSubtle} strokeWidth={1} vertical={false} />
            <XAxis type="number" {...xAxisProps} />
            <YAxis type="category" dataKey="n" {...yAxisProps} width={52} tick={{ ...tickProps, fontSize: 10 }} />
            <ReferenceLine x={0} stroke="rgba(14,15,18,0.2)" strokeWidth={1} />
            <Bar dataKey="v" radius={[0, 4, 4, 0]} strokeWidth={0}>
              {DIV.map((e, i) => (
                <Cell key={i} fill={e.v >= 0 ? CHART.success : CHART.danger} fillOpacity={0.9} />
              ))}
            </Bar>
          </BarChart>
        </MiniAxisChart>
      </ChartFrame>

      <ChartFrame label="lineColumnCombo">
        <MiniAxisChart>
          <ComposedChart data={COMBO} margin={{ ...marginPlot, right: 18 }}>
            <CartesianGrid stroke={CHART_AXIS.gridSubtle} strokeWidth={1} vertical={false} />
            <XAxis dataKey="m" {...xAxisProps} />
            <YAxis yAxisId="l" {...yAxisProps} tickFormatter={v => `${v}`} />
            <YAxis yAxisId="r" orientation="right" {...yAxisProps} tickFormatter={v => `${(v * 100).toFixed(0)}%`} />
            <Bar
              yAxisId="l"
              dataKey="rev"
              fill="rgba(14, 15, 18, 0.06)"
              stroke="rgba(14,15,18,0.08)"
              strokeWidth={1}
              radius={[4, 4, 0, 0]}
            />
            <Line
              yAxisId="r"
              type="monotone"
              dataKey="margin"
              stroke={CHART.signal}
              strokeWidth={2.25}
              strokeLinecap="round"
              dot={{ r: 4, fill: CHART.signal, stroke: '#fff', strokeWidth: 2 }}
            />
          </ComposedChart>
        </MiniAxisChart>
      </ChartFrame>

      <ChartFrame label="histogram">
        <MiniAxisChart>
          <BarChart data={HIST} margin={marginPlot}>
            <CartesianGrid stroke={CHART_AXIS.gridSubtle} strokeWidth={1} vertical={false} />
            <XAxis dataKey="b" {...xAxisProps} />
            <YAxis {...yAxisProps} allowDecimals={false} />
            <Bar dataKey="c" fill={CHART.accent} fillOpacity={0.88} radius={[4, 4, 0, 0]} />
          </BarChart>
        </MiniAxisChart>
      </ChartFrame>

      <ChartFrame label="slope">
        <SlopeMini />
      </ChartFrame>

      <ChartFrame label="waterfall">
        <WaterfallMini />
      </ChartFrame>

      <ChartFrame label="smallMultiples">
        <div className="grid grid-cols-2 gap-2 h-full">
          <MiniLine subset={W.slice(0, 4)} color={CHART.accent} />
          <MiniLine subset={W.slice(1, 5).map((r, i) => ({ ...r, y: r.y - 5 + i }))} color={CHART.signal} />
        </div>
      </ChartFrame>

      <ChartFrame label="scatter · correlation">
        <MiniAxisChart>
          <ScatterChart margin={marginPlot}>
            <CartesianGrid stroke={CHART_AXIS.gridSubtle} strokeWidth={1} vertical={false} />
            <XAxis type="number" dataKey="q" name="q" {...xAxisProps} />
            <YAxis type="number" dataKey="r" name="r" {...yAxisProps} />
            <Scatter
              data={SCAT}
              fill={CHART.accent}
              fillOpacity={0.85}
              stroke="#fff"
              strokeWidth={2}
            />
          </ScatterChart>
        </MiniAxisChart>
      </ChartFrame>

      <ChartFrame label="map · spatial (schematic)">
        <div className="flex h-full items-stretch justify-center gap-2 pt-2">
          {[
            { k: 'W', o: 0.35 },
            { k: 'C', o: 0.55 },
            { k: 'E', o: 0.22 },
          ].map(r => (
            <div
              key={r.k}
              className="flex-1 rounded-md border border-ink-200 flex flex-col items-center justify-end pb-2 font-mono text-2xs text-ink-600"
              style={{ backgroundColor: `rgba(91, 46, 145, ${r.o})` }}
            >
              <span className="text-white/90">{r.k}</span>
            </div>
          ))}
        </div>
      </ChartFrame>

      <ChartFrame label="bullet">
        <BulletMini />
      </ChartFrame>

      <ChartFrame label="heatmapGrid">
        <HeatmapMini />
      </ChartFrame>

      <ChartFrame label="tableBars">
        <div className="flex h-full flex-col justify-center space-y-2.5">
          {MAG_SORT.map(r => (
            <div key={r.n} className="flex items-center gap-3 text-xs">
              <span className="w-14 shrink-0 font-medium text-ink-600">{r.n}</span>
              <div className="h-6 flex-1 overflow-hidden rounded-md bg-ink-100/90 ring-1 ring-ink-100">
                <div
                  className="h-full rounded-r-md bg-accent"
                  style={{ width: `${(r.v / 45) * 100}%` }}
                />
              </div>
              <span className="w-8 text-right font-mono text-sm font-medium tabular-nums text-ink-900">{r.v}</span>
            </div>
          ))}
        </div>
      </ChartFrame>

      <ChartFrame label="sankey · phase 2">
        <div className="h-full grid place-items-center text-center text-2xs text-ink-500 border border-dashed border-ink-200 rounded-md bg-canvas-sunken px-2">
          Topology-heavy chart. Spec includes type; primitive ships when a flow needs it.
        </div>
      </ChartFrame>
    </div>
  )
}

function MiniLine({ subset, color }: { subset: { x: string; y: number }[]; color: string }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={subset} margin={{ top: 6, right: 8, left: 2, bottom: 4 }}>
        <CartesianGrid stroke={CHART_AXIS.gridSubtle} strokeWidth={1} vertical={false} />
        <XAxis dataKey="x" tick={tickProps} tickLine={false} axisLine={false} fontSize={10} />
        <YAxis hide domain={['auto', 'auto']} />
        <Line
          type="monotone"
          dataKey="y"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

function SlopeMini() {
  const w = 220
  const h = 120
  const pad = 28
  const yFor = (v: number) => pad + (1 - (v - 2) / 8) * (h - pad * 2)
  const x0 = pad + 16
  const x1 = w - pad - 16
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-full w-full" aria-hidden>
      <text x={x0} y={16} fontSize={11} fontWeight={600} fill={CHART_AXIS.tick} fontFamily="Inter, system-ui, sans-serif" textAnchor="middle">
        T0
      </text>
      <text x={x1} y={16} fontSize={11} fontWeight={600} fill={CHART_AXIS.tick} fontFamily="Inter, system-ui, sans-serif" textAnchor="middle">
        T1
      </text>
      {SLOPE.map((row, i) => {
        const y0 = yFor(row.t0)
        const y1 = yFor(row.t1)
        const col = i % 2 === 0 ? CHART.accent : CHART.signal
        return (
          <g key={row.cat}>
            <line x1={x0} y1={y0} x2={x1} y2={y1} stroke={col} strokeWidth={2.25} strokeLinecap="round" opacity={0.9} />
            <circle cx={x0} cy={y0} r={4} fill={col} stroke="#fff" strokeWidth={1.5} />
            <circle cx={x1} cy={y1} r={4} fill={col} stroke="#fff" strokeWidth={1.5} />
            <text
              x={pad - 8}
              y={y0 + 4}
              fontSize={10}
              fontWeight={500}
              fill={CHART_AXIS.label}
              fontFamily="Inter, system-ui, sans-serif"
              textAnchor="end"
            >
              {row.cat}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

function WaterfallMini() {
  const steps = [
    { l: 'Open', v: 100 },
    { l: 'New', v: 22 },
    { l: 'Lost', v: -15 },
    { l: 'Exp', v: 8 },
  ]
  let acc = 0
  const segs = steps.map((s, i) => {
    const start = acc
    acc += s.v
    return { ...s, start, end: acc, i }
  })
  const max = Math.max(...segs.map(s => s.end), 120)
  const min = Math.min(0, ...segs.map(s => s.start))
  const range = max - min || 1
  const gap = 8
  return (
    <svg viewBox="0 0 220 110" className="w-full h-full" aria-hidden>
      <line x1="20" y1="88" x2="200" y2="88" stroke={CHART_AXIS.gridSubtle} />
      {segs.map((s, idx) => {
        const x = 28 + idx * (36 + gap)
        const yTop = 80 - ((Math.max(s.start, s.end) - min) / range) * 70
        const yBot = 80 - ((Math.min(s.start, s.end) - min) / range) * 70
        const h = Math.max(3, yBot - yTop)
        const fill = s.v >= 0 ? CHART.accent : CHART.danger
        return (
          <g key={s.l}>
            <rect x={x} y={yTop} width={32} height={h} rx={2} fill={fill} fillOpacity={0.85} />
            <text x={x + 16} y="100" fontSize={8} fill={CHART_AXIS.tick} textAnchor="middle">
              {s.l}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

function BulletMini() {
  return (
    <svg viewBox="0 0 220 60" className="w-full h-full" aria-hidden>
      <rect x="16" y="14" width="180" height="10" rx="2" fill={CHART_AXIS.gridSubtle} fillOpacity={0.5} />
      <rect x="16" y="14" width="120" height="10" rx="2" fill={CHART.accent} fillOpacity={0.35} />
      <rect x="16" y="32" width="140" height="10" rx="2" fill={CHART.signal} fillOpacity={0.5} />
      <line x1="100" y1="10" x2="100" y2="48" stroke={CHART.danger} strokeDasharray="3 2" strokeWidth={1} />
    </svg>
  )
}

function HeatmapMini() {
  const cells = [
    [0.2, 0.5, 0.8],
    [0.6, 0.3, 0.9],
    [0.45, 0.7, 0.25],
  ]
  return (
    <div className="grid h-full grid-cols-3 gap-1.5 p-1" style={{ aspectRatio: '3/2' }}>
      {cells.flatMap((row, ri) =>
        row.map((v, ci) => (
          <div
            key={`${ri}-${ci}`}
            className="rounded-lg border border-ink-200"
            style={{ backgroundColor: `rgba(91, 46, 145, ${0.12 + v * 0.78})` }}
          />
        )),
      )}
    </div>
  )
}

const PLAY_DATA = [
  { x: 'W1', west: 41, east: 38 },
  { x: 'W2', west: 44, east: 39 },
  { x: 'W3', west: 43, east: 41 },
  { x: 'W4', west: 48, east: 40 },
  { x: 'W5', west: 52, east: 42 },
  { x: 'W6', west: 49, east: 44 },
] as const

function legendDataKey(entry: { dataKey?: unknown; payload?: { dataKey?: unknown } }): string {
  const dk = entry.dataKey ?? entry.payload?.dataKey
  return dk != null ? String(dk) : ''
}

export function DesignSystemInteractionPlayground() {
  const steps = [
    {
      id: 'hover',
      label: 'Hover',
      title: 'Hover',
      hint:
        'Move the pointer over a point. Tooltip shows both series at that week — Recharts Tooltip is wired here (no separate “hover mode” in production; it stacks with your selection logic).',
    },
    {
      id: 'click',
      label: 'Click',
      title: 'Click / tap',
      hint: 'Click a point on either line. The gold ring is the committed selection — same hand-off as dot buttons below.',
    },
    {
      id: 'legend',
      label: 'Legend',
      title: 'Legend toggle',
      hint: 'Click a legend row to hide or show a series. Dimmed label = hidden. Narration should only describe visible series.',
    },
    {
      id: 'brush',
      label: 'Brush',
      title: 'Brush range',
      hint: 'Drag the range on the brush strip to zoom weeks. Clears when you reset the brush domain (drag full width).',
    },
    {
      id: 'keyboard',
      label: 'Keyboard',
      title: 'Arrow keys',
      hint:
        'Choose this tab, then press ← or → (keyboard listeners attach to the window). If nothing moves, click once on this page so the browser is not focused inside the address bar.',
    },
    {
      id: 'esc',
      label: 'Esc',
      title: 'Escape',
      hint:
        'Choose this tab, click once on the page, then press Escape to clear the selected point. In product, Esc also backs out of drill; here it only clears selection.',
    },
  ] as const

  const [active, setActive] = useState(0)
  const [selIdx, setSelIdx] = useState<number | null>(2)
  const [hidden, setHidden] = useState<{ west: boolean; east: boolean }>({ west: false, east: false })

  const showBrush = active === 3

  const chartHeight = showBrush ? 200 : 160

  useEffect(() => {
    if (active !== 4) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        setSelIdx(i => (i == null ? 0 : Math.min(i + 1, PLAY_DATA.length - 1)))
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setSelIdx(i => (i == null ? PLAY_DATA.length - 1 : Math.max(i - 1, 0)))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])

  useEffect(() => {
    if (active !== 5) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setSelIdx(null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Chart interaction demo modes">
        {steps.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium transition-colors duration-150 ease-smooth ${
              active === i
                ? 'border-accent bg-accent-soft text-accent-ink'
                : 'border-ink-200 bg-canvas-raised text-ink-600 hover:border-ink-300'
            }`}
          >
            <span className="font-mono text-2xs text-ink-500">{i + 1}</span>
            {s.label}
          </button>
        ))}
      </div>
      <div className="rounded-xl border border-ink-200 bg-canvas-sunken/40 p-4 flex flex-col lg:flex-row gap-5">
        <div
          className="lg:w-[min(100%,420px)] shrink-0 rounded-lg border border-ink-200 bg-canvas-raised p-2"
          style={{ height: chartHeight + 48 }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={[...PLAY_DATA]}
              margin={{ top: 32, right: 12, left: 8, bottom: showBrush ? 28 : 12 }}
            >
              <CartesianGrid stroke={CHART_AXIS.gridSubtle} strokeWidth={1} vertical={false} />
              <XAxis dataKey="x" {...xAxisProps} />
              <YAxis {...yAxisProps} domain={['dataMin - 2', 'dataMax + 4']} />
              <Tooltip
                cursor={{ stroke: CHART.accent, strokeWidth: 1, strokeDasharray: '4 4' }}
                contentStyle={{ borderRadius: 8, fontSize: 12, border: '1px solid #DDE0E8' }}
              />
              <Legend
                verticalAlign="top"
                height={28}
                onClick={e => {
                  const dk = legendDataKey(e as { dataKey?: unknown; payload?: { dataKey?: unknown } })
                  if (dk === 'west') setHidden(h => ({ ...h, west: !h.west }))
                  if (dk === 'east') setHidden(h => ({ ...h, east: !h.east }))
                }}
                wrapperStyle={{ fontSize: 11, cursor: 'pointer' }}
                formatter={(value, entry) => {
                  const dk = legendDataKey(entry as { dataKey?: unknown; payload?: { dataKey?: unknown } })
                  const dim = dk === 'west' ? hidden.west : dk === 'east' && hidden.east
                  const westHidden = dk === 'west' && hidden.west
                  const eastHidden = dk === 'east' && hidden.east
                  return (
                    <span
                      style={{
                        opacity: dim ? 0.35 : 1,
                        textDecoration: westHidden || eastHidden ? 'line-through' : 'none',
                      }}
                    >
                      {value}
                    </span>
                  )
                }}
              />
              <Line
                type="monotone"
                dataKey="west"
                name="West"
                stroke={CHART.accent}
                strokeWidth={2.25}
                strokeOpacity={hidden.west ? 0.15 : 1}
                dot={p => {
                  const on = selIdx === p.index && !hidden.west
                  const r = on ? 8 : 4
                  return (
                    <circle
                      key={`w-${p.index}`}
                      cx={p.cx}
                      cy={p.cy}
                      r={r}
                      fill={on ? CHART.signal : CHART.accent}
                      stroke="#fff"
                      strokeWidth={2}
                      className={hidden.west ? 'pointer-events-none' : 'cursor-pointer'}
                      onClick={() => !hidden.west && setSelIdx(p.index)}
                    />
                  )
                }}
                activeDot={{ r: 9 }}
                hide={hidden.west}
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="east"
                name="East"
                stroke={CHART.success}
                strokeWidth={2}
                strokeOpacity={hidden.east ? 0.15 : 1}
                dot={p => {
                  const on = selIdx === p.index && !hidden.east
                  const r = on ? 8 : 4
                  return (
                    <circle
                      key={`e-${p.index}`}
                      cx={p.cx}
                      cy={p.cy}
                      r={r}
                      fill={on ? CHART.signal : CHART.success}
                      stroke="#fff"
                      strokeWidth={2}
                      className={hidden.east ? 'pointer-events-none' : 'cursor-pointer'}
                      onClick={() => !hidden.east && setSelIdx(p.index)}
                    />
                  )
                }}
                activeDot={{ r: 9 }}
                hide={hidden.east}
                isAnimationActive={false}
              />
              {showBrush ? (
                <Brush
                  dataKey="x"
                  height={22}
                  stroke={CHART_AXIS.muted}
                  fill={CHART.canvasSunken}
                  travellerWidth={8}
                  tickFormatter={() => ''}
                />
              ) : null}
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 min-w-0 space-y-3">
          <div>
            <div className="text-2xs font-mono uppercase tracking-[0.14em] text-ink-500">{steps[active].title}</div>
            <p className="text-sm text-ink-800 leading-relaxed m-0 mt-1">{steps[active].hint}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {PLAY_DATA.map((p, i) => (
              <button
                key={p.x}
                type="button"
                onClick={() => setSelIdx(i)}
                className={`rounded-full px-3 py-1.5 text-2xs font-mono font-medium border transition-colors ${
                  selIdx === i ? 'border-signal bg-signal-soft text-signal-ink' : 'border-ink-200 bg-canvas-raised text-ink-600'
                }`}
              >
                {p.x}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setSelIdx(null)}
              className="rounded-full px-3 py-1.5 text-2xs font-medium border border-ink-200 bg-canvas-sunken/50 text-ink-600 hover:border-ink-300"
            >
              Clear
            </button>
          </div>
          {selIdx != null ? (
            <p className="text-2xs font-mono text-ink-500 m-0">
              Selection: {PLAY_DATA[selIdx]?.x} · West {PLAY_DATA[selIdx]?.west} · East {PLAY_DATA[selIdx]?.east}
            </p>
          ) : (
            <p className="text-2xs font-mono text-ink-500 m-0">No point selected.</p>
          )}
        </div>
      </div>
    </div>
  )
}
