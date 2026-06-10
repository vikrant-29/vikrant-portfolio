// ============================================================
// Database Types — aligned with Supabase schema
// ============================================================

export interface App {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  full_description: string;
  logo_url: string | null;
  featured: boolean;
  tech_stack: string[];
  github_url: string | null;
  live_url: string | null;
  created_at: string;
  // joined
  screenshots?: Screenshot[];
}

export interface Screenshot {
  id: string;
  app_id: string;
  image_url: string;
  created_at: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export interface Profile {
  id: string;
  full_name: string;
  role: "admin" | "viewer";
  avatar_url: string | null;
  created_at: string;
}

export interface AppFormData {
  slug: string;
  title: string;
  short_description: string;
  full_description: string;
  logo_url: string | null;
  featured: boolean;
  tech_stack: string[];
  github_url: string | null;
  live_url: string | null;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
