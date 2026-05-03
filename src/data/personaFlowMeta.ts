/**
 * Persona context for flow chrome + consistent AgentDock “Tableau surface” hints.
 * Grounded in CONTEXT.md — same company (Acme SaaS), same v2 substrate.
 */

export interface PersonaFlowContext {
  name: string
  title: string
  /** Job-to-be-done for this flow — role-appropriate, not marketing. */
  job: string
  /** Which strategic pillars this flow stresses (CONTEXT.md). */
  pillars: string[]
}

export const MAYA_FLOW_PERSONA: PersonaFlowContext = {
  name: 'Maya Chen',
  title: 'Chief Revenue Officer · Acme SaaS',
  job:
    'Before staff: what changed, what to worry about, what to say — without rebuilding the story from seven equal-weight KPIs.',
  pillars: ['Pillar 01 · generated default', 'Pillar 02 · charts explain'],
}

export const JORDAN_FLOW_PERSONA: PersonaFlowContext = {
  name: 'Jordan Patel',
  title: 'VP Sales Ops · Acme SaaS',
  job:
    'Govern tenant sprawl: stale, redundant, and drifting workbooks — merge or retire with lineage, not alphabetical lists alone.',
  pillars: ['Pillar 04 · observed personalization', 'Trust + curation'],
}

export const SAM_FLOW_PERSONA: PersonaFlowContext = {
  name: 'Sam Reyes',
  title: 'Regional Sales Director · West · Acme SaaS',
  job:
    'On the phone between meetings: West-only intelligence and one-tap escalation — not the same grid scaled to thumb width.',
  pillars: ['Pillar 03 · mobile first-class', 'Pillar 04 · learned habits'],
}

/** One line under AgentDock — how Tableau data/capabilities surface in the prototype. */
export const MAYA_AGENT_DATA_SURFACE =
  'Published marks and KPI tiles drive reads · Ask Data–class analysis, default on the canvas · RLS as in Cloud today'

export const JORDAN_AGENT_DATA_SURFACE =
  'Explore + Data Model lineage feed the queue · opens, overlaps, field drift — not a Site settings toggle'

export const SAM_AGENT_DATA_SURFACE =
  'Jordan v2 definitions + West scope · composed cards and deep links replace squeezed Executive Overview on tablet width'
