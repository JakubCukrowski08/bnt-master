import type { Metadata } from 'next'

import { buildIconsMetadata } from '@intecion/ipal-kit'
import { AlternateLinksProvider, CookieBanner } from '@intecion/ipal-kit/client'
import { SiteProviders } from '@intecion/ipal-kit/rsc'
import { Space_Grotesk, Inter } from 'next/font/google'
import { notFound } from 'next/navigation'

import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { getConfiguredLocales, getSettings, getSiteShell } from '@/lib/content'
import { getCompany, getFooter, getHeader } from '@/lib/globals'

import './styles.css'
import { i18nConfig } from '@/i18n.config'

// Fixed slot names from the token standard: --font-family-body / --font-family-heading (design-tokens.md)
const body = Inter({ display: 'swap', subsets: ['latin', 'latin-ext'], variable: '--font-family-body' })
const heading = Space_Grotesk({ display: 'swap', subsets: ['latin', 'latin-ext'], variable: '--font-family-heading' })

type Props = { children: React.ReactNode }

// Favicon + apple-touch-icon from Site settings → Favicon
export async function generateMetadata(): Promise<Metadata> {
  const locale = i18nConfig.defaultLocale
  const favicon = (await getSettings(locale))?.favicon
  return buildIconsMetadata(typeof favicon === 'object' ? favicon : null)
}

export default async function LocaleLayout({ children }: Props) {
  const locale = i18nConfig.defaultLocale
  if (!(await getConfiguredLocales()).includes(locale)) {notFound()}
  const [shell, settings, header, footer, company] = await Promise.all([
    getSiteShell(locale),
    getSettings(locale),
    getHeader(locale),
    getFooter(locale),
    getCompany(locale),
  ])
  return (
    // suppressHydrationWarning: ThemeScript sets data-theme on <html> before hydration (pages are ISR, one HTML for all)
    <html className={`${body.variable} ${heading.variable}`} lang={locale} suppressHydrationWarning>
      {/* NO <head> — Next manages it */}
      <body className="flex min-h-screen flex-col bg-bg font-body text-fg antialiased">
        <SiteProviders
          banner={<CookieBanner controls="switch" equalChoice settings="detailed" />}
          lightbox
          logEndpoint="/api/ipal/consent"
          shell={shell}
          theme
        >
          <AlternateLinksProvider>
            <Header header={header} locale={locale} settings={settings} />
            <main className="flex-1" id="main">{children}</main>
            <Footer company={company} footer={footer} locale={locale} />
          </AlternateLinksProvider>
        </SiteProviders>
      </body>
    </html>
  )
}
