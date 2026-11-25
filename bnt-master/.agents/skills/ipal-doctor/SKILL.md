---
name: ipal-doctor
description: Checks the whole site against the ipal-kit team standard with one command (`pnpm exec ipal-doctor`) — plugin, Next, sharp and Node versions, the AGENT.md §3 folder layout and naming, database names (<domain>_dev/_prod), env rules, security headers, X-Powered-By, CSP, 2FA, the cookie scanner, adminMeta/agency, AGENTS.md "Project decisions", current ipal-* skills, seeds (createSeeder, SEED_ONLY, no deletes), the block library, pnpm audit, hardcoded texts, and with --url / --deep the running site and the database. Use after setting up a site, after an ipal-kit upgrade, before a deploy, in CI of a new site, and when asked whether a site follows the team rules.
---

# ipal-doctor

Full reference: `node_modules/@intecion/ipal-kit/docs/doctor.md`.

## Steps

1. From the project root (after `pnpm install`, `pnpm payload generate:importmap`, `pnpm exec ipal-skills`):
   ```bash
   pnpm exec ipal-doctor                    # static: files only, no build, no database
   pnpm exec ipal-doctor --offline          # without the registry (latest plugin, pnpm audit)
   ```
   Running site and database (read-only):
   ```bash
   pnpm build && pnpm start                 # or the deployed URL
   pnpm exec ipal-doctor --deep --url http://localhost:3000
   ```
2. Show the user the **full output**. Every finding names its rule, the file, a fix and a doc.
3. Fix every `error`. A `warning` is drift — fix it or tell the user why not. `info` is a note.
4. A deliberate exception (the owner's decision) goes into `ipal-doctor.json` **with a reason** — the same reason as in
   AGENTS.md "Project decisions". Never silence a rule just to make the run pass:
   ```json
   { "rules": { "i18n-literals": { "off": true, "files": ["src/components/design/**"], "reason": "approved exception: styleguide labels" } } }
   ```
   Keys: `off`, `severity`, `reason` (required), `until` (ISO date), `files` (globs). Top level: `domain`, `launched`,
   `layout.allow`, `layout.frontend` (the pages' folder, e.g. `src/app/(site)` — found by structure otherwise; any route
   group name works), `seen` (written by the doctor), `extraRules`.
5. Run again until it reports what the project expects (a new site: `--strict` → `0 error(s), 0 warning(s), 0 info`).

## Options and exit codes

`[dir]` · `--json` (schema 1) · `--md` · `--strict` (= `--fail-on info`) · `--fail-on error|warning|info` · `--offline` ·
`--url <url>` · `--staging` (must be noindex) · `--admin-route <path>` · `--deep` · `--env-file <prod export>` (checks
`<domain>_prod`) · `--only` / `--skip <ids,groups>` · `--sites '../*-web'` (a read-only rule × site table, exit 0).

Exit `0` ok · `1` findings at or above `--fail-on` · `2` could not run · `3` a rule crashed.

## CI of a new site (starter, reference site)

```bash
pnpm exec ipal-doctor --strict --offline                               # after install
pnpm exec ipal-doctor --strict --offline --deep --url http://localhost:3000   # after build + start
```
Existing client sites are not gated on it; run it there as a report only.

## The status endpoint

`GET /api/ipal/doctor` is added by `ipalKit` and answers 404 until the site has `IPAL_DOCTOR_TOKEN` (≥ 32 characters).
Then `Authorization: Bearer <token>`; counts only (`usersWithout2fa`, `usersSetupClosed` = of those, blocked because the 2FA setup window has passed, `pendingCookies`, `plugin`, `node`). With the same
`IPAL_DOCTOR_TOKEN` in the doctor's environment, `--url` reads it. Off: `ipalKit({ doctor: false })`; adapt:
`ipalKit({ doctor: { tokenVar, access } })`.

## Env the doctor reads

`IPAL_DOCTOR_TOKEN` (endpoint), `CI` (set → never writes `seen`), `NO_COLOR` (plain output), `PAYLOAD_CONFIG_PATH`
(`--deep` loads that config), `IPAL_DOCTOR_IMPORT_MAP` (internal: passed to the probe).

## Building blocks

`@intecion/ipal-kit/doctor`: `runDoctor`, `doctorRules`, `formatReport`, … (docs/doctor.md → Building blocks) — wrap,
filter or add rules (`extraRules` in `ipal-doctor.json`, each module exports `rules: DoctorRule[]`).

## Relation to the other checks

`ipal-audit` stays the check inside the edit loop (plus tsc and build); the doctor runs `ipal-audit --quick` from the
installed package, `ipal-seo-check` with `--url`, and adds versions, env, database, admin, seeds, skills and the live
headers. `ipal-consent-check` (browser) is not part of it.
