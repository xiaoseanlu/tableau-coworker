/**
 * Sam Reyes · West RSD — mobile briefing demo (aligned to plan/10 + Maya/Jordan substrate).
 */
export const SAM_MOBILE = {
  when: 'Tue · May 4, 2026 · 7:52 AM PT',
  region: 'West',
  sources: 'CRM sync 7:48 AM PT · Pipeline v2 (J. Patel, Apr 30) — same bind as Maya’s cards',
  coverageWoW: '−0.22 WoW',
  coverageLabel: '2.6×',
  sparkline: [2.95, 2.92, 2.9, 2.88, 2.86, 2.84, 2.82, 2.6] as const,
  pushProposed: {
    title: '3 deals stuck in legal >7 days',
    body: 'Tap to open West briefing — without loading the squished grid.',
  },
  stuck: [
    {
      id: 'acme',
      name: 'Acme Co',
      acv: '$840K',
      days: '11d',
      detail: 'legal — MSA redlines',
      action: 'Nudge legal',
      stage: 'Legal review',
    },
    {
      id: 'lumen',
      name: 'Lumen Analytics',
      acv: '$290K',
      days: '8d',
      detail: 'legal — approval chain stalled',
      action: 'Ping AE',
    },
    {
      id: 'brightwave',
      name: 'Brightwave Labs',
      acv: '$175K',
      days: '7d',
      detail: 'deal desk',
      action: 'View thread',
    },
  ],
  wins: [
    { label: 'Northwind Health closed Fri — East handoff clean.' },
    { label: 'West reps cleared 14 stale opps Mon.' },
  ],
  drill: {
    stalledSince: 'Apr 23',
    legalOwner: 'M. Chen',
    legalTitle: 'legal ops',
    ae: 'Patel',
    lastNote: 'Apr 29 — liability cap language',
    draft:
      'Chen — Acme Co needs liability language by EOD; staff meeting may call this out. Can we clear or escalate to GC?',
  },
  act: {
    sentTo: 'M. Chen',
    watchAt: '5:00 PM PT',
    nextQueue: 'Tue 7:45 AM',
    mayaStaff: '9:00 staff',
  },
  legalInbox: {
    preview: 'Sam Reyes (West) · via Coworker',
    subject: 'Acme Co ($840K) — liability language by EOD request',
    bodyLead: 'Pre-drafted nudge — you can edit before logging to timeline.',
  },
} as const
