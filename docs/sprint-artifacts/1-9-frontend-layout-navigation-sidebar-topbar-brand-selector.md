# Story 1.9: Frontend Layout & Navigation (Sidebar, TopBar, Brand Selector)

Status: drafted

## Story

As a **frontend developer**,
I want **main layout components (Sidebar, TopBar, MainLayout) and navigation setup with persistent Brand Selector**,
so that **all subsequent features have consistent navigation and brand context awareness**.

## Acceptance Criteria

1. **AC1: MainLayout component**
   - MainLayout component exists in `src/components/layout/MainLayout.tsx`
   - Wraps all authenticated pages
   - Contains Sidebar and TopBar
   - Responsive: Sidebar collapses on mobile (< lg breakpoint)
   - Uses design tokens for styling

2. **AC2: Sidebar component**
   - Sidebar component exists in `src/components/layout/Sidebar.tsx`
   - Navigation links: Dashboard, Brands, Calendar, Settings
   - Brand Selector (persistent, always visible)
   - User profile section (bottom)
   - Collapsible on mobile
   - Active route highlighted
   - Uses Shadcn UI components (Button, Badge)

3. **AC3: TopBar component**
   - TopBar component exists in `src/components/layout/TopBar.tsx`
   - Shows active brand name and logo (from Brand Selector)
   - User menu dropdown (profile, settings, logout)
   - Notifications icon (placeholder, P1 feature)
   - Responsive: Brand Selector moves to TopBar on mobile

4. **AC4: Brand Selector component**
   - Brand Selector component exists in `src/components/brand/BrandSelector.tsx`
   - Dropdown showing all user's brands
   - Active brand highlighted (visual indicator)
   - Brand logo + name displayed
   - Click to switch active brand
   - Uses Zustand state management (activeBrandId)
   - Persistent across page navigation (UX Pattern 1: Active Brand Context Lock)

5. **AC5: Navigation routing**
   - Next.js App Router setup in `src/app/`
   - Protected routes: `/dashboard/*`, `/brands/*`, `/calendar/*`, `/settings/*`
   - Public routes: `/login`, `/register`, `/`
   - Auth middleware redirects unauthenticated users to `/login`
   - Active route state managed (highlighted in Sidebar)

6. **AC6: Responsive layout**
   - Desktop (≥ lg): Sidebar always visible, TopBar horizontal
   - Mobile (< lg): Sidebar collapsible (hamburger menu), TopBar full width
   - Touch targets: 44x44px minimum (WCAG 2.1 AA)

7. **AC7: Example pages**
   - `src/app/dashboard/page.tsx` (placeholder dashboard)
   - `src/app/login/page.tsx` (placeholder login page)
   - Layout applied to dashboard, not to login

## Tasks / Subtasks

- [ ] **Task 1: MainLayout component** (AC: #1)
  - [ ] Subtask 1.1: Create `src/components/layout/MainLayout.tsx` component
  - [ ] Subtask 1.2: Integrate Sidebar and TopBar components
  - [ ] Subtask 1.3: Implement responsive behavior (sidebar collapse < lg breakpoint)
  - [ ] Subtask 1.4: Apply design tokens for styling (colors, spacing, typography)
  - [ ] Subtask 1.5: Wrap authenticated pages with MainLayout

- [ ] **Task 2: Sidebar component** (AC: #2)
  - [ ] Subtask 2.1: Create `src/components/layout/Sidebar.tsx` component
  - [ ] Subtask 2.2: Implement navigation links (Dashboard, Brands, Calendar, Settings)
  - [ ] Subtask 2.3: Integrate Brand Selector component (persistent, always visible)
  - [ ] Subtask 2.4: Add user profile section (bottom of sidebar)
  - [ ] Subtask 2.5: Implement collapsible behavior for mobile (< lg)
  - [ ] Subtask 2.6: Add active route highlighting logic
  - [ ] Subtask 2.7: Use Shadcn UI components (Button, Badge) for navigation items

- [ ] **Task 3: TopBar component** (AC: #3)
  - [ ] Subtask 3.1: Create `src/components/layout/TopBar.tsx` component
  - [ ] Subtask 3.2: Display active brand name and logo (from Brand Selector state)
  - [ ] Subtask 3.3: Implement user menu dropdown (profile, settings, logout)
  - [ ] Subtask 3.4: Add notifications icon placeholder (P1 feature, disabled for now)
  - [ ] Subtask 3.5: Implement responsive behavior (Brand Selector moves to TopBar on mobile)

- [ ] **Task 4: Brand Selector component** (AC: #4)
  - [ ] Subtask 4.1: Create `src/components/brand/BrandSelector.tsx` component
  - [ ] Subtask 4.2: Implement Zustand store for activeBrandId state (`src/lib/stores/brand-store.ts`)
  - [ ] Subtask 4.3: Create dropdown showing all user's brands (placeholder data for now)
  - [ ] Subtask 4.4: Add active brand visual indicator (highlighted state)
  - [ ] Subtask 4.5: Display brand logo + name for each brand
  - [ ] Subtask 4.6: Implement click handler to switch active brand
  - [ ] Subtask 4.7: Ensure state persists across page navigation (UX Pattern 1)

- [ ] **Task 5: Navigation routing setup** (AC: #5)
  - [ ] Subtask 5.1: Create protected route layout (`src/app/(dashboard)/layout.tsx`)
  - [ ] Subtask 5.2: Create public route layout (`src/app/(auth)/layout.tsx`)
  - [ ] Subtask 5.3: Implement auth middleware (`src/middleware.ts`) to redirect unauthenticated users
  - [ ] Subtask 5.4: Set up route structure: `/dashboard/*`, `/brands/*`, `/calendar/*`, `/settings/*`
  - [ ] Subtask 5.5: Set up public routes: `/login`, `/register`, `/`
  - [ ] Subtask 5.6: Implement active route state management (usePathname hook)

- [ ] **Task 6: Responsive layout implementation** (AC: #6)
  - [ ] Subtask 6.1: Implement desktop layout (≥ lg): Sidebar always visible, TopBar horizontal
  - [ ] Subtask 6.2: Implement mobile layout (< lg): Sidebar collapsible (hamburger menu), TopBar full width
  - [ ] Subtask 6.3: Ensure touch targets are 44x44px minimum (WCAG 2.1 AA compliance)
  - [ ] Subtask 6.4: Test responsive breakpoints (sm: 640px, md: 768px, lg: 1024px)

- [ ] **Task 7: Example pages** (AC: #7)
  - [ ] Subtask 7.1: Create `src/app/dashboard/page.tsx` (placeholder dashboard with MainLayout)
  - [ ] Subtask 7.2: Create `src/app/login/page.tsx` (placeholder login page without MainLayout)
  - [ ] Subtask 7.3: Verify layout is applied to dashboard, not to login

- [ ] **Task 8: Unit tests** (AC: #1, #2, #3, #4)
  - [ ] Subtask 8.1: Unit test: BrandSelector updates Zustand store on brand change
  - [ ] Subtask 8.2: Unit test: Sidebar highlights active route correctly
  - [ ] Subtask 8.3: Unit test: MainLayout applies layout to authenticated pages only

- [ ] **Task 9: E2E tests** (AC: #5, #6)
  - [ ] Subtask 9.1: E2E test: Navigation between routes works
  - [ ] Subtask 9.2: E2E test: Brand Selector persists active brand across navigation
  - [ ] Subtask 9.3: E2E test: Responsive layout - Sidebar collapses on mobile

## Dev Notes

### Architecture Constraints

- **Layout Components:** `src/components/layout/` directory (Architecture § Project Structure)
- **Brand Components:** `src/components/brand/` directory (Architecture § Project Structure)
- **State Management:** Zustand for activeBrandId (Architecture § Decision Summary: Zustand)
- **Styling:** Design tokens from Story 1.8 (`src/styles/design-tokens.css`)
- **UI Components:** Shadcn UI components (Button, Badge, Dropdown) from Story 1.8
- **Routing:** Next.js 15 App Router (Architecture § Decision Summary: Next.js 15 App Router)
- **Responsive Breakpoints:** lg (1024px) for sidebar collapse (Architecture § Project Structure)

### Project Structure Notes

- **New Files:**
  - `src/components/layout/MainLayout.tsx`
  - `src/components/layout/Sidebar.tsx`
  - `src/components/layout/TopBar.tsx`
  - `src/components/brand/BrandSelector.tsx`
  - `src/lib/stores/brand-store.ts` (Zustand store for activeBrandId)
  - `src/app/(dashboard)/layout.tsx` (protected route layout)
  - `src/app/(auth)/layout.tsx` (public route layout)
  - `src/middleware.ts` (auth middleware)
  - `src/app/dashboard/page.tsx` (placeholder dashboard)
  - `src/app/login/page.tsx` (placeholder login page)

- **Modified Files:**
  - `src/app/layout.tsx` (root layout, may need updates for MainLayout integration)

- **Dependencies:** Already installed in Story 1.1 (Zustand, Next.js, Shadcn UI)

### Learnings from Previous Story

**From Story 1.8 (Status: done)**

Story 1.8 successfully set up the frontend design system with Tailwind CSS, Shadcn UI components, and design tokens. Key context for Story 1.9:

**New Files Created (relevant context):**
- ✅ `src/styles/design-tokens.css` - Design tokens (colors, typography, spacing, shadow, border radius)
- ✅ `tailwind.config.ts` - Tailwind configuration with purple/violet color palette (#a855f7)
- ✅ `src/components/ui/button.tsx` - Shadcn UI Button component
- ✅ `src/components/ui/badge.tsx` - Shadcn UI Badge component
- ✅ `src/components/ui/dropdown-menu.tsx` - Shadcn UI Dropdown component (likely needed for Brand Selector)
- ✅ `src/components/ui/sonner.tsx` - Toast notifications (Sonner, replaces deprecated toast)

**Completion Notes:**
- ✅ Design tokens system fully implemented with CSS variables (dark mode ready)
- ✅ Shadcn UI components installed and configured to use design tokens
- ✅ All review findings resolved (spacing and shadow tokens added, Tailwind config updated)
- ✅ Unit tests for design tokens and Tailwind config passing

**Relevant Context:**
- ✅ Design tokens available: `--color-primary`, `--color-secondary`, `--spacing-*`, `--shadow-*`, etc.
- ✅ Shadcn UI components ready: Button, Badge, Dropdown (for Brand Selector), Dialog (for modals)
- ✅ Tailwind config includes responsive breakpoints (lg: 1024px for sidebar collapse)
- ✅ Typography: Plus Jakarta Sans (headings) + Inter (body) configured

**Implications for Story 1.9:**
- Layout components should use design tokens from `src/styles/design-tokens.css`
- Shadcn UI components (Button, Badge, Dropdown) should be used for navigation and Brand Selector
- Responsive breakpoint lg (1024px) should be used for sidebar collapse
- Design system is ready, no additional setup needed

[Source: docs/sprint-artifacts/1-8-frontend-design-system-setup-tailwind-shadcn-design-tokens.md#Dev-Agent-Record]

### References

- [Source: docs/epics/epic-1-foundation-development-infrastructure.md#story-19-frontend-layout--navigation-sidebar-topbar-brand-selector-routing] - Epic 1 Story 1.9 acceptance criteria
- [Source: docs/sprint-artifacts/tech-spec-epic-1.md#story-19-frontend-layout--navigation] - Tech Spec Story 1.9 acceptance criteria
- [Source: docs/architecture.md#decision-summary] - Next.js 15 App Router, Zustand state management decisions
- [Source: docs/architecture.md#project-structure] - Component directory structure (`src/components/layout/`, `src/components/brand/`)
- [Source: docs/ux-design-specification.md#section-22-navigation-structure] - Navigation structure (Sidebar, TopBar layout)
- [Source: docs/ux-design-specification.md#section-61-brand-selector-component] - Brand Selector component specification (UX Pattern 1: Active Brand Context Lock)
- [Source: docs/ux-design-specification.md#section-52-navigation-structure] - Sidebar layout (250px width, navigation links, Brand Selector placement)
- [Source: docs/test-design-system.md] - Testing strategy and coverage requirements

### Technical Notes

- **Zustand Store:** Create `src/lib/stores/brand-store.ts` with `activeBrandId` state and `setActiveBrand` action
- **Auth Middleware:** Use Next.js middleware (`src/middleware.ts`) to check authentication and redirect to `/login`
- **Route Groups:** Use Next.js route groups `(dashboard)` and `(auth)` for layout organization
- **Active Route Detection:** Use `usePathname()` hook from `next/navigation` to highlight active route in Sidebar
- **Responsive Design:** Use Tailwind responsive classes (`lg:` prefix) for desktop/mobile breakpoints
- **Touch Targets:** Ensure all interactive elements (buttons, links) are at least 44x44px for WCAG 2.1 AA compliance
- **Brand Selector State:** Zustand store should persist `activeBrandId` across page navigation (localStorage or sessionStorage)

### Testing Strategy

- **Unit Tests:**
  - BrandSelector Zustand store updates correctly on brand change
  - Sidebar highlights active route based on current pathname
  - MainLayout applies layout only to authenticated pages

- **E2E Tests (Playwright):**
  - Navigation between routes (Dashboard → Brands → Calendar → Settings)
  - Brand Selector persists active brand across navigation
  - Responsive layout: Sidebar collapses on mobile (< lg breakpoint)
  - Touch targets are 44x44px minimum

## Dev Agent Record

### Context Reference

<!-- Path(s) to story context XML will be added here by context workflow -->

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List

## Change Log

- **2025-11-20:** Story drafted by SM agent (Bob) - YOLO mode, no elicitation

