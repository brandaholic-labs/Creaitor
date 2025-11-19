# FR9: Data Model Summary (P0 Core Entities)

**Entitások és kapcsolatok:**

```
Agency (Ügynökség)
  ├─ id: UUID
  ├─ name: String
  ├─ owner_email: String
  └─ created_at: Timestamp

User
  ├─ id: UUID
  ├─ agency_id: UUID (FK → Agency)
  ├─ email: String (unique)
  ├─ role: String (P1: enum - admin, socialos)
  └─ created_at: Timestamp

Brand
  ├─ id: UUID
  ├─ agency_id: UUID (FK → Agency)
  ├─ name: String
  ├─ fb_page_id: String (nullable)
  ├─ ig_account_id: String (nullable)
  ├─ access_token_encrypted: String (nullable)
  ├─ brand_brain: JSON
  ├─ archived_at: Timestamp (nullable)
  └─ created_at: Timestamp

Post
  ├─ id: UUID
  ├─ brand_id: UUID (FK → Brand)
  ├─ user_id: UUID (FK → User)
  ├─ text: Text
  ├─ platform: String (facebook / instagram)
  ├─ status: String (draft / approved / scheduled / published / failed)
  ├─ ai_generated: Boolean
  ├─ usability_rating: String (usable / heavy_edit / not_usable, nullable)
  ├─ image_url: String (nullable)
  ├─ scheduled_at: Timestamp (nullable)
  ├─ published_at: Timestamp (nullable)
  ├─ fb_post_id: String (nullable)
  ├─ ig_media_id: String (nullable)
  ├─ error_message: String (nullable)
  └─ created_at: Timestamp

Event (Analytics)
  ├─ id: UUID
  ├─ user_id: UUID (FK → User)
  ├─ event_type: String
  ├─ event_data: JSON
  └─ timestamp: Timestamp
```

**P0 megjegyzés:** Nincs `Comment`, `Approval`, `Campaign`, `Notification` entitás (ezek P1).

**Részletes schema (field típusok, constraints, index-ek)** → Tech Spec dokumentumba tartozik.

---
