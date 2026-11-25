# SEO checker rejects documented single-language output

**Type:** bug · **Project:** BNT Budownictwo · **ipal-kit:** 1.16.6

## Problem

ipal-seo-check reports missing/non-self hreflang for every page on a single-language site. The plugin buildHreflangAlternates explicitly returns an empty map for one locale, explaining that no language alternatives exist. Metadata uses createPageRoute/createContentHelpers; canonical URLs and sitemap URLs are correct. The checker contradicts the runtime helper.

Observed after the slug data migration: 23 sitemap URLs, all HTTP 200; checker reports 20 hreflang errors among its default 20 samples. These are checker false positives, not a reason to invent alternate language versions.

## Why it belongs in the plugin

Every single-language client using the supplied check encounters this mismatch.

## Proposed API

The check should detect or accept a single-language configuration and skip language-alternative requirements while still validating canonical URLs.

## Options for the owner

1. Wait for a checker fix.
2. Use a documented single-language check option if one becomes available.
3. Approve a minimal local workaround only after explicit owner approval.

## Decision

Pending. No checker modification, suppression or metadata workaround has been made.
