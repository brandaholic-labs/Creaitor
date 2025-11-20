# Story 1.6: Caddy Reverse Proxy Configuration

Status: drafted

## Story

As a **developer**,
I want **Caddy configured as reverse proxy with automatic HTTPS**,
so that **production deployment has SSL termination and simplified configuration**.

## Acceptance Criteria

1. **AC1: Caddy reverse proxy configured**
   - Automatic HTTPS via Let's Encrypt for creaitor.hu
   - Reverse proxy to Next.js app on localhost:3000
   - Security headers (HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy)
   - Access logs in JSON format
   - Gzip compression enabled

2. **AC2: Caddyfile exists**
   - Caddyfile exists in project root with configuration
   - Configuration follows Architecture ADR-007 (Caddy vs Nginx decision)

3. **AC3: Deployment instructions exist**
   - Deployment instructions exist in docs/deployment.md
   - Includes Hetzner VPS setup steps
   - Includes Caddy installation and configuration steps

## Tasks / Subtasks

- [ ] **Task 1: Caddy telepítése és konfigurálása** (AC: #1, #2)
  - [ ] Subtask 1.1: Create Caddyfile in project root with domain configuration
  - [ ] Subtask 1.2: Configure automatic HTTPS (Let's Encrypt) for creaitor.hu
  - [ ] Subtask 1.3: Configure reverse proxy to Next.js app (localhost:3000)
  - [ ] Subtask 1.4: Add security headers (HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy)
  - [ ] Subtask 1.5: Configure access logs in JSON format
  - [ ] Subtask 1.6: Enable gzip compression

- [ ] **Task 2: Deployment dokumentáció** (AC: #3)
  - [ ] Subtask 2.1: Create or update docs/deployment.md
  - [ ] Subtask 2.2: Document Hetzner VPS provisioning steps
  - [ ] Subtask 2.3: Document Caddy installation steps
  - [ ] Subtask 2.4: Document Caddyfile deployment process
  - [ ] Subtask 2.5: Document health check verification after deployment

- [ ] **Task 3: Testing és validálás** (AC: #1)
  - [ ] Subtask 3.1: Test Caddyfile syntax validation (caddy validate)
  - [ ] Subtask 3.2: Test local reverse proxy setup (if possible)
  - [ ] Subtask 3.3: Verify health check endpoint accessible via Caddy (/api/health)

## Dev Notes

### Architecture Constraints

- **Reverse Proxy:** Caddy (Architecture ADR-007: Caddy vs Nginx decision)
- **Deployment Target:** Hetzner VPS (CX31 plan, €12/month)
- **HTTPS:** Automatic Let's Encrypt certificates (zero config)
- **Health Check Endpoint:** `/api/health` (already implemented in Story 1.1)
- **Security Headers:** HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy (Architecture § Security Architecture)

### Project Structure Notes

- **New Files:** `Caddyfile` (project root), `docs/deployment.md` (if not exists)
- **Modified Files:** None (Caddyfile is new, deployment docs may be new or updated)

### Learnings from Previous Story

**From Story 1.5 (Status: done)**

Story 1.5 successfully established Winston logging infrastructure. Key context for Story 1.6:

**New Files Created (relevant context):**
- ✅ `src/lib/logger/index.ts` - Winston logger singleton
- ✅ `src/lib/logger/middleware.ts` - Request logging middleware
- ✅ Logger utility functions for structured logging

**Architectural Decisions:**
- ✅ Structured logging (JSON format) for production
- ✅ Log rotation configured (20MB max, 14 days retention)
- ✅ Request logging middleware available for API routes

**Implications for Story 1.6:**
- Caddy access logs can be integrated with Winston logger (future enhancement)
- Health check endpoint (`/api/health`) should be logged via request logging middleware
- Caddy logs can complement application logs for full observability

**Review Findings:**
- ✅ All ACs met, tests passing
- ✅ Logger coverage 90%+ excellent
- ⚠️ Advisory: Consider adding request logging to Next.js middleware.ts (global middleware) in future stories

[Source: docs/sprint-artifacts/1-5-winston-logging-infrastructure.md]

### References

- [Source: docs/architecture.md § Deployment Architecture (lines 1336-1501)]
- [Source: docs/architecture.md § ADR-007: Caddy over Nginx for Reverse Proxy (lines 1687-1740)]
- [Source: docs/sprint-artifacts/tech-spec-epic-1.md § Story 1.6 Acceptance Criteria (lines 1169-1177)]
- [Source: docs/epics/epic-1-foundation-development-infrastructure.md § Story 1.6 (lines 219-247)]

## Dev Agent Record

### Context Reference

<!-- Path(s) to story context XML will be added here by context workflow -->

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List

## Change Log

- **2025-11-20:** Story drafted by SM agent (Bob) - YOLO mode, no elicitation

