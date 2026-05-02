import { Link } from 'react-router-dom'
import { ArrowRight } from '../components/Icons'

const githubRoot = import.meta.env.VITE_GITHUB_URL?.trim().replace(/\/$/, '') ?? null

function blob(path: string) {
  if (!githubRoot) return null
  return `${githubRoot}/blob/main/${path}`
}

const toc = [
  { id: 'quality', label: 'Quality bar' },
  { id: 'foundation', label: 'Foundation' },
  { id: 'captures', label: 'Capture roots' },
  { id: 'layers', label: 'Atoms → organisms' },
  { id: 'viz-ai', label: 'Viz + AI' },
  { id: 'ft-vocab', label: 'FT vocabulary' },
  { id: 'layout', label: 'Dynamic layout' },
  { id: 'source', label: 'Source files' },
] as const

const FT_VOCAB_URL = 'https://ft-interactive.github.io/visual-vocabulary/'

const vizCatalog: Array<{ type: string; ft: string; primitive: string; shell: string; aiHook: string }> = [
  { type: 'kpiScalar', ft: 'Magnitude · Δ time', primitive: 'ScalarPrimitive', shell: 'KpiTile', aiHook: 'Focus metric scopes AgentDock.' },
  { type: 'sparkInline', ft: 'Change over time', primitive: 'SparkPrimitive', shell: 'KpiTile, BriefCard', aiHook: 'Hover teaser → InsightBlock.' },
  { type: 'line', ft: 'Change · deviation', primitive: 'LineChartPrimitive', shell: 'TrendBlock', aiHook: 'Nearest point → drivers / ruled out + chips.' },
  { type: 'area', ft: 'Change · part-to-whole', primitive: 'AreaChartPrimitive', shell: 'TrendBlock', aiHook: 'Stacked segments; warn if many slices.' },
  { type: 'bar', ft: 'Magnitude · ranking · time', primitive: 'BarChartPrimitive', shell: 'TrendBlock', aiHook: 'Baseline zero; category scope + filters.' },
  { type: 'divergingBar', ft: 'Deviation', primitive: 'DivergingBarPrimitive', shell: 'TrendBlock', aiHook: 'States baseline (zero · target · avg).' },
  { type: 'lineColumnCombo', ft: 'Change · correlation', primitive: 'ComboLineColumnPrimitive', shell: 'TrendBlock', aiHook: 'Dual measure; name which axis is which.' },
  { type: 'histogram', ft: 'Distribution', primitive: 'HistogramPrimitive', shell: 'TrendBlock', aiHook: 'Spread / skew; bins from spec or default.' },
  { type: 'slope', ft: 'Ranking', primitive: 'SlopeChartPrimitive', shell: 'TrendBlock', aiHook: 'Rank change across two periods.' },
  { type: 'waterfall', ft: 'Flow · deviation', primitive: 'WaterfallPrimitive', shell: 'TrendBlock', aiHook: 'Bridge +/− stages narrative.' },
  { type: 'smallMultiples', ft: 'Change · magnitude', primitive: 'MultiplesFrame + child', shell: 'TrendBlock', aiHook: 'Facet outliers → InsightList.' },
  { type: 'scatter', ft: 'Correlation', primitive: 'ScatterPrimitive', shell: 'TrendBlock', aiHook: 'Default: no implied causation.' },
  { type: 'map', ft: 'Spatial', primitive: 'GeoPrimitive', shell: 'GeoWidget', aiHook: 'Prefer rate/ratio framing for choropleth-style.' },
  { type: 'bullet', ft: 'Magnitude · part-to-whole', primitive: 'BulletPrimitive', shell: 'KpiTile variant', aiHook: 'Band breach + threshold source.' },
  { type: 'heatmapGrid', ft: 'Correlation · distribution', primitive: 'HeatmapPrimitive', shell: 'DataTable pattern', aiHook: '2D intensity; cell → lineage.' },
  { type: 'tableBars', ft: 'Magnitude · ranking', primitive: 'RankedBarCellPrimitive', shell: 'Queue inset', aiHook: 'Magnitude beside machine reason.' },
  { type: 'sankey', ft: 'Flow', primitive: 'SankeyPrimitive (ph.2)', shell: 'TrendBlock', aiHook: 'Summarize dominant paths first.' },
]

const ftPickerRows: Array<{ category: string; readerPriority: string; specTypes: string; policy: string }> = [
  { category: 'Change over time', readerPriority: 'Trend, period context', specTypes: 'line, area, bar (time), lineColumnCombo, spark, smallMultiples', policy: 'Single series often clearest; stacked time = hard to read components.' },
  { category: 'Magnitude', readerPriority: 'Size of things', specTypes: 'bar, kpiScalar, tableBars, bullet', policy: 'Bars baseline at zero; lollipop = bar + variant.' },
  { category: 'Deviation', readerPriority: '± vs reference', specTypes: 'divergingBar, signed line/area', policy: 'Agent labels the reference explicitly.' },
  { category: 'Ranking', readerPriority: 'Order > exact value', specTypes: 'sorted bar, tableBars, slope', policy: 'Sort order is part of the spec.' },
  { category: 'Correlation', readerPriority: 'Variables move together', specTypes: 'scatter, heatmapGrid, lineColumnCombo', policy: 'Do not imply causation in copy.' },
  { category: 'Distribution', readerPriority: 'Frequency, spread', specTypes: 'histogram, heatmapGrid', policy: 'Histogram bins documented when it matters.' },
  { category: 'Part-to-whole', readerPriority: 'Components of one whole', specTypes: 'stacked area/bar, bullet', policy: 'Few segments; caution when many small slices.' },
  { category: 'Spatial', readerPriority: 'Geography is the story', specTypes: 'map', policy: 'Choropleth-style: prefer rates/ratios over raw counts.' },
  { category: 'Flow', readerPriority: 'Volume between states', specTypes: 'waterfall; sankey phase 2', policy: 'Waterfall for staged bridges; Sankey = high burden.' },
]

const aiBinders: Array<{ molecule: string; binds: string; role: string }> = [
  { molecule: 'AgentDock', binds: 'Region + selection', role: 'Default-read narrative; primary AI surface.' },
  { molecule: 'InsightBlock', binds: 'Selection + VizSpec', role: 'Title, body, confidence, field + time evidence.' },
  { molecule: 'AskNextChips', binds: 'Chart type + selection', role: 'Max 3 drills; no chat thread.' },
  { molecule: 'SelectionReceipt', binds: 'Send / publish', role: 'Frozen snapshot of viz state in generated message.' },
  { molecule: 'AgentSidePanel', binds: 'User-expanded', role: 'Freeform follow-up; secondary to dock.' },
  { molecule: 'AgentTooltip', binds: 'Hover point', role: 'Dense mode; defers to dock on comfortable.' },
]

const interactionRows: Array<{ name: string; desktop: string; compact: string; mobile: string; motion: string; ai: string }> = [
  { name: 'Hover / track', desktop: 'Tooltip + optional crosshair', compact: 'Thinner chrome', mobile: 'Long-press → BottomSheet', motion: 'snap / read', ai: 'Cites hovered datum; optional chip refresh.' },
  { name: 'Click / tap', desktop: 'Select series or point', compact: 'Same', mobile: 'Tap toggles; second opens dock', motion: 'snap', ai: 'AgentDock scopes to selection.' },
  { name: 'Legend toggle', desktop: 'Isolate series', compact: 'Same', mobile: 'Overflow / sheet', motion: 'instant', ai: 'Narrative respects visible series only.' },
  { name: 'Brush / range', desktop: 'Off default (Maya)', compact: 'On in analyst', mobile: 'Off', motion: 'read', ai: 'Time-scoped insight + compare chip.' },
  { name: 'Keyboard', desktop: 'Arrow between points', compact: 'Full', mobile: 'OS focus', motion: 'instant', ai: 'Same events as click.' },
  { name: 'Escape', desktop: 'Clear selection', compact: 'Clear', mobile: 'Clear + dismiss sheet', motion: 'snap', ai: 'Returns to route-level brief.' },
]

const captureRoots: Array<{ folder: string; proves: string; yields: string }> = [
  { folder: 'flow-a-onboarding + key/08', proves: 'Cloud home, trial', yields: 'HomeShell, TrialBanner, content grid' },
  { folder: 'flow-b-first-authoring + key/01', proves: 'Shelves, Show Me, connect, coach', yields: 'AuthoringChrome, FieldPill, Shelf, ChartIntent, ConnectPanel' },
  { folder: 'flow-c-admin-settings', proves: 'Users table', yields: 'DataTable, AdminPageHeader' },
  { folder: 'flow-d-explore-superstore + key/03, 04', proves: 'Sprawl, exec wall', yields: 'WorkbookGrid, KpiStrip, DashboardGrid' },
  { folder: 'flow-e-mobile + key/05', proves: 'Squished consume', yields: 'MobileViewport, BriefStack, BottomSheet' },
  { folder: 'flow-f-pulse + key/06, 06b', proves: 'Metric wizard + narrative', yields: 'MetricHero, InsightList, Stepper' },
  { folder: 'flow-g-edit-with-lod + key/02, 07', proves: 'Agent tooltip, LOD', yields: 'AgentTooltip, FormulaEditor, AnalysisMenu' },
  { folder: 'flow-h-ai-agent + key/09–11', proves: 'Activation, panel, disclaimer', yields: 'SettingsToggleCluster, AgentSidePanel, ComplianceBanner' },
]

const organisms: Array<{ name: string; contains: string; anchor: string }> = [
  { name: 'ReadingDashboard', contains: 'KpiStrip, AdaptiveGrid, AgentDock', anchor: 'Maya key/04 wall of widgets' },
  { name: 'AuthoringShell', contains: 'DataPane, ShelfRow, CanvasFrame, RunwayColumn', anchor: 'flow-b' },
  { name: 'PulseHome', contains: 'PulseEmptyState or MetricGrid', anchor: 'flow-f' },
  { name: 'CurationQueuePage', contains: 'StackedHealthBar, QueueRow, AskNextChips', anchor: 'Jordan flow' },
  { name: 'MobileBriefingStack', contains: 'BriefCard, BottomSheet', anchor: 'Sam / flow-e contrast' },
  { name: 'AdminSettingsLayout', contains: 'SettingsToggleCluster, DataTable', anchor: 'flow-c / flow-h' },
]

export default function DesignSystem() {
  const p03 = blob('plan/03-design-system.md')
  const p14 = blob('plan/14-design-system-architecture.md')
  const designMd = blob('tableau-coworker/DESIGN.md')

  return (
    <article className="max-w-5xl mx-auto px-6 py-14">
      <header className="mb-10">
        <div className="h-eyebrow mb-4">Reference · Design system</div>
        <h1 className="h-display mb-6">
          Foundations that scale with{' '}
          <span className="italic text-accent">role-adaptive layout</span>
        </h1>
        <p className="text-lg text-ink-600 max-w-3xl">
          This page is the readable surface for reviewers: tokens, a full <strong className="text-ink-800">chart-type catalog</strong>,{' '}
          <strong className="text-ink-800">interaction matrix</strong>, and how <strong className="text-ink-800">AI molecules</strong> bind to
          dynamic <span className="font-mono text-2xs text-ink-500">VizSpec</span> output — grounded in capture roots under{' '}
          <span className="font-mono text-2xs text-ink-500">public/captures/</span>. Canonical detail lives in{' '}
          <span className="font-mono text-2xs">plan/14-design-system-architecture.md</span> (§6.3a–6.7, FT Visual Vocabulary alignment).
        </p>
        <div className="mt-6 flex flex-wrap gap-2 text-sm">
          {toc.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="px-2.5 py-1 rounded-md border border-ink-200 text-ink-600 hover:border-accent/40 hover:text-ink-900"
            >
              {item.label}
            </a>
          ))}
        </div>
      </header>

      <section id="quality" className="mb-20 scroll-mt-24">
        <h2 className="h-section mb-2">Quality bar</h2>
        <p className="prose-body text-ink-600 mb-8 max-w-prose">
          Not their pixels. Their constraints: hierarchy, numeric craft, motion discipline, system completeness — on par
          with how Stripe, Robinhood, and Apple Health treat product surfaces.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <QualityCard
            title="Documentation-grade clarity"
            source="Stripe analogue"
            body="Relentless hierarchy, elevation and border discipline, predictable component boundaries. Few surprises per screen."
          />
          <QualityCard
            title="Numbers as first-class"
            source="Robinhood analogue"
            body="Tabular alignment, spark context, legible deltas. Mobile scale is explicit, not desktop squish."
          />
          <QualityCard
            title="Calm density"
            source="Apple Health analogue"
            body="Progressive disclosure. Motion encodes state change, not decoration. Summary patterns for status at a glance."
          />
        </div>
      </section>

      <section id="foundation" className="mb-20 scroll-mt-24">
        <h2 className="h-section mb-8">Foundation</h2>

        <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-500 mb-4">Color roles</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          <Swatch name="canvas" hex="#FAFAF7" className="bg-canvas border border-ink-100" labelDark />
          <Swatch name="accent" hex="#5B2E91" className="bg-accent text-white" />
          <Swatch name="signal" hex="#C7841C" className="bg-signal text-white" />
          <Swatch name="ink-900" hex="#0E0F12" className="bg-ink-900 text-white" />
        </div>

        <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-500 mb-4">Typography</h3>
        <div className="card-raised p-8 mb-10 space-y-6">
          <div>
            <div className="text-2xs font-mono text-ink-400 mb-1">Source Serif 4 — display</div>
            <p className="editorial text-3xl text-ink-900">Monday briefing. West region is the outlier.</p>
          </div>
          <div>
            <div className="text-2xs font-mono text-ink-400 mb-1">Inter — body</div>
            <p className="text-base text-ink-700 max-w-prose leading-relaxed">
              Narration sits with the metric: what changed, what we ruled out, and what still needs a human. Confidence is explicit.
            </p>
          </div>
          <div>
            <div className="text-2xs font-mono text-ink-400 mb-1">JetBrains Mono — metric</div>
            <p className="font-mono text-xl text-ink-900 tabular-nums">$2.84M · <span className="text-danger">−6.2%</span> WoW · 94% conf.</p>
          </div>
        </div>

        <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-500 mb-4">Viz semantic roles (spec)</h3>
        <div className="overflow-x-auto rounded-lg border border-ink-100">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-canvas-sunken text-left text-2xs uppercase tracking-wide text-ink-500">
                <th className="p-3 font-medium">Role</th>
                <th className="p-3 font-medium">Maps to</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {[
                ['viz.gridline', 'ink-200 @ low opacity'],
                ['viz.axis', 'ink-500'],
                ['viz.selection', 'signal stroke + soft fill'],
                ['viz.hover', 'accent-soft @ 40%'],
                ['viz.null', 'dashed ink-300'],
              ].map(([a, b]) => (
                <tr key={a} className="bg-canvas-raised">
                  <td className="p-3 font-mono text-xs text-ink-800">{a}</td>
                  <td className="p-3 text-ink-600">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <MiniTable
            title="Density modes"
            rows={[
              ['comfortable', 'Maya exec, Sam mobile — default rhythm'],
              ['compact', 'Jordan queue — −25% vertical, smaller body'],
              ['analyst', 'Authoring — comfortable chrome, compact data pane'],
            ]}
          />
          <MiniTable
            title="Motion tiers"
            rows={[
              ['instant', '0–80ms · focus, checkbox'],
              ['snap', '120–200ms · hover, drawer'],
              ['read', '240–400ms · chart re-layout'],
              ['hero', '400–600ms · section enter, once per route'],
            ]}
          />
        </div>
        <p className="text-xs text-ink-500 mt-4">
          Reduced motion: collapse to instant + opacity only.
        </p>
      </section>

      <section id="captures" className="mb-20 scroll-mt-24">
        <h2 className="h-section mb-2">Capture roots</h2>
        <p className="prose-body text-ink-600 mb-6 max-w-prose">
          Every molecule in the spec lists at least one path under <span className="font-mono text-2xs">captures/</span>.
          If it is not anchored there, we do not imply Tableau ships it today.
        </p>
        <div className="overflow-x-auto rounded-lg border border-ink-100">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-canvas-sunken text-left text-2xs uppercase tracking-wide text-ink-500">
                <th className="p-3 font-medium w-[28%]">Flow / key</th>
                <th className="p-3 font-medium w-[28%]">Proves</th>
                <th className="p-3 font-medium">Yields (system)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {captureRoots.map(row => (
                <tr key={row.folder} className="bg-canvas-raised">
                  <td className="p-3 font-mono text-2xs text-ink-800 align-top">{row.folder}</td>
                  <td className="p-3 text-ink-600 align-top">{row.proves}</td>
                  <td className="p-3 text-ink-700 align-top">{row.yields}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="layers" className="mb-20 scroll-mt-24">
        <h2 className="h-section mb-2">Layers</h2>
        <p className="prose-body text-ink-600 mb-8 max-w-prose">
          Atoms are presentation-only. Molecules encode one interaction or data relationship. Organisms compose for a full
          surface. Implementation target: <span className="font-mono text-2xs">src/components/ds/</span>.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card p-6">
            <h3 className="h-card mb-3">Atoms</h3>
            <ul className="text-sm text-ink-600 space-y-1.5 list-disc pl-4">
              <li>Text variants: display, title, body, caption, mono, metric</li>
              <li>Icon, FocusRing, Divider, Scrim, KeyBadge</li>
              <li>Dot, Spinner, ScrollShadow, Elevation</li>
            </ul>
          </div>
          <div className="card p-6 md:col-span-2">
            <h3 className="h-card mb-3">Molecules (categories)</h3>
            <ul className="text-sm text-ink-600 space-y-1.5 grid sm:grid-cols-2 gap-x-8 gap-y-1.5 list-disc pl-4">
              <li>Chrome: AppHeader, SidebarRail, BreadcrumbBar, TabStrip</li>
              <li>Trust: ConnectPanel, DataSourceRow, CertifiedBadge</li>
              <li>Authoring: DataPane, FieldPill, Shelf, MarksCard, ChartIntentChips</li>
              <li>Read: KpiTile, TrendBlock, GeoWidget, FilterChipBar</li>
              <li>Agent: AgentDock, InsightBlock, AskNextChips, DisclaimerModal</li>
              <li>Governance: QueueRow, StackedHealthBar, LineageHint</li>
              <li>Mobile: BriefCard, BottomSheet</li>
            </ul>
          </div>
        </div>

        <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-500 mb-4">Organisms</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {organisms.map(o => (
            <div key={o.name} className="card-raised p-5 border-l-2 border-accent/50">
              <div className="font-mono text-xs text-accent-ink mb-1">{o.name}</div>
              <div className="text-sm text-ink-700 mb-2">{o.contains}</div>
              <div className="text-2xs text-ink-500">{o.anchor}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="viz-ai" className="mb-20 scroll-mt-24">
        <h2 className="h-section mb-2">Dynamic visualization + AI</h2>
        <p className="prose-body text-ink-600 mb-4 max-w-prose">
          Coworker treats charts as <strong className="text-ink-800">data-driven slots</strong>: the model emits a discriminated{' '}
          <span className="font-mono text-2xs">VizSpec</span> plus optional <span className="font-mono text-2xs">VizStoryMeta</span>{' '}
          (FT Visual Vocabulary category — what relationship the reader should take away). Primitives render; shared selection state drives{' '}
          <span className="font-mono text-2xs">AgentDock</span>. Pages do not import chart libraries directly — only the primitive for{' '}
          <span className="font-mono text-2xs">spec.type</span>.
        </p>
        <p className="text-sm text-ink-500 mb-8 max-w-prose">
          <strong className="text-ink-600">Shared selection contract:</strong>{' '}
          <span className="font-mono text-2xs">VizSelectionState</span> —{' '}
          <span className="font-mono text-2xs">vizId, spec, activeSeriesKeys?, activePoint?, brushedRange?, source: user | agent</span>.
          Agent-driven highlights use <span className="font-mono text-2xs">source: &apos;agent&apos;</span> so emphasis stays contestable.
        </p>

        <h3 id="ft-vocab" className="text-lg font-semibold text-ink-900 mb-3 scroll-mt-28">
          Story intent: FT Visual Vocabulary
        </h3>
        <p className="text-sm text-ink-600 mb-4 max-w-prose">
          Same method as the{' '}
          <a href={FT_VOCAB_URL} className="text-accent font-medium hover:underline" target="_blank" rel="noreferrer">
            Financial Times Visual Vocabulary
          </a>
          : choose the <strong className="text-ink-800">dominant data relationship</strong> first, then a <span className="font-mono text-2xs">VizSpec.type</span>{' '}
          inside that column. Local reference: <span className="font-mono text-2xs">context/Visual-vocabulary.pdf</span>. Not an exhaustive chart encyclopedia — a
          story-first constraint for layout and agent disclosure.
        </p>
        <div className="overflow-x-auto rounded-lg border border-ink-100 mb-6">
          <table className="w-full text-sm min-w-[800px]">
            <thead>
              <tr className="bg-canvas-sunken text-left text-2xs uppercase tracking-wide text-ink-500">
                <th className="p-3 font-medium">FT category</th>
                <th className="p-3 font-medium">Reader priority</th>
                <th className="p-3 font-medium">Typical VizSpec types</th>
                <th className="p-3 font-medium">Coworker / agent policy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {ftPickerRows.map(row => (
                <tr key={row.category} className="bg-canvas-raised">
                  <td className="p-3 font-medium text-ink-800 whitespace-nowrap">{row.category}</td>
                  <td className="p-3 text-ink-600">{row.readerPriority}</td>
                  <td className="p-3 font-mono text-2xs text-ink-700">{row.specTypes}</td>
                  <td className="p-3 text-ink-700">{row.policy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="text-sm text-ink-600 list-disc pl-5 space-y-1 mb-10 max-w-prose">
          <li><strong className="text-ink-800">Correlation</strong> charts: agent uses association language unless evidence supports causation.</li>
          <li><strong className="text-ink-800">Spatial</strong> (choropleth-style): prefer rate/ratio measures; raw counts need explicit framing.</li>
          <li><strong className="text-ink-800">Magnitude</strong> bars: length encoding baseline at zero (lollipop inherits).</li>
          <li><strong className="text-ink-800">Part-to-whole</strong> over time: call out when component trends are hard to read.</li>
        </ul>

        <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-500 mb-4">VizSpec types → FT lens → primitives → AI hook</h3>
        <div className="overflow-x-auto rounded-lg border border-ink-100 mb-10">
          <table className="w-full text-sm min-w-[860px]">
            <thead>
              <tr className="bg-canvas-sunken text-left text-2xs uppercase tracking-wide text-ink-500">
                <th className="p-3 font-medium">type</th>
                <th className="p-3 font-medium">FT story (typical)</th>
                <th className="p-3 font-medium">Primitive</th>
                <th className="p-3 font-medium">Molecule shell</th>
                <th className="p-3 font-medium">AI hook</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {vizCatalog.map(row => (
                <tr key={row.type} className="bg-canvas-raised">
                  <td className="p-3 font-mono text-2xs text-accent-ink whitespace-nowrap">{row.type}</td>
                  <td className="p-3 text-ink-600 text-2xs">{row.ft}</td>
                  <td className="p-3 font-mono text-2xs text-ink-800">{row.primitive}</td>
                  <td className="p-3 text-ink-600">{row.shell}</td>
                  <td className="p-3 text-ink-700">{row.aiHook}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-500 mb-4">AI molecules (not renderers)</h3>
        <div className="overflow-x-auto rounded-lg border border-ink-100 mb-10">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="bg-canvas-sunken text-left text-2xs uppercase tracking-wide text-ink-500">
                <th className="p-3 font-medium">Molecule</th>
                <th className="p-3 font-medium">Binds to</th>
                <th className="p-3 font-medium">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {aiBinders.map(row => (
                <tr key={row.molecule} className="bg-canvas-raised">
                  <td className="p-3 font-mono text-2xs text-accent-ink">{row.molecule}</td>
                  <td className="p-3 text-ink-600">{row.binds}</td>
                  <td className="p-3 text-ink-700">{row.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-500 mb-4">Interactions (cross-chart)</h3>
        <div className="overflow-x-auto rounded-lg border border-ink-100 mb-6">
          <table className="w-full text-sm min-w-[900px]">
            <thead>
              <tr className="bg-canvas-sunken text-left text-2xs uppercase tracking-wide text-ink-500">
                <th className="p-3 font-medium">Interaction</th>
                <th className="p-3 font-medium">Comfortable</th>
                <th className="p-3 font-medium">Compact</th>
                <th className="p-3 font-medium">Mobile</th>
                <th className="p-3 font-medium">Motion</th>
                <th className="p-3 font-medium">AI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {interactionRows.map(row => (
                <tr key={row.name} className="bg-canvas-raised">
                  <td className="p-3 font-medium text-ink-800 whitespace-nowrap">{row.name}</td>
                  <td className="p-3 text-ink-600">{row.desktop}</td>
                  <td className="p-3 text-ink-600">{row.compact}</td>
                  <td className="p-3 text-ink-600">{row.mobile}</td>
                  <td className="p-3 font-mono text-2xs text-ink-500">{row.motion}</td>
                  <td className="p-3 text-ink-700">{row.ai}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-ink-600 max-w-prose">
          End-to-end (spec §6.7): model emits <span className="font-mono text-2xs">Region[]</span> +{' '}
          <span className="font-mono text-2xs">VizSpec</span> (with <span className="font-mono text-2xs">story</span> / FT category) →{' '}
          <span className="font-mono text-2xs">AdaptiveGrid</span> mounts primitives → events update <span className="font-mono text-2xs">VizSelectionState</span> →{' '}
          <span className="font-mono text-2xs">AgentDock</span> loads <span className="font-mono text-2xs">InsightBlock</span> +{' '}
          <span className="font-mono text-2xs">AskNextChips</span> using category policy. Density and motion gates control tooltip vs sheet and brush availability.
        </p>
      </section>

      <section id="layout" className="mb-20 scroll-mt-24">
        <h2 className="h-section mb-4">Dynamic layout</h2>
        <p className="prose-body text-ink-600 mb-6 max-w-prose">
          Screens are composed from ordered <strong className="text-ink-800">regions</strong> (model-supplied), mapped to slots in{' '}
          <span className="font-mono text-2xs">AdaptiveGrid</span>. Persona and breakpoint change collapse order, not the semantic contract.
        </p>

        <div className="grid lg:grid-cols-2 gap-6">
          <pre className="card p-5 overflow-x-auto text-2xs font-mono text-ink-700 leading-relaxed bg-canvas-sunken">
{`type RegionKind =
  | 'header' | 'kpi' | 'primaryViz' | 'secondaryViz'
  | 'narrative' | 'agent' | 'filters' | 'footer'
  | 'mobileStack'

interface Region {
  id: string
  kind: RegionKind
  priority: number
  minHeight?: number
  colSpan?: { sm: number; lg: number }
  source?: 'model' | 'userPin' | 'systemDefault'
}`}
          </pre>
          <div className="space-y-4">
            <div className="card-raised p-5">
              <div className="text-2xs font-mono text-ink-400 mb-2">Breakpoints (Tailwind-aligned)</div>
              <ul className="text-sm text-ink-600 space-y-1 font-mono text-2xs">
                <li>sm 640 — Sam stacks</li>
                <li>md 768 — agent dock below viz</li>
                <li>lg 1024 — full Maya split</li>
                <li>xl 1280 — authoring three-pane</li>
              </ul>
            </div>
            <div className="card-raised p-5">
              <div className="text-2xs font-mono text-ink-400 mb-2">VizSpec → primaryViz</div>
              <p className="text-sm text-ink-600">
                Discriminated union in plan §6.4 (includes <span className="font-mono text-2xs">VizStoryMeta</span> §6.3a):{' '}
                line, area, bar, divergingBar, combo, histogram, slope, waterfall, maps, heatmaps, sankey (phase 2), etc. See{' '}
                <strong className="text-ink-800">Viz + AI</strong> for the FT-mapped catalog.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="source" className="mb-8 scroll-mt-24">
        <h2 className="h-section mb-4">Source files</h2>
        <div className="card-raised p-8 flex flex-col sm:flex-row flex-wrap gap-4">
          {p14 ? (
            <a href={p14} target="_blank" rel="noreferrer" className="btn-secondary text-sm inline-flex">
              plan/14 — architecture <ArrowRight size={14} />
            </a>
          ) : null}
          {p03 ? (
            <a href={p03} target="_blank" rel="noreferrer" className="btn-secondary text-sm inline-flex">
              plan/03 — tokens &amp; voice <ArrowRight size={14} />
            </a>
          ) : null}
          {designMd ? (
            <a href={designMd} target="_blank" rel="noreferrer" className="btn-secondary text-sm inline-flex">
              DESIGN.md <ArrowRight size={14} />
            </a>
          ) : null}
          <Link to="/strategy" className="btn-accent text-sm inline-flex">
            Strategy pillars (live) <ArrowRight size={14} />
          </Link>
          <Link to="/flows" className="btn-primary text-sm inline-flex">
            Persona flows <ArrowRight size={14} />
          </Link>
        </div>
        {!githubRoot ? (
          <p className="text-xs text-ink-500 mt-4">
            Set <span className="font-mono">VITE_GITHUB_URL</span> in <span className="font-mono">.env</span> for links to plan files on GitHub.
          </p>
        ) : null}
      </section>
    </article>
  )
}

function QualityCard({ title, source, body }: { title: string; source: string; body: string }) {
  return (
    <div className="card-raised p-6 flex flex-col">
      <div className="text-2xs font-mono text-accent mb-3">{source}</div>
      <h3 className="text-base font-semibold text-ink-900 mb-2">{title}</h3>
      <p className="text-sm text-ink-600 leading-relaxed flex-1">{body}</p>
    </div>
  )
}

function Swatch({ name, hex, className, labelDark }: { name: string; hex: string; className: string; labelDark?: boolean }) {
  return (
    <div className={`rounded-lg p-4 min-h-[5.5rem] flex flex-col justify-end ${className}`}>
      <div className={`text-2xs font-medium ${labelDark ? 'text-ink-800' : 'text-white/90'}`}>{name}</div>
      <div className={`font-mono text-2xs ${labelDark ? 'text-ink-500' : 'text-white/70'}`}>{hex}</div>
    </div>
  )
}

function MiniTable({ title, rows }: { title: string; rows: [string, string][] }) {
  return (
    <div className="card-raised overflow-hidden border border-ink-100">
      <div className="px-4 py-2 bg-canvas-sunken text-2xs font-semibold uppercase tracking-wide text-ink-500">{title}</div>
      <table className="w-full text-sm">
        <tbody className="divide-y divide-ink-100">
          {rows.map(([k, v]) => (
            <tr key={k} className="bg-canvas-raised">
              <td className="p-3 font-mono text-2xs text-accent-ink whitespace-nowrap align-top w-[36%]">{k}</td>
              <td className="p-3 text-ink-600 align-top">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
