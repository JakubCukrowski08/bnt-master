import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { payloadTotp } from '@clocklimited/payload-2fa'
import { buildR2Storage, ipalKit, mailAdapter } from '@intecion/ipal-kit'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { revalidatePath } from 'next/cache'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { Pages } from '@/collections/Pages'
import { Media } from '@/collections/Media'
import { Services } from '@/collections/Services'
import { Projects } from '@/collections/Projects'
import { Header } from '@/globals/Header'
import { Footer } from '@/globals/Footer'
import { Company } from '@/globals/Company'
import { contentConfig } from '@/content.config'
import { i18nConfig } from '@/i18n.config'
import { db } from '@/db'
const dirname = path.dirname(fileURLToPath(import.meta.url))
export default buildConfig({
 admin: { user: 'users', importMap: { baseDir: dirname } },
 serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
 collections: [Pages, Services, Projects, Media], globals: [Header, Footer, Company],
 db, editor: lexicalEditor(), email: mailAdapter(), sharp,
 secret: process.env.PAYLOAD_SECRET ?? '',
 typescript: { autoGenerate: false, outputFile: path.resolve(dirname, 'payload-types.ts') },
 plugins: [ipalKit({ i18n: i18nConfig, access: { authCollection: 'users' }, pages: { slug: 'pages' }, content: contentConfig, seo: { collections: ['pages', 'services', 'projects'] }, forms: { redirectRelationships: ['pages'], emailLayout: true }, twoFactor: { issuer: 'BNT Budownictwo', plugin: payloadTotp }, whiteLabel: true, consentLog: true, cookieScanner: true, lightbox: true, indexNow: true, revalidatePath }), buildR2Storage(['media'], { s3Storage })],
})
