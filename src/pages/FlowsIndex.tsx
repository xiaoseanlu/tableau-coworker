import { Link } from 'react-router-dom'
import { ArrowRight, Sparkle, Inbox, Phone } from '../components/Icons'

export default function FlowsIndex() {
  return (
    <article className="ds-page py-14">
      <header className="mb-12">
        <div className="h-eyebrow mb-4">03 · Bring it to life</div>
        <h1 className="h-display mb-6">
          Three flows. One substrate. <span className="italic text-accent">Real React.</span>
        </h1>
        <p className="text-lg text-ink-600 max-w-3xl">
          Acme SaaS Inc. — same CRM + revenue data, three roles. Each flow uses real Tableau
          captures for the &quot;before&quot; and designed UI — including <strong className="text-ink-800">SVG charts you can hover</strong> (Maya),
          portfolio composition (Jordan), and spark trends (Sam) — for the proposed surface. Scripted steps,
          not live warehouse queries.
        </p>
      </header>

      <section className="space-y-8">
        <FlowOpener
          to="/flows/maya"
          number="01"
          icon={<Sparkle className="text-accent" size={22} />}
          title="Maya — living surface, then handoff"
          subtitle="Two design stories: one canvas + agent dock; then Slack, Calendar, link."
          shows={['Design I · living canvas', 'Design II · share + recipient', 'Acme SaaS · Q2 · v18 data']}
          description="Seven beats: capture receipt → interactive canvas with jump states + evidence → compose handoff (toggles + preview) → Slack message shape → Jordan’s shared read → Calendar block. Numbers and deal context stay consistent across surfaces."
          surfaces={['Web · Tableau + Coworker', 'Slack · mock', 'Calendar · mock']}
        />

        <FlowOpener
          to="/flows/jordan"
          number="02"
          icon={<Inbox className="text-accent" size={22} />}
          title="Jordan — Tenant loop, then broadcast"
          subtitle="Two design stories: sprawl → queue → diagnose → resolve; then Slack, mail, Finance inbox."
          shows={['Design I · jump states + dock', 'Design II · audit-led broadcast', 'Pillar 04 · observed flags']}
          description="Six beats: Superstore-backed sprawl, computed queue with portfolio + tiles, Finance drift diagnosis (key/02), closure receipt, then stakeholder notify + Finance recipient mail — same audit id as Maya&apos;s substrate."
          surfaces={['Web · workbook + queue + notify', 'Web · recipient inbox']}
        />

        <FlowOpener
          to="/flows/sam"
          number="03"
          icon={<Phone className="text-accent" size={22} />}
          title="Sam — Mobile surface, then legal inbox"
          subtitle="Two design stories: squished capture → brief → drill → act; then legal recipient read."
          shows={['Design I · presets + thumb dock', 'Design II · Chen inbox', 'key/05 squish receipt']}
          description="Five beats: Executive Overview on phone (key/05), West briefing cards, Acme drill with Send, receipt + watcher, then M. Chen&apos;s Coworker mail — same draft object as the Act step."
          surfaces={['Mobile · briefing', 'Mobile · legal handoff']}
        />
      </section>

      <section className="mt-20 card-raised p-8">
        <div className="h-eyebrow mb-3">A note on what these are — and aren&apos;t</div>
        <p className="prose-body text-base">
          These are <em>storyboarded interactive prototypes.</em> The state is scripted: clicking
          through advances a capture-backed narrative rather than mutating real data. That is
          deliberate for a time-boxed exploration — the review is interaction model and evidence, not production
          hardening. With more time: branching paths, local state persistence, and a timeline scrubber
          for walkthroughs.
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
