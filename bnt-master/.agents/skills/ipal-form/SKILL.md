---
name: ipal-form
description: Wires forms the ipal-kit way — forms built by the editor in the panel (form-builder Forms collection), one generic renderer, one server action with submitForm (rate limit, Turnstile, schema validation, GDPR consent), honeypot, panel texts from Notifications, emails from Forms → Emails over mailAdapter, GTM events from the panel. Use for any contact/lead/newsletter/quote form, a form block, "the form doesn't send", "no email arrives", spam, or Turnstile problems.
---

# ipal-form

**ipal-kit first (hard rule, AGENT.md "ipal-kit first"):** anything the plugin covers is built with the
plugin's feature. It does not work or is not enough → report it with **ipal-plugin-gap** and wait for the owner's
decision on that part; no hand-built replacement, no silent workaround. **Code rules:** AGENT.md "Code rules"
(one job per file/component/function, no duplicates, typed, texts from the panel, a check for new behaviour).

**The editor builds the form in the panel. The project has the action, a block with `<RenderForm>` and the classes.** Every
further form — including multi-step ones and ones with choice lists — is panel work only. Fields/labels typed by hand in JSX = an error
(ipal-audit catches it). API details: `docs/forms.md`, `turnstile.md`, `notifications.md`, `email.md`.

## 1. Config (once per project)
```ts
// payload.config.ts
import { ipalKit, mailAdapter, buildFormAnalyticsFields } from '@intecion/ipal-kit'
export default buildConfig({
  email: mailAdapter(),                       // without this, emails from Forms → Emails are not sent
  plugins: [ipalKit({
    i18n: i18nConfig,
    forms: {
      redirectRelationships: ['pages'],
      formOverrides: { fields: ({ defaultFields }) => [...defaultFields, ...buildFormAnalyticsFields()] },
    },
  })],
})
```
`@payloadcms/plugin-form-builder` in the project's `dependencies` **at the same version as
`payload`** (a mismatch = no Forms collection). After a change: `generate:types`,
`generate:importmap`, restart.

## 2. Layout — Turnstile once
`<SiteProviders shell={await getSiteShell(locale)}>` in `[locale]/layout.tsx` (PROGRAMISTA §2.8)
wires `TurnstileProvider` with the key from the panel — **always**; never make the provider or the widget conditional.
Custom layout without SiteProviders: `<TurnstileProvider siteKey={shell.turnstileSiteKey}>` (turnstile.md).
Plugin behavior: **both keys** (panel or env) → the widget is visible and `submitForm`
**requires** a token (a bot cannot get around it by not sending one); no keys → no widget,
no verification, the form works; one key → off + an alert on the dashboard.

## 3. Code — import, not copy
The renderer, steps, validation, Turnstile, honeypot, redirect and GTM event live in the
plugin. The project keeps **three short files**:

| File | Into the project | Role |
|---|---|---|
| `resources/actions.ts` | `src/app/(frontend)/[locale]/actions.ts` | `export const sendForm = createSubmitAction({ getCachedPayload, headers })` |
| `resources/FormBlock.tsx` | `src/blocks/FormBlock/Component.tsx` | `<RenderForm>` from `/rsc` + project classes, inside `<Section>`/`<SectionHeader>` |
| `resources/formClasses.ts` | `src/components/forms/formClasses.ts` | the **only** place for form styling (classes from DESIGN.md) |
| `resources/seed-form.template.ts` | `scripts/seed-form-<name>.ts` | the form in the database: fields, confirmation, email to the company + to the customer, every language |

`RenderForm` (server) renders the "message" blocks and the confirmation via `RenderRichText`,
binds the action to the form and the language, resolves the redirect and **sends only the
public part of the form to the browser** (the Emails tab with the company addresses never reaches the HTML).
Underneath is `BuilderForm` (client) — clean, accessible HTML **without styles**: the look = `classNames`
(+ the `data-ipal`, `data-type`, `data-width`, `data-step` attributes).

**Field types in the panel:** text, email, textarea, number, **date**, **time**, select, **radio** (single choice),
checkbox, **Checkbox group** (multiple choice, min/max), message, **Step** (splits into steps),
country, state (on by default in form-builder, rendered as a text field).
Turning a type off: `forms.fields: { country: false, state: false }`.
With `forms: { attachments: true }` there is also **File** (section 3a).
- **Multi-step form:** the editor inserts a **Step** block (title, description) — the fields below it form one
  screen. The Next/Back buttons and "Step 1 of 3" come from **Form messages → Form messages** (next, back,
  stepOf). Next validates only the current step; a server error returns to the step with the field; focus
  moves to the new step. No Step = one screen.
- `width` ≤ 50 → class `fieldHalf`, otherwise `fieldFull`.

**Unusual form** (option cards instead of radios, a summary before sending,
a custom field type, a slider): do not copy the engine — in this order:
1. `renderField` in `BuilderForm` (a `'use client'` file): replace chosen fields, the rest stay default
   (`defaultRender()` gives the original to wrap);
2. your own component on `useBuilderForm` — full control over markup, same logic
   (`resources/CustomForm.example.tsx`): `steps`, `step`, `next/back/goTo`, `submit`,
   `getInputProps / getTextareaProps / getSelectProps / getOptionProps`, `errors`, `TurnstileWidget`.
**Field filled in by the page** (selected product variant, category, offer): in the panel a plain text field
(e.g. `subject`), in code `RenderForm values={{ subject }}`; a value changed in the browser →
`prepareBuilderForm` (server) + `<BuilderForm values>` (client). Never a copy of `publicForm` in the project (forms.md).
Custom field type in the panel: the `FormsOption['fields']` type only accepts `boolean` for known types
(at runtime the block object passes through to form-builder, but TS rejects it), and the server treats
an unknown type as text anyway — if you need a custom type or validation → **plugin gap** (`ipal-plugin-gap`).

## 3a. A file on a form (CV, specification, photo) — `forms.attachments`
The file is **e-mailed to the company and never stored**: no Media record, no bucket, no disk, no download link.
Never build this by hand (your own `<input type="file">`, upload route or upload collection = an error).

1. Config: `forms: { attachments: true }` (defaults: 10 MB per file and per submission, at most 3 files per field).
   Options (`FormAttachmentsOption`): `maxSizeMB`, `maxTotalMB`, `maxFiles`, `fileTypes` (add / replace / `false`),
   `allowRisky`, `scan` (antivirus hook), `strictPdf`, `notice`, `maxConcurrent`, `path`, `submit`
   (`maxPerMinute`, `clientIp`, `honeypotField`, `turnstileHostnames`, `turnstileOnConfigError`, `allowedOrigins`,
   `idleTimeoutMs` 30 s, `timeoutMs` 5 min — a stalled or dropped upload is given up and frees its slot).
   Postgres: `pnpm payload migrate:create`; then `pnpm generate:types`.
2. Form: a **File** field — in the seed
   `{ blockType: 'file', name: 'attachment', allowedTypes: ['pdf', 'doc', 'docx'], maxSizeMB: 10, maxFiles: 1, label: {…}, help: {…} }`
   (the template has the line, commented). Types: `pdf`, `doc`, `docx`, `odt`, `rtf`, `xls`, `xlsx`, `jpg`, `png`, `webp`.
   The label and the help text ("PDF or DOCX, up to 10 MB") are written per language in the panel / seed.
3. E-mails: the file goes to **every e-mail whose To / CC / BCC are fixed addresses** — the company notification.
   An e-mail addressed with `{{email}}` (the confirmation to the customer) never gets it. A form with a File field
   and no fixed-recipient e-mail cannot be saved. `{{attachment}}` / `{{*:table}}` show the file name.
4. Code: nothing. `RenderForm` renders the field (native input, help text, file list, "Remove" button), and the
   browser posts files to the plugin's endpoint `POST /api/ipal/forms/submit` — no route file, no `next.config`
   change. Classes: `file`, `help`, `fileList`, `fileItem`, `fileRemove` in `formClasses.ts`. Your own markup:
   `f.getFileProps(field)`, `f.getFiles(field)`, `f.removeFile(field, i)`, `f.helpId(field)`.
5. Texts: Form messages → **Files** (`fileTooLarge`, `fileType`, `fileRefused`, `fileCount`, `fileNotSent`,
   `fileOptional`, `fileRemove`) — English and Polish defaults; fill every other language of the site. Each tells
   the visitor that the problem is the **file**, why, and what to do (a smaller file, another format; on an
   optional field also "send the form without the file"). They show at the File field; what the visitor typed stays.
6. Mail size: **Site integrations → E-mail sending → Test e-mail** with **Attach a 10 MB test file** must arrive.
   SMTP: the provider's limit decides (a 10 MB server limit carries only ~7 MB of file — lower the field's
   maximum). Microsoft Graph: files of 3 MB and more need the `Mail.ReadWrite` permission on the agency app
   (email.md "Attachments"); without it they go over SMTP when the panel has SMTP settings, else the form's limit
   drops to about 2.8 MB by itself. Keep Graph small on purpose: `mailAdapter({ graph: { largeAttachments: false } })`.

Tell the client plainly: **there is no antivirus scan** (the e-mail says so), the macro check of old `.doc` / `.xls`
files is best-effort, and when the e-mail cannot be sent the file is gone — the visitor sees "We could not send the
file …" at the File field, staff get a notice without the file, and the submission shows **File delivery: Not sent**.

## 4. Page — block data once (blocks do not import `lib/*`)
From `createPageRoute` (PROGRAMISTA §2.8):
```tsx
const route = createPageRoute(content, {
  blocks: blockRegistry, notFound, permanentRedirect,
  blockProps: async ({ locale }) => ({ formTexts: await content.getFormTexts(locale), sendForm }),
})
```
Custom page: the same in `enhanceProps` (`formTexts` from `getFormTexts(locale)`, `sendForm` from `actions.ts`).
Page query: `depth` ≥ 1 (the `form` relationship as an object). Block registry:
`formBlock: FormBlock`. A form outside a block (footer, modal) = the same `<RenderForm>`
with the form from a relationship in a global, never a copy.

## 5. Form in the database — ALWAYS via a seed (`resources/seed-form.template.ts`)
Every form from the brief is created by a script, not by hand: that makes it repeatable (dev → production),
it has every language and **both emails**, which are easy to forget:
- **notification to the company**: `emailTo` = address from the panel (company global), `replyTo: {{email}}`, body `{{*:table}}`;
- **confirmation to the customer**: `emailTo: {{email}}`, `replyTo` = company address, subject and body per language.

```bash
cp .agents/skills/ipal-form/resources/seed-form.template.ts scripts/seed-form-contact.ts
# fill FORM from the brief (fields, labels, messages, email subjects — every language), NOTIFY = global/field with the company address
pnpm payload run scripts/seed-form-contact.ts
```
The template writes the form with `createSeeder(...).upsertBy('forms', { title }, data)` from
`@intecion/ipal-kit/seed` (every language, row ids kept, edited forms skipped).
Without a notification address the script **stops** — ask the client which inbox should receive
submissions (a question from the list in ipal-site), enter it in the panel and run again. Never put the address in code.
Commit the script — in production run it after the migration: `SEED_DRY_RUN=1` first, back up the database, then
the real run (rules: `node_modules/@intecion/ipal-kit/docs/seeding.md`). Changing the form: fix FORM,
`SEED_UPDATE=1 pnpm payload run …` — it updates the form only if nobody edited it since seeding (otherwise
`skip (edited)`); on production / a non-local database it also needs `IPAL_SEED_ALLOW_PROD_UPDATE=1`.
**After launch** a form seed touches only its own form (`only: ['forms:<title>']` in the template) — never re-run
every form seed or the content seed to change one form (AGENT.md "seeding after launch").

Details the seed already covers, which you check after every manual change in the panel:
1. **Forms → the form**: fields from the brief, `name` in English, lowercase
   (`name`, `email`, `phone`, `message`, `consent`); labels per language.
2. **GDPR consent**: a `consent` checkbox, a label with a link to the policy, **not**
   ticked by default (the plugin enforces it server-side anyway → `reason: 'consent'`).
3. **Confirmation**: a message (per language) or a redirect to a "Thank you" page
   (then that page gets `noindex`).
4. **Emails**: notification to the company (`emailTo` from the company global/panel, `replyTo: {{email}}`,
   body `{{*:table}}`) **and** confirmation to the sender (`emailTo: {{email}}`) — both mandatory.
   The email field must have `name: 'email'` (the plugin accepts exactly one address in it).
5. **Analytics (GTM / dataLayer)**: Event name `generate_lead` / `form_submit`, parameters `form_name`.
6. **Site integrations**: mail transport (SMTP/Graph) + **Send test**; Turnstile keys.
7. **Form messages → form.\***: texts in every language.

## 6. Check it yourself before you say "done"
- [ ] submitting with empty required fields → errors at the fields, no request;
- [ ] a valid submission → confirmation, a record in **Form Submissions**, the email to the company arrived
      **and** the confirmation arrived at the address entered in the form
      (Send test in the panel works = transport OK; still no email → the form's Emails tab);
- [ ] unticked consent → a message from Notifications (not the English fallback);
- [ ] 6 quick submissions → `rate_limited`;
- [ ] Turnstile with keys → widget visible; submitting without solving the widget → `turnstile`;
      wrong secret → the form goes through, and the panel (dashboard + Site integrations → Spam protection) shows a red alert;
- [ ] Turnstile without keys → no widget, the form goes through;
- [ ] second language → labels and messages in that language;
- [ ] GTM Preview → an event with the name from the panel after success;
- [ ] multi-step form: Next with an empty step → errors, the step stays; Back keeps the entered values;
- [ ] form with a **File** field: a PDF arrives attached to the company e-mail, the customer e-mail has no file,
      the submission shows *Files* and *File delivery: Handed to the mail server*, Media has no new record;
      a `.exe` renamed to `.pdf` → "The file … was refused: …" at the File field, no submission, the typed answers
      still there; a file over the limit → "…is too large. Choose a file of up to N MB." before sending; each
      message in every language of the site; keyboard only: Tab to the field, pick a file, Tab to "Remove …", Enter removes it;
- [ ] `ipal-audit --quick` → zero hardcoding in FormBlock, no copy of the form engine;
- [ ] `ipal-consent-check` → still 0 violations (Turnstile is necessary, not tracking).

## Diagnostics
| Symptom | Cause → fix |
|---|---|
| no Forms collection in the panel | form-builder vs payload version mismatch → same version, `pnpm.overrides` |
| the block renders nothing | `form` is an ID (`depth` too low) or `formTexts`/`sendForm` missing in enhanceProps |
| `reason: 'validation'`, `kind: 'unknown_fields'` | the frontend sends a field the form does not have (custom renderer with an extra field, typo in `name`) |
| "Next/Back" buttons in English | empty Form messages → next / back / stepOf in that language |
| `reason: 'not_found'` | `formId` from another database (seeded on dev, another ID on prod) — use a relationship from the panel, not a fixed ID in code |
| "We could not send the file …", submission says *Not sent* | the mail server refused the message (size limit: see the note on the submission), or Graph without `Mail.ReadWrite` and no SMTP settings → Test e-mail with the 10 MB file; lower the field's maximum or fix the transport (email.md "Attachments") |
| the form with a File field cannot be saved ("Add an e-mail with a fixed recipient…") | every e-mail of the form is addressed with a placeholder → add the company notification with a fixed address |
| the File field does not appear in the builder | `forms.attachments` is off, or `forms.fields.file: false` |
| a file is refused although its type is ticked | the content does not match the extension, the name has a second extension (`cv.pdf.docx`), the document has macros, or it is password-protected |
| submission exists, no email | missing `email: mailAdapter()`, empty Emails tab, transport in the panel; server logs |
| always `turnstile` | wrong key pair / domain in Cloudflare (BuilderForm resets the token after an error) |
| the page became dynamic (`ƒ`) | `headers()` in a component instead of in the action |
| messages in English | empty Notifications in that language |
