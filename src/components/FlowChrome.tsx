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

function stepOptionLabel(s: FlowStep, idx: number, total: number): string {
  const n = String(idx + 1).padStart(2, '0')
  const surface = s.surface ? `${s.surface} · ` : ''
  return `${n}/${String(total).padStart(2, '0')} · ${surface}${s.label}`
}

export default function FlowChrome({ flowNumber, title, thesis, steps, persona }: Props) {
  const [i, setI] = useState(0)
  const step = steps[i]
  const total = steps.length

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink-900">
      <header className="sticky top-0 z-20 border-b border-ink-200/80 bg-canvas-raised/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-5">
          <div className="h-12 sm:h-14 flex items-center gap-2 sm:gap-4 min-w-0">
            <Link
              to="/flows"
              className="shrink-0 inline-flex items-center justify-center rounded-lg h-9 w-9 sm:w-auto sm:px-2.5 text-ink-500 hover:text-ink-900 hover:bg-ink-100/80 text-sm"
              aria-label="Back to all flows"
            >
              <X size={16} aria-hidden="true" />
              <span className="hidden sm:inline ml-1.5">Back</span>
            </Link>
            <div className="min-w-0 flex-1">
              <p className="text-2xs font-mono text-ink-400 uppercase tracking-wide m-0 leading-none mb-0.5">
                Flow {flowNumber}
              </p>
              <h1 className="text-sm sm:text-base font-semibold text-ink-900 truncate m-0 leading-tight">{title}</h1>
            </div>
          </div>

          <div className="pb-2 sm:pb-3 space-y-2">
            <label className="block lg:hidden">
              <span className="sr-only">Jump to step</span>
              <select
                value={i}
                onChange={e => setI(Number(e.target.value))}
                className="w-full rounded-lg border border-ink-200 bg-canvas-raised py-2.5 px-3 text-sm text-ink-900 shadow-edge"
              >
                {steps.map((s, idx) => (
                  <option key={idx} value={idx}>
                    {stepOptionLabel(s, idx, total)}
                  </option>
                ))}
              </select>
            </label>

            <nav className="hidden lg:flex flex-wrap gap-1" aria-label="Steps">
              {steps.map((s, idx) => {
                const active = idx === i
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setI(idx)}
                    aria-current={active ? 'step' : undefined}
                    title={s.surface ? `${s.surface} — ${thesis}` : thesis}
                    className={`max-w-[11rem] truncate rounded-md px-2 py-1 text-2xs sm:text-xs text-left transition-colors ${
                      active
                        ? 'bg-accent text-white font-medium'
                        : 'text-ink-600 hover:bg-ink-100/90 border border-transparent hover:border-ink-200/80'
                    }`}
                  >
                    <span className="font-mono opacity-70">{String(idx + 1).padStart(2, '0')}</span>{' '}
                    {s.designStory && (idx === 0 || steps[idx - 1]!.designStory !== s.designStory) ? (
                      <span className="text-ink-400 font-normal hidden xl:inline">{s.designStory} · </span>
                    ) : null}
                    {s.label}
                  </button>
                )
              })}
            </nav>

            {step.surface ? (
              <p className="text-2xs text-ink-500 m-0 lg:mt-1">
                <span className="font-medium text-ink-600">This step:</span> {step.surface}
              </p>
            ) : null}
          </div>

          {persona ? (
            <details className="group border-t border-ink-100/90 bg-canvas-sunken/25 -mx-3 sm:-mx-5 px-3 sm:px-5">
              <summary className="cursor-pointer list-none py-2.5 text-xs text-ink-600 flex items-center justify-between gap-2 [&::-webkit-details-marker]:hidden">
                <span>Who you&apos;re following</span>
                <span className="font-semibold text-ink-900 shrink-0">
                  {persona.name}
                  <span className="font-normal text-ink-500 hidden sm:inline"> · {persona.title}</span>
                </span>
              </summary>
              <div className="pb-3 pt-0 text-xs text-ink-600 leading-relaxed border-t border-ink-100/70">
                <p className="mt-2 m-0">{persona.job}</p>
                {persona.pillars.length > 0 ? (
                  <p className="mt-2 mb-0 text-ink-500">{persona.pillars.join(' · ')}</p>
                ) : null}
              </div>
            </details>
          ) : null}
        </div>
      </header>

      <div className="flex-1">
        {step.immersive ? (
          <div className="max-w-[min(100vw,1480px)] mx-auto px-3 sm:px-5 py-5 sm:py-6">
            {step.body}
            <details className="mt-8 rounded-xl border border-ink-200/90 bg-canvas-raised/90 p-4 sm:p-5 shadow-lift-sm">
              <summary className="text-sm font-medium text-ink-700 cursor-pointer select-none">
                Why we built this step
              </summary>
              <div className="mt-4 space-y-3 border-t border-ink-100 pt-4 text-sm text-ink-600">{step.notes}</div>
            </details>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-3 sm:px-5 py-6 sm:py-8 grid lg:grid-cols-[1fr_280px] gap-6 lg:gap-8">
            <div className="min-w-0">{step.body}</div>
            <aside className="space-y-3 lg:sticky lg:top-24 lg:self-start">
              <div className="text-2xs uppercase tracking-wider text-ink-500">Why this step</div>
              {step.notes}
            </aside>
          </div>
        )}
      </div>

      <footer className="sticky bottom-0 border-t border-ink-200/80 bg-canvas-raised/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-5 py-3 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setI(Math.max(0, i - 1))}
            disabled={i === 0}
            className="btn-ghost text-sm disabled:opacity-30 disabled:cursor-not-allowed inline-flex items-center gap-1"
          >
            <ChevronLeft size={14} aria-hidden="true" />
            <span className="hidden sm:inline">Previous</span>
          </button>
          <span className="text-2xs font-mono text-ink-500 tabular-nums shrink-0" aria-live="polite">
            {i + 1} / {total}
          </span>
          <button
            type="button"
            onClick={() => setI(Math.min(total - 1, i + 1))}
            disabled={i === total - 1}
            className="btn-primary text-sm disabled:opacity-30 disabled:cursor-not-allowed inline-flex items-center gap-1"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight size={14} aria-hidden="true" />
          </button>
        </div>
      </footer>
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
