# NFR4: Reliability & Availability (Megbízhatóság)

## NFR4.1: Uptime

**P0 Target (pilot):**
- **Uptime:** 95% (4-6 hetes pilot során)
- **Planned downtime:** Max. 2 óra / hét (deployment, maintenance)
- **Incident response:** Best-effort (nincs 24/7 support, munkaidő: 9-17)

**P0 megjegyzés:** Ha pilot során 1-2 downtime incidens van (összesen 3-4 óra) → elfogadható. Nem kell 99.9% SLA pilot alatt.

**Realitás:**
- Render/Railway uptime: ~99.5% (infrastruktúra uptime)
- Ha Render/Railway down → **nincs fallback** P0-ban → user-eknek kommunikáció (email/Slack)

**P1 - Production SLA:**
- 99.5% uptime (43 perc downtime / hónap)
- Status page (status.creaitor.io) - real-time incident reporting
- Incident postmortem (minden > 1 órás downtime után)

---

## NFR4.2: Error Handling

**Backend error handling (P0):**

| Hiba Típus | P0 Viselkedés | User Feedback | Retry |
|------------|---------------|---------------|-------|
| **AI API hiba** (timeout, rate limit) | Retry 1x (auto), ha sikertelen → error | "AI generálás sikertelen. Próbáld újra!" | Manual retry gomb |
| **Meta API hiba** (token expire, rate limit) | No auto retry → error | "Publikálás sikertelen: {error_message}" | Manual retry gomb |
| **Database hiba** (connection timeout) | App crash (Render auto-restart) | 500 error page: "Hiba történt. Próbáld újra 1 perc múlva." | Auto restart (infra szinten) |
| **File upload hiba** (túl nagy fájl, invalid format) | Validation error | "Kép túl nagy (max 10MB) vagy invalid formátum." | User módosítja fájlt |

**Frontend error boundary (P0):**
- React Error Boundary (catch UI crashes, fallback UI)
- Fallback UI: "Valami hiba történt. Frissítsd az oldalt!"
- Error reporting: console.error (P1: Sentry error tracking)

**P0 megjegyzés:** Nincs robust retry logic (exponential backoff), nincs circuit breaker. Egyszerű error message + manual retry.

**P1 - Error Monitoring:**
- Sentry / Rollbar (exception tracking, stack trace)
- Alerting (Slack / email notifikáció kritikus hibáknál: > 10 error/óra)
- Error dashboards (error rate, error types, affected users)

---

## NFR4.3: Data Backup & Recovery

**Backup stratégia (P0):**
- **PostgreSQL:** Daily backup (Render / Railway auto-backup, 7 nap retention)
- **Manual backup verification:** Hetente egyszer (győződünk meg, hogy backup restorable)
- **Recovery:** Manual restore (best-effort, nincs automatikus failover)

**Recovery Time Objective (RTO) - P0:**
- **RTO (target):** < 4 óra (backup restore + app redeploy)
- **Realitás:** Ha Render/Railway teljes failure → manual migration másik providerre (1-2 nap)

**Recovery Point Objective (RPO) - P0:**
- **RPO (target):** < 24 óra (daily backup)
- **Elfogadható adatvesztés pilot alatt:** max. 24 óra adat (utolsó backup óta)

**P0 megjegyzés:** Ha adatvesztés történik (< 24 óra) → pilot során elfogadható. Nem kell multi-region replication.

**P1 - Production Backup:**
- Hourly backup (1 órás RPO)
- 30 napos retention
- Point-in-time recovery (PITR)
- Multi-region replication (AWS RDS, GCP Cloud SQL)

---
