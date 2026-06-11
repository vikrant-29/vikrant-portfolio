import Link from "next/link";
import { ShieldOff } from "lucide-react";

export const metadata = { title: "Unauthorized | Vikrant.exe" };

export default function UnauthorizedPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        textAlign: "center",
      }}
    >
      <div>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 20,
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
          }}
        >
          <ShieldOff size={28} color="#EF4444" />
        </div>
        <h1
          style={{
            fontFamily: "var(--font-bebas),'Bebas Neue',cursive",
            fontSize: "clamp(42px,6vw,64px)",
            letterSpacing: "0.04em",
            color: "#fff",
            marginBottom: 12,
          }}
        >
          ACCESS <span style={{ color: "#EF4444" }}>DENIED</span>
        </h1>
        <p
          style={{
            color: "#A1A1AA",
            fontSize: 15,
            maxWidth: 380,
            margin: "0 auto 32px",
            lineHeight: 1.6,
          }}
        >
          You don&apos;t have admin privileges to access this area.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <Link href="/" className="btn-primary" style={{ fontSize: 14 }}>
            Go Home
          </Link>
          <Link href="/login" className="btn-outline" style={{ fontSize: 14 }}>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
