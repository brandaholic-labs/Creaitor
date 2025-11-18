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

#### v1.5 - Finomhangolás (6-9 hónap)

**Feltétel:** MVP Target success elérése (8-10 ügynökség, 30-40% időmegtakarítás, 8/10 rating)

**Fókusz:** Learning goals alapján azonosított hiányosságok pótlása

- Brand Brain v1.5: További példaposztok, részletesebb TOV (ha kell)
- UX friction pontok javítása (usage adatok alapján)
- Performance optimalizáció (AI latency csökkentése, ha probléma)
- További magyar nyelvi finomhangolás

#### v2.0 - Skálázási Fázis (9-15 hónap)

**Feltétel:** v1.5 stabil, 20-30 ügynökség, 3-5k EUR MRR

**Fókusz:** Horizontális és vertikális bővítés

**Horizontális (több platform):**
- TikTok integráció (ha pilot feedback alapján fontos)
- LinkedIn integráció (B2B ügynökségek esetén)

**Vertikális (mélyebb funkciók):**
- Brand Brain v2 (RAG-alapú, automatikus tanulás múltbeli posztokból)
- Haladó analitika (performance insights, best time to post)
- Campaign management (több poszt összekapcsolása)
- Carousel post support

**Üzleti modell:**
- Pricing optimalizáció (tier-ek finomhangolása)
- Self-serve onboarding (automata demo, tutorial)

#### v3.0 - Enterprise & Internationalization (15-24 hónap)

**Feltétel:** v2.0 stabil, 50-100 ügynökség, 10-20k EUR MRR

**Fókusz:** Enterprise funkciók és nemzetközi expanzió

- White-label megoldás (nagyobb ügynökségek saját brandje alatt)
- SSO, custom SLA, dedikált support
- Multi-language support (angol, német, lengyel, román)
- Ügynökségi operációs réteg (tasking, approval chain, dashboard client-eknek)
- API access (partner integráció)

---

### MVP Feature Prioritás (ha idő szűk)

**Must Have (P0) - Ezek nélkül nincs MVP:**
1. Multi-tenant alaprendszer
2. Brand Brain v1 (legalább TOV + key messages + 1 példaposzt)
3. AI Copy Studio (szöveggenerálás)
4. Content Calendar (naptár + drag&drop)
5. Approval workflow (legalább Draft → Approved flow)
6. Publishing & Scheduling (Meta API, queue)

**Should Have (P1) - Fontos, de kivehető ha nagyon kell:**
7. AI Visual Studio (képgenerálás) - **alternatíva:** socialos feltölt saját képet
8. Saját kép feltöltés és crop
9. Basic insights dashboard

**Nice to Have (P2) - Jó lenne, de v1.5-be tolható:**
10. AI-javasolt tartalomtípus mix
11. In-app notifications
12. Email notifications
13. Használhatósági rating jelölés (instrumentáció)

---
