import { useMemo, useState } from 'react'
import { Surface } from '../FlowChrome'
import AgentDock, { type AgentInsight } from './AgentDock'
import { JORDAN_TENANT } from './jordanDemoContext'
import { JORDAN_AGENT_DATA_SURFACE } from '../../data/personaFlowMeta'

type NotifySel =
  | { kind: 'dest'; id: 'slack' | 'email' | 'jira' | 'calendar' }
  | { kind: 'followup'; q: string }
  | null

function agentNotify(sel: NotifySel): AgentInsight {
  if (!sel) {
    return {
      title: 'Stakeholder broadcast',
      body:
        'Jordan closes the governance loop in-product first — then the same audit id rides in Slack, mail, and Jira so Finance does not learn about v2 from Maya’s staff deck.',
      confidence: 'high · design intent',
    }
  }
  if (sel.kind === 'followup') {
    return {
      title: 'Follow-up',
      body:
        sel.q === 'Rollback?'
          ? 'One-click revert to Apr 30 snapshot — lineage retains both versions; subscribers get loud failure email.'
          : 'Board pack job runs 5:55 AM PT — exporter now resolves v2 unless Okonkwo pins legacy (flagged).',
      confidence: 'moderate',
    }
  }
  const m = {
    slack: {
      title: '#data-governance',
      body: `Thread posts ${JORDAN_TENANT.audit.id} with one-line diff: ARR_PACING → v2. @${JORDAN_TENANT.financeRecipient.name.split(' ')[1]} CC’d — no screenshot, permalink to lineage.`,
      confidence: 'high',
    },
    email: {
      title: 'Finance DL',
      body: `Subject locked: "${JORDAN_TENANT.broadcast.emailSubject}". Body: three bullets — what changed, who is impacted, link to republished workbook. Same hash as Slack.`,
      confidence: 'moderate',
    },
    jira: {
      title: JORDAN_TENANT.broadcast.jira,
      body: 'Moves to Done with fix version 2026.05.c — description imports audit paragraph; prevents duplicate remap tickets.',
      confidence: 'moderate',
    },
    calendar: {
      title: 'Optional invite',
      body: '15m “definition handshake” Thu — optional; only if Okonkwo requests screen share. Default is async receipt.',
      confidence: 'low',
    },
  }
  return m[sel.id]
}

/** After publish — where the remediation is communicated (design story II). */
export function JordanBroadcastBoard() {
  const [sel, setSel] = useState<NotifySel>(null)
  const insight = useMemo(() => agentNotify(sel), [sel])

  const dests = (
    [
      ['slack', 'Slack', JORDAN_TENANT.broadcast.slackChannel],
      ['email', 'Email', 'Finance DL + board pack owner'],
      ['jira', 'Jira', JORDAN_TENANT.broadcast.jira],
      ['calendar', 'Calendar', 'Optional 15m handshake'],
    ] as const
  ).map(([id, title, sub]) => (
    <button
      key={id}
      type="button"
      onClick={() => setSel({ kind: 'dest', id })}
      className={`w-full text-left rounded-xl border p-3 transition-colors duration-150 ease-smooth ${
        sel?.kind === 'dest' && sel.id === id
          ? 'border-accent bg-accent-soft/40 ring-1 ring-accent/25'
          : 'border-ink-200 bg-canvas-raised hover:border-accent/30'
      }`}
    >
      <div className="font-semibold text-sm text-ink-900">{title}</div>
      <div className="text-2xs text-ink-500 font-mono">{sub}</div>
    </button>
  ))

  return (
    <div className="rounded-xl border border-ink-200 bg-canvas-raised overflow-hidden">
      <div className="flex flex-col xl:flex-row xl:items-stretch">
        <div className="flex-1 min-w-0 p-6 md:p-8 space-y-6 border-b xl:border-b-0 xl:border-r border-ink-100">
          <div className="agent-card px-4 py-3 text-sm text-signal-ink">
            <strong className="text-ink-900">Same audit object everywhere.</strong> {JORDAN_TENANT.audit.id} ·{' '}
            {JORDAN_TENANT.audit.action} · {JORDAN_TENANT.audit.time}
          </div>

          <div>
            <div className="text-sm font-semibold text-ink-900 mb-2">Notify</div>
            <div className="grid sm:grid-cols-2 gap-2">{dests}</div>
          </div>

          <div className="rounded-xl border border-dashed border-ink-300 bg-canvas p-4">
            <div className="text-2xs font-mono uppercase tracking-[0.14em] text-accent mb-2">Payload preview</div>
            <div className="rounded-lg border border-ink-200 bg-canvas-sunken p-3 font-mono text-2xs text-ink-800 space-y-2 leading-relaxed">
              <div className="text-ink-500">[{JORDAN_TENANT.broadcast.slackChannel}]</div>
              <p className="m-0">
                Published: <span className="text-ink-900 font-medium">Exec ARR roll-up</span> now binds{' '}
                <span className="text-signal-ink font-medium">v2</span>. Audit{' '}
                <span className="text-accent-ink font-medium">{JORDAN_TENANT.audit.id}</span> · subscribers notified (12). Board pack
                exporter on next sync.
              </p>
            </div>
            <p className="text-2xs text-ink-500 mt-2 m-0 font-mono">
              Email subject: <span className="text-ink-700">{JORDAN_TENANT.broadcast.emailSubject}</span>
            </p>
          </div>

          <p className="text-2xs font-mono text-ink-400 m-0">
            Downstream: Maya briefing sources · Sam West cards · Finance offline sheet — same v2 bind when caches clear.
          </p>
        </div>
        <AgentDock
          insight={insight}
          followups={['Rollback?', 'Board pack job?']}
          onFollowup={q => setSel({ kind: 'followup', q })}
          onClear={() => setSel(null)}
          selectionActive={!!sel}
          productName="Coworker"
          productTagline="Governance handoff"
          dataSurface={JORDAN_AGENT_DATA_SURFACE}
        />
      </div>
    </div>
  )
}

/** Finance recipient — what lands in their inbox after Jordan publishes. */
export function JordanFinanceRecipientBoard() {
  return (
    <div className="rounded-xl border border-ink-200 bg-canvas-raised overflow-hidden">
      <Surface chrome="web">
        <div className="bg-canvas border-b border-ink-100 px-4 py-3 flex flex-wrap justify-between gap-2 text-2xs font-mono text-ink-500">
          <span>Inbox · mock</span>
          <span>{JORDAN_TENANT.financeRecipient.name} · {JORDAN_TENANT.financeRecipient.role}</span>
        </div>
        <div className="p-6 md:p-8 max-w-xl mx-auto space-y-4">
          <div className="rounded-xl border border-ink-200 bg-canvas-raised shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-ink-100 bg-canvas-sunken/50">
              <div className="text-2xs text-ink-500 font-mono">From · Tableau Coworker</div>
              <div className="text-sm font-semibold text-ink-900 mt-1">{JORDAN_TENANT.broadcast.emailSubject}</div>
            </div>
            <div className="p-4 text-sm text-ink-800 space-y-3 leading-relaxed">
              <p className="m-0">
                <strong>{JORDAN_TENANT.financeRecipient.workbook}</strong> was republished with{' '}
                <span className="font-mono text-xs">ARR_PACING</span> mapped to{' '}
                <span className="font-mono text-xs text-accent-ink">v2_coverage_won</span> (Jordan Patel ·{' '}
                {JORDAN_TENANT.audit.time}).
              </p>
              <ul className="m-0 pl-4 space-y-1 text-ink-700 text-xs">
                <li>Board pack delta: legacy $12.4M pace vs v2 $10.3M modeled — explains Maya’s “real number” question.</li>
                <li>Audit: <span className="font-mono">{JORDAN_TENANT.audit.id}</span> — lineage snapshot stored.</li>
                <li>No action if Okonkwo’s offline model already imported v2 — click through only if deck still pulls Finance.</li>
              </ul>
              <button
                type="button"
                className="text-2xs font-semibold text-accent bg-accent-soft/40 px-3 py-2 rounded-lg border border-accent/25"
              >
                Open workbook (Tableau)
              </button>
            </div>
          </div>
          <p className="text-2xs text-ink-500 font-mono m-0">
            Recipient perspective — scannable decision: archive vs open Tableau vs reply to Jordan.
          </p>
        </div>
      </Surface>
    </div>
  )
}
