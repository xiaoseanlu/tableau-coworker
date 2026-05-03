import { useMemo, useState } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import { Surface } from '../FlowChrome'
import AgentDock, { type AgentInsight } from './AgentDock'
import { MAYA_BRIEF, kpiToneClass, type BriefTone } from './mayaDemoContext'
import { CHART } from './chartTokens'
import { MAYA_AGENT_DATA_SURFACE } from '../../data/personaFlowMeta'

function KpiChipsRow({ dense = false }: { dense?: boolean }) {
  return (
    <div className={`flex flex-wrap gap-2 ${dense ? '' : 'my-3'}`}>
      {MAYA_BRIEF.kpis.map(k => (
        <div
          key={k.id}
          className={`rounded-lg border px-2.5 py-1.5 ${kpiToneClass(k.tone as BriefTone)} ${dense ? 'text-2xs' : 'text-xs'}`}
        >
          <span className="font-mono uppercase tracking-wide text-ink-500 text-2xs block">{k.label}</span>
          <span className="font-mono font-semibold tabular-nums text-ink-900">{k.value}</span>
          <span className="metric-delta text-ink-600 block text-2xs">{k.delta}</span>
        </div>
      ))}
    </div>
  )
}

function StaffBulletsCompact() {
  return (
    <ul className="m-0 pl-0 list-none space-y-1.5 text-sm text-ink-800">
      {MAYA_BRIEF.staffBullets.map(b => (
        <li key={b.n} className="flex gap-2">
          <span className="font-mono text-2xs text-accent-ink w-6 shrink-0">{b.n}</span>
          <span>
            {b.text}
            {b.flag === 'watch' ? (
              <span className="ml-1.5 text-2xs font-mono uppercase text-signal-ink bg-signal-soft px-1.5 py-0.5 rounded">
                watch
              </span>
            ) : null}
          </span>
        </li>
      ))}
    </ul>
  )
}

function VerdictStrip() {
  return (
    <div className="rounded-lg border border-ink-200 bg-canvas-sunken/50 px-3 py-2 grid sm:grid-cols-2 gap-3 text-2xs">
      <div>
        <div className="font-mono uppercase tracking-wide text-ink-500 mb-1">Dig in if</div>
        <ul className="m-0 pl-3.5 space-y-0.5 text-ink-700 list-disc">
          {MAYA_BRIEF.verdict.digInIf.map(x => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>
      <div>
        <div className="font-mono uppercase tracking-wide text-ink-500 mb-1">Skim / skip if</div>
        <ul className="m-0 pl-3.5 space-y-0.5 text-ink-700 list-disc">
          {MAYA_BRIEF.verdict.skimOkIf.map(x => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

type ShareSel =
  | { kind: 'dest'; id: 'monday' | 'slack' | 'gcal' | 'email' | 'copy' }
  | { kind: 'wave'; idx: number }
  | { kind: 'followup'; q: string }
  | null

function agentShare(
  sel: ShareSel,
  opts: { includeDrill: boolean; includeRuledOut: boolean },
): AgentInsight {
  if (!sel) {
    return {
      title: 'Handoff · compose',
      body:
        'Maya chooses where the same frozen briefing goes. Toggles change what recipients can open: KPI strip is always safe for Slack unfurl; pinned drill gives them the West read without edit rights; ruled-out adds the checklist Jordan uses in QBR prep. Nothing is re-keyed — it is the same v18 snapshot.',
      confidence: 'high · design intent',
    }
  }
  if (sel.kind === 'wave') {
    const row = MAYA_BRIEF.propagation[sel.idx]
    if (!row) {
      return { title: 'Reads', body: 'No point selected.', confidence: 'n/a' }
    }
    return {
      title: `Signal · ${row.t}`,
      body: `${row.label}. After share, Coworker can ingest Slack link hits + Tableau audit to show Maya who opened before staff — not for surveillance, for knowing if she should repeat a number in-room.`,
      confidence: 'low on counts · illustrative',
    }
  }
  if (sel.kind === 'followup') {
    const q = sel.q
    if (q === 'After they open?') {
      return {
        title: 'Recipient context',
        body:
          'Their dock is read-only: same confidence ladder, no “publish.” If they Ask next, replies cite only what Maya’s snapshot included — plus org RLS (Sam sees West rows, Finance sees ARR proofs).',
        confidence: 'moderate · product shape',
      }
    }
    if (q === 'Can I edit before send?') {
      return {
        title: 'Review gate',
        body:
          'Optional: strip a staff bullet or drop ruled-out for a shorter Slack. KPIs and v18 hash stay unless she regenerates — prevents “which version did we staff?”',
        confidence: 'moderate',
      }
    }
    return {
      title: 'Follow-up',
      body: 'External counsel links use expiring token; internal Tableau SSO does not.',
      confidence: 'low · policy',
    }
  }

  const post =
    opts.includeDrill
      ? ' Recipients get a pinned West drill tab (read-only) with the same concentration chart Maya saw.'
      : ''
  const ruled =
    opts.includeRuledOut
      ? ' Ruled-out checklist attaches as a collapsible — good when Legal or Finance is on the thread.'
      : ''

  type DestId = 'monday' | 'slack' | 'gcal' | 'email' | 'copy'
  const m: Record<DestId, AgentInsight> = {
    monday: {
      title: 'Monday folder',
      body: `Canonical URL · ${MAYA_BRIEF.url} · version ${MAYA_BRIEF.version}. Staff calendar event already references the same object.${post}${ruled}`,
      confidence: 'high',
    },
    slack: {
      title: 'Slack #exec-staff',
      body: `Message body is plain language + KPI strip in the unfurl. Unfurl subtitle carries confidence (West ${MAYA_BRIEF.confidence.west}, EMEA ${MAYA_BRIEF.confidence.emea}). Thread replies do not fork data — only the permalink does.${post}${ruled}`,
      confidence: 'high',
    },
    gcal: {
      title: 'Google Calendar',
      body: `Description repeats the three staff numbers + link. Mobile execs see the KPI line above the fold in Meet details.${post}`,
      confidence: 'moderate',
    },
    email: {
      title: 'Email',
      body: `Subject: "Staff 9:00 · ${MAYA_BRIEF.headline.slice(0, 40)}…" Body mirrors Slack without unfurl; good for board observers not in Slack.${post}${ruled}`,
      confidence: 'moderate',
    },
    copy: {
      title: 'Copy link',
      body:
        'Clipboard holds the canonical brief + optional expiring token for external parties. Paste into Doc comment or deal room — still resolves to the same v18 lineage.',
      confidence: 'moderate',
    },
  }
  return m[sel.id]
}

/** Interactive share sheet: destinations, payload toggles, live message preview, propagation. */
export function MayaShareSheetBoard() {
  const [sel, setSel] = useState<ShareSel>(null)
  const [includeDrill, setIncludeDrill] = useState(true)
  const [includeRuledOut, setIncludeRuledOut] = useState(false)

  const insight = useMemo(() => agentShare(sel, { includeDrill, includeRuledOut }), [sel, includeDrill, includeRuledOut])
  const waveIdx = sel?.kind === 'wave' ? sel.idx : -1

  const destActive = (id: 'monday' | 'slack' | 'gcal' | 'email' | 'copy') => sel?.kind === 'dest' && sel.id === id

  const rows = (
    [
      ['monday', 'Monday folder', 'Canonical · staff default'],
      ['slack', 'Slack', '#exec-staff · unfurl + KPI strip'],
      ['gcal', 'Google Calendar', '9:00 invite · notes block'],
      ['email', 'Email', 'Subject line + same body'],
      ['copy', 'Copy link', 'Deal room · counsel'],
    ] as const
  ).map(([id, title, sub]) => (
    <button
      key={id}
      type="button"
      onClick={() => setSel({ kind: 'dest', id })}
      className={`w-full text-left rounded-xl border p-4 transition-colors flex flex-col gap-0.5 ${
        destActive(id)
          ? 'border-accent bg-accent-soft/40 ring-1 ring-accent/25'
          : 'border-ink-100 bg-canvas-raised hover:border-accent/30'
      }`}
    >
      <span className="font-semibold text-ink-900 text-sm">{title}</span>
      <span className="text-2xs text-ink-500 font-mono">{sub}</span>
    </button>
  ))

  return (
    <div className="rounded-xl border border-ink-200 bg-canvas-raised overflow-hidden">
      <div className="flex flex-col 2xl:flex-row 2xl:items-stretch">
          <div className="flex-1 min-w-0 p-6 md:p-8 space-y-6 border-b 2xl:border-b-0 2xl:border-r border-ink-100">
            <div className="rounded-lg border border-signal/25 bg-signal-soft/40 px-4 py-3 text-sm text-ink-800">
              <strong className="font-semibold text-ink-900">Payload is frozen.</strong> Everything below ships as{' '}
              <span className="font-mono text-2xs">{MAYA_BRIEF.version}</span> — same objects Maya validated on canvas,
              not a re-query.
            </div>

            <div>
              <div className="text-sm font-semibold text-ink-900 mb-3">Send to</div>
              <div className="grid sm:grid-cols-2 gap-3">{rows}</div>
            </div>

            <div className="rounded-xl border border-ink-200 bg-canvas-sunken/40 p-4 space-y-3">
              <div className="text-2xs font-mono uppercase tracking-wide text-ink-500">Payload options</div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeDrill}
                  onChange={e => setIncludeDrill(e.target.checked)}
                  className="mt-1 rounded border-ink-300 text-accent focus:ring-accent/30"
                />
                <span className="text-sm text-ink-800">
                  <strong className="text-ink-900">Pin West drill</strong> — recipients open read-only evidence tab (same
                  bars Maya clicked; no edit).
                </span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeRuledOut}
                  onChange={e => setIncludeRuledOut(e.target.checked)}
                  className="mt-1 rounded border-ink-300 text-accent focus:ring-accent/30"
                />
                <span className="text-sm text-ink-800">
                  <strong className="text-ink-900">Attach ruled-out checklist</strong> — renewals, model v2, seasonality
                  (longer; use when Finance/Legal on thread).
                </span>
              </label>
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
              <div className="rounded-xl border border-dashed border-ink-300 bg-canvas p-4">
                <div className="text-2xs font-mono uppercase tracking-wide text-accent mb-2">Live preview · message shape</div>
                <div className="text-2xs text-ink-500 mb-2">
                  {sel?.kind === 'dest' ? `Channel: ${sel.id}` : 'Select a destination'}
                </div>
                <p className="editorial text-base text-ink-900 leading-snug m-0 mb-2">{MAYA_BRIEF.headline}</p>
                <p className="text-2xs text-ink-600 m-0 mb-2">{MAYA_BRIEF.subline}</p>
                <KpiChipsRow dense />
                <StaffBulletsCompact />
                <VerdictStrip />
                <div className="mt-3 flex flex-wrap gap-2 text-2xs font-mono text-ink-500">
                  <span className="rounded border border-ink-200 px-2 py-0.5">Drill {includeDrill ? 'on' : 'off'}</span>
                  <span className="rounded border border-ink-200 px-2 py-0.5">Ruled-out {includeRuledOut ? 'on' : 'off'}</span>
                </div>
                <a href={MAYA_BRIEF.url} className="text-accent text-2xs font-mono break-all block mt-2 underline">
                  {MAYA_BRIEF.url}
                </a>
              </div>

              <div className="card p-4">
                <div className="text-sm font-semibold text-ink-900 mb-1">Opens before staff (modeled)</div>
                <div className="text-2xs text-ink-500 font-mono mb-3">Click a point · not production analytics</div>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[...MAYA_BRIEF.propagation]}
                      margin={{ top: 8, right: 8, left: -12, bottom: 0 }}
                      onClick={e => {
                        if (e?.activeTooltipIndex != null) {
                          setSel({ kind: 'wave', idx: e.activeTooltipIndex })
                        }
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 6" stroke={CHART.grid} vertical={false} />
                      <XAxis dataKey="label" tick={{ fontSize: 8 }} axisLine={false} tickLine={false} interval={0} />
                      <YAxis
                        domain={[0, 14]}
                        tick={{ fontSize: 10, fontFamily: 'JetBrains Mono' }}
                        width={28}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="subs"
                        stroke={CHART.accent}
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
                              fill={active ? CHART.accent : CHART.canvas}
                              stroke={CHART.accent}
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
            </div>

            <p className="font-mono text-2xs text-ink-400 m-0">
              {MAYA_BRIEF.version} · generated {MAYA_BRIEF.generatedAt} · {MAYA_BRIEF.sourcesLine}
            </p>
          </div>

          <AgentDock
            insight={insight}
            followups={['After they open?', 'Can I edit before send?']}
            onFollowup={q => setSel({ kind: 'followup', q })}
            onClear={() => {
              setSel(null)
            }}
            selectionActive={!!sel}
            productTagline="Recipient read · frozen v18"
            dataSurface={MAYA_AGENT_DATA_SURFACE}
          />
        </div>
      </div>
  )
}

/** Sender view · Slack — scannable KPIs, verdict, rich unfurl. */
export function MayaSlackHandoffBoard() {
  return (
    <div className="rounded-xl border border-ink-200 bg-canvas-raised overflow-hidden shadow-sm">
      <Surface chrome="slack" slackTitle="Acme SaaS · #exec-staff">
        <div className="bg-white text-[15px] text-[#1D1C1D] p-4 md:p-5">
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded bg-accent flex items-center justify-center text-white text-xs font-bold shrink-0">
              MC
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-bold text-sm">Maya Chen</span>
                <span className="text-2xs text-[#616061] font-mono">8:44 AM</span>
                <span className="text-2xs px-1.5 py-0.5 rounded bg-[#F8F8F8] border border-[#DDD] text-[#616061]">
                  CRO
                </span>
              </div>

              <p className="text-xs text-[#616061] mt-1 mb-2 m-0">{MAYA_BRIEF.meetingTime} · three bullets max in room</p>

              <p className="text-sm mt-2 mb-2 leading-relaxed m-0 font-medium">{MAYA_BRIEF.headline}</p>
              <p className="text-sm text-[#454447] mb-3 leading-relaxed m-0">{MAYA_BRIEF.subline}</p>

              <KpiChipsRow />
              <StaffBulletsCompact />
              <VerdictStrip />

              <p className="text-2xs text-[#616061] mt-3 m-0 font-mono">
                Deal: {MAYA_BRIEF.deal.name} {MAYA_BRIEF.deal.acv} · {MAYA_BRIEF.deal.stage} · escalated {MAYA_BRIEF.deal.escalatedBy}
              </p>

              <a
                href={MAYA_BRIEF.url}
                className="text-[#1264A3] text-sm underline break-all inline-block mt-3"
                target="_blank"
                rel="noreferrer"
              >
                {MAYA_BRIEF.url}
              </a>

              <div className="mt-4 rounded-lg border border-ink-200 overflow-hidden max-w-lg shadow-sm">
                <div className="bg-[#F8F8F8] px-3 py-2 border-b border-ink-200 flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-signal/20 text-signal flex items-center justify-center text-2xs font-bold">
                    TC
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-ink-900 truncate">Coworker · {MAYA_BRIEF.dateLabel}</div>
                    <div className="text-2xs text-ink-600 truncate font-mono">
                      {MAYA_BRIEF.version} · West moderate · EMEA low · drill pinned
                    </div>
                  </div>
                </div>
                <div className="px-3 py-3 bg-white text-2xs text-ink-700 leading-relaxed space-y-2">
                  <p className="m-0">{MAYA_BRIEF.headline}</p>
                  <p className="m-0 font-mono text-ink-600">
                    {MAYA_BRIEF.kpis.map(k => `${k.label.split('·')[0]?.trim()}: ${k.value} (${k.delta})`).join(' · ')}
                  </p>
                  <button
                    type="button"
                    className="text-2xs font-semibold text-accent bg-accent-soft/50 px-2.5 py-1 rounded-md border border-accent/20"
                  >
                    Open briefing (read-only)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Surface>
      <p className="text-2xs text-ink-500 px-4 py-2 border-t border-ink-100 font-mono m-0">
        Mock Slack — message shape shows KPI strip + verdict so recipients triage in-channel before opening the link.
      </p>
    </div>
  )
}

/** Staff opens Maya’s link — read-only recipient shell + evidence pinned by sender. */
export function MayaRecipientBriefBoard() {
  const [evidenceOpen, setEvidenceOpen] = useState(true)
  const [rlsWhyOpen, setRlsWhyOpen] = useState(false)

  return (
    <div className="rounded-xl border border-ink-200 bg-canvas-raised overflow-hidden">
      <Surface chrome="web">
        <div className="bg-canvas border-b border-ink-100 px-4 py-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="pill bg-accent-soft text-accent-ink text-2xs font-mono">Shared read</span>
            <span className="text-sm font-medium text-ink-900">Jordan Patel</span>
            <span className="text-2xs text-ink-500 font-mono">CFO staff · Explorer</span>
          </div>
          <span className="text-2xs font-mono text-ink-500">
            From Maya Chen · {MAYA_BRIEF.version} · {MAYA_BRIEF.generatedAt}
          </span>
        </div>

        <div className="p-6 md:p-8 grid xl:grid-cols-[1fr_320px] gap-8">
          <div className="min-w-0 space-y-5">
            <div>
              <div className="text-2xs font-mono uppercase tracking-wide text-ink-500 mb-2">{MAYA_BRIEF.dateLabel}</div>
              <h2 className="editorial text-2xl md:text-3xl text-ink-900 leading-tight m-0">{MAYA_BRIEF.headline}</h2>
              <p className="text-sm text-ink-600 mt-2 m-0">{MAYA_BRIEF.subline}</p>
            </div>

            <div className="rounded-lg border border-ink-200 bg-canvas-sunken/50 px-3 py-2.5 text-xs text-ink-700">
              <span className="font-semibold text-ink-900">Scope:</span> Jordan Patel · VP Sales Ops. RLS applied — West + EMEA context
              from Maya&apos;s {MAYA_BRIEF.version} snapshot; APAC pipeline rows are not in this brief slice.{' '}
              <button
                type="button"
                className="text-accent-ink font-semibold underline underline-offset-2"
                onClick={() => setRlsWhyOpen(o => !o)}
              >
                Why?
              </button>
              {rlsWhyOpen ? (
                <p className="mt-2 mb-0 text-2xs text-ink-600 leading-relaxed border-t border-ink-100 pt-2">
                  Recipients inherit row visibility at send time. Coworker stays inside the frozen snapshot — no surfacing deals or
                  regions that were not in Maya&apos;s export for your role.
                </p>
              ) : null}
            </div>

            <KpiChipsRow />

            <div>
              <div className="text-2xs font-mono uppercase tracking-wide text-ink-500 mb-2">Staff bullets</div>
              <StaffBulletsCompact />
            </div>

            <div className="rounded-xl border border-ink-200 bg-canvas-raised overflow-hidden">
              <button
                type="button"
                onClick={() => setEvidenceOpen(o => !o)}
                className="w-full text-left px-4 py-3 flex items-center justify-between text-sm font-semibold text-ink-900 border-b border-transparent hover:bg-canvas-sunken/30 transition-colors"
              >
                Evidence pinned by sender
                <span className="text-2xs font-mono font-normal text-ink-500">
                  West drill · read-only · {evidenceOpen ? 'hide' : 'show'}
                </span>
              </button>
              {evidenceOpen ? (
                <div className="px-4 pb-4 pt-2 space-y-3 border-t border-ink-100">
                <div className="rounded-lg border border-signal/30 bg-signal-soft/35 p-3 text-sm text-ink-800">
                  West coverage stepped to <span className="font-mono font-semibold">2.6×</span> (−0.22 WoW). Three reps
                  account for <span className="font-mono">78%</span> of the move; manufacturing vertical, February-originated
                  pipe. <span className="font-mono text-2xs text-signal-ink">Confidence: {MAYA_BRIEF.confidence.west}</span>
                </div>
                <ul className="text-2xs text-ink-600 m-0 pl-4 space-y-1 list-disc">
                  <li>Enterprise renewal slippage — ruled out (mid-market cohort).</li>
                  <li>Definition drift v2 — ruled out (WoW holds on old vs new bind).</li>
                  <li>Seasonality — ruled out vs same week LY/LQ.</li>
                </ul>
                <p className="text-2xs font-mono text-ink-500 m-0">
                  You cannot edit charts here. Request scope from Maya or open governed workbooks in Tableau if your role allows.
                </p>
              </div>
              ) : null}
            </div>

            <VerdictStrip />

            <p className="text-2xs font-mono text-ink-400 border-t border-ink-100 pt-4 m-0">{MAYA_BRIEF.sourcesLine}</p>
          </div>

          <aside className="space-y-4">
            <div className="rounded-xl border border-signal/30 bg-signal-soft/30 p-4">
              <div className="text-2xs font-mono uppercase text-signal-ink mb-2">Coworker · your session</div>
              <p className="text-sm text-ink-800 m-0 leading-relaxed">
                Ask about this briefing only — not org-wide. I cite{' '}
                <span className="font-mono text-2xs">{MAYA_BRIEF.version}</span> and tables Maya pinned. I will not infer
                deals you cannot see under RLS.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {['Why is West moderate confidence?', 'Show Acme Co timeline', 'Who else opened this?'].map(q => (
                  <span
                    key={q}
                    className="text-2xs px-2 py-1 rounded-md border border-ink-200 bg-canvas-raised text-ink-600"
                  >
                    {q}
                  </span>
                ))}
              </div>
              <p className="text-2xs text-ink-500 mt-3 m-0 font-mono">Chips are sample prompts — static in this walkthrough.</p>
            </div>
          </aside>
        </div>
      </Surface>
      <p className="text-2xs text-ink-500 px-4 py-2 border-t border-ink-100 font-mono m-0">
        Recipient perspective — same numbers as Maya’s canvas; dock is scoped + honest about limits.
      </p>
    </div>
  )
}

export function MayaGoogleCalendarHandoffBoard() {
  const bullets = MAYA_BRIEF.staffBullets.map(b => `${b.n} ${b.text}`).join('\n\n')

  return (
    <div className="rounded-xl border border-ink-200 bg-canvas-raised overflow-hidden">
      <div className="p-6 md:p-8 max-w-xl">
        <div className="text-2xs font-mono uppercase tracking-wide text-ink-500 mb-4">Calendar · same payload</div>
        <div className="flex gap-4">
          <div className="w-1 self-stretch rounded-full bg-[#4285F4]" aria-hidden />
          <div className="min-w-0 flex-1">
            <div className="text-xs text-[#4285F4] font-medium">May 4, 2026 · 9:00 – 10:00 AM PT</div>
            <h3 className="text-lg font-semibold text-ink-900 mt-1 mb-2">Exec staff · Q2 revenue posture</h3>
            <p className="text-sm text-ink-600 leading-relaxed m-0 mb-4">Maya Chen · Conf B + Meet · optional dial-in</p>

            <div className="rounded-lg border border-ink-200 bg-canvas p-4 text-sm space-y-3">
              <div className="text-2xs font-mono text-ink-500">Description · scannable block</div>
              <p className="font-semibold text-ink-900 m-0">{MAYA_BRIEF.headline}</p>
              <div className="grid grid-cols-3 gap-2">
                {MAYA_BRIEF.kpis.map(k => (
                  <div key={k.id} className="rounded-md border border-ink-100 bg-canvas-raised px-2 py-1.5">
                    <div className="text-2xs text-ink-500 font-mono truncate">{k.label}</div>
                    <div className="font-mono text-sm font-semibold tabular-nums">{k.value}</div>
                    <div className="font-mono text-2xs tabular-nums font-medium text-ink-600">{k.delta}</div>
                  </div>
                ))}
              </div>
              <pre className="text-2xs text-ink-700 whitespace-pre-wrap font-sans leading-relaxed m-0 bg-canvas-sunken/50 p-2 rounded-md border border-ink-100">
                {bullets}
              </pre>
              <p className="text-2xs text-ink-600 m-0">
                Live brief (+ pinned drill):{' '}
                <span className="text-accent font-mono break-all">{MAYA_BRIEF.url}</span>
              </p>
              <p className="text-2xs text-ink-500 m-0 font-mono">
                {MAYA_BRIEF.version} · {MAYA_BRIEF.sourcesLine}
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className="text-2xs text-ink-500 px-6 py-3 border-t border-ink-100 font-mono m-0">
        Calendar copy mirrors Slack KPIs so mobile attendees decide before they join Meet.
      </p>
    </div>
  )
}
