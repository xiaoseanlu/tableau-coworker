/**
 * Jordan Patel · VP Sales Ops — Acme SaaS curation queue demo (aligned to plan/09 + Maya v18).
 */
export const JORDAN_TENANT = {
  workbooks: 47,
  queueThisWeek: 17,
  updatedAgo: '8m ago',
  moment: 'Wed · May 6, 2026 · 2:18 PM PT',
  mayaAsk: '$87.4M ARR in Monday brief — "the real one?"',
  portfolio: [
    { id: 'active' as const, label: 'Active & trusted', pct: 54, color: '#1F7A4D' },
    { id: 'stale' as const, label: 'Stale', pct: 19, color: '#A85B00' },
    { id: 'dup' as const, label: 'Duplicate risk', pct: 15, color: '#5B2E91' },
    { id: 'dq' as const, label: 'Data-quality flags', pct: 12, color: '#B0263A' },
  ],
  tiles: { stale: 9, dup: 5, dq: 3 },
  audit: {
    id: 'G-2026-0514-0892',
    action: 'remap ARR_PACING → v2_coverage_won',
    time: '2:26 PM PT',
    actor: 'Jordan Patel',
  },
  broadcast: {
    slackChannel: '#data-governance',
    jira: 'DATA-182',
    emailSubject: 'Exec ARR roll-up — now on v2 (board pack)',
  },
  financeRecipient: {
    name: 'R. Okonkwo',
    role: 'Finance · Workbook owner',
    workbook: 'Exec ARR roll-up (Finance)',
  },
} as const

export const JORDAN_QUEUE_COPY = {
  orderingNote:
    'Data-quality before duplicate before stale in 73% of your triage sessions — Finance row elevated because Maya asked about the number Wednesday.',
} as const
