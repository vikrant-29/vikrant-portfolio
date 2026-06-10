import { redirect } from "next/navigation";
import { createSupabaseServerClient, createSupabaseAdminClient } from "./supabase-server";
import type { Profile } from "@/types";

/**
 * Returns the authenticated user from the session cookie, or null.
 */
export async function getCurrentUser() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/**
 * Returns true ONLY when the authenticated user's profile.role === 'admin'.
 * Being authenticated alone does NOT grant admin access.
 */
export async function isAdmin(): Promise<boolean> {
  // Step 1: get user from session (needs cookie client)
  const sessionClient = await createSupabaseServerClient();
  const {
    data: { user },
  } = await sessionClient.auth.getUser();

  if (!user) return false;

  // Step 2: read profile with service-role client (bypasses RLS, always works)
  const adminClient = createSupabaseAdminClient();
  const { data: profile } = await adminClient
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  return (profile as Pick<Profile, "role"> | null)?.role === "admin";
}

/**
 * Guards admin routes.
 * - Not authenticated  → redirect /login
 * - Not admin profile  → redirect /unauthorized
 */
export async function requireAdmin(): Promise<void> {
  const sessionClient = await createSupabaseServerClient();
  const {
    data: { user },
  } = await sessionClient.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const adminClient = createSupabaseAdminClient();
  const { data: profile } = await adminClient
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if ((profile as Pick<Profile, "role"> | null)?.role !== "admin") {
    redirect("/unauthorized");
  }
}
