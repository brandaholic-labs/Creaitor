# FR0: Cross-Feature Assumptions & Rules

> **Globális feltételek és döntési pontok**, amik több feature-re is hatással vannak. Ez elkerüli az inkonzisztenciákat a részletes FR-ek között.

---

## FR0.1: Brand Brain Baseline Szabályok (P0)

**Filozófia:** A Brand Brain v1 P0-ban **nem kötelező kitölteni** - ez szándékos, mert validáljuk a H1 hipotézist (elég-e a Brand Brain v1 a márkahű AI output-hoz).

**Engedélyezett állapotok P0-ban:**
- ✅ **Teljesen üres Brand Brain** (minden mező null/empty)
- ✅ **Részben kitöltött Brand Brain** (pl. csak TOV, Key Messages nincsenek)
- ✅ **Teljes Brand Brain** (minden mező kitöltve)

**Következmények üres/hiányos Brand Brain esetén:**

| Brand Brain állapot | AI prompt viselkedés | User feedback |
|---------------------|----------------------|---------------|
| **Teljesen üres** (nincs TOV, Key Messages, Reference Posts) | AI prompt **fallback módban** fut:<br>- „Írj egy professzionális, de barátságos Facebook posztot…"<br>- Általános social media best practice-ek szerint generál<br>- **NEM** márkahű, de használható szöveg | **P0:** Warning üzenet mentéskor: „Brand Brain üres - az AI output kevésbé lesz márkahű. Javasoljuk kitölteni!"<br>**P1:** Blokkoló figyelmeztetés + tutorial link |
| **Részben kitöltött** (pl. van TOV, de nincs Reference Posts) | AI prompt **részleges kontextussal** fut:<br>- TOV használva, ha van<br>- Key Messages használva, ha van<br>- Reference Posts blokk kimarad a promptból, ha nincs | **P0:** Informatív üzenet: „Több példaposzt → jobb AI output"<br>**P1:** In-context tooltip Brand Brain form-on |
| **Teljes** (minden mező kitöltve) | AI prompt **teljes kontextussal** fut | Nincs warning |

**Prompt konstrukció szabályok:**
- Ha `tone_of_voice.description` üres → prompt NEM tartalmazza a „Márka Tone of Voice:" blokkot
- Ha `key_messages.length == 0` → prompt NEM tartalmazza a „Márka Key Messages:" blokkot
- Ha `reference_posts.length == 0` → prompt NEM tartalmazza a „Példaposztok (referencia):" blokkot
- Ha **minden üres** → prompt egyszerűsített, fallback módban

**Strongly recommended minimum (P0 - nem kötelező, de erősen ajánlott):**
- Min. 1 Key Message (100-200 karakter)
- Min. 1 Reference Post (150-500 karakter)
- TOV description (200-500 karakter)

**Validálja:** H1 - Brand Brain v1 elég-e a márkahű output-hoz (ha üres → gyenge output → user rájön, hogy kitöltés szükséges)

---

## FR0.2: P0 Scope Döntések (Feature Prioritás Tisztázás)

**Ezek a döntési pontok, ahol az eredeti PRD részek ellentmondtak egymásnak. Most egyértelműsítjük:**

| Feature | P0 (MVP-ben BENNE van) | OUT of scope P0 (P1-be megy) | Döntési indok |
|---------|------------------------|-------------------------------|---------------|
| **Publishing mód** | **Manual Scheduling** (naptárból ütemezés, jövőbeli időpont választás) | **Instant Publish** (azonnali publikálás) | Content Calendar a core feature (H2 - workflow adoption). Instant publish nem validál semmit, ami scheduling ne validálna. **P0: csak scheduling.** |
| **Usability Rating** | **Kötelező** minden AI-generált poszt mentésekor (P0 - instrumentáció H1-hez) | Opcionális / post-hoc rating | H1 validálásához szükséges. **P0: kötelező.** |
| **Approval Flow** | **Pseudo-approval** (ugyanaz a user approve-olja, nincs multi-user review) | **Multi-user review** (User A → review → User B approve) | Kis pilot csapatok (1-3 user/ügynökség), magas bizalmi szint. **P0: self-approval elég.** |
| **Calendar View** | **Heti nézet** (7 nap, Mon-Sun) | **Havi nézet** (30-31 nap grid) | Pilot workflow 1 hét előre tervez (6-10 poszt/hét). **P0: heti nézet elég.** |
| **Drag & Drop** | **Opcionális** (VAGY drag&drop, VAGY manual datetime picker - UX design dönt) | Mindkettő támogatása | H2-t mindkettő validálja. **P0: válasszunk egyet UX design alapján.** |
| **Real-time Collaboration** | **OUT of scope** (last-write-wins, nincs conflict resolution) | Real-time conflict detection, operational transform | Kis csapatok, alacsony egyidejűség. **P0: nincs real-time collab.** |

**Miért fontos ez itt:** Ezek a döntések több FR-t is érintenek (FR3, FR5, FR6, FR7). Ha itt tisztázzuk, a részletes FR-ekben nincs ellentmondás.

---

## FR0.3: Usability Rating Kezelés (P0)

**Kötelező-e a rating?**
- ✅ **Kötelező**, ha `ai_generated = true` (AI-generált poszt)
- ❌ **Nem kötelező**, ha `ai_generated = false` (user manuálisan írta)

**Mikor kell jelölni?**
- **P0:** Poszt mentésekor (draft-ba mentés)
- **P1:** Post-hoc rating módosítás lehetséges (később átjelölhető)

**Rating opciók:**
| Rating érték | UI szöveg | Jelentés | H1 metrika hatás |
|--------------|-----------|----------|------------------|
| `usable` | "Rendben, kisebb módosítással használható" | User apró szerkesztést végzett (néhány szó, emoji, pont) | ✅ Pozitív (H1 target: 60-70% usable) |
| `heavy_edit` | "Nagy átdolgozás kellett" | User jelentős szerkesztést végzett (pár mondat átírása, struktúra változtatás) | 🟡 Neutrális (H1 elfogadható: 20-30%) |
| `not_usable` | "Nem használható, újat írtam" | User eldobta az AI output-ot és nulláról írta | ❌ Negatív (H1 fail threshold: > 20%) |

**UX kezelés (friction csökkentés):**

**P0 - Kötelező, de nem blokkoló:**
- Rating **inline a mentés UI-jában** (nem külön modal/popup)
- **Default nincs** (user muszáj választani) VAGY **default: `usable`** (ha friction csökkentés fontosabb)
- Mentés gomb disable, amíg nincs rating választva (ha default nincs)

**P1 - Post-hoc rating + non-intrusive:**
- Rating nem kötelező mentéskor, később is jelölhető
- „Skip for now" opció (de analytics figyelmeztet, ha sok skip → torzul az adat)

**Veszély mitigálás (zajos adat):**
- Ha rating **túl intrusive** (pl. külön modal minden mentésnél) → user rutin-kattintással mindig ugyanazt választja → adat elértéktelenedik
- **P0 megoldás:** Inline rating, gyors (3 gomb választás), mentés gomb mellett
- **P1 megoldás:** Post-hoc rating, user később átgondolhatja

**Validálja:** H1 - AI output minőség mérése

---

## FR0.4: Concurrency & Multi-User Szabályok (P0)

**P0 - Nincs real-time collaboration:**
- **Last-write-wins** modell (aki utoljára ment, az nyert)
- **Nincs:**
  - Conflict detection (pl. User A és User B egyidejűleg szerkeszti ugyanazt a posztot)
  - Lock mechanism (pl. „XY szerkeszti ezt a posztot")
  - Real-time sync (WebSocket, operational transform)

**Edge Case kezelés (P0):**

| Edge Case | P0 viselkedés | P1 megoldás |
|-----------|---------------|-------------|
| **User A és User B egyidejűleg szerkesztik Post #123** | Aki később save-el, az felülírja a másikat (last-write-wins). **Nincs warning.** | Conflict detection: „XY 2 perce szerkesztette. Biztosan felülírod?" |
| **User A törli Brand #456, miközben User B épp posztot ír rá** | Brand törlés → poszt orphan lesz (FK error vagy draft state megmarad, de publish fail). **P0: archívál, nem hard delete.** | Soft delete (archived_at), poszt továbbra is draft marad, de publish blocker warning |
| **User A schedule-ol Post #789 10:00-ra, User B módosítja 10:05-re** | Last-write-wins: 10:05 lesz a scheduled_at. Nincs history. | Audit log: ki, mikor módosította a scheduled_at-et |

**Miért elfogadható ez P0-ban:**
- Kis pilot csapatok (1-3 user / ügynökség)
- Magas bizalmi szint, szinkron munka (nem párhuzamos szerkesztés)
- Használat tracking mutatja, ha P1-ben kell conflict handling (ha sok last-write-wins eset van)

**P1 - Conflict resolution:**
- Optimistic locking (version field, `updated_at` check)
- Warning: „Ez a poszt 2 perce módosítva lett. Frissítsd az oldalt!"
- Real-time presence indicator: „XY épp szerkeszti"

---

## FR0.5: Meta Publishing Szabályok (P0)

**Token Management:**
- Meta access token **60 napig érvényes** (default short-lived token, long-lived verzió P1)
- **P0 token expire kezelés:**
  - Ha Meta API 401/403 (token expire) → **error message user-nek**: „Facebook/Instagram csatlakozás lejárt. Csatold újra a profilt!"
  - User manuálisan újra OAuth flow (Re-connect gomb Brand settings-ben)
  - **Nincs:** Auto token refresh, email reminder 7 nappal lejárat előtt (P1)

**Publishing Requirements:**
- **P0:** Márka csak akkor publisholhat, ha **FB Page ID VAGY IG Account ID** csatolva van
- **P0:** Poszt csak akkor publisholható, ha státusz `scheduled` (nem `draft`)
- **P0:** Scheduled időpont múltbeli → error: „Múltbeli időpont nem választható"

**Rate Limiting:**
- Meta Graph API rate limit: **200 API calls / óra** (app-level limit)
- **P0 kezelés:** Ha rate limit error → **error message**: „Túl sok publikálási kérés. Próbáld újra 10 perc múlva."
- **Nincs:** Pre-emptive rate limit tracking, queue management (P1)

**Error Handling:**
- **P0 retry:** Manual retry (user kattint „Retry" gomb)
- **Nincs:** Auto retry (3x, exponential backoff), background job queue (P1)

---
