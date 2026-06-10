"use client";
import { motion } from "framer-motion";

const GROUPS = [
  { cat:"Mobile Dev", items:["Android (Native)","Flutter","Java","Dart","Kotlin (Basic)"] },
  { cat:"UI & Layouts", items:["XML Layouts","Material Design","Jetpack Compose","Flutter Widgets"] },
  { cat:"Backend & Data", items:["Firebase","Firestore","Room Database","SQLite","REST API"] },
  { cat:"Tools", items:["Android Studio","Git","GitHub","Gradle","Postman"] },
];
const MARQUEE = ["Android","Flutter","Java","Dart","Firebase","Firestore","REST API","Git","GitHub","XML","Material Design","Room DB","SQLite","Retrofit","Android Studio","Gradle","Kotlin","Postman","JSON","Hive"];

export default function SkillsSection() {
  return (
    <section style={{ padding:"96px 0", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, pointerEvents:"none" }} className="dot-bg" />
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px", position:"relative" }}>
        <div style={{ textAlign:"center", marginBottom:60 }}>
          <div className="section-tag" style={{ justifyContent:"center", marginBottom:16 }}>Expertise</div>
          <h2 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"clamp(36px,5vw,56px)", letterSpacing:"0.04em", color:"#fff" }}>
            SKILLS & <span className="gradient-text">TECHNOLOGIES</span>
          </h2>
        </div>

        {/* Marquee */}
        <div style={{ position:"relative", overflow:"hidden", marginBottom:60, marginLeft:-24, marginRight:-24 }}>
          <div className="animate-marquee" style={{ display:"flex", gap:12, width:"max-content", padding:"6px 12px" }}>
            {[...MARQUEE,...MARQUEE].map((s,i) => (
              <span key={i} className="skill-pill"
                style={{ fontSize:13, padding:"10px 20px", borderRadius:24, border:"1px solid rgba(255,255,255,0.09)", background:"rgba(255,255,255,0.04)", color:"#A1A1AA", whiteSpace:"nowrap", fontFamily:"'DM Sans',sans-serif", fontWeight:500 }}>
                {s}
              </span>
            ))}
          </div>
          <div style={{ position:"absolute", left:0, top:0, height:"100%", width:80, background:"linear-gradient(90deg,#050505,transparent)", zIndex:10, pointerEvents:"none" }} />
          <div style={{ position:"absolute", right:0, top:0, height:"100%", width:80, background:"linear-gradient(270deg,#050505,transparent)", zIndex:10, pointerEvents:"none" }} />
        </div>

        {/* Groups */}
        <div className="skills-grid">
          {GROUPS.map((g,gi) => (
            <motion.div key={gi} initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5, delay:gi*0.1 }}
              style={{ background:"rgba(255,255,255,0.04)", backdropFilter:"blur(20px)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:16, padding:24 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
                <div style={{ width:4, height:20, borderRadius:2, background:"#FF7A00", flexShrink:0 }} />
                <h3 style={{ color:"#fff", fontWeight:600, fontSize:14 }}>{g.cat}</h3>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {g.items.map(item => (
                  <div key={item} className="skill-row"
                    style={{ display:"flex", alignItems:"center", gap:8, color:"#A1A1AA", fontSize:13.5, cursor:"default" }}>
                    <span style={{ width:5, height:5, borderRadius:"50%", background:"rgba(255,122,0,0.6)", flexShrink:0 }} />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`
        .skills-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; }
        .skill-row:hover { color:#fff !important; }
        @media (max-width:1024px) { .skills-grid { grid-template-columns:repeat(2,1fr); } }
        @media (max-width:560px)  { .skills-grid { grid-template-columns:1fr; } }
      `}</style>
    </section>
  );
}
