"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { GraduationCap, Code2, Rocket, Award, Download, GitBranch, ExternalLink } from "lucide-react";

const TL = [
  { year:"2022", Icon:GraduationCap, title:"Started B.Sc. Computer Science", desc:"Enrolled in B.Sc. CS — deep dive into programming fundamentals, data structures, algorithms and OS concepts." },
  { year:"2025", Icon:Code2, title:"Built First Android App", desc:"Created first native Android app using Java & XML. Fell in love with mobile dev and never looked back." },
  { year:"2025", Icon:Rocket, title:"Expanded to Flutter & Firebase", desc:"Learned cross-platform Flutter/Dart and integrated Firebase for auth, Firestore realtime DB, and cloud storage." },
  { year:"2026", Icon:Award, title:"Graduation & Play Store", desc:"Graduated with B.Sc. CS. Published apps on Google Play Store — combined 500+ downloads." },
];
const SKILL_GROUPS = [
  { cat:"Android Development", items:["Java","Kotlin (Basic)","XML Layouts","Material Design","Jetpack Compose"] },
  { cat:"Flutter Development", items:["Flutter","Dart","Provider","Riverpod","GetX"] },
  { cat:"Backend & Database",  items:["Firebase Auth","Firestore","Room Database","SQLite","REST API"] },
  { cat:"Tools & Workflow",    items:["Android Studio","Git & GitHub","Postman","Gradle","Figma (Basic)"] },
];

export default function AboutPage() {
  const CARD: React.CSSProperties = { background:"rgba(255,255,255,0.04)", backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:16, padding:20 };
  return (
    <div style={{ paddingTop:112, paddingBottom:80, minHeight:"100vh" }}>
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 24px" }}>
        {/* Hero */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} style={{ marginBottom:72 }}>
          <div className="section-tag" style={{ marginBottom:16 }}>About Me</div>
          <h1 style={{ fontFamily:"var(--font-bebas),'Bebas Neue',cursive", fontSize:"clamp(42px,6vw,68px)", letterSpacing:"0.04em", color:"#fff", marginBottom:36 }}>
            ABOUT <span className="gradient-text">VIKRANT</span>
          </h1>
          <div className="about-hero">
            <div style={{ display:"flex", justifyContent:"center" }}>
              <div style={{ position:"relative" }}>
                {/* Photo card */}
                <div style={{
                  width: 260, height: 320, borderRadius: 20,
                  overflow: "hidden",
                  border: "1px solid rgba(255,122,0,0.25)",
                  boxShadow: "0 0 60px rgba(255,122,0,0.15)",
                  position: "relative",
                  background: "#111",
                }}>
                  <Image
                    src="/vikrant-photo.png"
                    alt="Vikrant Vijay Patil"
                    fill
                    style={{
                      objectFit: "cover",
                      objectPosition: "top center",
                      filter: "grayscale(100%) contrast(1.05) brightness(0.88)",
                    }}
                  />
                  {/* Bottom gradient fade */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(5,5,5,0.7) 0%, transparent 55%)",
                  }} />
                </div>
                {/* Badge */}
                <div style={{ position:"absolute", bottom:-12, right:-12, background:"rgba(8,8,8,0.92)", border:"1px solid rgba(255,122,0,0.3)", borderRadius:10, padding:"5px 12px" }}>
                  <span style={{ color:"#FF7A00", fontSize:11, fontFamily:"var(--font-jetbrains),'JetBrains Mono',monospace" }}>Available for hire</span>
                </div>
              </div>
            </div>
            <div>
              <div style={{ display:"flex", flexDirection:"column", gap:14, color:"#A1A1AA", lineHeight:1.82, fontSize:14.5, marginBottom:24 }}>
                <p>I'm <span style={{ color:"#fff", fontWeight:600 }}>Vikrant Vijay Patil</span>, a passionate Android & Flutter developer from Pune, Maharashtra. With a B.Sc. in Computer Science, I build mobile apps that combine clean code with great UX.</p>
                <p>My journey started with native Android using <span style={{ color:"#fff", fontWeight:600 }}>Java & XML</span>, expanded into cross-platform with <span style={{ color:"#fff", fontWeight:600 }}>Flutter</span>, and backend integration via <span style={{ color:"#fff", fontWeight:600 }}>Firebase</span>.</p>
                <p>I believe great apps are built at the intersection of good engineering and thoughtful design. Every app I build is crafted with performance and user delight in mind.</p>
              </div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
                <a href="#" className="btn-primary" style={{ fontSize:13 }}><Download size={14} /> Download Resume</a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ fontSize:13 }}><GitBranch size={14} /> GitHub</a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ fontSize:13 }}><ExternalLink size={14} /> LinkedIn</a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <section style={{ marginBottom:72 }}>
          <h2 style={{ fontFamily:"var(--font-bebas),'Bebas Neue',cursive", fontSize:"clamp(30px,4vw,44px)", letterSpacing:"0.04em", color:"#fff", marginBottom:40 }}>
            MY <span className="gradient-text">JOURNEY</span>
          </h2>
          <div style={{ position:"relative" }}>
            <div style={{ position:"absolute", left:20, top:0, bottom:0, width:1, background:"linear-gradient(to bottom,rgba(255,122,0,0.5),rgba(255,122,0,0.1),transparent)" }} />
            <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
              {TL.map(({ year, Icon, title, desc }, i) => (
                <motion.div key={i} initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ delay:i*0.1 }}
                  style={{ display:"flex", gap:16 }}>
                  <div style={{ flexShrink:0, zIndex:1 }}>
                    <div style={{ width:40, height:40, borderRadius:"50%", background:"rgba(255,122,0,0.1)", border:"1px solid rgba(255,122,0,0.3)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <Icon size={16} color="#FF7A00" />
                    </div>
                  </div>
                  <div style={{ ...CARD, flex:1 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8, flexWrap:"wrap" }}>
                      <span style={{ background:"rgba(255,122,0,0.12)", color:"#FF7A00", fontFamily:"var(--font-jetbrains),'JetBrains Mono',monospace", fontSize:11, fontWeight:700, padding:"2px 8px", borderRadius:6 }}>{year}</span>
                      <h3 style={{ color:"#fff", fontWeight:600, fontSize:14 }}>{title}</h3>
                    </div>
                    <p style={{ color:"#A1A1AA", fontSize:13, lineHeight:1.75 }}>{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 style={{ fontFamily:"var(--font-bebas),'Bebas Neue',cursive", fontSize:"clamp(30px,4vw,44px)", letterSpacing:"0.04em", color:"#fff", marginBottom:40 }}>
            SKILLS & <span className="gradient-text">EXPERTISE</span>
          </h2>
          <div className="skills-grid">
            {SKILL_GROUPS.map((g,gi) => (
              <motion.div key={gi} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:gi*0.1 }}
                style={CARD}>
                <h3 style={{ color:"#fff", fontWeight:600, fontSize:14, display:"flex", alignItems:"center", gap:10, marginBottom:18 }}>
                  <span style={{ width:4, height:16, borderRadius:2, background:"#FF7A00", flexShrink:0 }} />{g.cat}
                </h3>
                <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                  {g.items.map(s => (
                    <span key={s} className="skill-pill" style={{ fontSize:12, padding:"6px 12px", borderRadius:20, border:"1px solid rgba(255,255,255,0.1)", background:"rgba(255,255,255,0.04)", color:"#A1A1AA" }}>{s}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
      <style>{`
        .about-hero { display:grid; grid-template-columns:auto 1fr; gap:48px; align-items:start; }
        .skills-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:16px; }
        @media (max-width:768px) { .about-hero { grid-template-columns:1fr; } }
        @media (max-width:560px) { .skills-grid { grid-template-columns:1fr; } }
      `}</style>
    </div>
  );
}
