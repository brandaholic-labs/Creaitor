# TA0: P0 Stack Philosophy - "Must" vs. "Nice to Have"

> **P0-core:** Minimális stack, ami P0 feature-ök implementálásához **feltétlenül kell**.
> **P0-nice:** Kényelmi/production-polish library-k, amik **elhagyhatók** időhiány esetén.

## TA0.1: P0-Core (Mandatory)

**Frontend (mandatory):**
- React 18+ (UI framework)
- TypeScript (type safety)
- Tailwind CSS (styling)
- React Router v6 (client-side routing)
- **State management:** React Context API VAGY Zustand (válassz egyet)
- **Forms:** React Hook Form + Zod (validation)
- Vite (build tool)

**Backend (mandatory):**
- Node.js 20 LTS (runtime)
- TypeScript (type safety)
- Express.js (web framework)
- Prisma (ORM - DB schema, migrations)
- **Session management:** express-session + **DB-backed session store** (PostgreSQL session table VAGY connect-pg-simple)
- **Auth:** Egyszerű email/password (custom implementation VAGY Passport.js - válassz egyet)
- node-cron (scheduling)

**Database & Storage (mandatory):**
- PostgreSQL 15+ (Render/Railway managed DB)
- **File storage:** Cloudinary (egyszerűbb setup, auto-resize, CDN beépített) - **P0: csak Cloudinary, S3 OUT**

**External Services (mandatory):**
- **Meta Graph API** (FB/IG publishing - nincs alternatíva)
- **AI API:** OpenAI GPT-4o VAGY Anthropic Claude 3.5 Sonnet - **P0: válassz egyet, mindkettő OUT**
- **Email:** SendGrid VAGY Mailgun - **P0: válassz egyet**

**Infrastructure (mandatory):**
- Render / Railway / Fly.io (managed hosting - **P0: válassz egyet**)
- Let's Encrypt (SSL - auto, Render/Railway beépített)

**Döntési pontok csökkentése (P0):**
- ❌ **S3 vagy Cloudinary?** → **Csak Cloudinary P0**
- ❌ **OpenAI vagy Anthropic?** → **Válassz egyet P0, mindkettő P1**
- ❌ **SendGrid vagy Mailgun?** → **Válassz egyet P0**
- ❌ **Context vagy Zustand?** → **Válassz egyet P0**
- ❌ **Custom auth vagy Passport?** → **Válassz egyet P0**

**Miért fontos ez:**
- Kevesebb mozgó alkatrész → gyorsabb fejlesztés
- Kevesebb provider → kevesebb integration debugging
- **Cél:** H1/H2/H3 hipotézisek validálása, **nem** technológiai felfedezés

---

## TA0.2: P0-Nice (Opcionális - időhiány esetén elhagyható)

**Frontend (nice-to-have):**
- Winston/Pino structured logging → **Helyette:** console.log (wrapper nélkül)
- React Query (TanStack Query) → **Helyette:** egyszerű axios fetch, Zustand-ban cache (ha kell)
- ESLint + Prettier (pre-commit hook) → **P0-nice:** Manual formatting, P1: automated

**Backend (nice-to-have):**
- Winston/Pino structured logging → **Helyette:** console.log (vagy egyszerű console wrapper)
- Passport.js (ha bonyolultnak tűnik) → **Helyette:** Egyszerű custom email/password auth (bcrypt + session)
- Zod backend validation → **P0-nice:** Csak frontend Zod, backend: egyszerű type check

**Infrastructure (nice-to-have):**
- Docker containerization → **P0:** Render/Railway natívan futtatja Node.js-t (package.json alapján)
- CI/CD pipeline → **P0:** Manual testing, manual deploy (git push → auto-build)

**Ha idő szűk, vágd le P0-nice-ot → Fókusz: core feature-ök (Brand Brain, AI Copy, Calendar, Publishing).**

---
