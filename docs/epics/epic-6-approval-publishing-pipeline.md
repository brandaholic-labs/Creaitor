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

**Frontend Components:**
- ApproveButton component (src/components/calendar/ApproveButton.tsx)
  - Shadcn UI: Button component
  - "Approve" button
  - Enabled only for posts in 'review' status
  - Disabled for other statuses

**Backend Components:**
- API route: POST /api/posts/{postId}/approve
  - Validates current status = 'review'
  - Updates posts.status = 'approved'
  - P1: Sets posts.approved_by_user_id
  - Logs approval action in usage_events
- Database: posts.status update
- Usage events tracking: Approval action logging

**Tests:**
- E2E test: Approve button enabled for review posts
- E2E test: Click Approve → status changes to approved
- E2E test: Schedule button becomes enabled after approval
- Integration test: POST /api/posts/{postId}/approve API call
- Integration test: Usage events logging

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

**Frontend Components:**
- None (backend-only story, token management happens in Story 3.2)

**Backend Components:**
- MetaGraphAPIService class: src/services/meta/MetaGraphAPIService.ts
  - Token retrieval from social_profiles table
  - Token validation (expires_at check)
  - Token refresh logic (P1: automatic refresh)
- Database: social_profiles table (access_token, access_token_expires_at)
- Error handling: Token expired, insufficient permissions

**Tests:**
- Unit test: Token validation (expired token check)
- Unit test: Token retrieval from database
- Integration test: Meta Graph API token validation
- Integration test: Token refresh logic (P1)

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

**Frontend Components:**
- None (backend-only story, publishing happens via BullMQ worker)

**Backend Components:**
- MetaGraphAPIService.publishToFacebook() method
  - Fetches post content, image_url from posts table
  - Fetches FB Page access token from social_profiles
  - Calls Meta Graph API: POST /{page-id}/feed or POST /{page-id}/photos
  - Updates posts table on success/failure
- Retry logic: 3 attempts with exponential backoff (1s, 2s, 4s)
- Winston logging: logPublishEvent()
- Database: posts table updates (status, published_at, meta_post_id, post_url)

**Tests:**
- Unit test: publishToFacebook() method
- Unit test: Retry logic (3 attempts, exponential backoff)
- Integration test: Meta Graph API Facebook publishing
- Integration test: Image upload (multipart/form-data)
- Integration test: Rate limit handling
- Integration test: Winston logging

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

**Frontend Components:**
- None (backend-only story, publishing happens via BullMQ worker)

**Backend Components:**
- MetaGraphAPIService.publishToInstagram() method
  - Two-step Instagram publishing:
    1. Create media container: POST /{ig-user-id}/media
    2. Publish container: POST /{ig-user-id}/media_publish
  - Validates image_url exists (Instagram requires image)
  - Updates posts table on success/failure
- Retry logic: 3 attempts with exponential backoff (1s, 2s, 4s)
- Winston logging: logPublishEvent()
- Database: posts table updates (status, published_at, meta_post_id, post_url)

**Tests:**
- Unit test: publishToInstagram() method
- Unit test: Two-step publish process
- Unit test: Image validation (Instagram requires image)
- Integration test: Meta Graph API Instagram publishing
- Integration test: Retry logic
- Integration test: Winston logging

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

**Frontend Components:**
- BullBoardDashboard component (src/components/admin/BullBoardDashboard.tsx) - P1
  - Bull Board dashboard integration
  - Job monitoring UI at /admin/queues
  - Job status, retry count, error details

**Backend Components:**
- BullMQ worker: src/workers/publish-worker.ts
  - Processes 'publish-post' queue jobs
  - Fetches post from database
  - Calls MetaGraphAPIService based on platform
  - Updates post status on success/failure
- BullMQ queue configuration: 'publish-post' queue
- Job retry configuration: Max 3 attempts, exponential backoff
- Failed jobs queue: Manual inspection
- Bull Board integration (P1): /admin/queues dashboard

**Tests:**
- Unit test: Worker processes job correctly
- Unit test: Job retry logic
- Integration test: BullMQ job creation and processing
- Integration test: Failed jobs moved to failed queue
- Integration test: Bull Board dashboard (P1)

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

**Frontend Components:**
- PostStatusBadge component (src/components/calendar/PostStatusBadge.tsx)
  - Shadcn UI: Badge component
  - Status display: "Published ✓" (green) or "Failed ❌" (red)
  - Published timestamp display
- ViewOnPlatformButton component (src/components/calendar/ViewOnPlatformButton.tsx)
  - Shadcn UI: Button component
  - Opens post_url in new tab
- RetryPublishButton component (src/components/calendar/RetryPublishButton.tsx)
  - Shadcn UI: Button component
  - "Retry Publish" button (for failed posts)
  - Error message display
- NotificationBell component (src/components/notifications/NotificationBell.tsx) - P1
  - Shadcn UI: Button, Badge components
  - In-app notification bell icon
  - Notification display

**Backend Components:**
- API route: POST /api/posts/{postId}/retry-publish
  - Creates new BullMQ job immediately
  - Retries failed publish
- Database: posts.publish_error_message field (error details storage)
- Notification system (P1): Supabase Realtime or polling
  - "Post '{title}' published successfully" notification
  - "Post '{title}' failed to publish" notification

**Tests:**
- E2E test: Published post shows "Published ✓" badge
- E2E test: Failed post shows "Failed ❌" badge + error message
- E2E test: View on Platform button opens post_url
- E2E test: Retry Publish button retries failed post
- E2E test: Notifications displayed (P1)
- Integration test: POST /api/posts/{postId}/retry-publish API call
- Integration test: Notification system (P1)

---
