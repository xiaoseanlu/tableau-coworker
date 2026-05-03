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
import { Surface } from '../FlowChrome'
import AgentDock, { type AgentInsight } from './AgentDock'
import { MAYA_AGENT_DATA_SURFACE } from '../../data/personaFlowMeta'

const CAP = `${import.meta.env.BASE_URL}captures/`

const ACCENT = '#5B2E91'
const SIGNAL = '#C7841C'

type OpenZoneId = 'kpi-grid' | 'geo' | 'trends' | 'toolbar'

/** Scene 01 — Open: real wall capture + tappable read model. Evidence: `key/04-exec-wall-of-widgets.png`. */
type OpenSel = { kind: 'zone'; id: OpenZoneId } | { kind: 'followup'; q: string } | null

function agentOpen(sel: OpenSel): AgentInsight {
  if (!sel) {
    return {
      title: 'Coworker',
      body:
        'This is the Executive Overview as it ships today — seven KPI tiles, a map, trend blocks. Tap a zone on the right to name what the wall cannot do: deltas vs Friday, a single narrative spine, or Agent surfaced by default.',
      confidence: 'high — capture-backed',
    }
  }
  if (sel.kind === 'followup') {
    if (sel.q === 'What changed since Friday?') {
      return {
        title: 'Delta vs Friday',
        body:
          'The wall does not compute “since you last looked.” Maya must diff tiles in her head or open each workbook. That is the problem the Coworker canvas is designed to remove.',
        confidence: 'high',
      }
    }
    if (sel.q === 'Where is Agent?') {
      return {
        title: 'Agent placement',
        body:
          'On this surface, Agent is a toolbar affordance you summon. The redesign argument: the same analysis class becomes the default read — fused into KPI and chart selection, not a side conversation.',
        confidence: 'moderate',
      }
    }
    return {
      title: 'Compare regions',
      body:
        'Each tile is a silo. Cross-region stories require manual drill or a separate workbook. Coworker composes region rows and ARR pace on one canvas.',
      confidence: 'moderate',
    }
  }
  const zones = {
    'kpi-grid': {
      title: 'KPI grid',
      body:
        'Seven tiles, equal weight. No hierarchy for “what matters for staff in 18 minutes.” Numbers are present; the story is absent.',
      confidence: 'high',
    },
    geo: {
      title: 'Geo block',
      body:
        'Map encoding is faithful but mobile and exec readers still translate shapes to revenue outcomes manually. No anomaly caption tied to West softness.',
      confidence: 'moderate',
    },
    trends: {
      title: 'Trend strips',
      body:
        'Sparkline-class blocks show history without tying moves to owners, definitions, or CRM moments. Good hygiene chart; bad briefing surface.',
      confidence: 'moderate',
    },
    toolbar: {
      title: 'Toolbar',
      body:
        'Edit, share, device preview — power-user chrome first. The evidence panel (Agent) is not in the sight line when Maya lands.',
      confidence: 'high',
    },
  }
  return zones[sel.id]
}

export function MayaOpenBoard() {
  const [sel, setSel] = useState<OpenSel>(null)
  const insight = useMemo(() => agentOpen(sel), [sel])

  const zoneActive = (id: OpenZoneId) => sel?.kind === 'zone' && sel.id === id

  return (
    <div className="rounded-xl border border-ink-200 bg-canvas-raised overflow-hidden">
      <div className="flex flex-col xl:flex-row xl:items-stretch">
        <div className="flex-1 min-w-0 border-b xl:border-b-0 xl:border-r border-ink-100">
          <Surface chrome="web">
            <img
              src={`${CAP}key/04-exec-wall-of-widgets.png`}
              alt="Tableau Superstore Executive Overview — wall of widgets"
              className="block w-full"
            />
          </Surface>
        </div>
        <div className="w-full xl:w-[340px] shrink-0 p-5 space-y-4 bg-canvas">
          <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono">Tap the wall (conceptual)</div>
          <p className="text-xs text-ink-600 leading-relaxed">
            Zones mirror the capture — KPI cluster, map, trend rows, chrome — so the agent read tracks what Maya actually sees.
          </p>
          <div className="grid grid-cols-1 gap-2">
            {(
              [
                ['kpi-grid', 'KPI cluster'],
                ['geo', 'Map / geo block'],
                ['trends', 'Trend strips'],
                ['toolbar', 'Toolbar / chrome'],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setSel({ kind: 'zone', id })}
                className={`text-left rounded-lg border px-3 py-2.5 text-sm transition-all ${
                  zoneActive(id) ? 'border-accent bg-accent-soft/40 ring-1 ring-accent/30' : 'border-ink-100 bg-canvas-raised hover:border-accent/30'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <AgentDock
          insight={insight}
          followups={['What changed since Friday?', 'Where is Agent?', 'Compare regions']}
          onFollowup={q => setSel({ kind: 'followup', q })}
          onClear={() => setSel(null)}
          selectionActive={!!sel}
          productTagline="Before state · wall of widgets"
          dataSurface={MAYA_AGENT_DATA_SURFACE}
        />
      </div>
    </div>
  )
}

const DRILL_STATES = [
  { state: 'Ohio', profit: -21.7 },
  { state: 'Colorado', profit: -20.3 },
  { state: 'Indiana', profit: -11.2 },
  { state: 'Illinois', profit: -8.4 },
  { state: 'Texas', profit: -4.1 },
]

const DRILL_REPS = [
  { name: 'A. Morales', share: 34, segment: 'Manufacturing' },
  { name: 'J. Okonkwo', share: 28, segment: 'Manufacturing' },
  { name: 'T. Brennan', share: 16, segment: 'Mfg · Feb pipe' },
]

/** Scene 03 — Drill: interactive evidence + real Agent capture. Evidence: `key/10-tableau-agent-with-insights.png`. */
type DrillSel =
  | { kind: 'state'; state: string; profit: number }
  | { kind: 'rep'; name: string; share: number; segment: string }
  | { kind: 'check'; id: 'slip' | 'model' | 'season' }
  | { kind: 'capture' }
  | { kind: 'followup'; q: string }
  | null

function agentDrill(sel: DrillSel): AgentInsight {
  if (!sel) {
    return {
      title: 'West drill',
      body:
        'Click a state bar (Tableau Agent calls out Ohio and Colorado on this workbook), a rep concentration bar, or a “what I checked” row. The gold panel is the same class of read as key/10 — positioned as the surface.',
      confidence: 'moderate',
    }
  }
  if (sel.kind === 'state') {
    const heavy = sel.state === 'Ohio' || sel.state === 'Colorado'
    return {
      title: `${sel.state} · profit %`,
      body: heavy
        ? `${sel.state} at ${sel.profit}% is in the worst tier on this Superstore slice — Tableau Agent already narrates this in trial with specific next steps; here that read is default when you touch the bar.`
        : `${sel.profit}% — contributing to West softness but not the concentration locus. Useful for staff only if someone challenges “is it just two states?”`,
      confidence: heavy ? 'high' : 'moderate',
    }
  }
  if (sel.kind === 'rep') {
    return {
      title: `${sel.name}`,
      body: `${sel.share}% of the West WoW move — ${sel.segment}. Pair with the state read: manufacturing vertical, February-originated pipe.`,
      confidence: 'moderate',
    }
  }
  if (sel.kind === 'check') {
    const m = {
      slip: {
        title: 'Enterprise renewal slippage',
        body: 'Checked and ruled out. Three of four flagged deals are Q2 mid-market; renewals held on the renewal cohort filter.',
        confidence: 'high',
      },
      model: {
        title: 'Coverage model v2',
        body:
          'Jordan’s v2 (Apr 30) is wired into the WoW compare — old and new definitions both show the West delta. This is not definition drift theater.',
        confidence: 'high',
      },
      season: {
        title: 'Seasonality',
        body: 'Ruled out. Same fiscal week LY and LQ both above 2.8× for West — the softness is current-period concentrated.',
        confidence: 'moderate',
      },
    }
    return m[sel.id]
  }
  if (sel.kind === 'capture') {
    return {
      title: 'Reference capture',
      body:
        'key/10 is the receipt: Tableau Agent already produces Ohio (−21.7%) and Colorado (−20.3%) with recommendations. The redesign moves that capability off the summoned panel.',
      confidence: 'high',
    }
  }
  return {
    title: 'Follow-up',
    body:
      sel.q === 'Repeat-account drag?'
        ? 'Not the dominant pattern in this slice — concentration is in mid-market manufacturing with February pipe. I’d still spot-check top 10 accounts if staff asks.'
        : 'Nine opportunities moved stage or cut ACV — prototype pins list to «West_WoW_exceptions» in CRM.',
    confidence: 'moderate',
  }
}

export function MayaDrillBoard() {
  const [sel, setSel] = useState<DrillSel>(null)
  const insight = useMemo(() => agentDrill(sel), [sel])

  const stIdx = sel?.kind === 'state' ? DRILL_STATES.findIndex(s => s.state === sel.state) : -1
  const repIdx = sel?.kind === 'rep' ? DRILL_REPS.findIndex(r => r.name === sel.name) : -1

  return (
    <div className="rounded-xl border border-ink-200 bg-canvas-raised overflow-hidden">
      <div className="flex flex-col xl:flex-row xl:items-stretch">
        <div className="flex-1 min-w-0 p-5 md:p-6 space-y-6 border-b xl:border-b-0 xl:border-r border-ink-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="card p-4 min-h-[280px]">
              <div className="text-sm font-semibold text-ink-900 mb-1">Worst states · profit %</div>
              <div className="text-2xs text-ink-500 font-mono mb-3">Click a bar · Superstore Executive Overview</div>
              <div className="h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={DRILL_STATES}
                    layout="vertical"
                    margin={{ top: 4, right: 8, left: 64, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 6" stroke="#DDE0E8" horizontal={false} />
                    <XAxis type="number" domain={[-25, 0]} tickFormatter={v => `${v}%`} tick={{ fontSize: 10 }} />
                    <YAxis type="category" dataKey="state" width={58} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip formatter={(v: number) => [`${v}%`, 'Profit']} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                    <Bar
                      dataKey="profit"
                      radius={[0, 6, 6, 0]}
                      cursor="pointer"
                      onClick={(_d: unknown, i: number) => {
                        const row = DRILL_STATES[i]
                        if (row) setSel({ kind: 'state', state: row.state, profit: row.profit })
                      }}
                    >
                      {DRILL_STATES.map((_, i) => (
                        <Cell
                          key={i}
                          fill={i === stIdx ? '#3A1B5E' : ACCENT}
                          fillOpacity={stIdx >= 0 && i !== stIdx ? 0.35 : 1}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card p-4 min-h-[280px]">
              <div className="text-sm font-semibold text-ink-900 mb-1">Concentration · share of WoW move</div>
              <div className="text-2xs text-ink-500 font-mono mb-3">Click a bar</div>
              <div className="h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={DRILL_REPS} layout="vertical" margin={{ top: 4, right: 8, left: 72, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 6" stroke="#DDE0E8" horizontal={false} />
                    <XAxis type="number" domain={[0, 40]} tickFormatter={v => `${v}%`} tick={{ fontSize: 10 }} />
                    <YAxis type="category" dataKey="name" width={68} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip formatter={(v: number) => [`${v}%`, 'Share']} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                    <Bar
                      dataKey="share"
                      radius={[0, 6, 6, 0]}
                      cursor="pointer"
                      onClick={(_d: unknown, i: number) => {
                        const row = DRILL_REPS[i]
                        if (row) setSel({ kind: 'rep', name: row.name, share: row.share, segment: row.segment })
                      }}
                    >
                      {DRILL_REPS.map((_, i) => (
                        <Cell
                          key={i}
                          fill={i === repIdx ? '#3A1B5E' : SIGNAL}
                          fillOpacity={repIdx >= 0 && i !== repIdx ? 0.35 : 1}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div>
            <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-2">What I checked and ruled out</div>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  ['slip', 'Enterprise renewal slippage'],
                  ['model', 'Coverage model v2'],
                  ['season', 'Seasonality'],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSel({ kind: 'check', id })}
                  className={`text-xs px-3 py-2 rounded-lg border text-left ${
                    sel?.kind === 'check' && sel.id === id ? 'border-accent bg-accent-soft/40' : 'border-ink-100 bg-canvas-raised'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-2xs uppercase tracking-wider text-ink-500 font-mono mb-2">Reference · Tableau Agent today</div>
            <button type="button" onClick={() => setSel({ kind: 'capture' })} className="block w-full text-left group">
              <img
                src={`${CAP}key/10-tableau-agent-with-insights.png`}
                alt="Real Tableau Agent output identifying Ohio and Colorado as worst-performing states"
                className={`block w-full rounded-md border transition-all ${
                  sel?.kind === 'capture' ? 'border-signal ring-2 ring-signal/30' : 'border-ink-100 group-hover:border-signal/50'
                }`}
              />
              <span className="text-2xs text-ink-500 mt-2 block">Tap the capture to pin the receipt in the dock.</span>
            </button>
          </div>
        </div>

        <AgentDock
          insight={insight}
          followups={['Repeat-account drag?', 'Show exception list']}
          onFollowup={q => setSel({ kind: 'followup', q })}
          onClear={() => setSel(null)}
          selectionActive={!!sel}
          productTagline="Evidence + capture receipt"
          dataSurface={MAYA_AGENT_DATA_SURFACE}
        />
      </div>
    </div>
  )
}

const PROPAGATION = [
  { t: '8:38', label: 'Briefing saved', subs: 0 },
  { t: '8:40', label: 'Staff invite linked', subs: 3 },
  { t: '8:42', label: 'Maya opens', subs: 8 },
  { t: '8:55', label: 'Pre-meeting pulls', subs: 12 },
]

/** Scene 04 — Send: provenance + propagation as live chart selection. */
type SendSel = { kind: 'action'; id: 'save' | 'forward' | 'why' } | { kind: 'wave'; idx: number } | { kind: 'followup'; q: string } | null

function agentSend(sel: SendSel): AgentInsight {
  if (!sel) {
    return {
      title: 'Hand off',
      body:
        'Tap Save, Forward, or “Why am I seeing this?” — then the propagation curve. Every control is an audit surface: the briefing is a document with lineage, not a screenshot.',
      confidence: 'moderate',
    }
  }
  if (sel.kind === 'action') {
    const m = {
      save: {
        title: 'Save to Monday folder',
        body: 'Versioned briefing v18 lands in Maya’s Monday folder with sources frozen at 8:38 AM PT. Staff opens the link, not a JPG export.',
        confidence: 'high',
      },
      forward: {
        title: 'Forward as paragraph',
        body:
          'Slack / email body is generated prose with inline citations to chart selections. Recipients who click drill into the same canvas (permissions permitting).',
        confidence: 'moderate',
      },
      why: {
        title: 'Why am I seeing this?',
        body:
          'Observed habit: Sales Executive Overview between 8:36–8:48 for seven Mondays. Shape (3 paragraphs / 3 metrics / 3 staff bullets) is the one you finished three weeks running — system learned, not configured.',
        confidence: 'moderate',
      },
    }
    return m[sel.id]
  }
  if (sel.kind === 'wave') {
    const row = PROPAGATION[sel.idx]
    return {
      title: `Propagation · ${row.t}`,
      body: `${row.label}. Modeled downstream readers at ${row.subs} — Maya’s staff set plus automatic subscribers to the West coverage spine.`,
      confidence: 'low on exact counts — illustrative',
    }
  }
  return {
    title: 'Follow-up',
    body:
      sel.q === 'Export PDF?'
        ? 'Supported — PDF carries provenance footer with generation time and datasource fingerprints. Prefer paragraph forward for iteration speed.'
        : 'Jordan sees brief metadata only if Maya tags the Finance ARR tile; ops queue unaffected on this path.',
    confidence: 'low',
  }
}

export function MayaSendBoard() {
  const [sel, setSel] = useState<SendSel>(null)
  const insight = useMemo(() => agentSend(sel), [sel])
  const waveIdx = sel?.kind === 'wave' ? sel.idx : -1

  return (
    <div className="rounded-xl border border-ink-200 bg-canvas-raised overflow-hidden">
      <div className="flex flex-col xl:flex-row xl:items-stretch">
        <div className="flex-1 min-w-0 p-6 md:p-8 space-y-6 border-b xl:border-b-0 xl:border-r border-ink-100">
          <div className="rounded-md border border-signal/30 bg-signal-soft/50 px-4 py-3 text-sm text-ink-800">
            Saved. Briefing’s in your Monday folder. The link is also on your 9:00 staff calendar invite.
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setSel({ kind: 'action', id: 'save' })}
              className={`btn-primary text-sm ${sel?.kind === 'action' && sel.id === 'save' ? 'ring-2 ring-signal/40' : ''}`}
            >
              Save to Monday folder
            </button>
            <button
              type="button"
              onClick={() => setSel({ kind: 'action', id: 'forward' })}
              className={`btn-secondary text-sm ${sel?.kind === 'action' && sel.id === 'forward' ? 'ring-2 ring-signal/40' : ''}`}
            >
              Forward as paragraph
            </button>
          </div>

          <button
            type="button"
            onClick={() => setSel({ kind: 'action', id: 'why' })}
            className={`w-full text-left rounded-md border p-4 bg-canvas-raised text-sm ${
              sel?.kind === 'action' && sel.id === 'why' ? 'border-accent ring-1 ring-accent/30' : 'border-ink-100'
            }`}
          >
            <span className="font-medium text-ink-800">Why am I seeing this?</span>
            <span className="block text-2xs text-ink-500 mt-1 font-mono">Tap to open the personalization receipt in the dock.</span>
          </button>

          <div className="card p-4">
            <div className="text-sm font-semibold text-ink-900 mb-1">Downstream propagation · readers</div>
            <div className="text-2xs text-ink-500 font-mono mb-3">Click a point on actuals</div>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={PROPAGATION}
                  margin={{ top: 8, right: 8, left: -12, bottom: 0 }}
                  onClick={e => {
                    if (e?.activeTooltipIndex != null) {
                      setSel({ kind: 'wave', idx: e.activeTooltipIndex })
                    }
                  }}
                >
                  <CartesianGrid strokeDasharray="3 6" stroke="#DDE0E8" vertical={false} />
                  <XAxis dataKey="label" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} interval={0} />
                  <YAxis domain={[0, 14]} tick={{ fontSize: 10, fontFamily: 'JetBrains Mono' }} width={28} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                  <Line
                    type="monotone"
                    dataKey="subs"
                    stroke={ACCENT}
                    strokeWidth={2.5}
                    dot={props => {
                      const { cx, cy, index } = props
                      if (cx == null || cy == null || index == null) return <g />
                      const active = index === waveIdx
                      return (
                        <circle
                          cx={cx}
                          cy={cy}
                          r={active ? 8 : 5}
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

          <p className="font-mono text-2xs text-ink-400">
            Briefing v18 · generated 8:38 AM PT · sources synced 8:38 AM PT · agent: Tableau Coworker (briefing model, May 1 release)
          </p>
        </div>

        <AgentDock
          insight={insight}
          followups={['Export PDF?', 'Does Jordan see this?']}
          onFollowup={q => setSel({ kind: 'followup', q })}
          onClear={() => setSel(null)}
          selectionActive={!!sel}
          productTagline="Briefing provenance"
          dataSurface={MAYA_AGENT_DATA_SURFACE}
        />
      </div>
    </div>
  )
}
