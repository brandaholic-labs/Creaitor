# Technical Architecture (Technikai Architektúra)

> **Architecture filozófia (P0):** Egyszerű, monolitikus architektúra - minimális stack complexity, gyors fejlesztés, kevés mozgó alkatrész. **Nem** microservices, **nem** over-engineered.

**FONTOS:** Ez a szekció NEM teljes implementációs guide (az a Tech Spec dokumentumba tartozik). Ez:
- **Magas szintű architektúra** (komponensek, adatfolyam)
- **Stack döntések** (P0-core: mandatory, P0-nice: opcionális)
- **Adatmodell summary** (single source of truth)
- **Multi-tenancy stratégia** (P0/P1/P2 terv)

---
