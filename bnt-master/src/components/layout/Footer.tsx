import { Container } from '@intecion/ipal-kit/blocks/rsc'
import { NoSnippet } from '@intecion/ipal-kit/rsc'
import Link from 'next/link'

import type { Company, Footer as FooterData } from '@/payload-types'

import { getSystemLinks, resolveNav } from '@/lib/content'

type Props = { company: Company; footer: FooterData; locale: string }

/** Footer: link columns, company data, legal links from System pages. Inside NoSnippet (seo.md). */
export async function Footer({ company, footer, locale }: Props) {
  const [columns, legal] = await Promise.all([
    Promise.all((footer.columns ?? []).map(async (c) => ({ heading: c.heading, id: c.id, items: await resolveNav(c.items, locale) }))),
    getSystemLinks(locale),
  ])
  const address = [company.address?.street, [company.address?.postalCode, company.address?.city].filter(Boolean).join(' ')].filter(Boolean).join(', ')
  return (
    <footer className="border-t border-border bg-surface-muted text-fg" data-surface="muted">
      <NoSnippet>
        <Container className="grid gap-10 py-section-sm md:grid-cols-4">
          <div className="grid content-start gap-2">
            <p className="font-heading text-h4 text-fg-strong">{company.name}</p>
            {address ? <p className="text-fg-muted">{address}</p> : null}
            {company.phone ? <a className="text-link hover:text-link-hover" href={`tel:${company.phone.replace(/[^\d+]/g, '')}`}>{company.phone}</a> : null}
            {company.email ? <a className="text-link hover:text-link-hover" href={`mailto:${company.email}`}>{company.email}</a> : null}
            {company.taxId ? <p className="text-sm text-fg-muted">{[company.taxIdLabel, company.taxId].filter(Boolean).join(' ')}</p> : null}
          </div>
          {columns.map((column) => (
            <nav aria-label={column.heading ?? undefined} className="grid content-start gap-2" key={column.id}>
              {column.heading ? <p className="font-semibold text-fg-strong">{column.heading}</p> : null}
              <ul className="grid gap-1">
                {column.items.map((item) => (
                  <li key={item.href}>
                    <Link className="text-fg-muted hover:text-link-hover" href={item.href} {...item.targetProps}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </Container>
        <Container className="flex flex-wrap items-center justify-between gap-4 border-t border-border py-6 text-sm text-fg-muted">
          <p>© {new Date().getFullYear()} {company.legalName ?? company.name}. {footer.note}</p>
          <ul className="flex flex-wrap gap-4">
            {legal.map((link) => (
              <li key={link.href}>
                <Link className="hover:text-link-hover" href={link.href}>{link.label}</Link>
              </li>
            ))}
            {(company.socials ?? []).map((s) => (
              <li key={s.url}>
                <a className="hover:text-link-hover" href={s.url} rel="noopener noreferrer" target="_blank">{s.label}</a>
              </li>
            ))}
          </ul>
        </Container>
      </NoSnippet>
    </footer>
  )
}
