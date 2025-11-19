# FR1: Multi-Tenant Alaprendszer

## FR1.1: Ügynökség Regisztráció és Profil

**Funkció:** Ügynökség (Agency) létrehozása és user account setup.

**Input:**
- Email cím (unique)
- Jelszó (min. 8 karakter)
- Ügynökség név (kötelező, max. 100 karakter)
- Ügynökség leírás (opcionális, max. 500 karakter)

**Output:**
- Ügynökség létrehozva (Agency ID generálva)
- User account létrehozva (Admin role, owner státusz)
- User session (login state)

**Validációs szabályok (P0):**
- Email formátum: alapvető regex (pl. `.+@.+\..+`)
- Email unique constraint (duplikált email → error)
- Jelszó minimum hossz: 8 karakter
- Ügynökség név kötelező

**P1 - Bővített validáció:**
- Jelszó erősség (kis/nagy betű, szám, speciális karakter)
- Email domain blacklist (disposable email kiszűrése)
- Ügynökség további mezők (cím, VAT szám, billing info)

---

## FR1.2: User Management (User Meghívás és Jogosultságok)

**Funkció:** Új user meghívása az ügynökségbe (team collaboration).

**User Meghívás Flow:**

**Input:**
- Email cím (meghívandó user)
- Role (opcionális - P0-ban minden user `socialos`)

**Output:**
- Meghívó email elküldve
- Pending user rekord létrehozva (státusz: `pending`)
- Invite link generálva (unique token, 7 nap lejárat)

**Invite Link Aktiválás:**

**Input:**
- Invite token (URL paraméter)
- Jelszó (user választja)

**Output:**
- User aktiválva (státusz: `pending` → `active`)
- User hozzáadva az ügynökséghez
- User session (login state)

**Validációs szabályok (P0):**
- Invite link 7 napig érvényes (timestamp check)
- Egy user csak 1 ügynökséghez tartozhat (P0 - single-tenant user modell)
- Ha link lejárt → error: „Meghívó link lejárt. Kérj új meghívót!"

**Jogosultságok (P0 - egyszerű):**
- **Admin (owner):** Minden funkció
- **Socialos (meghívott user):** Minden funkció (P0-ban nincs megkülönböztetés)

**P0 megjegyzés:** MVP-ben nincs finomhangolt jogosultság-kezelés. Minden user ugyanabban az ügynökségben mindent lát és csinálhat. Ez elég 5-10 pilot ügynökséghez (kis csapatok, magas bizalmi szint).

**P1 - Fine-grained permissions:**
- Szerepkörök: Admin, Editor, Viewer
- Brand-specifikus jogosultságok (user csak egyes márkákat láthat/szerkeszthet)
- Approval chain szintek (ki approve-olhat, ki publish-olhat)

---

## FR1.3: Márka (Brand) Management

**Funkció:** Brand létrehozása, Meta (FB/IG) profil csatolása, Brand adatok kezelése.

**Brand Létrehozás:**

**Input:**
- Márka név (kötelező, max. 100 karakter)
- Márka leírás (opcionális, max. 500 karakter)

**Output:**
- Brand létrehozva (Brand ID generálva)
- Brand Brain üres JSON inicializálva (default empty)
- Brand hozzárendelve az ügynökséghez (agency_id FK)

**Meta OAuth Flow (FB Page / IG Account csatolás):**

**Funkció:** Facebook Page és/vagy Instagram Business Account csatolása a márkához.

**Input:**
- Brand ID
- Meta OAuth authorization code (OAuth flow után)

**Output:**
- FB Page ID, FB Page név, FB access token tárolva (encrypted)
- IG Account ID, IG username, IG access token tárolva (encrypted)
- Token expiry timestamp tárolva (60 nap múlva)

**Üzleti szabályok (P0):**
- Márka publisholhat, ha **legalább 1 platform csatolva** (FB Page VAGY IG Account)
- Ha mindkettő csatolva → user választhat poszt létrehozáskor, melyik platformra megy
- Token lejárat: Ha Meta API 401/403 → user újra OAuth (Re-connect gomb)
- Márka archiválás: Logikai törlés (archived_at timestamp set), adat megmarad (nem hard delete)

**P1 - Bővített funkciók:**
- Meta token auto-refresh (long-lived token management)
- Márka státuszok (Active / Paused / Archived)
- Márka csoportosítás / tagging (pl. "Horeca", "E-commerce", "B2B")

---
