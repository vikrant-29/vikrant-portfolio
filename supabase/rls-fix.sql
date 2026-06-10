-- ============================================================
-- RLS FIX — Run this in Supabase SQL Editor
-- Safe to re-run: uses DROP IF EXISTS before CREATE
-- ============================================================

-- ---- APPS ----
ALTER TABLE apps ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "apps_select_public"          ON apps;
DROP POLICY IF EXISTS "apps_insert_authenticated"   ON apps;
DROP POLICY IF EXISTS "apps_update_authenticated"   ON apps;
DROP POLICY IF EXISTS "apps_delete_authenticated"   ON apps;

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

-- ---- SCREENSHOTS ----
ALTER TABLE screenshots ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "screenshots_select_public"         ON screenshots;
DROP POLICY IF EXISTS "screenshots_insert_authenticated"  ON screenshots;
DROP POLICY IF EXISTS "screenshots_update_authenticated"  ON screenshots;
DROP POLICY IF EXISTS "screenshots_delete_authenticated"  ON screenshots;

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

-- ---- CONTACTS ----
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "contacts_insert_public" ON contacts;
DROP POLICY IF EXISTS "contacts_select_admin"  ON contacts;
DROP POLICY IF EXISTS "contacts_delete_admin"  ON contacts;

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

-- ---- PROFILES ----
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "profiles_select_public" ON profiles;
DROP POLICY IF EXISTS "profiles_update_admin"  ON profiles;

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
-- STORAGE POLICIES (app-assets bucket)
-- ============================================================

-- First make sure the bucket exists and is public
INSERT INTO storage.buckets (id, name, public)
VALUES ('app-assets', 'app-assets', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "app_assets_public_read"             ON storage.objects;
DROP POLICY IF EXISTS "app_assets_authenticated_upload"    ON storage.objects;
DROP POLICY IF EXISTS "app_assets_authenticated_update"    ON storage.objects;
DROP POLICY IF EXISTS "app_assets_authenticated_delete"    ON storage.objects;

CREATE POLICY "app_assets_public_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'app-assets');

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
-- VERIFY — Run after applying the above to confirm policies
-- ============================================================
-- SELECT tablename, policyname, permissive, roles, cmd
-- FROM pg_policies
-- WHERE tablename IN ('apps', 'screenshots', 'contacts', 'profiles')
-- ORDER BY tablename, cmd;
