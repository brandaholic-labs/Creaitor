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
   - Image generation API hívás (DALL-E, Midjourney API, Stable Diffusion)
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

11. **AI Visual Studio (képgenerálás)** (P1 marad)
    - **Alternatíva P0-ban:** Socialos feltölt saját képet
    - **Indok:** H1/H2 teszteléséhez kell AI copy, de képgenerálás opcionális. Ha nincs idő, v1.5-be.

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

**P1 Feature (nem P0):**
- Ha nincs idő, P1-be. P0-ban elég, ha socialos feltölt saját képet.

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

**Cél:** Ez a szekció részletesen leírja a Creaitor MVP funkcióit, feature-enként strukturálva. Minden feature tartalmazza:
- Input/Output specifikációt
- Üzleti szabályokat
- Validációs követelményeket
- Státuszgépeket (ahol releváns)
- P0/P1 határok pontos megjelölését

**Megjegyzés:** Ez NEM technikai implementációs spec (az a Tech Spec-be tartozik), hanem funkcionális követelmények - **mit csináljon a rendszer**, nem **hogyan**.

---

### FR1: Multi-Tenant Alaprendszer

#### FR1.1: Ügynökség Regisztráció és Profil

**P0 - Alapvető funkciók:**

| Input | Output | Üzleti szabály |
|-------|--------|----------------|
| Email, jelszó (regisztráció) | Ügynökség létrehozva, user session | Email unique, jelszó min. 8 karakter |
| Ügynökség név, opcionális leírás | Ügynökség profil mentve | Ügynökség név kötelező, max. 100 karakter |

**Validációs szabályok (P0):**
- Email formátum ellenőrzés (alapvető regex)
- Jelszó minimális hossz (8 karakter)
- Ügynökség név kötelező

**P1 - Bővített validáció:**
- Jelszó erősség ellenőrzés (kis/nagy betű, szám, speciális karakter)
- Email domain blacklist (disposable email címek kiszűrése)
- Ügynökség profil további mezők (cím, telefonszám, VAT szám)

---

#### FR1.2: User Management (Ügynökségen belüli userek)

**P0 - Alapvető funkciók:**

| Input | Output | Üzleti szabály |
|-------|--------|----------------|
| Email cím (meghívás) | Meghívó email elküldve, pending user created | User max. 1 ügynökséghez tartozhat (MVP-ben) |
| Meghívó link kattintás + jelszó beállítás | User aktiválva, hozzáadva ügynökséghez | Link 7 napig érvényes |

**User hierarchy (P0):**
```
Ügynökség (Agency)
  └─ User 1 (Admin - owner)
  └─ User 2 (Socialos - meghívott)
  └─ User 3 (Socialos - meghívott)
```

**Jogosultságok (P0 - egyszerű):**
- **Admin (owner):** Minden funkció elérhető (user meghívás, márka CRUD, poszt CRUD, publishing)
- **Socialos (meghívott):** Minden funkció elérhető (MVP-ben nincs megkülönböztetés)

**P0 megjegyzés:** MVP-ben nincs finomhangolt jogosultság-kezelés. Ha user ugyanabban az ügynökségben van, mindent lát és csinálhat. Ez elég 5-10 pilot ügynökséghez (kis csapatok, magas bizalmi szint).

**P1 - Fine-grained permissions:**
- **Szerepkörök:** Admin, Editor, Viewer
- **Brand-specifikus jogosultságok:** User csak egyes márkákat láthat/szerkeszthet
- **Approval chain szintek:** Ki küldhet review-ra, ki approve-olhat

---

#### FR1.3: Márka (Brand) Management

**P0 - Alapvető funkciók:**

| Input | Output | Üzleti szabály |
|-------|--------|----------------|
| Márka név, opcionális leírás | Márka létrehozva | Márka név kötelező, max. 100 karakter |
| FB Page OAuth flow | FB Page ID, name, access token tárolva | Token refresh logic |
| IG Account OAuth flow | IG Account ID, username, access token tárolva | IG Business Account kötelező (nem personal) |

**Márka adatmodell (P0):**
```
Brand {
  id: UUID
  agency_id: UUID (foreign key)
  name: String (kötelező)
  description: String (opcionális)
  fb_page_id: String (opcionális - Meta OAuth után)
  fb_page_name: String
  fb_access_token: String (encrypted)
  ig_account_id: String (opcionális)
  ig_username: String
  ig_access_token: String (encrypted)
  brand_brain: JSON (Brand Brain v1 adatok)
  created_at: Timestamp
  updated_at: Timestamp
  archived_at: Timestamp (null = aktív)
}
```

**Üzleti szabályok (P0):**
- Márka csak akkor publisholhat, ha FB Page ID VAGY IG Account ID csatolva van
- Token lejárat: Ha Meta API 401/403 hibát ad → user újra csatolja a profilt (OAuth flow újra)
- Márka archiválás: Logikai törlés (archived_at timestamp), de adat megmarad (nem hard delete)

**P1 - Bővített funkciók:**
- Meta token auto-refresh (long-lived token kezelés)
- Márka státuszok (Active / Paused / Archived)
- Márka csoportosítás / tagging (pl. "Horeca", "E-commerce")

---

### FR2: Brand Brain v1 - Márka Tudásbázis

**Cél:** Strukturált márka-specifikus kontextus tárolása, amit az AI Copy Studio használ a generáláshoz.

#### FR2.1: Brand Brain Adatmodell (P0)

**Brand Brain JSON struktúra:**
```json
{
  "tone_of_voice": {
    "description": "Barátságos, közvetlen, nem túl formális...",
    "character_count": 450
  },
  "key_messages": [
    "Helyi, frissen pörkölt kávé",
    "Cozy, otthonos légkör",
    "Támogatjuk a fenntartható beszerzést"
  ],
  "reference_posts": [
    {
      "text": "☕️ Friss pörkölés! Guatemalai single origin...",
      "source": "manual_input",
      "created_at": "2025-01-15T10:00:00Z"
    },
    {
      "text": "🌿 Fenntarthatóság nálunk nem buzzword...",
      "source": "manual_input",
      "created_at": "2025-01-15T10:05:00Z"
    }
  ],
  "visual_direction": {
    "description": "Meleg, földközeli színek. Otthonos, nem túl steril...",
    "character_count": 120
  },
  "brand_assets": {
    "logo_url": null,
    "primary_colors": [],
    "font_family": null
  }
}
```

**Validációs szabályok (P0):**
- TOV description: Max. 1000 karakter (ajánlott 200-500)
- Key Messages: Min. 1, max. 10 darab, minden max. 200 karakter
- Reference Posts: Min. 0, max. 5 darab, minden max. 5000 karakter
- Visual Direction: Max. 1000 karakter (ajánlott 100-300)

**P0 megjegyzés:** Nincs kötelező mező validáció. Ha user üres Brand Brain-t ment, az elmentődik - ennek következménye gyenge AI output (lásd Edge Case 1). Ez szándékos: validáljuk H1 hipotézist (elég-e a Brand Brain v1).

**P1 - Bővített validáció:**
- Kötelező mezők: TOV + min. 1 Key Message
- Warning, ha Brand Brain "túl vékony" (pl. TOV < 100 karakter)
- Brand voice scoring (AI elemzi a példaposztokat és TOV konzisztenciát)

---

#### FR2.2: Brand Brain CRUD Műveletek (P0)

| Művelet | Input | Output | Üzleti szabály |
|---------|-------|--------|----------------|
| Create | Brand ID + Brand Brain JSON | Brand Brain mentve | Brand létrehozásakor üres JSON default |
| Read | Brand ID | Brand Brain JSON | User csak saját ügynökség márkáit látja |
| Update | Brand ID + módosított Brand Brain JSON | Brand Brain frissítve | Verzió history NEM P0 (P1: verziókezelés) |
| Delete | N/A | N/A | Brand Brain NEM törölhető, csak üríthető (update üres JSON-nel) |

**Státuszgép:** Nincs (Brand Brain nincs jóváhagyási workflow, user szabadon szerkeszti)

---

### FR3: AI Copy Studio - Szöveggenerálás

**Cél:** AI-alapú poszt szöveg generálás Brand Brain kontextussal.

#### FR3.1: Poszt Generálás Flow (P0)

**Input:**
```json
{
  "brand_id": "uuid",
  "brief": "Bemutató az új guatemalai single origin kávénkról",
  "platform": "facebook", // vagy "instagram"
  "content_type": "product_showcase" // opcionális (P1)
}
```

**AI Prompt Construction (P0):**
```
System role: "Te egy tapasztalt social media copywriter vagy."

User prompt template:
"
Írj egy Facebook posztot a következő márka számára:

**Márka Tone of Voice:**
{brand_brain.tone_of_voice.description}

**Márka Key Messages:**
{brand_brain.key_messages[0]}
{brand_brain.key_messages[1]}
...

**Példaposztok (referencia):**
{brand_brain.reference_posts[0].text}
{brand_brain.reference_posts[1].text}

**Poszt téma / brief:**
{brief}

**Platform:** {platform} (Facebook: max 500 karakter, Instagram: max 300 karakter ajánlott)

Generálj 1 posztot, ami tükrözi a márka hangját. Ne használj hashtageket (azt a user külön adja hozzá).
"
```

**Output:**
```json
{
  "generated_text": "☕️ Friss pörkölés! Guatemalai single origin érkezett...",
  "character_count": 180,
  "generation_metadata": {
    "model": "gpt-4o",
    "tokens_used": 450,
    "generation_time_ms": 1200,
    "timestamp": "2025-01-18T14:30:00Z"
  }
}
```

**Üzleti szabályok (P0):**
- Brief min. 10 karakter, max. 1000 karakter
- Platform választás kötelező (facebook VAGY instagram)
- AI timeout: 30 másodperc (ha tovább tart → error, retry lehetőség)
- Ha Brand Brain üres → AI generálás megtörténik, de warning log (analytics célra)

**P1 - Bővített funkciók:**
- Multi-variáns generálás (2-3 szöveg egyszerre)
- Content type automatikus javaslat (AI elemzi a brief-et)
- Hashtag automatikus javaslat
- Regenerálás gomb (új variáns ugyanazzal a brief-fel)
- AI modell választás (GPT-4o, Claude Sonnet, stb.)

---

#### FR3.2: Poszt Szerkesztés és Mentés (P0)

**Inline szerkesztés:**
- User szerkesztheti az AI-generált szöveget (contenteditable div vagy textarea)
- Character count real-time frissítés (P1 - P0-ban nincs)
- Mentés draft-ba gomb

**Használhatósági Rating (P0 - KÖTELEZŐ):**

Amikor user menti a posztot (draft-ba vagy publishra), kötelező jelölés:

| Rating | Jelentés | Backend érték |
|--------|----------|---------------|
| "Rendben, kisebb módosítással" | Használható, apró szerkesztés | `usable` |
| "Nagy átdolgozás kellett" | Részben használható, jelentős szerkesztés | `heavy_edit` |
| "Nem használható, újat írtam" | Nem használható, user újraírta | `not_usable` |

**Mentés:**
```json
{
  "post_id": "uuid",
  "brand_id": "uuid",
  "text": "Szerkesztett poszt szöveg...",
  "platform": "facebook",
  "ai_generated": true,
  "usability_rating": "usable", // kötelező, ha ai_generated = true
  "image_url": null, // P0: feltöltött kép URL
  "scheduled_at": null,
  "status": "draft"
}
```

**Validációs szabályok (P0):**
- Poszt szöveg max. 10,000 karakter (Facebook API limit)
- Usability rating kötelező, ha `ai_generated = true`
- Platform kötelező

---

### FR4: Image Management (Kép kezelés)

#### FR4.1: Saját Kép Feltöltés (P0)

**Input:**
- Kép fájl (JPEG, PNG, max. 10MB)
- Post ID (melyik poszthoz tartozik)

**Output:**
- Image URL (tárolva cloud storage-ben, pl. S3)
- Automatikus optimalizálás: resize 1200x630 (FB) vagy 1080x1080 (IG) aspect ratio-ra

**Üzleti szabályok (P0):**
- Max. 1 kép / poszt (P1: carousel support - multi-image)
- Támogatott formátumok: JPEG, PNG (P1: GIF, WebP)
- Max. fájlméret: 10MB
- Kép törlés: Ha poszt törlődik, kép is törlődik (cascade delete)

**P1 - AI Visual Studio:**
- Képgenerálás AI-val (DALL-E, Midjourney API)
- Brand Visual Direction kontextussal
- 2-3 képvariáns generálás

---

### FR5: Content Calendar - Tartalomnaptár

#### FR5.1: Naptár Nézetek (P0)

**Heti nézet (P0):**
- Input: Brand ID, week start date (default: current week)
- Output: 7 nap (Mon-Sun), minden napra FB/IG slotok listája

**Adatmodell:**
```json
{
  "week": "2025-01-20", // week start (Monday)
  "brand_id": "uuid",
  "posts": [
    {
      "post_id": "uuid",
      "date": "2025-01-20",
      "time": "10:00",
      "platform": "facebook",
      "status": "draft",
      "text_preview": "Friss pörkölés! Guatemalai..."
    },
    {
      "post_id": "uuid",
      "date": "2025-01-21",
      "time": "14:00",
      "platform": "instagram",
      "status": "scheduled",
      "text_preview": "☕️ Hétvégi relax..."
    }
  ]
}
```

**P1 - Havi nézet:**
- 30-31 nap grid nézet
- Összesített poszt count naponta

---

#### FR5.2: Poszt Slotok és Státuszok (P0)

**Poszt státuszgép (P0):**

```
Draft → Approved → Scheduled → Published
  ↓                    ↓
Failed ←──────────────┘
  ↓
Draft (retry után)
```

| Státusz | Jelentés | Átmenet | Ki indíthatja? |
|---------|----------|---------|----------------|
| `draft` | Szerkesztés alatt | → `approved` (Approve gomb) | User (socialos) |
| `approved` | Jóváhagyva, ütemezésre kész | → `scheduled` (Schedule gomb) | User |
| `scheduled` | Ütemezve, várja a publikálást | → `published` (auto, időben) / → `failed` (hiba) | System (cron job) |
| `published` | Sikeresen publikálva | (végállapot) | System |
| `failed` | Publikálás sikertelen | → `draft` (Retry gomb) / → `scheduled` (Retry + reschedule) | User |

**P0 megjegyzés:** Nincs `review` státusz (multi-user approval P1). P0-ban `draft` → `approved` az ugyanaz a user.

**P1 - Multi-user approval:**
```
Draft → Review → Approved → Scheduled → Published
  ↑       ↓
  └──── Rejected
```

---

#### FR5.3: Drag & Drop vs. Manuális Dátum Választás (P0)

**P0 - Elég az egyik:**
- **Opció A:** Drag & drop (poszt húzása naptár slotokra)
- **Opció B:** Manuális dátum/időpont választás (datetime picker)

**Döntési pont:** UX design során eldöntjük, melyik egyszerűbb implementálni. Mindkettő validálja a hipotézist (H2 - workflow adoption).

**P1:** Mindkettő támogatása (drag&drop + manuális override is)

---

### FR6: Approval Workflow

#### FR6.1: Pseudo-Approval (P0)

**Self-approval flow:**
1. User létrehoz egy posztot → `draft`
2. User kattint "Approve" gombra → `approved`
3. User kattint "Schedule" / "Publish" gombra → `scheduled` vagy `published`

**Üzleti szabály (P0):**
- Nincs ellenőrzés, hogy ki approve-olja (ugyanaz a user is teheti)
- Cél: Workflow átmenet tesztelése (draft → approved → scheduled), nem robusztus approval chain

**P1 - Multi-user approval:**
- User A (socialos): Draft → "Send to review" → `review`
- User B (account manager): Review → "Approve" / "Reject" → `approved` / `draft`
- Comment thread (feedback poszt-szinten)
- Notification (in-app + email)

---

### FR7: Publishing & Scheduling

#### FR7.1: Meta Graph API Integráció (P0)

**FB Page Publishing:**
- Endpoint: `POST /{page-id}/feed`
- Params: `message`, `published` (true/false), `scheduled_publish_time` (unix timestamp)
- Response: `post_id`, `permalink_url`

**IG Account Publishing:**
- Endpoint: `POST /{ig-user-id}/media` (create container) → `POST /{ig-user-id}/media_publish` (publish)
- Params: `caption`, `image_url`
- Response: `media_id`, `permalink`

**Token Management (P0):**
- Access token tárolása (encrypted)
- Ha API 401/403 → user újra OAuth flow-t futtat (token refresh P1)

**Rate Limiting (P0 alapvető):**
- Facebook: 200 calls / hour (platform level)
- Ha rate limit elérve → error message: "Túl sok kérés. Próbáld újra 10 perc múlva."
- P1: Queue kezelés, auto rate limit detection

---

#### FR7.2: Scheduling Mechanizmus (P0)

**Két opció (elég az egyik P0-ban):**

**Opció A: Instant Publish**
- User kattint "Publish Now" → azonnal Meta API hívás
- Státusz: `approved` → `published` vagy `failed`

**Opció B: Manual Schedule**
- User választ dátum/időpontot → `scheduled`
- Cron job (5 percenként futtatva):
  ```
  SELECT * FROM posts
  WHERE status = 'scheduled'
  AND scheduled_at <= NOW()
  ```
- Meta API hívás minden ilyen posztra
- Státusz: `scheduled` → `published` vagy `failed`

**P0 Retry Logic (manual):**
- Ha `failed` → user kattint "Retry" gomb
- Poszt újra `scheduled` (vagy instant publish újrapróbálás)

**P1 - Background Job Queue:**
- Sidekiq / Bull / BullMQ
- Automatikus retry (3x, exponential backoff)
- Job monitoring dashboard

---

#### FR7.3: Publikálás Eredménye (P0)

**Sikeres publikálás:**
```json
{
  "status": "published",
  "published_at": "2025-01-20T10:05:30Z",
  "fb_post_id": "123456789_987654321",
  "permalink": "https://facebook.com/..."
}
```

**Sikertelen publikálás:**
```json
{
  "status": "failed",
  "error_code": "OAuthException",
  "error_message": "Meta API hiba: token lejárt. Csatold újra a profilt!",
  "failed_at": "2025-01-20T10:05:30Z"
}
```

**Error handling (P0):**
- Token expire → error message + user újra OAuth
- Rate limit → error message + retry guidance
- Invalid content (Meta policy violation) → error message (user módosítja a szöveget/képet)

---

### FR8: Instrumentation & Usage Tracking

#### FR8.1: Backend Event Logging (P0)

**Tracked Events:**

| Event | Params | Cél |
|-------|--------|-----|
| `user_login` | user_id, timestamp | Session tracking |
| `page_view` | user_id, page_name, timestamp | Usage pattern |
| `brand_created` | user_id, brand_id, timestamp | Adoption metrics |
| `ai_generation` | user_id, brand_id, post_id, generation_time_ms, timestamp | AI usage count |
| `post_saved` | user_id, brand_id, post_id, status, usability_rating, timestamp | Content creation metrics |
| `post_published` | user_id, brand_id, post_id, platform, timestamp | Publishing metrics |
| `post_failed` | user_id, brand_id, post_id, error_code, timestamp | Error tracking |

**Adattárolás (P0):**
- Events table (relational DB vagy analytics DB)
- Retention: 12 hónap (pilot után döntés)

**P1 - Real-time dashboard:**
- Socialos-facing insights
- Grafikonok, trend vizualizációk

---

#### FR8.2: Használhatósági Rating Aggregáció (P0)

**Admin Dashboard (P0 - backend only, nincs szép UI):**

```sql
SELECT
  brand_id,
  COUNT(*) as total_ai_posts,
  SUM(CASE WHEN usability_rating = 'usable' THEN 1 ELSE 0 END) as usable_count,
  SUM(CASE WHEN usability_rating = 'heavy_edit' THEN 1 ELSE 0 END) as heavy_edit_count,
  SUM(CASE WHEN usability_rating = 'not_usable' THEN 1 ELSE 0 END) as not_usable_count
FROM posts
WHERE ai_generated = true
GROUP BY brand_id
```

**Output (CSV export vagy egyszerű táblázat):**
| Brand | Total AI Posts | Usable % | Heavy Edit % | Not Usable % |
|-------|----------------|----------|--------------|--------------|
| Kis Kávézó | 24 | 70% (16) | 25% (6) | 5% (1) |
| Fitness XY | 18 | 60% (11) | 30% (5) | 10% (2) |

**P1:** Szép UI socialosoknak, márka-szintű insights

---

### FR9: Data Model Summary (P0 Core Entities)

**Entitások és kapcsolatok:**

```
Agency (Ügynökség)
  ├─ id: UUID (PK)
  ├─ name: String
  ├─ owner_email: String
  └─ created_at: Timestamp

User
  ├─ id: UUID (PK)
  ├─ agency_id: UUID (FK → Agency)
  ├─ email: String (unique)
  ├─ role: Enum (admin, socialos) - P1
  └─ created_at: Timestamp

Brand
  ├─ id: UUID (PK)
  ├─ agency_id: UUID (FK → Agency)
  ├─ name: String
  ├─ fb_page_id: String
  ├─ ig_account_id: String
  ├─ brand_brain: JSON
  └─ created_at: Timestamp

Post
  ├─ id: UUID (PK)
  ├─ brand_id: UUID (FK → Brand)
  ├─ user_id: UUID (FK → User) - creator
  ├─ text: Text
  ├─ platform: Enum (facebook, instagram)
  ├─ status: Enum (draft, approved, scheduled, published, failed)
  ├─ ai_generated: Boolean
  ├─ usability_rating: Enum (usable, heavy_edit, not_usable)
  ├─ image_url: String
  ├─ scheduled_at: Timestamp
  ├─ published_at: Timestamp
  ├─ fb_post_id: String
  ├─ ig_media_id: String
  └─ created_at: Timestamp

Event (Analytics)
  ├─ id: UUID (PK)
  ├─ user_id: UUID (FK → User)
  ├─ event_type: String
  ├─ event_data: JSON
  └─ timestamp: Timestamp
```

**P0 megjegyzés:** Nincs `Comment`, `Approval`, `Campaign` entitás (ezek P1).

---

### Functional Requirements Összefoglalás

| Feature Area | P0 Core Funkciók | P1 Bővítés |
|--------------|------------------|------------|
| **Multi-Tenant** | Ügynökség reg, user meghívás, márka CRUD, egyszerű jogosultságok | Fine-grained permissions, szerepkörök, audit log |
| **Brand Brain** | TOV, Key Messages, Példaposztok, Vizuális irány (JSON tárolás) | Brand asset upload, RAG, brand voice scoring |
| **AI Copy Studio** | Brief input, 1 variáns generálás, inline szerkesztés, usability rating | Multi-variáns, hashtag javaslat, regenerálás |
| **Image** | Saját kép feltöltés, resize | AI Visual Studio (képgenerálás) |
| **Calendar** | Heti nézet, poszt slotok, státuszok | Havi nézet, drag&drop (ha P0-ban nincs), campaign management |
| **Approval** | Pseudo-approval (self-approval) | Multi-user review, comment thread, notifications |
| **Publishing** | Meta API, instant VAGY scheduling, manual retry | Background job queue, auto retry, job monitoring |
| **Instrumentation** | Backend event logging, usability rating aggregáció (admin-only) | Socialos-facing dashboard, vizualizációk |

---

## Non-Functional Requirements (NFR)

> **NFR filozófia (P0):** "Elég jó" egy 5-10 fős pilothoz, nem "production-ready" milliós skálára. Hipotézis-validálás a cél, nem SLA-k teljesítése.

---

### NFR1: Performance (Teljesítmény)

#### NFR1.1: Response Time (P0)

**User-facing műveletek:**

| Művelet | P0 Target | P1 Target | Mérhető? |
|---------|-----------|-----------|----------|
| **Page Load** (Calendar, Brand Brain) | < 3 sec (első betöltés) | < 1 sec | ✅ Browser DevTools |
| **AI Copy Generation** | < 10 sec (90th percentile) | < 5 sec | ✅ Backend timer |
| **Post Save** (Draft / Edit) | < 2 sec | < 1 sec | ✅ Backend timer |
| **Meta API Publish** | < 5 sec (sikeres poszt) | < 3 sec | ✅ Backend timer |

**P0 megjegyzés:**
- Nincs SLA (Service Level Agreement)
- Ha AI generálás 15-20 sec → elfogadható (LLM latency, nem optimalizálunk)
- Ha Meta API 10 sec → elfogadható (external dependency)

**P1 - Optimalizáció:**
- Caching (Redis)
- CDN (static assets)
- Database indexing
- Background job queue (publishing offload)

---

#### NFR1.2: Throughput (P0)

**Pilot skála (5-10 user, 3-5 brand):**
- **Concurrent users:** 5-10 (nem kell load balancing)
- **AI generálás:** 50-100 poszt / nap (10 user × 5-10 poszt / nap)
- **Publishing:** 30-50 poszt / hét (6-10 poszt / márka / hét)

**P0 validáció:** Ha pilot során 10 user problémamentesen használja → elég.

**P1 - Skálázás (100+ user):**
- Horizontal scaling (multiple app servers)
- Database read replicas
- Queue system (Sidekiq, BullMQ)
- Rate limiting (per-user API limits)

---

### NFR2: Security (Biztonság)

#### NFR2.1: Authentication & Authorization (P0)

**Authentication:**
- Email/password (bcrypt hash, min 12 chars, 1 uppercase, 1 szám)
- Session-based auth (HTTP-only cookie, 7 nap expiry)
- Nincs 2FA (P1)

**Authorization:**
- Agency-level isolation (user csak saját agency adatait látja)
- User-level permission (P0: egyszerű - minden user látja az agency összes márkáját)
- P1: Fine-grained permissions (márka-szintű hozzáférés korlátozás)

**Password Reset:**
- Email-based token (1 órás expiry, egyszer használható)
- SMTP email küldés (SendGrid / Mailgun)

---

#### NFR2.2: Data Protection (P0)

**Adatbiztonság:**

| Adat Típus | P0 Védelem | P1 Bővítés |
|------------|------------|------------|
| **Jelszó** | bcrypt hash (cost 12) | Argon2id |
| **Meta Access Token** | Database-level encryption (AES-256) | Secrets manager (AWS Secrets Manager, Vault) |
| **Brand Brain JSON** | Nincs külön titkosítás (nem érzékeny adat) | - |
| **User Email** | Nincs titkosítás (szükséges login-hez) | - |

**HTTPS (P0):**
- SSL/TLS certificate (Let's Encrypt)
- Minden API endpoint HTTPS-only
- Nincs HTTP fallback

**P0 megjegyzés:** Nincs SOC2, ISO27001, GDPR-ready audit trail. Pilot fázisban nem szükséges.

---

#### NFR2.3: API Security (P0)

**Meta OAuth Token tárolás:**
- Access token encrypted (database column encryption)
- Refresh token (P1 - token refresh mechanizmus)
- Ha token kompromittálódik → user újra OAuth flow

**SQL Injection védelem:**
- ORM használat (Prisma, TypeORM, Sequelize)
- Prepared statements (minden query)

**XSS védelem:**
- Input sanitization (post text, brand name, TOV)
- React auto-escape (JSX)

**CSRF védelem:**
- CSRF token (form submission)
- SameSite cookie flag

**P1 - Audit Log:**
- Minden kritikus művelet naplózása (user login, brand deletion, token refresh)
- Retention: 12 hónap

---

### NFR3: Scalability (Skálázhatóság)

#### NFR3.1: Pilot Skála (P0)

**MVP támogatott volumen:**
- **Ügynökség:** 1-3 agency (nem multi-tenant infra)
- **User:** 5-15 user
- **Márka:** 5-10 brand
- **Poszt:** 500-1000 poszt (3 hónapos pilot, ~50 poszt/hét)

**Infrastruktúra (P0):**
- Single-server deployment (Render, Railway, Fly.io)
- PostgreSQL (single instance, no replicas)
- Nincs Redis, nincs CDN
- Nincs auto-scaling

**P0 megjegyzés:** Ha 10 user használja probléma nélkül → sikeres pilot. Nem kell 1000 user-re skálázni.

---

#### NFR3.2: Post-Pilot Skálázás (P1)

**Target skála (Post-PMF):**
- **Ügynökség:** 50-100 agency
- **User:** 200-500 user
- **Márka:** 500-1000 brand
- **Poszt:** 50k-100k poszt / év

**Infrastruktúra bővítés (P1):**
- Horizontal scaling (Kubernetes, Docker Swarm)
- Database read replicas
- Redis cache layer
- CDN (Cloudflare, AWS CloudFront)
- Background job queue (Sidekiq, BullMQ)
- Monitoring (Datadog, New Relic)

---

### NFR4: Reliability & Availability (Megbízhatóság)

#### NFR4.1: Uptime (P0)

**P0 Target:**
- **Uptime:** 95% (pilot során)
- **Planned downtime:** Max 2 óra / hét (deployment, maintenance)
- **Incident response:** Best-effort (nincs 24/7 support)

**P0 megjegyzés:** Ha pilot során 1-2 downtime incidens van (összesen 3-4 óra) → elfogadható. Nem kell 99.9% SLA.

**P1 - Production SLA:**
- 99.5% uptime (43 perc downtime / hónap)
- Status page (status.creaitor.io)
- Incident postmortem

---

#### NFR4.2: Error Handling (P0)

**Backend error handling:**

| Hiba Típus | P0 Viselkedés | User Feedback |
|------------|---------------|---------------|
| **AI API hiba** (timeout, rate limit) | Retry 1x, ha sikertelen → error message | "AI generálás sikertelen. Próbáld újra!" |
| **Meta API hiba** (token expire, rate limit) | No auto retry, user manuális retry | "Publikálás sikertelen: token lejárt. Csatold újra a profilt!" |
| **Database hiba** (connection timeout) | App crash (restart automatikusan) | 500 error page: "Hiba történt. Próbáld újra 1 perc múlva." |
| **File upload hiba** (nagy fájl, invalid format) | Validation error | "Kép túl nagy (max 10MB) vagy invalid formátum." |

**Frontend error boundary:**
- React Error Boundary (catch UI crashes)
- Fallback UI: "Valami hiba történt. Frissítsd az oldalt!"

**P0 megjegyzés:** Nincs robust retry logic, nincs exponential backoff, nincs circuit breaker. Egyszerű error message + manual retry.

**P1 - Error Monitoring:**
- Sentry / Rollbar (exception tracking)
- Alerting (Slack / email notifikáció kritikus hibáknál)
- Error dashboards

---

#### NFR4.3: Data Backup & Recovery (P0)

**Backup stratégia (P0):**
- **PostgreSQL:** Daily backup (Render / Railway auto-backup)
- **Retention:** 7 nap
- **Recovery:** Manual restore (best-effort, nincs automatikus failover)

**P0 megjegyzés:** Ha adatvesztés történik (< 24 óra) → pilot során elfogadható. Nem kell multi-region replication.

**P1 - Production Backup:**
- Hourly backup
- 30 napos retention
- Point-in-time recovery (PITR)
- Multi-region replication

---

### NFR5: Usability (Használhatóság)

#### NFR5.1: Browser Support (P0)

**Támogatott böngészők:**
- Chrome (latest 2 verzió)
- Firefox (latest 2 verzió)
- Safari (latest 2 verzió)
- Edge (latest 2 verzió)

**Nincs támogatás (P0):**
- IE11
- Régi Safari (iOS < 14)
- Mobile böngészők (Chrome Mobile, Safari Mobile) → P1

**P0 megjegyzés:** Desktop-first. Ha pilot során valaki mobilon próbálja használni → "Desktop böngészőben nyisd meg!"

---

#### NFR5.2: Responsive Design (P0)

**P0 - Desktop only:**
- Optimalizálva 1920×1080, 1366×768 felbontásra
- Tablet (768px - 1024px): Best-effort (nem tesztelünk)
- Mobile (< 768px): Nincs támogatás (broken UI → elfogadható)

**P1 - Mobile-first:**
- Teljes responsive design (Tailwind breakpoints)
- Mobile app (React Native / Flutter)

---

#### NFR5.3: Accessibility (P0)

**P0 - Alapvető:**
- Keyboard navigation (Tab, Enter működik form-okban)
- Alt text képeknél (user-uploaded images → user felelőssége)
- Nincs WCAG 2.1 AA compliance

**P1 - WCAG 2.1 AA:**
- Screen reader support
- Contrast ratio compliance
- ARIA labels

---

### NFR6: Maintainability (Karbantarthatóság)

#### NFR6.1: Code Quality (P0)

**P0 - Alapvető clean code:**
- ESLint / Prettier (auto-format)
- TypeScript (strict mode)
- Nincs unit test coverage target (< 30% → elfogadható)
- Nincs code review kötelezettség (solo dev / kis csapat)

**P1 - Production-grade:**
- Unit test (80% coverage)
- E2E test (Playwright, Cypress)
- Code review (PR approval required)
- CI/CD pipeline (automated testing)

---

#### NFR6.2: Documentation (P0)

**P0 - Minimális:**
- README.md (setup instructions)
- `.env.example` (környezeti változók listája)
- API endpoints (inline code comments)
- Nincs külső dokumentáció (Notion, Confluence)

**P1 - Comprehensive:**
- API dokumentáció (Swagger / OpenAPI)
- Onboarding guide (új developer számára)
- Runbook (deployment, troubleshooting)

---

#### NFR6.3: Monitoring & Observability (P0)

**P0 - Alapvető logging:**
- Console logs (backend)
- Browser console (frontend)
- Nincs centralized logging (Datadog, Splunk)
- Nincs APM (Application Performance Monitoring)

**P1 - Production monitoring:**
- Datadog / New Relic (APM)
- LogDNA / Papertrail (log aggregation)
- Uptime monitoring (Pingdom, UptimeRobot)
- Alert dashboards (Slack integration)

---

### NFR7: Data & Compliance

#### NFR7.1: Data Retention (P0)

**Retention policy:**
- **User data:** Korlátlan (nincs auto-delete)
- **Post data:** Korlátlan
- **Event logs:** 12 hónap (után manuális törlés)
- **Backup:** 7 nap

**P0 megjegyzés:** Nincs GDPR "right to be forgotten" automatizmus. Ha user kéri → manuális deletion.

**P1 - GDPR compliance:**
- User deletion request (self-service)
- Data export (JSON export)
- Cookie consent banner
- Privacy policy + Terms of Service

---

#### NFR7.2: GDPR & Privacy (P0)

**P0 - Minimális:**
- Email tárolás (login céljából)
- Meta access token tárolás (titkosítva)
- Nincs analytics cookie (Google Analytics, Mixpanel)
- Nincs third-party tracking

**P0 megjegyzés:** Pilot során nincs GDPR audit. Ha user kérdez → manuális válasz.

**P1 - GDPR-ready:**
- Cookie banner (Cookiebot, OneTrust)
- Privacy policy (lawyer-reviewed)
- Data Processing Agreement (DPA)
- Audit trail (user data hozzáférés)

---

### NFR8: Deployment & DevOps (P0)

#### NFR8.1: Hosting & Infrastructure (P0)

**Platform:**
- **Backend + Frontend:** Render / Railway / Fly.io (single-server)
- **Database:** PostgreSQL (Render managed DB / Railway)
- **File storage:** S3 / Cloudinary (image upload)
- **Email:** SendGrid / Mailgun (transactional emails)

**Deployment:**
- Manual deployment (git push → auto-deploy)
- No staging environment (deploy directly to production → elfogadható pilot során)

**P1 - Production infra:**
- Staging + Production környezet
- CI/CD pipeline (GitHub Actions, GitLab CI)
- Docker containers
- Infrastructure as Code (Terraform)

---

#### NFR8.2: Environment Variables (P0)

**Required env vars (P0):**
```bash
# Database
DATABASE_URL=postgresql://...

# Meta OAuth
META_APP_ID=123456789
META_APP_SECRET=abc123...
META_REDIRECT_URI=https://creaitor.app/auth/meta/callback

# AI API (OpenAI / Anthropic)
OPENAI_API_KEY=sk-...

# Session secret
SESSION_SECRET=random-secret-key

# Email (SendGrid)
SENDGRID_API_KEY=SG.abc123...

# File upload (S3 / Cloudinary)
S3_BUCKET=creaitor-uploads
S3_ACCESS_KEY=...
S3_SECRET_KEY=...
```

**P0 megjegyzés:** `.env` fájl git-ignored, manuális setup (nincs secrets manager).

---

### Non-Functional Requirements Összefoglalás

| NFR Kategória | P0 (MVP Pilot) | P1 (Post-PMF) |
|---------------|----------------|---------------|
| **Performance** | < 10 sec AI generálás, < 3 sec page load | < 5 sec AI, < 1 sec page load, caching |
| **Throughput** | 5-15 user, 50-100 poszt/nap | 200-500 user, horizontal scaling |
| **Security** | HTTPS, bcrypt, token encryption, basic auth | 2FA, secrets manager, SOC2 audit |
| **Uptime** | 95% (best-effort) | 99.5% SLA, status page |
| **Error Handling** | Manual retry, basic error messages | Auto retry, Sentry monitoring, alerting |
| **Backup** | Daily (7 nap retention) | Hourly (30 nap), PITR, multi-region |
| **Browser Support** | Desktop Chrome/Firefox/Safari (latest 2) | Mobile responsive, mobile app |
| **Accessibility** | Keyboard navigation | WCAG 2.1 AA compliance |
| **Testing** | Manual testing, < 30% coverage | 80% unit test, E2E automated |
| **Monitoring** | Console logs | Datadog/New Relic APM, uptime monitoring |
| **GDPR** | Minimális (nincs tracking) | Cookie consent, privacy policy, data export |
| **Deployment** | Single-server, manual deploy | Staging env, CI/CD, Docker, IaC |

**P0 filozófia ismétlés:**
> "Elég jó" egy 5-10 fős, 4 hetes pilothoz. Ha a hipotézisek validálódnak (H1, H2, H3) és 2-3 socialos azt mondja "ezt használnám napi szinten" → akkor skálázunk P1-re. Ha nem → akkor felesleges lett volna production-grade infrastruktúra építése.

---

## Technical Architecture (Technikai Architektúra)

> **Architecture filozófia (P0):** Egyszerű, monolitikus architektúra. Nem microservices, nem over-engineered. Gyors fejlesztés és deploy a cél.

---

### TA1: High-Level System Architecture (P0)

**System Components:**

```
┌─────────────────────────────────────────────────────────────┐
│                         User (Socialos)                      │
│                      Browser (Chrome/Firefox)                │
└────────────────┬────────────────────────────────────────────┘
                 │ HTTPS
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React SPA)                      │
│  - React + TypeScript                                        │
│  - Tailwind CSS                                              │
│  - React Router (client-side routing)                        │
│  - Zustand / Context API (state management)                  │
└────────────────┬────────────────────────────────────────────┘
                 │ REST API (JSON)
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                  Backend API (Node.js)                       │
│  - Express / Fastify                                         │
│  - TypeScript                                                │
│  - Session-based auth (express-session + cookie)             │
│  - ORM (Prisma / TypeORM)                                    │
└─┬───────┬───────┬───────┬───────┬───────────────────────────┘
  │       │       │       │       │
  │       │       │       │       └──> Cron Job (Scheduling)
  │       │       │       │             - node-cron / node-schedule
  │       │       │       │             - 5 percenként ellenőrzi scheduled posztokat
  │       │       │       │
  │       │       │       └──────────> File Storage (S3 / Cloudinary)
  │       │       │                     - Image upload (JPEG/PNG)
  │       │       │                     - Pre-signed URLs (S3) vagy direct upload
  │       │       │
  │       │       └──────────────────> Email Service (SendGrid / Mailgun)
  │       │                             - Transactional emails (password reset, user invite)
  │       │
  │       └──────────────────────────> AI API (OpenAI / Anthropic)
  │                                     - GPT-4o / Claude 3.5 Sonnet
  │                                     - Copy generation
  │
  └──────────────────────────────────> Meta Graph API
                                        - OAuth 2.0 (FB Page + IG Account access)
                                        - POST /feed, POST /media (publishing)
┌─────────────────────────────────────────────────────────────┐
│                    Database (PostgreSQL)                     │
│  - Render / Railway managed PostgreSQL                       │
│  - Tables: agencies, users, brands, posts, events            │
│  - Encryption: Meta access tokens (column-level encryption)  │
└─────────────────────────────────────────────────────────────┘
```

**P0 megjegyzés:**
- **Monolitikus architektúra:** Frontend + Backend egyetlen repository-ban (monorepo VAGY külön repo-k)
- **Single-server deployment:** Nincs load balancer, nincs multi-region
- **No message queue:** Cron job futtat scheduled publishing (egyszerű, de elég pilot-hoz)

**P1 - Skálázás:**
- Background job queue (Sidekiq, BullMQ) → decoupled publishing
- Redis cache (session storage, API response caching)
- CDN (CloudFront, Cloudflare) → static asset delivery
- Microservices (AI Copy Studio külön service, Publishing Service külön)

---

### TA2: Technology Stack (P0)

#### TA2.1: Frontend Stack

| Technológia | P0 Választás | Alternatíva (P1) | Döntési indok |
|-------------|--------------|------------------|---------------|
| **Framework** | React 18+ | Next.js (SSR/SSG), Vue.js | React: széles ecosystem, TypeScript support, nagy developer pool |
| **Language** | TypeScript (strict mode) | - | Type safety, jobb DX, kevesebb runtime hiba |
| **Styling** | Tailwind CSS | CSS Modules, Styled Components | Gyors UI development, utility-first, nincs CSS bloat |
| **State Management** | Zustand / React Context | Redux Toolkit, Jotai | Egyszerűbb mint Redux, elég pilot skálához |
| **Routing** | React Router v6 | TanStack Router | Standard, proven, dokumentáció kiváló |
| **Forms** | React Hook Form + Zod | Formik, TanStack Form | Jó validation (Zod schema), jó performance |
| **HTTP Client** | Axios / Fetch API | TanStack Query (React Query) | P0: egyszerű fetch. P1: React Query (caching, optimistic updates) |
| **Build Tool** | Vite | Create React App, Webpack | Gyorsabb dev server, jobb HMR |

**P0 Package list (frontend):**
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
    "tailwindcss": "^3.3.0",
    "date-fns": "^2.30.0"
  },
  "devDependencies": {
    "typescript": "^5.2.0",
    "vite": "^5.0.0",
    "@types/react": "^18.2.0",
    "eslint": "^8.54.0",
    "prettier": "^3.1.0"
  }
}
```

---

#### TA2.2: Backend Stack

| Technológia | P0 Választás | Alternatíva (P1) | Döntési indok |
|-------------|--------------|------------------|---------------|
| **Runtime** | Node.js 20 LTS | Bun, Deno | Proven, széles ecosystem, hosting support (Render, Railway) |
| **Framework** | Express.js | Fastify, NestJS, Hono | Egyszerű, jól ismert, gyors setup. P1: Fastify (gyorsabb performance) |
| **Language** | TypeScript (strict mode) | - | Type safety, shared types (frontend-backend) |
| **ORM** | Prisma | TypeORM, Drizzle | Modern DX, type-safe, migration kezelés jó |
| **Auth** | express-session + Passport.js | NextAuth.js, Lucia | Session-based (cookie), egyszerű, elég pilot-hoz |
| **Validation** | Zod | Joi, Yup | Shared schema (frontend-backend), TypeScript inference |
| **Scheduling** | node-cron | node-schedule, Agenda | Egyszerű cron job (5 perc interval), nincs queue szükség |
| **Logging** | Winston / Pino | - | Structured logging (JSON), production-ready |

**P0 Package list (backend):**
```json
{
  "dependencies": {
    "express": "^4.18.0",
    "typescript": "^5.2.0",
    "prisma": "^5.7.0",
    "@prisma/client": "^5.7.0",
    "express-session": "^1.17.0",
    "passport": "^0.7.0",
    "passport-local": "^1.0.0",
    "bcrypt": "^5.1.0",
    "zod": "^3.22.0",
    "node-cron": "^3.0.0",
    "axios": "^1.6.0",
    "winston": "^3.11.0",
    "dotenv": "^16.3.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.0",
    "@types/node": "^20.10.0",
    "ts-node": "^10.9.0",
    "nodemon": "^3.0.0",
    "eslint": "^8.54.0",
    "prettier": "^3.1.0"
  }
}
```

---

#### TA2.3: Database & Storage

| Komponens | P0 Választás | Alternatíva (P1) | Döntési indok |
|-----------|--------------|------------------|---------------|
| **Primary DB** | PostgreSQL 15+ | MySQL, SQLite (csak dev) | Relational data, JSON support (brand_brain), ACID compliance |
| **Hosting** | Render Managed PostgreSQL / Railway | Supabase, AWS RDS, Neon | Egyszerű setup, auto backup, elég pilot-hoz |
| **Migration** | Prisma Migrate | Raw SQL, TypeORM migrations | Deklaratív schema, version control, rollback support |
| **File Storage** | S3 / Cloudinary | Supabase Storage, UploadThing | S3: industry standard. Cloudinary: auto-resize, CDN beépített |
| **Cache (P1)** | - | Redis (session, API cache) | P0: nincs cache layer. P1: Redis session store, API response cache |

**Database schema (Prisma példa - core entities):**
```prisma
model Agency {
  id         String   @id @default(uuid())
  name       String
  ownerEmail String   @unique
  createdAt  DateTime @default(now())

  users      User[]
  brands     Brand[]
}

model User {
  id        String   @id @default(uuid())
  agencyId  String
  email     String   @unique
  password  String   // bcrypt hash
  role      String   @default("socialos") // P1: enum (admin, socialos)
  createdAt DateTime @default(now())

  agency    Agency   @relation(fields: [agencyId], references: [id])
  posts     Post[]
}

model Brand {
  id             String   @id @default(uuid())
  agencyId       String
  name           String
  fbPageId       String?
  igAccountId    String?
  accessToken    String?  // encrypted
  brandBrain     Json?    // {tone_of_voice, key_messages, reference_posts, visual_direction}
  createdAt      DateTime @default(now())

  agency         Agency   @relation(fields: [agencyId], references: [id])
  posts          Post[]
}

model Post {
  id              String    @id @default(uuid())
  brandId         String
  userId          String
  text            String
  platform        String    // facebook | instagram
  status          String    // draft | approved | scheduled | published | failed
  aiGenerated     Boolean   @default(false)
  usabilityRating String?   // usable | heavy_edit | not_usable
  imageUrl        String?
  scheduledAt     DateTime?
  publishedAt     DateTime?
  fbPostId        String?
  igMediaId       String?
  errorMessage    String?
  createdAt       DateTime  @default(now())

  brand           Brand     @relation(fields: [brandId], references: [id])
  user            User      @relation(fields: [userId], references: [id])
}

model Event {
  id         String   @id @default(uuid())
  userId     String?
  eventType  String   // user_login, ai_generation, post_saved, post_published, etc.
  eventData  Json     // {brand_id, post_id, generation_time_ms, ...}
  timestamp  DateTime @default(now())
}
```

---

#### TA2.4: Infrastructure & DevOps

| Komponens | P0 Választás | Alternatíva (P1) | Döntési indok |
|-----------|--------------|------------------|---------------|
| **Hosting (App)** | Render / Railway / Fly.io | Vercel (frontend), AWS EC2, DigitalOcean | Zero-config deploy, auto-scaling (P1), SSL included |
| **Database Hosting** | Render Managed DB / Railway | Supabase, AWS RDS, Neon | Managed service, auto backup, connection pooling |
| **CI/CD** | - (manual git push) | GitHub Actions, GitLab CI | P0: nincs automatizált testing. P1: automated tests + deploy |
| **Monitoring** | - (console logs) | Datadog, New Relic, Sentry | P0: best-effort. P1: APM, error tracking, alerting |
| **Domain & DNS** | Namecheap / Cloudflare | AWS Route 53 | Egyszerű DNS management, Cloudflare CDN (P1) |
| **SSL** | Let's Encrypt (Render auto) | - | Free, auto-renewal |

**P0 megjegyzés:**
- **Deployment:** `git push` → Render/Railway auto-build → deploy (< 5 perc)
- **Nincs staging environment:** Pilot során direkt production deploy → elfogadható
- **Nincs Docker:** Render/Railway natívan futtat Node.js projektet (package.json alapján)

**P1 - Production infra:**
- Staging + Production env (külön DB)
- CI/CD pipeline (tests + linting + deploy)
- Docker containerization (Dockerfile + docker-compose)
- IaC (Terraform / Pulumi)

---

### TA3: Multi-Tenant Architecture Pattern (P0)

**Multi-tenancy modell:** **Shared Database, Row-Level Isolation**

**Agency-level izolálás:**
```typescript
// Minden query agency_id filter-rel
async function getUserBrands(userId: string): Promise<Brand[]> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { agencyId: true }
  });

  // Csak az agency saját márkái
  return prisma.brand.findMany({
    where: { agencyId: user.agencyId }
  });
}
```

**Authorization middleware:**
```typescript
// Express middleware - ellenőrzi, hogy user csak saját agency adatait éri el
async function checkAgencyAccess(req, res, next) {
  const { brandId } = req.params;
  const userId = req.session.userId;

  const brand = await prisma.brand.findUnique({
    where: { id: brandId },
    include: { agency: { include: { users: true } } }
  });

  // Ellenőrzés: user agency_id === brand agency_id
  const userBelongsToAgency = brand.agency.users.some(u => u.id === userId);

  if (!userBelongsToAgency) {
    return res.status(403).json({ error: "Forbidden" });
  }

  next();
}
```

**P0 megjegyzés:**
- **Nincs separate database per tenant** (túl komplex pilot-hoz)
- **Row-level security (RLS):** Minden query tartalmaz `agencyId` filter-t
- **Nincs Kubernetes multi-tenancy:** Single-server deployment elég

**P1 - Enterprise multi-tenancy:**
- Database-level isolation (külön schema per agency, PostgreSQL schema-k)
- Fine-grained permissions (márka-szintű hozzáférés, szerepkörök)
- Audit log (ki, mit, mikor ért el)

---

### TA4: Third-Party Integrations (P0)

#### TA4.1: Meta Graph API Integration

**OAuth 2.0 Flow (FB Page + IG Account):**

```
User clicks "Connect Facebook/Instagram"
  ↓
Frontend redirects to Meta OAuth:
  https://www.facebook.com/v18.0/dialog/oauth?
    client_id={app_id}
    &redirect_uri={callback_url}
    &scope=pages_manage_posts,instagram_basic,instagram_content_publish
  ↓
User approves
  ↓
Meta redirects to callback with `code`:
  https://creaitor.app/auth/meta/callback?code=ABC123
  ↓
Backend exchanges code for access_token:
  POST https://graph.facebook.com/v18.0/oauth/access_token
    ?client_id={app_id}
    &client_secret={app_secret}
    &code=ABC123
    &redirect_uri={callback_url}
  ↓
Meta returns:
  {
    "access_token": "EAAxxxx...",
    "token_type": "bearer",
    "expires_in": 5183944 (60 days)
  }
  ↓
Backend fetches Page + IG Account IDs:
  GET https://graph.facebook.com/v18.0/me/accounts?access_token={token}
    → FB Page ID, Page Access Token
  GET https://graph.facebook.com/v18.0/{page_id}?fields=instagram_business_account
    → IG Account ID
  ↓
Backend saves to DB (encrypted):
  Brand.update({
    fbPageId: "123456789",
    igAccountId: "987654321",
    accessToken: encrypt("EAAxxxx...")
  })
```

**Publishing (FB Page):**
```typescript
async function publishToFacebook(postId: string) {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: { brand: true }
  });

  const accessToken = decrypt(post.brand.accessToken);

  const response = await axios.post(
    `https://graph.facebook.com/v18.0/${post.brand.fbPageId}/feed`,
    {
      message: post.text,
      ...(post.imageUrl && { link: post.imageUrl }), // vagy `picture` param
      access_token: accessToken
    }
  );

  // {id: "123456789_987654321", post_id: "..."}
  await prisma.post.update({
    where: { id: postId },
    data: {
      status: "published",
      fbPostId: response.data.id,
      publishedAt: new Date()
    }
  });
}
```

**Publishing (IG Account):**
```typescript
async function publishToInstagram(postId: string) {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: { brand: true }
  });

  const accessToken = decrypt(post.brand.accessToken);

  // Step 1: Create media container
  const containerResponse = await axios.post(
    `https://graph.facebook.com/v18.0/${post.brand.igAccountId}/media`,
    {
      image_url: post.imageUrl, // publicly accessible URL (S3 pre-signed URL)
      caption: post.text,
      access_token: accessToken
    }
  );

  const containerId = containerResponse.data.id;

  // Step 2: Publish container
  const publishResponse = await axios.post(
    `https://graph.facebook.com/v18.0/${post.brand.igAccountId}/media_publish`,
    {
      creation_id: containerId,
      access_token: accessToken
    }
  );

  // {id: "18123456789"}
  await prisma.post.update({
    where: { id: postId },
    data: {
      status: "published",
      igMediaId: publishResponse.data.id,
      publishedAt: new Date()
    }
  });
}
```

**Rate Limiting (P0 - basic):**
- Facebook: 200 calls / hour (per app)
- Ha rate limit error (code 4, 17, 32, 613) → error message + manual retry
- P1: Exponential backoff, queue management

---

#### TA4.2: AI API Integration (OpenAI / Anthropic)

**Copy Generation:**

```typescript
import OpenAI from 'openai';

async function generateAICopy(brief: string, brandId: string): Promise<string> {
  const brand = await prisma.brand.findUnique({
    where: { id: brandId }
  });

  const brandBrain = brand.brandBrain as BrandBrain; // Type assertion

  const systemPrompt = "Te egy tapasztalt social media copywriter vagy.";

  const userPrompt = `
Írj egy Facebook posztot a következő márka számára:

**Márka Tone of Voice:**
${brandBrain.tone_of_voice.description}

**Márka Key Messages:**
${brandBrain.key_messages.join('\n')}

**Példaposztok (referencia):**
${brandBrain.reference_posts.map(p => p.text).join('\n\n')}

**Poszt téma / brief:**
${brief}

**Platform:** Facebook (max 500 karakter ajánlott)

Generálj 1 posztot, ami tükrözi a márka hangját. Csak a poszt szövegét add vissza, semmi mást.
  `.trim();

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  const completion = await openai.chat.completions.create({
    model: "gpt-4o", // vagy "gpt-4-turbo"
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ],
    temperature: 0.7,
    max_tokens: 500
  });

  return completion.choices[0].message.content.trim();
}
```

**Anthropic (Claude) alternatíva:**
```typescript
import Anthropic from '@anthropic-ai/sdk';

async function generateAICopyWithClaude(brief: string, brandId: string): Promise<string> {
  // ... same brand brain fetch ...

  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
  });

  const message = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: userPrompt // same as OpenAI
      }
    ]
  });

  return message.content[0].text.trim();
}
```

**P0 döntési pont:**
- **OpenAI (GPT-4o):** Jobb ismert, több példakód, GPT-4o olcsóbb mint GPT-4 Turbo
- **Anthropic (Claude 3.5 Sonnet):** Jobb hosszú context handling, jobb instruction following
- **P0: Válassz egyet.** Mindkettő támogatása P1.

**Error handling:**
- Timeout (30 sec) → retry 1x
- Rate limit → error message (nincs auto-retry)
- Invalid API key → fatal error (env setup hiba)

---

#### TA4.3: Email Service (SendGrid / Mailgun)

**Transactional emails:**

| Email Típus | Trigger | Template |
|-------------|---------|----------|
| **User Invite** | Admin hív meg új user-t | "Csatlakozz a {agency_name} csapatához! Regisztrálj itt: {invite_link}" |
| **Password Reset** | User elfelejtette jelszavát | "Jelszó visszaállítás: {reset_link} (1 órán belül lejár)" |
| **Post Publish Failed** (P1) | Meta API hiba | "Publikálás sikertelen: {error_message}. Próbáld újra!" |

**SendGrid példa:**
```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendUserInvite(email: string, inviteToken: string) {
  const inviteLink = `https://creaitor.app/register?token=${inviteToken}`;

  await sgMail.send({
    to: email,
    from: 'noreply@creaitor.app',
    subject: 'Csatlakozz a csapatunkhoz!',
    text: `Regisztrálj itt: ${inviteLink}`,
    html: `<p>Csatlakozz a csapatunkhoz!</p><p><a href="${inviteLink}">Regisztráció</a></p>`
  });
}
```

**P0 megjegyzés:**
- Nincs fancy email template (plain HTML elég)
- Nincs email tracking (open rate, click rate)
- P1: Email templates (MJML), tracking, unsubscribe management

---

#### TA4.4: File Storage (S3 / Cloudinary)

**Image Upload Flow:**

```
User selects image (< 10MB, JPEG/PNG)
  ↓
Frontend uploads to backend endpoint:
  POST /api/upload
  Content-Type: multipart/form-data
  ↓
Backend validates (size, format)
  ↓
Backend uploads to S3 (vagy Cloudinary):
  - S3: Pre-signed URL generálás (public read)
  - Cloudinary: Direct upload API
  ↓
Backend returns image URL:
  { "url": "https://creaitor-uploads.s3.amazonaws.com/abc123.jpg" }
  ↓
Frontend stores URL in Post.imageUrl
```

**S3 példa:**
```typescript
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3 = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY
  }
});

async function uploadImageToS3(file: Buffer, fileName: string): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: `uploads/${Date.now()}-${fileName}`,
    Body: file,
    ContentType: 'image/jpeg', // vagy image/png
    ACL: 'public-read'
  });

  await s3.send(command);

  return `https://${process.env.S3_BUCKET}.s3.amazonaws.com/uploads/${fileName}`;
}
```

**Cloudinary példa (egyszerűbb):**
```typescript
import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function uploadImageToCloudinary(file: Buffer): Promise<string> {
  const result = await cloudinary.v2.uploader.upload_stream(
    {
      folder: 'creaitor-uploads',
      transformation: [
        { width: 1200, height: 630, crop: 'limit' } // auto resize
      ]
    }
  );

  return result.secure_url;
}
```

**P0 döntési pont:**
- **S3:** Olcsóbb nagy volumen esetén, de setup bonyolultabb
- **Cloudinary:** Auto-resize, CDN beépített, egyszerűbb setup → **ajánlott P0-hoz**

---

### TA5: API Design (P0)

**REST API Endpoints (példák):**

```
# Authentication
POST   /api/auth/register          - Ügynökség regisztráció
POST   /api/auth/login             - User login
POST   /api/auth/logout            - User logout
POST   /api/auth/password-reset    - Password reset request
POST   /api/auth/password-reset/:token - Password reset confirm

# Brands
GET    /api/brands                 - List brands (agency-filtered)
POST   /api/brands                 - Create brand
GET    /api/brands/:id             - Get brand details
PUT    /api/brands/:id             - Update brand (Brand Brain)
DELETE /api/brands/:id             - Delete brand
POST   /api/brands/:id/connect-meta - Meta OAuth callback handler

# Posts
GET    /api/brands/:brandId/posts  - List posts for brand
POST   /api/brands/:brandId/posts  - Create post
GET    /api/posts/:id              - Get post details
PUT    /api/posts/:id              - Update post (edit, status change)
DELETE /api/posts/:id              - Delete post
POST   /api/posts/:id/generate     - AI copy generation
POST   /api/posts/:id/publish      - Publish post (instant)
POST   /api/posts/:id/schedule     - Schedule post

# Upload
POST   /api/upload                 - Image upload

# Users (P1 - multi-user management)
GET    /api/users                  - List agency users
POST   /api/users/invite           - Invite new user
DELETE /api/users/:id              - Remove user
```

**API Response format (standardizált):**

```typescript
// Success response
{
  "data": {
    "id": "abc123",
    "name": "Kis Kávézó"
  }
}

// Error response
{
  "error": {
    "code": "BRAND_NOT_FOUND",
    "message": "Márka nem található",
    "details": {}
  }
}
```

**Error code convention:**
- `400` - Bad Request (validation error)
- `401` - Unauthorized (nincs session)
- `403` - Forbidden (agency access denied)
- `404` - Not Found
- `500` - Internal Server Error

**P0 megjegyzés:**
- Nincs GraphQL (REST elég)
- Nincs API versioning (`/v1/`, `/v2/`) - pilot során felesleges
- Nincs rate limiting (P1)

---

### TA6: Data Flow Examples (P0)

#### Flow 1: AI Copy Generation

```
User inputs brief: "Új kávé érkezett - Guatemalai single origin"
  ↓
Frontend: POST /api/posts/:id/generate
  { "brief": "Új kávé érkezett..." }
  ↓
Backend:
  1. Fetch Brand Brain (brand_id)
  2. Construct AI prompt (TOV + Key Messages + Examples + Brief)
  3. Call OpenAI API (GPT-4o)
  4. Receive AI-generated copy
  5. Create Post (status: draft, ai_generated: true)
  6. Log event (event_type: ai_generation, generation_time_ms)
  ↓
Frontend receives:
  { "data": { "id": "post123", "text": "☕️ Friss érkező!..." } }
  ↓
User reviews, edits, rates usability
  ↓
Frontend: PUT /api/posts/:id
  { "text": "...", "usability_rating": "usable" }
  ↓
Backend updates Post
```

#### Flow 2: Scheduled Publishing

```
User schedules post for "2025-01-25 10:00"
  ↓
Frontend: POST /api/posts/:id/schedule
  { "scheduled_at": "2025-01-25T10:00:00Z" }
  ↓
Backend updates Post (status: scheduled)
  ↓
Cron job runs every 5 minutes:
  SELECT * FROM posts WHERE status = 'scheduled' AND scheduled_at <= NOW()
  ↓
For each post:
  1. Decrypt access_token
  2. Call Meta Graph API (POST /feed or /media)
  3. If success → status: published, fb_post_id/ig_media_id saved
  4. If error → status: failed, error_message saved
  5. Log event (event_type: post_published / post_failed)
```

#### Flow 3: Multi-Brand Calendar View

```
User opens Calendar page
  ↓
Frontend: GET /api/brands?include=posts
  ↓
Backend:
  1. Get user session (userId)
  2. Fetch user's agency_id
  3. Fetch all brands (where agency_id = user.agency_id)
  4. For each brand, fetch posts (where brand_id, filter by date range)
  5. Return aggregated data
  ↓
Frontend receives:
  {
    "data": [
      {
        "brand": { "id": "brand1", "name": "Kis Kávézó" },
        "posts": [
          { "id": "post1", "scheduled_at": "2025-01-20T10:00", "status": "scheduled" },
          { "id": "post2", "scheduled_at": "2025-01-22T14:00", "status": "draft" }
        ]
      }
    ]
  }
  ↓
Frontend renders weekly calendar (slots by date, grouped by brand)
```

---

### Technical Architecture Összefoglalás

| Komponens | P0 (MVP Pilot) | P1 (Post-PMF) |
|-----------|----------------|---------------|
| **Architecture** | Monolitikus (Frontend + Backend egyetlen deployment) | Microservices (AI Service, Publishing Service külön) |
| **Frontend** | React 18 + TypeScript + Tailwind + Vite | Next.js (SSR), React Query (caching) |
| **Backend** | Node.js + Express + TypeScript + Prisma | Fastify (performance), NestJS (modularity) |
| **Database** | PostgreSQL (Render managed, single instance) | PostgreSQL (read replicas, connection pooling) |
| **Cache** | - | Redis (session, API cache) |
| **File Storage** | Cloudinary (auto-resize, CDN) | S3 + CloudFront CDN |
| **Email** | SendGrid (transactional) | SendGrid + email templates (MJML) |
| **AI API** | OpenAI (GPT-4o) VAGY Anthropic (Claude 3.5) | Mindkettő támogatása, model switching |
| **Scheduling** | node-cron (5 perc interval) | BullMQ queue (background jobs, retry logic) |
| **Monitoring** | Console logs | Datadog/New Relic (APM), Sentry (error tracking) |
| **Deployment** | Render/Railway (git push → auto-deploy) | CI/CD (GitHub Actions), Docker, staging env |
| **Multi-tenancy** | Row-level isolation (agency_id filter) | Schema-level isolation, fine-grained permissions |

**P0 filozófia ismétlés:**
> Egyszerű tech stack, gyors fejlesztés, monolitikus architektúra. Ha a pilot sikeres (H1, H2, H3 validálódnak) → akkor P1 refactoring (microservices, caching, monitoring). Ha nem → akkor nem vesztettünk időt over-engineering-re.

---
