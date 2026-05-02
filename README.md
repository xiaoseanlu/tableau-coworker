# Tableau Coworker

Personal **design exploration** — a React prototype that shows how Tableau’s **next default** could read as a **generated, narrated surface**: briefings, curation analytics, and mobile exceptions — with **real trial captures** for “today” and **designed UI + interactive charts** for “tomorrow.”

**Author:** Sean Lu  
**Stack:** Vite, React 18, TypeScript, Tailwind v3, react-router-dom (HashRouter), SVG data visualization (custom components).

Not affiliated with Salesforce or Tableau. For discussion and critique only.

## Start here (reviewers)

1. **Open the deployed site** (GitHub Pages) or run locally (`npm run dev`).
2. Go straight to **`#/flows/maya`** → step **Brief** — hover the **West coverage** trend (interactive chart).
3. **`#/flows/jordan`** → **Queue** — **portfolio mix** bar + triage list.
4. **`#/flows/sam`** → **Brief** — mobile cards with **sparkline** on risk.
5. Read **`DESIGN.md`** in this repo for **tokens, typography, principles, and pain → redesign mapping**.

| Path | What you’ll see |
|------|-----------------|
| `#/` | Thesis + **preview sparklines** on flow cards + link to design doc |
| `#/whats-broken` | Capture-backed critique |
| `#/strategy` | Bets, sequencing, risks |
| `#/flows` | Index for three personas |
| `#/flows/maya` | CRO flow: capture → **briefing + hover chart** → drill + concentration bars → send |
| `#/flows/jordan` | Curator flow: sprawl capture → **portfolio viz** + queue → diagnose → resolve |
| `#/flows/sam` | Mobile flow: squish capture → **briefing + sparks** → drill → act |
| `#/summary` | One-pager |
| `#/competitive` | BI competitive appendix |

## Quick start

```bash
npm install
npm run dev
```

Hash routes, e.g. `http://localhost:5173/#/flows/maya`.

```bash
npm run build    # output in dist/
npm run deploy   # gh-pages (configure git remote)
```

## Design system

Implementation: `tailwind.config.js`, `src/styles/index.css`, shared components under `src/components/`.

**Written spec for humans:** [`DESIGN.md`](./DESIGN.md) — why warm canvas + aubergine + gold signal, how that responds to observed Tableau pain, and where viz components live (`src/components/viz/DataViz.tsx`).

## Captures

Real screenshots from a Tableau Cloud trial live in `public/captures/`. See `public/captures/README.md`. **Do not modify** capture PNGs — read-only evidence.

## Deploy (GitHub Pages)

`vite.config.ts` sets `base: './'` for Pages.

**GitHub Actions:** enable **Pages → GitHub Actions**, push `main`. Workflow: `.github/workflows/deploy-pages.yml`. Build sets `VITE_GITHUB_URL` so the footer and home page can link to `DESIGN.md` on GitHub.

**Local:** optional `.env.local` with `VITE_GITHUB_URL=https://github.com/your-user/your-repo`.

## License

For discussion and critique only. Not a Salesforce/Tableau product.
