# NFR6: Maintainability (Karbantarthatóság)

## NFR6.1: Code Quality

**P0 - Alapvető clean code:**
- ESLint / Prettier (auto-format, pre-commit hook)
- TypeScript (strict mode: true, minden file .ts/.tsx)
- Nincs unit test coverage target (< 30% → elfogadható P0-ban)
- Nincs code review kötelezettség (solo dev / kis csapat → review nice-to-have)

**P1 - Production-grade:**
- Unit test (80% coverage: Jest, Vitest)
- E2E test (Playwright, Cypress - critical user flows)
- Code review (PR approval required, min. 1 reviewer)
- CI/CD pipeline (automated testing, linting, build)

---

## NFR6.2: Documentation

**P0 - Minimális:**
- README.md (setup instructions: local dev environment, environment variables)
- `.env.example` (környezeti változók listája, példa értékekkel)
- Inline code comments (complex logic, non-obvious decisions)
- Nincs külső dokumentáció (Notion, Confluence)

**P1 - Comprehensive:**
- API dokumentáció (Swagger / OpenAPI spec)
- Onboarding guide (új developer számára: architecture overview, code structure)
- Runbook (deployment, troubleshooting, incident response)

---

## NFR6.3: Monitoring & Observability

**P0 - Alapvető logging:**
- Console logs (backend: Winston / Pino structured logging)
- Browser console (frontend: console.error user-facing errors)
- Nincs centralized logging (Datadog, Splunk)
- Nincs APM (Application Performance Monitoring)

**P0 monitoring:**
- Manual checks (használat tracking data: FR8.1 backend events)
- Email alert kritikus hibáknál (pl. ha Meta API 10x egymás után fail → email a dev-nek)

**P1 - Production monitoring:**
- Datadog / New Relic (APM: request latency, error rate, throughput)
- LogDNA / Papertrail (log aggregation, search, alerting)
- Uptime monitoring (Pingdom, UptimeRobot - external check every 5 min)
- Alert dashboards (Slack integration: critical errors, downtime)

---
