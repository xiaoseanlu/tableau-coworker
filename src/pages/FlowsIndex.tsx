import { Link } from 'react-router-dom'
import { ArrowRight, Sparkle, Inbox, Phone } from '../components/Icons'

export default function FlowsIndex() {
  return (
    <article className="max-w-5xl mx-auto px-6 py-14">
      <header className="mb-12">
        <div className="h-eyebrow mb-4">03 · Bring it to life</div>
        <h1 className="h-display mb-6">
          Three flows. One substrate. <span className="italic text-accent">Real React.</span>
        </h1>
        <p className="text-lg text-ink-600 max-w-3xl">
          Acme SaaS Inc. — same CRM + revenue data, three roles. Each flow uses real Tableau
          captures for the &quot;before&quot; and native UI for the proposed surface. Scripted steps,
          not live warehouse queries.
        </p>
      </header>

      <section className="space-y-8">
        <FlowOpener
          to="/flows/maya"
          number="01"
          icon={<Sparkle className="text-accent" size={22} />}
          title="Maya — Monday briefing"
          subtitle="The narrative replaces the wall of widgets."
          shows={['Pillar 01 · generated landing', 'Pillar 02 · chart as evidence', 'Pillar 04 · why am I seeing this']}
          description="Maya Chen, CRO, has eighteen minutes before exec staff. Today she gets the Superstore Executive Overview — KPIs, map, trends, no story. Tomorrow she lands on a composed briefing with three metrics, three things-for-staff, and drill-down that cites what the agent checked. End state: save and forward as text, not a screenshot."
          surfaces={['Web · Tableau Cloud']}
        />

        <FlowOpener
          to="/flows/jordan"
          number="02"
          icon={<Inbox className="text-accent" size={22} />}
          title="Jordan — Curation queue"
          subtitle="Governance from observed usage."
          shows={['Pillar 01 · queue as home', 'Pillar 04 · flags without a settings tab', 'Canonical metric repair']}
          description="Jordan Patel, VP Sales Ops, owns the definitions Maya&apos;s cards rely on. Sprawl is visible in the trial (nine views in one workbook); admin lists people, not trust scores. The proposed flow opens on a prioritized queue — stale, duplicate, data-quality — then diagnoses one item against authoring + Tableau Agent, and closes the loop so downstream briefings update."
          surfaces={['Web · workbook + queue']}
        />

        <FlowOpener
          to="/flows/sam"
          number="03"
          icon={<Phone className="text-accent" size={22} />}
          title="Sam — Mobile between meetings"
          subtitle="Region scope, thumb scale."
          shows={['Pillar 03 · mobile first-class', 'Pillar 04 · Tuesday habit', 'Exception, not desktop squish']}
          description="Sam Reyes, West regional sales director, operates on exceptions. Today the Executive Overview on phone is the desktop sheet squeezed (flow-e captures). Tomorrow: push or open to a region briefing — stuck deals, wins, forecast risk — with one-tap actions. Same numbers Jordan curates and Maya sees rolled up."
          surfaces={['Mobile · briefing shell']}
        />
      </section>

      <section className="mt-20 card-raised p-8">
        <div className="h-eyebrow mb-3">A note on what these are — and aren&apos;t</div>
        <p className="prose-body text-base">
          These are <em>storyboarded interactive prototypes.</em> The state is scripted: clicking
          through advances a capture-backed narrative rather than mutating real data. That is
          deliberate for a take-home — the review is interaction model and evidence, not production
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
