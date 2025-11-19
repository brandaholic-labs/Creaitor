# Epic 5: Content Calendar & Scheduling System

**Goal:** Visualize and organize multi-brand FB/IG content in weekly calendar with timezone-aware scheduling

**Business Value:** Centralized workflow hub → "fő gyártóhely" (go-to tool)

**Dependencies:** Epic 2 (Auth), Epic 4 (AI generation for content)

---

## Story 5.1: Weekly Calendar Grid View

As a **socialos**,
I want **to see a weekly calendar grid with all my brand's scheduled posts**,
So that **I can visualize the content pipeline at a glance**.

**Acceptance Criteria:**

**Given** I navigate to /calendar
**When** page loads
**Then** I see weekly calendar grid:
- 7 columns (Monday-Sunday)
- Time slots (optional P1: hourly slots, P0: just day columns)
- Current week shown by default

**And** Week navigation:
- "Previous Week" / "Next Week" buttons
- "Today" button (jump to current week)
- Week range shown (e.g., "Nov 18 - Nov 24, 2024")

**And** If I manage multiple brands:
- Brand filter dropdown shown
- Select brand to filter posts
- "All Brands" option shows all posts

**And** Posts displayed as cards in calendar grid:
- Post preview (first 50 chars of content)
- Platform icon (FB/IG)
- Status badge (draft/review/approved/scheduled/published)
- Scheduled time (if status = scheduled)

**And** Calendar loads in < 2 seconds

**Prerequisites:** Story 2.2 (Auth), Story 3.1 (Brands)

**Technical Notes:**
- API route: GET /api/calendar?brandId={id}&weekStart={date}
- Use date-fns for date manipulation
- Europe/Budapest timezone for display (FR5.3)
- Responsive: Desktop grid, mobile list view

**Frontend Components:**
- Calendar page: `/calendar` route (src/app/calendar/page.tsx)
- WeeklyCalendarGrid component (src/components/calendar/WeeklyCalendarGrid.tsx)
  - Shadcn UI: Card, Button, Badge components
  - 7 columns (Monday-Sunday)
  - Time slots (optional P1: hourly slots)
  - Post cards display
  - Week navigation buttons (Previous/Next/Today)
  - Week range display
- BrandFilterDropdown component (src/components/calendar/BrandFilterDropdown.tsx)
  - Shadcn UI: Select component
  - Brand filter dropdown
  - "All Brands" option
- PostCard component (src/components/calendar/PostCard.tsx)
  - Shadcn UI: Card, Badge components
  - Post preview (first 50 chars)
  - Platform icon (FB/IG)
  - Status badge (draft/review/approved/scheduled/published)
  - Scheduled time display

**Backend Components:**
- API route: GET /api/calendar
  - Query parameters: brandId (optional), weekStart (date)
  - Returns posts for selected week
  - Filters by brandId if provided
  - Returns posts with status, scheduled_for, content preview
- Database: posts table query (filtered by brand_id, week range)

**Tests:**
- E2E test: Calendar page loads with current week
- E2E test: Week navigation (Previous/Next/Today)
- E2E test: Brand filter changes displayed posts
- E2E test: Post cards display correct information
- Integration test: GET /api/calendar API call
- Integration test: Week range filtering

---

## Story 5.2: Post Status State Machine

As a **system**,
I want **post status to follow a defined state machine (draft → review → approved → scheduled → published)**,
So that **posts progress through workflow consistently**.

**Acceptance Criteria:**

**Given** posts table has status column (enum)
**When** post is created
**Then** initial status = 'draft'

**And** Status transitions allowed (FR5.2):
- draft → review (user clicks "Ready for Review")
- review → approved (user clicks "Approve", FR6.1 pseudo-approval)
- approved → scheduled (user sets schedule time)
- scheduled → published (BullMQ job executes at scheduled time)
- Any status → draft (user clicks "Move to Draft", except published)

**And** Status transitions NOT allowed:
- draft → scheduled (must go through approved)
- published → any other status (published is final)

**And** Database constraint or application logic enforces valid transitions

**And** Status change tracked in usage_events (who changed, when, from→to)

**Prerequisites:** Story 4.4 (posts table)

**Technical Notes:**
- Use PostgreSQL enum: post_status
- Implement state machine logic in API routes
- Frontend buttons enabled/disabled based on current status
- Log state transitions for audit trail

**Frontend Components:**
- PostStatusButtons component (src/components/calendar/PostStatusButtons.tsx)
  - Shadcn UI: Button, Badge components
  - Status transition buttons (enabled/disabled based on current status)
  - "Ready for Review" button (draft → review)
  - "Approve" button (review → approved)
  - "Move to Draft" button (any status → draft, except published)

**Backend Components:**
- API route: PATCH /api/posts/{postId}/status
  - Validates status transition (state machine logic)
  - Updates posts.status
  - Logs state transition in usage_events
- Database: posts.status enum (draft, review, approved, scheduled, published)
- Database constraint or application logic: Enforces valid transitions
- Usage events tracking: State transition logging

**Tests:**
- E2E test: Status transition buttons enabled/disabled correctly
- E2E test: Valid status transitions work
- E2E test: Invalid status transitions rejected
- Integration test: Status transition API call
- Integration test: State machine logic validation
- Integration test: Usage events logging

---

## Story 5.3: Scheduling Interface & Timezone Handling

As a **socialos**,
I want **to select a date and time to schedule a post for publishing**,
So that **posts go live at optimal times for my audience**.

**Acceptance Criteria:**

**Given** I have an approved post
**When** I click "Schedule" on the post card
**Then** scheduling modal opens with:
- Date picker (calendar UI)
- Time picker (dropdown or input, HH:MM format)
- Timezone shown: "Europe/Budapest" (user-facing)

**And** When I select date/time and click "Schedule Post":
- posts.scheduled_for = selected datetime converted to UTC
- posts.status = 'scheduled'
- BullMQ job created with:
  - jobId = postId
  - scheduled execution time (UTC timestamp)
  - payload: {postId, brandId, platform}

**And** Scheduled post appears in calendar at selected date/time

**And** Timezone conversion:
- User input: Europe/Budapest
- Database storage: UTC
- Display: Europe/Budapest

**And** Scheduling completes in < 1 second

**And** Past dates/times rejected with error: "Cannot schedule in the past"

**Prerequisites:** Story 5.1, Story 5.2

**Technical Notes:**
- Follow Architecture Pattern 5: Timezone-Aware Scheduling Pipeline
- Use date-fns-tz for timezone conversion
- BullMQ delayed job: queue.add('publish-post', {postId}, {delay: msUntilScheduled})
- Validate scheduled_for >= now()

**Frontend Components:**
- SchedulingModal component (src/components/calendar/SchedulingModal.tsx)
  - Shadcn UI: Dialog, Calendar, Select, Button components
  - Date picker (calendar UI)
  - Time picker (HH:MM format)
  - Timezone display: "Europe/Budapest"
  - "Schedule Post" button
  - Past date/time validation error display
- ScheduleButton component (src/components/calendar/ScheduleButton.tsx)
  - Shadcn UI: Button component
  - Opens scheduling modal
  - Enabled only for approved posts

**Backend Components:**
- API route: POST /api/posts/{postId}/schedule
  - Validates scheduled_for >= now()
  - Converts Europe/Budapest to UTC
  - Updates posts.scheduled_for (UTC)
  - Updates posts.status = 'scheduled'
  - Creates BullMQ delayed job
- BullMQ job creation: queue.add('publish-post', {postId, brandId, platform}, {delay: msUntilScheduled})
- Database: posts.scheduled_for field (UTC timestamp)

**Tests:**
- E2E test: Open scheduling modal → select date/time → schedule post
- E2E test: Past date/time rejected with error
- E2E test: Scheduled post appears in calendar at correct time
- E2E test: Timezone conversion (Europe/Budapest → UTC)
- Integration test: POST /api/posts/{postId}/schedule API call
- Integration test: BullMQ job creation
- Integration test: Timezone conversion logic

---

## Story 5.4: Drag & Drop Post Rescheduling (P1 - Optional)

As a **socialos**,
I want **to drag and drop posts to different days in the calendar**,
So that **I can quickly reorganize my content schedule**.

**Acceptance Criteria:**

**Given** I see posts in weekly calendar grid
**When** I drag a post card to a different day column
**Then** post moves to new day

**And** Backend updates:
- posts.scheduled_for updated (keep same time, change date)
- BullMQ job rescheduled

**And** Only scheduled/approved posts can be dragged (not drafts or published)

**And** Optimistic UI update (post moves immediately, then confirms)

**And** If update fails: Post reverts to original position + error toast

**Prerequisites:** Story 5.3

**Technical Notes:**
- Use dnd-kit or react-beautiful-dnd library
- API route: PATCH /api/posts/{postId}/reschedule
- Time preserved, only date changes
- P1 feature (nice to have, not critical for P0)

**Frontend Components:**
- DragAndDropCalendar component (src/components/calendar/DragAndDropCalendar.tsx)
  - dnd-kit or react-beautiful-dnd library
  - Drag and drop functionality for post cards
  - Optimistic UI update (post moves immediately)
  - Error toast on failure (revert position)
- PostCard (enhanced with drag handle)

**Backend Components:**
- API route: PATCH /api/posts/{postId}/reschedule
  - Updates posts.scheduled_for (date changes, time preserved)
  - Reschedules BullMQ job
- BullMQ job rescheduling logic

**Tests:**
- E2E test: Drag post to different day → post moves → backend updates
- E2E test: Only scheduled/approved posts can be dragged
- E2E test: Optimistic UI update → confirmation
- E2E test: Failed update → post reverts + error toast
- Integration test: PATCH /api/posts/{postId}/reschedule API call
- Integration test: BullMQ job rescheduling

---

## Story 5.5: Post Quick Actions in Calendar

As a **socialos**,
I want **quick action buttons on each post card in the calendar**,
So that **I can edit, delete, or publish posts without leaving the calendar view**.

**Acceptance Criteria:**

**Given** I hover over a post card in calendar
**When** actions menu appears
**Then** I see context-appropriate buttons:

**For draft posts:**
- "Edit" → opens post editor
- "Delete" → confirms and deletes post

**For approved posts:**
- "Schedule" → opens scheduling modal
- "Edit" → moves back to draft + opens editor
- "Delete"

**For scheduled posts:**
- "Publish Now" → bypasses schedule, publishes immediately
- "Edit Schedule" → opens scheduling modal
- "Cancel Schedule" → moves back to approved status
- "Delete"

**For published posts:**
- "View on Platform" → opens FB/IG post in new tab (if post_url available)

**And** Delete action requires confirmation modal

**And** Actions complete in < 1 second

**Prerequisites:** Story 5.1, Story 5.2

**Technical Notes:**
- Use Shadcn UI DropdownMenu component
- API routes: PATCH /api/posts/{postId}, DELETE /api/posts/{postId}
- RLS ensures user can only modify their agency's posts

**Frontend Components:**
- PostQuickActions component (src/components/calendar/PostQuickActions.tsx)
  - Shadcn UI: DropdownMenu, Button, Dialog components
  - Context menu on post card hover
  - Status-appropriate action buttons:
    - Draft: Edit, Delete
    - Approved: Schedule, Edit, Delete
    - Scheduled: Publish Now, Edit Schedule, Cancel Schedule, Delete
    - Published: View on Platform
- DeleteConfirmationModal component (src/components/calendar/DeleteConfirmationModal.tsx)
  - Shadcn UI: Dialog, Button components
  - Confirmation modal for delete action

**Backend Components:**
- API route: PATCH /api/posts/{postId}
  - Updates post (edit, status change, schedule change)
- API route: DELETE /api/posts/{postId}
  - Deletes post (soft delete or hard delete)
- API route: POST /api/posts/{postId}/publish-now
  - Bypasses schedule, publishes immediately
- RLS policy: Ensures user can only modify their agency's posts

**Tests:**
- E2E test: Quick actions menu appears on hover
- E2E test: Status-appropriate actions shown
- E2E test: Delete action requires confirmation
- E2E test: Actions complete successfully
- Integration test: PATCH /api/posts/{postId} API call
- Integration test: DELETE /api/posts/{postId} API call
- Integration test: RLS policy enforcement

---
