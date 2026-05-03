import { useId, useMemo, useState, type FC, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
} from 'recharts'
import {
  ArrowRight,
  AtomicPrimitives,
  Check,
  ContrastSplit,
  EasingMotion,
  FocusCorners,
  HandPointerUp,
  MobileDevice,
  MoleculeBond,
  OrganismLayout,
  PanelRight,
  Sparkle,
  SuggestionChips,
  TableRows,
  TooltipBubble,
  Trend,
  type IconProps,
} from '../Icons'
import { Sparkline } from '../viz/DataViz'
import { CAPTURE_PNG_COUNT, CAPTURE_PNG_PATHS } from '../../data/captureFiles'

const base = import.meta.env.BASE_URL.replace(/\/?$/, '/')

/** Canonical capture paths from plan / CONTEXT — images load when `public/captures/` is present in the build. */
export const CAPTURE_EVIDENCE_ITEMS = [
  {
    id: 'flow-d',
    file: 'captures/flow-d-explore-superstore/06-overview-exec-dashboard.png',
    title: 'Exec overview wall',
    flow: 'flow-d-explore-superstore',
    yields: 'KpiStrip · DashboardGrid',
  },
  {
    id: 'flow-b',
    file: 'captures/flow-b-first-authoring/01-blank-canvas.png',
    title: 'Blank canvas + connect',
    flow: 'flow-b-first-authoring',
    yields: 'ConnectPanel · AuthoringChrome',
  },
  {
    id: 'flow-b-shelf',
    file: 'captures/flow-b-first-authoring/07-chart-builder-shelves.png',
    title: 'Chart builder shelves',
    flow: 'flow-b-first-authoring',
    yields: 'Shelf · ChartIntent',
  },
  {
    id: 'flow-e',
    file: 'captures/flow-e-mobile/05-mobile-squished.png',
    title: 'Mobile consume',
    flow: 'flow-e-mobile',
    yields: 'BriefStack · BottomSheet',
  },
  {
    id: 'flow-f',
    file: 'captures/flow-f-pulse/06-pulse-metric-wizard.png',
    title: 'Pulse metric wizard',
    flow: 'flow-f-pulse',
    yields: 'MetricHero · Stepper',
  },
  {
    id: 'flow-h',
    file: 'captures/flow-h-ai-agent/10-agent-insights-panel.png',
    title: 'Agent insights panel',
    flow: 'flow-h-ai-agent',
    yields: 'AgentSidePanel · ComplianceBanner',
  },
] as const

const SEL_POINTS = [
  { x: 'W1', y: 41, label: 'West · early', ai: 'West tracking baseline. No anomaly flagged.' },
  { x: 'W2', y: 44, label: 'W2 lift', ai: 'Small up-tick; agent defers — within variance.' },
  { x: 'W3', y: 43, label: 'W3 flat', ai: 'Hold steady; chips suggest region compare.' },
  { x: 'W4', y: 48, label: 'W4 step', ai: 'Largest week-over-week move in window. Scope dock here.' },
  { x: 'W5', y: 52, label: 'W5 peak', ai: 'Peak load week; check capacity narrative, not only revenue.' },
  { x: 'W6', y: 49, label: 'W6 slide', ai: 'Pullback after peak; agent cites prior week for contrast.' },
] as const

const ACCENT = '#5B2E91'
const INK_GRID = '#EEF0F4'
const tickSmall = { fill: '#5B6070', fontSize: 10, fontFamily: 'Inter, system-ui, sans-serif' }

const FT_LENS = [
  { key: 'Change over time', sample: 'Line / area', color: 'bg-accent/15 text-accent-ink border-accent/25' },
  { key: 'Magnitude', sample: 'Bar · KPI', color: 'bg-ink-100 text-ink-800 border-ink-200' },
  { key: 'Correlation', sample: 'Scatter', color: 'bg-signal-soft text-signal-ink border-signal/30' },
  { key: 'Distribution', sample: 'Histogram', color: 'bg-success-soft text-success border-success/25' },
  { key: 'Spatial', sample: 'Map', color: 'bg-accent-soft/80 text-accent-ink border-accent/20' },
  { key: 'Flow', sample: 'Waterfall', color: 'bg-warning-soft text-warning border-warning/30' },
] as const

type LayoutMode = 'comfortable' | 'compact' | 'mobile'

/** Clickable capture rail — every PNG under `public/captures/` plus pinned “hero” stills. */
export function DesignSystemCaptureEvidenceStrip() {
  const curatedByFile = useMemo(() => {
    const m = new Map<string, (typeof CAPTURE_EVIDENCE_ITEMS)[number]>()
    for (const c of CAPTURE_EVIDENCE_ITEMS) m.set(c.file, c)
    return m
  }, [])

  const grouped = useMemo(() => {
    const m: Record<string, string[]> = {}
    for (const p of CAPTURE_PNG_PATHS) {
      const slash = p.lastIndexOf('/')
      const folder = slash === -1 ? 'captures' : p.slice(0, slash)
      if (!m[folder]) m[folder] = []
      m[folder].push(p)
    }
    return Object.keys(m)
      .sort()
      .map(folder => ({ folder, files: m[folder]!.sort() }))
  }, [])

  const [selectedPath, setSelectedPath] = useState<string>(CAPTURE_PNG_PATHS[0] ?? CAPTURE_EVIDENCE_ITEMS[0]!.file)
  const panelId = useId()
  const [imgOk, setImgOk] = useState(true)

  const meta = curatedByFile.get(selectedPath)
  const shortName = selectedPath.split('/').pop()?.replace(/\.png$/i, '').replace(/-/g, ' ') ?? selectedPath
  const title = meta?.title ?? shortName
  const yields = meta?.yields ?? 'See flow persona prototypes'

  return (
    <div className="rounded-2xl border border-ink-200 bg-canvas-raised overflow-hidden">
      <div className="px-5 py-4 border-b border-ink-200 bg-canvas-sunken/40 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-2xs font-mono font-semibold uppercase tracking-[0.14em] text-ink-500">Verified captures</div>
          <p className="text-sm text-ink-700 mt-1 m-0 max-w-2xl leading-relaxed">
            <strong className="text-ink-900">{CAPTURE_PNG_COUNT} PNGs</strong> under{' '}
            <span className="font-mono text-2xs">public/captures/</span> — same files the flows cite. Pinned rows are shorthand labels;
            scroll for the full inventory by folder.
          </p>
        </div>
        <Link to="/flows" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-ink shrink-0">
          Open persona flows <ArrowRight size={14} aria-hidden />
        </Link>
      </div>

      <div className="grid lg:grid-cols-[1fr_minmax(0,340px)] gap-0 lg:divide-x lg:divide-ink-200">
        <div className="relative bg-canvas-sunken/30 min-h-[200px] lg:min-h-[320px]" role="region" aria-labelledby={panelId}>
          <div id={panelId} className="sr-only">
            Selected capture: {title}, path {selectedPath}
          </div>
          {imgOk ? (
            <img
              key={selectedPath}
              src={`${base}${selectedPath}`}
              alt=""
              className="w-full h-full min-h-[200px] lg:min-h-[320px] object-cover object-top"
              onError={() => setImgOk(false)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[200px] lg:min-h-[320px] px-8 text-center">
              <div className="rounded-xl border border-dashed border-ink-300 bg-canvas-raised px-6 py-8 max-w-md">
                <p className="text-sm font-semibold text-ink-800 m-0">Preview unavailable</p>
                <p className="text-xs text-ink-600 mt-2 m-0 leading-relaxed font-mono break-all">{selectedPath}</p>
              </div>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink-900/85 to-transparent px-4 py-3">
            <div className="text-white font-semibold text-sm">{title}</div>
            <div className="text-white/80 text-2xs font-mono mt-0.5 break-all">{selectedPath}</div>
            <div className="text-white/75 text-2xs mt-1">{yields}</div>
          </div>
        </div>

        <div className="flex flex-col max-h-[420px] lg:max-h-[480px] overflow-y-auto">
          <div className="px-3 py-2 bg-canvas-sunken/50 border-b border-ink-100 text-2xs font-mono font-semibold uppercase tracking-wide text-ink-500">
            Pinned (quick picks)
          </div>
          {CAPTURE_EVIDENCE_ITEMS.map(c => (
            <CaptureListRow
              key={c.id}
              path={c.file}
              title={c.title}
              sub={c.flow}
              detail={c.yields}
              selected={selectedPath === c.file}
              onSelect={() => {
                setSelectedPath(c.file)
                setImgOk(true)
              }}
            />
          ))}
          <div className="px-3 py-2 bg-canvas-sunken/50 border-b border-t border-ink-100 text-2xs font-mono font-semibold uppercase tracking-wide text-ink-500">
            All files · {CAPTURE_PNG_COUNT} total
          </div>
          {grouped.map(({ folder, files }) => (
            <div key={folder}>
              <div className="sticky top-0 z-[1] px-3 py-1.5 bg-canvas border-b border-ink-100 font-mono text-2xs text-accent-ink">
                {folder}
              </div>
              {files.map(file => (
                <CaptureListRow
                  key={file}
                  path={file}
                  title={curatedByFile.get(file)?.title ?? file.split('/').pop()?.replace(/\.png$/i, '') ?? file}
                  sub={folder}
                  detail={curatedByFile.get(file)?.yields ?? ''}
                  selected={selectedPath === file}
                  dense
                  onSelect={() => {
                    setSelectedPath(file)
                    setImgOk(true)
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CaptureListRow({
  path,
  title,
  sub,
  detail,
  selected,
  dense,
  onSelect,
}: {
  path: string
  title: string
  sub: string
  detail: string
  selected: boolean
  dense?: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex gap-3 text-left w-full px-3 py-2 border-b border-ink-100 transition-colors hover:bg-canvas-sunken/50 ${
        selected ? 'bg-accent-soft/50 ring-inset ring-1 ring-accent/25' : ''
      }`}
    >
      <div className={`shrink-0 rounded-md border border-ink-200 bg-ink-100 overflow-hidden ${dense ? 'w-14 h-10' : 'w-20 h-14'}`}>
        <CaptureThumb path={path} label={title} />
      </div>
      <div className="min-w-0 py-0.5">
        <div className={`font-semibold text-ink-900 leading-snug ${dense ? 'text-2xs' : 'text-xs'}`}>{title}</div>
        <div className="text-2xs text-ink-500 font-mono truncate">{sub}</div>
        {detail ? <div className="text-2xs text-ink-600 mt-0.5 leading-snug line-clamp-2">{detail}</div> : null}
      </div>
    </button>
  )
}

function CaptureThumb({ path, label }: { path: string; label: string }) {
  const [ok, setOk] = useState(true)
  if (!ok) {
    return <div className="w-full h-full grid place-items-center text-2xs text-ink-400 px-1 text-center">PNG</div>
  }
  return (
    <img
      src={`${base}${path}`}
      alt=""
      className="w-full h-full object-cover object-top"
      onError={() => setOk(false)}
    />
  )
}

/** Click chart points or week buttons — AgentDock copy updates (same contract as product). */
export function DesignSystemVizSelectionToAgentDemo() {
  const [idx, setIdx] = useState(3)
  const row = SEL_POINTS[idx]

  return (
    <div className="rounded-2xl border border-ink-200 bg-canvas-raised overflow-hidden">
      <div className="px-5 py-3 border-b border-ink-200 bg-canvas-sunken/40">
        <div className="text-2xs font-mono font-semibold uppercase tracking-wide text-ink-500">Interactive</div>
        <p className="text-sm text-ink-800 m-0 mt-1 font-medium">Selection drives AgentDock (demo data)</p>
      </div>
      <div className="grid md:grid-cols-5 gap-0 md:divide-x md:divide-ink-200">
        <div className="md:col-span-3 p-4">
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[...SEL_POINTS]} margin={{ top: 8, right: 12, left: 0, bottom: 4 }}>
                <CartesianGrid stroke={INK_GRID} vertical={false} />
                <XAxis dataKey="x" tick={tickSmall} tickLine={false} axisLine={{ stroke: 'rgba(14,15,18,0.09)' }} />
                <YAxis hide domain={['dataMin - 4', 'dataMax + 4']} />
                <Line
                  type="monotone"
                  dataKey="y"
                  stroke={ACCENT}
                  strokeWidth={2}
                  isAnimationActive={false}
                  dot={p => {
                    const on = p.index === idx
                    return (
                      <circle
                        key={p.index}
                        cx={p.cx}
                        cy={p.cy}
                        r={on ? 8 : 5}
                        fill={on ? '#C7841C' : ACCENT}
                        stroke="#fff"
                        strokeWidth={2}
                        className="cursor-pointer"
                        onClick={() => setIdx(p.index)}
                      />
                    )
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {SEL_POINTS.map((p, i) => (
              <button
                key={p.x}
                type="button"
                onClick={() => setIdx(i)}
                className={`rounded-full px-3 py-1.5 text-2xs font-mono font-medium border transition-colors ${
                  i === idx
                    ? 'border-signal bg-signal-soft text-signal-ink'
                    : 'border-ink-200 bg-canvas-raised text-ink-600 hover:border-ink-300'
                }`}
              >
                {p.x}
              </button>
            ))}
          </div>
        </div>
        <div className="md:col-span-2 p-4 bg-signal-soft/35 border-t md:border-t-0 border-ink-200">
          <div className="flex items-center gap-2 text-2xs font-semibold uppercase tracking-wide text-signal-ink mb-2">
            <Sparkle size={14} aria-hidden />
            AgentDock
          </div>
          <p className="text-sm text-ink-800 leading-relaxed m-0">{row.ai}</p>
          <p className="text-2xs font-mono text-ink-500 mt-3 m-0">
            VizSelection · {row.label} · conf. moderate
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {['Compare Central', 'Last year same week'].map(t => (
              <span
                key={t}
                className="rounded-md border border-signal/35 bg-canvas-raised px-2.5 py-1 text-2xs font-medium text-signal-ink"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const LAYOUT_AREAS: Record<LayoutMode, { grid: React.CSSProperties; cells: { area: string; label: string; tone: 'neutral' | 'accent' | 'signal' }[] }> = {
  comfortable: {
    grid: {
      display: 'grid',
      gap: '0.5rem',
      minHeight: 224,
      gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
      gridTemplateRows: 'auto auto 1fr 1fr auto',
      gridTemplateAreas: `
        "hdr hdr hdr hdr hdr hdr"
        "kpi kpi kpi kpi kpi kpi"
        "nar nar pv pv ag ag"
        "nar nar pv pv ag ag"
        "sv sv sv sv ag ag"
      `,
    },
    cells: [
      { area: 'hdr', label: 'header', tone: 'neutral' },
      { area: 'kpi', label: 'kpi strip', tone: 'neutral' },
      { area: 'nar', label: 'narrative', tone: 'accent' },
      { area: 'pv', label: 'primaryViz', tone: 'neutral' },
      { area: 'ag', label: 'agent', tone: 'signal' },
      { area: 'sv', label: 'secondaryViz', tone: 'neutral' },
    ],
  },
  compact: {
    grid: {
      display: 'grid',
      gap: '0.35rem',
      minHeight: 224,
      gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
      gridTemplateRows: 'auto auto 1fr auto',
      gridTemplateAreas: `
        "hdr hdr hdr hdr"
        "kpi kpi kpi kpi"
        "nar pv pv pv"
        "ag ag ag ag"
      `,
    },
    cells: [
      { area: 'hdr', label: 'header', tone: 'neutral' },
      { area: 'kpi', label: 'kpi strip', tone: 'neutral' },
      { area: 'nar', label: 'narrative', tone: 'accent' },
      { area: 'pv', label: 'primaryViz', tone: 'neutral' },
      { area: 'ag', label: 'agent', tone: 'signal' },
    ],
  },
  mobile: {
    grid: {
      display: 'grid',
      gap: '0.5rem',
      minHeight: 224,
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'repeat(5, auto)',
      gridTemplateAreas: `
        "hdr"
        "kpi"
        "nar"
        "pv"
        "ag"
      `,
    },
    cells: [
      { area: 'hdr', label: 'header', tone: 'neutral' },
      { area: 'kpi', label: 'kpi strip', tone: 'neutral' },
      { area: 'nar', label: 'narrative', tone: 'accent' },
      { area: 'pv', label: 'primaryViz', tone: 'neutral' },
      { area: 'ag', label: 'agent', tone: 'signal' },
    ],
  },
}

/** Toggle density — regions reflow; shows layout is a parameter, not a one-off mock. */
export function DesignSystemLayoutModePlayground() {
  const [mode, setMode] = useState<LayoutMode>('comfortable')

  const modes: { id: LayoutMode; label: string }[] = [
    { id: 'comfortable', label: 'Comfortable' },
    { id: 'compact', label: 'Compact' },
    { id: 'mobile', label: 'Mobile stack' },
  ]

  const spec = LAYOUT_AREAS[mode]

  return (
    <div className="rounded-2xl border border-ink-200 bg-canvas-raised overflow-hidden">
      <div className="px-5 py-3 border-b border-ink-200 flex flex-wrap items-center justify-between gap-3 bg-canvas-sunken/40">
        <div>
          <div className="text-2xs font-mono font-semibold uppercase tracking-wide text-ink-500">Dynamic layout</div>
          <p className="text-sm text-ink-800 m-0 mt-1 font-medium">Same regions · different density contract</p>
        </div>
        <div className="flex rounded-full border border-ink-200 p-0.5 bg-canvas-raised" role="tablist" aria-label="Layout density">
          {modes.map(m => (
            <button
              key={m.id}
              type="button"
              role="tab"
              aria-selected={mode === m.id}
              onClick={() => setMode(m.id)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                mode === m.id ? 'bg-ink-900 text-canvas' : 'text-ink-600 hover:text-ink-900'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 transition-all duration-300" style={spec.grid}>
        {spec.cells.map(c => (
          <RegionFake key={c.area} label={c.label} tone={c.tone} gridArea={c.area} />
        ))}
      </div>
      <p className="text-2xs text-ink-500 px-5 py-3 border-t border-ink-200 m-0 font-mono">
        RegionKind order is stable; grid assigns colSpan / rowSpan from persona + breakpoint (plan §6.7).
      </p>
    </div>
  )
}

function RegionFake({
  label,
  tone,
  gridArea,
}: {
  label: string
  tone: 'neutral' | 'accent' | 'signal'
  gridArea: string
}) {
  const tones = {
    neutral: 'bg-canvas-sunken/60 border-ink-200 text-ink-700',
    accent: 'bg-accent-soft/50 border-accent/25 text-accent-ink',
    signal: 'bg-signal-soft/50 border-signal/30 text-signal-ink',
  }
  return (
    <div
      style={{ gridArea }}
      className={`rounded-xl border px-3 py-3 flex items-center justify-center text-2xs font-mono font-semibold uppercase tracking-wide min-h-[48px] ${tones[tone]}`}
    >
      {label}
    </div>
  )
}

// ——— Typed props shared with DesignSystem page (single source of truth for rows) ———

export type FtStoryTableRow = {
  category: string
  readerPriority: string
  specTypes: string
  policy: string
}

export type VizCatalogTableRow = {
  type: string
  ft: string
  primitive: string
  shell: string
  aiHook: string
}

export type AiMoleculeTableRow = { molecule: string; binds: string; role: string }

export type InteractionMatrixRow = {
  name: string
  desktop: string
  compact: string
  mobile: string
  motion: string
  ai: string
}

/** One FT category at a time: reader job, allowed VizSpec types as pills, policy callout, mini geometry (same rows as reference table). */
export function DesignSystemFtStoryExplorer({ rows }: { rows: FtStoryTableRow[] }) {
  const [i, setI] = useState(0)
  const row = rows[i] ?? rows[0]
  const panelId = useId()
  const types = row.specTypes.split(/,\s*/).map(s => s.trim()).filter(Boolean)

  return (
    <div className="rounded-2xl border border-ink-200 bg-canvas-raised overflow-hidden">
      <div className="px-5 py-3 border-b border-ink-200 bg-canvas-sunken/40 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-2xs font-mono font-semibold uppercase tracking-wide text-ink-500">Interactive · story first</div>
          <p id={panelId} className="text-sm text-ink-800 m-0 mt-1 font-medium">
            FT category drives VizSpec choice — click a relationship
          </p>
        </div>
        <span className="text-2xs font-mono text-ink-500">
          {i + 1} / {rows.length}
        </span>
      </div>

      <div
        className="flex flex-wrap gap-2 p-4 border-b border-ink-100 max-h-[200px] overflow-y-auto"
        role="tablist"
        aria-label="Financial Times vocabulary categories"
      >
        {rows.map((r, j) => (
          <button
            key={r.category}
            type="button"
            role="tab"
            aria-selected={j === i}
            onClick={() => setI(j)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium border text-left transition-colors max-w-[min(100%,280px)] ${
              j === i
                ? 'border-accent bg-accent-soft text-accent-ink ring-2 ring-accent/15'
                : 'border-ink-200 bg-canvas-raised text-ink-600 hover:border-ink-300'
            }`}
          >
            <span className="line-clamp-2">{r.category}</span>
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-0 lg:divide-x lg:divide-ink-200" role="tabpanel" aria-labelledby={panelId}>
        <div className="p-5 space-y-4">
          <div>
            <div className="text-2xs font-mono uppercase tracking-wide text-ink-500 mb-1">Reader priority</div>
            <p className="text-sm text-ink-900 font-medium m-0 leading-snug">{row.readerPriority}</p>
          </div>
          <div>
            <div className="text-2xs font-mono uppercase tracking-wide text-ink-500 mb-2">Typical VizSpec.type values</div>
            <div className="flex flex-wrap gap-1.5">
              {types.map(t => (
                <span
                  key={t}
                  className="rounded-md border border-ink-200 bg-canvas-sunken/50 px-2 py-1 font-mono text-2xs text-ink-800"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-signal/25 bg-signal-soft/40 p-4">
            <div className="text-2xs font-semibold uppercase tracking-wide text-signal-ink mb-1.5 flex items-center gap-1.5">
              <Sparkle size={12} aria-hidden />
              Agent / layout policy
            </div>
            <p className="text-sm text-ink-800 m-0 leading-relaxed">{row.policy}</p>
          </div>
        </div>
        <div className="p-4 lg:p-5 bg-canvas-sunken/25 flex flex-col min-h-[220px]">
          <div className="text-2xs font-mono uppercase tracking-wide text-ink-500 mb-2">Geometry hint (demo data)</div>
          <div className="flex-1 min-h-[180px]">
            <FtCategoryMiniChart category={row.category} />
          </div>
        </div>
      </div>
    </div>
  )
}

export function FtCategoryMiniChart({ category }: { category: string }) {
  const g = { top: 6, right: 8, left: -16, bottom: 2 }

  if (category === 'Spatial') {
    return (
      <div className="grid grid-cols-3 gap-2 h-full min-h-[168px] p-2" aria-hidden>
        {['bg-accent/35', 'bg-ink-200', 'bg-signal/30', 'bg-ink-200', 'bg-accent/55', 'bg-ink-200', 'bg-signal/25', 'bg-ink-200', 'bg-accent/25'].map(
          (c, idx) => (
            <div key={idx} className={`rounded-lg ${c} border border-ink-200/60`} />
          ),
        )}
      </div>
    )
  }

  if (category === 'Flow') {
    const wf = [
      { n: 'Start', v: 40 },
      { n: 'A', v: 12 },
      { n: 'B', v: -8 },
      { n: 'C', v: 15 },
    ]
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={wf} margin={g}>
          <CartesianGrid stroke={INK_GRID} vertical={false} />
          <XAxis dataKey="n" tick={tickSmall} tickLine={false} axisLine={{ stroke: 'rgba(14,15,18,0.09)' }} />
          <YAxis hide />
          <Bar dataKey="v" radius={[4, 4, 0, 0]} isAnimationActive={false}>
            {wf.map((entry, index) => (
              <Cell key={entry.n} fill={entry.v < 0 ? '#B0263A' : index === 0 ? '#9CA3AF' : ACCENT} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    )
  }

  if (category === 'Part-to-whole') {
    const stacked = [
      { x: 'Q1', a: 12, b: 8, c: 5 },
      { x: 'Q2', a: 10, b: 9, c: 6 },
      { x: 'Q3', a: 11, b: 7, c: 7 },
    ]
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={stacked} margin={g}>
          <CartesianGrid stroke={INK_GRID} vertical={false} />
          <XAxis dataKey="x" tick={tickSmall} tickLine={false} axisLine={{ stroke: 'rgba(14,15,18,0.09)' }} />
          <YAxis hide />
          <Area type="monotone" dataKey="a" stackId="1" stroke={ACCENT} fill={`${ACCENT}55`} isAnimationActive={false} />
          <Area type="monotone" dataKey="b" stackId="1" stroke="#7a5a9e" fill="#7a5a9e44" isAnimationActive={false} />
          <Area type="monotone" dataKey="c" stackId="1" stroke="#C7841C" fill="#C7841C44" isAnimationActive={false} />
        </AreaChart>
      </ResponsiveContainer>
    )
  }

  if (category === 'Correlation') {
    const sc = [
      { x: 2, y: 8 },
      { x: 4, y: 12 },
      { x: 5, y: 9 },
      { x: 7, y: 16 },
      { x: 8, y: 14 },
    ]
    return (
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={g}>
          <CartesianGrid stroke={INK_GRID} />
          <XAxis type="number" dataKey="x" tick={tickSmall} tickLine={false} axisLine={{ stroke: 'rgba(14,15,18,0.09)' }} />
          <YAxis type="number" dataKey="y" tick={tickSmall} tickLine={false} axisLine={{ stroke: 'rgba(14,15,18,0.09)' }} />
          <Scatter data={sc} fill={ACCENT} isAnimationActive={false} />
        </ScatterChart>
      </ResponsiveContainer>
    )
  }

  if (category === 'Distribution') {
    const hist = [3, 8, 14, 22, 18, 10, 4, 2].map((v, k) => ({ k: String(k + 1), v }))
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={hist} margin={g}>
          <CartesianGrid stroke={INK_GRID} vertical={false} />
          <XAxis dataKey="k" tick={tickSmall} tickLine={false} axisLine={{ stroke: 'rgba(14,15,18,0.09)' }} />
          <YAxis hide />
          <Bar dataKey="v" fill={ACCENT} radius={[3, 3, 0, 0]} isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    )
  }

  if (category === 'Deviation') {
    const dv = [
      { n: 'East', v: 6 },
      { n: 'West', v: -4 },
      { n: 'Central', v: 2 },
    ]
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={dv} margin={g}>
          <CartesianGrid stroke={INK_GRID} vertical={false} />
          <XAxis dataKey="n" tick={tickSmall} tickLine={false} axisLine={{ stroke: 'rgba(14,15,18,0.09)' }} />
          <YAxis hide />
          <ReferenceLine y={0} stroke="#3D414C" strokeDasharray="4 4" />
          <Bar dataKey="v" radius={[3, 3, 0, 0]} isAnimationActive={false}>
            {dv.map(e => (
              <Cell key={e.n} fill={e.v < 0 ? '#B0263A' : '#1F7A4D'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    )
  }

  if (category === 'Change over time') {
    const series = [
      { x: 'W1', y: 41 },
      { x: 'W2', y: 44 },
      { x: 'W3', y: 43 },
      { x: 'W4', y: 48 },
    ]
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={series} margin={g}>
          <defs>
            <linearGradient id="ds-ft-lens-change" x1="100%" x2="100%" y1="0" y2="100%">
              <stop offset="0%" stopColor={ACCENT} stopOpacity={0.35} />
              <stop offset="100%" stopColor={ACCENT} stopOpacity={0.06} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={INK_GRID} vertical={false} />
          <XAxis dataKey="x" tick={tickSmall} tickLine={false} axisLine={{ stroke: 'rgba(14,15,18,0.09)' }} />
          <YAxis hide />
          <Area
            type="monotone"
            dataKey="y"
            stroke={ACCENT}
            strokeWidth={2}
            fill="url(#ds-ft-lens-change)"
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    )
  }

  if (category === 'Ranking' || category === 'Magnitude') {
    const rank =
      category === 'Ranking'
        ? [
            { n: 'West', v: 48 },
            { n: 'Central', v: 41 },
            { n: 'East', v: 35 },
          ]
        : [
            { n: 'Book', v: 120 },
            { n: 'Phone', v: 90 },
            { n: 'Chair', v: 66 },
          ]
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart layout="vertical" data={rank} margin={{ top: 6, right: 12, left: 40, bottom: 2 }}>
          <CartesianGrid stroke={INK_GRID} horizontal={false} />
          <XAxis type="number" hide />
          <YAxis dataKey="n" type="category" tick={tickSmall} tickLine={false} axisLine={false} width={56} />
          <Bar dataKey="v" fill={ACCENT} radius={[0, 4, 4, 0]} isAnimationActive={false} barSize={18} />
        </BarChart>
      </ResponsiveContainer>
    )
  }

  const line = [
    { x: 'W1', y: 41 },
    { x: 'W2', y: 44 },
    { x: 'W3', y: 43 },
    { x: 'W4', y: 48 },
  ]
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={line} margin={g}>
        <CartesianGrid stroke={INK_GRID} vertical={false} />
        <XAxis dataKey="x" tick={tickSmall} tickLine={false} axisLine={{ stroke: 'rgba(14,15,18,0.09)' }} />
        <YAxis hide />
        <Line type="monotone" dataKey="y" stroke={ACCENT} strokeWidth={2} dot={{ r: 4, fill: ACCENT }} isAnimationActive={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}

/** VizSpec.type list + pipeline visualization: type → FT story → primitive → shell → AI hook. */
export function DesignSystemVizSpecPipelineExplorer({ rows }: { rows: VizCatalogTableRow[] }) {
  const [i, setI] = useState(0)
  const [q, setQ] = useState('')
  const row = rows[i] ?? rows[0]
  const filtered = rows
    .map((r, idx) => ({ r, idx }))
    .filter(({ r }) => {
      if (!q.trim()) return true
      const s = q.toLowerCase()
      return (
        r.type.toLowerCase().includes(s) ||
        r.ft.toLowerCase().includes(s) ||
        r.primitive.toLowerCase().includes(s) ||
        r.shell.toLowerCase().includes(s) ||
        r.aiHook.toLowerCase().includes(s)
      )
    })

  return (
    <div className="rounded-2xl border border-ink-200 bg-canvas-raised overflow-hidden">
      <div className="px-5 py-3 border-b border-ink-200 bg-canvas-sunken/40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="text-2xs font-mono font-semibold uppercase tracking-wide text-ink-500">Interactive · catalog</div>
          <p className="text-sm text-ink-800 m-0 mt-1 font-medium">VizSpec → FT lens → primitive → shell → AI</p>
        </div>
        <label className="flex items-center gap-2 text-xs text-ink-600 shrink-0">
          <span className="sr-only">Filter types</span>
          <input
            type="search"
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Filter…"
            className="rounded-lg border border-ink-200 bg-canvas-raised px-3 py-1.5 font-mono text-2xs w-40 sm:w-48 text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-accent/25"
          />
        </label>
      </div>
      <div className="grid lg:grid-cols-[minmax(0,220px)_1fr] gap-0 lg:divide-x lg:divide-ink-200 max-h-[420px] lg:max-h-none">
        <div className="overflow-y-auto max-h-48 lg:max-h-[360px] border-b lg:border-b-0 border-ink-200 p-2" role="listbox" aria-label="VizSpec types">
          {filtered.length === 0 ? (
            <p className="text-2xs text-ink-500 px-2 py-4 m-0">No matches</p>
          ) : (
            filtered.map(({ r, idx }) => (
              <button
                key={r.type}
                type="button"
                role="option"
                aria-selected={idx === i}
                onClick={() => setI(idx)}
                className={`w-full text-left rounded-lg px-3 py-2 mb-1 text-2xs font-mono transition-colors ${
                  idx === i ? 'bg-accent-soft text-accent-ink font-semibold ring-1 ring-accent/20' : 'text-ink-700 hover:bg-canvas-sunken/60'
                }`}
              >
                {r.type}
              </button>
            ))
          )}
        </div>
        <div className="p-5 space-y-5">
          <PipelineStep label="VizSpec.type" mono highlight>
            {row.type}
          </PipelineStep>
          <PipelineArrow />
          <PipelineStep label="FT story (typical)" mono={false}>
            {row.ft}
          </PipelineStep>
          <PipelineArrow />
          <PipelineStep label="Primitive" mono highlight>
            {row.primitive}
          </PipelineStep>
          <PipelineArrow />
          <PipelineStep label="Molecule shell" mono={false}>
            {row.shell}
          </PipelineStep>
          <PipelineArrow />
          <div className="rounded-xl border border-signal/30 bg-signal-soft/45 p-4">
            <div className="text-2xs font-mono uppercase tracking-wide text-signal-ink mb-1 flex items-center gap-1.5">
              <Sparkle size={12} aria-hidden />
              AI hook
            </div>
            <p className="text-sm text-ink-900 m-0 leading-relaxed">{row.aiHook}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function PipelineStep({
  label,
  children,
  mono,
  highlight,
}: {
  label: string
  children: ReactNode
  mono?: boolean
  highlight?: boolean
}) {
  return (
    <div>
      <div className="text-2xs font-mono uppercase tracking-wide text-ink-500 mb-1">{label}</div>
      <div
        className={`rounded-xl border px-3 py-2.5 text-sm ${
          highlight ? 'border-accent/30 bg-accent-soft/40 font-mono text-2xs text-accent-ink' : 'border-ink-200 bg-canvas-sunken/35 text-ink-800'
        } ${mono ? 'font-mono text-2xs' : ''}`}
      >
        {children}
      </div>
    </div>
  )
}

function PipelineArrow() {
  return (
    <div className="flex justify-center py-0.5" aria-hidden>
      <div className="text-ink-300 text-lg leading-none">↓</div>
    </div>
  )
}

const AI_ICON_FOR: Record<string, FC<IconProps>> = {
  AgentDock: Sparkle,
  InsightBlock: Trend,
  AskNextChips: SuggestionChips,
  SelectionReceipt: Check,
  AgentSidePanel: PanelRight,
  AgentTooltip: TooltipBubble,
}

/** Click a molecule card — expands binding + role (same data as reference table). */
export function DesignSystemAiMoleculeExplorer({ rows }: { rows: AiMoleculeTableRow[] }) {
  const [active, setActive] = useState(0)
  const row = rows[active] ?? rows[0]
  const Icon = AI_ICON_FOR[row.molecule] ?? Sparkle

  return (
    <div className="rounded-2xl border border-ink-200 bg-canvas-raised overflow-hidden">
      <div className="px-5 py-3 border-b border-ink-200 bg-canvas-sunken/40">
        <div className="text-2xs font-mono font-semibold uppercase tracking-wide text-ink-500">Interactive · AI surface</div>
        <p className="text-sm text-ink-800 m-0 mt-1 font-medium">Molecules bind context — they do not render charts</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 p-3 border-b border-ink-100">
        {rows.map((r, j) => {
          const I = AI_ICON_FOR[r.molecule] ?? Sparkle
          const on = j === active
          return (
            <button
              key={r.molecule}
              type="button"
              onClick={() => setActive(j)}
              className={`rounded-xl border text-left p-3 transition-colors flex gap-3 items-start ${
                on ? 'border-accent bg-accent-soft/50 ring-2 ring-accent/15' : 'border-ink-200 bg-canvas-raised hover:bg-canvas-sunken/40'
              }`}
            >
              <div
                className={`shrink-0 w-9 h-9 rounded-lg border flex items-center justify-center ${
                  on ? 'border-accent/40 bg-canvas-raised text-accent' : 'border-ink-200 text-ink-500'
                }`}
              >
                <I size={18} aria-hidden />
              </div>
              <div className="min-w-0">
                <div className="font-mono text-2xs text-accent-ink font-semibold">{r.molecule}</div>
                <div className="text-2xs text-ink-500 mt-0.5 line-clamp-2">{r.binds}</div>
              </div>
            </button>
          )
        })}
      </div>
      <div className="p-5 grid md:grid-cols-[auto_1fr] gap-6 items-start bg-signal-soft/25">
        <div className="w-14 h-14 rounded-2xl border border-signal/35 bg-canvas-raised flex items-center justify-center text-signal">
          <Icon size={28} aria-hidden />
        </div>
        <div>
          <div className="font-mono text-sm text-accent-ink font-semibold">{row.molecule}</div>
          <div className="text-2xs font-mono uppercase tracking-wide text-ink-500 mt-2 mb-1">Binds to</div>
          <p className="text-sm text-ink-800 m-0">{row.binds}</p>
          <div className="text-2xs font-mono uppercase tracking-wide text-ink-500 mt-4 mb-1">Role in UI</div>
          <p className="text-sm text-ink-900 m-0 leading-relaxed">{row.role}</p>
        </div>
      </div>
    </div>
  )
}

/** Cross-chart interaction: pick a gesture — see comfortable vs compact vs mobile + motion + AI column. */
export function DesignSystemCrossChartInteractionExplorer({ rows }: { rows: InteractionMatrixRow[] }) {
  const [i, setI] = useState(0)
  const row = rows[i] ?? rows[0]

  return (
    <div className="rounded-2xl border border-ink-200 bg-canvas-raised overflow-hidden">
      <div className="px-5 py-3 border-b border-ink-200 bg-canvas-sunken/40">
        <div className="text-2xs font-mono font-semibold uppercase tracking-wide text-ink-500">Interactive · density matrix</div>
        <p className="text-sm text-ink-800 m-0 mt-1 font-medium">
          One gesture at a time — mirrors the expanded matrix, not a live chart surface.
        </p>
      </div>
      <div className="flex gap-2 overflow-x-auto p-3 border-b border-ink-100 scrollbar-thin" role="tablist" aria-label="Chart interactions">
        {rows.map((r, j) => (
          <button
            key={r.name}
            type="button"
            role="tab"
            aria-selected={j === i}
            onClick={() => setI(j)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium border whitespace-nowrap transition-colors ${
              j === i ? 'bg-ink-900 text-canvas border-ink-900' : 'border-ink-200 text-ink-600 bg-canvas-raised hover:border-ink-300'
            }`}
          >
            {r.name}
          </button>
        ))}
      </div>
      <div className="p-4 space-y-4" role="tabpanel">
        <div className="grid md:grid-cols-3 gap-3">
          {(
            [
              ['Comfortable', row.desktop, 'bg-canvas-sunken/50 border-ink-200'],
              ['Compact', row.compact, 'bg-accent-soft/25 border-accent/20'],
              ['Mobile', row.mobile, 'bg-signal-soft/30 border-signal/25'],
            ] as const
          ).map(([label, body, cls]) => (
            <div key={label} className={`rounded-xl border p-4 ${cls}`}>
              <div className="text-2xs font-mono font-semibold uppercase tracking-wide text-ink-500 mb-2">{label}</div>
              <p className="text-sm text-ink-900 m-0 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          <span className="rounded-md border border-ink-200 bg-canvas-raised px-2.5 py-1 font-mono text-2xs text-ink-700">
            motion tier · <span className="text-accent-ink font-semibold">{row.motion}</span>
          </span>
          <div className="flex-1 min-w-[min(100%,220px)] rounded-xl border border-signal/25 bg-signal-soft/35 px-3 py-2">
            <span className="text-2xs font-semibold text-signal-ink uppercase tracking-wide">AI</span>
            <p className="text-sm text-ink-900 m-0 mt-1 leading-snug">{row.ai}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

/** FT lens chips + live mini-chart hint — pairs taxonomy with pixels. */
export function DesignSystemFTStoryLensStrip() {
  const [k, setK] = useState(0)
  const L = FT_LENS[k]

  return (
    <div className="rounded-2xl border border-ink-200 bg-canvas-raised overflow-hidden">
      <div className="px-5 py-3 border-b border-ink-200 bg-canvas-sunken/40">
        <div className="text-2xs font-mono font-semibold uppercase tracking-wide text-ink-500">FT Visual Vocabulary lens</div>
          <p className="text-sm text-ink-700 m-0 mt-1">
            Same geometry component as <span className="font-mono text-2xs">Story intent</span> below — bar, scatter, heat grid, waterfall bars, not six copies of a line chart.
          </p>
      </div>
      <div className="flex flex-wrap gap-2 p-4 border-b border-ink-100">
        {FT_LENS.map((f, i) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setK(i)}
            className={`rounded-full px-3 py-2 text-xs font-medium border transition-colors ${
              i === k ? `${f.color} ring-2 ring-accent/20` : 'border-ink-200 bg-canvas-raised text-ink-600 hover:border-ink-300'
            }`}
          >
            {f.key}
          </button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-4 p-4">
        <div className={`rounded-xl border p-4 ${L.color}`}>
          <div className="text-2xs font-mono text-ink-500 mb-1">Typical VizSpec</div>
          <div className="text-base font-semibold text-ink-900">{L.sample}</div>
        </div>
        <div className="h-[168px] rounded-xl border border-ink-200 bg-canvas-sunken/30 p-2">
          <FtCategoryMiniChart category={L.key} />
        </div>
      </div>
    </div>
  )
}

/** Icon strip for layer taxonomy — matches Lucide + DS card chrome used elsewhere on this route. */
export function DesignSystemLayersIconStrip() {
  const rows = [
    { label: 'Atoms', icon: AtomicPrimitives, hint: 'Text · Icon · Divider' },
    { label: 'Molecules', icon: MoleculeBond, hint: 'Dock · Chips · Tile' },
    { label: 'Organisms', icon: OrganismLayout, hint: 'Dashboard · Queue · Shell' },
    { label: 'Motion tiers', icon: EasingMotion, hint: 'instant → hero' },
    { label: 'Mobile', icon: MobileDevice, hint: 'Brief · Sheet' },
    { label: 'Governance', icon: TableRows, hint: 'Table · toggles' },
  ]
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
      {rows.map(r => (
        <div
          key={r.label}
          className="rounded-2xl border border-ink-200 bg-canvas-raised px-3 py-4 md:py-5 flex flex-col items-center text-center min-h-[8.5rem] md:min-h-0 ring-1 ring-accent/10"
        >
          <div className="ds-layer-icon-well ds-layer-icon-well--lg mx-auto shrink-0">
            <r.icon size={24} aria-hidden />
          </div>
          <div className="text-xs font-semibold text-ink-900 mt-3 leading-tight">{r.label}</div>
          <div className="text-2xs text-ink-500 mt-1.5 leading-snug max-w-[11rem]">{r.hint}</div>
        </div>
      ))}
    </div>
  )
}

export function DesignSystemAccessibilityBento() {
  const tiles = [
    { Icon: ContrastSplit, title: 'Contrast', body: 'Text + signal surfaces aim at WCAG 2.2 AA.' },
    { Icon: FocusCorners, title: 'Focus', body: 'Visible rings on all interactive controls in .ds-doc.' },
    { Icon: HandPointerUp, title: 'Touch', body: 'Targets ≥ 44px on primary actions in demos.' },
    { Icon: EasingMotion, title: 'Motion', body: 'prefers-reduced-motion collapses chart transitions.' },
  ]
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {tiles.map(x => (
        <div key={x.title} className="rounded-2xl border border-ink-200 bg-canvas-raised px-4 py-4 flex gap-3">
          <div className="ds-layer-icon-well">
            <x.Icon size={18} aria-hidden />
          </div>
          <div>
            <div className="text-sm font-semibold text-ink-900">{x.title}</div>
            <p className="text-2xs text-ink-600 leading-relaxed m-0 mt-1">{x.body}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export function DesignSystemHeroBento() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
      <div className="col-span-2 rounded-2xl border border-ink-200 bg-canvas-raised p-4 flex flex-col justify-between min-h-[140px]">
        <div className="flex items-center gap-2 text-2xs font-mono uppercase tracking-[0.14em] text-ink-500">
          <Trend size={14} className="text-accent" aria-hidden />
          Sparkline · same primitive as KPI tiles
        </div>
        <div className="h-10 w-full mt-2 min-w-0">
          <Sparkline values={[3, 4, 3.5, 5, 4.2, 4.6, 4.4]} stroke={ACCENT} height={40} />
        </div>
        <p className="text-2xs text-ink-500 m-0 mt-2 leading-snug">Lightweight SVG path — not a separate chart engine check.</p>
      </div>
      <div className="rounded-2xl border border-signal/30 bg-signal-soft/40 p-4 flex flex-col justify-center min-h-[140px]">
        <Sparkle size={18} className="text-signal mb-2" aria-hidden />
        <div className="text-xs font-semibold text-signal-ink">Agent-bound selection</div>
        <div className="text-2xs text-ink-600 mt-1 leading-snug">Dock + chips, not a thread.</div>
      </div>
      <div className="rounded-2xl border border-ink-200 bg-canvas-sunken/50 p-4 flex flex-col justify-center min-h-[140px]">
        <div className="text-2xs font-mono text-ink-500">Tableau captures</div>
        <div className="text-2xl font-semibold tabular-nums text-ink-900 mt-1">75</div>
        <div className="text-2xs text-ink-600">PNG inventory · design system rail lists all</div>
      </div>
    </div>
  )
}
