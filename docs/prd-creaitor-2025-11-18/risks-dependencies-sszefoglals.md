# Risks & Dependencies Összefoglalás

**Kiemelt killer riskek:**
1. **Meta Graph API instabilitás / policy-változás** → publishing leáll → a validáció fókusza áthelyezendő AI + Calendar irányba.
2. **H1–H3 hipotézisek bukása** → tudatos döntés: iterációs sprint vagy pivot/stop.
3. **Pilot recruitment / pilot design hibák** → fals PMF jel, ami rossz stratégiai döntéshez vezethet.

**Elfogadott P0 kompromisszumok:**
- 95% uptime, manual retry, monolit architektúra, desktop-only UI, limited security hardening – mindez pilot célú validációért cserébe.
- Technical debt tudatosan gyűlik, P1 elején refactor-sprinttel kezelendő.

**P0 → P1 átmenet feltétele:**
- H1–H3 legalább részben validált (usable AI output, mérhető időmegtakarítás, használati gyakoriság),
- ≥2–3 ügynökségi pilot user, akik nem csak szeretik, de **fizetnének is érte**,
- és a fenti killer-risk triggerek közül egyik sem aktív (vagy már kezelt állapotban van).

---
