# R4: Key Dependencies (Kritikus Függőségek)

## R4.1. External Services

| Dependency | Criticality | Fallback / Mitigation | Learning-first fallback |
|------------|-------------|----------------------|------------------------|
| **Meta Graph API** | 🔴 Kritikus – publishing nélkül a fő value prop sérül | Version pinning, policy monitoring, staging app | Ha tartósan instabil: pilot cél átmenetileg AI + naptár + workflow tesztelése, publikálás a user oldalán (Meta Business Suite), miközben tovább méred az időmegtakarítást |
| **OpenAI / Anthropic** | 🔴 Kritikus – AI nélkül a fő differenciálás gyengül | Egy provider választása P0-ban, explicit költségkeret | Ha bármelyik provider kiesik: átmenetileg kevesebb generálás, nagyobb hangsúly a Calendar/Workflow-adoption mérésén; később dual-provider support |
| **Render / Railway** | 🔴 Kritikus – app elérhetőség | Managed hosting, backup, providerváltás dokumentálása | Ha hosszan down: lokális/dev környezetből Figma demo + UX-interjúk továbbvihetők, legalább kvali tanulás nem áll le |
| **SendGrid / Mailgun** | 🟡 Közepes | Switch egyik szolgáltatóról a másikra 1–2 óra configgal | Ha email down: ideiglenesen manuális jelszóreset / kézi invite pilot user-eknek |
| **Cloudinary / S3** | 🟡 Közepes | Storage provider váltás script-tel, csak URL-ek migrációja | Ha storage limit / outage: AI + text-only pilot-szakasz, a vizuál-dolgot később validálod, de a core flow (szöveg, naptár, approval) mérhető marad |

---

## R4.2. Internal Dependencies

| Dependency | Criticality | Mitigation |
|------------|-------------|------------|
| **Brand Brain data quality** | 🔴 Kritikus – rossz input → rossz AI output | Onboarding példákkal (mintakávézó), min. TOV karakterszám, min. key message szám, P1-ben AI-assisted setup |
| **Pilot user őszinteség** (rating, time tracking) | 🟡 Közepes | Transzparens kommunikáció a célokról; anonim survey; időmérés + rating + usage + NPS együtt értelmezve, nem különállóan |

---
