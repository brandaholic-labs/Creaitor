# Epic 6: Approval & Publishing Pipeline

**Goal:** Streamline post approval and automate Meta (FB/IG) publishing with retry logic

**Business Value:** Frictionless publish workflow → complete platform adoption

**Dependencies:** Epic 5 (Calendar), Epic 4 (Content Generation)

---

## Story 6.1: Pseudo-Approval Workflow (FR6.1)

As a **socialos**,
I want **to mark posts as approved before scheduling**,
So that **there's a clear workflow checkpoint before publishing**.

**Acceptance Criteria:**

**Given** I have a post in 'review' status
**When** I click "Approve" button
**Then** posts.status changes to 'approved'

**And** "Schedule" button becomes enabled

**And** P0 simplification: Self-approval allowed (same user can review and approve)

**And** P1 enhancement: Multi-user approval (different user must approve)

**And** Approval action logged in usage_events

**And** Approval completes in < 500ms

**Prerequisites:** Story 5.2 (status state machine)

**Technical Notes:**
- API route: POST /api/posts/{postId}/approve
- Check current status = 'review'
- Update status to 'approved'
- P1: Add approved_by_user_id column

---

## Story 6.2: Meta OAuth & Page/Account Connection

As a **system**,
I want **Meta OAuth integration to obtain access tokens for publishing**,
So that **we can publish to Facebook Pages and Instagram Accounts via Meta Graph API**.

**Acceptance Criteria:**

**Given** Brand has connected FB Page and IG Account (Story 3.2)
**When** system needs to publish a post
**Then** access token retrieved from social_profiles table

**And** Token validation:
- Check access_token_expires_at > now()
- If expired: Show error to user "Reconnect Facebook Page"

**And** Meta Graph API version: v18.0 (as per FR7.1)

**And** Permissions verified:
- pages_manage_posts (for FB)
- instagram_content_publish (for IG)

**And** Token refresh handled (P1: automatic refresh with long-lived token)

**Prerequisites:** Story 3.2 (Meta OAuth connection)

**Technical Notes:**
- Use Meta Graph API v18.0
- Store tokens encrypted
- 60-day expiry (short-lived token, P1: long-lived token)
- Error handling: Token expired, insufficient permissions

---

## Story 6.3: Facebook Page Publishing

As a **socialos**,
I want **to publish posts to Facebook Pages via Meta Graph API**,
So that **content goes live automatically at scheduled time**.

**Acceptance Criteria:**

**Given** scheduled post for Facebook platform
**When** BullMQ job executes at scheduled time
**Then** MetaGraphAPIService.publishToFacebook() called:
- Fetches post content, image_url from posts table
- Fetches FB Page access token from social_profiles
- Calls Meta Graph API: POST /{page-id}/feed
  - Parameters: message (post content), link (optional), published (true)
  - If image_url exists: POST /{page-id}/photos instead

**And** On success:
- posts.status = 'published'
- posts.published_at = now()
- posts.meta_post_id = Facebook post ID
- posts.post_url = Facebook post permalink

**And** On failure:
- Retry logic: 3 attempts with exponential backoff (1s, 2s, 4s)
- After 3 failures: posts.status = 'failed', error logged
- User notification: "Publishing failed, manual retry available"

**And** Publishing completes in < 5 seconds (excluding scheduled wait)

**Prerequisites:** Story 6.2, Story 5.3 (BullMQ job)

**Technical Notes:**
- Follow FR7.1 specifications
- Rate limit handling: Respect Meta API limits
- Image upload: Use multipart/form-data for photos
- Log publish events with logPublishEvent()

---

## Story 6.4: Instagram Account Publishing

As a **socialos**,
I want **to publish posts to Instagram Accounts via Meta Graph API**,
So that **IG content goes live automatically**.

**Acceptance Criteria:**

**Given** scheduled post for Instagram platform
**When** BullMQ job executes
**Then** MetaGraphAPIService.publishToInstagram() called:
- Two-step Instagram publishing process:
  1. Create media container: POST /{ig-user-id}/media
     - image_url (required for IG, FR0.5)
     - caption (post content)
  2. Publish container: POST /{ig-user-id}/media_publish
     - creation_id (from step 1)

**And** On success:
- posts.status = 'published'
- posts.published_at = now()
- posts.meta_post_id = Instagram media ID
- posts.post_url = Instagram post permalink

**And** On failure: Same retry logic as Story 6.3 (3 attempts, exponential backoff)

**And** P0 limitation (FR0.5):
- Instagram single-image only (no carousel, no video)
- If image_url IS NULL: Error "Instagram requires image"

**And** Publishing completes in < 10 seconds (IG is slower than FB)

**Prerequisites:** Story 6.2, Story 5.3

**Technical Notes:**
- Follow FR7.1 & FR0.5 specifications
- Instagram requires image (enforce in validation)
- Two-step publish process specific to IG
- Caption max 2200 chars

---

## Story 6.5: BullMQ Job Queue & Background Workers

As a **system**,
I want **BullMQ job queue processing scheduled post publishing in background**,
So that **publishing happens reliably at scheduled times without blocking UI**.

**Acceptance Criteria:**

**Given** BullMQ and Redis configured (Story 1.3)
**When** post is scheduled (Story 5.3)
**Then** BullMQ job created:
- Queue name: 'publish-post'
- Job data: {postId, brandId, platform}
- Delayed execution: scheduled_for timestamp

**And** Worker process (src/workers/publish-worker.ts) handles jobs:
- Fetches post from database
- Calls MetaGraphAPIService based on platform
- Updates post status on success/failure

**And** Worker runs separately from Next.js app (separate process or Docker service)

**And** Job retry configuration:
- Max attempts: 3
- Backoff: exponential (1s, 2s, 4s)

**And** Failed jobs moved to failed queue (manual inspection)

**And** Bull Board dashboard (P1) for monitoring jobs: /admin/queues

**Prerequisites:** Story 1.3 (Redis), Story 6.3, Story 6.4

**Technical Notes:**
- Follow Architecture ADR-005 (BullMQ choice)
- Worker: node src/workers/publish-worker.ts
- Docker: Separate service for worker
- Use Bull Board for job monitoring (optional P1)

---

## Story 6.6: Publish Result Tracking & User Notification

As a **socialos**,
I want **to see publish success/failure status and retry failed posts**,
So that **I know if my content went live and can fix issues**.

**Acceptance Criteria:**

**Given** post publishing completed (success or failure)
**When** I view the post in calendar
**Then** status badge reflects result:
- "Published ✓" (green) if success
- "Failed ❌" (red) if failed after 3 retries

**And** For published posts:
- "View on Platform" button opens post_url in new tab
- Published timestamp shown (e.g., "Published 2 hours ago")

**And** For failed posts:
- Error message shown (e.g., "Token expired" or "Network error")
- "Retry Publish" button available
- Clicking retry: Creates new BullMQ job immediately

**And** User notification (P1 feature):
- In-app notification bell icon
- Notification: "Post '{title}' published successfully" or "Post '{title}' failed to publish"

**And** Manual retry completes in < 5 seconds

**Prerequisites:** Story 6.3, Story 6.4, Story 6.5

**Technical Notes:**
- API route: POST /api/posts/{postId}/retry-publish
- Store error details in posts.publish_error_message
- Notification system (P1): Supabase Realtime or simple polling

---
