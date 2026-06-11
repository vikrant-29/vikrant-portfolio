import Link from "next/link";
import { Smartphone, Mail, Star, ArrowRight, Plus } from "lucide-react";
import { getDashboardStats, getAllContacts } from "@/lib/queries";

const CARD: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 16,
  padding: 24,
};

export default async function AdminDashboard() {
  const [stats, contacts] = await Promise.all([
    getDashboardStats(),
    getAllContacts(),
  ]);

  const recentContacts = contacts.slice(0, 5);

  const statCards = [
    {
      label: "Total Apps",
      value: stats.totalApps,
      icon: Smartphone,
      color: "#FF7A00",
      href: "/admin/apps",
    },
    {
      label: "Featured Apps",
      value: stats.featuredApps,
      icon: Star,
      color: "#FACC15",
      href: "/admin/apps",
    },
    {
      label: "Contact Messages",
      value: stats.totalContacts,
      icon: Mail,
      color: "#34D399",
      href: "/admin/contacts",
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 32,
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: "var(--font-bebas),'Bebas Neue',cursive",
              fontSize: 40,
              letterSpacing: "0.04em",
              color: "#fff",
              marginBottom: 4,
            }}
          >
            DASHBOARD
          </h1>
          <p style={{ color: "#A1A1AA", fontSize: 13 }}>
            Welcome back. Here&apos;s an overview of your portfolio.
          </p>
        </div>
        <Link
          href="/admin/apps/new"
          className="btn-primary"
          style={{ fontSize: 13 }}
        >
          <Plus size={14} /> New App
        </Link>
      </div>

      {/* Stat cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 16,
          marginBottom: 40,
        }}
      >
        {statCards.map(({ label, value, icon: Icon, color, href }) => (
          <Link
            key={label}
            href={href}
            style={{ textDecoration: "none" }}
          >
            <div
              style={{
                ...CARD,
                display: "flex",
                alignItems: "center",
                gap: 16,
                transition: "border-color 0.2s",
                cursor: "pointer",
              }}
              className="stat-card"
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: `${color}18`,
                  border: `1px solid ${color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon size={20} color={color} />
              </div>
              <div>
                <p
                  style={{
                    color: "#A1A1AA",
                    fontSize: 12,
                    marginBottom: 4,
                    fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  {label}
                </p>
                <p
                  style={{
                    color: "#fff",
                    fontSize: 28,
                    fontWeight: 700,
                    fontFamily: "var(--font-bebas),'Bebas Neue',cursive",
                    letterSpacing: "0.04em",
                  }}
                >
                  {value}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent contacts */}
      <div style={CARD}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <h2
            style={{
              color: "#fff",
              fontWeight: 600,
              fontSize: 15,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span
              style={{
                width: 4,
                height: 18,
                borderRadius: 2,
                background: "#FF7A00",
                flexShrink: 0,
              }}
            />
            Recent Messages
          </h2>
          <Link
            href="/admin/contacts"
            style={{
              color: "#FF7A00",
              fontSize: 12,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            View all <ArrowRight size={12} />
          </Link>
        </div>

        {recentContacts.length === 0 ? (
          <p style={{ color: "#A1A1AA", fontSize: 13, textAlign: "center", padding: "32px 0" }}>
            No messages yet.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {recentContacts.map((c) => (
              <div
                key={c.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 2fr auto",
                  gap: 16,
                  padding: "12px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  alignItems: "center",
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
              </div>
            ))}
          </div>
        )}
      </div>
      <style>{`
        .stat-card:hover { border-color: rgba(255,122,0,0.3) !important; }
      `}</style>
    </div>
  );
}
