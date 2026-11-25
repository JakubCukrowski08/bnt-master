# BNT Budownictwo — Payload CMS + ipal-kit

Next.js 16.4.6, React 19.3.1, Payload 3.94.1, ipal-kit 1.16.6. Wymagany Node.js 22.23.5 i pnpm 10.34.9.

## Lokalnie

1. `pnpm install --frozen-lockfile`.
2. Skopiuj [.env.example](./.env.example) do `.env`. Ustaw `DATABASE_URI=file:./payload-ipal.db`, losowy `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL=http://localhost:3000`, `IPAL_IP_HEADER=x-forwarded-for` oraz `ALLOW_LOCAL_MEDIA=1` wyłącznie lokalnie.
3. Na pustej bazie uruchom `PAYLOAD_SCHEMA_PUSH=0 pnpm payload migrate`, następnie ustaw `PAYLOAD_SCHEMA_PUSH=0` w `.env`. Nie uruchamiaj całego łańcucha migracji na istniejącej, już wypełnionej bazie lokalnej. Wygeneruj `pnpm generate:importmap` i `pnpm generate:types`.
4. `pnpm seed` tworzy strony, ustawienia i formularz przez createSeeder. `pnpm seed:legacy` pokazuje plan importu; `APPLY=1 pnpm seed:legacy` importuje 5 usług, 14 realizacji i fotografie z zachowanego źródła. `pnpm seed:complete` dodaje tabelę cookies, mapę wymagającą zgody i wybór wyróżnionych realizacji. Importy legacy/complete są ograniczone do lokalnego SQLite.
5. `pnpm dev`. Pierwszego administratora utwórz w `/admin`, następnie skonfiguruj 2FA.

## Architektura i edycja

Cały frontend i konfiguracja znajdują się w [src](./src). [Konfiguracja Payload](./src/payload.config.ts) używa ipal-kit, wspólnych helperów treści, bibliotecznych bloków i formularza builder. Strony, menu, stopka, dane firmy, usługi i realizacje są edytowane w CMS. Zdjęcia mają relacje do biblioteki mediów. Oryginalne pola złożone pozostają tylko do odczytu jako źródło migracji.

Mapa jest blokowana do udzielenia zgody funkcjonalnej. SEO/GEO obejmuje metadata, sitemap, robots, manifest, llms, Markdown i MCP. Treści prawne zawierają oznaczone miejsca do uzupełnienia przez właściciela. SMTP, Turnstile, domena i magazyn R2 wymagają rzeczywistych danych konfiguracyjnych; lokalny import nie wysyła testowych wiadomości.

## Weryfikacja i znane ograniczenia

`pnpm typecheck`, `pnpm build`, `pnpm ipal:doctor --offline`, `pnpm ipal:audit`.

Kontrola zgód na stronie głównej i kontakcie: 0 naruszeń i 0 ostrzeżeń. Faviconę i obrazy udostępniania uzupełniono. Checker SEO nadal zgłasza fałszywe alarmy hreflang dla jednego języka oraz ostrzeżenia o długości zachowanych tekstów. Sitemap zawiera 23 publiczne adresy; wszystkie zwracają HTTP 200. Nie jest to jeszcze zatwierdzona wersja produkcyjna.

Znany problem linków wpisów z prefiksem `/pl` opisuje [zgłoszenie ipal-kit](./docs/plugin-requests/2026-11-24-single-language-entry-links.md). Zatwierdzone obejście znajduje się we wspólnym resolverze linków; biblioteka nie została zmodyfikowana.

## Produkcja

Adapter PostgreSQL jest dostępny. Wygenerowano osobną migrację początkową PostgreSQL w [src/migrations-postgres](./src/migrations-postgres). Przed wdrożeniem sprawdź ją na docelowej wersji PostgreSQL i przygotuj kontrolowany transfer danych. Migracji SQLite nie uruchamiaj na PostgreSQL. Ustaw docelowy `NEXT_PUBLIC_SERVER_URL`, stały sekret, zaufany nagłówek IP i dane R2; wyłącz lokalny fallback mediów. Skonfiguruj SMTP i ochronę formularza, uzupełnij prawdziwe dokumenty prawne, wykonaj test odtwarzania kopii i ponów kontrole SEO/zgód. Nie kopiuj lokalnych sekretów ani testowej bazy na produkcję.

Po lokalizacji adresów istniejącej bazy ustaw `PAYLOAD_SCHEMA_PUSH=0`; do zmian schematu używaj przeglądanych migracji zamiast automatycznego push Drizzle. Skrypt `node scripts/localize-entry-slugs.mjs payload-ipal.db` ma tryb dry-run; `APPLY=1` tworzy kopię, kopiuje i weryfikuje 19 adresów, zachowując stare wartości w `legacySlug`. Nie uruchamiaj go na nowej bazie z już lokalizowanymi polami.

Aktualne wyniki i pełny raport SEO: [stan migracji](./docs/migration-status.md).

Testy regresji: `pnpm verify:migration` uruchamia edycję CMS i formularz na tymczasowej kopii SQLite, przechwytując wiadomości w pamięci; `pnpm verify:browser` sprawdza działający build pod localhost:3000. Nie używaj skryptu migracyjnego do testów na produkcji.
