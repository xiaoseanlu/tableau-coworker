import { Link } from 'react-router-dom'
import { ArrowRight } from '../components/Icons'

export default function Summary() {
  return (
    <article className="ds-page py-14">
      <header className="mb-12">
        <div className="h-eyebrow mb-4">04 · How I&apos;d sum this up</div>
        <h1 className="h-display mb-6">Five days on Tableau. Here’s how I’d explain it.</h1>
        <p className="text-lg text-ink-600">
          I’m compressing the frame, what I shipped in the prototype, and what I’d chase next — the way I’d walk a colleague through the folder before we debate details.
        </p>
      </header>

      <section className="prose-body">
        <h3>What bothers me about Tableau right now</h3>
        <p>
          I watched the agent write a solid read on a real Executive Overview in trial. Tableau clearly can do that work.
          What I keep tripping on is what loads first: still a wall of charts, laid out like it’s 2015. The model’s off to the side
          until someone goes looking. I’m not arguing they lack AI — I’m arguing they bury the payoff. I’d rather open on the short
          story and drop to charts when I need to verify or argue, not the other way around.
        </p>

        <h3>What I actually shipped here</h3>
        <ul className="text-sm text-ink-700">
          <li>
            <strong>I stayed in one fictional company.</strong> Three Monday-style paths: Maya reads, Jordan curates, Sam checks West
            on a phone. Each one gets handoffs I’d plausibly paste into Slack or a deck, and I call out who can see what (row-level
            security and “snapshot as of”) when the thing leaves the author.
          </li>
          <li>
            <strong>I stopped where honesty demanded.</strong> I didn’t promise a fully generated first screen with no dashboard
            scaffold; I didn’t exhaust every permission edge case. Those are the next lap.
          </li>
          <li>
            <strong>I cut nav noise.</strong> Deep process stuff lives in the footer; I merged steps where the story still held. Scope
            was the friend of clarity.
          </li>
        </ul>

        <h3>What I assumed</h3>
        <ul>
          <li>
            <strong>Trial maps to a lot of buyer reality.</strong> I anchored “today” in Tableau Cloud captures. Big-tenant weirdness
            will differ. I’m more sure about exec and mobile pain than about every entitlement edge — say moderate confidence there.
          </li>
          <li>
            <strong>Salesforce doesn’t walk away from Tableau.</strong> If that changed, I’d rewrite the strategy. I didn’t design for
            a sunset scenario.
          </li>
          <li>
            <strong>Briefings only stick if people can fight them.</strong> If execs can’t see why a number moved or who owns a bad
            sentence, the org quietly reverts to tiles. I’m not fully sold that every culture tolerates blunt machine copy; I’m sold
            that hiding it isn’t the answer.
          </li>
        </ul>

        <h3>Tradeoffs I’m willing to defend</h3>
        <ul>
          <li>
            <strong>Three flows beat twelve personas.</strong> Depth on Maya, Jordan, Sam beat a shallow tour of every job title.
          </li>
          <li>
            <strong>I didn’t invent Tableau behavior I couldn’t show.</strong> No screenshot in `public/captures/`, no claim in the UI.
            That was the easy ethical line; it cost me some flashy fiction.
          </li>
          <li>
            <strong>I shipped React on Pages.</strong> Faros asked for someone who works in the codebase; a PDF would’ve missed the
            point.
          </li>
          <li>
            <strong>I rejected “Tableau blue, slightly rounder.”</strong> New tokens live in <span className="font-mono text-2xs">tailwind.config.js</span>.
            I wanted the craft to read as intentional, not cosmetic.
          </li>
        </ul>

        <h3>If I had another month</h3>
        <ul>
          <li>
            <strong>Embedded analytics bake-off.</strong> I’d pressure-test how Looker, Sigma, and Power BI show up inside other
            products against Tableau’s reader story — with receipts, not vibes.
          </li>
          <li>
            <strong>Lineage Jordan can follow.</strong> Enough path from a chart back to definition and change control that ops doesn’t
            live in email archaeology.
          </li>
          <li>
            <strong>Permissions pressure.</strong> Diverging definitions, merges, exec views — I barely scratched the scary cases.
          </li>
          <li>
            <strong>A11y and i18n.</strong> Narration-heavy layouts need a real audit pass; I didn’t pretend that’s done.
          </li>
          <li>
            <strong>Moving a real company off thousands of old dashboards.</strong> Big customers can&apos;t flip a switch. I&apos;d want
            a phased plan (what ships when, how you prove numbers still match, how you retire duplicates) so nobody wakes up one day and
            stops trusting the org&apos;s figures.
          </li>
        </ul>
      </section>

      <section className="mt-14 border-t border-ink-100 pt-12 not-prose">
        <h2 className="editorial text-2xl md:text-3xl text-ink-900 m-0 mb-2">Three people. One Monday morning.</h2>
        <p className="text-lg text-ink-600 m-0 mb-8 max-w-2xl">
          Everyone’s drowning in data. Almost nobody has time to decode a dozen tiles before the staff meeting. What should the first screen
          do for them?
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <Link
            to="/flows/maya"
            className="rounded-xl border border-ink-200/90 bg-canvas-raised p-4 md:p-5 shadow-lift-sm hover:border-accent/35 hover:shadow-lift transition-all duration-200 block group"
          >
            <div className="text-2xs font-mono text-ink-500 mb-2">Maya Chen · CRO</div>
            <p className="text-sm text-ink-700 m-0 leading-relaxed">
              I’d give her the week in words first, then one frozen packet for staff, Slack, and the calendar — scope included so nobody
              quotes the wrong cut.
            </p>
            <span className="text-sm font-medium text-accent group-hover:underline mt-3 inline-block">Open Maya&apos;s flow</span>
          </Link>
          <Link
            to="/flows/jordan"
            className="rounded-xl border border-ink-200/90 bg-canvas-raised p-4 md:p-5 shadow-lift-sm hover:border-accent/35 hover:shadow-lift transition-all duration-200 block group"
          >
            <div className="text-2xs font-mono text-ink-500 mb-2">Jordan Patel · Sales Ops</div>
            <p className="text-sm text-ink-700 m-0 leading-relaxed">
              I’d turn workbook sprawl into a queue where every row says why it’s there, so field briefs and exec decks don’t drift to
              cousin definitions.
            </p>
            <span className="text-sm font-medium text-accent group-hover:underline mt-3 inline-block">Open Jordan&apos;s flow</span>
          </Link>
          <Link
            to="/flows/sam"
            className="rounded-xl border border-ink-200/90 bg-canvas-raised p-4 md:p-5 shadow-lift-sm hover:border-accent/35 hover:shadow-lift transition-all duration-200 block group"
          >
            <div className="text-2xs font-mono text-ink-500 mb-2">Sam Reyes · West</div>
            <p className="text-sm text-ink-700 m-0 leading-relaxed">
              Between meetings on his phone: West-only, thumb-friendly, with a receipt that holds up if Legal asks — not desktop chrome
              squeezed to fit.
            </p>
            <span className="text-sm font-medium text-accent group-hover:underline mt-3 inline-block">Open Sam&apos;s flow</span>
          </Link>
        </div>
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
