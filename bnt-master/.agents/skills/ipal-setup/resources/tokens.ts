// src/design/tokens.ts — the ONLY file you edit to rebrand the site (docs/design-tokens.md).
// After every change: `pnpm exec ipal-tokens` → writes src/design/tokens.css (commit it) and prints
// the WCAG contrast check (`--report` prints every pair for DESIGN.md → Colour).
// Leave out anything the brand does not change: the neutral defaults in @intecion/ipal-kit/tokens.css apply.
import { defineTokens } from '@intecion/ipal-kit/tokens'

export const tokens = defineTokens({
  theme: 'both', // 'light' | 'dark' | 'both' — must match Site settings → Theme
  fluid: 'wide', // the fluid file styles.css imports: 'wide' = fluid-wide.css (default), 'standard' = fluid.css
  color: {
    light: {
      primary: 'oklch(0.5 0.17 250)', // [TO FILL: brand colour from DESIGN.md]
      // secondary: 'oklch(…)', accent: 'oklch(…)', bg: 'oklch(…)', surface-muted: 'oklch(…)'
    },
    dark: {
      // primary carries over from light when left out; set a lighter one if the report fails
    },
  },
  font: {
    // next/font in the root layout: variable '--font-family-body' / '--font-family-heading' on <html>
    fwHeading: 650,
  },
  radius: { control: '0.5rem', card: '0.75rem' },
  // fs: { h1: ['2.25rem', '4rem'] },          // min → max; the clamp() is computed for the fluid range
  // space: { section: ['3rem', '8rem'] },
  // container: { default: '80rem' },
})
