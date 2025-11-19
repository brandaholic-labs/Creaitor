# Creaitor - Product Requirements Document

**Szerző:** BMad
**Dátum:** 2025-01-18
**Verzió:** 1.0

---

## Executive Summary

### Célcsoport (Ki?)

**Elsődleges célcsoport (MVP):** 3–10 fős social media és marketing ügynökségek Magyarországon és a közép-kelet-európai régióban, akik:
- 5–30 aktív ügyfélmárkát kezelnek párhuzamosan
- 1–3 socialos dolgozik Facebook és Instagram tartalomgyártáson
- Jellemzően KKV ügyfeleket szolgálnak ki (kereskedelem, szolgáltatás, horeca, edukáció)

**Másodlagos célcsoport (jövő):** In-house marketing csapatok nagyvállalatoknál, akik több almárkát/termékvonalat kezelnek.

### Fő Feladat / Job-to-be-Done (Mit old meg?)

A heti Facebook és Instagram tartalomnaptár összeállításának idejét **30-40%-kal csökkenteni** márkánként, miközben:
- A generált posztok legalább 70%-a csak kisebb szerkesztést igényel
- A márkahűség minimum 8/10-es szinten marad (socialosok és ügyfelek értékelése alapján)
- A socialos a teljes munkafolyamatot (tervezés → generálás → jóváhagyás → ütemezés) **egy rendszerben** tudja kezelni

### Fő Megoldás (Hogyan?)

**Brand Brain-alapú AI tartalomgenerálás integrált workflow-val:**

1. **Brand Brain (v1):** Minden ügyfélmárkához strukturált "márka-agy" - példapostok, tone of voice leírás, key messages, vizuális irányok
2. **AI Copy Studio:** Brand Brain kontextusával generált szövegjavaslatok (nem általános AI-promptolás)
3. **AI Visual Studio:** Képgenerálás a márka vizuális irányainak figyelembevételével
4. **Content Calendar:** Heti/havi naptár FB+IG slotokkal, AI-javasolt tartalomtípus-mixszel
5. **Approval Workflow:** Belső jóváhagyási folyamat (draft → review → approved → scheduled)
6. **Publishing:** Közvetlen ütemezés Meta Graph API-n keresztül

### Differenciálás (Miért más?)

**Ritka kombináció három dimenzióban:**

1. **Workflow-ba integrált Brand Brain** - Nem ad hoc AI-promptolás, hanem márkánként strukturált tudásbázis, amely minden generálásba beépül
2. **Ügynökségi multi-brand optimalizáció** - 1 socialos → 5-10 márka kezelése egy felületen, márka-szintű naptárak és státuszok
3. **Magyar/CEE piaci fókusz** - Lokális nyelvi támogatás, kulturális kontextus, régiós pricing

**Piaci rés:** A kutatások szerint [Forrás: Market Research, 2025] a marketingesek 77%-a kísérletezik generatív AI-val, de csak 44%-uk lát jelentős előnyt. A fő probléma: az AI-generált tartalom nem elég "on-brand". A legtöbb eszköz vagy általános AI-szövegíró (pl. ChatGPT, Jasper) VAGY social media management platform (pl. Hootsuite, Buffer), de nem kombinálja a kettőt workflow-ba ágyazott, márka-specifikus tudásbázissal.

### Technikai Kontextus és Megszorítások

- **Platform:** Multi-tenant SaaS B2B web alkalmazás
- **Külső függőségek:** Meta Graph API (FB/IG), LLM API (szöveggenerálás), Image generation API
- **Architektúra:** Modern web stack, multi-tenant adatbázis, background job queue (ütemezéshez)
- **Skála célok (6 hónap):** 5-10 pilot ügynökség, 25-50 aktív márka
- **Nyelvi támogatás:** Magyar (primary), később angol, szlovák, lengyel, román
- **Compliance:** GDPR compliance, Meta platform policies

---

## Projekt Klasszifikáció

**Technikai típus:** SaaS B2B Web Alkalmazás (Social Media Management)

**Domain:** MarTech - Social Media Management (ügynökségi fókusz v1, később bővíthető in-house csapatokra)

**Komplexitás:** Magas

### MVP Scope vs. Long-term Funkciókészlet

**Az alábbi komponensek az MVP (6 hónap) részét képezik:**
- Multi-tenant rendszer (ügynökség/user/márka kezelés)
- Brand Brain v1 (példapostok, TOV, key messages, vizuális irány tárolása)
- AI Copy Studio (LLM integráció Brand Brain kontextussal)
- AI Visual Studio (alapszintű képgenerálás integráció)
- Content Calendar (FB+IG heti/havi naptár)
- Approval workflow (draft → review → approved → scheduled)
- Meta Graph API integráció (FB/IG publishing)
- Basic insights (aktivitás metrikák, usage tracking)

**Long-term fejlesztési irányok (post-MVP):**
- Brand Brain v2-v3 (RAG-alapú, mélyebb tudásbázis)
- További platformok (TikTok, LinkedIn, YouTube Shorts)
- Haladó analitika és riporting
- White-label megoldás
- Ügynökségi operációs réteg (tasking, approval chain, dashboard)

### Komplexitás Indoklás

A projekt **magas komplexitású**, mivel az MVP is tartalmaz:

1. **Multi-tenant architektúra** - Tenant-szintű adatizolálás, jogosultságkezelés
2. **Külső API integrációk** - Meta Graph API (rate limits, token management, error handling)
3. **AI integráció** - LLM és image generation API-k, prompt engineering, context management
4. **Workflow engine** - Állapotgépek (draft/review/approved/scheduled), background jobs
5. **Real-time collaboration szempontok** - Több user egyidejű munkája ugyanazon márkán/poszton
6. **Több komplex domain** - Brand management, social media, AI, ügynökségi workflow

### Domain Sajátosságok

**Szabályozási szempontból:**

A platform **nem tartozik a magas szabályozottságú, specialized domainekhez** (pl. healthcare, fintech, aerospace, legal). Nem igényel:
- Speciális compliance certificációt (FDA, HIPAA, PCI-DSS, ISO 26262)
- Szakértői domain tudást (orvosi, jogi, pénzügyi, műszaki)
- Iparág-specifikus biztonsági szabványokat

Ugyanakkor **GDPR compliance és Meta platform policies** betartása kötelező.

**AI és márka-specifikus kihívások:**

Bár nem "specialized domain" szabályozási értelemben, **magas domain-szenzitivitás** van a következő területeken:

1. **Magyar és CEE nyelvkezelés**
   - Magyar nyelv helyes AI-generálása (syntax, kulturális kontextus)
   - Régiós nyelvek támogatása (szlovák, lengyel, román)
   - Nyelvi minőség biztosítása (nem angolból fordított tartalom)

2. **Márkahű tone of voice**
   - Brand identity megőrzése AI-generálásban
   - Tone of voice következetes alkalmazása
   - Márka-specifikus tabuk, preferált/kerülendő kifejezések kezelése

3. **Social platform policy-k változásai**
   - Meta API változások gyors követése
   - Platform-specifikus content guidelines (mit lehet/mit nem)
   - Rate limiting, quota management
   - API hozzáférés esetleges korlátozásai

4. **Ügynökségi workflow-minták**
   - Multi-client kezelés sajátosságai
   - Jóváhagyási folyamatok diverzitása
   - Belső ügynökségi folyamatok és KPI-k
   - Magyar/CEE ügynökségi pricing és működési modellek

---

## Referenciák

- **Product Brief:** docs/product-brief-creaitor-2025-11-17.md
- **Market Research:** docs/market-research.md
- **Competitive Analysis:** docs/competitive-analysis.md
- **Brainstorming Session:** docs/brainstorming-session-results-2025-11-16.md

---

## Siker Kritériumok

### North Star Metric

**A Creaitor akkor sikeres az MVP után (6 hónap), ha az ügynökségi socialosok egy része ténylegesen core workflow-ként használja** (fő gyártási hely a heti FB/IG tartalomnaptár készítéséhez), **és bizonyítható időmegtakarítást ér el elfogadható márkahűség mellett.**

Ez a két dimenzió együttesen jelzi a valódi Product-Market Fit magot: ha az eszköz beépül a napi munkába ÉS mérhető értéket ad.

---

### Primary Success Metrics - Usage & Outcome

**Ezek a legfontosabb metrikák.** A döntés ("folytatjuk-e és merre") **elsősorban** ezek alapján történik.

| Metrika | Minimum (Continue Threshold) | Target (Sikeres MVP) | Stretch (Aspirational) |
|---------|------------------------------|----------------------|------------------------|
| **Aktív pilot ügynökségek** | 5+ ügynökség, 4-6 hétig folyamatos használat | 8-10 ügynökség | 12+ ügynökség |
| **Aktív márkák / ügynökség** | Min. 3 márka / ügynökség | 5+ márka / ügynökség | 8+ márka / ügynökség |
| **Workflow beágyazódás** | Legalább 2-3 ügynökségnél "fő gyártóhely" (self-report + usage adatok) | 50%+ ügynökségeknél "fő gyártóhely" | 70%+ ügynökségeknél |
| **Creaitorban generált tartalom aránya** | 50%+ (heti posztok legalább fele Creaitorban készül) | 70%+ | 85%+ |
| **Időmegtakarítás** | 20-25%+ időmegtakarítás legalább 50% ügynökségeknél | 30-40% időmegtakarítás 70%+ ügynökségeknél | 40%+ időmegtakarítás 80%+ ügynökségeknél |
| **Márkahűség rating** | 7/10+ átlag (socialos értékelés) | 8/10+ átlag | 8,5/10+ átlag |
| **Használható posztok aránya** | 60%+ (kisebb szerkesztéssel publikálható) | 70%+ | 80%+ |

**Mérési megközelítés:**

- **Időmegtakarítás:** Pilot elején baseline mérés (self-report + 1-2 hetes konkrét időmérés), majd 4-6 hét Creaitor használat után újramérés ugyanazon márkáknál
- **Márkahűség:** Havi rövid rating-survey (1-10 skála: "Mennyire érzed márkahűnek a Creaitor által generált posztokat?")
- **Használható posztok:** Posztszintű jelölés a rendszerben ("rendben, kisebb módosítással" / "nagy átdolgozás" / "nem használható")

**Miért fontosak:** Ha a Minimum küszöböt elérjük → **folytatjuk a fejlesztést**. Ha a Target-et elérjük → **sikeres MVP, skálázás felé**. A Stretch aspirational, nem követelmény.

---

### Secondary Success Metrics - Business & Sentiment

**Ezek másodlagos jelzések**, nem binary success/fail kapuk. Kisebb mintán (5-10 ügynökség) statisztikailag zajosak, inkább **range-ekben értelmezzük**.

| Metrika | Elfogadható Range | Target | Miért fontos? |
|---------|-------------------|--------|---------------|
| **Fizető ügynökségek** | 5-10 (a pilot csoportból) | 8-10 | Fizetési hajlandóság validálása |
| **MRR** | 500-1,500 EUR | 1,000-1,500 EUR | Fenntartható modell korai jele |
| **Átlagos ARPU** | 100-200 EUR/hó | 150-200 EUR/hó | Árképzési modell validálása |
| **Havi churn** | 10-20% (kis mintán normális) | <15% | Korai fit jelzése (de kis N mellett zajos!) |
| **3 hónapos retention** | 50-70% | 60%+ | Hosszabb távú használat jelzése |
| **NPS** | 20-40 | 30-40+ | Ajánlási hajlandóság, viralitás potenciál |
| **Weekly Active Users (WAU)** | 60-80% a regisztráltakból | 70%+ | Rendszeres használat |

**Fontos:** Ezek a számok kis mintán (5-10 ügynökség) **ugrálni fognak**. Pl. 10-ből 2 lelép → 20% churn, ami papíron ijesztő, de lehet hogy csak rossz fit. Ezért:
- **Nem binary gate** - nem bukik el az MVP azért, mert churn 18% helyett 15%
- **Kvalitatív kiegészítés fontos** - miért léptek ki? rossz fit vs. termékprobléma?
- **Irányjelzők**, nem fix küszöbök

**Unit Economics (korai jelzések):**
- **CAC:** <200 EUR / ügynökség pilot fázisban (direkt outreach, referral)
  - **Figyelem:** Ez "fals pozitív" lehet, mert első ügyfelek olcsón szerezhetők. Skálázásnál CAC várhatóan nő.
- **LTV becslés:** Még nincs elég adat. Ha 6 hónap átlag lifetime-ot feltételezünk + 150 EUR/hó ARPU → ~900 EUR LTV
  - **LTV/CAC arány:** Cél 3:1+ hosszú távon, de MVP-ben ez még **hipotézis**, nem mért tény.

---

### Learning Goals - Experiment Framework

Az MVP **nem csak termék**, hanem **kísérletsorozat** kritikus hipotézisek tesztelésére.

| Hipotézis | Teszt Design | Kulcs Mérőszám | Döntési Szabály / Következő Lépés |
|-----------|--------------|----------------|-----------------------------------|
| **H1: Brand Brain v1 elég a 8/10-es márkahűséghez** | 3-5 iparág, iparáganként 3-5 márka. Csak v1 input (1-3 példapost, TOV, key messages, vizuális irány). | Márkahűség rating iparáganként | **Ha <7/10:** v1.5-ben több input vagy RAG szükséges. **Ha 7-8/10:** v1 elég, finomhangolás. **Ha 8/10+:** v1 működik, fokozatosan bővíthető. |
| **H2: A socialos hajlandó a Creaitorban kezdeni (go-to tool)** | 5-10 ügynökség, 4-6 hét usage tracking. Mérés: session mintázat, Creaitorban generált tartalom aránya, kvali interjú. | **Fő gyártóhely** státusz % (hány ügynökségnél?) + workflow adoption rate | **Ha <30%:** Súlyos UX/friction problémák, redesign. **Ha 30-50%:** Működik, de van javítanivaló. **Ha 50%+:** Erős adoption, tovább skálázható. |
| **H3: Magyar/CEE piacon van hely agency-first AI social OS-nek** | Pilot → fizető konverzió arány. Willingness-to-pay kvali interjúk. Pricing sensitivity teszt. | Pilot-to-paid konverzió %, elfogadható ártartomány (EUR/hó) | **Ha <40% konverzió:** Árazási vagy value prop probléma. **Ha 40-60%:** Jó jelzés, árpontosítás. **Ha 60%+:** Erős fizetési hajlandóság, pricing validated. |

**Additív hipotézisek (később jöhetnek):**
- **H4:** AI latency tolerance - mennyi másodperc generálási idő még elfogadható?
- **H5:** Testreszabhatóság vs. plug&play - melyik fontos jobban?

---

### Instrumentáció és Mérési Megbízhatóság

**Kritikus kérdés:** Hogyan mérjük pontosan a kulcs metrikákat?

| Metrika | Mérési Módszer | Potenciális Torzítások | Mitigáció |
|---------|----------------|------------------------|-----------|
| **Creaitorban generált tartalom aránya** | Backend tracking: hány poszt készült AI Copy Studio-ban vs. manuálisan írva | User ChatGPT-ben ír, majd csak bemásolja → torzítás | Kvali interjúk + session replay-ek esetenként, hogy lássuk a valós flow-t |
| **Időmegtakarítás** | Pilot elején + végén self-report + 1 hét konkrét időmérés (Google Sheet táblázat napi kitöltéssel) | Self-report recall bias, alul/túlbecsülés | Kombináljuk self-report-tal ÉS konkrét időmérést |
| **Márkahűség rating** | In-app havi survey (1-10 skála) | Kis N mellett 1-2 outlier eltorzítja átlagot | Median és átlag együttes nézése, kvali kommentek gyűjtése |
| **Használható posztok aránya** | In-app jelölés posztszinten ("rendben, kisebb módosítással" / "nagy átdolgozás" / "nem használható") | User nem tölti ki következetesen | Mandatory jelölés publish előtt + időnként spot-check |
| **Workflow adoption (fő gyártóhely)** | Usage adatok (session mintázat, generált tartalom %) + havi kvali interjú | Usage adatok félreértelmezhetők (belép, de nem használ) | Kombináljuk: usage data ÉS self-report ("hol kezded a heti munkát?") |

**Fontos:** Kis mintán (5-10 ügynökség) még a legjobb instrumentációval is **zajos adatokat** kapunk. Ezért:
- **Kvali + kvanti kombináció** kötelező
- **Outlier-ek külön vizsgálata** (miért van az az 1 ügynökség 0% használaton?)
- **Döntéseknél kontextus figyelembe vétele**, nem csak nyers számok

---

### Összefoglaló: Siker Definíció (6 hónap után)

#### Minimum Success Threshold (CONTINUE)

**Folytatjuk a fejlesztést, ha:**

✅ **5+ ügynökség** aktívan használja (4-6 hétig)

✅ **Legalább 2-3 ügynökségnél** a Creaitor valóban "fő gyártóhely" (workflow beágyazódás)

✅ **20-25%+ időmegtakarítás** igazoltan, legalább 50% ügynökségeknél

✅ **7/10+ márkahűség rating** átlagban

✅ **50%+ Creaitorban generált tartalom** aránya

✅ **Legalább 5 fizető ügynökség** (validálja fizetési hajlandóságot)

**→ Ez jelzi:** Van mag, érdemes tovább finomítani, fejleszteni.

#### Target Success (SIKERES MVP)

**Az MVP sikeres, ha:**

✅ **8-10 ügynökség** aktívan használja

✅ **50%+ ügynökségeknél** "fő gyártóhely" státusz

✅ **30-40% időmegtakarítás** igazoltan, 70%+ ügynökségeknél

✅ **8/10+ márkahűség rating** átlagban

✅ **70%+ használható posztarány**

✅ **70%+ Creaitorban generált tartalom** aránya

✅ **8-10 fizető ügynökség**, 1-1,5k EUR MRR

✅ **NPS 30-40+**

✅ **Brand Brain v1 hatékonyságát validáltuk** - tudjuk, hol elég, hol kell mélyebb

**→ Ez jelzi:** Erős PMF mag, skálázásra kész, érdemes v1.5-be fektetni.

#### Stretch Goals (ASPIRATIONAL)

- 12+ ügynökség, 70%+ "fő gyártóhely"
- 40%+ időmegtakarítás, 8,5/10+ rating
- 1,5-2k EUR MRR, NPS 40+

**→ Ez lenne a "tökéletes" kimenet, de NEM elvárás MVP-nél.**

---

#### Mi NEM jelent sikert?

- **Profitabilitás** - még nem (MVP költséges, pilot árazás kedvezményes)
- **Késztermék-érettség** - még sok feature hiányzik (TikTok, LinkedIn, haladó analytics stb.)
- **Skálázható growth machine** - még nem tudjuk, hogyan szerezzünk 100+ ügynökséget
- **Stable unit economics** - még nincs elég adat a valós LTV/CAC arányhoz

#### De jelzi, ha elérjük:

- **Van Product-Market Fit mag** az ügynökségi szegmensben
- **Az eszköz tényleg beépül a workflow-ba** (nem csak demo)
- **Van fizetési hajlandóság** a célpiacon
- **Tiszta irány a következő iterációhoz** (v1.5, v2) - tudjuk, mit kell javítani/bővíteni

---

## Scope Definition

### MVP Időkeret és Fókusz

**Időkeret:** 6 hónap (2025 Q2-Q3)

**Core Scope:** A Creaitor MVP egy **ügynökségi multi-brand social media tartalomgyártó és ütemező eszköz**, amely kifejezetten **Facebook és Instagram** tartalomnaptár készítésére fókuszál, **Brand Brain-alapú AI támogatással**.

**Nem egy:** Általános marketing automation platform, nem enterprise CRM integráció, nem haladó analitika rendszer. Az MVP célja a **core workflow** validálása: Brand Brain → AI-generálás → Naptár → Jóváhagyás → Ütemezés.

---

### In Scope - MVP Features (6 hónap)

#### 1. Multi-Tenant Alaprendszer

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

#### 2. Brand Brain v1 - Márka Tudásbázis

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

#### 3. AI Copy Studio - Szöveggenerálás

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

#### 4. AI Visual Studio - Képgenerálás

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

#### 5. Content Calendar - Tartalomnaptár

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

#### 6. Approval Workflow - Jóváhagyási Folyamat

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

#### 7. Publishing & Scheduling - Ütemezés és Publikálás

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

#### 8. Basic Insights & Usage Tracking

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

### Out of Scope - Explicitly NOT in MVP

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

### Post-MVP Roadmap (Jövőbeli Fejlesztések)

**Fontos:** Az alábbi roadmap **nem rigid gate-ekkel működik** ("csak akkor v1.5, ha pontosan 8 ügynökség van"). Ehelyett **learning-alapú döntési pontok** - a pilot feedback és hipotézis-eredmények határozzák meg az irányt.

---

#### v1.5 - Finomhangolás (6-9 hónap)

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

#### v2.0 - Skálázási Fázis (9-15 hónap)

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

#### v3.0 - Enterprise & Internationalization (15-24 hónap)

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

### Hipotézis → Feature Mapping

Az MVP P0 feature-jeit **explicit módon kötjük a Learning Goals hipotézisekhez**. Minden P0 feature egy vagy több hipotézis validálásához szükséges.

| Hipotézis | Szükséges P0 Feature-k | Miért szükséges? |
|-----------|------------------------|------------------|
| **H1: Brand Brain v1 elég a 8/10-es márkahűséghez** | - Brand Brain v1 (minimal)<br>- AI Copy Studio (minimal)<br>- Használhatósági rating (instrumentáció) | H1 teszteléséhez kell Brand Brain input + AI generálás + márkahűség mérése |
| **H2: Socialos hajlandó Creaitorban kezdeni (go-to tool)** | - Content Calendar (basic)<br>- Pseudo-approval (egyszerű)<br>- Publishing (instant + manual)<br>- Usage tracking (session, feature) | H2 teszteléséhez kell működő workflow (naptár → jóváhagyás → publikálás) + használat mérése |
| **H3: Magyar/CEE piacon van hely agency-first AI social OS-nek** | - Multi-tenant basic (hierarchy)<br>- Functional workflow (P0-k együtt)<br>- Usage tracking | H3 teszteléséhez kell használható termék (P0 együtt) + pilot-to-paid konverzió mérése |

**Lényeg:** P0 nem "production-ready termék", hanem **hipotézis-validáló minimum**. Ha H1 vagy H2 megbukik, a felesleges production polish nem segít.

---

### MVP Feature Prioritás (ha idő szűk)

#### Must Have (P0) - Hipotézis-validáláshoz szükséges minimum

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

#### Should Have (P1) - Fontos, de hipotézis-teszteléshez NEM kritikus

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

#### Nice to Have (P2) - V1.5-be tolható

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

### P0 Implementation Minimum - Feature-enkénti Részletezés

Az alábbi lista minden MVP feature-nél megmutatja: **mi az abszolút P0 minimum implementáció**, és mi tolható P1-be.

---

#### 1. Multi-Tenant Alaprendszer

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

#### 2. Brand Brain v1

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

#### 3. AI Copy Studio

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

#### 4. AI Visual Studio

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

#### 5. Content Calendar

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

#### 6. Approval Workflow

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

#### 7. Publishing & Scheduling

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

#### 8. Basic Insights & Usage Tracking

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


## Assumptions & Constraints (Feltételezések és Korlátok)

> **Filozófia:** A sikeres projekt nem az, amelyik minden kockázatot kiküszöböl, hanem amely **tisztában van a feltételezéseivel és korlátaival**, és explicit döntéseket hoz ezek mentén.

**Miért fontos ez a szekció:**
- **Transzparencia:** Explicit lista arról, mit feltételezünk igaznak (de lehet, hogy nem az)
- **Döntési keret:** Ha egy assumption bukik, azonnal tudod, mi a következő lépés
- **Scope védelem:** Világos, mi NEM része a projektnek (out of scope)
- **Kommunikáció:** Stakeholderek értik a korlátokat

---

## A0: Project-Level Assumptions (Projekt Szintű Feltételezések)

> **Ezek a legmagasabb szintű feltételezések. Ha 1-2 bukik közülük, az major pivot vagy project stop.**

| ID | Assumption | Ha invalid, mi történik? | Validálási mód (pilot alatt) |
|----|------------|-------------------------|------------------------------|
| **A0.1** | **4-6 hét elég a core hipotézisek (H1/H2/H3) validálására** | Pilot hosszabbítás szükséges (8-10 hét) VAGY scope csökkentés | 2. hét végén interim mérés: hány feature kész? Van baseline mérés? |
| **A0.2** | **Solo dev (1 fő) elegendő a P0 MVP fejlesztésére** | Második dev bevonás VAGY timeline csúszás | Weekly velocity tracking: hány story point/hét? Burndown chart |
| **A0.3** | **Pilot user base (3-5 ügynökség, 8-10 socialos) elég reprezentatív a PMF-validáláshoz** | Szélesebb user base szükséges VAGY kvalitatív pivot (mélyebb interjúk) | 4. hét: hány aktív user? Vannak-e divergens use case-ek? |
| **A0.4** | **Desktop-first UI elfogadható P0-ban (mobil basic support elég)** | Mobil UX prioritás emelkedik → redesign szükséges | User interjúk: eszköz-használat tracking (desktop vs. mobil arány) |
| **A0.5** | **Magyar piac először (lokalizáció, support) versenyképes pozíciót ad** | International launch szükséges korábban VAGY feature-pivot lokális igényekre | Pilot feedback: mennyire értékelik a magyar nyelvű support-ot? |

---

## A1: Business & Market Assumptions (Üzleti/Piaci Feltételezések)

| ID | Assumption | Impact ha invalid | Validation |
|----|------------|-------------------|------------|
| **A1.1** | **Socialosok nyitottak AI használatára, nem fenyegetésként látják** | Adoption fail → AI feature deprioritizálás, fókusz calendar/workflow-ra | Onboarding interjúk, NPS nyílt kérdések, valós AI usage rate (H3) |
| **A1.2** | **Ügynökségek hajlandóak fizetni egy olyan tool-ért, ami időt spórol a socialosoknak** | Monetizáció nehéz → pivot freemium/ads VAGY alacsonyabb pricing | Pilot után WTP (Willingness to Pay) survey, min. 2-3 ügynökség "fizetnénk érte" jelzés |
| **A1.3** | **Brand Brain v1 (TOV + key messages + példaposztok) elég információ jó AI output-hoz** | AI output gyenge → bővebb Brand Brain (P1) VAGY más AI approach | H3 validálás: usable AI output >60% (ha <40%, akkor A1.3 invalid) |
| **A1.4** | **6 poszt/hét/márka a releváns usage tartomány (nem 1-2, nem 20-30)** | Ha <<6: ROI kicsi, ha >>6: scalability issue | Pilot alatt poszt-szám mérése márkánként, átlag kalkulálás |
| **A1.5** | **Buffer/Hootsuite incumbensek NEM hoznak Brand Brain-szerű AI feature-t a pilot alatt** | Versenyhelyzet éleződik → gyorsabb launch VAGY erősebb differenciálás szükséges | Competitor monitoring: changelog, feature release tracking |

---

## A2: Technical Assumptions (Technikai Feltételezések)

| ID | Assumption | Impact ha invalid | Validation |
|----|------------|-------------------|------------|
| **A2.1** | **Meta Graph API stabil marad, nincs major breaking change v18 → v19 a pilot alatt** | Publishing feature blokkol → workaround VAGY manual publishing fallback | Meta Developer changelog követés, staging app tesztelés |
| **A2.2** | **OpenAI GPT-4o VAGY Anthropic Claude 3.5 elég jó AI output minőséget ad (P0: 1 provider)** | AI output gyenge → model switch, prompt tuning, dual-provider (P1) | H3 validálás: usable AI output rate |
| **A2.3** | **PostgreSQL + Prisma + egyszerű app-layer multi-tenancy elég 8-10 ügynökség skálához** | Performance issue → DB optimization VAGY korai P1 scaling | Load testing 10 ügynökség szimulációval, query performance monitoring |
| **A2.4** | **Cloudinary (P0) elég file storage-hoz, S3 nem szükséges** | Cloudinary limit/cost issue → S3 migráció | Havi Cloudinary usage tracking, cost monitoring |
| **A2.5** | **Node.js + Express + React stack (egyszerű monolit) elegendő a pilot-hoz** | Scalability/performance issue →架构 refactor (P1 microservices) | Response time monitoring (NFR1.1 targets) |
| **A2.6** | **DB-backed session (PostgreSQL) stabil elég, Redis nem kell P0-ban** | Session performance issue → Redis switch | Session latency monitoring, user login/logout experience feedback |

---

## A3: User & Behavior Assumptions (User Viselkedési Feltételezések)

| ID | Assumption | Impact ha invalid | Validation |
|----|------------|-------------------|------------|
| **A3.1** | **Socialosok hajlandóak 20-30 percet tölteni Brand Brain setup-pal márkánként (első alkalommal)** | Onboarding friction → Brand Brain egyszerűsítés, wizard, lite mode | Pilot: mért setup idő, completion rate |
| **A3.2** | **Socialosok használják az AI-generált copy-t kiindulópontként (nem elvetik azonnal)** | AI feature adoption fail → UX javítás VAGY AI deprioritizálás | Usability rating: heavy_edit vs. not_usable arány |
| **A3.3** | **Socialosok hozzáférnek Meta OAuth-hoz (FB Page/IG account admin jogok)** | OAuth onboarding blokkol → IT/admin bevonás, onboarding friction | Pilot onboarding sikeres arány, blocker tracking |
| **A3.4** | **Socialosok elfogadják az "approval flow" pseudo-approval-ként (1 user self-approve)** | Multi-user approval szükséges → P1 feature VAGY adoption issue | Pilot feedback: mennyire hiányzik a valódi approval flow? |
| **A3.5** | **Socialosok használják a desktop/laptop-ot a munka nagy részében (nem mobil)** | Mobil UX priorizálás → UI redesign (responsive) | Device usage tracking, user interjúk |

---

## C0: Time & Resource Constraints (Idő és Erőforrás Korlátok)

| ID | Constraint | Consequence | Mitigation |
|----|-----------|-------------|------------|
| **C0.1** | **Pilot timeline: 4-6 hét** (dev + user onboarding + mérés) | Hard deadline → scope ruthless prioritization, P0-nice elhagyható | Weekly scope review, P0-core vs. P0-nice döntések |
| **C0.2** | **Solo developer (1 fő full-time)** | Bottleneck, nincs backup → velocity limit | Clean code (TS, comments), dokumentáció (README, env setup) |
| **C0.3** | **Pilot user base: 3-5 ügynökség, 8-10 socialos** (nem több) | Limitált sample size → statistical significance kicsi | Kvalitatív mélység kompenzál (mélyebb interjúk, baseline mérés) |
| **C0.4** | **Support bandwidth: ~5-10 óra/hét** (office hours, Slack) | Nem lehet 24/7 support → user expectations management | Office hours scheduling, FAQ doksi, közösségi Slack csatorna |
| **C0.5** | **Feature freeze 3. hét végén** (4-6. hét csak tuning/bugfix/measurement) | Új feature P0-ba nem kerülhet be → scope lock | Explicit communication: "P0 scope locked, P1 backlog nyílik" |

---

## C1: Technical Constraints (Technikai Korlátok)

| ID | Constraint | Consequence | Mitigation |
|----|-----------|-------------|------------|
| **C1.1** | **Meta Graph API dependency** (nincs alternatíva FB/IG publishing-hoz) | Meta policy change/API change → publishing blokkol | Version pinning (v18), Meta Developer Newsletter, staging app |
| **C1.2** | **Desktop-first UI (mobil: basic support only, nem full UX)** | Mobil user experience gyenge → mobile adoption alacsony | Explicit kommunikáció: "P0 desktop-first, P1 mobile UX" |
| **C1.3** | **Single AI provider P0 (OpenAI VAGY Anthropic, nem dual)** | Provider downtime/pricing → AI feature blokkol | Fallback: manual copy workflow mérhető (calendar adoption) |
| **C1.4** | **Cloudinary only (S3 out of scope P0)** | Cloudinary limit → file storage blokkol | Cost monitoring, fallback: text-only pilot phase |
| **C1.5** | **No CI/CD automation P0 (manual testing/deploy)** | Deploy slower, manual QA → deploy risky | Smoke test checklist, staging env (optional), rollback plan |
| **C1.6** | **No production monitoring/alerting (Datadog, Sentry out P0)** | Bug/downtime detection delayed → user experience | Pilot user Slack csatorna (real-time feedback), manual health check |

---

## C2: Budget & Cost Constraints (Költség Korlátok)

| ID | Constraint | Consequence | Mitigation |
|----|-----------|-------------|------------|
| **C2.1** | **API cost cap: ~$100-200/hó pilot alatt** (OpenAI/Anthropic) | Cost overrun → generation limit VAGY model downgrade | Monthly cost tracking, budget alert ($150 threshold) |
| **C2.2** | **Infrastructure: Render/Railway free tier VAGY basic plan (~$20-50/hó)** | Scale limit → performance degradation | Pilot scale (8-10 user) alatt free tier elég, monitoring |
| **C2.3** | **Cloudinary free tier (25 GB storage, 25 GB bandwidth/month)** | Limit túllépés → extra cost VAGY storage blokkol | Image optimization (resize), usage tracking |
| **C2.4** | **SendGrid/Mailgun free tier (100-300 email/month)** | Email limit → manual email fallback | Email only kritikus flow-knál (password reset, invite) |
| **C2.5** | **No paid tooling (Datadog, Sentry, etc.) P0** | Limited visibility → reactive debugging | Free alternatives (console.log, PostgreSQL logs), user feedback loop |

---

## C3: Legal & Compliance Constraints (Jogi és Compliance Korlátok)

| ID | Constraint | Consequence | Mitigation |
|----|-----------|-------------|------------|
| **C3.1** | **GDPR compliance minimál szint (P0: manual "right to be forgotten")** | Automatizált GDPR (P1) nélkül compliance risk | ToS: user data deletion request manual handling (7 napon belül) |
| **C3.2** | **No automated AI content moderation (P0)** | Inappropriate AI output risk → user felelősség | ToS: user felelős a content-ért, manual review opció |
| **C3.3** | **Meta Developer Policy compliance kötelező** | Policy violation → app suspend/ban | Policy monitoring, ToS alignment (AI-generated flag tárolva) |
| **C3.4** | **No third-party data sharing (pilot adatok nem kerülnek ki)** | Privacy breach risk → user trust loss | Explicit kommunikáció: "pilot data confidential, no sharing" |
| **C3.5** | **Magyar adatvédelmi törvény (InfoTV) alapszintű compliance** | Legal risk ha nem compliant | Minimal compliance: tájékoztatás, hozzájárulás, törlési jog |

---

## Out of Scope (Explicit - Mi NEM lesz P0-ban)

> **Fontos:** Ezek a feature-ök/funkciók **NEM részei a P0 MVP-nek**. P1-ben vizsgálhatók, ha a pilot sikeres.

### Feature Out of Scope (P0)

| Feature/Funkció | Miért OUT | Mikor jöhet (P1/P2) |
|-----------------|-----------|---------------------|
| **Instant publish** (azonnal publikál, nem schedule) | H1/H2/H3 validáláshoz scheduling elég | P1 - ha user igény erős |
| **Multi-user approval flow** (több socialos review-olja) | Pilot skála (1-2 socialos/ügynökség) → pseudo-approval elég | P1 - nagyobb team-ek esetén |
| **Analytics/Insights** (poszt performance, engagement metrics) | Nem core value prop, Meta Business Suite megteszi | P2 - native analytics integration |
| **Instagram Stories/Reels** (csak feed poszt P0) | Complexity magas, feed poszt validálja core workflow-t | P1 - ha feed workflow sikeres |
| **TikTok/LinkedIn/Twitter integráció** | Meta (FB/IG) elég P0 validáláshoz | P1/P2 - platform expansion |
| **AI image generation** (Nano Banana + Seedream) | Architecture dokumentum teljes implementációt tartalmaz, de prioritás P1 (sprint planning során döntés) | P1 - ha core AI copy sikeres |
| **AI video generation** | Complexity very high, out of scope pilot-hoz | P2+ - jövőbeli feature |
| **Team management** (role-based access, permissions) | Pilot: 1-2 user/ügynökség → admin/socialos elég | P1 - multi-user team-ek esetén |
| **White-label / agency branding** | Nem core value prop pilot-hoz | P2 - enterprise feature |
| **API access / webhooks** | Developer feature, nem pilot célcsoport | P2+ - developer ecosystem |

---

### Platform/Technology Out of Scope (P0)

| Platform/Tech | Miért OUT | Mikor jöhet (P1/P2) |
|---------------|-----------|---------------------|
| **Mobile app (iOS/Android native)** | Desktop-first, web app elég pilot-hoz | P2 - ha web adoption magas |
| **Mobile-optimized responsive design (full UX)** | Basic mobile support elég P0 (emergency access) | P1 - mobile usage data alapján |
| **CI/CD automation** (GitHub Actions, automated tests) | Manual testing elég pilot-hoz | P1 - production hardening |
| **Microservices architecture** | Monolit egyszerűbb, gyorsabb dev | P1 - ha scalability issue |
| **Redis caching** | PostgreSQL elég 8-10 user skálához | P1 - ha performance issue |
| **S3 file storage** | Cloudinary egyszerűbb, P0 elég | P1 - ha cost optimization szükséges |
| **Dual AI provider (OpenAI + Anthropic)** | 1 provider elég P0 validáláshoz | P1 - fallback/redundancy |
| **Advanced monitoring** (Datadog, New Relic, Sentry) | console.log + user feedback elég pilot-hoz | P1 - production monitoring |
| **Kubernetes / Docker containerization** | Render/Railway natívan futtat Node.js-t | P1 - infrastructure as code |
| **Multi-region deployment** | Single region (EU/US) elég pilot-hoz | P2 - global expansion |

---

### Business/Process Out of Scope (P0)

| Business Feature | Miért OUT | Mikor jöhet (P1/P2) |
|------------------|-----------|---------------------|
| **Pricing/billing implementation** | Pilot ingyenes (freemium validálás) | P1 - monetization phase |
| **Invoicing/payment processing** | Nincs fizető user P0-ban | P1 - Stripe integration |
| **Customer support ticketing system** | Slack/Discord elég pilot-hoz | P1 - customer support scaling |
| **Onboarding video/tutorial (automated)** | Manual onboarding elég 3-5 ügynökséghez | P1 - self-serve onboarding |
| **Marketing website (landing page, blog)** | Pilot: direkt outreach, nincs inbound | P1 - marketing/growth phase |
| **Email marketing automation** | Pilot: manual communication elég | P1 - user lifecycle emails |
| **User referral program** | Nincs elég user P0-ban referral-hoz | P2 - growth hacking |
| **SLA guarantees** (99.9% uptime, support SLA) | Pilot: best-effort elég | P1 - production SLA |

---

## Assumptions & Constraints Összefoglalás

**Critical Assumptions (ha ezek buknak → major pivot/stop):**
1. **A0.1:** 4-6 hét elég H1/H2/H3 validálásához
2. **A1.1:** Socialosok nyitottak AI-ra
3. **A1.3:** Brand Brain v1 elég jó AI output-hoz
4. **A2.1:** Meta Graph API stabil marad

**Hard Constraints (ezek nem változtathatók P0-ban):**
1. **C0.1:** 4-6 hetes timeline
2. **C0.2:** Solo dev (1 fő)
3. **C1.1:** Meta Graph API dependency
4. **C2.1:** API cost cap $100-200/hó

**Validation Strategy:**
- Minden assumption-höz explicit validálási mód a pilot alatt
- 2. hét végén interim check: melyik assumption sérül?
- 4. hét végén döntési pont: folytatás/iteráció/pivot/stop

**Out of Scope Philosophy:**
> „Ha nem validálja H1/H2/H3-at, akkor OUT of scope P0-ból."

**P0 → P1 Transition Criteria:**
- Critical assumptions validated (vagy mitigálva)
- H1/H2/H3 legalább részben sikeres
- ≥2-3 ügynökség "fizetnénk érte" jelzés
- Nincs active killer risk trigger (R0)

---

## User Stories & Use Cases

### Primary Actors (Ki használja a rendszert?)

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

### Product User Journeys (MVP)

Az alábbi journey-k leírják, **mit csinál a user a Creaitor rendszerben**. Ezek a termék funkcióinak specifikációi, nem kutatási protokollok.

**Megjegyzés a journey részletességéhez:**
- A flow-k egy lehetséges UX útvonalat mutatnak be, de nem "pixel-szintű" specifikációk
- Konkrét gombok neve, mikrokópia, pontos navigációs minta a design-spec-be tartozik
- Ha UX-kutatás során jobb flow derül ki, az elsőbbséget élvez a PRD-beli példához képest

---

#### Journey 1: Új Márka Onboarding + Brand Brain Setup

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

#### Journey 2: Heti Tartalomnaptár Generálása AI-val

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

#### Journey 3: Approval és Ütemezés (Teljes Workflow)

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

#### Journey 4: Multi-Brand Kezelés (Ügynökségi Perspektíva)

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

### Edge Cases & Error Scenarios

#### Edge Case 1: Brand Brain kitöltetlensége

**Scenario:** Socialos létrehoz egy márkát, de NEM tölti ki a Brand Brain-t (üres TOV, nincs példaposzt).

**Expected Behavior:**
- **P0:** Rendszer engedi generálni AI-t, de minőség gyenge (generic AI output, nem márkahű)
- **P1:** Warning jelenik meg: "Brand Brain üres - az AI output nem lesz márkahű. Töltsd ki!"

**Validálja:** Brand Brain fontosságát (ha nincs → rossz output)

---

#### Edge Case 2: Meta API hiba (token expire, rate limit)

**Scenario:** Scheduled poszt publikálásakor Meta API hibát ad (token lejárt VAGY rate limit).

**Expected Behavior:**
- **P0:** Poszt státusz: **Failed**, error message: "Meta API hiba: token lejárt. Csatold újra a profilt!"
- User kattint "Retry" → újra OAuth flow VAGY kivárja rate limit-et
- **P1:** Automatikus retry (3x), email notification ha végleg failed

**Success Criteria:**
- ✅ Error message világos (user érti, mit tegyen)
- ✅ Recovery lehetséges (retry gomb működik)

---

#### Edge Case 3: Több user egyidejű szerkesztése (Real-time conflict)

**Scenario:** Két socialos (Éva és Anna) ugyanazt a posztot szerkeszti egyszerre.

**Expected Behavior:**
- **P0:** Nincs real-time conflict resolution. Utolsó mentés nyer (last-write-wins).
- **P1:** Warning: "Anna is editing this post" + lock mechanizmus

**Mitigation (P0):**
- Kis pilot csapatban (1-3 user/ügynökség) ez ritka eset
- V1.5-ben lehet lock/conflict resolution

---

### What These User Stories Do NOT Cover (MVP Scope)

**NEM része az MVP-nek (de lehet v1.5+):**

- ❌ **TikTok/LinkedIn integration:** Journey-k csak FB/IG-ra fókuszálnak
- ❌ **Külső ügyfél approval:** Journey-kben nincs "ügyfél meghívása platformra"
- ❌ **Campaign management:** Posztok nincsenek kampányokba csoportosítva
- ❌ **A/B teszt:** Nincs 2 szövegvariáns tesztelése élőben
- ❌ **Haladó analitika:** Nincs "best time to post", engagement prediction
- ❌ **White-label:** Ügynökség nem tudja saját brandje alatt használni

---

## Pilot Measurement & Research Protocol

**Fontos:** Az alábbi szekció **NEM termék-specifikáció**, hanem **kutatási protokoll** a pilot validálásához. Ezek külső folyamatok (Google Sheet időmérés, survey-k, ROI kalkuláció), amelyek a pilot során történnek, de NEM részei a Creaitor termékének.

**Elválasztás indoka:**
- Product journey-k: Mi történik a Creaitor rendszerben? (termék funkciók)
- Research protocol: Hogyan mérjük a pilot sikerét? (kutatási módszertan)

---

### RP1: Időmegtakarítás Mérés (Time Savings Measurement)

**Cél:** Validálni a H2 hipotézist - a socialosok ténylegesen 20-40% időmegtakarítást érnek el a heti tartalomnaptár készítésében.

**Módszer:**

1. **Baseline mérés (Pilot 1. hét - Creaitor nélkül)**
   - Résztvevő socialosok kitöltenek egy Google Sheet táblázatot (naponta vagy heti összegzésként):
     - Hány perc: Brief / koncepció kitalálás
     - Hány perc: Szövegírás / szerkesztés
     - Hány perc: Képkeresés / feltöltés / asset keresés
     - Hány perc: Jóváhagyás / review (ha van)
     - Hány perc: Ütemezés külön eszközben (Meta Business Suite / Hootsuite)
   - **Példa baseline (6 poszt / hét):** 150-180 perc (2.5-3 óra átlag)

2. **Creaitor használat után (Pilot 4-6. hét)**
   - Ugyanaz a socialos, ugyanaz a márka
   - Kitölti ugyanazt a Google Sheet táblázatot:
     - Hány perc: Brand Brain setup (egyszeri, amortizálva)
     - Hány perc: AI Copy Studio (brief + generálás + szerkesztés)
     - Hány perc: Kép (AI Visual VAGY saját feltöltés)
     - Hány perc: Approval + scheduling (egy helyen)
   - **Példa Creaitorral (6 poszt / hét):** 90-110 perc (1.5-1.8 óra átlag)

3. **Időmegtakarítás számítása**
   - Baseline átlag: 165 perc
   - Creaitorral átlag: 100 perc
   - **Megtakarítás: 65 perc (39%)**

**Kutatási kockázatok és torzítások:**

- ⚠️ **Hawthorne-effektus:** Socialosok tudják, hogy mérnek - próbálnak gyorsabbak lenni
- ⚠️ **Self-report pontatlanság:** Emlékezetből becsülnek, nem stopperóra-pontosak
- ⚠️ **Workload variabilitás:** Baseline héten esetleg más típusú posztok voltak
- ⚠️ **Kis minta (N=5-10):** Nagy statisztikai zaj, outlier-ek eltorzítják az átlagot

**Mitigációs stratégia:**

- Kombináljuk self-report-tal ÉS konkrét 1-2 hetes napi időmérést (részletesebb tracking)
- Kérdezzünk kvalitatív magyarázatot: "Miért volt gyorsabb / lassabb?"
- Használjuk a medián-t is, ne csak átlagot (outlier-rezisztens)

**Kapcsolódik:** H2 (Workflow adoption), Success Criteria Primary Metrics (Időmegtakarítás)

---

### RP2: Márkahűség és Használhatósági Rating

**Cél:** Validálni a H1 hipotézist - Brand Brain v1 elég a 7-8/10-es márkahűség eléréséhez.

**Módszer:**

1. **In-app használhatósági rating (P0 termék-feature!)**
   - Minden AI-generált poszt mentésekor/publikálásakor kötelező jelölés:
     - "Rendben, kisebb módosítással" (használható)
     - "Nagy átdolgozás kellett" (részben használható)
     - "Nem használható, újat írtam" (nem használható)
   - Backend logging: Tárolás poszt-szinten

2. **Havi márkahűség rating survey**
   - 1-2 kérdés havi alkalommal (in-app vagy email):
     - "Mennyire érzed márkahűnek a Creaitor által generált posztokat?" (1-10 skála)
     - "Volt-e olyan poszt, amit NEM mertél kitenni, mert nem volt elég márkahű?" (igen/nem + példa)

3. **Kvalitatív kiegészítés**
   - Pilot végén interjú: "Melyek voltak a legjobb / legrosszabb posztok? Miért?"
   - Márka-specifikus pattern-ek: melyik iparágban működik jobban/rosszabbul a Brand Brain v1?

**Kapcsolódik:** H1 (Brand Brain v1 hatékonysága), Success Criteria Primary Metrics (Márkahűség rating, Használható posztok aránya)

---

### RP3: Workflow Adoption & NPS Survey

**Cél:** Mérni a tényleges adoption-t (H2) és ajánlási hajlandóságot (viralitás potenciál).

**Módszer:**

1. **Havi rövid survey (5 kérdés)**
   - "Mennyivel gyorsabb a heti naptár készítése Creaitorral?" (% vagy idő)
   - "Mennyire érzed márkahűnek a generált posztokat?" (1-10)
   - "Hol kezded a heti tartalomnaptár munkát?" (Creaitor / ChatGPT / Google Docs / Meta stb.)
   - "Mi a legjobb a Creaitorban?" (nyílt szöveg)
   - "Mi a legnagyobb fájó pont?" (nyílt szöveg)
   - **NPS kérdés:** "Ajánlanád kollégádnak / másik ügynökségnek?" (0-10 skála)

2. **Usage tracking (backend P0 feature)**
   - Session tracking (login, page views, time spent)
   - AI Copy Studio usage count (generálások száma)
   - Creaitorban generált tartalom aránya (hány poszt készült Creaitorban vs. kívül)

**Kapcsolódik:** H2 (Workflow adoption), Success Criteria Primary Metrics (WAU, Creaitorban generált tartalom aránya)

---

### RP4: Pilot-to-Paid Konverzió & Pricing Sensitivity

**Cél:** Validálni a H3 hipotézist - Magyar/CEE piacon van fizetési hajlandóság agency-first AI social OS-ért.

**Módszer:**

1. **Pilot tapasztalat összegyűjtése (Owner interjú)**
   - Pilot vége (4-6 hét után) beszélgetés az ügynökségi owner-rel:
     - Mennyit spóroltak a socialosok időben?
     - Beépült-e a workflow-ba (go-to tool)?
     - Van-e fájó pont (UX, AI minőség)?
   - Példa válaszok:
     - "35% időmegtakarítás, használják, kis UX friction van a calendar-ben"
     - "25% időmegtakarítás, jó az AI, de hiányzik a TikTok"

2. **ROI kalkuláció (owner-rel együtt végigvezetni)**
   - **Költség:** 150 EUR/hó (pilot pricing)
   - **Időmegtakarítás:** X socialos × Y% × Z óra/hó (social work) = Spórolt órák/hó
   - **Érték:** Spórolt órák × 10-20 EUR/óra (internal cost) = EUR/hó
   - **ROI:** Érték - Költség = + vagy - EUR/hó
   - Példa: 2 socialos × 30% × 20 óra = 12 óra → 12 × 15 EUR = 180 EUR érték - 150 EUR költség = +30 EUR/hó

3. **Fizetési hajlandóság & Pricing sensitivity**
   - Survey kérdés (owner-nek): "Mennyit fizetnél max havonta ezért az eszközért?"
     - 50-100 EUR: túl drága
     - 100-150 EUR: elfogadható
     - 150-200 EUR: fair
     - 200+ EUR: cheap (underpriced)
   - Kvalitatív: "Mi az, ami miatt fizetnél érte?" / "Mi az, ami miatt NEM fizetnél?"

4. **Konverziós döntés**
   - **Ha ROI pozitív + socialosok elégedettek:** Owner fizető lesz (sikeres konverzió)
   - **Ha ROI negatív VAGY socialosok nem használják:** Owner kilép (sikertelen konverzió)
   - **Target:** 40-60% pilot-to-paid konverzió (50%+ sikeres)

**Kapcsolódik:** H3 (Fizetési hajlandóság Magyar/CEE piacon), Success Criteria Secondary Metrics (Fizető ügynökségek, MRR, ARPU)

---

### Research Protocol összefoglalás

| Kutatási protokoll | Mit mér? | Módszer | Kapcsolódó hipotézis |
|-------------------|----------|---------|----------------------|
| RP1: Időmegtakarítás mérés | Ténylegesen spórolnak-e 20-40% időt? | Google Sheet időmérés (baseline vs. Creaitorral) | H2 |
| RP2: Márkahűség rating | Brand Brain v1 elég a 7-8/10-es ratinghez? | In-app rating + havi survey | H1 |
| RP3: Workflow adoption & NPS | Beépül-e a workflow-ba? Ajánlanák-e? | Havi survey + usage tracking | H2 |
| RP4: Pilot-to-paid & pricing | Van fizetési hajlandóság? Mennyi az optimális ár? | Owner interjú + ROI kalkuláció + pricing survey | H3 |

**Fontos:** Ezek a protokollok **párhuzamosan futnak** a pilot során, nem szekvenciálisan. A socialosok használják a terméket (Product Journeys 1-4), miközben mi mérjük őket (Research Protocols 1-4).

---

## Functional Requirements (Részletes)

**Cél:** Ez a szekció részletesen leírja a Creaitor MVP funkcióit, **funkcionális szinten** - **mit csináljon a rendszer**, nem **hogyan implementálja** (az a Tech Spec-be tartozik).

**Struktúra:**
- **FR0:** Cross-Feature Assumptions & Rules (globális feltételek)
- **FR1-9:** Feature-enkénti követelmények

**Kulcsfontosságú:** Ez a rész NEM tartalmaz:
- Konkrét API endpoint URL-eket, paraméter-listákat
- SQL query-ket, database schema részleteket (az adatmodell summary kivételével)
- Konkrét technológiai választásokat (queue: Sidekiq vs. Bull, stb.)
- Implementációs algoritmusokat

Ezek a **Technical Specification** dokumentumba tartoznak.

---

## FR0: Cross-Feature Assumptions & Rules

> **Globális feltételek és döntési pontok**, amik több feature-re is hatással vannak. Ez elkerüli az inkonzisztenciákat a részletes FR-ek között.

---

### FR0.1: Brand Brain Baseline Szabályok (P0)

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

### FR0.2: P0 Scope Döntések (Feature Prioritás Tisztázás)

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

### FR0.3: Usability Rating Kezelés (P0)

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

### FR0.4: Concurrency & Multi-User Szabályok (P0)

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

### FR0.5: Meta Publishing Szabályok (P0)

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

## FR1: Multi-Tenant Alaprendszer

### FR1.1: Ügynökség Regisztráció és Profil

**Funkció:** Ügynökség (Agency) létrehozása és user account setup.

**Input:**
- Email cím (unique)
- Jelszó (min. 8 karakter)
- Ügynökség név (kötelező, max. 100 karakter)
- Ügynökség leírás (opcionális, max. 500 karakter)

**Output:**
- Ügynökség létrehozva (Agency ID generálva)
- User account létrehozva (Admin role, owner státusz)
- User session (login state)

**Validációs szabályok (P0):**
- Email formátum: alapvető regex (pl. `.+@.+\..+`)
- Email unique constraint (duplikált email → error)
- Jelszó minimum hossz: 8 karakter
- Ügynökség név kötelező

**P1 - Bővített validáció:**
- Jelszó erősség (kis/nagy betű, szám, speciális karakter)
- Email domain blacklist (disposable email kiszűrése)
- Ügynökség további mezők (cím, VAT szám, billing info)

---

### FR1.2: User Management (User Meghívás és Jogosultságok)

**Funkció:** Új user meghívása az ügynökségbe (team collaboration).

**User Meghívás Flow:**

**Input:**
- Email cím (meghívandó user)
- Role (opcionális - P0-ban minden user `socialos`)

**Output:**
- Meghívó email elküldve
- Pending user rekord létrehozva (státusz: `pending`)
- Invite link generálva (unique token, 7 nap lejárat)

**Invite Link Aktiválás:**

**Input:**
- Invite token (URL paraméter)
- Jelszó (user választja)

**Output:**
- User aktiválva (státusz: `pending` → `active`)
- User hozzáadva az ügynökséghez
- User session (login state)

**Validációs szabályok (P0):**
- Invite link 7 napig érvényes (timestamp check)
- Egy user csak 1 ügynökséghez tartozhat (P0 - single-tenant user modell)
- Ha link lejárt → error: „Meghívó link lejárt. Kérj új meghívót!"

**Jogosultságok (P0 - egyszerű):**
- **Admin (owner):** Minden funkció
- **Socialos (meghívott user):** Minden funkció (P0-ban nincs megkülönböztetés)

**P0 megjegyzés:** MVP-ben nincs finomhangolt jogosultság-kezelés. Minden user ugyanabban az ügynökségben mindent lát és csinálhat. Ez elég 5-10 pilot ügynökséghez (kis csapatok, magas bizalmi szint).

**P1 - Fine-grained permissions:**
- Szerepkörök: Admin, Editor, Viewer
- Brand-specifikus jogosultságok (user csak egyes márkákat láthat/szerkeszthet)
- Approval chain szintek (ki approve-olhat, ki publish-olhat)

---

### FR1.3: Márka (Brand) Management

**Funkció:** Brand létrehozása, Meta (FB/IG) profil csatolása, Brand adatok kezelése.

**Brand Létrehozás:**

**Input:**
- Márka név (kötelező, max. 100 karakter)
- Márka leírás (opcionális, max. 500 karakter)

**Output:**
- Brand létrehozva (Brand ID generálva)
- Brand Brain üres JSON inicializálva (default empty)
- Brand hozzárendelve az ügynökséghez (agency_id FK)

**Meta OAuth Flow (FB Page / IG Account csatolás):**

**Funkció:** Facebook Page és/vagy Instagram Business Account csatolása a márkához.

**Input:**
- Brand ID
- Meta OAuth authorization code (OAuth flow után)

**Output:**
- FB Page ID, FB Page név, FB access token tárolva (encrypted)
- IG Account ID, IG username, IG access token tárolva (encrypted)
- Token expiry timestamp tárolva (60 nap múlva)

**Üzleti szabályok (P0):**
- Márka publisholhat, ha **legalább 1 platform csatolva** (FB Page VAGY IG Account)
- Ha mindkettő csatolva → user választhat poszt létrehozáskor, melyik platformra megy
- Token lejárat: Ha Meta API 401/403 → user újra OAuth (Re-connect gomb)
- Márka archiválás: Logikai törlés (archived_at timestamp set), adat megmarad (nem hard delete)

**P1 - Bővített funkciók:**
- Meta token auto-refresh (long-lived token management)
- Márka státuszok (Active / Paused / Archived)
- Márka csoportosítás / tagging (pl. "Horeca", "E-commerce", "B2B")

---

## FR2: Brand Brain v1 - Márka Tudásbázis

**Cél:** Strukturált márka-specifikus kontextus tárolása, amit az AI Copy Studio használ a generáláshoz.

### FR2.1: Brand Brain Adatmodell

**Brand Brain struktúra (JSON):**

```json
{
  "tone_of_voice": {
    "description": "string" // Max 1000 karakter (ajánlott: 200-500)
  },
  "key_messages": [
    "string" // Max 10 darab, minden max 200 karakter
  ],
  "reference_posts": [
    {
      "text": "string", // Max 5000 karakter
      "source": "manual_input",
      "created_at": "timestamp"
    }
  ],
  "visual_direction": {
    "description": "string" // Max 1000 karakter (ajánlott: 100-300)
  }
}
```

**Validációs szabályok (P0):**
- TOV description: Max 1000 karakter
- Key Messages: Max 10 darab, minden max 200 karakter
- Reference Posts: Max 5 darab, minden max 5000 karakter
- Visual Direction: Max 1000 karakter

**P0 megjegyzés:** **Nincs kötelező mező** (lásd FR0.1). User menthet üres Brand Brain-t → következménye gyenge AI output. Ez szándékos (H1 validálás).

**Strongly recommended (P0 - nem kötelező, de UI jelzi):**
- Min. 1 Key Message
- Min. 1 Reference Post
- TOV description (min. 100 karakter)

**P1 - Bővített validáció:**
- Kötelező mezők: TOV + min. 1 Key Message
- Warning, ha Brand Brain "túl vékony" (TOV < 100 karakter)
- Brand voice scoring (AI elemzi konzisztenciát)

---

### FR2.2: Brand Brain CRUD Műveletek

| Művelet | Input | Output | Üzleti szabály |
|---------|-------|--------|----------------|
| **Create** | Brand ID | Brand Brain üres JSON létrehozva (default) | Brand létrehozásakor automatikus |
| **Read** | Brand ID | Brand Brain JSON | User csak saját ügynökség márkáit látja (agency_id filter) |
| **Update** | Brand ID + módosított Brand Brain JSON | Brand Brain frissítve | Nincs verzió history (P1: verziókezelés, rollback) |
| **Delete** | N/A | N/A | Brand Brain NEM törölhető, csak üríthető (update empty JSON-nel) |

**Státuszgép:** Nincs (Brand Brain nincs jóváhagyási workflow, user szabadon szerkeszti).

---

## FR3: AI Copy Studio - Szöveggenerálás

**Cél:** AI-alapú poszt szöveg generálás Brand Brain kontextussal.

### FR3.1: Poszt Generálás Flow

**Input:**
- Brand ID (kötelező)
- Brief (poszt téma/koncepció, min. 10 karakter, max. 1000 karakter)
- Platform (facebook VAGY instagram, kötelező)
- Content type (opcionális - P1 feature)

**Output:**
- AI-generált szöveg (max. 10,000 karakter - FB API limit)
- Character count
- Generation metadata (model név, tokens used, generation time ms, timestamp)

**AI Prompt Construction:**

**Funkció:** A rendszer a Brand Brain adatok alapján dinamikusan építi fel az AI promptot.

**Prompt struktúra (ha Brand Brain TELJES):**
```
System: "Te egy tapasztalt social media copywriter vagy."

User prompt:
"Írj egy {platform} posztot a következő márka számára:

**Márka Tone of Voice:**
{brand_brain.tone_of_voice.description}

**Márka Key Messages:**
- {brand_brain.key_messages[0]}
- {brand_brain.key_messages[1]}
...

**Példaposztok (referencia):**
{brand_brain.reference_posts[0].text}
{brand_brain.reference_posts[1].text}
...

**Poszt téma / brief:**
{brief}

**Platform:** {platform} (Facebook: max 500 karakter, Instagram: max 300 karakter ajánlott)

Generálj 1 posztot, ami tükrözi a márka hangját. Ne használj hashtageket."
```

**Prompt fallback (ha Brand Brain ÜRES vagy HIÁNYOS) - lásd FR0.1:**
- Ha `tone_of_voice` üres → „Márka Tone of Voice:" blokk **kimarad** a promptból
- Ha `key_messages.length == 0` → „Márka Key Messages:" blokk **kimarad**
- Ha `reference_posts.length == 0` → „Példaposztok (referencia):" blokk **kimarad**
- Ha **minden üres** → prompt egyszerűsített fallback:
  ```
  "Írj egy professzionális, de barátságos {platform} posztot a következő témában:

  {brief}

  A poszt legyen érdekes, engaging, és tükrözze a modern social media best practice-eket."
  ```

**Üzleti szabályok (P0):**
- Brief kötelező (min. 10 karakter)
- Platform választás kötelező (facebook VAGY instagram)
- AI timeout: 30 másodperc (ha tovább tart → error, retry lehetőség)
- Ha Brand Brain üres → AI generálás megtörténik (fallback prompt), + warning log (analytics)

**P1 - Bővített funkciók:**
- Multi-variáns generálás (2-3 szöveg egyszerre)
- Content type automatikus javaslat (AI elemzi a brief-et)
- Hashtag automatikus javaslat
- Regenerálás gomb (új variáns ugyanazzal a brief-fel)
- AI modell választás (GPT-4o, Claude Sonnet, stb.)

---

### FR3.2: Poszt Szerkesztés és Mentés

**Inline szerkesztés:**
- User szerkesztheti az AI-generált szöveget (contenteditable div vagy textarea)
- Character count real-time frissítés (P1 - P0-ban nincs live count)
- Mentés draft-ba gomb

**Használhatósági Rating (P0 - lásd FR0.3):**

**Kötelező jelölés,** ha `ai_generated = true` (AI-generált poszt).

Rating opciók:
- `usable` - "Rendben, kisebb módosítással használható"
- `heavy_edit` - "Nagy átdolgozás kellett"
- `not_usable` - "Nem használható, újat írtam"

**UI elhelyezés:**
- Inline a mentés UI-jában (nem külön modal)
- 3 gomb választás (rádió button vagy button group)
- Mentés gomb disable, amíg rating nincs választva (VAGY default: `usable`)

**Poszt Mentés:**

**Input:**
- Post ID (ha szerkesztés) vagy új (ha új poszt)
- Brand ID
- Text (szerkesztett szöveg)
- Platform (facebook / instagram)
- AI generated (boolean)
- Usability rating (ha ai_generated = true, kötelező)
- Image URL (opcionális - ha van feltöltött kép)
- Scheduled at (opcionális - ha user már választott időpontot)

**Output:**
- Post mentve (Draft státusz)
- Post ID visszaadva

**Validációs szabályok (P0):**
- Poszt szöveg max. 10,000 karakter
- Usability rating kötelező, ha ai_generated = true
- Platform kötelező

---

## FR4: Image Management (Kép kezelés)

### FR4.1: Saját Kép Feltöltés

**Funkció:** User feltölt egy képet, rendszer eltárolja és URL-t ad vissza.

**Input:**
- Kép fájl (JPEG, PNG formátum, max. 10MB méret)
- Post ID (melyik poszthoz tartozik)

**Output:**
- Image URL (tárolva cloud storage-ben)
- Automatikus optimalizálás: resize 1200×630 (FB) vagy 1080×1080 (IG) aspect ratio-ra

**Üzleti szabályok (P0):**
- Max. 1 kép / poszt (P1: carousel support - multi-image)
- Támogatott formátumok: JPEG, PNG (P1: GIF, WebP)
- Max. fájlméret: 10MB
- Kép törlés: Ha poszt törlődik, kép is törlődik (cascade delete)

**Validáció:**
- Fájlméret check (> 10MB → error: "Kép túl nagy, max. 10MB")
- Formátum check (nem JPEG/PNG → error: "Csak JPEG és PNG formátum támogatott")

**P1 - AI Visual Studio:**
- Képgenerálás AI-val (Nano Banana - Gemini 2.5 Flash Image + Seedream 4.0 dual provider)
- **Architecture dokumentum:** ImageAIService intelligent routing (character consistency → Nano Banana, 4K → Seedream)
- Brand Visual Direction kontextussal
- 2-3 képvariáns generálás

---

## FR5: Content Calendar - Tartalomnaptár

### FR5.1: Naptár Nézetek

**Heti nézet (P0):**

**Funkció:** Egy hét (Mon-Sun) poszt-slotjainak megjelenítése, brand-szinten.

**Input:**
- Brand ID
- Week start date (default: current week Monday)

**Output:**
- 7 nap lista (Mon-Sun)
- Minden napra poszt slotok (scheduled posts, draft posts)
- Poszt preview (text preview, platform, status, scheduled_at time)

**Üzleti szabályok:**
- Default: current week (hétfő-vasárnap)
- User választhat előző/következő hetet (prev/next week navigation)
- P0: csak 1 brand nézet egyszerre (nem multi-brand view)

**P1 - Havi nézet:**
- 30-31 nap grid nézet
- Összesített poszt count naponta

---

### FR5.2: Poszt Slotok és Státuszok

**Poszt státuszgép (P0):**

```
Draft → Approved → Scheduled → Published
  ↓                    ↓
Failed ←──────────────┘
  ↓
Draft (retry után)
```

| Státusz | Jelentés | Átmenetek | Ki indíthatja? |
|---------|----------|-----------|----------------|
| `draft` | Szerkesztés alatt | → `approved` (Approve gomb) | User |
| `approved` | Jóváhagyva, ütemezésre kész | → `scheduled` (Schedule gomb + időpont választás) | User |
| `scheduled` | Ütemezve, várja a publikálást | → `published` (auto, scheduled_at időpontban) / → `failed` (API hiba) | System |
| `published` | Sikeresen publikálva | (végállapot) | System |
| `failed` | Publikálás sikertelen | → `draft` (Retry gomb) / → `scheduled` (Retry + reschedule) | User |

**P0 megjegyzés:** Nincs `review` státusz (multi-user approval P1). P0-ban `draft` → `approved` ugyanaz a user csinálja (pseudo-approval - lásd FR0.2).

**P1 - Multi-user approval:**
```
Draft → Review → Approved → Scheduled → Published
  ↑       ↓
  └──── Rejected
```

---

### FR5.3: Scheduling Interface (Időpont Választás)

**P0 - Két opció (UX design dönt, melyiket építjük - lásd FR0.2):**

**Opció A: Drag & Drop**
- User húzza a draft posztot a naptár egy slotjára (nap + idő)
- Poszt automatikusan `scheduled` státuszba kerül
- Scheduled_at timestamp beállítódik

**Opció B: Manual Datetime Picker**
- User kattint "Schedule" gomb
- Datetime picker popup: dátum + időpont választás
- Poszt `scheduled` státuszba kerül

**Mindkettő validálja H2-t (workflow adoption).** UX design során eldöntjük, melyik egyszerűbb.

**P1:** Mindkettő támogatása (drag&drop + manuális override)

---

## FR6: Approval Workflow

### FR6.1: Pseudo-Approval (P0)

**Funkció:** Egyszerű self-approval flow, workflow átmenet tesztelése céljából.

**Flow:**
1. User létrehoz/szerkeszt posztot → `draft`
2. User kattint "Approve" gomb → `approved`
3. User választ scheduled_at időpontot (datetime picker / drag&drop) → `scheduled`

**Üzleti szabály (P0):**
- **Nincs ellenőrzés**, hogy ki approve-olja (ugyanaz a user is teheti)
- Cél: Workflow átmenet tesztelése (draft → approved → scheduled), **nem robusztus approval chain**
- Pilot user workflow gyakorlása (megszokják a státusz átmeneteket)

**P1 - Multi-user approval:**
- User A (socialos): Draft → "Send to review" → `review`
- User B (account manager): Review → "Approve" / "Reject" → `approved` / `draft`
- Comment thread (feedback poszt-szinten)
- Notification (in-app + email)

---

## FR7: Publishing & Scheduling

### FR7.1: Meta Platform Publishing (P0)

**Funkció:** Facebook Page és/vagy Instagram Business Account-ra való publikálás Meta Graph API-n keresztül.

**Publishing Requirements:**
- Márka FB Page ID és/vagy IG Account ID csatolva (lásd FR1.3)
- Poszt státusz `scheduled` (nem `draft` vagy `approved`)
- Scheduled_at időpont múltbeli **VAGY** current (ha azonnali publish - de P0-ban nincs instant publish, lásd FR0.2)

**FB Page Publishing:**

**Input:**
- Post ID
- FB Page ID (Brand-ből)
- FB Access Token (encrypted, Brand-ből)
- Message (poszt szöveg)
- Image URL (opcionális)
- Scheduled publish time (UNIX timestamp - P0: jövőbeli időpont)

**Output:**
- FB Post ID (Meta API response)
- Permalink URL
- Published at timestamp

**Error Handling:**
- Token expire (401/403) → `failed` státusz, error message: "Token lejárt"
- Rate limit (429) → `failed` státusz, error message: "Túl sok kérés"
- Invalid content (Meta policy violation) → `failed` státusz, error message: "Tartalom policy violation"

**IG Account Publishing:**

**Input:**
- Post ID
- IG Account ID (Brand-ből)
- IG Access Token (encrypted, Brand-ből)
- Caption (poszt szöveg)
- Image URL (**kötelező** IG-re)

**Output:**
- IG Media ID (Meta API response)
- Permalink URL
- Published at timestamp

**Error Handling:** (ugyanaz, mint FB)

**P0 megjegyzés:** Meta API **rate limit: 200 calls / óra** (app-level). Ha rate limit → manual retry (lásd FR0.5).

---

### FR7.2: Scheduling Mechanizmus (P0)

**Funkció:** Jövőbeli időpontban automatikus publikálás.

**P0 - Manual Scheduling (lásd FR0.2):**
- User választ dátum/időpontot (datetime picker / drag&drop)
- Poszt státusz `draft` → `approved` → `scheduled`
- Scheduled_at timestamp tárolva

**Automatikus Publishing:**
- Rendszer **periodikusan ellenőrzi** (pl. 5 percenként), hogy van-e `scheduled` státuszú poszt, ahol `scheduled_at <= current time`
- Ha igen → Meta API hívás (FB/IG publish)
- Siker → státusz `scheduled` → `published`, published_at timestamp set, fb_post_id/ig_media_id tárolva
- Hiba → státusz `scheduled` → `failed`, error_message tárolva

**P0 Retry Logic (manual):**
- Ha `failed` → user kattint "Retry" gomb
- User választhat:
  - **Retry same time:** Poszt újra `scheduled`, scheduled_at változatlan
  - **Reschedule:** Poszt újra `scheduled`, user új időpontot választ

**P1 - Background Job Queue:**
- Queue system (tech-agnostic: lehet Sidekiq, BullMQ, stb.)
- Automatikus retry (3x, exponential backoff)
- Job monitoring dashboard

---

### FR7.3: Publikálás Eredménye (P0)

**Sikeres publikálás:**

**Output:**
- Státusz: `published`
- Published_at: timestamp
- FB_post_id / IG_media_id: Meta API response ID
- Permalink: public URL

**User feedback:** "Poszt sikeresen publikálva! [Permalink megtekintése]"

**Sikertelen publikálás:**

**Output:**
- Státusz: `failed`
- Error_code: Meta API error code (pl. "OAuthException", "RateLimitError")
- Error_message: user-friendly üzenet (pl. "Token lejárt. Csatold újra a profilt!")
- Failed_at: timestamp

**User feedback:** "Publikálás sikertelen: {error_message}. [Retry gomb]"

---

## FR8: Instrumentation & Usage Tracking

### FR8.1: Backend Event Logging (P0)

**Cél:** Backend event-ek naplózása analytics és hipotézis-validálás céljából.

**Tracked Events:**

| Event | Paraméterek | Cél |
|-------|-------------|-----|
| `user_login` | user_id, timestamp | Session tracking |
| `page_view` | user_id, page_name, timestamp | Usage pattern (melyik oldalt használják) |
| `brand_created` | user_id, brand_id, timestamp | Adoption metrics |
| `ai_generation` | user_id, brand_id, post_id, generation_time_ms, timestamp | AI usage count + performance |
| `post_saved` | user_id, brand_id, post_id, status, usability_rating, timestamp | Content creation metrics |
| `post_published` | user_id, brand_id, post_id, platform, timestamp | Publishing metrics |
| `post_failed` | user_id, brand_id, post_id, error_code, timestamp | Error tracking |

**Adattárolás:**
- Events tárolása (relational DB vagy analytics DB - tech-agnostic)
- Retention: 12 hónap (pilot után döntés)

**P0 megjegyzés:** Backend-only logging, nincs user-facing dashboard (P1).

**P1 - Real-time dashboard:**
- Socialos-facing insights (hány poszt/hét, AI usage trend, stb.)
- Grafikonok, trend vizualizációk

---

### FR8.2: Használhatósági Rating Aggregáció (P0)

**Cél:** AI output minőség aggregálása (H1 validálás).

**Aggregáció:**
- Brand-szinten összesítés: hány `usable`, `heavy_edit`, `not_usable` rating
- Pilot-szinten összesítés: összes brand átlaga

**Output (P0 - admin-only, backend query vagy CSV export):**

| Brand | Total AI Posts | Usable % | Heavy Edit % | Not Usable % |
|-------|----------------|----------|--------------|--------------|
| Kis Kávézó | 24 | 70% (16) | 25% (6) | 5% (1) |
| Fitness XY | 18 | 60% (11) | 30% (5) | 10% (2) |

**H1 Validation:**
- **Success:** 60-70% `usable` rating
- **Acceptable:** 20-30% `heavy_edit`
- **Fail:** > 20% `not_usable`

**P1:** Szép UI socialosoknak, brand-level insights, real-time trend chart.

---

## FR9: Data Model Summary (P0 Core Entities)

**Entitások és kapcsolatok:**

```
Agency (Ügynökség)
  ├─ id: UUID
  ├─ name: String
  ├─ owner_email: String
  └─ created_at: Timestamp

User
  ├─ id: UUID
  ├─ agency_id: UUID (FK → Agency)
  ├─ email: String (unique)
  ├─ role: String (P1: enum - admin, socialos)
  └─ created_at: Timestamp

Brand
  ├─ id: UUID
  ├─ agency_id: UUID (FK → Agency)
  ├─ name: String
  ├─ fb_page_id: String (nullable)
  ├─ ig_account_id: String (nullable)
  ├─ access_token_encrypted: String (nullable)
  ├─ brand_brain: JSON
  ├─ archived_at: Timestamp (nullable)
  └─ created_at: Timestamp

Post
  ├─ id: UUID
  ├─ brand_id: UUID (FK → Brand)
  ├─ user_id: UUID (FK → User)
  ├─ text: Text
  ├─ platform: String (facebook / instagram)
  ├─ status: String (draft / approved / scheduled / published / failed)
  ├─ ai_generated: Boolean
  ├─ usability_rating: String (usable / heavy_edit / not_usable, nullable)
  ├─ image_url: String (nullable)
  ├─ scheduled_at: Timestamp (nullable)
  ├─ published_at: Timestamp (nullable)
  ├─ fb_post_id: String (nullable)
  ├─ ig_media_id: String (nullable)
  ├─ error_message: String (nullable)
  └─ created_at: Timestamp

Event (Analytics)
  ├─ id: UUID
  ├─ user_id: UUID (FK → User)
  ├─ event_type: String
  ├─ event_data: JSON
  └─ timestamp: Timestamp
```

**P0 megjegyzés:** Nincs `Comment`, `Approval`, `Campaign`, `Notification` entitás (ezek P1).

**Részletes schema (field típusok, constraints, index-ek)** → Tech Spec dokumentumba tartozik.

---

## Functional Requirements Összefoglalás

| Feature Area | P0 Core Funkciók | OUT of scope P0 (P1-be megy) |
|--------------|------------------|------------------------------|
| **Multi-Tenant** | Ügynökség reg, user meghívás, márka CRUD, egyszerű jogosultságok (minden user = socialos) | Fine-grained permissions, szerepkörök, audit log |
| **Brand Brain** | TOV, Key Messages, Reference Posts, Visual Direction (JSON, nem kötelező mezők) | Kötelező mezők validáció, brand voice scoring, AI-assisted setup |
| **AI Copy Studio** | Brief input, 1 variáns generálás, inline szerkesztés, **kötelező usability rating** (P0!) | Multi-variáns, hashtag javaslat, regenerálás, model választás |
| **Image** | Saját kép feltöltés, auto resize (1200×630 vagy 1080×1080) | AI Visual Studio (képgenerálás), carousel support |
| **Calendar** | Heti nézet (Mon-Sun), poszt slotok, státuszok | Havi nézet, drag&drop ÉS manual picker (P0: válasszunk egyet) |
| **Approval** | Pseudo-approval (self-approval, workflow testing) | Multi-user review, comment thread, notifications |
| **Publishing** | **Manual Scheduling** (jövőbeli időpont), Meta API, manual retry | **Instant Publish**, background job queue, auto retry, job monitoring |
| **Instrumentation** | Backend event logging, usability rating aggregáció (admin-only CSV) | Socialos-facing dashboard, real-time vizualizációk |

**Kritikus P0 Döntések (FR0.2 alapján):**
- ✅ **Scheduling P0, Instant Publish OUT**
- ✅ **Usability Rating kötelező P0**
- ✅ **Pseudo-approval (self) P0, Multi-user review OUT**
- ✅ **Heti nézet P0, Havi nézet OUT**
- ✅ **Real-time collaboration OUT, Last-write-wins P0**

---
## Non-Functional Requirements (NFR)

> **NFR filozófia (P0):** "Elég jó" egy 5-10 ügynökséges, 4-6 hetes pilothoz - **nem** production-ready milliós skálára. Hipotézis-validálás a cél, de **alapvető megbízhatóság és biztonság nélkülözhetetlen**.

**NFR struktúra:** Minden metrikánál **Minimum / Target / Stretch** logika (ugyanaz, mint a sikerkritériumoknál).

---

## NFR0: Pilot Baseline & Scale Assumptions

> **Konzisztens skála-definíció** a sikerkritériumokkal és FR-ekkel összhangban.

### NFR0.1: Pilot Célzott Terhelés (4-6 hetes pilot)

**Ügynökség szám (target):**
- **Minimum (continue threshold):** 5 aktív ügynökség
- **Target (sikeres pilot):** 8-10 aktív ügynökség
- **Stretch:** 12+ ügynökség

**Márka / ügynökség (target):**
- **Minimum:** 3 márka / ügynökség
- **Target:** 5+ márka / ügynökség
- **Stretch:** 8+ márka / ügynökség

**Összes user (target):**
- **Minimum:** 10-15 aktív user (5 ügynökség × 2-3 user)
- **Target:** 20-30 aktív user (8-10 ügynökség × 2-3 user)
- **Stretch:** 40+ user (12 ügynökség × 3-4 user)

**Összes márka (target):**
- **Minimum:** 15-25 márka (5 ügynökség × 3-5 márka)
- **Target:** 40-50 márka (8-10 ügynökség × 5 márka)
- **Stretch:** 80+ márka (12 ügynökség × 8 márka)

**Összes poszt (4-6 hetes pilot):**
- **Minimum:** 500-800 poszt (5 ügynökség × 3 márka × 6 poszt/hét × 4-6 hét)
- **Target:** 1500-2000 poszt (8-10 ügynökség × 5 márka × 6 poszt/hét × 4-6 hét)
- **Stretch:** 3000+ poszt (12 ügynökség × 8 márka × 6 poszt/hét × 6 hét)

**Miért fontos ez:**
- A sikerkritériumokban 8-10 ügynökség a target → az infra-követelményeknek ezt kell biztonsággal kiszolgálni
- Ha csak 1-3 ügynökségre tervezünk → alultesztelt PMF, skálázási problémák később

---

### NFR0.2: Multi-Tenant Architektúra Tisztázás

**Logikailag multi-tenant:**
- ✅ Adatmodell: Agency → User → Brand → Post (lásd FR9)
- ✅ Agency-level isolation (user csak saját agency adatait látja)
- ✅ Minden query agency_id filter-rel

**Fizikailag single-server deployment (P0):**
- ✅ Egyetlen szerver instance (Render / Railway managed deployment)
- ✅ Egyetlen PostgreSQL instance (Render managed DB)
- ❌ Nincs load balancer, nincs multi-region, nincs horizontal scaling

**Miért ez az architektúra:**
- Logikai multi-tenancy → validálja a termékkoncepciót (agency-first modell)
- Fizikai single-server → gyors MVP fejlesztés, alacsony költség pilot alatt
- P1 skálázás (100+ user): horizontal scaling, read replicas, stb.

---

### NFR0.3: Security & Privacy Baseline (Nem Alkudozható - P0)

> **Alapvető biztonsági minimum**, amit **pilot alatt sem engedhetünk el**. Ezek nélkül jogi és bizalmi kockázat van.

**Kötelező P0 (pilot alatt is):**
- ✅ **HTTPS mindenhol** (SSL/TLS certificate: Let's Encrypt)
- ✅ **Meta access token encryption** (database column-level encryption, AES-256)
- ✅ **Jelszó hashing** (bcrypt, cost 12)
- ✅ **Session security** (HTTP-only cookie, secure flag, 7 nap expiry)
- ✅ **Manuális "right to be forgotten" folyamat** (ha user kéri → 7 napon belül teljes adat törlés DB-ből + backup policy jelzése)
- ✅ **Minimál GDPR compliance:**
  - User data csak amennyi feltétlenül kell (email, password hash, poszt tartalom)
  - Nincs third-party analytics tracking (Google Analytics, Mixpanel) P0-ban
  - Privacy policy + Terms of Service (egyszerű, lawyer-reviewed)

**P1 - Full GDPR-ready:**
- Cookie consent banner (Cookiebot, OneTrust)
- Data export self-service (user letöltheti saját adatait JSON-ban)
- Data Processing Agreement (DPA) template ügynökségeknek
- Audit trail (ki, mikor, mit ért el)
- Automatikus right-to-be-forgotten (user törli magát UI-ból)

**Miért fontos ez már P0-ban:**
- Éles ügyfélmárkák FB/IG kezelését adják a rendszerre → bizalmi kérdés
- Bármi security incident (token leak, hibás publikálás) → "Ez nem megbízható" → project fail
- Magyar/CEE ügynökségek gyakran kérdezik: "GDPR-compliant?"

---

### NFR0.4: Jelszó Policy (Konzisztens FR-rel)

**Egységes policy (FR1.1 és NFR2.1 konzisztens):**
- Minimum 12 karakter
- Min. 1 nagybetű
- Min. 1 szám
- Speciális karakter: nem kötelező P0-ban (P1: min. 1 speciális karakter)

**Validáció:**
- Frontend: real-time feedback (jelszó erősség vizualizáció - P1)
- Backend: validációs szabály (ha nem felel meg → error message)

**Hashing:**
- bcrypt (cost 12)
- P1: Argon2id (modern, erősebb)

**Password reset:**
- Email-based token (1 órás expiry, egyszer használható)
- Link formátum: `https://creaitor.app/reset-password?token={uuid}`

---

## NFR1: Performance (Teljesítmény)

### NFR1.1: Response Time

**Struktúra:** Minimum (elfogadható pilot alatt) / Target (P0 cél) / Stretch (P1 optimalizálás)

| Művelet | Minimum (elfogadható) | Target (P0) | Stretch (P1) | Mérhető? |
|---------|----------------------|-------------|--------------|----------|
| **Page Load** (Calendar, Brand Brain) | < 5 sec (első betöltés) | < 3 sec | < 1 sec | ✅ Browser DevTools (Lighthouse) |
| **AI Copy Generation** | < 20 sec (90th percentile) | < 10 sec | < 5 sec | ✅ Backend timer (generation_time_ms) |
| **Post Save** (Draft / Edit) | < 3 sec | < 2 sec | < 1 sec | ✅ Backend timer |
| **Meta API Publish** | < 10 sec (sikeres poszt) | < 5 sec | < 3 sec | ✅ Backend timer |

**Értelmezés:**
- **Minimum:** Ha túllépjük → user frustráció, de pilot alatt **elfogadható** (nem blocker)
- **Target:** Aktívan elérni próbáljuk P0 végére
- **Stretch:** P1 optimalizálás cél (caching, CDN, background queue)

**P0 tolerancia:**
- Ha AI generálás 15-20 sec → **minimum szinten van**, elfogadható (LLM latency, nem optimalizálunk P0-ban)
- Ha Meta API 10 sec → **minimum szinten van**, elfogadható (external dependency)
- Ha page load 5 sec → **minimum szinten van**, de javítandó (P1: code splitting, lazy loading)

**P1 - Optimalizáció:**
- Caching (Redis session store, API response cache)
- CDN (static assets: Cloudflare, AWS CloudFront)
- Database indexing (query optimization)
- Background job queue (publishing offload: BullMQ, Sidekiq)

---

### NFR1.2: Throughput

**Pilot skála throughput (target: 8-10 ügynökség, 40-50 márka, 20-30 user):**

| Metrika | Minimum | Target | Stretch |
|---------|---------|--------|---------|
| **Concurrent users** | 10-15 user | 20-30 user | 40+ user |
| **AI generálás / nap** | 50-100 poszt/nap | 150-200 poszt/nap | 300+ poszt/nap |
| **Publishing / nap** | 30-50 poszt/nap | 80-100 poszt/nap | 150+ poszt/nap |
| **Page views / nap** | 200-300 page view | 500-700 page view | 1000+ page view |

**Számítás logika (target szint - 8-10 ügynökség):**
- 20-30 user × 5-10 AI generálás/user/nap = 100-300 AI call/nap
- 40-50 márka × 1.5-2 poszt/márka/nap = 60-100 scheduled publish/nap
- 20-30 user × 20-30 page view/user/nap = 400-900 page view/nap

**P0 validáció:** Ha pilot során target throughput-ot problémamentesen kiszolgálja → elég.

**P1 - Skálázás (100+ user):**
- Horizontal scaling (multiple app servers: Kubernetes, Docker Swarm)
- Database read replicas
- Queue system (Sidekiq, BullMQ)
- Rate limiting (per-user API limits)

---

## NFR2: Security (Biztonság)

### NFR2.1: Authentication & Authorization

**Authentication (P0):**
- Email/password alapú bejelentkezés
- Jelszó policy: **min. 12 karakter, min. 1 nagybetű, min. 1 szám** (lásd NFR0.4)
- Hashing: bcrypt (cost 12)
- Session: HTTP-only cookie, secure flag, SameSite=Lax, 7 nap expiry
- P1: 2FA (TOTP alapú, Google Authenticator)

**Authorization (P0):**
- Agency-level isolation (user csak saját agency adatait látja - agency_id filter minden query-ben)
- User-level permission: P0-ban egyszerű (minden user = socialos, minden funkció elérhető)
- P1: Fine-grained permissions (Admin / Editor / Viewer role, brand-level access control)

**Password Reset (P0):**
- Email-based token (1 órás expiry, egyszer használható)
- Token formátum: UUID v4 (crypto.randomUUID())
- Email service: SendGrid / Mailgun (transactional email)

**Brute force védelem:**
- P0: Nincs explicit rate limiting (bcrypt cost 12 lassít)
- P1: Rate limiting (max. 5 login attempt / 15 perc / IP cím), CAPTCHA

---

### NFR2.2: Data Protection

**Adatbiztonság (P0 - lásd NFR0.3):**

| Adat Típus | P0 Védelem | P1 Bővítés |
|------------|------------|------------|
| **Jelszó** | bcrypt hash (cost 12) | Argon2id |
| **Meta Access Token** | Database column-level encryption (AES-256) | Secrets manager (AWS Secrets Manager, Vault) |
| **Brand Brain JSON** | Nincs külön titkosítás (nem érzékeny adat) | - |
| **User Email** | Nincs titkosítás (szükséges login-hez, unique constraint) | - |
| **Session Token** | HTTP-only cookie (client nem látja JavaScript-ből) | Redis-based session store (P1) |

**HTTPS (P0 - kötelező):**
- SSL/TLS certificate (Let's Encrypt auto-renewal)
- Minden API endpoint HTTPS-only (HTTP request → redirect to HTTPS)
- Nincs HTTP fallback

**P0 megjegyzés:** Nincs SOC2, ISO27001 audit. Pilot fázisban nem szükséges, de **alapvető security mandatory** (HTTPS, token encryption).

---

### NFR2.3: API Security

**Meta OAuth Token tárolás (P0):**
- Access token encrypted (AES-256, database column encryption)
- Token expiry tracking (60 nap után lejár)
- Ha token kompromittálódik / lejár → user újra OAuth flow (Re-connect gomb Brand settings-ben)
- P1: Token refresh automatizálás, email reminder 7 nappal lejárat előtt

**SQL Injection védelem (P0):**
- ORM használat (Prisma, TypeORM, Sequelize) → prepared statements automatic
- Input validation (Zod schema minden API endpoint-nál)
- Nincs raw SQL query user input-tal (ha mégis → parameterized query)

**XSS védelem (P0):**
- Input sanitization (post text, brand name, TOV fields)
- React JSX auto-escape (default XSS védelem)
- Content Security Policy (CSP) header (P1)

**CSRF védelem (P0):**
- CSRF token (form submission minden POST/PUT/DELETE request-nél)
- SameSite cookie flag (SameSite=Lax)

**P1 - Audit Log:**
- Minden kritikus művelet naplózása (user login, brand deletion, token refresh, post publish)
- Retention: 12 hónap
- Admin dashboard: ki, mit, mikor csinált

---

## NFR3: Scalability (Skálázhatóság)

### NFR3.1: Pilot Skála (P0)

**MVP támogatott volumen (lásd NFR0.1):**
- **Ügynökség:** 5-10 agency (target: 8-10)
- **User:** 10-30 user (target: 20-30)
- **Márka:** 15-50 brand (target: 40-50)
- **Poszt:** 500-2000 poszt (4-6 hetes pilot, target: 1500-2000)

**Infrastruktúra (P0 - fizikailag single-server, logikailag multi-tenant):**
- Single-server deployment (Render, Railway, Fly.io managed service)
- PostgreSQL (single instance, Render/Railway managed DB, auto backup)
- Nincs Redis, nincs CDN, nincs auto-scaling

**P0 megjegyzés:** Ha pilot során target terhelést (8-10 ügynökség, 40-50 márka) problémamentesen kiszolgálja → sikeres pilot. Nem kell 100+ user-re skálázni P0-ban.

**Skálázási határok (P0 infra becslés):**
- Single-server (Render/Railway): max. 50-100 concurrent user (túl ezen: response time degradation)
- PostgreSQL single instance: max. 100k rows (posts table) → P0-ban 2000 poszt → rendben
- Meta API rate limit: 200 calls/óra (app-level) → P0-ban 100 publish/nap → rendben

---

### NFR3.2: Post-Pilot Skálázás (P1)

**Target skála (Post-PMF - 6-12 hónap):**
- **Ügynökség:** 50-100 agency
- **User:** 150-300 user
- **Márka:** 400-800 brand
- **Poszt:** 50k-100k poszt / év

**Infrastruktúra bővítés (P1):**
- Horizontal scaling (Kubernetes, Docker Swarm, load balancer)
- Database read replicas (PostgreSQL primary-replica setup)
- Redis cache layer (session store, API response cache)
- CDN (Cloudflare, AWS CloudFront) → static asset delivery
- Background job queue (Sidekiq, BullMQ) → decoupled publishing, retry logic
- Monitoring (Datadog, New Relic APM)

---

## NFR4: Reliability & Availability (Megbízhatóság)

### NFR4.1: Uptime

**P0 Target (pilot):**
- **Uptime:** 95% (4-6 hetes pilot során)
- **Planned downtime:** Max. 2 óra / hét (deployment, maintenance)
- **Incident response:** Best-effort (nincs 24/7 support, munkaidő: 9-17)

**P0 megjegyzés:** Ha pilot során 1-2 downtime incidens van (összesen 3-4 óra) → elfogadható. Nem kell 99.9% SLA pilot alatt.

**Realitás:**
- Render/Railway uptime: ~99.5% (infrastruktúra uptime)
- Ha Render/Railway down → **nincs fallback** P0-ban → user-eknek kommunikáció (email/Slack)

**P1 - Production SLA:**
- 99.5% uptime (43 perc downtime / hónap)
- Status page (status.creaitor.io) - real-time incident reporting
- Incident postmortem (minden > 1 órás downtime után)

---

### NFR4.2: Error Handling

**Backend error handling (P0):**

| Hiba Típus | P0 Viselkedés | User Feedback | Retry |
|------------|---------------|---------------|-------|
| **AI API hiba** (timeout, rate limit) | Retry 1x (auto), ha sikertelen → error | "AI generálás sikertelen. Próbáld újra!" | Manual retry gomb |
| **Meta API hiba** (token expire, rate limit) | No auto retry → error | "Publikálás sikertelen: {error_message}" | Manual retry gomb |
| **Database hiba** (connection timeout) | App crash (Render auto-restart) | 500 error page: "Hiba történt. Próbáld újra 1 perc múlva." | Auto restart (infra szinten) |
| **File upload hiba** (túl nagy fájl, invalid format) | Validation error | "Kép túl nagy (max 10MB) vagy invalid formátum." | User módosítja fájlt |

**Frontend error boundary (P0):**
- React Error Boundary (catch UI crashes, fallback UI)
- Fallback UI: "Valami hiba történt. Frissítsd az oldalt!"
- Error reporting: console.error (P1: Sentry error tracking)

**P0 megjegyzés:** Nincs robust retry logic (exponential backoff), nincs circuit breaker. Egyszerű error message + manual retry.

**P1 - Error Monitoring:**
- Sentry / Rollbar (exception tracking, stack trace)
- Alerting (Slack / email notifikáció kritikus hibáknál: > 10 error/óra)
- Error dashboards (error rate, error types, affected users)

---

### NFR4.3: Data Backup & Recovery

**Backup stratégia (P0):**
- **PostgreSQL:** Daily backup (Render / Railway auto-backup, 7 nap retention)
- **Manual backup verification:** Hetente egyszer (győződünk meg, hogy backup restorable)
- **Recovery:** Manual restore (best-effort, nincs automatikus failover)

**Recovery Time Objective (RTO) - P0:**
- **RTO (target):** < 4 óra (backup restore + app redeploy)
- **Realitás:** Ha Render/Railway teljes failure → manual migration másik providerre (1-2 nap)

**Recovery Point Objective (RPO) - P0:**
- **RPO (target):** < 24 óra (daily backup)
- **Elfogadható adatvesztés pilot alatt:** max. 24 óra adat (utolsó backup óta)

**P0 megjegyzés:** Ha adatvesztés történik (< 24 óra) → pilot során elfogadható. Nem kell multi-region replication.

**P1 - Production Backup:**
- Hourly backup (1 órás RPO)
- 30 napos retention
- Point-in-time recovery (PITR)
- Multi-region replication (AWS RDS, GCP Cloud SQL)

---

## NFR5: Usability (Használhatóság)

### NFR5.1: Browser Support

**Támogatott böngészők (P0):**
- Chrome (latest 2 verzió)
- Firefox (latest 2 verzió)
- Safari (latest 2 verzió)
- Edge (latest 2 verzió)

**Nincs támogatás (P0):**
- IE11
- Régi Safari (iOS < 14)
- Opera, Brave (nincs explicit testing, de valószínűleg működik - Chromium-based)

**P0 megjegyzés:** Desktop-first (lásd NFR5.2). Browser support testing: manual (Chrome, Firefox, Safari tesztelés pilot előtt).

---

### NFR5.2: Responsive Design & Mobile Support

**P0 - Desktop-first (de mobile-aware):**
- **Optimalizálva:** 1920×1080, 1366×768 felbontásra (desktop)
- **Tablet (768px - 1024px):** Best-effort (nem explicit testing, de nem broken UI)
- **Mobile (< 768px):** **Basic support P0-ban** - mobile böngészőből elérhető, de egyszerűsített UX

**Mobile támogatás P0-ban (simplified UX):**
- ✅ **Calendar view:** Elérhető mobilon (scrollable, nem drag&drop)
- ✅ **Post approval:** Elérhető mobilon (Approve / Schedule gomb működik)
- ✅ **Post edit:** Elérhető mobilon (textarea szerkesztés, nem drag&drop scheduling)
- ❌ **Brand Brain setup:** Desktop-only (túl komplex form mobilon)
- ❌ **Drag & drop:** Desktop-only (ha van drag&drop scheduling P0-ban)

**Miért fontos mobile support P0-ban:**
- Socialos apró ellenőrzéseket, last minute módosításokat, gyors jóváhagyásokat **mobilról is intéz**
- Ha mobilon **teljesen broken** → továbbra is Meta Business Suite marad a "safe default"
- **Adoption kockázat:** Tool nem lesz "go-to", csak "amikor épp az asztalnál ülök"

**P0 mobile UX filozófia:**
- Nem kell pixel-perfect mobile design
- De core workflow (approve, schedule, edit text) **mobilról is használható** → validálja H2 (go-to tool)

**P1 - Mobile-first:**
- Teljes responsive design (Tailwind breakpoints: sm, md, lg, xl)
- Mobile app (React Native / Flutter / PWA)
- Touch-optimized drag&drop

---

### NFR5.3: Accessibility

**P0 - Alapvető:**
- Keyboard navigation (Tab, Enter működik form-okban, gombokban)
- Alt text képeknél (user-uploaded images → user felelőssége)
- Nincs WCAG 2.1 AA compliance (nem tesztelünk screen reader-rel)

**P1 - WCAG 2.1 AA:**
- Screen reader support (ARIA labels, semantic HTML)
- Contrast ratio compliance (4.5:1 text, 3:1 UI components)
- Focus visible (keyboard navigation vizualizáció)

---

## NFR6: Maintainability (Karbantarthatóság)

### NFR6.1: Code Quality

**P0 - Alapvető clean code:**
- ESLint / Prettier (auto-format, pre-commit hook)
- TypeScript (strict mode: true, minden file .ts/.tsx)
- Nincs unit test coverage target (< 30% → elfogadható P0-ban)
- Nincs code review kötelezettség (solo dev / kis csapat → review nice-to-have)

**P1 - Production-grade:**
- Unit test (80% coverage: Jest, Vitest)
- E2E test (Playwright, Cypress - critical user flows)
- Code review (PR approval required, min. 1 reviewer)
- CI/CD pipeline (automated testing, linting, build)

---

### NFR6.2: Documentation

**P0 - Minimális:**
- README.md (setup instructions: local dev environment, environment variables)
- `.env.example` (környezeti változók listája, példa értékekkel)
- Inline code comments (complex logic, non-obvious decisions)
- Nincs külső dokumentáció (Notion, Confluence)

**P1 - Comprehensive:**
- API dokumentáció (Swagger / OpenAPI spec)
- Onboarding guide (új developer számára: architecture overview, code structure)
- Runbook (deployment, troubleshooting, incident response)

---

### NFR6.3: Monitoring & Observability

**P0 - Alapvető logging:**
- Console logs (backend: Winston / Pino structured logging)
- Browser console (frontend: console.error user-facing errors)
- Nincs centralized logging (Datadog, Splunk)
- Nincs APM (Application Performance Monitoring)

**P0 monitoring:**
- Manual checks (használat tracking data: FR8.1 backend events)
- Email alert kritikus hibáknál (pl. ha Meta API 10x egymás után fail → email a dev-nek)

**P1 - Production monitoring:**
- Datadog / New Relic (APM: request latency, error rate, throughput)
- LogDNA / Papertrail (log aggregation, search, alerting)
- Uptime monitoring (Pingdom, UptimeRobot - external check every 5 min)
- Alert dashboards (Slack integration: critical errors, downtime)

---

## NFR7: Data & Compliance

### NFR7.1: Data Retention

**Retention policy (P0):**
- **User data:** Korlátlan (nincs auto-delete)
- **Post data:** Korlátlan
- **Event logs:** 12 hónap (után manuális törlés - manual script)
- **Backup:** 7 nap (daily backup, 7 nap retention)

**P0 megjegyzés:** Nincs GDPR "right to be forgotten" **automatizmus**. Ha user kéri → **manuális deletion** (7 napon belül - lásd NFR0.3).

**Manuális deletion folyamat (P0):**
1. User email-t küld: "Töröljétek az adataimat"
2. Admin (dev) manuálisan törli DB-ből:
   - User rekord + összes kapcsolódó adat (posts, brands, events - cascade delete)
   - Backup-ból is törlés (vagy jelzi user-nek: "7 napos backup retention, utána automatikus törlődik")
3. Confirmation email user-nek: "Adataid törölve"

**P1 - GDPR compliance:**
- User deletion self-service (user törli magát UI-ból, automatikus cascade delete)
- Data export self-service (user letölti saját adatait JSON-ban)
- Cookie consent banner
- Privacy policy + Terms of Service (lawyer-reviewed)

---

### NFR7.2: GDPR & Privacy

**P0 - Minimál GDPR baseline (lásd NFR0.3):**
- Email tárolás (login céljából - legitimate interest)
- Meta access token tárolás (titkosítva - user explicit consent OAuth flow-ban)
- Nincs analytics cookie (Google Analytics, Mixpanel - P0-ban nincs tracking)
- Nincs third-party tracking (Facebook Pixel, LinkedIn Insight Tag)
- Privacy policy (egyszerű, 1-2 oldal, magyar nyelven)
- Terms of Service (egyszerű, "use at your own risk" pilot disclaimer)

**P0 megjegyzés:** Pilot során nincs GDPR audit. Ha user kérdez → manuális válasz (email, Slack).

**P1 - GDPR-ready:**
- Cookie banner (Cookiebot, OneTrust - consent management)
- Privacy policy (lawyer-reviewed, angol + magyar)
- Data Processing Agreement (DPA) template ügynökségeknek
- Audit trail (user data hozzáférés naplózása - ki, mikor, mit nézett meg)
- Automatikus right-to-be-forgotten

---

## NFR8: Deployment & DevOps

### NFR8.1: Hosting & Infrastructure

**Platform (P0):**
- **Backend + Frontend:** Render / Railway / Fly.io (single-server managed service)
- **Database:** PostgreSQL (Render managed DB / Railway managed DB)
- **File storage:** Cloudinary (auto-resize, CDN beépített) vagy S3 (cheaper, manual setup)
- **Email:** SendGrid / Mailgun (transactional emails: password reset, user invite)

**Deployment (P0):**
- Manual deployment (git push → auto-deploy)
- No staging environment (deploy directly to production → elfogadható pilot során)
- Deployment frequency: 1-2x / hét (bug fix, feature release)

**P1 - Production infra:**
- Staging + Production környezet (külön DB, külön deployment)
- CI/CD pipeline (GitHub Actions, GitLab CI - automated tests + deploy)
- Docker containers (Dockerfile + docker-compose)
- Infrastructure as Code (Terraform / Pulumi)

---

### NFR8.2: Environment Variables

**Required env vars (P0):**
```bash
# Database
DATABASE_URL=postgresql://user:pass@host:5432/dbname

# Meta OAuth
META_APP_ID=123456789
META_APP_SECRET=abc123...
META_REDIRECT_URI=https://creaitor.app/auth/meta/callback

# AI API (OpenAI / Anthropic)
OPENAI_API_KEY=sk-...
# ANTHROPIC_API_KEY=sk-ant-... (ha Claude-ot használsz)

# Session secret (crypto.randomBytes(64).toString('hex'))
SESSION_SECRET=random-secret-key-64-chars

# Email (SendGrid / Mailgun)
SENDGRID_API_KEY=SG.abc123...

# File upload (S3 / Cloudinary)
# S3:
S3_BUCKET=creaitor-uploads
S3_ACCESS_KEY=...
S3_SECRET_KEY=...
S3_REGION=us-east-1
# VAGY Cloudinary:
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

# Encryption key (AES-256, 32 bytes hex)
ENCRYPTION_KEY=... (crypto.randomBytes(32).toString('hex'))
```

**P0 megjegyzés:** `.env` fájl git-ignored, manuális setup (nincs secrets manager).

**P1 - Secrets management:**
- AWS Secrets Manager / HashiCorp Vault
- Env var rotation (automatic secret rotation)
- Secrets audit trail

---

## Non-Functional Requirements Összefoglalás

| NFR Kategória | Minimum (elfogadható P0) | Target (P0 cél) | Stretch (P1) |
|---------------|--------------------------|-----------------|--------------|
| **Pilot Skála** | 5 ügynökség, 15 márka, 10-15 user | 8-10 ügynökség, 40-50 márka, 20-30 user | 12+ ügynökség, 80+ márka, 40+ user |
| **Performance (AI gen)** | < 20 sec | < 10 sec | < 5 sec |
| **Performance (page load)** | < 5 sec | < 3 sec | < 1 sec |
| **Throughput (AI/nap)** | 50-100 poszt/nap | 150-200 poszt/nap | 300+ poszt/nap |
| **Security** | HTTPS, bcrypt, token encryption, basic auth | Min. 12 char password, CSRF token | 2FA, secrets manager, SOC2 audit |
| **Uptime** | 95% (best-effort) | 95% | 99.5% SLA, status page |
| **Error Handling** | Manual retry, basic error messages | Auto retry (1x), user-friendly errors | Exponential backoff, Sentry monitoring |
| **Backup** | Daily (7 nap retention) | Daily + manual verification | Hourly (30 nap), PITR, multi-region |
| **Browser Support** | Desktop Chrome/Firefox/Safari (latest 2) | Desktop + basic mobile support | Full responsive, mobile app |
| **Accessibility** | Keyboard navigation | Keyboard nav + alt text | WCAG 2.1 AA compliance |
| **Testing** | Manual testing, < 30% coverage | Manual + smoke tests | 80% unit test, E2E automated |
| **Monitoring** | Console logs, manual checks | Console logs + email alerts | Datadog/New Relic APM, uptime monitoring |
| **GDPR** | Minimál baseline (HTTPS, encryption, manuális deletion) | Privacy policy + ToS | Cookie consent, self-service deletion, DPA |
| **Deployment** | Single-server, manual deploy | Single-server + auto-deploy | Staging env, CI/CD, Docker, IaC |

**Kritikus NFR Döntések (konzisztens FR0.2-vel és sikerkritériumokkal):**
- ✅ **Pilot skála: 8-10 ügynökség** (nem 1-3!) → konzisztens sikerkritériumokkal
- ✅ **Jelszó policy: min. 12 char + uppercase + szám** → konzisztens FR1.1-gyel
- ✅ **Security baseline mandatory P0:** HTTPS, token encryption, manuális GDPR deletion
- ✅ **Mobile: basic support P0** (approve, schedule, edit mobilról is működik) → H2 adoption validálás
- ✅ **Min/Target/Stretch logika** minden metrikánál → konzisztens sikerkritérium struktúrával

**P0 filozófia ismétlés:**
> "Elég jó" egy 8-10 ügynökséges, 4-6 hetes pilothoz. Ha a hipotézisek validálódnak (H1, H2, H3) és target metrikákat elérjük (60%+ usable AI, 20-40% time savings, 8+ NPS) ÉS 3-5 pilot ügynökség mondja "ezt fizetném" → akkor skálázunk P1-re (production hardening, full GDPR, monitoring, CI/CD). Ha nem → akkor nem vesztettünk időt over-engineering-re, de **alapvető megbízhatóság és biztonság megvolt**.

---
## Technical Architecture (Technikai Architektúra)

> **Architecture filozófia (P0):** Egyszerű, monolitikus architektúra - minimális stack complexity, gyors fejlesztés, kevés mozgó alkatrész. **Nem** microservices, **nem** over-engineered.

**FONTOS:** Ez a szekció NEM teljes implementációs guide (az a Tech Spec dokumentumba tartozik). Ez:
- **Magas szintű architektúra** (komponensek, adatfolyam)
- **Stack döntések** (P0-core: mandatory, P0-nice: opcionális)
- **Adatmodell summary** (single source of truth)
- **Multi-tenancy stratégia** (P0/P1/P2 terv)

---

## TA0: P0 Stack Philosophy - "Must" vs. "Nice to Have"

> **P0-core:** Minimális stack, ami P0 feature-ök implementálásához **feltétlenül kell**.
> **P0-nice:** Kényelmi/production-polish library-k, amik **elhagyhatók** időhiány esetén.

### TA0.1: P0-Core (Mandatory)

**Frontend (mandatory):**
- React 18+ (UI framework)
- TypeScript (type safety)
- Tailwind CSS (styling)
- React Router v6 (client-side routing)
- **State management:** React Context API VAGY Zustand (válassz egyet)
- **Forms:** React Hook Form + Zod (validation)
- Vite (build tool)

**Backend (mandatory):**
- Node.js 20 LTS (runtime)
- TypeScript (type safety)
- Express.js (web framework)
- Prisma (ORM - DB schema, migrations)
- **Session management:** express-session + **DB-backed session store** (PostgreSQL session table VAGY connect-pg-simple)
- **Auth:** Egyszerű email/password (custom implementation VAGY Passport.js - válassz egyet)
- node-cron (scheduling)

**Database & Storage (mandatory):**
- PostgreSQL 15+ (Render/Railway managed DB)
- **File storage:** Cloudinary (egyszerűbb setup, auto-resize, CDN beépített) - **P0: csak Cloudinary, S3 OUT**

**External Services (mandatory):**
- **Meta Graph API** (FB/IG publishing - nincs alternatíva)
- **AI API:** OpenAI GPT-4o VAGY Anthropic Claude 3.5 Sonnet - **P0: válassz egyet, mindkettő OUT**
- **Email:** SendGrid VAGY Mailgun - **P0: válassz egyet**

**Infrastructure (mandatory):**
- Render / Railway / Fly.io (managed hosting - **P0: válassz egyet**)
- Let's Encrypt (SSL - auto, Render/Railway beépített)

**Döntési pontok csökkentése (P0):**
- ❌ **S3 vagy Cloudinary?** → **Csak Cloudinary P0**
- ❌ **OpenAI vagy Anthropic?** → **Válassz egyet P0, mindkettő P1**
- ❌ **SendGrid vagy Mailgun?** → **Válassz egyet P0**
- ❌ **Context vagy Zustand?** → **Válassz egyet P0**
- ❌ **Custom auth vagy Passport?** → **Válassz egyet P0**

**Miért fontos ez:**
- Kevesebb mozgó alkatrész → gyorsabb fejlesztés
- Kevesebb provider → kevesebb integration debugging
- **Cél:** H1/H2/H3 hipotézisek validálása, **nem** technológiai felfedezés

---

### TA0.2: P0-Nice (Opcionális - időhiány esetén elhagyható)

**Frontend (nice-to-have):**
- Winston/Pino structured logging → **Helyette:** console.log (wrapper nélkül)
- React Query (TanStack Query) → **Helyette:** egyszerű axios fetch, Zustand-ban cache (ha kell)
- ESLint + Prettier (pre-commit hook) → **P0-nice:** Manual formatting, P1: automated

**Backend (nice-to-have):**
- Winston/Pino structured logging → **Helyette:** console.log (vagy egyszerű console wrapper)
- Passport.js (ha bonyolultnak tűnik) → **Helyette:** Egyszerű custom email/password auth (bcrypt + session)
- Zod backend validation → **P0-nice:** Csak frontend Zod, backend: egyszerű type check

**Infrastructure (nice-to-have):**
- Docker containerization → **P0:** Render/Railway natívan futtatja Node.js-t (package.json alapján)
- CI/CD pipeline → **P0:** Manual testing, manual deploy (git push → auto-build)

**Ha idő szűk, vágd le P0-nice-ot → Fókusz: core feature-ök (Brand Brain, AI Copy, Calendar, Publishing).**

---

## TA1: High-Level System Architecture (P0)

**System Components (egyszerűsített):**

```
┌──────────────────────────────────────────────────────┐
│         User (Socialos) - Browser (Desktop)          │
└─────────────────┬────────────────────────────────────┘
                  │ HTTPS
                  ▼
┌──────────────────────────────────────────────────────┐
│             Frontend (React SPA)                     │
│  - React + TypeScript + Tailwind                    │
│  - React Router (client-side routing)               │
│  - Context API / Zustand (state)                    │
└─────────────────┬────────────────────────────────────┘
                  │ REST API (JSON)
                  ▼
┌──────────────────────────────────────────────────────┐
│            Backend API (Node.js)                     │
│  - Express + TypeScript                             │
│  - Prisma ORM (PostgreSQL)                          │
│  - express-session (DB-backed store)                │
│  - node-cron (scheduling cron job)                  │
└─┬───────┬───────┬───────┬──────────────────────────┘
  │       │       │       │
  │       │       │       └──> Cron Job (5 perc)
  │       │       │            - Check scheduled posts
  │       │       │            - Publish via Meta API
  │       │       │
  │       │       └──────────> Cloudinary
  │       │                    - Image upload (JPEG/PNG)
  │       │                    - Auto resize
  │       │
  │       └──────────────────> SendGrid / Mailgun
  │                            - Transactional emails
  │
  ├──────────────────────────> AI API
  │                            - OpenAI GPT-4o VAGY
  │                            - Anthropic Claude 3.5
  │                            - (P0: válassz egyet!)
  │
  └──────────────────────────> Meta Graph API
                               - FB Page + IG Account
                               - OAuth + Publishing

┌──────────────────────────────────────────────────────┐
│           Database (PostgreSQL)                      │
│  - Render / Railway managed DB                      │
│  - Tables: agencies, users, brands, posts, events   │
│  - Sessions table (express-session store)           │
└──────────────────────────────────────────────────────┘
```

**P0 megjegyzés:**
- **Monolitikus:** Frontend + Backend egyetlen repo (monorepo) vagy 2 külön repo (de egyetlen deployment)
- **Single-server:** Nincs load balancer, nincs horizontal scaling, nincs multi-region
- **Egyszerű scheduling:** node-cron (nem queue system - Sidekiq/BullMQ P1)

**P1 - Skálázás:**
- Background job queue (BullMQ, Sidekiq) → decoupled publishing, retry logic
- Redis cache (session store, API response cache)
- CDN (CloudFront, Cloudflare) → static asset delivery
- Horizontal scaling (Kubernetes, load balancer)

---

## TA2: Technology Stack Decisions (P0)

### TA2.1: Frontend Stack

| Komponens | P0-Core (mandatory) | P0-Nice (opcionális) | Döntési indok |
|-----------|---------------------|----------------------|---------------|
| **Framework** | React 18+ | - | Széles ecosystem, jó TypeScript support |
| **Language** | TypeScript (strict) | - | Type safety, DX, kevesebb runtime hiba |
| **Styling** | Tailwind CSS | - | Gyors UI development, utility-first |
| **State** | Context API VAGY Zustand | React Query (cache) | Egyszerű state management elég |
| **Routing** | React Router v6 | - | Standard, proven |
| **Forms** | React Hook Form + Zod | - | Validation + performance |
| **HTTP** | Axios / Fetch API | - | Egyszerű fetch elég P0-ban |
| **Build** | Vite | - | Gyors dev server |

**P0 Package list (frontend - minimalizált):**
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "zustand": "^4.4.0",
    "axios": "^1.6.0",
    "react-hook-form": "^7.48.0",
    "zod": "^3.22.0",
    "tailwindcss": "^3.3.0"
  },
  "devDependencies": {
    "typescript": "^5.2.0",
    "vite": "^5.0.0",
    "@types/react": "^18.2.0"
  }
}
```

---

### TA2.2: Backend Stack

| Komponens | P0-Core (mandatory) | P0-Nice (opcionális) | Döntési indok |
|-----------|---------------------|----------------------|---------------|
| **Runtime** | Node.js 20 LTS | - | Proven, széles ecosystem |
| **Framework** | Express.js | - | Egyszerű, jól ismert |
| **Language** | TypeScript (strict) | - | Type safety, shared types (FE-BE) |
| **ORM** | Prisma | - | Modern DX, type-safe, migrations |
| **Auth** | express-session + Passport VAGY custom | - | Session-based, egyszerű |
| **Session Store** | **DB-backed (PostgreSQL)** | Redis | **P0: PostgreSQL session table (idempotent, persistent)** |
| **Scheduling** | node-cron | - | Egyszerű cron job (5 perc) |
| **Logging** | console.log | Winston/Pino | **P0: egyszerű console elég** |

**P0 Package list (backend - minimalizált):**
```json
{
  "dependencies": {
    "express": "^4.18.0",
    "typescript": "^5.2.0",
    "prisma": "^5.7.0",
    "@prisma/client": "^5.7.0",
    "express-session": "^1.17.0",
    "connect-pg-simple": "^9.0.0",
    "bcrypt": "^5.1.0",
    "node-cron": "^3.0.0",
    "axios": "^1.6.0",
    "dotenv": "^16.3.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.0",
    "@types/node": "^20.10.0",
    "ts-node": "^10.9.0"
  }
}
```

**Session Store Döntés (P0):**
- ❌ **MemoryStore (default express-session):** Session elvész restart-nál → instabil user élmény → **NEM ELFOGADHATÓ P0-ban**
- ✅ **DB-backed (connect-pg-simple):** Session perzisztens PostgreSQL-ben → restart-proof → **P0 MANDATORY**
- ✅ **Redis (alternative):** Gyorsabb, de extra dependency → **P1** (ha performance issue)

**Miért fontos session store P0-ban:**
- Ha MemoryStore → app restart/deploy → user random kijelentkezik → **bizalomvesztés pilotban**
- DB-backed session → minimális complexity növelés, de stabil UX

---

### TA2.3: Database & Storage

| Komponens | P0 Választás | Alternatíva (P1) | Döntési indok |
|-----------|--------------|------------------|---------------|
| **Primary DB** | PostgreSQL 15+ | - | Relational data, JSON support, ACID |
| **Hosting** | Render Managed / Railway | Supabase, AWS RDS, Neon | Egyszerű setup, auto backup |
| **Migration** | Prisma Migrate | - | Deklaratív schema, version control |
| **File Storage** | **Cloudinary (P0 ONLY)** | S3 (P1) | **Auto-resize, CDN, egyszerű setup** |
| **Cache** | - | Redis (P1) | P0: nincs cache layer |

**Cloudinary vs. S3 döntés (P0):**
- ✅ **Cloudinary P0:** Auto-resize (1200×630, 1080×1080), CDN beépített, egyszerű API → **GYORSABB FEJLESZTÉS**
- ❌ **S3 OUT P0:** Manual resize implementation, CDN setup (CloudFront), több kód → **LASSABB FEJLESZTÉS**
- **P1:** S3 + CloudFront (olcsóbb nagy volumen esetén, de több work)

**Miért fontos ez:**
- Kevesebb integration → kevesebb debugging → **gyorsabb pilot launch**

---

### TA2.4: External Services (P0)

| Service | P0 Választás | Alternatíva (P1) | Döntési indok |
|---------|--------------|------------------|---------------|
| **AI API** | **OpenAI GPT-4o VAGY Anthropic Claude 3.5 (válassz egyet)** | Mindkettő (P1) | **P0: 1 provider → gyorsabb fejlesztés** |
| **Email** | **SendGrid VAGY Mailgun (válassz egyet)** | Mindkettő (P1) | **P0: 1 provider** |
| **Meta API** | Meta Graph API v18.0+ | - | Nincs alternatíva (core dependency) |
| **Hosting** | **Render VAGY Railway VAGY Fly.io (válassz egyet)** | - | **P0: 1 platform** |

**AI Provider Döntés (P0):**
- **Választási szempontok:**
  - **OpenAI GPT-4o:** Jobb ismert, több példakód, széles community support → **Javaslat: kezdj ezzel**
  - **Anthropic Claude 3.5 Sonnet:** Jobb hosszú context handling, instruction following → Alternatíva, ha OpenAI nem felel meg
- **P0: Válassz egyet, ne implementáld mindkettőt** (P1: dual-provider support, model switching)

**Email Provider Döntés (P0):**
- **SendGrid:** Jó UI, egyszerű setup, free tier (100 email/nap)
- **Mailgun:** Jobb deliverability (tapasztalat szerint), de bonyolultabb setup
- **P0: Válassz egyet** (P1: fallback provider)

**Hosting Platform Döntés (P0):**
- **Render:** Egyszerű UI, jó PostgreSQL managed DB, auto SSL
- **Railway:** Gyorsabb deploy, jó DX, de drágább
- **Fly.io:** Leggyorsabb (edge deployment), de bonyolultabb config
- **P0: Javaslat - Render** (egyszerűség), de válassz egyet és maradj nála

---

## TA3: Data Model (Single Source of Truth)

> **Ez az adatmodell az autoritatív verzió.** FR-ek és Tech Spec (Prisma schema) ennek felel meg.

### TA3.1: Core Entities

**Agency (Ügynökség):**
```
Agency
  ├─ id: UUID (PK)
  ├─ name: String (max 100 char)
  ├─ owner_email: String (unique)
  ├─ created_at: Timestamp
  └─ updated_at: Timestamp
```

**User:**
```
User
  ├─ id: UUID (PK)
  ├─ agency_id: UUID (FK → Agency)
  ├─ email: String (unique)
  ├─ password_hash: String (bcrypt)
  ├─ role: String (P0: "admin" vagy "socialos", P1: enum)
  ├─ created_at: Timestamp
  └─ updated_at: Timestamp
```

**Brand:**
```
Brand
  ├─ id: UUID (PK)
  ├─ agency_id: UUID (FK → Agency)
  ├─ name: String (max 100 char)
  ├─ description: String (nullable, max 500 char)
  │
  ├─ fb_page_id: String (nullable)
  ├─ fb_page_name: String (nullable)
  ├─ fb_access_token_encrypted: String (nullable) - AES-256 encrypted
  ├─ fb_token_expires_at: Timestamp (nullable)
  │
  ├─ ig_account_id: String (nullable)
  ├─ ig_username: String (nullable)
  ├─ ig_access_token_encrypted: String (nullable) - AES-256 encrypted
  ├─ ig_token_expires_at: Timestamp (nullable)
  │
  ├─ brand_brain: JSON (Brand Brain v1 struktura - lásd TA3.2)
  ├─ archived_at: Timestamp (nullable - soft delete)
  ├─ created_at: Timestamp
  └─ updated_at: Timestamp
```

**FONTOS - FB/IG token kezelés:**
- **Külön mezők** FB és IG token-eknek (nem egyetlen `accessToken` mező!)
- **Külön expiry tracking** (60 napos lejárat követése)
- **Encrypted** (AES-256, encryption key env var-ból)

**Post:**
```
Post
  ├─ id: UUID (PK)
  ├─ brand_id: UUID (FK → Brand)
  ├─ user_id: UUID (FK → User - creator)
  ├─ text: Text
  ├─ platform: String ("facebook" vagy "instagram")
  ├─ status: String ("draft" | "approved" | "scheduled" | "published" | "failed")
  │
  ├─ ai_generated: Boolean (default: false)
  ├─ usability_rating: String (nullable: "usable" | "heavy_edit" | "not_usable")
  │
  ├─ image_url: String (nullable - Cloudinary URL)
  │
  ├─ scheduled_at: Timestamp (nullable)
  ├─ published_at: Timestamp (nullable)
  │
  ├─ fb_post_id: String (nullable - Meta API response)
  ├─ ig_media_id: String (nullable - Meta API response)
  │
  ├─ error_message: String (nullable - ha failed státusz)
  │
  ├─ publishing_lock: Boolean (default: false - idempotencia P0)
  ├─ last_publish_attempt_at: Timestamp (nullable - idempotencia P0)
  │
  ├─ created_at: Timestamp
  └─ updated_at: Timestamp
```

**FONTOS - Publishing idempotencia mezők (P0):**
- **publishing_lock:** Boolean flag → cron job ellenőrzi, ha `true` → skip (már folyamatban van)
- **last_publish_attempt_at:** Timestamp → ha < 5 perc → skip (túl közeli retry védelem)
- **Cél:** Duplikált poszt kockázat csökkentése (lásd TA5.2)

**Event (Analytics):**
```
Event
  ├─ id: UUID (PK)
  ├─ user_id: UUID (FK → User, nullable)
  ├─ event_type: String ("user_login", "ai_generation", "post_saved", stb.)
  ├─ event_data: JSON (event-specifikus paraméterek)
  └─ timestamp: Timestamp
```

**Session (express-session store):**
```
Session
  ├─ sid: String (PK - session ID)
  ├─ sess: JSON (session data: user_id, stb.)
  └─ expire: Timestamp (session expiry - 7 nap)
```

---

### TA3.2: Brand Brain JSON Structure (Autoritatív)

**Brand Brain v1 struktúra (brand_brain mező):**

```json
{
  "tone_of_voice": {
    "description": "string (max 1000 char)"
  },
  "key_messages": [
    "string (max 200 char)",
    ...  // max 10 darab
  ],
  "reference_posts": [
    {
      "text": "string (max 5000 char)",
      "source": "manual_input",
      "created_at": "ISO timestamp"
    },
    ...  // max 5 darab
  ],
  "visual_direction": {
    "description": "string (max 1000 char)"
  }
}
```

**Validáció:** Lásd FR2.1 (nincs kötelező mező P0-ban, de fallback prompt kezelés van - FR0.1).

---

## TA4: Multi-Tenancy Strategy (P0/P1/P2 Roadmap)

> **Tudatos, lépcsőzetes terv** - nem ad-hoc megoldás.

### TA4.1: P0 - Application-Level Row Isolation

**Stratégia:** Minden query `agencyId` filter-rel (app-rétű izolálás).

**Implementation pattern:**

```typescript
// Middleware - Agency Access Check (P0 - optimalizált)
async function checkAgencyAccess(req, res, next) {
  const { brandId } = req.params;
  const userId = req.session.userId;

  // 1. Get user's agencyId (session-ből vagy DB-ből)
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { agencyId: true }
  });

  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // 2. Get brand's agencyId (1 query, ne töltsünk user listát!)
  const brand = await prisma.brand.findUnique({
    where: { id: brandId },
    select: { agencyId: true }
  });

  if (!brand) {
    return res.status(404).json({ error: "Brand not found" });
  }

  // 3. Check match
  if (user.agencyId !== brand.agencyId) {
    return res.status(403).json({ error: "Forbidden - wrong agency" });
  }

  // 4. Attach agencyId to request (later queries can use this)
  req.agencyId = user.agencyId;

  next();
}
```

**FONTOS - P0 optimalizálás:**
- ❌ **NE:** `brand.agency.users.some(...)` → teljes user lista fetch (N+1 query, lassú)
- ✅ **IGEN:** `user.agencyId === brand.agencyId` → egyszerű ID match (gyors, 2 query)

**Query pattern (minden brand/post lekérdezésnél):**
```typescript
// Example: List brands for agency
async function getUserBrands(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { agencyId: true }
  });

  return prisma.brand.findMany({
    where: { agencyId: user.agencyId, archived_at: null }
  });
}
```

**Kockázatok (P0):**
- ❌ **Nincs DB-szintű védelem:** Ha elfelejtünk `agencyId` filter-t → tenant isolation sérül
- ❌ **Manuális minden query-nél:** Developer error-prone

**Mitigálás (P0):**
- Code review (minden query ellenőrzés)
- Testing (multi-agency test case-ek)

---

### TA4.2: P1 - Database-Level Row-Level Security (RLS)

**Stratégia:** PostgreSQL RLS policy + app-layer filter kombinálva.

**PostgreSQL RLS policy example (P1):**
```sql
-- Enable RLS on Brand table
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;

-- Policy: user csak saját agency brand-jeit látja
CREATE POLICY agency_isolation_policy ON brands
  FOR ALL
  USING (agency_id = current_setting('app.current_agency_id')::uuid);
```

**App-layer set agency context:**
```typescript
// Set session variable before queries
await prisma.$executeRaw`SET app.current_agency_id = ${user.agencyId}`;
```

**Előny:**
- ✅ DB-szintű védelem (még ha app-layer filter elfelejt is → RLS policy blokkol)
- ✅ Defense in depth

**Hátrány:**
- Bonyolultabb setup
- Session variable management (Prisma-val nem triviális)

---

### TA4.3: P2 - Schema-Per-Tenant (Enterprise)

**Stratégia:** Külön PostgreSQL schema / database per agency.

**Előny:**
- ✅ Teljes izolálás (performance + security)
- ✅ Enterprise compliance (SOC2, ISO27001)

**Hátrány:**
- Nagyon komplex (migration, backup, monitoring per-tenant)
- Csak nagy enterprise use case-nél érdemes

**P0/P1:** Nem releváns.

---

## TA5: Key Implementation Patterns (P0)

### TA5.1: Session Management (DB-Backed)

**Config (express-session + connect-pg-simple):**

```typescript
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import { Pool } from 'pg';

const PgSession = connectPgSimple(session);
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.use(session({
  store: new PgSession({
    pool: pool,
    tableName: 'sessions'  // sessions table in PostgreSQL
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: true,  // HTTPS only
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
  }
}));
```

**Sessions table (Prisma schema):**
```prisma
model Session {
  sid    String   @id
  sess   Json
  expire DateTime

  @@index([expire])
}
```

**Miért fontos:**
- ✅ Session perzisztens (app restart → user marad bejelentkezve)
- ✅ Stabil UX pilotban

---

### TA5.2: Cron Job Idempotencia (Publishing)

**Probléma:** Cron job duplikáltan fut → duplikált poszt kockázat.

**Megoldás (P0):**

```typescript
import cron from 'node-cron';

// Run every 5 minutes
cron.schedule('*/5 * * * *', async () => {
  console.log('[CRON] Checking scheduled posts...');

  const now = new Date();

  // Find scheduled posts ready to publish
  const postsToPublish = await prisma.post.findMany({
    where: {
      status: 'scheduled',
      scheduled_at: { lte: now },
      publishing_lock: false,  // P0 idempotencia check
      OR: [
        { last_publish_attempt_at: null },
        { last_publish_attempt_at: { lt: new Date(now.getTime() - 5 * 60 * 1000) } }  // > 5 min ago
      ]
    },
    include: { brand: true }
  });

  for (const post of postsToPublish) {
    try {
      // 1. Set lock (idempotencia)
      await prisma.post.update({
        where: { id: post.id },
        data: {
          publishing_lock: true,
          last_publish_attempt_at: now
        }
      });

      // 2. Publish to Meta API
      const result = await publishToMeta(post);

      // 3. Update status (success)
      await prisma.post.update({
        where: { id: post.id },
        data: {
          status: 'published',
          published_at: now,
          fb_post_id: result.fb_post_id,
          ig_media_id: result.ig_media_id,
          publishing_lock: false
        }
      });

      console.log(`[CRON] Published post ${post.id}`);
    } catch (error) {
      // 4. Update status (failed)
      await prisma.post.update({
        where: { id: post.id },
        data: {
          status: 'failed',
          error_message: error.message,
          publishing_lock: false  // Release lock
        }
      });

      console.error(`[CRON] Failed to publish post ${post.id}:`, error);
    }
  }
});
```

**Idempotencia mechanizmus:**
- ✅ **publishing_lock:** Boolean flag → elkerüli a duplikált publish attempt-et
- ✅ **last_publish_attempt_at:** Timestamp check → ha < 5 perc → skip (túl közeli retry védelem)
- ✅ **Transaction-like pattern:** Lock set → publish → lock release

**P1 - Queue-based:**
- BullMQ / Sidekiq → automatic retry, exponential backoff, job monitoring
- Idempotencia built-in (job ID alapján)

---

### TA5.3: AI Provider Abstraction (P0 - Single Provider, P1 - Multi)

**P0 - Single provider (OpenAI VAGY Anthropic):**

```typescript
// AI service (single provider P0)
async function generateAICopy(brief: string, brandBrain: BrandBrain): Promise<string> {
  const prompt = constructPrompt(brief, brandBrain);  // lásd FR3.1

  // P0: Hardcoded provider (OpenAI VAGY Anthropic - build-time döntés)
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: "Te egy social media copywriter vagy." },
      { role: "user", content: prompt }
    ],
    temperature: 0.7,
    max_tokens: 500
  });

  return completion.choices[0].message.content.trim();
}
```

**P1 - Multi-provider (fallback + switching):**

```typescript
// AI service (multi-provider P1)
async function generateAICopy(brief: string, brandBrain: BrandBrain, provider: 'openai' | 'anthropic' = 'openai'): Promise<string> {
  const prompt = constructPrompt(brief, brandBrain);

  try {
    if (provider === 'openai') {
      return await callOpenAI(prompt);
    } else {
      return await callAnthropic(prompt);
    }
  } catch (error) {
    // Fallback to other provider
    if (provider === 'openai') {
      console.warn('[AI] OpenAI failed, falling back to Anthropic');
      return await callAnthropic(prompt);
    } else {
      console.warn('[AI] Anthropic failed, falling back to OpenAI');
      return await callOpenAI(prompt);
    }
  }
}
```

**P0: Single provider elég** → Gyorsabb fejlesztés, kevesebb edge case.

---

## TA6: Integration Complexity Management (P0)

> **Cél:** Csökkenteni az integrációk komplexitását → fókusz a core value-ra (H1/H2/H3 validálás).

### TA6.1: Provider Choices (P0 - Egyszerűsített)

| Integration | P0 Choice | Alternatíva (OUT P0) | Indok |
|-------------|-----------|----------------------|-------|
| **AI API** | OpenAI GPT-4o | Anthropic Claude (P1) | Szélesebb support, több példakód |
| **File Storage** | Cloudinary | S3 (P1) | Auto-resize, CDN, egyszerű API |
| **Email** | SendGrid | Mailgun (P1) | Free tier, egyszerű setup |
| **Hosting** | Render | Railway, Fly.io (P1) | Managed PostgreSQL, SSL auto |

**Miért fontos ez:**
- Kevesebb provider → kevesebb credential management
- Kevesebb API-szokás tanulás → gyorsabb fejlesztés
- **Cél:** 4-6 hét alatt pilot launch, **nem** technológiai exploration

---

### TA6.2: Integration Priority (P0)

**Core integrations (mandatory P0):**
1. **Meta Graph API** (nincs alternatíva - core dependency)
2. **AI API** (1 provider - OpenAI VAGY Anthropic)
3. **PostgreSQL** (Render managed DB)
4. **Cloudinary** (file storage)

**Secondary integrations (P0-nice - elhagyható időhiány esetén):**
5. **SendGrid** (email - password reset, user invite)
6. **Session store** (DB-backed - **mandatory stability-ért**, de egyszerű setup)

**Out of scope P0:**
- ❌ Monitoring (Datadog, New Relic) → P1
- ❌ Error tracking (Sentry) → P1
- ❌ Analytics (Mixpanel, Amplitude) → P1
- ❌ CDN (CloudFront, Cloudflare) → P1

**Ha idő szűk:**
- Fókusz: Meta API + AI API + PostgreSQL + Cloudinary
- Email: Lehet manuális (admin küld email-t kézzel pilot alatt)

---

## Technical Architecture Összefoglalás

| Komponens | P0-Core (mandatory) | P0-Nice (opcionális) | P1 (post-PMF) |
|-----------|---------------------|----------------------|---------------|
| **Architecture** | Monolitikus (FE + BE egyetlen deployment) | - | Microservices, event-driven |
| **Frontend** | React + TS + Tailwind + Router + Context/Zustand | React Query | Next.js (SSR), React Query |
| **Backend** | Express + TS + Prisma + cron | Winston/Pino | Fastify (performance), NestJS |
| **Database** | PostgreSQL (Render managed) | - | Read replicas, connection pooling |
| **Session** | **DB-backed (PostgreSQL)** | Redis | Redis (gyorsabb) |
| **File Storage** | **Cloudinary ONLY** | - | S3 + CloudFront CDN |
| **AI API** | **OpenAI GPT-4o VAGY Anthropic (válassz egyet)** | - | Mindkettő (dual-provider, fallback) |
| **Email** | **SendGrid VAGY Mailgun (válassz egyet)** | - | Mindkettő (fallback) |
| **Scheduling** | node-cron + **idempotencia** (lock, timestamp) | - | BullMQ queue, retry logic |
| **Multi-tenancy** | App-layer RLS (agencyId filter minden query) | - | DB-level RLS (PostgreSQL policy) |
| **Monitoring** | console.log | - | Datadog/New Relic APM, Sentry |
| **Deployment** | Render/Railway (git push → auto-build) | Docker | CI/CD, staging env, Docker |

**Kritikus TA Döntések:**
- ✅ **Session: DB-backed P0** (nem MemoryStore!) → stabil UX, restart-proof
- ✅ **Cron idempotencia P0** (publishing_lock, last_attempt_at) → duplikált poszt védelem
- ✅ **1 AI provider P0** (OpenAI VAGY Anthropic, nem mindkettő) → gyorsabb fejlesztés
- ✅ **Cloudinary P0, S3 OUT** → auto-resize, CDN, egyszerű API
- ✅ **Multi-tenancy: app-layer P0, DB RLS P1** → egyszerűbb start, later hardening
- ✅ **FB/IG token külön mezők** (nem egyetlen accessToken) → konzisztens FR-rel

**P0 filozófia ismétlés:**
> Egyszerű monolit, minimális stack complexity. **P0-core:** Mandatory tech (Meta API, 1 AI provider, Cloudinary, DB-backed session). **P0-nice:** Opcionális polish (Winston, Passport, stb.) - időhiány esetén elhagyható. **Cél:** Gyors pilot launch (4-6 hét), H1/H2/H3 validálás, **nem** technológiai felfedezés. Ha sikeres → P1 refactoring (queue, monitoring, dual-provider). Ha nem → nem vesztettünk időt over-engineering-re.

---

## Risks & Dependencies (Kockázatok és Függőségek)

**Risk management filozófia (P0):**

Cél nem a kockázatok „kinullázása", hanem az, hogy:
- **tudd, mi ölheti meg a projektet;**
- **legyenek konkrét triggerek, amiknél dönteni kell;**
- **minden kritikus dependency-re legyen learning-first fallback** – akkor is tanulj, ha a technika megdől.

A pilot célja: **hipotézis-validálás**, nem egy „mindenre felkészített" production rendszer.

---

## R0: Top 5 Killer Risks & Decision Triggers

> Ezek azok a kockázatok, amelyeknél tudatos **pivot/stop döntést** kell hozni, ha a trigger bekövetkezik.

| ID | Kockázat | Trigger (konkrét jel) | Azonnali lépések (Action) | Owner |
|----|----------|----------------------|---------------------------|--------|
| **KR1** | **Meta Graph API dependency** – publishing leáll | 7+ egymást követő nap, amikor a scheduled publishing >50%-a fail Meta-hiba miatt | - Felfüggesztett scheduling-validáció<br>- Pilot fókusz átmenetileg: Brand Brain + AI Copy + Calendar workflow<br>- Socialos manuálisan publikál Meta Business Suite-ből | Tech/Product |
| **KR2** | **H2/H3 fail** – nincs időmegtakarítás / AI output gyenge | 4–6. hét után: átlagos időmegtakarítás <20% ÉS usable AI output <40% | - Feature-fejlesztés befagyasztása<br>- Dedikált 1–2 hetes AI/UX tuning sprint (prompt, Brand Brain UX)<br>- Újramérés tuning után, mielőtt P1-ről döntés születik | Product |
| **KR3** | **Pilot user recruitment fail** | 4. hétig <3 aktív ügynökség VAGY <3 aktív socialos | - Célt újradefiniálni (kevesebb, de mélyebb pilot)<br>- Célzott recruitment kampány (networking, direkt outreach)<br>- Döntés: halasztott pilot vs. projekt parkoltatása | Founder/BD |
| **KR4** | **Pilot design / measurement hibás** – fals PMF jel | Inkonzisztens jelek: magas NPS, de alacsony WAU/retention; időmérés hiányos / zajos | - Measurement audit (folyamatok, sheetek revíziója)<br>- Min. 2 hétig strukturált időmérés újraindítása<br>- Kozmetikázott metrikák kizárása döntéshozatalból | Product/Analytics |
| **KR5** | **Brand Brain overhead** + UX friction miatt nincs adoption | Pilot 3–4. hét: Brand Brain completion rate <50% ÉS socialosok nem itt kezdik a munkát | - Brand Brain egyszerűsítés (kevesebb mező, wizard)<br>- „Lite setup" mód bevezetése<br>- Validáció: v1.5 Brand Brain előtt nincs P1-es skálázás | Product/UX |

---

## R1: Technical Risks (Technikai Kockázatok)

### R1.1. Third-Party API Dependency Risks

**Meta / AI / egyéb külső szolgáltatók**

| Kockázat | Impact | Valószínűség | Mitigation (P0) | P1 bővítés | Learning-first fallback |
|----------|--------|--------------|-----------------|------------|------------------------|
| **Meta Graph API verzióváltás** (v18 → v19, breaking change) | 🔴 Magas – publishing leáll | 🟡 Közepes | - API version pinning (v18 fixálás)<br>- Meta Developer Newsletter, changelog követés | Migráció staging app-pal, automata smoke tesztek | Ha 1–2 hétig instabil: pilot fókusz AI + Calendar validációra, publishing workflow manuális (Meta Business Suite) |
| **Meta token expire** (60 nap, auto-refresh nélkül) | 🟡 Közepes – usernek újra OAuth | 🔴 Magas | - Egyértelmű hibaüzenet: „Token lejárt, csatold újra a profilt"<br>- Token lejárat naplózása | Auto-refresh mechanizmus, lejárat előtti email | Token issue esetén: a pilotban a publikálás min. 1 márkán manuálisan, hogy usage ne álljon le teljesen |
| **Meta rate limit** (200 call/h fölött) | 🟡 Közepes – késő publikálás | 🟢 Alacsony (5–10 user alatt) | - Hibaüzenet + manual retry útmutatás | Queue + call counting, backoff | Ha limitet eléritek: átmeneti „publishing window"-ok definiálása, pilot tanulási fókusz: AI + Calendar |
| **OpenAI/Anthropic downtime** | 🟡 Közepes – AI nem generál | 🟢 Alacsony | - 30s timeout, 1x retry, tiszta hibaüzenet | Dual-provider fallback (OpenAI ↔ Anthropic) | AI nélkül is mérni: hány user használja csak a naptár + szerkesztő flow-t, manuális copyval |
| **OpenAI/Anthropic pricing spike** | 🟡 Közepes – Opex nő | 🟡 Közepes | - Havi API-költség monitor<br>- Budget cap (pl. 100–200 USD/hó pilot) | Modell-váltás, tokencsökkentés, finomabban targetelt promptok | Ha cost elszalad: modell downgrade (olcsóbb modellek), de továbbra is mérni kell a usability-ratinget |

**Összefoglalás:**
Meta a fő technikai single point of failure. A P0 stratégia:
– **nem a teljes technikai kockázat kiiktatása**, hanem
– **biztosítani, hogy publishing nélküli hetekben is tudj PMF-et tanulni** (AI + Calendar + workflow adoption).

---

### R1.2. Infrastructure & Deployment Risks

| Kockázat | Impact | Valószínűség | Mitigation (P0) | P1 bővítés |
|----------|--------|--------------|-----------------|------------|
| **Render/Railway downtime** | 🔴 Magas – app nem elérhető | 🟢 Alacsony | - Elfogadott 95% uptime<br>- Downtime esetén kommunikáció pilottal (Slack/Email)<br>- Kritikus demo időpontok előtt manuális health check | Multi-region deployment, status page |
| **PostgreSQL data loss / backup hiba** | 🔴 Magas – adatvesztés | 🟢 Alacsony | - Managed DB daily backup<br>- Heti 1 manuális restore-teszt (pl. külön DB-be) | Hourly backup, PITR, multi-region |
| **Env leak** (.env commit) | 🔴 Magas – API key szivárgás | 🟡 Közepes | - .env gitignore, .env.example<br>- Dev folyamat része: commit előtti ellenőrzés | Secret scanning (GitHub), secrets manager |
| **Deploy failure** (build error, crash) | 🟡 Közepes | 🟡 Közepes | - Minden deploy után manuális smoke test (login, AI generálás, 1 test publish) | CI/CD + automatizált E2E smoke tesztek, rollback |

---

### R1.3. Data Security & Privacy Risks

| Kockázat | Impact | Valószínűség | Mitigation (P0) | P1 bővítés |
|----------|--------|--------------|-----------------|------------|
| **Meta access token kompromittálódása** | 🔴 Magas – spam poszt publikálható | 🟢 Alacsony | - Column-level encryption (AES-256)<br>- Token scope minimalizálása | Secrets manager, token rotation, audit log |
| **Password brute-force** | 🟡 Közepes | 🟢 Alacsony | - Bcrypt (cost 12), erős jelszó policy | Login rate limiting, CAPTCHA, 2FA |
| **SQL injection** | 🔴 Magas | 🟢 Alacsony | - Prisma ORM, prepared statements<br>- Zod validation minden inputra | Extra security review, penetration test |
| **XSS** (poszt szöveg, TOV, brand név) | 🟡 Közepes | 🟢 Alacsony | - React auto-escape<br>- HTML tag-ek strip TOV/brand mezőkben | Szigorúbb sanitization, security header hardening |

**P0 konklúzió:** security „elég jó" egy kis létszámú, ismert pilot user-csapatnak. P1-ben jön a hardening (2FA, audit log, security audit).

---

## R2: Business & Product Risks (Üzleti Kockázatok)

### R2.1. Hypothesis Invalidation Risks (H1–H3)

| Hipotézis kockázat | Impact | Valószínűség | Detect | Mitigation |
|--------------------|--------|--------------|--------|------------|
| **H1 fail:** Brand Brain v1 túl bonyolult / nem töltik ki | 🔴 Magas | 🟡 Közepes | Brand Brain completion rate márkánként, setup idő mérése | Mezők számának csökkentése, wizard flow, „lite setup" mód; P1-ben AI-assisted Brand Brain (példaposzt → TOV kivonat) |
| **H2 fail:** Időmegtakarítás <20% | 🔴 Magas | 🟡 Közepes | Baseline vs. 4–6. hét időmérés (per márka) | AI output javítás (prompt/model), UX friction csökkentése a naptárban, felesleges lépések elhagyása |
| **H3 fail:** AI output nem használható (heavy_edit + not_usable >60%) | 🔴 Magas | 🟡 Közepes | Usability rating dashboard per brand | Prompt tuning, Brand Brain finomítás, modell csere (GPT ↔ Claude), P1-ben multi-variáns generálás és best-of selection |

**Döntési szabály:**
- Ha **2 hipotézis bukik egyszerre** (pl. H1 + H3), akkor **pivot/stop kérdést kell napirendre tűzni**.
- Ha csak 1 bukik, akkor először **dedikált iterációs sprint**, és csak utána döntés.

---

### R2.2. Pilot Recruitment & Execution Risks

| Kockázat | Impact | Valószínűség | Detect | Mitigation |
|----------|--------|--------------|--------|------------|
| **Nem sikerül 3–5 releváns pilot usert bevonni** | 🔴 Magas | 🟡 Közepes | 4. hétig aktív socialosok száma | Célzott outreach (network, szakmai csoportok), ösztönzők (ingyen használat, esettanulmány, workshop), threshold rugalmasítása (3 user is elég, de mélyen) |
| **Pilot user churn** (1–2 hét után abbahagyják) | 🟡 Közepes | 🟡 Közepes | WAU/MAU, poszt-szám brandenként | Weekly check-in hívások, gyors UX-fixek a blokkoló bugokra, világos onboarding (tutorial, guided tour) |
| **Pilot user túl „nice"** (pozitív szóban, de alacsony használat) | 🟡 Közepes | 🟡 Közepes | Magas NPS, alacsony WAU/poszt-szám | Anonim survey, objektív metrikák (usability rating, időmérés, retention) nagyobb súllyal esnek latba, mint „kedves szavak" |

---

### R2.3. Market & Competition Risks

| Kockázat | Impact | Valószínűség | Mitigation |
|----------|--------|--------------|------------|
| **Nagy incumbensek** (Buffer, Hootsuite) erősebb AI-feature-rel érkeznek | 🟡 Közepes | 🟡 Közepes | Fókusz: Agency-first, Brand Brain-first pozicionálás, magyar nyelv és lokális support; gyors reakció, ha releváns feature-t hoznak |
| **Meta policy változik** (AI jelölés kötelező) | 🟡 Közepes | 🟢 Alacsony | Már most tárolod az ai_generated flaget; ha policy jön, disclaimer / jelölés hozzáadása a posztokhoz |
| **AI/IP jogi bizonytalanság** | 🟢 Alacsony | 🟢 Alacsony | ToS-ben rögzíted: a tartalomért a user felel; P1-ben vizsgálható extra compliance, ha piaci igény lesz |

---

### R2.4. Pilot Design & Measurement Risk (ÚJ, kritikus)

**Kockázat:**
A pilot mérésének és designjának hibái miatt fals következtetést vonsz le:
- „úgy tűnik, működik" → scale, miközben a jel zajos;
- vagy „úgy tűnik, nem működik" → stop, miközben a termék jó lenne, csak a kísérlet volt rossz.

| Elem | Leírás |
|------|--------|
| **Jelek, hogy gond van** | - Időmérés sheet-ek hiányosak / össze-visszák<br>- NPS magas, de WAU/retention alacsony<br>- Usability rating „minden használható", de alig van valós poszt |
| **Detect** | 2–3. héten audit: időmérő sheet-ek, ratingek, WAU-k összevetése egymással és kvali interjúkkal |
| **Mitigation** | - Standardizált baseline és follow-up sheet<br>- Minimum minta: márkánként X db mért poszt<br>- Triangulation: NPS + usability + időmérés + retention együtt, nem külön-külön<br>- Ha az adatok ellentmondanak, előbb measurement fix, csak aztán stratégiai döntés |

---

## R3: Operational & Team Risks (Működési Kockázatok)

### R3.1. Development & Timeline Risks

| Kockázat | Impact | Valószínűség | Mitigation |
|----------|--------|--------------|------------|
| **Scope creep** (P1 featurek becsúsznak P0-ba) | 🟡 Közepes | 🔴 Magas | P0 scope lock; minden új ötletnél kontrollkérdés: „validálja-e H1/H2/H3-at?" Ha nem, P1 backlog; heti scope review |
| **Solo dev bottleneck** | 🔴 Magas | 🟡 Közepes | Tiszta kód (TS, kommentek), README + env dokumentáció; későbbi dev-onboarding felkészítése (minimális tudás-transzfer doksi) |
| **Technical debt felhalmozódás** | 🟡 Közepes | 🔴 Magas | Tudatos elfogadás P0-ban; TODO-k jelölése, P1 indulásakor 1–2 hét dedikált refactor-sprint beütemezése |

---

### R3.2. Support & Maintenance

| Kockázat | Impact | Valószínűség | Mitigation |
|----------|--------|--------------|------------|
| **Pilot user support overload** | 🟡 Közepes | 🟡 Közepes | Közös Slack/Discord csatorna; heti „office hours" slot(ok); FAQ/GYIK doksi folyamatos bővítése a visszatérő kérdésekből |
| **Bug-prioritás káosz** | 🟡 Közepes | 🟡 Közepes | Bug severity szintek: P0 (login, publish, data loss), P1 (UX irritáció), P2 (kozmetika); SLA: P0 24h, P1 3–5 nap, P2 backlog |

---

## R4: Key Dependencies (Kritikus Függőségek)

### R4.1. External Services

| Dependency | Criticality | Fallback / Mitigation | Learning-first fallback |
|------------|-------------|----------------------|------------------------|
| **Meta Graph API** | 🔴 Kritikus – publishing nélkül a fő value prop sérül | Version pinning, policy monitoring, staging app | Ha tartósan instabil: pilot cél átmenetileg AI + naptár + workflow tesztelése, publikálás a user oldalán (Meta Business Suite), miközben tovább méred az időmegtakarítást |
| **OpenAI / Anthropic** | 🔴 Kritikus – AI nélkül a fő differenciálás gyengül | Egy provider választása P0-ban, explicit költségkeret | Ha bármelyik provider kiesik: átmenetileg kevesebb generálás, nagyobb hangsúly a Calendar/Workflow-adoption mérésén; később dual-provider support |
| **Render / Railway** | 🔴 Kritikus – app elérhetőség | Managed hosting, backup, providerváltás dokumentálása | Ha hosszan down: lokális/dev környezetből Figma demo + UX-interjúk továbbvihetők, legalább kvali tanulás nem áll le |
| **SendGrid / Mailgun** | 🟡 Közepes | Switch egyik szolgáltatóról a másikra 1–2 óra configgal | Ha email down: ideiglenesen manuális jelszóreset / kézi invite pilot user-eknek |
| **Cloudinary / S3** | 🟡 Közepes | Storage provider váltás script-tel, csak URL-ek migrációja | Ha storage limit / outage: AI + text-only pilot-szakasz, a vizuál-dolgot később validálod, de a core flow (szöveg, naptár, approval) mérhető marad |

---

### R4.2. Internal Dependencies

| Dependency | Criticality | Mitigation |
|------------|-------------|------------|
| **Brand Brain data quality** | 🔴 Kritikus – rossz input → rossz AI output | Onboarding példákkal (mintakávézó), min. TOV karakterszám, min. key message szám, P1-ben AI-assisted setup |
| **Pilot user őszinteség** (rating, time tracking) | 🟡 Közepes | Transzparens kommunikáció a célokról; anonim survey; időmérés + rating + usage + NPS együtt értelmezve, nem különállóan |

---

## R5: Key Assumptions (Kulcs Feltételezések)

> **Ha ezek közül 1–2 nagyot bukik, az nem kicsi tweak, hanem potenciális major pivot.**

| Assumption | Impact ha invalid | Validation mód |
|------------|-------------------|----------------|
| **A1:** Socialosok nyitottak AI használatára | 🔴 Magas – adoption fail | Onboarding interjúk, NPS nyílt kérdések, valós usage vs. deklarált attitűd összevetése |
| **A2:** Brand Brain kitöltése <30 perc / márka | 🟡 Közepes – onboarding friction | Pilotban mért setup-idő márkánként (első alkalommal), completion rate |
| **A3:** Meta OAuth-hoz hozzáfér az a személy, aki a Creaitort használja | 🟡 Közepes | Előzetes egyeztetés ügynökséggel (admin rights), onboarding checklist |
| **A4:** Socialos fő eszköze desktop/laptop | 🟡 Közepes | Interjúk a munkakörnyezetről; ha mobil-first lenne, akkor P0 UI-fit gyenge |
| **A5:** Átlag 6 poszt/hét/márka a releváns tartománya | 🟢 Alacsony | Pilot alatt tényleges poszt-szám mérése márkánként; ha nagyon eltér, a time-saving számításokat korrigálni kell |

---

## Risks & Dependencies Összefoglalás

**Kiemelt killer riskek:**
1. **Meta Graph API instabilitás / policy-változás** → publishing leáll → a validáció fókusza áthelyezendő AI + Calendar irányba.
2. **H1–H3 hipotézisek bukása** → tudatos döntés: iterációs sprint vagy pivot/stop.
3. **Pilot recruitment / pilot design hibák** → fals PMF jel, ami rossz stratégiai döntéshez vezethet.

**Elfogadott P0 kompromisszumok:**
- 95% uptime, manual retry, monolit architektúra, desktop-only UI, limited security hardening – mindez pilot célú validációért cserébe.
- Technical debt tudatosan gyűlik, P1 elején refactor-sprinttel kezelendő.

**P0 → P1 átmenet feltétele:**
- H1–H3 legalább részben validált (usable AI output, mérhető időmegtakarítás, használati gyakoriság),
- ≥2–3 ügynökségi pilot user, akik nem csak szeretik, de **fizetnének is érte**,
- és a fenti killer-risk triggerek közül egyik sem aktív (vagy már kezelt állapotban van).

---
