# Scope Definition

## MVP Időkeret és Fókusz

**Időkeret:** 6 hónap (2025 Q2-Q3)

**Core Scope:** A Creaitor MVP egy **ügynökségi multi-brand social media tartalomgyártó és ütemező eszköz**, amely kifejezetten **Facebook és Instagram** tartalomnaptár készítésére fókuszál, **Brand Brain-alapú AI támogatással**.

**Nem egy:** Általános marketing automation platform, nem enterprise CRM integráció, nem haladó analitika rendszer. Az MVP célja a **core workflow** validálása: Brand Brain → AI-generálás → Naptár → Jóváhagyás → Ütemezés.

---

## In Scope - MVP Features (6 hónap)

### 1. Multi-Tenant Alaprendszer

**Tenant Hierarchy:**
```
Ügynökség (Agency)
  └─ User (Socialos/Account Manager)
       └─ Brand (Ügyfélmárka)
            └─ Social Profiles (FB Page, IG Account)
```

**Funkciók:**
- Ügynökség regisztráció és profil
- User management (meghívás, jogosultságok)
- Márka létrehozása, szerkesztése, archiválása
- Social profile csatolása (Meta OAuth)
- Egyszerű szerepkörök: Admin (ügynökség owner) vs. Editor (socialos)

**Out of scope v1:**
- Komplex szerepkör-mátrix (pl. brand-specifikus jogok, approval chain szintek)
- Ügyfél meghívása a platformra (csak ügynökségen belüli userek)

---

### 2. Brand Brain v1 - Márka Tudásbázis

**Mi van benne:**

Minden márkához strukturált "márka-agy" hozzuk létre és tároljuk:

1. **Példaposztok (Reference Posts)**
   - 1-3 korábbi sikeres poszt feltöltése (szöveg + opcionálisan kép)
   - Socialos jelöli: "Ez tükrözi a márka hangját"
   - Ezek lesznek az AI példái a generáláskor

2. **Tone of Voice (TOV) Leírás**
   - Szöveges mező: 200-500 karakter
   - Pl. "Barátságos, közvetlen, nem túl formális. Emojik megengedettek, de mértékkel."
   - Opcionális promptok: "Milyen a márka személyisége?" / "Mit kerülj?"

3. **Key Messages (2-5 darab)**
   - Bullet list: Mi a márka lényege? Mit hangsúlyoz?
   - Pl. "Helyi, friss alapanyagok", "Family-friendly", "Prémium minőség elérhető áron"

4. **Vizuális Irány (Visual Direction)**
   - Szöveges leírás (100-300 karakter): milyen vizuális világ? (színek, hangulat, stílus)
   - Opcionális: 1-2 referenciakép feltöltése
   - Pl. "Meleg, természetes színek. Földközeli, otthonos hangulat. Kerüljük a túl steril, corporate képeket."

5. **Brand Assets (opcionális v1-ben)**
   - Logó feltöltése (PNG/SVG)
   - Elsődleges színek (hex kódok)
   - Betűtípus említése (csak szövegesen, nem rendszer font)

**Hogyan épül be az AI-ba:**
- AI Copy Studio: Brand Brain kontextusa (példaposztok + TOV + key messages) bekerül a prompt-ba
- AI Visual Studio: Vizuális irány szövege bekerül az image generation prompt-ba

**Out of scope v1:**
- RAG (Retrieval-Augmented Generation) - nincs automatikus "tanulás" újabb posztokból
- Brand voice automatikus detektálása (AI elemzi a múltbéli posztokat)
- Márka guideline PDF feltöltés és parsing
- Brand voice scoring (mennyire "on-brand" ez a poszt?)

---

### 3. AI Copy Studio - Szöveggenerálás

**Funkciók:**

1. **Poszt Ötlet / Téma Megadása**
   - Socialos beír 1-2 mondatos briefet: "Húsvéti akció a desszertekre"
   - Választhat tartalomtípust: Termékbemutató / Akció / Tipp / Insight / Entertaining stb.

2. **AI Szöveggenerálás Brand Brain Kontextussal**
   - LLM API hívás (OpenAI / Anthropic / nyílt modell)
   - Prompt tartalmazza:
     - Márka TOV leírását
     - Key messages-t
     - 1-3 példaposzt szövegét
     - Socialos brief-jét
     - Platformot (FB vs IG - eltérő stílus/hossz)
   - AI generál 2-3 szövegvariánst

3. **Szöveg Szerkesztése**
   - Inline szerkesztő (rich text: bold, emoji picker)
   - Karakter számláló (FB/IG optimális hossz jelzés)
   - Regenerálás gomb (új variánsok)
   - "Mentés draft-ba" gomb

4. **Használhatósági Jelölés (Instrumentációhoz)**
   - Amikor socialos véglegesít egy szöveget, jelöli:
     - "Rendben, kisebb módosítással"
     - "Nagy átdolgozás kellett"
     - "Nem használható, újat írtam"

**Out of scope v1:**
- Multi-language generálás (csak magyar v1-ben)
- Hashtag automatikus javaslat (socialos manuálisan írja)
- A/B teszt szövegvariánsok
- Sentiment analysis
- Automatikus compliance check (pl. "ne mondd ezt a szót")

---

### 4. AI Visual Studio - Képgenerálás

**Funkciók:**

1. **Vizuális Koncepció Megadása**
   - Socialos beír rövid leírást: "Húsvéti nyuszi cukrászda asztalon"
   - Választhat stílust: Fotó / Illusztráció / Grafika

2. **AI Képgenerálás Brand Vizuális Irány Alapján**
   - Image generation API hívás (Nano Banana - Gemini 2.5 Flash Image + Seedream 4.0 dual provider)
   - **Architecture dokumentum:** ImageAIService intelligent routing:
     - Character consistency → Nano Banana (Google Gemini)
     - 4K resolution → Seedream (ByteDance)
     - Automatic fallback ha egyik provider fail
   - Prompt tartalmazza:
     - Brand vizuális irány szövegét
     - Socialos koncepció leírását
     - Platform aspect ratio (FB: 1200x630, IG: 1080x1080)
   - AI generál 2-3 képvariánst

3. **Kép Kiválasztása és Finomítás**
   - Kép kiválasztása (checkbox)
   - Regenerálás gomb (új variánsok)
   - Crop/resize tool (egyszerű)
   - "Feltöltöm saját képet" opció (ha AI nem jó)

4. **Saját Kép Feltöltése**
   - Upload (drag & drop)
   - Egyszerű crop/resize
   - Automatikus optimalizálás (file size, aspect ratio)

**Out of scope v1:**
- Advanced image editing (szöveg ráírása, filter, rétegek)
- Brand asset automatikus beillesztése (logó watermark)
- Image library / stock photo integráció
- AI background removal
- Video generálás/szerkesztés

---

### 5. Content Calendar - Tartalomnaptár

**Funkciók:**

1. **Naptár Nézetek**
   - Heti nézet (default)
   - Havi nézet
   - Márka-szintű szűrés (1 márka vagy összes)

2. **Poszt Slotok**
   - Drag & drop: poszt húzása időpontra
   - Egy slot = 1 platform (FB vagy IG)
   - Kettő slot = FB + IG (ugyan az a tartalom vagy eltérő)

3. **AI-javasolt Tartalomtípus Mix (opcionális v1)**
   - Heti "javasolt mix" megjelenítése: pl. "2 termékbemutató, 1 tipp, 1 entertaining"
   - Nem kötelező, csak segítség

4. **Poszt Draft Állapotok**
   - Draft (szerkesztés alatt)
   - Review (belső ellenőrzésre vár)
   - Approved (jóváhagyva, ütemezésre kész)
   - Scheduled (ütemezve)
   - Published (kikerült)

5. **Gyors Poszt Előnézet**
   - Click → popup: szöveg + kép + platform
   - Szerkesztés gomb

**Out of scope v1:**
- Campaign csoportosítás (több poszt 1 kampányban)
- Bulk műveletek (10 poszt egy kattintással approved)
- Naptár exportálás (PDF, Google Calendar)
- Tartalomtípus automatikus javaslat AI-vel (csak statikus mix)

---

### 6. Approval Workflow - Jóváhagyási Folyamat

**Funkciók:**

1. **Belső Approval Flow (Egyszerű)**
   - Socialos: Draft → "Küldés review-ra" gomb
   - Másik user (vagy ugyanaz): Review → "Approve" vagy "Visszautasítás (comment)" gomb
   - Approved → Ütemezésre kész

2. **Kommentek / Feedback**
   - Poszt-szintű comment thread
   - User neve + időbélyeg
   - Egyszerű szöveges komment (nincs attachment)

3. **Notification (Egyszerű)**
   - In-app notification badge ("2 poszt vár review-ra")
   - Email notification (opcionális, user beállítja)

**Out of scope v1:**
- Külső ügyfél approval (ügyfél meghívása a platformra)
- Multi-szintű approval chain (pl. Socialos → Manager → Client)
- Approval SLA / deadline (mennyi idő alatt kell reagálni)
- Approval history részletes audit log

---

### 7. Publishing & Scheduling - Ütemezés és Publikálás

**Funkciók:**

1. **Meta Graph API Integráció**
   - FB Page és IG Business Account csatolása (OAuth)
   - Token management (refresh token, scope kezelés)

2. **Poszt Ütemezése**
   - Dátum + időpont kiválasztása (naptárból húzással vagy manuálisan)
   - Platform választás: FB / IG / Mindkettő
   - "Ütemezés" gomb → scheduled státusz

3. **Background Job Queue**
   - Scheduled posztok queue-ba kerülnek
   - Időben publikálás Meta API-n keresztül
   - Retry logic (ha API hiba)

4. **Publikálási Státusz**
   - Published (sikeres)
   - Failed (hiba történt - error message megjelenítése)
   - Retry gomb (ha failed)

5. **Egyszerű Post Insights**
   - Publikált poszt linkje (redirect to FB/IG)
   - Alapmetrikák fetch (reach, engagement) - későbbi refresh-szel

**Out of scope v1:**
- Közvetlen publikálás (instant post) - csak scheduling
- First comment automatikus hozzáfűzése
- Carousel post support (csak single image/text)
- Story publishing
- TikTok, LinkedIn, Twitter/X, YouTube integráció

---

### 8. Basic Insights & Usage Tracking

**Funkciók:**

1. **Ügynökség Szintű Dashboard**
   - Hány márka aktív
   - Hány poszt scheduled/published (heti/havi)
   - Aktivitási trend (heti szinten)

2. **Márka Szintű Metrikák**
   - Hány poszt készült AI-val (copy + visual)
   - Hány poszt scheduled vs. published
   - Használhatósági rating átlaga (ha socialos jelöli)

3. **Instrumentáció Backend-en**
   - Session tracking (login, page views)
   - Feature usage tracking:
     - AI Copy Studio használat (generálások száma)
     - AI Visual Studio használat
     - Creaitorban generált tartalom aránya
   - Időmérés support (ha user kitölti baseline/follow-up időt)

**Out of scope v1:**
- Haladó social media analytics (FB/IG deep insights, trend elemzés)
- Versenyképességi analitika (hogyan teljesítünk vs. versenytársak)
- Custom dashboard builder
- Exportálható riportok

---

## Out of Scope - Explicitly NOT in MVP

**Platformok:**
- ❌ TikTok
- ❌ LinkedIn
- ❌ Twitter/X
- ❌ YouTube / YouTube Shorts
- ❌ Pinterest, Snapchat

**AI Features:**
- ❌ Brand Brain v2 (RAG-alapú, automatikus tanulás)
- ❌ Multi-language AI (csak magyar v1)
- ❌ AI video generálás/szerkesztés
- ❌ Sentiment analysis
- ❌ Hashtag automatikus javaslat
- ❌ Automatikus compliance check

**Workflow & Collaboration:**
- ❌ Külső ügyfél approval (client meghívása platformra)
- ❌ Multi-szintű approval chain
- ❌ Campaign management (több poszt csoportosítása)
- ❌ Task/project management layer

**Analytics & Reporting:**
- ❌ Haladó social media analytics
- ❌ Competitive intelligence
- ❌ Custom reporting builder
- ❌ Exportálható riportok (PDF, Excel)

**Enterprise Features:**
- ❌ White-label megoldás
- ❌ SSO (Single Sign-On)
- ❌ Custom SLA, dedicated support
- ❌ On-premise deployment
- ❌ API access (partnerek számára)

**Advanced Content Features:**
- ❌ Carousel post (multi-image)
- ❌ Story publishing
- ❌ Video upload/scheduling
- ❌ First comment auto-add
- ❌ Link shortening + tracking
- ❌ User-generated content (UGC) curation

---

## Post-MVP Roadmap (Jövőbeli Fejlesztések)

**Fontos:** Az alábbi roadmap **nem rigid gate-ekkel működik** ("csak akkor v1.5, ha pontosan 8 ügynökség van"). Ehelyett **learning-alapú döntési pontok** - a pilot feedback és hipotézis-eredmények határozzák meg az irányt.

---

### v1.5 - Finomhangolás (6-9 hónap)

**Döntési szabály:** Ha az MVP pilot **Minimum Success Threshold-ot elérte** (5+ ügynökség, van mag, de hiányosságok azonosítottak), folytatjuk v1.5-tel.

**Fókusz:** Learning Goals alapján azonosított hiányosságok pótlása + P1 feature-k selectív integrálása

**Három lehetséges irány (pilot feedback szerint):**

1. **Ha H1 (Brand Brain) probléma:** Brand Brain v1.5
   - További példaposztok (5-10 poszt / márka)
   - Részletesebb TOV (több prompt kérdés)
   - Opcionálisan: RAG lite (korábbi Creaitor posztok indexelése)

2. **Ha H2 (Workflow adoption) probléma:** UX & Workflow javítások
   - UX friction pontok javítása (usage adatok + kvali interjúk alapján)
   - P1 feature-k: Multi-user approval, notifications, dashboard socialosoknak
   - Performance optimalizáció (AI latency csökkentése)

3. **Ha H1 és H2 működik, de korlátozott:** Horizontális bővítés
   - AI Visual Studio (ha P1-ben maradt)
   - További magyar nyelvi finomhangolás
   - 1-2 P1 feature (pl. background job queue, full approval workflow)

**Nem metrika-gated:** Nem várjuk meg a "pontosan 8 ügynökség, 30% időmegtakarítás"-t. Ha van 6 ügynökség és tiszta irány a javításhoz → v1.5.

---

### v2.0 - Skálázási Fázis (9-15 hónap)

**Döntési szabály:** Ha v1.5 után **Target Success elérése** (8-10 ügynökség, erős PMF mag) VAGY **elértük Minimum-ot, de világos skálázási út van**.

**Fókusz:** Horizontális (több platform) és vertikális (mélyebb funkciók) bővítés - **pilot feedback szerint prioritizálva**.

**Horizontális (több platform):**
- **TikTok integráció** - ha pilot során gyakori kérés ("mi TikTok-ot is csinálunk, de külön eszköz")
- **LinkedIn integráció** - ha B2B ügynökségek belépnek pilot-ba
- **Döntés:** Pilot során kérdezzük: "Milyen platformokat kezelnél még szívesen egy helyen?"

**Vertikális (mélyebb funkciók):**
- **Brand Brain v2** (RAG-alapú, automatikus tanulás múltbeli posztokból)
- **Haladó analitika** (performance insights, best time to post, engagement prediction)
- **Campaign management** (több poszt összekapcsolása, campaign-szintű tervezés)
- **Carousel post support** (multi-image posts)
- **Story publishing** (FB/IG Stories)

**Üzleti modell & Growth:**
- **Pricing optimalizáció** (tier-ek finomhangolása, usage-based pricing tesztelése)
- **Self-serve onboarding** (automata demo, tutorial, csökkentett CAC)
- **Referral program** (pilot ügynökségek hoznak újakat)

**Döntési logika:**
- Ha pilot feedback → "több platform kell" → Horizontális prioritás
- Ha pilot feedback → "egy platform elég, de mélyebb funkciók kellenek" → Vertikális prioritás
- Ha pilot feedback → "fizetési hajlandóság alacsony" → Pricing + value prop újragondolás

---

### v3.0 - Enterprise & Internationalization (15-24 hónap)

**Döntési szabály:** Ha v2.0 után **50+ ügynökség** VAGY **enterprise demand jelzések** (nagyobb ügynökségek érdeklődnek).

**Fókusz:** Enterprise funkciók és nemzetközi expanzió

**Enterprise:**
- **White-label megoldás** (nagyobb ügynökségek saját brandje alatt)
- **SSO** (Single Sign-On)
- **Custom SLA, dedikált support**
- **Ügynökségi operációs réteg** (tasking, multi-szintű approval chain, client-facing dashboard)
- **API access** (partner integráció, Zapier/Make.com)

**Internationalization:**
- **Multi-language support** (angol, német, lengyel, román)
- **Régiós expanzió** (Németország, Lengyelország, Románia)
- **Lokális pricing** (EUR vs. PLN vs. RON)

**Döntési logika:**
- Ha magyar/CEE piac telített vagy lassú → Nemzetközi expanzió prioritás
- Ha enterprise demand erős (nagy ügynökségek kérik white-label-t) → Enterprise funkciók prioritás
- Ha mindkettő mérsékelt → Maradunk kis-közepes ügynökségek optimalizálásánál (v2.x iterációk)

---

## Hipotézis → Feature Mapping

Az MVP P0 feature-jeit **explicit módon kötjük a Learning Goals hipotézisekhez**. Minden P0 feature egy vagy több hipotézis validálásához szükséges.

| Hipotézis | Szükséges P0 Feature-k | Miért szükséges? |
|-----------|------------------------|------------------|
| **H1: Brand Brain v1 elég a 8/10-es márkahűséghez** | - Brand Brain v1 (minimal)<br>- AI Copy Studio (minimal)<br>- Használhatósági rating (instrumentáció) | H1 teszteléséhez kell Brand Brain input + AI generálás + márkahűség mérése |
| **H2: Socialos hajlandó Creaitorban kezdeni (go-to tool)** | - Content Calendar (basic)<br>- Pseudo-approval (egyszerű)<br>- Publishing (instant + manual)<br>- Usage tracking (session, feature) | H2 teszteléséhez kell működő workflow (naptár → jóváhagyás → publikálás) + használat mérése |
| **H3: Magyar/CEE piacon van hely agency-first AI social OS-nek** | - Multi-tenant basic (hierarchy)<br>- Functional workflow (P0-k együtt)<br>- Usage tracking | H3 teszteléséhez kell használható termék (P0 együtt) + pilot-to-paid konverzió mérése |

**Lényeg:** P0 nem "production-ready termék", hanem **hipotézis-validáló minimum**. Ha H1 vagy H2 megbukik, a felesleges production polish nem segít.

---

## MVP Feature Prioritás (ha idő szűk)

### Must Have (P0) - Hipotézis-validáláshoz szükséges minimum

**Ezek nélkül nem tudjuk tesztelni a kritikus hipotéziseket (H1, H2, H3):**

1. **Brand Brain v1 - minimal** (H1)
   - TOV szöveges leírás (200-500 karakter)
   - Key Messages (2-5 bullet)
   - 1-3 példaposzt szövege
   - Vizuális irány leírás (100-300 karakter)
   - **P0 minimum:** Egyszerű form, nincs feltétlenül szép UI, csak működő input és tárolás

2. **AI Copy Studio - minimal** (H1, H2)
   - Brief input (1-2 mondat)
   - AI generálás Brand Brain kontextussal (1 variáns elég v1-ben, nem kell 2-3)
   - Inline szerkesztés (plain text elég, emoji picker opcionális)
   - Mentés draft-ba
   - **P0 minimum:** Működő AI hívás + szerkesztés, nincs feltétlenül karakter számláló vagy fancy editor

3. **Content Calendar - basic** (H2)
   - Heti nézet
   - Poszt slotok (dátum + platform)
   - Drag&drop VAGY manuális dátum választás (elég az egyik)
   - Poszt státuszok: Draft / Approved / Scheduled / Published
   - **P0 minimum:** Működő naptár lista/grid nézet, drag&drop opcionális (lehet egyszerűbb UI)

4. **Pseudo-approval - egyszerű** (H2)
   - Draft → "Ready to publish" gomb (self-approval is elég v1-ben)
   - Approved státusz
   - **P0 minimum:** Nincs feltétlenül multi-user review flow, lehet hogy ugyanaz a user "approve"-olja. Cél: workflow átmenet tesztelése, nem robusztus approval chain.

5. **Publishing - instant + manual schedule** (H2)
   - Meta Graph API integráció (FB/IG OAuth)
   - Instant publish gomb (azonnal kiküldés)
   - VAGY Manual schedule (dátum/időpont választás)
   - Retry logic **egyszerű** (ha hiba, user kattint "retry" - nincs auto queue+retry)
   - **P0 minimum:** Működő publikálás, lehet hogy először csak instant, scheduling később jön (vagy fordítva). Nincs feltétlenül background job queue v1-ben, lehet simpler cron check.

6. **Instrumentation & Rating - core** (H1, H2, H3)
   - **Használhatósági rating jelölés (most P0!)** - poszt véglegesítéskor mandatory jelölés: "rendben, kisebb módosítással" / "nagy átdolgozás" / "nem használható"
   - Session tracking (login, feature usage)
   - AI Copy Studio usage count
   - Creaitorban generált tartalom aránya
   - **P0 minimum:** Backend logging + egyszerű admin dashboard (nem kell szép UI socialosoknak, elég ha mi látjuk az adatokat)

7. **Multi-tenant basic - hierarchy only** (H2, H3)
   - Ügynökség → User → Brand → Social Profile hierarchy
   - Ügynökség regisztráció
   - User meghívás (email + link)
   - Márka létrehozása
   - Social profile csatolása (Meta OAuth)
   - **P0 minimum:** Nincs fine-grained permission (ki mit láthat), nincs role-based access control részletesen. Elég: "ha ugyanabban az ügynökségben vagy, látod az összes márkát". Permissions finomhangolás → P1.

---

### Should Have (P1) - Fontos, de hipotézis-teszteléshez NEM kritikus

**Ezek production-érettséghez kellenek, de H1/H2/H3 tesztelése nélkülük is működik:**

8. **Multi-tenant fine-grained permissions** (P0 → P1)
   - Szerepkörök: Admin vs. Editor
   - Brand-specifikus jogosultságok
   - Approval chain szintek
   - **Indok:** Kis pilot csapatban (5-10 ügynökség, 1-3 user/ügynökség) nincs komplex permission igény. V1.5-ben kell, ha skálázunk.

9. **Background job queue + auto retry** (P0 → P1)
   - Queue-alapú scheduled posting
   - Automatikus retry (3x próbálkozás)
   - Job status dashboard
   - **Indok:** P0-ban elég manual retry vagy egyszerű cron. Auto queue production polish, nem hipotézis-validáció.

10. **Full approval workflow - multi-user** (P0 → P1)
    - Draft → Review → Approved chain
    - Másik user review-olja
    - Comment thread
    - Notification
    - **Indok:** P0-ban elég self-approval vagy pseudo-approval. Multi-user review workflow production feature, nem hipotézis-kritikus.

11. **AI Visual Studio (képgenerálás)** (P1 prioritás, de Architecture teljes implementációt tartalmaz)
    - **Architecture dokumentum:** Teljes ImageAIService definiálva (Nano Banana + Seedream dual provider, ai-image.queue.ts, ImageStudio React komponens)
    - **Alternatíva P0-ban:** Socialos feltölt saját képet
    - **Indok:** H1/H2 teszteléséhez kell AI copy, de képgenerálás opcionális. Ha nincs idő, v1.5-be.
    - **Megjegyzés:** Az Architecture dokumentum teljes implementációt tartalmaz, de a prioritás (P0 vs P1) sprint planning során explicit döntésre vár.

12. **Saját kép feltöltés + crop/resize**
    - Upload, drag&drop
    - Crop tool
    - **Indok:** Fontos, de H1/H2-höz nem kritikus. Ha AI Visual nem készül el, ez megy P0-ba.

13. **Basic insights dashboard (socialosoknak)**
    - Ügynökség szintű metrikák
    - Márka szintű metrikák
    - Vizuális dashboard
    - **Indok:** Instrumentáció backend (P0) elég, szép dashboard (P1). Pilot alatt mi nézzük az adatokat admin panel-en, socialosoknak nem kell feltétlenül látni.

---

### Nice to Have (P2) - V1.5-be tolható

14. **AI-javasolt tartalomtípus mix**
    - Heti "javasolt mix" megjelenítés

15. **In-app + Email notifications**
    - Notification badge
    - Email alerts

16. **Advanced calendar features**
    - Havi nézet (ha heti elég P0-ban)
    - Campaign csoportosítás
    - Bulk műveletek

**P2 indok:** Ezek UX nice-to-have-ek, de nem befolyásolják H1/H2/H3 hipotézis-tesztelést.

---

## P0 Implementation Minimum - Feature-enkénti Részletezés

Az alábbi lista minden MVP feature-nél megmutatja: **mi az abszolút P0 minimum implementáció**, és mi tolható P1-be.

---

### 1. Multi-Tenant Alaprendszer

**P0 Implementation Minimum:**
- Ügynökség regisztráció (email + jelszó)
- User meghívás egyszerű linkkel (email cím, link generálás)
- Márka létrehozása (név, leírás)
- Social profile csatolása Meta OAuth-tal (FB Page, IG Account ID tárolása)
- **Nincs:** Fine-grained permissions. Minden user minden márkát lát az ügynökségen belül. Admin vs. Editor megkülönböztetés opcionális.

**P1 Enhancement:**
- Szerepkörök (Admin, Editor, Viewer)
- Brand-specifikus jogosultságok
- User audit log

---

### 2. Brand Brain v1

**P0 Implementation Minimum:**
- Form: TOV (textarea, 200-500 karakter), Key Messages (5x input field), Példaposztok (3x textarea), Vizuális irány (textarea, 100-300 karakter)
- Mentés gomb
- Adatok tárolása márka-szinten
- **Nincs:** Szép UI, validáció (lehet, hogy user 0 karaktert ír - nem gond pilot alatt), brand voice preview, guideline PDF upload.

**P1 Enhancement:**
- Polished UI (drag&drop példaposztok, rich text editor)
- Brand asset upload (logó, színek)
- Brand voice preview (hogyan néz ki az AI output)
- Validáció és error handling

---

### 3. AI Copy Studio

**P0 Implementation Minimum:**
- Brief input (textarea, 1-2 mondat)
- Platform választás (FB / IG - radio button)
- "Generate" gomb → AI hívás (1 variáns)
- Szöveg megjelenítése (plain text)
- Inline szerkesztés (contenteditable div VAGY textarea)
- "Save as draft" gomb
- **Használhatósági rating jelölés (MOST P0!):** Mandatory dropdown publish előtt: "Rendben, kisebb módosítással" / "Nagy átdolgozás kellett" / "Nem használható"
- **Nincs:** 2-3 variáns generálás, emoji picker, karakter számláló, regenerálás gomb (lehet manuálisan újra kattintani).

**P1 Enhancement:**
- Rich text editor (bold, emoji)
- Karakter számláló
- 2-3 variáns generálás
- Regenerálás gomb
- Hashtag javaslat

---

### 4. AI Visual Studio

**Prioritás:** P1 (Should Have), de Architecture dokumentum teljes implementációt tartalmaz

**Architecture dokumentum állapota:**
- ✅ Teljes ImageAIService definiálva (Nano Banana + Seedream dual provider)
- ✅ `POST /api/ai/image` endpoint
- ✅ `ai-image.queue.ts` (BullMQ background job)
- ✅ ImageStudio React komponens
- ✅ Intelligent routing: character consistency → Nano Banana, 4K → Seedream

**P1 Feature (nem P0):**
- Ha nincs idő, P1-be. P0-ban elég, ha socialos feltölt saját képet.
- **Megjegyzés:** Az Architecture dokumentum teljes implementációt tartalmaz, de a prioritás (P0 vs P1) sprint planning során explicit döntésre vár.

**P0 Alternative (ha AI Visual nincs):**
- Saját kép feltöltés (upload button)
- Egyszerű crop (ha van idő) VAGY nincs crop (user külsőleg croppolja)

---

### 5. Content Calendar

**P0 Implementation Minimum:**
- Heti lista/grid nézet (7 nap, FB/IG slotok)
- Poszt hozzáadása dátumhoz (manuális dátum választás ÉS/VAGY drag&drop)
- Poszt státuszok: Draft / Approved / Scheduled / Published (színkódolás)
- Kattintás → poszt edit popup
- Márka-szintű szűrés (dropdown: "Összes márka" / "Márka XY")
- **Nincs:** Havi nézet (ha heti elég), AI-javasolt mix, campaign csoportosítás, bulk műveletek.

**P1 Enhancement:**
- Havi nézet
- Drag&drop (ha P0-ban nem készült el)
- AI-javasolt tartalomtípus mix
- Campaign csoportosítás

---

### 6. Approval Workflow

**P0 Implementation Minimum (Pseudo-approval):**
- Draft státusz (default, ha poszt létrejön)
- "Approve" gomb (self-approval is elég P0-ban - ugyanaz a user jóváhagyja)
- Approved státusz
- **Nincs:** Multi-user review flow, másik user jóváhagyása, comment thread, notification.

**P1 Enhancement:**
- Draft → Review → Approved chain
- Másik user review-olja
- Comment thread (poszt-szintű feedback)
- In-app + email notification

**Döntési pont:** Ha pilot feedback azt mondja "külső ügyfél approval kritikus", akkor P1-be kerül:
- Ügyfél meghívása platformra (email link)
- Külső approval flow

---

### 7. Publishing & Scheduling

**P0 Implementation Minimum:**
- Meta Graph API integráció (OAuth, token tárolás, FB/IG publish endpoint hívás)
- **Instant publish** VAGY **Manual schedule** (elég az egyik P0-ban!)
  - **Instant publish:** "Publish now" gomb → azonnal Meta API hívás
  - **Manual schedule:** Dátum/időpont választás + "Schedule" gomb → scheduled státusz. Egyszerű cron job (5 percenként ellenőrzi: van-e scheduled poszt, ideje van-e → publish).
- Retry logic egyszerű: ha hiba, "Failed" státusz + "Retry" gomb (user kattint)
- **Nincs:** Background job queue (Sidekiq/Bull), auto retry (3x próbálkozás), job monitoring dashboard.

**P1 Enhancement:**
- Background job queue (Sidekiq/Bull/BullMQ)
- Automatikus retry (3x próbálkozás exponential backoff-fal)
- Job status dashboard
- Instant + scheduled együtt (ha P0-ban csak az egyik)

**Döntési pont:** Pilot feedback után eldöntjük: instant publish elég, vagy scheduling kritikus? Ha scheduling kritikus → P0, ha nem → P1.

---

### 8. Basic Insights & Usage Tracking

**P0 Implementation Minimum (Backend + Admin Dashboard):**
- Backend event logging:
  - Session tracking (user login, page views)
  - AI Copy Studio használat (generálások száma, brand)
  - Használhatósági rating (poszt-szintű jelölés tárolása)
  - Creaitorban generált tartalom aránya
- **Admin-only dashboard** (nem kell socialosoknak látniuk):
  - Ügynökség szintű aggregált metrikák
  - Márka szintű metrikák
  - CSV export (ha kell)
- **Nincs:** Szép UI socialosoknak, real-time dashboard, vizualizációk.

**P1 Enhancement:**
- Socialos-facing dashboard (szép UI)
- Vizualizációk (grafikonok)
- Márka szintű insights megjelenítése socialosoknak
- Exportálható riportok

---

