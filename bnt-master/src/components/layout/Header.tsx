
import { buttonClass, Container, Media } from '@intecion/ipal-kit/blocks/rsc'
import Image from 'next/image'
import Link from 'next/link'

import type { Header as HeaderData } from '@/payload-types'

import { i18nConfig } from '@/i18n.config'

import { resolveLink, resolveNav } from '@/lib/content'


import { MobileNav } from './MobileNav'

type Props = { header: HeaderData; locale: string; settings: null | Record<string, unknown> }

/** Site header: logo and name from Site settings, menu from the Header global (ipal-nav). */
export async function Header({ header, locale, settings }: Props) {
  const items = await resolveNav(header.navItems, locale)
  const cta = header.links?.[0]?.link ? await resolveLink(header.links[0].link, locale) : null
  const home = '/'
  const logo = settings?.logo && typeof settings.logo === 'object' ? (settings.logo as Record<string, unknown>) : null
  return (
    <header className="sticky top-0 z-header border-b border-border bg-surface-raised/95 backdrop-blur">
      <Container className="flex items-center justify-between gap-6 py-4">
        <Link className="flex items-center gap-3 font-heading text-h4 text-fg-strong" href={home}>
          {logo ? <Media alt="" className="h-8 w-auto" Image={Image} priority resource={logo} sizes="160px" /> : null}
          <span>{typeof settings?.siteName === 'string' ? settings.siteName : null}</span>
        </Link>
        <nav aria-label={header.menuLabel ?? undefined} className="hidden md:block">
          <ul className="flex items-center gap-6">
            {items.map((item) => (
              <li key={item.href}>
                <Link className="text-fg hover:text-link-hover" href={item.href} {...item.targetProps}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3">

          {cta?.href ? (
            // wrapper: buttonClass carries its own inline-flex, so `hidden` goes on the parent
            <span className="hidden md:block">
              <Link className={buttonClass('primary')} href={cta.href}>
                {cta.label}
              </Link>
            </span>
          ) : null}
          <MobileNav items={items} menuLabel={header.menuLabel ?? ''} />
        </div>
      </Container>
    </header>
  )
}
