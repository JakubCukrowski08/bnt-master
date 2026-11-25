import type { I18nConfig } from '@intecion/ipal-kit'
export const i18nConfig = { defaultLocale: 'pl', locales: [{ code: 'pl', label: 'Polski' }] } as const satisfies I18nConfig
export type Locale = (typeof i18nConfig.locales)[number]['code']
