/**
 * Single source of truth for Maya flow demo numbers — CRO briefing for Acme SaaS,
 * Q2 FY2026 week of May 4. Keeps canvas, drill, share, and recipient views aligned.
 */
export const MAYA_BRIEF = {
  version: 'v18',
  generatedAt: '8:38 AM PT',
  meetingTime: '9:00 AM PT · Exec staff',
  dateLabel: 'Monday, May 4, 2026',
  url: 'https://acme.cloud.tableau.com/coworker/brief/monday/MY-2026-05-04-v18',
  /** One-line scan — unfurl title / push title */
  headline: 'West coverage slipped week over week; Acme Co leads 9:00 exec staff.',
  /** Subline for cards — “why open” */
  subline:
    'ARR still under plan but the gap tightened overnight; West posted the sharpest week-over-week coverage step-down of the quarter.',
  kpis: [
    {
      id: 'arr',
      label: 'ARR · YTD',
      value: '$87.4M',
      delta: '−$2.1M vs plan',
      deltaDetail: 'gap narrowed $180K vs May 3',
      tone: 'warn' as const,
    },
    {
      id: 'west',
      label: 'West coverage',
      value: '2.6×',
      delta: '−0.22 WoW',
      deltaDetail: '−2.1 pts vs prior week · v2 definition',
      tone: 'danger' as const,
    },
    {
      id: 'qend',
      label: 'Q-end coverage',
      value: '3.4×',
      delta: '+0.1 WoW',
      deltaDetail: 'buffer holds; Finance model ties here',
      tone: 'ok' as const,
    },
  ],
  deal: {
    name: 'Acme Co',
    acv: '$840K',
    stage: 'Legal review',
    slippedFrom: 'May 4 close (internal)',
    escalatedBy: 'S. Reyes · 8:14 AM PT',
  },
  staffBullets: [
    {
      n: '01',
      text: 'Acme Co ($840K) slipped to legal — Sam escalated at 8:14; name it in staff, no action required from you.',
      flag: false,
    },
    {
      n: '02',
      text: 'West coverage −2.1 pts WoW — three reps, manufacturing-heavy; one sentence + ask Sam for next week’s read.',
      flag: false,
    },
    {
      n: '03',
      text: 'EMEA conversion flat; Germany still noisy — confidence low on root cause; defer unless someone raises.',
      flag: 'watch' as const,
    },
  ],
  /** Recipient scan — “do I open the link?” */
  verdict: {
    digInIf: ['You own West pipeline or renewals', 'You need board-deck citations', 'Finance is challenging ARR to plan'],
    skimOkIf: ['You only need the staff headline', 'You are not attending 9:00 staff'],
  },
  sourcesLine:
    'HubSpot · last sync 8:38 AM PT · Q2 plan v3 (locked Apr 2) · Pipeline coverage v2 (J. Patel, Apr 30)',
  confidence: {
    west: 'moderate',
    emea: 'low',
  },
  propagation: [
    { t: '8:38', label: 'Briefing saved', subs: 0 },
    { t: '8:40', label: 'Calendar linked', subs: 3 },
    { t: '8:44', label: 'Slack #exec-staff', subs: 7 },
    { t: '8:48', label: 'First recipient opens', subs: 9 },
    { t: '8:55', label: 'Pre-staff pulls', subs: 12 },
  ],
} as const

export type BriefTone = 'warn' | 'danger' | 'ok'

export function kpiToneClass(tone: BriefTone): string {
  if (tone === 'danger') return 'text-danger border-danger/25 bg-canvas'
  if (tone === 'warn') return 'text-warning border-warning/30 bg-warning-soft/30'
  return 'text-success border-success/25 bg-success-soft/25'
}
