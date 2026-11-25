'use client'
import type { NavItem } from '@intecion/ipal-kit'

import Link from 'next/link'
import { useEffect, useState } from 'react'

/** Mobile menu: open state only, data via props (ipal-nav). Esc closes it. */
export function MobileNav({ items, menuLabel }: { items: NavItem[]; menuLabel: string }) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (!open) {return}
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])
  return (
    <div className="md:hidden">
      <button
        aria-controls="mobile-nav"
        aria-expanded={open}
        className="rounded-control px-3 py-2 text-fg hover:bg-hover focus-visible:outline-2 focus-visible:outline-focus"
        onClick={() => setOpen(!open)}
        type="button"
      >
        {menuLabel}
      </button>
      {open ? (
        <ul className="absolute inset-x-0 top-full grid gap-1 border-b border-border bg-surface-raised p-4 shadow-md" id="mobile-nav">
          {items.map((item) => (
            <li key={item.href}>
              <Link className="block rounded-control px-3 py-2 text-fg hover:bg-hover" href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
