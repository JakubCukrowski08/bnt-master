'use client'
import { useConsentContext } from '@intecion/ipal-kit/client'
type Props = { embed: string; consentLabel: string; mapLabel: string; buttonClassName: string }
export function ConsentMap({ embed, consentLabel, mapLabel, buttonClassName }: Props) {
 const { state, reopen } = useConsentContext()
 if (!state.functional) return <button className={buttonClassName} onClick={reopen} type="button">{consentLabel}</button>
 return <iframe className="aspect-video w-full rounded-card border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={embed} title={mapLabel} />
}
