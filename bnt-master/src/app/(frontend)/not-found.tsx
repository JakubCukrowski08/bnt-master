import { createNotFoundPage } from '@intecion/ipal-kit/rsc'
import * as content from '@/lib/content'
import { loadNotFoundView } from './notFoundView'
export default createNotFoundPage(content, { load: loadNotFoundView })
