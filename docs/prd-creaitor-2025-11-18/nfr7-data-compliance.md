# NFR7: Data & Compliance

## NFR7.1: Data Retention

**Retention policy (P0):**
- **User data:** Korlátlan (nincs auto-delete)
- **Post data:** Korlátlan
- **Event logs:** 12 hónap (után manuális törlés - manual script)
- **Backup:** 7 nap (daily backup, 7 nap retention)

**P0 megjegyzés:** Nincs GDPR "right to be forgotten" **automatizmus**. Ha user kéri → **manuális deletion** (7 napon belül - lásd NFR0.3).

**Manuális deletion folyamat (P0):**
1. User email-t küld: "Töröljétek az adataimat"
2. Admin (dev) manuálisan törli DB-ből:
   - User rekord + összes kapcsolódó adat (posts, brands, events - cascade delete)
   - Backup-ból is törlés (vagy jelzi user-nek: "7 napos backup retention, utána automatikus törlődik")
3. Confirmation email user-nek: "Adataid törölve"

**P1 - GDPR compliance:**
- User deletion self-service (user törli magát UI-ból, automatikus cascade delete)
- Data export self-service (user letölti saját adatait JSON-ban)
- Cookie consent banner
- Privacy policy + Terms of Service (lawyer-reviewed)

---

## NFR7.2: GDPR & Privacy

**P0 - Minimál GDPR baseline (lásd NFR0.3):**
- Email tárolás (login céljából - legitimate interest)
- Meta access token tárolás (titkosítva - user explicit consent OAuth flow-ban)
- Nincs analytics cookie (Google Analytics, Mixpanel - P0-ban nincs tracking)
- Nincs third-party tracking (Facebook Pixel, LinkedIn Insight Tag)
- Privacy policy (egyszerű, 1-2 oldal, magyar nyelven)
- Terms of Service (egyszerű, "use at your own risk" pilot disclaimer)

**P0 megjegyzés:** Pilot során nincs GDPR audit. Ha user kérdez → manuális válasz (email, Slack).

**P1 - GDPR-ready:**
- Cookie banner (Cookiebot, OneTrust - consent management)
- Privacy policy (lawyer-reviewed, angol + magyar)
- Data Processing Agreement (DPA) template ügynökségeknek
- Audit trail (user data hozzáférés naplózása - ki, mikor, mit nézett meg)
- Automatikus right-to-be-forgotten

---
