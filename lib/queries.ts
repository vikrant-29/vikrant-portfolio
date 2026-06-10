/**
 * Data-fetching layer for Server Components.
 *
 * PUBLIC reads  → createSupabaseAdminClient()
 *   Uses the service-role key which bypasses RLS entirely.
 *   This is correct and safe for server-side rendering because
 *   this code never runs in the browser.
 *
 * ADMIN reads (contacts, protected data) → same admin client,
 *   but guarded by requireAdmin() before the page even renders.
 */
import { createSupabaseAdminClient } from "./supabase-server";
import type { App, Contact, Profile } from "@/types";

// ============================================================
// Apps — public
// ============================================================

export async function getAllApps(): Promise<App[]> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("apps")
    .select("*, screenshots(*)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getAllApps error:", error.message);
    return [];
  }
  return (data as App[]) ?? [];
}

export async function getFeaturedApps(): Promise<App[]> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("apps")
    .select("*, screenshots(*)")
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(3);

  if (error) {
    console.error("getFeaturedApps error:", error.message);
    return [];
  }
  return (data as App[]) ?? [];
}

export async function getAppBySlug(slug: string): Promise<App | null> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("apps")
    .select("*, screenshots(*)")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("getAppBySlug error:", error.message);
    return null;
  }
  return data as App;
}

export async function getAppById(id: string): Promise<App | null> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("apps")
    .select("*, screenshots(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error("getAppById error:", error.message);
    return null;
  }
  return data as App;
}

// ============================================================
// Dashboard stats — admin only (page already guards with requireAdmin)
// ============================================================

export async function getDashboardStats() {
  const supabase = createSupabaseAdminClient();

  const [appsRes, featuredRes, contactsRes] = await Promise.all([
    supabase.from("apps").select("id", { count: "exact", head: true }),
    supabase
      .from("apps")
      .select("id", { count: "exact", head: true })
      .eq("featured", true),
    supabase.from("contacts").select("id", { count: "exact", head: true }),
  ]);

  return {
    totalApps: appsRes.count ?? 0,
    featuredApps: featuredRes.count ?? 0,
    totalContacts: contactsRes.count ?? 0,
  };
}

// ============================================================
// Contacts — admin only
// ============================================================

export async function getAllContacts(): Promise<Contact[]> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getAllContacts error:", error.message);
    return [];
  }
  return (data as Contact[]) ?? [];
}

// ============================================================
// Profiles
// ============================================================

export async function getProfileById(id: string): Promise<Profile | null> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data as Profile;
}
