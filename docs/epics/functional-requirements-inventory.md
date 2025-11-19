# Functional Requirements Inventory

A PRD alapján az alábbi funkcionális követelmények (FR) megvalósítása szükséges az MVP-ben:

## FR0: Cross-Feature Assumptions & Rules
Globális feltételek és döntési pontok, amik több feature-re is hatással vannak:
- **FR0.1:** Brand Brain Baseline Szabályok (min. 1 példaposzt, min. 100 char TOV)
- **FR0.2:** P0 Scope Döntések (Feature prioritás tisztázás)
- **FR0.3:** Usability Rating Kezelés (MANDATORY minden AI-generált poszt mentésekor)
- **FR0.4:** Concurrency & Multi-User Szabályok (Last-write-wins, no real-time collab P0-ban)
- **FR0.5:** Meta Publishing Szabályok (Token management, Instagram single-image only)

## FR1: Multi-Tenant Alaprendszer
Multi-tenant SaaS alapstruktúra ügynökségi használatra:
- **FR1.1:** Ügynökség Regisztráció és Profil (agency account setup, onboarding)
- **FR1.2:** User Management (user meghívás, jogosultságok: Admin vs Editor)
- **FR1.3:** Márka (Brand) Management (brand CRUD, Meta profile csatolás, archiválás)

## FR2: Brand Brain v1 - Márka Tudásbázis
Strukturált márka-specifikus kontextus tárolása AI generáláshoz:
- **FR2.1:** Brand Brain Adatmodell (példaposztok, TOV, key messages, vizuális irány, brand assets)
- **FR2.2:** Brand Brain CRUD Műveletek (create, update, view, validate minimum baseline)

## FR3: AI Copy Studio - Szöveggenerálás
AI-alapú poszt szöveg generálás Brand Brain kontextussal:
- **FR3.1:** Poszt Generálás Flow (brief input, AI hívás, multi-variant output, streaming, platform választás FB/IG)
- **FR3.2:** Poszt Szerkesztés és Mentés (inline szerkesztő, karakter számláló, regenerálás, draft mentés, usability rating)

## FR4: Image Management (Kép kezelés)
Kép feltöltés és kezelés posztokhoz:
- **FR4.1:** Saját Kép Feltöltés (upload, validation max 10MB, format támogatás JPG/PNG/GIF, Supabase Storage, URL visszaadás)

## FR5: Content Calendar - Tartalomnaptár
Heti/havi naptár FB+IG slotokkal, státuszokkal:
- **FR5.1:** Naptár Nézetek (heti nézet P0, havi nézet P1, brand filter)
- **FR5.2:** Poszt Slotok és Státuszok (draft → review → approved → scheduled → published státuszgép)
- **FR5.3:** Scheduling Interface (időpont választás, drag&drop vagy dátum picker, timezone kezelés Europe/Budapest)

## FR6: Approval Workflow
Jóváhagyási folyamat posztokhoz:
- **FR6.1:** Pseudo-Approval (P0) (self-approval, draft → ready to publish gomb, approved státusz)

## FR7: Publishing & Scheduling
Meta Graph API integráció FB/IG publishing-hoz:
- **FR7.1:** Meta Platform Publishing (P0) (Meta OAuth, FB Page publish, IG Account publish, immediate vs scheduled, rate limit kezelés)
- **FR7.2:** Scheduling Mechanizmus (P0) (BullMQ job queue, timezone UTC tárolás, retry logic, publish időpontban job execution)
- **FR7.3:** Publikálás Eredménye (P0) (success/failure státusz, Meta response tárolás, user notification, manual retry opció)

## FR8: Instrumentation & Usage Tracking
Kötelező usage tracking és usability rating gyűjtés:
- **FR8.1:** Backend Event Logging (P0) (Winston logging, user events, AI hívások, publish events, error logging)
- **FR8.2:** Használhatósági Rating Aggregáció (P0) (rating adatok tárolása, aggregált statisztikák brand-enként, pilot métrákhoz használat)

## FR9: Data Model Summary (P0 Core Entities)
Core adatbázis struktúra:
- Agencies, Users, Brands, Social Profiles
- Brand Brain Entries
- Posts (draft, review, approved, scheduled, published)
- Usage Events

**Összesen:** 9 fő funkcionális terület (FR0-FR8) + Data Model (FR9)

---
