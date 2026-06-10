"use client";
import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser Supabase client — uses @supabase/ssr so the session
 * is stored in cookies (not just localStorage), making it readable
 * by Next.js Server Components and Server Actions.
 */
export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Default singleton for convenience in Client Components
export const supabase = createSupabaseBrowserClient();
