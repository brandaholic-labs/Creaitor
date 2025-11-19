# NFR1: Performance (Teljesítmény)

## NFR1.1: Response Time

**Struktúra:** Minimum (elfogadható pilot alatt) / Target (P0 cél) / Stretch (P1 optimalizálás)

| Művelet | Minimum (elfogadható) | Target (P0) | Stretch (P1) | Mérhető? |
|---------|----------------------|-------------|--------------|----------|
| **Page Load** (Calendar, Brand Brain) | < 5 sec (első betöltés) | < 3 sec | < 1 sec | ✅ Browser DevTools (Lighthouse) |
| **AI Copy Generation** | < 20 sec (90th percentile) | < 10 sec | < 5 sec | ✅ Backend timer (generation_time_ms) |
| **Post Save** (Draft / Edit) | < 3 sec | < 2 sec | < 1 sec | ✅ Backend timer |
| **Meta API Publish** | < 10 sec (sikeres poszt) | < 5 sec | < 3 sec | ✅ Backend timer |

**Értelmezés:**
- **Minimum:** Ha túllépjük → user frustráció, de pilot alatt **elfogadható** (nem blocker)
- **Target:** Aktívan elérni próbáljuk P0 végére
- **Stretch:** P1 optimalizálás cél (caching, CDN, background queue)

**P0 tolerancia:**
- Ha AI generálás 15-20 sec → **minimum szinten van**, elfogadható (LLM latency, nem optimalizálunk P0-ban)
- Ha Meta API 10 sec → **minimum szinten van**, elfogadható (external dependency)
- Ha page load 5 sec → **minimum szinten van**, de javítandó (P1: code splitting, lazy loading)

**P1 - Optimalizáció:**
- Caching (Redis session store, API response cache)
- CDN (static assets: Cloudflare, AWS CloudFront)
- Database indexing (query optimization)
- Background job queue (publishing offload: BullMQ, Sidekiq)

---

## NFR1.2: Throughput

**Pilot skála throughput (target: 8-10 ügynökség, 40-50 márka, 20-30 user):**

| Metrika | Minimum | Target | Stretch |
|---------|---------|--------|---------|
| **Concurrent users** | 10-15 user | 20-30 user | 40+ user |
| **AI generálás / nap** | 50-100 poszt/nap | 150-200 poszt/nap | 300+ poszt/nap |
| **Publishing / nap** | 30-50 poszt/nap | 80-100 poszt/nap | 150+ poszt/nap |
| **Page views / nap** | 200-300 page view | 500-700 page view | 1000+ page view |

**Számítás logika (target szint - 8-10 ügynökség):**
- 20-30 user × 5-10 AI generálás/user/nap = 100-300 AI call/nap
- 40-50 márka × 1.5-2 poszt/márka/nap = 60-100 scheduled publish/nap
- 20-30 user × 20-30 page view/user/nap = 400-900 page view/nap

**P0 validáció:** Ha pilot során target throughput-ot problémamentesen kiszolgálja → elég.

**P1 - Skálázás (100+ user):**
- Horizontal scaling (multiple app servers: Kubernetes, Docker Swarm)
- Database read replicas
- Queue system (Sidekiq, BullMQ)
- Rate limiting (per-user API limits)

---
