import { Section, SectionHeader, buttonClass } from '@intecion/ipal-kit/blocks/rsc'
import type { ConsentMapBlock } from '@/payload-types'
import { ConsentMap } from './ConsentMap'
export function MapSection({ header, settings, embed, consentLabel, mapLabel }: ConsentMapBlock) {
 if (!embed || !consentLabel || !mapLabel) return null
 return <Section block="consentMap" settings={settings ? { ...settings } : undefined}><SectionHeader header={header} /><ConsentMap buttonClassName={buttonClass('secondary')} embed={embed} consentLabel={consentLabel} mapLabel={mapLabel} /></Section>
}
