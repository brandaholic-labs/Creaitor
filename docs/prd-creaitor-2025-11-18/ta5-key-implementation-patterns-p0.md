# TA5: Key Implementation Patterns (P0)

## TA5.1: Session Management (DB-Backed)

**Config (express-session + connect-pg-simple):**

```typescript
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import { Pool } from 'pg';

const PgSession = connectPgSimple(session);
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.use(session({
  store: new PgSession({
    pool: pool,
    tableName: 'sessions'  // sessions table in PostgreSQL
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: true,  // HTTPS only
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
  }
}));
```

**Sessions table (Prisma schema):**
```prisma
model Session {
  sid    String   @id
  sess   Json
  expire DateTime

  @@index([expire])
}
```

**Miért fontos:**
- ✅ Session perzisztens (app restart → user marad bejelentkezve)
- ✅ Stabil UX pilotban

---

## TA5.2: Cron Job Idempotencia (Publishing)

**Probléma:** Cron job duplikáltan fut → duplikált poszt kockázat.

**Megoldás (P0):**

```typescript
import cron from 'node-cron';

// Run every 5 minutes
cron.schedule('*/5 * * * *', async () => {
  console.log('[CRON] Checking scheduled posts...');

  const now = new Date();

  // Find scheduled posts ready to publish
  const postsToPublish = await prisma.post.findMany({
    where: {
      status: 'scheduled',
      scheduled_at: { lte: now },
      publishing_lock: false,  // P0 idempotencia check
      OR: [
        { last_publish_attempt_at: null },
        { last_publish_attempt_at: { lt: new Date(now.getTime() - 5 * 60 * 1000) } }  // > 5 min ago
      ]
    },
    include: { brand: true }
  });

  for (const post of postsToPublish) {
    try {
      // 1. Set lock (idempotencia)
      await prisma.post.update({
        where: { id: post.id },
        data: {
          publishing_lock: true,
          last_publish_attempt_at: now
        }
      });

      // 2. Publish to Meta API
      const result = await publishToMeta(post);

      // 3. Update status (success)
      await prisma.post.update({
        where: { id: post.id },
        data: {
          status: 'published',
          published_at: now,
          fb_post_id: result.fb_post_id,
          ig_media_id: result.ig_media_id,
          publishing_lock: false
        }
      });

      console.log(`[CRON] Published post ${post.id}`);
    } catch (error) {
      // 4. Update status (failed)
      await prisma.post.update({
        where: { id: post.id },
        data: {
          status: 'failed',
          error_message: error.message,
          publishing_lock: false  // Release lock
        }
      });

      console.error(`[CRON] Failed to publish post ${post.id}:`, error);
    }
  }
});
```

**Idempotencia mechanizmus:**
- ✅ **publishing_lock:** Boolean flag → elkerüli a duplikált publish attempt-et
- ✅ **last_publish_attempt_at:** Timestamp check → ha < 5 perc → skip (túl közeli retry védelem)
- ✅ **Transaction-like pattern:** Lock set → publish → lock release

**P1 - Queue-based:**
- BullMQ / Sidekiq → automatic retry, exponential backoff, job monitoring
- Idempotencia built-in (job ID alapján)

---

## TA5.3: AI Provider Abstraction (P0 - Single Provider, P1 - Multi)

**P0 - Single provider (OpenAI VAGY Anthropic):**

```typescript
// AI service (single provider P0)
async function generateAICopy(brief: string, brandBrain: BrandBrain): Promise<string> {
  const prompt = constructPrompt(brief, brandBrain);  // lásd FR3.1

  // P0: Hardcoded provider (OpenAI VAGY Anthropic - build-time döntés)
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: "Te egy social media copywriter vagy." },
      { role: "user", content: prompt }
    ],
    temperature: 0.7,
    max_tokens: 500
  });

  return completion.choices[0].message.content.trim();
}
```

**P1 - Multi-provider (fallback + switching):**

```typescript
// AI service (multi-provider P1)
async function generateAICopy(brief: string, brandBrain: BrandBrain, provider: 'openai' | 'anthropic' = 'openai'): Promise<string> {
  const prompt = constructPrompt(brief, brandBrain);

  try {
    if (provider === 'openai') {
      return await callOpenAI(prompt);
    } else {
      return await callAnthropic(prompt);
    }
  } catch (error) {
    // Fallback to other provider
    if (provider === 'openai') {
      console.warn('[AI] OpenAI failed, falling back to Anthropic');
      return await callAnthropic(prompt);
    } else {
      console.warn('[AI] Anthropic failed, falling back to OpenAI');
      return await callOpenAI(prompt);
    }
  }
}
```

**P0: Single provider elég** → Gyorsabb fejlesztés, kevesebb edge case.

---
