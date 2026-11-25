---
name: ipal-consent-check
description: Proves in a real browser (Playwright) that an ipal-kit site respects cookie consent — no Meta/Clarity/LinkedIn/TikTok/Ads requests and no tracking cookies before a decision or after "reject", Google only with Consent Mode "denied" signals, tags starting after "accept". Use after adding analytics, pixels, embeds (YouTube, maps, chat) or third-party scripts, before handing a site over, and whenever GDPR/RODO or cookie banner behaviour is in question.
---

# ipal-consent-check

GDPR: non-Google tags load **only after consent**; Google (GA4/GTM) may
load earlier only with the Consent Mode "denied" signal and without cookies.
That early load happens only in Consent Mode `advanced` (the default); with
`<SiteProviders analytics={{ consentMode: 'basic' }}>` no request goes to `googletagmanager.com`
before analytics or marketing consent — check the project's choice in "Project decisions".

## Steps
1. Once per project:
   ```bash
   pnpm add -D playwright && pnpm exec playwright install chromium
   ```
2. Start the app (`pnpm build && pnpm start`) and check **a page with tags**
   (ideally the homepage and a page with a form/video):
   ```bash
   node .agents/skills/ipal-consent-check/scripts/consent-check.mjs http://localhost:3000/pl
   ```
   `--wait 6000` when tags start slowly (`defer` mode in Analytics).
3. Output: three runs in clean profiles — no decision, "Accept",
   "Reject" + reload. Every `[ERROR]` is a violation — fix it:

| Violation | Cause → fix |
|---|---|
| pixel loaded without consent | script wired by hand / copied `Analytics` → ID in Site integrations, `<Analytics>` from the plugin (analytics.md) |
| tracking cookie set without consent | same; or GTM fires a tag without an `ad_storage` condition (analytics.md → GTM) |
| GA hit with consent GRANTED | `setDefaultConsent` not before the tag — `<Analytics>` must be inside `<ConsentProvider>` (`SiteProviders` does this itself) |
| YouTube / Maps before consent (warning) | `ConsentScript` (consent.md), `youtube-nocookie.com` or "click to load" |

4. The "after accept" section shows what starts after consent — compare it with the IDs in Site
   Integrations (e.g. is Meta Pixel there, if the client has one). Nothing starts
   but IDs are filled in → report it as a problem to diagnose (**ipal-debug**).
5. Banner not found (`data-ipal="banner"`) → `<CookieBanner/>` is not
   rendered, or an older ipal-kit version without `data-ipal` attributes on the buttons → **ipal-upgrade**.

The script needs buttons with `data-ipal="accept"` / `"reject"` — the plugin's
`CookieBanner` has them in every `settings` mode (`inline`, `modal`, `detailed`). A custom banner in the project violates AGENT.md §7.

## Cookie list from the panel (`cookieScanner`)

When the project has `ipalKit({ cookieScanner: true })` (cookie-scanner.md), the editor fills the
list in the panel and you check it:

1. Not on yet → turn it on, `pnpm generate:importmap`, `pnpm payload migrate:create cookie-scanner`
   (Postgres), commit the migration. Embeds and widgets the plugin does not inject (YouTube, maps,
   chat): add them as `cookieScanner.declarations` (or an `integrations` entry with `isEnabled`) —
   never a hand-typed list in code.
2. *Privacy → Cookies → Review and approve* → **Scan cookies** (with `adminLayout: 'separate'`: *Privacy → Cookie review*). "Integrations in use" must match the IDs in Site
   Integrations; a filled ID that is missing → **ipal-debug**.
3. Run the browser scan below and paste every cookie it reports as unknown into **More cookie
   names**, scan again. Cookies marked **Needs description** need provider, category and
   purpose: ask the client, do not guess (Edit on the approval page opens the entry).
4. **Approve** in the same tab (also at `/admin/cookie-approval`): the cookies are grouped by category, new /
   changed / needs-description marked. Untick anything that should not be listed, then **Approve
   and add** — every ticked cookie goes to Cookies → Cookie list in every language (and so
   to the cookie policy table and the banner's detailed window); existing text is never
   overwritten, no row is duplicated. Unknown cookies land in `marketing` (or
   `approval.unknownCategory`) flagged "Needs description" — describe them before handover.
   Open the banner's "Settings" and check each category lists its cookies. A project with
   `approval: false` accepts entry by entry (Status → Accepted, bulk edit works).
5. *No longer found* on the approval page = a cookie a scan stopped seeing; it stays in the cookie
   list. Remove the row there only when the site really no longer sets it.
6. Database lookups come with category `functional` when the Open Cookie Database says
   "Functional" (it files some trackers there) — lower to `necessary` only when the cookie really
   is needed for the site to work.

## Pre-consent check from the panel (`cookieScanner.crawl`)

When the project has `cookieScanner: { crawl: true }` (cookie-scanner.md → Browser crawl):

1. Not on yet and the client wants it → turn it on; env `IPAL_COOKIE_SCAN_URL` +
   `IPAL_COOKIE_SCAN_TOKEN` (`openssl rand -hex 32`) in Coolify; ask the team to add
   `<host>=<token>` to the scanner service's `IPAL_CRAWLER_SITES`; `generate:importmap`,
   `migrate:create cookie-crawl`. Never add Playwright or Chromium to the site.
2. *Cookie review* → **Check site**. "Check site" disabled → the box names the missing variable.
   Failed → *Privacy → Cookie check → Error* ("Could not reach the scanner service" = URL / DNS /
   firewall; a Cloudflare challenge page = allow the Coolify server's IP).
3. Filter the list by **Violation**: every entry is a non-necessary cookie or key stored before
   consent — fix it as in the table above (or, if it really is necessary, set its category and accept
   it). *Cookie check → Violations* also lists tracker **requests** before consent.
4. Describe the cookies marked **Needs description**, approve on *Approve cookies* (the dashboard
   links there while cookies wait), then crawl again: 0 violations and nothing waiting is the goal
   before handover. A crawl never adds anything to the cookie banner by itself.
5. Optional: recipients in *Cookie check → Warning e-mails to* (the e-mail also says when cookies
   wait for approval and links to the approval page), and a weekly Coolify scheduled task
   `curl -X POST -H "Authorization: Bearer $IPAL_COOKIE_SCAN_TOKEN" $NEXT_PUBLIC_SERVER_URL/api/ipal/cookie-crawl`.
   Record both in `AGENTS.md` → "Project decisions".

## Cookie list for the cookie policy (cookie-scan)

After every change of tools (new pixel, chat, map, video) and before handing the site over
(with `cookieScanner` on, use step 1 below to find what really appears in the browser, then feed the
unknown names to the panel scan above instead of step 2):

1. Scan the running site (without consent and after "Accept all", homepage + up to 10 pages from the sitemap):
   ```bash
   node .agents/skills/ipal-consent-check/scripts/cookie-scan.mjs http://localhost:3000 --lang pl
   ```
   Output: `cookie-scan/cookies.json` and `cookie-scan/cookies.md` (table). `[ERROR]` = a
   **non-necessary cookie set before consent** — fix it as in the table above. `[WARNING] unknown` —
   find the provider and purpose, set `category` (`necessary|functional|analytics|marketing`) and `purpose`
   in `cookies.json`. Do not guess — ask if you do not know.
2. Import into the panel (Cookies → Cookie list), each language separately (scan with `--lang en` for English):
   ```bash
   LOCALE=pl pnpm payload run .agents/skills/ipal-consent-check/scripts/import-cookies.ts cookie-scan/cookies.json
   ```
   It merges by name and does not overwrite editor changes (`OVERWRITE=1` forces it). It does not delete cookies
   the scan did not see — the editor does that in the panel. The same list feeds the
   `<CookieBanner settings="detailed">` window (an expandable list under each category) — after the import open
   "Settings" in the banner and check that every category shows its cookies and that the labels
   (Cookies → Settings window → Cookie list headings) are in that language.
3. The cookie policy page shows the table from the panel — **do not paste the list into the policy text**:
   ```tsx
   import { getCookieTable } from '@intecion/ipal-kit'
   import { CookieTable } from '@intecion/ipal-kit/rsc'
   import { getCachedPayload, getSiteShell } from '@/lib/content'
   const rows = await getCookieTable({ payload: await getCachedPayload(), locale })
   const { consent } = await getSiteShell(locale)   // category names from Cookie banner
   <CookieTable rows={rows} categories={consent.categories} labels={labels} />
   ```
   `labels` = `{ name, category, provider, purpose, duration }` (all required). The plugin panel
   has only `provider` / `purpose` / `duration` (Cookies → Settings window → Cookie list headings = `consent.details`);
   take the `name` and `category` headers from (localized) fields of the project block. The table is unstyled
   (`classNames`: `table`, `caption`, `tr`, `th`, `td`; optional `caption`). A project "Cookie
   table" block on the policy page is a good place — then the editor decides where it appears.

Lifetime: Chrome caps every cookie at max. 400 days (13 months) — the scan shows what
really stays in the browser. localStorage keys (e.g. `theme` — the chosen theme) are listed separately; in the panel they are entries of type *Local storage* (the scanner declares the theme key itself when the theme switch is on). Check that every storage row in *Cookies → Cookie list* has the right **Type** — rows from before the type existed are *Cookie*.
