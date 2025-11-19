# Pilot Measurement & Research Protocol

**Fontos:** Az alábbi szekció **NEM termék-specifikáció**, hanem **kutatási protokoll** a pilot validálásához. Ezek külső folyamatok (Google Sheet időmérés, survey-k, ROI kalkuláció), amelyek a pilot során történnek, de NEM részei a Creaitor termékének.

**Elválasztás indoka:**
- Product journey-k: Mi történik a Creaitor rendszerben? (termék funkciók)
- Research protocol: Hogyan mérjük a pilot sikerét? (kutatási módszertan)

---

## RP1: Időmegtakarítás Mérés (Time Savings Measurement)

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

## RP2: Márkahűség és Használhatósági Rating

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

## RP3: Workflow Adoption & NPS Survey

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

## RP4: Pilot-to-Paid Konverzió & Pricing Sensitivity

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

## Research Protocol összefoglalás

| Kutatási protokoll | Mit mér? | Módszer | Kapcsolódó hipotézis |
|-------------------|----------|---------|----------------------|
| RP1: Időmegtakarítás mérés | Ténylegesen spórolnak-e 20-40% időt? | Google Sheet időmérés (baseline vs. Creaitorral) | H2 |
| RP2: Márkahűség rating | Brand Brain v1 elég a 7-8/10-es ratinghez? | In-app rating + havi survey | H1 |
| RP3: Workflow adoption & NPS | Beépül-e a workflow-ba? Ajánlanák-e? | Havi survey + usage tracking | H2 |
| RP4: Pilot-to-paid & pricing | Van fizetési hajlandóság? Mennyi az optimális ár? | Owner interjú + ROI kalkuláció + pricing survey | H3 |

**Fontos:** Ezek a protokollok **párhuzamosan futnak** a pilot során, nem szekvenciálisan. A socialosok használják a terméket (Product Journeys 1-4), miközben mi mérjük őket (Research Protocols 1-4).

---
