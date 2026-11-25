#!/usr/bin/env node
// Editor-panel clarity checks (AGENT.md §6.5a): prints "LEVEL|rule|file:line: detail", exit 0.
//   node panel-check.mjs src/blocks src/collections src/globals src/fields
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const files = []
const walk = (p) => {
  let st
  try { st = statSync(p) } catch { return }
  if (st.isDirectory()) for (const n of readdirSync(p)) walk(join(p, n))
  else if (/\.ts$/.test(p) && !/Component|\.d\.ts$/.test(p)) files.push(p)
}
process.argv.slice(2).forEach(walk)

const POLISH = /[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/
const lineOf = (src, i) => src.slice(0, i).split('\n').length
const out = (level, rule, file, src, i, detail) => console.log(`${level}|${rule}|${file}:${lineOf(src, i)}: ${detail}`)
const strip = (s) => s.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' ')).replace(/(^|[^:])\/\/.*$/gm, (m, p) => p + ' '.repeat(m.length - p.length))

// The text of the object literal around index i, without the contents of its nested `fields: [...]`.
function ownObject(src, i) {
  let start = i
  for (let depth = 0; start > 0; start--) {
    const ch = src[start - 1]
    if (ch === '}') depth++
    else if (ch === '{') { if (depth === 0) { start--; break } depth-- }
  }
  let end = i
  for (let depth = 0; end < src.length; end++) {
    const ch = src[end]
    if (ch === '{') depth++
    else if (ch === '}') { if (depth === 0) break; depth-- }
  }
  const obj = src.slice(start, end + 1)
  const at = obj.search(/\bfields\s*:\s*\[/)
  if (at < 0) return obj
  let j = obj.indexOf('[', at)
  for (let depth = 0; j < obj.length; j++) {
    if (obj[j] === '[') depth++
    else if (obj[j] === ']' && --depth === 0) break
  }
  return obj.slice(0, at) + obj.slice(j + 1)
}

for (const file of files) {
  const src = strip(readFileSync(file, 'utf8'))

  // numbered slots: cta1Label, feature2Title, image3, phone2 → array with "+ Add …"
  // digits at the end or before a new word (cta1Label) — not numeronyms like a11y, i18n, l10n
  for (const m of src.matchAll(/name:\s*['"]([a-zA-Z]+[0-9]+(?:[A-Z][a-zA-Z0-9]*)?)['"]/g)) {
    if (/^(h[1-6]|x[0-9]|[a-z]?2fa)$/i.test(m[1])) continue
    out('ERROR', 'numbered fields → one array field with labels {singular, plural} ("+ Add …")', file, src, m.index, m[1])
  }

  // panel text must be English and short
  for (const m of src.matchAll(/\b(label|description|singular|plural|placeholder)\s*:\s*(['"`])((?:(?!\2).)*)\2/g)) {
    const text = m[3]
    if (POLISH.test(text)) out('WARNING', 'panel text in Polish — admin labels/descriptions are English', file, src, m.index, `${m[1]}: "${text.slice(0, 60)}"`)
    else if (m[1] === 'description' && text.length > 120) out('WARNING', 'description over 120 chars — one short sentence: what it does / where it shows', file, src, m.index, `${text.length} chars`)
  }

  // arrays: labels (→ "Add Feature" button) + rowLabel (→ readable rows) — anywhere in the array's own
  // object (before or after its `fields`), not inside the nested fields
  for (const m of src.matchAll(/type:\s*['"]array['"]/g)) {
    const own = ownObject(src, m.index)
    const name = own.match(/name:\s*['"](\w+)['"]/)?.[1] ?? '?'
    if (!/\blabels\s*:/.test(own)) out('WARNING', 'array without labels {singular, plural} — panel shows "Add Row"', file, src, m.index, name)
    if (!/rowLabel|RowLabel/.test(own)) out('WARNING', 'array without rowLabel() — rows read "Item 01" instead of their content', file, src, m.index, name)
  }

  // too many fields in one block config → tabs / condition / arrays / variant
  if (/\/blocks\/[^/]+\/config\.ts$/.test(file)) {
    const n = (src.match(/name:\s*['"]/g) ?? []).length
    const hasTabs = /type:\s*['"]tabs['"]/.test(src)
    if (n > 14 && !hasTabs) out('WARNING', 'block has many fields and no tabs — tabs Content/Media/Settings, admin.condition, arrays', file, src, 0, `${n} fields`)
  }
}
