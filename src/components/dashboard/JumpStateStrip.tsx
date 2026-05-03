import type { ReactNode } from 'react'

/** Shown under preset chips — ties walkthrough behavior to the dock (plan/03: honest prototype affordances). */
export const DEMO_PRESET_STRIP_HELP =
  'Saved demo moments: each chip jumps this surface and updates the Coworker dock below—the same read you get after tapping the real control, without hunting every tile.'

/**
 * Preset row — matches plan/03 pill / eyebrow conventions (mono label, rounded-full chips).
 * Optional `description` explains demo presets for reviewers (jump UI state → dock).
 */
export function JumpStateStrip({
  label,
  children,
  className = '',
  description,
}: {
  label: string
  children: ReactNode
  className?: string
  /** One line: why these chips exist and what changes when you press them */
  description?: string
}) {
  return (
    <div className={`border-b border-ink-100 bg-canvas-sunken/50 ${className}`}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-2xs font-mono uppercase tracking-[0.14em] text-accent-ink shrink-0 font-medium">
          {label}
        </span>
        <div className="flex flex-wrap items-center gap-2">{children}</div>
      </div>
      {description ? (
        <p className="text-2xs text-ink-600 leading-relaxed mt-2.5 mb-0 max-w-prose">{description}</p>
      ) : null}
    </div>
  )
}

type JumpPresetTone = 'neutral' | 'interactive'

export function JumpPresetButton({
  children,
  onClick,
  active = false,
  tone = 'interactive',
}: {
  children: ReactNode
  onClick: () => void
  active?: boolean
  tone?: JumpPresetTone
}) {
  const base =
    'rounded-full px-2.5 py-1 text-2xs font-medium border transition-colors duration-150 ease-smooth'
  if (active) {
    return (
      <button type="button" onClick={onClick} className={`${base} border-accent bg-accent-soft/50 text-accent-ink ring-1 ring-accent/25`}>
        {children}
      </button>
    )
  }
  if (tone === 'neutral') {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${base} border-ink-200 bg-canvas-raised text-ink-700 hover:bg-ink-50`}
      >
        {children}
      </button>
    )
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} border-ink-200 bg-canvas-raised text-ink-700 hover:border-accent/40 hover:text-ink-900`}
    >
      {children}
    </button>
  )
}
