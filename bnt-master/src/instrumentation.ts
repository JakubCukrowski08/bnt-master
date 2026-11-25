import { assertEnv, ipalEnvRules } from '@intecion/ipal-kit/env'
export function register() {
 if (process.env.NEXT_RUNTIME !== 'nodejs') return
 // Local production checks only; never enable ALLOW_LOCAL_MEDIA in hosting.
 assertEnv(ipalEnvRules({ storage: process.env.ALLOW_LOCAL_MEDIA !== '1', ipHeader: true, databaseName: true }))
}
