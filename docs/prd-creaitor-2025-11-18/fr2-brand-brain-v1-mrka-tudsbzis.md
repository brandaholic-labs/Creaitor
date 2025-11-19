# FR2: Brand Brain v1 - Márka Tudásbázis

**Cél:** Strukturált márka-specifikus kontextus tárolása, amit az AI Copy Studio használ a generáláshoz.

## FR2.1: Brand Brain Adatmodell

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

## FR2.2: Brand Brain CRUD Műveletek

| Művelet | Input | Output | Üzleti szabály |
|---------|-------|--------|----------------|
| **Create** | Brand ID | Brand Brain üres JSON létrehozva (default) | Brand létrehozásakor automatikus |
| **Read** | Brand ID | Brand Brain JSON | User csak saját ügynökség márkáit látja (agency_id filter) |
| **Update** | Brand ID + módosított Brand Brain JSON | Brand Brain frissítve | Nincs verzió history (P1: verziókezelés, rollback) |
| **Delete** | N/A | N/A | Brand Brain NEM törölhető, csak üríthető (update empty JSON-nel) |

**Státuszgép:** Nincs (Brand Brain nincs jóváhagyási workflow, user szabadon szerkeszti).

---
