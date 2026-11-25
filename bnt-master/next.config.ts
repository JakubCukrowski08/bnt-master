import type { NextConfig } from 'next'

import {
  buildAdminCspHeaders,
  buildImagesConfig,
  buildSecurityHeaders,
  buildUploadSecurityHeaders,
  withSecurityConfig,
} from '@intecion/ipal-kit'
import { withPayload } from '@payloadcms/next/withPayload'

// CSP enforced: the reference site is the example after the report-only phase (security.md → "ROLL OUT CSP").
const csp = { mode: 'report-only', r2Url: process.env.R2_PUBLIC_URL, reportUri: '/api/csp-report' } as const

// Flags = what the site loads: Turnstile on forms, the analytics tools whose IDs are set in Site integrations.
const securityHeaders = buildSecurityHeaders({
  csp: {
    ...csp,
    analytics: true,
    turnstile: true, googleMaps: true,
  },
  hsts: process.env.NODE_ENV === 'production',
})

const nextConfig: NextConfig = {
  // ALLOW_LOCAL_MEDIA=1 (local / CI production checks only): let next/image optimize files the app serves on localhost
  images: buildImagesConfig(process.env.ALLOW_LOCAL_MEDIA === '1' ? { production: false } : {}),
  // Metadata in <head> for crawlers (deployment.md §3a)
  htmlLimitedBots:
    /Googlebot|Google-InspectionTool|Storebot-Google|Bingbot|Yandex|DuckDuckBot|Baiduspider|Screaming Frog|AhrefsBot|SemrushBot/i,
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      { source: '/admin/:path*', headers: buildAdminCspHeaders(csp) }, // after the site-wide rule
      ...buildUploadSecurityHeaders(),
    ]
  },
}

// withSecurityConfig: no X-Powered-By (Next's and Payload's)
export default withPayload(withSecurityConfig(nextConfig))
