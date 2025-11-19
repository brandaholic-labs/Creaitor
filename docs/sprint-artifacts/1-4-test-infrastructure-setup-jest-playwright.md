# Story 1.4: Test Infrastructure Setup (Jest + Playwright)

Status: ready-for-dev

## Story

As a **developer**,
I want **Jest for unit/integration tests and Playwright for E2E tests configured**,
so that **we can write tests following Test Design document strategy (40% unit, 30% integration, 30% E2E)**.

## Acceptance Criteria

1. **AC1: Jest is configured for unit and integration tests**
   - TypeScript support (@swc/jest for fast compilation)
   - React Testing Library integration
   - Module path aliases matching tsconfig.json
   - Coverage reporting (target: ≥80% critical paths)

2. **AC2: Playwright is configured for E2E tests**
   - Browser engines installed (Chromium, Firefox, WebKit)
   - Test fixtures for authentication
   - Screenshot/video capture on failure
   - Parallel test execution

3. **AC3: package.json scripts exist**
   - `npm run test:unit` (Jest unit tests)
   - `npm run test:integration` (Jest integration tests)
   - `npm run test:e2e` (Playwright E2E tests)
   - `npm run test:coverage` (coverage report)

4. **AC4: Example tests exist**
   - tests/unit/example.test.ts (unit test example)
   - tests/integration/api/example.test.ts (API integration test example)
   - tests/e2e/example.spec.ts (E2E test example)

## Requirements Context

Ez a story a Creaitor test infrastruktúrájának beállítását hozza létre. Az **Epic 1: Foundation & Development Infrastructure** negyedik lépéseként biztosítja, hogy a projekt rendelkezzen teljes test coverage-vel (Jest unit/integration tesztek, Playwright E2E tesztek) a Test Design dokumentum stratégiája szerint.

[Source: docs/epics/epic-1-foundation-development-infrastructure.md § Story 1.4]

**Üzleti indoklás:** Minőségi garancia és gyors feedback loop a fejlesztés során. A test infrastruktúra lehetővé teszi, hogy a későbbi story-k implementálása során azonnal írhatóak és futtathatóak legyenek a tesztek, biztosítva a kód minőségét és a regressziók elkerülését.

**Kapcsolódás az architektúrához:**
- **Architecture § Testing Strategy (lines 1063-1081):** Unit tests (Jest, mocked AI), Integration tests (Jest + Supertest), E2E tests (Playwright, critical flows)
- **Architecture § Test Pyramid (Epic 1):** 40% unit, 30% integration, 30% E2E coverage target
- **Architecture § CI/CD Pipeline (lines 551-590):** Test execution in CI pipeline (unit, integration, coverage report)

**PRD Requirements lefedettség:**
- **NFR6: Maintainability:** Test coverage ≥60% (P0 baseline), automated testing infrastructure
- **TA5: Testing Strategy:** Jest + Playwright test framework setup

[Source: docs/archive/prd-creaitor-2025-11-18.md § NFR6: Maintainability / TA5: Testing Strategy]

**Tech Spec Epic 1 hivatkozás:**
- [Source: docs/sprint-artifacts/tech-spec-epic-1.md § Story 1.4 Acceptance Criteria (lines 1143-1152)]
- [Source: docs/sprint-artifacts/tech-spec-epic-1.md § Test Strategy Summary (lines 1400-1470)] - Test coverage targets, test pyramid, execution strategy

**Test Design Document hivatkozás:**
- [Source: docs/test-design-system.md] - Test strategy, coverage targets, test pyramid approach

## Tasks / Subtasks

- [ ] **Task 1: Jest konfiguráció létrehozása** (AC: #1)
  - [ ] Subtask 1.1: Install Jest dependencies: `jest`, `@swc/jest`, `@testing-library/react`, `@testing-library/jest-dom`
  - [ ] Subtask 1.2: Create `jest.config.js` with:
    - TypeScript support (@swc/jest transformer)
    - Module path aliases (`@/*` → `src/*`)
    - Test environment: `jsdom` (React components)
    - Coverage configuration (threshold: ≥80% critical paths)
    - Test file patterns: `**/*.test.ts`, `**/*.test.tsx`
  - [ ] Subtask 1.3: Configure React Testing Library:
    - Setup file: `tests/setup.ts` (jest-dom matchers import)
    - Jest config: `setupFilesAfterEnv: ['<rootDir>/tests/setup.ts']`
  - [ ] Subtask 1.4: Verify Jest works: `npm run test:unit` runs successfully

- [ ] **Task 2: Playwright konfiguráció létrehozása** (AC: #2)
  - [ ] Subtask 2.1: Install Playwright: `@playwright/test`
  - [ ] Subtask 2.2: Create `playwright.config.ts` with:
    - Browser engines: Chromium, Firefox, WebKit
    - Base URL: `http://localhost:3000`
    - Test directory: `tests/e2e/`
    - Screenshot on failure: `screenshots/` directory
    - Video on failure: `videos/` directory
    - Parallel execution: `workers: 1` (P0, sequential safer)
    - Timeout: 30s action timeout (generous for P0)
  - [ ] Subtask 2.3: Install browser engines: `npx playwright install`
  - [ ] Subtask 2.4: Create test fixtures for authentication (placeholder, Epic 2-ben implementáljuk)
  - [ ] Subtask 2.5: Verify Playwright works: `npm run test:e2e` runs successfully

- [ ] **Task 3: package.json scripts hozzáadása** (AC: #3)
  - [ ] Subtask 3.1: Add `test:unit` script: `jest --testPathPattern=unit`
  - [ ] Subtask 3.2: Add `test:integration` script: `jest --testPathPattern=integration`
  - [ ] Subtask 3.3: Add `test:e2e` script: `playwright test`
  - [ ] Subtask 3.4: Add `test:coverage` script: `jest --coverage --coverageThreshold='{"global":{"lines":60,"statements":60,"functions":60,"branches":60}}'`
  - [ ] Subtask 3.5: Add `test` script: `npm run test:unit && npm run test:integration` (all non-E2E tests)

- [ ] **Task 4: Example tesztek létrehozása** (AC: #4)
  - [ ] Subtask 4.1: Create `tests/unit/example.test.ts`:
    - Example unit test (utility function test)
    - Jest matchers usage (expect, toBe, toEqual)
    - TypeScript types
  - [ ] Subtask 4.2: Create `tests/integration/api/example.test.ts`:
    - Example API route test (Next.js API route)
    - MSW (Mock Service Worker) setup for API mocking
    - Supertest vagy fetch API használata
  - [ ] Subtask 4.3: Create `tests/e2e/example.spec.ts`:
    - Example E2E test (navigation flow)
    - Playwright page object pattern (optional)
    - Screenshot/video capture demonstration

- [ ] **Task 5: Test utilities és fixtures létrehozása** (AC: #1, #2)
  - [ ] Subtask 5.1: Create `tests/utils/mockSupabase.ts`:
    - Supabase client mock (for integration tests)
    - Mock responses for common queries
  - [ ] Subtask 5.2: Create `tests/utils/mockAI.ts`:
    - AI service mock (for future Epic 4 tests)
    - Mock LLM responses
  - [ ] Subtask 5.3: Create `tests/utils/testFixtures.ts`:
    - Common test data (users, brands, posts)
    - Fixture helpers for test setup
  - [ ] Subtask 5.4: Create `tests/setup.ts`:
    - Jest setup file (jest-dom matchers)
    - Global test utilities

- [ ] **Task 6: CI/CD integráció előkészítése** (AC: #1, #2, #3)
  - [ ] Subtask 6.1: Verify Jest works in CI environment (GitHub Actions compatible)
  - [ ] Subtask 6.2: Verify Playwright works in CI environment (headless mode)
  - [ ] Subtask 6.3: Document CI test execution in README.md (Story 1.7-ben implementáljuk a CI/CD pipeline-t)

- [ ] **Task 7: Dokumentáció és validation** (AC: #1, #2, #3, #4)
  - [ ] Subtask 7.1: Update README.md with test setup instructions:
    - Prerequisites: Node.js, npm
    - Test commands: `npm run test:unit`, `npm run test:integration`, `npm run test:e2e`
    - Coverage reporting: `npm run test:coverage`
    - Test file structure: `tests/unit/`, `tests/integration/`, `tests/e2e/`
  - [ ] Subtask 7.2: Add test examples documentation:
    - How to write unit tests
    - How to write integration tests
    - How to write E2E tests
  - [ ] Subtask 7.3: Test full workflow:
    - `npm run test:unit` ✅
    - `npm run test:integration` ✅
    - `npm run test:e2e` ✅
    - `npm run test:coverage` ✅
  - [ ] Subtask 7.4: Commit changes: `git add . && git commit -m "feat(epic-1): Story 1.4 - Test infrastructure setup (Jest + Playwright)"`

## Dev Notes

### Architecture Constraints

**Testing Strategy Pattern (Architecture § Testing Strategy, lines 1063-1081):**
- **Unit tests:** Jest with mocked AI responses (no live API calls)
- **Integration tests:** Jest + Supertest (API routes testing)
- **E2E tests:** Playwright (critical user flows only)
- **Coverage target:** ≥60% (P0 pilot baseline)
- **Test pyramid:** 40% unit, 30% integration, 30% E2E

**Test File Structure (Architecture § Project Structure, lines 338-355):**
```
tests/
├── unit/              # Unit tests (Jest)
├── integration/       # Integration tests (Jest)
│   └── api/          # API route tests
└── e2e/              # E2E tests (Playwright)
```

**Jest Configuration Pattern:**
- **TypeScript support:** @swc/jest (fast compilation)
- **Module aliases:** Match tsconfig.json paths (`@/*` → `src/*`)
- **React Testing Library:** For component testing (future stories)
- **Coverage:** Istanbul reporter, threshold: ≥80% critical paths

**Playwright Configuration Pattern:**
- **Browser engines:** Chromium, Firefox, WebKit (all installed)
- **Base URL:** `http://localhost:3000` (Next.js dev server)
- **Test isolation:** Each test resets state (Supabase test fixtures)
- **Retry policy:** 1x retry on failure (flaky test mitigation)
- **Timeout:** Generous (30s action timeout P0)

### Testing Strategy

**Story 1.4 Testing (Tech Spec § Test Coverage Targets, lines 1410-1422):**
- **Unit tests:** Example test (utility function) - ~40% coverage target
- **Integration tests:** Example API route test - ~30% coverage target
- **E2E tests:** Example navigation test - ~30% coverage target
- **Total coverage:** 100% (test infrastructure itself)

**Test Execution Strategy (Tech Spec § Test Execution Strategy, lines 1446-1469):**
- **Development (Pre-commit):** `npm run test:unit` (fast feedback < 10s)
- **CI Pipeline (Pull Request):** `npm run lint`, `npm run test:unit`, `npm run test:integration`, `npm run test:coverage` (fail if < 60%)
- **CD Pipeline (Pre-deployment):** `npm run test:e2e` (E2E smoke tests < 2 min)

**Flaky Test Mitigation (Tech Spec § Flaky Test Mitigation, lines 1473-1484):**
- **Playwright E2E:** Retry policy 1x, generous timeout (30s), test isolation
- **Integration Tests:** Mock external services (Supabase mocked), deterministic test fixtures

### Project Structure Notes

**Architecture Compliance (Architecture § Project Structure, lines 338-355):**

```
creaitor/
├── tests/                              # 🆕 Task 4, 5 (test files)
│   ├── unit/                          # 🆕 Unit tests (Jest)
│   │   └── example.test.ts            # 🆕 Task 4.1
│   ├── integration/                   # 🆕 Integration tests (Jest)
│   │   └── api/                       # 🆕 API route tests
│   │       └── example.test.ts        # 🆕 Task 4.2
│   ├── e2e/                           # 🆕 E2E tests (Playwright)
│   │   └── example.spec.ts            # 🆕 Task 4.3
│   ├── utils/                         # 🆕 Task 5 (test utilities)
│   │   ├── mockSupabase.ts           # 🆕 Task 5.1
│   │   ├── mockAI.ts                 # 🆕 Task 5.2
│   │   └── testFixtures.ts           # 🆕 Task 5.3
│   └── setup.ts                       # 🆕 Task 5.4 (Jest setup)
│
├── jest.config.js                     # 🆕 Task 1 (Jest configuration)
├── playwright.config.ts               # 🆕 Task 2 (Playwright configuration)
├── package.json                       # 🔄 Updated (Task 3: test scripts)
└── README.md                          # 🔄 Updated (Task 7: test documentation)
```

**Detektált eltérések és indoklás:**
- **Architecture reference:** Test structure matches Architecture § Project Structure exactly
- **Jest config:** `jest.config.js` (not `.ts`) - standard practice, simpler
- **Playwright config:** `playwright.config.ts` (TypeScript) - Playwright supports TS config

### Learnings from Previous Story

**From Story 1.3 (Status: done)**

Story 1.3 successfully established Docker Compose environment. Key learnings for Story 1.4:

**New Patterns/Services Created (Reuse, not recreate):**
- ✅ **Docker Compose setup:** `docker-compose.yml` exists - tests can run in Docker containers if needed
- ✅ **Redis service:** Redis available at `redis://redis:6379` (Docker service name) - can be used for integration tests
- ✅ **Next.js dev server:** Running on port 3000 - Playwright base URL: `http://localhost:3000`
- ✅ **Environment variables:** `.env.local` exists - test environment variables can be added

**Files Modified in Story 1.3 (understand current state):**
- `docker-compose.yml` exists → tests can run in Docker environment (optional)
- `package.json` has Docker scripts → can add test scripts alongside
- `README.md` has Docker setup → extend with test setup instructions

**Architectural Decisions from Story 1.3:**
- Supabase CLI használata (`npx supabase start`) → test database can use Supabase local instance
- Docker service name resolution (`redis://redis:6379`) → integration tests can use Docker Redis

**Technical Debt from Story 1.3:**
- None identified in Story 1.3 review

**Warnings for Story 1.4:**
- ⚠️ **Test environment:** Ensure tests work both in local dev (npm run dev) and Docker Compose environment
- ⚠️ **Supabase test database:** Use Supabase local instance for integration tests (not production)
- ⚠️ **Redis test connection:** Integration tests can use Docker Redis service (`redis://redis:6379`)
- ⚠️ **Playwright base URL:** Must match Next.js dev server URL (`http://localhost:3000`)

**Review Findings from Story 1.3 (apply to this story):**
- ✅ Update ALL task checkboxes immediately when completed
- ✅ Document all created files in File List section
- ✅ Test infrastructure before committing
- ✅ Verify TypeScript compilation: `npx tsc --noEmit` (no errors)
- ✅ Test all npm scripts work: `npm run test:unit`, `npm run test:integration`, `npm run test:e2e`

[Source: docs/sprint-artifacts/1-3-docker-compose-environment-setup.md#Dev-Agent-Record]

### References

**Architecture Document:**
- [Source: docs/architecture.md § Testing Strategy (lines 1063-1081)] - Unit tests (Jest, mocked AI), Integration tests (Jest + Supertest), E2E tests (Playwright)
- [Source: docs/architecture.md § Project Structure (lines 338-355)] - Test directory structure

**Tech Spec Epic 1:**
- [Source: docs/sprint-artifacts/tech-spec-epic-1.md § Story 1.4 Acceptance Criteria (lines 1143-1152)] - Authoritative AC list
- [Source: docs/sprint-artifacts/tech-spec-epic-1.md § Test Strategy Summary (lines 1400-1470)] - Test coverage targets, test pyramid, execution strategy
- [Source: docs/sprint-artifacts/tech-spec-epic-1.md § Test Execution Strategy (lines 1446-1469)] - Development, CI, CD test execution

**Epic 1 Story Breakdown:**
- [Source: docs/epics/epic-1-foundation-development-infrastructure.md § Story 1.4] - Story overview and technical notes

**PRD Requirements:**
- [Source: docs/archive/prd-creaitor-2025-11-18.md § NFR6: Maintainability] - Test coverage ≥60%, automated testing infrastructure
- [Source: docs/archive/prd-creaitor-2025-11-18.md § TA5: Testing Strategy] - Jest + Playwright test framework setup

**Test Design Document:**
- [Source: docs/test-design-system.md § Teszt Szintek Stratégia] - Test strategy, coverage targets, test pyramid approach

**Previous Story:**
- [Source: docs/sprint-artifacts/1-3-docker-compose-environment-setup.md] - Story 1.3 implementation learnings

## Dev Agent Record

### Context Reference

- docs/sprint-artifacts/1-4-test-infrastructure-setup-jest-playwright.context.xml

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List

## Change Log

- **2025-11-19:** Story drafted by SM agent (Bob)

