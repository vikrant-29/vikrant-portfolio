# Vikrant Portfolio — Phase 2 & 3 Setup Guide

## Prerequisites
- Supabase account (free tier works)
- Node.js 18+
- npm or yarn

---

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) → New Project
2. Choose a name, database password, and region
3. Wait for project to provision (~2 minutes)

---

## Step 2: Run the SQL Schema

1. In Supabase Dashboard → **SQL Editor** → **New Query**
2. Paste the entire contents of `supabase/schema.sql`
3. Click **Run**

This creates:
- `apps`, `screenshots`, `contacts`, `profiles` tables
- All RLS policies
- Creates the `app-assets` storage bucket

---

## Step 3: Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in your values from **Supabase Dashboard → Settings → API**:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

> ⚠️ Never commit `.env.local` or expose `SUPABASE_SERVICE_ROLE_KEY` to the browser.

---

## Step 4: Create Admin User

### 4a. Create auth user in Supabase
1. Go to **Authentication → Users → Invite User** (or Add User)
2. Enter your email and password
3. Note the user UUID shown in the users table

### 4b. Insert admin profile
Run this in **SQL Editor** (replace the UUID with your user's ID):

```sql
INSERT INTO profiles (id, full_name, role)
VALUES ('your-user-uuid-here', 'Vikrant Patil', 'admin');
```

> ⚠️ Admin access requires `profiles.role = 'admin'`. Being authenticated alone is NOT enough.

---

## Step 5: Install Dependencies

```bash
npm install
```

Packages already in `package.json`:
- `@supabase/supabase-js` — Supabase JS client
- `@supabase/ssr` — Server-side Supabase client for Next.js App Router

---

## Step 6: Run Development Server

```bash
npm run dev
```

Visit:
- **Portfolio**: http://localhost:3000
- **Admin Login**: http://localhost:3000/login
- **Admin Dashboard**: http://localhost:3000/admin (requires login + admin role)

---

## Storage Bucket (app-assets)

The schema.sql automatically creates the `app-assets` bucket. If it fails:

1. Go to **Storage → New Bucket**
2. Name: `app-assets`
3. Check **Public bucket**
4. Create

---

## Admin Features

### `/admin` — Dashboard
- Total apps, featured count, contact messages count
- Recent messages table

### `/admin/apps` — App Management
- List all apps with logo, tech stack, featured status
- Toggle featured on/off (instant)
- Delete with confirmation dialog
- Preview live page

### `/admin/apps/new` — Create App
- Title, slug (auto-generated), descriptions
- Logo upload → Supabase Storage → stores URL only
- Tech stack tag builder
- GitHub / Play Store URLs
- Featured toggle

### `/admin/apps/[id]/edit` — Edit App
- All fields editable
- Screenshot manager: upload multiple, delete individually

### `/admin/contacts` — Contact Messages
- All form submissions
- Expand to read full message
- Delete individual messages

---

## Architecture Notes

| Layer | Component | Pattern |
|-------|-----------|---------|
| Data fetching | `lib/queries.ts` | Server Components |
| Mutations | `actions/index.ts` | Server Actions |
| Auth guard | `lib/auth.ts` | `requireAdmin()` |
| Admin layout | `app/admin/layout.tsx` | Server Component |
| Interactive UI | `*Client.tsx`, `*Table.tsx`, `*Form.tsx` | `"use client"` |

### Image Upload Flow
1. Browser uploads file to Supabase Storage (`app-assets` bucket)
2. Supabase returns public URL
3. URL stored in `apps.logo_url` or `screenshots.image_url`
4. Binary data never stored in database

---

## RLS Summary

| Table | Public SELECT | Public INSERT | Auth INSERT/UPDATE/DELETE | Admin Only |
|-------|-------------|---------------|--------------------------|------------|
| apps | ✅ | ❌ | ✅ | — |
| screenshots | ✅ | ❌ | ✅ | — |
| contacts | ❌ | ✅ | — | SELECT, DELETE |
| profiles | ✅ | ❌ | — | UPDATE |

---

## Deployment (Vercel)

1. Push to GitHub
2. Import project in Vercel
3. Add all env vars from `.env.local`
4. Deploy

Add your Vercel URL to Supabase: **Authentication → URL Configuration → Site URL**
