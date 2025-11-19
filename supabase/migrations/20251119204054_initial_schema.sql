-- Initial Database Schema for Creaitor
-- Epic 1: Foundation & Development Infrastructure - Story 1.2
-- 
-- This migration creates the core database schema:
-- - Core entities: agencies, users, brands, brand_brain_entries, social_profiles, posts, usage_events
-- - Enums: post_status, usability_rating
-- - Indexes for performance
-- - RLS policies as placeholders (DISABLED - will be enabled in Epic 2)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- ENUMS
-- ============================================================================

CREATE TYPE post_status AS ENUM ('DRAFT', 'REVIEW', 'APPROVED', 'SCHEDULED', 'PUBLISHED', 'FAILED');
CREATE TYPE usability_rating AS ENUM ('GOOD_MINOR_EDITS', 'MAJOR_REWORK', 'NOT_USABLE');

-- ============================================================================
-- TABLES
-- ============================================================================

-- 1. agencies (Multi-tenant root)
CREATE TABLE agencies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. users (Extends auth.users)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  agency_id UUID REFERENCES agencies(id),
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'editor', -- 'admin' | 'editor'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. brands
CREATE TABLE brands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agency_id UUID REFERENCES agencies(id),
  name TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. brand_brain_entries
CREATE TABLE brand_brain_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
  tone_of_voice TEXT,
  key_messages TEXT[], -- Array
  example_posts TEXT[], -- 1-3 example posts
  visual_direction TEXT,
  taboos TEXT[], -- Words to avoid
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(brand_id) -- One brain per brand
);

-- 5. social_profiles
CREATE TABLE social_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
  platform TEXT NOT NULL, -- 'facebook' | 'instagram'
  platform_user_id TEXT NOT NULL, -- FB Page ID / IG Account ID
  access_token TEXT, -- Encrypted OAuth token
  token_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. posts
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id UUID REFERENCES brands(id),
  created_by UUID REFERENCES users(id),

  -- Content
  brief TEXT,
  generated_text TEXT,
  final_text TEXT NOT NULL,
  image_url TEXT,

  -- AI metadata
  is_ai_generated BOOLEAN DEFAULT FALSE,
  ai_usability_rating usability_rating,
  ai_provider TEXT,

  -- Publishing
  platform TEXT NOT NULL,
  status post_status DEFAULT 'DRAFT',
  scheduled_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  meta_post_id TEXT,

  -- Error handling
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Architecture Pattern 4: Mandatory rating constraint
  CONSTRAINT check_ai_rating CHECK (
    (is_ai_generated = false) OR
    (is_ai_generated = true AND ai_usability_rating IS NOT NULL)
  )
);

-- 7. usage_events (Instrumentation - Epic 7 része, de schema Epic 1-ben)
CREATE TABLE usage_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  agency_id UUID REFERENCES agencies(id),
  event_type TEXT NOT NULL, -- 'post_created', 'ai_generated', 'published', etc.
  event_metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX idx_posts_brand_id ON posts(brand_id);
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_scheduled_at ON posts(scheduled_at) WHERE status = 'SCHEDULED';
CREATE INDEX idx_brands_agency_id ON brands(agency_id);
CREATE INDEX idx_users_agency_id ON users(agency_id);

-- ============================================================================
-- RLS POLICIES (PLACEHOLDER - DISABLED - Epic 2-ben enablelve)
-- ============================================================================

-- NOTE: RLS policies will be enabled in Epic 2 (Story 2.3)
-- These are placeholders to document the intended policy structure

-- Enable RLS on all tables
-- ALTER TABLE agencies ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE users ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE brand_brain_entries ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE social_profiles ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE usage_events ENABLE ROW LEVEL SECURITY;

-- Example RLS policy structure (to be implemented in Epic 2):
-- CREATE POLICY "Users can only see their own agency's data"
--   ON agencies
--   FOR SELECT
--   USING (auth.uid() IN (SELECT id FROM users WHERE agency_id = agencies.id));

