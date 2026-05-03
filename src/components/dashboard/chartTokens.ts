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
