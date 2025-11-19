# NFR5: Usability (Használhatóság)

## NFR5.1: Browser Support

**Támogatott böngészők (P0):**
- Chrome (latest 2 verzió)
- Firefox (latest 2 verzió)
- Safari (latest 2 verzió)
- Edge (latest 2 verzió)

**Nincs támogatás (P0):**
- IE11
- Régi Safari (iOS < 14)
- Opera, Brave (nincs explicit testing, de valószínűleg működik - Chromium-based)

**P0 megjegyzés:** Desktop-first (lásd NFR5.2). Browser support testing: manual (Chrome, Firefox, Safari tesztelés pilot előtt).

---

## NFR5.2: Responsive Design & Mobile Support

**P0 - Desktop-first (de mobile-aware):**
- **Optimalizálva:** 1920×1080, 1366×768 felbontásra (desktop)
- **Tablet (768px - 1024px):** Best-effort (nem explicit testing, de nem broken UI)
- **Mobile (< 768px):** **Basic support P0-ban** - mobile böngészőből elérhető, de egyszerűsített UX

**Mobile támogatás P0-ban (simplified UX):**
- ✅ **Calendar view:** Elérhető mobilon (scrollable, nem drag&drop)
- ✅ **Post approval:** Elérhető mobilon (Approve / Schedule gomb működik)
- ✅ **Post edit:** Elérhető mobilon (textarea szerkesztés, nem drag&drop scheduling)
- ❌ **Brand Brain setup:** Desktop-only (túl komplex form mobilon)
- ❌ **Drag & drop:** Desktop-only (ha van drag&drop scheduling P0-ban)

**Miért fontos mobile support P0-ban:**
- Socialos apró ellenőrzéseket, last minute módosításokat, gyors jóváhagyásokat **mobilról is intéz**
- Ha mobilon **teljesen broken** → továbbra is Meta Business Suite marad a "safe default"
- **Adoption kockázat:** Tool nem lesz "go-to", csak "amikor épp az asztalnál ülök"

**P0 mobile UX filozófia:**
- Nem kell pixel-perfect mobile design
- De core workflow (approve, schedule, edit text) **mobilról is használható** → validálja H2 (go-to tool)

**P1 - Mobile-first:**
- Teljes responsive design (Tailwind breakpoints: sm, md, lg, xl)
- Mobile app (React Native / Flutter / PWA)
- Touch-optimized drag&drop

---

## NFR5.3: Accessibility

**P0 - Alapvető:**
- Keyboard navigation (Tab, Enter működik form-okban, gombokban)
- Alt text képeknél (user-uploaded images → user felelőssége)
- Nincs WCAG 2.1 AA compliance (nem tesztelünk screen reader-rel)

**P1 - WCAG 2.1 AA:**
- Screen reader support (ARIA labels, semantic HTML)
- Contrast ratio compliance (4.5:1 text, 3:1 UI components)
- Focus visible (keyboard navigation vizualizáció)

---
