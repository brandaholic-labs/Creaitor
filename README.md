# Creaitor is a brand-first AI social media content platform designed for agencies.

## Design System

The project uses a custom design system built on **Tailwind CSS v4** and **Shadcn UI**.

### Design Tokens
Design tokens are defined as CSS variables in `src/styles/design-tokens.css`.
- **Colors**: Purple/Violet brand palette (`--color-brand-500`), semantic colors (`--color-primary`, `--color-destructive`, etc.)
- **Typography**: `Plus Jakarta Sans` (Headings) and `Inter` (Body)
- **Spacing & Radius**: Standardized scales (e.g., `--radius-md`)

### Components
UI components are located in `src/components/ui/`.
To add a new component:
```bash
npx shadcn@latest add [component-name]
```

### Dark Mode
The system is future-ready for dark mode. Toggle the `.dark` class on the `html` element to switch themes.

## Prerequisites

- Node.js 20 LTS or later
- Docker and Docker Compose (for local Redis and Supabase)
- Supabase CLI (installed via npm as dev dependency)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-org/creaitor.git
cd creaitor
```

2. Install dependencies:
```bash
npm install
```

3. Set up Supabase local development:
```bash
# Initialize Supabase (if not already done)
npx supabase init

# Start Supabase local services (PostgreSQL, Auth, Storage, Studio)
npx supabase start

# Get connection details
npx supabase status
```

4. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase connection details from `npx supabase status`:
- `NEXT_PUBLIC_SUPABASE_URL` - API URL (local: http://127.0.0.1:54321)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Publishable key (safe for client-side)
- `SUPABASE_SERVICE_ROLE_KEY` - Secret key (server-side only, SECRET)
- `REDIS_URL` - Redis connection URL (Docker: redis://redis:6379, Manual: redis://localhost:6379)

5. Apply database migrations:
```bash
npx supabase migration up
```

6. Generate TypeScript types from database schema:
```bash
npx supabase gen types typescript --local > src/types/database.types.ts
```

## Development

### Option A: Docker Compose (Recommended)

The easiest way to run all services consistently:

```bash
# Start all services (Next.js app, Redis)
docker-compose up

# Or run in detached mode (background)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Stop and remove volumes (clean slate)
docker-compose down -v
```

**Services:**
- Next.js app: http://localhost:3000
- Redis: localhost:6379
- Supabase: Run separately with `npx supabase start` (outside Docker)

**Note:** Supabase runs via Supabase CLI (not in Docker Compose) for easier setup and Supabase Studio access.

### Option B: Manual Setup

1. Start Supabase local services:
```bash
npx supabase start
```

2. Start Redis (via Docker):
```bash
docker run -d -p 6379:6379 redis:7-alpine
```

3. Start the Next.js development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Docker Compose Commands

- **Start all services:** `docker-compose up` or `npm run docker:up`
- **Stop all services:** `docker-compose down` or `npm run docker:down`
- **View logs:** `docker-compose logs -f` or `npm run docker:logs`
- **Rebuild containers:** `docker-compose up --build`
- **Clean volumes:** `docker-compose down -v`

### Supabase Commands

- **Start Supabase:** `npx supabase start`
- **Stop Supabase:** `npx supabase stop`
- **Reset database:** `npx supabase db reset` (applies all migrations and seed data)
- **Check status:** `npx supabase status`
- **Create migration:** `npx supabase migration new <name>`
- **Apply migrations:** `npx supabase migration up`
- **Generate types:** `npx supabase gen types typescript --local > src/types/database.types.ts`
- **Open Studio:** http://localhost:54323 (Supabase Studio dashboard)

### Project Structure

```
src/
├── app/              # Next.js App Router (routing, pages, API routes)
├── components/       # UI components (Shadcn UI + custom)
│   └── ui/           # Shadcn UI base components
├── lib/              # Shared utilities and helpers
│   └── utils.ts      # Utility functions (cn, etc.)
├── services/         # Business logic services (AI, Meta, etc.)
└── types/            # TypeScript type definitions
```

## Testing

Testing infrastructure is set up with Jest (Unit/Integration) and Playwright (E2E).
 
 ```bash
 # Run unit tests
 npm run test:unit
 
 # Run integration tests
 npm run test:integration
 
 # Run E2E tests
 npm run test:e2e
 
 # Run all tests (except E2E)
 npm run test
 
 # Generate coverage report
 npm run test:coverage
 ```

## Logging

Structured logging using Winston with different formats for development and production.

### Log Levels

- **ERROR:** Application errors and exceptions
- **WARN:** Warning messages (non-critical issues)
- **INFO:** General information (user events, API calls)
- **DEBUG:** Detailed debugging information (dev only)

### Log Destinations

- **Development:** Console (pretty print, colorized)
- **Production:** JSON files (structured for log aggregation)
  - `logs/error-YYYY-MM-DD.log` - Errors only
  - `logs/combined-YYYY-MM-DD.log` - All logs
  - **Rotation:** 20MB max filesize, retains 14 days

### Basic Usage

```typescript
import logger from '@/lib/logger';

// Simple logging
logger.info('User logged in', { userId: '123', email: 'user@example.com' });
logger.error('Database connection failed', { error: err.message });
logger.warn('Slow API response', { endpoint: '/api/posts', duration: 5000 });
logger.debug('Cache hit', { key: 'user:123', ttl: 3600 });
```

### Utility Functions

```typescript
import { logUserEvent, logAICall, logPublishEvent, logError } from '@/lib/logger';

// Log user events
logUserEvent('user_123', 'login', { ip: '192.168.1.1' });

// Log AI API calls (for tracking usage and costs)
logAICall('brand_456', 'openai', 1500, 2300); // brandId, provider, tokens, latency(ms)

// Log publishing events
logPublishEvent('post_789', 'facebook', 'success', { fbPostId: '123456' });
logPublishEvent('post_790', 'instagram', 'failed', { error: 'Invalid access token' });

// Log errors with context
try {
  await riskyOperation();
} catch (error) {
  logError(error as Error, { userId: 'user_123', operation: 'riskyOperation' });
}
```

### Request Logging Middleware

Automatically log all API requests with duration, status code, and user ID:

```typescript
// src/app/api/example/route.ts
import { withRequestLogging } from '@/lib/logger/middleware';
import { NextRequest, NextResponse } from 'next/server';

export const GET = withRequestLogging(async (request: NextRequest) => {
  // Your API logic here
  return NextResponse.json({ data: 'example' });
});
```

**Logged information:**
- Request ID (unique per request)
- HTTP method and URL
- Request duration (milliseconds)
- Response status code
- User ID (if authenticated - Epic 2)

## Building for Production

```bash
npm run build
npm run start
```

## Contributing

1. Create a feature branch from `main`
2. Make your changes following the coding standards
3. Run tests and linting
4. Submit a pull request

## Tech Stack

- **Framework:** Next.js 15 (App Router) with TypeScript
- **Styling:** Tailwind CSS v4 + Shadcn UI
- **Database:** Supabase (PostgreSQL + Auth + Storage)
- **State:** Zustand + React Query
- **AI:** OpenAI GPT-4 + Anthropic Claude 3.5
- **Background Jobs:** BullMQ + Redis (P1)
- **Logging:** Winston

## License

Proprietary - All rights reserved
