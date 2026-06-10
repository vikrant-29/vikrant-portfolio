"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { requireAdmin } from "@/lib/auth";
import type { AppFormData, ContactFormData } from "@/types";

// ============================================================
// Contact
// ============================================================

export async function submitContact(data: ContactFormData) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.from("contacts").insert({
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    message: data.message.trim(),
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function deleteContact(id: string) {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.from("contacts").delete().eq("id", id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin");
  return { success: true };
}

// ============================================================
// Apps
// ============================================================

export async function createApp(data: AppFormData) {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();

  const { data: inserted, error } = await supabase
    .from("apps")
    .insert(data)
    .select()
    .single();

  if (error) return { success: false, error: error.message };

  revalidatePath("/apps");
  revalidatePath("/admin/apps");
  revalidatePath("/");

  return { success: true, id: inserted.id };
}

export async function updateApp(id: string, data: Partial<AppFormData>) {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.from("apps").update(data).eq("id", id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/apps");
  revalidatePath(`/apps/${data.slug}`);
  revalidatePath("/admin/apps");
  revalidatePath("/");

  return { success: true };
}

export async function deleteApp(id: string) {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.from("apps").delete().eq("id", id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/apps");
  revalidatePath("/admin/apps");
  revalidatePath("/");

  redirect("/admin/apps");
}

export async function toggleFeatured(id: string, featured: boolean) {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from("apps")
    .update({ featured })
    .eq("id", id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/apps");
  revalidatePath("/admin/apps");
  revalidatePath("/");

  return { success: true };
}

// ============================================================
// Screenshots
// ============================================================

export async function addScreenshot(appId: string, imageUrl: string) {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from("screenshots")
    .insert({ app_id: appId, image_url: imageUrl });

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/apps");
  return { success: true };
}

export async function deleteScreenshot(id: string) {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.from("screenshots").delete().eq("id", id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/apps");
  return { success: true };
}
