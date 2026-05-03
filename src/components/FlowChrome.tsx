import { Fragment, ReactNode, useState } from 'react'
import { Link } from 'react-router-dom'
import type { PersonaFlowContext } from '../data/personaFlowMeta'
import { ChevronLeft, ChevronRight, X } from './Icons'

export type { PersonaFlowContext }

export interface FlowStep {
  label: string
  surface?: string  // e.g., "Web · Manager view" or "Slack · DM"
  /** Design narrative grouping — inserts a labeled divider in the stepper when it changes from the prior step */
  designStory?: string
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
  /** Role strip under the stepper — ties each beat to responsibilities + pillars */
  persona?: PersonaFlowContext
}

export default function FlowChrome({ flowNumber, title, thesis, steps, persona }: Props) {
  const [i, setI] = useState(0)
  const step = steps[i]
  const total = steps.length

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink-900">
      {/* Top bar */}
      <header className="sticky top-0 z-20 bg-canvas-raised/90 backdrop-blur-xl backdrop-saturate-150 border-b border-ink-200/75 shadow-edge">
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
        <div className="border-t border-ink-100/90 bg-canvas/88 backdrop-blur-md" role="navigation" aria-label="Flow steps">
          <div className="max-w-7xl mx-auto px-6 py-2 flex items-center gap-1 overflow-x-auto flex-nowrap">
            {steps.map((s, idx) => (
              <Fragment key={idx}>
                {s.designStory != null &&
                (idx === 0 || steps[idx - 1].designStory !== s.designStory) ? (
                  <span
                    className="shrink-0 text-2xs font-mono uppercase tracking-wide text-ink-400 px-2 py-1 mr-1 border-l border-ink-200 first:border-l-0 first:pl-0"
                    aria-hidden
                  >
                    {s.designStory}
                  </span>
                ) : null}
                <button
                  type="button"
                  onClick={() => setI(idx)}
                  aria-current={idx === i ? 'step' : undefined}
                  aria-label={`${s.designStory ? `${s.designStory} · ` : ''}${s.label}, step ${idx + 1} of ${total}`}
                  className={`shrink-0 px-3 py-1.5 rounded-lg text-xs motion-safe:transition-all motion-safe:duration-200 ${
                    idx === i
                      ? 'bg-accent text-white font-medium shadow-lift-sm ring-1 ring-white/20'
                      : idx < i
                        ? 'text-ink-700 hover:bg-canvas-raised hover:shadow-edge'
                        : 'text-ink-400 hover:bg-canvas-raised/90 hover:text-ink-700 hover:shadow-edge'
                  }`}
                >
                  <span className="font-mono mr-1.5 opacity-60">{String(idx + 1).padStart(2, '0')}</span>
                  {s.label}
                </button>
              </Fragment>
            ))}
          </div>
        </div>
        {persona ? (
          <div className="border-t border-ink-100/90 bg-gradient-to-r from-canvas-sunken/90 via-canvas to-canvas-sunken/70">
            <div className="max-w-7xl mx-auto px-6 py-2.5 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 sm:gap-y-1 text-xs">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 min-w-0">
                <span className="font-semibold text-ink-900 shrink-0">{persona.name}</span>
                <span className="text-ink-500">{persona.title}</span>
              </div>
              <span className="hidden sm:inline text-ink-300 select-none" aria-hidden>
                ·
              </span>
              <p className="text-ink-600 leading-relaxed m-0 sm:flex-1 sm:min-w-[12rem]">{persona.job}</p>
              <div className="flex flex-wrap gap-1.5 sm:justify-end shrink-0">
                {persona.pillars.map(p => (
                  <span key={p} className="pill bg-ink-100 text-ink-600 text-2xs font-mono py-0.5 px-2">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </header>

      {/* Body */}
      <div className="flex-1">
        {step.immersive ? (
          <div className="max-w-[min(100vw,1480px)] mx-auto px-4 sm:px-6 py-6">
            {step.body}
            <details className="mt-10 rounded-xl border border-ink-200/90 bg-canvas-raised/85 backdrop-blur-sm p-5 md:p-6 shadow-lift-sm ring-1 ring-ink-900/[0.025] open:ring-accent/15 transition-[box-shadow,border-color] duration-200">
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
      <footer className="bg-canvas-raised/95 backdrop-blur-md border-t border-ink-200/80 shadow-[0_-1px_0_rgba(14,15,18,0.05)] sticky bottom-0">
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
    <div className="rounded-r-lg border-l-[3px] border-accent bg-canvas-raised/50 pl-4 py-3 pr-3 text-sm text-ink-700 ring-1 ring-ink-900/[0.02]">
      <div className="text-xs font-semibold text-ink-900 mb-1">{title}</div>
      <div className="text-xs text-ink-600 leading-relaxed [&_strong]:text-ink-900 [&_strong]:font-semibold">{children}</div>
    </div>
  )
}

/** Demo surface — the "screen" we're showing, with a styled chrome around it. */
export function Surface({ chrome, children, className = '', slackTitle }: {
  chrome?: 'web' | 'slack' | 'mobile' | 'plain'
  children: ReactNode
  className?: string
  /** When chrome is slack — title in the purple title bar */
  slackTitle?: string
}) {
  if (chrome === 'mobile') {
    return (
      <div className="mx-auto w-full max-w-[380px] px-1">
        <div className="bg-ink-900 p-2 rounded-[36px] shadow-lift ring-1 ring-black/30">
          <div
            className={`bg-canvas-raised rounded-[28px] overflow-hidden flex flex-col min-h-0 min-w-0 shadow-inner ring-1 ring-white/10 ${className}`}
            style={{ height: 'min(78dvh, 800px)' }}
          >
            <div className="flex min-h-0 min-w-0 flex-1 flex-col px-1 pb-1.5 pt-0.5">{children}</div>
          </div>
        </div>
      </div>
    )
  }
  if (chrome === 'slack') {
    return (
      <div className={`bg-canvas-raised rounded-xl border border-ink-200/90 overflow-hidden shadow-lift-sm ring-1 ring-ink-900/[0.04] ${className}`}>
        {/* Slack chrome */}
        <div className="bg-[#3F0E40] text-white px-4 py-2.5 flex items-center gap-3 text-xs">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          </div>
          <div className="opacity-80 truncate">{slackTitle ?? 'Acme Corp · #engineering'}</div>
        </div>
        {children}
      </div>
    )
  }
  // 'web' default
  return (
    <div className={`bg-canvas-raised rounded-xl border border-ink-200/90 overflow-hidden shadow-lift-sm ring-1 ring-ink-900/[0.04] ${className}`}>
      {chrome !== 'plain' && (
        <div className="bg-gradient-to-b from-ink-50 to-canvas-sunken/30 border-b border-ink-200/90 px-4 py-2.5 flex items-center gap-3">
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
