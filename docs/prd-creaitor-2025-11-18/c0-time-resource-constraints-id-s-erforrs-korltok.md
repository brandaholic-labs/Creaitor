# C0: Time & Resource Constraints (Idő és Erőforrás Korlátok)

| ID | Constraint | Consequence | Mitigation |
|----|-----------|-------------|------------|
| **C0.1** | **Pilot timeline: 4-6 hét** (dev + user onboarding + mérés) | Hard deadline → scope ruthless prioritization, P0-nice elhagyható | Weekly scope review, P0-core vs. P0-nice döntések |
| **C0.2** | **Solo developer (1 fő full-time)** | Bottleneck, nincs backup → velocity limit | Clean code (TS, comments), dokumentáció (README, env setup) |
| **C0.3** | **Pilot user base: 3-5 ügynökség, 8-10 socialos** (nem több) | Limitált sample size → statistical significance kicsi | Kvalitatív mélység kompenzál (mélyebb interjúk, baseline mérés) |
| **C0.4** | **Support bandwidth: ~5-10 óra/hét** (office hours, Slack) | Nem lehet 24/7 support → user expectations management | Office hours scheduling, FAQ doksi, közösségi Slack csatorna |
| **C0.5** | **Feature freeze 3. hét végén** (4-6. hét csak tuning/bugfix/measurement) | Új feature P0-ba nem kerülhet be → scope lock | Explicit communication: "P0 scope locked, P1 backlog nyílik" |

---
