import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkle } from '../components/Icons'
import MayaInteractiveDashboard from '../components/dashboard/MayaInteractiveDashboard'

const CAP = `${import.meta.env.BASE_URL}captures/`

const DESIGN_DOC_HREF = import.meta.env.VITE_GITHUB_URL
  ? `${String(import.meta.env.VITE_GITHUB_URL).replace(/\/$/, '')}/blob/main/DESIGN.md`
  : null

export default function Home() {
  return (
    <div>
      {/* Thesis + proof — first scroll is the build, not the process */}
      <section className="relative overflow-hidden bg-canvas-raised border-b border-ink-100">
        <div className="surface-hero absolute inset-0 pointer-events-none opacity-[0.92]" aria-hidden />
        <div className="grid-backdrop absolute inset-0 opacity-40 pointer-events-none" aria-hidden />
        <div className="ds-page pt-12 md:pt-16 pb-14 md:pb-16 relative">
          <div className="max-w-3xl">
            <div className="h-eyebrow mb-4">Tableau Coworker · Acme SaaS</div>
            <h1 className="h-display mb-5">
              Tableau dashboards are static artifacts<br />
              in a world where data is alive.<br />
              <span className="text-accent italic">The next Tableau is a living surface.</span>
            </h1>
            <p className="text-base md:text-lg text-ink-600 max-w-2xl mb-6 leading-relaxed">
              Real trial capture on the left; the same Monday brief as an interactive Coworker canvas on the right —{' '}
              <strong className="text-ink-800">Maya, Jordan, Sam</strong> flows carry one v18 narrative through handoff and mobile.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              <Link to="/whats-broken" className="btn-primary">
                Start with what&apos;s broken <ArrowRight size={14} />
              </Link>
              <Link to="/flows/maya" className="btn-secondary">
                Open Maya flow <ArrowRight size={14} />
              </Link>
              <Link to="/design-system" className="btn-secondary">
                Design system <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="border-t border-ink-200 pt-10 md:pt-12">
            <div className="h-eyebrow mb-3">Thesis, rendered</div>
            <h2 className="h-section max-w-3xl mb-2">Same Executive Overview numbers — a different default read</h2>
            <p className="text-ink-600 max-w-3xl mb-8 leading-relaxed text-sm md:text-base">
              Left: capture from the trial (
              <span className="font-mono text-2xs">key/04-exec-wall-of-widgets.png</span>) — density without a single articulated read.
              Right: the thesis layout for Maya — narrative leads; charts are evidence; Coworker copy stays a slim strip here so you
              can see the canvas (full dock + handoffs in the flow).
            </p>
            <div className="grid lg:grid-cols-2 gap-6 items-start">
              <div>
                <div className="text-2xs font-mono uppercase tracking-wide text-ink-500 mb-2">Today · capture</div>
                <img
                  src={`${CAP}key/04-exec-wall-of-widgets.png`}
                  alt="Tableau Executive Overview — dense widget wall"
                  className="w-full rounded-xl border border-ink-200/90 shadow-lift-sm ring-1 ring-ink-900/[0.04]"
                />
              </div>
              <div className="min-w-0">
                <div className="text-2xs font-mono uppercase tracking-wide text-ink-500 mb-2">Coworker · thesis layout</div>
                <div className="max-h-[min(70vh,560px)] overflow-y-auto overflow-x-hidden rounded-xl border border-ink-200/90 shadow-lift ring-1 ring-ink-900/[0.045] bg-canvas">
                  <MayaInteractiveDashboard initialLayout="narrativeLeads" compactHero homeEmbed />
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/flows/maya" className="btn-primary text-sm">
                Full Maya walkthrough <ArrowRight size={14} />
              </Link>
              <Link to="/flows" className="btn-secondary text-sm">
                All three flows
              </Link>
              <Link to="/design-system" className="btn-secondary text-sm">
                Design system — tokens &amp; demos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Three pillars TL;DR */}
      <section className="border-t border-ink-100/90 bg-canvas-sunken/35">
        <div className="ds-page py-16">
          <div className="h-eyebrow mb-3">Four strategic bets</div>
          <h2 className="h-section max-w-3xl mb-12">
            Tableau already ships strong AI. The shell still treats the 2015
            dashboard as the default state. These pillars invert that hierarchy.
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Pillar
              num="01"
              title="The default dashboard is generated, not configured."
              body="Composed for role, recency, and what changed — not empty home cards and a hunt through Explore. The tradeoff is honest: we demote the blank-slate builder fantasy for consumers who never wanted it."
            />
            <Pillar
              num="02"
              title="Every chart explains itself."
              body="The narrative is the surface; the viz is evidence. Anomalies and reads show up with the metric, not after someone finds Tableau Agent in the toolbar."
            />
            <Pillar
              num="03"
              title="Three modes, all first-class."
              body="Mouse drill, mobile briefing, inline next-question prompts — conversation is a modality, not a chatbot that replaces the canvas."
            />
            <Pillar
              num="04"
              title="Personalization is observed, not configured."
              body="No admin-built dashboard cascade. The system learns what people open, skip, and return to; every adaptive choice exposes a &quot;why am I seeing this?&quot; line."
            />
          </div>

          <div className="mt-12 pt-8 border-t border-ink-100">
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-md bg-signal-soft text-signal-ink grid place-items-center shrink-0">
                <Sparkle size={16} />
              </div>
              <div>
                <div className="text-sm font-semibold text-ink-900 mb-1">Evidence, not vibes</div>
                <p className="text-sm text-ink-600 max-w-2xl">
                  The critique on <Link to="/whats-broken" className="text-accent hover:underline">What&apos;s broken</Link>{' '}
                  cites real captures from a Tableau Cloud trial (<span className="font-mono text-2xs">public/captures/</span>).
                  If a claim isn&apos;t tied to a file, we don&apos;t ship the claim.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Depth — footer “Keep reading” links */}
      <section className="border-t border-ink-100 bg-canvas">
        <div className="ds-page py-12 md:py-14">
          <h2 className="text-lg font-semibold text-ink-900 max-w-3xl mb-3">
            Tokens, captures, and written rationale
          </h2>
          <p className="text-sm text-ink-600 max-w-3xl mb-5 leading-relaxed">
            Each flow opens on <strong className="text-ink-800">screenshots from the trial</strong>, then transitions to designed surfaces
            with working charts. Type, color, and pain-to-pattern mapping:{' '}
            {DESIGN_DOC_HREF ? (
              <a href={DESIGN_DOC_HREF} className="text-accent-ink font-medium hover:underline" target="_blank" rel="noreferrer">
                DESIGN.md
              </a>
            ) : (
              <span className="font-mono text-2xs">DESIGN.md</span>
            )}
            . Live token reference:{' '}
            <Link to="/design-system" className="text-accent-ink font-medium hover:underline">
              Design system
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Flow trailers */}
      <section className="ds-page py-20">
        <div className="h-eyebrow mb-3">Three flows, brought to life</div>
        <h2 className="h-section max-w-3xl mb-10">
          Each flow is one continuous Acme SaaS story: trial capture first, then the Coworker surface for that persona — no decorative
          charts on these cards; proof lives inside the flows.
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <FlowCard
            to="/flows/maya"
            number="Flow 01"
            title="Maya — surface, then handoff"
            blurb="Five beats: capture → narrative-first canvas + evidence drill → share sheet → Slack + Jordan inbox → Calendar. Demo data is one consistent Acme SaaS Q2 brief (v18)."
            tag="Maya Chen · CRO"
            preview={
              <FlowTeaser
                beat="Story arc"
                detail="West Q2 brief in one composed surface — same numbers as the wall; order and narration invert."
              />
            }
          />
          <FlowCard
            to="/flows/jordan"
            number="Flow 02"
            title="Jordan — the curator queue"
            blurb="VP Sales Ops triages sprawl: portfolio mix, stale workbooks, duplicates, and data-quality flags from observed usage."
            tag="Jordan Patel · Sales Ops"
            preview={
              <FlowTeaser
                beat="Story arc"
                detail="Queue and diagnose loop on Jordan’s Superstore-grade sprawl — merge targets and lineage surface in-flow."
              />
            }
          />
          <FlowCard
            to="/flows/sam"
            number="Flow 03"
            title="Sam — mobile, between meetings"
            blurb="Opens on real mobile squish (key/05), then Coworker brief, drill, Send, and legal inbox — same pre-draft object Maya and Jordan hand off."
            tag="Sam Reyes · West RSD"
            preview={
              <FlowTeaser
                beat="Story arc"
                detail="Thumb-width brief → Acme drill → receipt — legal sees the same escalation rails as desktop handoffs."
              />
            }
          />
        </div>
      </section>

      {/* Reading order */}
      <section className="border-t border-ink-100 bg-canvas-sunken">
        <div className="ds-page py-14">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <div className="h-eyebrow mb-3">How to read this</div>
              <h3 className="editorial text-2xl text-ink-900 mb-4">
                If you have 5 minutes, read the summary. If you have 25, read everything.
              </h3>
              <p className="prose-body text-base">
                Read in order: diagnosis, bet, proof.
                Design system, the authoring concept page, and competitive notes live under <strong className="font-medium text-ink-800">Keep reading</strong> in the footer.
              </p>
            </div>
            <div className="space-y-3">
              <ReadCard num="1" to="/whats-broken" title="What's broken today"     mins="6 min" />
              <ReadCard num="2" to="/strategy"     title="Strategy for the future" mins="7 min" />
              <ReadCard num="3" to="/flows"        title="The three flows"          mins="10 min · interactive" />
              <ReadCard num="4" to="/summary" title="Summary &amp; next steps" mins="2 min" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

/** Flow index cards: prose + left accent — avoids orphan sparklines that implied the wrong metric per persona. */
function FlowTeaser({ beat, detail }: { beat: string; detail: string }) {
  return (
    <div className="rounded-lg border border-ink-200/80 border-l-[3px] border-l-accent/55 bg-canvas-sunken/35 px-3 py-2.5">
      <div className="text-2xs font-mono uppercase tracking-[0.12em] text-ink-500">{beat}</div>
      <p className="text-xs text-ink-800 m-0 mt-1 leading-snug">{detail}</p>
    </div>
  )
}

function Pillar({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-ink-200/85 bg-canvas-raised p-6 md:p-7 shadow-lift-sm ring-1 ring-ink-900/[0.03] motion-safe:transition-shadow motion-safe:duration-200 hover:shadow-lift">
      <div className="text-2xs font-mono text-accent mb-2">{num}</div>
      <h3 className="text-lg font-semibold text-ink-900 mb-3 leading-snug">{title}</h3>
      <p className="text-sm text-ink-600 leading-relaxed">{body}</p>
    </div>
  )
}

function FlowCard({
  to,
  number,
  title,
  blurb,
  tag,
  preview,
}: {
  to: string
  number: string
  title: string
  blurb: string
  tag: string
  preview?: ReactNode
}) {
  return (
    <Link to={to} className="card hover:border-accent/35 hover:shadow-lift hover:ring-accent/10 p-6 md:p-7 group block">
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xs font-mono text-ink-400">{number}</span>
        <span className="pill bg-accent-soft text-accent-ink">{tag}</span>
      </div>
      {preview ? <div className="mb-4">{preview}</div> : null}
      <h3 className="text-lg font-semibold text-ink-900 mb-2 group-hover:text-accent transition-colors">{title}</h3>
      <p className="text-sm text-ink-600 leading-relaxed mb-5">{blurb}</p>
      <div className="text-sm text-accent flex items-center gap-1.5">
        Open the flow <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
      </div>
    </Link>
  )
}

function ReadCard({ num, to, title, mins }: { num: string; to: string; title: string; mins: string }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-4 p-4 md:p-5 bg-canvas-raised border border-ink-200/90 rounded-xl shadow-lift-sm ring-1 ring-ink-900/[0.025] hover:border-accent/40 hover:shadow-lift motion-safe:transition-all motion-safe:duration-200 group"
    >
      <div className="w-7 h-7 rounded-full bg-ink-100 text-ink-500 grid place-items-center text-xs font-mono shrink-0 group-hover:bg-accent-soft group-hover:text-accent-ink transition-colors">
        {num}
      </div>
      <div className="flex-1 text-sm font-medium text-ink-800" dangerouslySetInnerHTML={{ __html: title }} />
      <div className="text-xs text-ink-400">{mins}</div>
      <ArrowRight size={14} className="text-ink-400 group-hover:text-accent transition-colors" />
    </Link>
  )
}
