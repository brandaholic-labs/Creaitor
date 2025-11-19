# FR8: Instrumentation & Usage Tracking

## FR8.1: Backend Event Logging (P0)

**Cél:** Backend event-ek naplózása analytics és hipotézis-validálás céljából.

**Tracked Events:**

| Event | Paraméterek | Cél |
|-------|-------------|-----|
| `user_login` | user_id, timestamp | Session tracking |
| `page_view` | user_id, page_name, timestamp | Usage pattern (melyik oldalt használják) |
| `brand_created` | user_id, brand_id, timestamp | Adoption metrics |
| `ai_generation` | user_id, brand_id, post_id, generation_time_ms, timestamp | AI usage count + performance |
| `post_saved` | user_id, brand_id, post_id, status, usability_rating, timestamp | Content creation metrics |
| `post_published` | user_id, brand_id, post_id, platform, timestamp | Publishing metrics |
| `post_failed` | user_id, brand_id, post_id, error_code, timestamp | Error tracking |

**Adattárolás:**
- Events tárolása (relational DB vagy analytics DB - tech-agnostic)
- Retention: 12 hónap (pilot után döntés)

**P0 megjegyzés:** Backend-only logging, nincs user-facing dashboard (P1).

**P1 - Real-time dashboard:**
- Socialos-facing insights (hány poszt/hét, AI usage trend, stb.)
- Grafikonok, trend vizualizációk

---

## FR8.2: Használhatósági Rating Aggregáció (P0)

**Cél:** AI output minőség aggregálása (H1 validálás).

**Aggregáció:**
- Brand-szinten összesítés: hány `usable`, `heavy_edit`, `not_usable` rating
- Pilot-szinten összesítés: összes brand átlaga

**Output (P0 - admin-only, backend query vagy CSV export):**

| Brand | Total AI Posts | Usable % | Heavy Edit % | Not Usable % |
|-------|----------------|----------|--------------|--------------|
| Kis Kávézó | 24 | 70% (16) | 25% (6) | 5% (1) |
| Fitness XY | 18 | 60% (11) | 30% (5) | 10% (2) |

**H1 Validation:**
- **Success:** 60-70% `usable` rating
- **Acceptable:** 20-30% `heavy_edit`
- **Fail:** > 20% `not_usable`

**P1:** Szép UI socialosoknak, brand-level insights, real-time trend chart.

---
