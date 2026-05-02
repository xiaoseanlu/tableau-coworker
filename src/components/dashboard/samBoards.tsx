import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Phone, Send } from '../Icons'
import { Sparkline } from '../viz/DataViz'
import AgentDock, { type AgentInsight } from './AgentDock'

const CAP = `${import.meta.env.BASE_URL}captures/`

const ACCENT = '#5B2E91'

/** Scene 01 · evidence `key/05-mobile-squished.png` */
const LEGIBILITY = [
  { id: 'desktop' as const, label: 'Desktop on phone', score: 14 },
  { id: 'reflow' as const, label: 'Reflow only', score: 26 },
  { id: 'coworker' as const, label: 'Coworker strip', score: 91 },
]

type TodaySel = { kind: 'bar'; id: (typeof LEGIBILITY)[number]['id'] } | { kind: 'followup'; q: string } | null

function agentToday(sel: TodaySel): AgentInsight {
  if (!sel) {
    return {
      title: 'Mobile today',
      body:
        'Real capture: Executive Overview at iPhone width. Tap a bar to compare read efficiency vs a composed Coworker surface — this is the before state we reject.',
      confidence: 'high — capture-backed',
    }
  }
  if (sel.kind === 'followup') {
    return {
      title: 'Follow-up',
      body:
        sel.q === 'Push deals?'
          ? 'Next step for product: proactive push — «3 deals stuck in legal» — without opening the squished grid first.'
          : 'Jordan’s v2 definitions already flow here — the gap is layout + prioritization, not warehouse freshness.',
      confidence: 'moderate',
    }
  }
  const m = {
    desktop: {
      title: 'Desktop metaphor',
      body:
        'KPI + map density preserved; thumb reach and scan path are hostile. This is the “same workbook squeezed” failure mode from flow-e-mobile captures.',
      confidence: 'high',
    },
    reflow: {
      title: 'Reflow only',
      body: 'Automatic reflow helps margins slightly but keeps chart-first hierarchy — still no ninety-second briefing spine.',
      confidence: 'moderate',
    },
    coworker: {
      title: 'Coworker strip',
      body: 'Composed cards with taps that deep-link — Brief step shows the target experience. Legibility score is illustrative; directionally the gap is large.',
      confidence: 'low on score — high on intent',
    },
  }
  return m[sel.id]
}

export function SamTodayBoard() {
  const [sel, setSel] = useState<TodaySel>(null)
  const insight = useMemo(() => agentToday(sel), [sel])
  const idx = sel?.kind === 'bar' ? LEGIBILITY.findIndex(b => b.id === sel.id) : -1

  return (
    <div className="bg-canvas h-full min-h-[520px] flex flex-col overflow-hidden">
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="px-5 pt-10 pb-4 border-b border-ink-100 flex gap-3">
          <Phone size={20} className="text-accent shrink-0 mt-0.5" aria-hidden />
          <div>
            <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Tue · 7:52 AM · legibility</div>
            <div className="editorial text-lg text-ink-900 leading-tight">Same workbook on a phone — tap the bars.</div>
          </div>
        </div>
        <div className="p-3 border-b border-ink-100">
          <img
            src={`${CAP}key/05-mobile-squished.png`}
            alt="Tableau Superstore Executive Overview on iPhone — squished desktop dashboard"
            className="block w-full rounded-md border border-ink-100"
          />
        </div>
        <div className="p-4">
          <div className="text-2xs font-mono uppercase text-ink-500 mb-2">Read efficiency · prototype index</div>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={LEGIBILITY} margin={{ top: 8, right: 8, left: -8, bottom: 48 }}>
                <CartesianGrid strokeDasharray="3 6" stroke="#DDE0E8" vertical={false} />
                <XAxis dataKey="label" tick={{ fontSize: 9 }} interval={0} angle={-18} textAnchor="end" height={56} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10, fontFamily: 'JetBrains Mono' }} width={28} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v: number) => [`${v}`, 'Index']} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Bar
                  dataKey="score"
                  radius={[6, 6, 0, 0]}
                  cursor="pointer"
                  onClick={(_d: unknown, i: number) => {
                    const row = LEGIBILITY[i]
                    if (row) setSel({ kind: 'bar', id: row.id })
                  }}
                >
                  {LEGIBILITY.map((_, i) => (
                    <Cell key={i} fill={i === idx ? '#3A1B5E' : ACCENT} fillOpacity={idx >= 0 && i !== idx ? 0.35 : 1} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <AgentDock
        stack
        insight={insight}
        followups={['Push deals?', 'Same definitions?']}
        onFollowup={q => setSel({ kind: 'followup', q })}
        onClear={() => setSel(null)}
        selectionActive={!!sel}
        productTagline="Thumb-first read"
      />
    </div>
  )
}

type BriefSel = { kind: 'card'; id: 'stuck' | 'wins' | 'risk' } | { kind: 'deal'; name: string } | { kind: 'followup'; q: string } | null

function agentBrief(sel: BriefSel): AgentInsight {
  if (!sel) {
    return {
      title: 'West briefing',
      body: 'Tap a card or a stuck deal — CRM sync 7:48 AM · v2 definitions (Jordan, Apr 30).',
      confidence: 'moderate',
    }
  }
  if (sel.kind === 'deal') {
    return {
      title: sel.name,
      body: 'Opens Drill step with legal context pre-assembled — no “open in Desktop” handoff.',
      confidence: 'high',
    }
  }
  if (sel.kind === 'followup') {
    return {
      title: 'Follow-up',
      body:
        sel.q === 'Staff impact?'
          ? 'Maya’s staff deck will cite West coverage if the dip holds another week — Sam gets the footnote first on mobile.'
          : 'Ping routes through the same escalation rail as legal nudge — AE sees it as FYI, not a task storm.',
      confidence: 'low',
    }
  }
  const m = {
    stuck: {
      title: 'Stuck · 3',
      body: 'Legal and deal-desk stalls — actionable nudges inline. Acme Co is the staff name Maya cares about.',
      confidence: 'high',
    },
    wins: {
      title: 'Wins · 2',
      body: 'Northwind handoff + hygiene sweep — morale signal for the regional standup, not finance-grade.',
      confidence: 'moderate',
    },
    risk: {
      title: 'Q-end risk',
      body: 'Coverage −0.2 WoW on v2 — same spine as Maya’s KPI strip; sparkline is eight-week trailing.',
      confidence: 'moderate',
    },
  }
  return m[sel.id]
}

function BriefCard({
  tone,
  title,
  children,
  active,
  onSelect,
}: {
  tone: 'warning' | 'success' | 'danger'
  title: string
  children: ReactNode
  active: boolean
  onSelect: () => void
}) {
  const border =
    tone === 'warning' ? 'border-warning/30' : tone === 'success' ? 'border-success/30' : 'border-danger/30'
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`rounded-md border ${border} bg-canvas-raised p-3.5 text-left w-full transition-all ${
        active ? 'ring-2 ring-signal/40' : ''
      }`}
    >
      <div className="text-2xs uppercase tracking-wider font-mono font-semibold text-ink-700">{title}</div>
      {children}
    </button>
  )
}

export function SamBriefBoard() {
  const [sel, setSel] = useState<BriefSel>(null)
  const insight = useMemo(() => agentBrief(sel), [sel])

  return (
    <div className="bg-canvas h-full min-h-[520px] flex flex-col overflow-hidden">
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="px-5 pt-10 pb-4 border-b border-ink-100 flex gap-3">
          <Phone size={20} className="text-accent shrink-0 mt-0.5" aria-hidden />
          <div>
            <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Tue · 7:52 AM · West region</div>
            <div className="editorial text-xl text-ink-900 leading-tight">Three things since you last looked.</div>
          </div>
        </div>
        <div className="px-5 py-4 space-y-3">
          <BriefCard
            tone="warning"
            title="Stuck · 3"
            active={sel?.kind === 'card' && sel.id === 'stuck'}
            onSelect={() => setSel({ kind: 'card', id: 'stuck' })}
          >
            <ul className="mt-2 space-y-2 text-xs text-ink-800">
              <li>
                <button
                  type="button"
                  className="text-left w-full"
                  onClick={e => {
                    e.stopPropagation()
                    setSel({ kind: 'deal', name: 'Acme Co' })
                  }}
                >
                  <strong>Acme Co</strong> · $840K · <span className="font-mono">11d</span> legal — MSA redlines ·{' '}
                  <span className="text-accent font-medium">Nudge legal</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="text-left w-full"
                  onClick={e => {
                    e.stopPropagation()
                    setSel({ kind: 'deal', name: 'Lumen Analytics' })
                  }}
                >
                  <strong>Lumen Analytics</strong> · $290K · <span className="font-mono">8d</span> legal — chain stalled ·{' '}
                  <span className="text-accent font-medium">Ping AE</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="text-left w-full"
                  onClick={e => {
                    e.stopPropagation()
                    setSel({ kind: 'deal', name: 'Brightwave Labs' })
                  }}
                >
                  <strong>Brightwave Labs</strong> · $175K · <span className="font-mono">7d</span> deal desk ·{' '}
                  <span className="text-accent font-medium">View thread</span>
                </button>
              </li>
            </ul>
          </BriefCard>
          <BriefCard
            tone="success"
            title="Wins · 2"
            active={sel?.kind === 'card' && sel.id === 'wins'}
            onSelect={() => setSel({ kind: 'card', id: 'wins' })}
          >
            <ul className="mt-2 space-y-1.5 text-xs text-ink-800">
              <li>
                <strong>Northwind Health</strong> closed Fri — East handoff clean.
              </li>
              <li>
                Pipeline hygiene · your West reps cleared <strong>14</strong> stale opps Mon.
              </li>
            </ul>
          </BriefCard>
          <BriefCard
            tone="danger"
            title="Q-end risk · 1"
            active={sel?.kind === 'card' && sel.id === 'risk'}
            onSelect={() => setSel({ kind: 'card', id: 'risk' })}
          >
            <p className="mt-2 text-xs text-ink-800 leading-relaxed">
              West coverage dipped <strong>−0.2 WoW</strong> (v2). Not staff-level yet — watch. Same model as Maya&apos;s cards.
            </p>
            <div
              className="mt-3 flex items-center gap-2"
              onClick={e => e.stopPropagation()}
              onKeyDown={e => e.stopPropagation()}
              role="presentation"
            >
              <span className="text-2xs font-mono text-ink-500 shrink-0">8 wk</span>
              <Sparkline
                values={[2.95, 2.92, 2.9, 2.88, 2.86, 2.84, 2.82, 2.6]}
                stroke="#B0263A"
                className="flex-1 min-w-0 text-danger"
                height={28}
              />
            </div>
          </BriefCard>
        </div>
      </div>
      <AgentDock
        stack
        insight={insight}
        followups={['Staff impact?', 'Ping Maya?']}
        onFollowup={q => setSel({ kind: 'followup', q })}
        onClear={() => setSel(null)}
        selectionActive={!!sel}
        productTagline="Ninety-second scan"
      />
    </div>
  )
}

type DrillSel =
  | { kind: 'agent' }
  | { kind: 'check'; id: 'risk' | 'legal' | 'dup' }
  | { kind: 'draft' }
  | { kind: 'followup'; q: string }
  | null

function agentDrill(sel: DrillSel): AgentInsight {
  if (!sel) {
    return {
      title: 'Acme Co',
      body: 'Tap the gold summary, an evidence row, or the pre-draft — Send stays one thumb away.',
      confidence: 'moderate',
    }
  }
  if (sel.kind === 'agent') {
    return {
      title: 'Stall read',
      body: 'Deal stalled in legal since Apr 23. Owner M. Chen · AE Patel last note Apr 29 — waiting on liability cap language. CRM + email thread index.',
      confidence: 'high',
    }
  }
  if (sel.kind === 'check') {
    const m = {
      risk: { title: 'Closed-won risk', body: 'Flag cleared for finance sign-off path — not a pricing exception.', confidence: 'moderate' },
      legal: { title: 'Legal duration', body: '11d in legal vs 6d team median — tail risk for Q-end if GC review slows.', confidence: 'high' },
      dup: { title: 'Duplicate opps', body: 'Ruled out — single opportunity hierarchy on the account.', confidence: 'high' },
    }
    return m[sel.id]
  }
  if (sel.kind === 'draft') {
    return {
      title: 'Pre-draft',
      body: 'Editable before Send — Coworker drafts in Sam’s voice, not generic support copy.',
      confidence: 'moderate',
    }
  }
  return {
    title: 'Follow-up',
    body: 'Escalate to GC only if Chen does not ack by 2 PM — policy from Sam’s last three legal escalations (observed).',
    confidence: 'low',
  }
}

export function SamDrillBoard() {
  const [sel, setSel] = useState<DrillSel>(null)
  const insight = useMemo(() => agentDrill(sel), [sel])

  return (
    <div className="bg-canvas min-h-[480px] flex flex-col">
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="px-5 pt-8 pb-4 border-b border-ink-100">
          <div className="text-2xs font-mono text-ink-500 mb-1">Acme Co · $840K</div>
          <div className="editorial text-lg text-ink-900">Stalled in legal · MSA redlines</div>
        </div>
        <div className="px-5 py-4 space-y-4">
          <button
            type="button"
            onClick={() => setSel({ kind: 'agent' })}
            className={`w-full rounded-md px-4 py-3 text-sm text-signal-ink leading-relaxed text-left border transition-all ${
              sel?.kind === 'agent' ? 'bg-signal-soft border-signal ring-2 ring-signal/30' : 'bg-signal-soft/70 border-signal/25'
            }`}
          >
            Deal stalled in legal review since <strong>Apr 23</strong>. Owner on file: <strong>M. Chen</strong>, legal ops. AE{' '}
            <strong>Patel</strong> last note Apr 29: waiting on liability cap language. <strong>Confidence: high</strong> — CRM +
            email thread index.
          </button>
          <div className="text-xs text-ink-600">
            <span className="font-mono text-2xs uppercase text-ink-500">What I checked</span>
            <ul className="mt-1 space-y-1">
              {(
                [
                  ['risk', 'Closed-won risk flag'],
                  ['legal', 'Legal stage duration'],
                  ['dup', 'Duplicate opps on account — ruled out'],
                ] as const
              ).map(([id, label]) => (
                <li key={id}>
                  <button
                    type="button"
                    className={`text-left w-full rounded px-1 py-0.5 ${sel?.kind === 'check' && sel.id === id ? 'bg-accent-soft/50' : ''}`}
                    onClick={() => setSel({ kind: 'check', id })}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button
            type="button"
            onClick={() => setSel({ kind: 'draft' })}
            className={`block w-full text-left rounded-md border p-3 ${sel?.kind === 'draft' ? 'border-accent ring-1 ring-accent/30' : 'border-ink-100 bg-canvas-raised'}`}
          >
            <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-1">Pre-draft</div>
            <p className="text-sm text-ink-800 leading-relaxed">
              Chen — Acme Co needs liability language by EOD; staff meeting may call this out. Can we clear or escalate to GC?
            </p>
          </button>
          <div className="flex gap-2 pt-2">
            <button type="button" className="btn-primary text-sm inline-flex items-center gap-1.5 flex-1 justify-center">
              <Send size={14} aria-hidden /> Send
            </button>
            <button type="button" className="btn-secondary text-sm flex-1">
              Edit
            </button>
          </div>
        </div>
      </div>
      <AgentDock
        stack
        insight={insight}
        followups={['Escalate?', 'Loop Patel?']}
        onFollowup={q => setSel({ kind: 'followup', q })}
        onClear={() => setSel(null)}
        selectionActive={!!sel}
        productTagline="Deal context"
      />
    </div>
  )
}

type ActSel = { kind: 'receipt' } | { kind: 'watch' } | { kind: 'why' } | { kind: 'followup'; q: string } | null

function agentAct(sel: ActSel): AgentInsight {
  if (!sel) {
    return {
      title: 'Receipt',
      body: 'Tap the sent banner, the watcher time, or the personalization chip — same substrate seam as Maya’s doc handoff.',
      confidence: 'moderate',
    }
  }
  if (sel.kind === 'receipt') {
    return {
      title: 'Sent',
      body: 'Chen notified · timeline logged · Maya’s briefing footnote picks this up before 9:00 staff.',
      confidence: 'high',
    }
  }
  if (sel.kind === 'watch') {
    return {
      title: 'Watcher',
      body: '5:00 PM PT stage check — if unchanged, back to queue Tue 7:45 AM. Observed habit, not a settings toggle.',
      confidence: 'moderate',
    }
  }
  if (sel.kind === 'why') {
    return {
      title: 'Ordering',
      body: 'West first · Tuesday 7:45–8:15 habit · six weeks observed — same primitive as Maya’s briefing shape.',
      confidence: 'low',
    }
  }
  return {
    title: 'Follow-up',
    body: 'Legal SLA breach would reopen Jordan’s queue only if the ARR field ties to coverage — not true for this path.',
    confidence: 'low',
  }
}

export function SamActBoard() {
  const [sel, setSel] = useState<ActSel>(null)
  const insight = useMemo(() => agentAct(sel), [sel])

  return (
    <div className="bg-canvas min-h-[360px] flex flex-col">
      <div className="flex-1 px-5 py-8 space-y-4 overflow-y-auto">
        <button
          type="button"
          onClick={() => setSel({ kind: 'receipt' })}
          className={`block w-full text-left rounded-md border px-4 py-3 text-sm text-ink-800 transition-all ${
            sel?.kind === 'receipt' ? 'border-success ring-2 ring-signal/30 bg-success-soft/50' : 'border-success/30 bg-success-soft/40'
          }`}
        >
          <strong>Sent.</strong> M. Chen notified · logged to deal timeline · Maya&apos;s briefing footnote will pick this up before 9:00 staff.
        </button>
        <button type="button" className="text-left w-full text-sm text-ink-700" onClick={() => setSel({ kind: 'watch' })}>
          I&apos;ll check at <strong>5:00 PM PT</strong>; if stage unchanged, back to your queue tomorrow 7:45 AM.
        </button>
        <button
          type="button"
          onClick={() => setSel({ kind: 'why' })}
          className="text-xs text-ink-500 border-t border-ink-100 pt-3 w-full text-left"
        >
          <span className="underline underline-offset-2 text-ink-600">Why am I seeing this order?</span>
        </button>
      </div>
      <AgentDock
        stack
        insight={insight}
        followups={['Undo send?', 'Notify AE?']}
        onFollowup={q => setSel({ kind: 'followup', q })}
        onClear={() => setSel(null)}
        selectionActive={!!sel}
        productTagline="Receipt + audit"
      />
    </div>
  )
}
