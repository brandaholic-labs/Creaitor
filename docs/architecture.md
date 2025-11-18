# Creaitor - Architektúra Dokumentum

**Projekt:** Creaitor - Ügynökségi Multi-Brand Social Media Platform
**Szerző:** Winston (BMAD Architect Agent)
**Dátum:** 2025-01-18
**Verzió:** 1.0

---

## Executive Summary

A Creaitor egy **SaaS B2B web alkalmazás** magyar social media ügynökségek számára, amely **Brand Brain-alapú AI támogatással** gyorsítja meg a Facebook és Instagram tartalomnaptár készítését. Az architektúra célja egy **moduláris, bővíthető rendszer** létrehozása, amely könnyen kiterjeszthető jövőbeli funkciókkal (videógenerálás, feliratozás, advanced szerkesztés).

**Kulcs architektúra döntések:**
- **Framework:** Next.js 15 (App Router) + TypeScript
- **Database:** Supabase PostgreSQL (multi-tenant RLS)
- **AI Providers:** Dual provider (OpenAI + Anthropic, Nano Banana + Seedream)
- **Deployment:** Self-hosted Hetzner VPS (Docker + Nginx)
- **Background Jobs:** BullMQ + Redis
- **Bővíthetőség:** Moduláris service layer, könnyen hozzáadható új AI funkciók

---

## Project Initialization

**Projekt létrehozása:**

```bash
# 1. Next.js projekt inicializálás
npx create-next-app@latest creaitor --typescript --tailwind --app --src-dir --eslint
cd creaitor

# 2. Supabase inicializálás
npx supabase init

# 3. Shadcn UI komponensek telepítése
npx shadcn-ui@latest init

# 4. Függőségek telepítése
npm install @supabase/supabase-js @supabase/ssr
npm install bullmq ioredis
npm install winston date-fns date-fns-tz
npm install zod
npm install @tanstack/react-query zustand

# 5. Dev függőségek
npm install -D @types/node
```

Ez az inicializálási parancs beállítja a base architektúrát a következő döntésekkel:
- **TypeScript:** Type-safety az egész stackben
- **Tailwind CSS:** Utility-first styling
- **App Router:** Modern Next.js routing (Server Components)
- **Src directory:** Tiszta projekt struktúra

---

## Decision Summary

| Kategória | Döntés | Verzió | Érintett Epics | Indoklás |
|-----------|--------|--------|----------------|----------|
| **Framework** | Next.js | 15 (App Router) | Összes | Modern React framework, Server Components, built-in API routes |
| **Language** | TypeScript | Latest stable | Összes | Type-safety, jobb developer experience, AI autocomplete |
| **Styling** | Tailwind CSS | v4 | Összes | Utility-first, gyors prototípusok, kisebb bundle |
| **UI Library** | Shadcn UI | Latest | Frontend | Headless components, teljes kontroll, Tailwind-based |
| **Database** | Supabase PostgreSQL | Cloud | Összes | Multi-tenant RLS, real-time, auth beépítve |
| **Auth** | Supabase Auth | - | Multi-Tenant, User Management | OAuth providers, session management, RLS integráció |
| **Storage** | Supabase Storage | - | Image/Video assets | S3-compatible, CDN, access control |
| **LLM Providers** | OpenAI + Anthropic Claude | GPT-4 + Claude 3.5 | AI Copy Studio | Dual provider fallback, cost optimization |
| **Image Gen** | Nano Banana + Seedream | Gemini 2.5 Flash + Seedream 4.0 | AI Image Studio | Dual provider, character consistency (Nano) + 4K (Seedream) |
| **Background Jobs** | BullMQ + Redis | Latest | Publishing, AI processing | Heavy task queue, retry logic, scheduled jobs |
| **Deployment** | Hetzner VPS | Docker | Összes | Self-hosted, cost-effective, full control |
| **Reverse Proxy** | Nginx | Latest | Deployment | SSL termination, routing, static assets |
| **CI/CD** | GitHub Actions | - | Deployment | Auto-deploy on push to main |
| **Logging** | Winston | Latest | Összes | Structured logging, file + console outputs |
| **Testing** | Jest + Playwright | Latest | Összes | Unit tests (mocked AI), E2E critical flows |

---

## Project Structure

```
creaitor/
├── src/
│   ├── app/                           # Next.js App Router
│   │   ├── (auth)/                    # Auth route group
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   └── layout.tsx
│   │   │
│   │   ├── (dashboard)/               # Protected dashboard routes
│   │   │   ├── layout.tsx             # Dashboard layout (sidebar, nav)
│   │   │   ├── page.tsx               # Dashboard home
│   │   │   │
│   │   │   ├── brands/                # Brand management
│   │   │   │   ├── page.tsx           # Brand list
│   │   │   │   ├── [brandId]/
│   │   │   │   │   ├── page.tsx       # Brand detail
│   │   │   │   │   ├── edit/
│   │   │   │   │   └── brain/         # Brand Brain editor
│   │   │   │   └── new/
│   │   │   │
│   │   │   ├── calendar/              # Content Calendar
│   │   │   │   ├── page.tsx
│   │   │   │   └── [brandId]/
│   │   │   │
│   │   │   ├── studio/                # AI Studios (moduláris)
│   │   │   │   ├── copy/              # AI Copy Studio
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── image/             # AI Image Studio (P1)
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── video/             # 🆕 AI Video Studio (későbbi)
│   │   │   │   │   └── page.tsx
│   │   │   │   └── subtitle/          # 🆕 Subtitle Studio (későbbi)
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── posts/                 # Post management
│   │   │   │   ├── [postId]/
│   │   │   │   │   ├── page.tsx       # Post editor
│   │   │   │   │   └── edit/
│   │   │   │   └── new/
│   │   │   │
│   │   │   └── settings/              # Agency/User settings
│   │   │       ├── agency/
│   │   │       ├── team/
│   │   │       └── profile/
│   │   │
│   │   ├── api/                       # API Routes
│   │   │   ├── auth/
│   │   │   │   └── callback/route.ts  # Supabase auth callback
│   │   │   │
│   │   │   ├── ai/                    # AI service endpoints
│   │   │   │   ├── copy/
│   │   │   │   │   └── route.ts       # POST /api/ai/copy (LLM)
│   │   │   │   ├── image/
│   │   │   │   │   └── route.ts       # POST /api/ai/image
│   │   │   │   ├── video/             # 🆕 Későbbi
│   │   │   │   │   └── route.ts
│   │   │   │   └── subtitle/          # 🆕 Későbbi
│   │   │   │       └── route.ts
│   │   │   │
│   │   │   ├── brands/
│   │   │   │   ├── route.ts           # GET/POST /api/brands
│   │   │   │   └── [brandId]/
│   │   │   │       ├── route.ts       # GET/PATCH/DELETE
│   │   │   │       └── brain/route.ts # Brand Brain CRUD
│   │   │   │
│   │   │   ├── posts/
│   │   │   │   ├── route.ts           # GET/POST /api/posts
│   │   │   │   └── [postId]/
│   │   │   │       ├── route.ts       # GET/PATCH/DELETE
│   │   │   │       └── publish/route.ts
│   │   │   │
│   │   │   ├── calendar/
│   │   │   │   └── [brandId]/route.ts # GET calendar posts
│   │   │   │
│   │   │   ├── meta/                  # Meta Graph API integration
│   │   │   │   ├── oauth/route.ts     # OAuth callback
│   │   │   │   ├── publish/route.ts   # Publish to Meta
│   │   │   │   └── webhook/route.ts   # Meta webhooks
│   │   │   │
│   │   │   └── jobs/                  # Background job triggers
│   │   │       └── status/[jobId]/route.ts
│   │   │
│   │   ├── globals.css
│   │   ├── layout.tsx                 # Root layout
│   │   └── page.tsx                   # Landing page
│   │
│   ├── components/
│   │   ├── ui/                        # Shadcn UI components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── calendar.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   └── ...
│   │   │
│   │   ├── layout/                    # Layout components
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   │
│   │   ├── brand/                     # Brand-related components
│   │   │   ├── BrandSelector.tsx
│   │   │   ├── BrandBrainEditor.tsx
│   │   │   ├── BrandCard.tsx
│   │   │   └── SocialProfileConnect.tsx
│   │   │
│   │   ├── calendar/                  # Calendar components
│   │   │   ├── CalendarGrid.tsx
│   │   │   ├── CalendarWeekView.tsx
│   │   │   ├── PostSlot.tsx
│   │   │   └── PostPreviewModal.tsx
│   │   │
│   │   ├── studio/                    # AI Studio components
│   │   │   ├── copy/
│   │   │   │   ├── CopyStudio.tsx
│   │   │   │   ├── BriefInput.tsx
│   │   │   │   ├── GeneratedText.tsx
│   │   │   │   └── UsabilityRating.tsx
│   │   │   │
│   │   │   ├── image/
│   │   │   │   ├── ImageStudio.tsx
│   │   │   │   ├── ImagePrompt.tsx
│   │   │   │   ├── ImageVariants.tsx
│   │   │   │   └── ImageUpload.tsx
│   │   │   │
│   │   │   ├── video/                 # 🆕 Későbbi
│   │   │   │   ├── VideoStudio.tsx
│   │   │   │   ├── VideoEditor.tsx
│   │   │   │   └── VideoTimeline.tsx
│   │   │   │
│   │   │   └── subtitle/              # 🆕 Későbbi
│   │   │       └── SubtitleEditor.tsx
│   │   │
│   │   ├── post/                      # Post components
│   │   │   ├── PostEditor.tsx
│   │   │   ├── PostCard.tsx
│   │   │   ├── PostStatusBadge.tsx
│   │   │   └── ApprovalButton.tsx
│   │   │
│   │   └── common/                    # Shared components
│   │       ├── LoadingSpinner.tsx
│   │       ├── ErrorBoundary.tsx
│   │       ├── EmptyState.tsx
│   │       └── ConfirmDialog.tsx
│   │
│   ├── lib/
│   │   ├── supabase/                  # Supabase clients
│   │   │   ├── client.ts              # Browser client
│   │   │   ├── server.ts              # Server-side client
│   │   │   └── middleware.ts          # Auth middleware
│   │   │
│   │   ├── services/                  # ✨ Service Layer (moduláris!)
│   │   │   ├── ai/
│   │   │   │   ├── base.service.ts    # Base AI service class
│   │   │   │   ├── llm.service.ts     # OpenAI + Anthropic wrapper
│   │   │   │   ├── image.service.ts   # Nano Banana + Seedream wrapper
│   │   │   │   ├── video.service.ts   # 🆕 Későbbi (RunwayML, Pika, stb.)
│   │   │   │   └── subtitle.service.ts # 🆕 Későbbi (Whisper API)
│   │   │   │
│   │   │   ├── meta/
│   │   │   │   ├── graph-api.service.ts  # Meta Graph API wrapper
│   │   │   │   ├── oauth.service.ts      # Meta OAuth flow
│   │   │   │   └── webhook.service.ts    # Meta webhook handler
│   │   │   │
│   │   │   ├── storage/
│   │   │   │   └── media.service.ts   # Supabase Storage wrapper
│   │   │   │
│   │   │   ├── brand/
│   │   │   │   ├── brand.service.ts
│   │   │   │   └── brain.service.ts   # Brand Brain context builder
│   │   │   │
│   │   │   ├── post/
│   │   │   │   ├── post.service.ts
│   │   │   │   └── approval.service.ts
│   │   │   │
│   │   │   └── queue/
│   │   │       └── jobs.service.ts    # BullMQ job dispatcher
│   │   │
│   │   ├── utils/                     # Utility functions
│   │   │   ├── date.ts                # Date/timezone helpers
│   │   │   ├── errors.ts              # Error handling utilities
│   │   │   ├── validation.ts          # Zod schemas
│   │   │   └── api.ts                 # API response helpers
│   │   │
│   │   ├── hooks/                     # React hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useBrand.ts
│   │   │   ├── useCalendar.ts
│   │   │   ├── useAI.ts               # AI generation hooks
│   │   │   └── usePost.ts
│   │   │
│   │   └── logger/                    # Logging
│   │       └── index.ts               # Winston config
│   │
│   ├── types/
│   │   ├── database.types.ts          # Supabase generated types
│   │   ├── api.types.ts               # API request/response types
│   │   ├── ai.types.ts                # AI service types
│   │   ├── brand.types.ts
│   │   ├── post.types.ts
│   │   ├── meta.types.ts
│   │   └── index.ts                   # Exported types
│   │
│   ├── config/
│   │   ├── ai-providers.ts            # AI API keys, configs
│   │   ├── meta.ts                    # Meta API config
│   │   ├── constants.ts               # App constants
│   │   └── env.ts                     # Env variable validation
│   │
│   └── middleware.ts                  # Next.js middleware (auth)
│
├── workers/                           # Background job workers (separate process)
│   ├── index.ts                       # Worker entry point
│   ├── queues/
│   │   ├── ai-copy.queue.ts
│   │   ├── ai-image.queue.ts
│   │   ├── ai-video.queue.ts          # 🆕 Későbbi
│   │   ├── ai-subtitle.queue.ts       # 🆕 Későbbi
│   │   ├── publish.queue.ts
│   │   └── meta-webhook.queue.ts
│   │
│   └── jobs/
│       ├── ai-copy.job.ts
│       ├── ai-image.job.ts
│       ├── ai-video.job.ts            # 🆕 Későbbi
│       ├── ai-subtitle.job.ts         # 🆕 Későbbi
│       ├── publish.job.ts
│       └── scheduled-posts.job.ts
│
├── supabase/
│   ├── migrations/                    # DB migrations
│   │   ├── 20250101000000_initial_schema.sql
│   │   ├── 20250102000000_add_brand_brain.sql
│   │   ├── 20250103000000_add_posts.sql
│   │   └── 20250201000000_add_video_support.sql  # 🆕 Későbbi
│   │
│   ├── functions/                     # Edge Functions (opcionális)
│   └── seed.sql                       # Test data
│
├── docker/                            # Docker configs (Hetzner deployment)
│   ├── Dockerfile                     # Next.js app
│   ├── Dockerfile.worker              # Background worker
│   ├── docker-compose.yml             # Local dev
│   └── docker-compose.prod.yml        # Production
│
├── scripts/
│   ├── setup-dev.sh                   # Dev environment setup
│   ├── deploy.sh                      # Deployment script
│   └── db-migrate.sh                  # DB migration runner
│
├── .github/
│   └── workflows/
│       ├── ci.yml                     # CI pipeline (tests)
│       └── deploy.yml                 # CD pipeline (deploy to Hetzner)
│
├── tests/
│   ├── unit/
│   │   ├── services/
│   │   │   ├── ai/
│   │   │   │   ├── llm.service.test.ts
│   │   │   │   └── image.service.test.ts
│   │   │   └── brand/
│   │   │       └── brain.service.test.ts
│   │   └── utils/
│   │       └── date.test.ts
│   │
│   ├── integration/
│   │   └── api/
│   │       ├── brands.test.ts
│   │       └── posts.test.ts
│   │
│   └── e2e/                           # Playwright tests (P1)
│
└── ...config files
```

---

## Epic to Architecture Mapping

| Epic | Architektúra Komponensek | Fő Döntések |
|------|--------------------------|-------------|
| **Multi-Tenant Alaprendszer** | - Supabase Auth (user management)<br>- Supabase RLS (tenant isolation)<br>- `agencies`, `users`, `brands` tables<br>- API route auth middleware | Row Level Security garantálja, hogy user csak saját agency adatait látja |
| **Brand Brain v1** | - `brand_brain_entries` table<br>- `BrandBrainService` (context builder)<br>- Brand Brain editor UI (React form) | Brand Brain context minden AI híváshoz injektálva |
| **AI Copy Studio** | - `LLMService` (OpenAI + Anthropic dual provider)<br>- `POST /api/ai/copy` endpoint<br>- `ai-copy.queue.ts` (BullMQ job)<br>- CopyStudio React komponens | Dual provider fallback: OpenAI fail → auto Anthropic |
| **AI Image Studio** | - `ImageAIService` (Nano Banana + Seedream)<br>- `POST /api/ai/image` endpoint<br>- `ai-image.queue.ts`<br>- ImageStudio React komponens | Intelligent routing: character consistency → Nano Banana, 4K → Seedream |
| **Content Calendar** | - `CalendarGrid.tsx`, `PostSlot.tsx` komponensek<br>- `GET /api/calendar/:brandId` endpoint<br>- Date/timezone utils (Europe/Budapest user-facing) | Timezone-aware: user látja Europe/Budapest, DB UTC tárol |
| **Approval Workflow** | - `post_status` enum (DRAFT, REVIEW, APPROVED, SCHEDULED, PUBLISHED)<br>- `ApprovalButton.tsx` komponens<br>- API routes: `POST /api/posts/:id/approve` | State machine: Draft → Review → Approved → Scheduled → Published |
| **Publishing & Scheduling** | - `MetaGraphAPIService` (FB/IG publish)<br>- `publish.queue.ts` (BullMQ scheduled job)<br>- `POST /api/meta/publish` endpoint<br>- Retry logic (3 attempts, exponential backoff) | Meta API rate limit kezelés, scheduled posts queue-ban |
| **Instrumentation** | - `ai_usability_rating` column (mandatory, NOT NULL constraint)<br>- UsabilityRating React modal<br>- Winston structured logging<br>- Backend analytics aggregation | Rating kötelező AI-generált poszt mentése előtt (DB constraint + frontend validation) |

---

## Technology Stack Details

### Core Technologies

#### **Next.js 15 (App Router)**
- **Verzió:** 15.x (latest stable)
- **Miért választottuk:** Modern React framework, Server Components, built-in API routes, file-based routing
- **Konfigurált opciók:**
  - TypeScript: Enabled
  - App Router: Enabled (not Pages Router)
  - Src directory: Enabled (`src/app/`)
  - Tailwind CSS: Enabled
  - ESLint: Enabled

#### **TypeScript**
- **Verzió:** Latest stable
- **tsconfig.json beállítások:**
  - Strict mode: Enabled
  - Path aliases: `@/*` → `src/*`
  - Target: ES2022
  - Module: ESNext

#### **Supabase (Database + Auth + Storage)**
- **Database:** PostgreSQL 15
- **Auth:** Supabase Auth (email/password + OAuth providers)
- **Storage:** S3-compatible object storage
- **Real-time:** Supabase Realtime (opcionális, későbbi collaborative editing-hez)
- **Row Level Security (RLS):** Multi-tenant data isolation
- **Connection:**
  - Client-side: `@supabase/supabase-js` + `@supabase/ssr`
  - Server-side: Server Actions, Route Handlers

#### **AI Providers**

**LLM (Text Generation):**
1. **OpenAI GPT-4** (Primary)
   - Model: `gpt-4-turbo-preview` vagy `gpt-4o`
   - API: OpenAI REST API
   - Cost: ~$0.01 per 1K tokens
   - Use case: Primary text generation

2. **Anthropic Claude 3.5 Sonnet** (Fallback)
   - Model: `claude-3-5-sonnet-20250219`
   - API: Anthropic REST API
   - Cost: ~$0.003 per 1K tokens (olcsóbb)
   - Use case: Fallback ha OpenAI fail, vagy cost optimization

**Image Generation:**
1. **Nano Banana (Google Gemini 2.5 Flash Image)** (Primary for character consistency)
   - API: Google Gemini API (`gemini-2.5-flash-image`)
   - Cost: $0.039 per image
   - Use case: Character consistency (brand mascot), multi-image blending
   - Erősségek: Nuanced prompts, Google world knowledge

2. **Seedream 4.0 (ByteDance)** (Primary for 4K, cost optimization)
   - API: BytePlus API vagy Kie.ai
   - Cost: $0.0175 per image (Kie.ai) - legolcsóbb
   - Use case: 4K images, fast generation (1.8s for 2K)
   - Erősségek: Multi-reference, story-driven images

#### **Background Jobs**
- **BullMQ:** Job queue library (Node.js)
- **Redis:** In-memory job store (ioredis client)
- **Bull Board:** Web UI for queue monitoring
- **Job types:**
  - `ai-copy`: LLM text generation (medium priority)
  - `ai-image`: Image generation (low priority, can take 10-30s)
  - `ai-video`: Video generation (🆕 későbbi, very low priority, 5-10 min)
  - `publish`: Meta API scheduled posts (high priority, time-sensitive)

### Integration Points

#### **Meta Graph API**
- **Endpoint:** `https://graph.facebook.com/v18.0`
- **OAuth:** Meta OAuth 2.0 flow
- **Permissions:** `pages_manage_posts`, `instagram_content_publish`
- **Publishing:**
  - Facebook Page Post: `POST /{page_id}/feed`
  - Instagram Post: `POST /{ig_user_id}/media` → `POST /{ig_user_id}/media_publish`
- **Webhooks:** `POST /api/meta/webhook` (Meta sends events)
- **Rate Limits:** 200 calls per hour per user (handled by queue)

#### **Supabase Storage**
- **Buckets:**
  - `brand-assets`: Logók, brand colors, reference images
  - `post-images`: AI-generált és user-feltöltött képek
  - `post-videos`: 🆕 Későbbi videók
- **Access Control:** RLS policies (user csak saját agency bucket-jéhez fér)
- **CDN:** Supabase CDN (automatikus)

---

## Novel Pattern Designs

### Pattern 1: Brand Brain Context Injection

**Purpose:** Ensure AI-generated content is always brand-consistent.

**Problem:**
Generic AI outputs (like ChatGPT) are not "on-brand". The Creaitor's value proposition is that AI generates content matching the brand's tone, voice, and key messages.

**Solution:**
Before every AI call, dynamically build a "Brand Brain Context" from the brand's stored data and inject it into the prompt.

**Implementation:**

```typescript
// lib/services/brand/brain.service.ts
export class BrandBrainService {
  /**
   * Build AI context from Brand Brain
   */
  async buildContext(brandId: string): Promise<BrandContext> {
    const brain = await supabase
      .from('brand_brain_entries')
      .select('*')
      .eq('brand_id', brandId)
      .single();

    return {
      toneOfVoice: brain.tone_of_voice,
      keyMessages: brain.key_messages,
      examplePosts: brain.example_posts, // 1-3 példaposzt
      visualDirection: brain.visual_direction,
      doNotMentions: brain.taboos || [],
    };
  }

  /**
   * Inject context into LLM prompt
   */
  buildPrompt(userBrief: string, context: BrandContext, platform: 'FB' | 'IG'): string {
    return `
Márka kontextus:
- Tone of Voice: ${context.toneOfVoice}
- Kulcs üzenetek: ${context.keyMessages.join(', ')}
- Példa posztok:
${context.examplePosts.map(p => `  "${p}"`).join('\n')}

Platform: ${platform}
User brief: ${userBrief}

Generálj egy ${platform} posztot, amely:
1. Követi a márka hangját
2. Beépíti a kulcs üzeneteket (ha releváns)
3. Hasonló stílusú, mint a példa posztok
4. Magyar nyelvű
    `.trim();
  }
}
```

**Usage in LLMService:**

```typescript
// lib/services/ai/llm.service.ts
export class LLMService {
  async generateCopy(
    userBrief: string,
    brandContext: BrandContext,
    platform: 'FB' | 'IG'
  ): Promise<GeneratedCopy> {
    const prompt = this.brainService.buildPrompt(userBrief, brandContext, platform);

    // Dual provider fallback (Pattern 3)
    try {
      return await this.openai.generate(prompt);
    } catch (error) {
      logger.warn('OpenAI failed, fallback to Anthropic', { error });
      return await this.anthropic.generate(prompt);
    }
  }
}
```

**Consistency Rules:**
- ✅ **NEVER call AI without Brand Brain context** (except explicit generic mode)
- ✅ Brand Brain context always fresh (no caching - user can edit it)
- ✅ If Brand Brain empty → warn user, but allow generation (lower quality)

**Affects Epics:** AI Copy Studio, AI Image Studio, AI Video Studio (későbbi)

---

### Pattern 2: Multi-Brand Context Isolation

**Purpose:** Prevent brand context mixing when a user manages multiple brands.

**Problem:**
A socialos manages 5-10 brands simultaneously. If the system mixes Brand Brains, disaster occurs (e.g., Fitness Studio post in bakery tone).

**Solution:**
**Active Brand Context Pattern** - The session always has an "active brand", and all operations explicitly bind to it.

**Implementation:**

```typescript
// Frontend state (Zustand)
interface BrandContextState {
  activeBrandId: string | null;
  brands: Brand[];
  setActiveBrand: (brandId: string) => void;
}

// Hook with safeguard
export function useBrand() {
  const { activeBrandId } = useBrandContext();

  if (!activeBrandId) {
    throw new Error('No active brand selected');
  }

  return { brandId: activeBrandId };
}

// API route protection
export async function POST(request: Request) {
  const { brandId, userBrief } = await request.json();

  // Verify user has access to this brand
  await verifyBrandAccess(userId, brandId);

  // Build Brand Brain context for THIS brand
  const brandContext = await brainService.buildContext(brandId);

  const result = await llmService.generateCopy(userBrief, brandContext, 'FB');

  return Response.json({ success: true, data: result });
}
```

**Consistency Rules:**
- ✅ **Every AI call includes explicit brandId** (no implicit/default brand)
- ✅ Frontend UI always displays active brand (e.g., highlighted in sidebar)
- ✅ Brand switch triggers state reset (draft editor content saved before switch)
- ✅ Multi-tenant RLS policy in Supabase guarantees isolation

**Affects Epics:** Összes (kritikus minden epic-hez)

---

### Pattern 3: Dual Provider Fallback Strategy

**Purpose:** Ensure reliability and cost optimization for AI services.

**Problem:**
Single AI provider outage (OpenAI down) or expensive/slow response → user cannot generate content.

**Solution:**
**Dual Provider with Intelligent Fallback** - Every AI service has 2 providers, with smart routing logic.

**Implementation:**

```typescript
// lib/services/ai/llm.service.ts
export class LLMService {
  private providers = {
    openai: new OpenAIClient(),
    anthropic: new AnthropicClient(),
  };

  async generateCopy(prompt: string, options?: GenerateOptions): Promise<GeneratedCopy> {
    const primaryProvider = options?.preferredProvider || 'openai';
    const fallbackProvider = primaryProvider === 'openai' ? 'anthropic' : 'openai';

    try {
      logger.info('Generating copy', { provider: primaryProvider });
      return await this.providers[primaryProvider].generate(prompt);

    } catch (error) {
      logger.warn('Primary failed, using fallback', {
        primary: primaryProvider,
        fallback: fallbackProvider,
        error
      });

      return await this.providers[fallbackProvider].generate(prompt);
    }
  }
}

// Image generation - intelligent routing
export class ImageAIService {
  private providers = {
    nanoBanana: new NanoBananaClient(),  // Google Gemini
    seedream: new SeedreamClient(),      // ByteDance
  };

  async generateImage(prompt: string, options?: ImageOptions): Promise<GeneratedImage> {
    const primaryProvider = this.selectProvider(options);
    const fallbackProvider = primaryProvider === 'nanoBanana' ? 'seedream' : 'nanoBanana';

    try {
      return await this.providers[primaryProvider].generate(prompt, options);
    } catch (error) {
      logger.warn('Image provider failed, fallback', { error });
      return await this.providers[fallbackProvider].generate(prompt, options);
    }
  }

  private selectProvider(options?: ImageOptions): 'nanoBanana' | 'seedream' {
    // Character consistency → Nano Banana
    if (options?.characterConsistency) return 'nanoBanana';

    // 4K resolution → Seedream
    if (options?.resolution === '4K') return 'seedream';

    // Default: Seedream (cheaper: $0.0175 vs $0.039)
    return 'seedream';
  }
}
```

**Consistency Rules:**
- ✅ **Every AI service supports 2 providers** (primary + fallback)
- ✅ Fallback is automatic (user doesn't see the switch)
- ✅ Logging: which provider used, why (for monitoring & cost tracking)
- ✅ Config-driven provider preference (env var)

**Affects Epics:** AI Copy Studio, AI Image Studio, AI Video Studio (későbbi)

---

### Pattern 4: Mandatory Usability Rating Instrumentation

**Purpose:** Validate MVP hypothesis H1 - "Brand Brain v1 is enough for 8/10 brand consistency?"

**Problem:**
Without measurement, we cannot validate if AI-generated content is "good enough". The MVP's success depends on knowing the usability rating.

**Solution:**
**Mandatory Rating Before Publish Pattern** - User cannot save/publish a post until they rate the AI-generated content's usability.

**Implementation:**

```typescript
// types/post.types.ts
export type UsabilityRating =
  | 'GOOD_MINOR_EDITS'      // "Rendben, kisebb módosítással"
  | 'MAJOR_REWORK'          // "Nagy átdolgozás kellett"
  | 'NOT_USABLE';           // "Nem használható, újat írtam"

export interface Post {
  id: string;
  brandId: string;
  generatedText?: string;
  finalText: string;
  aiUsabilityRating?: UsabilityRating;  // Mandatory if AI-generated
  isAIGenerated: boolean;
}

// Frontend validation
const handleSave = async () => {
  if (post.isAIGenerated && !post.aiUsabilityRating) {
    toast.error('Kérlek jelöld, mennyire volt használható az AI szöveg!');
    setShowRatingModal(true);
    return; // Block save
  }

  await savePost(post);
};

// Database constraint
ALTER TABLE posts
  ADD CONSTRAINT check_ai_rating
  CHECK (
    (is_ai_generated = false) OR
    (is_ai_generated = true AND ai_usability_rating IS NOT NULL)
  );
```

**Consistency Rules:**
- ✅ **AI-generated post NEVER saves without rating** (DB constraint + frontend validation)
- ✅ Rating modal is blocking (cannot dismiss with "X")
- ✅ Backend analytics: aggregate by brand, by AI provider
- ✅ Manually written post (not AI) → rating not required

**Affects Epics:** AI Copy Studio, Instrumentation

---

### Pattern 5: Timezone-Aware Scheduling Pipeline

**Purpose:** Consistent date/time handling across user input, database, and Meta API.

**Problem:**
User schedules in Europe/Budapest ("Tomorrow 10:00"), but Meta API expects UTC, Supabase stores in UTC.

**Solution:**
**Timezone Normalization Pipeline** - User-facing: Europe/Budapest, Internal: UTC, Meta API: Unix timestamp UTC.

**Implementation:**

```typescript
// lib/utils/date.ts
import { formatInTimeZone, toZonedTime, fromZonedTime } from 'date-fns-tz';

const APP_TIMEZONE = 'Europe/Budapest';

/**
 * Convert user-selected time (Europe/Budapest) to UTC for DB
 */
export function userTimeToUTC(userTime: Date): Date {
  return fromZonedTime(userTime, APP_TIMEZONE);
}

/**
 * Convert DB time (UTC) to Europe/Budapest for display
 */
export function utcToUserTime(utcTime: Date): Date {
  return toZonedTime(utcTime, APP_TIMEZONE);
}

/**
 * Format for user display
 */
export function formatUserTime(date: Date): string {
  return formatInTimeZone(date, APP_TIMEZONE, 'yyyy. MMMM dd. HH:mm', { locale: hu });
}

/**
 * Convert to Meta API Unix timestamp (UTC)
 */
export function toMetaTimestamp(utcTime: Date): number {
  return Math.floor(utcTime.getTime() / 1000);
}

// API route example
export async function POST(request: Request) {
  const { scheduledTime } = await request.json(); // User input (Europe/Budapest)

  const userDate = parseISO(scheduledTime); // "2025-01-20T10:00:00"
  const utcDate = userTimeToUTC(userDate);  // Convert to UTC

  // Save to DB
  await db.posts.update({
    id: postId,
    scheduled_at: utcDate.toISOString(), // "2025-01-20T09:00:00Z" (UTC -1h télen)
  });

  // Enqueue job
  await publishQueue.add('schedule-post', {
    postId,
    scheduledAt: utcDate.toISOString(),
    metaTimestamp: toMetaTimestamp(utcDate),
  });

  return Response.json({ success: true });
}
```

**Consistency Rules:**
- ✅ **User-facing UI always Europe/Budapest** (datepicker, calendar)
- ✅ **DB always UTC** (Supabase timestamptz)
- ✅ **Meta API always Unix timestamp UTC**
- ✅ Conversion always explicit (no implicit timezone assumptions)
- ✅ Tests: handle daylight saving time transitions (+1h / +2h UTC offset)

**Affects Epics:** Content Calendar, Publishing & Scheduling

---

## Implementation Patterns

### Naming Conventions

#### **Database (Supabase PostgreSQL)**

```sql
-- Table names: plural, snake_case
CREATE TABLE agencies (...);
CREATE TABLE brands (...);
CREATE TABLE posts (...);

-- Column names: snake_case
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id UUID REFERENCES brands(id),  -- Foreign key: {singular}_id
  created_at TIMESTAMPTZ DEFAULT NOW(),
  is_ai_generated BOOLEAN DEFAULT FALSE
);

-- Indexes: idx_{table}_{column(s)}
CREATE INDEX idx_posts_brand_id ON posts(brand_id);

-- Enums: UPPER_SNAKE_CASE
CREATE TYPE post_status AS ENUM ('DRAFT', 'REVIEW', 'APPROVED', 'SCHEDULED', 'PUBLISHED');
```

**Rules:**
- ✅ Table: **plural, snake_case**
- ✅ Column: **snake_case**
- ✅ Foreign key: **{singular}_id**
- ✅ Enum: **UPPER_SNAKE_CASE**
- ✅ Boolean: **is_** prefix

---

#### **TypeScript/JavaScript**

```typescript
// Interfaces/Types: PascalCase
interface BrandBrain { ... }

// Variables/functions: camelCase
const activeBrandId = '...';
function buildContext() { ... }

// Constants: UPPER_SNAKE_CASE
const APP_TIMEZONE = 'Europe/Budapest';

// Classes: PascalCase
class LLMService { ... }

// Files: kebab-case
llm.service.ts
brand-brain.service.ts
```

---

#### **API Routes**

```
GET    /api/brands              # List
POST   /api/brands              # Create
GET    /api/brands/:brandId     # Get
PATCH  /api/brands/:brandId     # Update

POST   /api/ai/copy             # Generate copy
POST   /api/ai/image            # Generate image

POST   /api/posts/:postId/publish
```

**Rules:**
- ✅ URL: **lowercase, kebab-case**
- ✅ Resource: **plural**
- ✅ ID param: **:resourceId**

---

### Code Organization

#### **Service Files**

```
lib/services/{domain}/{service-name}.service.ts

Examples:
lib/services/ai/llm.service.ts
lib/services/brand/brain.service.ts
```

**Service Pattern:**

```typescript
export class LLMService {
  private openaiClient: OpenAIClient;

  constructor() {
    this.openaiClient = new OpenAIClient(process.env.OPENAI_API_KEY);
  }

  async generateCopy(...): Promise<GeneratedCopy> {
    // Implementation
  }
}

// Singleton export
export const llmService = new LLMService();
```

---

#### **API Route Files**

```
src/app/api/{resource}/route.ts
src/app/api/{resource}/[id]/route.ts
src/app/api/{resource}/[id]/{action}/route.ts
```

**Route Handler Pattern:**

```typescript
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return apiError('UNAUTHORIZED', 'Not authenticated', 401);
    }

    const data = await service.getData(user.id);
    return apiSuccess(data);

  } catch (error) {
    logger.error('API error', { error });
    return apiError('INTERNAL_ERROR', 'Failed', 500);
  }
}
```

---

### Error Handling

**Standard Response Format:**

```typescript
// Success
{
  success: true,
  data: { ... }
}

// Error
{
  success: false,
  error: {
    code: "ERROR_CODE",
    message: "User-facing magyar message",
    details?: any  // Dev only
  }
}
```

**Helper Functions:**

```typescript
// lib/utils/api.ts
export function apiSuccess<T>(data: T) {
  return NextResponse.json({ success: true, data });
}

export function apiError(code: string, message: string, status: number) {
  return NextResponse.json({ success: false, error: { code, message } }, { status });
}
```

**Centralized Error Codes:**

```typescript
// lib/errors.ts
export const ErrorCodes = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  BRAND_NOT_FOUND: 'BRAND_NOT_FOUND',
  AI_TIMEOUT: 'AI_TIMEOUT',
  META_API_ERROR: 'META_API_ERROR',
  INVALID_INPUT: 'INVALID_INPUT',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
} as const;
```

---

### Logging Strategy

**Structured Logging (Winston):**

```typescript
logger.info('AI copy generated', {
  brandId: 'xyz',
  llmProvider: 'openai',
  duration: 3200,
  success: true
});

logger.error('Meta publish failed', {
  postId: 'abc',
  error: 'Rate limit exceeded',
  retryCount: 2
});
```

**Log Levels:**
- **ERROR:** Critical failures (Meta API fail, AI timeout)
- **WARN:** Suspicious events (slow AI response)
- **INFO:** Important events (post published, user login)
- **DEBUG:** Verbose (dev only)

**Log Destinations:**
- **Dev:** Console
- **Prod:** File (`/var/log/creaitor/app.log`) + later Sentry/Logtail

---

### Testing Strategy

| Test Type | What to Test | Tool | When to Run |
|-----------|--------------|------|-------------|
| **Unit** | Utils, service logic (AI mocked) | Jest | CI (GitHub Actions) |
| **Integration** | API routes (DB mocked or test DB) | Jest + Supertest | CI |
| **E2E** | Critical flows (login, post generation) | Playwright | Manually (pre-release) |

**AI Mock Pattern:**

```typescript
jest.mock('@/lib/services/ai/llm.service', () => ({
  generateCopy: jest.fn(() => Promise.resolve({
    text: "Mock AI response",
    provider: "openai"
  }))
}));
```

---

## Consistency Rules

### Cross-Cutting Patterns

1. **Error Handling:**
   - All API routes use `{success, data/error}` format
   - Error codes centralized in `lib/errors.ts`
   - Error messages in Hungarian

2. **Logging:**
   - Structured logging with Winston
   - Log important events: AI calls, Meta API, user actions
   - Include context: brandId, userId, duration

3. **Date/Time:**
   - User-facing: Europe/Budapest
   - DB storage: UTC (timestamptz)
   - Meta API: Unix timestamp UTC
   - Library: date-fns + date-fns-tz

4. **Authentication:**
   - Supabase Auth for session management
   - Every API route checks auth first
   - RLS policies enforce multi-tenant isolation

5. **API Response:**
   - Standard format: `{success, data/error}`
   - Use helper functions: `apiSuccess()`, `apiError()`

---

## Data Architecture

### Core Entities (MVP)

```sql
-- Agencies (tenant)
CREATE TABLE agencies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  agency_id UUID REFERENCES agencies(id),
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'editor', -- 'admin' | 'editor'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Brands
CREATE TABLE brands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agency_id UUID REFERENCES agencies(id),
  name TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Brand Brain
CREATE TABLE brand_brain_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
  tone_of_voice TEXT,
  key_messages TEXT[], -- Array of strings
  example_posts TEXT[], -- 1-3 example posts
  visual_direction TEXT,
  taboos TEXT[], -- Words/phrases to avoid
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(brand_id) -- One Brain per Brand
);

-- Social Profiles
CREATE TABLE social_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
  platform TEXT NOT NULL, -- 'facebook' | 'instagram'
  platform_user_id TEXT NOT NULL, -- FB Page ID or IG Account ID
  access_token TEXT, -- Encrypted OAuth token
  token_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Posts
CREATE TYPE post_status AS ENUM ('DRAFT', 'REVIEW', 'APPROVED', 'SCHEDULED', 'PUBLISHED', 'FAILED');
CREATE TYPE usability_rating AS ENUM ('GOOD_MINOR_EDITS', 'MAJOR_REWORK', 'NOT_USABLE');

CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id UUID REFERENCES brands(id),
  created_by UUID REFERENCES users(id),

  -- Content
  brief TEXT, -- User's brief/idea
  generated_text TEXT, -- AI-generated text
  final_text TEXT NOT NULL, -- Final edited text
  image_url TEXT,

  -- AI metadata
  is_ai_generated BOOLEAN DEFAULT FALSE,
  ai_usability_rating usability_rating, -- Mandatory if is_ai_generated = true
  ai_provider TEXT, -- 'openai' | 'anthropic'

  -- Publishing
  platform TEXT NOT NULL, -- 'facebook' | 'instagram'
  status post_status DEFAULT 'DRAFT',
  scheduled_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  meta_post_id TEXT, -- Meta's post ID after publish

  -- Error handling
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Constraint: AI posts must have rating
  CONSTRAINT check_ai_rating CHECK (
    (is_ai_generated = false) OR
    (is_ai_generated = true AND ai_usability_rating IS NOT NULL)
  )
);

-- Indexes
CREATE INDEX idx_posts_brand_id ON posts(brand_id);
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_scheduled_at ON posts(scheduled_at) WHERE status = 'SCHEDULED';

-- RLS Policies (tenant isolation)
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY agency_isolation_brands ON brands
  FOR ALL
  USING (agency_id = current_user_agency_id());

CREATE POLICY agency_isolation_posts ON posts
  FOR ALL
  USING (brand_id IN (
    SELECT id FROM brands WHERE agency_id = current_user_agency_id()
  ));
```

### Data Relationships

```
agencies (1) ─────< (n) users
    │
    └─────< (n) brands
                 │
                 ├─────< (1) brand_brain_entries
                 ├─────< (n) social_profiles
                 └─────< (n) posts
```

---

## Security Architecture

### Authentication & Authorization

**Supabase Auth:**
- Email/password authentication
- OAuth providers (Google, Facebook - optional)
- Session management (JWT tokens)
- Password reset flow

**Multi-Tenant Isolation (RLS):**
```sql
-- Function to get current user's agency
CREATE FUNCTION current_user_agency_id() RETURNS UUID AS $$
  SELECT agency_id FROM users WHERE id = auth.uid()
$$ LANGUAGE SQL STABLE;

-- RLS Policy on brands
CREATE POLICY agency_isolation ON brands
  FOR ALL
  USING (agency_id = current_user_agency_id());
```

**API Route Protection:**
```typescript
export async function GET(request: NextRequest) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return apiError('UNAUTHORIZED', 'Not authenticated', 401);
  }

  // User is authenticated, proceed
}
```

### Data Protection

- **Encryption at rest:** Supabase PostgreSQL (AES-256)
- **Encryption in transit:** HTTPS/TLS (Let's Encrypt SSL)
- **API tokens:** Environment variables, never committed
- **OAuth tokens:** Encrypted in database
- **Secrets management:** `.env.local` (dev), Hetzner env vars (prod)

### GDPR Compliance

- **Data retention:** User can delete account → cascade delete all data
- **Data export:** User can request data export (CSV)
- **Privacy policy:** Document data usage (required)
- **Cookie consent:** If analytics added (e.g., Google Analytics)

---

## Performance Considerations

### AI Latency Targets (P0)

| Operation | Target | Acceptable | Strategy |
|-----------|--------|------------|----------|
| LLM text generation | < 5s | < 10s | Dual provider, streaming response (P1) |
| Image generation | < 15s | < 30s | Dual provider, background job |
| Video generation (🆕) | < 5 min | < 10 min | Background job, progress updates |

### Caching Strategy

**React Query (Client-side):**
- Brands list: 5 min stale time
- Posts list: 1 min stale time
- Calendar data: 30s stale time

**Supabase Realtime (P1 - optional):**
- Real-time updates for collaborative editing
- Post status changes

**CDN (Supabase Storage):**
- Images served via CDN (automatic)
- Cache-Control headers: `public, max-age=31536000` (1 year for immutable assets)

### Database Optimization

- **Indexes:** All foreign keys indexed (`brand_id`, `agency_id`)
- **Partitioning (P2):** If posts table > 1M rows, partition by `created_at`
- **Connection pooling:** Supabase handles (PgBouncer)

---

## Deployment Architecture

### Hetzner VPS Setup

**Server Specs (MVP):**
- **Instance:** CX31 (4 vCPU, 8 GB RAM, 80 GB SSD)
- **Cost:** ~€12/month
- **Location:** Falkenstein, Germany (closest to Hungary)

**Stack:**
```
┌─────────────────────────────────────────┐
│         Internet (HTTPS)                │
└────────────┬────────────────────────────┘
             │
     ┌───────▼────────┐
     │  Nginx (80/443) │  SSL termination, reverse proxy
     └───────┬────────┘
             │
     ┌───────▼────────┐
     │  Next.js App    │  Docker container (port 3000)
     │  (Frontend +    │  - Server Components
     │   API Routes)   │  - API endpoints
     └───────┬────────┘
             │
     ┌───────▼────────┐
     │  BullMQ Worker  │  Docker container
     │  + Redis        │  - Background jobs
     └───────┬────────┘
             │
     ┌───────▼────────┐
     │  Supabase       │  External (cloud)
     │  (PostgreSQL +  │  - Database
     │   Auth +        │  - Storage
     │   Storage)      │  - Real-time
     └─────────────────┘
```

### Docker Setup

**docker-compose.prod.yml:**
```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: docker/Dockerfile
    container_name: creaitor-app
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_SUPABASE_URL=${SUPABASE_URL}
      - NEXT_PUBLIC_SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
      - SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
      - REDIS_URL=redis://redis:6379
    depends_on:
      - redis
    networks:
      - creaitor-network

  worker:
    build:
      context: .
      dockerfile: docker/Dockerfile.worker
    container_name: creaitor-worker
    restart: unless-stopped
    environment:
      - NODE_ENV=production
      - REDIS_URL=redis://redis:6379
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
    depends_on:
      - redis
    networks:
      - creaitor-network

  redis:
    image: redis:7-alpine
    container_name: creaitor-redis
    restart: unless-stopped
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    networks:
      - creaitor-network

networks:
  creaitor-network:
    driver: bridge

volumes:
  redis-data:
```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name creaitor.hu www.creaitor.hu;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name creaitor.hu www.creaitor.hu;

    ssl_certificate /etc/letsencrypt/live/creaitor.hu/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/creaitor.hu/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### CI/CD Pipeline (GitHub Actions)

**.github/workflows/deploy.yml:**
```yaml
name: Deploy to Hetzner

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup SSH
        uses: webfactory/ssh-agent@v0.8.0
        with:
          ssh-private-key: ${{ secrets.HETZNER_SSH_KEY }}

      - name: Deploy to server
        run: |
          ssh root@${{ secrets.HETZNER_IP }} << 'EOF'
            cd /opt/creaitor
            git pull origin main
            docker-compose -f docker-compose.prod.yml down
            docker-compose -f docker-compose.prod.yml build
            docker-compose -f docker-compose.prod.yml up -d
          EOF
```

---

## Development Environment

### Prerequisites

- **Node.js:** v20.x (LTS)
- **npm:** v10.x
- **Docker:** v24.x (for local Redis)
- **Supabase CLI:** Latest
- **Git:** Latest

### Setup Commands

```bash
# 1. Clone repository
git clone https://github.com/your-org/creaitor.git
cd creaitor

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env.local
# Edit .env.local with your keys

# 4. Start Supabase local (optional)
npx supabase start

# 5. Run database migrations
npx supabase db push

# 6. Start Redis (Docker)
docker run -d -p 6379:6379 redis:7-alpine

# 7. Start Next.js dev server
npm run dev

# 8. Start background worker (separate terminal)
npm run worker:dev
```

### Environment Variables

```bash
# .env.local
NODE_ENV=development

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

# AI Providers
OPENAI_API_KEY=sk-xxx...
ANTHROPIC_API_KEY=sk-ant-xxx...

# Image Gen
GOOGLE_GEMINI_API_KEY=AIzxxx... # Nano Banana
SEEDREAM_API_KEY=xxx... # BytePlus vagy Kie.ai

# Meta
META_APP_ID=xxx
META_APP_SECRET=xxx
META_WEBHOOK_VERIFY_TOKEN=xxx

# Redis
REDIS_URL=redis://localhost:6379

# Logging
LOG_LEVEL=debug
```

---

## Architecture Decision Records (ADRs)

### ADR-001: Next.js over Remix/SvelteKit

**Decision:** Use Next.js 15 (App Router)

**Context:** Need a modern React framework with Server Components, built-in API routes, and strong ecosystem.

**Alternatives:**
- Remix: Excellent for forms, but smaller ecosystem
- SvelteKit: Lighter, but team unfamiliar with Svelte

**Rationale:**
- Next.js has largest community + resources
- Server Components reduce client bundle
- Vercel optimizations (even on self-hosted)
- Easy deployment to Hetzner with Docker

---

### ADR-002: Supabase over Firebase/AWS

**Decision:** Use Supabase (PostgreSQL + Auth + Storage)

**Context:** Need database, auth, and storage with minimal DevOps overhead.

**Alternatives:**
- Firebase: NoSQL, good for real-time, but vendor lock-in
- AWS (RDS + Cognito + S3): More control, but complex setup

**Rationale:**
- PostgreSQL (relational DB) better for complex queries
- Row Level Security (RLS) for multi-tenancy
- Open-source (can self-host later if needed)
- Auth + Storage built-in

---

### ADR-003: Dual AI Providers

**Decision:** OpenAI + Anthropic for LLM, Nano Banana + Seedream for images

**Context:** Single provider = single point of failure, no cost optimization.

**Alternatives:**
- Single provider (simpler, but risky)
- 3+ providers (too complex for MVP)

**Rationale:**
- Reliability: If OpenAI down, Anthropic fallback
- Cost: Anthropic cheaper ($0.003 vs $0.01 per 1K tokens)
- Image: Nano Banana for character consistency, Seedream for 4K + cost

---

### ADR-004: Self-Hosted on Hetzner over Vercel

**Decision:** Deploy on Hetzner VPS (Docker)

**Context:** Need cost-effective deployment with full control for background jobs.

**Alternatives:**
- Vercel: Easy, but expensive for AI traffic + 10min function timeout
- AWS: Powerful, but complex + expensive

**Rationale:**
- Cost: €12/month vs $100+/month on Vercel Pro
- Control: BullMQ + Redis for long-running jobs
- No serverless timeouts (video processing 5-10 min)
- Learning opportunity (DevOps skills)

---

### ADR-005: BullMQ over Vercel Cron

**Decision:** BullMQ + Redis for background jobs

**Context:** Need reliable job queue for AI processing, scheduled posts, retries.

**Alternatives:**
- Vercel Cron: Simpler, but 10min max (not enough for video)
- Supabase Edge Functions: Lightweight, but limited concurrency

**Rationale:**
- Heavy tasks: Video processing 5-10 min
- Retry logic: Exponential backoff for AI failures
- Priority queues: Urgent posts first
- Monitoring: Bull Board dashboard

---

### ADR-006: Europe/Budapest Timezone (User-Facing)

**Decision:** User-facing timezone = Europe/Budapest, Internal = UTC

**Context:** Hungarian users, but need UTC for Meta API + DB consistency.

**Alternatives:**
- Full Europe/Budapest (DB too): Complicates Meta API
- Full UTC (user-facing): Confusing for Hungarian users

**Rationale:**
- User sees familiar times (magyar timezone)
- DB UTC = standard practice, Meta API compatible
- Explicit conversions = no ambiguity

---

## Összefoglalás

A Creaitor architektúrája egy **moduláris, bővíthető SaaS platform**, amely az alábbi kulcs döntésekre épül:

✅ **Technológia:** Next.js 15 + TypeScript + Supabase + Dual AI providers
✅ **Deployment:** Self-hosted Hetzner VPS (Docker + Nginx + BullMQ)
✅ **Bővíthetőség:** Moduláris service layer, könnyen hozzáadható videógenerálás, feliratozás
✅ **Megbízhatóság:** Dual provider fallback, retry logic, structured logging
✅ **Multi-tenancy:** Supabase RLS policies, explicit brand context isolation
✅ **MVP fókusz:** Brand Brain context injection, mandatory usability rating

**Következő lépések:**
1. Projekt inicializálás (`create-next-app`)
2. Supabase schema migration
3. Service layer implementálás (LLMService, BrandBrainService)
4. UI komponensek (Shadcn UI + Tailwind)
5. Background worker setup (BullMQ)
6. Hetzner deployment

---

_Generálva: BMAD Decision Architecture Workflow v1.0_
_Dátum: 2025-01-18_
_Készítette: Winston (BMAD Architect Agent)_
_Projekt: Creaitor_
