"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, Filter, ExternalLink, ArrowRight, Smartphone } from "lucide-react";
import type { App } from "@/types";

function techClass(t: string) {
  const m: Record<string, string> = {
    Java: "tech-java",
    Flutter: "tech-flutter",
    Firebase: "tech-firebase",
    Dart: "tech-dart",
  };
  return m[t] || "tech-default";
}

const CARD: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 16,
  padding: 24,
  display: "flex",
  flexDirection: "column",
  gap: 14,
};

export default function AppsClient({ initialApps }: { initialApps: App[] }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Build filter list from actual data
  const allTechs = useMemo(() => {
    const set = new Set<string>();
    initialApps.forEach((a) => a.tech_stack.forEach((t) => set.add(t)));
    return ["All", ...Array.from(set)];
  }, [initialApps]);

  const filtered = useMemo(
    () =>
      initialApps.filter(
        (a) =>
          (a.title.toLowerCase().includes(search.toLowerCase()) ||
            a.short_description.toLowerCase().includes(search.toLowerCase())) &&
          (filter === "All" || a.tech_stack.includes(filter))
      ),
    [initialApps, search, filter]
  );

  return (
    <div style={{ paddingTop: 112, paddingBottom: 80, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: 48 }}
        >
          <div className="section-tag" style={{ marginBottom: 16 }}>Portfolio</div>
          <h1
            style={{
              fontFamily: "var(--font-bebas),'Bebas Neue',cursive",
              fontSize: "clamp(42px,6vw,68px)",
              letterSpacing: "0.04em",
              color: "#fff",
              marginBottom: 12,
            }}
          >
            ALL <span className="gradient-text">APPS</span>
          </h1>
          <p style={{ color: "#A1A1AA", fontSize: 15, maxWidth: 480 }}>
            Explore my collection of Android and Flutter apps — each built with care and modern best practices.
          </p>
        </motion.div>

        {/* Search + Filter */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 28 }}>
          <div style={{ position: "relative", flex: "1 1 260px" }}>
            <Search
              size={15}
              color="#A1A1AA"
              style={{
                position: "absolute", left: 14, top: "50%",
                transform: "translateY(-50%)", pointerEvents: "none",
              }}
            />
            <input
              type="text"
              placeholder="Search apps..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-input"
              style={{ paddingLeft: 40 }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <Filter size={14} color="#A1A1AA" />
            {allTechs.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  fontSize: 12, padding: "8px 14px", borderRadius: 8,
                  border: "1px solid", cursor: "pointer",
                  fontFamily: "var(--font-dm-sans),'DM Sans',sans-serif", fontWeight: 500,
                  transition: "all 0.2s",
                  background: filter === f ? "#FF7A00" : "rgba(255,255,255,0.04)",
                  borderColor: filter === f ? "#FF7A00" : "rgba(255,255,255,0.1)",
                  color: filter === f ? "#fff" : "#A1A1AA",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <p
          style={{
            color: "#A1A1AA", fontSize: 12,
            fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace", marginBottom: 24,
          }}
        >
          Showing <span style={{ color: "#FF7A00" }}>{filtered.length}</span>{" "}
          app{filtered.length !== 1 ? "s" : ""}
        </p>

        {filtered.length === 0 ? (
          <div style={{ ...CARD, alignItems: "center", padding: 80, textAlign: "center" }}>
            <Smartphone size={40} color="#A1A1AA" />
            <p style={{ color: "#A1A1AA", marginTop: 12 }}>
              No apps found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="apps-grid">
            {filtered.map((app, i) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                style={CARD}
                className="app-card"
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  {app.logo_url ? (
                    <img
                      src={app.logo_url}
                      alt={app.title}
                      width={48}
                      height={48}
                      style={{ borderRadius: 12, objectFit: "cover", flexShrink: 0 }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 48, height: 48, borderRadius: 12,
                        background: "rgba(255,122,0,0.1)",
                        border: "1px solid rgba(255,122,0,0.2)",
                        display: "flex", alignItems: "center",
                        justifyContent: "center", flexShrink: 0,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-bebas),'Bebas Neue',cursive",
                          fontSize: 20, color: "#FF7A00",
                        }}
                      >
                        {app.title[0]}
                      </span>
                    </div>
                  )}
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex", alignItems: "center",
                        gap: 8, flexWrap: "wrap",
                      }}
                    >
                      <h3 style={{ color: "#fff", fontWeight: 600, fontSize: 16 }}>
                        {app.title}
                      </h3>
                      {app.featured && (
                        <span
                          style={{
                            fontSize: 10,
                            background: "rgba(255,122,0,0.12)",
                            color: "#FF7A00",
                            border: "1px solid rgba(255,122,0,0.25)",
                            padding: "2px 8px", borderRadius: 20,
                            fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace",
                          }}
                        >
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <p
                  style={{
                    color: "#A1A1AA", fontSize: 13, lineHeight: 1.75, flex: 1,
                  }}
                >
                  {app.short_description}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {app.tech_stack.map((t) => (
                    <span
                      key={t}
                      className={`skill-pill ${techClass(t)}`}
                      style={{
                        fontSize: 11, padding: "4px 10px", borderRadius: 20,
                        border: "1px solid",
                        fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div
                  style={{
                    display: "flex", gap: 8, paddingTop: 6,
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {app.live_url ? (
                    <a
                      href={app.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                      style={{
                        flex: 1, justifyContent: "center",
                        fontSize: 12, padding: "8px 10px",
                      }}
                    >
                      Play Store <ExternalLink size={11} />
                    </a>
                  ) : (
                    <span
                      className="btn-primary"
                      style={{
                        flex: 1, justifyContent: "center",
                        fontSize: 12, padding: "8px 10px",
                        opacity: 0.4, cursor: "not-allowed",
                      }}
                    >
                      <Smartphone size={11} /> Soon
                    </span>
                  )}
                  <Link
                    href={`/apps/${app.slug}`}
                    className="btn-outline"
                    style={{
                      flex: 1, justifyContent: "center",
                      fontSize: 12, padding: "8px 10px",
                    }}
                  >
                    Details <ArrowRight size={11} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <style>{`
        .apps-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
        @media (max-width:1024px) { .apps-grid { grid-template-columns:repeat(2,1fr); } }
        @media (max-width:600px)  { .apps-grid { grid-template-columns:1fr; } }
      `}</style>
    </div>
  );
}
