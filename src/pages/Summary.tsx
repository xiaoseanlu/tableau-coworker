import { Link } from 'react-router-dom'
import { ArrowRight, Bolt } from '../components/Icons'

export default function Summary() {
  return (
    <article className="ds-page py-14">
      <header className="mb-12">
        <div className="h-eyebrow mb-4">04 · One-page summary</div>
        <h1 className="h-display mb-6">Five days on Tableau, in one pass.</h1>
        <p className="text-lg text-ink-600">
          Below is how I framed the problem, what I shipped in the prototype, and what I would do next if this were a longer engagement.
        </p>
      </header>

      <section className="prose-body">
        <h3>What I think is actually wrong</h3>
        <p>
          Tableau can already produce strong written analysis — I watched the agent do it on a real Executive Overview in trial. The
          odd part is what you see first: still a wall of charts, the same layout grammar as a decade ago. The AI sits off to the side
          until someone opens it. This exercise is about{' '}
          <strong>leading with the story</strong> and keeping charts as the place you go when you need to verify or dig in — not about
          pretending Tableau has no AI.
        </p>

        <h3>What made it into this prototype</h3>
        <ul className="text-sm text-ink-700">
          <li>
            <strong>Shipped here:</strong> Monday-morning briefings for three roles (exec, ops curator, field) on one fictional company;
            handoffs that feel like something you could paste into Slack or a deck; clear limits on who can see what (row-level security
            and “as of this snapshot”) when content leaves the author.
          </li>
          <li>
            <strong>Next version, not promised now:</strong> fully generated first screen without leaning on a traditional dashboard
            scaffold; permission edge cases exercised inside every flow; more realistic mobile states beyond the core story.
          </li>
          <li>
            <strong>Scoped down:</strong> deep navigation moved to footer “Process” links; a few steps merged where the narrative still
            read cleanly.
          </li>
        </ul>

        <h3>Assumptions I held</h3>
        <ul>
          <li>
            <strong>Trial reflects a lot of buyer pain.</strong> I used real Tableau Cloud captures for “today.” Enterprise details
            (multi-site, complex entitlements) will differ; I am more confident about exec and mobile consumer patterns than about every
            edge case.
          </li>
          <li>
            <strong>Salesforce keeps investing in Tableau.</strong> If the product were quietly deprioritized, the strategy chapter
            would change. I did not build for that case.
          </li>
          <li>
            <strong>Leaders will tolerate blunt narration if they can challenge it.</strong> Briefing-first defaults get rolled back
            when people cannot see why a number changed or who is accountable when the copy is wrong.
          </li>
        </ul>

        <h3>Tradeoffs I made on purpose</h3>
        <ul>
          <li>
            <strong>Three flows, one company (Acme SaaS).</strong> Maya (CRO), Jordan (ops), Sam (regional lead) — depth over covering
            every persona.
          </li>
          <li>
            <strong>Evidence before invention.</strong> If I could not point to something in the repo’s capture set, the prototype does
            not claim it.
          </li>
          <li>
            <strong>Shipped code on GitHub Pages</strong> instead of a deck-only deliverable — closer to how Faros described the role.
          </li>
          <li>
            <strong>A new visual language</strong> (tokens in <span className="font-mono text-2xs">tailwind.config.js</span>) rather
            than a light reskin of Tableau blue.
          </li>
        </ul>

        <h3>If I had more time</h3>
        <ul>
          <li>
            <strong>Embedded analytics</strong> — a tighter comparison with how Looker, Sigma, and Power BI show up inside other
            products next to Tableau’s consumption story.
          </li>
          <li>
            <strong>Canonical metrics and lineage</strong> — enough depth that an ops lead (Jordan-shaped) could follow a number from
            chart back to definition and change control.
          </li>
          <li>
            <strong>Permissions at scale</strong> — who may see which briefing, when definitions diverge, and how merges affect exec
            views.
          </li>
          <li>
            <strong>Accessibility and localization</strong> — motion, density, and screen-reader passes on narration-heavy layouts.
          </li>
          <li>
            <strong>Migration</strong> — how a large tenant moves from thousands of workbooks without breaking trust in the numbers.
          </li>
        </ul>

        <h3>How I would use an onsite</h3>
        <p>
          I would start with <strong>what loads first</strong> for someone who does not author dashboards for a living, and{' '}
          <strong>how governance closes the loop</strong> when a briefing is wrong or a definition changes — before spending time on
          animation. The hard questions are ownership of bad narration, how merges hit executive numbers, and what we would measure in
          a first phase.
        </p>
      </section>

      <section className="mt-14 border-t border-ink-100 pt-12 not-prose">
        <h2 className="editorial text-2xl md:text-3xl text-ink-900 m-0 mb-2">Three people. One Monday morning.</h2>
        <p className="text-lg text-ink-600 m-0 mb-8 max-w-2xl">
          When everyone lives in data but nobody has time to decode a grid of charts, what should the first screen look like?
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <Link
            to="/flows/maya"
            className="rounded-xl border border-ink-200/90 bg-canvas-raised p-4 md:p-5 shadow-lift-sm hover:border-accent/35 hover:shadow-lift transition-all duration-200 block group"
          >
            <div className="text-2xs font-mono text-ink-500 mb-2">Maya Chen · CRO</div>
            <p className="text-sm text-ink-700 m-0 leading-relaxed">
              Read the week in plain language first; then one shareable snapshot for staff, Slack, and the calendar — with scope
              spelled out.
            </p>
            <span className="text-sm font-medium text-accent group-hover:underline mt-3 inline-block">Open Maya&apos;s flow</span>
          </Link>
          <Link
            to="/flows/jordan"
            className="rounded-xl border border-ink-200/90 bg-canvas-raised p-4 md:p-5 shadow-lift-sm hover:border-accent/35 hover:shadow-lift transition-all duration-200 block group"
          >
            <div className="text-2xs font-mono text-ink-500 mb-2">Jordan Patel · Sales Ops</div>
            <p className="text-sm text-ink-700 m-0 leading-relaxed">
              Turn workbook sprawl into a curated queue — with reasons attached — so exec numbers and field briefings stay on the same
              definitions.
            </p>
            <span className="text-sm font-medium text-accent group-hover:underline mt-3 inline-block">Open Jordan&apos;s flow</span>
          </Link>
          <Link
            to="/flows/sam"
            className="rounded-xl border border-ink-200/90 bg-canvas-raised p-4 md:p-5 shadow-lift-sm hover:border-accent/35 hover:shadow-lift transition-all duration-200 block group"
          >
            <div className="text-2xs font-mono text-ink-500 mb-2">Sam Reyes · West</div>
            <p className="text-sm text-ink-700 m-0 leading-relaxed">
              On the phone between meetings: a region-only view and an audit-friendly receipt — not desktop chrome squeezed onto a phone.
            </p>
            <span className="text-sm font-medium text-accent group-hover:underline mt-3 inline-block">Open Sam&apos;s flow</span>
          </Link>
        </div>
      </section>

      <section className="mt-16 card-raised p-8 bg-canvas-sunken">
        <Bolt className="text-accent mb-4" size={22} />
        <div className="h-eyebrow text-accent-ink mb-2">Format</div>
        <p className="text-base text-ink-800 leading-relaxed">
          Running React app plus markdown specs in the same repository. Deploy: <span className="font-mono text-xs">npm run deploy</span>{' '}
          to GitHub Pages — one artifact for writing, UI, and engineering judgment.
        </p>
      </section>

      <nav className="mt-16 pt-8 border-t border-ink-100 flex items-center justify-between">
        <Link to="/flows" className="btn-ghost">
          ← Back to flows
        </Link>
        <Link to="/competitive" className="btn-primary">
          Competitive scan <ArrowRight size={14} />
        </Link>
      </nav>
    </article>
  )
}
