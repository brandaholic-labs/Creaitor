# Epic 7: Analytics & Instrumentation

**Goal:** Capture comprehensive usage events and usability ratings to validate MVP hypotheses

**Business Value:** Data-driven hypothesis validation → measure H1, H2, H3 success

**Dependencies:** Epic 2-6 (cross-cutting, instruments all features)

---

## Story 7.1: Winston Backend Event Logging

As a **system**,
I want **Winston logger tracking all critical user and system events**,
So that **we can analyze usage patterns and debug issues**.

**Acceptance Criteria:**

**Given** Winston configured (Story 1.5)
**When** critical events occur
**Then** events logged with structured data:

**User events:**
- User registration (userId, agencyId, timestamp)
- User login (userId, timestamp)
- Brand created (userId, brandId, timestamp)
- Brand Brain updated (userId, brandId, entry_type, timestamp)

**AI events:**
- AI copy generation (userId, brandId, provider, tokens, latency, timestamp)
- AI regeneration (userId, brandId, regeneration_count)

**Publishing events:**
- Post scheduled (userId, postId, scheduled_for)
- Post published (postId, platform, status, meta_post_id, timestamp)
- Publish failed (postId, platform, error, retry_count)

**And** All logs include:
- requestId (trace requests)
- userId (who)
- agencyId (tenant)
- timestamp (when)
- metadata (contextual data)

**And** Logs stored in:
- combined.log (all logs)
- error.log (errors only)
- Console (development)

**And** Log rotation: 20MB max per file, 14 days retention

**Prerequisites:** Story 1.5

**Technical Notes:**
- Use logUserEvent(), logAICall(), logPublishEvent() utilities
- JSON format for production (structured logging)
- Future: Send to Logtail/Sentry for centralized monitoring

**Frontend Components:**
- None (backend-only story, logging happens in API routes and services)

**Backend Components:**
- Winston logger utilities: src/lib/logger.ts
  - logUserEvent(userId, eventType, metadata)
  - logAICall(brandId, provider, tokens, latency)
  - logPublishEvent(postId, platform, status, metadata)
  - logError(error, context)
- Structured logging: JSON format for production
- Log files: combined.log, error.log
- Log rotation: 20MB max per file, 14 days retention

**Tests:**
- Unit test: logUserEvent() logs correctly
- Unit test: logAICall() logs correctly
- Unit test: logPublishEvent() logs correctly
- Integration test: Logs written to files
- Integration test: Log rotation works

---

## Story 7.2: Usability Rating Data Storage

As a **system**,
I want **AI usability ratings stored and aggregated per brand**,
So that **we can measure H1 hypothesis (8/10 brand consistency)**.

**Acceptance Criteria:**

**Given** socialos rated AI-generated post (Story 4.5)
**When** rating saved
**Then** posts.ai_usability_rating column stores rating (1-10)

**And** Aggregation query exists:
```sql
SELECT brand_id, 
       AVG(ai_usability_rating) as avg_rating,
       COUNT(*) as rated_posts_count
FROM posts
WHERE is_ai_generated = true
  AND ai_usability_rating IS NOT NULL
GROUP BY brand_id
```

**And** Aggregate data displayed in pilot dashboard:
- Per brand: "Average AI Usability: 8.2/10 (based on 45 posts)"
- Overall: "Overall AI Usability: 7.9/10 (all brands)"

**And** H1 target: Average ≥ 8.0 for MVP success

**And** Aggregation query completes in < 100ms

**Prerequisites:** Story 4.5

**Technical Notes:**
- Store rating in posts table (already enforced by DB constraint)
- Create materialized view for performance (P1)
- Dashboard displays aggregated metrics

**Frontend Components:**
- None (data storage only, display happens in Story 7.4)

**Backend Components:**
- Database: posts.ai_usability_rating field (already exists from Story 4.5)
- SQL aggregation query:
  ```sql
  SELECT brand_id, 
         AVG(ai_usability_rating) as avg_rating,
         COUNT(*) as rated_posts_count
  FROM posts
  WHERE is_ai_generated = true
    AND ai_usability_rating IS NOT NULL
  GROUP BY brand_id
  ```
- Materialized view (P1): For performance optimization
- Database: Aggregated metrics calculation

**Tests:**
- Unit test: Aggregation query returns correct averages
- Integration test: SQL aggregation query performance
- Integration test: Materialized view (P1)

---

## Story 7.3: Usage Event Tracking Table

As a **system**,
I want **usage_events table storing granular event data**,
So that **we can analyze user behavior for H2 hypothesis (workflow adoption)**.

**Acceptance Criteria:**

**Given** usage_events table exists (created in Story 1.2)
**When** trackable events occur
**Then** usage_events records inserted with:
- id (UUID)
- user_id (who)
- agency_id (tenant)
- event_type (e.g., 'ai_generation', 'post_published', 'brand_created')
- event_metadata (JSONB, contextual data)
- created_at (timestamp)

**And** Events tracked:
- User actions: login, brand_created, post_created, post_published
- AI usage: ai_copy_generated, ai_copy_regenerated
- Workflow: post_scheduled, post_approved

**And** Event insertion non-blocking (fire-and-forget, P0: synchronous, P1: async queue)

**And** RLS policy: Users can only query their own events

**And** Retention: Keep all events for pilot duration (6 months)

**Prerequisites:** Story 1.2

**Technical Notes:**
- Use JSONB for flexible metadata
- Index on user_id, event_type, created_at for fast queries
- Track events in API routes after successful operations

**Frontend Components:**
- None (backend-only story, event tracking happens in API routes)

**Backend Components:**
- Database: usage_events table (already exists from Story 1.2)
  - id (UUID)
  - user_id
  - agency_id
  - event_type
  - event_metadata (JSONB)
  - created_at
- Event tracking utilities: src/lib/events.ts
  - trackEvent(userId, agencyId, eventType, metadata)
- Event insertion: Fire-and-forget (P0: synchronous, P1: async queue)
- Database indexes: user_id, event_type, created_at
- RLS policy: Users can only query their own events

**Tests:**
- Unit test: trackEvent() creates correct usage_events record
- Integration test: Event insertion performance
- Integration test: RLS policy enforcement
- Integration test: Database indexes for fast queries

---

## Story 7.4: Basic Pilot Metrics Dashboard

As a **product owner**,
I want **basic dashboard showing pilot success metrics**,
So that **I can track H1, H2, H3 hypothesis validation progress**.

**Acceptance Criteria:**

**Given** I navigate to /admin/metrics (admin-only access)
**When** dashboard loads
**Then** I see key pilot metrics:

**H1 - Brand Consistency:**
- Average AI Usability Rating: X.X / 10
- Target: ≥ 8.0
- Breakdown per brand

**H2 - Workflow Adoption:**
- Active agencies (logged in last 7 days): X
- Active brands per agency (avg): X
- Posts created via Creaitor: X
- % Posts published via Creaitor (vs manual): X%

**H3 - Time Savings:**
- (P1 feature: requires baseline time tracking input from socialosok)
- Placeholder: "Manual time tracking survey needed"

**And** Metrics refreshed on page load (no real-time updates in P0)

**And** Dashboard loads in < 3 seconds

**And** Access restricted to agency_admin role (optional: super-admin role)

**Prerequisites:** Story 7.1, Story 7.2, Story 7.3

**Technical Notes:**
- API route: GET /api/admin/metrics (protected by role check)
- Query aggregated data from posts, usage_events tables
- Use Recharts or similar for simple charts (P1)
- P0: Tables with numbers, P1: Graphs/charts

**Frontend Components:**
- Metrics dashboard page: `/admin/metrics` route (src/app/admin/metrics/page.tsx)
  - Admin-only access (role check)
- MetricsDashboard component (src/components/admin/MetricsDashboard.tsx)
  - Shadcn UI: Card, Table, Badge components
  - H1 - Brand Consistency section:
    - Average AI Usability Rating display
    - Target indicator (≥ 8.0)
    - Breakdown per brand (table)
  - H2 - Workflow Adoption section:
    - Active agencies count
    - Active brands per agency (avg)
    - Posts created via Creaitor count
    - % Posts published via Creaitor
  - H3 - Time Savings section:
    - Placeholder: "Manual time tracking survey needed"
- Charts component (src/components/admin/Charts.tsx) - P1
  - Recharts library
  - Graphs/charts for metrics visualization

**Backend Components:**
- API route: GET /api/admin/metrics
  - Protected by role check (agency_admin or super-admin)
  - Queries aggregated data from posts, usage_events tables
  - Returns H1, H2, H3 metrics
- Database queries: Aggregated metrics from posts, usage_events
- Role-based access control: Admin-only

**Tests:**
- E2E test: Metrics dashboard loads (admin-only)
- E2E test: H1 metrics displayed correctly
- E2E test: H2 metrics displayed correctly
- E2E test: Non-admin users cannot access dashboard
- Integration test: GET /api/admin/metrics API call
- Integration test: Role-based access control
- Integration test: Aggregated metrics queries

---

## Story 7.5: Pilot Data Export (CSV)

As a **product owner**,
I want **to export pilot metrics data to CSV**,
So that **I can analyze data in Excel/Sheets for deeper insights**.

**Acceptance Criteria:**

**Given** I am on /admin/metrics
**When** I click "Export Data" button
**Then** system generates CSV files:

**File 1: usability_ratings.csv**
- Columns: brand_id, brand_name, post_id, ai_usability_rating, created_at
- All AI-generated posts with ratings

**File 2: usage_events.csv**
- Columns: user_id, event_type, event_metadata, created_at
- All tracked events

**File 3: post_summary.csv**
- Columns: brand_id, brand_name, total_posts, ai_generated_posts, published_posts, avg_usability_rating
- Aggregated post stats per brand

**And** CSV download starts immediately (browser download)

**And** Export completes in < 10 seconds for 500 posts

**And** CSV uses UTF-8 encoding (Hungarian characters support)

**Prerequisites:** Story 7.4

**Technical Notes:**
- API route: GET /api/admin/metrics/export?type={usability|events|summary}
- Use papaparse or csv-writer library
- Set Content-Disposition header for browser download
- RLS: Admin-only access

**Frontend Components:**
- ExportButton component (src/components/admin/ExportButton.tsx)
  - Shadcn UI: Button component
  - "Export Data" button
  - Export type selector (usability, events, summary)
  - CSV download trigger

**Backend Components:**
- API route: GET /api/admin/metrics/export
  - Query parameter: type (usability|events|summary)
  - Generates CSV files:
    - usability_ratings.csv: brand_id, brand_name, post_id, ai_usability_rating, created_at
    - usage_events.csv: user_id, event_type, event_metadata, created_at
    - post_summary.csv: brand_id, brand_name, total_posts, ai_generated_posts, published_posts, avg_usability_rating
  - Sets Content-Disposition header for browser download
  - UTF-8 encoding (Hungarian characters support)
- CSV generation: papaparse or csv-writer library
- Role-based access control: Admin-only

**Tests:**
- E2E test: Export button generates CSV files
- E2E test: CSV files contain correct data
- E2E test: UTF-8 encoding (Hungarian characters)
- E2E test: Non-admin users cannot export
- Integration test: GET /api/admin/metrics/export API call
- Integration test: CSV generation performance
- Integration test: Role-based access control

---
