import Link from "next/link";
import { ExternalLink, ArrowRight, Star, Smartphone } from "lucide-react";
import { getFeaturedApps } from "@/lib/queries";
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
  gap: 16,
};

function AppCard({ app, index }: { app: App; index: number }) {
  return (
    <div style={CARD} className="app-card feat-card" data-index={index}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        {app.logo_url ? (
          <img
            src={app.logo_url}
            alt={app.title}
            width={52}
            height={52}
            style={{ borderRadius: 12, objectFit: "cover", flexShrink: 0 }}
          />
        ) : (
          <div
            style={{
              width: 52, height: 52, borderRadius: 12,
              background: "rgba(255,122,0,0.1)",
              border: "1px solid rgba(255,122,0,0.2)",
              display: "flex", alignItems: "center",
              justifyContent: "center", flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-bebas),'Bebas Neue',cursive",
                fontSize: 22, color: "#FF7A00",
              }}
            >
              {app.title[0]}
            </span>
          </div>
        )}
        <div>
          <h3
            style={{
              color: "#fff", fontWeight: 600, fontSize: 17, marginBottom: 4,
            }}
          >
            {app.title}
          </h3>
          <div style={{ display: "flex", gap: 2 }}>
            {[0, 1, 2, 3, 4].map((j) => (
              <Star key={j} size={11} color="#FF7A00" fill="#FF7A00" />
            ))}
          </div>
        </div>
      </div>

      <p
        style={{
          color: "#A1A1AA", fontSize: 13.5, lineHeight: 1.75, flex: 1,
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
              border: "1px solid", fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace",
            }}
          >
            {t}
          </span>
        ))}
      </div>

      <div
        style={{
          display: "flex", gap: 8,
          paddingTop: 8,
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {app.live_url ? (
          <a
            href={app.live_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ flex: 1, justifyContent: "center", fontSize: 12, padding: "8px 12px" }}
          >
            Play Store <ExternalLink size={12} />
          </a>
        ) : (
          <span
            className="btn-primary"
            style={{
              flex: 1, justifyContent: "center", fontSize: 12,
              padding: "8px 12px", opacity: 0.4, cursor: "not-allowed",
            }}
          >
            <Smartphone size={12} /> Coming Soon
          </span>
        )}
        <Link
          href={`/apps/${app.slug}`}
          className="btn-outline"
          style={{ flex: 1, justifyContent: "center", fontSize: 12, padding: "8px 12px" }}
        >
          Details <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}

export default async function FeaturedApps() {
  const apps = await getFeaturedApps();

  return (
    <section style={{ padding: "96px 0", position: "relative" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div
          style={{
            display: "flex", flexWrap: "wrap",
            alignItems: "flex-end", justifyContent: "space-between",
            gap: 16, marginBottom: 56,
          }}
        >
          <div>
            <div className="section-tag" style={{ marginBottom: 16 }}>Portfolio</div>
            <h2
              style={{
                fontFamily: "var(--font-bebas),'Bebas Neue',cursive",
                fontSize: "clamp(36px,5vw,56px)",
                letterSpacing: "0.04em", color: "#fff",
              }}
            >
              FEATURED <span className="gradient-text">APPS</span>
            </h2>
          </div>
          <Link
            href="/apps"
            className="btn-outline"
            style={{ fontSize: 13 }}
          >
            View All Apps <ArrowRight size={14} />
          </Link>
        </div>

        {apps.length === 0 ? (
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16, padding: 80,
              textAlign: "center", color: "#A1A1AA",
            }}
          >
            No featured apps yet.
          </div>
        ) : (
          <div className="feat-grid">
            {apps.map((app, i) => (
              <AppCard key={app.id} app={app} index={i} />
            ))}
          </div>
        )}
      </div>
      <style>{`
        .feat-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
        @media (max-width:1024px) { .feat-grid { grid-template-columns:repeat(2,1fr); } }
        @media (max-width:640px)  { .feat-grid { grid-template-columns:1fr; } }
      `}</style>
    </section>
  );
}
