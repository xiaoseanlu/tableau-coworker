import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Sparkle, Layers, Clock } from '../Icons'
import AgentDock, { type AgentInsight } from './AgentDock'

const CAP = `${import.meta.env.BASE_URL}captures/`

const ACCENT = '#5B2E91'
const SIGNAL = '#C7841C'

/** Scene 01 · Sprawl — evidence `key/03-dashboard-sprawl.png` */
const SPRAWL_VIEWS = [
  { name: 'Overview', load: 100 },
  { name: 'Profit Map', load: 72 },
  { name: 'Product Mix', load: 58 },
  { name: 'Regional', load: 54 },
  { name: 'Trends', load: 48 },
  { name: 'Shipping', load: 41 },
  { name: 'Returns', load: 36 },
  { name: 'People', load: 32 },
  { name: 'Stories', load: 28 },
]

type SprawlSel = { kind: 'view'; name: string; load: number } | { kind: 'workbook' } | { kind: 'followup'; q: string } | null

function agentSprawl(sel: SprawlSel): AgentInsight {
  if (!sel) {
    return {
      title: 'Sprawl read',
      body:
        'Nine views ship in one workbook on the Superstore sample — a faithful proxy for tenant sprawl. Tap a bar to mark which sheet duplicates narrative elsewhere; tap the workbook row for retirement policy context.',
      confidence: 'moderate',
    }
  }
  if (sel.kind === 'workbook') {
    return {
      title: 'Single workbook · many surfaces',
      body:
        'Jordan’s 47-dashboard tenant scales this pattern: alphabetical sort, no health score, no canonical marker. Curation queue (next step) is computed — not toggled in Site settings.',
      confidence: 'high',
    }
  }
  if (sel.kind === 'followup') {
    return {
      title: 'Follow-up',
      body:
        sel.q === 'Which are canonical?'
          ? 'Heuristic: most-opened workbook per subject area in 90d, crossed with Jordan publishes — prototype highlights conflicts, not moral judgments.'
          : 'Stale here means zero qualifying opens in 90d with active downstream subscribers — PDF schedules count as “opens” only when humans click through.',
      confidence: 'moderate',
    }
  }
  return {
    title: `View · ${sel.name}`,
    body: `${sel.name} carries ${sel.load}% of last-90d opens in this workbook — illustrative. The sprawl issue isn’t that nine tabs exist; it’s that no surface says which ones still earn their keep.`,
    confidence: 'low on load share — structure is real',
  }
}

export function JordanSprawlBoard() {
  const [sel, setSel] = useState<SprawlSel>(null)
  const insight = useMemo(() => agentSprawl(sel), [sel])
  const idx = sel?.kind === 'view' ? SPRAWL_VIEWS.findIndex(v => v.name === sel.name) : -1

  return (
    <div className="rounded-xl border border-ink-200 bg-canvas-raised shadow-raised overflow-hidden">
      <div className="flex flex-col xl:flex-row xl:items-stretch">
        <div className="flex-1 min-w-0 border-b xl:border-b-0 xl:border-r border-ink-100">
          <div className="p-4 md:p-5 space-y-4 bg-canvas">
            <button
              type="button"
              onClick={() => setSel({ kind: 'workbook' })}
              className={`w-full text-left rounded-lg border px-4 py-3 transition-all ${
                sel?.kind === 'workbook' ? 'border-accent bg-accent-soft/40 ring-1 ring-accent/30' : 'border-ink-100 bg-canvas-raised'
              }`}
            >
              <div className="text-2xs font-mono uppercase text-ink-500 mb-1">Workbook · Superstore sample</div>
              <div className="text-sm font-semibold text-ink-900">9 views published together — tap for sprawl framing</div>
            </button>
            <img
              src={`${CAP}key/03-dashboard-sprawl.png`}
              alt="Tableau Superstore workbook — nine views in a single dashboard"
              className="block w-full rounded-md border border-ink-100"
            />
            <div className="card p-4">
              <div className="text-sm font-semibold text-ink-900 mb-1">Observed open share · by view</div>
              <div className="text-2xs text-ink-500 font-mono mb-3">Prototype weights · click a bar</div>
              <div className="h-[260px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={SPRAWL_VIEWS} layout="vertical" margin={{ top: 4, right: 12, left: 72, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 6" stroke="#DDE0E8" horizontal={false} />
                    <XAxis type="number" domain={[0, 100]} tickFormatter={v => `${v}%`} tick={{ fontSize: 10 }} />
                    <YAxis type="category" dataKey="name" width={68} tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip formatter={(v: number) => [`${v}%`, 'Open share']} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                    <Bar
                      dataKey="load"
                      radius={[0, 6, 6, 0]}
                      cursor="pointer"
                      onClick={(_d: unknown, i: number) => {
                        const row = SPRAWL_VIEWS[i]
                        if (row) setSel({ kind: 'view', name: row.name, load: row.load })
                      }}
                    >
                      {SPRAWL_VIEWS.map((_, i) => (
                        <Cell key={i} fill={i === idx ? '#3A1B5E' : ACCENT} fillOpacity={idx >= 0 && i !== idx ? 0.35 : 1} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
        <AgentDock
          insight={insight}
          followups={['Which are canonical?', 'How is stale defined?']}
          onFollowup={q => setSel({ kind: 'followup', q })}
          onClear={() => setSel(null)}
          selectionActive={!!sel}
        />
      </div>
    </div>
  )
}

const PORTFOLIO_SEGS = [
  { id: 'active' as const, label: 'Active & trusted', pct: 54, color: '#1F7A4D' },
  { id: 'stale' as const, label: 'Stale', pct: 19, color: '#A85B00' },
  { id: 'dup' as const, label: 'Duplicate risk', pct: 15, color: '#5B2E91' },
  { id: 'dq' as const, label: 'Data-quality flags', pct: 12, color: '#B0263A' },
]

const QUEUE_ITEMS = [
  {
    id: 'q1' as const,
    tone: 'warning' as const,
    title: 'West Region — Weekly Pipe v4',
    meta: 'last open · 94d ago · viewers 90d · 2',
    reason:
      'Both viewers now default-open Revenue Command Center. This workbook still publishes West_Coverage_v4 — downstream risk: low, but it creates conflicting URLs in Slack history.',
  },
  {
    id: 'q2' as const,
    tone: 'warning' as const,
    title: 'Q4 Board — Backup / do not edit',
    meta: 'opens 90d · 0',
    reason:
      'Created for a single deck read in November. No scheduled refresh. Deprecating loses nothing except a bookmark three people forgot they had.',
  },
  {
    id: 'q3' as const,
    tone: 'accent' as const,
    title: 'Pipeline Health Tracker ↔ Sales Pipeline by Region',
    meta: 'overlap · 3 charts · model · RevOps Master',
    reason:
      'Same regions, same time grain. Tracker adds a forecast band Region lacks. Recommended merge target: Pipeline — single source (v2) — canonical Jordan published 18 days ago.',
  },
  {
    id: 'q4' as const,
    tone: 'danger' as const,
    title: 'Exec ARR roll-up (Finance)',
    meta: 'drift · $2.1M vs v2',
    reason:
      "ARR_PACING still binds to legacy pipeline LOD. Maya's Monday briefing uses Pipeline Coverage v2. This workbook still teaches the old story to the board pack exporter.",
  },
]

type QueueSel =
  | { kind: 'seg'; id: 'active' | 'stale' | 'dup' | 'dq' }
  | { kind: 'row'; id: (typeof QUEUE_ITEMS)[number]['id'] }
  | { kind: 'tile'; id: 'stale' | 'dup' | 'dq' }
  | { kind: 'why' }
  | { kind: 'followup'; q: string }
  | null

function agentQueue(sel: QueueSel): AgentInsight {
  if (!sel) {
    return {
      title: 'Curation queue',
      body:
        'Tap a portfolio segment, summary tile, or queue row — ordering mixes observed triage habit with dependency edges. Nothing here is a Site-setting toggle.',
      confidence: 'moderate',
    }
  }
  if (sel.kind === 'seg') {
    const row = PORTFOLIO_SEGS.find(s => s.id === sel.id)!
    return {
      title: row.label,
      body: `${row.pct}% of the 47-workbook tenant maps to this bucket — computed from opens, overlaps, and lineage drift. Tap a queue row to tie a human story to the math.`,
      confidence: 'moderate',
    }
  }
  if (sel.kind === 'tile') {
    const m = {
      stale: { title: 'Stale tile', body: '9 workbooks crossed the 90d no-human-open bar while still attaching subscribers.', confidence: 'high' },
      dup: { title: 'Duplicates tile', body: '5 pairs flagged by chart overlap + same model LOD — merge candidates surfaced with a canonical target.', confidence: 'high' },
      dq: { title: 'Data-quality', body: '3 open definition conflicts — largest is Finance Exec ARR vs v2 coverage bind.', confidence: 'high' },
    }
    return m[sel.id]
  }
  if (sel.kind === 'row') {
    const row = QUEUE_ITEMS.find(q => q.id === sel.id)!
    return {
      title: row.title,
      body: row.reason,
      confidence: row.tone === 'danger' ? 'high' : 'moderate',
    }
  }
  if (sel.kind === 'why') {
    return {
      title: 'Queue ordering',
      body:
        'You resolve data-quality before duplicate before stale in 73% of observed triage sessions. Finance Exec roll-up is elevated because Maya asked about the number Wednesday — psychology order, graph-backed rationale.',
      confidence: 'moderate',
    }
  }
  if (sel.kind === 'followup') {
    return {
      title: 'Follow-up',
      body:
        sel.q === 'Batch merges?'
          ? 'Batch Pipeline pair after Finance remap — fewer duplicate rows before stale sweeps.'
          : 'Optional owner nudge with template: «definition conflict resolved — verify bookmark URLs». Reduces silent surprises.',
      confidence: 'low',
    }
  }
  const _exhaustive: never = sel
  return { title: '', body: String(_exhaustive), confidence: 'low' }
}

function SummaryTile({
  icon,
  count,
  label,
  tone,
  onClick,
  active,
}: {
  icon: ReactNode
  count: string
  label: string
  tone: 'warning' | 'accent' | 'danger'
  onClick: () => void
  active: boolean
}) {
  const toneClass =
    tone === 'warning'
      ? 'border-warning/30 bg-warning-soft text-warning'
      : tone === 'accent'
        ? 'border-accent/30 bg-accent-soft text-accent-ink'
        : 'border-danger/30 bg-danger-soft text-danger'
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md border p-3 text-left w-full transition-all ${toneClass} ${active ? 'ring-2 ring-signal/40' : ''}`}
    >
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-2xs uppercase tracking-wider font-mono font-semibold">{label}</span>
      </div>
      <div className="editorial text-2xl text-ink-900 leading-none">{count}</div>
    </button>
  )
}

function QueueRow({
  tone,
  title,
  meta,
  reason,
  onClick,
  active,
}: {
  tone: 'warning' | 'accent' | 'danger'
  title: string
  meta: string
  reason?: string
  onClick: () => void
  active: boolean
}) {
  const dotClass = tone === 'warning' ? 'bg-warning' : tone === 'accent' ? 'bg-accent' : 'bg-danger'
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-start gap-3 p-3 rounded-md w-full text-left border transition-all ${
        active ? 'border-accent bg-accent-soft/30 ring-1 ring-accent/20' : 'bg-canvas-raised border-ink-100'
      }`}
    >
      <span className={`dot ${dotClass} mt-1.5 shrink-0`} />
      <div className="flex-1 min-w-0">
        <div className="text-sm text-ink-900">{title}</div>
        {reason ? <div className="text-xs text-ink-600 mt-1.5 leading-relaxed">{reason}</div> : null}
      </div>
      <div className="text-2xs text-ink-400 font-mono shrink-0 text-right max-w-[40%]">{meta}</div>
    </button>
  )
}

export function JordanQueueBoard() {
  const [sel, setSel] = useState<QueueSel>(null)
  const insight = useMemo(() => agentQueue(sel), [sel])

  return (
    <div className="rounded-xl border border-ink-200 bg-canvas-raised shadow-raised overflow-hidden">
      <div className="flex flex-col xl:flex-row xl:items-stretch">
        <div className="flex-1 min-w-0 p-6 min-h-[460px] border-b xl:border-b-0 xl:border-r border-ink-100 bg-canvas space-y-5">
          <div className="flex items-baseline justify-between">
            <div>
              <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Curation queue · for Jordan</div>
              <div className="editorial text-xl text-ink-900">17 items · this week</div>
            </div>
            <div className="text-xs text-ink-500 font-mono">Updated 8m ago</div>
          </div>

          <div>
            <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-2">Tenant portfolio · observed health</div>
            <div className="space-y-2">
              <div className="flex h-3 rounded-full overflow-hidden border border-ink-100 shadow-card" role="img" aria-label="Portfolio mix">
                {PORTFOLIO_SEGS.map(s => (
                  <button
                    key={s.id}
                    type="button"
                    style={{ width: `${s.pct}%`, backgroundColor: s.color }}
                    className="h-full min-w-[12px] focus:outline-none focus:ring-2 focus:ring-signal cursor-pointer"
                    title={`${s.label}: ${s.pct}%`}
                    onClick={() => setSel({ kind: 'seg', id: s.id })}
                  />
                ))}
              </div>
              <ul className="grid grid-cols-2 gap-2 text-2xs">
                {PORTFOLIO_SEGS.map(s => (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => setSel({ kind: 'seg', id: s.id })}
                      className={`flex items-center gap-2 text-ink-700 text-left rounded px-1 py-0.5 ${
                        sel?.kind === 'seg' && sel.id === s.id ? 'bg-accent-soft/50' : ''
                      }`}
                    >
                      <span className="w-2 h-2 rounded-sm shrink-0" style={{ backgroundColor: s.color }} />
                      <span>{s.label}</span>
                      <span className="font-mono text-ink-500">{s.pct}%</span>
                    </button>
                  </li>
                ))}
              </ul>
              <p className="text-2xs text-ink-500 font-mono">n = 47 workbooks · Acme tenant · observed opens 90d</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <SummaryTile
              icon={<Clock size={14} />}
              count="9"
              label="Stale"
              tone="warning"
              onClick={() => setSel({ kind: 'tile', id: 'stale' })}
              active={sel?.kind === 'tile' && sel.id === 'stale'}
            />
            <SummaryTile
              icon={<Layers size={14} />}
              count="5"
              label="Duplicates"
              tone="accent"
              onClick={() => setSel({ kind: 'tile', id: 'dup' })}
              active={sel?.kind === 'tile' && sel.id === 'dup'}
            />
            <SummaryTile
              icon={<Sparkle size={14} />}
              count="3"
              label="Data-quality flags"
              tone="danger"
              onClick={() => setSel({ kind: 'tile', id: 'dq' })}
              active={sel?.kind === 'tile' && sel.id === 'dq'}
            />
          </div>

          <div className="space-y-2">
            {QUEUE_ITEMS.map(q => (
              <QueueRow
                key={q.id}
                tone={q.tone}
                title={q.title}
                meta={q.meta}
                reason={q.reason}
                onClick={() => setSel({ kind: 'row', id: q.id })}
                active={sel?.kind === 'row' && sel.id === q.id}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setSel({ kind: 'why' })}
            className={`w-full text-left text-sm text-ink-600 border rounded-md p-4 bg-canvas-raised ${
              sel?.kind === 'why' ? 'border-signal ring-1 ring-signal/30' : 'border-ink-100'
            }`}
          >
            <span className="font-medium text-ink-800">Why I&apos;m seeing this queue order</span>
            <p className="mt-2 leading-relaxed text-xs">
              Triage habit + dependency graph — tap to pin the ordering rationale in the dock.
            </p>
          </button>
        </div>

        <AgentDock
          insight={insight}
          followups={['Batch merges?', 'Notify owners?']}
          onFollowup={q => setSel({ kind: 'followup', q })}
          onClear={() => setSel(null)}
          selectionActive={!!sel}
        />
      </div>
    </div>
  )
}

const DRIFT_ROWS = [
  { wb: 'Exec ARR (Finance)', legacy: 12.4, v2: 10.3 },
  { wb: 'West Weekly v4', legacy: 4.1, v2: 3.9 },
  { wb: 'Board pack feed', legacy: 11.0, v2: 8.9 },
]

type DiagnoseSel =
  | { kind: 'wb'; name: string }
  | { kind: 'node'; id: 'field' | 'workbook' | 'board' }
  | { kind: 'capture' }
  | { kind: 'followup'; q: string }
  | null

function agentDiagnose(sel: DiagnoseSel): AgentInsight {
  if (!sel) {
    return {
      title: 'Diagnosis surface',
      body:
        'Tap the drift bars, a lineage node, or the authoring capture — Agent sits where Jordan triages, not only as a tooltip in edit mode (key/02).',
      confidence: 'moderate',
    }
  }
  if (sel.kind === 'wb') {
    const row = DRIFT_ROWS.find(r => r.wb === sel.name)
    return {
      title: sel.name,
      body: row
        ? `Legacy bind reads ${row.legacy}M ARR pace vs ${row.v2}M on v2 — delta is the staff-meeting risk, not refresh latency.`
        : 'Workbook-level drift — inspect LOD and catalog fingerprint before merge.',
      confidence: 'high',
    }
  }
  if (sel.kind === 'node') {
    const m = {
      field: {
        title: 'ARR_PACING field',
        body: 'Catalog fingerprint matches deprecated LOD text from April 2 — Finance publish never picked up the v2 bind.',
        confidence: 'high',
      },
      workbook: {
        title: 'Finance workbook',
        body: 'Last publish Feb 14 — owner R. Okonkwo. Downstream subscribers include board pack exporter.',
        confidence: 'high',
      },
      board: {
        title: 'Board pack exporter',
        body: 'Pulls Finance Exec ARR into the deck Maya reviews — why this row is elevated in Jordan’s queue.',
        confidence: 'moderate',
      },
    }
    return m[sel.id]
  }
  if (sel.kind === 'capture') {
    return {
      title: 'Authoring shell today',
      body:
        'Tableau Agent as tooltip is real — placement argument is governance-first surfacing in the queue.',
      confidence: 'high',
    }
  }
  return {
    title: 'Follow-up',
    body:
      sel.q === 'Remap steps?'
        ? 'Remap ARR_PACING to catalog bind v2_coverage_won, validate desktop + mobile thumbnails, republish, verify downstream PDF.'
        : 'Finance owner confirms; Maya gets passive footnote when board pack refreshes.',
    confidence: 'moderate',
  }
}

export function JordanDiagnoseBoard() {
  const [sel, setSel] = useState<DiagnoseSel>(null)
  const insight = useMemo(() => agentDiagnose(sel), [sel])
  const barIdx = sel?.kind === 'wb' ? DRIFT_ROWS.findIndex(r => r.wb === sel.name) : -1

  return (
    <div className="rounded-xl border border-ink-200 bg-canvas-raised shadow-raised overflow-hidden">
      <div className="flex flex-col xl:flex-row xl:items-stretch">
        <div className="flex-1 min-w-0 p-6 md:p-8 space-y-6 border-b xl:border-b-0 xl:border-r border-ink-100">
          <div>
            <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-2">Row D · Exec ARR roll-up (Finance)</div>
            <div className="rounded-md border border-danger/25 bg-danger-soft/30 px-4 py-4 text-sm text-ink-800 space-y-3">
              <p>
                <strong>Exec ARR roll-up (Finance)</strong> binds <code className="font-mono text-xs bg-canvas px-1 rounded">ARR_PACING</code> to
                the legacy LOD you deprecated on <strong>April 2</strong>.
              </p>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    ['field', 'Catalog field'],
                    ['workbook', 'Workbook publish'],
                    ['board', 'Board pack'],
                  ] as const
                ).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSel({ kind: 'node', id })}
                    className={`text-xs px-3 py-1.5 rounded-md border ${
                      sel?.kind === 'node' && sel.id === id ? 'border-accent bg-accent-soft/50' : 'border-ink-200 bg-canvas-raised'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="card p-4 min-h-[240px]">
            <div className="text-sm font-semibold text-ink-900 mb-1">Modeled ARR drift · legacy vs v2 ($M)</div>
            <div className="text-2xs text-ink-500 font-mono mb-3">Click a legacy bar</div>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DRIFT_ROWS} layout="vertical" margin={{ top: 4, right: 12, left: 108, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 6" stroke="#DDE0E8" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 10 }} />
                  <YAxis type="category" dataKey="wb" width={100} tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                  <Bar
                    dataKey="legacy"
                    name="legacy"
                    fill="#B0263A"
                    radius={[0, 4, 4, 0]}
                    cursor="pointer"
                    onClick={(_d: unknown, i: number) => {
                      const row = DRIFT_ROWS[i]
                      if (row) setSel({ kind: 'wb', name: row.wb })
                    }}
                  >
                    {DRIFT_ROWS.map((_, i) => (
                      <Cell key={i} fillOpacity={barIdx >= 0 && i !== barIdx ? 0.35 : 1} />
                    ))}
                  </Bar>
                  <Bar dataKey="v2" name="v2" fill={ACCENT} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-2">Reference · authoring shell today</div>
            <button type="button" className="block w-full" onClick={() => setSel({ kind: 'capture' })}>
              <img
                src={`${CAP}key/02-web-authoring.png`}
                alt="Tableau web authoring shell — Tableau Agent tooltip visible"
                className={`block w-full rounded-md border ${sel?.kind === 'capture' ? 'border-signal ring-2 ring-signal/30' : 'border-ink-100'}`}
              />
            </button>
          </div>
        </div>

        <AgentDock
          insight={insight}
          followups={['Remap steps?', 'Who confirms?']}
          onFollowup={q => setSel({ kind: 'followup', q })}
          onClear={() => setSel(null)}
          selectionActive={!!sel}
        />
      </div>
    </div>
  )
}

const GOV_POINTS = [
  { day: 'Mon', score: 78 },
  { day: 'Tue', score: 79 },
  { day: 'Wed', score: 80 },
  { day: 'Thu', score: 81 },
  { day: 'Fri', score: 82 },
]

type ResolveSel =
  | { kind: 'pulse'; idx: number }
  | { kind: 'banner'; id: 'publish' | 'subs' | 'queue' }
  | { kind: 'followup'; q: string }
  | null

function agentResolve(sel: ResolveSel): AgentInsight {
  if (!sel) {
    return {
      title: 'Loop closed',
      body:
        'Tap the governance pulse, or a sentence in the receipt — downstream readers and queue state should narrate together.',
      confidence: 'moderate',
    }
  }
  if (sel.kind === 'pulse') {
    const pt = GOV_POINTS[sel.idx]
    return {
      title: `Governance composite · ${pt.day}`,
      body: `Score ${pt.score} — illustrative composite of stale cleared, duplicate rate, and definition conflicts. Low confidence on the exact number; high confidence on visibility.`,
      confidence: 'low',
    }
  }
  if (sel.kind === 'followup') {
    return {
      title: 'Follow-up',
      body:
        sel.q === 'Rollback path?'
          ? 'One-click revert to Apr 30 snapshot for Finance workbook — audit retains both lineage versions.'
          : 'Maya’s briefing adds a passive footnote on next sync; no manual ping required unless board pack job fails.',
      confidence: 'low',
    }
  }
  const m = {
    publish: {
      title: 'Published',
      body: 'Exec ARR roll-up now binds v2 — audit lineage snapshot stored with actor Jordan Patel.',
      confidence: 'high',
    },
    subs: {
      title: 'Subscribers notified',
      body: '12 downstream consumers — Maya and Sam’s surfaces pick up v2 on next sync; loud failure preferred to quiet drift.',
      confidence: 'moderate',
    },
    queue: {
      title: 'Queue state',
      body: 'Row D closed — Row C duplicate merge still open; Jordan batches merges next.',
      confidence: 'high',
    },
  }
  return m[sel.id]
}

export function JordanResolveBoard() {
  const [sel, setSel] = useState<ResolveSel>(null)
  const insight = useMemo(() => agentResolve(sel), [sel])
  const pulseIdx = sel?.kind === 'pulse' ? sel.idx : -1

  return (
    <div className="rounded-xl border border-ink-200 bg-canvas-raised shadow-raised overflow-hidden">
      <div className="flex flex-col xl:flex-row xl:items-stretch">
        <div className="flex-1 min-w-0 p-8 space-y-5 border-b xl:border-b-0 xl:border-r border-ink-100">
          <div
            className={`rounded-md border border-success/25 bg-success-soft/30 px-4 py-4 text-sm text-ink-800 space-y-2 ${
              sel?.kind === 'banner' && sel.id === 'publish' ? 'ring-2 ring-signal/30' : ''
            }`}
          >
            <button type="button" className="text-left w-full" onClick={() => setSel({ kind: 'banner', id: 'publish' })}>
              <p>
                <strong>Published.</strong> Exec ARR roll-up (Finance) now binds <strong>v2</strong>.
              </p>
            </button>
            <button type="button" className="text-left w-full" onClick={() => setSel({ kind: 'banner', id: 'subs' })}>
              <p>
                <strong>Subscribers notified (12)</strong> — Maya Chen · S. Reyes · …
              </p>
            </button>
            <button type="button" className="text-left w-full" onClick={() => setSel({ kind: 'banner', id: 'queue' })}>
              <p className="text-ink-600">
                Queue · Row D <strong>closed</strong> · duplicate merge (Row C) still open.
              </p>
            </button>
          </div>

          <p className="font-mono text-2xs text-ink-400">
            G-2026-0514-0892 · remap ARR_PACING → v2 · 2:26 PM PT · actor: Jordan Patel · audit: lineage snapshot stored
          </p>

          <div className="card p-4">
            <div className="text-sm font-semibold text-ink-900 mb-3">Governance health · composite pulse</div>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={GOV_POINTS}
                  margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
                  onClick={e => {
                    if (e?.activeTooltipIndex != null) setSel({ kind: 'pulse', idx: e.activeTooltipIndex })
                  }}
                >
                  <CartesianGrid strokeDasharray="3 6" stroke="#DDE0E8" vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[76, 84]} tick={{ fontSize: 10, fontFamily: 'JetBrains Mono' }} width={28} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 8 }} />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke={ACCENT}
                    strokeWidth={2.5}
                    dot={(props: { cx?: number; cy?: number; index?: number }) => {
                      const { cx, cy, index } = props
                      if (cx == null || cy == null || index == null) return <g />
                      const active = index === pulseIdx
                      return (
                        <circle
                          cx={cx}
                          cy={cy}
                          r={active ? 9 : 5}
                          fill={active ? ACCENT : '#fff'}
                          stroke={ACCENT}
                          strokeWidth={2}
                          className="cursor-pointer"
                        />
                      )
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <p className="text-sm text-ink-700 italic border-l-2 border-signal pl-3">
            Done. Maya&apos;s Monday surface pulls the same v2 ARR_PACING as Finance. If this breaks Okonkwo&apos;s offline sheet,
            they&apos;ll tell us — and the queue will reopen.
          </p>
        </div>

        <AgentDock
          insight={insight}
          followups={['Rollback path?', 'Alert Maya?']}
          onFollowup={q => setSel({ kind: 'followup', q })}
          onClear={() => setSel(null)}
          selectionActive={!!sel}
        />
      </div>
    </div>
  )
}
