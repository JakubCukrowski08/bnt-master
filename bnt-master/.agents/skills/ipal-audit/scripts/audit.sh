#!/usr/bin/env bash
# ipal-audit — deterministic checks of an ipal-kit project against AGENT.md.
# Run from the project root:
#   bash .agents/skills/ipal-audit/scripts/audit.sh          # all checks + tsc + build
#   bash .agents/skills/ipal-audit/scripts/audit.sh --quick  # static checks only
#   bash .agents/skills/ipal-audit/scripts/audit.sh --help
# Exit code: 0 = no errors (warnings allowed), 1 = at least one error.

set -u
# UTF-8 for grep: in the C locale a multibyte class like [ąę…] matches single bytes (an en dash hit "Polish").
export LC_ALL="${LC_ALL:-C.UTF-8}"

QUICK=0
for arg in "$@"; do
  case "$arg" in
    --quick) QUICK=1 ;;
    --help|-h)
      sed -n '2,7p' "$0" | sed 's/^# \{0,1\}//'
      exit 0
      ;;
  esac
done

if [ ! -d src ]; then
  echo "ipal-audit: run from the project root (no ./src found)." >&2
  exit 2
fi

ERRORS=0
WARNINGS=0

# report LEVEL "title" "rule" <<< "$matches"
report() {
  local level="$1" title="$2" rule="$3" matches="$4"
  [ -z "$matches" ] && return 0
  local count
  count=$(printf '%s\n' "$matches" | grep -c .)
  if [ "$level" = ERROR ]; then ERRORS=$((ERRORS + count)); else WARNINGS=$((WARNINGS + count)); fi
  printf '\n[%s] %s (%s) — %s\n' "$level" "$title" "$count" "$rule"
  printf '%s\n' "$matches" | head -20 | sed 's/^/  /'
  [ "$count" -gt 20 ] && printf '  … and %s more\n' "$((count - 20))"
}

# grep that skips the starter's alternative lines (`//: …` after `file:line:`) — commented-out
# variants inside @starter:if markers, not code the site runs.
g() { grep -rnE "$@" 2>/dev/null | grep -vE '^[^:]+:[0-9]+:[[:space:]]*//:' || true; }
# drop matches that sit inside a // or /* comment (keeps http:// URLs)
# (also a whole-line comment right after grep's "file:line:" prefix)
nc() { grep -vE "^[^:]+:[0-9]+:[[:space:]]*(//|/?\*)|(^|[^:])//.*$1|/\*.*$1" || true; }
dirs() { for d in "$@"; do [ -d "$d" ] && printf '%s ' "$d"; done; }

BLOCKS=$(dirs src/blocks)
UI=$(dirs src/blocks src/components)

echo "ipal-audit — $(pwd)"

# --- Skill templates must not be compiled as project code ---
if [ -d .agents ] && [ -f tsconfig.json ]; then
  report ERROR "tsconfig.json does not exclude .agents" "skill templates (.ts/.tsx) break tsc / next build — \"exclude\": [\"node_modules\", \".agents\"]" \
    "$(tr -d '\n' < tsconfig.json | grep -qE '"exclude"[^]]*\.agents' || echo tsconfig.json)"
fi

# --- Sitemap: one route, look from the plugin (seo.md) ---
SM_TS=$(ls src/app/sitemap.ts 2>/dev/null)
SM_ROUTE=$(ls src/app/sitemap.xml/route.ts 2>/dev/null)
if [ -n "$SM_TS" ] && [ -n "$SM_ROUTE" ]; then
  report ERROR "two sitemaps" "seo.md — keep src/app/sitemap.xml/route.ts (sitemapRoute), delete src/app/sitemap.ts" "$(printf '%s\n%s' "$SM_TS" "$SM_ROUTE")"
fi
report WARNING "project copy of the sitemap stylesheet" "seo.md — sitemapRoute serves the look from the plugin; delete it (and cssUrl)" \
  "$(ls public/sitemap.css 2>/dev/null)"

# --- Architecture (AGENT.md §4) ---
report ERROR "middleware.ts exists" "§4.1 Next 16 uses proxy.ts only" \
  "$(ls src/middleware.ts middleware.ts 2>/dev/null)"

report ERROR "<head> in app" "§4.2 no explicit <head> — metadata ends up in <body>" \
  "$(g '<head[ >]' src/app --include=*.tsx | nc '<head')"

PAGES=$(find src/app -path '*\[\[...slug\]\]*' -name 'page.tsx' 2>/dev/null)
for p in $PAGES; do
  grep -q 'revalidate' "$p" || report ERROR "no ISR" "§4.3 export const revalidate" "$p"
  grep -q 'generateStaticParams' "$p" || report ERROR "no generateStaticParams" "§4.4 without it the route is dynamic and metadata lands in <body>" "$p"
  report WARNING "searchParams in catch-all page" "§4.6 deoptimizes SSG/ISR — only for paginated archives" \
    "$(grep -n 'searchParams' "$p" | nc 'searchParams' | sed "s|^|$p:|")"
done

for r in src/app/sitemap.ts src/app/manifest.ts src/app/llms.txt/route.ts src/app/sitemap.xml/route.ts src/app/api/health/route.ts; do
  [ -f "$r" ] && ! grep -q "dynamic = 'force-dynamic'" "$r" && \
    report ERROR "DB route without force-dynamic" "§4.7 build without DB will crash" "$r"
done

report ERROR "headers()/cookies() in blocks/components" "§4.6 forces dynamic rendering — pass locale via enhanceProps" \
  "$( [ -n "$UI" ] && g "from 'next/headers'" $UI)"

report ERROR "headers()/cookies() in static page tree" "§4.6 SSG/ISR → 'Page changed from static to dynamic' — not-found: LocaleView (pages.md)" \
  "$(g "from 'next/headers'" src/app --include=page.tsx --include=layout.tsx --include=not-found.tsx --include=template.tsx | grep -v '/api/\|(payload)')"

# --- Hardcoding & types (§2, §8) ---
report ERROR "hardcoded locale map / any / ts-ignore" "§2, §8" \
  "$(g 'localizedRoutes|as any\b|@ts-ignore|: any\b' src --include=*.ts --include=*.tsx | grep -v '/payload-types.ts:')"

report ERROR "hardcoded locale list" "§2 languages come from i18n.config.ts" \
  "$(g "\[ *'(pl|en|de|fr|es|it)' *, *'(pl|en|de|fr|es|it)'" src --include=*.ts --include=*.tsx | grep -v 'i18n.config.ts')"

# --- Sections (§6) ---
if [ -n "$BLOCKS" ]; then
  report ERROR "forbidden field names" "§6.5 use links/link/media (linksField, linkField, upload)" \
    "$(g "name: *'[a-zA-Z]*([cC]ta|[bB]utton|Url|Href|[pP]df|[iI]mage)[a-zA-Z]*'" $BLOCKS --include=config.ts)"

  report ERROR "hardcoded href/src/file paths in blocks" "§2, §6 use CMSLink / Media" \
    "$(g 'href=\{?["`]/|<img |/files/|/images/|\.pdf' $BLOCKS --include=*.tsx | nc '(href|<img|/files/|/images/|\.pdf)')"

  report WARNING "button styled inside a section" "§6.0 style buttons once in Button.tsx — sections render <CMSLink> (appearance from the panel)" \
    "$(g '<button[^>]*className=[^>]*(bg-|rounded|px-[0-9])' $BLOCKS --include=*.tsx)"

  report ERROR "raw <a>/<Link> in blocks" "§6.3 links from the panel render via CMSLink" \
    "$(g '<(a|Link)[ >]' $BLOCKS --include=*.tsx)"

  report ERROR "hardcoded text in blocks" "§2 every visible text comes from the panel (localized field)" \
    "$(node "$(dirname "$0")/jsx-text.mjs" $BLOCKS 2>/dev/null)"

  report WARNING "<video> outside <Media>" "§6.11b videoMode background|player via Media (videoProps)" \
    "$(g '<video[ >]' $BLOCKS --include=*.tsx)"

  report WARNING "priority outside the hero" "§6.11b exactly one LCP image per page — priority only in the first section" \
    "$(g '<Media[^>]*\bpriority\b' $BLOCKS --include=*.tsx | grep -viE '/hero')"

  report WARNING "<Media> without sizes" "§6.11b sizes = width on screen (MEDIA_SIZES.*) — without it the full-width file downloads" \
    "$(g '<Media[^>]*/>' $BLOCKS --include=*.tsx | grep -v 'sizes=')"

  report WARNING "raw YouTube iframe" "§6.11b <YouTubeEmbed> (iframe only after click, no cookies before)" \
    "$(g '<iframe[^>]*youtube' src --include=*.tsx)"

  report WARNING "inline <svg> in blocks" "§6.10 icons via media upload or Icon map" \
    "$(g '<svg[ >]' $BLOCKS --include=*.tsx)"

  report WARNING "large section component (>120 lines)" "§6.4 split into subcomponents" \
    "$(find $BLOCKS -name '*.tsx' -exec wc -l {} + 2>/dev/null | awk '$2 != "total" && $1 > 120 {print $2": "$1" lines"}')"

  report ERROR "Component imported into block config" "§6.12 payload.config must not pull React components" \
    "$(g "from '\./Component'|/Component'" $BLOCKS --include=config.ts)"
fi

if [ -d src/components ]; then
  report WARNING "hardcoded text in components/layout" "§2 texts and a11y labels from the panel — keep only symbols/numbers in code" \
    "$(node "$(dirname "$0")/jsx-text.mjs" src/components 2>/dev/null)"
fi

if [ -n "$UI" ]; then
  report WARNING "100vh / h-screen" "§6.11a use min-h-[var(--ipal-hero-min-h)] (svh, capped) — 100vh overflows on laptops and mobile bars" \
    "$(g '\b(h-screen|min-h-screen|h-\[100vh\]|min-h-\[100vh\])' $UI --include=*.tsx)"

  report WARNING "fixed pixel widths/heights" "§6.11a no w-[640px]/h-[500px] in sections — max-w-*, %, aspect-*, min()" \
    "$(g '\b(w|h|min-w|min-h)-\[[0-9]{3,}px\]' $UI --include=*.tsx)"

  report ERROR "hex colors in classes" "§6.11 use design tokens (bg-primary…)" \
    "$(g '(bg|text|border|from|to|via|fill|stroke)-\[#' $UI --include=*.tsx)"

  report WARNING "dark: on colour utilities" "§6.11 the --ipal-* roles switch with the theme — bg-surface/text-fg, no dark:bg-…" \
    "$(g '\bdark:(hover:|focus:)?(bg|text|border|from|to|via|fill|stroke|ring|outline)-' $UI --include=*.tsx)"

  report WARNING "old colour variables in classes" "§6.11 use the preset utilities (bg-primary, text-fg) — not var(--color-…)" \
    "$(g '\[var\(--color-' $UI --include=*.tsx)"

  report ERROR "hex colors in inline styles" "§6.11 use design tokens — IPAL_TOKENS / ipalVar() for a dynamic style" \
    "$(g "style=\{\{[^}]*['\"]#[0-9a-fA-F]{3,8}['\"]" $UI --include=*.tsx)"

  report ERROR "barrel index.ts" "§6.12 import files directly" \
    "$(find $UI -name 'index.ts' 2>/dev/null)"

  CLIENT=$(grep -rlE "^['\"]use client['\"]" $UI 2>/dev/null)
  for c in $CLIENT; do
    report ERROR "server import in client component" "§6.9 no payload / lib/content / server-only in 'use client'" \
      "$(grep -nE "from '(payload|server-only|@/lib/content|@/payload\.config)'" "$c" | grep -v 'import type' | sed "s|^|$c:|")"
  done
fi

# --- Design tokens (§6.11, design-tokens.md) ---
STYLES=$(find src/app -name 'styles.css' -not -path '*/node_modules/*' 2>/dev/null | head -1)
if [ -n "$STYLES" ]; then
  report WARNING "design-token standard not wired" "§6.11 styles.css imports @intecion/ipal-kit/tokens.css + tailwind.css + ../../design/tokens.css" \
    "$(grep -q 'ipal-kit/tokens.css' "$STYLES" || echo "$STYLES: no @import \"@intecion/ipal-kit/tokens.css\"")"
  report WARNING "next/font in the Tailwind font slot" "§6.11 next/font variable '--font-family-body' / '--font-family-heading' (--font-body cycles with the font-body utility)" \
    "$(grep -q 'ipal-kit/tailwind.css' "$STYLES" && g "variable: ['\"]--font-(body|heading|mono)['\"]" src/app --include=*.ts --include=*.tsx)"
fi
if [ -f src/design/tokens.ts ]; then
  [ -f DESIGN.md ] || report WARNING "no DESIGN.md" "§6.11 the brand is described in DESIGN.md (template: ipal-setup/resources/DESIGN.md)" "DESIGN.md missing"
  TOKENS_BIN=node_modules/@intecion/ipal-kit/bin/ipal-tokens.mjs
  if [ -f "$TOKENS_BIN" ]; then
    TOKENS_OUT=$(node "$TOKENS_BIN" --check 2>&1)
    [ $? -ne 0 ] && report ERROR "ipal-tokens --check" "§6.11 run pnpm exec ipal-tokens: the CSS is stale or a contrast pair fails WCAG AA" \
      "$(printf '%s\n' "$TOKENS_OUT" | grep -E '✗|out of date|ipal-tokens:' || echo 'ipal-tokens --check failed')"
  else
    report WARNING "ipal-tokens not installed" "§6.11 @intecion/ipal-kit 1.15+ ships the ipal-tokens bin" "$TOKENS_BIN missing"
  fi
fi

# --- Collections (§5.3) ---
if [ -d src/collections ]; then
  report ERROR "forbidden collection" "§5.3 settings/nav/footer are globals; FAQ/hero are blocks" \
    "$(ls src/collections | grep -iE '^(settings|navigation|nav|footer|header|faq|hero|company|danefirmy)\.ts$')"
  report WARNING "own users collection" "§5.3 ipalKit injects the auth collection — keep your own only to add fields (roles + 2FA still attach)" \
    "$(ls src/collections | grep -iE '^(users|user)\.ts$')"
  report WARNING "collections present — confirm each passed the §5.3 test" "minimum: Pages, Media" \
    "$(ls src/collections | grep -viE '^(pages|media|users|user|settings|navigation|nav|footer|header|faq|hero|company|danefirmy)\.ts$')"
fi

# --- Editor panel clarity (§6.5a) ---
SCHEMA=$(dirs src/blocks src/collections src/globals src/fields)
if [ -n "$SCHEMA" ]; then
  PANEL=$(node "$(dirname "$0")/panel-check.mjs" $SCHEMA)
  while IFS= read -r rule; do
    [ -z "$rule" ] && continue
    level=${rule%%|*}; rest=${rule#*|}
    report "$level" "panel: ${rest%%|*}" "§6.5a editor panel" "$(printf '%s\n' "$PANEL" | grep -F "$level|${rest%%|*}|" | cut -d'|' -f3-)"
  done <<< "$(printf '%s\n' "$PANEL" | cut -d'|' -f1-2 | sort -u)"
fi

# --- Plugin duplicates (§1, §7) ---
report ERROR "own block renderer switch" "§7 use RenderBlocks + registry" \
  "$(g 'switch *\(.*blockType' src --include=*.tsx --include=*.ts)"
report WARNING "files that usually duplicate the plugin" "§3 plugin has resolveRoute / getConfiguredLocales" \
  "$(ls src/lib/pages.ts src/lib/locales.ts 2>/dev/null)"
report ERROR "project copy of link fields" "links.md — use buildLinkField / buildLinksField / resolveLinkHref from the plugin" \
  "$(ls src/fields/link.ts src/lib/links.ts 2>/dev/null; g "from '@/fields/link'|from '@/lib/links'" src --include=*.ts --include=*.tsx)"
# Hand-rolled link resolution under another name (resolveHref, getHref…): the plugin knows the
# homepage from Site Settings, adds the locale prefix, drops unsafe URLs and dead links.
FRONT=$(dirs src/app src/blocks src/components src/lib src/globals src/collections)
if [ -n "$FRONT" ]; then
  report ERROR "hardcoded homepage slug" "links.md — the homepage comes from Site Settings: resolveLink(link, locale) / getHomeSlug(locale), never a slug name in code" \
    "$(g "(===|!==|==|!=) *['\"](home|homepage|strona-glowna|glowna|start|index)['\"]|['\"](home|homepage|strona-glowna|glowna|start|index)['\"] *(===|!==|==|!=)" $FRONT --include=*.ts --include=*.tsx | grep -v '/(payload)/' | grep -vE "[Tt]ype *[!=]==? *['\"]home|['\"]home['\"] *[!=]==? *[A-Za-z_.]*[Tt]ype" | nc '=')"
  report ERROR "URL built from a slug by hand" "links.md — resolveLink / resolveNav (lib/content) or buildLocalizedPath: locale prefix, homepage, unsafe and dead links" \
    "$(g '`/\$\{[^}]*[Ss]lug|`\$\{[A-Za-z_.]*\}/\$\{[^}]*[Ss]lug|['"'"'"]/['"'"'"] *\+ *[A-Za-z_.?]*[Ss]lug' $FRONT --include=*.ts --include=*.tsx | grep -v '/(payload)/' | nc '[Ss]lug')"
  # `${prefix}/kontakt`, `/${locale}/kontakt` — a page path typed into the code (fallback links)
  report ERROR "page path hardcoded in a link" "links.md — a missing link renders nothing; never a fallback to a slug typed in code" \
    "$(g '`\$\{[A-Za-z_.]*\}/[a-z][a-z0-9-]*`|`/\$\{locale\}/[a-z][a-z0-9-]*`' $FRONT --include=*.ts --include=*.tsx | grep -v '/(payload)/' | nc '`')"
fi
if [ -n "$FRONT" ]; then
  report ERROR "logic keyed on content text" "§2 the editor can rename it any time — a style/flag is a panel field (e.g. buildLinkField({ appearances: [...] }))" \
    "$(g "\.(label|title|heading|name|text)\??\.(toLowerCase|toUpperCase|trim)\(\) *[!=]==? *['\"]|\.(label|title|heading)\?? *[!=]==? *['\"][^'\"]+['\"]" $FRONT --include=*.ts --include=*.tsx | grep -v '/(payload)/' | nc '==')"
  # The panel's own { en, pl } / adminText() labels in schema files are not public text (polish-literals.mjs); without TypeScript, a plain grep.
  POLISH=$(node "$(dirname "$0")/polish-literals.mjs" $FRONT 2>/dev/null) || \
    POLISH=$(g "['\"\`][^'\"\`]*[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ][^'\"\`]*['\"\`]" $FRONT --include=*.ts --include=*.tsx | grep -v '/(payload)/' | nc '[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]')
  report ERROR "hardcoded Polish text in code" "§2 every visible text comes from the panel — legal links: getSystemLinks(locale) (page titles), labels: localized fields; panel labels: adminText() or { en, pl } in a schema file" "$POLISH"
fi
GLOBALS=$(dirs src/globals)
if [ -n "$GLOBALS" ]; then
  report ERROR "link/button fields in globals" "§6.5 Header/Footer links and buttons = buildLinkField / buildLinksField (page, URL or file + label + style), never ctaLabel/buttonUrl/…Url" \
    "$(g "name: *'[a-zA-Z]*([cC]ta|[bB]utton|Url|Href|[pP]df)[a-zA-Z]*'" $GLOBALS --include=*.ts)"
  report WARNING "page relationship in a global" "links.md — a link to a page is buildLinkField (it also handles URL, file, new tab, style); then resolveNav / resolveLink" \
    "$(g "relationTo: *'pages'" $GLOBALS --include=*.ts)"
fi
report ERROR "manual Lexical rendering" "§7 use RenderRichText" \
  "$(g 'node\.type *===' src --include=*.tsx | nc 'node')"
HTML=$(node "$(dirname "$0")/html-check.mjs" src)
while IFS= read -r rule; do
  [ -z "$rule" ] && continue
  level=${rule%%|*}; title=${rule#*|}
  report "$level" "$title" "§7 / seo.md" "$(printf '%s\n' "$HTML" | grep -F "$rule|" | cut -d'|' -f3-)"
done <<< "$(printf '%s\n' "$HTML" | cut -d'|' -f1-2 | sort -u)"

# --- Mandatory feature set (AGENT.md §0b) ---
# Every site wires all of these through the plugin. A missing one is an ERROR
# unless AGENTS.md records the client's decision: `ipal-audit-skip: mcp, llms-full — reason`.
SKIP=$(grep -hiE '^[-* ]*ipal-audit-skip:' AGENTS.md 2>/dev/null | sed 's/^[^:]*://; s/—.*//; s/ - .*//' | tr ',' ' ')
skipped() { for k in $SKIP; do [ "$k" = "$1" ] && return 0; done; return 1; }
# has <regex> <paths…> — true when any file under the paths matches
has() { local re="$1"; shift; grep -rqE "$re" "$@" 2>/dev/null; }
# need LEVEL key "what" "how" <regex> <paths…>
need() {
  local level="$1" key="$2" what="$3" how="$4" re="$5"; shift 5
  [ -n "$key" ] && skipped "$key" && return 0
  has "$re" "$@" || report "$level" "missing: $what" "§0b — $how" "$what"
}
CFG=$(ls src/payload.config.ts payload.config.ts 2>/dev/null | head -1)
APP=$(dirs src/app)

if [ -n "$APP" ]; then
  # SEO
  need ERROR '' "page metadata" "generatePageMetadata (lib/content) in generateMetadata of the page routes" 'generatePageMetadata|createPageMetadata|createMetadataGenerator|createPageRoute' src/app
  need ERROR '' "sitemap.xml route" "src/app/sitemap.xml/route.ts → sitemapRoute" 'sitemapRoute|createSitemapRouteHandler|buildSitemapEntries|sitemap' src/app/sitemap.xml src/app/sitemap.ts
  need ERROR '' "robots" "src/app/robots.ts → robots from lib/content" 'robots|buildRobots' src/app/robots.ts
  need ERROR '' "manifest" "src/app/manifest.ts → export { manifest as default } from '@/lib/content'" 'manifest|createManifestHandler|buildManifest' src/app/manifest.ts
  need ERROR '' "htmlLimitedBots" "next.config.ts — metadata must reach crawlers in <head>" 'htmlLimitedBots' next.config.ts next.config.mjs next.config.js
  need ERROR jsonld "structured data" "<SiteProviders shell={await getSiteShell(locale)}> (WebSite + Organization) or <JsonLdGraph> in [locale]/layout.tsx" 'JsonLdGraph|SiteProviders' src
  # GEO
  need ERROR llms "llms.txt" "src/app/llms.txt/route.ts → export { llmsRoute as GET } from '@/lib/content'" 'llmsRoute|createLlmsTxtRoute|buildLlmsTxt' src/app
  need ERROR llms-full "llms-full.txt" "src/app/llms-full.txt/route.ts → export { llmsFullRoute as GET } from '@/lib/content'" 'llmsFullRoute|full: *true' src/app/llms-full.txt
  need ERROR markdown "Markdown route" "src/app/md/[locale]/[[...slug]]/route.ts (one language: src/app/md/[[...slug]]/route.ts) → export { markdownRoute as GET } from '@/lib/content'" 'markdownRoute|createMarkdownRoute|createMarkdownRenderer' src/app
  need WARNING jsonld "page structured data" "[[...slug]]/page.tsx → createPageRoute (adds getPageJsonLd) or <JsonLdGraph schemas={await getPageJsonLd(locale, slug)} />" 'createPageRoute|getPageJsonLd|buildWebPageJsonLd|buildBreadcrumbJsonLd' src/app
  need ERROR markdown "Markdown in proxy" "proxy.ts → createProxy(i18nConfig, { NextResponse, markdown: true }) — without it /md/… is redirected to /<locale>/md/…" 'markdown: *(true|['"'"'"])|prefersMarkdown' src/proxy.ts proxy.ts
  need WARNING markdown "Markdown alternate link" "createContentHelpers({ markdownAlternate: true }) or markdownHref in metadata" 'markdownAlternate|markdownHref' src
  need ERROR mcp "MCP server" "src/app/api/mcp/route.ts → export { mcpGET as GET, mcpPOST as POST } from '@/lib/content' (public: AI browses the site)" 'mcpPOST|createMcpRoute' src/app
  need WARNING '' "AI summary field" "buildSummaryField() in Pages + createContentHelpers({ summaryField: 'aiSummary' })" 'buildSummaryField' src
  # Ops
  need ERROR '' "health route" "src/app/api/health/route.ts → export { healthRoute as GET } from '@/lib/content'" 'healthRoute|createHealthRoute' src/app
  need ERROR '' "env validation" "src/instrumentation.ts → assertEnv(ipalEnvRules({...})) from @intecion/ipal-kit/env" 'assertEnv' src/instrumentation.ts instrumentation.ts
  need ERROR '' "security headers" "next.config.ts → buildSecurityHeaders" 'buildSecurityHeaders' next.config.ts next.config.mjs next.config.js
  need WARNING '' "X-Powered-By hidden" "next.config.ts → export default withPayload(withSecurityConfig(nextConfig)) — Next and withPayload send X-Powered-By: Next.js, Payload (security.md)" 'withSecurityConfig|poweredByHeader: *false' next.config.ts next.config.mjs next.config.js
  need WARNING csp "Content-Security-Policy" "next.config.ts → buildSecurityHeaders({ csp: { mode: 'report-only', reportUri: '/api/csp-report', … } }) + buildAdminCspHeaders on /admin/:path*, then 'enforce' (security.md → ROLL OUT CSP)" "csp: *\\{|csp,|buildCsp|Content-Security-Policy" next.config.ts next.config.mjs next.config.js src/proxy.ts proxy.ts
  # Consent, analytics, Turnstile (layout)
  need ERROR '' "cookie consent" "<SiteProviders> (or ConsentProvider + CookieBanner + CookieButton) in [locale]/layout.tsx" 'SiteProviders|CookieBanner' src/app
  need ERROR analytics "analytics" "<SiteProviders> (loads Analytics) or <Analytics> inside ConsentProvider" 'SiteProviders|<Analytics' src/app
  need ERROR turnstile "Turnstile provider" "<SiteProviders> or <TurnstileProvider siteKey> in [locale]/layout.tsx — always, it hides itself without keys" 'SiteProviders|TurnstileProvider' src
  need WARNING turnstile "Turnstile site key" "getSiteShell(locale) (or getTurnstileConfig(payload)) — off unless BOTH keys are set" 'getSiteShell|getTurnstileConfig' src
  need WARNING '' "MediaPreconnect" "<SiteProviders> (adds it) or <MediaPreconnect/> in the layout" 'SiteProviders|MediaPreconnect' src/app
  # Forms
  need ERROR '' "form submission via the plugin" "actions.ts → export const sendForm = createSubmitAction({ getCachedPayload, headers }) (ipal-form)" 'createSubmitAction|submitForm' src
  need WARNING '' "upload sandbox headers" "next.config.ts → ...buildUploadSecurityHeaders() (uploaded SVG can't run script)" 'buildUploadSecurityHeaders' next.config.ts next.config.mjs next.config.js
  need WARNING '' "images preset" "next.config.ts → images: { ...buildImagesConfig() } (AVIF/WebP, R2 domain)" 'buildImagesConfig' next.config.ts next.config.mjs next.config.js
fi

if [ -n "$CFG" ]; then
  need ERROR '' "forms in ipalKit" "$CFG → ipalKit({ forms: {…} }) — forms are built in the panel" 'forms *:' "$CFG"
  need ERROR '' "mailAdapter" "$CFG → email: mailAdapter() — form e-mails go through the panel transport" 'mailAdapter\(' "$CFG"
  need ERROR r2 "R2 storage" "$CFG → buildR2Storage(['media'], { s3Storage }) — always wired, local disk only without R2_* env" 'buildR2Storage' "$CFG"
  # pnpm dev / generate:importmap with ipal-kit < 1.12.2 and no R2_* env dropped the storage-s3
  # client handler → blank admin in production (where R2 is on)
  if grep -q 'buildR2Storage' "$CFG" 2>/dev/null; then
    for IM in src/app/\(payload\)/*/importMap.js; do
      [ -f "$IM" ] || continue
      report ERROR "import map without the R2 upload handler" "storage.md — pnpm payload generate:importmap (ipal-kit ≥ 1.12.2 writes it with or without R2_* env); without it the production admin renders blank" \
        "$(grep -q 'S3ClientUploadHandler' "$IM" || echo "$IM")"
    done
  fi
  need ERROR r2 "@payloadcms/storage-s3" "pnpm add @payloadcms/storage-s3 (same version as payload)" '"@payloadcms/storage-s3"' package.json
  need ERROR twofactor "2FA" "$CFG → twoFactor: { issuer, plugin: payloadTotp }" 'payloadTotp' "$CFG"
  report WARNING "robots blocks AI bots" "§0b.8 — only with the client's decision in AGENTS.md" \
    "$(skipped aibots || g "aiBots: *'(disallow|block-training)'" src --include=*.ts)"
fi
# A form seed: scripts/seed-form-*.ts, or a seed file (src/seed, scripts) that seeds the forms collection.
FORM_SEED=$(ls scripts/seed-form* 2>/dev/null; grep -rlE "collection: *['\"]forms['\"]|upsertBy\( *['\"]forms['\"]|seed\.form\(|\.forms?\(" $(dirs src/seed scripts) 2>/dev/null)
if [ -n "$CFG" ] && grep -qE 'forms *:' "$CFG" 2>/dev/null && [ -z "$FORM_SEED" ] && ! skipped forms-seed; then
  report WARNING "no form seed" "ipal-form §5 — every form from a seed (scripts/seed-form-*.ts or src/seed/forms.ts: notification + sender confirmation, all languages)" "scripts/seed-form-*.ts"
fi
need WARNING r2 "R2 env in .env.example" ".env.example lists R2_BUCKET, R2_ENDPOINT, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_PUBLIC_URL" 'R2_BUCKET' .env.example
need WARNING '' "IPAL_IP_HEADER in .env.example" "header the rate limit trusts, e.g. cf-connecting-ip (forms.md)" 'IPAL_IP_HEADER' .env.example

# Plugin replacements (§0b "Forbidden substitutes")
report ERROR "own form / mail / captcha stack" "§0b — forms come from the panel builder, mail from mailAdapter, bot check from Turnstile" \
  "$(g "from '(nodemailer|resend|@sendgrid/[a-z]+|react-hook-form|formik|react-google-recaptcha|@hcaptcha/react-hcaptcha|@aws-sdk/client-s3)'" src --include=*.ts --include=*.tsx)"
report ERROR "own form/mail API route" "§0b — use the sendForm server action → submitForm" \
  "$(find src/app -type d \( -path '*api/contact*' -o -path '*api/send*' -o -path '*api/form*' -o -path '*api/mail*' -o -path '*api/newsletter*' \) 2>/dev/null)"
report ERROR "hand-written JSON-LD script" "§0b — <JsonLdGraph> escapes and wraps @graph" \
  "$(g 'application/ld\+json' src --include=*.tsx | grep -v 'JsonLdGraph')"
report ERROR "static SEO files in public/" "§0b — sitemap, robots and llms are generated from the panel" \
  "$(ls public/sitemap.xml public/robots.txt public/llms.txt public/llms-full.txt 2>/dev/null)"
report WARNING "<form> outside the form renderer" "§0b — panel forms render via <RenderForm> (a search box is fine)" \
  "$(g '<form[ >]' src --include=*.tsx | grep -v 'components/forms/')"

# Project copies of what the plugin now ships (import instead of code)
report WARNING "own form engine" "ipal-form §3 — <RenderForm> / useBuilderForm (steps, choices, Turnstile, honeypot; Emails tab never reaches the browser)" \
  "$(g 'buildValidator|useForm\(' src --include=*.tsx | grep -v 'useBuilderForm')"
report WARNING "own image lightbox" "lightbox.md — <LightboxTrigger> + lightboxImage, one <SiteProviders lightbox>; labels from Notifications → Lightbox" \
  "$(g "['\"](glightbox|photoswipe|yet-another-react-lightbox|react-medium-image-zoom|fslightbox-react)['\"]" src --include=*.ts --include=*.tsx)"
report WARNING "project copy of section fields / navigation" "blocks.md, links.md — buildSectionHeaderField, buildSectionSettingsField, resolveNav (lib/content)" \
  "$(ls src/fields/sectionHeader.ts src/fields/sectionSettings.ts src/lib/navigation.ts 2>/dev/null)"
if [ -n "$UI" ]; then
  for c in $(grep -rlE "^['\"]use client['\"]" $UI 2>/dev/null); do
    report ERROR "server entry in client component" "§6.9 '@intecion/ipal-kit' (root), '/rsc', '/server' pull Payload into the browser — client code imports '/client' (types: import type)" \
      "$(grep -nE "from '@intecion/ipal-kit(/rsc|/server)?'" "$c" | grep -v 'import type' | sed "s|^|$c:|")"
  done
fi

# --- Compile & build ---
if [ "$QUICK" -eq 0 ]; then
  echo
  echo "== pnpm generate:types && tsc --noEmit =="
  if ! (pnpm -s generate:types >/dev/null && pnpm -s exec tsc --noEmit); then
    ERRORS=$((ERRORS + 1)); echo "[ERROR] type check failed"
  fi
  echo
  echo "== pnpm build =="
  BUILD_LOG=$(mktemp)
  if pnpm -s build >"$BUILD_LOG" 2>&1; then
    # Only page routes under /[locale]: route handlers (/md/[locale]/…, sitemap, llms) are force-dynamic by design.
    DYN=$(grep -E '^[│├└ ]*ƒ /\[locale\]' "$BUILD_LOG" || true)
    report WARNING "page routes rendered dynamically (ƒ)" "§4 expected ● SSG — does the build see the DB?" "$DYN"
  else
    ERRORS=$((ERRORS + 1)); echo "[ERROR] build failed — last lines:"; tail -30 "$BUILD_LOG" | sed 's/^/  /'
  fi
  rm -f "$BUILD_LOG"
fi

echo
echo "ipal-audit: $ERRORS error(s), $WARNINGS warning(s)$( [ "$QUICK" -eq 1 ] && echo ' (quick: no tsc/build)')"
[ "$ERRORS" -eq 0 ]
