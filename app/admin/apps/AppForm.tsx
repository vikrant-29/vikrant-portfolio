"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, X, Plus, Loader2 } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase";
import { createApp, updateApp } from "@/actions";
import type { App, AppFormData } from "@/types";

const LABEL_STYLE: React.CSSProperties = {
  color: "#A1A1AA",
  fontSize: 10,
  fontFamily: "'JetBrains Mono',monospace",
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  display: "block",
  marginBottom: 8,
};

const CARD: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 16,
  padding: 28,
  marginBottom: 20,
};

export default function AppForm({ app }: { app?: App }) {
  const router = useRouter();
  const isEdit = !!app;

  const [form, setForm] = useState<AppFormData>({
    slug: app?.slug ?? "",
    title: app?.title ?? "",
    short_description: app?.short_description ?? "",
    full_description: app?.full_description ?? "",
    logo_url: app?.logo_url ?? null,
    featured: app?.featured ?? false,
    tech_stack: app?.tech_stack ?? [],
    github_url: app?.github_url ?? "",
    live_url: app?.live_url ?? "",
  });

  const [techInput, setTechInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-generate slug from title (only on create)
  const handleTitleChange = (val: string) => {
    setForm((f) => ({
      ...f,
      title: val,
      slug: isEdit
        ? f.slug
        : val
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, ""),
    }));
  };

  const addTech = () => {
    const t = techInput.trim();
    if (t && !form.tech_stack.includes(t)) {
      setForm((f) => ({ ...f, tech_stack: [...f.tech_stack, t] }));
    }
    setTechInput("");
  };

  const removeTech = (t: string) => {
    setForm((f) => ({
      ...f,
      tech_stack: f.tech_stack.filter((x) => x !== t),
    }));
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const ext = file.name.split(".").pop();
    const path = `logos/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const supabase = createSupabaseBrowserClient();
    const { error: uploadError } = await supabase.storage
      .from("app-assets")
      .upload(path, file, { upsert: true });

    if (uploadError) {
      setError(`Logo upload failed: ${uploadError.message}`);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("app-assets").getPublicUrl(path);
    setForm((f) => ({ ...f, logo_url: data.publicUrl }));
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const payload: AppFormData = {
      ...form,
      github_url: form.github_url || null,
      live_url: form.live_url || null,
    };

    const result = isEdit
      ? await updateApp(app!.id, payload)
      : await createApp(payload);

    if (!result.success) {
      setError(result.error ?? "Something went wrong.");
      setSubmitting(false);
      return;
    }

    router.push("/admin/apps");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div
          style={{
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: 10,
            padding: "12px 16px",
            color: "#FCA5A5",
            fontSize: 13,
            marginBottom: 20,
          }}
        >
          {error}
        </div>
      )}

      {/* Basic Info */}
      <div style={CARD}>
        <h3
          style={{
            color: "#fff",
            fontWeight: 600,
            fontSize: 14,
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              width: 4,
              height: 16,
              borderRadius: 2,
              background: "#FF7A00",
              flexShrink: 0,
            }}
          />
          Basic Info
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            marginBottom: 16,
          }}
          className="form-grid-2"
        >
          <div>
            <label style={LABEL_STYLE}>Title *</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="TaskFlow"
              className="form-input"
            />
          </div>
          <div>
            <label style={LABEL_STYLE}>Slug *</label>
            <input
              type="text"
              required
              value={form.slug}
              onChange={(e) =>
                setForm((f) => ({ ...f, slug: e.target.value }))
              }
              placeholder="taskflow"
              className="form-input"
            />
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={LABEL_STYLE}>Short Description *</label>
          <input
            type="text"
            required
            value={form.short_description}
            onChange={(e) =>
              setForm((f) => ({ ...f, short_description: e.target.value }))
            }
            placeholder="A one-line summary of the app..."
            className="form-input"
          />
        </div>

        <div>
          <label style={LABEL_STYLE}>Full Description *</label>
          <textarea
            required
            rows={5}
            value={form.full_description}
            onChange={(e) =>
              setForm((f) => ({ ...f, full_description: e.target.value }))
            }
            placeholder="Detailed description of the app, its features, and technology..."
            className="form-input"
            style={{ resize: "vertical" }}
          />
        </div>
      </div>

      {/* Logo Upload */}
      <div style={CARD}>
        <h3
          style={{
            color: "#fff",
            fontWeight: 600,
            fontSize: 14,
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              width: 4,
              height: 16,
              borderRadius: 2,
              background: "#FF7A00",
              flexShrink: 0,
            }}
          />
          App Logo
        </h3>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {form.logo_url ? (
            <div style={{ position: "relative" }}>
              <img
                src={form.logo_url}
                alt="Logo"
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 16,
                  objectFit: "cover",
                  border: "1px solid rgba(255,122,0,0.3)",
                }}
              />
              <button
                type="button"
                onClick={() => setForm((f) => ({ ...f, logo_url: null }))}
                style={{
                  position: "absolute",
                  top: -8,
                  right: -8,
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: "#EF4444",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                }}
              >
                <X size={11} />
              </button>
            </div>
          ) : (
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 16,
                background: "rgba(255,122,0,0.06)",
                border: "2px dashed rgba(255,122,0,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FF7A00",
              }}
            >
              {uploading ? (
                <Loader2 size={20} className="spin" />
              ) : (
                <Upload size={20} />
              )}
            </div>
          )}

          <div>
            <label
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 16px",
                borderRadius: 8,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#fff",
                fontSize: 13,
                cursor: uploading ? "not-allowed" : "pointer",
                opacity: uploading ? 0.6 : 1,
              }}
            >
              <Upload size={13} />
              {uploading ? "Uploading..." : "Upload Logo"}
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                disabled={uploading}
                style={{ display: "none" }}
              />
            </label>
            <p
              style={{
                color: "#555",
                fontSize: 11,
                marginTop: 6,
                fontFamily: "'JetBrains Mono',monospace",
              }}
            >
              PNG, JPG, WebP — max 2MB
            </p>
          </div>
        </div>

        {/* Or URL input */}
        <div style={{ marginTop: 16 }}>
          <label style={LABEL_STYLE}>Or paste image URL</label>
          <input
            type="url"
            value={form.logo_url ?? ""}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                logo_url: e.target.value || null,
              }))
            }
            placeholder="https://..."
            className="form-input"
          />
        </div>
      </div>

      {/* Tech Stack */}
      <div style={CARD}>
        <h3
          style={{
            color: "#fff",
            fontWeight: 600,
            fontSize: 14,
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              width: 4,
              height: 16,
              borderRadius: 2,
              background: "#FF7A00",
              flexShrink: 0,
            }}
          />
          Tech Stack
        </h3>

        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTech();
              }
            }}
            placeholder="e.g. Flutter, Firebase..."
            className="form-input"
            style={{ flex: 1 }}
          />
          <button
            type="button"
            onClick={addTech}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "0 16px",
              borderRadius: 8,
              background: "rgba(255,122,0,0.1)",
              border: "1px solid rgba(255,122,0,0.3)",
              color: "#FF7A00",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            <Plus size={13} /> Add
          </button>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {form.tech_stack.map((t) => (
            <span
              key={t}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                padding: "5px 10px 5px 12px",
                borderRadius: 20,
                background: "rgba(255,122,0,0.1)",
                border: "1px solid rgba(255,122,0,0.25)",
                color: "#FF7A00",
                fontFamily: "'JetBrains Mono',monospace",
              }}
            >
              {t}
              <button
                type="button"
                onClick={() => removeTech(t)}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  color: "#FF7A00",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <X size={11} />
              </button>
            </span>
          ))}
          {form.tech_stack.length === 0 && (
            <p
              style={{
                color: "#555",
                fontSize: 12,
                fontFamily: "'JetBrains Mono',monospace",
              }}
            >
              No technologies added yet
            </p>
          )}
        </div>
      </div>

      {/* Links & Settings */}
      <div style={CARD}>
        <h3
          style={{
            color: "#fff",
            fontWeight: 600,
            fontSize: 14,
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              width: 4,
              height: 16,
              borderRadius: 2,
              background: "#FF7A00",
              flexShrink: 0,
            }}
          />
          Links & Settings
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            marginBottom: 20,
          }}
          className="form-grid-2"
        >
          <div>
            <label style={LABEL_STYLE}>GitHub URL</label>
            <input
              type="url"
              value={form.github_url ?? ""}
              onChange={(e) =>
                setForm((f) => ({ ...f, github_url: e.target.value || null }))
              }
              placeholder="https://github.com/..."
              className="form-input"
            />
          </div>
          <div>
            <label style={LABEL_STYLE}>Play Store / Live URL</label>
            <input
              type="url"
              value={form.live_url ?? ""}
              onChange={(e) =>
                setForm((f) => ({ ...f, live_url: e.target.value || null }))
              }
              placeholder="https://play.google.com/..."
              className="form-input"
            />
          </div>
        </div>

        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: 44,
              height: 24,
              borderRadius: 12,
              background: form.featured
                ? "#FF7A00"
                : "rgba(255,255,255,0.1)",
              border: `1px solid ${form.featured ? "#FF7A00" : "rgba(255,255,255,0.15)"}`,
              position: "relative",
              transition: "background 0.2s",
              flexShrink: 0,
            }}
            onClick={() =>
              setForm((f) => ({ ...f, featured: !f.featured }))
            }
          >
            <div
              style={{
                position: "absolute",
                top: 2,
                left: form.featured ? 22 : 2,
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: "#fff",
                transition: "left 0.2s",
              }}
            />
          </div>
          <div>
            <p style={{ color: "#fff", fontSize: 13, fontWeight: 500 }}>
              Featured App
            </p>
            <p
              style={{
                color: "#A1A1AA",
                fontSize: 11,
                fontFamily: "'JetBrains Mono',monospace",
              }}
            >
              Shows in the homepage Featured Apps section
            </p>
          </div>
        </label>
      </div>

      {/* Submit */}
      <div style={{ display: "flex", gap: 12 }}>
        <button
          type="submit"
          disabled={submitting}
          className="btn-primary"
          style={{
            padding: "12px 28px",
            fontSize: 14,
            opacity: submitting ? 0.65 : 1,
            cursor: submitting ? "not-allowed" : "pointer",
          }}
        >
          {submitting ? (
            <><Loader2 size={14} className="spin" /> Saving...</>
          ) : (
            isEdit ? "Save Changes" : "Create App"
          )}
        </button>
        <a
          href="/admin/apps"
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "12px 20px",
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.1)",
            background: "transparent",
            color: "#A1A1AA",
            fontSize: 14,
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          Cancel
        </a>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .spin { animation: spin 0.8s linear infinite; }
        @media (max-width:640px) { .form-grid-2 { grid-template-columns:1fr !important; } }
      `}</style>
    </form>
  );
}
