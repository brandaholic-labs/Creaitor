# FR6: Approval Workflow

## FR6.1: Pseudo-Approval (P0)

**Funkció:** Egyszerű self-approval flow, workflow átmenet tesztelése céljából.

**Flow:**
1. User létrehoz/szerkeszt posztot → `draft`
2. User kattint "Approve" gomb → `approved`
3. User választ scheduled_at időpontot (datetime picker / drag&drop) → `scheduled`

**Üzleti szabály (P0):**
- **Nincs ellenőrzés**, hogy ki approve-olja (ugyanaz a user is teheti)
- Cél: Workflow átmenet tesztelése (draft → approved → scheduled), **nem robusztus approval chain**
- Pilot user workflow gyakorlása (megszokják a státusz átmeneteket)

**P1 - Multi-user approval:**
- User A (socialos): Draft → "Send to review" → `review`
- User B (account manager): Review → "Approve" / "Reject" → `approved` / `draft`
- Comment thread (feedback poszt-szinten)
- Notification (in-app + email)

---
