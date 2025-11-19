# FR4: Image Management (Kép kezelés)

## FR4.1: Saját Kép Feltöltés

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
