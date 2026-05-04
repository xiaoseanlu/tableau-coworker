import { useEffect, useRef, useState } from 'react'
import { Sparkle, X } from '../Icons'

export interface AgentInsight {
  title: string
  body: string
  confidence: string
}

const COLLAPSED_ANCHOR_H = '3.25rem' // matches compact bar; overlay uses bottom offset

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
  /**
   * Mobile: `sheet` keeps a thin anchor; full read opens in an in-frame sheet when the user selects
   * something (auto-open on new selection). `rail` keeps the classic persistent bottom dock.
   */
  stackPresentation = 'rail',
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
  stackPresentation?: 'rail' | 'sheet'
}) {
  const [sheetOpen, setSheetOpen] = useState(false)
  const prevSelectionRef = useRef(false)

  useEffect(() => {
    const prev = prevSelectionRef.current
    if (selectionActive && !prev && stack && stackPresentation === 'sheet') {
      setSheetOpen(true)
    }
    if (!selectionActive) {
      setSheetOpen(false)
    }
    prevSelectionRef.current = !!selectionActive
  }, [selectionActive, stack, stackPresentation])

  useEffect(() => {
    if (!sheetOpen || stackPresentation !== 'sheet' || !stack) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSheetOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [sheetOpen, stack, stackPresentation])

  const shell =
    'shrink-0 flex flex-col min-w-0 backdrop-blur-[2px] ' +
    (stack
      ? 'w-full border-t border-ink-200/80 p-4 overflow-x-hidden bg-canvas-raised/98'
      : 'w-full xl:w-[360px] xl:min-h-[480px] border-t xl:border-t-0 xl:border-l border-ink-200/80 p-5 xl:pl-6 bg-gradient-to-b from-canvas-raised/92 via-canvas to-canvas-sunken/35')

  const Tag = stack ? 'div' : 'aside'

  const insightPanel = (
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
        <div
          id="coworker-insight-title"
          className="text-2xs uppercase tracking-wider font-mono text-signal mb-2 break-words"
        >
          {insight.title}
        </div>
        <p className="text-sm text-ink-800 leading-relaxed m-0 break-words [overflow-wrap:anywhere]">{insight.body}</p>
        <p className="text-2xs text-ink-600 mt-4 mb-0 font-mono pb-0.5">
          Confidence: <span className="text-signal-ink font-medium">{insight.confidence}</span>
        </p>
      </div>
    </div>
  )

  const headerBlock = (
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
  )

  const followupsBlock =
    followups.length > 0 ? (
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
    ) : null

  const clearBlock =
    selectionActive && onClear ? (
      <button
        type="button"
        onClick={() => {
          onClear()
          setSheetOpen(false)
        }}
        className="mt-4 shrink-0 text-2xs text-ink-500 hover:text-ink-900 underline underline-offset-2 text-left"
      >
        Clear selection
      </button>
    ) : null

  if (stack && stackPresentation === 'sheet') {
    return (
      <>
        {sheetOpen ? (
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-[25] flex flex-col justify-end"
            style={{ bottom: COLLAPSED_ANCHOR_H }}
          >
            <button
              type="button"
              className="pointer-events-auto absolute inset-0 border-0 p-0 cursor-default bg-ink-900/50 backdrop-blur-[2px]"
              aria-label="Dismiss Coworker read"
              onClick={() => setSheetOpen(false)}
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="coworker-sheet-product"
              className="pointer-events-auto relative z-10 mx-2 mb-1 flex max-h-[min(50dvh,340px)] min-h-0 flex-col overflow-hidden rounded-2xl border border-ink-200 bg-canvas-raised shadow-lift ring-1 ring-ink-900/10"
              onClick={e => e.stopPropagation()}
            >
              <div className="shrink-0 border-b border-ink-200 bg-canvas-raised px-3 pt-3 pb-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-signal-soft border border-signal/30 grid place-items-center text-signal shrink-0">
                      <Sparkle size={16} aria-hidden />
                    </div>
                    <div className="min-w-0">
                      <div id="coworker-sheet-product" className="text-xs font-semibold text-ink-900 truncate">
                        {productName}
                      </div>
                      <div className="text-2xs text-ink-500 font-mono truncate">{productTagline}</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="shrink-0 rounded-lg p-1.5 text-ink-500 hover:bg-ink-100 hover:text-ink-900"
                    aria-label="Close"
                    onClick={() => setSheetOpen(false)}
                  >
                    <X size={16} aria-hidden />
                  </button>
                </div>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain bg-canvas-raised px-3 pb-4 pt-3">
                {dataSurface ? (
                  <p className="text-[10px] leading-snug text-ink-500 font-mono mt-0 mb-3 border-l border-ink-200 pl-2 break-words [overflow-wrap:anywhere]">
                    {dataSurface}
                  </p>
                ) : null}
                <div>{insightPanel}</div>
                {followupsBlock}
                {clearBlock}
              </div>
            </div>
          </div>
        ) : null}

        <div
          className="relative z-[35] flex shrink-0 items-center gap-2 border-t border-ink-200/80 bg-canvas-raised px-3 py-2.5 min-h-[3.25rem]"
          style={{ minHeight: COLLAPSED_ANCHOR_H }}
        >
          <div className="w-8 h-8 rounded-lg bg-signal-soft/90 border border-signal/30 grid place-items-center text-signal shrink-0">
            <Sparkle size={16} aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-semibold text-ink-900 truncate">{productName}</div>
            <p className="text-2xs text-ink-500 m-0 leading-snug">
              {selectionActive ? (
                <span className="font-mono text-ink-600 truncate block">{insight.title}</span>
              ) : (
                <>Tap KPIs, cards, or charts — Coworker read opens here.</>
              )}
            </p>
          </div>
          {selectionActive && !sheetOpen ? (
            <button
              type="button"
              className="shrink-0 rounded-lg bg-accent px-2.5 py-1.5 text-2xs font-medium text-white"
              onClick={() => setSheetOpen(true)}
            >
              Open read
            </button>
          ) : null}
        </div>
      </>
    )
  }

  return (
    <Tag className={shell}>
      {headerBlock}
      {insightPanel}
      {followupsBlock}
      {clearBlock}
    </Tag>
  )
}
