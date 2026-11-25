import { adminOnly, adminOrEditor } from '@intecion/ipal-kit'
import type { CollectionConfig } from 'payload'

import {
  buildMediaPlaceholderField,
  buildMediaPlaceholderHook,
  buildOptimizeUploadField,
  buildOptimizeUploadHook,
  normalizeFilenameHook,
} from '@intecion/ipal-kit'

/** media.md "Full collection", 1:1. */
export const Media: CollectionConfig = {
  slug: 'media',
  access: { read: () => true, create: adminOrEditor, update: adminOrEditor, delete: adminOnly }, // public files; media are served by the app (/api/media/file/…)
  upload: { focalPoint: true, mimeTypes: ['image/*', 'application/pdf', 'video/mp4', 'video/webm'] },
  hooks: {
    beforeOperation: [normalizeFilenameHook, buildOptimizeUploadHook(), buildMediaPlaceholderHook()],
  },
  fields: [
    { name: 'legacyPath', type: 'text', index: true, unique: true, label: { en: 'Imported path', pl: 'Ścieżka importu' }, admin: { hidden: true } },
    { name: 'alt', type: 'text', localized: true, required: true },
    buildOptimizeUploadField(),
    buildMediaPlaceholderField(),
  ],
}
