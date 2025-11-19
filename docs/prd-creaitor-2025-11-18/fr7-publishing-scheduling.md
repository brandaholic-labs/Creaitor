# FR7: Publishing & Scheduling

## FR7.1: Meta Platform Publishing (P0)

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

## FR7.2: Scheduling Mechanizmus (P0)

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

## FR7.3: Publikálás Eredménye (P0)

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
