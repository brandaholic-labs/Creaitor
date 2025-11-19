# TA1: High-Level System Architecture (P0)

**System Components (egyszerűsített):**

```
┌──────────────────────────────────────────────────────┐
│         User (Socialos) - Browser (Desktop)          │
└─────────────────┬────────────────────────────────────┘
                  │ HTTPS
                  ▼
┌──────────────────────────────────────────────────────┐
│             Frontend (React SPA)                     │
│  - React + TypeScript + Tailwind                    │
│  - React Router (client-side routing)               │
│  - Context API / Zustand (state)                    │
└─────────────────┬────────────────────────────────────┘
                  │ REST API (JSON)
                  ▼
┌──────────────────────────────────────────────────────┐
│            Backend API (Node.js)                     │
│  - Express + TypeScript                             │
│  - Prisma ORM (PostgreSQL)                          │
│  - express-session (DB-backed store)                │
│  - node-cron (scheduling cron job)                  │
└─┬───────┬───────┬───────┬──────────────────────────┘
  │       │       │       │
  │       │       │       └──> Cron Job (5 perc)
  │       │       │            - Check scheduled posts
  │       │       │            - Publish via Meta API
  │       │       │
  │       │       └──────────> Cloudinary
  │       │                    - Image upload (JPEG/PNG)
  │       │                    - Auto resize
  │       │
  │       └──────────────────> SendGrid / Mailgun
  │                            - Transactional emails
  │
  ├──────────────────────────> AI API
  │                            - OpenAI GPT-4o VAGY
  │                            - Anthropic Claude 3.5
  │                            - (P0: válassz egyet!)
  │
  └──────────────────────────> Meta Graph API
                               - FB Page + IG Account
                               - OAuth + Publishing

┌──────────────────────────────────────────────────────┐
│           Database (PostgreSQL)                      │
│  - Render / Railway managed DB                      │
│  - Tables: agencies, users, brands, posts, events   │
│  - Sessions table (express-session store)           │
└──────────────────────────────────────────────────────┘
```

**P0 megjegyzés:**
- **Monolitikus:** Frontend + Backend egyetlen repo (monorepo) vagy 2 külön repo (de egyetlen deployment)
- **Single-server:** Nincs load balancer, nincs horizontal scaling, nincs multi-region
- **Egyszerű scheduling:** node-cron (nem queue system - Sidekiq/BullMQ P1)

**P1 - Skálázás:**
- Background job queue (BullMQ, Sidekiq) → decoupled publishing, retry logic
- Redis cache (session store, API response cache)
- CDN (CloudFront, Cloudflare) → static asset delivery
- Horizontal scaling (Kubernetes, load balancer)

---
