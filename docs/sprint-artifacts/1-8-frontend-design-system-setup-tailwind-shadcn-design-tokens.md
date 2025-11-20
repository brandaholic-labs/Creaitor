# Story 1.8: Frontend Design System Setup (Tailwind Config, Shadcn UI, Design Tokens)

Status: ready-for-dev

## Story

As a **frontend developer**,
I want **Tailwind CSS configured with purple/violet color palette, Shadcn UI components installed, and design token system**,
so that **we have a consistent, scalable design system foundation for all UI components**.

## Acceptance Criteria

1. **AC1: Tailwind configuration (tailwind.config.ts)**
   - Purple/violet color palette (#a855f7 primary, shades: 50-950)
   - Design token system using CSS variables (--color-primary, --color-secondary, etc.)
   - Typography configuration (font families, sizes, weights)
   - Spacing scale (4px base unit)
   - Responsive breakpoints (sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px)
   - Shadow utilities (elevation levels)
   - Border radius utilities

2. **AC2: Design tokens (src/styles/design-tokens.css)**
   - Color tokens (primary, secondary, accent, background, foreground, muted, etc.)
   - Typography tokens (font families, sizes, line heights)
   - Spacing tokens
   - Shadow tokens
   - Border radius tokens
   - Dark mode ready (CSS variables, future P1 feature)

3. **AC3: Shadcn UI components installed and configured**
   - Base components: Button, Input, Textarea, Card, Dialog, Badge, Toast, Calendar
   - Components installed via `npx shadcn-ui@latest add [component]`
   - Components use design tokens (CSS variables)
   - Components follow UX Design Specification (Section 1: Design System Foundation)

4. **AC4: Component directory structure**
   - `src/components/ui/` directory contains all installed Shadcn UI components
   - Components are customizable via Tailwind classes
   - Components use design tokens

5. **AC5: Documentation**
   - Example usage documented in README.md:
     - How to use design tokens
     - How to add new Shadcn UI components
     - How to customize components

## Tasks / Subtasks

- [ ] **Task 1: Tailwind CSS configuration** (AC: #1)
  - [ ] Subtask 1.1: Create/update tailwind.config.ts with purple/violet color palette (#a855f7 primary, shades 50-950)
  - [ ] Subtask 1.2: Configure design token system using CSS variables in Tailwind config
  - [ ] Subtask 1.3: Configure typography (font families: Plus Jakarta Sans for headings, Inter for body)
  - [ ] Subtask 1.4: Configure spacing scale (4px base unit)
  - [ ] Subtask 1.5: Configure responsive breakpoints (sm, md, lg, xl, 2xl)
  - [ ] Subtask 1.6: Configure shadow utilities (elevation levels)
  - [ ] Subtask 1.7: Configure border radius utilities

- [ ] **Task 2: Design tokens CSS file** (AC: #2)
  - [ ] Subtask 2.1: Create src/styles/design-tokens.css file
  - [ ] Subtask 2.2: Define color tokens (primary, secondary, accent, background, foreground, muted, etc.) as CSS variables
  - [ ] Subtask 2.3: Define typography tokens (font families, sizes, line heights) as CSS variables
  - [ ] Subtask 2.4: Define spacing tokens as CSS variables
  - [ ] Subtask 2.5: Define shadow tokens as CSS variables
  - [ ] Subtask 2.6: Define border radius tokens as CSS variables
  - [ ] Subtask 2.7: Ensure dark mode ready (CSS variables structure, no toggle switch P0)

- [ ] **Task 3: Shadcn UI installation and configuration** (AC: #3, #4)
  - [ ] Subtask 3.1: Initialize Shadcn UI if not already done: `npx shadcn-ui@latest init`
  - [ ] Subtask 3.2: Install base components: Button (`npx shadcn-ui@latest add button`)
  - [ ] Subtask 3.3: Install Input component (`npx shadcn-ui@latest add input`)
  - [ ] Subtask 3.4: Install Textarea component (`npx shadcn-ui@latest add textarea`)
  - [ ] Subtask 3.5: Install Card component (`npx shadcn-ui@latest add card`)
  - [ ] Subtask 3.6: Install Dialog component (`npx shadcn-ui@latest add dialog`)
  - [ ] Subtask 3.7: Install Badge component (`npx shadcn-ui@latest add badge`)
  - [ ] Subtask 3.8: Install Toast component (`npx shadcn-ui@latest add toast`)
  - [ ] Subtask 3.9: Install Calendar component (`npx shadcn-ui@latest add calendar`)
  - [ ] Subtask 3.10: Verify components are in src/components/ui/ directory
  - [ ] Subtask 3.11: Update components to use design tokens (CSS variables) instead of hardcoded values
  - [ ] Subtask 3.12: Verify components follow UX Design Specification Section 1 (Design System Foundation)

- [ ] **Task 4: Integration and testing** (AC: #1, #2, #3, #4)
  - [ ] Subtask 4.1: Import design-tokens.css in app/globals.css or root layout
  - [ ] Subtask 4.2: Verify Tailwind config references design tokens correctly
  - [ ] Subtask 4.3: Create example page or component demonstrating design token usage
  - [ ] Subtask 4.4: Verify Shadcn UI components render correctly with design tokens
  - [ ] Subtask 4.5: Test responsive breakpoints work correctly

- [ ] **Task 5: Documentation** (AC: #5)
  - [ ] Subtask 5.1: Add design token usage section to README.md
  - [ ] Subtask 5.2: Document how to add new Shadcn UI components
  - [ ] Subtask 5.3: Document how to customize components using Tailwind classes
  - [ ] Subtask 5.4: Include examples of design token usage in components

- [ ] **Task 6: Unit tests** (AC: #1, #2)
  - [ ] Subtask 6.1: Unit test: Design token CSS variables are defined (parse CSS file, verify variables exist)
  - [ ] Subtask 6.2: Unit test: Tailwind config exports correct color palette (verify primary color is #a855f7)
  - [ ] Subtask 6.3: Visual regression test: Shadcn UI components render correctly with design tokens (optional, P1)

## Dev Notes

### Architecture Constraints

- **Styling Framework:** Tailwind CSS v4 (Architecture § Decision Summary: Tailwind CSS v4)
- **UI Library:** Shadcn UI (Architecture § Decision Summary: Shadcn UI)
- **Color Palette:** Purple/Violet (#a855f7) as primary brand color (UX Design Specification § 3.2)
- **Typography:** Plus Jakarta Sans (headings) + Inter (body) - UX Design Specification § 3.3
- **Design Tokens:** CSS variables for future-ready dark mode (P1 feature, but structure P0)
- **Component Location:** `src/components/ui/` (Architecture § Project Structure)

### Project Structure Notes

- **New Files:**
  - `tailwind.config.ts` (or update existing)
  - `src/styles/design-tokens.css`
  - `src/components/ui/button.tsx` (Shadcn UI)
  - `src/components/ui/input.tsx` (Shadcn UI)
  - `src/components/ui/textarea.tsx` (Shadcn UI)
  - `src/components/ui/card.tsx` (Shadcn UI)
  - `src/components/ui/dialog.tsx` (Shadcn UI)
  - `src/components/ui/badge.tsx` (Shadcn UI)
  - `src/components/ui/toast.tsx` (Shadcn UI)
  - `src/components/ui/calendar.tsx` (Shadcn UI)
- **Modified Files:**
  - `app/globals.css` (import design-tokens.css)
  - `README.md` (add design system documentation section)
- **Dependencies:** Already installed in Story 1.1 (Tailwind CSS, Shadcn UI dependencies)

### Learnings from Previous Story

**From Story 1.7 (Status: done)**

Story 1.7 successfully set up CI/CD pipeline with GitHub Actions. Key context for Story 1.8:

**New Files Created (relevant context):**
- ✅ `.github/workflows/ci.yml` - CI workflow runs ESLint and tests on every PR
- ✅ `.github/workflows/deploy.yml` - CD workflow for automated deployment
- ✅ `tests/e2e/smoke.spec.ts` - E2E smoke tests for critical paths

**Completion Notes:**
- ✅ CI/CD pipeline successfully implemented and reviewed
- ✅ All review findings resolved (rollback logic fixed, explicit coverage check added)
- ✅ PR checks block merge on ESLint errors, test failures, or coverage < 60%

**Relevant Context:**
- ✅ CI pipeline runs ESLint and tests on every PR
- ✅ Design token CSS and Tailwind config changes will be validated in CI
- ✅ Visual regression tests (if added) can be integrated into CI pipeline (P1)

**Implications for Story 1.8:**
- Design system setup should follow TypeScript strict mode (Story 1.1)
- Components should be testable (Story 1.4 test infrastructure ready)
- Design token CSS and Tailwind config files will be automatically validated in CI on every PR
- Unit tests for design tokens (Task 6) will run in CI pipeline

[Source: docs/sprint-artifacts/1-7-cicd-pipeline-setup-github-actions.md]

### References

- [Source: docs/epics/epic-1-foundation-development-infrastructure.md#story-18-frontend-design-system-setup-tailwind-config-shadcn-ui-design-tokens]
- [Source: docs/sprint-artifacts/tech-spec-epic-1.md#story-18-frontend-design-system-setup]
- [Source: docs/architecture.md#decision-summary] - Tailwind CSS v4, Shadcn UI decisions
- [Source: docs/architecture.md#project-structure] - Component directory structure (`src/components/ui/`)
- [Source: docs/architecture.md#testing-strategy] - Unit test guidance and coverage requirements
- [Source: docs/ux-design-specification.md#section-1-design-system-foundation] - Design System Foundation (Shadcn UI choice, component library)
- [Source: docs/ux-design-specification.md#section-3.2-color-palette] - Purple/Violet color palette (#a855f7)
- [Source: docs/ux-design-specification.md#section-3.3-typography] - Typography (Plus Jakarta Sans + Inter)

### Technical Notes

- **Shadcn UI Installation:** Use `npx shadcn-ui@latest init` if not already initialized in Story 1.1
- **Design Token Strategy:** CSS variables enable easy theme switching (light/dark mode future P1)
- **Color Palette:** Purple/Violet (#a855f7) as primary, following UX Design Specification Section 3.2
- **Typography:** Plus Jakarta Sans for headings (import from Google Fonts or self-hosted), Inter for body text
- **Responsive Breakpoints:** Follow Tailwind defaults (sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px)
- **Component Customization:** Shadcn UI components are fully customizable via Tailwind classes and CSS variables

### Testing Strategy

- **Unit Tests:** 
  - Design token CSS variables validation (parse CSS, verify all required variables exist)
  - Tailwind config validation (verify color palette, typography, spacing, breakpoints)
- **Visual Regression (P1):** Shadcn UI components render correctly with design tokens
- **Manual Testing:** 
  - Verify components render with correct colors (purple/violet palette)
  - Verify typography (Plus Jakarta Sans headings, Inter body)
  - Verify responsive breakpoints work
  - Verify design tokens are applied correctly

## Dev Agent Record

### Context Reference

- docs/sprint-artifacts/1-8-frontend-design-system-setup-tailwind-shadcn-design-tokens.context.xml

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List

## Change Log

- **2025-11-20:** Story drafted by SM agent (Bob) - YOLO mode, no elicitation
- **2025-11-20:** Story improved after validation - Enhanced "Learnings from Previous Story" section with Story 1.7 file list and completion notes, expanded References section with specific architecture documentation sections

