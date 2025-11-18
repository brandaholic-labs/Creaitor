# Creaitor - Product Requirements Document

**Szerző:** BMad
**Dátum:** 2025-01-18
**Verzió:** 1.0

---

## Executive Summary

A Creaitor egy AI-alapú közösségi média tartalomkezelő platform, amely kifejezetten 3–10 fős marketing és social media ügynökségek számára készül. A platform központi innovációja a **Brand Brain koncepció**: minden ügyfélmárkához egy strukturált, AI-vezérelt "márka-agy" tartozik, amely biztosítja, hogy a generált tartalom ne legyen generikus AI-szöveg, hanem valóban márkahű kommunikáció.

A Creaitor célja, hogy az ügynökségi socialosok számára egyszerűsítse és részben automatizálja a heti Facebook és Instagram tartalomnaptár összeállítását, gyorsítsa a szöveg- és vizuálgenerálást, és egy rendszerben kezelje a naptárat, a jóváhagyást és az ütemezést – miközben megtartja vagy javítja a márkahűséget.

### Mi teszi ezt különlegessé?

**Brand Brain koncepció** - Az egyetlen AI-alapú social media platform, amely nem általános tartalmat gyárt, hanem minden márkához külön "márka-agyat" épít. Ez a strukturált tudásbázis (példapostok, tone of voice, key messages, vizuális irányok) biztosítja, hogy az AI mindig a márka hangjában kommunikáljon.

**Miért fontos ez?** A piackutatás egyértelműen mutatja: a marketingesek 77%-a kísérletezik generatív AI-val, de csak 44%-uk lát jelentős előnyt. A fő probléma: az AI-generált tartalom nem elég "on-brand". A Creaitor pont ezt a rést tölti be – workflow-ba integrált, márkahű AI-tartalomgyártás ügynökségi környezetben.

---

## Projekt Klasszifikáció

**Technikai típus:** SaaS B2B Web Alkalmazás (Social Media Management)

**Domain:** Általános / Marketing Technology

**Komplexitás:** Közepes-Magas

### Projekt jellemzők

A Creaitor egy **multi-tenant SaaS B2B platform**, amely kombinál több összetett technológiai komponenst:

- **Web-alapú alkalmazás** - Modern SPA/SSR architektúra böngészőben
- **Multi-tenant rendszer** - Több ügynökség, több márka, több felhasználó kezelése
- **AI integráció** - LLM-alapú szöveggenerálás, képgenerálás API-kon keresztül
- **Harmadik fél API-k** - Facebook, Instagram (Meta Graph API) integrációk
- **Workflow management** - Naptár, jóváhagyási folyamat, ütemezés
- **Real-time collaboration** - Több felhasználó egyidejű munkája ugyanazon márkákon

### Miért nem specialized domain?

Bár a platform a marketing/social media szektorban működik, **nem tartozik a magas szabályozottságú domainekhez** (pl. healthcare, fintech, aerospace). Nem igényel:
- Speciális compliance certificációt (FDA, HIPAA, PCI-DSS)
- Szakértői domain tudást (orvosi, jogi, pénzügyi)
- Iparág-specifikus szabványokat

Ugyanakkor **létfontosságú domain expertise** szükséges a következő területeken:
- Social media marketing best practices
- Ügynökségi workflow-k és működés
- Brand identity és tone of voice management
- Magyar és közép-kelet-európai piaci sajátosságok

---

## Referenciák

- **Product Brief:** docs/product-brief-creaitor-2025-11-17.md
- **Market Research:** docs/market-research.md
- **Competitive Analysis:** docs/competitive-analysis.md
- **Brainstorming Session:** docs/brainstorming-session-results-2025-11-16.md

---
