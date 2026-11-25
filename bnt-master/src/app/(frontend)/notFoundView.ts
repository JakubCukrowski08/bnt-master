'use server'
import { renderNotFoundView } from '@intecion/ipal-kit/rsc'
import * as content from '@/lib/content'
import { blockRegistry } from '@/blocks/registry'
export async function loadNotFoundView(locale: string) { return renderNotFoundView(content, { blocks: blockRegistry }, locale) }
