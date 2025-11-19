# Technical Architecture Összefoglalás

| Komponens | P0-Core (mandatory) | P0-Nice (opcionális) | P1 (post-PMF) |
|-----------|---------------------|----------------------|---------------|
| **Architecture** | Monolitikus (FE + BE egyetlen deployment) | - | Microservices, event-driven |
| **Frontend** | React + TS + Tailwind + Router + Context/Zustand | React Query | Next.js (SSR), React Query |
| **Backend** | Express + TS + Prisma + cron | Winston/Pino | Fastify (performance), NestJS |
| **Database** | PostgreSQL (Render managed) | - | Read replicas, connection pooling |
| **Session** | **DB-backed (PostgreSQL)** | Redis | Redis (gyorsabb) |
| **File Storage** | **Cloudinary ONLY** | - | S3 + CloudFront CDN |
| **AI API** | **OpenAI GPT-4o VAGY Anthropic (válassz egyet)** | - | Mindkettő (dual-provider, fallback) |
| **Email** | **SendGrid VAGY Mailgun (válassz egyet)** | - | Mindkettő (fallback) |
| **Scheduling** | node-cron + **idempotencia** (lock, timestamp) | - | BullMQ queue, retry logic |
| **Multi-tenancy** | App-layer RLS (agencyId filter minden query) | - | DB-level RLS (PostgreSQL policy) |
| **Monitoring** | console.log | - | Datadog/New Relic APM, Sentry |
| **Deployment** | Render/Railway (git push → auto-build) | Docker | CI/CD, staging env, Docker |

**Kritikus TA Döntések:**
- ✅ **Session: DB-backed P0** (nem MemoryStore!) → stabil UX, restart-proof
- ✅ **Cron idempotencia P0** (publishing_lock, last_attempt_at) → duplikált poszt védelem
- ✅ **1 AI provider P0** (OpenAI VAGY Anthropic, nem mindkettő) → gyorsabb fejlesztés
- ✅ **Cloudinary P0, S3 OUT** → auto-resize, CDN, egyszerű API
- ✅ **Multi-tenancy: app-layer P0, DB RLS P1** → egyszerűbb start, later hardening
- ✅ **FB/IG token külön mezők** (nem egyetlen accessToken) → konzisztens FR-rel

**P0 filozófia ismétlés:**
> Egyszerű monolit, minimális stack complexity. **P0-core:** Mandatory tech (Meta API, 1 AI provider, Cloudinary, DB-backed session). **P0-nice:** Opcionális polish (Winston, Passport, stb.) - időhiány esetén elhagyható. **Cél:** Gyors pilot launch (4-6 hét), H1/H2/H3 validálás, **nem** technológiai felfedezés. Ha sikeres → P1 refactoring (queue, monitoring, dual-provider). Ha nem → nem vesztettünk időt over-engineering-re.

---
