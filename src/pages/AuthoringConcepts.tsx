import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Sparkle } from '../components/Icons'

const CAP = `${import.meta.env.BASE_URL}captures/`

const RUNWAY_STEPS = [
  {
    id: 'data',
    label: 'Data connected',
    detail:
      'Superstore is live. Search ranks fields by relevance to your stated goal — not alphabet soup.',
  },
  {
    id: 'geo',
    label: 'Geography on canvas',
    detail:
      'Drop State onto the map lane, or accept the one-click suggestion. The runway blocks fancy encodings until the core geography is valid.',
  },
  {
    id: 'measure',
    label: 'Measure chosen',
    detail:
      'SUM(Sales) scales marks. Marks card stays collapsed until you need depth — fewer simultaneous decisions than today’s shelf flood.',
  },
  {
    id: 'publish',
    label: 'Ready to publish',
    detail:
      'Naming + recap: what changed, what’s on canvas, who should see it. Not a thumbnail lost in a grid.',
  },
] as const

export default function AuthoringConcepts() {
  const [runwayIdx, setRunwayIdx] = useState(1)
  const [dropHints, setDropHints] = useState(true)
  const step = RUNWAY_STEPS[runwayIdx]

  return (
    <div className="bg-canvas text-ink-900 min-h-screen overflow-x-hidden">
      {/* —— Atmosphere —— */}
      <div className="relative min-h-[92vh] flex flex-col">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="absolute -left-[20%] -top-[30%] h-[70vmin] w-[70vmin] rounded-full bg-gradient-to-br from-accent/[0.14] via-accent/[0.06] to-transparent blur-3xl animate-mesh-breathe" />
          <div
            className="absolute -right-[15%] top-[10%] h-[55vmin] w-[55vmin] rounded-full bg-gradient-to-bl from-signal/[0.12] via-transparent to-transparent blur-3xl animate-mesh-breathe"
            style={{ animationDelay: '-4s' }}
          />
          <div
            className="absolute bottom-[5%] left-[30%] h-[40vmin] w-[40vmin] rounded-full bg-gradient-to-tr from-ink-900/[0.04] to-transparent blur-2xl"
            style={{ animationDelay: '-7s' }}
          />
          <div
            className="absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage: `linear-gradient(rgba(14,15,18,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(14,15,18,0.03) 1px, transparent 1px)`,
              backgroundSize: '64px 64px',
            }}
          />
        </div>

        <div className="relative z-[1] flex-1 flex flex-col justify-center max-w-7xl mx-auto px-6 py-20 lg:py-28 w-full">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <header className="lg:col-span-5 space-y-8 animate-fade-slide-up" style={{ animationDelay: '80ms' }}>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full border border-ink-200/80 bg-canvas-raised/90 px-3 py-1 text-2xs font-mono uppercase tracking-wider text-ink-600 backdrop-blur-sm shadow-card">
                  Concepts
                </span>
                <span className="inline-flex items-center rounded-full border border-accent/25 bg-accent-soft/50 px-3 py-1 text-2xs font-mono uppercase tracking-wider text-accent-ink backdrop-blur-sm">
                  flow-b-first-authoring
                </span>
              </div>
              <div>
                <h1 className="font-serif text-[clamp(2.5rem,5vw,3.75rem)] leading-[1.08] tracking-tight text-ink-900">
                  Authoring,{' '}
                  <em className="not-italic text-accent">unblocked.</em>
                </h1>
                <p className="mt-6 text-lg text-ink-600 leading-relaxed max-w-md">
                  A shell for people who should not need a certification to ship their first map. Guided runway,
                  honest drag-and-drop, and Coworker that reads sheet state — not another toolbar bolt-on.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-baseline gap-2 border-l-2 border-signal pl-4">
                  <span className="font-mono text-3xl font-medium tabular-nums text-ink-900">5+</span>
                  <span className="text-sm text-ink-500 max-w-[10rem] leading-snug">minutes to orient on a blank sheet in trial captures.</span>
                </div>
                <div className="h-px w-12 bg-ink-200 hidden sm:block" aria-hidden />
                <p className="text-sm text-ink-500 max-w-xs">
                  Reverse every claim against <code className="font-mono text-2xs text-accent-ink">public/captures/flow-b-first-authoring/</code>
                </p>
              </div>
            </header>

            <div className="lg:col-span-7 animate-fade-slide-up" style={{ animationDelay: '160ms' }}>
              <AuthoringShowcase runwayIdx={runwayIdx} onRunwayChange={setRunwayIdx} step={step} />
            </div>
          </div>
        </div>

        <div className="relative z-[1] h-24 bg-gradient-to-b from-transparent to-canvas pointer-events-none" aria-hidden />
      </div>

      {/* —— Bento: drop + connect —— */}
      <section className="relative max-w-7xl mx-auto px-6 pb-20">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl tracking-tight text-ink-900">Interaction model</h2>
            <p className="mt-2 text-ink-600 max-w-xl">
              Teaching surfaces that react while you drag — not silent rejects. Connection without modal walls.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-5">
          <div className="lg:col-span-7 group relative rounded-2xl border border-ink-200/90 bg-canvas-raised/95 p-8 shadow-overlay backdrop-blur-md transition duration-500 ease-smooth hover:shadow-[0_24px_48px_-12px_rgba(14,15,18,0.12)] hover:-translate-y-0.5">
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h3 className="text-xs font-mono uppercase tracking-[0.12em] text-ink-400 mb-6">Drop grammar</h3>
            <p className="text-ink-600 text-sm mb-6 max-w-lg">
              Fields glow valid targets. The “best” lane wins a signal ring — same information density as coach marks,
              without obscuring the canvas.
            </p>
            <label className="group inline-flex items-center gap-3 cursor-pointer select-none mb-8">
              <input
                type="checkbox"
                checked={dropHints}
                onChange={e => setDropHints(e.target.checked)}
                className="sr-only"
              />
              <span className="relative h-5 w-9 shrink-0 rounded-full bg-ink-200 transition-colors group-has-[:checked]:bg-accent">
                <span className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform group-has-[:checked]:translate-x-4" />
              </span>
              <span className="text-sm font-medium text-ink-800">Simulate field in hand · State/Province</span>
            </label>
            <div className="grid sm:grid-cols-3 gap-4">
              <DropZoneStripe label="Columns" hint="Time · continuous axes" active={dropHints} emphasis={false} />
              <DropZoneStripe label="Rows" hint="Geography lane" active={dropHints} emphasis />
              <DropZoneStripe label="Size" hint="After geo resolves" active={dropHints} emphasis={false} />
            </div>
          </div>

          <div className="lg:col-span-5 relative rounded-2xl p-[1px] overflow-hidden shadow-overlay group hover:shadow-[0_20px_40px_-10px_rgba(91,46,145,0.15)] transition duration-500 ease-smooth">
            <div
              className="absolute inset-0 opacity-90"
              style={{
                background: 'linear-gradient(135deg, #5B2E91 0%, #C7841C 45%, #5B2E91 100%)',
                backgroundSize: '200% 200%',
                animation: 'shimmer-border 5s linear infinite',
              }}
            />
            <div className="relative h-full rounded-[15px] bg-canvas-raised p-8 flex flex-col justify-between min-h-[280px]">
              <div>
                <h3 className="text-xs font-mono uppercase tracking-[0.12em] text-ink-400 mb-2">Connection</h3>
                <p className="font-serif text-2xl text-ink-900 tracking-tight leading-snug">Skip the spreadsheet pickers.</p>
                <p className="mt-3 text-sm text-ink-600 leading-relaxed">
                  Inline certified source with one primary action. Advanced browse folds away — see{' '}
                  <code className="font-mono text-2xs bg-ink-100 px-1 rounded">01-blank-canvas.png</code> for why.
                </p>
              </div>
              <div className="mt-8 rounded-xl border border-ink-100 bg-canvas-sunken/80 p-4 flex items-center justify-between gap-4">
                <div>
                  <div className="font-semibold text-ink-900">Superstore</div>
                  <div className="text-xs text-ink-500 mt-0.5">Certified · matches your goal</div>
                </div>
                <button
                  type="button"
                  className="shrink-0 rounded-lg bg-ink-900 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-ink-900/20 transition hover:bg-ink-800 hover:shadow-xl"
                >
                  Connect
                </button>
              </div>
              <button type="button" className="mt-3 text-left text-xs font-medium text-accent hover:text-accent-ink transition-colors">
                Browse all sources →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* —— Evidence: dark band (Stripe-style contrast) —— */}
      <section className="relative bg-ink-900 text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-40 pointer-events-none" aria-hidden>
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-signal/0 via-signal/30 to-transparent" />
          <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-accent/0 via-accent/25 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-14">
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-white">Evidence, not mockups</h2>
            <p className="mt-4 text-ink-300 leading-relaxed">
              The chronological flow in <span className="font-mono text-signal/90">flow-b-first-authoring/</span> is the
              counterweight to this concept art. The redesign is what happens when guidance is structural, not episodic
              tooltips.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <EvidenceTile
              src={`${CAP}flow-b-first-authoring/01-blank-canvas.png`}
              alt="Connect to Data modal"
              step="01"
              title="Modal first"
              caption="Canvas hidden behind connector tables · coach mark 2/5."
            />
            <EvidenceTile
              src={`${CAP}flow-b-first-authoring/07-chart-builder-shelves.png`}
              alt="Dense chart builder"
              step="07"
              title="Shelf flood"
              caption="Show Me grid competes with Columns · Rows — literacy required."
            />
            <EvidenceTile
              src={`${CAP}flow-b-first-authoring/04-us-map-composing.png`}
              alt="Map with publish tooltip"
              step="04"
              title="Late publish cue"
              caption="Publish nudge · middle tuning still implicit."
            />
          </div>
        </div>
      </section>

      <footer className="max-w-7xl mx-auto px-6 py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-ink-100">
        <p className="text-sm text-ink-500">
          Tableau Coworker · design exploration · not a Salesforce product
        </p>
        <div className="flex gap-6 text-sm">
          <Link to="/flows" className="font-medium text-ink-700 hover:text-accent transition-colors">
            Flows →
          </Link>
          <Link to="/strategy" className="font-medium text-ink-700 hover:text-accent transition-colors">
            Strategy →
          </Link>
        </div>
      </footer>
    </div>
  )
}

function AuthoringShowcase({
  runwayIdx,
  onRunwayChange,
  step,
}: {
  runwayIdx: number
  onRunwayChange: (i: number) => void
  step: (typeof RUNWAY_STEPS)[number]
}) {
  return (
    <div className="relative">
      <div className="absolute -inset-4 bg-gradient-to-br from-accent/10 via-transparent to-signal/10 rounded-[28px] blur-xl opacity-70" aria-hidden />
      <div className="relative rounded-2xl border border-ink-200/80 bg-canvas-raised/95 shadow-[0_32px_64px_-16px_rgba(14,15,18,0.14),0_0_0_1px_rgba(14,15,18,0.04)] backdrop-blur-xl overflow-hidden">
        <div className="h-11 flex items-center px-4 gap-2 border-b border-ink-100/90 bg-gradient-to-b from-canvas-sunken/50 to-canvas-raised">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-danger/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-warning/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
          </div>
          <span className="text-2xs font-mono text-ink-400 flex-1 text-center truncate px-4">Sheet 1 · Superstore · autosaved</span>
          <span className="text-2xs font-medium text-white bg-ink-900 rounded-md px-2.5 py-1">Publish</span>
        </div>

        <div className="flex flex-col xl:flex-row min-h-[440px]">
          <aside className="w-full xl:w-[240px] shrink-0 border-b xl:border-b-0 xl:border-r border-ink-100 p-5 space-y-5 bg-gradient-to-b from-canvas to-canvas-sunken/30">
            <div className="text-2xs font-mono uppercase tracking-wider text-ink-400">Suggested fields</div>
            <div className="space-y-2">
              <FieldPill label="State/Province" type="geo" />
              <FieldPill label="Country/Region" type="geo" />
              <FieldPill label="Sales" type="measure" />
              <FieldPill label="Profit" type="measure" />
            </div>
            <div className="pt-4 border-t border-ink-100/80">
              <div className="text-2xs font-mono text-ink-400 mb-2">Goal</div>
              <div className="rounded-lg border border-accent/20 bg-accent-soft/30 px-3 py-2 text-xs text-accent-ink font-medium leading-snug">
                US sales by state — symbol map
              </div>
            </div>
          </aside>

          <div className="flex-1 min-w-0 p-6 xl:p-8 flex flex-col items-center justify-center bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(91,46,145,0.06),transparent)]">
            <MapViz_artistic />
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {['Longitude', 'Latitude', 'SUM(Sales)'].map((label, i) => (
                <span
                  key={label}
                  className={`rounded-full px-3 py-1 text-2xs font-mono ${i < 2 ? 'bg-accent/12 text-accent-ink ring-1 ring-accent/20' : 'bg-ink-100 text-ink-600'}`}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          <aside className="w-full xl:w-[300px] shrink-0 border-t xl:border-t-0 xl:border-l border-ink-100 p-5 bg-gradient-to-b from-canvas-sunken/40 to-canvas-raised flex flex-col">
            <div className="text-2xs font-mono uppercase tracking-wider text-ink-400 mb-4">Runway</div>
            <ol className="relative space-y-0 flex-1">
              <div className="absolute left-[11px] top-3 bottom-3 w-px bg-ink-200/80" aria-hidden />
              {RUNWAY_STEPS.map((s, i) => {
                const active = i === runwayIdx
                const done = i < runwayIdx
                return (
                  <li key={s.id} className="relative pl-8 pb-5 last:pb-0">
                    <span
                      className={`absolute left-0 top-1.5 flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 text-2xs font-mono transition duration-300 ${
                        done
                          ? 'border-success bg-success text-white'
                          : active
                            ? 'border-signal bg-signal text-white animate-pulse-ring'
                            : 'border-ink-200 bg-canvas-raised text-ink-400'
                      }`}
                    >
                      {done ? '✓' : i + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => onRunwayChange(i)}
                      className={`text-left w-full rounded-lg px-2 py-1 -mx-2 transition duration-200 ${active ? 'bg-signal-soft/60' : 'hover:bg-ink-100/80'}`}
                    >
                      <span className={`text-sm font-medium ${active ? 'text-signal-ink' : 'text-ink-800'}`}>{s.label}</span>
                    </button>
                  </li>
                )
              })}
            </ol>

            <div className="mt-4 rounded-xl border border-signal/30 bg-gradient-to-br from-signal-soft/80 to-signal-soft/30 p-4 shadow-agent">
              <div className="flex gap-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-signal/20 border border-signal/30">
                  <Sparkle size={16} className="text-signal" aria-hidden />
                </div>
                <div>
                  <div className="text-2xs font-mono uppercase tracking-wider text-signal-ink/90 mb-1">Coworker</div>
                  <p className="text-xs text-ink-800 leading-relaxed">{step.detail}</p>
                  <p className="text-2xs font-mono text-ink-500 mt-2">Confidence · moderate</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

/** Stylized symbol map — decorative, not geographic truth */
function MapViz_artistic() {
  return (
    <div className="relative w-full max-w-md aspect-[16/10] rounded-xl overflow-hidden border border-ink-200/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] bg-gradient-to-b from-canvas-raised to-ink-50">
      <svg viewBox="0 0 400 240" className="absolute inset-0 w-full h-full" aria-hidden>
        <defs>
          <linearGradient id="mapCoast" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5B2E91" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#C7841C" stopOpacity="0.06" />
          </linearGradient>
        </defs>
        <path
          d="M80 40 L340 35 L350 180 L120 200 L60 120 Z"
          fill="url(#mapCoast)"
          stroke="rgba(14,15,18,0.06)"
          strokeWidth="1"
        />
        {[
          [120, 95, 6],
          [180, 110, 8],
          [230, 85, 5],
          [270, 130, 7],
          [200, 150, 4],
          [150, 70, 5],
          [310, 100, 6],
        ].map(([cx, cy, r], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="#5B2E91"
            fillOpacity={0.35 + (i % 3) * 0.12}
            className="animate-pulse-soft origin-center"
            style={{ animationDelay: `${i * 0.35}s` }}
          />
        ))}
      </svg>
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
        <span className="text-2xs font-mono uppercase tracking-wider text-ink-400">Symbol map</span>
        <span className="text-2xs font-mono text-ink-500">7 states · illustrative</span>
      </div>
    </div>
  )
}

function FieldPill({ label, type }: { label: string; type: 'geo' | 'measure' }) {
  const isGeo = type === 'geo'
  return (
    <div
      className={`group flex cursor-default items-center justify-between rounded-lg border px-3 py-2 text-xs font-medium transition duration-200 hover:shadow-card ${
        isGeo ? 'border-blue-500/20 bg-blue-500/[0.07] text-blue-950' : 'border-emerald-600/20 bg-emerald-600/[0.07] text-emerald-950'
      }`}
    >
      <span>{label}</span>
      <span className="text-2xs font-mono opacity-50">{isGeo ? 'geo' : '∑'}</span>
    </div>
  )
}

function DropZoneStripe({ label, hint, active, emphasis }: { label: string; hint: string; active: boolean; emphasis: boolean }) {
  const lit = active && emphasis
  return (
    <div
      className={`relative rounded-xl px-4 py-8 text-center transition-all duration-500 ease-smooth ${
        active
          ? emphasis
            ? 'bg-signal-soft/50 ring-2 ring-signal/50 shadow-[0_0_24px_-4px_rgba(199,132,28,0.4)] scale-[1.02]'
            : 'bg-accent-soft/40 ring-1 ring-accent/25'
          : 'bg-ink-50/80 ring-1 ring-ink-100'
      }`}
    >
      {lit ? (
        <span className="absolute top-2 right-2 text-2xs font-mono font-medium uppercase tracking-wider text-signal-ink">Best lane</span>
      ) : null}
      <div className={`text-sm font-semibold ${lit ? 'text-signal-ink' : 'text-ink-800'}`}>{label}</div>
      <div className="mt-2 text-2xs text-ink-500 leading-snug">{hint}</div>
    </div>
  )
}

function EvidenceTile({ src, alt, step, title, caption }: { src: string; alt: string; step: string; title: string; caption: string }) {
  return (
    <figure className="group relative rounded-2xl overflow-hidden ring-1 ring-white/10 bg-ink-800/50 transition duration-500 hover:ring-signal/40 hover:-translate-y-1 hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.45)]">
      <div className="aspect-[16/10] overflow-hidden relative">
        <img src={src} alt={alt} className="h-full w-full object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition duration-700 ease-smooth" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 rounded-md bg-white/10 backdrop-blur-sm px-2 py-0.5 text-2xs font-mono text-white/90 border border-white/10">
          {step}
        </span>
      </div>
      <figcaption className="p-5">
        <div className="font-serif text-lg text-white tracking-tight">{title}</div>
        <p className="mt-2 text-sm text-ink-300 leading-relaxed">{caption}</p>
      </figcaption>
    </figure>
  )
}
