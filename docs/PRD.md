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

### Core User Journeys

Az alábbi user journey-k a **kritikus hipotézisek (H1, H2, H3) teszteléséhez** szükségesek.

---

#### Journey 1: Új Márka Onboarding + Brand Brain Setup

**Actor:** Socialos (Éva, 3 éve social media manager egy 5 fős ügynökségnél)

**Context:** Új ügyfél érkezett ("Kis Kávézó" - helyi speciality kávézó Budapesten). Évának fel kell vinnie a márkát a Creaitorba, hogy jövő héttől itt készítse a posztokat.

**User Story:**
> **As a** socialos
> **I want to** létrehozni egy új márkát és beállítani a Brand Brain-jét
> **So that** az AI-generált posztok tükrözzék a márka hangját és stílusát

**Steps:**

1. **Márka létrehozása**
   - Éva bejelentkezik a Creaitorba
   - "Új márka hozzáadása" gomb
   - Kitölti: Márka neve ("Kis Kávézó"), rövid leírás
   - FB Page és IG Account csatolása (Meta OAuth)

2. **Brand Brain v1 kitöltése**
   - **Tone of Voice (TOV) leírás:** "Barátságos, közvetlen, nem túl formális. Kávérajongóknak szól, de nem snob. Emojik megengedettek (☕️, ❤️), de mértékkel. Kerüljük a corporate hangnemet."
   - **Key Messages (3 darab):**
     - "Helyi, frissen pörkölt kávé"
     - "Cozy, otthonos légkör"
     - "Támogatjuk a fenntartható beszerzést"
   - **Példaposztok (2 darab):** Bemásol 2 korábbi sikeres posztot (szöveg + opcionálisan kép URL)
   - **Vizuális irány:** "Meleg, földközeli színek. Otthonos, nem túl steril. Kávé close-up-ok, emberek kávézás közben. Kerüljük a túl corporate stock photo-kat."

3. **Mentés és validálás**
   - "Mentés" gomb
   - Rendszer tárolja a Brand Brain adatokat
   - Éva készen áll posztokat generálni

**Success Criteria:**
- ✅ Márka létrehozva 2-3 perc alatt
- ✅ Brand Brain kitöltése 5-10 perc (nem tart tovább, mint egy Word dokumentumban leírni)
- ✅ Adatok mentve, visszatölthetők

**Validálja:** H1 (Brand Brain v1 setup egyszerű és gyors)

---

#### Journey 2: Heti Tartalomnaptár Generálása AI-val

**Actor:** Socialos (Éva)

**Context:** Hétfő reggel, Évának össze kell állítani a Kis Kávézó következő heti FB/IG naptárát (6 poszt: 3 FB, 3 IG).

**User Story:**
> **As a** socialos
> **I want to** AI segítségével generálni a heti posztokat Brand Brain kontextussal
> **So that** 30-40%-kal kevesebb időt töltsek a szövegírással, miközben a posztok márkahűek maradnak

**Steps:**

1. **Naptár megnyitása**
   - Éva megnyitja a Content Calendar-t
   - Szűrés: "Kis Kávézó" márka
   - Heti nézet: jövő hét (5 munkanap + hétvége)

2. **Első poszt (Hétfő, FB): Termékbemutató - Új kávé**
   - Kattintás: "Új poszt" (hétfői sloton)
   - **Brief input:** "Bemutató az új guatemalai single origin kávénkról, amit most hoztunk be"
   - Platform választás: **Facebook**
   - Tartalomtípus: **Termékbemutató**
   - "Generate" gomb → AI generál 1 szövegvariánst Brand Brain kontextussal:
     > "☕️ Friss pörkölés! Guatemalai single origin érkezett hozzánk – gazdag, csokoládés ízekkel. Ha szereted az erős, de harmonikus kávékat, ezt próbáld ki! 🌿 Persze fenntarthatóan beszerzett, ahogy nálunk minden. Gyere, kóstold meg nálunk!"
   - Éva **apró módosítást** tesz (pl. emoji cseréje)
   - "Save as draft" gomb

3. **Kép hozzáadása**
   - **P0-ban:** Saját kép feltöltése (Évának van fotója a guatemalai kávéról)
   - **P1 (ha AI Visual kész):** AI Visual Studio → "Guatemalai kávé close-up, meleg fény, otthonos háttér" → AI generál 2-3 képvariánst

4. **Használhatósági rating (P0!):**
   - Rendszer kérdezi (publish előtt): "Mennyire használható volt a generált szöveg?"
   - Éva jelöli: **"Rendben, kisebb módosítással"**

5. **Ismétlés további 5 posztra**
   - Keddi IG poszt: "Tipp - Hogyan készíts tökéletes cappuccino-t otthon"
   - Szerda FB: "Entertaining - Vicces kávés meme (de márkahűen)"
   - Csütörtök IG: "Akció - 10% kedvezmény hétvégén"
   - Péntek FB: "Insight - Miért fontos a fenntartható kávébeszerzés?"
   - Szombat IG: "Weekend vibe - Hétvégi relax a kávézóban"

**Time Tracking (pilot alatt):**
- **Baseline (Creaitor nélkül):** 2-3 óra (6 poszt manuális írása + képkeresés)
- **Creaitorral (cél):** 1-1.5 óra (30-40% időmegtakarítás)

**Success Criteria:**
- ✅ 6 poszt draft-ban 1-1.5 óra alatt
- ✅ Legalább 4/6 poszt "rendben, kisebb módosítással" jelölés
- ✅ Márkahűség átlag 8/10 (Éva értékelése)

**Validálja:** H1 (Brand Brain elég a márkahűséghez), H2 (Workflow adoption - AI Studio használata)

---

#### Journey 3: Approval és Ütemezés (Teljes Workflow)

**Actor:** Socialos (Éva) + Account Manager (Péter - opcionális P1-ben)

**Context:** Éva elkészítette a 6 posztot draft-ban. Most jóvá kell hagynia (P0: self-approval) és ütemezni.

**User Story:**
> **As a** socialos
> **I want to** jóváhagyni és ütemezni a heti posztokat egy helyen
> **So that** ne kelljen váltanom külön eszközök között (generálás → Hootsuite → Meta)

**Steps:**

1. **Review draft posztok**
   - Éva végignézi a 6 posztot a naptárban
   - Ellenőrzi: szöveg OK? kép OK? platform jó?

2. **Approval (P0: Pseudo-approval)**
   - Minden posztnál: "Approve" gomb
   - Státusz: Draft → **Approved**
   - **P1 (ha multi-user review):** Éva "Küldés review-ra" → Péter (Account Manager) approve-olja

3. **Scheduling**
   - **P0 (Instant publish VAGY Manual schedule - elég az egyik):**
     - **Ha instant publish van P0-ban:** "Publish now" gomb → azonnal Meta API-n keresztül kikerül
     - **Ha manual schedule van P0-ban:** Dátum/időpont választás (pl. Hétfő 10:00) → "Schedule" gomb
   - Poszt státusz: Approved → **Scheduled**

4. **Queue és publikálás**
   - Scheduled posztok queue-ban (P0: egyszerű cron job, P1: background job queue)
   - Időpontban: Meta Graph API hívás → FB/IG poszt kikerül
   - Státusz: Scheduled → **Published**

5. **Ha hiba (API error)**
   - Státusz: **Failed**
   - Error message megjelenik
   - "Retry" gomb → Éva újrapróbálja

**Success Criteria:**
- ✅ 6 poszt ütemezése 10-15 perc alatt
- ✅ Sikeres publikálás 95%+ (5% hiba megengedett - API issue, token expire stb.)
- ✅ Éva NEM vált külön eszközre (pl. Hootsuite, Meta Business Suite)

**Validálja:** H2 (Workflow adoption - teljes folyamat egy helyen)

---

#### Journey 4: Multi-Brand Kezelés (Ügynökségi Perspektíva)

**Actor:** Socialos (Éva - 8 márkát kezel)

**Context:** Éva nem csak a Kis Kávézónak, hanem további 7 márkának is készít heti posztokat. A Creaitor multi-brand workflow-t támogat.

**User Story:**
> **As a** socialos több márkával
> **I want to** váltani a márkák között egyetlen felületen
> **So that** ne kelljen külön fiókok / tabek között ugrani

**Steps:**

1. **Márka-szintű szűrés a Calendar-ben**
   - Éva megnyitja a Content Calendar-t
   - Dropdown: "Összes márka" VAGY konkrét márka ("Kis Kávézó", "Fitness Stúdió XY", "E-commerce Ruhabolt" stb.)
   - Heti nézet: látja az adott márka posztjait

2. **Márka-váltás**
   - Kattintás dropdown-ban: "Fitness Stúdió XY"
   - Naptár frissül → csak Fitness Stúdió posztok látszanak
   - Éva új posztot generál (Brief: "Új edzésprogram bemutató")

3. **Brand Brain márka-specifikus**
   - Minden márka saját Brand Brain-nel rendelkezik
   - AI Copy Studio automatikusan használja az aktív márka Brand Brain-jét
   - Nem keverednek a márkák (Fitness Stúdió nem kap kávézós hangnemet)

4. **Dashboard - összes márka áttekintése (P1)**
   - Éva látja: melyik márkánál hány poszt van scheduled/published (heti összesítés)
   - Gyors áttekintés: van-e valamelyik márkánál hiányzó nap?

**Success Criteria:**
- ✅ Márka-váltás 1-2 kattintás
- ✅ Brand Brain-ek nem keverednek (100% accuracy)
- ✅ 5-10 márka kezelése egy felületen (nem terheli a user-t)

**Validálja:** H2 (Multi-brand workflow adoption), H3 (Ügynökségi fit)

---

#### Journey 5: Időmegtakarítás Mérése (Pilot alatt)

**Actor:** Socialos (Éva - pilot résztvevő)

**Context:** A pilot első hetében Éva baseline időmérést végez (Creaitor nélkül), majd 4-6 hét után újra méri (Creaitorral).

**User Story:**
> **As a** pilot résztvevő socialos
> **I want to** követni az időmegtakarítást
> **So that** validáljuk, hogy a Creaitor tényleg 30-40%-ot spórol

**Steps:**

1. **Baseline mérés (Pilot 1. hét - Creaitor nélkül)**
   - Éva kitölt egy Google Sheet táblázatot (naponta):
     - Hány perc: Brief írás
     - Hány perc: Szövegírás / szerkesztés
     - Hány perc: Képkeresés / feltöltés
     - Hány perc: Jóváhagyás / review
     - Hány perc: Ütemezés külön eszközben (Meta Business Suite)
   - **Baseline összesen (6 poszt / hét):** 150-180 perc (2.5-3 óra)

2. **Creaitor használat (Pilot 4-6. hét)**
   - Éva újra méri ugyanazon márkánál (Kis Kávézó):
     - Hány perc: Brand Brain setup (egyszeri)
     - Hány perc: AI Copy Studio (brief + generálás + szerkesztés)
     - Hány perc: Kép (AI Visual VAGY feltöltés)
     - Hány perc: Approval + scheduling (egy helyen)
   - **Creaitorral összesen (6 poszt / hét):** 90-110 perc (1.5-1.8 óra)

3. **Időmegtakarítás számítása**
   - Baseline: 165 perc átlag
   - Creaitorral: 100 perc átlag
   - **Megtakarítás: 65 perc (39%)**

4. **Self-report survey**
   - Havi rövid survey (5 kérdés):
     - "Mennyivel gyorsabb a heti naptár készítése Creaitorral?" (%)
     - "Mennyire érzed márkahűnek a generált posztokat?" (1-10)
     - "Mi a legjobb a Creaitorban?" (kvali)
     - "Mi fájó pont?" (kvali)
     - "Ajánlanád kollégádnak?" (NPS)

**Success Criteria:**
- ✅ Időmegtakarítás igazolva: 20-40% range
- ✅ Survey kitöltési arány: 80%+ (pilot alatt)
- ✅ Kvalitatív feedback gyűjtése (UX friction pontok azonosítása)

**Validálja:** H2 (Időmegtakarítás validálása), Success Criteria Primary Metrics

---

#### Journey 6: Pilot-to-Paid Konverzió (Üzleti Perspektíva)

**Actor:** Ügynökségi Owner (Zsolt - tulajdonos, 5 fős ügynökség)

**Context:** Zsolt ügynöksége 4 hétig használta a Creaitor pilot-ot (2 socialos, 12 márka). Most döntenie kell: fizet-e az eszközért?

**User Story:**
> **As an** ügynökségi owner
> **I want to** értékelni a Creaitor ROI-ját a pilot után
> **So that** dönthessek: érdemes-e fizetni érte (150 EUR/hó)

**Steps:**

1. **Pilot tapasztalat összegyűjtése**
   - Zsolt megkérdezi a 2 socialost:
     - Mennyit spóroltál időben?
     - Beépült a workflow-dba (go-to tool)?
     - Van-e fájó pont (UX, AI minőség)?
   - Válaszok:
     - Éva: "35% időmegtakarítás, használom, kis UX friction van a calendar-ben"
     - Anna: "25% időmegtakarítás, jó az AI, de hiányzik a TikTok"

2. **ROI kalkuláció**
   - **Költség:** 150 EUR/hó
   - **Időmegtakarítás:** 2 socialos × 30% × 20 óra/hó (social work) = 12 óra/hó
   - **Érték:** 12 óra × 15 EUR/óra (internal cost) = 180 EUR/hó
   - **ROI:** 180 - 150 = +30 EUR/hó (breakeven +)

3. **Döntés**
   - **Ha ROI pozitív + socialosok elégedettek:** Zsolt fizető lesz
   - **Ha ROI negatív VAGY socialosok nem használják:** Zsolt kilép

4. **Fizetési hajlandóság (Pricing sensitivity)**
   - Survey kérdés: "Mennyit fizetnél max havonta ezért az eszközért?"
     - 50-100 EUR: túl drága
     - 100-150 EUR: elfogadható
     - 150-200 EUR: fair
     - 200+ EUR: cheap

**Success Criteria:**
- ✅ Pilot-to-paid konverzió: 40-60% (Target: 50%+)
- ✅ Pricing validation: 80%+ tartja elfogadhatónak a 150 EUR/hó-t
- ✅ Kvalitatív insight: miért fizetnek / miért nem?

**Validálja:** H3 (Magyar/CEE piacon van fizetési hajlandóság)

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
