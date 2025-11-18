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

### Mit jelent a siker ennél a terméknél?

A Creaitor sikere **nem generikus növekedési metrikákban mérhető**, hanem abban, hogy az ügynökségi socialosok számára valóban **működő, napi szintű eszközzé** válik, amely:

1. **Mérhető időt spórol** - Nem csak "hatékonyabb", hanem konkrétan 30-40%-kal kevesebb idő ugyanannyi minőségi tartalom előállítására
2. **Márkahűséget tart** - Az AI-generált tartalom nem generikus, hanem a márka hangjában szól
3. **Workflow-t cserél** - A socialos nem "kipróbálja", hanem **átáll rá** a napi munkában

### Termék Siker Metrikák (MVP - 6 hónap)

#### 1. Adoption & Usage - "Használják-e ténylegesen?"

**Kritikus metrika:** A Creaitor legyen a **fő gyártási hely** a socialos fejében.

**Mérés:**

- **5-10 aktív pilot ügynökség** - Legalább 4-6 héten át folyamatos használat
- **Ügynökségenként min. 5 aktív márka** - Nem "csak egyet kipróbálunk", hanem komolyan használják
- **Heti átlag 3+ FB/IG poszt / márka** - Creaitorban megtervezve és (részben) generálva
- **60%+ ütemezési arány** - A generált posztok legalább 60%-át a Creaitoron keresztül ütemezik (nem máshol)

**Session usage mintázat:**
- Socialosonként **heti 2-3 érdemi session** (nem csak belépés, hanem generálás + szerkesztés + ütemezés)
- A Creaitorban generált tartalmak aránya: **70%+** (nem ChatGPT-ben írják, majd csak bemásolják)

**Miért fontos:** Ha csak "szép demo" marad, de nem épül be a workflow-ba, akkor nem valós Product-Market Fit.

#### 2. Outcome - "Időt spórol és jó a minőség?"

**Kritikus metrika:** Az ügynökségek **objektíven is** időt takarítanak meg, és a minőség nem romlik.

**Időmegtakarítás:**

- **30-40% időmegtakarítás** átlagosan márkánként a heti tartalomgyártásra
  - Pl. 3 óra → 1,8-2 óra / márka / hét
- **Mérés:**
  - Pilot elején baseline mérés (self-report + konkrét időmérés 1-2 héten)
  - 4-6 hét Creaitor használat után újramérés ugyanazon márkáknál
- **Cél:** Legalább a pilot ügynökségek **70%-ánál** legalább 30%+ időmegtakarítás igazoltan jelentkezzen

**Minőség / Márkahűség:**

- **70%+ használható posztarány** - A generált posztok legalább 70%-a csak kisebb szerkesztést igényel (nem nagyon átírás)
- **8/10+ márkahűség rating** - Átlagosan minimum 8/10 rating a socialosoknál (és ahol lehet, az ügyfeleknél is)

**Mérés:**
- **Posztszintű jelölés:** "AI szöveg rendben, kisebb módosítással" / "nagy átdolgozás" / "nem használható"
- **Havi rövid rating-survey:** "Mennyire érzed márkahűnek a Creaitor által generált posztokat?" (1-10 skála)

**Miért fontos:** Ha gyorsabb, de a minőség romlik → hosszú távon nem tartható. Ha jó a minőség, de nem spórol időt → nincs ROI.

#### 3. Product Love - "Ajánlanák-e?"

**Kritikus metrika:** A socialosok **valóban szeretik** használni, nem csak "tűrik".

**Net Promoter Score (NPS):**
- Cél: **NPS 40+** (6 hónap után a pilot csoportban)
- "Mennyire valószínű, hogy ajánlanád a Creaitor-t más ügynökségeknek?" (0-10)

**Session visszatérési arány:**
- **Weekly Active Users (WAU):** A regisztrált socialosok legalább 70%-a heti szinten aktív
- **Retention (4 hét):** Legalább 60% retention 4 hét után

**Miért fontos:** Viralitás és referral csak akkor működik, ha a felhasználók tényleg szeretik. Az NPS előrejelzi a hosszú távú sikert.

### Üzleti Metrikák (MVP - 6 hónap)

**Cél:** Bizonyítani, hogy fenntartható MRR-modell építhető rá.

#### Pilot → Fizető Konverzió

- **10-20 fizető ügynökség** a pilot végére (6 hónap)
- **Átlagos díj:** 100-300 EUR / hó / ügynökség (csomagtól függően)
- **MRR cél:** 1-4k EUR körüli havi visszatérő bevétel

**Miért fontos:** Ez még nem "nagy üzlet", de jelzi:
- Hajlandóak fizetni
- Validáltad az ártartományt
- Van feedback, mit kell fejleszteni a skálázáshoz

#### Churn & Retention

- **Churn cél:** Max. 15% havi churn a fizető ügynökségeknél (első 6 hónapban)
- **3+ hónapos retention:** Legalább 60% az első batch-ből 3 hónap után is aktív

**Miért fontos:** Magas korai churn = rossz fit vagy hiányos termék.

#### Unit Economics (előzetes)

- **CAC (Customer Acquisition Cost):**
  - Pilot fázis: <200 EUR / ügynökség (mivel direkt outreach, referral)
- **LTV/CAC arány:**
  - Cél: Min. 3:1 arány (ha átlag 6 hónap lifetime és 150 EUR/hó ARPU → 900 EUR LTV, CAC max 300 EUR)

**Miért fontos:** Ez mutatja meg, hogy a későbbi skálázás gazdaságos lesz-e.

### Learning Goals (Hipotézis-validálás)

Az MVP célja nem csak termék építése, hanem **kritikus hipotézisek tesztelése**.

#### Hipotézis 1: Brand Brain v1 elég a 8/10-es márkahűséghez

**Feltételezés:** 1-3 példapost + tömör TOV + 2-3 key message + alap vizuál-irány **már elég** a jó AI-alaphoz.

**Mit tanuljunk meg:**
- Mely iparágaknál / márkatípusoknál elég ez?
- Hol kell **sokkal több** input (pl. 10-20 példapost, részletesebb guideline, RAG)?

**Learning KPI:**
- Márkatípusonként (iparág, tónus, komplexitás) nézve:
  - Hol érjük el a 8/10-es ratinget csak Brand Brain v1-gyel?
  - Hol bukunk el? → Ezek jelölik a v1.5-v2 igényt

#### Hipotézis 2: A socialos hajlandó a Creaitorban kezdeni, ha a flow gyors

**Feltételezés:** Ha a Creaitor egy helyen ad naptár + copy + vizuál + ütemezés flow-t, akkor a socialos hajlandó **"go-to toolként"** használni.

**Mit tanuljunk meg:**
- Milyen UI/UX friction pontok tartják vissza?
- Mennyi AI-latency "fér bele" (másodpercek / lépés)?
- Mennyire fontos neki a testreszabhatóság vs. "plug & play" kényelem?

**Learning KPI:**
- Hány ügynökségnél válik a Creaitor ténylegesen fő "gyártó hellyé" (self-report + usage)?
- Hol marad meg "AI-sandbox" és "extra tool" státuszban?

#### Hipotézis 3: Magyar/CEE piacon van hely egy agency-first, AI-first social OS-nek

**Feltételezés:** A magyar/régiós ügynökségeknek elég nagy a fájdalma és elég magas a digitális érettsége ahhoz, hogy:
- Fizessenek is egy ilyen eszközért
- Ne csak kipróbálják, hanem komolyan használják

**Mit tanuljunk meg:**
- Milyen árszintnél érzik úgy, hogy "megéri"?
- Mekkora költség-időmegtakarítás arány kell a döntéshez?

**Learning KPI:**
- **Pilot konverzió fizetős státuszra:** Hány ügynökség hajlandó fizetni már az MVP-közeli verzióért is (pl. kedvezményes early adopter csomagban)?
- **Elfogadható ártartomány** (kvali interjúk, willingness-to-pay)

### Összefoglaló: Siker Definíció (6 hónap után)

**A Creaitor MVP sikeres, ha:**

✅ **5-10 ügynökség aktívan használja** (heti 2-3 session / socialos, 5+ márka / ügynökség)

✅ **30-40% időmegtakarítás** igazoltan, legalább 70%-uk

✅ **8/10+ márkahűség rating** átlagban

✅ **70%+ használható posztarány** (kisebb szerkesztéssel publikálható)

✅ **10-20 fizető ügynökség**, 1-4k EUR MRR

✅ **NPS 40+**, jelezve, hogy a socialosok szeretik és ajánlanák

✅ **Brand Brain v1 hatékonyságát validáltuk** - tudjuk, hol elég, hol kell mélyebb

**Ez NEM jelent:**
- Profitabilitást (még nem)
- Késztermék-érettséget (még MVP)
- Skálázható growth machine-t (még nem)

**DE jelzi:**
- Van Product-Market Fit mag az ügynökségi szegmensben
- Az eszköz tényleg beépül a workflow-ba
- Van fizetési hajlandóság
- Tiszta irány a következő iterációhoz (v1.5, v2)

---
