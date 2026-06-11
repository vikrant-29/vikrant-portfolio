"use client";
import { useState } from "react";
import { Trash2, ChevronDown, ChevronUp, Mail } from "lucide-react";
import { deleteContact } from "@/actions";
import type { Contact } from "@/types";

export default function ContactsTable({
  initialContacts,
}: {
  initialContacts: Contact[];
}) {
  const [contacts, setContacts] = useState(initialContacts);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message? This cannot be undone.")) return;
    setDeletingId(id);
    const result = await deleteContact(id);
    if (result.success) {
      setContacts((prev) => prev.filter((c) => c.id !== id));
    }
    setDeletingId(null);
  };

  if (contacts.length === 0) {
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
        <Mail
          size={36}
          style={{ margin: "0 auto 16px", display: "block", color: "#555" }}
        />
        <p style={{ fontSize: 14 }}>No messages yet.</p>
        <p
          style={{
            fontSize: 12,
            color: "#555",
            fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace",
            marginTop: 6,
          }}
        >
          Contact form submissions will appear here
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.5fr 2fr auto auto",
          gap: 16,
          padding: "12px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        {["Name", "Email", "Message", "Date", ""].map((h, i) => (
          <p
            key={i}
            style={{
              color: "#A1A1AA",
              fontSize: 11,
              fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            {h}
          </p>
        ))}
      </div>

      {contacts.map((c, i) => (
        <div key={c.id}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.5fr 2fr auto auto",
              gap: 16,
              padding: "14px 20px",
              alignItems: "center",
              borderBottom:
                i < contacts.length - 1 && expandedId !== c.id
                  ? "1px solid rgba(255,255,255,0.04)"
                  : "none",
              opacity: deletingId === c.id ? 0.4 : 1,
              transition: "opacity 0.2s",
              background:
                expandedId === c.id
                  ? "rgba(255,122,0,0.04)"
                  : "transparent",
            }}
          >
            <p style={{ color: "#fff", fontSize: 13, fontWeight: 500 }}>
              {c.name}
            </p>
            <p style={{ color: "#A1A1AA", fontSize: 12 }}>{c.email}</p>
            <p
              style={{
                color: "#A1A1AA",
                fontSize: 12,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {c.message}
            </p>
            <p
              style={{
                color: "#555",
                fontSize: 11,
                fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace",
                whiteSpace: "nowrap",
              }}
            >
              {new Date(c.created_at).toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' })}
            </p>
            <div style={{ display: "flex", gap: 6 }}>
              <button
                onClick={() =>
                  setExpandedId(expandedId === c.id ? null : c.id)
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  background:
                    expandedId === c.id
                      ? "rgba(255,122,0,0.1)"
                      : "rgba(255,255,255,0.04)",
                  border: `1px solid ${expandedId === c.id ? "rgba(255,122,0,0.25)" : "rgba(255,255,255,0.08)"}`,
                  color: expandedId === c.id ? "#FF7A00" : "#A1A1AA",
                  cursor: "pointer",
                }}
              >
                {expandedId === c.id ? (
                  <ChevronUp size={13} />
                ) : (
                  <ChevronDown size={13} />
                )}
              </button>
              <button
                onClick={() => handleDelete(c.id)}
                disabled={deletingId === c.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  background: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  color: "#EF4444",
                  cursor: "pointer",
                }}
              >
                <Trash2 size={12} />
              </button>
            </div>
          </div>

          {/* Expanded message */}
          {expandedId === c.id && (
            <div
              style={{
                padding: "0 20px 16px",
                borderBottom:
                  i < contacts.length - 1
                    ? "1px solid rgba(255,255,255,0.04)"
                    : "none",
                background: "rgba(255,122,0,0.04)",
              }}
            >
              <div
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 10,
                  padding: "16px 20px",
                }}
              >
                <p
                  style={{
                    color: "#A1A1AA",
                    fontSize: 11,
                    fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: 8,
                  }}
                >
                  Full Message
                </p>
                <p
                  style={{
                    color: "#fff",
                    fontSize: 13,
                    lineHeight: 1.7,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {c.message}
                </p>
                <p
                  style={{
                    color: "#555",
                    fontSize: 11,
                    fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace",
                    marginTop: 12,
                  }}
                >
                  Received:{" "}
                  {new Date(c.created_at).toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' })}
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
