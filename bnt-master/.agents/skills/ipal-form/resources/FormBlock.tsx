// src/blocks/FormBlock/Component.tsx — a panel form inside a section. Logic, steps,
// validation, Turnstile, honeypot and rich text come from ipal-kit; the look is
// formClasses (one file for every form on the site).
// Block config (src/blocks/FormBlock/config.ts): slug 'formBlock', fields
//   buildSectionHeaderField(), { name: 'form', type: 'relationship', relationTo: 'forms', required: true },
//   buildSectionSettingsField()
// Page query depth ≥ 1, otherwise `form` is just an ID (RenderForm renders nothing).
// `formTexts` and `sendForm` arrive via createPageRoute blockProps (ipal-form SKILL §4).
import type { FormNotificationTexts } from '@intecion/ipal-kit'
import { RenderForm, type SendFormAction } from '@intecion/ipal-kit/rsc'
import type { FormBlock as FormBlockData } from '@/payload-types'
import { formClasses } from '@/components/forms/formClasses'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'

type Props = FormBlockData & { locale: string; formTexts?: FormNotificationTexts; sendForm?: SendFormAction }

export function FormBlock({ form, header, settings, locale, formTexts, sendForm }: Props) {
  if (!formTexts || !sendForm) return null // never a fake/hardcoded form
  return (
    <Section settings={settings}>
      <SectionHeader header={header} />
      <RenderForm form={form} action={sendForm} locale={locale} texts={formTexts} classNames={formClasses} />
    </Section>
  )
}
