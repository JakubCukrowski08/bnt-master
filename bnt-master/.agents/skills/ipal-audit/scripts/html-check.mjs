#!/usr/bin/env node
// Raw HTML in JSX (dangerouslySetInnerHTML), classified — prints "LEVEL|rule|file:line", exit 0.
//   node html-check.mjs src
//  - inline JSON-LD (<script type="application/ld+json">) without '<' escaping → ERROR (XSS:
//    a "</script>" typed in the panel breaks out of the tag) → JsonLdGraph from /rsc
//  - inline JSON-LD with escaping → WARNING (works; JsonLdGraph is the shared version)
//  - anything else → WARNING (rich text → RenderRichText; other HTML must be sanitized)
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const files = []
const walk = (p) => {
  let st
  try { st = statSync(p) } catch { return }
  if (st.isDirectory()) { if (!/node_modules|\.next/.test(p)) for (const n of readdirSync(p)) walk(join(p, n)) }
  else if (/\.(tsx|jsx)$/.test(p)) files.push(p)
}
process.argv.slice(2).forEach(walk)

for (const file of files) {
  // blank out comments (keeps offsets/line numbers)
  const src = readFileSync(file, 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, (c) => c.replace(/[^\n]/g, ' '))
    .replace(/(^|[^:'"`])\/\/.*$/gm, (c, p) => p + ' '.repeat(c.length - p.length))
  for (const m of src.matchAll(/dangerouslySetInnerHTML/g)) {
    // the element this prop belongs to: from its opening "<tag" to the end of the prop's {{ … }}
    const open = src.lastIndexOf('<', m.index)
    const close = src.indexOf('}}', m.index)
    const el = src.slice(open, close < 0 ? m.index + 400 : close + 2)
    const at = `${file}:${src.slice(0, m.index).split('\n').length}`
    if (/^<script\b/.test(el) && /application\/ld\+json/.test(el)) {
      if (/u003c|replace\(\/</.test(el)) console.log(`WARNING|inline JSON-LD — use <JsonLdGraph schemas={[…]}/> from @intecion/ipal-kit/rsc (seo.md)|${at}`)
      else console.log(`ERROR|unescaped JSON-LD in <script> — XSS via "</script>" in panel text; use <JsonLdGraph/> from @intecion/ipal-kit/rsc|${at}`)
    } else {
      console.log(`WARNING|raw HTML (dangerouslySetInnerHTML) — rich text → RenderRichText; other HTML must be sanitized|${at}`)
    }
  }
}
