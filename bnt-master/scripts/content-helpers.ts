/** Seed-only conversion of the source paragraphs to Lexical (not a frontend parser). */
export const rich = (paragraphs: string[]) => ({ root: { type: 'root', direction: 'ltr' as const, format: '' as const, indent: 0, version: 1, children: paragraphs.map(text => ({ type: 'paragraph', direction: 'ltr' as const, format: '' as const, indent: 0, version: 1, textFormat: 0, children: [{ type: 'text', text, detail: 0, format: 0, mode: 'normal', style: '', version: 1 }] })) } })
export const heading = (heading: string, intro?: string) => ({ heading, ...(intro ? { intro } : {}) })
export const pageLink = (label: string, slug: string, appearance = 'primary') => ({ link: { type: 'internal', page: { $page: slug }, label, appearance } })
