"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft, ExternalLink, GitBranch,
  ChevronLeft, ChevronRight, Smartphone, Star,
} from "lucide-react";
import type { App } from "@/types";

function techClass(t: string) {
  const m: Record<string, string> = {
    Java: "tech-java", Flutter: "tech-flutter",
    Firebase: "tech-firebase", Dart: "tech-dart",
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
};

export default function AppDetailClient({
  app,
  related,
}: {
  app: App;
  related: App[];
}) {
  const screenshots = app.screenshots ?? [];
  const [shot, setShot] = useState(0);

  return (
    <div style={{ paddingTop: 112, paddingBottom: 80, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <Link
          href="/apps"
          className="back-link"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            color: "#A1A1AA", textDecoration: "none",
            fontSize: 13, marginBottom: 32,
          }}
        >
          <ArrowLeft size={14} /> Back to Apps
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: "flex", flexWrap: "wrap",
            alignItems: "center", gap: 20, marginBottom: 40,
          }}
        >
          {app.logo_url ? (
            <div
              style={{
                width: 80, height: 80, borderRadius: 20,
                overflow: "hidden", flexShrink: 0,
                boxShadow: "0 0 40px rgba(255,122,0,0.15)",
                border: "1px solid rgba(255,122,0,0.25)",
              }}
            >
              <Image
                src={app.logo_url}
                alt={app.title}
                width={80}
                height={80}
                style={{ objectFit: "cover" }}
              />
            </div>
          ) : (
            <div
              style={{
                width: 80, height: 80, borderRadius: 20,
                background: "rgba(255,122,0,0.1)",
                border: "1px solid rgba(255,122,0,0.25)",
                display: "flex", alignItems: "center",
                justifyContent: "center", flexShrink: 0,
                boxShadow: "0 0 40px rgba(255,122,0,0.15)",
              }}
            >
              <span
                style={{
                  fontFamily: "'Bebas Neue',cursive",
                  fontSize: 34, color: "#FF7A00",
                }}
              >
                {app.title[0]}
              </span>
            </div>
          )}
          <div style={{ flex: 1, minWidth: 200 }}>
            <h1
              style={{
                fontFamily: "'Bebas Neue',cursive",
                fontSize: "clamp(36px,5vw,56px)",
                letterSpacing: "0.04em", color: "#fff",
              }}
            >
              {app.title.toUpperCase()}
            </h1>
            <p style={{ color: "#A1A1AA", fontSize: 14, marginBottom: 8 }}>
              {app.short_description}
            </p>
            <div style={{ display: "flex", gap: 3 }}>
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} size={13} color="#FF7A00" fill="#FF7A00" />
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {app.live_url && (
              <a
                href={app.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ fontSize: 13 }}
              >
                Play Store <ExternalLink size={13} />
              </a>
            )}
            {app.github_url && (
              <a
                href={app.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                style={{ fontSize: 13 }}
              >
                <GitBranch size={13} /> GitHub
              </a>
            )}
          </div>
        </motion.div>

        <div className="detail-grid">
          {/* Left column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={CARD}
            >
              <h2
                style={{
                  color: "#fff", fontWeight: 600, fontSize: 15,
                  display: "flex", alignItems: "center", gap: 10, marginBottom: 16,
                }}
              >
                <span
                  style={{
                    width: 4, height: 18, borderRadius: 2,
                    background: "#FF7A00", flexShrink: 0,
                  }}
                />
                About This App
              </h2>
              <p style={{ color: "#A1A1AA", fontSize: 13.5, lineHeight: 1.82 }}>
                {app.full_description}
              </p>
            </motion.div>

            {/* Screenshots */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={CARD}
            >
              <h2
                style={{
                  color: "#fff", fontWeight: 600, fontSize: 15,
                  display: "flex", alignItems: "center", gap: 10, marginBottom: 20,
                }}
              >
                <span
                  style={{
                    width: 4, height: 18, borderRadius: 2,
                    background: "#FF7A00", flexShrink: 0,
                  }}
                />
                Screenshots
              </h2>

              {screenshots.length === 0 ? (
                <div
                  style={{
                    display: "flex", justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  <div
                    style={{
                      width: 160, height: 284, borderRadius: 20,
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      display: "flex", flexDirection: "column",
                      alignItems: "center", justifyContent: "center", gap: 8,
                    }}
                  >
                    <Smartphone size={32} color="#A1A1AA" />
                    <span
                      style={{
                        color: "#A1A1AA", fontSize: 12,
                        fontFamily: "'JetBrains Mono',monospace",
                      }}
                    >
                      No screenshots
                    </span>
                  </div>
                </div>
              ) : (
                <>
                  <div
                    style={{
                      display: "flex", justifyContent: "center", marginBottom: 16,
                    }}
                  >
                    <div
                      style={{
                        width: 160, height: 284, borderRadius: 20,
                        overflow: "hidden",
                        border: "1px solid rgba(255,255,255,0.1)",
                        background: "rgba(255,255,255,0.04)",
                      }}
                    >
                      <Image
                        src={screenshots[shot].image_url}
                        alt={`Screenshot ${shot + 1}`}
                        width={160}
                        height={284}
                        style={{ objectFit: "cover", width: "100%", height: "100%" }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex", gap: 10,
                      justifyContent: "center", alignItems: "center",
                    }}
                  >
                    <button
                      onClick={() => setShot((p) => Math.max(0, p - 1))}
                      disabled={shot === 0}
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 8, padding: "6px 10px",
                        cursor: shot === 0 ? "not-allowed" : "pointer",
                        color: "#fff", display: "flex", opacity: shot === 0 ? 0.4 : 1,
                      }}
                    >
                      <ChevronLeft size={15} />
                    </button>
                    {screenshots.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setShot(i)}
                        style={{
                          width: 44, height: 44, borderRadius: 8,
                          border: `1px solid ${shot === i ? "#FF7A00" : "rgba(255,255,255,0.1)"}`,
                          background: "rgba(255,255,255,0.03)",
                          cursor: "pointer",
                          color: shot === i ? "#FF7A00" : "#A1A1AA",
                          fontSize: 12,
                          fontFamily: "'JetBrains Mono',monospace",
                          transition: "all 0.2s",
                          overflow: "hidden",
                          padding: 0,
                        }}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() =>
                        setShot((p) => Math.min(screenshots.length - 1, p + 1))
                      }
                      disabled={shot === screenshots.length - 1}
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 8, padding: "6px 10px",
                        cursor: shot === screenshots.length - 1 ? "not-allowed" : "pointer",
                        color: "#fff", display: "flex",
                        opacity: shot === screenshots.length - 1 ? 0.4 : 1,
                      }}
                    >
                      <ChevronRight size={15} />
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>

          {/* Right column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              style={CARD}
            >
              <h3
                style={{
                  color: "#fff", fontWeight: 600, fontSize: 12,
                  textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 16,
                }}
              >
                Tech Stack
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {app.tech_stack.map((t) => (
                  <span
                    key={t}
                    className={`skill-pill ${techClass(t)}`}
                    style={{
                      fontSize: 12, padding: "6px 13px", borderRadius: 20,
                      border: "1px solid",
                      fontFamily: "'JetBrains Mono',monospace",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              style={CARD}
            >
              <h3
                style={{
                  color: "#fff", fontWeight: 600, fontSize: 12,
                  textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 16,
                }}
              >
                Links
              </h3>
              {app.live_url ? (
                <a
                  href={app.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="detail-link"
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    color: "#A1A1AA", textDecoration: "none",
                    fontSize: 13, marginBottom: 14,
                  }}
                >
                  <ExternalLink size={13} /> Google Play Store
                </a>
              ) : (
                <span
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    color: "#555", fontSize: 13, marginBottom: 14,
                  }}
                >
                  <ExternalLink size={13} /> Play Store (coming soon)
                </span>
              )}
              {app.github_url ? (
                <a
                  href={app.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="detail-link"
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    color: "#A1A1AA", textDecoration: "none", fontSize: 13,
                  }}
                >
                  <GitBranch size={13} /> View Source Code
                </a>
              ) : (
                <span
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    color: "#555", fontSize: 13,
                  }}
                >
                  <GitBranch size={13} /> Private repository
                </span>
              )}
            </motion.div>

            {related.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
                style={CARD}
              >
                <h3
                  style={{
                    color: "#fff", fontWeight: 600, fontSize: 12,
                    textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 16,
                  }}
                >
                  Related Apps
                </h3>
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/apps/${r.slug}`}
                    className="related-link"
                    style={{
                      display: "flex", alignItems: "center", gap: 12,
                      textDecoration: "none", marginBottom: 14,
                    }}
                  >
                    {r.logo_url ? (
                      <div
                        style={{
                          width: 36, height: 36, borderRadius: 10,
                          overflow: "hidden", flexShrink: 0,
                        }}
                      >
                        <Image
                          src={r.logo_url}
                          alt={r.title}
                          width={36}
                          height={36}
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    ) : (
                      <div
                        style={{
                          width: 36, height: 36, borderRadius: 10,
                          background: "rgba(255,122,0,0.1)",
                          display: "flex", alignItems: "center",
                          justifyContent: "center", flexShrink: 0,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 14, color: "#FF7A00",
                            fontFamily: "'Bebas Neue',cursive",
                          }}
                        >
                          {r.title[0]}
                        </span>
                      </div>
                    )}
                    <div>
                      <p style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>
                        {r.title}
                      </p>
                      <p style={{ color: "#A1A1AA", fontSize: 11 }}>
                        {r.tech_stack[0]}
                      </p>
                    </div>
                  </Link>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
      <style>{`
        .detail-grid { display:grid; grid-template-columns:1.6fr 1fr; gap:24px; }
        .back-link:hover { color:#FF7A00 !important; }
        .detail-link:hover { color:#FF7A00 !important; }
        .related-link:hover p { color:#FF7A00 !important; }
        @media (max-width:820px) { .detail-grid { grid-template-columns:1fr; } }
      `}</style>
    </div>
  );
}
