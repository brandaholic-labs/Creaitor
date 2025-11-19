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

---
