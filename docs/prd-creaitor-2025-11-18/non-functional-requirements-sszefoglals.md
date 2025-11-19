# Non-Functional Requirements Összefoglalás

| NFR Kategória | Minimum (elfogadható P0) | Target (P0 cél) | Stretch (P1) |
|---------------|--------------------------|-----------------|--------------|
| **Pilot Skála** | 5 ügynökség, 15 márka, 10-15 user | 8-10 ügynökség, 40-50 márka, 20-30 user | 12+ ügynökség, 80+ márka, 40+ user |
| **Performance (AI gen)** | < 20 sec | < 10 sec | < 5 sec |
| **Performance (page load)** | < 5 sec | < 3 sec | < 1 sec |
| **Throughput (AI/nap)** | 50-100 poszt/nap | 150-200 poszt/nap | 300+ poszt/nap |
| **Security** | HTTPS, bcrypt, token encryption, basic auth | Min. 12 char password, CSRF token | 2FA, secrets manager, SOC2 audit |
| **Uptime** | 95% (best-effort) | 95% | 99.5% SLA, status page |
| **Error Handling** | Manual retry, basic error messages | Auto retry (1x), user-friendly errors | Exponential backoff, Sentry monitoring |
| **Backup** | Daily (7 nap retention) | Daily + manual verification | Hourly (30 nap), PITR, multi-region |
| **Browser Support** | Desktop Chrome/Firefox/Safari (latest 2) | Desktop + basic mobile support | Full responsive, mobile app |
| **Accessibility** | Keyboard navigation | Keyboard nav + alt text | WCAG 2.1 AA compliance |
| **Testing** | Manual testing, < 30% coverage | Manual + smoke tests | 80% unit test, E2E automated |
| **Monitoring** | Console logs, manual checks | Console logs + email alerts | Datadog/New Relic APM, uptime monitoring |
| **GDPR** | Minimál baseline (HTTPS, encryption, manuális deletion) | Privacy policy + ToS | Cookie consent, self-service deletion, DPA |
| **Deployment** | Single-server, manual deploy | Single-server + auto-deploy | Staging env, CI/CD, Docker, IaC |

**Kritikus NFR Döntések (konzisztens FR0.2-vel és sikerkritériumokkal):**
- ✅ **Pilot skála: 8-10 ügynökség** (nem 1-3!) → konzisztens sikerkritériumokkal
- ✅ **Jelszó policy: min. 12 char + uppercase + szám** → konzisztens FR1.1-gyel
- ✅ **Security baseline mandatory P0:** HTTPS, token encryption, manuális GDPR deletion
- ✅ **Mobile: basic support P0** (approve, schedule, edit mobilról is működik) → H2 adoption validálás
- ✅ **Min/Target/Stretch logika** minden metrikánál → konzisztens sikerkritérium struktúrával

**P0 filozófia ismétlés:**
> "Elég jó" egy 8-10 ügynökséges, 4-6 hetes pilothoz. Ha a hipotézisek validálódnak (H1, H2, H3) és target metrikákat elérjük (60%+ usable AI, 20-40% time savings, 8+ NPS) ÉS 3-5 pilot ügynökség mondja "ezt fizetném" → akkor skálázunk P1-re (production hardening, full GDPR, monitoring, CI/CD). Ha nem → akkor nem vesztettünk időt over-engineering-re, de **alapvető megbízhatóság és biztonság megvolt**.

---