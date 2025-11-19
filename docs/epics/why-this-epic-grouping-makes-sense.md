# Why This Epic Grouping Makes Sense

**1. Foundation First (Epic 1)**
- Greenfield project requirement: establish infrastructure before feature development
- Enables all subsequent work: CI/CD, deployment, test framework, monitoring
- One-time investment with long-term velocity benefits

**2. Auth Before Features (Epic 2)**
- Multi-tenancy is core differentiator (agency-first positioning)
- RLS-based isolation critical for data security (pilot confidence)
- User management needed before brand management

**3. Brand Brain Before AI (Epic 3 → Epic 4)**
- AI Copy Studio depends on Brand Brain context (cannot generate without brand TOV/examples)
- Meta OAuth integration logical with Brand setup (both are "brand onboarding")
- Epic 3 delivers H1 validation infrastructure (Brand Brain v1 quality)

**4. Calendar as Workflow Hub (Epic 5)**
- Independent from AI generation (can be built in parallel)
- Central UI for H2 validation ("fő gyártóhely" adoption)
- Posts need calendar slots before scheduling/publishing

**5. Publishing Brings It Together (Epic 6)**
- Integration epic: combines AI generation (Epic 4) + Calendar (Epic 5)
- BullMQ job queue needs established post model (Epic 5)
- Meta Graph API publishing is the final value delivery

**6. Analytics Cross-Cuts (Epic 7)**
- Instruments all epics (rating in Epic 4, events in Epic 2-6)
- Enables data-driven hypothesis validation (H1, H2, H3)
- Can be incrementally integrated across sprints

**Business Value Sequencing:**
- Epic 1-3: Foundation + Core setup (no user-facing value yet, but critical)
- Epic 4: First major user value (AI content generation)
- Epic 5: Second major value (workflow organization)
- Epic 6: Complete value chain (end-to-end: generate → schedule → publish)
- Epic 7: Validation & measurement (prove MVP success)

---

