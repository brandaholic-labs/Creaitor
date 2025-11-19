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

## Story 1.8: Frontend Design System Setup (Tailwind Config, Shadcn UI, Design Tokens)

As a **frontend developer**,
I want **Tailwind CSS configured with purple/violet color palette, Shadcn UI components installed, and design token system**,
So that **we have a consistent, scalable design system foundation for all UI components**.

**Acceptance Criteria:**

**Given** Story 1.1 completed (Next.js project initialized)
**When** I configure Tailwind CSS and design system
**Then** tailwind.config.ts exists with:
- Purple/violet color palette (#a855f7 primary, shades: 50-950)
- Design token system using CSS variables (--color-primary, --color-secondary, etc.)
- Typography configuration (font families, sizes, weights)
- Spacing scale (4px base unit)
- Responsive breakpoints (sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px)
- Shadow utilities (elevation levels)
- Border radius utilities

**And** Design tokens defined in src/styles/design-tokens.css:
- Color tokens (primary, secondary, accent, background, foreground, muted, etc.)
- Typography tokens (font families, sizes, line heights)
- Spacing tokens
- Shadow tokens
- Border radius tokens
- Dark mode ready (CSS variables, future P1 feature)

**And** Shadcn UI components installed and configured:
- Base components: Button, Input, Textarea, Card, Dialog, Badge, Toast, Calendar
- Components installed via `npx shadcn-ui@latest add [component]`
- Components use design tokens (CSS variables)
- Components follow UX Design Specification (Section 1: Design System Foundation)

**And** src/components/ui/ directory contains:
- All installed Shadcn UI components
- Components are customizable via Tailwind classes
- Components use design tokens

**And** Example usage documented in README.md:
- How to use design tokens
- How to add new Shadcn UI components
- How to customize components

**Prerequisites:** Story 1.1

**Technical Notes:**
- Follow UX Design Specification Section 1.1 (Design System Choice)
- Use Tailwind CSS v4 (or latest stable)
- Design tokens enable easy theme switching (light/dark mode future P1)
- Color palette: Purple/Violet (#a855f7) as primary, following UX spec
- Reference: docs/ux-design-specification.md Section 1

**Frontend Components:**
- Tailwind config setup
- Design token CSS file
- Shadcn UI base components (Button, Input, Card, Dialog, Badge, Toast, Calendar)

**Backend Components:**
- None (frontend-only story)

**Tests:**
- Unit test: Design token CSS variables are defined
- Unit test: Tailwind config exports correct color palette
- Visual regression: Shadcn UI components render correctly with design tokens

---

## Story 1.9: Frontend Layout & Navigation (Sidebar, TopBar, Brand Selector, Routing)

As a **frontend developer**,
I want **main layout components (Sidebar, TopBar, MainLayout) and navigation setup with persistent Brand Selector**,
So that **all subsequent features have consistent navigation and brand context awareness**.

**Acceptance Criteria:**

**Given** Story 1.8 completed (Design System Setup)
**When** I create layout components
**Then** MainLayout component exists in src/components/layout/MainLayout.tsx:
- Wraps all authenticated pages
- Contains Sidebar and TopBar
- Responsive: Sidebar collapses on mobile (< lg breakpoint)
- Uses design tokens for styling

**And** Sidebar component exists in src/components/layout/Sidebar.tsx:
- Navigation links: Dashboard, Brands, Calendar, Settings
- Brand Selector (persistent, always visible)
- User profile section (bottom)
- Collapsible on mobile
- Active route highlighted
- Uses Shadcn UI components (Button, Badge)

**And** TopBar component exists in src/components/layout/TopBar.tsx:
- Shows active brand name and logo (from Brand Selector)
- User menu dropdown (profile, settings, logout)
- Notifications icon (placeholder, P1 feature)
- Responsive: Brand Selector moves to TopBar on mobile

**And** Brand Selector component exists in src/components/brand/BrandSelector.tsx:
- Dropdown showing all user's brands
- Active brand highlighted (visual indicator)
- Brand logo + name displayed
- Click to switch active brand
- Uses Zustand state management (activeBrandId)
- Persistent across page navigation (UX Pattern 1: Active Brand Context Lock)

**And** Navigation routing configured:
- Next.js App Router setup in src/app/
- Protected routes: /dashboard/*, /brands/*, /calendar/*, /settings/*
- Public routes: /login, /register, /
- Auth middleware redirects unauthenticated users to /login
- Active route state managed (highlighted in Sidebar)

**And** Layout components are responsive:
- Desktop (≥ lg): Sidebar always visible, TopBar horizontal
- Mobile (< lg): Sidebar collapsible (hamburger menu), TopBar full width
- Touch targets: 44x44px minimum (WCAG 2.1 AA)

**And** Example pages exist:
- src/app/dashboard/page.tsx (placeholder dashboard)
- src/app/login/page.tsx (placeholder login page)
- Layout applied to dashboard, not to login

**Prerequisites:** Story 1.8

**Technical Notes:**
- Follow UX Design Specification Section 2.2 (Pattern 1: Active Brand Context Lock)
- Brand Selector uses Zustand store: `useBrandStore` with `activeBrandId` state
- Layout components use Shadcn UI components (Button, Dropdown, Badge)
- Responsive breakpoints: lg (1024px) for sidebar collapse
- Reference: docs/ux-design-specification.md Section 2

**Frontend Components:**
- MainLayout component
- Sidebar component
- TopBar component
- BrandSelector component
- Navigation routing setup
- Placeholder pages (dashboard, login)

**Backend Components:**
- None (frontend-only story, backend auth in Epic 2)

**Tests:**
- Unit test: BrandSelector updates Zustand store on brand change
- Unit test: Sidebar highlights active route
- E2E test: Navigation between routes works
- E2E test: Brand Selector persists active brand across navigation
- E2E test: Responsive layout: Sidebar collapses on mobile

---
