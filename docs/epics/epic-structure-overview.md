# Epic Structure Overview

A Creaitor MVP követelményeit **7 epic-re** bontottam, amelyek **természetes üzleti értékek és felhasználói célok** mentén csoportosulnak. Minden epic önálló értéket képvisel és 3-8 kapcsolódó képességet tartalmaz.

## Epic Titles and Value Statements

**Epic 1: Foundation & Development Infrastructure**
> *"Establish solid technical foundation enabling all subsequent development with CI/CD, deployment pipeline, and core tooling"*

**Scope:** Next.js project setup, Supabase configuration, Docker containerization, Caddy reverse proxy, test infrastructure, monitoring baseline, development environment
**Business Goal:** Zero friction development environment → accelerated velocity for all subsequent epics
**Delivers:** Working deployment pipeline, test framework, logging infrastructure

---

**Epic 2: Multi-Tenant Authentication & Authorization**
> *"Enable agencies to securely onboard, manage teams, and isolate brand data with robust RLS-based multi-tenancy"*

**Scope:** Agency registration, Supabase Auth integration, user management, role-based permissions (Admin/Editor), RLS policies, session management
**Business Goal:** Secure, scalable multi-tenant foundation → supports 5-10 pilot agencies with complete data isolation
**Delivers:** Agency signup, user invites, secure authentication, tenant isolation

---

**Epic 3: Brand Management & Brand Brain**
> *"Empower agencies to onboard client brands and capture brand-specific context for AI-powered content generation"*

**Scope:** Brand CRUD, Meta (FB/IG) profile OAuth connection, Brand Brain editor (példaposztok, TOV, key messages, visual direction), brand assets storage, baseline validation
**Business Goal:** High-quality brand context → enables 8/10+ brand consistency in AI output (H1 validation)
**Delivers:** Brand setup workflow, Brand Brain v1, Meta profile linking

---

**Epic 4: AI-Powered Content Generation**
> *"Generate on-brand social media copy using LLM with Brand Brain context injection and dual-provider reliability"*

**Scope:** AI Copy Studio UI, LLM service (OpenAI + Anthropic dual provider), Brand Brain context injection, post brief input, multi-variant generation, inline editor, usability rating (mandatory), image upload
**Business Goal:** 30-40% time savings (H2 validation) with 70%+ usable posts requiring only minor edits
**Delivers:** AI text generation, Brand Brain integration, usability instrumentation, image management

---

**Epic 5: Content Calendar & Scheduling System**
> *"Visualize and organize multi-brand FB/IG content in weekly calendar with timezone-aware scheduling"*

**Scope:** Calendar grid UI (weekly view), post slots, status state machine (draft→review→approved→scheduled→published), brand filtering, timezone handling (Europe/Budapest user-facing, UTC internal), scheduling interface
**Business Goal:** Centralized workflow hub → socialosok "fő gyártóhely" (go-to tool, H2 validation)
**Delivers:** Content calendar, post organization, scheduling UI, timezone conversion

---

**Epic 6: Approval & Publishing Pipeline**
> *"Streamline post approval and automate Meta (FB/IG) publishing with retry logic and background job processing"*

**Scope:** Pseudo-approval workflow (self-approval P0), Meta OAuth integration, FB Page + IG Account publishing, BullMQ job queue, scheduled post execution, retry logic (3 attempts), publish result tracking, user notifications
**Business Goal:** Frictionless publish workflow → complete Creaitor adoption (generate → schedule → publish in one platform)
**Delivers:** Approval flow, Meta Graph API integration, background publishing, error handling

---

**Epic 7: Analytics & Instrumentation**
> *"Capture comprehensive usage events and usability ratings to validate MVP hypotheses and measure success metrics"*

**Scope:** Winston backend logging, user event tracking, AI generation tracking, publish event tracking, mandatory usability rating aggregation, pilot metrics dashboard (basic)
**Business Goal:** Data-driven hypothesis validation → measure H1 (8/10 brand consistency), H2 (workflow adoption), H3 (time savings 30-40%)
**Delivers:** Event logging, rating system, usage analytics, pilot reporting

---

## Epic Sequencing

**Recommended Implementation Order:**

1. **Epic 1** (Foundation) → **Epic 2** (Auth) → **Epic 3** (Brand Brain)
   - *Dependency chain:* Foundation enables all work, Auth enables multi-tenancy, Brand Brain enables AI

2. **Epic 4** (AI Generation) depends on Epic 3 (Brand Brain context)
   - *Critical path:* Cannot generate without brand context

3. **Epic 5** (Calendar) can start after Epic 2 (Auth + basic post model)
   - *Parallel opportunity:* UI development can overlap with Epic 4

4. **Epic 6** (Publishing) depends on Epic 5 (Calendar) and Epic 4 (AI Generation)
   - *Integration point:* Brings together content creation and distribution

5. **Epic 7** (Analytics) should instrument across all epics
   - *Cross-cutting:* Rating integration in Epic 4, event tracking in Epic 2-6

**Estimated Timeline:** 6-8 sprints (12-16 weeks) assuming 2-week sprints

---
