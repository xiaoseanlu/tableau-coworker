# scripts/

Working scripts for capture and maintenance.

## capture-evidence.mjs

Batch-captures the public Tableau screens referenced in
`plan/13-evidence-pack.md` and writes them to `public/captures/` as
full-page PNGs.

### One-time setup

From the `tableau-coworker/` folder:

```bash
npm install                    # if you haven't already
npx playwright install chromium    # ~150MB download, one time
```

### Run it

```bash
npm run capture
```

Takes ~60-90 seconds. Output:

```
Capturing 9 targets → /…/tableau-coworker/public/captures/

  01-chart-builder-shelves         ✓
  02-web-authoring-vs-desktop      ✓
  03-dashboard-sprawl              ✓
  04-exec-wall-of-widgets          ✓
  05-mobile-squished               ✓
  06-pricing-tier-hierarchy        ✓
  07-pulse-as-side-product         ✓
  07b-tableau-cloud-classic        ✓
  08-lod-formula-editor            ✓

Done: 9/9 captured.
```

### What if a capture fails?

The script reports failures at the end and keeps running. Common
causes:

- **Tableau Public viz didn't render in 8 seconds.** Re-run; or bump
  `waitMs` for that target in the script.
- **Marketing page changed its URL.** Verify the URL in your browser,
  update the `targets` array.
- **Bot detection.** Switch to manual screenshot — open the URL in
  Chrome, use [GoFullPage](https://chrome.google.com/webstore/detail/gofullpage-full-page-scre/fdpohaocaechififmbbbbbknoalclacl)
  or cmd+shift+5, save to `public/captures/` with the same filename.

### Modifying or adding targets

Each entry in the `targets` array supports:

| Field | Required | Notes |
|---|---|---|
| `name` | yes | Output filename (without `.png`) |
| `url`  | yes | Public URL to capture |
| `note` | no  | Comment for context |
| `viewport` | yes | `{ width, height }` in px |
| `waitMs` | yes | Extra wait after page load for late content |
| `fullPage` | no | Default `true`. Set `false` for viewport-only |

### What's NOT captured here

Pain Point #9 (performance loading state) and #10 (Salesforce
acquisition context) from the evidence pack are skipped — the first is
better captured from a YouTube tutorial; the second is a text-only
quote citation.

For trial-gated screens (live Tableau Cloud admin views, real Pulse
experience with your own data), sign up for the 14-day Tableau Cloud
trial at https://www.tableau.com/products/cloud-bi and capture
manually with cmd+shift+5 or GoFullPage. Save to `public/captures/` to
keep them alongside the automated captures.
