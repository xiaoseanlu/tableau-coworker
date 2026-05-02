# Tableau Coworker

Head of Design take-home for **Faros AI** — a React prototype that argues Tableau’s **next default** should be a **generated, narrated surface** (briefings, curation queue, mobile exceptions), with **real trial captures** as the “today” evidence.

**Author:** Sean Lu  
**Stack:** Vite, React 18, TypeScript, Tailwind v3, react-router-dom (HashRouter).  
**Spec:** This repo is the prototype only. During the take-home, Markdown specs lived alongside it (`plan/`, `CONTEXT.md`); they are not published in this repository.

## Quick start

```bash
npm install
npm run dev
```

Open the dev server URL and use hash routes, e.g. `http://localhost:5173/#/flows/maya`.

```bash
npm run build    # output in dist/
npm run deploy   # gh-pages publish (configure git remote first)
```

## What’s in the site

| Path | Content |
|------|---------|
| `#/` | Thesis + pillars + flow cards |
| `#/whats-broken` | Capture-backed critique |
| `#/strategy` | Bets, sequencing, risks |
| `#/flows` | Index for three personas |
| `#/flows/maya` | CRO Monday briefing flow |
| `#/flows/jordan` | Sales Ops curation queue |
| `#/flows/sam` | Mobile regional briefing |
| `#/summary` | One-pager |
| `#/competitive` | BI competitive appendix |

## Captures

Real screenshots from a Tableau Cloud trial live in `public/captures/`. See `public/captures/README.md`. **Do not modify** capture PNGs inside `public/captures/` — treat as read-only evidence.

## Deploy (GitHub Pages)

`vite.config.ts` sets `base: './'` for Pages.

**Option A — GitHub Actions (recommended):** enable **Pages → GitHub Actions** on the repo, then push to `main`. Workflow: `.github/workflows/deploy-pages.yml` builds `tableau-coworker/` and sets `VITE_GITHUB_URL` to this repository so the footer link resolves.

**Option B — Local / `gh-pages` branch:** `npm run build` then `npm run deploy` from `tableau-coworker/` (configure `git remote` first).

For local builds only: optional `.env.local` with `VITE_GITHUB_URL=https://github.com/your-org/your-repo` adds the footer link. If unset locally, the footer omits that anchor.

## License

Prototype for evaluation; not a Salesforce/Tableau product.
