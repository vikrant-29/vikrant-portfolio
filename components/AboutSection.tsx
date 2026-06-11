"use client";
import { motion } from "framer-motion";
import { GraduationCap, Code2, Rocket, Award } from "lucide-react";

const TL = [
  { year:"2022", Icon:GraduationCap, title:"Started B.Sc. Computer Science", desc:"Enrolled in B.Sc. CS — deep dive into programming fundamentals, data structures, algorithms and OS concepts." },
  { year:"2025", Icon:Code2, title:"Built First Android App", desc:"Created first native Android app using Java & XML. Fell in love with mobile development and never looked back." },
  { year:"2025", Icon:Rocket, title:"Expanded to Flutter & Firebase", desc:"Learned cross-platform Flutter/Dart and integrated Firebase for auth, Firestore realtime DB, and cloud storage." },
  { year:"2026", Icon:Award, title:"Graduation & Play Store", desc:"Graduated with B.Sc. CS. Published apps on Google Play Store — combined 500+ downloads." },
];
const HIGHLIGHTS = [
  { label:"Native Android", detail:"Java & XML" },
  { label:"Cross-Platform", detail:"Flutter & Dart" },
  { label:"Backend", detail:"Firebase Suite" },
  { label:"Architecture", detail:"MVVM & Clean" },
];
const CARD: React.CSSProperties = { background:"rgba(255,255,255,0.04)", backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:14, padding:18 };

export default function AboutSection() {
  return (
    <section style={{ padding:"96px 0" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px" }}>
        <div className="about-grid">
          {/* LEFT */}
          <motion.div initial={{ opacity:0, x:-28 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}>
            <div className="section-tag" style={{ marginBottom:20 }}>About Me</div>
            <h2 style={{ fontFamily:"var(--font-bebas),'Bebas Neue',cursive", fontSize:"clamp(32px,4vw,48px)", letterSpacing:"0.04em", marginBottom:24, color:"#fff" }}>
              CRAFTING APPS <span className="gradient-text">THAT MATTER</span>
            </h2>
            <div style={{ display:"flex", flexDirection:"column", gap:14, color:"#A1A1AA", lineHeight:1.82, fontSize:14.5, marginBottom:28 }}>
              <p>I'm <span style={{ color:"#fff", fontWeight:600 }}>Vikrant Vijay Patil</span>, an Android & Flutter developer passionate about building mobile apps that solve real problems. With a B.Sc. in Computer Science, I combine academic foundations with hands-on development experience.</p>
              <p>My journey started with native Android using <span style={{ color:"#fff", fontWeight:600 }}>Java & XML</span>, expanded into cross-platform with <span style={{ color:"#fff", fontWeight:600 }}>Flutter & Dart</span>, and backend integration via <span style={{ color:"#fff", fontWeight:600 }}>Firebase</span>.</p>
              <p>When I'm not coding, I explore new technologies, contribute to open-source, and track the latest in mobile development.</p>
            </div>
            <div className="highlights-grid">
              {HIGHLIGHTS.map((h,i) => (
                <div key={i} style={CARD}>
                  <p style={{ color:"#FF7A00", fontSize:10, fontFamily:"var(--font-jetbrains),'JetBrains Mono',monospace", textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:6 }}>{h.label}</p>
                  <p style={{ color:"#fff", fontWeight:600, fontSize:14 }}>{h.detail}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div initial={{ opacity:0, x:28 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}>
            <h3 style={{ fontFamily:"var(--font-bebas),'Bebas Neue',cursive", fontSize:28, letterSpacing:"0.06em", color:"#fff", marginBottom:32 }}>MY JOURNEY</h3>
            <div style={{ position:"relative" }}>
              <div style={{ position:"absolute", left:20, top:0, bottom:0, width:1, background:"linear-gradient(to bottom,rgba(255,122,0,0.5),rgba(255,122,0,0.1),transparent)" }} />
              <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
                {TL.map(({ year, Icon, title, desc }, i) => (
                  <motion.div key={i} initial={{ opacity:0, x:20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ delay:i*0.1 }}
                    style={{ display:"flex", gap:16 }}>
                    <div style={{ flexShrink:0, zIndex:1 }}>
                      <div style={{ width:40, height:40, borderRadius:"50%", background:"rgba(255,122,0,0.1)", border:"1px solid rgba(255,122,0,0.3)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                        <Icon size={16} color="#FF7A00" />
                      </div>
                    </div>
                    <div style={{ ...CARD, flex:1 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8, flexWrap:"wrap" }}>
                        <span style={{ background:"rgba(255,122,0,0.12)", color:"#FF7A00", fontFamily:"var(--font-jetbrains),'JetBrains Mono',monospace", fontSize:11, fontWeight:700, padding:"2px 8px", borderRadius:6 }}>{year}</span>
                        <h4 style={{ color:"#fff", fontWeight:600, fontSize:13.5 }}>{title}</h4>
                      </div>
                      <p style={{ color:"#A1A1AA", fontSize:13, lineHeight:1.75 }}>{desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <style>{`
        .about-grid { display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:start; }
        .highlights-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
        @media (max-width:900px) { .about-grid { grid-template-columns:1fr; gap:48px; } }
        @media (max-width:480px) { .highlights-grid { grid-template-columns:1fr; } }
      `}</style>
    </section>
  );
}
