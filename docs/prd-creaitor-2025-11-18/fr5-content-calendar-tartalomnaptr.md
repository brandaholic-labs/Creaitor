# FR5: Content Calendar - Tartalomnaptár

## FR5.1: Naptár Nézetek

**Heti nézet (P0):**

**Funkció:** Egy hét (Mon-Sun) poszt-slotjainak megjelenítése, brand-szinten.

**Input:**
- Brand ID
- Week start date (default: current week Monday)

**Output:**
- 7 nap lista (Mon-Sun)
- Minden napra poszt slotok (scheduled posts, draft posts)
- Poszt preview (text preview, platform, status, scheduled_at time)

**Üzleti szabályok:**
- Default: current week (hétfő-vasárnap)
- User választhat előző/következő hetet (prev/next week navigation)
- P0: csak 1 brand nézet egyszerre (nem multi-brand view)

**P1 - Havi nézet:**
- 30-31 nap grid nézet
- Összesített poszt count naponta

---

## FR5.2: Poszt Slotok és Státuszok

**Poszt státuszgép (P0):**

```
Draft → Approved → Scheduled → Published
  ↓                    ↓
Failed ←──────────────┘
  ↓
Draft (retry után)
```

| Státusz | Jelentés | Átmenetek | Ki indíthatja? |
|---------|----------|-----------|----------------|
| `draft` | Szerkesztés alatt | → `approved` (Approve gomb) | User |
| `approved` | Jóváhagyva, ütemezésre kész | → `scheduled` (Schedule gomb + időpont választás) | User |
| `scheduled` | Ütemezve, várja a publikálást | → `published` (auto, scheduled_at időpontban) / → `failed` (API hiba) | System |
| `published` | Sikeresen publikálva | (végállapot) | System |
| `failed` | Publikálás sikertelen | → `draft` (Retry gomb) / → `scheduled` (Retry + reschedule) | User |

**P0 megjegyzés:** Nincs `review` státusz (multi-user approval P1). P0-ban `draft` → `approved` ugyanaz a user csinálja (pseudo-approval - lásd FR0.2).

**P1 - Multi-user approval:**
```
Draft → Review → Approved → Scheduled → Published
  ↑       ↓
  └──── Rejected
```

---

## FR5.3: Scheduling Interface (Időpont Választás)

**P0 - Két opció (UX design dönt, melyiket építjük - lásd FR0.2):**

**Opció A: Drag & Drop**
- User húzza a draft posztot a naptár egy slotjára (nap + idő)
- Poszt automatikusan `scheduled` státuszba kerül
- Scheduled_at timestamp beállítódik

**Opció B: Manual Datetime Picker**
- User kattint "Schedule" gomb
- Datetime picker popup: dátum + időpont választás
- Poszt `scheduled` státuszba kerül

**Mindkettő validálja H2-t (workflow adoption).** UX design során eldöntjük, melyik egyszerűbb.

**P1:** Mindkettő támogatása (drag&drop + manuális override)

---
