import { NextResponse } from 'next/server'
import { createProxy } from '@intecion/ipal-kit'
import { i18nConfig } from '@/i18n.config'
export const proxy = createProxy(i18nConfig, { NextResponse, markdown: true })
export const config = { matcher: ['/((?!api|admin|_next|.*\\..*).*)'] }
