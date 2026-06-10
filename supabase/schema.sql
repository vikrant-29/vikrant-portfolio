-- ============================================================
-- Vikrant Portfolio — Supabase Schema
-- Run this in Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABLE: profiles
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name    TEXT NOT NULL DEFAULT '',
  role         TEXT NOT NULL DEFAULT 'viewer', -- 'admin' | 'viewer'
  avatar_url   TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABLE: apps
-- ============================================================
CREATE TABLE IF NOT EXISTS apps (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug              TEXT NOT NULL UNIQUE,
  title             TEXT NOT NULL,
  short_description TEXT NOT NULL DEFAULT '',
  full_description  TEXT NOT NULL DEFAULT '',
  logo_url          TEXT,
  featured          BOOLEAN NOT NULL DEFAULT FALSE,
  tech_stack        TEXT[] NOT NULL DEFAULT '{}',
  github_url        TEXT,
  live_url          TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS apps_slug_idx     ON apps (slug);
CREATE INDEX IF NOT EXISTS apps_featured_idx ON apps (featured);

-- ============================================================
-- TABLE: screenshots
-- ============================================================
CREATE TABLE IF NOT EXISTS screenshots (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  app_id     UUID NOT NULL REFERENCES apps(id) ON DELETE CASCADE,
  image_url  TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS screenshots_app_id_idx ON screenshots (app_id);

-- ============================================================
-- TABLE: contacts
-- ============================================================
CREATE TABLE IF NOT EXISTS contacts (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  message    TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE apps        ENABLE ROW LEVEL SECURITY;
ALTER TABLE screenshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts    ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles    ENABLE ROW LEVEL SECURITY;

-- ---- apps ----
CREATE POLICY "apps_select_public"
  ON apps FOR SELECT USING (true);

CREATE POLICY "apps_insert_authenticated"
  ON apps FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "apps_update_authenticated"
  ON apps FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "apps_delete_authenticated"
  ON apps FOR DELETE
  USING (auth.role() = 'authenticated');

-- ---- screenshots ----
CREATE POLICY "screenshots_select_public"
  ON screenshots FOR SELECT USING (true);

CREATE POLICY "screenshots_insert_authenticated"
  ON screenshots FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "screenshots_update_authenticated"
  ON screenshots FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "screenshots_delete_authenticated"
  ON screenshots FOR DELETE
  USING (auth.role() = 'authenticated');

-- ---- contacts ----
CREATE POLICY "contacts_insert_public"
  ON contacts FOR INSERT WITH CHECK (true);

CREATE POLICY "contacts_select_admin"
  ON contacts FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "contacts_delete_admin"
  ON contacts FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- ---- profiles ----
CREATE POLICY "profiles_select_public"
  ON profiles FOR SELECT USING (true);

CREATE POLICY "profiles_update_admin"
  ON profiles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid()
      AND p.role = 'admin'
    )
  );

-- ============================================================
-- STORAGE BUCKET: app-assets
-- (run in Supabase Dashboard → Storage → New Bucket)
-- Or via SQL:
-- ============================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('app-assets', 'app-assets', true)
ON CONFLICT DO NOTHING;

-- Allow public reads
CREATE POLICY "app_assets_public_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'app-assets');

-- Allow authenticated uploads
CREATE POLICY "app_assets_authenticated_upload"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'app-assets'
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "app_assets_authenticated_update"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'app-assets'
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "app_assets_authenticated_delete"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'app-assets'
    AND auth.role() = 'authenticated'
  );

-- ============================================================
-- SEED: Sample apps (optional — remove if not needed)
-- ============================================================
INSERT INTO apps (slug, title, short_description, full_description, featured, tech_stack, github_url)
VALUES
  ('taskflow',  'TaskFlow',  'A productivity app to organize tasks, set reminders, and track daily goals.',
   'TaskFlow is a feature-rich productivity app built natively for Android using Java and Firebase. Users can create tasks with priorities, set smart reminders, and visualize daily productivity. Room Database provides offline support while Firebase Firestore syncs data across devices.',
   true, ARRAY['Java','XML','Firebase','Room DB','WorkManager'], 'https://github.com'),

  ('budgetly',  'Budgetly',  'Smart expense tracker with real-time sync, beautiful charts, and AI-powered spending insights.',
   'Budgetly is a cross-platform expense tracking app built with Flutter and Firebase. It features real-time spending sync, FL Chart visualizations, category-based budgets, and monthly reports. Built with Riverpod for state management and Hive for local caching.',
   true, ARRAY['Flutter','Dart','Firebase','FL Chart','Riverpod'], 'https://github.com'),

  ('newswave',  'NewsWave',  'A clean news reader fetching live articles with offline reading and dark mode.',
   'NewsWave fetches live news via the NewsAPI REST endpoint using Retrofit. Articles are cached with Room for offline reading. Features full dark mode, category filters, bookmarks, and share functionality.',
   true, ARRAY['Java','Retrofit','REST API','XML','Room DB'], 'https://github.com'),

  ('fitnest',   'FitNest',   'Workout tracker and fitness planner with custom routines and progress charts.',
   'FitNest lets users build custom workout routines, log sets and reps, and track progress over time with beautiful visualizations. All data stored locally with SQLite via Room Database.',
   false, ARRAY['Flutter','Dart','SQLite'], 'https://github.com'),

  ('weatherly', 'Weatherly', 'Beautiful weather app with hourly forecasts and animated visuals.',
   'Weatherly uses the OpenWeatherMap API to show real-time weather data. Features include hourly and 7-day forecasts, animated weather icons, GPS location detection, and a stunning dark-themed UI.',
   false, ARRAY['Java','Retrofit','REST API','XML'], 'https://github.com'),

  ('notecraft', 'NoteCraft', 'Rich text note-taking with categories, cloud sync, and markdown support.',
   'NoteCraft supports rich text editing with markdown preview, category organization, tags, cloud sync via Firebase Firestore, and offline support through Hive local storage.',
   false, ARRAY['Flutter','Dart','Firebase','Hive'], 'https://github.com')

ON CONFLICT (slug) DO NOTHING;
