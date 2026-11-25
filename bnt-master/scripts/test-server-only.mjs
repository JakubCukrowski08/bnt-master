// CLI integration tests run outside the Next bundler; mock its compile-time marker only.
import { register } from 'node:module'
register('data:text/javascript,' + encodeURIComponent(`export async function resolve(name, context, next) { if (name === 'server-only') return { url: 'data:text/javascript,export {}', shortCircuit: true }; return next(name, context) }`))
