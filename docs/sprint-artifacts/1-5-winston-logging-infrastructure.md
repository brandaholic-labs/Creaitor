# Story 1.5: Winston Logging Infrastructure

Status: drafted

## Story

As a **developer**,
I want **Winston logger configured with structured logging and log levels**,
so that **we can track events, errors, and debug issues across all services**.

## Acceptance Criteria

1. **AC1: Winston logger singleton exists**
   - Log levels: error, warn, info, debug
   - JSON format for production (structured logging)
   - Pretty print format for development (readable console output)
   - File transports: `error.log` (errors only), `combined.log` (all logs)
   - Console transport for development

2. **AC2: Logger utility functions exist**
   - `logUserEvent(userId, eventType, metadata)`
   - `logAICall(brandId, provider, tokens, latency)`
   - `logPublishEvent(postId, platform, status, metadata)`
   - `logError(error, context)`

3. **AC3: Request logging middleware exists**
   - Middleware for Next.js API routes to log incoming requests
   - Includes timestamp, requestId, userId (if authenticated)

4. **AC4: Log rotation configured**
   - Max 20MB per file
   - Keep 14 days history
   - Uses `winston-daily-rotate-file`

5. **AC5: Example usage documented**
   - README.md updated with logging usage examples

## Tasks / Subtasks

- [ ] **Task 1: Winston és kiegészítők telepítése** (AC: #1, #4)
  - [ ] Subtask 1.1: Install packages: `winston`, `winston-daily-rotate-file`
  - [ ] Subtask 1.2: Install types: `@types/winston` (if needed, usually included or not required for basic usage, but check)

- [ ] **Task 2: Logger Service implementálása** (AC: #1)
  - [ ] Subtask 2.1: Create `src/lib/logger/index.ts` (Singleton pattern)
  - [ ] Subtask 2.2: Configure log levels (error, warn, info, debug)
  - [ ] Subtask 2.3: Configure formats (JSON for prod, simple/colorize for dev)
  - [ ] Subtask 2.4: Configure transports (Console, File: error.log, combined.log)

- [ ] **Task 3: Log Rotation konfigurálása** (AC: #4)
  - [ ] Subtask 3.1: Configure `winston-daily-rotate-file` transport for `combined.log`
  - [ ] Subtask 3.2: Configure `winston-daily-rotate-file` transport for `error.log`
  - [ ] Subtask 3.3: Set policies: 20MB max size, 14 days retention

- [ ] **Task 4: Utility függvények implementálása** (AC: #2)
  - [ ] Subtask 4.1: Implement `logUserEvent` helper
  - [ ] Subtask 4.2: Implement `logAICall` helper (structured metadata for AI tracking)
  - [ ] Subtask 4.3: Implement `logPublishEvent` helper
  - [ ] Subtask 4.4: Implement `logError` helper (standardized error object handling)

- [ ] **Task 5: Request Logging Middleware** (AC: #3)
  - [ ] Subtask 5.1: Create `src/lib/logger/middleware.ts` (or integrate into Next.js middleware)
  - [ ] Subtask 5.2: Log request method, URL, duration, status code
  - [ ] Subtask 5.3: Extract and log `userId` if present in session

- [ ] **Task 6: Dokumentáció** (AC: #5)
  - [ ] Subtask 6.1: Update `README.md` with "Logging" section
  - [ ] Subtask 6.2: Add code examples for common logging scenarios

## Dev Notes

### Architecture Constraints

- **Service Location:** `src/lib/logger/index.ts` (Architecture § Detailed Design)
- **Log Levels:** ERROR, WARN, INFO, DEBUG (Architecture § Logging Strategy)
- **Format:** JSON in production (for future log aggregation tools like Logtail/Sentry), Pretty Print in dev.
- **Performance:** File logging should be async/non-blocking.

### Project Structure Notes

- **New Directory:** `src/lib/logger/`
- **New Files:** `src/lib/logger/index.ts`, `src/lib/logger/types.ts` (optional for interfaces)
- **Modified Files:** `README.md`

### Learnings from Previous Story

**From Story 1.4 (Status: done)**

Story 1.4 successfully established test infrastructure (Jest + Playwright). Key context for Story 1.5:

**New Files Created (relevant context):**
- ✅ `jest.config.js`, `playwright.config.ts` - test configs exist
- ✅ `tests/` directory structure - can add logger tests here if needed
- ✅ `package.json` test scripts - can add logging-related scripts
- ✅ Test utilities (`tests/utils/`) - mock logger can be added for unit tests

**Unresolved Review Items from Story 1.4:**
- ⚠️ Advisory: Consider increasing coverage threshold to 80% in future stories (currently 60%)
- ⚠️ Advisory: Enable Playwright parallel execution when test suite grows and stability is confirmed

**Implications for Story 1.5:**
- Logger should integrate with test utilities (mock logger for tests)
- Logging can be tested using existing Jest infrastructure
- Logger errors should be captured in test output for debugging

[Source: docs/sprint-artifacts/1-4-test-infrastructure-setup-jest-playwright.md]

### References

- [Source: docs/architecture.md § Logging Strategy (lines 101-106)]
- [Source: docs/sprint-artifacts/tech-spec-epic-1.md § Story 1.5 Acceptance Criteria]
- [Source: docs/epics/epic-1-foundation-development-infrastructure.md § Story 1.5]

## Dev Agent Record

### Context Reference

<!-- Path(s) to story context XML will be added here by context workflow -->

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List

## Change Log

- **2025-11-20:** Story drafted by SM agent (Bob)
- **2025-11-20:** Added "Learnings from Previous Story" subsection to Dev Notes (validation fix - Story Quality Validation)

