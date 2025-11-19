# R1: Technical Risks (Technikai Kockázatok)

## R1.1. Third-Party API Dependency Risks

**Meta / AI / egyéb külső szolgáltatók**

| Kockázat | Impact | Valószínűség | Mitigation (P0) | P1 bővítés | Learning-first fallback |
|----------|--------|--------------|-----------------|------------|------------------------|
| **Meta Graph API verzióváltás** (v18 → v19, breaking change) | 🔴 Magas – publishing leáll | 🟡 Közepes | - API version pinning (v18 fixálás)<br>- Meta Developer Newsletter, changelog követés | Migráció staging app-pal, automata smoke tesztek | Ha 1–2 hétig instabil: pilot fókusz AI + Calendar validációra, publishing workflow manuális (Meta Business Suite) |
| **Meta token expire** (60 nap, auto-refresh nélkül) | 🟡 Közepes – usernek újra OAuth | 🔴 Magas | - Egyértelmű hibaüzenet: „Token lejárt, csatold újra a profilt"<br>- Token lejárat naplózása | Auto-refresh mechanizmus, lejárat előtti email | Token issue esetén: a pilotban a publikálás min. 1 márkán manuálisan, hogy usage ne álljon le teljesen |
| **Meta rate limit** (200 call/h fölött) | 🟡 Közepes – késő publikálás | 🟢 Alacsony (5–10 user alatt) | - Hibaüzenet + manual retry útmutatás | Queue + call counting, backoff | Ha limitet eléritek: átmeneti „publishing window"-ok definiálása, pilot tanulási fókusz: AI + Calendar |
| **OpenAI/Anthropic downtime** | 🟡 Közepes – AI nem generál | 🟢 Alacsony | - 30s timeout, 1x retry, tiszta hibaüzenet | Dual-provider fallback (OpenAI ↔ Anthropic) | AI nélkül is mérni: hány user használja csak a naptár + szerkesztő flow-t, manuális copyval |
| **OpenAI/Anthropic pricing spike** | 🟡 Közepes – Opex nő | 🟡 Közepes | - Havi API-költség monitor<br>- Budget cap (pl. 100–200 USD/hó pilot) | Modell-váltás, tokencsökkentés, finomabban targetelt promptok | Ha cost elszalad: modell downgrade (olcsóbb modellek), de továbbra is mérni kell a usability-ratinget |

**Összefoglalás:**
Meta a fő technikai single point of failure. A P0 stratégia:
– **nem a teljes technikai kockázat kiiktatása**, hanem
– **biztosítani, hogy publishing nélküli hetekben is tudj PMF-et tanulni** (AI + Calendar + workflow adoption).

---

## R1.2. Infrastructure & Deployment Risks

| Kockázat | Impact | Valószínűség | Mitigation (P0) | P1 bővítés |
|----------|--------|--------------|-----------------|------------|
| **Render/Railway downtime** | 🔴 Magas – app nem elérhető | 🟢 Alacsony | - Elfogadott 95% uptime<br>- Downtime esetén kommunikáció pilottal (Slack/Email)<br>- Kritikus demo időpontok előtt manuális health check | Multi-region deployment, status page |
| **PostgreSQL data loss / backup hiba** | 🔴 Magas – adatvesztés | 🟢 Alacsony | - Managed DB daily backup<br>- Heti 1 manuális restore-teszt (pl. külön DB-be) | Hourly backup, PITR, multi-region |
| **Env leak** (.env commit) | 🔴 Magas – API key szivárgás | 🟡 Közepes | - .env gitignore, .env.example<br>- Dev folyamat része: commit előtti ellenőrzés | Secret scanning (GitHub), secrets manager |
| **Deploy failure** (build error, crash) | 🟡 Közepes | 🟡 Közepes | - Minden deploy után manuális smoke test (login, AI generálás, 1 test publish) | CI/CD + automatizált E2E smoke tesztek, rollback |

---

## R1.3. Data Security & Privacy Risks

| Kockázat | Impact | Valószínűség | Mitigation (P0) | P1 bővítés |
|----------|--------|--------------|-----------------|------------|
| **Meta access token kompromittálódása** | 🔴 Magas – spam poszt publikálható | 🟢 Alacsony | - Column-level encryption (AES-256)<br>- Token scope minimalizálása | Secrets manager, token rotation, audit log |
| **Password brute-force** | 🟡 Közepes | 🟢 Alacsony | - Bcrypt (cost 12), erős jelszó policy | Login rate limiting, CAPTCHA, 2FA |
| **SQL injection** | 🔴 Magas | 🟢 Alacsony | - Prisma ORM, prepared statements<br>- Zod validation minden inputra | Extra security review, penetration test |
| **XSS** (poszt szöveg, TOV, brand név) | 🟡 Közepes | 🟢 Alacsony | - React auto-escape<br>- HTML tag-ek strip TOV/brand mezőkben | Szigorúbb sanitization, security header hardening |

**P0 konklúzió:** security „elég jó" egy kis létszámú, ismert pilot user-csapatnak. P1-ben jön a hardening (2FA, audit log, security audit).

---
