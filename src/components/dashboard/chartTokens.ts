/**
 * Hex values for Recharts — mirrors `plan/03-design-system.md` + tailwind.config.js
 * (no runtime theme bridge; keep chart strokes aligned to tokens).
 */
export const CHART = {
  grid: '#DDE0E8',
  accent: '#5B2E91',
  accentInk: '#3A1B5E',
  signal: '#C7841C',
  danger: '#B0263A',
  success: '#1F7A4D',
  warning: '#A85B00',
  canvas: '#FFFFFF',
  /** App / chart gutter against white segments; matches Tailwind `canvas` default. */
  canvasPage: '#FAFAF7',
  /** Raised cards; matches `canvas.sunken` in tailwind. */
  canvasSunken: '#F2F2EE',
} as const

/** Axis, ticks, muted plan lines — matches tailwind `ink` scale in plan/03. */
export const CHART_AXIS = {
  tick: '#5B6070',
  label: '#3D414C',
  muted: '#858B9C',
  gridSubtle: '#EEF0F4',
} as const

/** JetBrains Mono for chart tooltips and numeric ticks (plan/03 — numerals in mono). */
export const CHART_FONT_MONO = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace'

/** Consistent Recharts tooltip shell; pass overrides (e.g. border color). */
export function chartTooltip(overrides?: Record<string, string | number>): Record<string, string | number> {
  return {
    fontSize: 12,
    borderRadius: 8,
    fontFamily: CHART_FONT_MONO,
    border: `1px solid ${CHART_AXIS.gridSubtle}`,
    ...overrides,
  }
}
