# Functional Requirements Összefoglalás

| Feature Area | P0 Core Funkciók | OUT of scope P0 (P1-be megy) |
|--------------|------------------|------------------------------|
| **Multi-Tenant** | Ügynökség reg, user meghívás, márka CRUD, egyszerű jogosultságok (minden user = socialos) | Fine-grained permissions, szerepkörök, audit log |
| **Brand Brain** | TOV, Key Messages, Reference Posts, Visual Direction (JSON, nem kötelező mezők) | Kötelező mezők validáció, brand voice scoring, AI-assisted setup |
| **AI Copy Studio** | Brief input, 1 variáns generálás, inline szerkesztés, **kötelező usability rating** (P0!) | Multi-variáns, hashtag javaslat, regenerálás, model választás |
| **Image** | Saját kép feltöltés, auto resize (1200×630 vagy 1080×1080) | AI Visual Studio (képgenerálás), carousel support |
| **Calendar** | Heti nézet (Mon-Sun), poszt slotok, státuszok | Havi nézet, drag&drop ÉS manual picker (P0: válasszunk egyet) |
| **Approval** | Pseudo-approval (self-approval, workflow testing) | Multi-user review, comment thread, notifications |
| **Publishing** | **Manual Scheduling** (jövőbeli időpont), Meta API, manual retry | **Instant Publish**, background job queue, auto retry, job monitoring |
| **Instrumentation** | Backend event logging, usability rating aggregáció (admin-only CSV) | Socialos-facing dashboard, real-time vizualizációk |

**Kritikus P0 Döntések (FR0.2 alapján):**
- ✅ **Scheduling P0, Instant Publish OUT**
- ✅ **Usability Rating kötelező P0**
- ✅ **Pseudo-approval (self) P0, Multi-user review OUT**
- ✅ **Heti nézet P0, Havi nézet OUT**
- ✅ **Real-time collaboration OUT, Last-write-wins P0**

---