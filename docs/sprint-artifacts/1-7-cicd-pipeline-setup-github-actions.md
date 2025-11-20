# Story 1.7: CI/CD Pipeline Setup (GitHub Actions)

Status: ready-for-dev

## Story

As a **developer**,
I want **GitHub Actions CI/CD pipeline for automated testing and deployment**,
so that **every commit is tested and deployments are consistent**.

## Acceptance Criteria

1. **AC1: CI workflow (ci.yml)**
   - Runs on every PR and push to main branch
   - Installs dependencies (with npm cache)
   - Runs ESLint
   - Runs unit tests
   - Runs integration tests
   - Generates coverage report
   - Uploads coverage to GitHub Actions artifacts
   - Fails if tests fail or coverage < 60%

2. **AC2: CD workflow (deploy.yml)**
   - Runs on push to main branch (only after CI passes)
   - Builds Next.js production bundle
   - Runs E2E smoke tests (critical paths only)
   - Deploys to production server via SSH (Hetzner VPS)
   - Restarts Next.js app service (Docker containers)
   - Verifies health check endpoint (/api/health)
   - Rolls back on failure (restart previous containers)

3. **AC3: Pull Request checks**
   - Blocks merge if ESLint has errors
   - Blocks merge if tests fail
   - Blocks merge if coverage drops below 60% threshold

4. **AC4: Deployment notifications (optional)**
   - Sends deployment notifications to Discord/Slack (optional, P1 feature)

## Tasks / Subtasks

- [ ] **Task 1: CI workflow (ci.yml) létrehozása** (AC: #1, #3)
  - [ ] Subtask 1.1: Create .github/workflows/ci.yml with trigger (PR, push to main)
  - [ ] Subtask 1.2: Setup Node.js 20 with actions/setup-node@v4
  - [ ] Subtask 1.3: Install dependencies with npm cache
  - [ ] Subtask 1.4: Run ESLint step (fail on errors)
  - [ ] Subtask 1.5: Run unit tests (npm run test:unit)
  - [ ] Subtask 1.6: Run integration tests (npm run test:integration)
  - [ ] Subtask 1.7: Generate coverage report (npm run test:coverage)
  - [ ] Subtask 1.8: Upload coverage artifacts to GitHub Actions
  - [ ] Subtask 1.9: Add PR check: block merge if ESLint errors, test failures, or coverage < 60%

- [ ] **Task 2: CD workflow (deploy.yml) létrehozása** (AC: #2)
  - [ ] Subtask 2.1: Create .github/workflows/deploy.yml with trigger (push to main, after CI success)
  - [ ] Subtask 2.2: Build Next.js production bundle (npm run build)
  - [ ] Subtask 2.3: Run E2E smoke tests (npm run test:e2e -- --grep "smoke")
  - [ ] Subtask 2.4: Setup SSH connection to Hetzner VPS (GitHub Secrets: HETZNER_SSH_KEY, HETZNER_IP)
  - [ ] Subtask 2.5: SSH deployment steps: git pull, docker-compose build, docker-compose down, docker-compose up -d
  - [ ] Subtask 2.6: Health check verification (curl http://localhost:3000/api/health)
  - [ ] Subtask 2.7: Rollback logic on failure (restart previous containers, log error)

- [ ] **Task 3: GitHub Secrets konfigurálása** (AC: #2)
  - [ ] Subtask 3.1: Document required GitHub Secrets in README or deployment.md
  - [ ] Subtask 3.2: List secrets: HETZNER_SSH_KEY, HETZNER_IP (and optionally: SUPABASE keys, AI keys for E2E tests)

- [ ] **Task 4: Testing és validálás** (AC: #1, #2, #3)
  - [ ] Subtask 4.1: Test CI workflow locally (if possible with act tool, or manual PR test)
  - [ ] Subtask 4.2: Verify PR checks block merge on ESLint errors
  - [ ] Subtask 4.3: Verify PR checks block merge on test failures
  - [ ] Subtask 4.4: Verify PR checks block merge on coverage < 60%
  - [ ] Subtask 4.5: Test CD workflow (manual push to main, verify deployment)

**Note:** AC4 (Deployment notifications to Discord/Slack) is an optional P1 feature and is **not included in P0 scope**. No task is required for AC4 in this story.

## Dev Notes

### Architecture Constraints

- **CI/CD Platform:** GitHub Actions (Architecture § CI/CD Pipeline)
- **Deployment Target:** Hetzner VPS (CX31 plan, €12/month) - Docker containers
- **Health Check Endpoint:** `/api/health` (already implemented in Story 1.1)
- **Coverage Threshold:** ≥ 60% for P0 (Architecture § Testing Strategy)
- **Node.js Version:** v20 LTS (Architecture § Development Environment)
- **Docker Compose:** Production deployment uses docker-compose.prod.yml (Story 1.3)

### Project Structure Notes

- **New Files:** `.github/workflows/ci.yml`, `.github/workflows/deploy.yml`
- **Modified Files:** `docs/deployment.md` (update with GitHub Actions deployment section, if needed)
- **GitHub Secrets Required:** HETZNER_SSH_KEY, HETZNER_IP (and optionally: SUPABASE keys, AI keys for E2E tests)

### Learnings from Previous Story

**From Story 1.6 (Status: done)**

Story 1.6 successfully configured Caddy reverse proxy with automatic HTTPS. Key context for Story 1.7:

**New Files Created (relevant context):**
- ✅ `Caddyfile` - Caddy reverse proxy configuration
- ✅ `docs/deployment.md` - Comprehensive deployment guide (8 sections, ~450 lines)
- ✅ `tests/unit/infrastructure/deployment-config.test.ts` - Infrastructure validation tests

**Architectural Decisions:**
- ✅ Caddy automatic HTTPS (Let's Encrypt) - zero config
- ✅ Health check endpoint: `/api/health` (already available)
- ✅ Deployment target: Hetzner VPS (Docker containers)

**Implications for Story 1.7:**
- CD workflow can use health check endpoint (`/api/health`) for deployment verification
- Deployment documentation already exists in `docs/deployment.md` - can reference for SSH deployment steps
- Caddy reverse proxy is configured - CD workflow should verify HTTPS endpoint after deployment
- Docker Compose setup (Story 1.3) - CD workflow uses `docker-compose.prod.yml` for production deployment

**Review Findings:**
- ✅ All ACs met, 100% test coverage
- ✅ Deployment documentation comprehensive
- ⚠️ Advisory: Production deployment validation deferred to actual deployment (acceptable for infrastructure story)

[Source: docs/sprint-artifacts/1-6-caddy-reverse-proxy-configuration.md]

### References

- [Source: docs/architecture.md § CI/CD Pipeline (lines 1471-1501)]
- [Source: docs/architecture.md § Deployment Architecture (lines 1336-1501)]
- [Source: docs/sprint-artifacts/tech-spec-epic-1.md § Story 1.7 Acceptance Criteria (lines 1179-1188)]
- [Source: docs/epics/epic-1-foundation-development-infrastructure.md § Story 1.7 (lines 250-290)]
- [Source: docs/deployment.md § CI/CD Pipeline (if exists)]

## Dev Agent Record

### Context Reference

- `docs/sprint-artifacts/1-7-cicd-pipeline-setup-github-actions.context.xml`

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List

## Change Log

- **2025-11-20:** Story drafted by SM agent (Bob) - YOLO mode, no elicitation
- **2025-11-20:** Story improved after validation - Added note clarifying AC4 (deployment notifications) is optional P1 feature, not in P0 scope

