# Rendszer-szintű Tesztelési Terv

**Dátum:** 2025-11-18
**Szerző:** Murat (BMad TEA Agent)
**Státusz:** Vázlat
**Projekt:** Creaitor
**Fázis:** 3 (Solutioning) - Rendszer-szintű Tesztelhetőség Vizsgálat

---

## Összefoglaló

**Hatókör:** Rendszer-szintű tesztelhetőség értékelés a Creaitor SaaS platformhoz a solutioning gate check előtt.

**Tesztelhetőség Értékelés:**

- **Kontrollálhatóság:** PASS ✅
- **Megfigyelhetőség:** PASS ✅
- **Megbízhatóság:** CONCERNS ⚠️

**Építészetileg Jelentős Követelmények (ASRs):** 3 azonosítva, 1 kritikus (score=9)

**Teszt Szintek Stratégia:**
- Unit: 40% (üzleti logika, szolgáltatás mockok)
- Integráció: 30% (API útvonalak, adatbázis műveletek)
- E2E: 30% (kritikus felhasználói útvonalak)

---

## Tesztelhetőség Értékelés

### Kontrollálhatóság: PASS ✅

**Értékelés:** A rendszer állapota kontrollálható tesztelési célokra.

**Erősségek:**

- ✅ **API Seeding:** Supabase + RLS multi-tenant architektúra lehetővé teszi tesztadat seedelést API-n keresztül
- ✅ **Külső Függőségek Mockolhatók:** Meta Graph API, AI szolgáltatók (OpenAI, Anthropic, Nano Banana, Seedream) dependency injection pattern-t használnak
- ✅ **Hibás Állapotok Triggerelhetők:** Circuit breakerek, retry logika, rate limiting validálható

**Javaslatok:**

- Használjunk factory függvényeket (`createUser`, `createBrand`, `createPost`) faker-rel egyedi tesztadatokhoz
- Mock AI szolgáltatók unit tesztekben (gyors visszajelzés)
- Használjunk valódi AI szolgáltatókat integrációs/E2E tesztekben (csak provider-specifikus viselkedés tesztelésekor)

---

### Megfigyelhetőség: PASS ✅

**Értékelés:** A rendszer állapota megfigyelhető és a teszt eredmények determinisztikusak.

**Erősségek:**

- ✅ **Rendszer Állapot Megfigyelés:** Winston strukturált logging, Supabase real-time subscriptions lehetővé teszik az állapot megfigyelését
- ✅ **Determinisztikus Teszt Eredmények:** Background jobok (BullMQ) aszinkronok, de van job state tracking
- ✅ **NFR Validálás:** Teljesítmény metrikák (AI generálási idő, Meta API latency), biztonsági audit naplók, megbízhatósági health checkek

**Javaslatok:**

- Implementáljuk a `/api/health` endpointot service status checkekkel (adatbázis, cache, queue)
- Adjunk hozzá Server-Timing header-eket APM-hez (Application Performance Monitoring)
- Használjunk strukturált loggingot trace ID-kkel kérés korrelációhoz

---

### Megbízhatóság: CONCERNS ⚠️

**Értékelés:** A teszt izoláció és a hibareprodukció kisebb aggodalmakat vet fel.

**Aggodalmak:**

- ⚠️ **Teszt Izoláció:** Supabase RLS multi-tenant architektúra `agency_id` ütközést okozhat párhuzamos tesztekben
  - **Megelőzés:** Használjunk faker-t egyedi `agency_id` generáláshoz, teszt fixture-ek automatikus takarítás

- ⚠️ **Hibareprodukció:** BullMQ jobok aszinkronok - teszt reprodukció job state polling-t vagy mock queue-t igényel
  - **Megelőzés:** Teszt fixture mock queue, vagy valódi Redis + job completion wait

**Erősségek:**

- ✅ **Laza Kapcsolódás:** Service layer architektúra lehetővé teszi komponens-szintű tesztelést
- ✅ **Hibakezelés:** AI provider fallback stratégia lehetővé teszi graceful degradation tesztelést

---

## Építészetileg Jelentős Követelmények (ASRs)

Ezek a minőségi követelmények vezérlik az architektúra döntéseket és tesztelhetőségi kihívásokat jelentnek.

### ASR-001: AI Válaszidő (PERF)

**Kategória:** PERF (Teljesítmény)
**Kockázati Pontszám:** 6 (Valószínűség: 2, Hatás: 3)

**Leírás:**
Az AI generálási latency <10s (target) kell legyen, hogy elkerüljük a felhasználói frusztrációt. LLM hívások (OpenAI, Anthropic) és képgenerálás (Nano Banana, Seedream) külső függőségek változó latenciával.

**Architektúra Döntés:**
- Background job queue (BullMQ) aszinkron feldolgozáshoz
- Dual provider fallback megbízhatóságért
- Timeout kezelés (30s AI copy-hoz, 60s image-hez)

**Tesztelési Megközelítés:**
- **k6 Load Testing:** Szimuláljunk 20-30 egyidejű felhasználót AI tartalmat generálva
- **SLO Küszöb:** p95 <10s AI copy generáláshoz, p99 <30s képgeneráláshoz
- **Teljesítmény Teszt:** Mérjük a generation_time_ms-t production-szerű környezetben

**Megelőzés:**
- Background queue offload-olja a hosszú futású feladatokat
- Fallback provider csökkenti a hibaszázalékot
- Timeout megakadályozza a végtelen várakozást

**Státusz:** Tervezett (Sprint 0-ban implementálandó)

---

### ASR-002: Multi-Tenant Adatizoláció (SEC)

**Kategória:** SEC (Biztonság)
**Kockázati Pontszám:** 9 (Valószínűség: 3, Hatás: 3) ⚠️ **KRITIKUS**

**Leírás:**
Az ügynökség adatszivárgás kritikus biztonsági kockázat. A multi-tenant architektúrának garantálnia kell, hogy a felhasználók csak a saját ügynökségük adatait érhessék el (márkák, posztok, felhasználók).

**Architektúra Döntés:**
- Supabase Row Level Security (RLS) policy-k
- Explicit `brandId` minden műveletben
- Brand hozzáférés ellenőrzés API route-okban

**Tesztelési Megközelítés:**
- **Playwright E2E:** User A megpróbálja elérni User B ügynökség adatait → 403 Forbidden kell legyen
- **Integrációs Tesztek:** Ellenőrizzük, hogy az RLS policy-k megakadályozzák a cross-agency adathozzáférést
- **Biztonsági Tesztek:** SQL injection próbálkozások, jogosulatlan hozzáférési próbálkozások

**Megelőzés:**
- RLS policy-k kényszerítik a tenant izolációt adatbázis szinten
- API route middleware ellenőrzi a brand hozzáférést műveletek előtt
- Frontend state management kényszeríti az aktív brand kontextust

**Státusz:** Kritikus - Phase 4 előtt validálandó

---

### ASR-003: Meta API Rate Limiting (OPS)

**Kategória:** OPS (Üzemeltetés)
**Kockázati Pontszám:** 6 (Valószínűség: 2, Hatás: 3)

**Leírás:**
Meta Graph API rate limit: 200 hívás/óra per app. Ha túllépjük → publikálás sikertelen, felhasználói frusztráció.

**Architektúra Döntés:**
- Queue-alapú publikálás (BullMQ) rate limit tracking-gel
- Retry exponenciális backoff-fal
- Manuális retry opció felhasználóknak

**Tesztelési Megközelítés:**
- **Stress Teszt:** Szimuláljunk 250 publikálási kérést 1 óra alatt → kell, hogy a többlet kéréseket queue-ba rakja
- **Rate Limit Teszt:** Ellenőrizzük, hogy a queue tiszteletben tartja a 200/óra limitet, követi a használatot
- **Retry Teszt:** Ellenőrizzük, hogy a sikertelen publikálások automatikusan retry-znek backoff-fal

**Megelőzés:**
- Queue megakadályozza a rate limit túllépést
- Rate limit tracking megakadályozza a küszöb túllépését
- Manuális retry lehetővé teszi a felhasználói beavatkozást

**Státusz:** Tervezett (Sprint 0-ban implementálandó)

---

## Teszt Szintek Stratégia

**Indoklás:** Az architektúra alapján (web alkalmazás, API-heavy, background jobok) 40/30/30-os felosztást javaslok (unit/integráció/E2E).

### Unit Tesztek: 40%

**Cél:** Gyors visszajelzés az üzleti logikáról, edge case-ekről, hibakezelésről.

**Hatókör:**
- Üzleti logika: Ár kalkulátor, dátum utils, Brand Brain context builder
- Szolgáltatás mockok: AI szolgáltatók mockolva (OpenAI, Anthropic, Nano Banana, Seedream)
- Utility függvények: Validáció, formázás, transzformációk

**Eszközök:**
- Jest (TypeScript unit tesztek)
- Coverage cél: ≥80% kritikus útvonalakhoz

**Példa Scenáriók:**
- `BrandBrainService.buildContext()` üres/hiányos Brand Brain-nel → fallback prompt
- `LLMService.generateCopy()` dual provider fallback-fal → OpenAI fail → Anthropic sikerül
- `ImageAIService.selectProvider()` character consistency-vel → Nano Banana-ra irányít

---

### Integrációs Tesztek: 30%

**Cél:** Validáljuk az API route-okat, adatbázis műveleteket, szolgáltatás interakciókat.

**Hatókör:**
- API route-ok: Auth middleware, RLS izoláció, CRUD műveletek
- Adatbázis műveletek: Supabase CRUD RLS policy-kkel
- Szolgáltatás interakciók: Brand Brain → AI szolgáltatás → poszt létrehozás folyamat

**Eszközök:**
- Playwright API tesztelés (`request` fixture)
- Coverage cél: ≥70% API endpointokhoz

**Példa Scenáriók:**
- `POST /api/brands` érvényes adatokkal → létrehozza a brandet, RLS policy kényszerítve
- `GET /api/posts` cross-agency brandId-vel → 403 Forbidden-t ad vissza
- `POST /api/ai/copy` Brand Brain kontextussal → generál szöveget, naplózza a metadatákat

---

### E2E Tesztek: 30%

**Cél:** Validáljuk a kritikus felhasználói útvonalakat, Meta API integrációt, vizuális regressziót.

**Hatókör:**
- Kritikus felhasználói útvonalak: Brand Brain beállítás → AI generálás → jóváhagyás → publikálás
- Meta API publikálás folyamat: OAuth → ütemezés → publikálás → ellenőrzés
- Vizuális regresszió: Naptár nézet, poszt szerkesztő UI

**Eszközök:**
- Playwright (böngésző automatizálás)
- Coverage cél: ≥50% kritikus útvonalakhoz

**Példa Scenáriók:**
- Felhasználó létrehozza a brandet → beállítja a Brand Brain-t → generál AI copy-t → jóváhagyja → ütemezzi → publikál Facebookra
- Felhasználó megpróbál cross-agency hozzáférést → UI hibát mutat, API 403-at ad vissza

---

## NFR Tesztelési Megközelítés

### Biztonság: Playwright E2E + Biztonsági Eszközök

**Tesztek:**

1. **Autentikáció:**
   - Nem autentikált felhasználók login-ra irányítva (nem exponálva)
   - JWT tokenek 15 perc után lejárnak
   - Jelszavak soha nincsenek naplózva vagy exponálva hibákban

2. **Autorizáció:**
   - RBAC: Felhasználók csak a saját ügynökségük adatait érhetik el
   - Cross-agency brand hozzáférés 403 Forbidden-t ad vissza
   - RLS policy-k kényszerítik a tenant izolációt

3. **OWASP Top 10:**
   - SQL injection blokkolva (parameterizált query-k)
   - XSS szanitizálva (input validáció, output encoding)

**Eszközök:**
- Playwright (E2E auth/authz tesztek)
- npm audit (sebezhetőség szkennelés)
- OWASP ZAP (opcionális, penetrációs tesztelés)

**Kritériumok:**
- ✅ PASS: Minden auth/authz teszt zöld, OWASP validálva, nincs kritikus sebezhetőség
- ⚠️ CONCERNS: Kisebb hiányosságok megelőzési tervekkel
- ❌ FAIL: Kritikus expozíció (jogosulatlan hozzáférés, jelszó szivárgás, SQL injection sikerül)

---

### Teljesítmény: k6 Load Testing

**Tesztek:**

1. **SLO/SLA Validálás:**
   - AI copy generálás: p95 <10s, p99 <30s
   - Oldal betöltés: p95 <3s
   - Meta API publikálás: p95 <5s

2. **Load Testing:**
   - Szimuláljunk 20-30 egyidejű felhasználót (pilot skála)
   - Ramp up: 1p-től 30 felhasználóig, 3p-ig fenntartás, 1p ramp down

3. **Stress Testing:**
   - Spike 50 felhasználóra → ellenőrizzük a graceful degradation-t
   - Rate limit tesztelés: 250 Meta API hívás/óra → queue-ba rakja a többlet kéréseket

**Eszközök:**
- k6 (load/stress/spike tesztelés)
- Lighthouse (Core Web Vitals)

**Kritériumok:**
- ✅ PASS: SLO/SLA célok teljesülnek k6 profillalás bizonyítékkal
- ⚠️ CONCERNS: Küszöb felé tartás (pl. p95 = 9s közelít 10s-hez)
- ❌ FAIL: SLO/SLA megszegve (pl. p95 >10s, hibaarány >1%)

---

### Megbízhatóság: Playwright E2E + API Tesztek

**Tesztek:**

1. **Hibakezelés:**
   - AI provider hiba → fallback provider sikerül (graceful degradation)
   - Meta API hiba → hibaüzenet látható, manuális retry elérhető
   - Adatbázis kapcsolat hiba → felhasználó hibát lát, alkalmazás funkcionális marad

2. **Retry-k:**
   - BullMQ jobok retry-znek átmeneti hibáknál (3 próbálkozás)
   - Exponenciális backoff megakadályozza a thundering herd-et

3. **Health Checkek:**
   - `/api/health` endpoint visszaadja a szolgáltatás státuszát (adatbázis, cache, queue)
   - Health check hiba → monitoring riasztások kiváltva

**Eszközök:**
- Playwright (E2E hibakezelés tesztek)
- API tesztek (retry logika, health checkek)

**Kritériumok:**
- ✅ PASS: Hibakezelés, retry-k, health checkek validálva
- ⚠️ CONCERNS: Részleges lefedettség (pl. hiányzó circuit breaker)
- ❌ FAIL: Nincs helyreállítási út (500 hiba összeomlasztja az alkalmazást)

---

### Karbantarthatóság: CI Eszközök

**Tesztek:**

1. **Coverage:**
   - Jest coverage ≥80% kritikus útvonalakhoz
   - Kód duplikáció <5% (jscpd)

2. **Sebezhetőségek:**
   - npm audit: nincs kritikus/magas sebezhetőség

3. **Megfigyelhetőség:**
   - Strukturált logging trace ID-kkel (Playwright validálja a telemetria header-eket)
   - Hibakövetés (Sentry/monitoring integráció validálva)

**Eszközök:**
- GitHub Actions (coverage, duplikáció, audit)
- jscpd (kód duplikáció ellenőrzés)
- Playwright (megfigyelhetőség validálás)

**Kritériumok:**
- ✅ PASS: Tiszta kód (80%+ coverage, <5% duplikáció), megfigyelhetőség validálva, nincs kritikus sebezhetőség
- ⚠️ CONCERNS: Duplikáció >5%, coverage 60-79%
- ❌ FAIL: Hiányzó tesztek (<60%), összekuszált kód (>10% duplikáció), nincs megfigyelhetőség

---

## Teszt Környezet Követelmények

### Lokális Fejlesztés

**Infrastruktúra:**
- Supabase local dev (Docker)
- Redis (BullMQ job queue)
- Playwright böngésző (Chromium, Firefox, WebKit)

**Beállítás:**
```bash
# Függőségek telepítése
npm install

# Supabase local indítása
npx supabase start

# Redis indítása
docker run -d -p 6379:6379 redis:latest

# Tesztek futtatása
npm run test:unit      # Jest unit tesztek
npm run test:integration  # Playwright API tesztek
npm run test:e2e       # Playwright E2E tesztek
```

---

### Staging Környezet

**Infrastruktúra:**
- Production-szerű Supabase projekt
- Meta test app (rate limit: 200 hívás/óra)
- AI szolgáltatók (test API kulcsok: OpenAI, Anthropic, Nano Banana, Seedream)

**Cél:**
- Integrációs tesztelés valódi külső szolgáltatásokkal
- Teljesítmény tesztelés (k6 load tesztek)
- Biztonsági tesztelés (OWASP ZAP, penetrációs tesztek)

---

### CI/CD Pipeline

**Infrastruktúra:**
- GitHub Actions
- Supabase projekt per PR (ephemeral)
- Redis konténer (ephemeral)
- Playwright headless böngészők

**Pipeline:**
1. Lint + Type check
2. Unit tesztek (Jest)
3. Integrációs tesztek (Playwright API)
4. E2E tesztek (Playwright böngésző)
5. Coverage jelentés (≥80% küszöb)
6. Sebezhetőség szkennelés (npm audit)

---

## Tesztelhetőség Aggodalmak

### OPS-001: Background Job State Tesztelés

**Kategória:** OPS (Üzemeltetés)
**Kockázati Pontszám:** 4 (Valószínűség: 2, Hatás: 2)

**Probléma:**
BullMQ jobok aszinkronok - a job befejezés tesztelése job state polling-t vagy mock queue-t igényel.

**Megelőzés:**
- Teszt fixture: Mock BullMQ queue unit tesztekhez (gyors visszajelzés)
- Integrációs tesztek: Valódi Redis + job completion wait (determinisztikus)

**Példa:**
```typescript
// Teszt fixture mock queue
test.extend({
  mockQueue: async ({}, use) => {
    const queue = new MockQueue();
    await use(queue);
  },
});

// Integrációs teszt valódi Redis-szel
test('AI copy job befejeződik', async ({ request }) => {
  const response = await request.post('/api/ai/copy', { data: {...} });
  const jobId = response.json().jobId;

  // Várunk a job befejezésére (max 30s)
  await waitForJobCompletion(jobId, { timeout: 30000 });
});
```

**Státusz:** Tervezett (Sprint 0-ban implementálandó)

---

### TECH-001: Multi-Tenant Párhuzamos Teszt Végrehajtás

**Kategória:** TECH (Technikai)
**Kockázati Pontszám:** 3 (Valószínűség: 1, Hatás: 3)

**Probléma:**
Supabase RLS multi-tenant architektúra `agency_id` ütközést okozhat párhuzamos tesztekben.

**Megelőzés:**
- Használjunk faker-t egyedi `agency_id` generáláshoz
- Teszt fixture-ek automatikus takarítás (létrehozott ügynökségek törlése teszt után)

**Példa:**
```typescript
// Factory függvény faker-rel
export function createAgency() {
  return {
    id: faker.string.uuid(),
    name: faker.company.name(),
    // ... további mezők
  };
}

// Teszt fixture automatikus takarítás
test.extend({
  seedAgency: async ({ request }, use) => {
    const agencies: string[] = [];

    const seedAgency = async () => {
      const agency = createAgency();
      await request.post('/api/agencies', { data: agency });
      agencies.push(agency.id);
      return agency;
    };

    await use(seedAgency);

    // Automatikus takarítás
    for (const agencyId of agencies) {
      await request.delete(`/api/agencies/${agencyId}`);
    }
  },
});
```

**Státusz:** Tervezett (Sprint 0-ban implementálandó)

---

## Javaslatok Sprint 0-hoz

### Prioritás 1: Teszt Infrastruktúra Beállítás

**Műveletek:**

1. **Teszt Framework Beállítás:**
   - Jest config (unit tesztek)
   - Playwright config (E2E tesztek)
   - Teszt utility-k (factories, fixtures, helpers)

2. **Teszt Adatbázis Beállítás:**
   - Supabase local dev
   - RLS policy-k teszt környezethez
   - Seed data scriptek

3. **CI/CD Beállítás:**
   - GitHub Actions pipeline
   - Coverage jelentés
   - Sebezhetőség szkennelés

**Becsült Effort:** 2-3 nap

---

### Prioritás 2: Kritikus Útvonal Tesztek

**Műveletek:**

1. **Biztonsági Tesztek:**
   - Auth/authz E2E tesztek (jogosulatlan irányítás, cross-agency hozzáférés)
   - RLS izoláció integrációs tesztek

2. **Core Flow Tesztek:**
   - Brand Brain beállítás → AI generálás → jóváhagyás → publikálás (E2E)
   - Multi-tenant adatizoláció (integráció)

**Becsült Effort:** 3-5 nap

---

### Prioritás 3: NFR Baseline Tesztek

**Műveletek:**

1. **Teljesítmény Tesztek:**
   - k6 load teszt beállítás
   - SLO baseline mérés (AI generálási idő, oldal betöltés)

2. **Megbízhatóság Tesztek:**
   - Hibakezelés E2E tesztek (AI provider hiba → fallback)
   - Health check endpoint

**Becsült Effort:** 2-3 nap

---

## Minőségi Gate Kritériumok

### Pass/Fail Küszöbök

- **Biztonság:** Minden auth/authz teszt zöld, RLS izoláció validálva
- **Teljesítmény:** SLO baseline-ok mérve (AI generálás <10s p95, oldal betöltés <3s)
- **Megbízhatóság:** Hibakezelés validálva (fallback provider működik)
- **Coverage:** ≥80% kritikus útvonalakhoz (Brand Brain, AI szolgáltatások, publikálás)

### Gate Döntés

**Jelenlegi Státusz:** ⚠️ **CONCERNS** - Kész Phase 4-re feltételekkel:

- ✅ Architektúra támogatja a tesztelhetőséget (kontrollálhatóság, megfigyelhetőség)
- ⚠️ Kisebb aggodalmak: Background job tesztelés, párhuzamos teszt végrehajtás
- ✅ Kritikus ASR (multi-tenant izoláció) megelőzési tervvel rendelkezik
- ⚠️ Teszt infrastruktúra még nincs beállítva (Sprint 0 akció szükséges)

**Javaslat:** Folytatás Phase 4-gyel (Implementation) Sprint 0 teszt infrastruktúra beállítással első prioritásként.

---

## Következő Lépések

1. **Sprint 0:** Teszt infrastruktúra beállítás (Jest, Playwright, CI/CD)
2. **Sprint 1:** Kritikus útvonal tesztek implementálása (biztonság, core flow)
3. **Sprint 2:** NFR baseline tesztek implementálása (teljesítmény, megbízhatóság)

---

**Generálva:** BMad TEA Agent - Test Architect Module
**Workflow:** `.bmad/bmm/testarch/test-design`
**Verzió:** 1.0