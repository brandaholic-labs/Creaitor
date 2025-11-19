# TA2: Technology Stack Decisions (P0)

## TA2.1: Frontend Stack

| Komponens | P0-Core (mandatory) | P0-Nice (opcionális) | Döntési indok |
|-----------|---------------------|----------------------|---------------|
| **Framework** | React 18+ | - | Széles ecosystem, jó TypeScript support |
| **Language** | TypeScript (strict) | - | Type safety, DX, kevesebb runtime hiba |
| **Styling** | Tailwind CSS | - | Gyors UI development, utility-first |
| **State** | Context API VAGY Zustand | React Query (cache) | Egyszerű state management elég |
| **Routing** | React Router v6 | - | Standard, proven |
| **Forms** | React Hook Form + Zod | - | Validation + performance |
| **HTTP** | Axios / Fetch API | - | Egyszerű fetch elég P0-ban |
| **Build** | Vite | - | Gyors dev server |

**P0 Package list (frontend - minimalizált):**
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "zustand": "^4.4.0",
    "axios": "^1.6.0",
    "react-hook-form": "^7.48.0",
    "zod": "^3.22.0",
    "tailwindcss": "^3.3.0"
  },
  "devDependencies": {
    "typescript": "^5.2.0",
    "vite": "^5.0.0",
    "@types/react": "^18.2.0"
  }
}
```

---

## TA2.2: Backend Stack

| Komponens | P0-Core (mandatory) | P0-Nice (opcionális) | Döntési indok |
|-----------|---------------------|----------------------|---------------|
| **Runtime** | Node.js 20 LTS | - | Proven, széles ecosystem |
| **Framework** | Express.js | - | Egyszerű, jól ismert |
| **Language** | TypeScript (strict) | - | Type safety, shared types (FE-BE) |
| **ORM** | Prisma | - | Modern DX, type-safe, migrations |
| **Auth** | express-session + Passport VAGY custom | - | Session-based, egyszerű |
| **Session Store** | **DB-backed (PostgreSQL)** | Redis | **P0: PostgreSQL session table (idempotent, persistent)** |
| **Scheduling** | node-cron | - | Egyszerű cron job (5 perc) |
| **Logging** | console.log | Winston/Pino | **P0: egyszerű console elég** |

**P0 Package list (backend - minimalizált):**
```json
{
  "dependencies": {
    "express": "^4.18.0",
    "typescript": "^5.2.0",
    "prisma": "^5.7.0",
    "@prisma/client": "^5.7.0",
    "express-session": "^1.17.0",
    "connect-pg-simple": "^9.0.0",
    "bcrypt": "^5.1.0",
    "node-cron": "^3.0.0",
    "axios": "^1.6.0",
    "dotenv": "^16.3.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.0",
    "@types/node": "^20.10.0",
    "ts-node": "^10.9.0"
  }
}
```

**Session Store Döntés (P0):**
- ❌ **MemoryStore (default express-session):** Session elvész restart-nál → instabil user élmény → **NEM ELFOGADHATÓ P0-ban**
- ✅ **DB-backed (connect-pg-simple):** Session perzisztens PostgreSQL-ben → restart-proof → **P0 MANDATORY**
- ✅ **Redis (alternative):** Gyorsabb, de extra dependency → **P1** (ha performance issue)

**Miért fontos session store P0-ban:**
- Ha MemoryStore → app restart/deploy → user random kijelentkezik → **bizalomvesztés pilotban**
- DB-backed session → minimális complexity növelés, de stabil UX

---

## TA2.3: Database & Storage

| Komponens | P0 Választás | Alternatíva (P1) | Döntési indok |
|-----------|--------------|------------------|---------------|
| **Primary DB** | PostgreSQL 15+ | - | Relational data, JSON support, ACID |
| **Hosting** | Render Managed / Railway | Supabase, AWS RDS, Neon | Egyszerű setup, auto backup |
| **Migration** | Prisma Migrate | - | Deklaratív schema, version control |
| **File Storage** | **Cloudinary (P0 ONLY)** | S3 (P1) | **Auto-resize, CDN, egyszerű setup** |
| **Cache** | - | Redis (P1) | P0: nincs cache layer |

**Cloudinary vs. S3 döntés (P0):**
- ✅ **Cloudinary P0:** Auto-resize (1200×630, 1080×1080), CDN beépített, egyszerű API → **GYORSABB FEJLESZTÉS**
- ❌ **S3 OUT P0:** Manual resize implementation, CDN setup (CloudFront), több kód → **LASSABB FEJLESZTÉS**
- **P1:** S3 + CloudFront (olcsóbb nagy volumen esetén, de több work)

**Miért fontos ez:**
- Kevesebb integration → kevesebb debugging → **gyorsabb pilot launch**

---

## TA2.4: External Services (P0)

| Service | P0 Választás | Alternatíva (P1) | Döntési indok |
|---------|--------------|------------------|---------------|
| **AI API** | **OpenAI GPT-4o VAGY Anthropic Claude 3.5 (válassz egyet)** | Mindkettő (P1) | **P0: 1 provider → gyorsabb fejlesztés** |
| **Email** | **SendGrid VAGY Mailgun (válassz egyet)** | Mindkettő (P1) | **P0: 1 provider** |
| **Meta API** | Meta Graph API v18.0+ | - | Nincs alternatíva (core dependency) |
| **Hosting** | **Render VAGY Railway VAGY Fly.io (válassz egyet)** | - | **P0: 1 platform** |

**AI Provider Döntés (P0):**
- **Választási szempontok:**
  - **OpenAI GPT-4o:** Jobb ismert, több példakód, széles community support → **Javaslat: kezdj ezzel**
  - **Anthropic Claude 3.5 Sonnet:** Jobb hosszú context handling, instruction following → Alternatíva, ha OpenAI nem felel meg
- **P0: Válassz egyet, ne implementáld mindkettőt** (P1: dual-provider support, model switching)

**Email Provider Döntés (P0):**
- **SendGrid:** Jó UI, egyszerű setup, free tier (100 email/nap)
- **Mailgun:** Jobb deliverability (tapasztalat szerint), de bonyolultabb setup
- **P0: Válassz egyet** (P1: fallback provider)

**Hosting Platform Döntés (P0):**
- **Render:** Egyszerű UI, jó PostgreSQL managed DB, auto SSL
- **Railway:** Gyorsabb deploy, jó DX, de drágább
- **Fly.io:** Leggyorsabb (edge deployment), de bonyolultabb config
- **P0: Javaslat - Render** (egyszerűség), de válassz egyet és maradj nála

---
