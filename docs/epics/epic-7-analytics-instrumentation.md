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

---
