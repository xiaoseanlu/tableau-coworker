import { ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

interface Props { children: ReactNode }

const navItems: Array<{ to: string; label: string }> = [
  { to: '/whats-broken', label: "What's broken" },
  { to: '/strategy',     label: 'Strategy' },
  { to: '/flows',        label: 'Flows' },
  { to: '/summary',      label: 'Summary' },
  { to: '/competitive',  label: 'Competitive scan' },
]

const githubUrl = import.meta.env.VITE_GITHUB_URL?.trim()

export default function SiteShell({ children }: Props) {
  const { pathname } = useLocation()
  // Hide the global header chrome inside flow demos so the demo can own the viewport
  const inFlow = pathname.startsWith('/flows/')

  return (
    <div className="min-h-screen flex flex-col">
      {!inFlow && (
        <header className="sticky top-0 z-30 bg-canvas/85 backdrop-blur border-b border-ink-100">
          <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5 group" aria-label="Tableau Coworker home">
              <span className="w-7 h-7 rounded-md bg-accent text-white grid place-items-center text-sm font-semibold shadow-card" aria-hidden="true">T</span>
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
                    `px-3 py-1.5 rounded-md text-sm transition-colors ${
                      isActive
                        ? 'bg-ink-100 text-ink-900 font-medium'
                        : 'text-ink-600 hover:text-ink-900 hover:bg-ink-50'
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
        <footer className="border-t border-ink-100 mt-24">
          <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm text-ink-500">
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
        </footer>
      )}
    </div>
  )
}
