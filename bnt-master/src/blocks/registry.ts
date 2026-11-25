import { MapSection } from '@/blocks/Map/Component'
import { getCookieTable } from '@intecion/ipal-kit'
import { createElement } from 'react'
import type { CookieTableBlock } from '@/payload-types'
import { CookieTableSection } from '@/blocks/Cookies/Component'
import { createBlockRegistry } from '@intecion/ipal-kit/blocks/rsc'
import Image from 'next/image'
import Link from 'next/link'
import { sendForm } from '@/app/(frontend)/actions'
import { formClasses } from '@/components/forms/formClasses'
import * as content from '@/lib/content'
import { getCompany } from '@/lib/globals'

export const blockRegistry = createBlockRegistry(content, {
 extra: { consentMap: MapSection, cookieTable: async (props: CookieTableBlock & { locale: string }) => {
  const [rows, shell] = await Promise.all([getCookieTable({ payload: await content.getCachedPayload(), locale: props.locale }), content.getSiteShell(props.locale)])
  return createElement(CookieTableSection, { ...props, rows, categories: shell.consent.categories })
 } },
 Image, Link, sendForm, formClassNames: formClasses, noSnippet: ['cta'],
 entryCard: (doc) => {
  const { title, shortDesc, media } = doc
  if (typeof title !== 'string') return null
  return { title, text: typeof shortDesc === 'string' ? shortDesc : null, media }
 },
 contactDetails: async (locale) => {
  const company = await getCompany(locale)
  return [
   ...(company.phone ? [{ label: company.phoneLabel ?? '', value: company.phone, href: 'tel:' + company.phone.replace(/[^\d+]/g, '') }] : []),
   ...(company.email ? [{ label: company.emailLabel ?? '', value: company.email, href: 'mailto:' + company.email }] : []),
  ]
 },
})
