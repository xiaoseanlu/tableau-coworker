import { Sparkle } from '../Icons'

export interface AgentInsight {
  title: string
  body: string
  confidence: string
}

export default function AgentDock({
  insight,
  followups = [],
  onFollowup,
  onClear,
  selectionActive,
  productName = 'Tableau Coworker',
  productTagline = 'Read · not a side panel',
  /** How real Tableau surfaces (marks, lineage, RLS) show up in this board — optional educate line */
  dataSurface,
  /** Full-width bottom stack (mobile shells) instead of desktop side rail */
  stack = false,
}: {
  insight: AgentInsight
  followups?: string[]
  onFollowup?: (q: string) => void
  onClear?: () => void
  selectionActive?: boolean
  productName?: string
  productTagline?: string
  dataSurface?: string
  stack?: boolean
}) {
  const shell =
    'shrink-0 flex flex-col min-w-0 backdrop-blur-[2px] ' +
    (stack
      ? 'w-full border-t border-ink-200/80 p-4 overflow-x-hidden bg-canvas-raised/98'
      : 'w-full xl:w-[360px] xl:min-h-[480px] border-t xl:border-t-0 xl:border-l border-ink-200/80 p-5 xl:pl-6 bg-gradient-to-b from-canvas-raised/92 via-canvas to-canvas-sunken/35')

  const Tag = stack ? 'div' : 'aside'

  return (
    <Tag className={shell}>
      <div className={`flex shrink-0 items-center gap-2 pb-3 border-b border-ink-200/70 ${stack ? 'mb-3' : 'mb-4'}`}>
        <div className="w-9 h-9 rounded-xl bg-signal-soft border border-signal/35 grid place-items-center text-signal shadow-lift-sm ring-1 ring-white/40">
          <Sparkle size={18} aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-xs font-semibold text-ink-900">{productName}</div>
          <div className="text-2xs text-ink-500 font-mono">{productTagline}</div>
          {dataSurface ? (
            <p className="text-[10px] leading-snug text-ink-500 font-mono mt-1.5 m-0 border-l border-ink-200 pl-2 break-words [overflow-wrap:anywhere]">
              {dataSurface}
            </p>
          ) : null}
        </div>
      </div>

      <div
        className={`relative isolate rounded-xl border border-signal/35 shadow-lift-sm ring-1 ring-signal/12 min-w-0 ${
          stack ? 'shrink-0 bg-canvas-raised' : 'flex-1 min-h-[180px] overflow-hidden bg-canvas-raised'
        }`}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-signal-soft/55 via-signal-soft/25 to-canvas-raised/90"
          aria-hidden
        />
        <div className={`relative min-w-0 ${stack ? 'p-3' : 'p-4 min-h-[180px]'}`}>
          <div className="text-2xs uppercase tracking-wider font-mono text-signal mb-2 break-words">{insight.title}</div>
          <p className="text-sm text-ink-800 leading-relaxed m-0 break-words [overflow-wrap:anywhere]">{insight.body}</p>
          <p className="text-2xs text-ink-600 mt-4 mb-0 font-mono pb-0.5">
            Confidence: <span className="text-signal-ink font-medium">{insight.confidence}</span>
          </p>
        </div>
      </div>

      {followups.length > 0 ? (
        <div className={`mt-4 shrink-0 ${stack ? 'relative z-10 rounded-lg bg-canvas-raised px-1 py-1 -mx-1' : ''}`}>
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-2">Ask next</div>
          <div className="flex flex-wrap gap-2">
            {followups.map(q => (
              <button
                key={q}
                type="button"
                onClick={() => onFollowup?.(q)}
                className="text-xs px-2.5 py-1.5 rounded-lg bg-canvas-raised border border-ink-200/90 text-ink-700 shadow-edge hover:border-accent/45 hover:text-accent hover:shadow-lift-sm motion-safe:transition-all motion-safe:duration-150 text-left"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {selectionActive && onClear ? (
        <button
          type="button"
          onClick={onClear}
          className="mt-4 shrink-0 text-2xs text-ink-500 hover:text-ink-900 underline underline-offset-2 text-left"
        >
          Clear selection
        </button>
      ) : null}
    </Tag>
  )
}
