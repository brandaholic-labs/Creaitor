# A2: Technical Assumptions (Technikai Feltételezések)

| ID | Assumption | Impact ha invalid | Validation |
|----|------------|-------------------|------------|
| **A2.1** | **Meta Graph API stabil marad, nincs major breaking change v18 → v19 a pilot alatt** | Publishing feature blokkol → workaround VAGY manual publishing fallback | Meta Developer changelog követés, staging app tesztelés |
| **A2.2** | **OpenAI GPT-4o VAGY Anthropic Claude 3.5 elég jó AI output minőséget ad (P0: 1 provider)** | AI output gyenge → model switch, prompt tuning, dual-provider (P1) | H3 validálás: usable AI output rate |
| **A2.3** | **PostgreSQL + Prisma + egyszerű app-layer multi-tenancy elég 8-10 ügynökség skálához** | Performance issue → DB optimization VAGY korai P1 scaling | Load testing 10 ügynökség szimulációval, query performance monitoring |
| **A2.4** | **Cloudinary (P0) elég file storage-hoz, S3 nem szükséges** | Cloudinary limit/cost issue → S3 migráció | Havi Cloudinary usage tracking, cost monitoring |
| **A2.5** | **Node.js + Express + React stack (egyszerű monolit) elegendő a pilot-hoz** | Scalability/performance issue →架构 refactor (P1 microservices) | Response time monitoring (NFR1.1 targets) |
| **A2.6** | **DB-backed session (PostgreSQL) stabil elég, Redis nem kell P0-ban** | Session performance issue → Redis switch | Session latency monitoring, user login/logout experience feedback |

---
