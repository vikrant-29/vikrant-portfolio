-- ============================================================
-- GRANTS FIX — Run this in Supabase SQL Editor
-- 
-- When tables are created via raw SQL (not the Table Editor),
-- Supabase does NOT automatically grant privileges to its roles.
-- This causes "permission denied for table X" errors even with
-- service_role key or correct RLS policies.
-- ============================================================

-- Grant usage on the public schema to all Supabase roles
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

-- Grant full access on all tables to service_role (bypasses RLS)
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO service_role;

-- Grant specific access for anon role (public read-only tables)
GRANT SELECT ON TABLE public.apps TO anon;
GRANT SELECT ON TABLE public.screenshots TO anon;
GRANT INSERT ON TABLE public.contacts TO anon;
GRANT SELECT ON TABLE public.profiles TO anon;

-- Grant specific access for authenticated role
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.apps TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.screenshots TO authenticated;
GRANT SELECT, INSERT ON TABLE public.contacts TO authenticated;
GRANT SELECT, UPDATE ON TABLE public.profiles TO authenticated;

-- Also apply to any future tables created in this schema
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT ALL ON TABLES TO service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT ON TABLES TO anon;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO authenticated;

-- ============================================================
-- VERIFY — run this after to confirm grants are applied
-- ============================================================
-- SELECT grantee, table_name, privilege_type
-- FROM information_schema.role_table_grants
-- WHERE table_schema = 'public'
--   AND table_name IN ('apps', 'screenshots', 'contacts', 'profiles')
-- ORDER BY table_name, grantee;
