# Epic 2: Multi-Tenant Authentication & Authorization

**Goal:** Enable agencies to securely onboard, manage teams, and isolate brand data with robust RLS-based multi-tenancy

**Business Value:** Secure, scalable multi-tenant foundation → supports 5-10 pilot agencies with complete data isolation

**Dependencies:** Epic 1 (Foundation)

---

## Story 2.1: Agency Registration & Onboarding

As an **agency owner**,
I want **to register a new agency account with email/password**,
So that **I can start using Creaitor for my team and clients**.

**Acceptance Criteria:**

**Given** I visit the registration page
**When** I submit the registration form with:
- Agency name (required, 2-100 characters)
- Email (required, RFC 5322 validation)
- Password (required, min 8 chars, 1 uppercase, 1 number, 1 special char)
- Password confirmation (must match)

**Then** Supabase Auth creates a new user account

**And** agencies table gets new record with:
- id (UUID, primary key)
- name (agency name)
- created_at (timestamp)
- subscription_status (default: 'trial')

**And** users table gets new record linked to auth.users with:
- id (UUID, references auth.users.id)
- agency_id (references agencies.id)
- role ('admin')
- full_name (from email prefix initially)

**And** I receive email verification link (Supabase Auth email)

**And** I am redirected to /onboarding/welcome

**And** Registration completes in < 2 seconds

**Prerequisites:** Story 1.2 (Supabase setup)

**Technical Notes:**
- Use Supabase Auth signUp() method
- Password strength meter with visual feedback (zxcvbn library)
- reCAPTCHA v3 integration (P1, nice to have)
- Mobile responsive with 44x44px touch targets
- WCAG 2.1 AA compliant form

---

## Story 2.2: User Login & Session Management

As a **user (agency owner or team member)**,
I want **to log in with email/password and maintain session across page refreshes**,
So that **I can access Creaitor securely without re-authenticating constantly**.

**Acceptance Criteria:**

**Given** I have a registered account
**When** I submit login form with valid credentials
**Then** Supabase Auth authenticates and creates session

**And** Session token stored in httpOnly cookie (secure, SameSite=Lax)

**And** Session persists across page refreshes (Supabase auth-helpers-nextjs)

**And** I am redirected to /dashboard

**And** Invalid credentials show error: "Email or password incorrect"

**And** Login completes in < 1 second

**And** Session expires after 7 days of inactivity (Supabase default)

**And** "Remember me" checkbox extends session to 30 days (P1 feature)

**Prerequisites:** Story 2.1

**Technical Notes:**
- Use Supabase Auth signInWithPassword() method
- Implement auth middleware in src/middleware.ts (Next.js middleware)
- Protected routes: /dashboard/*, /brands/*, /calendar/*, /settings/*
- Public routes: /login, /register, /
- Password reset flow via Supabase Auth (P1)

---

## Story 2.3: Row Level Security (RLS) Policies Setup

As a **system administrator**,
I want **PostgreSQL Row Level Security policies enforcing multi-tenant data isolation**,
So that **agencies can only access their own data, preventing data leaks**.

**Acceptance Criteria:**

**Given** Supabase database with multi-tenant schema
**When** RLS policies are applied
**Then** users table has RLS policy:
- Enable RLS on users table
- Policy: Users can only read/update their own user record
- Function: `current_user_agency_id()` returns agency_id from auth.jwt()

**And** agencies table has RLS policy:
- Users can only read their own agency record

**And** brands table has RLS policy:
- Users can only read/write brands where brand.agency_id = current_user_agency_id()

**And** social_profiles table has RLS policy:
- Users can only access social profiles belonging to their agency's brands

**And** posts table has RLS policy:
- Users can only access posts belonging to their agency's brands

**And** brand_brain_entries table has RLS policy:
- Users can only access brand brain entries for their agency's brands

**And** usage_events table has RLS policy:
- Users can only access usage events where user_id = auth.uid()

**And** SQL migration file exists: 002_rls_policies.sql

**And** RLS policies tested with different agency users (no cross-tenant data access)

**Prerequisites:** Story 1.2, Story 2.1

**Technical Notes:**
- Use Supabase built-in auth.jwt() to extract user metadata
- Create helper function: `current_user_agency_id()` in SQL
- Test RLS with multiple test users from different agencies
- Follow Architecture Pattern 2: Multi-Brand Context Isolation

---

## Story 2.4: User Invite & Team Management

As an **agency admin**,
I want **to invite team members (socialosok) to my agency**,
So that **my team can collaborate on client brands**.

**Acceptance Criteria:**

**Given** I am logged in as agency admin
**When** I navigate to /settings/team and click "Invite User"
**Then** I see invite form with:
- Email (required, RFC 5322 validation)
- Role dropdown (Admin or Editor)
- Optional: Full name

**And** When I submit the form, system:
- Sends email invite with magic link
- Creates pending invite record (invites table)
- Invite expires in 7 days

**And** When invitee clicks magic link:
- Redirected to registration/password setup page
- Email pre-filled (read-only)
- After password setup, user record created with:
  - agency_id = inviter's agency_id
  - role = selected role (Admin or Editor)
- Invite record marked as accepted

**And** Team page shows list of users:
- Full name, email, role, last active
- Admin can change user role (Admin ↔ Editor)
- Admin can deactivate user (soft delete, is_active = false)

**And** Permissions enforced:
- **Admin:** Full access
- **Editor:** Can manage brands, create/edit/publish posts, cannot invite users or delete posts

**Prerequisites:** Story 2.1, Story 2.2, Story 2.3

**Technical Notes:**
- Use Supabase Auth inviteUserByEmail() method
- Store role in users.role column (enum: 'admin', 'editor')
- Implement permission checks in API routes via middleware
- Last active tracked via usage_events table (optional P1)

---

## Story 2.5: User Profile & Settings

As a **user**,
I want **to view and update my profile (name, password)**,
So that **I can keep my account information current**.

**Acceptance Criteria:**

**Given** I am logged in
**When** I navigate to /settings/profile
**Then** I see my profile form with:
- Full name (editable text input)
- Email (display only)
- Change password section

**And** When I update full name and click Save:
- users.full_name updated
- Success toast: "Profile updated successfully"

**And** When I change password:
- Current password validated
- New password meets strength requirements
- Password updated via Supabase Auth updateUser()
- Success toast: "Password changed successfully"

**And** Profile updates complete in < 1 second

**Prerequisites:** Story 2.2

**Technical Notes:**
- Use Supabase Auth updateUser() for password change
- Email change flow requires verification (P1 feature)
- Form validation with Zod schema


---
