# NFR3: Scalability (Skálázhatóság)

## NFR3.1: Pilot Skála (P0)

**MVP támogatott volumen (lásd NFR0.1):**
- **Ügynökség:** 5-10 agency (target: 8-10)
- **User:** 10-30 user (target: 20-30)
- **Márka:** 15-50 brand (target: 40-50)
- **Poszt:** 500-2000 poszt (4-6 hetes pilot, target: 1500-2000)

**Infrastruktúra (P0 - fizikailag single-server, logikailag multi-tenant):**
- Single-server deployment (Render, Railway, Fly.io managed service)
- PostgreSQL (single instance, Render/Railway managed DB, auto backup)
- Nincs Redis, nincs CDN, nincs auto-scaling

**P0 megjegyzés:** Ha pilot során target terhelést (8-10 ügynökség, 40-50 márka) problémamentesen kiszolgálja → sikeres pilot. Nem kell 100+ user-re skálázni P0-ban.

**Skálázási határok (P0 infra becslés):**
- Single-server (Render/Railway): max. 50-100 concurrent user (túl ezen: response time degradation)
- PostgreSQL single instance: max. 100k rows (posts table) → P0-ban 2000 poszt → rendben
- Meta API rate limit: 200 calls/óra (app-level) → P0-ban 100 publish/nap → rendben

---

## NFR3.2: Post-Pilot Skálázás (P1)

**Target skála (Post-PMF - 6-12 hónap):**
- **Ügynökség:** 50-100 agency
- **User:** 150-300 user
- **Márka:** 400-800 brand
- **Poszt:** 50k-100k poszt / év

**Infrastruktúra bővítés (P1):**
- Horizontal scaling (Kubernetes, Docker Swarm, load balancer)
- Database read replicas (PostgreSQL primary-replica setup)
- Redis cache layer (session store, API response cache)
- CDN (Cloudflare, AWS CloudFront) → static asset delivery
- Background job queue (Sidekiq, BullMQ) → decoupled publishing, retry logic
- Monitoring (Datadog, New Relic APM)

---
