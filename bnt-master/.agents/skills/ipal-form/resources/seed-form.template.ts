/**
 * Seed of ONE form in the database — fields, confirmation, and the two e-mails
 * every site needs: a notification to the company and a confirmation to the
 * person who sent it. Copy to scripts/seed-form-<name>.ts, fill FORM from the
 * brief (every language), run (rules: docs/seeding.md):
 *
 *   SEED_DRY_RUN=1 pnpm payload run scripts/seed-form-contact.ts  # no writes: prints create / skip / update
 *   pnpm payload run scripts/seed-form-contact.ts                 # creates the form if missing, never overwrites
 *   SEED_UPDATE=1 pnpm payload run scripts/seed-form-contact.ts   # also updates it if nobody edited it since seeding
 *   (`--dry-run` after the script path works too.)
 *
 * Safety (createSeeder from @intecion/ipal-kit/seed): the form is matched by its
 * title; nothing is ever deleted. SEED_UPDATE=1 is refused when NODE_ENV=production
 * or the database is not local, unless IPAL_SEED_ALLOW_PROD_UPDATE=1 is also set —
 * back up the database first. A form an editor changed is skipped and reported
 * ("skip (edited)"). Every language is written with `fallbackLocale: false` onto the
 * same row ids (fields, options, e-mails).
 *
 * Nothing about the company lives in this file. The notification address comes
 * from the panel — NOTIFY.global / NOTIFY.field below (the project's company
 * global) — or SEED_NOTIFY_EMAIL for a first run. Without an address the script
 * stops: a form whose submissions reach nobody is a bug, not a default.
 *
 * Safe to send to {{email}}: submitForm accepts exactly one address in an
 * `email` field (no extra recipients, no header injection).
 */
import config from '@payload-config'
import { createSeeder, guardSeedExit } from '@intecion/ipal-kit/seed'
import { getPayload } from 'payload'

// ─── fill from the brief ────────────────────────────────────────────────────
const FORM = {
  /** Unique, not shown to visitors — the seed finds the form by it. */
  title: 'Contact form',
  fields: [
    { blockType: 'text', name: 'name', required: true, width: 50, label: { pl: 'Imię i nazwisko', en: 'Full name' } },
    { blockType: 'email', name: 'email', required: true, width: 50, label: { pl: 'E-mail', en: 'E-mail' } },
    { blockType: 'text', name: 'phone', required: false, width: 50, label: { pl: 'Telefon', en: 'Phone' } },
    { blockType: 'textarea', name: 'message', required: true, width: 100, label: { pl: 'Wiadomość', en: 'Message' } },
    // Step-by-step form: a `step` block starts a new screen (title/description per language).
    //   { blockType: 'step', title: { pl: 'Projekt', en: 'Project' } },
    // Choice lists (option labels per language, values stay the same):
    //   { blockType: 'radio', name: 'budget', required: true, label: { pl: 'Budżet', en: 'Budget' },
    //     options: [{ value: 's', label: { pl: 'do 10 tys.', en: 'up to 10k' } }, …] },
    //   { blockType: 'checkboxGroup', name: 'services', maxSelected: 3, label: {…}, options: [ …same shape… ] },
    //   { blockType: 'date', name: 'deadline', label: { pl: 'Termin', en: 'Deadline' } },
    // A file sent to the company by e-mail — never stored on the site (needs `forms: { attachments: true }`).
    // It rides on the notification below (fixed recipient); the confirmation to {{email}} never carries it.
    //   { blockType: 'file', name: 'attachment', required: false, width: 100, allowedTypes: ['pdf', 'doc', 'docx'],
    //     maxSizeMB: 10, maxFiles: 1, label: { pl: 'Załącznik (opcjonalnie)', en: 'Attachment (optional)' },
    //     help: { pl: 'PDF, DOC lub DOCX, do 10 MB', en: 'PDF, DOC or DOCX, up to 10 MB' } },
    // GDPR consent — name MUST stay `consent`; never pre-ticked (the plugin enforces it server-side).
    {
      blockType: 'checkbox',
      name: 'consent',
      required: true,
      width: 100,
      label: {
        pl: 'Zgadzam się na przetwarzanie moich danych w celu odpowiedzi na wiadomość.',
        en: 'I agree to the processing of my data to answer this message.',
      },
    },
  ],
  submitButtonLabel: { pl: 'Wyślij', en: 'Send' },
  confirmation: {
    pl: 'Dziękujemy! Odpowiemy najszybciej, jak to możliwe.',
    en: 'Thank you! We will get back to you as soon as possible.',
  },
  /** E-mail to the company. {{*:table}} = every field as a table. */
  notification: {
    subject: { pl: 'Nowa wiadomość ze strony od {{name}}', en: 'New website message from {{name}}' },
    message: { pl: 'Nowe zgłoszenie z formularza:\n\n{{*:table}}', en: 'New form submission:\n\n{{*:table}}' },
  },
  /** E-mail to the sender. */
  confirmationEmail: {
    subject: { pl: 'Otrzymaliśmy Twoją wiadomość', en: 'We received your message' },
    message: {
      pl: 'Dzień dobry {{name}},\n\ndziękujemy za wiadomość — odpowiemy wkrótce.\n\nTwoje zgłoszenie:\n{{*:table}}',
      en: 'Hello {{name}},\n\nthank you for your message — we will reply shortly.\n\nYour submission:\n{{*:table}}',
    },
  },
} as const

/** Where the company's address lives in the panel (project global + field). */
const NOTIFY = { global: 'company', field: 'email' }
// ────────────────────────────────────────────────────────────────────────────

/** Plain text (with blank-line paragraphs) → Lexical rich text, as form-builder messages expect. */
function richText(text: string) {
  return {
    root: {
      children: text.split(/\n{2,}/).map((para) => ({
        children: para.split('\n').flatMap((line, i) => [
          ...(i ? [{ type: 'linebreak', version: 1 }] : []),
          { detail: 0, format: 0, mode: 'normal', style: '', text: line, type: 'text', version: 1 },
        ]),
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
      })),
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  }
}

// An early exit (Payload never up, the run cut short) fails with exit 1 instead of a silent 0 (docs/seeding.md).
guardSeedExit({ label: '[seed-form]' })
const payload = await getPayload({ config })
// Options (docs/seeding.md § Turn off, override, extend) — env vars work without editing this file.
// A form seed touches exactly one record — this form (matched by its title). After launch that stays true:
// it never re-seeds other forms, and an edited form is skipped (docs/seeding.md, "after launch").
const seed = createSeeder(payload, { label: '[seed-form]', only: [`forms:${FORM.title}`] })

// Notification address — from the panel, never from this file.
let notifyTo = process.env.SEED_NOTIFY_EMAIL?.trim() ?? ''
if (!notifyTo) {
  try {
    const g = (await payload.findGlobal({ slug: NOTIFY.global as never, depth: 0 })) as Record<string, unknown>
    notifyTo = typeof g[NOTIFY.field] === 'string' ? (g[NOTIFY.field] as string).trim() : ''
  } catch {
    // no such global — handled below
  }
}
if (!/^[^\s@,;]+@[^\s@,;]+\.[^\s@,;]+$/.test(notifyTo)) {
  console.error(
    `[seed-form] No notification address. Fill ${NOTIFY.global} → ${NOTIFY.field} in the panel ` +
      '(or run with SEED_NOTIFY_EMAIL=…). Ask the client which inbox gets the submissions — do not guess.',
  )
  process.exit(1)
}

type Localized = Readonly<Record<string, string>>
/** { pl: 'text', en: 'text' } → { pl: <rich text>, en: <rich text> } — still one value per locale. */
const rich = (v: Localized) => Object.fromEntries(Object.entries(v).map(([l, text]) => [l, richText(text)]))

const result = await seed.upsertBy('forms', { title: FORM.title }, {
  title: FORM.title,
  fields: FORM.fields,
  submitButtonLabel: FORM.submitButtonLabel,
  confirmationType: 'message',
  confirmationMessage: rich(FORM.confirmation),
  emails: [
    { emailTo: notifyTo, replyTo: '{{email}}', subject: FORM.notification.subject, message: rich(FORM.notification.message) },
    { emailTo: '{{email}}', replyTo: notifyTo, subject: FORM.confirmationEmail.subject, message: rich(FORM.confirmationEmail.message) },
  ],
})

const { errors } = seed.summary()
if (result.status === 'create' || result.status === 'update') {
  console.log(`Notifications to ${notifyTo}, confirmation to the sender.`)
  console.log('Next: place the form in a Form block on the contact page, then Site Integrations → Send test.')
}
process.exit(errors ? 1 : 0)
