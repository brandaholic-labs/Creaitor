# Epic Technical Specification: Foundation & Development Infrastructure

Date: 2025-11-19
Author: BMad
Epic ID: 1
Status: Draft

---

## Overview

Az **Epic 1: Foundation & Development Infrastructure** a Creaitor projekt technikai alapjainak megalapozását célozza, amely minden további fejlesztést lehetővé tesz. Ez az epic biztosítja a zökkenőmentes fejlesztői környezetet, a CI/CD pipeline-t, a deployment infrastruktúrát és az alapvető eszközöket.

**Üzleti érték:** Nulla súrlódású fejlesztői környezet → gyorsított fejlesztési sebesség az összes későbbi epichez. A megfelelő infrastruktúra és eszközök biztosításával a csapat hatékonyan tud dolgozni, és a későbbi epicek implementálása sokkal gyorsabb és megbízhatóbb lesz.

**Kapcsolódás a PRD-hez:** Ez az epic közvetlenül támogatja a projekt technikai architektúráját (TA0-TA6 szekciók) és biztosítja, hogy a fejlesztés megfeleljen az NFR követelményeknek (különösen NFR6: Maintainability, NFR8: Deployment & DevOps).

## Objectives and Scope

### Objectives

1. **Standardizált fejlesztői környezet létrehozása:** Next.js 15 projekt inicializálása TypeScript-tel, Tailwind CSS-sel és core dependenciákkal
2. **Supabase infrastruktúra beállítása:** Lokális és cloud Supabase környezet konfigurálása PostgreSQL adatbázissal, Auth szolgáltatással és Storage-dzsel
3. **Docker-alapú fejlesztői környezet:** Docker Compose konfiguráció a szolgáltatások (Next.js, Redis, Supabase) konzisztens futtatásához
4. **Test infrastruktúra:** Jest unit/integration tesztek és Playwright E2E tesztek beállítása
5. **Structured logging:** Winston logger konfigurálása esemény- és hibakövetéshez
6. **Reverse proxy és HTTPS:** Caddy automatikus HTTPS-sel a production deploymenthez
7. **CI/CD pipeline:** GitHub Actions automatizált teszteléshez és deploymenthez
8. **Frontend design system:** Tailwind CSS konfigurálás purple/violet színpalettával, Shadcn UI komponensekkel és design token rendszerrel
9. **Layout és navigáció:** Főbb layout komponensek (Sidebar, TopBar, MainLayout) és navigációs setup Brand Selector-ral

### In Scope

- **Story 1.1:** Project initialization (Next.js 15 + TypeScript + core dependencies)
- **Story 1.2:** Supabase project setup & configuration
- **Story 1.3:** Docker Compose environment setup
- **Story 1.4:** Test infrastructure (Jest + Playwright)
- **Story 1.5:** Winston logging infrastructure
- **Story 1.6:** Caddy reverse proxy configuration
- **Story 1.7:** CI/CD pipeline (GitHub Actions)
- **Story 1.8:** Frontend design system setup (Tailwind, Shadcn UI, design tokens)
- **Story 1.9:** Frontend layout & navigation (Sidebar, TopBar, Brand Selector)

### Out of Scope

- ❌ Teljes feature implementáció (Epic 2-7 része)
- ❌ Database schema RLS policies (Epic 2: Multi-Tenant Authentication)
- ❌ AI service integráció (Epic 4: AI-Powered Content Generation)
- ❌ Meta Graph API integráció (Epic 6: Approval & Publishing)
- ❌ Production monitoring és alerting (Post-MVP)
- ❌ Advanced analytics és instrumentation (Epic 7)

### Dependencies

**Előfeltételek:** Nincs (ez az első epic)

**Blokkoló függőségek más epicektől:** Nincs

**Ez az epic blokkol:** Összes további epic (Epic 2-7) - az infrastruktúra nélkül nem lehet fejleszteni

## System Architecture Alignment

Ez az epic közvetlenül implementálja az **Architecture dokumentumban** (`docs/architecture.md`) definiált döntéseket:

### Framework és Nyelv (Architecture Decision Summary)

- **Next.js 15 (App Router):** Modern React framework Server Components-szel, built-in API routes-szal
- **TypeScript:** Type-safety az egész stackben, AI autocomplete támogatás
- **Tailwind CSS v4:** Utility-first styling, gyors prototípusok, kisebb bundle

### Project Structure Megfelelés

Az architektúra által definiált mappa struktúra (Architecture § Project Structure):
```
src/
  app/          # Next.js App Router (routing, pages, API routes)
  components/   # UI komponensek (Shadcn UI + custom)
  lib/          # Shared utilities, services, hooks
  types/        # TypeScript type definitions
```

### Deployment Architektúra (Architecture § Deployment Architecture)

- **Hetzner VPS:** Self-hosted deployment (cost-effective, full control)
- **Docker Compose:** Next.js app + Redis + worker konténerek
- **Caddy:** Automatic HTTPS reverse proxy (Architecture ADR-007: Caddy vs Nginx)

### Development Environment (Architecture § Development Environment)

- **Node.js v20:** LTS verzió
- **Docker:** Lokális Redis és Supabase futtatásához
- **Supabase CLI:** Database migrations és local dev environment

### Testing Strategy (Architecture § Testing Strategy)

- **Unit tests:** Jest (@swc/jest gyors compilation)
- **Integration tests:** Jest + Supertest (API routes tesztelés)
- **E2E tests:** Playwright (kritikus user flow-k)
- **Coverage target:** ≥ 60% (P0 pilot baseline)

### Logging Strategy (Architecture § Logging Strategy)

- **Winston:** Structured logging JSON formátumban
- **Log levels:** ERROR, WARN, INFO, DEBUG
- **Destinations:** Console (dev), File (prod), jövőbeli Sentry/Logtail integráció

### CI/CD Megfelelés (Architecture § CI/CD Pipeline)

- **GitHub Actions:** Automatizált testing és deployment
- **CI workflow:** ESLint, unit tests, integration tests, coverage report
- **CD workflow:** Build, E2E smoke tests, SSH deployment, health check, rollback on failure

### Design System Alignment (UX Design Specification § 1)

- **Shadcn UI + Tailwind CSS:** Headless komponensek teljes vizuális kontrollal
- **Purple/Violet color palette:** Primary brand color (#a855f7)
- **Design tokens:** CSS variables future-ready dark mode-hoz
- **Typography:** Plus Jakarta Sans (headings) + Inter (body)

## Detailed Design

### Services and Modules

{{services_modules}}

### Data Models and Contracts

{{data_models}}

### APIs and Interfaces

{{apis_interfaces}}

### Workflows and Sequencing

{{workflows_sequencing}}

## Non-Functional Requirements

### Performance

{{nfr_performance}}

### Security

{{nfr_security}}

### Reliability/Availability

{{nfr_reliability}}

### Observability

{{nfr_observability}}

## Dependencies and Integrations

{{dependencies_integrations}}

## Acceptance Criteria (Authoritative)

{{acceptance_criteria}}

## Traceability Mapping

{{traceability_mapping}}

## Risks, Assumptions, Open Questions

{{risks_assumptions_questions}}

## Test Strategy Summary

{{test_strategy}}
