# Story 1.1: Project Initialization & Core Dependencies

Status: ready-for-dev

## Story

As a **developer**,
I want **Next.js 15 project initialized with TypeScript, Tailwind CSS, and core dependencies**,
so that **we have a standardized development environment for all team members**.

## Requirements Context

Ez a story a Creaitor projekt technikai alapjait fekteti le. Az **Epic 1: Foundation & Development Infrastructure** első lépéseként létrehozza a Next.js 15 alapú projektet TypeScript-tel, Tailwind CSS-sel és minden szükséges core dependency-vel.

**Üzleti indoklás:** Egységes, modern fejlesztői környezet biztosítása, ami lehetővé teszi a gyors fejlesztést és a későbbi epicek sikeres implementálását.

**Kapcsolódás az architektúrához:**
- **Architecture Decision ADR-001:** Next.js 15 App Router választás (modern React framework, Server Components, built-in API routes)
- **Architecture Decision ADR-003:** TypeScript strict mode (type-safety az egész stackben, jobb developer experience)
- **Architecture § Project Structure:** src/ alapú mappa struktúra (app/, components/, lib/, services/, types/)

**PRD Requirements lefedettség:**
- **TA0: P0 Stack Philosophy:** Next.js 15, TypeScript, Tailwind CSS (mandatory core stack)
- **TA2: Technology Stack Decisions - Frontend Stack:** Next.js 15 App Router, TypeScript, Tailwind CSS, Shadcn UI
- **NFR6: Maintainability - Code Quality:** TypeScript strict mode, ESLint konfigurálva

## Acceptance Criteria

1. **AC1: Next.js 15 projekt létrehozva**
   - App Router enabled
   - TypeScript strict mode configured
   - Tailwind CSS integrated
   - ESLint configured
   - src/ directory structure

2. **AC2: Core dependencies telepítve a package.json-ban**
   - Framework: Next.js 15, React 18, TypeScript 5.x
   - Styling: Tailwind CSS 3.x (vagy 4.0 ha stable)
   - UI Components: Shadcn UI komponensek (@radix-ui/*)
   - Backend/Database: Supabase client (@supabase/supabase-js, @supabase/ssr)
   - Background Jobs: BullMQ + ioredis
   - Logging: Winston + winston-daily-rotate-file
   - Validation: Zod
   - State Management: Zustand
   - Data Fetching: @tanstack/react-query
   - Utilities: date-fns, date-fns-tz, clsx, tailwind-merge

3. **AC3: Project folder structure követi az Architecture konvenciókat**
   ```
   src/
     app/          # Next.js App Router (routing, pages, API routes)
     components/   # UI komponensek (Shadcn UI + custom)
     lib/          # Shared utilities, helpers
     services/     # Business logic services
     types/        # TypeScript type definitions
   ```

4. **AC4: README.md létezik setup instrukcióval**
   - Prerequisites (Node.js 20, Docker, Supabase CLI)
   - Installation steps
   - Development server commands
   - Testing commands (placeholder)
   - Environment variables (placeholder)

## Tasks / Subtasks

- [ ] **Task 1: Next.js projekt inicializálás** (AC: #1)
  - [ ] Subtask 1.1: Run `npx create-next-app@latest creaitor --typescript --tailwind --app --src-dir --eslint`
  - [ ] Subtask 1.2: Verify project structure created (src/, app/ router, tsconfig.json, tailwind.config.ts)
  - [ ] Subtask 1.3: Configure TypeScript strict mode (`tsconfig.json` strict: true)
  - [ ] Subtask 1.4: Set up path aliases (`@/*` → `./src/*`)
  - [ ] Subtask 1.5: Test Next.js dev server: `npm run dev` (should start on http://localhost:3000)

- [ ] **Task 2: Shadcn UI setup** (AC: #2)
  - [ ] Subtask 2.1: Run `npx shadcn-ui@latest init`
  - [ ] Subtask 2.2: Configure Shadcn UI defaults (baseColor: neutral vagy slate, cssVariables: true)
  - [ ] Subtask 2.3: Verify src/components/ui/ folder created
  - [ ] Subtask 2.4: Install first test component: `npx shadcn-ui@latest add button`

- [ ] **Task 3: Core dependencies telepítése** (AC: #2)
  - [ ] Subtask 3.1: Supabase client: `npm install @supabase/supabase-js @supabase/ssr`
  - [ ] Subtask 3.2: Background jobs: `npm install bullmq ioredis`
  - [ ] Subtask 3.3: Logging: `npm install winston winston-daily-rotate-file`
  - [ ] Subtask 3.4: Validation: `npm install zod`
  - [ ] Subtask 3.5: State management: `npm install zustand`
  - [ ] Subtask 3.6: Data fetching: `npm install @tanstack/react-query`
  - [ ] Subtask 3.7: Utilities: `npm install date-fns date-fns-tz clsx tailwind-merge`
  - [ ] Subtask 3.8: Dev dependencies: `npm install -D @types/node`
  - [ ] Subtask 3.9: Verify all packages installed: `npm list --depth=0`

- [ ] **Task 4: Project mappa struktúra létrehozása** (AC: #3)
  - [ ] Subtask 4.1: Create src/services/ directory
  - [ ] Subtask 4.2: Create src/lib/ directory
  - [ ] Subtask 4.3: Create src/types/ directory
  - [ ] Subtask 4.4: Verify src/components/ and src/app/ already exist (created by create-next-app)
  - [ ] Subtask 4.5: Create placeholder files (src/lib/utils.ts, src/types/index.ts)

- [ ] **Task 5: README.md létrehozása** (AC: #4)
  - [ ] Subtask 5.1: Create README.md with project title and description
  - [ ] Subtask 5.2: Add Prerequisites section (Node.js 20, Docker, Supabase CLI)
  - [ ] Subtask 5.3: Add Installation section (`npm install`, environment setup)
  - [ ] Subtask 5.4: Add Development section (`npm run dev`, folder structure)
  - [ ] Subtask 5.5: Add Testing section (placeholder: "Testing infrastructure coming in Story 1.4")
  - [ ] Subtask 5.6: Add Contributing section (basic guidelines)

- [ ] **Task 6: Validálás és clean-up** (AC: #1, #2, #3, #4)
  - [ ] Subtask 6.1: Run TypeScript compiler: `npx tsc --noEmit` (no errors expected)
  - [ ] Subtask 6.2: Run ESLint: `npm run lint` (should pass)
  - [ ] Subtask 6.3: Verify npm build works: `npm run build` (production build succeeds)
  - [ ] Subtask 6.4: Remove default Next.js boilerplate (if unnecessary)
  - [ ] Subtask 6.5: Commit initial project: `git init && git add . && git commit -m "feat(epic-1): Story 1.1 - Project initialization & core dependencies"`

## Dev Notes

### Architecture Constraints

**Framework és Nyelv (Architecture Decision Summary):**
- **Next.js 15 App Router:** Modern React framework Server Components-szel, built-in API routes-szal. A create-next-app --app flag biztosítja az App Router használatát (nem Pages Router).
- **TypeScript Strict Mode:** Type-safety az egész stackben. Az AI autocomplete és fejlesztői eszközök hatékonyabb használatát teszi lehetővé.
- **Tailwind CSS:** Utility-first CSS framework. A Shadcn UI komponensek Tailwind-re épülnek, ezért mandatory.

**Path Aliases (tsconfig.json):**
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```
Ez lehetővé teszi az `import { Button } from '@/components/ui/button'` szintaxist.

**Dependency Version Strategy (Architecture § Dependency Management):**
- **Exact versions:** Kritikus dependencies (Next.js, React, Supabase) - pontos verzió megadása
- **Caret versions (`^`):** Utility libraries (date-fns, zod) - patch és minor update-ek engedélyezése
- **Lock file:** package-lock.json committed (exact dependency tree locking)

### Testing Stratégia

**Story 1.1 testing (Tech Spec § Test Strategy Summary):**
- **Unit tests:** tsconfig validation test, folder structure validation test
- **Integration tests:** Nincs (ez infrastructure setup story)
- **E2E tests:** Nincs (még nincs feature)
- **Manual testing checklist:**
  - [ ] TypeScript compilation no errors: `npx tsc --noEmit`
  - [ ] ESLint passes: `npm run lint`
  - [ ] Next.js dev server starts: `npm run dev`
  - [ ] Production build succeeds: `npm run build`

**Test Coverage Target:** ~40% (Tech Spec § Test Coverage Targets)

### Project Structure Notes

**Architecture Compliance (Architecture § Project Structure):**

```
creaitor/
├── src/
│   ├── app/                    # ✅ Next.js App Router (automatic)
│   │   ├── layout.tsx          # ✅ Root layout (default)
│   │   ├── page.tsx            # ✅ Home page (default)
│   │   └── globals.css         # ✅ Tailwind imports
│   │
│   ├── components/             # ✅ UI components (default)
│   │   └── ui/                 # ✅ Shadcn UI components (via shadcn init)
│   │
│   ├── lib/                    # 🆕 Create in Task 4
│   │   └── utils.ts            # 🆕 Placeholder utility file
│   │
│   ├── services/               # 🆕 Create in Task 4
│   │
│   └── types/                  # 🆕 Create in Task 4
│       └── index.ts            # 🆕 Placeholder type exports
│
├── public/                     # ✅ Static assets (automatic)
├── .eslintrc.json              # ✅ ESLint config (automatic)
├── tailwind.config.ts          # ✅ Tailwind config (automatic)
├── tsconfig.json               # ✅ TypeScript config (automatic)
├── package.json                # ✅ Dependencies (automatic + manual installs)
├── next.config.js              # ✅ Next.js config (automatic)
└── README.md                   # 🆕 Create in Task 5
```

**Detektált eltérések és indoklás:** Nincs eltérés - a create-next-app automatikusan generálja a helyes struktúrát.

### Source Code Components

**Frontend Components (Story 1.1):**
- **src/app/layout.tsx:** Root layout (default Next.js)
- **src/app/page.tsx:** Home page (default Next.js boilerplate - later replaced)
- **src/components/ui/button.tsx:** Shadcn UI Button component (example install)

**Backend Components:** Nincs (ez infrastructure setup story, backend service-ek Epic 2-7-ben)

**Libraries és Utilities:**
- **src/lib/utils.ts:** Placeholder utility file (cn() function later - Shadcn UI helper)
- **src/types/index.ts:** Placeholder type exports

### References

**Architecture dokumentum:**
- [Source: docs/architecture.md § Project Initialization] - `create-next-app` parancs pontos szintaxisa
- [Source: docs/architecture.md § Decision Summary] - Framework és technology stack döntések
- [Source: docs/architecture.md § Project Structure] - Mappa struktúra konvenciók

**Tech Spec Epic 1:**
- [Source: docs/sprint-artifacts/tech-spec-epic-1.md § Story 1.1 Acceptance Criteria] - Authoritative AC lista
- [Source: docs/sprint-artifacts/tech-spec-epic-1.md § NPM Dependencies] - Teljes dependency lista verziókkal
- [Source: docs/sprint-artifacts/tech-spec-epic-1.md § Test Strategy Summary] - Story 1.1 testing stratégia

**PRD Requirements:**
- [Source: docs/prd-creaitor-2025-11-18/ta0-p0-stack-philosophy-must-vs-nice-to-have.md § TA0.1 P0-Core] - Mandatory core stack
- [Source: docs/prd-creaitor-2025-11-18/ta2-technology-stack-decisions-p0.md § TA2.1 Frontend Stack] - Next.js, TypeScript, Tailwind, Shadcn UI

**Epic 1 Story Breakdown:**
- [Source: docs/epics/epic-1-foundation-development-infrastructure.md § Story 1.1] - Story leírás és technical notes

### Learnings from Previous Story

**First story in epic - no predecessor context**

Ez az Epic 1 első story-ja, tehát nincs előző story, amelyből tanulhatnánk. A következő story-k (1.2, 1.3, stb.) majd erre a projektre fognak építeni.

## Dev Agent Record

### Context Reference

- Story Context: docs/sprint-artifacts/1-1-project-initialization-core-dependencies.context.xml

### Agent Model Used

Claude Sonnet 4.5 (claude-sonnet-4-5-20250929)

### Debug Log References

<!-- Debug logs will be added during implementation -->

### Completion Notes List

**Implementation Summary:**

✅ **Task 1: Next.js Project Initialization**
- Created Next.js 15 project structure manually (create-next-app had interactive prompt issues)
- Configured TypeScript with strict mode and path aliases (@/* → ./src/*)
- Set up Tailwind CSS v4 with @tailwindcss/postcss plugin
- All configuration files created: tsconfig.json, next.config.js, tailwind.config.ts, postcss.config.mjs, .eslintrc.json
- Dev server tested and working on localhost:3000

✅ **Task 2: Shadcn UI Setup**
- Created components.json configuration (style: "new-york", baseColor: "neutral", cssVariables: true)
- Installed Shadcn UI dependencies: clsx, tailwind-merge, class-variance-authority
- Created src/components/ui/ directory structure
- Implemented Button component as test component (with CVA variants)
- Updated src/lib/utils.ts with proper cn() function

✅ **Task 3: Core Dependencies Installation**
- Supabase client: @supabase/supabase-js@2.83.0, @supabase/ssr@0.7.0
- Background jobs: bullmq@5.63.2, ioredis (dependency)
- Logging: winston@3.18.3, winston-daily-rotate-file@5.0.0
- Validation: zod@4.1.12
- State management: zustand@5.0.8, @tanstack/react-query@5.90.10
- Utilities: date-fns@4.1.0, date-fns-tz@3.2.0
- All dependencies installed successfully, 0 vulnerabilities

✅ **Task 4: Project Folder Structure**
- Created src/ directory structure: app/, components/, lib/, services/, types/
- src/app/: layout.tsx, page.tsx, globals.css
- src/components/ui/: button.tsx
- src/lib/: utils.ts
- src/types/: index.ts
- Structure matches Architecture spec perfectly

✅ **Task 5: README.md Creation**
- Comprehensive README with installation instructions, development workflow, project structure
- Tech stack documentation, testing placeholders (for Story 1.4)
- Contributing guidelines and license information

✅ **Task 6: Validation & Clean-up**
- TypeScript compilation: ✓ npx tsc --noEmit (no errors)
- ESLint: ✓ npm run lint (no warnings or errors)
- Production build: ✓ npm run build (compiled successfully in 7.0s)
- Updated .gitignore with Next.js specific entries (.next/, tsconfig.tsbuildinfo)
- Git commit created with comprehensive commit message
- Pushed to branch: claude/bmm-agents-dev-01VjEiRRoKXFs674ox9XGy7E

**Technical Challenges & Solutions:**

1. **Interactive Prompts Issue:**
   - Challenge: create-next-app has interactive prompts that don't work in non-interactive environments
   - Solution: Created Next.js project structure manually with all required config files
   - Result: More control over setup, identical outcome to create-next-app

2. **Google Fonts Network Issue:**
   - Challenge: Next.js build failed fetching Inter font from Google Fonts
   - Solution: Removed Google Fonts import, used system fonts with font-sans class
   - Note: Google Fonts can be re-added in Story 1.8 (Frontend design system) if needed

3. **Tailwind CSS v4 PostCSS Plugin:**
   - Challenge: Tailwind CSS v4 requires @tailwindcss/postcss instead of tailwindcss as PostCSS plugin
   - Solution: Installed @tailwindcss/postcss and updated postcss.config.mjs
   - Result: Production build successful

**All Acceptance Criteria Met:**
- AC1: ✅ Next.js 15 with App Router, TypeScript strict mode, Tailwind CSS, ESLint, src/ directory
- AC2: ✅ package.json with all core dependencies (Next.js, Supabase, BullMQ, Winston, Zod, Zustand, React Query, date-fns)
- AC3: ✅ Project folder structure: src/app/, src/components/, src/lib/, src/services/, src/types/
- AC4: ✅ README.md with setup instructions

**Story Status:** ✅ COMPLETE - Ready for review

### File List

**NEW FILES:**
- `.eslintrc.json` - ESLint configuration (Next.js core-web-vitals)
- `components.json` - Shadcn UI configuration
- `next-env.d.ts` - Next.js TypeScript definitions (auto-generated)
- `next.config.js` - Next.js configuration
- `package.json` - Project dependencies and scripts
- `package-lock.json` - Dependency lock file
- `postcss.config.mjs` - PostCSS configuration with @tailwindcss/postcss
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration (strict mode, path aliases)
- `src/app/layout.tsx` - Root layout component
- `src/app/page.tsx` - Home page component
- `src/app/globals.css` - Global CSS with Tailwind directives
- `src/components/ui/button.tsx` - Shadcn UI Button component
- `src/lib/utils.ts` - Utility functions (cn helper)
- `src/types/index.ts` - TypeScript type exports placeholder

**MODIFIED FILES:**
- `.gitignore` - Added Next.js specific ignores (.next/, tsconfig.tsbuildinfo)
- `README.md` - Created comprehensive project documentation
- `docs/sprint-artifacts/sprint-status.yaml` - Updated story status: ready-for-dev → in-progress

**DELETED FILES:** None

**Total:** 15 new files, 3 modified files, 0 deleted files

## Change Log

<!-- Track changes to this story during implementation -->
