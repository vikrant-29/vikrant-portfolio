"use client";
import { useState } from "react";
import Image from "next/image";
import { Upload, Trash2, Loader2, ImageIcon } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase";
import { addScreenshot, deleteScreenshot } from "@/actions";
import type { App, Screenshot } from "@/types";

export default function ScreenshotManager({ app }: { app: App }) {
  const [screenshots, setScreenshots] = useState<Screenshot[]>(
    app.screenshots ?? []
  );
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    const supabase = createSupabaseBrowserClient();
    setUploading(true);
    setError(null);

    for (const file of files) {
      const ext = file.name.split(".").pop();
      const path = `screenshots/${app.id}/${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}.${ext}`;

      const { error: uploadErr } = await supabase.storage
        .from("app-assets")
        .upload(path, file, { upsert: true });

      if (uploadErr) {
        setError(`Upload failed: ${uploadErr.message}`);
        continue;
      }

      const { data } = supabase.storage.from("app-assets").getPublicUrl(path);
      const result = await addScreenshot(app.id, data.publicUrl);

      if (result.success) {
        // Optimistic: fetch the new screenshot
        const { data: newShot } = await supabase
          .from("screenshots")
          .select("*")
          .eq("app_id", app.id)
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        if (newShot) {
          setScreenshots((prev) => [...prev, newShot as Screenshot]);
        }
      }
    }

    setUploading(false);
    // reset input
    e.target.value = "";
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    const result = await deleteScreenshot(id);
    if (result.success) {
      setScreenshots((prev) => prev.filter((s) => s.id !== id));
    } else {
      setError(result.error ?? "Delete failed");
    }
    setDeletingId(null);
  };

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 16,
        padding: 28,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <h3
          style={{
            color: "#fff",
            fontWeight: 600,
            fontSize: 15,
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
          Screenshots ({screenshots.length})
        </h3>

        <label
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 16px",
            borderRadius: 8,
            background: "rgba(255,122,0,0.1)",
            border: "1px solid rgba(255,122,0,0.3)",
            color: "#FF7A00",
            fontSize: 13,
            cursor: uploading ? "not-allowed" : "pointer",
            opacity: uploading ? 0.6 : 1,
          }}
        >
          {uploading ? (
            <><Loader2 size={13} className="spin" /> Uploading...</>
          ) : (
            <><Upload size={13} /> Upload Screenshots</>
          )}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            disabled={uploading}
            style={{ display: "none" }}
          />
        </label>
      </div>

      {error && (
        <div
          style={{
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: 8,
            padding: "10px 14px",
            color: "#FCA5A5",
            fontSize: 13,
            marginBottom: 16,
          }}
        >
          {error}
        </div>
      )}

      {screenshots.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "48px 0",
            color: "#A1A1AA",
          }}
        >
          <ImageIcon size={32} style={{ margin: "0 auto 12px", display: "block" }} />
          <p style={{ fontSize: 13 }}>No screenshots yet.</p>
          <p
            style={{
              fontSize: 11,
              color: "#555",
              fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace",
              marginTop: 6,
            }}
          >
            Upload images to showcase your app
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
            gap: 12,
          }}
        >
          {screenshots.map((s) => (
            <div
              key={s.id}
              style={{
                position: "relative",
                borderRadius: 12,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.08)",
                aspectRatio: "9/16",
                background: "rgba(255,255,255,0.04)",
                opacity: deletingId === s.id ? 0.4 : 1,
                transition: "opacity 0.2s",
              }}
              className="shot-wrap"
            >
              <Image
                src={s.image_url}
                alt="Screenshot"
                fill
                style={{ objectFit: "cover" }}
              />
              <button
                onClick={() => handleDelete(s.id)}
                disabled={deletingId === s.id}
                style={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  width: 26,
                  height: 26,
                  borderRadius: 8,
                  background: "rgba(239,68,68,0.85)",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  opacity: 0,
                  transition: "opacity 0.15s",
                }}
                className="shot-del"
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
      <style>{`
        .shot-wrap:hover .shot-del { opacity: 1 !important; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spin { animation: spin 0.8s linear infinite; }
      `}</style>
    </div>
  );
}
