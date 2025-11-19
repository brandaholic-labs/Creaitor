# R2: Business & Product Risks (Üzleti Kockázatok)

## R2.1. Hypothesis Invalidation Risks (H1–H3)

| Hipotézis kockázat | Impact | Valószínűség | Detect | Mitigation |
|--------------------|--------|--------------|--------|------------|
| **H1 fail:** Brand Brain v1 túl bonyolult / nem töltik ki | 🔴 Magas | 🟡 Közepes | Brand Brain completion rate márkánként, setup idő mérése | Mezők számának csökkentése, wizard flow, „lite setup" mód; P1-ben AI-assisted Brand Brain (példaposzt → TOV kivonat) |
| **H2 fail:** Időmegtakarítás <20% | 🔴 Magas | 🟡 Közepes | Baseline vs. 4–6. hét időmérés (per márka) | AI output javítás (prompt/model), UX friction csökkentése a naptárban, felesleges lépések elhagyása |
| **H3 fail:** AI output nem használható (heavy_edit + not_usable >60%) | 🔴 Magas | 🟡 Közepes | Usability rating dashboard per brand | Prompt tuning, Brand Brain finomítás, modell csere (GPT ↔ Claude), P1-ben multi-variáns generálás és best-of selection |

**Döntési szabály:**
- Ha **2 hipotézis bukik egyszerre** (pl. H1 + H3), akkor **pivot/stop kérdést kell napirendre tűzni**.
- Ha csak 1 bukik, akkor először **dedikált iterációs sprint**, és csak utána döntés.

---

## R2.2. Pilot Recruitment & Execution Risks

| Kockázat | Impact | Valószínűség | Detect | Mitigation |
|----------|--------|--------------|--------|------------|
| **Nem sikerül 3–5 releváns pilot usert bevonni** | 🔴 Magas | 🟡 Közepes | 4. hétig aktív socialosok száma | Célzott outreach (network, szakmai csoportok), ösztönzők (ingyen használat, esettanulmány, workshop), threshold rugalmasítása (3 user is elég, de mélyen) |
| **Pilot user churn** (1–2 hét után abbahagyják) | 🟡 Közepes | 🟡 Közepes | WAU/MAU, poszt-szám brandenként | Weekly check-in hívások, gyors UX-fixek a blokkoló bugokra, világos onboarding (tutorial, guided tour) |
| **Pilot user túl „nice"** (pozitív szóban, de alacsony használat) | 🟡 Közepes | 🟡 Közepes | Magas NPS, alacsony WAU/poszt-szám | Anonim survey, objektív metrikák (usability rating, időmérés, retention) nagyobb súllyal esnek latba, mint „kedves szavak" |

---

## R2.3. Market & Competition Risks

| Kockázat | Impact | Valószínűség | Mitigation |
|----------|--------|--------------|------------|
| **Nagy incumbensek** (Buffer, Hootsuite) erősebb AI-feature-rel érkeznek | 🟡 Közepes | 🟡 Közepes | Fókusz: Agency-first, Brand Brain-first pozicionálás, magyar nyelv és lokális support; gyors reakció, ha releváns feature-t hoznak |
| **Meta policy változik** (AI jelölés kötelező) | 🟡 Közepes | 🟢 Alacsony | Már most tárolod az ai_generated flaget; ha policy jön, disclaimer / jelölés hozzáadása a posztokhoz |
| **AI/IP jogi bizonytalanság** | 🟢 Alacsony | 🟢 Alacsony | ToS-ben rögzíted: a tartalomért a user felel; P1-ben vizsgálható extra compliance, ha piaci igény lesz |

---

## R2.4. Pilot Design & Measurement Risk (ÚJ, kritikus)

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
