import 'server-only'
import { createContentHelpers } from '@intecion/ipal-kit'
import { faqItemsFromLayout } from '@intecion/ipal-kit/blocks'
import config from '@/payload.config'
import { contentConfig } from '@/content.config'
import { i18nConfig } from '@/i18n.config'
export const { getCachedPayload, getSettings, getConfiguredLocales, getConstructionMode, resolveRoute, getEntries, getNotFoundPage, generatePageMetadata, generateStaticParams, getPageJsonLd, resolvePageRedirect, i18n, getSiteShell, getFormTexts, getLinkOptions, getHomeSlug, resolveLink: pluginResolveLink, resolveNav, getSystemLinks, sitemap, sitemapRoute, getRobots, manifest, llmsRoute, llmsFullRoute, markdownRoute, mcpGET, mcpPOST, healthRoute, indexNowKeyRoute } = createContentHelpers({ config, content: contentConfig, i18n: i18nConfig, baseUrl: process.env.NEXT_PUBLIC_SERVER_URL, markdownAlternate: true, summaryField: 'aiSummary', mcp: { serverName: 'bnt-site' }, pageJsonLd: { faq: faqItemsFromLayout } })

// WORKAROUND ipal-kit 1.16.6: docs/plugin-requests/2026-11-24-single-language-entry-links.md
// The plugin already resolves the relation and archive; only remove its extra locale prefix.
export async function resolveLink(...args: Parameters<typeof pluginResolveLink>) {
 const result = await pluginResolveLink(...args)
 const [link, locale] = args
 const page = link?.page
 const collection = page && typeof page === 'object' && 'relationTo' in page ? page.relationTo : undefined
 if (result && i18nConfig.locales.length === 1 && link?.type === 'internal' && contentConfig.collections.some(c => c.slug === collection) && result.href.startsWith(`/${locale}/`)) {
  return { ...result, href: result.href.slice(locale.length + 1) }
 }
 return result
}
