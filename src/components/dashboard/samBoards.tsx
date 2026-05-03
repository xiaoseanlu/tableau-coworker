import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Phone, Send } from '../Icons'
import { Sparkline } from '../viz/DataViz'
import AgentDock, { type AgentInsight } from './AgentDock'
import { CHART } from './chartTokens'
import { SAM_MOBILE } from './samDemoContext'
import { JumpPresetButton, JumpStateStrip } from './JumpStateStrip'
import { SAM_AGENT_DATA_SURFACE } from '../../data/personaFlowMeta'

const CAP = `${import.meta.env.BASE_URL}captures/`

/** Scene 01 · evidence `key/05-mobile-squished.png` */
const LEGIBILITY = [
  { id: 'desktop' as const, label: 'Desktop on phone', score: 14 },
  { id: 'reflow' as const, label: 'Reflow only', score: 26 },
  { id: 'coworker' as const, label: 'Coworker strip', score: 91 },
]

const LEGIBILITY_PIE = [
  { name: 'Legacy layouts', value: 14 + 26, segment: 'legacy' as const },
  { name: 'Coworker strip', value: 91, segment: 'coworker' as const },
]

const WINS_SALES_CURVE = [
  { w: 'W1', pulse: 42 },
  { w: 'W2', pulse: 48 },
  { w: 'W3', pulse: 52 },
  { w: 'W4', pulse: 58 },
  { w: 'W5', pulse: 61 },
  { w: 'W6', pulse: 64 },
]

const LEGAL_DURATION = [
  { label: 'Team median', days: 6 },
  { label: 'Acme Co', days: 11 },
]

const TIMELINE_EDGE = [
  { day: 'Apr 23', note: 'Entered legal' },
  { day: 'Apr 27', note: 'Redline 2' },
  { day: 'Apr 29', note: 'AE note' },
  { day: 'May 2', note: 'Coworker nudge' },
]

type TodaySel =
  | { kind: 'bar'; id: (typeof LEGIBILITY)[number]['id'] }
  | { kind: 'followup'; q: string }
  | { kind: 'modepie'; segment: 'legacy' | 'coworker' }
  | null

function agentToday(sel: TodaySel): AgentInsight {
  if (!sel) {
    return {
      title: 'Mobile today',
      body:
        'Bars, donut, and capture agree: today’s Tableau Mobile optimizes fidelity over glance. Interact with both chart types — dock stays the single read surface.',
      confidence: 'high — capture-backed',
    }
  }
  if (sel.kind === 'modepie') {
    return sel.segment === 'coworker'
      ? {
          title: 'Coworker share',
          body:
            'Nine-tenths of the modeled read-efficiency score is layout + prioritization — Jordan’s v2 numbers arrive without the squished map/KPI wall.',
          confidence: 'low on score math — high on product direction',
        }
      : {
          title: 'Legacy layouts',
          body:
            'Desktop + reflow paths preserve chart density on a narrow viewport — good fidelity, bad glanceability. Bars and donut encode the same split.',
          confidence: 'moderate',
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

export function SamTodayBoard({ presetStrip = false }: { presetStrip?: boolean }) {
  const [sel, setSel] = useState<TodaySel>(null)
  const insight = useMemo(() => agentToday(sel), [sel])
  const idx = sel?.kind === 'bar' ? LEGIBILITY.findIndex(b => b.id === sel.id) : -1
  const pieActive = sel?.kind === 'modepie' ? (sel.segment === 'coworker' ? 1 : 0) : -1

  return (
    <div className="bg-canvas h-full min-h-[560px] flex flex-col overflow-hidden">
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="px-5 pt-9 pb-4 border-b border-ink-100 bg-gradient-to-br from-accent-soft/35 via-canvas to-canvas flex gap-3">
          <Phone size={22} className="text-accent shrink-0 mt-0.5" aria-hidden />
          <div>
            <div className="text-2xs uppercase tracking-[0.14em] text-accent-ink font-mono mb-1">{SAM_MOBILE.when} · legibility</div>
            <div className="editorial text-lg text-ink-900 leading-tight">Executive Overview on a phone — before Coworker.</div>
            <p className="text-xs text-ink-600 m-0 mt-2 leading-relaxed">
              Compare bar scores, donut split, and capture. Dock narrates the same analysis class as desktop Agent — on your marks.
            </p>
          </div>
        </div>
        {presetStrip ? (
          <JumpStateStrip label="Jump today state" className="px-5 py-3">
            <JumpPresetButton tone="neutral" active={sel === null} onClick={() => setSel(null)}>
              Idle
            </JumpPresetButton>
            <JumpPresetButton active={sel?.kind === 'bar' && sel.id === 'desktop'} onClick={() => setSel({ kind: 'bar', id: 'desktop' })}>
              Desktop bar
            </JumpPresetButton>
            <JumpPresetButton active={sel?.kind === 'bar' && sel.id === 'coworker'} onClick={() => setSel({ kind: 'bar', id: 'coworker' })}>
              Coworker bar
            </JumpPresetButton>
            <JumpPresetButton
              active={sel?.kind === 'modepie' && sel.segment === 'coworker'}
              onClick={() => setSel({ kind: 'modepie', segment: 'coworker' })}
            >
              Donut CW
            </JumpPresetButton>
            <JumpPresetButton
              active={sel?.kind === 'followup' && sel.q === 'Push deals?'}
              onClick={() => setSel({ kind: 'followup', q: 'Push deals?' })}
            >
              Push Q
            </JumpPresetButton>
          </JumpStateStrip>
        ) : null}
        <div className="p-3 border-b border-ink-100 bg-canvas-sunken/30">
          <img
            src={`${CAP}key/05-mobile-squished.png`}
            alt="Tableau Superstore Executive Overview on iPhone — squished desktop dashboard"
            className="block w-full rounded-lg border border-ink-200 shadow-sm"
          />
        </div>
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 xs:grid-cols-1 gap-4">
            <div className="card p-4 border-ink-200/90 shadow-sm">
              <div className="text-2xs font-mono uppercase tracking-[0.14em] text-ink-500 mb-2">Read efficiency · prototype index</div>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={LEGIBILITY} margin={{ top: 8, right: 8, left: -8, bottom: 52 }}>
                    <CartesianGrid strokeDasharray="3 6" stroke={CHART.grid} vertical={false} />
                    <XAxis
                      dataKey="label"
                      tick={{ fontSize: 9, fill: '#5B6070' }}
                      interval={0}
                      angle={-16}
                      textAnchor="end"
                      height={56}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 10, fontFamily: 'JetBrains Mono', fill: '#3D414C' }} width={28} axisLine={false} tickLine={false} />
                    <Tooltip
                      cursor={{ fill: 'rgba(199, 132, 28, 0.07)' }}
                      formatter={(v: number) => [`${v}`, 'Index']}
                      contentStyle={{ fontSize: 12, borderRadius: 10, border: '1px solid #DDE0E8', boxShadow: '0 6px 20px rgba(14,15,18,0.07)' }}
                    />
                    <Bar
                      dataKey="score"
                      radius={[8, 8, 0, 0]}
                      cursor="pointer"
                      activeBar={{ fill: CHART.signal, fillOpacity: 0.9 }}
                      onClick={(_d: unknown, i: number) => {
                        const row = LEGIBILITY[i]
                        if (row) setSel({ kind: 'bar', id: row.id })
                      }}
                    >
                      {LEGIBILITY.map((_, i) => (
                        <Cell key={i} fill={i === idx ? CHART.accentInk : CHART.accent} fillOpacity={idx >= 0 && i !== idx ? 0.32 : 1} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="card p-4 border-ink-200/90 shadow-sm">
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="text-2xs font-mono uppercase tracking-[0.14em] text-ink-500">Mode split</div>
                <span className="pill bg-signal-soft text-signal-ink text-2xs">Tap</span>
              </div>
              <div className="h-[200px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={LEGIBILITY_PIE}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={54}
                      outerRadius={78}
                      paddingAngle={2}
                      strokeWidth={2}
                      stroke="#FAFAF7"
                      cursor="pointer"
                      onClick={(_e, i: number) => {
                        const row = LEGIBILITY_PIE[i]
                        if (row) setSel({ kind: 'modepie', segment: row.segment })
                      }}
                    >
                      {LEGIBILITY_PIE.map((entry, i) => (
                        <Cell key={entry.segment} fill={entry.segment === 'coworker' ? CHART.accent : CHART.signal} fillOpacity={pieActive >= 0 && i !== pieActive ? 0.3 : 1} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12, border: '1px solid #DDE0E8' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="font-mono text-lg text-ink-900 tabular-nums">91</div>
                    <div className="text-[10px] text-ink-500 font-mono">CW index</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="agent-card text-xs text-signal-ink px-4 py-3 leading-relaxed mx-4 mb-4 border border-signal/25 shadow-sm">
          <strong className="font-semibold text-ink-900">Proposed push:</strong> {SAM_MOBILE.pushProposed.title}. {SAM_MOBILE.pushProposed.body}
        </div>
      </div>
      <AgentDock
        stack
        insight={insight}
        followups={['Push deals?', 'Same definitions?']}
        onFollowup={q => setSel({ kind: 'followup', q })}
        onClear={() => setSel(null)}
        selectionActive={!!sel}
        productTagline="Before · squished grid"
        dataSurface={SAM_AGENT_DATA_SURFACE}
      />
    </div>
  )
}

type BriefSel =
  | { kind: 'card'; id: 'stuck' | 'wins' | 'risk' }
  | { kind: 'deal'; name: string }
  | { kind: 'followup'; q: string }
  | { kind: 'kpi'; id: 'coverage' | 'stuck' | 'wins' }
  | null

function agentBrief(sel: BriefSel): AgentInsight {
  if (!sel) {
    return {
      title: 'West briefing',
      body: `KPI strip, cards, and charts share one dock — tap coverage, stuck count, or wins momentum before you open a deal row. ${SAM_MOBILE.sources}.`,
      confidence: 'moderate',
    }
  }
  if (sel.kind === 'kpi') {
    const m = {
      coverage: {
        title: 'West coverage',
        body: `${SAM_MOBILE.coverageLabel} (${SAM_MOBILE.coverageWoW}) — same v2 bind Maya sees; mobile just surfaces it first in the strip.`,
        confidence: 'high on label · moderate on staff impact',
      },
      stuck: {
        title: 'Open stalls',
        body: `${SAM_MOBILE.stuck.length} deals need motion today — legal and deal desk, ranked by age. Acme Co is the escalated name for staff.`,
        confidence: 'high',
      },
      wins: {
        title: 'Rep momentum',
        body: 'Hygiene + Northwind read as morale signal — not a finance forecast. Curve is illustrative weekly pulse for the region.',
        confidence: 'low on curve — moderate on intent',
      },
    }
    return m[sel.id]
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
  const nStuck = SAM_MOBILE.stuck.length
  const nWins = SAM_MOBILE.wins.length
  const m = {
    stuck: {
      title: `Stuck · ${nStuck}`,
      body: 'Legal and deal-desk stalls — actionable nudges inline. Acme Co is the staff name Maya cares about.',
      confidence: 'high',
    },
    wins: {
      title: `Wins · ${nWins}`,
      body: 'Northwind handoff + hygiene sweep — morale signal for the regional standup, not finance-grade.',
      confidence: 'moderate',
    },
    risk: {
      title: 'Q-end risk',
      body: `Coverage ${SAM_MOBILE.coverageWoW} on v2 (${SAM_MOBILE.coverageLabel}) — same spine as Maya’s KPI strip; sparkline is eight-week trailing.`,
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
      className={`rounded-xl border ${border} bg-canvas-raised p-3.5 text-left w-full transition-all duration-200 ease-smooth ${
        active ? 'ring-2 ring-signal/40 shadow-sm' : 'hover:shadow-md'
      }`}
    >
      <div className="text-2xs uppercase tracking-[0.14em] font-mono font-semibold text-ink-700">{title}</div>
      {children}
    </button>
  )
}

export function SamBriefBoard({ presetStrip = false }: { presetStrip?: boolean }) {
  const [sel, setSel] = useState<BriefSel>(null)
  const insight = useMemo(() => agentBrief(sel), [sel])
  const stuckCount = SAM_MOBILE.stuck.length
  const winsCount = SAM_MOBILE.wins.length

  return (
    <div className="bg-canvas h-full min-h-[580px] flex flex-col overflow-hidden">
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="px-5 pt-9 pb-4 border-b border-ink-100 bg-gradient-to-br from-accent-soft/30 via-canvas to-canvas flex gap-3">
          <Phone size={22} className="text-accent shrink-0 mt-0.5" aria-hidden />
          <div className="min-w-0">
            <div className="text-2xs uppercase tracking-[0.14em] text-accent-ink font-mono mb-1">
              {SAM_MOBILE.when} · {SAM_MOBILE.region} region
            </div>
            <div className="editorial text-xl text-ink-900 leading-tight">Three charts worth of signal — thumb width.</div>
          </div>
        </div>
        {presetStrip ? (
          <JumpStateStrip label="Jump brief state" className="px-5 py-3">
            <JumpPresetButton tone="neutral" active={sel === null} onClick={() => setSel(null)}>
              Idle
            </JumpPresetButton>
            <JumpPresetButton active={sel?.kind === 'kpi' && sel.id === 'coverage'} onClick={() => setSel({ kind: 'kpi', id: 'coverage' })}>
              KPI cov
            </JumpPresetButton>
            <JumpPresetButton active={sel?.kind === 'card' && sel.id === 'stuck'} onClick={() => setSel({ kind: 'card', id: 'stuck' })}>
              Stuck card
            </JumpPresetButton>
            <JumpPresetButton
              active={sel?.kind === 'deal' && sel.name === SAM_MOBILE.stuck[0]!.name}
              onClick={() => setSel({ kind: 'deal', name: SAM_MOBILE.stuck[0]!.name })}
            >
              Acme deal
            </JumpPresetButton>
            <JumpPresetButton active={sel?.kind === 'card' && sel.id === 'risk'} onClick={() => setSel({ kind: 'card', id: 'risk' })}>
              Risk card
            </JumpPresetButton>
          </JumpStateStrip>
        ) : null}
        <div className="px-5 pt-3 pb-2 grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setSel({ kind: 'kpi', id: 'coverage' })}
            className={`rounded-lg border px-2 py-2.5 text-left transition-all duration-150 ${
              sel?.kind === 'kpi' && sel.id === 'coverage'
                ? 'border-accent bg-accent-soft/45 ring-1 ring-accent/25 shadow-sm'
                : 'border-ink-200 bg-canvas-raised hover:border-accent/30'
            }`}
          >
            <div className="text-2xs font-mono uppercase text-ink-500">Coverage</div>
            <div className="font-mono text-lg text-ink-900 tabular-nums leading-tight">{SAM_MOBILE.coverageLabel}</div>
            <div className="text-[10px] text-danger font-medium">{SAM_MOBILE.coverageWoW}</div>
          </button>
          <button
            type="button"
            onClick={() => setSel({ kind: 'kpi', id: 'stuck' })}
            className={`rounded-lg border px-2 py-2.5 text-left transition-all duration-150 ${
              sel?.kind === 'kpi' && sel.id === 'stuck'
                ? 'border-accent bg-accent-soft/45 ring-1 ring-accent/25 shadow-sm'
                : 'border-ink-200 bg-canvas-raised hover:border-accent/30'
            }`}
          >
            <div className="text-2xs font-mono uppercase text-ink-500">Stalls</div>
            <div className="font-mono text-lg text-ink-900 tabular-nums leading-tight">{stuckCount}</div>
            <div className="text-[10px] text-ink-500">legal + desk</div>
          </button>
          <button
            type="button"
            onClick={() => setSel({ kind: 'kpi', id: 'wins' })}
            className={`rounded-lg border px-2 py-2.5 text-left transition-all duration-150 ${
              sel?.kind === 'kpi' && sel.id === 'wins'
                ? 'border-accent bg-accent-soft/45 ring-1 ring-accent/25 shadow-sm'
                : 'border-ink-200 bg-canvas-raised hover:border-accent/30'
            }`}
          >
            <div className="text-2xs font-mono uppercase text-ink-500">Wins</div>
            <div className="font-mono text-lg text-ink-900 tabular-nums leading-tight">{winsCount}</div>
            <div className="text-[10px] text-success">w/w pulse</div>
          </button>
        </div>
        <div className="px-5 py-4 space-y-3">
          <BriefCard
            tone="warning"
            title={`Stuck · ${stuckCount}`}
            active={sel?.kind === 'card' && sel.id === 'stuck'}
            onSelect={() => setSel({ kind: 'card', id: 'stuck' })}
          >
            <ul className="mt-2 space-y-2 text-xs text-ink-800">
              {SAM_MOBILE.stuck.map(d => (
                <li key={d.id}>
                  <button
                    type="button"
                    className="text-left w-full rounded-md px-0.5 py-0.5 hover:bg-warning-soft/30 transition-colors"
                    onClick={e => {
                      e.stopPropagation()
                      setSel({ kind: 'deal', name: d.name })
                    }}
                  >
                    <strong>{d.name}</strong> · {d.acv} · <span className="font-mono">{d.days}</span> {d.detail} ·{' '}
                    <span className="text-accent font-medium">{d.action}</span>
                  </button>
                </li>
              ))}
            </ul>
          </BriefCard>
          <BriefCard
            tone="success"
            title={`Wins · ${winsCount}`}
            active={sel?.kind === 'card' && sel.id === 'wins'}
            onSelect={() => setSel({ kind: 'card', id: 'wins' })}
          >
            <ul className="mt-2 space-y-1.5 text-xs text-ink-800">
              {SAM_MOBILE.wins.map((w, i) => (
                <li key={i}>{w.label}</li>
              ))}
            </ul>
            <div
              className="mt-3 h-[76px] w-full -mx-0.5"
              role="presentation"
              onClick={e => {
                e.stopPropagation()
                setSel({ kind: 'kpi', id: 'wins' })
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={WINS_SALES_CURVE} margin={{ top: 4, right: 4, left: -32, bottom: 0 }}>
                  <defs>
                    <linearGradient id="winsGradSam" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={CHART.success} stopOpacity={0.25} />
                      <stop offset="100%" stopColor={CHART.success} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="w" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: 8, fontSize: 11, border: '1px solid #DDE0E8' }}
                    formatter={(v: number) => [`${v}`, 'Pulse']}
                  />
                  <Area
                    type="monotone"
                    dataKey="pulse"
                    stroke={CHART.success}
                    strokeWidth={2}
                    fill="url(#winsGradSam)"
                    dot={{ r: 3, fill: CHART.success, stroke: '#fff', strokeWidth: 1 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
              <div className="text-[10px] font-mono text-ink-500 mt-1">Tap curve · rep momentum read</div>
            </div>
          </BriefCard>
          <BriefCard
            tone="danger"
            title="Q-end risk · 1"
            active={sel?.kind === 'card' && sel.id === 'risk'}
            onSelect={() => setSel({ kind: 'card', id: 'risk' })}
          >
            <p className="mt-2 text-xs text-ink-800 leading-relaxed">
              West coverage dipped <strong>{SAM_MOBILE.coverageWoW}</strong> (v2 · {SAM_MOBILE.coverageLabel}). Not staff-level yet —
              watch. Same model as Maya&apos;s cards.
            </p>
            <div
              className="mt-3 flex items-center gap-2"
              onClick={e => e.stopPropagation()}
              onKeyDown={e => e.stopPropagation()}
              role="presentation"
            >
              <span className="text-2xs font-mono text-ink-500 shrink-0">8 wk</span>
              <Sparkline
                values={[...SAM_MOBILE.sparkline]}
                stroke={CHART.danger}
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
        dataSurface={SAM_AGENT_DATA_SURFACE}
      />
    </div>
  )
}

type DrillSel =
  | { kind: 'agent' }
  | { kind: 'check'; id: 'risk' | 'legal' | 'dup' }
  | { kind: 'draft' }
  | { kind: 'legalbar'; which: 'median' | 'deal' }
  | { kind: 'timeline'; idx: number }
  | { kind: 'followup'; q: string }
  | null

function agentDrill(sel: DrillSel): AgentInsight {
  if (!sel) {
    return {
      title: SAM_MOBILE.stuck[0]!.name,
      body: 'Agent summary, duration bars, timeline markers, checks, and pre-draft all route through the dock — tap the chart or chips before Send.',
      confidence: 'moderate',
    }
  }
  if (sel.kind === 'agent') {
    const d = SAM_MOBILE.drill
    return {
      title: 'Stall read',
      body: `Deal stalled in legal since ${d.stalledSince}. Owner ${d.legalOwner}, ${d.legalTitle}. AE ${d.ae} last note ${d.lastNote}. Confidence: high — CRM + email thread index.`,
      confidence: 'high',
    }
  }
  if (sel.kind === 'check') {
    const stuckDays = SAM_MOBILE.stuck[0]!.days
    const m = {
      risk: { title: 'Closed-won risk', body: 'Flag cleared for finance sign-off path — not a pricing exception.', confidence: 'moderate' },
      legal: { title: 'Legal duration', body: `${stuckDays} in legal vs 6d team median — tail risk for Q-end if GC review slows.`, confidence: 'high' },
      dup: { title: 'Duplicate opps', body: 'Ruled out — single opportunity hierarchy on the account.', confidence: 'high' },
    }
    return m[sel.id]
  }
  if (sel.kind === 'legalbar') {
    return sel.which === 'median'
      ? {
          title: 'Team median · 6d',
          body: 'Sequencing benchmark from prior West legal cycles — Acme is almost 2× the median; that is the escalation justification.',
          confidence: 'moderate · prototype median',
        }
      : {
          title: 'Acme · 11d',
          body: 'Eleven days in stage — aligns with the stall read and the pre-draft hook for Chen; GC path is the only tail-risk lever.',
          confidence: 'high · demo data',
        }
  }
  if (sel.kind === 'timeline') {
    const row = TIMELINE_EDGE[sel.idx]
    return {
      title: `${row.day} · ${row.note}`,
      body:
        sel.idx === TIMELINE_EDGE.length - 1
          ? 'Coworker inserted the nudge after observing no stage motion — same audit trail Sam gets on Send.'
          : 'Milestone on the synthetic deal timeline — tap other nodes to rehearse how legal reads a mobile drill.',
      confidence: 'low on dates — high on flow',
    }
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
    body: `Escalate to GC only if ${SAM_MOBILE.drill.legalOwner} does not ack by 2 PM — policy from Sam’s last three legal escalations (observed).`,
    confidence: 'low',
  }
}

export function SamDrillBoard({ presetStrip = false }: { presetStrip?: boolean }) {
  const [sel, setSel] = useState<DrillSel>(null)
  const insight = useMemo(() => agentDrill(sel), [sel])
  const acme = SAM_MOBILE.stuck[0]!
  const d = SAM_MOBILE.drill
  const barSel = sel?.kind === 'legalbar' ? (sel.which === 'deal' ? 1 : 0) : -1

  return (
    <div className="bg-canvas min-h-[560px] flex flex-col">
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="px-5 pt-8 pb-4 border-b border-ink-100 bg-gradient-to-r from-signal-soft/35 to-canvas">
          <div className="text-2xs font-mono text-signal-ink mb-1">
            {acme.name} · {acme.acv}
          </div>
          <div className="editorial text-lg text-ink-900">
            Stalled in legal · {acme.stage}
          </div>
        </div>
        {presetStrip ? (
          <JumpStateStrip label="Jump drill state" className="px-5 py-3">
            <JumpPresetButton tone="neutral" active={sel === null} onClick={() => setSel(null)}>
              Idle
            </JumpPresetButton>
            <JumpPresetButton active={sel?.kind === 'agent'} onClick={() => setSel({ kind: 'agent' })}>
              Stall read
            </JumpPresetButton>
            <JumpPresetButton active={sel?.kind === 'legalbar' && sel.which === 'deal'} onClick={() => setSel({ kind: 'legalbar', which: 'deal' })}>
              Acme bar
            </JumpPresetButton>
            <JumpPresetButton active={sel?.kind === 'timeline' && sel.idx === 3} onClick={() => setSel({ kind: 'timeline', idx: 3 })}>
              May 2 node
            </JumpPresetButton>
            <JumpPresetButton active={sel?.kind === 'check' && sel.id === 'legal'} onClick={() => setSel({ kind: 'check', id: 'legal' })}>
              Legal check
            </JumpPresetButton>
            <JumpPresetButton active={sel?.kind === 'draft'} onClick={() => setSel({ kind: 'draft' })}>
              Pre-draft
            </JumpPresetButton>
          </JumpStateStrip>
        ) : null}
        <div className="px-5 py-4 space-y-4">
          <button
            type="button"
            onClick={() => setSel({ kind: 'agent' })}
            className={`agent-card w-full px-4 py-3.5 text-sm text-signal-ink leading-relaxed text-left transition-all duration-200 ease-smooth border border-signal/20 shadow-sm ${
              sel?.kind === 'agent' ? 'ring-2 ring-signal/35 shadow-md' : 'hover:shadow-md'
            }`}
          >
            Deal stalled in legal review since <strong>{d.stalledSince}</strong>. Owner on file: <strong>{d.legalOwner}</strong>,{' '}
            {d.legalTitle}. AE <strong>{d.ae}</strong> last note {d.lastNote}. <strong>Confidence: high</strong> — CRM + email thread
            index.
          </button>

          <div className="rounded-xl border border-ink-200 bg-canvas-raised p-3 shadow-sm">
            <div className="text-2xs font-mono uppercase tracking-wide text-ink-500 mb-2">Legal duration · vs median</div>
            <div className="h-[108px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={LEGAL_DURATION} layout="vertical" margin={{ top: 2, right: 12, left: 4, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 6" stroke={CHART.grid} horizontal={false} />
                  <XAxis type="number" domain={[0, 14]} hide />
                  <YAxis type="category" dataKey="label" width={96} tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip formatter={(v: number) => [`${v}d`, 'In stage']} contentStyle={{ borderRadius: 10, fontSize: 12 }} />
                  <Bar
                    dataKey="days"
                    radius={[0, 8, 8, 0]}
                    cursor="pointer"
                    activeBar={{ fill: CHART.signal, fillOpacity: 0.9 }}
                    onClick={(_d: unknown, i: number) => setSel({ kind: 'legalbar', which: i === 1 ? 'deal' : 'median' })}
                  >
                    {LEGAL_DURATION.map((row, i) => (
                      <Cell
                        key={row.label}
                        fill={row.label.includes('Acme') ? CHART.accent : CHART.grid}
                        fillOpacity={barSel >= 0 && i !== barSel ? 0.35 : 1}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-xl border border-ink-200 bg-canvas-sunken/25 px-3 py-3 shadow-sm">
            <div className="text-2xs font-mono uppercase tracking-wide text-ink-500 mb-2">Touchpoints · tap a pill</div>
            <div className="flex flex-wrap gap-2">
              {TIMELINE_EDGE.map((t, i) => (
                <button
                  key={t.day}
                  type="button"
                  onClick={() => setSel({ kind: 'timeline', idx: i })}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium border transition-all ${
                    sel?.kind === 'timeline' && sel.idx === i
                      ? 'border-accent bg-accent-soft/50 text-accent-ink shadow-sm'
                      : 'border-ink-200 bg-canvas-raised text-ink-700 hover:border-accent/35'
                  }`}
                >
                  <span className="font-mono text-2xs text-ink-500 mr-1.5">{t.day}</span>
                  {t.note}
                </button>
              ))}
            </div>
          </div>

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
                    className={`text-left w-full rounded-lg px-2 py-1 transition-colors ${
                      sel?.kind === 'check' && sel.id === id ? 'bg-accent-soft/50 ring-1 ring-accent/20' : 'hover:bg-ink-100/80'
                    }`}
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
            className={`block w-full text-left rounded-xl border border-ink-200 p-3.5 transition-all duration-200 ease-smooth ${
              sel?.kind === 'draft' ? 'ring-2 ring-accent/30 bg-accent-soft/20 shadow-sm' : 'bg-canvas-raised hover:shadow-sm'
            }`}
          >
            <div className="text-2xs uppercase tracking-[0.14em] text-ink-500 font-mono mb-1">Pre-draft</div>
            <p className="text-sm text-ink-800 leading-relaxed">{d.draft}</p>
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
        dataSurface={SAM_AGENT_DATA_SURFACE}
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
      body: `${SAM_MOBILE.act.sentTo} notified · timeline logged · Maya’s briefing footnote picks this up before ${SAM_MOBILE.act.mayaStaff}.`,
      confidence: 'high',
    }
  }
  if (sel.kind === 'watch') {
    return {
      title: 'Watcher',
      body: `${SAM_MOBILE.act.watchAt} stage check — if unchanged, back to queue ${SAM_MOBILE.act.nextQueue}. Observed habit, not a settings toggle.`,
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

export function SamActBoard({ presetStrip = false }: { presetStrip?: boolean }) {
  const [sel, setSel] = useState<ActSel>(null)
  const insight = useMemo(() => agentAct(sel), [sel])
  const a = SAM_MOBILE.act

  return (
    <div className="bg-canvas min-h-[360px] flex flex-col">
      <div className="flex-1 px-5 py-8 space-y-4 overflow-y-auto">
        {presetStrip ? (
          <JumpStateStrip label="Jump receipt state" className="py-2.5 -mt-2 mb-2 -mx-5 px-5">
            <JumpPresetButton tone="neutral" active={sel === null} onClick={() => setSel(null)}>
              Idle
            </JumpPresetButton>
            <JumpPresetButton active={sel?.kind === 'receipt'} onClick={() => setSel({ kind: 'receipt' })}>
              Sent
            </JumpPresetButton>
            <JumpPresetButton active={sel?.kind === 'watch'} onClick={() => setSel({ kind: 'watch' })}>
              Watcher
            </JumpPresetButton>
            <JumpPresetButton active={sel?.kind === 'why'} onClick={() => setSel({ kind: 'why' })}>
              Why order
            </JumpPresetButton>
          </JumpStateStrip>
        ) : null}
        <button
          type="button"
          onClick={() => setSel({ kind: 'receipt' })}
          className={`block w-full text-left rounded-md border px-4 py-3 text-sm text-ink-800 transition-all ${
            sel?.kind === 'receipt' ? 'border-success ring-2 ring-signal/30 bg-success-soft/50' : 'border-success/30 bg-success-soft/40'
          }`}
        >
          <strong>Sent.</strong> {a.sentTo} notified · logged to deal timeline · Maya&apos;s briefing footnote will pick this up
          before {a.mayaStaff}.
        </button>
        <button type="button" className="text-left w-full text-sm text-ink-700" onClick={() => setSel({ kind: 'watch' })}>
          I&apos;ll check at <strong>{a.watchAt}</strong>; if stage unchanged, back to your queue {a.nextQueue}.
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
        dataSurface={SAM_AGENT_DATA_SURFACE}
      />
    </div>
  )
}
