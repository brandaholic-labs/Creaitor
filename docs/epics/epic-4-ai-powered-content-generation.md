# Epic 4: AI-Powered Content Generation

**Goal:** Generate on-brand social media copy using LLM with Brand Brain context injection and dual-provider reliability

**Business Value:** 30-40% time savings with 70%+ usable posts requiring only minor edits

**Dependencies:** Epic 3 (Brand Brain must be complete)

---

## Story 4.1: AI Copy Studio UI & Post Brief Input

As a **socialos**,
I want **to input a brief description of the post I need**,
So that **AI can generate relevant copy for my brand**.

**Acceptance Criteria:**

**Given** I navigate to /brands/{brandId}/ai-copy
**When** I see the AI Copy Studio interface
**Then** I can input:
- Post brief (textarea, 50-500 chars, e.g., "Húsvéti akció a desszertekre")
- Platform selector (Facebook or Instagram)
- Content type dropdown (Termékbemutató, Akció, Tipp, Insight, Entertaining)

**And** Brand Brain context preview shown:
- Brand name
- TOV summary (first 100 chars)
- Key messages list

**And** "Generate" button enabled only if Brand Brain complete

**And** Form validates brief minimum 10 characters

**Prerequisites:** Story 3.7 (Brand Brain validation)

**Technical Notes:**
- Use Shadcn UI Form + Textarea components
- Brief placeholder examples shown
- Platform choice affects AI prompt (FB: longer copy, IG: shorter + emoji-friendly)

---

## Story 4.2: LLM Service Integration (Dual Provider)

As a **system**,
I want **LLM service with OpenAI and Anthropic dual providers**,
So that **we have reliability and can fallback if primary provider fails**.

**Acceptance Criteria:**

**Given** LLMService class in src/services/llm/LLMService.ts
**When** generateCopy() method called
**Then** service uses primary provider (OpenAI GPT-4) by default

**And** If OpenAI fails (timeout, rate limit, error):
- Automatically fallback to Anthropic Claude
- Log fallback event

**And** generateCopy() method accepts parameters:
- brandId (required)
- brief (required)
- platform ('facebook' | 'instagram')
- contentType (optional)

**And** Method builds prompt including:
- Brand Brain TOV
- Brand Brain key messages
- 1-3 reference post examples
- User brief
- Platform-specific instructions

**And** Returns generated text with metadata:
- text (generated copy)
- provider ('openai' | 'anthropic')
- tokensUsed
- latencyMs

**And** Generation completes in < 10 seconds

**Prerequisites:** Story 1.1, Story 3.7

**Technical Notes:**
- Follow Architecture Pattern 3: Dual Provider Fallback Strategy
- Use environment variables for API keys
- Timeout: 8 seconds primary, 8 seconds fallback
- Log AI calls with logAICall() (Winston)

---

## Story 4.3: Post Generation & Multi-Variant Output

As a **socialos**,
I want **AI to generate 2-3 copy variants for my brief**,
So that **I can choose the best one or iterate**.

**Acceptance Criteria:**

**Given** I submitted post brief in AI Copy Studio
**When** I click "Generate"
**Then** loading indicator shown ("Generating...")

**And** Backend calls LLMService.generateCopy():
- Passes brandId, brief, platform, contentType
- Generates 2 variants (P0: 2 variants, P1: user-configurable 1-5)

**And** Variants displayed in cards:
- Variant 1 text
- Variant 2 text
- Character count per variant
- Platform badge (FB/IG)

**And** Each variant card has actions:
- "Use This" button
- "Regenerate This Variant" button (P1)

**And** Generation completes in < 10 seconds (per FR3.1)

**And** Error handling:
- If both providers fail: Error message shown with retry button
- If Brand Brain incomplete: Disabled with tooltip

**Prerequisites:** Story 4.1, Story 4.2

**Technical Notes:**
- Use BullMQ for background job (optional P1, P0 can be synchronous)
- Streaming response for better UX (P1 feature)
- Store generation metadata (provider, tokens, latency) in usage_events

---

## Story 4.4: Inline Post Editor & Character Counter

As a **socialos**,
I want **to edit the AI-generated copy inline with character counter**,
So that **I can refine the post to perfection before publishing**.

**Acceptance Criteria:**

**Given** I selected a variant ("Use This")
**When** post editor opens
**Then** I see:
- Editable textarea (contenteditable or textarea)
- Real-time character counter (e.g., "234 / 2200 for Facebook")
- Platform-specific character limits:
  - Facebook: 2200 chars recommended
  - Instagram: 2200 chars recommended
- Warning if exceeds limit

**And** Editor supports:
- Bold text formatting (optional P1)
- Emoji picker (optional P1)
- Line breaks preserved

**And** "Save Draft" button saves to posts table:
- brand_id
- content (edited text)
- platform
- status ('draft')
- is_ai_generated (true)
- ai_provider (from generation metadata)

**And** Draft save completes in < 1 second

**Prerequisites:** Story 4.3

**Technical Notes:**
- Use Shadcn UI Textarea or Tiptap editor (P1)
- Character count updates on keypress (debounced for performance)
- Autosave draft every 5 seconds (P1 feature)

---

## Story 4.5: Mandatory Usability Rating (FR0.3)

As a **socialos**,
I want **to rate how usable the AI-generated post is**,
So that **the product team can measure H1 hypothesis (8/10 brand consistency)**.

**Acceptance Criteria:**

**Given** I click "Save Draft" on AI-generated post
**When** post has is_ai_generated = true AND ai_usability_rating IS NULL
**Then** modal/dialog shown: "Rate AI Output Quality"

**And** Rating options (1-10 scale):
- 1-3: "Not usable, rewrote from scratch"
- 4-6: "Major edits needed"
- 7-8: "Minor edits needed" (target)
- 9-10: "Perfect, no edits"

**And** Modal cannot be dismissed without rating (mandatory)

**And** When I select rating:
- posts.ai_usability_rating updated
- Modal closes
- Draft saved
- Success toast: "Draft saved"

**And** Database constraint enforces:
- CHECK (is_ai_generated = false OR ai_usability_rating IS NOT NULL)

**And** Rating cannot be changed after save (P0 simplicity)

**Prerequisites:** Story 4.4

**Technical Notes:**
- Follow Architecture Pattern 4: Mandatory Usability Rating Instrumentation
- Use Shadcn UI Dialog component (modal)
- DB constraint prevents saving AI post without rating
- Rating aggregation in Epic 7 (Analytics)

---

## Story 4.6: Image Upload & Management (FR4.1)

As a **socialos**,
I want **to upload an image to attach to my post**,
So that **posts have visual content for better engagement**.

**Acceptance Criteria:**

**Given** I am editing a post in AI Copy Studio
**When** I click "Upload Image" button
**Then** file picker opens (accept: image/jpeg, image/png, image/gif)

**And** When I select an image:
- Client-side validation:
  - Max file size: 10MB
  - Format: JPG, PNG, GIF only
- If validation fails: Error message shown

**And** If validation passes:
- Image uploaded to Supabase Storage (bucket: 'post-images')
- Progress indicator shown
- On success: Image preview shown in post editor
- posts.image_url = Supabase Storage public URL

**And** Upload completes in < 5 seconds for 2MB image

**And** I can remove uploaded image (delete from Storage, set image_url = NULL)

**And** Multiple images NOT supported in P0 (only 1 image per post)

**Prerequisites:** Story 4.4, Story 1.2 (Supabase Storage)

**Technical Notes:**
- Use Supabase Storage upload API
- Image stored in post-images/{brandId}/{postId}/{filename}
- Generate thumbnail (P1 feature)
- Instagram: Must be square or 4:5 ratio (validation P1)

---

## Story 4.7: Post Regeneration & Iteration

As a **socialos**,
I want **to regenerate AI copy if I'm not satisfied**,
So that **I can iterate until I get on-brand content**.

**Acceptance Criteria:**

**Given** I have generated variants in AI Copy Studio
**When** I click "Regenerate All" button
**Then** system calls LLMService.generateCopy() again with same parameters

**And** New variants replace previous variants

**And** Previous variants NOT saved (P0 simplicity, P1: save history)

**And** Regeneration completes in < 10 seconds

**And** Regeneration count tracked (usage_events) for analytics

**And** No limit on regenerations (P0, P1: could add reasonable limit like 10/day)

**Prerequisites:** Story 4.3

**Technical Notes:**
- Same LLMService call as initial generation
- Track regeneration_count in usage_events
- Each regeneration logs AI tokens consumed

---
