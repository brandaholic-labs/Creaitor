# Epic 1: Foundation & Development Infrastructure

**Goal:** Establish solid technical foundation enabling all subsequent development with CI/CD, deployment pipeline, and core tooling

**Business Value:** Zero friction development environment → accelerated velocity for all subsequent epics

**Dependencies:** None (first epic)

---

## Story 1.1: Project Initialization & Core Dependencies

As a **developer**,
I want **Next.js 15 project initialized with TypeScript, Tailwind CSS, and core dependencies**,
So that **we have a standardized development environment for all team members**.

**Acceptance Criteria:**

**Given** no existing codebase
**When** I run project initialization commands
**Then** Next.js 15 project is created with App Router, TypeScript strict mode, Tailwind CSS, ESLint, and src/ directory structure

**And** package.json includes core dependencies:
- Next.js 15
- TypeScript 5.x
- Tailwind CSS 3.x
- Shadcn UI components
- Supabase client libraries (@supabase/supabase-js, @supabase/auth-helpers-nextjs)
- BullMQ + ioredis (job queue)
- Winston (logging)
- Zod (validation)
- React Query (data fetching)
- Zustand (state management)

**And** project folder structure follows Architecture document conventions:
```
src/
  app/ (Next.js App Router)
  components/ (UI components)
  lib/ (shared utilities)
  services/ (business logic)
  types/ (TypeScript types)
```

**And** README.md exists with setup instructions

**Prerequisites:** None

**Technical Notes:**
- Use `npx create-next-app@latest creaitor --typescript --tailwind --app --src-dir --eslint`
- Install Shadcn UI: `npx shadcn-ui@latest init`
- Configure TypeScript strict mode in tsconfig.json
- Set up path aliases (@/ for src/)

---

## Story 1.2: Supabase Project Setup & Configuration

As a **developer**,
I want **Supabase project initialized with local development environment**,
So that **we have database, authentication, and storage infrastructure ready**.

**Acceptance Criteria:**

**Given** Supabase CLI installed
**When** I initialize Supabase project
**Then** local Supabase instance runs with PostgreSQL database, Auth service, and Storage service

**And** supabase/ directory contains:
- migrations/ (database schema migrations)
- seed.sql (sample data for development)
- config.toml (local configuration)

**And** .env.local file contains Supabase connection variables:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY

**And** Supabase client singleton is created in src/lib/supabase.ts

**And** Initial database schema migration exists (001_initial_schema.sql) with:
- agencies table
- users table (extends auth.users)
- brands table
- social_profiles table
- posts table
- brand_brain_entries table
- usage_events table

**Prerequisites:** Story 1.1

**Technical Notes:**
- Run `npx supabase init`
- Run `npx supabase start` for local development
- Use Supabase auth-helpers-nextjs for Next.js integration
- Row Level Security (RLS) policies will be added in Epic 2

---

## Story 1.3: Docker Compose Environment Setup

As a **developer**,
I want **Docker Compose configuration for local development**,
So that **all services (Next.js, Redis, Supabase) run consistently across environments**.

**Acceptance Criteria:**

**Given** Docker and Docker Compose installed
**When** I run `docker-compose up`
**Then** all services start successfully:
- next-app (Next.js development server on port 3000)
- redis (Redis for BullMQ on port 6379)
- supabase-db (PostgreSQL via Supabase)

**And** docker-compose.yml defines services with:
- Volume mounts for hot reload
- Environment variable injection from .env.local
- Network configuration for inter-service communication

**And** .dockerignore excludes node_modules, .next, .git

**And** Dockerfile.dev exists for Next.js development container

**And** Services can communicate (Next.js → Redis, Next.js → Supabase)

**Prerequisites:** Story 1.1, Story 1.2

**Technical Notes:**
- Use official Node 20 Alpine image for Next.js
- Use official Redis 7 Alpine image
- Mount src/ directory for hot reload
- Expose ports: 3000 (Next.js), 6379 (Redis)


---

## Story 1.4: Test Infrastructure Setup (Jest + Playwright)

As a **developer**,
I want **Jest for unit/integration tests and Playwright for E2E tests configured**,
So that **we can write tests following Test Design document strategy (40% unit, 30% integration, 30% E2E)**.

**Acceptance Criteria:**

**Given** project dependencies installed
**When** I configure test frameworks
**Then** Jest is configured for unit and integration tests with:
- TypeScript support (@swc/jest for fast compilation)
- React Testing Library integration
- Module path aliases matching tsconfig.json
- Coverage reporting (target: ≥80% critical paths)

**And** Playwright is configured for E2E tests with:
- Browser engines installed (Chromium, Firefox, WebKit)
- Test fixtures for authentication
- Screenshot/video capture on failure
- Parallel test execution

**And** package.json scripts exist:
- `npm run test:unit` (Jest unit tests)
- `npm run test:integration` (Jest integration tests)
- `npm run test:e2e` (Playwright E2E tests)
- `npm run test:coverage` (coverage report)

**And** Example tests exist:
- tests/unit/example.test.ts (unit test example)
- tests/integration/api/example.test.ts (API integration test example)
- tests/e2e/example.spec.ts (E2E test example)

**Prerequisites:** Story 1.1

**Technical Notes:**
- Follow Test Design document (docs/test-design-system.md) coverage targets
- Use @testing-library/react for component testing
- Use MSW (Mock Service Worker) for API mocking in integration tests
- Playwright config: baseURL http://localhost:3000

---

## Story 1.5: Winston Logging Infrastructure

As a **developer**,
I want **Winston logger configured with structured logging and log levels**,
So that **we can track events, errors, and debug issues across all services**.

**Acceptance Criteria:**

**Given** Winston installed
**When** I configure logger
**Then** Winston logger singleton exists in src/lib/logger.ts with:
- Log levels: error, warn, info, debug
- JSON format for production (structured logging)
- Pretty print format for development (readable console output)
- File transports: error.log (errors only), combined.log (all logs)
- Console transport for development

**And** Logger utility functions exist:
- logUserEvent(userId, eventType, metadata)
- logAICall(brandId, provider, tokens, latency)
- logPublishEvent(postId, platform, status, metadata)
- logError(error, context)

**And** Request logging middleware exists for Next.js API routes

**And** Log rotation configured (max 20MB per file, keep 14 days)

**And** Example usage demonstrated in README

**Prerequisites:** Story 1.1

**Technical Notes:**
- Use winston-daily-rotate-file for log rotation
- Production: JSON format for centralized logging (future: Logtail/Sentry)
- Development: winston.format.simple() with colors
- Include timestamp, requestId, userId in all logs

---

## Story 1.6: Caddy Reverse Proxy Configuration

As a **developer**,
I want **Caddy configured as reverse proxy with automatic HTTPS**,
So that **production deployment has SSL termination and simplified configuration**.

**Acceptance Criteria:**

**Given** Caddy installed on production server
**When** Caddyfile is deployed
**Then** Caddy serves as reverse proxy with:
- Automatic HTTPS via Let's Encrypt for creaitor.hu
- Reverse proxy to Next.js app on localhost:3000
- Security headers (HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy)
- Access logs in JSON format
- Gzip compression enabled

**And** Caddyfile exists in project root with configuration

**And** Deployment instructions exist in docs/deployment.md

**Prerequisites:** Story 1.3

**Technical Notes:**
- Follow Architecture ADR-007 (Caddy vs Nginx decision)
- Caddy auto-renews Let's Encrypt certificates (zero config)
- Production: Hetzner VPS (€12/month)
- Health check endpoint: /api/health

---

## Story 1.7: CI/CD Pipeline Setup (GitHub Actions)

As a **developer**,
I want **GitHub Actions CI/CD pipeline for automated testing and deployment**,
So that **every commit is tested and deployments are consistent**.

**Acceptance Criteria:**

**Given** GitHub repository exists
**When** .github/workflows/ contains CI/CD configurations
**Then** ci.yml workflow runs on every PR and push to main:
- Install dependencies
- Run ESLint
- Run unit tests
- Run integration tests
- Generate coverage report
- Upload coverage to GitHub Actions artifacts

**And** deploy.yml workflow runs on push to main (after CI passes):
- Build Next.js production bundle
- Run E2E smoke tests
- Deploy to production server via SSH
- Restart Next.js app service
- Health check verification
- Rollback on failure

**And** Pull Request checks block merge if:
- ESLint has errors
- Tests fail
- Coverage drops below threshold (60% for P0)

**And** Deployment notifications sent to Discord/Slack (optional)

**Prerequisites:** Story 1.4, Story 1.6

**Technical Notes:**
- Use actions/checkout@v4, actions/setup-node@v4
- Cache node_modules for faster builds
- Store production secrets in GitHub Secrets
- Deployment target: Hetzner VPS (Docker containers)


---
