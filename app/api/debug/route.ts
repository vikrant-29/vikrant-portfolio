import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const publishable =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const report: Record<string, unknown> = {
    NEXT_PUBLIC_SUPABASE_URL: url
      ? `✅ ${url}`
      : "❌ MISSING",
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: publishable
      ? `✅ set (${publishable.slice(0, 24)}...)`
      : "❌ MISSING",
    SUPABASE_SERVICE_ROLE_KEY: secret
      ? `✅ set (${secret.slice(0, 24)}...)`
      : "❌ MISSING",
  };

  // Test publishable key
  if (url && publishable) {
    const client = createClient(url, publishable, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
    const { data, error } = await client.from("apps").select("id").limit(1);
    report.publishable_key_test = error
      ? `❌ ${error.message} (code: ${(error as any).code})`
      : `✅ success — ${data?.length ?? 0} row(s) returned`;
  }

  // Test secret key
  if (url && secret) {
    const client = createClient(url, secret, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
    const { data, error } = await client.from("apps").select("id").limit(1);
    report.secret_key_test = error
      ? `❌ ${error.message} (code: ${(error as any).code})`
      : `✅ success — ${data?.length ?? 0} row(s) returned`;
  }

  return NextResponse.json(report, { status: 200 });
}
