# NFR0: Pilot Baseline & Scale Assumptions

> **Konzisztens skála-definíció** a sikerkritériumokkal és FR-ekkel összhangban.

## NFR0.1: Pilot Célzott Terhelés (4-6 hetes pilot)

**Ügynökség szám (target):**
- **Minimum (continue threshold):** 5 aktív ügynökség
- **Target (sikeres pilot):** 8-10 aktív ügynökség
- **Stretch:** 12+ ügynökség

**Márka / ügynökség (target):**
- **Minimum:** 3 márka / ügynökség
- **Target:** 5+ márka / ügynökség
- **Stretch:** 8+ márka / ügynökség

**Összes user (target):**
- **Minimum:** 10-15 aktív user (5 ügynökség × 2-3 user)
- **Target:** 20-30 aktív user (8-10 ügynökség × 2-3 user)
- **Stretch:** 40+ user (12 ügynökség × 3-4 user)

**Összes márka (target):**
- **Minimum:** 15-25 márka (5 ügynökség × 3-5 márka)
- **Target:** 40-50 márka (8-10 ügynökség × 5 márka)
- **Stretch:** 80+ márka (12 ügynökség × 8 márka)

**Összes poszt (4-6 hetes pilot):**
- **Minimum:** 500-800 poszt (5 ügynökség × 3 márka × 6 poszt/hét × 4-6 hét)
- **Target:** 1500-2000 poszt (8-10 ügynökség × 5 márka × 6 poszt/hét × 4-6 hét)
- **Stretch:** 3000+ poszt (12 ügynökség × 8 márka × 6 poszt/hét × 6 hét)

**Miért fontos ez:**
- A sikerkritériumokban 8-10 ügynökség a target → az infra-követelményeknek ezt kell biztonsággal kiszolgálni
- Ha csak 1-3 ügynökségre tervezünk → alultesztelt PMF, skálázási problémák később

---

## NFR0.2: Multi-Tenant Architektúra Tisztázás

**Logikailag multi-tenant:**
- ✅ Adatmodell: Agency → User → Brand → Post (lásd FR9)
- ✅ Agency-level isolation (user csak saját agency adatait látja)
- ✅ Minden query agency_id filter-rel

**Fizikailag single-server deployment (P0):**
- ✅ Egyetlen szerver instance (Render / Railway managed deployment)
- ✅ Egyetlen PostgreSQL instance (Render managed DB)
- ❌ Nincs load balancer, nincs multi-region, nincs horizontal scaling

**Miért ez az architektúra:**
- Logikai multi-tenancy → validálja a termékkoncepciót (agency-first modell)
- Fizikai single-server → gyors MVP fejlesztés, alacsony költség pilot alatt
- P1 skálázás (100+ user): horizontal scaling, read replicas, stb.

---

## NFR0.3: Security & Privacy Baseline (Nem Alkudozható - P0)

> **Alapvető biztonsági minimum**, amit **pilot alatt sem engedhetünk el**. Ezek nélkül jogi és bizalmi kockázat van.

**Kötelező P0 (pilot alatt is):**
- ✅ **HTTPS mindenhol** (SSL/TLS certificate: Let's Encrypt)
- ✅ **Meta access token encryption** (database column-level encryption, AES-256)
- ✅ **Jelszó hashing** (bcrypt, cost 12)
- ✅ **Session security** (HTTP-only cookie, secure flag, 7 nap expiry)
- ✅ **Manuális "right to be forgotten" folyamat** (ha user kéri → 7 napon belül teljes adat törlés DB-ből + backup policy jelzése)
- ✅ **Minimál GDPR compliance:**
  - User data csak amennyi feltétlenül kell (email, password hash, poszt tartalom)
  - Nincs third-party analytics tracking (Google Analytics, Mixpanel) P0-ban
  - Privacy policy + Terms of Service (egyszerű, lawyer-reviewed)

**P1 - Full GDPR-ready:**
- Cookie consent banner (Cookiebot, OneTrust)
- Data export self-service (user letöltheti saját adatait JSON-ban)
- Data Processing Agreement (DPA) template ügynökségeknek
- Audit trail (ki, mikor, mit ért el)
- Automatikus right-to-be-forgotten (user törli magát UI-ból)

**Miért fontos ez már P0-ban:**
- Éles ügyfélmárkák FB/IG kezelését adják a rendszerre → bizalmi kérdés
- Bármi security incident (token leak, hibás publikálás) → "Ez nem megbízható" → project fail
- Magyar/CEE ügynökségek gyakran kérdezik: "GDPR-compliant?"

---

## NFR0.4: Jelszó Policy (Konzisztens FR-rel)

**Egységes policy (FR1.1 és NFR2.1 konzisztens):**
- Minimum 12 karakter
- Min. 1 nagybetű
- Min. 1 szám
- Speciális karakter: nem kötelező P0-ban (P1: min. 1 speciális karakter)

**Validáció:**
- Frontend: real-time feedback (jelszó erősség vizualizáció - P1)
- Backend: validációs szabály (ha nem felel meg → error message)

**Hashing:**
- bcrypt (cost 12)
- P1: Argon2id (modern, erősebb)

**Password reset:**
- Email-based token (1 órás expiry, egyszer használható)
- Link formátum: `https://creaitor.app/reset-password?token={uuid}`

---
