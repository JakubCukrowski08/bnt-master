import type { BuilderFormClassNames } from '@intecion/ipal-kit/client'
import { buttonClass } from '@intecion/ipal-kit/blocks/rsc'

const control =
  'w-full rounded-control border border-border bg-surface px-3 py-2 text-fg placeholder:text-fg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus'

/** The ONLY place panel forms are styled (ipal-form). Token utilities only — no hex, no dark:. */
export const formClasses: BuilderFormClassNames = {
  actions: 'flex flex-wrap gap-3',
  back: buttonClass('secondary'),
  checkboxLabel: 'flex items-start gap-2 text-fg',
  choice: 'flex items-center gap-2',
  choices: 'grid gap-2',
  error: 'mt-1 text-sm text-danger',
  field: 'col-span-12',
  fieldHalf: 'md:col-span-6',
  fields: 'grid grid-cols-12 gap-4',
  form: 'grid gap-6',
  formError: 'rounded-control bg-danger-surface p-3 text-danger',
  file: 'block w-full text-fg file:mr-3 file:rounded-control file:border-0 file:bg-surface-muted file:px-3 file:py-2 file:text-fg-strong',
  fileItem: 'flex flex-wrap items-center gap-2',
  fileList: 'mt-2 grid gap-1 text-sm',
  fileRemove: 'underline underline-offset-2',
  help: 'mt-1 text-sm text-fg-muted',
  input: control,
  label: 'mb-1 block font-medium text-fg-strong',
  legend: 'mb-1 font-medium text-fg-strong',
  progress: 'text-sm text-fg-muted',
  select: control,
  step: 'grid gap-4',
  stepDescription: 'text-fg-muted',
  stepTitle: 'font-heading text-h4 text-fg-strong',
  submit: buttonClass('primary'),
  success: 'rounded-card bg-success-surface p-6 text-fg',
  textarea: `${control} min-h-32`,
}
