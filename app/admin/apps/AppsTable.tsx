"use client";
import { useState } from "react";
import Link from "next/link";
import { Edit, Trash2, Star, StarOff, ExternalLink, Eye } from "lucide-react";
import { deleteApp, toggleFeatured } from "@/actions";
import type { App } from "@/types";

function ConfirmDialog({
  message,
  onConfirm,
  onCancel,
}: {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        style={{
          background: "#111",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 16,
          padding: 32,
          maxWidth: 400,
          width: "90%",
        }}
      >
        <h3
          style={{
            color: "#fff",
            fontWeight: 600,
            fontSize: 16,
            marginBottom: 12,
          }}
        >
          Confirm Delete
        </h3>
        <p style={{ color: "#A1A1AA", fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>
          {message}
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button
            onClick={onCancel}
            style={{
              padding: "8px 18px",
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.1)",
              background: "transparent",
              color: "#A1A1AA",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              padding: "8px 18px",
              borderRadius: 8,
              border: "1px solid rgba(239,68,68,0.4)",
              background: "rgba(239,68,68,0.1)",
              color: "#EF4444",
              fontSize: 13,
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AppsTable({ initialApps }: { initialApps: App[] }) {
  const [apps, setApps] = useState(initialApps);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleToggle = async (app: App) => {
    setLoadingId(app.id);
    const res = await toggleFeatured(app.id, !app.featured);
    if (res.success) {
      setApps((prev) =>
        prev.map((a) =>
          a.id === app.id ? { ...a, featured: !a.featured } : a
        )
      );
    }
    setLoadingId(null);
  };

  const handleDelete = async (id: string) => {
    setConfirmId(null);
    setLoadingId(id);
    await deleteApp(id);
    setApps((prev) => prev.filter((a) => a.id !== id));
    setLoadingId(null);
  };

  const confirmApp = apps.find((a) => a.id === confirmId);

  if (apps.length === 0) {
    return (
      <div
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16,
          padding: 80,
          textAlign: "center",
          color: "#A1A1AA",
        }}
      >
        <p style={{ marginBottom: 16 }}>No apps yet.</p>
        <Link href="/admin/apps/new" className="btn-primary" style={{ fontSize: 13 }}>
          Create your first app
        </Link>
      </div>
    );
  }

  return (
    <>
      {confirmApp && (
        <ConfirmDialog
          message={`Are you sure you want to delete "${confirmApp.title}"? This will also delete all its screenshots. This action cannot be undone.`}
          onConfirm={() => handleDelete(confirmApp.id)}
          onCancel={() => setConfirmId(null)}
        />
      )}

      <div
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        {/* Table header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr auto",
            gap: 16,
            padding: "12px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          {["App", "Tech Stack", "Status", "Actions"].map((h) => (
            <p
              key={h}
              style={{
                color: "#A1A1AA",
                fontSize: 11,
                fontFamily: "'JetBrains Mono',monospace",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              {h}
            </p>
          ))}
        </div>

        {/* Rows */}
        {apps.map((app, i) => (
          <div
            key={app.id}
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr auto",
              gap: 16,
              padding: "16px 20px",
              alignItems: "center",
              borderBottom:
                i < apps.length - 1
                  ? "1px solid rgba(255,255,255,0.04)"
                  : "none",
              opacity: loadingId === app.id ? 0.5 : 1,
              transition: "opacity 0.2s",
            }}
          >
            {/* App info */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
              {app.logo_url ? (
                <img
                  src={app.logo_url}
                  alt={app.title}
                  width={36}
                  height={36}
                  style={{ borderRadius: 8, objectFit: "cover", flexShrink: 0 }}
                />
              ) : (
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: "rgba(255,122,0,0.1)",
                    border: "1px solid rgba(255,122,0,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Bebas Neue',cursive",
                      fontSize: 16,
                      color: "#FF7A00",
                    }}
                  >
                    {app.title[0]}
                  </span>
                </div>
              )}
              <div style={{ minWidth: 0 }}>
                <p
                  style={{
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: 500,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {app.title}
                </p>
                <p
                  style={{
                    color: "#555",
                    fontSize: 11,
                    fontFamily: "'JetBrains Mono',monospace",
                  }}
                >
                  /{app.slug}
                </p>
              </div>
            </div>

            {/* Tech stack */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 4,
                overflow: "hidden",
              }}
            >
              {app.tech_stack.slice(0, 2).map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: 10,
                    padding: "2px 8px",
                    borderRadius: 12,
                    background: "rgba(255,255,255,0.06)",
                    color: "#A1A1AA",
                    fontFamily: "'JetBrains Mono',monospace",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {t}
                </span>
              ))}
              {app.tech_stack.length > 2 && (
                <span
                  style={{
                    fontSize: 10,
                    padding: "2px 8px",
                    borderRadius: 12,
                    background: "rgba(255,255,255,0.04)",
                    color: "#555",
                    fontFamily: "'JetBrains Mono',monospace",
                  }}
                >
                  +{app.tech_stack.length - 2}
                </span>
              )}
            </div>

            {/* Featured status */}
            <div>
              {app.featured ? (
                <span
                  style={{
                    fontSize: 11,
                    padding: "4px 10px",
                    borderRadius: 20,
                    background: "rgba(255,122,0,0.12)",
                    color: "#FF7A00",
                    border: "1px solid rgba(255,122,0,0.25)",
                    fontFamily: "'JetBrains Mono',monospace",
                  }}
                >
                  Featured
                </span>
              ) : (
                <span
                  style={{
                    fontSize: 11,
                    padding: "4px 10px",
                    borderRadius: 20,
                    background: "rgba(255,255,255,0.04)",
                    color: "#555",
                    border: "1px solid rgba(255,255,255,0.06)",
                    fontFamily: "'JetBrains Mono',monospace",
                  }}
                >
                  Standard
                </span>
              )}
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <Link
                href={`/apps/${app.slug}`}
                target="_blank"
                title="Preview"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#A1A1AA",
                  textDecoration: "none",
                  transition: "all 0.15s",
                }}
              >
                <Eye size={13} />
              </Link>

              <button
                onClick={() => handleToggle(app)}
                disabled={loadingId === app.id}
                title={app.featured ? "Unfeature" : "Feature"}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: app.featured
                    ? "rgba(255,122,0,0.1)"
                    : "rgba(255,255,255,0.04)",
                  border: app.featured
                    ? "1px solid rgba(255,122,0,0.25)"
                    : "1px solid rgba(255,255,255,0.08)",
                  color: app.featured ? "#FF7A00" : "#A1A1AA",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {app.featured ? <StarOff size={13} /> : <Star size={13} />}
              </button>

              <Link
                href={`/admin/apps/${app.id}/edit`}
                title="Edit"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#A1A1AA",
                  textDecoration: "none",
                  transition: "all 0.15s",
                }}
              >
                <Edit size={13} />
              </Link>

              <button
                onClick={() => setConfirmId(app.id)}
                disabled={loadingId === app.id}
                title="Delete"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  color: "#EF4444",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
