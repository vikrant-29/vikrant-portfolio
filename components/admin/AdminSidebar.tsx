"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Smartphone, Mail, LogOut, ChevronRight,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/apps", label: "Apps", icon: Smartphone, exact: false },
  { href: "/admin/contacts", label: "Contacts", icon: Mail, exact: false },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <aside
      style={{
        width: 240,
        minHeight: "100vh",
        background: "rgba(255,255,255,0.02)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        flexDirection: "column",
        padding: "24px 0",
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "0 24px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          marginBottom: 16,
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "'Bebas Neue',cursive",
            fontSize: 22,
            letterSpacing: "0.06em",
            color: "#fff",
            textDecoration: "none",
            display: "block",
          }}
        >
          VIKRANT<span style={{ color: "#FF7A00" }}>.EXE</span>
        </Link>
        <span
          style={{
            fontSize: 10,
            color: "#A1A1AA",
            fontFamily: "'JetBrains Mono',monospace",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          Admin CMS
        </span>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: "0 12px" }}>
        {NAV.map(({ href, label, icon: Icon, exact }) => {
          const active = isActive(href, exact);
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                borderRadius: 10,
                marginBottom: 4,
                textDecoration: "none",
                fontSize: 13,
                fontWeight: 500,
                transition: "all 0.15s",
                background: active
                  ? "rgba(255,122,0,0.1)"
                  : "transparent",
                color: active ? "#FF7A00" : "#A1A1AA",
                border: active
                  ? "1px solid rgba(255,122,0,0.2)"
                  : "1px solid transparent",
              }}
            >
              <Icon size={15} />
              {label}
              {active && (
                <ChevronRight
                  size={13}
                  style={{ marginLeft: "auto" }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding: "0 12px", marginTop: 16 }}>
        <button
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 12px",
            borderRadius: 10,
            width: "100%",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            background: "transparent",
            border: "1px solid rgba(239,68,68,0.2)",
            color: "#EF4444",
            transition: "all 0.15s",
          }}
        >
          <LogOut size={15} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
