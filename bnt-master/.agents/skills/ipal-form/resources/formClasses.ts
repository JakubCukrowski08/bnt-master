// src/components/forms/formClasses.ts — the ONLY place forms are styled. Every
// panel form (RenderForm / BuilderForm) uses it. Design-token utilities only
// (node_modules/@intecion/ipal-kit/docs/design-tokens.md): a brand changes
// src/design/tokens.ts, never this file. Delete keys you don't need.
import type { BuilderFormClassNames } from '@intecion/ipal-kit/client'
import { buttonClass } from '@intecion/ipal-kit/blocks/rsc'

const control =
  'w-full rounded-control border border-border-strong bg-surface px-3 py-2 text-fg placeholder:text-fg-muted ' +
  'transition-colors duration-fast ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus ' +
  'aria-invalid:border-danger'

export const formClasses: BuilderFormClassNames = {
  form: 'grid gap-6',
  progress: 'text-sm text-fg-muted',                    // "Step 1 of 3"
  step: 'grid gap-4',
  stepTitle: 'text-h4',
  stepDescription: 'text-fg-muted',
  fields: 'grid grid-cols-12 gap-4',
  field: 'col-span-12',
  fieldHalf: 'md:col-span-6',                           // width ≤ 50 in the panel
  label: 'mb-1 block font-medium text-fg-strong',
  input: control,
  textarea: control,
  select: control,
  checkboxLabel: 'flex items-start gap-2',
  choices: 'grid gap-2',                                 // radio / checkbox group <fieldset>
  legend: 'mb-1 font-medium text-fg-strong',
  choice: 'flex items-center gap-2',
  // File field (forms.attachments): the native input, its help text, the list of picked files.
  file: 'block w-full text-fg file:mr-3 file:rounded-control file:border-0 file:bg-surface-muted file:px-3 file:py-2 file:text-fg-strong',
  help: 'mt-1 text-sm text-fg-muted',
  fileList: 'mt-2 grid gap-1 text-sm',
  fileItem: 'flex flex-wrap items-center gap-2',
  fileRemove: 'underline underline-offset-2',
  error: 'mt-1 text-sm text-danger',
  formError: 'rounded-control bg-danger-surface p-4 text-danger',
  actions: 'flex flex-wrap gap-3',
  back: buttonClass('secondary'),                        // the same looks as the section buttons
  submit: buttonClass('primary'),
  success: 'rounded-card bg-success-surface p-6 text-success',
}
