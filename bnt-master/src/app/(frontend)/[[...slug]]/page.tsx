import { createPageRoute } from '@intecion/ipal-kit/rsc'
import { notFound, permanentRedirect, redirect } from 'next/navigation'
import { blockRegistry } from '@/blocks/registry'
import * as content from '@/lib/content'
export const revalidate = 3600
const route = createPageRoute(content, { blocks: blockRegistry, notFound, permanentRedirect, redirect })
export default route.Page
export const generateMetadata = route.generateMetadata
export const generateStaticParams = route.generateStaticParams
