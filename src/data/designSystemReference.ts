/**
 * Compact reference tables for the design-system page — mirrors plan/03 + plan/14
 * without pretending to be a full Stripe-scale token pipeline.
 */

export const TYPE_SCALE_ROWS: Array<{
  token: string
  px: string
  lh: string
  use: string
  /** Realistic UI copy for this token in the coworker surface */
  sample: string
  /** Optional second line (e.g. eyebrow vs pill for 2xs) */
  sampleLine2?: { prefix: string; text: string }
  /** Extra Tailwind on the primary sample (token class still applied) */
  sampleExtraClass?: string
}> = [
  {
    token: 'text-2xs',
    px: '11px',
    lh: '16px',
    use: 'Eyebrows, pill copy, dense labels',
    sample: 'Compare to Central',
    sampleExtraClass: 'rounded-full border border-ink-200 bg-canvas-sunken/60 px-2 py-0.5 font-medium text-ink-800',
    sampleLine2: { prefix: 'Eyebrow', text: 'LIVING SURFACE · EXEC' },
  },
  {
    token: 'text-xs',
    px: '12px',
    lh: '~18px',
    use: 'Captions, timestamps, helper text',
    sample: 'Last refreshed 08:42 · Superstore sample',
    sampleExtraClass: 'text-ink-500',
  },
  {
    token: 'text-sm',
    px: '13px',
    lh: '20px',
    use: 'Dense UI, form labels',
    sample: 'Sub-Category',
    sampleExtraClass: 'text-ink-700',
  },
  {
    token: 'text-base',
    px: '15px',
    lh: '24px',
    use: 'Default body (editorial default)',
    sample: 'West is thin after the sync; Central carried the week. Confidence: moderate.',
    sampleExtraClass: 'text-ink-700 leading-relaxed max-w-[20rem]',
  },
  {
    token: 'text-lg',
    px: '17px',
    lh: '~26px',
    use: 'Lead paragraphs',
    sample: 'You asked for coverage by region — two markets explain most of the miss.',
    sampleExtraClass: 'text-ink-800 leading-relaxed max-w-[22rem]',
  },
  {
    token: 'text-xl',
    px: '20px',
    lh: '~29px',
    use: 'Card headings',
    sample: 'Pipeline health · Q2 close',
    sampleExtraClass: 'font-semibold text-ink-900 tracking-tight',
  },
  {
    token: 'text-2xl',
    px: '25px',
    lh: '32px',
    use: 'Section openers (H3)',
    sample: 'Capture evidence',
    sampleExtraClass: 'font-semibold text-ink-900 tracking-tight',
  },
  {
    token: 'text-3xl',
    px: '32px',
    lh: '38px',
    use: 'H2-scale moments',
    sample: 'What changed Monday',
    sampleExtraClass: 'font-serif italic text-ink-900 tracking-tight',
  },
  {
    token: 'text-4xl',
    px: '42px',
    lh: '48px',
    use: 'Page titles',
    sample: 'Executive overview',
    sampleExtraClass: 'font-semibold text-ink-900 tracking-tight',
  },
  {
    token: 'text-5xl',
    px: '56px',
    lh: '61px',
    use: 'Hero display (rare)',
    sample: '−6.2%',
    sampleExtraClass: 'font-mono tabular-nums font-semibold text-danger',
  },
]

export const FONT_ROLE_ROWS: Array<{ role: string; family: string; tailwind: string }> = [
  { role: 'UI & body', family: 'Inter', tailwind: 'font-sans' },
  { role: 'Editorial / display', family: 'Source Serif 4', tailwind: 'font-serif · .editorial' },
  { role: 'Metrics & meta', family: 'JetBrains Mono', tailwind: 'font-mono · tabular-nums' },
]

export const RADIUS_ROWS: Array<{ token: string; value: string; use: string; context: string }> = [
  { token: 'rounded-sm', value: '4px', use: 'Tight controls', context: 'Icon buttons, dense pills' },
  { token: 'rounded', value: '6px', use: 'Default control radius', context: 'Default buttons, small inputs' },
  { token: 'rounded-md', value: '8px', use: 'Inputs, chips', context: 'Text fields, filter chips' },
  { token: 'rounded-lg', value: '12px', use: 'Cards', context: 'Card shells, chart frames' },
  { token: 'rounded-xl', value: '16px', use: 'Large containers', context: 'Modals, wide panels' },
  { token: 'rounded-2xl', value: '20px', use: 'Pills, hero panels', context: 'Hero bentos, TOC pills' },
]

export const SPACING_ROWS: Array<{ step: string; px: string; use: string }> = [
  { step: 'Base unit', px: '8px', use: 'All spacing derives from multiples' },
  { step: 'Common', px: '8 · 12 · 16 · 24 · 32', use: 'Padding, gaps, section rhythm' },
  { step: 'Cards', px: '24px default', use: '16px when dense (compact mode)' },
  { step: 'Prose max', px: '60rem (~960px)', use: 'This page · matching plan/03 prose width' },
  { step: 'Flow demos', px: 'max 1280px', use: 'Home + flow surfaces when earned' },
]

export const MOTION_TIER_ROWS: Array<{ tier: string; duration: string; easing: string; allowed: string }> = [
  { tier: 'instant', duration: '0–80ms', easing: 'linear', allowed: 'Focus ring, checkbox, legend toggle' },
  {
    tier: 'snap',
    duration: '120–200ms',
    easing: 'ease-smooth / cubic-bezier(0.16, 1, 0.3, 1)',
    allowed: 'Hover, drawer, button feedback',
  },
  {
    tier: 'read',
    duration: '240–400ms',
    easing: 'ease-smooth',
    allowed: 'Chart re-layout when selection changes',
  },
  { tier: 'hero', duration: '400–600ms', easing: 'one-shot smooth', allowed: 'Section enter; max once per route' },
]

export const VIZ_SEMANTIC_ROWS: Array<{ role: string; maps: string }> = [
  { role: 'viz.gridline', maps: 'ink-200 @ low opacity · `CHART.grid` in chartTokens.ts' },
  { role: 'viz.axis', maps: 'ink-500 · tick labels smaller than body' },
  { role: 'viz.series.1…n', maps: 'accent, ink-700, success, warning — cap 6/canvas without re-seeding' },
  { role: 'viz.selection', maps: 'signal stroke + soft fill · committed point/series' },
  { role: 'viz.hover', maps: 'accent-soft @ ~40% · crosshair / tooltip pairing' },
  { role: 'viz.positive / viz.negative', maps: 'success / danger · always pair with sign + label' },
  { role: 'viz.null', maps: 'dashed ink-300 · missing, not zero' },
]

export const DENSITY_MODE_ROWS: Array<{ mode: string; when: string; delta: string }> = [
  { mode: 'comfortable', when: 'Maya exec read, Sam mobile', delta: 'Default spacing + type from plan/03' },
  { mode: 'compact', when: 'Jordan queue, admin tables', delta: '−25% vertical rhythm; body → sm where noted' },
  { mode: 'analyst', when: 'Authoring / LOD (flow-b, flow-g)', delta: 'Comfortable chrome + compact data pane' },
]

export const VOICE_DO_LINES: string[] = [
  'First person, evidence-led, explicit confidence (low / moderate / high).',
  'Short sentences; offer a drill path instead of a wall of text.',
  '“I’d want a manager to know this.” / “Don’t do this.” when warranted.',
]

export const VOICE_DONT_LINES: string[] = [
  'Cheerful assistant tone (“Here are some helpful insights!”).',
  'Watch-y openers (“I noticed…”), emoji, sparkle-prefixed “AI insight”.',
  'Implied causation on correlation charts without evidence.',
]

export const IMPLEMENTATION_MAP: Array<{ artifact: string; path: string; note: string }> = [
  { artifact: 'Tokens (Tailwind)', path: 'tailwind.config.js', note: 'Color, editorial type scale, radius, ease-smooth' },
  { artifact: 'Global / utilities', path: 'src/styles/index.css', note: 'ds-doc, buttons, focus — if split from main entry' },
  { artifact: 'Chart hex bridge', path: 'src/components/dashboard/chartTokens.ts', note: 'Recharts constants until semantic viz CSS vars' },
  { artifact: 'Design system page', path: 'src/pages/DesignSystem.tsx', note: 'This route + reference tables' },
  { artifact: 'DS demos (viz + UI)', path: 'src/components/ds/DesignSystemSamples.tsx', note: 'Gallery, interaction playground, UI primitives' },
  { artifact: 'DS demos (capture + FT)', path: 'src/components/ds/DesignSystemInteractiveDemos.tsx', note: 'Evidence rail, pipeline, layout playground' },
  { artifact: 'Capture manifest', path: 'src/data/captureFiles.ts', note: 'Regenerate via npm run captures:list' },
  { artifact: 'App chrome', path: 'src/components/SiteShell.tsx', note: 'Nav · HashRouter prototype' },
]

export const SCOPE_IN: string[] = [
  'Single theme, English, one narrative voice for the agent.',
  'Tokens + primitives + capture-grounded molecules enough for three persona flows.',
  'Documentation on this page as the “mini DS” for reviewers.',
]

export const SCOPE_OUT: string[] = [
  'Figma kit, multi-brand theming, i18n, versioning/deprecation policy.',
  'Per-component Storybook matrices, visual regression CI, a11y sign-off per control.',
  'Full molecule catalog implemented in React (many are named spec-only here).',
]
