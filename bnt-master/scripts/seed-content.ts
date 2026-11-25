import { createSeeder, guardSeedExit } from '@intecion/ipal-kit/seed'
import { pageTemplates, systemPageRefs } from '@intecion/ipal-kit/templates'
import { libraryBlockSlugs } from '@intecion/ipal-kit/blocks'
import { getPayload } from 'payload'
import config from '@payload-config'
import { blockOptions } from '@/blocks/configs'
import home from './legacy-data/home.json'
import { rich, heading, pageLink } from './content-helpers'

guardSeedExit()
const payload = await getPayload({ config })
try {
 const seed = createSeeder(payload)
 await seed.fillGlobal('company', { name: 'BNT Budownictwo', phone: '605 966 711', phoneLabel: 'Telefon', emailLabel: 'E-mail', email: 'bnt-budownictwo@wp.pl', address: { city: 'Wrocław', country: 'PL' } })
 await seed.fillGlobal('site-settings', { siteName: 'BNT Budownictwo', siteDescription: 'Nadzór inwestorski, kierowanie budową i zarządzanie inwestycjami we Wrocławiu oraz na Dolnym Śląsku.', defaultTheme: 'light', allowThemeToggle: false })
 const form = await seed.upsertBy('forms', { title: 'Kontakt BNT' }, {
  title: 'Kontakt BNT', submitButtonLabel: 'Wyślij wiadomość', confirmationType: 'message', confirmationMessage: rich(['Dziękujemy za wiadomość. Skontaktujemy się z Tobą w sprawie inwestycji.']),
  fields: [
   { blockType: 'text', name: 'name', label: 'Imię i nazwisko', required: true, width: 100 },
   { blockType: 'text', name: 'phone', label: 'Telefon', required: true, width: 50 },
   { blockType: 'email', name: 'email', label: 'E-mail', required: true, width: 50 },
   { blockType: 'select', name: 'subject', label: 'Temat zapytania', required: true, width: 100, options: [{ value: 'nadzor-inwestorski', label: 'Nadzór inwestorski' }, { value: 'generalne-wykonawstwo', label: 'Generalne wykonawstwo' }, { value: 'kierowanie-budowa', label: 'Kierowanie budową' }, { value: 'inwestor-zastepczy', label: 'Inwestor zastępczy' }, { value: 'inne', label: 'Inne' }] },
   { blockType: 'textarea', name: 'message', label: 'Wiadomość', required: true, width: 100 },
   { blockType: 'checkbox', name: 'consent', required: true, label: 'Wyrażam zgodę na przetwarzanie danych osobowych w celu udzielenia odpowiedzi na zapytanie.', width: 100 },
  ],
  emails: [
   { emailTo: (await payload.findGlobal({ slug: 'company' })).email, replyTo: '{{email}}', subject: 'Nowe zapytanie BNT — {{name}}', message: rich(['Nowa wiadomość z formularza kontaktowego.', '{{*:table}}']) },
   { emailTo: '{{email}}', replyTo: (await payload.findGlobal({ slug: 'company' })).email, subject: 'Otrzymaliśmy Twoją wiadomość', message: rich(['Dziękujemy za kontakt z BNT Budownictwo.', '{{*:table}}']) },
  ],
 })
 const h = home.headers
 const featureRows = home.arrays.find(a => a.length === 4 && 'num' in a[0])?.flatMap(i => 'num' in i ? [i] : []) ?? []
 const steps = home.arrays.find(a => a.length === 5 && 'num' in a[0])?.flatMap(i => 'num' in i ? [i] : []) ?? []
 const faq = home.arrays.find(a => 'question' in a[0]) ?? []
 const head = (i: number) => heading(h[i].title, h[i].lead)
 const entries = (collection: string, limit: number, header: ReturnType<typeof heading>) => ({ blockType: 'entryList', entryCollection: collection, mode: 'latest', limit, variant: 'cards', header })
 await seed.upsertBySlug('pages', [
  { slug: 'start', title: 'Nadzór inwestorski we Wrocławiu', meta: { title: 'Nadzór inwestorski we Wrocławiu | BNT Budownictwo', description: 'Nadzór inwestorski, kierowanie budową i zarządzanie inwestycjami we Wrocławiu oraz na Dolnym Śląsku.' }, layout: [
   { blockType: 'hero', variant: 'background', header: heading(home.hero.title, 'Wspieramy inwestorów w kontroli jakości robót, koordynacji wykonawców i prowadzeniu procesu budowlanego — od analizy dokumentacji po odbiory.'), settings: { background: 'inverted' }, links: [pageLink('Opowiedz o inwestycji', 'kontakt'), pageLink('Zobacz realizacje', 'realizacje', 'secondary')] },
   entries('services', 5, head(0)),
   { blockType: 'featureGrid', header: head(1), variant: 'cards', columns: 'four', settings: { background: 'muted' }, items: featureRows.map(i => ({ heading: i.title, text: i.desc })) },
   { blockType: 'steps', header: head(2), variant: 'timeline', settings: { anchor: 'proces' }, items: steps.map(i => ({ heading: i.title, text: i.desc })), links: [pageLink('Omów zakres współpracy', 'kontakt')] },
   entries('projects', 4, head(3)),
   { blockType: 'faq', header: head(4), items: faq },
   { blockType: 'richText', header: heading('Nadzór inwestorski we Wrocławiu i na Dolnym Śląsku'), content: rich(home.paragraphs), settings: { background: 'muted' } },
   { blockType: 'cta', header: head(5), settings: { background: 'inverted' }, links: [pageLink('Porozmawiajmy o projekcie', 'kontakt')] },
  ] },
  { slug: 'uslugi', title: 'Usługi budowlane we Wrocławiu', layout: [{ blockType: 'hero', variant: 'page', settings: { background: 'inverted' }, header: heading('Usługi inżynieryjno-budowlane we Wrocławiu', 'Wspieramy inwestorów w prowadzeniu procesu budowlanego — od weryfikacji dokumentacji i nadzoru inwestorskiego po koordynację robót oraz odbiory.') }, entries('services', 20, heading('Zakres usług'))] },
  { slug: 'realizacje', title: 'Realizacje nadzoru inwestorskiego we Wrocławiu', layout: [{ blockType: 'hero', variant: 'page', settings: { background: 'inverted' }, header: heading('Nasze realizacje', 'Poznaj inwestycje, przy których BNT Budownictwo świadczyło usługi nadzoru inwestorskiego lub wsparcia technicznego.') }, entries('projects', 30, heading('Wybrane inwestycje'))] },
  { slug: 'kontakt', title: 'Kontakt we Wrocławiu', layout: [
   { blockType: 'hero', variant: 'page', settings: { background: 'inverted' }, header: heading('Porozmawiajmy o Twojej inwestycji', 'Napisz, na jakim etapie jest projekt i jakiego wsparcia potrzebujesz. Obsługujemy inwestycje we Wrocławiu i na Dolnym Śląsku.') },
   { blockType: 'contact', variant: 'formWithDetails', form: { $form: 'Kontakt BNT' }, header: heading('Opisz swoją inwestycję', 'Podaj lokalizację, etap projektu i interesujący Cię zakres usług.'), content: rich(['Usługi świadczymy na terenie Wrocławia i województwa dolnośląskiego.']) },
  ] },
  pageTemplates.notFound({ slug: 'nie-znaleziono', title: 'Nie znaleziono strony', layout: () => [{ blockType: 'hero', variant: 'page', header: heading('Nie znaleziono strony', 'Sprawdź adres lub wróć na stronę główną.'), links: [pageLink('Strona główna', 'start')] }] }),
  pageTemplates.legal('privacyPolicy', { slug: 'polityka-prywatnosci', title: 'Polityka prywatności', layout: () => [{ blockType: 'hero', variant: 'page', header: heading('Polityka prywatności') }, { blockType: 'richText', content: rich(['[DO UZUPEŁNIENIA: treść polityki prywatności zatwierdzona przez administratora danych.]']) }] }),
  pageTemplates.cookiePolicy({ slug: 'polityka-cookies', title: 'Polityka cookies', layout: () => [{ blockType: 'hero', variant: 'page', header: heading('Polityka cookies') }, { blockType: 'richText', content: rich(['[DO UZUPEŁNIENIA: treść polityki cookies. Szczegóły aktualnych kategorii i cookies są dostępne w ustawieniach zgody.]']) }] }),
 ])
 await seed.fillGlobal('site-settings', { ...systemPageRefs({ homepage: 'start', notFound: 'nie-znaleziono', privacyPolicy: 'polityka-prywatnosci', cookiePolicy: 'polityka-cookies' }), servicesArchive: { $page: 'uslugi' }, projectsArchive: { $page: 'realizacje' } })
 const navItems = [ { link: { type: 'internal', label: 'Usługi', page: { $page: 'uslugi' } } }, { link: { type: 'internal', label: 'Realizacje', page: { $page: 'realizacje' } } }, { link: { type: 'external', label: 'Jak pracujemy', url: new URL('/#proces', process.env.NEXT_PUBLIC_SERVER_URL).toString() } }, { link: { type: 'internal', label: 'Kontakt', page: { $page: 'kontakt' } } } ]
 await seed.fillGlobal('header', { navItems, menuLabel: 'Menu', links: [{ link: { type: 'external', url: 'tel:+48605966711', label: '605 966 711', appearance: 'secondary' } }] })
 await seed.fillGlobal('footer', { columns: [{ heading: 'Nawigacja', items: navItems }], note: 'Wszelkie prawa zastrzeżone.' })
 await seed.fillGlobal('cookie-settings', { title: 'Szanujemy Twoją prywatność', message: 'Używamy niezbędnych plików cookies, żeby strona działała. Pozostałe kategorie uruchomimy zgodnie z Twoim wyborem.', settingsTitle: 'Ustawienia cookies', settingsDescription: 'Wybierz kategorie. Możesz zmienić wybór w każdej chwili.', privacyLinkLabel: 'Polityka prywatności', alwaysActiveLabel: 'Zawsze aktywne', buttons: { acceptAll: 'Akceptuj wszystkie', reject: 'Odrzuć', settings: 'Ustawienia', savePreferences: 'Zapisz wybór', back: 'Wstecz', close: 'Zamknij' } })
 process.exitCode = seed.summary().errors ? 1 : 0
} finally { await payload.destroy() }
