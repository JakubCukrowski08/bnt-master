# Single-language content entry links include a locale prefix

**Type:** bug · **Project:** BNT Budownictwo · **ipal-kit:** 1.16.6

## Problem

The project has one locale (`pl`) and preserves its existing unprefixed URLs. `createContentHelpers`/`createPageRoute` support this mode, as documented in i18n.md. However, the library `entryList` links its cards through `resolveLinkHref` → `buildEntryPath`, which unconditionally returns `/${locale}/${archiveSlug}/${entrySlug}`. A project card therefore links to `/pl/realizacje/...` instead of the existing `/realizacje/...` route. The limitation is acknowledged in links.md under “Links to collection entries”.

Reproduction: configure one locale, enable a content collection and assign its archive, render an entryList block. The generated entry links contain /pl although the page routes do not.

## Why it belongs in the plugin

Every single-language project with a content collection uses this shared resolver. Copying entry-link logic into a client project would create a second URL policy and violate ipal-kit first.

## Proposed API

`buildEntryPath({ archiveSlug, entrySlug, locale, config?: I18nConfig })` should omit the locale when config has one locale. `resolveLinkHref` should pass its existing config argument. The archive path and canonical/sitemap helpers should follow the same rule. Preserve existing behavior for callers without config to avoid breaking multilingual clients.

## Options for the owner

1. Wait for the ipal-kit fix and update the package.
2. Approve a minimal, single-file project workaround that normalizes only entry links returned by the plugin in single-language mode; mark it for removal after the fix.
3. Explicitly approve a language-prefixed site with redirects, which changes the existing URL policy.

## Decision

Approved by the owner on 2026-11-25 with “dokoncz” in response to the pending workaround decision. Minimal workaround in src/lib/content.ts wraps the plugin resolver, removes only the extra locale prefix from internal configured collection links in single-language mode, and leaves node_modules unchanged. Remove after an upstream fix.
