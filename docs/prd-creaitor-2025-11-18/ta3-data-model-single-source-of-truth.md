# TA3: Data Model (Single Source of Truth)

> **Ez az adatmodell az autoritatív verzió.** FR-ek és Tech Spec (Prisma schema) ennek felel meg.

## TA3.1: Core Entities

**Agency (Ügynökség):**
```
Agency
  ├─ id: UUID (PK)
  ├─ name: String (max 100 char)
  ├─ owner_email: String (unique)
  ├─ created_at: Timestamp
  └─ updated_at: Timestamp
```

**User:**
```
User
  ├─ id: UUID (PK)
  ├─ agency_id: UUID (FK → Agency)
  ├─ email: String (unique)
  ├─ password_hash: String (bcrypt)
  ├─ role: String (P0: "admin" vagy "socialos", P1: enum)
  ├─ created_at: Timestamp
  └─ updated_at: Timestamp
```

**Brand:**
```
Brand
  ├─ id: UUID (PK)
  ├─ agency_id: UUID (FK → Agency)
  ├─ name: String (max 100 char)
  ├─ description: String (nullable, max 500 char)
  │
  ├─ fb_page_id: String (nullable)
  ├─ fb_page_name: String (nullable)
  ├─ fb_access_token_encrypted: String (nullable) - AES-256 encrypted
  ├─ fb_token_expires_at: Timestamp (nullable)
  │
  ├─ ig_account_id: String (nullable)
  ├─ ig_username: String (nullable)
  ├─ ig_access_token_encrypted: String (nullable) - AES-256 encrypted
  ├─ ig_token_expires_at: Timestamp (nullable)
  │
  ├─ brand_brain: JSON (Brand Brain v1 struktura - lásd TA3.2)
  ├─ archived_at: Timestamp (nullable - soft delete)
  ├─ created_at: Timestamp
  └─ updated_at: Timestamp
```

**FONTOS - FB/IG token kezelés:**
- **Külön mezők** FB és IG token-eknek (nem egyetlen `accessToken` mező!)
- **Külön expiry tracking** (60 napos lejárat követése)
- **Encrypted** (AES-256, encryption key env var-ból)

**Post:**
```
Post
  ├─ id: UUID (PK)
  ├─ brand_id: UUID (FK → Brand)
  ├─ user_id: UUID (FK → User - creator)
  ├─ text: Text
  ├─ platform: String ("facebook" vagy "instagram")
  ├─ status: String ("draft" | "approved" | "scheduled" | "published" | "failed")
  │
  ├─ ai_generated: Boolean (default: false)
  ├─ usability_rating: String (nullable: "usable" | "heavy_edit" | "not_usable")
  │
  ├─ image_url: String (nullable - Cloudinary URL)
  │
  ├─ scheduled_at: Timestamp (nullable)
  ├─ published_at: Timestamp (nullable)
  │
  ├─ fb_post_id: String (nullable - Meta API response)
  ├─ ig_media_id: String (nullable - Meta API response)
  │
  ├─ error_message: String (nullable - ha failed státusz)
  │
  ├─ publishing_lock: Boolean (default: false - idempotencia P0)
  ├─ last_publish_attempt_at: Timestamp (nullable - idempotencia P0)
  │
  ├─ created_at: Timestamp
  └─ updated_at: Timestamp
```

**FONTOS - Publishing idempotencia mezők (P0):**
- **publishing_lock:** Boolean flag → cron job ellenőrzi, ha `true` → skip (már folyamatban van)
- **last_publish_attempt_at:** Timestamp → ha < 5 perc → skip (túl közeli retry védelem)
- **Cél:** Duplikált poszt kockázat csökkentése (lásd TA5.2)

**Event (Analytics):**
```
Event
  ├─ id: UUID (PK)
  ├─ user_id: UUID (FK → User, nullable)
  ├─ event_type: String ("user_login", "ai_generation", "post_saved", stb.)
  ├─ event_data: JSON (event-specifikus paraméterek)
  └─ timestamp: Timestamp
```

**Session (express-session store):**
```
Session
  ├─ sid: String (PK - session ID)
  ├─ sess: JSON (session data: user_id, stb.)
  └─ expire: Timestamp (session expiry - 7 nap)
```

---

## TA3.2: Brand Brain JSON Structure (Autoritatív)

**Brand Brain v1 struktúra (brand_brain mező):**

```json
{
  "tone_of_voice": {
    "description": "string (max 1000 char)"
  },
  "key_messages": [
    "string (max 200 char)",
    ...  // max 10 darab
  ],
  "reference_posts": [
    {
      "text": "string (max 5000 char)",
      "source": "manual_input",
      "created_at": "ISO timestamp"
    },
    ...  // max 5 darab
  ],
  "visual_direction": {
    "description": "string (max 1000 char)"
  }
}
```

**Validáció:** Lásd FR2.1 (nincs kötelező mező P0-ban, de fallback prompt kezelés van - FR0.1).

---
