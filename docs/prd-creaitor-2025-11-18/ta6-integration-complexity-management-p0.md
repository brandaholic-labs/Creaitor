# TA6: Integration Complexity Management (P0)

> **Cél:** Csökkenteni az integrációk komplexitását → fókusz a core value-ra (H1/H2/H3 validálás).

## TA6.1: Provider Choices (P0 - Egyszerűsített)

| Integration | P0 Choice | Alternatíva (OUT P0) | Indok |
|-------------|-----------|----------------------|-------|
| **AI API** | OpenAI GPT-4o | Anthropic Claude (P1) | Szélesebb support, több példakód |
| **File Storage** | Cloudinary | S3 (P1) | Auto-resize, CDN, egyszerű API |
| **Email** | SendGrid | Mailgun (P1) | Free tier, egyszerű setup |
| **Hosting** | Render | Railway, Fly.io (P1) | Managed PostgreSQL, SSL auto |

**Miért fontos ez:**
- Kevesebb provider → kevesebb credential management
- Kevesebb API-szokás tanulás → gyorsabb fejlesztés
- **Cél:** 4-6 hét alatt pilot launch, **nem** technológiai exploration

---

## TA6.2: Integration Priority (P0)

**Core integrations (mandatory P0):**
1. **Meta Graph API** (nincs alternatíva - core dependency)
2. **AI API** (1 provider - OpenAI VAGY Anthropic)
3. **PostgreSQL** (Render managed DB)
4. **Cloudinary** (file storage)

**Secondary integrations (P0-nice - elhagyható időhiány esetén):**
5. **SendGrid** (email - password reset, user invite)
6. **Session store** (DB-backed - **mandatory stability-ért**, de egyszerű setup)

**Out of scope P0:**
- ❌ Monitoring (Datadog, New Relic) → P1
- ❌ Error tracking (Sentry) → P1
- ❌ Analytics (Mixpanel, Amplitude) → P1
- ❌ CDN (CloudFront, Cloudflare) → P1

**Ha idő szűk:**
- Fókusz: Meta API + AI API + PostgreSQL + Cloudinary
- Email: Lehet manuális (admin küld email-t kézzel pilot alatt)

---
