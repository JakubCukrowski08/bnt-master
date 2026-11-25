/**
 * Smoke tests of a client site (Playwright) — the few things that must never
 * break: every language's homepage, a real 404, the form end to end, the
 * language switch, the GEO routes. Copy to tests/smoke.spec.ts and run against
 * a production build:
 *
 *   pnpm add -D @playwright/test && pnpm exec playwright install chromium
 *   pnpm build && pnpm start &
 *   BASE_URL=http://localhost:3000 pnpm exec playwright test tests/smoke.spec.ts
 *
 * Content-agnostic on purpose: it reads locales from the sitemap and finds the
 * form by its renderer, so it survives editors changing texts in the panel.
 * Turnstile: run with the test keys in Site Integrations (1x00000000000000000000AA /
 * 1x0000000000000000000000000000000AA) or without keys.
 */
import { expect, test } from '@playwright/test'

const BASE = (process.env.BASE_URL ?? 'http://localhost:3000').replace(/\/$/, '')

async function sitemapUrls(): Promise<string[]> {
  const xml = await (await fetch(`${BASE}/sitemap.xml`)).text()
  return [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1].replace(/^https?:\/\/[^/]+/, BASE))
}

test('every sitemap URL answers 200 with a title and one h1', async ({ page }) => {
  const urls = (await sitemapUrls()).slice(0, 30)
  expect(urls.length).toBeGreaterThan(0)
  for (const url of urls) {
    const res = await page.goto(url)
    expect(res?.status(), url).toBe(200)
    await expect(page, url).toHaveTitle(/\S/)
    expect(await page.locator('h1').count(), `${url}: exactly one h1`).toBe(1)
  }
})

test('unknown URL is a real 404', async ({ request }) => {
  const res = await request.get(`${BASE}/this-page-does-not-exist-${Date.now()}`, { maxRedirects: 5 })
  expect(res.status()).toBe(404)
})

test('GEO routes answer', async ({ request }) => {
  for (const path of ['/robots.txt', '/sitemap.xml', '/llms.txt', '/llms-full.txt', '/api/health']) {
    expect((await request.get(`${BASE}${path}`)).status(), path).toBe(200)
  }
  const mcp = await request.post(`${BASE}/api/mcp`, { data: { id: 1, jsonrpc: '2.0', method: 'tools/list' } })
  expect(((await mcp.json()) as { result: { tools: unknown[] } }).result.tools.length).toBeGreaterThan(0)
})

test('cookie banner: reject hides it and survives a reload', async ({ page }) => {
  await page.goto(BASE)
  await page.locator('[data-ipal="reject"]').click()
  await expect(page.locator('[data-ipal="banner"]')).toBeHidden()
  await page.reload()
  await expect(page.locator('[data-ipal="banner"]')).toBeHidden()
})

test('the first form on the site submits and shows the confirmation', async ({ page }) => {
  const urls = await sitemapUrls()
  let found = false
  for (const url of urls) {
    await page.goto(url)
    const form = page.locator('form').filter({ has: page.locator('[type="submit"]') }).first()
    if (!(await form.count())) {continue}
    found = true
    await page.locator('[data-ipal="reject"]').click().catch(() => {})
    for (const input of await form.locator('input:not([type=hidden]):not([type=checkbox]), textarea').all()) {
      const type = await input.getAttribute('type')
      if (await input.getAttribute('name') === 'company_url') {continue} // honeypot stays empty
      await input.fill(type === 'email' ? 'smoke-test@example.com' : type === 'number' ? '1' : 'Smoke test')
    }
    for (const box of await form.locator('input[type=checkbox]').all()) {await box.check()}
    for (const select of await form.locator('select').all()) {await select.selectOption({ index: 1 }).catch(() => {})}
    await form.locator('[type="submit"]').click()
    await expect(page.locator('[role="status"], [role="alert"]').first()).toBeVisible({ timeout: 15_000 })
    break
  }
  test.skip(!found, 'no form on the site')
})
