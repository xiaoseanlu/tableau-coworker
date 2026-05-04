import { Link } from 'react-router-dom'

const CAP = `${import.meta.env.BASE_URL}captures/`

/**
 * Opinion page: first-time web authoring in Tableau Cloud — grounded in trial captures
 * (flow-b-first-authoring + key/02), not fantasy chrome.
 */
export default function AuthoringConcepts() {
  return (
    <article className="ds-page py-12 md:py-16 text-ink-900">
      <header className="max-w-3xl mb-14 md:mb-16">
        <div className="h-eyebrow mb-3">Analyst workflow · concept</div>
        <h1 className="h-display mb-5">The first chart shouldn&apos;t feel like filing taxes.</h1>
        <p className="text-lg text-ink-600 leading-relaxed">
          Tableau is excellent once you&apos;re fluent. The trial shows a harder problem: a blank web sheet, a data modal, and a shelf
          language you learn by trial and error. This page is what we&apos;d try next — still honest about power users, but with a clearer
          path for everyone else.
        </p>
        <p className="text-sm text-ink-500 mt-4 max-w-2xl leading-relaxed">
          Every screenshot below is from{' '}
          <span className="font-mono text-2xs">public/captures/flow-b-first-authoring/</span> or{' '}
          <span className="font-mono text-2xs">key/02-web-authoring.png</span>. No mockups pretending to be product.
        </p>
      </header>

      <section className="mb-16 md:mb-20" aria-labelledby="trial-heading">
        <h2 id="trial-heading" className="h-section mb-3">
          What we saw in the trial
        </h2>
        <p className="text-ink-600 max-w-2xl mb-10 leading-relaxed">
          Three beats that keep showing up for first-time authors. They&apos;re not bugs — they&apos;re design choices with a steep learning
          curve.
        </p>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          <EvidenceCard
            src={`${CAP}flow-b-first-authoring/01-blank-canvas.png`}
            alt="Tableau web — Connect to Data before canvas is visible"
            title="Data before canvas"
            body="You start in connector land. Hard to picture the chart you’re building when the sheet isn’t there yet."
          />
          <EvidenceCard
            src={`${CAP}flow-b-first-authoring/07-chart-builder-shelves.png`}
            alt="Tableau web — shelves, Show Me, and fields competing for attention"
            title="Shelf noise"
            body="Columns, Rows, Marks, and Show Me all ask for decisions at once. Easy to bottleneck."
          />
          <EvidenceCard
            src={`${CAP}key/02-web-authoring.png`}
            alt="Tableau web authoring with Tableau Agent affordance on the sheet"
            title="Help shows up as a tooltip"
            body="Agent is real — but it reads as an add-on over the same dense shell instead of pacing how you learn the canvas."
          />
        </div>
      </section>

      <section className="border-t border-ink-100 pt-14 md:pt-16 mb-14" aria-labelledby="direction-heading">
        <h2 id="direction-heading" className="h-section mb-3">
          What we&apos;d try
        </h2>
        <p className="text-ink-600 max-w-2xl mb-10 leading-relaxed">
          Not a new product — a tighter runway. Goal, then fields, then one clear “best” lane for the drop, then publish with a recap
          so the sheet isn’t a black box for the people who need to sign off.
        </p>
        <ol className="max-w-2xl space-y-6 list-none p-0 m-0">
          <RunwayStep n={1} title="Name the outcome first" body="Plain-language goal on the left — “US sales by state, bubble map” — so field search can rank toward that intent, not A–Z." />
          <RunwayStep n={2} title="One lane lights up" body="While dragging, valid shelves glow; the lane that gets you unstuck fastest gets the obvious ring. Same info as coach marks, less obscuring the viz." />
          <RunwayStep n={3} title="Coworker reads sheet state" body="Narration tracks what’s on rows, columns, and marks — not a separate chat you hunt for after you’re stuck." />
          <RunwayStep n={4} title="Publish is a receipt" body="Before ship: what changed, what’s on canvas, who should get the view — so publish isn’t a mis-click away from a confusing default name." />
        </ol>
      </section>

      <section className="rounded-2xl border border-ink-200/90 bg-canvas-raised p-6 md:p-8 shadow-lift-sm ring-1 ring-ink-900/[0.03]">
        <h2 className="text-base font-semibold text-ink-900 mb-2">Where this lives in the rest of the site</h2>
        <p className="text-sm text-ink-600 mb-5 m-0 leading-relaxed">
          Tokens and component ideas are in the design system. The strategic “why” is in What&apos;s broken and Strategy. Interactive
          proof is in the three persona flows — Maya’s canvas is the exec read, not the author shell.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/design-system" className="btn-secondary text-sm">
            Design system
          </Link>
          <Link to="/whats-broken" className="btn-secondary text-sm">
            What&apos;s broken
          </Link>
          <Link to="/flows" className="btn-primary text-sm">
            Flows
          </Link>
        </div>
      </section>
    </article>
  )
}

function EvidenceCard({ src, alt, title, body }: { src: string; alt: string; title: string; body: string }) {
  return (
    <figure className="m-0 rounded-xl border border-ink-200/90 bg-canvas-raised overflow-hidden shadow-lift-sm ring-1 ring-ink-900/[0.025]">
      <div className="aspect-[16/11] bg-canvas-sunken border-b border-ink-100">
        <img src={src} alt={alt} className="h-full w-full object-cover object-top" loading="lazy" />
      </div>
      <figcaption className="p-4">
        <div className="text-sm font-semibold text-ink-900 mb-1.5">{title}</div>
        <p className="text-xs text-ink-600 m-0 leading-relaxed">{body}</p>
      </figcaption>
    </figure>
  )
}

function RunwayStep({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <li className="flex gap-4">
      <span
        className="shrink-0 w-8 h-8 rounded-full bg-accent-soft text-accent-ink font-mono text-sm font-semibold grid place-items-center border border-accent/20"
        aria-hidden
      >
        {n}
      </span>
      <div>
        <h3 className="text-sm font-semibold text-ink-900 m-0 mb-1">{title}</h3>
        <p className="text-sm text-ink-600 m-0 leading-relaxed">{body}</p>
      </div>
    </li>
  )
}
