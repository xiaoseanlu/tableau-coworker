import { useCallback, useId, useMemo, useState } from 'react'
import { CHART } from '../dashboard/chartTokens'

/** Normalizes points to SVG viewBox 0..100 x 0..40 (y inverted) */
function sparkPath(values: number[], ymin: number, ymax: number): string {
  if (values.length < 2) return ''
  const n = values.length - 1
  const pts = values.map((v, i) => {
    const x = (i / n) * 100
    const t = (v - ymin) / (ymax - ymin || 1)
    const y = 40 - t * 36 - 2
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })
  return `M ${pts.join(' L ')}`
}

export function Sparkline({
  values,
  stroke = 'currentColor',
  className = '',
  height = 32,
}: {
  values: number[]
  stroke?: string
  className?: string
  height?: number
}) {
  const { ymin, ymax, d } = useMemo(() => {
    const ymin = Math.min(...values) * 0.98
    const ymax = Math.max(...values) * 1.02
    return { ymin, ymax, d: sparkPath(values, ymin, ymax) }
  }, [values])
  void ymin
  void ymax
  return (
    <svg
      className={className}
      width="100%"
      height={height}
      viewBox="0 0 100 40"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path d={d} fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

const MAYA_WEEKS = ['Mar 10', 'Mar 17', 'Mar 24', 'Mar 31', 'Apr 7', 'Apr 14', 'Apr 21', 'Apr 28']
/** Trailing West pipeline coverage (×) — last point is the −2.1 WoW story */
const MAYA_COVERAGE = [2.95, 2.92, 2.9, 2.88, 2.86, 2.84, 2.82, 2.6]

export function CoverageTrendChart() {
  const gid = useId()
  const [i, setI] = useState<number | null>(MAYA_COVERAGE.length - 1)

  const pad = 8
  const w = 320
  const h = 120
  const innerW = w - pad * 2
  const innerH = h - pad * 2 - 14

  const ymin = Math.min(...MAYA_COVERAGE) - 0.08
  const ymax = Math.max(...MAYA_COVERAGE) + 0.06

  const pts = useMemo(
    () =>
      MAYA_COVERAGE.map((v, idx) => {
        const x = pad + (idx / (MAYA_COVERAGE.length - 1)) * innerW
        const t = (v - ymin) / (ymax - ymin || 1)
        const y = pad + (1 - t) * innerH
        return { x, y, v, idx }
      }),
    [innerW, innerH, ymin, ymax],
  )

  const lineD = useMemo(() => {
    return pts.map((p, k) => `${k === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')
  }, [pts])

  const onMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      const svg = e.currentTarget
      const r = svg.getBoundingClientRect()
      const px = ((e.clientX - r.left) / r.width) * w
      const clamped = Math.max(pad, Math.min(w - pad, px))
      const ratio = (clamped - pad) / innerW
      const idx = Math.round(ratio * (MAYA_COVERAGE.length - 1))
      setI(Math.max(0, Math.min(MAYA_COVERAGE.length - 1, idx)))
    },
    [innerW, w],
  )

  const active = i !== null ? pts[i] : pts[pts.length - 1]

  return (
    <div className="w-full">
      <svg
        width="100%"
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        className="overflow-visible touch-none select-none"
        onMouseMove={onMove}
        onMouseLeave={() => setI(MAYA_COVERAGE.length - 1)}
        role="img"
        aria-label="West pipeline coverage over eight weeks, hoverable"
      >
        <defs>
          <linearGradient id={`${gid}-fill`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={CHART.accent} stopOpacity={0.12} />
            <stop offset="100%" stopColor={CHART.accent} stopOpacity={0} />
          </linearGradient>
        </defs>
        {/* grid */}
        {[0.25, 0.5, 0.75].map(t => (
          <line
            key={t}
            x1={pad}
            x2={w - pad}
            y1={pad + t * innerH}
            y2={pad + t * innerH}
            stroke={CHART.grid}
            strokeWidth="1"
            strokeDasharray="3 4"
          />
        ))}
        {/* area */}
        <path
          d={`${lineD} L ${pts[pts.length - 1].x} ${pad + innerH} L ${pts[0].x} ${pad + innerH} Z`}
          fill={`url(#${gid}-fill)`}
        />
        <path d={lineD} fill="none" stroke={CHART.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {pts.map(p => (
          <circle
            key={p.idx}
            cx={p.x}
            cy={p.y}
            r={i === p.idx ? 5 : 3}
            fill={i === p.idx ? CHART.accent : CHART.canvas}
            stroke={CHART.accent}
            strokeWidth="1.5"
            className="transition-all duration-150"
          />
        ))}
        {active && i !== null && (
          <g>
            <line
              x1={active.x}
              x2={active.x}
              y1={pad}
              y2={pad + innerH}
              stroke={CHART.signal}
              strokeWidth="1"
              strokeDasharray="2 3"
            />
          </g>
        )}
      </svg>
      <div className="flex justify-between text-2xs font-mono text-ink-500 mt-1 px-0.5">
        <span>{MAYA_WEEKS[0]}</span>
        <span>{MAYA_WEEKS[MAYA_WEEKS.length - 1]}</span>
      </div>
      {active && (
        <div className="mt-2 rounded-md border border-signal/25 bg-signal-soft/40 px-3 py-2 text-sm">
          <span className="font-mono text-accent font-semibold tabular-nums">{active.v.toFixed(2)}×</span>
          <span className="text-ink-600"> coverage · </span>
          <span className="text-ink-700">{MAYA_WEEKS[active.idx]}</span>
          {active.idx === MAYA_COVERAGE.length - 1 && (
            <span className="block text-xs text-danger font-medium mt-1">Largest single-week move this quarter · narrative anchor for Maya</span>
          )}
        </div>
      )}
    </div>
  )
}

/** Stacked bar: portfolio health for Jordan flow */
export function PortfolioMixBar() {
  const segments = [
    { label: 'Active & trusted', pct: 54, color: CHART.success },
    { label: 'Stale', pct: 19, color: CHART.warning },
    { label: 'Duplicate risk', pct: 15, color: CHART.accent },
    { label: 'Data-quality flags', pct: 12, color: CHART.danger },
  ]
  return (
    <div className="w-full" role="img" aria-label="Portfolio mix: 47 dashboards by health category">
      <div className="flex h-3 rounded-full overflow-hidden border border-ink-200">
        {segments.map(s => (
          <div
            key={s.label}
            style={{ width: `${s.pct}%`, backgroundColor: s.color }}
            title={`${s.label}: ${s.pct}%`}
          />
        ))}
      </div>
      <ul className="mt-3 grid grid-cols-2 gap-2 text-2xs">
        {segments.map(s => (
          <li key={s.label} className="flex items-center gap-2 text-ink-700">
            <span className="w-2 h-2 rounded-sm shrink-0" style={{ backgroundColor: s.color }} />
            <span>{s.label}</span>
            <span className="font-mono text-ink-500">{s.pct}%</span>
          </li>
        ))}
      </ul>
      <p className="text-2xs text-ink-500 mt-2 font-mono">n = 47 workbooks · Acme tenant · observed opens 90d</p>
    </div>
  )
}

/** Compact strip for home-page flow cards */
export function MiniStackedHealth() {
  const segments = [
    { pct: 54, color: CHART.success },
    { pct: 19, color: CHART.warning },
    { pct: 15, color: CHART.accent },
    { pct: 12, color: CHART.danger },
  ]
  return (
    <div className="flex h-2 rounded-full overflow-hidden border border-ink-100" aria-hidden>
      {segments.map((s, i) => (
        <div key={i} style={{ flexGrow: s.pct, flexBasis: 0, backgroundColor: s.color }} />
      ))}
    </div>
  )
}

/** Concentration horizontal bars (Maya drill). */
export function ConcentrationBars({
  rows,
}: {
  rows: { name: string; pct: number; color: string }[]
}) {
  const max = Math.max(...rows.map(r => r.pct))
  return (
    <div className="space-y-2" role="list" aria-label="Share of West coverage move by rep">
      {rows.map(r => (
        <div key={r.name} className="flex items-center gap-3 text-sm">
          <div className="w-28 shrink-0 text-ink-700 truncate">{r.name}</div>
          <div className="flex-1 h-6 bg-ink-100 rounded-md overflow-hidden">
            <div
              className="h-full rounded-md transition-all duration-300"
              style={{ width: `${(r.pct / max) * 100}%`, backgroundColor: r.color }}
            />
          </div>
          <div className="w-12 text-right font-mono text-ink-900 tabular-nums">{r.pct}%</div>
        </div>
      ))}
    </div>
  )
}
