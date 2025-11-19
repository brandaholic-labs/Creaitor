# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

**Creaitor** is an AI-powered social media content management platform specifically designed for **3-10 person marketing/social media agencies** managing multiple client brands on Facebook and Instagram.

**Core Concept: Brand Brain**
- Each client brand has a dedicated "brand brain" workspace
- Stores brand voice, key messages, visual direction, and reference posts
- AI generates content based on this structured brand context, not generic prompts

**Target Users:** Social media managers handling 5-10 brands simultaneously

**MVP Scope:**
- Facebook + Instagram integration
- Weekly content calendar generation
- AI-powered copy generation (LLM)
- AI image generation
- Approval workflow and scheduling
- Meta platform publishing

---

## Technology Stack

### Core Framework
- **Next.js 15** (App Router) with TypeScript
- **Tailwind CSS v4** + **Shadcn UI** components
- **Supabase** (PostgreSQL with RLS, Auth, Storage)

### AI Providers
- **LLM:** OpenAI GPT-4 + Anthropic Claude 3.5 (dual provider fallback)
- **Image:** Nano Banana (Gemini 2.5 Flash) + Seedream 4.0

### Infrastructure
- **Background Jobs:** BullMQ + Redis
- **Logging:** Winston
- **Deployment:** Self-hosted Hetzner VPS with Docker
- **Reverse Proxy:** Caddy (automatic HTTPS)
- **CI/CD:** GitHub Actions

### Testing
- **Unit/Integration:** Jest with @swc/jest
- **E2E:** Playwright
- **Coverage Target:** ≥60% for MVP

---

## Project Initialization

```bash
# 1. Initialize Next.js project
npx create-next-app@latest creaitor --typescript --tailwind --app --src-dir --eslint
cd creaitor

# 2. Initialize Supabase
npx supabase init

# 3. Install Shadcn UI
npx shadcn-ui@latest init

# 4. Install core dependencies
npm install @supabase/supabase-js @supabase/ssr
npm install bullmq ioredis
npm install winston date-fns date-fns-tz
npm install zod
npm install @tanstack/react-query zustand

# 5. Install dev dependencies
npm install -D @types/node
```

### Environment Setup

Required environment variables (see `docs/architecture.md` for full details):
- Supabase URL and keys
- OpenAI API key
- Anthropic API key
- Nano Banana / Seedream API keys
- Meta OAuth credentials
- Redis connection URL

---

## Project Structure

```
creaitor/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Auth routes (login, signup)
│   │   ├── (dashboard)/       # Protected dashboard routes
│   │   │   ├── brands/        # Brand management
│   │   │   ├── calendar/      # Content calendar
│   │   │   ├── studio/        # AI Studios (copy, image, video, subtitle)
│   │   │   ├── posts/         # Post management
│   │   │   └── settings/      # Agency/user settings
│   │   └── api/               # API routes
│   │       ├── ai/            # AI service endpoints
│   │       ├── brands/
│   │       ├── posts/
│   │       └── meta/          # Meta Graph API integration
│   │
│   ├── components/
│   │   ├── ui/                # Shadcn UI components
│   │   ├── layout/            # Sidebar, Navbar, Footer
│   │   ├── brand/             # Brand-related components
│   │   ├── calendar/          # Calendar components
│   │   ├── studio/            # AI Studio components
│   │   └── post/              # Post components
│   │
│   ├── lib/
│   │   ├── supabase/          # Supabase clients (browser, server, middleware)
│   │   ├── services/          # Service layer (AI, Meta, Storage, Queue)
│   │   ├── utils/             # Utility functions
│   │   ├── hooks/             # React hooks
│   │   └── logger/            # Winston configuration
│   │
│   ├── types/                 # TypeScript type definitions
│   ├── config/                # Configuration files
│   └── middleware.ts          # Next.js auth middleware
│
├── workers/                   # Background job workers (separate process)
│   ├── queues/
│   └── jobs/
│
├── supabase/
│   ├── migrations/            # Database migrations
│   ├── functions/             # Edge Functions (optional)
│   └── seed.sql
│
├── docker/                    # Docker configs for deployment
├── scripts/                   # Setup and deployment scripts
├── tests/                     # Unit, integration, and E2E tests
└── docs/                      # Project documentation
```

---

## Development Workflow (BMad Method)

This project follows the **BMad Method (BMM)** workflow, an AI-driven agile development methodology.

### Phase Status Tracking

- **Workflow status:** `docs/bmm-workflow-status.yaml` - tracks Analysis, Planning, and Solutioning phases
- **Sprint status:** `docs/sprint-artifacts/sprint-status.yaml` - tracks Epic and Story implementation

### Epic Structure

The project is organized into **7 Epics** (see `docs/epics/`):

1. **Foundation & Development Infrastructure** - Project setup, Docker, CI/CD, testing, design system
2. **Multi-Tenant Authentication & Authorization** - Agency registration, RLS policies, user management
3. **Brand Management & Brand Brain** - Brand creation, Meta connection, Brand Brain editor
4. **AI-Powered Content Generation** - AI Copy Studio, LLM integration, post generation
5. **Content Calendar & Scheduling** - Calendar grid, scheduling, timezone handling
6. **Approval & Publishing Pipeline** - Approval workflow, Meta OAuth, publishing
7. **Analytics & Instrumentation** - Event logging, usage tracking, pilot metrics

### Story Development Flow

Stories follow this lifecycle:
```
backlog → drafted → ready-for-dev → in-progress → review → done
```

### BMM Agents Available

The project has BMM agents configured for specialized tasks:
- **PM** - Product management and story creation
- **Architect** - Technical architecture decisions
- **SM** - Scrum master / sprint management
- **DEV** - Story implementation
- **TEA** - Test engineering and quality
- **UX Designer** - User experience design
- **Analyst** - Research and analysis

Use BMM slash commands (e.g., `/bmad:bmm:workflows:dev-story`) to invoke workflows.

---

## Key Documentation

### Essential Reading
- `docs/architecture.md` - **Complete technical architecture** (framework decisions, project structure, deployment, testing strategy)
- `docs/product-brief-creaitor-2025-11-17.md` - Product vision and MVP scope
- `docs/prd-creaitor-2025-11-18/` - Detailed product requirements (sharded into sections)
- `docs/ux-design-specification.md` - UX/UI design specification
- `docs/test-design-system.md` - Testing strategy and approach

### Epic Documentation
- `docs/epics/index.md` - Epic overview and structure
- `docs/epics/epic-{N}-*.md` - Individual epic specifications with user stories

### Sprint Artifacts
- `docs/sprint-artifacts/tech-spec-epic-1.md` - Technical specification for Epic 1
- `docs/sprint-artifacts/sprint-status.yaml` - Current sprint tracking
- `docs/sprint-artifacts/validation-report-*.md` - Epic validation reports

### Research & Analysis
- `docs/market-research.md` - Market analysis
- `docs/competitive-analysis.md` - Competitor research
- `docs/brainstorming-creaitor-2025-11-16.md` - Initial brainstorming session

---

## Architecture Decisions

### Multi-Tenant Design
- **Row-Level Security (RLS)** in Supabase for agency isolation
- Each agency has multiple brands, each brand has multiple posts
- JWT-based authentication with Supabase Auth

### Modularity for Future Extensions
The service layer is designed to easily add new AI capabilities:
- `src/lib/services/ai/video.service.ts` - Future video generation
- `src/lib/services/ai/subtitle.service.ts` - Future subtitle generation
- Routes organized under `src/app/(dashboard)/studio/` for easy expansion

### Background Job Processing
Heavy AI operations run in background workers:
- API routes queue jobs via BullMQ
- Separate worker processes handle AI generation
- Job status tracked and returned to frontend

### Dual Provider Strategy
AI providers have fallback mechanisms:
- Primary: OpenAI GPT-4 → Fallback: Anthropic Claude 3.5
- Primary: Nano Banana → Fallback: Seedream 4.0
- Cost optimization and reliability

### Deployment Architecture
- **Self-hosted** on Hetzner VPS for cost control
- **Docker Compose** orchestrates Next.js app + Redis + background workers
- **Caddy** handles automatic HTTPS and reverse proxy
- **GitHub Actions** auto-deploy on push to main branch

---

## Development Commands

### Local Development
```bash
# Start Next.js dev server
npm run dev

# Start Supabase locally
npx supabase start

# Run database migrations
npx supabase db reset  # or npx supabase migration up

# Start Redis (if not using Docker)
redis-server

# Start background workers
npm run worker:dev
```

### Testing
```bash
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run E2E tests
npm run test:e2e

# Run tests with coverage
npm run test:coverage
```

### Building & Deployment
```bash
# Build for production
npm run build

# Start production server
npm start

# Deploy to Hetzner (via script)
./scripts/deploy.sh
```

### Code Quality
```bash
# Lint code
npm run lint

# Type check
npm run type-check
```

---

## Important Notes

### Current Project State
- **Phase:** Implementation planning complete (Epic 1 tech spec ready)
- **Code Status:** No implementation code yet, documentation-driven development
- **Next Step:** Story 1.1 - Project initialization and core dependencies

### Hungarian Language Support
- Product documentation is primarily in Hungarian
- Code, comments, and technical docs should be in English
- UI strings and user-facing content will be in Hungarian

### Brand Brain Architecture
The "Brand Brain" is the core differentiator:
- Not a generic AI chatbot, but brand-context-aware generation
- v1 (MVP): Simple brand profile with reference posts, tone of voice, key messages
- Future: RAG-based deep brand knowledge with full document processing

### Testing Strategy
- Unit tests with **mocked AI responses** (no live API calls in tests)
- Integration tests for API routes
- E2E tests only for critical user flows
- No tests for UI components in MVP (focus on service layer)

---

## Useful References

- BMM Method Documentation: `.bmad/bmm/docs/`
- Cursor Rules Index: `.cursor/rules/bmad/index.mdc`
- Next.js 15 App Router: https://nextjs.org/docs
- Supabase Docs: https://supabase.com/docs
- Shadcn UI: https://ui.shadcn.com
