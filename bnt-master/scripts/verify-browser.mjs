import assert from 'node:assert/strict'
import { chromium } from 'playwright'
const base = process.env.TEST_BASE_URL || 'http://localhost:3000'
const browser = await chromium.launch()
const page = await browser.newPage()
const failures = []
page.on('pageerror', error => failures.push(error.message))
try {
 const sitemap = await (await fetch(`${base}/sitemap.xml`)).text()
 const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1])
 assert.equal(urls.length, 23)
 for (const url of urls) {
  assert.equal((await page.goto(url)).status(), 200, url)
  assert.equal(await page.locator('a[href^="/pl/"]').count(), 0, `Language prefix: ${url}`)
  assert.equal((await page.locator('link[rel="canonical"]').getAttribute('href'))?.replace(/\/$/, ''), url.replace(/\/$/, ''), `Canonical: ${url}`)
  assert(await page.locator('meta[property="og:image"]').count(), `Share image: ${url}`)
 }
 console.log('23 pages: HTTP 200, self canonical, share image, no /pl entry links')
 for (const width of [360, 768, 1280]) {
  await page.setViewportSize({ width, height: 900 })
  for (const path of ['/', '/uslugi', '/realizacje', '/kontakt']) {
   await page.goto(base + path)
   assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), `Overflow ${width}: ${path}`)
  }
 }
 console.log('Four main pages: no overflow at 360, 768, 1280px')
 await page.goto(base + '/kontakt')
 assert.equal(await page.locator('iframe[src*="google.com/maps"]').count(), 0)
 const submits = []
 page.on('request', request => { if (request.method() === 'POST') submits.push(request.url()) })
 await page.locator('form button[type="submit"]').click()
 assert(await page.locator('form :invalid').count() > 0)
 assert.equal(submits.length, 0)
 console.log('Map blocked without consent; empty form blocked before request')
 assert.equal((await page.goto(base + '/nie-istniejaca-strona-testowa')).status(), 404)
 for (const path of ['/robots.txt', '/llms.txt', '/llms-full.txt', '/manifest.webmanifest', '/md/kontakt', '/api/health']) assert.equal((await fetch(base + path)).status, 200, path)
 const mcp = await fetch(base + '/api/mcp', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '2024-11-05', capabilities: {}, clientInfo: { name: 'local-verification', version: '1' } } }) })
 assert.equal(mcp.status, 200); assert((await mcp.text()).includes('serverInfo'))
 assert.deepEqual(failures, [])
 console.log('404, SEO/GEO endpoints, MCP and browser runtime passed')
} finally { await browser.close() }
