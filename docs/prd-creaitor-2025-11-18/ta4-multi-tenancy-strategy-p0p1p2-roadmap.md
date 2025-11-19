# TA4: Multi-Tenancy Strategy (P0/P1/P2 Roadmap)

> **Tudatos, lépcsőzetes terv** - nem ad-hoc megoldás.

## TA4.1: P0 - Application-Level Row Isolation

**Stratégia:** Minden query `agencyId` filter-rel (app-rétű izolálás).

**Implementation pattern:**

```typescript
// Middleware - Agency Access Check (P0 - optimalizált)
async function checkAgencyAccess(req, res, next) {
  const { brandId } = req.params;
  const userId = req.session.userId;

  // 1. Get user's agencyId (session-ből vagy DB-ből)
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { agencyId: true }
  });

  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // 2. Get brand's agencyId (1 query, ne töltsünk user listát!)
  const brand = await prisma.brand.findUnique({
    where: { id: brandId },
    select: { agencyId: true }
  });

  if (!brand) {
    return res.status(404).json({ error: "Brand not found" });
  }

  // 3. Check match
  if (user.agencyId !== brand.agencyId) {
    return res.status(403).json({ error: "Forbidden - wrong agency" });
  }

  // 4. Attach agencyId to request (later queries can use this)
  req.agencyId = user.agencyId;

  next();
}
```

**FONTOS - P0 optimalizálás:**
- ❌ **NE:** `brand.agency.users.some(...)` → teljes user lista fetch (N+1 query, lassú)
- ✅ **IGEN:** `user.agencyId === brand.agencyId` → egyszerű ID match (gyors, 2 query)

**Query pattern (minden brand/post lekérdezésnél):**
```typescript
// Example: List brands for agency
async function getUserBrands(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { agencyId: true }
  });

  return prisma.brand.findMany({
    where: { agencyId: user.agencyId, archived_at: null }
  });
}
```

**Kockázatok (P0):**
- ❌ **Nincs DB-szintű védelem:** Ha elfelejtünk `agencyId` filter-t → tenant isolation sérül
- ❌ **Manuális minden query-nél:** Developer error-prone

**Mitigálás (P0):**
- Code review (minden query ellenőrzés)
- Testing (multi-agency test case-ek)

---

## TA4.2: P1 - Database-Level Row-Level Security (RLS)

**Stratégia:** PostgreSQL RLS policy + app-layer filter kombinálva.

**PostgreSQL RLS policy example (P1):**
```sql
-- Enable RLS on Brand table
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;

-- Policy: user csak saját agency brand-jeit látja
CREATE POLICY agency_isolation_policy ON brands
  FOR ALL
  USING (agency_id = current_setting('app.current_agency_id')::uuid);
```

**App-layer set agency context:**
```typescript
// Set session variable before queries
await prisma.$executeRaw`SET app.current_agency_id = ${user.agencyId}`;
```

**Előny:**
- ✅ DB-szintű védelem (még ha app-layer filter elfelejt is → RLS policy blokkol)
- ✅ Defense in depth

**Hátrány:**
- Bonyolultabb setup
- Session variable management (Prisma-val nem triviális)

---

## TA4.3: P2 - Schema-Per-Tenant (Enterprise)

**Stratégia:** Külön PostgreSQL schema / database per agency.

**Előny:**
- ✅ Teljes izolálás (performance + security)
- ✅ Enterprise compliance (SOC2, ISO27001)

**Hátrány:**
- Nagyon komplex (migration, backup, monitoring per-tenant)
- Csak nagy enterprise use case-nél érdemes

**P0/P1:** Nem releváns.

---
