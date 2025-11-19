# FR Coverage Map

Ez a táblázat megmutatja, hogy minden funkcionális követelmény (FR) mely epic(ek)ben van lefedve:

| FR | Követelmény | Epic(ek) | Megjegyzés |
|-----|------------|----------|------------|
| **FR0.1** | Brand Brain Baseline Szabályok | Epic 3 | Brand Brain minimum validation (min. 1 példaposzt, min. 100 char TOV) |
| **FR0.2** | P0 Scope Döntések | Epic 1 | Architectural decisions, feature prioritization |
| **FR0.3** | Usability Rating Kezelés (MANDATORY) | Epic 4, Epic 7 | Rating integration in AI Copy Studio, aggregation in Analytics |
| **FR0.4** | Concurrency & Multi-User Szabályok | Epic 2 | Last-write-wins model, no real-time collab P0 |
| **FR0.5** | Meta Publishing Szabályok | Epic 6 | Token management, Instagram single-image only |
| **FR1.1** | Ügynökség Regisztráció és Profil | Epic 2 | Agency account setup, onboarding |
| **FR1.2** | User Management | Epic 2 | User invites, jogosultságok (Admin vs Editor) |
| **FR1.3** | Márka (Brand) Management | Epic 3 | Brand CRUD, Meta profile csatolás, archiválás |
| **FR2.1** | Brand Brain Adatmodell | Epic 3 | Példaposztok, TOV, key messages, vizuális irány, brand assets |
| **FR2.2** | Brand Brain CRUD Műveletek | Epic 3 | Create, update, view, validate minimum baseline |
| **FR3.1** | Poszt Generálás Flow | Epic 4 | Brief input, AI hívás, multi-variant output, streaming, platform választás |
| **FR3.2** | Poszt Szerkesztés és Mentés | Epic 4 | Inline szerkesztő, karakter számláló, regenerálás, draft mentés, usability rating |
| **FR4.1** | Saját Kép Feltöltés | Epic 4 | Upload, validation max 10MB, format support JPG/PNG/GIF, Supabase Storage |
| **FR5.1** | Naptár Nézetek | Epic 5 | Heti nézet P0, havi nézet P1, brand filter |
| **FR5.2** | Poszt Slotok és Státuszok | Epic 5 | Draft → review → approved → scheduled → published státuszgép |
| **FR5.3** | Scheduling Interface | Epic 5 | Időpont választás, drag&drop/dátum picker, timezone kezelés Europe/Budapest |
| **FR6.1** | Pseudo-Approval (P0) | Epic 6 | Self-approval, draft → ready to publish gomb, approved státusz |
| **FR7.1** | Meta Platform Publishing (P0) | Epic 6 | Meta OAuth, FB Page + IG Account publish, immediate vs scheduled, rate limit |
| **FR7.2** | Scheduling Mechanizmus (P0) | Epic 6 | BullMQ job queue, timezone UTC tárolás, retry logic, publish execution |
| **FR7.3** | Publikálás Eredménye (P0) | Epic 6 | Success/failure státusz, Meta response tárolás, user notification, manual retry |
| **FR8.1** | Backend Event Logging (P0) | Epic 7 | Winston logging, user events, AI hívások, publish events, error logging |
| **FR8.2** | Használhatósági Rating Aggregáció | Epic 7 | Rating adatok tárolása, aggregált statisztikák brand-enként, pilot metrikák |
| **FR9** | Data Model Summary | Epic 1, Epic 2, Epic 3, Epic 5 | Core entities: Agencies, Users, Brands, Social Profiles, Brand Brain, Posts, Events |

**Coverage Summary:**
- ✅ **Epic 1:** Foundation - FR0.2, FR9 (partial: infrastructure for all entities)
- ✅ **Epic 2:** Auth & Multi-Tenant - FR0.4, FR1.1, FR1.2, FR9 (partial: agencies, users)
- ✅ **Epic 3:** Brand & Brand Brain - FR0.1, FR1.3, FR2.1, FR2.2, FR9 (partial: brands, brand_brain_entries)
- ✅ **Epic 4:** AI Content Generation - FR0.3 (partial), FR3.1, FR3.2, FR4.1
- ✅ **Epic 5:** Calendar & Scheduling - FR5.1, FR5.2, FR5.3, FR9 (partial: posts)
- ✅ **Epic 6:** Approval & Publishing - FR0.5, FR6.1, FR7.1, FR7.2, FR7.3
- ✅ **Epic 7:** Analytics & Instrumentation - FR0.3 (partial), FR8.1, FR8.2, FR9 (partial: usage_events)

**Validation:** ✅ Minden FR (FR0-FR9) le van fedve legalább egy epic-ben.

---
