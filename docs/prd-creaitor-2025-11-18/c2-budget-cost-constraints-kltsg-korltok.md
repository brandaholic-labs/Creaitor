# C2: Budget & Cost Constraints (Költség Korlátok)

| ID | Constraint | Consequence | Mitigation |
|----|-----------|-------------|------------|
| **C2.1** | **API cost cap: ~$100-200/hó pilot alatt** (OpenAI/Anthropic) | Cost overrun → generation limit VAGY model downgrade | Monthly cost tracking, budget alert ($150 threshold) |
| **C2.2** | **Infrastructure: Render/Railway free tier VAGY basic plan (~$20-50/hó)** | Scale limit → performance degradation | Pilot scale (8-10 user) alatt free tier elég, monitoring |
| **C2.3** | **Cloudinary free tier (25 GB storage, 25 GB bandwidth/month)** | Limit túllépés → extra cost VAGY storage blokkol | Image optimization (resize), usage tracking |
| **C2.4** | **SendGrid/Mailgun free tier (100-300 email/month)** | Email limit → manual email fallback | Email only kritikus flow-knál (password reset, invite) |
| **C2.5** | **No paid tooling (Datadog, Sentry, etc.) P0** | Limited visibility → reactive debugging | Free alternatives (console.log, PostgreSQL logs), user feedback loop |

---
