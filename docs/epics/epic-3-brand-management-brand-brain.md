# Epic 3: Brand Management & Brand Brain

**Goal:** Empower agencies to onboard client brands and capture brand-specific context for AI-powered content generation

**Business Value:** High-quality brand context → enables 8/10+ brand consistency in AI output (H1 validation)

**Dependencies:** Epic 2 (Auth & Multi-Tenant)

---

## Story 3.1: Brand Creation & Basic Information

As an **agency user**,
I want **to create a new brand with basic information**,
So that **I can start managing social media content for this client**.

**Acceptance Criteria:**

**Given** I am logged in and on /brands page
**When** I click "Add New Brand" and fill the form:
- Brand name (required, 2-100 characters)
- Industry (optional dropdown: Retail, Hospitality, Education, Healthcare, etc.)
- Website URL (optional, URL validation)
- Description (optional, max 500 chars)

**Then** brands table gets new record with:
- id (UUID)
- agency_id (current user's agency_id)
- name, industry, website, description
- is_active (default: true)
- created_at (timestamp)

**And** I am redirected to /brands/{brandId}/setup

**And** Brand appears in my brands list

**And** Brand creation completes in < 1 second

**And** RLS policy ensures brand belongs to my agency

**Prerequisites:** Story 2.3 (RLS policies)

**Technical Notes:**
- API route: POST /api/brands
- Validate agency_id matches current user
- Form built with Shadcn UI components
- Mobile responsive

---

## Story 3.2: Meta (Facebook & Instagram) Profile OAuth Connection

As an **agency user**,
I want **to connect a Facebook Page and Instagram Account to a brand**,
So that **I can publish posts directly to these platforms**.

**Acceptance Criteria:**

**Given** I created a brand and navigate to /brands/{brandId}/setup
**When** I click "Connect Facebook Page"
**Then** Meta OAuth flow initiates:
- Redirect to Facebook OAuth consent screen
- Requested permissions: pages_show_list, pages_manage_posts, instagram_basic, instagram_content_publish
- User logs in to Facebook
- User grants permissions

**And** After OAuth callback:
- Exchange code for access token
- Fetch user's Facebook Pages
- Show page selector modal

**And** When I select a Facebook Page:
- social_profiles table gets new record (platform: 'facebook')
- Meta Graph API validates token

**And** When I connect Instagram:
- Fetch Instagram Business Accounts linked to selected FB Page
- On selection, create social_profiles record (platform: 'instagram')

**And** Connected profiles shown:
- Facebook Page: {name} (connected ✓)
- Instagram Account: {username} (connected ✓)

**And** Token refresh warning shown 7 days before expiry

**And** Connection completes in < 10 seconds

**Prerequisites:** Story 3.1

**Technical Notes:**
- Use Meta Graph API v18.0
- Store tokens encrypted at rest
- Follow FR0.5: Token management, 60-day expiry
- Handle token refresh (P1: auto-refresh with long-lived token)

---

## Story 3.3: Brand Brain Editor - Reference Posts

As an **agency user**,
I want **to add 1-3 reference posts showing the brand's tone and style**,
So that **AI can generate on-brand content matching these examples**.

**Acceptance Criteria:**

**Given** I am on /brands/{brandId}/brand-brain
**When** I navigate to "Reference Posts" section
**Then** I see form to add reference posts (max 3):
- Post text (textarea, max 5000 chars)
- Platform tag (Facebook or Instagram)
- Why this post? (optional note, max 200 chars)

**And** When I add a reference post:
- brand_brain_entries table gets new record
- entry_type: 'reference_post'
- content stored as JSON

**And** I can add up to 3 reference posts

**And** I can edit or delete existing reference posts

**And** Minimum requirement validation:
- At least 1 reference post required (FR0.1)
- Warning shown if 0 posts

**Prerequisites:** Story 3.1

**Technical Notes:**
- Store as JSONB in PostgreSQL
- Use Shadcn UI Textarea + Card components
- Character counter shown
- Autosave on blur (debounced 2 seconds)

---

## Story 3.4: Brand Brain Editor - Tone of Voice (TOV)

As an **agency user**,
I want **to define the brand's tone of voice in 200-500 characters**,
So that **AI generates copy matching the brand's personality**.

**Acceptance Criteria:**

**Given** I am on /brands/{brandId}/brand-brain
**When** I navigate to "Tone of Voice" section
**Then** I see:
- Textarea (200-500 characters)
- Character counter
- Example prompts shown

**And** When I type and blur:
- Content autosaves to brand_brain_entries (entry_type: 'tone_of_voice')

**And** Minimum requirement validation (FR0.1):
- At least 100 characters required
- Warning shown if <100 chars

**And** TOV text shown in AI Copy Studio context preview

**And** Autosave completes in < 500ms

**Prerequisites:** Story 3.1

**Technical Notes:**
- Debounced autosave (2 seconds after last keystroke)
- Character count updates in real-time
- Validate min 100 chars before allowing AI generation

---

## Story 3.5: Brand Brain Editor - Key Messages

As an **agency user**,
I want **to define 2-5 key messages the brand emphasizes**,
So that **AI-generated posts highlight these important points**.

**Acceptance Criteria:**

**Given** I am on /brands/{brandId}/brand-brain
**When** I navigate to "Key Messages" section
**Then** I see:
- "Add Key Message" button
- List of existing key messages
- Each message: text input (max 200 chars) + delete button

**And** When I add/edit messages:
- Content autosaves to brand_brain_entries (entry_type: 'key_messages')
- Stored as JSON array

**And** Validation:
- Minimum 2 key messages recommended
- Maximum 5 key messages
- Each message max 200 chars

**And** Key messages shown in AI Copy Studio context preview

**Prerequisites:** Story 3.1

**Technical Notes:**
- Store as JSON array
- Dynamic form with Add/Remove buttons
- Autosave entire array on change

---

## Story 3.6: Brand Brain Editor - Visual Direction

As an **agency user**,
I want **to describe the brand's visual style in 100-300 characters**,
So that **AI image prompts (P1) match the brand's visual aesthetic**.

**Acceptance Criteria:**

**Given** I am on /brands/{brandId}/brand-brain
**When** I navigate to "Visual Direction" section
**Then** I see:
- Textarea (100-300 characters)
- Character counter
- Example descriptions shown

**And** When I type and blur:
- Content autosaves to brand_brain_entries (entry_type: 'visual_direction')

**And** Visual direction displayed in AI Image Studio (P1) context

**And** Autosave completes in < 500ms

**Prerequisites:** Story 3.1

**Technical Notes:**
- Similar implementation to Story 3.4 (TOV)
- P0: Text only; P1: Image upload integration
- Used by AI Image Studio when generating image prompts

---

## Story 3.7: Brand Brain Baseline Validation

As a **system**,
I want **to validate Brand Brain has minimum required data before enabling AI generation**,
So that **AI output quality meets 8/10 brand consistency target (FR0.1)**.

**Acceptance Criteria:**

**Given** a brand exists
**When** system checks Brand Brain completeness
**Then** "Brand Brain Complete" status calculated:

**Complete** (✅) if ALL criteria met:
- At least 1 reference post
- TOV text ≥ 100 characters
- At least 2 key messages
- Visual direction ≥ 50 characters (optional)

**Incomplete** (⚠️) if ANY missing

**And** brands table has cached field: brand_brain_status

**And** UI shows Brand Brain status:
- /brands list: Badge per brand
- Brand Brain page: Progress indicator

**And** AI Copy Studio disabled for incomplete Brand Brain:
- Generate button disabled
- Tooltip shown with requirements

**And** Validation runs on brand_brain_entries insert/update

**And** Validation completes in < 100ms

**Prerequisites:** Stories 3.3, 3.4, 3.5, 3.6

**Technical Notes:**
- PostgreSQL function: `calculate_brand_brain_status(brand_id)`
- Cache result in brands.brand_brain_status (updated via trigger)
- Frontend checks status before allowing AI generation


---
