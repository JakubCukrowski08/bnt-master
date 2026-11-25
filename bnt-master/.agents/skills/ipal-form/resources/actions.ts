// src/app/(frontend)/[locale]/actions.ts — ONE server action for every builder form.
// honeypot → client IP (IPAL_IP_HEADER) → submitForm (rate limit, Turnstile,
// validation, GDPR consent, storage) → visitor message from Notifications.
'use server'
import { headers } from 'next/headers'
import { createSubmitAction } from '@intecion/ipal-kit/server'
import { getCachedPayload } from '@/lib/content'

export const sendForm = createSubmitAction({ getCachedPayload, headers })
