import { Link } from 'react-router-dom'
import { ArrowRight, Sparkle, Inbox, Phone } from '../components/Icons'

export default function FlowsIndex() {
  return (
    <article className="ds-page py-14">
      <header className="mb-12">
        <div className="h-eyebrow mb-4">03 · Bring it to life</div>
        <h1 className="h-display mb-6">
          Three flows. One substrate. <span className="italic text-accent">Running in the browser.</span>
        </h1>
        <p className="text-lg text-ink-600 max-w-3xl">
          Acme SaaS Inc. — same CRM + revenue data, three roles. Each flow uses real Tableau
          captures for the &quot;before&quot; and designed UI — including <strong className="text-ink-800">SVG charts you can hover</strong> (Maya),
          portfolio composition (Jordan), and spark trends (Sam) — for the proposed surface. States are scripted, not live warehouse queries.
        </p>
        <p className="mt-6 text-sm max-w-3xl">
          <Link to="/design-system" className="text-accent font-semibold hover:underline underline-offset-2">
            Design system →
          </Link>{' '}
          <span className="text-ink-600">
            Tokens, viz roles, capture-to-component map, and interaction matrices — same React modules the flows import.
          </span>
        </p>
        <p className="mt-6 text-sm text-ink-700 max-w-3xl leading-relaxed border-l-2 border-accent/35 pl-4">
          <strong className="text-ink-900">Depth strategy:</strong> sharpen the flagship beats by merging redundant steps (hand-off as one
          surface with split views; Jordan &quot;Out&quot; as notify + Finance read) instead of padding every flow with extra scenes — Sam
          still gets a distinct squish-first open so mobile pain isn&apos;t a third wallpaper.
        </p>
      </header>

      <section className="space-y-8">
        <FlowOpener
          to="/flows/maya"
          number="01"
          icon={<Sparkle className="text-accent" size={22} />}
          title="Maya — living surface, then handoff"
          subtitle="Two design stories: narrative-first canvas + evidence; then share, dual hand-off, calendar."
          shows={['Design I · narrative leads + drill', 'Design II · share + dual surfaces', 'Acme SaaS · Q2 · v18 data']}
          description="Five beats: capture → living canvas (narrative default, presets, drill + Agent receipt) → compose handoff → Slack + Jordan inbox side-by-side → Calendar. Same numbers end-to-end."
          surfaces={['Web · Tableau + Coworker', 'Slack · mock', 'Calendar · mock']}
        />

        <FlowOpener
          to="/flows/jordan"
          number="02"
          icon={<Inbox className="text-accent" size={22} />}
          title="Jordan — Tenant loop, then broadcast"
          subtitle="Two design stories: sprawl → queue → diagnose → resolve; then broadcast + Finance in one arc."
          shows={['Design I · jump states + dock', 'Design II · notify + inbox', 'Pillar 04 · observed flags']}
          description="Five beats: sprawl, queue, diagnose (key/02), resolve — then one &quot;Out&quot; step: stakeholder notify + Finance recipient mail side-by-side. Same audit id as Maya&apos;s substrate."
          surfaces={['Web · workbook + queue + notify', 'Web · recipient inbox']}
        />

        <FlowOpener
          to="/flows/sam"
          number="03"
          icon={<Phone className="text-accent" size={22} />}
          title="Sam — Mobile surface, then legal inbox"
          subtitle="Two design stories: squished capture → brief → drill → act; then legal recipient read."
          shows={['Design I · presets + thumb dock', 'Design II · Chen inbox', 'key/05 squish receipt']}
          description="Five beats: single squished capture frame (key/05, no tap grid) — then brief presets, Acme drill + Send, receipt, M. Chen legal inbox. Same draft object as the Act step."
          surfaces={['Mobile · briefing', 'Mobile · legal handoff']}
        />
      </section>

      <section className="mt-20 card-raised p-8">
        <div className="h-eyebrow mb-3">Interaction model</div>
        <p className="prose-body text-base">
          State advances through a fixed script: the goal is to pressure-test layout, dock behavior, and capture-to-UI
          continuity — not to impersonate a signed-in warehouse session. Pilot-grade next steps would add branching, persisted
          local state, and a scrubber for replay.
        </p>
        <p className="text-sm text-ink-600 mt-4 m-0">
          Evidence trail (trial capture walkthrough):{' '}
          <Link to="/authoring" className="text-accent-ink font-semibold hover:underline">
            Authoring concept
          </Link>
        </p>
      </section>
    </article>
  )
}

function FlowOpener({ to, number, icon, title, subtitle, shows, description, surfaces }: {
  to: string; number: string; icon: React.ReactNode; title: string; subtitle: string;
  shows: string[]; description: string; surfaces: string[]
}) {
  return (
    <Link to={to} className="block card-raised p-8 group hover:border-accent/40 transition-all">
      <div className="grid md:grid-cols-[auto_1fr_auto] gap-8 items-start">
        <div className="flex md:flex-col items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-accent-soft grid place-items-center">
            {icon}
          </div>
          <div className="font-mono text-xs text-ink-400">Flow {number}</div>
        </div>

        <div>
          <h3 className="text-2xl editorial text-ink-900 mb-1 group-hover:text-accent transition-colors">{title}</h3>
          <p className="text-base text-ink-600 mb-4 italic">{subtitle}</p>
          <p className="text-sm text-ink-700 leading-relaxed mb-5">{description}</p>
          <div className="flex flex-wrap gap-2">
            {shows.map(s => (
              <span key={s} className="pill bg-ink-100 text-ink-700">{s}</span>
            ))}
          </div>
        </div>

        <div className="flex md:flex-col items-end md:items-end gap-3 shrink-0">
          <div className="text-2xs uppercase tracking-wider text-ink-500">Surfaces</div>
          <div className="flex md:flex-col gap-1.5">
            {surfaces.map(s => (
              <span key={s} className="text-xs text-ink-600 font-mono">{s}</span>
            ))}
          </div>
          <div className="md:mt-auto pt-2 text-sm text-accent flex items-center gap-1.5">
            Open <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  )
}
