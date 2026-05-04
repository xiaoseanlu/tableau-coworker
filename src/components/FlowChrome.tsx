import { ReactNode, useState } from 'react'
import { Link } from 'react-router-dom'
import type { PersonaFlowContext } from '../data/personaFlowMeta'
import { ChevronLeft, ChevronRight, X } from './Icons'

export type { PersonaFlowContext }

export interface FlowStep {
  label: string
  surface?: string
  designStory?: string
  body: ReactNode
  notes: ReactNode
  immersive?: boolean
}

interface Props {
  flowNumber: string
  title: string
  thesis: string
  steps: FlowStep[]
  persona?: PersonaFlowContext
}

function buildOptionLabel(steps: FlowStep[], s: FlowStep, idx: number, total: number): string {
  const n = String(idx + 1).padStart(2, '0')
  const surface = s.surface ? `${s.surface} · ` : ''
  const storyPrefix =
    s.designStory && (idx === 0 || steps[idx - 1]!.designStory !== s.designStory)
      ? `${s.designStory} · `
      : ''
  return `${n}/${String(total).padStart(2, '0')} · ${storyPrefix}${surface}${s.label}`
}

export default function FlowChrome({ flowNumber, title, thesis, steps, persona }: Props) {
  const [i, setI] = useState(0)
  const step = steps[i]
  const total = steps.length

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink-900">
      <header className="sticky top-0 z-20 border-b border-ink-200/80 bg-canvas-raised/95 backdrop-blur-md shadow-[0_1px_0_rgba(14,15,18,0.04)]">
        <div className="flow-chrome-inner py-2.5 sm:py-3 flex flex-col gap-2">
          {/* Title + close — single compact row */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="min-w-0 flex-1">
              <p className="text-2xs font-mono text-ink-400 uppercase tracking-wide m-0 leading-none mb-0.5">
                Flow {flowNumber}
              </p>
              <h1 className="text-sm sm:text-[0.9375rem] font-semibold text-ink-900 m-0 leading-tight line-clamp-2 md:line-clamp-1">
                {title}
              </h1>
            </div>
            <Link
              to="/flows"
              className="shrink-0 inline-flex items-center justify-center gap-1 rounded-md h-8 px-2.5 sm:px-3 text-xs sm:text-sm font-medium text-ink-600 hover:text-ink-900 hover:bg-ink-100/90 border border-ink-200/80"
              aria-label="Close and return to all flows"
            >
              <span className="hidden sm:inline">Close</span>
              <X size={16} aria-hidden="true" />
            </Link>
          </div>

          {/* Back | step | Next */}
          <div className="flex items-stretch sm:items-center gap-2">
            <button
              type="button"
              onClick={() => setI(v => Math.max(0, v - 1))}
              disabled={i === 0}
              className="shrink-0 inline-flex items-center justify-center rounded-lg border border-ink-200/90 bg-canvas-raised w-10 h-10 sm:w-auto sm:px-3 text-sm text-ink-700 hover:bg-ink-50 disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:bg-canvas-raised"
              aria-label="Previous step"
            >
              <ChevronLeft size={18} aria-hidden="true" />
              <span className="hidden md:inline ml-1">Back</span>
            </button>

            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <label htmlFor="flow-step-select" className="sr-only">
                Choose step ({i + 1} of {total})
              </label>
              <select
                id="flow-step-select"
                value={i}
                title={thesis}
                onChange={e => setI(Number(e.target.value))}
                className="flow-step-select w-full min-h-10 rounded-lg border border-ink-200 bg-canvas-raised py-2 pl-3 text-sm text-ink-900 shadow-edge"
              >
                {steps.map((s, idx) => (
                  <option key={idx} value={idx}>
                    {buildOptionLabel(steps, s, idx, total)}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={() => setI(v => Math.min(total - 1, v + 1))}
              disabled={i === total - 1}
              className="shrink-0 inline-flex items-center justify-center rounded-lg border border-accent/30 bg-accent text-white w-10 h-10 sm:w-auto sm:px-3 text-sm font-medium hover:bg-accent-ink disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:bg-accent"
              aria-label="Next step"
            >
              <span className="hidden md:inline mr-1">Next</span>
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>

          {persona ? (
            <details className="rounded-md border border-ink-200/70 bg-canvas-sunken/20 px-2 sm:px-3">
              <summary className="cursor-pointer list-none py-2 text-2xs sm:text-xs text-ink-600 flex items-center justify-between gap-2 [&::-webkit-details-marker]:hidden">
                <span className="shrink-0">Who you&apos;re following</span>
                <span className="font-semibold text-ink-900 text-right min-w-0">
                  {persona.name}
                  <span className="font-normal text-ink-500 hidden sm:inline"> · {persona.title}</span>
                </span>
              </summary>
              <div className="pb-2.5 pt-0 text-2xs sm:text-xs text-ink-600 leading-relaxed border-t border-ink-100/70">
                <p className="mt-2 m-0">{persona.job}</p>
                {persona.pillars.length > 0 ? (
                  <p className="mt-1.5 mb-0 text-ink-500">{persona.pillars.join(' · ')}</p>
                ) : null}
              </div>
            </details>
          ) : null}
        </div>
      </header>

      <div className="flex-1 min-h-0">
        {step.immersive ? (
          <div className="flow-chrome-inner py-4 sm:py-5">
            {step.body}
            <details className="mt-8 rounded-xl border border-ink-200/90 bg-canvas-raised/90 p-4 sm:p-5 shadow-lift-sm">
              <summary className="text-sm font-medium text-ink-700 cursor-pointer select-none">
                Why we built this step
              </summary>
              <div className="mt-4 space-y-3 border-t border-ink-100 pt-4 text-sm text-ink-600">{step.notes}</div>
            </details>
          </div>
        ) : (
          <div className="flow-chrome-inner py-5 sm:py-7 grid lg:grid-cols-[1fr_280px] gap-6 lg:gap-8">
            <div className="min-w-0">{step.body}</div>
            <aside className="space-y-3 lg:sticky lg:top-[7.5rem] lg:self-start">
              <div className="text-2xs uppercase tracking-wider text-ink-500">Why this step</div>
              {step.notes}
            </aside>
          </div>
        )}
      </div>
    </div>
  )
}

export function Note({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-r-lg border-l-[3px] border-accent bg-canvas-raised/50 pl-4 py-3 pr-3 text-sm text-ink-700 ring-1 ring-ink-900/[0.02]">
      <div className="text-xs font-semibold text-ink-900 mb-1">{title}</div>
      <div className="text-xs text-ink-600 leading-relaxed [&_strong]:text-ink-900 [&_strong]:font-semibold">{children}</div>
    </div>
  )
}

export function Surface({
  chrome,
  children,
  className = '',
  slackTitle,
}: {
  chrome?: 'web' | 'slack' | 'mobile' | 'plain'
  children: ReactNode
  className?: string
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
