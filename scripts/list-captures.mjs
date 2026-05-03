#!/usr/bin/env node
/**
 * Regenerate src/data/captureFiles.ts from public/captures/**/*.png
 * Run from repo root: node scripts/list-captures.mjs
 */
import fs from 'node:fs'
import path from 'node:path'

const root = path.join(process.cwd(), 'public', 'captures')

function walk(dir) {
  let out = []
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name)
    if (fs.statSync(p).isDirectory()) out = out.concat(walk(p))
    else if (/\.png$/i.test(name)) out.push(path.relative(path.join(process.cwd(), 'public'), p).split(path.sep).join('/'))
  }
  return out.sort()
}

const files = walk(root)
const ts = `/** Auto-generated — run: node scripts/list-captures.mjs */
export const CAPTURE_PNG_PATHS = ${JSON.stringify(files, null, 2)} as const

export const CAPTURE_PNG_COUNT = ${files.length}
`
fs.mkdirSync(path.join(process.cwd(), 'src', 'data'), { recursive: true })
fs.writeFileSync(path.join(process.cwd(), 'src', 'data', 'captureFiles.ts'), ts)
console.error(`Wrote ${files.length} paths to src/data/captureFiles.ts`)
