---
name: ipal-audit
description: Audits an ipal-kit (Payload 3 + Next 16) project against AGENT.md rules with a deterministic script — the mandatory feature set (SEO, JSON-LD, llms.txt, Markdown, MCP, R2, Turnstile, panel forms, consent, 2FA, health, env, security headers, X-Powered-By, CSP), forbidden replacements (own forms, nodemailer, reCAPTCHA, hand-written JSON-LD), hardcoded texts/links, forbidden field names, monolithic sections, middleware.ts, missing ISR/generateStaticParams, hex colors, server imports in client components, extra collections, then tsc and build. Use before saying a task is done, after any block/collection/layout change, after an Impeccable pass, and when asked to review or audit the project.
---

# ipal-audit

The checks from AGENT.md §11 as a script — always the same, no interpretation.

## Steps

1. From the project root, run:
   ```bash
   bash .agents/skills/ipal-audit/scripts/audit.sh --quick   # while working
   bash .agents/skills/ipal-audit/scripts/audit.sh           # before "done" (+ tsc + build)
   ```
   Options: `--help`. Do not read the script source — the output is enough.
2. Show the user the **full output** (summary + list of violations).
3. Fix every `[ERROR]` or — if it is a deliberate exception — add a code comment
   with the reason and list it in your answer.
   Each violation names a section in
   `node_modules/@intecion/ipal-kit/docs/agent/AGENT.md` — read it before fixing.
4. `[WARNING]` — assess it and tell the user what to do about it; do not fix it
   blindly (e.g. `searchParams` is OK in a paginated archive route).
5. Run again until the output is `0 error(s)`.

## "missing: …" — the mandatory set (AGENT.md §0b)
Every `[ERROR] missing: X` is an item of the set that the code lacks. Wire it
following the hint (PROGRAMISTA §2) — do not ask whether it is needed. The only exception:
a client decision recorded in `AGENTS.md` as `ipal-audit-skip: <keys> — <reason>` (keys
in AGENT.md §0b). Never add that line yourself just to make the audit pass.

## Polish text and panel labels (AGENT.md §2, §6.5a)
`hardcoded Polish text in code` covers public text. In a schema file (a `.ts` file under `collections/`, `globals/`,
`fields/` or `blocks/`, or one importing Payload's schema types) the panel's own labels are fine: `adminText('Title', 'Tytuł')`,
`{ en, pl }` as `label`, `singular`, `plural`, `description`, `placeholder` or `group`, a `rowLabel()` fallback, a
`const x: AdminText`. Still an error: any `.tsx` file, a Polish-only label, other keys, anything under `defaultValue`.

## Design tokens (AGENT.md §6.11)
The script checks: hex in classes and inline styles (error), `dark:` on colour utilities and `var(--color-…)` in
classes (warnings), `styles.css` without `@intecion/ipal-kit/tokens.css` (warning — a site not yet migrated),
next/font in `--font-body` with the preset (warning), and with `src/design/tokens.ts`: no `DESIGN.md` (warning) and
`ipal-tokens --check` — a stale `src/design/tokens.css` or a WCAG AA contrast failure is an error.

## ipal-audit and ipal-doctor
`ipal-audit` checks the **code** inside the edit loop (and tsc + build). `pnpm exec ipal-doctor` checks the **site**
against the team standard: it runs this script (`--quick`) from the installed package, reports its findings under its
own rule ids (`i18n-literals`, `blocks-tokens`, `audit:<title>`, one per file), and adds versions, Node, layout, database
names, env, admin, AGENTS.md, skills, seeds and — with `--url` / `--deep` — the running site and the database
(the `ipal-doctor` skill, docs/doctor.md). An approved exception for the doctor goes into `ipal-doctor.json` with a reason.

## What the script does not check (do it by hand)

- **Editor test** (AGENT.md §11): every text, image, button, section,
  menu, footer and SEO field can be changed in the panel, in every language.
- **Cookie consent:** in Network, before accepting, there are no requests to
  google-analytics / googletagmanager (except Consent Mode), facebook.net,
  clarity.ms, licdn, tiktok.
- **Content**: fallbacks contain no client data (`|| 'Firma X'`).
- **Response headers** (on a running build — `pnpm build && pnpm start`, or the deployed domain):
  ```bash
  U=http://localhost:3000
  for p in /pl /admin /api/health; do echo "== $p"; curl -sI "$U$p" | grep -iE 'x-powered-by|content-security-policy'; done
  ```
  `x-powered-by` anywhere → ERROR (`withSecurityConfig`, security.md → "X-Powered-By"). No
  `content-security-policy` / `content-security-policy-report-only` on `/pl` and `/admin` → WARNING (CSP not
  rolled out). Report-only for more than a few weeks with clean reports → WARNING (switch to `mode: 'enforce'`).
  Then open `/pl` and `/admin` in the browser: CSP lines in the console = missing sources (flags / `extra`).

Do not say "done" until the full audit (without `--quick`) has no errors.
