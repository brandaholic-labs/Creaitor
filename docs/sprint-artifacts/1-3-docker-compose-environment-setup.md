# Story 1.3: Docker Compose Environment Setup

Status: drafted

## Story

As a **developer**,
I want **Docker Compose configuration for local development environment**,
so that **all services (Next.js, Redis, Supabase) run consistently across different development machines**.

## Requirements Context

Ez a story a Creaitor lokális fejlesztői környezet Docker-alapú containerizálását hozza létre. Az **Epic 1: Foundation & Development Infrastructure** harmadik lépéseként biztosítja, hogy minden fejlesztő ugyanazt a környezetet használja, és a szolgáltatások (Next.js app, Redis, Supabase PostgreSQL) konzisztensen működjenek.

[Source: docs/epics/epic-1-foundation-development-infrastructure.md § Story 1.3]

**Üzleti indoklás:** Konzisztens fejlesztői környezet biztosítása, amely csökkenti a "works on my machine" problémákat és gyorsítja az onboarding folyamatot. Docker Compose lehetővé teszi, hogy egyetlen parancs (`docker-compose up`) elindítsa az összes szükséges szolgáltatást.

**Kapcsolódás az architektúrához:**
- **Architecture § Docker Setup (lines 1374-1435):** Production docker-compose.prod.yml referencia (app, worker, redis services)
- **Architecture § Development Environment (lines 1505-1565):** Lokális fejlesztéshez Redis Docker container használata
- **Architecture § Project Structure (lines 322-326):** `docker/` directory struktúra (Dockerfile, docker-compose.yml, docker-compose.prod.yml)

**PRD Requirements lefedettség:**
- **NFR8: Deployment & DevOps:** Lokális fejlesztői környezet konzisztenciája, Docker-alapú containerizáció
- **TA0: Technology Stack Decisions - Infrastructure:** Docker Compose használata lokális fejlesztéshez

[Source: docs/archive/prd-creaitor-2025-11-18.md § NFR8: Deployment & DevOps / TA0: Technology Stack Decisions - Infrastructure]

**Tech Spec Epic 1 hivatkozás:**
- [Source: docs/sprint-artifacts/tech-spec-epic-1.md § Story 1.3 Acceptance Criteria (lines 1129-1140)]
- [Source: docs/sprint-artifacts/tech-spec-epic-1.md § Story Implementation Workflow (lines 682-704)] - Story 1.3 a harmadik lépés az infrastructure setup-ban

## Acceptance Criteria

1. **AC1: `docker-compose up` futtatása után minden service elindul**
   - `next-app` service: Next.js development server port 3000-en
   - `redis` service: Redis server port 6379-en (BullMQ queue-hoz)
   - `supabase-db` service: PostgreSQL database (Supabase local instance, port 54322)

2. **AC2: docker-compose.yml definiálja a service-eket**
   - Volume mounts hot reload-hoz (src/ directory mounted)
   - Environment variable injection `.env.local` fájlból
   - Network konfiguráció inter-service kommunikációhoz (Docker bridge network)
   - Service dependencies (next-app depends_on: redis, supabase-db)

3. **AC3: `.dockerignore` kizárja a felesleges fájlokat**
   - `node_modules/` kizárva (Docker build context-ből)
   - `.next/` kizárva (build artifacts)
   - `.git/` kizárva (version control)
   - `.env.local` kizárva (secrets, environment variables injection-nel kezelve)

4. **AC4: `Dockerfile.dev` létezik Next.js development container-hez**
   - Node.js 20 Alpine base image
   - Development dependencies telepítve
   - Hot reload support (Next.js dev server)
   - Working directory: `/app`
   - Port 3000 exposed

5. **AC5: Service-ek kommunikálnak egymással**
   - Next.js → Redis: `REDIS_URL=redis://redis:6379` (service name resolution)
   - Next.js → Supabase: `NEXT_PUBLIC_SUPABASE_URL` environment variable (localhost:54321 vagy service name)
   - Network connectivity tesztelve (health check vagy manual test)

## Tasks / Subtasks

- [ ] **Task 1: Docker Compose konfiguráció létrehozása** (AC: #1, #2)
  - [ ] Subtask 1.1: Create `docker-compose.yml` file in project root
  - [ ] Subtask 1.2: Define `next-app` service:
    - Build context: `.` (project root)
    - Dockerfile: `Dockerfile.dev`
    - Port mapping: `3000:3000`
    - Volume mounts: `./src:/app/src` (hot reload), `./package.json:/app/package.json`, `./package-lock.json:/app/package-lock.json`
    - Environment variables: Load from `.env.local` (use `env_file: .env.local`)
    - Working directory: `/app`
    - Command: `npm run dev`
  - [ ] Subtask 1.3: Define `redis` service:
    - Image: `redis:7-alpine`
    - Port mapping: `6379:6379`
    - Volume: `redis-data:/data` (persistent storage)
    - Health check: `redis-cli ping`
  - [ ] Subtask 1.4: Define `supabase-db` service (optional - Supabase CLI-t használhatjuk helyette):
    - Image: `supabase/postgres:15.1.0.147` (vagy Supabase local instance használata)
    - Port mapping: `54322:5432` (PostgreSQL port)
    - Environment: `POSTGRES_PASSWORD`, `POSTGRES_DB`
    - Volume: `supabase-db-data:/var/lib/postgresql/data`
    - **Note:** Alternatíva: Supabase CLI (`npx supabase start`) használata Docker Compose-on kívül (egyszerűbb setup)
  - [ ] Subtask 1.5: Define Docker network: `creaitor-network` (bridge driver)
  - [ ] Subtask 1.6: Define volumes: `redis-data` (persistent Redis data)
  - [ ] Subtask 1.7: Add service dependencies: `next-app` depends_on `redis` (health check)
  - [ ] Subtask 1.8: Test `docker-compose up` - verify all services start successfully

- [ ] **Task 2: Dockerfile.dev létrehozása** (AC: #4)
  - [ ] Subtask 2.1: Create `Dockerfile.dev` in project root
  - [ ] Subtask 2.2: Use base image: `node:20-alpine`
  - [ ] Subtask 2.3: Set working directory: `WORKDIR /app`
  - [ ] Subtask 2.4: Copy package files: `COPY package*.json ./`
  - [ ] Subtask 2.5: Install dependencies: `RUN npm install` (development dependencies included)
  - [ ] Subtask 2.6: Copy source code: `COPY . .` (will be overridden by volume mount in docker-compose.yml)
  - [ ] Subtask 2.7: Expose port: `EXPOSE 3000`
  - [ ] Subtask 2.8: Set default command: `CMD ["npm", "run", "dev"]`
  - [ ] Subtask 2.9: Test Docker build: `docker build -f Dockerfile.dev -t creaitor-dev .`

- [ ] **Task 3: .dockerignore fájl létrehozása** (AC: #3)
  - [ ] Subtask 3.1: Create `.dockerignore` file in project root
  - [ ] Subtask 3.2: Add exclusions:
    - `node_modules/`
    - `.next/`
    - `.git/`
    - `.env.local` (secrets, handled via env_file in docker-compose.yml)
    - `.env*.local`
    - `dist/`
    - `build/`
    - `coverage/`
    - `.DS_Store`
    - `*.log`
    - `*.md` (optional - exclude docs from build context)
  - [ ] Subtask 3.3: Verify `.dockerignore` works: `docker build` should skip excluded files

- [ ] **Task 4: Environment variables konfiguráció** (AC: #2, #5)
  - [ ] Subtask 4.1: Verify `.env.local` exists (created in Story 1.2)
  - [ ] Subtask 4.2: Update `docker-compose.yml` to use `env_file: .env.local` for `next-app` service
  - [ ] Subtask 4.3: Add `REDIS_URL=redis://redis:6379` to `.env.local` (Docker service name resolution)
  - [ ] Subtask 4.4: Verify Supabase connection: `NEXT_PUBLIC_SUPABASE_URL` works (localhost:54321 vagy service name)
  - [ ] Subtask 4.5: Test environment variable injection: `docker-compose exec next-app env | grep SUPABASE`

- [ ] **Task 5: Service kommunikáció tesztelése** (AC: #5)
  - [ ] Subtask 5.1: Start services: `docker-compose up -d`
  - [ ] Subtask 5.2: Test Next.js → Redis connection:
    - Create test API route: `GET /api/test-redis`
    - Use `ioredis` to connect to `redis://redis:6379`
    - Test: `SET test-key "test-value"`, `GET test-key`
    - Verify connection works
  - [ ] Subtask 5.3: Test Next.js → Supabase connection:
    - Use existing test route: `GET /api/test-db` (from Story 1.2)
    - Verify Supabase client connects successfully
    - Query test: `SELECT * FROM agencies LIMIT 1`
  - [ ] Subtask 5.4: Verify network connectivity: `docker-compose exec next-app ping redis` (should resolve)

- [ ] **Task 6: Dokumentáció és validation** (AC: #1, #2, #3, #4, #5)
  - [ ] Subtask 6.1: Update README.md with Docker Compose setup instructions:
    - Prerequisites: Docker and Docker Compose installed
    - Commands: `docker-compose up`, `docker-compose down`, `docker-compose logs`
    - Service URLs: Next.js (http://localhost:3000), Redis (localhost:6379)
  - [ ] Subtask 6.2: Add `package.json` scripts (optional convenience):
    - `npm run docker:up` → `docker-compose up`
    - `npm run docker:down` → `docker-compose down`
    - `npm run docker:logs` → `docker-compose logs -f`
  - [ ] Subtask 6.3: Test full workflow:
    - `docker-compose down` (cleanup)
    - `docker-compose up -d` (start services)
    - Wait for services to be healthy
    - Verify Next.js accessible: `curl http://localhost:3000`
    - Verify Redis accessible: `docker-compose exec redis redis-cli ping`
  - [ ] Subtask 6.4: Commit changes: `git add . && git commit -m "feat(epic-1): Story 1.3 - Docker Compose environment setup"`

## Dev Notes

### Architecture Constraints

**Docker Setup Pattern (Architecture § Docker Setup, lines 1374-1435):**
- **Production docker-compose.prod.yml:** Reference implementation (app, worker, redis services)
- **Development docker-compose.yml:** Lokális fejlesztéshez (next-app, redis, optional supabase-db)
- **Dockerfile.dev:** Development container (Node.js 20 Alpine, hot reload support)
- **Network:** Bridge network (`creaitor-network`) inter-service kommunikációhoz
- **Volumes:** Persistent storage Redis-hez (`redis-data`)

**Service Communication Pattern:**
- **Next.js → Redis:** Service name resolution (`redis://redis:6379` in Docker network)
- **Next.js → Supabase:** Environment variable (`NEXT_PUBLIC_SUPABASE_URL`) - lehet localhost:54321 (Supabase CLI) vagy service name (ha Supabase is Docker-ben)
- **Health Checks:** Redis health check (`redis-cli ping`) service dependency-hez

**Supabase Integration Strategy:**
- **Option A (Recommended):** Supabase CLI használata (`npx supabase start`) Docker Compose-on kívül
  - Pros: Egyszerűbb setup, Supabase Studio elérhető (port 54323), migration workflow könnyebb
  - Cons: Nem teljesen containerized
- **Option B:** Supabase PostgreSQL service Docker Compose-ban
  - Pros: Teljes containerization
  - Cons: Supabase Studio nem elérhető, migration workflow komplexebb
- **Decision:** Option A (Supabase CLI) - Story 1.2-ben már beállítva, egyszerűbb workflow

**Volume Mounts for Hot Reload:**
- `./src:/app/src` - Source code changes trigger Next.js hot reload
- `./package.json:/app/package.json` - Package changes require container restart
- `./package-lock.json:/app/package-lock.json` - Lock file consistency

### Testing Strategy

**Story 1.3 Testing (Tech Spec § Test Coverage Targets):**
- **Unit tests:** Nincs (infrastructure setup, nincs business logic)
- **Integration tests:** Service connectivity tests (~70% coverage target)
- **E2E tests:** Nincs (még nincs feature UI)
- **Manual testing checklist:**
  - [ ] `docker-compose up` starts all services successfully
  - [ ] Next.js accessible: http://localhost:3000
  - [ ] Redis accessible: `docker-compose exec redis redis-cli ping` returns `PONG`
  - [ ] Next.js → Redis connection works: Test API route `/api/test-redis`
  - [ ] Next.js → Supabase connection works: Test API route `/api/test-db` (from Story 1.2)
  - [ ] Hot reload works: Edit `src/app/page.tsx`, verify changes appear without container restart

**Integration Test Example (Story 1.4 implementálja):**
```typescript
// tests/integration/docker-services.test.ts
import { createClient } from 'ioredis'
import { createClient as createSupabaseClient } from '@/lib/supabase/server'

describe('Docker Services Connectivity', () => {
  it('should connect to Redis', async () => {
    const redis = new createClient('redis://localhost:6379')
    const result = await redis.ping()
    expect(result).toBe('PONG')
    await redis.quit()
  })

  it('should connect to Supabase', async () => {
    const supabase = await createSupabaseClient()
    const { data, error } = await supabase.from('agencies').select('*').limit(1)
    expect(error).toBeNull()
  })
})
```

### Project Structure Notes

**Architecture Compliance (Architecture § Project Structure, lines 322-326):**

```
creaitor/
├── docker/                              # 🆕 Future: Production Dockerfiles (Story 1.6)
│   ├── Dockerfile                       # 🆕 Future: Production Next.js app
│   ├── Dockerfile.worker                # 🆕 Future: Background worker
│   └── docker-compose.prod.yml         # 🆕 Future: Production compose
│
├── Dockerfile.dev                       # 🆕 Task 2 (development container)
├── docker-compose.yml                   # 🆕 Task 1 (local development)
├── .dockerignore                        # 🆕 Task 3 (build context exclusions)
│
├── .env.local                          # 🔄 Updated (Task 4: REDIS_URL added)
├── package.json                        # 🔄 Updated (Task 6: docker scripts optional)
└── README.md                           # 🔄 Updated (Task 6: Docker setup instructions)
```

**Detektált eltérések és indoklás:**
- **Architecture reference:** `docker/` directory production Dockerfiles-hez (Story 1.6), de development Dockerfile.dev a project root-ban (egyszerűbb, standard practice)
- **Supabase service:** Nem Docker Compose-ban (Supabase CLI használata) - egyszerűbb workflow, Story 1.2-ben már beállítva

### Learnings from Previous Story

**From Story 1.2 (Status: done)**

Story 1.2 successfully established Supabase infrastructure. Key learnings for Story 1.3:

**New Patterns/Services Created (Reuse, not recreate):**
- ✅ **Supabase client:** `src/lib/supabase/client.ts`, `src/lib/supabase/server.ts`, `src/lib/supabase/middleware.ts` already exist
- ✅ **Environment variables:** `.env.local` already exists with Supabase connection details
- ✅ **Test API route:** `src/app/api/test-db/route.ts` exists - reuse for Supabase connectivity test in Task 5
- ✅ **TypeScript types:** `src/types/database.types.ts` already generated

**Files Modified in Story 1.2 (understand current state):**
- `.env.local` exists with Supabase variables → add `REDIS_URL` in Task 4
- `src/app/api/test-db/route.ts` exists → reuse for connectivity test in Task 5
- `README.md` has Supabase setup instructions → extend with Docker Compose instructions in Task 6

**Architectural Decisions from Story 1.2:**
- Supabase CLI használata (`npx supabase start`) → continue this pattern, don't containerize Supabase in Docker Compose
- Supabase local ports: API 54321, PostgreSQL 54322, Studio 54323 → use these in environment variables

**Technical Debt from Story 1.2:**
- None identified in Story 1.2 review

**Warnings for Story 1.3:**
- ⚠️ **Supabase integration:** Don't try to containerize Supabase in Docker Compose - use Supabase CLI (`npx supabase start`) as established in Story 1.2
- ⚠️ **Environment variables:** `.env.local` must be loaded via `env_file` in docker-compose.yml (not copied into image)
- ⚠️ **Hot reload:** Volume mounts must include `src/` directory for Next.js hot reload to work
- ⚠️ **Redis persistence:** Use named volume (`redis-data`) for Redis data persistence across container restarts

**Review Findings from Story 1.2 (apply to this story):**
- ✅ Update ALL task checkboxes immediately when completed
- ✅ Document all created files in File List section
- ✅ Test service connectivity before committing
- ✅ Verify TypeScript compilation: `npx tsc --noEmit` (no errors)

[Source: docs/sprint-artifacts/1-2-supabase-project-setup-configuration.md#Dev-Agent-Record]

### References

**Architecture Document:**
- [Source: docs/architecture.md § Docker Setup (lines 1374-1435)] - Production docker-compose.prod.yml reference, network and volume patterns
- [Source: docs/architecture.md § Development Environment (lines 1505-1565)] - Local development setup, Redis Docker container usage
- [Source: docs/architecture.md § Project Structure (lines 322-326)] - Docker directory structure

**Tech Spec Epic 1:**
- [Source: docs/sprint-artifacts/tech-spec-epic-1.md § Story 1.3 Acceptance Criteria (lines 1129-1140)] - Authoritative AC list
- [Source: docs/sprint-artifacts/tech-spec-epic-1.md § Story Implementation Workflow (lines 682-704)] - Story 1.3 position in epic workflow

**Epic 1 Story Breakdown:**
- [Source: docs/epics/epic-1-foundation-development-infrastructure.md § Story 1.3] - Story overview and technical notes

**PRD Requirements:**
- [Source: docs/archive/prd-creaitor-2025-11-18.md § NFR8: Deployment & DevOps] - Local development environment consistency, Docker-based containerization
- [Source: docs/archive/prd-creaitor-2025-11-18.md § TA0: Technology Stack Decisions - Infrastructure] - Docker Compose usage for local development

**Previous Story:**
- [Source: docs/sprint-artifacts/1-2-supabase-project-setup-configuration.md] - Story 1.2 implementation learnings

## Dev Agent Record

### Context Reference

<!-- Path(s) to story context XML will be added here by context workflow -->

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

<!-- Debug logs will be added during implementation -->

### Completion Notes List

<!-- Completion notes will be added during implementation -->

### File List

<!-- File list will be added during implementation -->

## Change Log

- **2025-11-19:** Story drafted by SM agent (Bob)

