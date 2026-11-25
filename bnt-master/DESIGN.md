# BNT Budownictwo

Migration of the existing architectural/engineering identity, not a redesign.

## Identity

White and light zinc surfaces, deep navy primary (#1e3a5f), near-black inverted sections (#0a0e14), square corners. Inter body and Space Grotesk headings, served through next/font with Polish glyphs. Two font families. No invented company claims.

## Tokens

Source: src/design/tokens.ts. Generated: src/design/tokens.css. Use the ipal preset roles and utilities. Fluid wide scale, semibold headings, square cards and controls. Inverted section buttons and links use a pale blue to preserve contrast. Generation: npm run tokens. Initial contrast check: 37/37 pairs pass.

## Layout

Wide hero, service cards, benefit grid, process timeline, project cards and galleries, FAQ, contact CTA. Shared navigation and footer. The editor controls content, order, images and links through Pages and the project globals. All section implementations come from the ipal block library and its configuration.

## Interaction

Keyboard-operable mobile navigation, native disclosure FAQ, ipal lightbox, builder forms and detailed cookie settings. Respect reduced motion. Maps must not load third-party resources before consent.

## Verification

Check at 360, 768, 1280, 1366 and 1920 pixel widths; verify contrast, one h1, hero CTA visibility, keyboard operation and no horizontal overflow. Exact screenshot parity has not yet been established.
