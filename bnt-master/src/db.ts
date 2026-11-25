import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const uri = process.env.DATABASE_URI ?? ''
export const db = /^postgres(ql)?:/.test(uri)
  ? postgresAdapter({ pool: { connectionString: uri }, migrationDir: path.resolve(dirname, 'migrations-postgres') })
  : sqliteAdapter({ push: process.env.PAYLOAD_SCHEMA_PUSH !== '0', client: { url: uri || 'file:./payload-ipal.db' }, migrationDir: path.resolve(dirname, 'migrations') })
