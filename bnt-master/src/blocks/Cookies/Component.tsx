import type { CookieTableRow, ConsentTexts } from '@intecion/ipal-kit'
import { CookieTable } from '@intecion/ipal-kit/rsc'
import { Section, SectionHeader } from '@intecion/ipal-kit/blocks/rsc'
import type { CookieTableBlock } from '@/payload-types'
type Props = CookieTableBlock & { locale: string; rows: CookieTableRow[]; categories: ConsentTexts['categories'] }
export function CookieTableSection({ header, settings, rows, categories, locale }: Props) {
 return <Section block="cookieTable" settings={settings ? { ...settings } : undefined}>
  <SectionHeader header={header} />
  <div className="overflow-x-auto"><CookieTable categories={categories} locale={locale} rows={rows} classNames={{ table: 'w-full text-left text-sm', th: 'border-b border-border p-3 font-semibold', td: 'border-b border-border p-3 align-top' }} /></div>
 </Section>
}
