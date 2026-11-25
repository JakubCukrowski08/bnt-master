import { cache } from 'react'

import type { Locale } from '@/i18n.config'

import { getCachedPayload } from './content'

/** Cached getters for the project's own globals — the layout passes them down as props (ipal-nav). */
export const getHeader = cache(async (locale: string) => (await getCachedPayload()).findGlobal({ slug: 'header', depth: 1, locale: locale as Locale }))
export const getFooter = cache(async (locale: string) => (await getCachedPayload()).findGlobal({ slug: 'footer', depth: 1, locale: locale as Locale }))
export const getCompany = cache(async (locale: string) => (await getCachedPayload()).findGlobal({ slug: 'company', locale: locale as Locale }))
