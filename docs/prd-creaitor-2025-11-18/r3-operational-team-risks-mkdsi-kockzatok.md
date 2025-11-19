# R3: Operational & Team Risks (Működési Kockázatok)

## R3.1. Development & Timeline Risks

| Kockázat | Impact | Valószínűség | Mitigation |
|----------|--------|--------------|------------|
| **Scope creep** (P1 featurek becsúsznak P0-ba) | 🟡 Közepes | 🔴 Magas | P0 scope lock; minden új ötletnél kontrollkérdés: „validálja-e H1/H2/H3-at?" Ha nem, P1 backlog; heti scope review |
| **Solo dev bottleneck** | 🔴 Magas | 🟡 Közepes | Tiszta kód (TS, kommentek), README + env dokumentáció; későbbi dev-onboarding felkészítése (minimális tudás-transzfer doksi) |
| **Technical debt felhalmozódás** | 🟡 Közepes | 🔴 Magas | Tudatos elfogadás P0-ban; TODO-k jelölése, P1 indulásakor 1–2 hét dedikált refactor-sprint beütemezése |

---

## R3.2. Support & Maintenance

| Kockázat | Impact | Valószínűség | Mitigation |
|----------|--------|--------------|------------|
| **Pilot user support overload** | 🟡 Közepes | 🟡 Közepes | Közös Slack/Discord csatorna; heti „office hours" slot(ok); FAQ/GYIK doksi folyamatos bővítése a visszatérő kérdésekből |
| **Bug-prioritás káosz** | 🟡 Közepes | 🟡 Közepes | Bug severity szintek: P0 (login, publish, data loss), P1 (UX irritáció), P2 (kozmetika); SLA: P0 24h, P1 3–5 nap, P2 backlog |

---
