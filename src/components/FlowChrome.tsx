import { ReactNode, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, X } from './Icons'

export interface FlowStep {
  label: string
  surface?: string  // e.g., "Web · Manager view" or "Slack · DM"
  body: ReactNode
  notes: ReactNode  // annotations: what we did and why
  /** Full-width body (dense dashboards); design notes move into a collapsible below */
  immersive?: boolean
}

interface Props {
  flowNumber: string
  title: string
  thesis: string
  steps: FlowStep[]
}

export default function FlowChrome({ flowNumber, title, thesis, steps }: Props) {
  const [i, setI] = useState(0)
  const step = steps[i]
  const total = steps.length

  return (
    <div className="min-h-screen flex flex-col bg-canvas-sunken">
      {/* Top bar */}
      <header className="bg-canvas-raised border-b border-ink-100 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center gap-6">
          <Link
            to="/flows"
            className="flex items-center gap-1.5 text-ink-500 hover:text-ink-900 text-sm"
            aria-label="Close flow and return to flows index"
          >
            <X size={14} aria-hidden="true" /> Close flow
          </Link>
          <div className="h-5 w-px bg-ink-200" />
          <div className="flex items-baseline gap-3 min-w-0">
            <span className="font-mono text-2xs text-ink-400">Flow {flowNumber}</span>
            <h1 className="text-sm font-semibold text-ink-900 truncate">{title}</h1>
          </div>
          <div className="h-5 w-px bg-ink-200 hidden md:block" />
          <p className="hidden md:block text-xs text-ink-500 italic truncate">{thesis}</p>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-ink-500 font-mono">{i + 1} / {total}</span>
            {step.surface && <span className="hidden sm:inline pill bg-ink-100 text-ink-600">{step.surface}</span>}
          </div>
        </div>
        {/* Step pills */}
        <div className="border-t border-ink-100 bg-canvas" role="navigation" aria-label="Flow steps">
          <div className="max-w-7xl mx-auto px-6 py-2 flex items-center gap-1 overflow-x-auto">
            {steps.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setI(idx)}
                aria-current={idx === i ? 'step' : undefined}
                aria-label={`${s.label}, step ${idx + 1} of ${total}`}
                className={`shrink-0 px-3 py-1.5 rounded-md text-xs transition-colors ${
                  idx === i
                    ? 'bg-accent text-white font-medium'
                    : idx < i
                    ? 'text-ink-700 hover:bg-ink-100'
                    : 'text-ink-400 hover:bg-ink-100 hover:text-ink-700'
                }`}
              >
                <span className="font-mono mr-1.5 opacity-60">{String(idx + 1).padStart(2, '0')}</span>
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="flex-1">
        {step.immersive ? (
          <div className="max-w-[min(100vw,1480px)] mx-auto px-4 sm:px-6 py-6">
            {step.body}
            <details className="mt-10 card p-5 open:shadow-raised">
              <summary className="text-sm font-medium text-ink-700 cursor-pointer select-none">
                Design notes
              </summary>
              <div className="mt-4 space-y-4 border-t border-ink-100 pt-4">{step.notes}</div>
            </details>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-[1fr_320px] gap-8">
            <div className="min-w-0">{step.body}</div>
            <aside className="space-y-4">
              <div className="text-2xs uppercase tracking-wider text-ink-500 mb-1">Design notes</div>
              {step.notes}
            </aside>
          </div>
        )}
      </div>

      {/* Footer nav */}
      <footer className="bg-canvas-raised border-t border-ink-100 sticky bottom-0">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setI(Math.max(0, i - 1))}
            disabled={i === 0}
            className="btn-ghost disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={14} aria-hidden="true" /> Previous
          </button>
          <div className="flex items-center gap-1" aria-hidden="true">
            {steps.map((_, idx) => (
              <span
                key={idx}
                className={`h-1 rounded-full transition-all ${
                  idx === i ? 'w-8 bg-accent' : idx < i ? 'w-1.5 bg-ink-400' : 'w-1.5 bg-ink-200'
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setI(Math.min(total - 1, i + 1))}
            disabled={i === total - 1}
            className="btn-primary disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next <ChevronRight size={14} aria-hidden="true" />
          </button>
        </div>
      </footer>
    </div>
  )
}

/** Annotation card used inside the FlowStep.notes prop. */
export function Note({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="annotation">
      <div className="text-xs font-semibold text-ink-900 mb-1">{title}</div>
      <div className="text-xs text-ink-600 leading-relaxed">{children}</div>
    </div>
  )
}

/** Demo surface — the "screen" we're showing, with a styled chrome around it. */
export function Surface({ chrome, children, className = '' }: {
  chrome?: 'web' | 'slack' | 'mobile' | 'plain'
  children: ReactNode
  className?: string
}) {
  if (chrome === 'mobile') {
    return (
      <div className="mx-auto" style={{ maxWidth: 380 }}>
        <div className="bg-ink-900 p-2 rounded-[36px] shadow-overlay">
          <div className={`bg-canvas-raised rounded-[28px] overflow-hidden ${className}`} style={{ aspectRatio: '9/19.5' }}>
            {children}
          </div>
        </div>
      </div>
    )
  }
  if (chrome === 'slack') {
    return (
      <div className={`bg-canvas-raised rounded-lg shadow-raised border border-ink-200 overflow-hidden ${className}`}>
        {/* Slack chrome */}
        <div className="bg-[#3F0E40] text-white px-4 py-2.5 flex items-center gap-3 text-xs">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          </div>
          <div className="opacity-80">Acme Corp · #engineering</div>
        </div>
        {children}
      </div>
    )
  }
  // 'web' default
  return (
    <div className={`bg-canvas-raised rounded-lg shadow-raised border border-ink-200 overflow-hidden ${className}`}>
      {chrome !== 'plain' && (
        <div className="bg-ink-50 border-b border-ink-200 px-4 py-2.5 flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          </div>
          <div className="flex-1 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-canvas-raised border border-ink-200 text-xs text-ink-500">
              acme.cloud.tableau.com
            </div>
          </div>
          <div className="w-12" />
        </div>
      )}
      {children}
    </div>
  )
}
