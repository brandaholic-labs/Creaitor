# C1: Technical Constraints (Technikai Korlátok)

| ID | Constraint | Consequence | Mitigation |
|----|-----------|-------------|------------|
| **C1.1** | **Meta Graph API dependency** (nincs alternatíva FB/IG publishing-hoz) | Meta policy change/API change → publishing blokkol | Version pinning (v18), Meta Developer Newsletter, staging app |
| **C1.2** | **Desktop-first UI (mobil: basic support only, nem full UX)** | Mobil user experience gyenge → mobile adoption alacsony | Explicit kommunikáció: "P0 desktop-first, P1 mobile UX" |
| **C1.3** | **Single AI provider P0 (OpenAI VAGY Anthropic, nem dual)** | Provider downtime/pricing → AI feature blokkol | Fallback: manual copy workflow mérhető (calendar adoption) |
| **C1.4** | **Cloudinary only (S3 out of scope P0)** | Cloudinary limit → file storage blokkol | Cost monitoring, fallback: text-only pilot phase |
| **C1.5** | **No CI/CD automation P0 (manual testing/deploy)** | Deploy slower, manual QA → deploy risky | Smoke test checklist, staging env (optional), rollback plan |
| **C1.6** | **No production monitoring/alerting (Datadog, Sentry out P0)** | Bug/downtime detection delayed → user experience | Pilot user Slack csatorna (real-time feedback), manual health check |

---
