/**
 * capture-evidence.mjs
 *
 * Batch-captures the "today" screens of Tableau referenced in
 * plan/13-evidence-pack.md and writes them to public/captures/.
 *
 * Run from the tableau-coworker/ folder:
 *
 *   npx playwright install chromium    # one-time, ~150MB
 *   npm run capture                    # ~60-90 seconds for all targets
 *
 * Why Playwright (vs Puppeteer): Playwright ships with built-in
 * full-page screenshot support, cross-browser, and handles JS-heavy
 * pages (like Tableau Public dashboards) more reliably out of the box.
 *
 * Notes:
 *  - Targets that require auth (Tableau Cloud trial) are skipped here;
 *    capture those manually after signing in.
 *  - Tableau Public dashboards take ~6 seconds to fully render; we wait
 *    explicitly for them.
 *  - One failure does not abort the run — every target is attempted,
 *    failures are reported in the summary.
 */

import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = path.resolve(__dirname, '../public/captures')

/**
 * Capture targets — pulled directly from plan/13-evidence-pack.md.
 * Each entry maps a pain point to a public URL we can capture.
 */
const targets = [
  {
    name: '01-chart-builder-shelves',
    url: 'https://help.tableau.com/current/pro/desktop/en-us/getstarted_buildmanual_ex1basic.htm',
    note: 'Pain #1 — chart builder shelves/marks UI. Tableau official docs.',
    viewport: { width: 1440, height: 900 },
    waitMs: 1500,
  },
  {
    name: '02-web-authoring-vs-desktop',
    url: 'https://help.tableau.com/current/pro/desktop/en-us/web_author_overview.htm',
    note: 'Pain #2 — web authoring lag. Tableau official docs.',
    viewport: { width: 1440, height: 900 },
    waitMs: 1500,
  },
  {
    name: '03-dashboard-sprawl',
    url: 'https://public.tableau.com/app/discover',
    note: 'Pain #3 — dashboard sprawl. Tableau Public Discover gallery as proxy.',
    viewport: { width: 1440, height: 900 },
    waitMs: 4000, // gallery loads thumbnails progressively
  },
  {
    name: '04-exec-wall-of-widgets',
    url: 'https://public.tableau.com/app/profile/tableau.for.sales.analytics/viz/SalesPipelineDashbaord/PipelineDash',
    note: 'Pain #4 — wall-of-widgets exec dashboard. Real Tableau Public viz.',
    viewport: { width: 1440, height: 900 },
    waitMs: 8000, // Tableau Public viz needs time to render
  },
  {
    name: '05-mobile-squished',
    url: 'https://public.tableau.com/app/profile/tableau.for.sales.analytics/viz/SalesPipelineDashbaord/PipelineDash',
    note: 'Pain #5 — same dashboard, mobile viewport, demonstrates squish.',
    viewport: { width: 390, height: 844 }, // iPhone 14 Pro
    waitMs: 8000,
    fullPage: false, // mobile demo wants the visible viewport, not full scroll
  },
  {
    name: '06-pricing-tier-hierarchy',
    url: 'https://www.tableau.com/pricing',
    note: 'Pain #6 — pricing tiers as visible class hierarchy.',
    viewport: { width: 1440, height: 900 },
    waitMs: 2500,
  },
  {
    name: '07-pulse-as-side-product',
    url: 'https://www.tableau.com/products/tableau-pulse',
    note: 'Pain #7 — Tableau Pulse marketing page. The "future bolted on the side."',
    viewport: { width: 1440, height: 900 },
    waitMs: 2500,
  },
  {
    name: '07b-tableau-cloud-classic',
    url: 'https://www.tableau.com/dashboard/sales-dashboard-examples-and-templates',
    note: 'Pain #7 contrast — classic dashboard examples for the side-by-side.',
    viewport: { width: 1440, height: 900 },
    waitMs: 2500,
  },
  {
    name: '08-lod-formula-editor',
    url: 'https://help.tableau.com/current/pro/desktop/en-us/calculations_calculatedfields_lod.htm',
    note: 'Pain #8 — LOD expression docs, shows the formula-language barrier.',
    viewport: { width: 1440, height: 900 },
    waitMs: 1500,
  },
]

async function captureOne(browser, target) {
  const context = await browser.newContext({
    viewport: target.viewport,
    deviceScaleFactor: 2, // retina-quality output
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
      '(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  })
  const page = await context.newPage()

  try {
    await page.goto(target.url, { waitUntil: 'domcontentloaded', timeout: 30000 })
    // Best-effort wait for late content (Tableau Public viz, etc.)
    await page.waitForTimeout(target.waitMs)

    const outPath = path.join(OUT_DIR, `${target.name}.png`)
    await page.screenshot({
      path: outPath,
      fullPage: target.fullPage !== false,
    })
    return { ok: true, target, outPath }
  } catch (err) {
    return { ok: false, target, error: err.message }
  } finally {
    await context.close()
  }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })

  console.log(`\nCapturing ${targets.length} targets → ${OUT_DIR}\n`)
  const browser = await chromium.launch({ headless: true })

  const results = []
  for (const target of targets) {
    process.stdout.write(`  ${target.name.padEnd(32)} `)
    const result = await captureOne(browser, target)
    results.push(result)
    if (result.ok) {
      console.log('✓')
    } else {
      console.log(`✗  ${result.error}`)
    }
  }

  await browser.close()

  const ok = results.filter(r => r.ok).length
  const failed = results.filter(r => !r.ok)
  console.log(`\nDone: ${ok}/${results.length} captured.`)
  if (failed.length) {
    console.log(`\nFailed targets:`)
    for (const f of failed) {
      console.log(`  - ${f.target.name}: ${f.error}`)
      console.log(`    URL: ${f.target.url}`)
      console.log(`    → Capture manually with cmd+shift+5 or GoFullPage.`)
    }
  }
  console.log(``)
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
