import { ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

interface Props { children: ReactNode }

const navItems: Array<{ to: string; label: string }> = [
  { to: '/whats-broken', label: "What's broken" },
  { to: '/strategy', label: 'Strategy' },
  { to: '/flows', label: 'Flows' },
  { to: '/summary', label: 'Summary' },
]

const githubUrl = import.meta.env.VITE_GITHUB_URL?.trim()

export default function SiteShell({ children }: Props) {
  const { pathname } = useLocation()
  // Hide the global header chrome inside flow demos so the demo can own the viewport
  const inFlow = pathname.startsWith('/flows/')

  return (
    <div className="min-h-screen flex flex-col">
      {!inFlow && (
        <header className="sticky top-0 z-30 bg-canvas/75 backdrop-blur-xl backdrop-saturate-150 border-b border-ink-200/70 shadow-edge">
          <div className="ds-shell-inner py-3.5 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5 group rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/45 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas" aria-label="Tableau Coworker home">
              <span
                className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent via-accent to-accent-ink text-white grid place-items-center text-sm font-semibold shadow-lift-sm ring-1 ring-white/15"
                aria-hidden="true"
              >
                T
              </span>
              <span className="text-sm">
                <span className="font-semibold text-ink-900">Tableau Coworker</span>
                <span className="text-ink-400 ml-2 hidden sm:inline">Sean Lu</span>
              </span>
            </Link>
            <nav className="flex items-center gap-0.5">
              {navItems.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg text-sm motion-safe:transition-all motion-safe:duration-150 ease-smooth motion-reduce:transition-none ${
                    isActive
                      ? 'bg-accent-soft text-accent-ink font-semibold shadow-lift-sm ring-1 ring-accent/25'
                      : 'text-ink-600 hover:text-ink-900 hover:bg-canvas-raised/90 hover:shadow-edge'
                  }`
                }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </header>
      )}

      <main className="flex-1">{children}</main>

      {!inFlow && (
        <footer className="border-t border-ink-200/80 mt-24 bg-canvas-sunken/25">
          <div className="ds-shell-inner py-8 flex flex-col gap-6">
            <div
              className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-x-5 gap-y-2 text-2xs text-ink-500 border-b border-ink-100 pb-6"
              aria-label="Process and depth links"
            >
              <span className="font-semibold text-ink-700 uppercase tracking-wide">Process & depth</span>
              <Link to="/design-system" className="hover:text-ink-900">
                Design system
              </Link>
              <Link to="/authoring" className="hover:text-ink-900">
                Authoring
              </Link>
              <Link to="/competitive" className="hover:text-ink-900">
                Competitive scan
              </Link>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm text-ink-500">
              <div>
                <span className="font-semibold text-ink-700">Tableau Coworker</span>
                <span className="mx-2">·</span>
                <span>Design exploration · not a Salesforce or Tableau product</span>
              </div>
              <div className="flex items-center gap-4">
                <span>Submitted May&nbsp;2026</span>
                {githubUrl ? (
                  <a className="hover:text-ink-900" href={githubUrl} target="_blank" rel="noreferrer">
                    Source on GitHub →
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  )
}
