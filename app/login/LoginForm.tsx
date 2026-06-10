"use client";
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase";
import { Lock, Mail, Loader2 } from "lucide-react";

const CARD: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 20,
  padding: 40,
  width: "100%",
  maxWidth: 400,
};

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createSupabaseBrowserClient();

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: form.email.trim(),
      password: form.password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    // Full page navigation so the server re-reads the new session cookie
    window.location.href = "/admin";
  };

  return (
    <div style={CARD}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div
          style={{
            width: 56, height: 56, borderRadius: 16,
            background: "rgba(255,122,0,0.1)",
            border: "1px solid rgba(255,122,0,0.25)",
            display: "flex", alignItems: "center",
            justifyContent: "center", margin: "0 auto 16px",
          }}
        >
          <Lock size={22} color="#FF7A00" />
        </div>
        <h1
          style={{
            fontFamily: "'Bebas Neue',cursive",
            fontSize: 32, letterSpacing: "0.06em",
            color: "#fff", marginBottom: 6,
          }}
        >
          ADMIN LOGIN
        </h1>
        <p style={{ color: "#A1A1AA", fontSize: 13 }}>
          Sign in to manage your portfolio
        </p>
      </div>

      {error && (
        <div
          style={{
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: 8, padding: "10px 14px",
            color: "#FCA5A5", fontSize: 13, marginBottom: 20,
          }}
        >
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 16 }}
      >
        <div>
          <label
            style={{
              color: "#A1A1AA", fontSize: 10,
              fontFamily: "'JetBrains Mono',monospace",
              textTransform: "uppercase", letterSpacing: "0.12em",
              display: "block", marginBottom: 8,
            }}
          >
            Email
          </label>
          <div style={{ position: "relative" }}>
            <Mail
              size={14} color="#A1A1AA"
              style={{
                position: "absolute", left: 14, top: "50%",
                transform: "translateY(-50%)", pointerEvents: "none",
              }}
            />
            <input
              type="email" required
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="admin@example.com"
              className="form-input"
              style={{ paddingLeft: 40 }}
            />
          </div>
        </div>

        <div>
          <label
            style={{
              color: "#A1A1AA", fontSize: 10,
              fontFamily: "'JetBrains Mono',monospace",
              textTransform: "uppercase", letterSpacing: "0.12em",
              display: "block", marginBottom: 8,
            }}
          >
            Password
          </label>
          <div style={{ position: "relative" }}>
            <Lock
              size={14} color="#A1A1AA"
              style={{
                position: "absolute", left: 14, top: "50%",
                transform: "translateY(-50%)", pointerEvents: "none",
              }}
            />
            <input
              type="password" required
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              placeholder="••••••••"
              className="form-input"
              style={{ paddingLeft: 40 }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary"
          style={{
            justifyContent: "center", padding: 14, marginTop: 8,
            opacity: loading ? 0.65 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? (
            <><Loader2 size={15} className="spin" /> Signing in...</>
          ) : (
            "Sign In"
          )}
        </button>
      </form>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .spin { animation: spin 0.8s linear infinite; }
      `}</style>
    </div>
  );
}
