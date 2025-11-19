# FR3: AI Copy Studio - Szöveggenerálás

**Cél:** AI-alapú poszt szöveg generálás Brand Brain kontextussal.

## FR3.1: Poszt Generálás Flow

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

## FR3.2: Poszt Szerkesztés és Mentés

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
