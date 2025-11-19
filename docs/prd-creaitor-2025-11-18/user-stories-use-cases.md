# User Stories & Use Cases

## Primary Actors (Ki használja a rendszert?)

1. **Ügynökségi Owner / Admin**
   - 3-10 fős social/marketing ügynökség tulajdonosa
   - Felelős: team setup, márka onboarding, usage monitoring
   - Fő gond: skálázhatóság (5-30 ügyfél kezelése kis csapattal)

2. **Socialos / Content Manager**
   - Az ügynökség munkatársa, aki heti FB/IG naptárakat készít
   - 3-10 márkát kezel párhuzamosan
   - Fő gond: időhiány, ismétlődő munka, márkahűség fenntartása generáláskor

3. **Account Manager / Stratéga (másodlagos)**
   - Ügyfélkapcsolat, stratégia, approval
   - Kevésbé használja a rendszert, inkább review/approval fázisban

---

## Product User Journeys (MVP)

Az alábbi journey-k leírják, **mit csinál a user a Creaitor rendszerben**. Ezek a termék funkcióinak specifikációi, nem kutatási protokollok.

**Megjegyzés a journey részletességéhez:**
- A flow-k egy lehetséges UX útvonalat mutatnak be, de nem "pixel-szintű" specifikációk
- Konkrét gombok neve, mikrokópia, pontos navigációs minta a design-spec-be tartozik
- Ha UX-kutatás során jobb flow derül ki, az elsőbbséget élvez a PRD-beli példához képest

---

### Journey 1: Új Márka Onboarding + Brand Brain Setup

**Trigger / Context:**
Új ügyfél érkezett az ügynökséghez. A socialosnak fel kell vinnie a márkát a rendszerbe és konfigurálnia kell a Brand Brain-t, hogy az AI-generálás márkahű legyen.

**User Story:**
> **As a** socialos
> **I want to** létrehozni egy új márkát és beállítani a Brand Brain-jét
> **So that** az AI-generált posztok tükrözzék a márka hangját és stílusát

**Happy Path Lépések:**

1. Socialos elindítja a márka létrehozási folyamatot
2. Megadja a márka alapadatait (név, leírás)
3. Csatolja a márka social profilját (FB Page, IG Account - Meta OAuth flow)
4. Kitölti a Brand Brain formot:
   - Tone of Voice leírás (szöveges mező, 200-500 karakter ajánlott)
   - Key Messages (2-5 darab bullet)
   - Példaposztok (1-3 darab korábbi sikeres poszt szövege)
   - Vizuális irány leírás (szöveges mező, 100-300 karakter ajánlott)
5. Elmenti a Brand Brain-t
6. Rendszer megerősíti a mentést és a márka készen áll poszt generálásra

**Acceptance Criteria (Viselkedés / UI):**

- ✅ A márka létrehozása és Brand Brain kitöltése egyetlen, megszakítható folyamat (user mentheti részben is, később folytathatja)
- ✅ Meta OAuth flow sikeres csatolást jelez (FB Page ID, IG Account ID tárolva)
- ✅ Brand Brain adatok visszatölthetők szerkesztésre (nem vesznek el)
- ✅ Rendszer egyértelműen jelzi, mely mezők kötelezők, melyek opcionálisak
- ✅ Márka létrehozása után azonnal elérhető a poszt generálási folyamat

**MVP Scope (P0 vs. P1):**

| P0 (MVP-ben benne van) | P1 (Post-MVP) |
|------------------------|---------------|
| Márka létrehozása (név, leírás) | Brand asset upload (logó, színek) |
| Social profile csatolása (Meta OAuth) | Guideline PDF feltöltés és parsing |
| Brand Brain form (TOV, Key Messages, Példaposztok, Vizuális irány) - egyszerű textareaként | Rich text editor Brand Brain-hez |
| Mentés / visszatöltés | Brand voice preview (generált példa megtekintése mentés előtt) |
| | Validáció és hibaüzenetek (P0-ban lehet hiányos) |

**Validálja:** H1 (Brand Brain v1 setup egyszerű és használható)

---

### Journey 2: Heti Tartalomnaptár Generálása AI-val

**Trigger / Context:**
A socialos össze szeretné állítani egy márka következő heti tartalomnaptárát (FB + IG posztok). AI-támogatással szeretné gyorsítani a szövegírást, miközben fenntartja a márkahűséget.

**User Story:**
> **As a** socialos
> **I want to** AI segítségével generálni posztokat Brand Brain kontextussal
> **So that** gyorsabban készítsek tartalmat, miközben a posztok márkahűek maradnak

**Happy Path Lépések:**

1. Socialos megnyitja a Content Calendar-t és kiválaszt egy márkát
2. Heti vagy napi nézetet választ (dátumtartomány látszik)
3. Új poszt létrehozását indítja (egy időpont kiválasztásával)
4. Megadja a poszt alapinformációit:
   - Brief / téma (rövid szöveges input, 1-3 mondat)
   - Platform választás (FB / IG)
   - Tartalomtípus opcionális (pl. termékbemutató, tipp, akció, entertaining)
5. AI generálást indít - rendszer Brand Brain kontextust használ
6. AI szöveget generál, amit a socialos szerkeszt (inline szövegszerkesztés)
7. Képet ad hozzá:
   - P0: Saját kép feltöltése
   - P1: AI Visual Studio használata (képgenerálás)
   - **Megjegyzés:** Az Architecture dokumentum teljes ImageAIService implementációt tartalmaz (Nano Banana + Seedream dual provider), de a prioritás sprint planning során dől el.
8. **Használhatósági rating jelölés (P0):** Mentés/publish előtt a user jelöli, mennyire volt használható a generált szöveg ("Rendben, kisebb módosítással" / "Nagy átdolgozás" / "Nem használható")
9. Poszt draft-ba mentése
10. Folyamat ismétlése további posztokra

**Acceptance Criteria (Viselkedés / UI):**

- ✅ A rendszer automatikusan használja az aktív márka Brand Brain-jét (user nem tévesztheti össze a márkákat)
- ✅ AI generálás után a szöveg inline szerkeszthető (nem kell külön módba váltani)
- ✅ Használhatósági rating jelölés kötelező minden AI-generált poszt mentése/publikálása előtt
- ✅ Poszt draft-ba mentése sikeres, később visszatölthető és szerkeszthető
- ✅ Több poszt generálható egymás után anélkül, hogy a rendszer "elállna" vagy elveszítené a korábbi draft-okat

**MVP Scope (P0 vs. P1):**

| P0 (MVP-ben benne van) | P1 (Post-MVP) |
|------------------------|---------------|
| Brief input (szöveges mező, 1-3 mondat) | Tartalomtípus automatikus javaslat (AI-alapú mix) |
| Platform választás (FB / IG radio button vagy dropdown) | Multi-variáns generálás (2-3 szövegvariáns egyszerre) |
| AI szöveg generálás (1 variáns, Brand Brain kontextussal) | Hashtag automatikus javaslat |
| Inline szövegszerkesztés (plain text vagy egyszerű contenteditable) | Rich text editor (bold, italic, emoji picker) |
| Saját kép feltöltése (upload button) | AI Visual Studio (képgenerálás Brand Brain alapján) |
| **Használhatósági rating jelölés (KÖTELEZŐ, P0!)** | Karakter számláló (platform-specifikus optimális hossz jelzés) |
| Draft-ba mentés | Regenerálás gomb (új variáns kérése) |

**Validálja:** H1 (Brand Brain elég a márkahűséghez), H2 (Workflow adoption - AI Studio mint core tool)

---

### Journey 3: Approval és Ütemezés (Teljes Workflow)

**Trigger / Context:**
A socialos elkészítette a posztokat draft-ban. Most jóvá kell hagynia és ütemezni kell őket publikálásra a megfelelő időpontokban.

**User Story:**
> **As a** socialos
> **I want to** jóváhagyni és ütemezni a posztokat egy helyen
> **So that** a tartalom elkészítésétől a publikálásig ne kelljen eszközt váltanom

**Happy Path Lépések:**

1. Socialos áttekinti a draft posztokat a naptárban
2. Megnyitja az egyes posztokat ellenőrzésre (szöveg, kép, platform helyessége)
3. Jóváhagyja a posztot:
   - P0: Self-approval (ugyanaz a user hagyja jóvá)
   - P1: Multi-user review (másik user-nek küldi review-ra)
4. Ütemezi a poszt publikálását:
   - Dátum és időpont kiválasztása VAGY azonnali publikálás
   - Poszt státusz: Approved → Scheduled (vagy Published, ha instant)
5. Rendszer feldolgozza az ütemezett posztokat:
   - Időben Meta Graph API hívás
   - Sikeres publikálás: Státusz → Published
   - Hiba esetén: Státusz → Failed + error message
6. Ha hiba történt, socialos újrapróbálkozik (retry funkció)

**Acceptance Criteria (Viselkedés / UI):**

- ✅ Draft posztok áttekinthetők a naptárban (státusz egyértelműen látható)
- ✅ Approval státuszváltás egyértelmű (Draft → Approved vagy Review → Approved)
- ✅ Scheduling interfész lehetővé teszi dátum/időpont választást VAGY azonnali publikálást
- ✅ Sikeres publikálás után poszt Published státuszt kap és megjelenik a publikált poszt linkje
- ✅ Hiba esetén Failed státusz, érthető hibaüzenet, retry lehetőség elérhető
- ✅ User lát státusz-feedbacket (loading, success, error) a publikálási folyamat során

**MVP Scope (P0 vs. P1):**

| P0 (MVP-ben benne van) | P1 (Post-MVP) |
|------------------------|---------------|
| Self-approval (ugyanaz a user approve-olja) | Multi-user approval (Draft → Review → Approved flow) |
| Scheduling (dátum/időpont választás) VAGY instant publish (egyik kötelező P0-ban) | Mindkettő (instant + scheduling együtt) |
| Meta Graph API integráció (FB/IG OAuth, publish endpoint) | Comment thread (poszt-szintű feedback másik user-től) |
| Egyszerű cron job (időben ellenőrzi és publikál) | Background job queue (Sidekiq/Bull) + auto retry (3x) |
| Manual retry (user kattintja a "Retry" gombot) | In-app + email notification (approval request, publish success/failure) |
| Failed státusz + error message | Job monitoring dashboard |

**Validálja:** H2 (Workflow adoption - approval és publikálás egy eszközben, nem külön platformokon)

**Megjegyzés a "nem vált eszközt" elvárásról:**
Az eredeti elvárás ("user NEM vált Meta Business Suite-ra") túlságosan szigorú. Valójában a socialos valószínűleg továbbra is fog alkalmanként Meta felületet használni (kommentek figyelése, Story publikálás, carousel posztok stb.). A sikeres adoption azt jelenti, hogy **a heti FB/IG poszt-workflow elsődlegesen Creaitorban történik**, nem azt, hogy 100%-ban kizárja a Meta felületet.

---

### Journey 4: Multi-Brand Kezelés (Ügynökségi Perspektíva)

**Trigger / Context:**
A socialos több márkát kezel párhuzamosan (jellemzően 3-10 márka). Váltani szeretne a márkák között egyetlen felületen anélkül, hogy különböző eszközökbe / fiókokba kellene belépnie.

**User Story:**
> **As a** socialos több márkával
> **I want to** váltani a márkák között egyetlen felületen
> **So that** ne kelljen külön fiókok / eszközök között ugrani

**Happy Path Lépések:**

1. Socialos megnyitja a Content Calendar-t vagy AI Copy Studio-t
2. Márka szűrőt / választót használ (dropdown, sidebar, vagy más UI elem)
3. Kiválaszt egy konkrét márkát (pl. "Fitness Stúdió XY")
4. Rendszer frissíti a nézetet - csak a kiválasztott márka posztjai / naptára látszik
5. Socialos új posztot generál - rendszer automatikusan az aktív márka Brand Brain-jét használja
6. Válthat másik márkára (pl. "E-commerce Ruhabolt") - AI kontextus automatikusan frissül
7. Opcionálisan (P1): Dashboard "összes márka" nézetben látja az összesítést (hány poszt scheduled/published márkánként)

**Acceptance Criteria (Viselkedés / UI):**

- ✅ Márka választó / szűrő minden releváns képernyőn elérhető (Calendar, AI Studio)
- ✅ Aktív márka egyértelműen jelzett (user mindig tudja, melyik márkán dolgozik)
- ✅ Brand Brain-ek nem keverednek: AI generálás mindig az aktív márka kontextusát használja
- ✅ Márka-váltás után a nézet frissül, előző márka posztjai nem keverednek az újjal
- ✅ Multi-tenant adatizoláció működik: user csak a saját ügynökségéhez tartozó márkákat látja

**MVP Scope (P0 vs. P1):**

| P0 (MVP-ben benne van) | P1 (Post-MVP) |
|------------------------|---------------|
| Márka választó / szűrő (dropdown vagy sidebar) | Dashboard "összes márka" összesítő nézet (scheduled/published count) |
| Aktív márka jelzése (UI-ban látható) | Márka-szintű aktivitás trend (heti grafikonok) |
| Brand Brain automatikus használata (márka-specifikus) | "Hiányzó nap" warning (melyik márkánál nincs poszt schedulezve) |
| Adatizoláció (ügynökség-szintű márka hozzáférés) | Brand-specifikus jogosultságok (user csak egyes márkákat láthat) |

**Validálja:** H2 (Multi-brand workflow adoption), H3 (Ügynökségi fit - több ügyfél kezelése)

---

## Edge Cases & Error Scenarios

### Edge Case 1: Brand Brain kitöltetlensége

**Scenario:** Socialos létrehoz egy márkát, de NEM tölti ki a Brand Brain-t (üres TOV, nincs példaposzt).

**Expected Behavior:**
- **P0:** Rendszer engedi generálni AI-t, de minőség gyenge (generic AI output, nem márkahű)
- **P1:** Warning jelenik meg: "Brand Brain üres - az AI output nem lesz márkahű. Töltsd ki!"

**Validálja:** Brand Brain fontosságát (ha nincs → rossz output)

---

### Edge Case 2: Meta API hiba (token expire, rate limit)

**Scenario:** Scheduled poszt publikálásakor Meta API hibát ad (token lejárt VAGY rate limit).

**Expected Behavior:**
- **P0:** Poszt státusz: **Failed**, error message: "Meta API hiba: token lejárt. Csatold újra a profilt!"
- User kattint "Retry" → újra OAuth flow VAGY kivárja rate limit-et
- **P1:** Automatikus retry (3x), email notification ha végleg failed

**Success Criteria:**
- ✅ Error message világos (user érti, mit tegyen)
- ✅ Recovery lehetséges (retry gomb működik)

---

### Edge Case 3: Több user egyidejű szerkesztése (Real-time conflict)

**Scenario:** Két socialos (Éva és Anna) ugyanazt a posztot szerkeszti egyszerre.

**Expected Behavior:**
- **P0:** Nincs real-time conflict resolution. Utolsó mentés nyer (last-write-wins).
- **P1:** Warning: "Anna is editing this post" + lock mechanizmus

**Mitigation (P0):**
- Kis pilot csapatban (1-3 user/ügynökség) ez ritka eset
- V1.5-ben lehet lock/conflict resolution

---

## What These User Stories Do NOT Cover (MVP Scope)

**NEM része az MVP-nek (de lehet v1.5+):**

- ❌ **TikTok/LinkedIn integration:** Journey-k csak FB/IG-ra fókuszálnak
- ❌ **Külső ügyfél approval:** Journey-kben nincs "ügyfél meghívása platformra"
- ❌ **Campaign management:** Posztok nincsenek kampányokba csoportosítva
- ❌ **A/B teszt:** Nincs 2 szövegvariáns tesztelése élőben
- ❌ **Haladó analitika:** Nincs "best time to post", engagement prediction
- ❌ **White-label:** Ügynökség nem tudja saját brandje alatt használni

---
