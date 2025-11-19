# Creaitor UX Design Specification

_Created on 2025-11-19 by BMad_
_Generated using BMad Method - Create UX Design Workflow v1.0_

---

## Executive Summary

**Projekt:** Creaitor - AI-alapú közösségi média tartalomkezelő platform

**Target Users:** 3-10 fős social media ügynökségek, akik 5-30 ügyfélmárkát kezelnek párhuzamosan

**Core UX Filozófia:** Brand-First + AI Co-Pilot
> A Creaitor egy brand-központú AI társként működik: minden művelet a kiválasztott márka kontextusában történik, az AI javasol és gyorsít, de a socialos mindig kontrollál és látja, honnan jön az output.

**Design System:** Shadcn UI + Tailwind CSS v4

**Visual Direction:** Modern, Creative, Friendly - Purple/Violet (#a855f7) alapú színpaletta

**Platform:** Web alkalmazás (desktop-first, mobile-aware)

**Core Funkciók (MVP):**
- Multi-brand management (Brand Selector mindig látható)
- Brand Brain v1 (TOV, példaposztok, key messages)
- AI Copy Studio (transzparens AI context, inline szerkesztés, mandatory rating)
- Content Calendar (heti naptár, drag & drop scheduling)
- Approval Workflow (Draft → Approved → Scheduled → Published)
- Publishing (Meta Graph API integráció FB/IG)

**UX Kulcselvek:**
1. **Active Brand Context Lock** - Márka-váltás explicit, brand-locked műveletek
2. **Transparent AI Context** - User látja a Brand Brain kontextust
3. **Mandatory Usability Rating** - Instrumentation a H1 hipotézis validálásához
4. **One-Flow Post Creation** - Brief → Generate → Edit → Schedule egy folyamatban

**Dark Mode:** Future-ready (CSS variables), P1 prioritás

---

## 1. Design System Foundation

### 1.1 Design System Choice

**Választott Design System:** Shadcn UI + Tailwind CSS v4

**Indoklás:**
- **Headless komponensek** → teljes vizuális kontroll, nem előre stilizált "Bootstrap-szerű" look
- **Tailwind-based** → gyors customization, konzisztens spacing/colors, utility-first approach
- **Modern, clean komponensek:** Button, Input, Dialog, Calendar, Dropdown, stb.
- **Copy-paste architektúra** → nincs dependency bloat, csak az kell ami használva van
- **Accessibility built-in:** ARIA labels, keyboard navigation, screen reader support
- **Konzisztens az Architecture döntéssel:** Next.js 15 + TypeScript + Tailwind CSS stack

**Komponens könyvtár:**
- Shadcn UI Primitives (Radix UI alapon)
- Tailwind CSS utility classes
- Custom komponensek szükség szerint (Brand Brain editor, Calendar grid, AI Studio interface)

**Testreszabhatóság:**
- Színséma: Tailwind config-ban definiálva
- Typography: Tailwind typography plugin
- Spacing/sizing: Tailwind spacing scale (4px alapegység)
- Breakpoints: Tailwind responsive breakpoints (sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px)

---

## 2. Core User Experience

### 2.1 Defining Experience

**Core UX Filozófia:** Brand-First + AI Co-Pilot

> "A Creaitor egy **brand-központú AI társként** működik: minden művelet a kiválasztott márka kontextusában történik, az AI javasol és gyorsít, de a socialos mindig kontrollál és látja, honnan jön az output."

**Miért ez az irány:**
- **Brand-First (B):** Core differenciátor - nem "még egy AI social tool", hanem brand-centric social OS
- **AI Co-Pilot (C):** AI transzparens, user kontrollál - támogatja H1 (Brand Brain) és H2 (Workflow adoption) hipotéziseket
- **Single Source of Truth:** Inherensen teljesül - minden egy helyen, márka kontextusban

**Konkrét UX megvalósítás:**

**Brand-First aspektus:**
1. **Persistent Brand Selector** - mindig látható (sidebar vagy top bar), aktív márka vizuálisan kiemelve
2. **Brand-aware UI elemek** - minden művelet explicit márka kontextusban (Calendar: "Fitness Studio XY heti naptára", AI Studio: "Generálás Fitness Studio Brand Brain-jével")
3. **Multi-brand context isolation** - Brand Brain-ek nem keverednek, márka-váltás explicit (Architecture Pattern 2)

**AI Co-Pilot aspektus:**
1. **Transzparens AI context** - user látja, honnan jön az AI output (Brand Brain TOV, példaposztok)
2. **Inline szerkesztés + regenerálás** - AI generál → user azonnal szerkeszti (egy flow, nincs külön "approve AI output" lépés)
3. **Mandatory rating** - mentés előtt kötelező jelölés: "Mennyire volt használható az AI?" (Architecture Pattern 4)
4. **AI mint segítő, nem döntéshozó** - AI sosem automatikusan publishol, mindig van user approval lépés

### 2.2 Novel UX Patterns

**Pattern 1: Active Brand Context Lock**

**Probléma:** Socialos 5-10 márkát kezel → könnyen összekeverheti őket (fitness poszt bakery-nek).

**Megoldás:**
- **Aktív márka mindig látható** - Sidebar/top bar-on kiemelve a kiválasztott márka (logó + név)
- **Brand-locked műveletek** - Minden AI generálás, naptár view, publish művelet explicit a kiválasztott márkához kötött
- **Márka-váltás explicit** - User aktívan választ másik márkát (dropdown vagy sidebar click), váltás után vizuális megerősítés
- **Safety check** - Ha user publish-ol, látja: "Publikálás Fitness Studio FB oldalára" (nem csak "Publish" gomb)

**Implementáció (Architecture Pattern 2):**
- Frontend: Zustand state `activeBrandId`
- Backend: Minden API hívás explicit `brandId` paraméterrel
- DB: Supabase RLS policy garantálja tenant-agency-brand izolációt

---

**Pattern 2: Transparent AI Context Display**

**Probléma:** User nem érti, miért generált az AI ilyen szöveget → nem bízik benne → nem használja.

**Megoldás:**
- **AI Context Badge** - Copy Studio-ban kis info ikon: "Ez a szöveg a Brand Brain TOV és 3 példaposzt alapján készült"
- **Brand Brain Preview** - AI Studio sidebar-on látható a Brand Brain kivonat (TOV első 100 karaktere, key messages lista)
- **User látja a "receptet"** - Nem blackbox AI, hanem érthető: "Brand Brain + Brief = Generated Copy"

**UX következmény:**
- ✅ User jobban megérti az AI outputot
- ✅ Tudja, hogyan javítson a Brand Brain-en, ha rossz az output
- ✅ Validálja H1 hipotézist (transzparens Brand Brain → jobb rating)

---

**Pattern 3: Mandatory Usability Rating (Instrumentation)**

**Probléma:** MVP sikere H1 hipotézis validálásán múlik - "Brand Brain v1 elég 8/10 márkahűséghez?"

**Megoldás:**
- **Kötelező rating mentés/publish előtt** - User nem mentheti el a posztot, amíg nem jelöli:
  - "Rendben, kisebb módosítással" (8-10/10)
  - "Nagy átdolgozás kellett" (5-7/10)
  - "Nem használható, újat írtam" (1-4/10)
- **Rating modal blocking** - Nem lehet dismiss-elni, kötelező választani
- **DB constraint** - Architecture Pattern 4: `CHECK (is_ai_generated = false OR ai_usability_rating IS NOT NULL)`

**UX következmény:**
- ✅ Minden AI-generált poszt mérve
- ✅ Validálja H1 hipotézist (6 hónap után látjuk: elértük-e a 70%+ "rendben" arányt)
- ❌ Friction (user plusz 1 kattintás) - de pilot során elfogadható

---

**Pattern 4: One-Flow Post Creation**

**Probléma:** User váltás ChatGPT (copy) → Canva (image) → Meta (schedule) között → kontextus elvesztés.

**Megoldás:**
- **Unified Post Editor** - Egy képernyőn:
  1. Brief input (téma megadása)
  2. AI Copy generálás (inline szerkesztés)
  3. Image hozzáadás (upload vagy AI Visual Studio - P1)
  4. Schedule/publish (dátum + platform választás)
  5. Usability rating (mandatory)
- **Kontextus megtartása** - Poszt draft mindig visszatölthető, nem veszik el ha félbehagyja
- **Minimális navigáció** - Ne kelljen külön "Copy Studio" → "Calendar" → "Publish" oldalakon végigmenni

**UX következmény:**
- ✅ Gyorsabb workflow (validálja H2 - go-to tool adoption)
- ✅ Kevesebb eszköz-váltás
- ❌ Veszély: Túlterhelt UI (ha egy képernyő túl sok funkció) - erre figyelni kell design-nál

---

## 3. Visual Foundation

### 3.1 Color System

**Design Direction:** Modern, Creative, Friendly - Purple/Violet alapú paletta

**Core Principles:**
- **Modern & Creative:** Purple/violet primary színek - kreatív iparág, AI tech vibe
- **Barátságos & Approachable:** Soft shadows, kerekített sarkok, generous whitespace
- **Professzionális de nem corporate:** Clean, de nem merev LinkedIn-szerű
- **Light mode primary:** White backgrounds, dark mode later (CSS variables készek a váltáshoz)

---

### 3.2 Color Palette (Tailwind CSS v4)

**Primary Brand Colors (Purple/Violet):**

```css
/* tailwind.config.js - custom colors */
colors: {
  brand: {
    50: '#faf5ff',   // Lightest - subtle backgrounds, highlights
    100: '#f3e8ff',  // Very light - hover states, cards
    200: '#e9d5ff',  // Light - borders, dividers
    300: '#d8b4fe',  // Medium light - secondary elements
    400: '#c084fc',  // Medium - icons, secondary buttons
    500: '#a855f7',  // PRIMARY - main brand color, primary buttons, links
    600: '#9333ea',  // Dark primary - hover states, active states
    700: '#7e22ce',  // Darker - pressed states, emphasis
    800: '#6b21a8',  // Very dark - strong text, headings
    900: '#581c87',  // Darkest - high contrast text
  },

  // Neutral colors (slightly warm to complement purple)
  neutral: {
    50: '#fafafa',   // Background (white mode)
    100: '#f5f5f5',  // Subtle background variations
    200: '#e5e5e5',  // Borders, dividers
    300: '#d4d4d4',  // Disabled states
    400: '#a3a3a3',  // Placeholder text
    500: '#737373',  // Secondary text
    600: '#525252',  // Body text
    700: '#404040',  // Headings
    800: '#262626',  // Strong headings
    900: '#171717',  // Darkest text
  },

  // Semantic colors
  success: {
    50: '#f0fdf4',
    500: '#22c55e',  // Green - success states, published posts
    600: '#16a34a',
  },
  warning: {
    50: '#fffbeb',
    500: '#f59e0b',  // Amber - warnings, pending states
    600: '#d97706',
  },
  error: {
    50: '#fef2f2',
    500: '#ef4444',  // Red - errors, failed publishes
    600: '#dc2626',
  },
  info: {
    50: '#eff6ff',
    500: '#3b82f6',  // Blue - informational messages
    600: '#2563eb',
  },
}
```

---

### 3.3 Typography

**Font Family:**
- **Headings:** Plus Jakarta Sans (modern, friendly, rounded)
- **Body:** Inter (readable, professional, web-optimized)
- **Monospace:** JetBrains Mono (code snippets, API keys - opcionális)

**Font Scale (Tailwind):**
```css
fontSize: {
  'xs': '0.75rem',    // 12px - captions, labels
  'sm': '0.875rem',   // 14px - small text, metadata
  'base': '1rem',     // 16px - body text
  'lg': '1.125rem',   // 18px - large body, subheadings
  'xl': '1.25rem',    // 20px - card titles
  '2xl': '1.5rem',    // 24px - section headings
  '3xl': '1.875rem',  // 30px - page titles
  '4xl': '2.25rem',   // 36px - hero headings
}
```

**Line Height:**
- Body text: `leading-relaxed` (1.625)
- Headings: `leading-tight` (1.25)

---

### 3.4 Spacing & Layout

**Container Max Width:**
- Desktop: `max-w-7xl` (1280px)
- Content: `max-w-4xl` (896px - reading-optimal)

**Spacing Scale (Tailwind default):**
- 4px base unit
- Common: `space-y-4` (16px), `space-y-6` (24px), `space-y-8` (32px)

**Border Radius:**
- Buttons, inputs: `rounded-lg` (8px) - modern, friendly
- Cards: `rounded-xl` (12px) - soft, approachable
- Modals: `rounded-2xl` (16px) - emphasis

**Shadows (soft, modern):**
```css
boxShadow: {
  'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',           // Subtle elevation
  'DEFAULT': '0 1px 3px 0 rgb(0 0 0 / 0.1)',       // Cards
  'md': '0 4px 6px -1px rgb(0 0 0 / 0.1)',         // Dropdowns
  'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1)',       // Modals
  'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1)',       // Large modals
  'brand': '0 10px 40px -10px rgb(168 85 247 / 0.3)', // Purple glow (accent)
}
```

---

### 3.5 Component Patterns

**Buttons:**
- Primary: `bg-brand-500 hover:bg-brand-600 text-white rounded-lg shadow-sm`
- Secondary: `bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-700 rounded-lg`
- Ghost: `hover:bg-brand-50 text-brand-600 rounded-lg`

**Cards:**
- `bg-white border border-neutral-200 rounded-xl shadow-sm hover:shadow-md transition`

**Inputs:**
- `bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500`

**Badges (status):**
- Draft: `bg-neutral-100 text-neutral-600`
- Approved: `bg-success-50 text-success-700`
- Scheduled: `bg-info-50 text-info-700`
- Published: `bg-success-100 text-success-800`
- Failed: `bg-error-50 text-error-700`

---

### 3.6 Dark Mode Support (Future-Ready)

**CSS Variables approach:**
```css
/* Light mode (default) */
:root {
  --color-background: 250 250 250;     /* neutral-50 */
  --color-foreground: 23 23 23;        /* neutral-900 */
  --color-brand: 168 85 247;           /* brand-500 */
  --color-card: 255 255 255;           /* white */
}

/* Dark mode (future) */
.dark {
  --color-background: 23 23 23;        /* neutral-900 */
  --color-foreground: 250 250 250;     /* neutral-50 */
  --color-brand: 196 132 252;          /* brand-400 - lighter in dark */
  --color-card: 38 38 38;              /* neutral-800 */
}
```

**Implementation:**
- Tailwind CSS `dark:` variant készen áll
- User preference: `localStorage` + system preference detection
- Toggle switch a settings-ben (P1)

---

**Interactive Visualizations:**

- Color Theme Explorer: [ux-color-themes.html](./ux-color-themes.html)

---

## 4. Design Direction

### 4.1 Chosen Design Approach

{{design_direction_decision}}

**Interactive Mockups:**

- Design Direction Showcase: [ux-design-directions.html](./ux-design-directions.html)

---

## 5. User Journey Flows

### 5.1 Critical User Paths

A következő journey-k a Creaitor core workflow-ját definiálják. Minden journey **screen-by-screen** leírja a user interakciót.

---

#### **Journey 1: Új Márka Onboarding + Brand Brain Setup**

**Trigger:** Új ügyfél érkezett, socialos felviszi a rendszerbe

**Screens:**

**Screen 1: Brand List View**
- Layout: Sidebar (Brand Selector) + Main Content (Brand Grid)
- Action: User kattint **"+ Új Márka"** gomb (top right, primary button)

**Screen 2: Brand Creation Modal (Step 1 - Alapadatok)**
- Modal: Full screen vagy large modal (rounded-2xl)
- Fields:
  - Márka név (input, required)
  - Márka leírás (textarea, optional, 100-300 karakter)
  - Platform választás: FB Page + IG Account checkboxok (minimum 1 required)
- Action: **"Tovább"** gomb (bottom right, primary)

**Screen 3: Meta OAuth Flow (Step 2 - Social Profile Csatolás)**
- FB/IG OAuth redirect (Meta bejelentkezés)
- User választja a Page-et és IG Account-ot Meta felületen
- Sikeres csatolás után: Return to Creaitor

**Screen 4: Brand Brain Form (Step 3 - Brand Brain Kitöltés)**
- Modal: Large modal, scrollable
- Sections (accordion vagy tabs):
  1. **Tone of Voice** (textarea, 200-500 karakter ajánlott)
     - Placeholder: "Pl. Barátságos, közvetlen, nem túl formális. Emojik megengedettek, de mértékkel."
  2. **Key Messages** (2-5 bullet, dynamic input fields)
     - "+Add Message" gomb minden input után
  3. **Példaposztok** (1-3 textarea)
     - "Adj meg 1-3 korábbi sikeres poszt szövegét" placeholder
  4. **Vizuális Irány** (textarea, 100-300 karakter ajánlott)
     - Placeholder: "Pl. Meleg, természetes színek. Földközeli, otthonos hangulat."
- Info badge: "Ezek az információk segítik az AI-t márkahű tartalmat generálni"
- Action: **"Mentés és Kész"** gomb (bottom right, primary)

**Screen 5: Confirmation + Redirect**
- Success message (toast): "✅ Fitness Studio XY sikeresen létrehozva!"
- Redirect: Brand Calendar view (aktív márka = az új márka)

**UX Pattern alkalmazása:**
- **Active Brand Context Lock:** Új márka létrehozása után automatikusan aktív lesz
- **Transparent AI Context:** Brand Brain form-on info badge magyarázza, miért kell kitölteni

---

#### **Journey 2: Heti Tartalomnaptár Generálása AI-val**

**Trigger:** Socialos összeállítja egy márka heti naptárát

**Screens:**

**Screen 1: Content Calendar View**
- Layout: Sidebar (Brand Selector) + Main (Calendar Grid - heti nézet)
- Aktív márka jelzése: Top bar-on "Fitness Studio XY heti naptára" + logó
- Calendar grid: 7 nap × 2 platform (FB/IG) = 14 slot
- Empty slot: "+ Új Poszt" placeholder
- Filled slot: Card preview (image thumbnail + snippet + badge)
- Action: User kattint **"+ Új Poszt"** egy slot-ban

**Screen 2: Post Editor Modal (One-Flow Interface)**

**Layout:** Large modal (rounded-2xl), 3 column layout:

**Left Column (Brand Brain Preview - 20% width):**
- Collapsible sidebar
- Brand Brain kivonat:
  - TOV: első 100 karakter + "..." (clickable → full view)
  - Key Messages: bullet list (max 3 látszik)
  - Példaposztok: "3 példaposzt használva" badge
- Info icon: "Ez a kontextus lesz használva az AI generáláshoz"

**Middle Column (Main Editor - 50% width):**

**Section 1: Brief Input**
- Label: "Miről szóljon a poszt?"
- Textarea: 1-3 mondat input
- Placeholder: "Pl. Húsvéti akció a desszertekre"
- Platform selector: FB / IG radio buttons

**Section 2: AI Copy Generation**
- **Pre-generate state:**
  - Button: **"✨ Generálás AI-val"** (primary, brand-500)
- **Post-generate state:**
  - AI generated text megjelenik contenteditable div-ben
  - Inline szerkeszthető azonnal
  - Character counter: "245 karakter (FB: optimális 40-80)" info badge
  - **"🔄 Regenerálás"** gomb (ghost button, top right)

**Section 3: Image Upload (P0: Manual Upload)**
- Drag & drop area: "Húzd ide a képet vagy kattints feltöltéshez"
- Upload button
- Preview: thumbnail 1:1 aspect ratio (IG) vagy 1.91:1 (FB)

**Section 4: Mandatory Usability Rating (Pattern 3)**
- Megjelenik mentés/schedule előtt (blocking modal)
- Kérdés: "Mennyire volt használható az AI által generált szöveg?"
- 3 opció (radio buttons):
  - ✅ "Rendben, kisebb módosítással" (8-10/10)
  - ⚠️ "Nagy átdolgozás kellett" (5-7/10)
  - ❌ "Nem használható, újat írtam" (1-4/10)
- Cannot dismiss, kötelező választani

**Right Column (Actions & Preview - 30% width):**

**Section 1: Live Preview**
- Platform-specific preview (FB vagy IG mockup)
- Character count, image aspect ratio check

**Section 2: Schedule/Publish**
- Date picker: dátum + időpont választás
- Platform final check: "FB Page: Fitness Studio XY" badge (safety check - Pattern 1)
- Buttons:
  - **"Mentés draft-ba"** (secondary button)
  - **"Ütemezés"** (primary button, bottom right)

**Screen 3: Calendar View (frissítve)**
- Success toast: "✅ Poszt ütemezve - Jan 20, 10:00"
- Calendar grid-ben megjelenik az új slot (badge: Scheduled)
- Poszt draft mindig visszatölthető (click → Post Editor modal)

**UX Pattern alkalmazása:**
- **One-Flow Post Creation:** Brief → Generate → Edit → Image → Rating → Schedule egy modal-ban
- **Transparent AI Context:** Left sidebar mutatja a Brand Brain kivonatot
- **Mandatory Rating:** Cannot save without rating
- **Active Brand Context Lock:** Platform selector mutatja "FB Page: Fitness Studio XY"

---

#### **Journey 3: Approval és Ütemezés**

**Trigger:** Socialos elkészítette a draft posztokat, most jóváhagyja és ütemezi őket

**Screens:**

**Screen 1: Calendar View (Draft posztok láthatóak)**
- Badge filter: "Összes" / "Draft" / "Approved" / "Scheduled" / "Published"
- Draft poszt card: Badge "Draft" (neutral-100 background)
- Click draft card → Post Editor modal (read mode)

**Screen 2: Post Editor Modal (Review Mode)**
- Same layout mint Journey 2, de:
  - **Read mode:** Szöveg nem inline szerkeszthető (csak view)
  - **Edit gomb:** Ha szerkeszteni akar, kattint "✏️ Szerkesztés" (top right)
  - **Approval actions:**
    - **"✅ Jóváhagyás"** gomb (primary, green success-500)
    - **"🗑️ Törlés"** gomb (ghost, error color)

**Screen 3: Scheduling Interface (Approval után)**
- Ha "✅ Jóváhagyás" → Approved státusz
- Date/time picker megjelenik (ha még nincs időpont)
- **"📅 Ütemezés"** gomb (primary)
- Success toast: "✅ Poszt ütemezve - Jan 20, 10:00"
- Badge változás: Draft → Approved → Scheduled

**Screen 4: Publishing (Background - user nem lát semmit, csak notification)**
- Cron job vagy background queue (Architecture szerint BullMQ - P1)
- Időben Meta Graph API hívás
- **Success case:** Badge: Scheduled → Published, toast: "✅ Poszt publikálva!"
- **Failure case:** Badge: Scheduled → Failed, toast: "❌ Hiba: Meta API token lejárt. Csatold újra a profilt!"

**Screen 5: Retry Flow (ha Failed)**
- Failed poszt card (badge: Failed, red error-50 background)
- Click → Post Editor modal (review mode)
- Error message banner (top): "Meta API hiba: token lejárt. Csatold újra a profilt! [Retry]"
- **"🔄 Újrapróbálás"** gomb (primary)

**UX Pattern alkalmazása:**
- **Active Brand Context Lock:** Approval során látható "Publikálás Fitness Studio FB oldalára"
- **One-Flow:** Approval → Schedule egy interfészen (nem külön screen-ek)

---

#### **Journey 4: Multi-Brand Kezelés**

**Trigger:** Socialos váltani szeretne márkák között

**Screens:**

**Screen 1: Brand Selector (Sidebar - mindig látható)**
- Sidebar layout:
  - **Header:** "Your Brands" (neutral-500, uppercase, 0.75rem)
  - **Active brand card:** Gradient background (brand-500 → brand-700), white text, shadow-brand
    - Márka név (bold)
    - "Active" badge
  - **Inactive brand cards:** White background, border neutral-200
    - Márka név
    - Secondary info: "3 scheduled posts" (neutral-400)
  - **+ Új Márka gomb** (bottom, ghost button)

**Screen 2: Brand Context Switch**
- User kattint inactive brand card-ra
- Confirmation toast (optional, P1): "📌 Átváltva: Bakery Budapest"
- Main content frissül:
  - Calendar view: csak a kiválasztott márka posztjai
  - Active brand indicator (top bar): "Bakery Budapest heti naptára"
  - Sidebar: Active brand card grafikai változás (gradient háttér)

**Screen 3: Multi-Brand Overview Dashboard (Optional P1)**
- Layout: Grid view (3-4 brand card per row)
- Brand card preview:
  - Márka név + logó
  - Scheduled posts count
  - Next post time
  - Quick action: "View Calendar" button
- Kattintás → Aktiválja a márkát és átirányít Calendar view-ra

**UX Pattern alkalmazása:**
- **Active Brand Context Lock:** Sidebar visual feedback (gradient, shadow)
- **Brand-aware UI:** Top bar, calendar content, AI Studio context mind a kiválasztott márkához kötött
- **Safety check:** Ha user új posztot készít, látja "Generálás Bakery Budapest Brand Brain-jével"

---

### 5.2 Navigation Structure

**Top-level Navigation (minden screen-en elérhető):**

**Sidebar (Left - 250px width):**
1. **Logo/Brand** (top)
2. **Brand Selector** (collapsible list)
3. **Main Navigation:**
   - 📅 Calendar (default view)
   - ✨ AI Copy Studio (P1: dedikált oldal, P0: modal-based)
   - 🧠 Brand Brain (márka settings)
   - 📊 Dashboard (P1: analytics)
4. **User menu** (bottom)
   - Settings
   - Logout

**Top Bar:**
- Active brand indicator (left): "Fitness Studio XY heti naptára"
- Quick actions (right):
  - **"+ Új Poszt"** button (primary)
  - Notifications (P1)
  - User avatar dropdown

**Mobile Navigation (< 768px):**
- Hamburger menu (collapse sidebar)
- Bottom tab bar (Calendar / AI Studio / Settings)
- Brand selector: Dropdown (top bar)

---

### 5.3 Key Interaction Patterns

**Modal Behavior:**
- Large modals: `rounded-2xl`, `max-w-4xl`, centered
- Overlay: `bg-neutral-900/50` (50% opacity dark overlay)
- Close: X button (top right) OR "Cancel" button (bottom left)
- Escape key closes modal (if not blocking - like Mandatory Rating)

**Drag & Drop (Calendar):**
- Poszt card drag → calendar slot drop
- Visual feedback: Ghost card while dragging, target slot highlights (brand-100 background)
- Drop → dátum/időpont update, success toast

**Loading States:**
- AI generálás: Skeleton loader (pulsing brand-100 background) + "Generálás..." text
- API hívások: Spinner (brand-500) + disable buttons
- Image upload: Progress bar (brand-500)

**Error States:**
- Inline error: Red text (error-500) + icon below input field
- Toast notification: Red background (error-50), error icon, auto-dismiss 5s
- Failed poszt card: Red border (error-200), error badge

**Success States:**
- Toast notification: Green background (success-50), success icon, auto-dismiss 3s
- Success badge: Green (success-500)

---

### 5.4 Responsive Breakpoints

**Desktop (>= 1024px):**
- Sidebar visible (250px)
- Calendar: 7-day grid view
- Post Editor: 3-column layout

**Tablet (768px - 1023px):**
- Sidebar collapsible (hamburger menu)
- Calendar: 7-day list view (scrollable)
- Post Editor: 2-column layout (Brand Brain sidebar collapses into accordion)

**Mobile (< 768px):**
- Bottom tab bar navigation
- Calendar: List view (day-by-day)
- Post Editor: Single column (stacked sections)
- Brand selector: Dropdown (top bar)

**P0 Support:**
- Desktop-first, but core workflow (approve, schedule, edit text) működik mobilon
- Brand Brain setup: Desktop-only (túl komplex form mobilon)

---

## 6. Component Library

### 6.1 Component Strategy

**Approach:** Shadcn UI komponensek + Custom Creaitor komponensek

**Shadcn UI Base Components (használatra kész):**
- Button, Input, Textarea, Select, Checkbox, Radio
- Card, Dialog (Modal), Dropdown Menu, Popover
- Calendar (date picker), Toast (notifications)
- Badge, Avatar, Separator
- Skeleton (loading states)

**Custom Creaitor Components (építeni kell):**

#### **1. BrandSelector** (Sidebar Brand List)
**Props:**
- `brands: Brand[]` - márka lista
- `activeBrandId: string` - aktív márka ID
- `onBrandChange: (brandId: string) => void`

**Visual:**
- Active brand: Gradient background (brand-500 → brand-700), white text, shadow-brand
- Inactive brands: White background, border neutral-200, hover: bg-neutral-50
- "+ Új Márka" gomb (bottom, ghost button)

**State:**
- Zustand store: `activeBrandId` (global state)

---

#### **2. PostEditor** (One-Flow Post Creation Modal)
**Props:**
- `postId?: string` - ha edit mode (meglévő poszt)
- `brandId: string` - aktív márka ID
- `initialSlot?: { date: Date, platform: 'fb' | 'ig' }` - ha calendar slot-ból indítva

**Sub-components:**
- `BrandBrainPreview` - left sidebar (collapsible)
- `BriefInput` - textarea + platform selector
- `AICopyGenerator` - generate button + contenteditable output
- `ImageUploader` - drag & drop area
- `UsabilityRatingModal` - blocking modal (mandatory)
- `PlatformPreview` - right sidebar (FB/IG mockup)
- `ScheduleActions` - date picker + buttons

**State Management:**
- Local state (React useState): draft poszt adatok
- API calls: `POST /api/ai/copy`, `POST /api/posts`, `PATCH /api/posts/:id`

---

#### **3. CalendarGrid** (Heti Naptár Nézet)
**Props:**
- `brandId: string` - aktív márka ID
- `weekStart: Date` - hét kezdete
- `posts: Post[]` - posztok a hétre

**Visual:**
- 7 nap × 2 platform (FB/IG) = 14 slot grid
- Empty slot: `+ Új Poszt` placeholder (brand-50 background, dashed border)
- Filled slot: `PostCard` preview

**Interactions:**
- Click empty slot → `PostEditor` modal nyílik
- Click filled slot → `PostEditor` modal (edit/review mode)
- Drag & drop: `PostCard` → új slot (dátum/idő update)

**Sub-components:**
- `PostCard` - poszt preview card (image thumbnail + snippet + badge)

---

#### **4. PostCard** (Poszt Preview Card)
**Props:**
- `post: Post` - poszt adatok
- `onClick?: () => void`
- `draggable?: boolean`

**Visual:**
- Card (rounded-xl, border neutral-200)
- Image thumbnail (top, aspect ratio checked)
- Text snippet (1-2 sor, ellipsis)
- Status badge (bottom left): Draft / Approved / Scheduled / Published / Failed
- Platform icon (bottom right): FB vagy IG logo

**States:**
- Draft: neutral-100 badge
- Approved: success-50 badge
- Scheduled: info-50 badge
- Published: success-100 badge
- Failed: error-50 badge, red border

---

#### **5. UsabilityRatingModal** (Blocking Modal - Mandatory Rating)
**Props:**
- `onRate: (rating: 'good' | 'moderate' | 'bad') => void`
- `isOpen: boolean`

**Visual:**
- Modal overlay (cannot dismiss, no X button)
- Heading: "Mennyire volt használható az AI által generált szöveg?"
- 3 opció (radio buttons, large):
  - ✅ "Rendben, kisebb módosítással" (success-500 accent)
  - ⚠️ "Nagy átdolgozás kellett" (warning-500 accent)
  - ❌ "Nem használható, újat írtam" (error-500 accent)
- **"Tovább"** gomb (primary, bottom right, disabled until selection)

**Behavior:**
- Cannot dismiss (no Escape key, no overlay click)
- Must select option + click "Tovább"
- After rating → Modal closes, post save folytatódik

---

#### **6. BrandBrainPreview** (Left Sidebar - AI Context Display)
**Props:**
- `brandId: string` - márka ID

**Visual:**
- Collapsible sidebar (20% width, P0: always open)
- Sections:
  - **Tone of Voice:** First 100 chars + "..." (clickable → full view modal)
  - **Key Messages:** Bullet list (max 3 visible, "+" expand)
  - **Példaposztok:** "3 példaposzt használva" badge
- Info icon: "Ez a kontextus lesz használva az AI generáláshoz"

**Data fetch:**
- API: `GET /api/brands/:id/brain`

---

#### **7. PlatformPreview** (Right Sidebar - Live Preview)
**Props:**
- `platform: 'fb' | 'ig'`
- `content: string` - poszt szöveg
- `imageUrl?: string`

**Visual:**
- FB mockup: 1.91:1 image aspect ratio, character count check
- IG mockup: 1:1 image aspect ratio, character count check
- Real-time update (content változáskor frissül)

**Validations (visual feedback):**
- Character count: "245 karakter (FB: optimális 40-80)" info badge
- Image aspect ratio: Warning ha nem optimális

---

### 6.2 Component File Structure

```
src/components/
├── ui/                          # Shadcn UI base components
│   ├── button.tsx
│   ├── input.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   ├── badge.tsx
│   └── ...
├── brand/
│   ├── BrandSelector.tsx        # Custom: Brand list sidebar
│   ├── BrandBrainPreview.tsx    # Custom: AI context display
│   └── BrandBrainForm.tsx       # Custom: Brand Brain setup form
├── post/
│   ├── PostEditor.tsx           # Custom: One-flow post creation modal
│   ├── PostCard.tsx             # Custom: Post preview card
│   ├── UsabilityRatingModal.tsx # Custom: Mandatory rating modal
│   └── PlatformPreview.tsx      # Custom: FB/IG mockup preview
├── calendar/
│   ├── CalendarGrid.tsx         # Custom: 7-day grid view
│   └── CalendarSlot.tsx         # Custom: Empty/filled slot
└── common/
    ├── LoadingSpinner.tsx       # Loading states
    ├── ErrorBanner.tsx          # Error messages
    └── SuccessToast.tsx         # Success notifications
```

---

### 6.3 State Management Strategy

**Global State (Zustand):**
- `activeBrandId` - aktív márka ID (minden komponens eléri)
- `user` - bejelentkezett user adatai
- `brands` - user által elérhető márkák listája

**Local State (React useState):**
- PostEditor draft adatok
- Calendar filter states (Draft / Approved / stb.)
- Modal open/close states

**Server State (React Query / SWR):**
- `GET /api/brands` - brands lista fetch
- `GET /api/posts?brandId=...&week=...` - calendar posts fetch
- `GET /api/brands/:id/brain` - brand brain fetch
- Mutations: `POST /api/posts`, `PATCH /api/posts/:id`, `DELETE /api/posts/:id`

---

### 6.4 API Integration Points

**AI Copy Generation:**
- `POST /api/ai/copy`
  - Body: `{ brandId, brief, platform }`
  - Response: `{ generatedText, tokensUsed }`

**AI Visual Generation (P1):**
- `POST /api/ai/image`
  - Body: `{ brandId, prompt, aspectRatio }`
  - Response: `{ imageUrl, provider }`

**Post CRUD:**
- `POST /api/posts` - create draft
- `GET /api/posts/:id` - fetch single post
- `PATCH /api/posts/:id` - update (edit, approve, schedule)
- `DELETE /api/posts/:id` - delete

**Meta Publishing:**
- `POST /api/publish/:postId` - manual publish trigger
- Background job (BullMQ - P1): Auto publish scheduled posts

**Brand Brain:**
- `GET /api/brands/:id/brain` - fetch brand brain
- `PATCH /api/brands/:id/brain` - update brand brain

---

## 7. UX Pattern Decisions

### 7.1 Consistency Rules

**Naming Conventions:**
- Buttons: Action verbs (Generálás, Mentés, Ütemezés, Törlés)
- Status badges: Nouns (Draft, Approved, Scheduled, Published, Failed)
- Navigation: Nouns (Calendar, AI Studio, Brand Brain, Settings)

**Iconography:**
- Use Lucide Icons (consistent with Shadcn UI)
- Icon + Text on primary actions (e.g., "✨ Generálás AI-val")
- Icon only on secondary/ghost buttons (space-saving)

**Color Usage:**
- Primary actions: brand-500 (purple)
- Destructive actions: error-500 (red) - Delete, Retry
- Success actions: success-500 (green) - Publish, Approve
- Neutral actions: neutral-200 border - Cancel, Back

**Spacing Consistency:**
- Card padding: `p-6` (24px)
- Modal padding: `p-8` (32px)
- Button padding: `px-5 py-2.5` (horizontal 20px, vertical 10px)
- Section spacing: `space-y-6` (24px vertical gap)

**Typography Hierarchy:**
- Page titles: `text-3xl font-bold` (30px, Plus Jakarta Sans)
- Section headings: `text-2xl font-semibold` (24px)
- Card titles: `text-xl font-semibold` (20px)
- Body text: `text-base` (16px, Inter)
- Secondary text: `text-sm text-neutral-500` (14px, gray)

---

### 7.2 Form Patterns

**Input Field Consistency:**
- All inputs: `rounded-lg border border-neutral-300`
- Focus state: `focus:ring-2 focus:ring-brand-500 focus:border-brand-500`
- Error state: `border-error-500 text-error-500` + error message below
- Disabled state: `bg-neutral-100 text-neutral-400 cursor-not-allowed`

**Required Fields:**
- Visual indicator: `*` after label (error-500 color)
- Validation: On blur OR on submit (not on every keystroke - annoying)

**Placeholder Text:**
- Helpful examples, not just field name repetition
- E.g., "Pl. Húsvéti akció a desszertekre" NOT "Írj be egy briefet"

**Label Placement:**
- Always above input (not floating labels)
- `text-sm font-medium text-neutral-700`

---

### 7.3 Feedback Patterns

**Toast Notifications:**
- Position: Top-right corner
- Auto-dismiss: Success (3s), Error (5s), Info (4s)
- Max 3 toasts visible at once (stack)
- Dismissible: X button (top-right of toast)

**Loading States:**
- Skeleton loaders for content (calendar grid, brand list)
- Spinner for actions (AI generation, API calls)
- Progress bar for uploads (image upload)
- Disabled + spinner for buttons during async actions

**Empty States:**
- Illustration + Text + CTA
- E.g., Empty calendar: "Még nincs poszt erre a hétre. [+ Új Poszt]"
- Friendly tone, not just "No data"

**Error States:**
- Inline errors: Below input field, error-500 color
- Banner errors: Top of modal/page, error-50 background, dismissible
- Failed post cards: Red border, error badge, retry button visible

---

### 7.4 Micro-interactions

**Hover States:**
- Cards: `hover:shadow-md transition-shadow duration-200`
- Buttons: `hover:bg-brand-600 transition-colors duration-150`
- Links: `hover:underline`

**Click Feedback:**
- Buttons: `active:scale-95 transition-transform` (subtle scale down)
- Cards: `active:scale-[0.98]` (very subtle)

**Transitions:**
- Modal open/close: Fade + scale (200ms ease-in-out)
- Toast appear/dismiss: Slide from right + fade (150ms)
- Accordion expand: Height transition (300ms ease-in-out)

**Focus States:**
- Keyboard navigation: `focus-visible:ring-2 focus-visible:ring-brand-500`
- Tab order: Logical (top-left → bottom-right)

---

### 7.5 Accessibility Decisions

**WCAG P0 (Alapvető):**
- Keyboard navigation: Tab, Enter, Escape működik
- Alt text: User-uploaded images (user felelőssége)
- Color contrast: Neutral text on white background (minimum 4.5:1)

**WCAG P1 (Jövőbeli):**
- Screen reader support: ARIA labels, semantic HTML
- Contrast ratio compliance: 4.5:1 text, 3:1 UI components
- Focus visible: Keyboard navigation vizualizáció

**Skip to Content:**
- P1: "Skip to main content" link (keyboard users)

---

### 7.6 Performance Patterns

**Image Optimization:**
- Next.js Image component (automatic optimization)
- Lazy loading: Calendar poszt thumbnails
- Responsive images: Serve appropriate size based on viewport

**Code Splitting:**
- Route-based splitting (Next.js automatic)
- Heavy components: `React.lazy()` + `Suspense`
  - E.g., PostEditor modal (csak akkor tölt, ha megnyitják)

**API Optimization:**
- React Query caching: Brands list, Brand Brain (5 min stale time)
- Optimistic updates: Post status change (instant UI, background sync)
- Debouncing: Character counter (300ms delay)

**Bundle Size:**
- Tree-shaking: Tailwind purge unused classes
- Icon optimization: Import only used Lucide icons
- Target: < 200KB initial JS bundle (P0)

---

## 8. Responsive Design & Accessibility

### 8.1 Responsive Strategy

**Design Philosophy:** Desktop-first, Mobile-aware

**Breakpoint Strategy (Tailwind CSS):**
```css
sm: 640px   // Small devices (large phones, landscape)
md: 768px   // Tablets (portrait)
lg: 1024px  // Laptops (small desktops)
xl: 1280px  // Desktops
2xl: 1536px // Large desktops
```

**Responsive Layouts:**

**Desktop (>= 1024px):**
- Full sidebar (250px) + main content
- 3-column Post Editor modal
- 7-day calendar grid (horizontal)
- All features available

**Tablet (768px - 1023px):**
- Collapsible sidebar (hamburger menu)
- 2-column Post Editor modal (Brand Brain collapses into accordion)
- 7-day calendar scrollable list view
- Drag & drop optional (can use date picker instead)

**Mobile (< 768px):**
- Bottom tab bar navigation (Calendar / AI Studio / Settings)
- Single column Post Editor modal (stacked sections)
- Calendar: Day-by-day list view (scrollable)
- Brand selector: Dropdown (top bar)
- **Core workflow működik:** Approve, schedule, edit text
- **Desktop-only:** Brand Brain setup (túl komplex form mobilon)

**Responsive Component Examples:**

```tsx
// BrandSelector - Desktop: Sidebar, Mobile: Dropdown
<div className="hidden lg:block"> {/* Desktop sidebar */}
  <BrandSelectorSidebar />
</div>
<div className="lg:hidden"> {/* Mobile dropdown */}
  <BrandSelectorDropdown />
</div>

// Post Editor - 3 column → 2 column → 1 column
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[20%_50%_30%] gap-4">
  <BrandBrainPreview className="hidden lg:block" /> {/* Desktop only */}
  <MainEditor />
  <PlatformPreview />
</div>

// Calendar Grid - Grid → List
<div className="hidden lg:grid lg:grid-cols-7 gap-2"> {/* Desktop grid */}
  <CalendarDayGrid />
</div>
<div className="lg:hidden space-y-2"> {/* Mobile list */}
  <CalendarDayList />
</div>
```

---

### 8.2 Mobile UX Considerations

**Touch Targets:**
- Minimum size: 44×44px (iOS guideline)
- Buttons: Slightly larger padding on mobile (`py-3` instead of `py-2.5`)
- Cards: 56px minimum height for tap targets

**Scroll Behavior:**
- Modals: Scroll within modal body (not page behind)
- Long lists: Infinite scroll OR pagination (Calendar posts)
- Pull-to-refresh: P1 (nice-to-have)

**Mobile Gestures:**
- Swipe to dismiss modal: P1 (nice-to-have)
- Drag & drop: Desktop-only (P0), mobile uses date picker

**Mobile Performance:**
- Lazy load calendar posts (virtual scrolling - P1)
- Reduce image quality on mobile (Next.js automatic)
- Minimize JS bundle (< 150KB for mobile)

---

### 8.3 Accessibility (WCAG 2.1)

**P0 (Alapvető - MVP-ben):**
- Keyboard navigation works (Tab, Enter, Escape)
- Focus visible (default browser outline OK for P0)
- Alt text: User responsibility (user-uploaded images)
- Color contrast: Minimum 4.5:1 (neutral-600 on white background)
- Semantic HTML: `<button>`, `<input>`, `<label>`, `<nav>` használata

**P1 (Jövőbeli):**
- Screen reader support: ARIA labels, roles, live regions
- Focus visible enhancement: Custom purple ring (`focus-visible:ring-2 focus-visible:ring-brand-500`)
- ARIA live regions: Toast notifications
- Skip to main content link
- WCAG 2.1 AA compliance teljes

**Keyboard Shortcuts (P1):**
- `Ctrl/Cmd + N`: Új poszt
- `Ctrl/Cmd + S`: Mentés draft-ba
- `Ctrl/Cmd + Enter`: Ütemezés
- `Esc`: Modal bezárása
- `Tab`: Navigálás form field-ek között
- `Shift + Tab`: Visszafelé navigálás

---

### 8.4 Cross-browser Compatibility

**P0 Support (MVP):**
- Chrome (latest 2 versions) - Primary testing
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

**No Support:**
- IE11 (EOL)
- Old Safari (iOS < 14)

**Testing Strategy:**
- BrowserStack: Manual testing (Chrome, Firefox, Safari, Edge)
- Playwright: E2E tests (Chrome, Firefox, Webkit)

---

## 9. Implementation Guidance

### 9.1 Completion Summary

**UX Design Specification Elkészült! ✅**

**Tartalmi összefoglaló:**
1. ✅ **Design System Foundation** - Shadcn UI + Tailwind CSS v4 megerősítve
2. ✅ **Core UX Filozófia** - Brand-First + AI Co-Pilot (B + C kombináció)
3. ✅ **Visual Foundation** - Modern, Creative, Friendly - Purple/Violet (#a855f7) színpaletta
4. ✅ **Novel UX Patterns** - 4 pattern definiálva (Active Brand Context Lock, Transparent AI Context, Mandatory Rating, One-Flow Post Creation)
5. ✅ **User Journey Flows** - 4 kritikus journey screen-by-screen leírva
6. ✅ **Component Library** - 7 custom komponens specifikálva + Shadcn UI base
7. ✅ **UX Pattern Decisions** - Consistency rules, form patterns, feedback patterns
8. ✅ **Responsive & Accessibility** - Desktop-first, mobile-aware, WCAG P0

**Generált Artifactok:**
- ✅ `/root/creaitor/docs/ux-design-specification.md` - Teljes UX spec (900+ sor)
- ✅ `/root/creaitor/docs/ux-color-themes.html` - Interaktív color theme explorer

---

### 9.2 Handoff to Development Team

**Frontend Developers:**

**Lépések:**
1. **Olvassátok el a teljes UX Design Specification-t** (`/root/creaitor/docs/ux-design-specification.md`)
2. **Nézzétek meg az interaktív color theme explorer-t** (`/root/creaitor/docs/ux-color-themes.html`) - nyissátok meg böngészőben
3. **Implementáljátok a Tailwind config-ot:**
   - Custom brand colors (purple/violet paletta)
   - Semantic colors (success, warning, error, info)
   - Typography (Plus Jakarta Sans + Inter)
   - Shadows, border radius
4. **Shadcn UI komponensek telepítése:**
   ```bash
   npx shadcn-ui@latest init
   npx shadcn-ui@latest add button input textarea card dialog badge toast calendar
   ```
5. **Custom komponensek építése** (Section 6.1 alapján):
   - BrandSelector (prioritás: magas)
   - PostEditor (prioritás: magas)
   - CalendarGrid (prioritás: magas)
   - PostCard (prioritás: magas)
   - UsabilityRatingModal (prioritás: magas - H1 hipotézis validáláshoz)
   - BrandBrainPreview, PlatformPreview (prioritás: közepes)
6. **User Journey implementation** (Section 5 alapján):
   - Journey 1: Brand onboarding + Brand Brain setup
   - Journey 2: Post creation (One-Flow interface)
   - Journey 3: Approval & scheduling
   - Journey 4: Multi-brand switching

**Backend Developers:**

**Lépések:**
1. **API endpoints implementálása** (Section 6.4 alapján):
   - `POST /api/ai/copy` - AI copy generation (Brand Brain context injection)
   - `POST /api/posts`, `GET /api/posts/:id`, `PATCH /api/posts/:id` - Post CRUD
   - `GET /api/brands/:id/brain`, `PATCH /api/brands/:id/brain` - Brand Brain CRUD
   - `POST /api/publish/:postId` - Manual publish trigger
2. **DB schema review:**
   - Architecture dokumentum szerint (`/root/creaitor/docs/architecture.md`)
   - **Mandatory rating constraint:** `CHECK (is_ai_generated = false OR ai_usability_rating IS NOT NULL)`
3. **Brand Brain Context Injection** (Architecture Pattern 1):
   - AI prompt assembly: Brand Brain (TOV + Key Messages + példaposztok) + user brief
4. **Meta Graph API integráció:**
   - OAuth flow (FB Page + IG Account)
   - Publish endpoint hívás
   - Error handling (token expire, rate limit)

**Product Manager / QA:**

**Acceptance Criteria Review:**
1. **H1 Hipotézis validálása:** Mandatory usability rating működik? (Cannot save without rating)
2. **H2 Hipotézis validálása:** One-flow post creation működik? (Brief → Generate → Edit → Schedule egy interfészen)
3. **Active Brand Context Lock:** Márka-váltás explicit? Brand-locked műveletek működnek?
4. **Transparent AI Context:** User látja a Brand Brain kivonatot AI Studio-ban?

**Testing Checklist:**
- [ ] Purple/violet color system implementálva (brand-500 primary)
- [ ] Shadcn UI komponensek működnek (Button, Input, Card, Dialog, Badge)
- [ ] BrandSelector sidebar működik (active brand gradient háttér, inactive white)
- [ ] PostEditor modal One-Flow (3 column layout desktop, 1 column mobile)
- [ ] UsabilityRatingModal blocking (cannot dismiss, mandatory selection)
- [ ] Calendar grid 7-day view (desktop grid, mobile list)
- [ ] Drag & drop működik (PostCard → Calendar slot)
- [ ] Meta OAuth flow működik (FB Page + IG Account csatolás)
- [ ] AI Copy generation működik (Brand Brain context injection)
- [ ] Publish flow működik (Draft → Approved → Scheduled → Published)
- [ ] Mobile responsive működik (core workflow: approve, schedule, edit text)

---

### 9.3 Open Questions & Future Decisions

**P0 vs P1 Decisions (Sprint Planning során eldöntendő):**
1. **AI Visual Studio** - P0 vagy P1?
   - Architecture dokumentum teljes implementációt tartalmaz (Nano Banana + Seedream dual provider)
   - P0 alternatíva: Manual image upload (drag & drop)
   - **Döntési pont:** Sprint planning során eldöntjük a prioritást
2. **Drag & Drop Calendar** - P0 vagy P1?
   - Desktop: Drag & drop OR manual date picker (elég az egyik P0-ban)
   - Mobile: Date picker only (drag & drop desktop-only)
3. **Multi-user Approval** - P0 vagy P1?
   - P0: Self-approval (pseudo-approval)
   - P1: Multi-user review (Draft → Review → Approved)
4. **Background Job Queue** - P0 vagy P1?
   - P0: Simple cron job + manual retry
   - P1: BullMQ + auto retry (3x exponential backoff)

**Design Decisions Later (Implementation során):**
1. **Brand Brain form layout:** Accordion OR Tabs?
   - Recommendation: Tabs (cleaner, easier navigation)
2. **Calendar empty state illustration:** Custom vagy stock illustration?
3. **Loading skeleton animation:** Pulsing OR shimmer?
   - Recommendation: Pulsing (simpler, consistent with Tailwind)

---

### 9.4 Success Metrics (UX Szemszögből)

**Pilot során mérendő (H1 Hipotézis - Brand Brain):**
- Mandatory usability rating aggregálása:
  - Target: 70%+ "Rendben, kisebb módosítással"
  - Red flag: 30%+ "Nem használható, újat írtam"

**Pilot során mérendő (H2 Hipotézis - Workflow Adoption):**
- One-flow post creation completion rate:
  - Target: 80%+ user végigviszi Brief → Generate → Schedule flow-t
  - Red flag: 50%< user félbehagyja (exit modal mid-flow)

**UX Friction Points (Pilot feedback során figyelendő):**
- Brand Brain setup: Túl hosszú/bonyolult? (kvali interjú)
- Mandatory rating: Túl sok friction? (kvali interjú)
- Multi-brand switching: Konfúzió? Márka-keveredés? (usage tracking)

---

## Appendix

### Related Documents

- Product Requirements: `/root/creaitor/docs/prd-creaitor-2025-11-18/`
- Product Brief: `/root/creaitor/docs/product-brief-creaitor-2025-11-17.md`
- Architecture: `/root/creaitor/docs/architecture.md`
- Epics: `/root/creaitor/docs/epics/`
- Sprint Status: `/root/creaitor/docs/sprint-artifacts/sprint-status.yaml`

### Core Interactive Deliverables

This UX Design Specification was created through visual collaboration:

- **Color Theme Visualizer**: `/root/creaitor/docs/ux-color-themes.html`
  - Interactive HTML showing purple/violet color palette
  - Live UI component examples (buttons, cards, inputs, badges)
  - Typography samples (Plus Jakarta Sans + Inter)
  - Layout example (Brand Selector sidebar + main content)

### Next Steps & Follow-Up Workflows

This UX Design Specification can serve as input to:

- **Architecture Workflow** - Validate UX patterns align with tech decisions ✅ (Already aligned)
- **Sprint Planning Workflow** - Prioritize P0 vs P1 decisions (AI Visual Studio, Drag & Drop, etc.)
- **Story Creation Workflow** - Break down UX journeys into user stories
- **Component Showcase Workflow** (Optional P1) - Interactive Storybook for komponens library
- **Figma Design Workflow** (Optional P1) - High-fidelity mockups Figma-ban

### Version History

| Date       | Version | Changes                              | Author |
| ---------- | ------- | ------------------------------------ | ------ |
| 2025-11-19 | 1.0     | Initial UX Design Specification      | Sally (BMad UX Designer Agent) |

---

_This UX Design Specification was created through collaborative design facilitation, not template generation. All decisions were made with user input and are documented with rationale._

**Created by:** Sally, UX Designer Agent (BMad Method)
**Collaboration with:** BMad
**Date:** 2025-11-19
**Workflow:** Create UX Design (Retrospective - Post-Architecture)

---

## 9. Implementation Guidance

### 9.1 Completion Summary

{{completion_summary}}

---

## Appendix

### Related Documents

- Product Requirements: ``
- Product Brief: ``
- Brainstorming: ``

### Core Interactive Deliverables

This UX Design Specification was created through visual collaboration:

- **Color Theme Visualizer**: /root/creaitor/docs/ux-color-themes.html
  - Interactive HTML showing all color theme options explored
  - Live UI component examples in each theme
  - Side-by-side comparison and semantic color usage

- **Design Direction Mockups**: /root/creaitor/docs/ux-design-directions.html
  - Interactive HTML with 6-8 complete design approaches
  - Full-screen mockups of key screens
  - Design philosophy and rationale for each direction

### Optional Enhancement Deliverables

_This section will be populated if additional UX artifacts are generated through follow-up workflows._

<!-- Additional deliverables added here by other workflows -->

### Next Steps & Follow-Up Workflows

This UX Design Specification can serve as input to:

- **Wireframe Generation Workflow** - Create detailed wireframes from user flows
- **Figma Design Workflow** - Generate Figma files via MCP integration
- **Interactive Prototype Workflow** - Build clickable HTML prototypes
- **Component Showcase Workflow** - Create interactive component library
- **AI Frontend Prompt Workflow** - Generate prompts for v0, Lovable, Bolt, etc.
- **Solution Architecture Workflow** - Define technical architecture with UX context

### Version History

| Date     | Version | Changes                         | Author        |
| -------- | ------- | ------------------------------- | ------------- |
| 2025-11-19 | 1.0     | Initial UX Design Specification | BMad |

---

_This UX Design Specification was created through collaborative design facilitation, not template generation. All decisions were made with user input and are documented with rationale._
