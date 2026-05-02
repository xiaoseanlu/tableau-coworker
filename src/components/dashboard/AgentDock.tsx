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
  stack?: boolean
}) {
  const shell =
    'shrink-0 bg-canvas-sunken/80 border-ink-100 flex flex-col ' +
    (stack
      ? 'w-full border-t p-4 max-h-[min(48vh,320px)] overflow-y-auto'
      : 'w-full xl:w-[360px] xl:min-h-[480px] border-t xl:border-t-0 xl:border-l p-5')

  const Tag = stack ? 'div' : 'aside'

  return (
    <Tag className={shell}>
      <div className={`flex items-center gap-2 pb-3 border-b border-ink-100 ${stack ? 'mb-3' : 'mb-4'}`}>
        <div className="w-9 h-9 rounded-lg bg-signal-soft border border-signal/30 grid place-items-center text-signal">
          <Sparkle size={18} aria-hidden />
        </div>
        <div>
          <div className="text-xs font-semibold text-ink-900">{productName}</div>
          <div className="text-2xs text-ink-500 font-mono">{productTagline}</div>
        </div>
      </div>

      <div
        className={`rounded-lg border border-signal/25 bg-signal-soft/40 shadow-agent ${stack ? 'p-3 flex-1 min-h-0' : 'p-4 flex-1 min-h-[180px]'}`}
      >
        <div className="text-2xs uppercase tracking-wider font-mono text-signal mb-2">{insight.title}</div>
        <p className="text-sm text-ink-800 leading-relaxed">{insight.body}</p>
        <p className="text-2xs text-ink-600 mt-4 font-mono">
          Confidence: <span className="text-signal-ink font-medium">{insight.confidence}</span>
        </p>
      </div>

      {followups.length > 0 ? (
        <div className="mt-4">
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-2">Ask next</div>
          <div className="flex flex-wrap gap-2">
            {followups.map(q => (
              <button
                key={q}
                type="button"
                onClick={() => onFollowup?.(q)}
                className="text-xs px-2.5 py-1.5 rounded-md bg-canvas-raised border border-ink-200 text-ink-700 hover:border-accent/40 hover:text-accent transition-colors text-left"
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
          className="mt-4 text-2xs text-ink-500 hover:text-ink-900 underline underline-offset-2 text-left"
        >
          Clear selection
        </button>
      ) : null}
    </Tag>
  )
}
