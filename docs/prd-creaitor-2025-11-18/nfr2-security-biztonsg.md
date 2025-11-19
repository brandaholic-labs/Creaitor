# NFR2: Security (Biztonság)

## NFR2.1: Authentication & Authorization

**Authentication (P0):**
- Email/password alapú bejelentkezés
- Jelszó policy: **min. 12 karakter, min. 1 nagybetű, min. 1 szám** (lásd NFR0.4)
- Hashing: bcrypt (cost 12)
- Session: HTTP-only cookie, secure flag, SameSite=Lax, 7 nap expiry
- P1: 2FA (TOTP alapú, Google Authenticator)

**Authorization (P0):**
- Agency-level isolation (user csak saját agency adatait látja - agency_id filter minden query-ben)
- User-level permission: P0-ban egyszerű (minden user = socialos, minden funkció elérhető)
- P1: Fine-grained permissions (Admin / Editor / Viewer role, brand-level access control)

**Password Reset (P0):**
- Email-based token (1 órás expiry, egyszer használható)
- Token formátum: UUID v4 (crypto.randomUUID())
- Email service: SendGrid / Mailgun (transactional email)

**Brute force védelem:**
- P0: Nincs explicit rate limiting (bcrypt cost 12 lassít)
- P1: Rate limiting (max. 5 login attempt / 15 perc / IP cím), CAPTCHA

---

## NFR2.2: Data Protection

**Adatbiztonság (P0 - lásd NFR0.3):**

| Adat Típus | P0 Védelem | P1 Bővítés |
|------------|------------|------------|
| **Jelszó** | bcrypt hash (cost 12) | Argon2id |
| **Meta Access Token** | Database column-level encryption (AES-256) | Secrets manager (AWS Secrets Manager, Vault) |
| **Brand Brain JSON** | Nincs külön titkosítás (nem érzékeny adat) | - |
| **User Email** | Nincs titkosítás (szükséges login-hez, unique constraint) | - |
| **Session Token** | HTTP-only cookie (client nem látja JavaScript-ből) | Redis-based session store (P1) |

**HTTPS (P0 - kötelező):**
- SSL/TLS certificate (Let's Encrypt auto-renewal)
- Minden API endpoint HTTPS-only (HTTP request → redirect to HTTPS)
- Nincs HTTP fallback

**P0 megjegyzés:** Nincs SOC2, ISO27001 audit. Pilot fázisban nem szükséges, de **alapvető security mandatory** (HTTPS, token encryption).

---

## NFR2.3: API Security

**Meta OAuth Token tárolás (P0):**
- Access token encrypted (AES-256, database column encryption)
- Token expiry tracking (60 nap után lejár)
- Ha token kompromittálódik / lejár → user újra OAuth flow (Re-connect gomb Brand settings-ben)
- P1: Token refresh automatizálás, email reminder 7 nappal lejárat előtt

**SQL Injection védelem (P0):**
- ORM használat (Prisma, TypeORM, Sequelize) → prepared statements automatic
- Input validation (Zod schema minden API endpoint-nál)
- Nincs raw SQL query user input-tal (ha mégis → parameterized query)

**XSS védelem (P0):**
- Input sanitization (post text, brand name, TOV fields)
- React JSX auto-escape (default XSS védelem)
- Content Security Policy (CSP) header (P1)

**CSRF védelem (P0):**
- CSRF token (form submission minden POST/PUT/DELETE request-nél)
- SameSite cookie flag (SameSite=Lax)

**P1 - Audit Log:**
- Minden kritikus művelet naplózása (user login, brand deletion, token refresh, post publish)
- Retention: 12 hónap
- Admin dashboard: ki, mit, mikor csinált

---
