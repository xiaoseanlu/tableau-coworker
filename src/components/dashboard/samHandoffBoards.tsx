import { useMemo, useState } from 'react'
import { Surface } from '../FlowChrome'
import AgentDock, { type AgentInsight } from './AgentDock'
import { SAM_MOBILE } from './samDemoContext'
import { SAM_AGENT_DATA_SURFACE } from '../../data/personaFlowMeta'

type LegalSel = { kind: 'banner' } | { kind: 'body' } | { kind: 'followup'; q: string } | null

function agentLegal(sel: LegalSel): AgentInsight {
  if (!sel) {
    return {
      title: 'Legal recipient',
      body:
        'Chen sees Coworker-sourced mail with subject lock and pre-draft — same escalation rail as Act step, inbox legibility for liability language decisions.',
      confidence: 'moderate · design intent',
    }
  }
  if (sel.kind === 'banner') {
    return {
      title: 'Notification',
      body: `${SAM_MOBILE.legalInbox.preview} — subject carries ACV and stall type so legal triages without opening CRM.`,
      confidence: 'high',
    }
  }
  if (sel.kind === 'body') {
    return {
      title: 'Message body',
      body:
        `${SAM_MOBILE.legalInbox.bodyLead} Timeline log and Maya staff footnote still pull from the same v2 deal bind Jordan published.`,
      confidence: 'moderate',
    }
  }
  return {
    title: 'Follow-up',
    body:
      sel.q === 'GC path?'
        ? "Escalate only if Chen misses 2 PM — observed policy from Sam's last three legal stalls."
        : 'AE Patel stays FYI on thread — no duplicate task in Salesforce from this path.',
    confidence: 'low',
  }
}

/** Legal ops — what lands after Sam sends from Drill (design story II). */
export function SamLegalInboxBoard() {
  const [sel, setSel] = useState<LegalSel>(null)
  const insight = useMemo(() => agentLegal(sel), [sel])

  return (
    <div className="rounded-xl border border-ink-200 bg-canvas-raised overflow-hidden">
      <div className="flex flex-col xl:flex-row xl:items-stretch">
        <div className="flex-1 min-w-0 border-b xl:border-b-0 xl:border-r border-ink-100">
          <Surface chrome="mobile">
            <div className="bg-canvas min-h-[480px] flex flex-col">
              <div className="px-4 py-3 border-b border-ink-100 bg-canvas-sunken/40">
                <div className="text-2xs font-mono uppercase tracking-[0.14em] text-ink-500">Legal · mock inbox</div>
                <div className="text-sm font-semibold text-ink-900 mt-1">M. Chen · {SAM_MOBILE.drill.legalTitle}</div>
              </div>
              <div className="p-4 space-y-3 flex-1 overflow-y-auto">
                <button
                  type="button"
                  onClick={() => setSel({ kind: 'banner' })}
                  className={`w-full text-left rounded-xl border p-3 transition-colors duration-150 ease-smooth ${
                    sel?.kind === 'banner' ? 'border-accent bg-accent-soft/35 ring-1 ring-accent/25' : 'border-ink-200 bg-canvas-raised'
                  }`}
                >
                  <div className="text-2xs font-mono text-ink-500">Coworker · just now</div>
                  <div className="text-sm font-semibold text-ink-900 mt-0.5">{SAM_MOBILE.legalInbox.subject}</div>
                  <div className="text-2xs text-ink-500 mt-1">{SAM_MOBILE.legalInbox.preview}</div>
                </button>
                <button
                  type="button"
                  onClick={() => setSel({ kind: 'body' })}
                  className={`w-full text-left rounded-xl border p-4 text-sm text-ink-800 leading-relaxed transition-colors duration-150 ease-smooth ${
                    sel?.kind === 'body' ? 'agent-card ring-2 ring-signal/30' : 'border-ink-200 bg-canvas-raised'
                  }`}
                >
                  <p className="m-0">
                    <strong>{SAM_MOBILE.drill.draft}</strong>
                  </p>
                  <p className="m-0 mt-2 text-xs text-ink-600">{SAM_MOBILE.legalInbox.bodyLead}</p>
                </button>
                <p className="text-2xs text-ink-500 font-mono m-0">Tap notification or body — dock explains recipient decisions.</p>
              </div>
            </div>
          </Surface>
        </div>
        <AgentDock
          stack
          insight={insight}
          followups={['GC path?', 'AE noise?']}
          onFollowup={q => setSel({ kind: 'followup', q })}
          onClear={() => setSel(null)}
          selectionActive={!!sel}
          productTagline="Legal handoff"
          dataSurface={SAM_AGENT_DATA_SURFACE}
        />
      </div>
    </div>
  )
}
