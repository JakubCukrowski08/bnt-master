#!/usr/bin/env node
// Finds user-visible text hardcoded in JSX (AGENT.md §2: everything visible comes from the panel).
//   node jsx-text.mjs <dir> [<dir> …]   → prints "file:line: text" per finding, exit 0
// Detects:
//   - text between HTML text tags:      <h2>Nasze usługi</h2>, <p>\n  Lorem…\n</p>, </strong> więcej <
//   - text attributes with words:       alt="Logo firmy", placeholder="Twój e-mail", aria-label="Zamknij"
// Ignores comments, {expressions}, digits/punctuation/symbols only (404, →, ☰, ·).
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const TEXT_TAGS =
  'h1|h2|h3|h4|h5|h6|p|span|a|button|li|label|strong|em|b|i|small|div|section|article|header|footer|main|nav|td|th|dt|dd|figcaption|blockquote|option|legend|summary|caption|q|cite|time|mark'
// Opening tags: HTML text tags or Capitalized components (<Link …>), never preceded by an
// identifier char — that excludes TS generics like useState<Boolean>( … ).
const OPEN_OR_CLOSE = new RegExp(
  `(?:(?<![\\w.$])<(?:${TEXT_TAGS}|[A-Z][\\w.]*)(?:\\s[^<>]*)?>|</[A-Za-z][\\w.]*>)([^<>{}]*)(?=<|\\{)`,
  'g',
)
const ATTR = /\b(alt|title|placeholder|aria-label|label)=("([^"]*)"|'([^']*)')/g
const WORD = /\p{L}{2,}/u
// Text right after a closing/self-closing tag may be the JS that follows the JSX
// expression (`<X /> : null`, `</div>) }`, `</p>\n const id = …`) — not visible text.
const JS_CODE = /(^|\s)(return|const|let|var|if|else|export|import|await|typeof)\b|=>|[=;`]|^\s*[:?)\]}]|&&|\|\|/
// JSX elements as values in an object literal: `narrow: <A />,\n wide: <B />` leaves
// ", wide:" between the two elements — a property key, not visible text.
const OBJECT_KEY = /^\s*,\s*(?:[A-Za-z_$][\w$]*|'[^']*'|"[^"]*")\s*:\s*$/

const files = []
const walk = (p) => {
  let st
  try { st = statSync(p) } catch { return }
  if (st.isDirectory()) for (const n of readdirSync(p)) walk(join(p, n))
  else if (p.endsWith('.tsx')) files.push(p)
}
process.argv.slice(2).forEach(walk)

// Blank out comments but keep line numbers.
const stripComments = (src) =>
  src
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, (m) => m.replace(/[^\n]/g, ' '))
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '))
    .replace(/(^|[^:"'`])\/\/.*$/gm, (m, p) => p + ' '.repeat(m.length - p.length))

const lineOf = (src, idx) => src.slice(0, idx).split('\n').length

for (const file of files) {
  const src = stripComments(readFileSync(file, 'utf8'))
  for (const m of src.matchAll(OPEN_OR_CLOSE)) {
    const text = m[1].replace(/\s+/g, ' ').trim()
    if (!text || !WORD.test(text) || JS_CODE.test(text) || OBJECT_KEY.test(text)) continue
    if (/&[a-z]+;/.test(text) && !WORD.test(text.replace(/&[a-z]+;/g, ''))) continue
    console.log(`${file}:${lineOf(src, m.index + m[0].length - m[1].length)}: ${text.slice(0, 80)}`)
  }
  for (const m of src.matchAll(ATTR)) {
    const value = m[3] ?? m[4] ?? ''
    if (!WORD.test(value)) continue
    console.log(`${file}:${lineOf(src, m.index)}: ${m[1]}="${value.slice(0, 60)}"`)
  }
}
