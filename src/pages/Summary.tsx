import { Link } from 'react-router-dom'
import { ArrowRight, Bolt } from '../components/Icons'

export default function Summary() {
  return (
    <article className="ds-page py-14">
      <header className="mb-12">
        <div className="h-eyebrow mb-4">04 · One-page summary</div>
        <h1 className="h-display mb-6">Five-day take. One-page wrap-up.</h1>
        <p className="text-lg text-ink-600">
          Approach, assumptions, tradeoffs, and what I&apos;d explore further — a short sprint on
          Tableau Coworker.
        </p>
      </header>

      <section className="prose-body">
        <h3>The thesis, restated</h3>
        <p>
          Tableau dashboards are static artifacts in a world where data is alive. The wedge here is{' '}
          <strong>surface hierarchy</strong>: the product already produces strong machine reads (see{' '}
          <span className="font-mono text-2xs">key/10-tableau-agent-with-insights.png</span>), but the
          default canvas stays a wall of widgets (
          <span className="font-mono text-2xs">key/04-exec-wall-of-widgets.png</span>). The strategy
          promotes narration, keeps charts as drill-in evidence, and uses observed usage to govern
          sprawl — not another configuration tax.
        </p>

        <h3>Wedge vs what a longer sprint would add</h3>
        <ul className="text-sm text-ink-700">
          <li>
            <strong>Wedge in this prototype:</strong> narrative-first Monday canvas, frozen v18 handoffs, visible RLS/snapshot scope on
            recipient read, capture-grounded &quot;today.&quot;
          </li>
          <li>
            <strong>vNext (not oversold here):</strong> generated-first paint without a chart scaffold; deeper permissions design in-flow;
            branching mobile states.
          </li>
          <li>
            <strong>Cut for scope:</strong> top-nav depth pages moved to footer Process links; merged flow steps where the story stayed
            intact.
          </li>
        </ul>

        <h3>Assumptions I made</h3>
        <ul>
          <li>
            <strong>Trial captures generalize to buyer pain.</strong> A Tableau Cloud walk anchors
            &quot;today&quot;; enterprise nuance varies — moderate confidence for edge cases (RLS,
            multi-site), high for exec-consumer and mobile-squish patterns.
          </li>
          <li>
            <strong>Salesforce keeps investing in Tableau + AI.</strong> If Tableau were deprioritized,
            this strategy would need a corporate chapter; not assumed here.
          </li>
          <li>
            <strong>Stakeholders accept wrong-loud narration</strong> when contestability and audit are
            visible — otherwise briefing-first defaults get rolled back quietly.
          </li>
        </ul>

        <h3>Tradeoffs I chose</h3>
        <ul>
          <li>
            <strong>Three flows, one company (Acme SaaS).</strong> Maya (CRO Monday), Jordan
            (curation), Sam (mobile) — depth over breadth.
          </li>
          <li>
            <strong>Capture-grounded critique</strong> over invented Tableau UI. If it isn&apos;t in{' '}
            <span className="font-mono text-2xs">public/captures/</span>, the prototype doesn&apos;t
            claim it.
          </li>
          <li>
            <strong>React on GitHub Pages</strong> over Figma-only — matches the JD emphasis on working
            in the codebase with agents.
          </li>
          <li>
            <strong>New visual system</strong> (
            <span className="font-mono text-2xs">plan/03-design-system.md</span>) rather than
            Tableau-blue evolution.
          </li>
        </ul>

        <h3>What I&apos;d explore with more time</h3>
        <ul>
          <li>
            <strong>Embedded analytics</strong> — deeper bake-off (Looker, Sigma, Power BI) vs
            Tableau&apos;s consumption story.
          </li>
          <li>
            <strong>Semantic layer / metrics fabric</strong> — richer Jordan flow (dbt, lineage,
            write-back).
          </li>
          <li>
            <strong>Permissions &amp; RLS</strong> — briefing composition under entitlements at scale.
          </li>
          <li>
            <strong>A11y &amp; i18n</strong> — audit pass on briefing readability and motion.
          </li>
          <li>
            <strong>Tenant migration</strong> — phased cutover for thousands of workbooks.
          </li>
        </ul>

        <h3>How I&apos;d want the on-site to go</h3>
        <p>
          Defend <strong>what loads first</strong> and <strong>how governance closes the loop</strong>{' '}
          before defending animation. Sharpest questions: who owns wrong narratives, how merges propagate
          to exec numbers, and what we measure in Phase I.
        </p>
      </section>

      <section className="mt-14 border-t border-ink-100 pt-12 not-prose">
        <h2 className="editorial text-2xl md:text-3xl text-ink-900 m-0 mb-2">Three people. One Monday morning.</h2>
        <p className="text-lg text-ink-600 m-0 mb-8 max-w-2xl">
          What should load first when the org lives in data — but nobody has time to rebuild the story from a wall of widgets?
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <Link
            to="/flows/maya"
            className="rounded-xl border border-ink-200/90 bg-canvas-raised p-4 md:p-5 shadow-lift-sm hover:border-accent/35 hover:shadow-lift transition-all duration-200 block group"
          >
            <div className="text-2xs font-mono text-ink-500 mb-2">Maya Chen · CRO</div>
            <p className="text-sm text-ink-700 m-0 leading-relaxed">
              A Monday briefing that reads before it charts — then one frozen handoff to staff, Slack, and calendar.
            </p>
            <span className="text-sm font-medium text-accent group-hover:underline mt-3 inline-block">Open Maya&apos;s flow</span>
          </Link>
          <Link
            to="/flows/jordan"
            className="rounded-xl border border-ink-200/90 bg-canvas-raised p-4 md:p-5 shadow-lift-sm hover:border-accent/35 hover:shadow-lift transition-all duration-200 block group"
          >
            <div className="text-2xs font-mono text-ink-500 mb-2">Jordan Patel · Sales Ops</div>
            <p className="text-sm text-ink-700 m-0 leading-relaxed">
              Sprawl and lineage into a curator queue — close the loop so exec numbers and mobile briefs stay on the same definitions.
            </p>
            <span className="text-sm font-medium text-accent group-hover:underline mt-3 inline-block">Open Jordan&apos;s flow</span>
          </Link>
          <Link
            to="/flows/sam"
            className="rounded-xl border border-ink-200/90 bg-canvas-raised p-4 md:p-5 shadow-lift-sm hover:border-accent/35 hover:shadow-lift transition-all duration-200 block group"
          >
            <div className="text-2xs font-mono text-ink-500 mb-2">Sam Reyes · West</div>
            <p className="text-sm text-ink-700 m-0 leading-relaxed">
              Between meetings on the phone: a West-only surface and a legal-grade receipt, not desktop chrome squeezed to thumb width.
            </p>
            <span className="text-sm font-medium text-accent group-hover:underline mt-3 inline-block">Open Sam&apos;s flow</span>
          </Link>
        </div>
      </section>

      <section className="mt-16 card-raised p-8 bg-canvas-sunken">
        <Bolt className="text-accent mb-4" size={22} />
        <div className="h-eyebrow text-accent-ink mb-2">A note on the format</div>
        <p className="text-base text-ink-800 leading-relaxed">
          Working prototype plus MD plans in-repo. Deploy:{' '}
          <span className="font-mono text-xs">npm run deploy</span> to GitHub Pages. Same artifact for
          writing, UI, and engineering judgment.
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
