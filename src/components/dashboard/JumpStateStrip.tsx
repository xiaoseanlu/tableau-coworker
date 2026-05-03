import type { ReactNode } from 'react'

/**
 * Preset row — matches plan/03 pill / eyebrow conventions (mono label, rounded-full chips).
 */
export function JumpStateStrip({
  label,
  children,
  className = '',
}: {
  label: string
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`flex flex-wrap items-center gap-2 border-b border-ink-100 bg-canvas-sunken/40 ${className}`}
    >
      <span className="text-2xs font-mono uppercase tracking-[0.14em] text-accent-ink shrink-0 font-medium">
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
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
