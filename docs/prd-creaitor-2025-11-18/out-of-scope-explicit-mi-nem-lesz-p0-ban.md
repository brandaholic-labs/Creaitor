# Out of Scope (Explicit - Mi NEM lesz P0-ban)

> **Fontos:** Ezek a feature-ök/funkciók **NEM részei a P0 MVP-nek**. P1-ben vizsgálhatók, ha a pilot sikeres.

## Feature Out of Scope (P0)

| Feature/Funkció | Miért OUT | Mikor jöhet (P1/P2) |
|-----------------|-----------|---------------------|
| **Instant publish** (azonnal publikál, nem schedule) | H1/H2/H3 validáláshoz scheduling elég | P1 - ha user igény erős |
| **Multi-user approval flow** (több socialos review-olja) | Pilot skála (1-2 socialos/ügynökség) → pseudo-approval elég | P1 - nagyobb team-ek esetén |
| **Analytics/Insights** (poszt performance, engagement metrics) | Nem core value prop, Meta Business Suite megteszi | P2 - native analytics integration |
| **Instagram Stories/Reels** (csak feed poszt P0) | Complexity magas, feed poszt validálja core workflow-t | P1 - ha feed workflow sikeres |
| **TikTok/LinkedIn/Twitter integráció** | Meta (FB/IG) elég P0 validáláshoz | P1/P2 - platform expansion |
| **AI image generation** (Nano Banana + Seedream) | Architecture dokumentum teljes implementációt tartalmaz, de prioritás P1 (sprint planning során döntés) | P1 - ha core AI copy sikeres |
| **AI video generation** | Complexity very high, out of scope pilot-hoz | P2+ - jövőbeli feature |
| **Team management** (role-based access, permissions) | Pilot: 1-2 user/ügynökség → admin/socialos elég | P1 - multi-user team-ek esetén |
| **White-label / agency branding** | Nem core value prop pilot-hoz | P2 - enterprise feature |
| **API access / webhooks** | Developer feature, nem pilot célcsoport | P2+ - developer ecosystem |

---

## Platform/Technology Out of Scope (P0)

| Platform/Tech | Miért OUT | Mikor jöhet (P1/P2) |
|---------------|-----------|---------------------|
| **Mobile app (iOS/Android native)** | Desktop-first, web app elég pilot-hoz | P2 - ha web adoption magas |
| **Mobile-optimized responsive design (full UX)** | Basic mobile support elég P0 (emergency access) | P1 - mobile usage data alapján |
| **CI/CD automation** (GitHub Actions, automated tests) | Manual testing elég pilot-hoz | P1 - production hardening |
| **Microservices architecture** | Monolit egyszerűbb, gyorsabb dev | P1 - ha scalability issue |
| **Redis caching** | PostgreSQL elég 8-10 user skálához | P1 - ha performance issue |
| **S3 file storage** | Cloudinary egyszerűbb, P0 elég | P1 - ha cost optimization szükséges |
| **Dual AI provider (OpenAI + Anthropic)** | 1 provider elég P0 validáláshoz | P1 - fallback/redundancy |
| **Advanced monitoring** (Datadog, New Relic, Sentry) | console.log + user feedback elég pilot-hoz | P1 - production monitoring |
| **Kubernetes / Docker containerization** | Render/Railway natívan futtat Node.js-t | P1 - infrastructure as code |
| **Multi-region deployment** | Single region (EU/US) elég pilot-hoz | P2 - global expansion |

---

## Business/Process Out of Scope (P0)

| Business Feature | Miért OUT | Mikor jöhet (P1/P2) |
|------------------|-----------|---------------------|
| **Pricing/billing implementation** | Pilot ingyenes (freemium validálás) | P1 - monetization phase |
| **Invoicing/payment processing** | Nincs fizető user P0-ban | P1 - Stripe integration |
| **Customer support ticketing system** | Slack/Discord elég pilot-hoz | P1 - customer support scaling |
| **Onboarding video/tutorial (automated)** | Manual onboarding elég 3-5 ügynökséghez | P1 - self-serve onboarding |
| **Marketing website (landing page, blog)** | Pilot: direkt outreach, nincs inbound | P1 - marketing/growth phase |
| **Email marketing automation** | Pilot: manual communication elég | P1 - user lifecycle emails |
| **User referral program** | Nincs elég user P0-ban referral-hoz | P2 - growth hacking |
| **SLA guarantees** (99.9% uptime, support SLA) | Pilot: best-effort elég | P1 - production SLA |

---
