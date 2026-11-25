#!/usr/bin/env node
// Polish text hardcoded in code (AGENT.md §2) — prints "file:line: source line" per finding, exit 0.
//   node polish-literals.mjs <dir> [<dir> …]
// Reads the syntax tree (the project's TypeScript), so comments never count and multi-line forms work.
// Not reported: the panel's own labels (AGENT.md §6.5a), only in a schema file — a .ts file under
// collections/, globals/, fields/ or blocks/, or one importing Payload's schema types; never a .tsx file:
//   - adminText('Title', 'Tytuł') from @intecion/ipal-kit/blocks
//   - { en: 'Title', pl: 'Tytuł' } as the value of label, singular, plural, description, placeholder or group
//   - rowLabel('title', { en: 'Item', pl: 'Pozycja' }) from @intecion/ipal-kit
//   - const TITLE: AdminText = { en: 'Title', pl: 'Tytuł' }
// Anything under defaultValue is public content, so it is reported. So is a Polish-only label.
// Exit 3 = TypeScript not found (audit.sh falls back to a plain grep).
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { createRequire } from 'node:module'
import { join } from 'node:path'

const load = (from) => {
  try {
    return createRequire(from)('typescript')
  } catch {
    return null
  }
}
const ts = load(join(process.cwd(), 'package.json')) ?? load(import.meta.url)
if (!ts) process.exit(3)

const POLISH = /[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/
const SCHEMA_KEYS = new Set(['label', 'singular', 'plural', 'description', 'placeholder', 'group'])
const SCHEMA_DIR = /(?:^|\/)(?:collections|globals|fields|blocks)\//
const SCHEMA_TYPES = /import\s+type\s*\{[^}]*\b(?:Block|CollectionConfig|Field|GlobalConfig|Tab)\b[^}]*\}\s*from\s*['"]payload['"]/
const IPAL = /^@intecion\/ipal-kit(?:\/|$)/

const files = []
const walk = (p) => {
  let st
  try { st = statSync(p) } catch { return }
  if (st.isDirectory()) for (const n of readdirSync(p)) walk(join(p, n))
  else if (/\.tsx?$/.test(p) && !/\.d\.ts$|\/\(payload\)\//.test(p)) files.push(p)
}
process.argv.slice(2).forEach(walk)

const keyName = (node) => (ts.isPropertyAssignment(node) && (ts.isIdentifier(node.name) || ts.isStringLiteralLike(node.name)) ? node.name.text : null)

for (const file of files) {
  const text = readFileSync(file, 'utf8')
  if (!POLISH.test(text)) continue
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, file.endsWith('x') ? ts.ScriptKind.TSX : ts.ScriptKind.TS)
  const schemaFile = !file.endsWith('x') && !/^['"]use client['"]/m.test(text) && (SCHEMA_DIR.test(file) || SCHEMA_TYPES.test(text))

  // Local names of the plugin's helpers (`import { adminText as t } …`); a lookalike of your own does not count.
  const helpers = new Map()
  for (const st of source.statements) {
    if (!ts.isImportDeclaration(st) || !IPAL.test(st.moduleSpecifier.text)) continue
    const named = st.importClause?.namedBindings
    if (!named || !ts.isNamedImports(named)) continue
    for (const el of named.elements) {
      const name = (el.propertyName ?? el.name).text
      if (name === 'adminText' || name === 'rowLabel') helpers.set(el.name.text, name)
    }
  }

  const isBilingual = (node) =>
    ts.isObjectLiteralExpression(node) && ['en', 'pl'].every((k) => node.properties.some((p) => keyName(p) === k))

  // Is this literal one of the panel's own labels? Walks up from the literal.
  const isAdminLabel = (literal) => {
    let inside = false
    for (let node = literal; node.parent; node = node.parent) {
      const parent = node.parent
      if (keyName(parent) === 'defaultValue') return false
      if (inside) continue
      if (ts.isCallExpression(parent) && parent.arguments.includes(node) && ts.isIdentifier(parent.expression)) {
        const helper = helpers.get(parent.expression.text)
        if (helper === 'adminText') inside = true
        // rowLabel(fields, fallback): the fallback only, as { en, pl }
        if (helper === 'rowLabel' && node === parent.arguments[1] && isBilingual(node)) inside = true
      }
      if (ts.isPropertyAssignment(parent) && parent.initializer === node && SCHEMA_KEYS.has(keyName(parent)) && isBilingual(node)) inside = true
      if (ts.isVariableDeclaration(parent) && parent.initializer === node && parent.type?.getText(source) === 'AdminText' && isBilingual(node)) inside = true
    }
    return inside
  }

  const seen = new Set()
  const visit = (node) => {
    if (ts.isImportDeclaration(node)) return
    const literal = ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)
    if (literal && POLISH.test(node.text) && !(schemaFile && isAdminLabel(node))) {
      const line = source.getLineAndCharacterOfPosition(node.getStart(source)).line
      if (!seen.has(line)) {
        seen.add(line)
        console.log(`${file}:${line + 1}:${text.split('\n')[line]}`)
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(source)
}
