"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Download, GitBranch, ExternalLink, Smartphone, Zap } from "lucide-react";

const stats = [
  { value: "5+",   label: "Apps Published" },
  { value: "10K+", label: "Downloads"       },
  { value: "3+",   label: "Years Exp."      },
];

export default function HeroSection() {
  return (
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 100, paddingBottom: 60, position: "relative", overflow: "hidden" }}>
      {/* Ambient blobs */}
      <div style={{ position: "absolute", top: "20%", left: "5%", width: 420, height: 420, borderRadius: "50%", background: "rgba(255,122,0,0.055)", filter: "blur(110px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 320, height: 320, borderRadius: "50%", background: "rgba(255,122,0,0.04)", filter: "blur(90px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", width: "100%" }}>
        <div className="hero-grid">

          {/* ── LEFT: Text ── */}
          <motion.div className="hero-left" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="section-tag" style={{ marginBottom: 24 }}>Available for work</div>

            <p style={{ color: "#A1A1AA", fontSize: 18, fontWeight: 500, marginBottom: 8 }}>Hi, I'm</p>

            <h1 style={{ fontFamily: "var(--font-bebas),'Bebas Neue',cursive", fontSize: "clamp(50px,7vw,82px)", letterSpacing: "0.04em", lineHeight: 1.02, marginBottom: 18, color: "#fff" }}>
              VIKRANT<br />
              <span className="gradient-text glow-text">VIJAY PATIL</span>
            </h1>

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div style={{ width: 40, height: 1, background: "#FF7A00", flexShrink: 0 }} />
              <span style={{ fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace", fontSize: 11, color: "#FF7A00", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                Android &amp; Flutter Developer
              </span>
            </div>

            <p style={{ fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace", fontSize: 12, color: "#A1A1AA", marginBottom: 24 }}>
              B.Sc. Computer Science Graduate
            </p>

            <p style={{ color: "#A1A1AA", fontSize: 15, lineHeight: 1.82, maxWidth: 480, marginBottom: 34 }}>
              I build modern mobile applications using{" "}
              <span style={{ color: "#fff", fontWeight: 600 }}>Java</span>,{" "}
              <span style={{ color: "#fff", fontWeight: 600 }}>Flutter</span>, and{" "}
              <span style={{ color: "#fff", fontWeight: 600 }}>Firebase</span>{" "}
              — crafting experiences that are fast, beautiful, and intuitive.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 32 }}>
              <Link href="/apps" className="btn-primary">View My Apps <ArrowRight size={15} /></Link>
              <a href="#" className="btn-outline">Download Resume <Download size={15} /></a>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ color: "#A1A1AA", fontSize: 10, fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace", letterSpacing: "0.14em", textTransform: "uppercase" }}>Follow</span>
              <div style={{ width: 24, height: 1, background: "rgba(255,255,255,0.1)" }} />
              {[
                { href: "https://github.com",   Icon: GitBranch,   label: "GitHub"   },
                { href: "https://linkedin.com",  Icon: ExternalLink, label: "LinkedIn" },
              ].map(({ href, Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" title={label}
                  className="social-icon-btn"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", color: "#A1A1AA", transition: "all 0.25s" }}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: Photo ── */}
          <motion.div className="hero-right" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.25 }}>
            <div style={{ position: "relative", display: "inline-block" }}>

              {/* Decorative rings */}
              <div style={{ position: "absolute", inset: -28, borderRadius: "50%", border: "1px solid rgba(255,122,0,0.15)", animation: "spin-slow 22s linear infinite" }} />
              <div style={{ position: "absolute", inset: -56, borderRadius: "50%", border: "1px dashed rgba(255,122,0,0.07)", animation: "spin-slow 40s linear infinite reverse" }} />

              {/* Photo circle */}
              <div className="animate-float" style={{
                width: 300, height: 300, borderRadius: "50%",
                overflow: "hidden",
                border: "2px solid rgba(255,122,0,0.35)",
                boxShadow: "0 0 60px rgba(255,122,0,0.2), 0 0 120px rgba(255,122,0,0.06)",
                position: "relative", zIndex: 1,
                background: "#111",
              }}>
                <Image
                  src="/vikrant-photo.png"
                  alt="Vikrant Vijay Patil"
                  fill
                  style={{
                    objectFit: "cover",
                    objectPosition: "top center",
                    filter: "grayscale(100%) contrast(1.05) brightness(0.9)",
                  }}
                  priority
                />
              </div>

              {/* Floating badges */}
              <div style={{ position: "absolute", top: -8, right: -18, display: "flex", alignItems: "center", gap: 6, background: "rgba(8,8,8,0.88)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,122,0,0.3)", borderRadius: 10, padding: "6px 13px", zIndex: 2 }}>
                <Smartphone size={13} color="#FF7A00" /><span style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>Android</span>
              </div>
              <div style={{ position: "absolute", bottom: -8, left: -18, display: "flex", alignItems: "center", gap: 6, background: "rgba(8,8,8,0.88)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 10, padding: "6px 13px", zIndex: 2 }}>
                <Zap size={13} color="#FF7A00" /><span style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>Flutter</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.65 }}
          style={{ marginTop: 64, background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "22px 32px", display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
          {stats.map((s, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, borderRight: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
              <span className="gradient-text" style={{ fontFamily: "var(--font-bebas),'Bebas Neue',cursive", fontSize: "clamp(28px,4vw,44px)", letterSpacing: "0.05em" }}>{s.value}</span>
              <span style={{ color: "#A1A1AA", fontSize: 13, textAlign: "center" }}>{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .hero-grid { display:grid; grid-template-columns:1fr 1fr; gap:48px; align-items:center; }
        .hero-left  { order:1; }
        .hero-right { order:2; display:flex; justify-content:flex-end; align-items:center; }
        .social-icon-btn:hover { border-color:rgba(255,122,0,0.45) !important; color:#FF7A00 !important; }
        @keyframes spin-slow { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
        @media (max-width:768px) {
          .hero-grid { grid-template-columns:1fr; gap:36px; }
          .hero-left  { order:2; }
          .hero-right { order:1; justify-content:center; }
        }
      `}</style>
    </section>
  );
}
