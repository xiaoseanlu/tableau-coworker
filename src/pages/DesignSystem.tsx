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
  { id: 'layout', label: 'Dynamic layout' },
  { id: 'source', label: 'Source files' },
] as const

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
          This page is the readable surface for reviewers: tokens, hierarchy discipline, and how each layer maps to
          real captures in <span className="font-mono text-2xs text-ink-500">public/captures/</span>. The canonical spec
          lives in markdown so it versions with the repo.
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
              <div className="text-2xs font-mono text-ink-400 mb-2">VizSpec (primaryViz slot)</div>
              <p className="text-sm text-ink-600">
                Typed chart bindings — line, bar, map, kpiOnly — so molecules swap primitives without duplicating page chrome.
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
