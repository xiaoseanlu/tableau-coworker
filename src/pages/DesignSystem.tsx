import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, AtomicPrimitives, MoleculeBond, OrganismLayout } from '../components/Icons'
import {
  DesignSystemAgentSurfaceMock,
  DesignSystemInteractionPlayground,
  DesignSystemLayoutDiagram,
  DesignSystemUISamples,
  DesignSystemVizRolesDemo,
  DesignSystemVizTypeGallery,
} from '../components/ds/DesignSystemSamples'
import {
  DesignSystemAiMoleculeExplorer,
  DesignSystemCaptureEvidenceStrip,
  DesignSystemCrossChartInteractionExplorer,
  DesignSystemFtStoryExplorer,
  DesignSystemFTStoryLensStrip,
  DesignSystemHeroBento,
  DesignSystemAccessibilityBento,
  DesignSystemLayersIconStrip,
  DesignSystemLayoutModePlayground,
  DesignSystemVizSelectionToAgentDemo,
  DesignSystemVizSpecPipelineExplorer,
} from '../components/ds/DesignSystemInteractiveDemos'
import {
  DENSITY_MODE_ROWS,
  FONT_ROLE_ROWS,
  IMPLEMENTATION_MAP,
  MOTION_TIER_ROWS,
  RADIUS_ROWS,
  SCOPE_IN,
  SCOPE_OUT,
  SPACING_ROWS,
  TYPE_SCALE_ROWS,
  VIZ_SEMANTIC_ROWS,
  VOICE_DO_LINES,
  VOICE_DONT_LINES,
} from '../data/designSystemReference'

const githubRoot = import.meta.env.VITE_GITHUB_URL?.trim().replace(/\/$/, '') ?? null

function blob(path: string) {
  if (!githubRoot) return null
  return `${githubRoot}/blob/main/${path}`
}

const toc = [
  { id: 'quality', label: 'Quality bar' },
  { id: 'foundation', label: 'Foundation' },
  { id: 'visual-samples', label: 'Visual samples' },
  { id: 'capture-evidence', label: 'Capture evidence' },
  { id: 'layers', label: 'Layers' },
  { id: 'viz-ai', label: 'Viz + AI' },
  { id: 'ft-visual', label: 'FT lens' },
  { id: 'layout', label: 'Layout' },
  { id: 'contract', label: 'Contract & scope' },
  { id: 'source', label: 'Source' },
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

  const sectionDivider =
    'pt-20 md:pt-28 mt-20 md:mt-28 border-t border-ink-100 scroll-mt-28'

  return (
    <div className="min-h-screen bg-canvas text-ink-900">
      <Link to="/design-system#design-system-main" className="ds-skip-link">
        Skip to main content
      </Link>
      <article
        id="design-system-main"
        className="ds-doc max-w-[64rem] mx-auto px-6 sm:px-10 pb-32 md:pb-44"
      >
        <header className="pt-16 md:pt-20 pb-12 md:pb-16 border-b border-ink-100">
          <div className="grid lg:grid-cols-[1fr,minmax(0,28rem)] gap-10 lg:gap-14 items-start">
            <div>
              <div className="h-eyebrow mb-4">Design system · prototype</div>
              <h1 className="h-display mb-6 max-w-4xl tracking-tight">
                Show the system:{' '}
                <span className="italic text-accent">tokens, viz, AI, layout</span>
              </h1>
              <p className="text-base md:text-lg leading-relaxed text-ink-600 max-w-xl mb-8">
                Visual-first reference: interactive demos first, tables second. This page uses the same tokens and components as the rest of the prototype ({' '}
                <Link to="/design-system#contract" className="text-accent font-semibold underline underline-offset-2 decoration-accent/40 hover:decoration-accent">
                  scope
                </Link>
                ).
              </p>
              <nav className="flex flex-wrap gap-3 pt-1" aria-label="On this page">
                {toc.map(item => (
                  <Link key={item.id} to={`/design-system#${item.id}`} className="ds-toc-pill">
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
            <DesignSystemHeroBento />
          </div>
        </header>

      <section id="quality" className="pt-16 md:pt-20 scroll-mt-28" aria-labelledby="quality-heading">
        <h2 id="quality-heading" className="h-section mb-6 tracking-tight">
          Quality bar
        </h2>
        <p className="ds-section-lede">
          Hierarchy, numerics, motion discipline — borrowed constraints, not borrowed brand chrome.
        </p>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-4">
          <QualityCard
            title="Documentation-grade clarity"
            source="Stripe analogue"
            body="Relentless hierarchy, elevation and border discipline, predictable component boundaries. Few surprises per screen."
            sample={
              <div className="rounded-xl border border-ink-200 bg-canvas-sunken/45 p-3.5 text-left space-y-2">
                <div className="text-2xs uppercase tracking-[0.14em] text-ink-500 font-medium">Workbook · Regional sales</div>
                <div className="text-sm font-semibold text-ink-900 leading-snug">Pipeline by quarter</div>
                <div className="text-xs text-ink-600 leading-snug">
                  Eyebrow, title, support — same rhythm as workbook chrome and agent cards.
                </div>
              </div>
            }
          />
          <QualityCard
            title="Numbers as first-class"
            source="Robinhood analogue"
            body="Tabular alignment, spark context, legible deltas. Mobile scale is explicit, not desktop squish."
            sample={
              <div className="rounded-xl border border-ink-200 bg-canvas-sunken/45 p-3.5 text-left">
                <div className="font-mono text-xl font-semibold tabular-nums text-ink-900 tracking-tight">$2.84M</div>
                <div className="font-mono text-xs font-medium tabular-nums text-danger mt-1">−6.2% WoW</div>
                <div className="text-2xs text-ink-500 mt-2.5 leading-relaxed">
                  KPI tile language: magnitude and delta share one vertical scan. Spark context lives in the tile gallery below, not here.
                </div>
              </div>
            }
          />
          <QualityCard
            title="Calm density"
            source="Apple Health analogue"
            body="Progressive disclosure. Motion encodes state change, not decoration. Summary patterns for status at a glance."
            sample={
              <div className="rounded-xl border border-ink-200 bg-canvas-sunken/45 p-3.5 text-left space-y-2">
                <div className="flex items-center gap-2 text-sm text-ink-800">
                  <span className="dot bg-success shrink-0" aria-hidden />
                  <span className="leading-snug">Pulse metric · draft</span>
                </div>
                <p className="text-2xs text-ink-500 m-0 pl-6 border-l border-ink-200 ml-0.5 leading-relaxed">
                  Summary row first; configuration and footnotes stay tucked until you need them.
                </p>
              </div>
            }
          />
        </div>
      </section>

      <section id="foundation" className={sectionDivider} aria-labelledby="foundation-heading">
        <h2 id="foundation-heading" className="h-section mb-8 tracking-tight">
          Foundation
        </h2>

        <h3 className="ds-subheading mt-0 mb-4">Color roles</h3>
        <ul className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-8 list-none p-0" role="list" aria-label="Brand and semantic colors">
          <li className="min-w-0">
            <Swatch name="canvas" hex="#FAFAF7" className="bg-canvas border border-ink-100" labelDark />
          </li>
          <li className="min-w-0">
            <Swatch name="ink-200" hex="#DDE0E8" className="bg-ink-200 border border-ink-200" labelDark />
          </li>
          <li className="min-w-0">
            <Swatch name="accent" hex="#5B2E91" className="bg-accent text-white" />
          </li>
          <li className="min-w-0">
            <Swatch name="signal" hex="#C7841C" className="bg-signal text-white" />
          </li>
          <li className="min-w-0">
            <Swatch name="success" hex="#1F7A4D" className="bg-success text-white" />
          </li>
          <li className="min-w-0">
            <Swatch name="warning" hex="#A85B00" className="bg-warning text-white" />
          </li>
          <li className="min-w-0">
            <Swatch name="danger" hex="#B0263A" className="bg-danger text-white" />
          </li>
          <li className="min-w-0">
            <Swatch name="ink-900" hex="#0E0F12" className="bg-ink-900 text-white" />
          </li>
        </ul>

        <h3 className="ds-subheading mt-10 mb-4">Typography</h3>
        <div className="rounded-2xl border border-ink-200 bg-canvas-raised p-10 md:p-12 mb-12 md:mb-16 space-y-8">
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
            <p className="text-sm text-ink-600 max-w-prose mt-3 m-0 leading-relaxed">
              Flows use the same rule: KPI magnitudes and deltas in mono with{' '}
              <code className="font-mono text-2xs bg-ink-50 px-1 rounded">tabular-nums</code>. Shared helpers live in CSS as{' '}
              <code className="font-mono text-2xs bg-ink-50 px-1 rounded">.metric-value</code>,{' '}
              <code className="font-mono text-2xs bg-ink-50 px-1 rounded">.metric-value-lg</code>, and{' '}
              <code className="font-mono text-2xs bg-ink-50 px-1 rounded">.metric-delta</code> (see{' '}
              <code className="font-mono text-2xs bg-ink-50 px-1 rounded">styles/index.css</code>).
            </p>
          </div>
        </div>

        <h3 id="type-scale" className="ds-subheading mt-10 mb-3 scroll-mt-28">
          Type scale (tailwind)
        </h3>
        <p className="text-sm text-ink-600 mb-4 max-w-prose leading-relaxed">
          Editorial 15px body default — intentional, not browser default. Tracking: tighter on display;{' '}
          <span className="font-mono text-2xs">0.14em</span> uppercase on eyebrows.
        </p>
        <div className="ds-table-wrap overflow-x-auto mb-8" role="region" aria-label="Type scale tokens">
          <table className="ds-table min-w-[720px]">
            <thead>
              <tr>
                <th scope="col">Token</th>
                <th scope="col">Sample</th>
                <th scope="col">Size</th>
                <th scope="col">Line</th>
                <th scope="col">Use</th>
              </tr>
            </thead>
            <tbody>
              {TYPE_SCALE_ROWS.map(row => (
                <tr key={row.token}>
                  <td className="font-mono text-xs text-ink-900">{row.token}</td>
                  <td className="max-w-[22rem]">
                    {row.sampleLine2 ? (
                      <div className="space-y-3">
                        <div>
                          <span className="block text-2xs font-mono text-ink-400 mb-1">{row.sampleLine2.prefix}</span>
                          <span
                            className={`${row.token} uppercase tracking-[0.14em] text-ink-500 font-medium inline-block`}
                          >
                            {row.sampleLine2.text}
                          </span>
                        </div>
                        <div>
                          <span className="block text-2xs font-mono text-ink-400 mb-1">Pill / chip</span>
                          <span className={`${row.token} inline-flex ${row.sampleExtraClass ?? ''}`}>{row.sample}</span>
                        </div>
                      </div>
                    ) : (
                      <span className={`${row.token} inline-block ${row.sampleExtraClass ?? ''}`}>{row.sample}</span>
                    )}
                  </td>
                  <td className="font-mono text-2xs text-ink-700">{row.px}</td>
                  <td className="font-mono text-2xs text-ink-700">{row.lh}</td>
                  <td className="text-sm text-ink-700">{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="ds-subheading mt-10 mb-4">Font roles</h3>
        <div className="ds-table-wrap overflow-x-auto mb-10" role="region" aria-label="Font families">
          <table className="ds-table min-w-[400px]">
            <thead>
              <tr>
                <th scope="col">Role</th>
                <th scope="col">Family</th>
                <th scope="col">Class</th>
              </tr>
            </thead>
            <tbody>
              {FONT_ROLE_ROWS.map(row => (
                <tr key={row.role}>
                  <td className="text-sm text-ink-800">{row.role}</td>
                  <td className="text-sm text-ink-700">{row.family}</td>
                  <td className="font-mono text-2xs text-ink-900">{row.tailwind}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div>
            <h3 id="radius-spacing" className="ds-subheading mt-10 mb-4 scroll-mt-28">
              Border radius
            </h3>
            <div className="ds-table-wrap overflow-x-auto" role="region" aria-label="Border radius tokens">
              <table className="ds-table">
                <thead>
                  <tr>
                    <th scope="col">Token</th>
                    <th scope="col">Preview</th>
                    <th scope="col">Value</th>
                    <th scope="col">Use</th>
                  </tr>
                </thead>
                <tbody>
                  {RADIUS_ROWS.map(row => (
                    <tr key={row.token}>
                      <td className="font-mono text-xs text-ink-900">{row.token}</td>
                      <td className="text-ink-700">
                        <div className={`h-10 w-20 border border-ink-200 bg-accent/10 ${row.token}`} title={`${row.token} · ${row.context}`} />
                        <p className="text-2xs text-ink-500 m-0 mt-2 leading-snug">{row.context}</p>
                      </td>
                      <td className="font-mono text-2xs text-ink-700">{row.value}</td>
                      <td className="text-sm text-ink-700">{row.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h3 className="ds-subheading mt-10 mb-4">Spacing & layout width</h3>
            <div className="ds-table-wrap overflow-x-auto" role="region" aria-label="Spacing rules">
              <table className="ds-table">
                <thead>
                  <tr>
                    <th scope="col">Rule</th>
                    <th scope="col">Value</th>
                    <th scope="col">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {SPACING_ROWS.map(row => (
                    <tr key={row.step}>
                      <td className="text-sm font-medium text-ink-800">{row.step}</td>
                      <td className="font-mono text-2xs text-ink-900">{row.px}</td>
                      <td className="text-sm text-ink-700">{row.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <h3 className="ds-subheading mt-10 mb-4">Accessibility targets</h3>
        <div className="grid lg:grid-cols-2 gap-6 mb-12 md:mb-16 items-start">
          <DesignSystemAccessibilityBento />
          <div className="rounded-2xl border border-ink-200 bg-canvas-sunken/70 p-6 md:p-8">
            <ul className="m-0 pl-5 text-sm text-ink-700 space-y-2.5 leading-relaxed list-disc marker:text-accent">
              <li><strong className="font-semibold text-ink-900">Charts</strong> need accessible names or summaries in product — gallery uses demo labels.</li>
              <li><strong className="font-semibold text-ink-900">Color alone</strong> never carries direction; pair position + labels.</li>
            </ul>
          </div>
        </div>

        <h3 className="ds-subheading mt-10 mb-3">Viz semantic roles (spec)</h3>
        <p className="text-sm text-ink-600 mb-4 max-w-prose leading-relaxed">
          Plan/14 semantic names; charts today read hex from{' '}
          <span className="font-mono text-2xs text-ink-800">chartTokens.ts</span> — a deliberate bridge until CSS variables wire through Recharts.
        </p>
        <div className="ds-table-wrap overflow-x-auto" role="region" aria-label="Visualization token roles table">
          <table className="ds-table">
            <thead>
              <tr>
                <th scope="col">Role</th>
                <th scope="col">Maps to</th>
              </tr>
            </thead>
            <tbody>
              {VIZ_SEMANTIC_ROWS.map(row => (
                <tr key={row.role}>
                  <td className="font-mono text-xs text-ink-900">{row.role}</td>
                  <td className="text-sm text-ink-700">{row.maps}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="ds-subheading mt-10 mb-2">Semantic roles on one chart (static key)</h3>
        <p className="text-sm text-ink-600 mb-4 max-w-prose leading-relaxed m-0">
          Not another viz type — a single line with grid, axis, committed selection, and hover band so the viz.* tokens above have a shared picture.
        </p>
        <DesignSystemVizRolesDemo />

        <h3 id="density-motion" className="ds-subheading mt-10 mb-3 scroll-mt-28">
          Density & motion (layout engine inputs)
        </h3>
        <p className="text-sm text-ink-600 mb-6 max-w-prose leading-relaxed">
          Single <span className="font-mono text-2xs">density</span> prop on shell organisms in the architecture spec — demos approximate spacing; flows own final chrome.
        </p>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <MiniTable
            title="Density modes"
            rows={DENSITY_MODE_ROWS.map(r => [r.mode, `${r.when}. ${r.delta}.`] as [string, string])}
          />
          <div className="ds-table-wrap overflow-x-auto rounded-2xl">
            <table className="ds-table min-w-[420px]">
                <caption className="bg-canvas-sunken border-b border-ink-100 px-4 py-3 text-left text-2xs font-semibold uppercase tracking-wide text-ink-600 caption-top">
                  Motion tiers
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Tier</th>
                    <th scope="col">Duration</th>
                    <th scope="col">Easing</th>
                    <th scope="col">Allowed for</th>
                  </tr>
                </thead>
                <tbody>
                  {MOTION_TIER_ROWS.map(row => (
                    <tr key={row.tier}>
                      <td className="font-mono text-2xs text-accent-ink whitespace-nowrap">{row.tier}</td>
                      <td className="font-mono text-2xs text-ink-800">{row.duration}</td>
                      <td className="text-2xs text-ink-700">{row.easing}</td>
                      <td className="text-sm text-ink-700">{row.allowed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
        </div>
        <p className="text-xs text-ink-500 m-0">
          <strong className="font-semibold text-ink-700">prefers-reduced-motion:</strong> collapse to instant + opacity-only transitions (no decorative chart motion).
        </p>
      </section>

      <section id="visual-samples" className={sectionDivider} aria-labelledby="visual-samples-heading">
        <h2 id="visual-samples-heading" className="h-section mb-4 tracking-tight">
          Visual samples
        </h2>
        <p className="ds-section-lede">
          Primitives and charts below are interactive — no separate “example” panels here.
        </p>

        <h3 className="ds-subheading mt-0 mb-4">UI primitives</h3>
        <div className="rounded-2xl border border-ink-200 bg-canvas-raised p-8 md:p-10 mb-14 md:mb-20">
          <DesignSystemUISamples />
        </div>

        <h3 className="ds-subheading mt-10 mb-4">VizSpec gallery (one tile per type)</h3>
        <p className="text-sm text-ink-600 mb-6 max-w-2xl leading-relaxed">
          Each tile matches a <span className="font-mono text-2xs">VizSpec.type</span> from the catalog: real Recharts geometry, not screenshots.
          Select a type in <Link to="/design-system#viz-pipeline" className="text-accent font-semibold underline underline-offset-2 decoration-accent/40 hover:decoration-accent">VizSpec pipeline</Link> below to see FT mapping and AI hooks.
        </p>
        <DesignSystemVizTypeGallery />

        <h3 className="ds-subheading mt-10 mb-4">AI surface (molecules)</h3>
        <DesignSystemAgentSurfaceMock />

        <h3 id="interaction-playground" className="ds-subheading mt-10 mb-4 scroll-mt-28">
          Interaction playground
        </h3>
        <div className="rounded-2xl border border-ink-200 bg-canvas-raised p-6 md:p-8 mb-8">
          <DesignSystemInteractionPlayground />
        </div>
        <p className="text-xs text-ink-500 mb-10 max-w-prose leading-relaxed">
          Full matrix in <strong className="font-semibold text-ink-700">Viz + AI</strong> below. Primitives emit the same events whether input is mouse, touch, or keyboard.
        </p>
      </section>

      <section id="capture-evidence" className={sectionDivider} aria-labelledby="capture-evidence-heading">
        <h2 id="capture-evidence-heading" className="h-section mb-4 tracking-tight">
          Capture evidence
        </h2>
        <p className="ds-section-lede !mb-6">
          Full-width rail lists every PNG under <span className="font-mono text-2xs">public/captures/</span>. Table below is the flow → yield crosswalk.
          For the authoring sequence only (chronological proof + runway concept), see{' '}
          <Link to="/authoring" className="text-accent-ink font-semibold hover:underline">
            Authoring
          </Link>
          .
        </p>
        <div className="mb-10">
          <DesignSystemCaptureEvidenceStrip />
        </div>
        <h3 id="captures" className="text-xl font-semibold text-ink-900 mt-10 mb-3 scroll-mt-28 tracking-tight">
          Flow inventory
        </h3>
        <p className="text-sm text-ink-800 mb-3 max-w-prose leading-relaxed font-medium">
          Traceability: every folder in <span className="font-mono text-2xs">public/captures/</span> (indexed from plan/14) maps to a short proof and the prototype yields in the last column.
        </p>
        <p className="text-sm text-ink-600 mb-4 max-w-prose leading-relaxed">
          This table is not arbitrary UX flavor text: each row ties a <strong className="font-semibold text-ink-800">capture folder</strong> under{' '}
          <span className="font-mono text-2xs">public/captures/</span> to what those screenshots <em>prove</em> about current Tableau UI,
          and which <strong className="font-semibold text-ink-800">prototype components</strong> that evidence justifies in this repo.
          The rails above enumerate every PNG file; this is the curated “so what” crosswalk.
        </p>
        <div className="ds-table-wrap overflow-x-auto" role="region" aria-label="Capture flow inventory">
          <table className="ds-table min-w-[640px]">
            <thead>
              <tr>
                <th scope="col" className="w-[28%]">Flow / key</th>
                <th scope="col" className="w-[28%]">Proves</th>
                <th scope="col">Yields (system)</th>
              </tr>
            </thead>
            <tbody>
              {captureRoots.map(row => (
                <tr key={row.folder}>
                  <td className="font-mono text-2xs text-ink-900">{row.folder}</td>
                  <td className="text-ink-700">{row.proves}</td>
                  <td className="text-ink-800">{row.yields}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="layers" className={sectionDivider} aria-labelledby="layers-heading">
        <h2 id="layers-heading" className="h-section mb-4 tracking-tight">
          Layers
        </h2>
        <p className="ds-section-lede !mb-4">
          Atoms · molecules · organisms — taxonomy as UI. Buttons and chips are in <Link to="/design-system#visual-samples" className="text-accent font-semibold underline underline-offset-2 decoration-accent/40 hover:decoration-accent">Visual samples</Link>.
        </p>
        <p className="text-2xs font-mono text-ink-500 mb-6 max-w-prose leading-relaxed">
          Six tiles: Lucide via <span className="text-ink-700">Icons.tsx</span> — Atom, Component, LayoutTemplate, Gauge, Smartphone, Table — 24px in 12×12 wells (ring on each card). Headers: Atom / Component / LayoutTemplate.
        </p>
        <div className="mb-10">
          <DesignSystemLayersIconStrip />
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12">
          <div className="rounded-2xl border border-ink-200 bg-canvas-raised p-7 md:p-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="ds-layer-icon-well" aria-hidden>
                <AtomicPrimitives size={20} />
              </span>
              <h3 className="h-card m-0">Atoms</h3>
            </div>
            <ul className="text-sm text-ink-600 space-y-1.5 list-disc pl-4 m-0">
              <li>Text variants: display, title, body, caption, mono, metric</li>
              <li>Icon, FocusRing, Divider, Scrim, KeyBadge</li>
              <li>Dot, Spinner, ScrollShadow, Elevation</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-ink-200 bg-canvas-raised p-7 md:p-8 md:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <span className="ds-layer-icon-well" aria-hidden>
                <MoleculeBond size={20} />
              </span>
              <h3 className="h-card m-0">Molecules (categories)</h3>
            </div>
            <ul className="text-sm text-ink-600 space-y-1.5 grid sm:grid-cols-2 gap-x-8 gap-y-1.5 list-disc pl-4 m-0">
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

        <div className="flex items-center gap-3 mt-10 mb-3">
          <span className="ds-layer-icon-well" aria-hidden>
            <OrganismLayout size={20} />
          </span>
          <h3 className="ds-subheading m-0">Organisms</h3>
        </div>
        <p className="text-sm text-ink-600 mb-4 max-w-prose leading-relaxed">
          In atomic-design terms, <strong className="font-semibold text-ink-800">organisms</strong> are full-screen or page-level compositions — assemblies of molecules (e.g. AgentDock, KpiTile) that match a real scenario.
          They are listed here so stakeholders can point at a named layout and connect it to the capture flows in the table above.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          {organisms.map(o => (
            <div
              key={o.name}
              className="rounded-2xl border border-ink-200 bg-canvas-raised p-6 md:p-8"
            >
              <div className="font-mono text-xs text-accent-ink mb-1">{o.name}</div>
              <div className="text-sm text-ink-700 mb-2">{o.contains}</div>
              <div className="text-2xs text-ink-500">{o.anchor}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="viz-ai" className={sectionDivider} aria-labelledby="viz-ai-heading">
        <h2 id="viz-ai-heading" className="h-section mb-4 tracking-tight">
          Dynamic visualization + AI
        </h2>
        <p className="ds-section-lede">
          Selection on the chart updates the dock — same contract as flows.
        </p>

        <div className="mb-12 md:mb-16 rounded-2xl border border-ink-200 bg-canvas-raised/60 overflow-hidden p-4 md:p-6">
          <DesignSystemVizSelectionToAgentDemo />
        </div>

        <p className="text-sm text-ink-600 mb-6 max-w-prose leading-relaxed">
          <strong className="font-semibold text-ink-800">VizSelectionState:</strong>{' '}
          <span className="font-mono text-[0.8125rem] text-ink-700">vizId, spec, activeSeriesKeys?, activePoint?, brushedRange?, source: user | agent</span>.
          Agent highlights use <span className="font-mono text-[0.8125rem] text-ink-700">source: &apos;agent&apos;</span>.
        </p>

        <div id="ft-visual" className="mb-10 scroll-mt-28">
          <DesignSystemFTStoryLensStrip />
        </div>

        <h3 id="ft-vocab" className="text-xl font-semibold text-ink-900 mb-3 scroll-mt-32 tracking-tight">
          Story intent: FT Visual Vocabulary
        </h3>
        <p className="text-sm text-ink-600 mb-5 max-w-prose leading-relaxed">
          Same method as the{' '}
          <a
            href={FT_VOCAB_URL}
            className="text-accent font-semibold underline underline-offset-2 decoration-accent/40 hover:decoration-accent"
            target="_blank"
            rel="noreferrer"
            aria-label="Financial Times Visual Vocabulary (opens in new tab)"
          >
            Financial Times Visual Vocabulary
          </a>
          : dominant relationship first, then <span className="font-mono text-[0.8125rem] text-ink-700">VizSpec.type</span>. Reference:{' '}
          <span className="font-mono text-[0.8125rem] text-ink-700">context/Visual-vocabulary.pdf</span>.
        </p>

        <div className="mb-10">
          <DesignSystemFtStoryExplorer rows={ftPickerRows} />
        </div>

        <details className="group mb-10 rounded-2xl border border-ink-200 bg-canvas-sunken/30 p-4 open:p-5 open:bg-canvas-raised">
          <summary className="cursor-pointer text-sm font-semibold text-accent list-none flex items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
            <span>Full reference · FT category table</span>
            <span className="text-2xs font-mono text-ink-500 group-open:hidden">Expand</span>
          </summary>
          <div className="ds-table-wrap overflow-x-auto mt-4" role="region" aria-label="FT vocabulary categories and VizSpec mapping">
            <table className="ds-table min-w-[800px]">
              <thead>
                <tr>
                  <th scope="col">FT category</th>
                  <th scope="col">Reader priority</th>
                  <th scope="col">Typical VizSpec types</th>
                  <th scope="col">Coworker / agent policy</th>
                </tr>
              </thead>
              <tbody>
                {ftPickerRows.map(row => (
                  <tr key={row.category}>
                    <td className="font-semibold text-ink-900 whitespace-nowrap">{row.category}</td>
                    <td className="text-ink-700">{row.readerPriority}</td>
                    <td className="font-mono text-2xs text-ink-800">{row.specTypes}</td>
                    <td className="text-ink-800">{row.policy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
        <h3 id="viz-pipeline" className="ds-subheading mt-10 mb-4 scroll-mt-28">VizSpec types → FT lens → primitives → AI hook</h3>
        <div className="mb-8">
          <DesignSystemVizSpecPipelineExplorer rows={vizCatalog} />
        </div>

        <details className="group mb-10 rounded-2xl border border-ink-200 bg-canvas-sunken/30 p-4 open:p-5 open:bg-canvas-raised">
          <summary className="cursor-pointer text-sm font-semibold text-accent list-none flex items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
            <span>Full reference · all VizSpec rows</span>
            <span className="text-2xs font-mono text-ink-500 group-open:hidden">Expand</span>
          </summary>
          <div className="ds-table-wrap overflow-x-auto mt-4" role="region" aria-label="VizSpec type catalog">
            <table className="ds-table min-w-[860px]">
              <thead>
                <tr>
                  <th scope="col">type</th>
                  <th scope="col">FT story (typical)</th>
                  <th scope="col">Primitive</th>
                  <th scope="col">Molecule shell</th>
                  <th scope="col">AI hook</th>
                </tr>
              </thead>
              <tbody>
                {vizCatalog.map(row => (
                  <tr key={row.type}>
                    <td className="font-mono text-2xs text-accent-ink whitespace-nowrap">{row.type}</td>
                    <td className="text-2xs text-ink-700">{row.ft}</td>
                    <td className="font-mono text-2xs text-ink-900">{row.primitive}</td>
                    <td className="text-ink-700">{row.shell}</td>
                    <td className="text-ink-800">{row.aiHook}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>

        <h3 className="ds-subheading mt-10 mb-4">AI molecules (not renderers)</h3>
        <div className="mb-8">
          <DesignSystemAiMoleculeExplorer rows={aiBinders} />
        </div>

        <details className="group mb-10 rounded-2xl border border-ink-200 bg-canvas-sunken/30 p-4 open:p-5 open:bg-canvas-raised">
          <summary className="cursor-pointer text-sm font-semibold text-accent list-none flex items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
            <span>Full reference · AI molecule rows</span>
            <span className="text-2xs font-mono text-ink-500 group-open:hidden">Expand</span>
          </summary>
          <div className="ds-table-wrap overflow-x-auto mt-4" role="region" aria-label="AI molecules">
            <table className="ds-table min-w-[640px]">
              <thead>
                <tr>
                  <th scope="col">Molecule</th>
                  <th scope="col">Binds to</th>
                  <th scope="col">Role</th>
                </tr>
              </thead>
              <tbody>
                {aiBinders.map(row => (
                  <tr key={row.molecule}>
                    <td className="font-mono text-2xs text-accent-ink">{row.molecule}</td>
                    <td className="text-ink-700">{row.binds}</td>
                    <td className="text-ink-800">{row.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>

        <h3 className="ds-subheading mt-10 mb-2">Interactions (density matrix)</h3>
        <p className="text-sm text-ink-600 mb-4 max-w-prose leading-relaxed m-0">
          The explorer below is a compact matrix of the full table — not a second live chart. For pointer and keyboard behavior, use the{' '}
          <Link to="/design-system#interaction-playground" className="text-accent font-semibold underline underline-offset-2 decoration-accent/40 hover:decoration-accent">
            Interaction playground
          </Link>
          .
        </p>
        <div className="mb-6">
          <DesignSystemCrossChartInteractionExplorer rows={interactionRows} />
        </div>

        <details className="group mb-6 rounded-2xl border border-ink-200 bg-canvas-sunken/30 p-4 open:p-5 open:bg-canvas-raised">
          <summary className="cursor-pointer text-sm font-semibold text-accent list-none flex items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
            <span>Full reference · interaction matrix</span>
            <span className="text-2xs font-mono text-ink-500 group-open:hidden">Expand</span>
          </summary>
          <div className="ds-table-wrap overflow-x-auto mt-4" role="region" aria-label="Cross-chart interaction matrix">
            <table className="ds-table min-w-[900px]">
              <thead>
                <tr>
                  <th scope="col">Interaction</th>
                  <th scope="col">Comfortable</th>
                  <th scope="col">Compact</th>
                  <th scope="col">Mobile</th>
                  <th scope="col">Motion</th>
                  <th scope="col">AI</th>
                </tr>
              </thead>
              <tbody>
                {interactionRows.map(row => (
                  <tr key={row.name}>
                    <td className="font-semibold text-ink-900 whitespace-nowrap">{row.name}</td>
                    <td className="text-ink-700">{row.desktop}</td>
                    <td className="text-ink-700">{row.compact}</td>
                    <td className="text-ink-700">{row.mobile}</td>
                    <td className="font-mono text-2xs text-ink-600">{row.motion}</td>
                    <td className="text-ink-800">{row.ai}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
        <p className="text-sm text-ink-700 max-w-prose leading-relaxed">
          End-to-end (spec §6.7): model emits <span className="font-mono text-[0.8125rem] text-ink-800">Region[]</span> +{' '}
          <span className="font-mono text-[0.8125rem] text-ink-800">VizSpec</span> (with <span className="font-mono text-[0.8125rem] text-ink-800">story</span> / FT category) →{' '}
          <span className="font-mono text-[0.8125rem] text-ink-800">AdaptiveGrid</span> mounts primitives → events update <span className="font-mono text-[0.8125rem] text-ink-800">VizSelectionState</span> →{' '}
          <span className="font-mono text-[0.8125rem] text-ink-800">AgentDock</span> loads <span className="font-mono text-[0.8125rem] text-ink-800">InsightBlock</span> +{' '}
          <span className="font-mono text-[0.8125rem] text-ink-800">AskNextChips</span> using category policy. Density and motion gates control tooltip vs sheet and brush availability.
        </p>
      </section>

      <section id="layout" className={sectionDivider} aria-labelledby="layout-heading">
        <h2 id="layout-heading" className="h-section mb-6 tracking-tight">
          Dynamic layout
        </h2>
        <p className="ds-section-lede !mb-8">
          Regions are semantic; breakpoints reshape the grid. The playground is illustrative — not production routing.
        </p>

        <div className="mb-10">
          <DesignSystemLayoutModePlayground />
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          <pre
            className="ds-code m-0"
            tabIndex={0}
            aria-label="Region and RegionKind TypeScript types"
          >
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
            <div className="rounded-2xl border border-ink-200 bg-canvas-raised p-6 md:p-8">
              <div className="text-2xs font-mono font-semibold uppercase tracking-wide text-ink-500 mb-3">Breakpoints (Tailwind-aligned)</div>
              <ul className="text-sm text-ink-700 space-y-2 font-mono text-2xs leading-relaxed">
                <li>sm 640 — Sam stacks</li>
                <li>md 768 — agent dock below viz</li>
                <li>lg 1024 — full Maya split</li>
                <li>xl 1280 — authoring three-pane</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-ink-200 bg-canvas-raised p-6 md:p-8">
              <div className="text-2xs font-mono font-semibold uppercase tracking-wide text-ink-500 mb-3">VizSpec → primaryViz</div>
              <p className="text-sm text-ink-700 leading-relaxed m-0">
                Discriminated union in plan §6.4 (includes <span className="font-mono text-2xs text-ink-800">VizStoryMeta</span> §6.3a):{' '}
                line, area, bar, divergingBar, combo, histogram, slope, waterfall, maps, heatmaps, sankey (phase 2), etc. See{' '}
                <strong className="font-semibold text-ink-900">Viz + AI</strong> for the FT-mapped catalog.
              </p>
            </div>
          </div>
        </div>

        <h3 className="ds-subheading mt-12 mb-4">Region slots (schematic)</h3>
        <DesignSystemLayoutDiagram />
      </section>

      <section id="contract" className={sectionDivider} aria-labelledby="contract-heading">
        <h2 id="contract-heading" className="h-section mb-4 tracking-tight">
          Contract & scope
        </h2>
        <p className="ds-section-lede">
          What this repo commits to — and what a full vendor-scale DS would add later.
        </p>

        <h3 className="ds-subheading mt-0 mb-4">Agent voice (content)</h3>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="rounded-2xl border border-success/25 bg-success-soft/50 p-6 md:p-8">
            <div className="text-2xs font-mono font-semibold uppercase tracking-wide text-success mb-3">Use</div>
            <ul className="m-0 pl-4 text-sm text-ink-800 space-y-2 list-disc marker:text-success">
              {VOICE_DO_LINES.map(line => (
                <li key={line} className="leading-relaxed">
                  {line}
                </li>
              ))}
            </ul>
            <blockquote className="mt-5 m-0 pl-4 border-l-2 border-success/40 text-sm text-ink-800 leading-relaxed editorial italic">
              West coverage dipped after W6. I would want a manager to know pipeline thinned — not a definitional artefact. Confidence: moderate.
            </blockquote>
          </div>
          <div className="rounded-2xl border border-danger/25 bg-danger-soft/40 p-6 md:p-8">
            <div className="text-2xs font-mono font-semibold uppercase tracking-wide text-danger mb-3">Avoid</div>
            <ul className="m-0 pl-4 text-sm text-ink-800 space-y-2 list-disc marker:text-danger">
              {VOICE_DONT_LINES.map(line => (
                <li key={line} className="leading-relaxed">
                  {line}
                </li>
              ))}
            </ul>
            <blockquote className="mt-5 m-0 pl-4 border-l-2 border-danger/40 text-sm text-ink-700 leading-relaxed italic">
              Here are some helpful insights about your data! I noticed West might be interesting.
            </blockquote>
          </div>
        </div>

        <h3 className="ds-subheading mt-10 mb-4">Implementation map</h3>
        <div className="ds-table-wrap overflow-x-auto mb-12" role="region" aria-label="Key implementation files">
          <table className="ds-table min-w-[640px]">
            <thead>
              <tr>
                <th scope="col" className="w-[22%]">
                  Artifact
                </th>
                <th scope="col" className="w-[36%]">
                  Path
                </th>
                <th scope="col">Note</th>
              </tr>
            </thead>
            <tbody>
              {IMPLEMENTATION_MAP.map(row => (
                <tr key={row.path}>
                  <td className="text-sm font-medium text-ink-900">{row.artifact}</td>
                  <td className="font-mono text-2xs text-ink-800">{row.path}</td>
                  <td className="text-sm text-ink-700">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="ds-subheading mt-10 mb-4">In scope vs out of scope</h3>
        <div className="grid md:grid-cols-2 gap-6 mb-4">
          <div className="rounded-2xl border border-ink-200 bg-canvas-raised p-6 md:p-8">
            <div className="text-2xs font-mono font-semibold uppercase tracking-wide text-accent mb-3">In scope (this prototype)</div>
            <ul className="m-0 pl-4 text-sm text-ink-700 space-y-2 list-disc marker:text-accent">
              {SCOPE_IN.map(x => (
                <li key={x} className="leading-relaxed">
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-dashed border-ink-300 bg-canvas-sunken/50 p-6 md:p-8">
            <div className="text-2xs font-mono font-semibold uppercase tracking-wide text-ink-500 mb-3">Explicitly out of scope</div>
            <ul className="m-0 pl-4 text-sm text-ink-600 space-y-2 list-disc">
              {SCOPE_OUT.map(x => (
                <li key={x} className="leading-relaxed">
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="source" className={`${sectionDivider} scroll-mt-28`} aria-labelledby="source-heading">
        <h2 id="source-heading" className="h-section mb-4 tracking-tight">
          Source files
        </h2>
        <p className="ds-section-lede text-sm">
          Canonical specs live in <span className="font-mono text-2xs">plan/</span>; implementation under <span className="font-mono text-2xs">tableau-coworker/src</span>.
        </p>
        <div className="rounded-2xl border border-ink-200 bg-canvas-raised p-8 md:p-10 flex flex-col sm:flex-row flex-wrap gap-4">
          {p14 ? (
            <a href={p14} target="_blank" rel="noreferrer" className="btn-secondary text-sm inline-flex min-h-[44px] items-center">
              plan/14 — architecture <ArrowRight size={14} aria-hidden />
            </a>
          ) : null}
          {p03 ? (
            <a href={p03} target="_blank" rel="noreferrer" className="btn-secondary text-sm inline-flex min-h-[44px] items-center">
              plan/03 — tokens &amp; voice <ArrowRight size={14} aria-hidden />
            </a>
          ) : null}
          {designMd ? (
            <a href={designMd} target="_blank" rel="noreferrer" className="btn-secondary text-sm inline-flex min-h-[44px] items-center">
              DESIGN.md <ArrowRight size={14} aria-hidden />
            </a>
          ) : null}
          <Link to="/strategy" className="btn-accent text-sm inline-flex min-h-[44px] items-center">
            Strategy pillars (live) <ArrowRight size={14} aria-hidden />
          </Link>
          <Link to="/flows" className="btn-primary text-sm inline-flex min-h-[44px] items-center">
            Persona flows <ArrowRight size={14} aria-hidden />
          </Link>
        </div>
        {!githubRoot ? (
          <p className="text-sm text-ink-600 mt-6 max-w-prose leading-relaxed">
            Set <span className="font-mono text-2xs text-ink-800">VITE_GITHUB_URL</span> in <span className="font-mono text-2xs text-ink-800">.env</span> for links to plan files on GitHub.
          </p>
        ) : null}
      </section>
      </article>
    </div>
  )
}

function QualityCard({ title, source, body, sample }: { title: string; source: string; body: string; sample?: ReactNode }) {
  return (
    <div className="ds-quality-card flex flex-col p-6 md:p-7 h-full">
      <div className="text-2xs font-mono font-semibold uppercase tracking-wide text-accent mb-3">{source}</div>
      {sample ? <div className="mb-5 opacity-95 min-h-[2rem]">{sample}</div> : null}
      <h3 className="text-base font-semibold text-ink-900 mb-2 tracking-tight">{title}</h3>
      <p className="text-sm text-ink-700 leading-relaxed flex-1 m-0">{body}</p>
    </div>
  )
}

function Swatch({ name, hex, className, labelDark }: { name: string; hex: string; className: string; labelDark?: boolean }) {
  const label = `Color swatch ${name}, ${hex}`
  return (
    <div
      className={`rounded-2xl p-5 min-h-[5.75rem] min-w-[4.5rem] flex flex-col justify-end border border-ink-200 ${className}`}
      role="img"
      aria-label={label}
    >
      <div className={`text-2xs font-semibold ${labelDark ? 'text-ink-900' : 'text-white/95'}`}>{name}</div>
      <div className={`font-mono text-2xs tabular-nums ${labelDark ? 'text-ink-600' : 'text-white/80'}`}>{hex}</div>
    </div>
  )
}

function MiniTable({ title, rows }: { title: string; rows: [string, string][] }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-ink-200 bg-canvas-raised">
      <div className="px-4 py-3 bg-canvas-sunken border-b border-ink-100 text-2xs font-semibold uppercase tracking-wide text-ink-600">
        {title}
      </div>
      <table className="w-full text-sm">
        <tbody>
          {rows.map(([k, v]) => (
            <tr key={k} className="border-b border-ink-100 last:border-b-0 hover:bg-ink-50/40 transition-colors">
              <th scope="row" className="p-3.5 font-mono text-2xs text-accent-ink whitespace-nowrap align-top w-[38%] text-left font-medium">
                {k}
              </th>
              <td className="p-3.5 text-ink-700 align-top leading-relaxed">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
