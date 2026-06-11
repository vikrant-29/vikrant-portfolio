"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, GitBranch, ExternalLink, Send, CheckCircle, MessageSquare } from "lucide-react";

export default function ContactSection() {
  const [form, setForm] = useState({ name:"", email:"", message:"" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setSent(true); setLoading(false);
  };

  const CARD: React.CSSProperties = { background:"rgba(255,255,255,0.04)", backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:16, padding:24 };

  return (
    <section style={{ padding:"96px 0", position:"relative", overflow:"hidden" }} id="contact">
      <div style={{ position:"absolute", bottom:0, left:"50%", transform:"translateX(-50%)", width:400, height:400, borderRadius:"50%", background:"rgba(255,122,0,0.05)", filter:"blur(100px)", pointerEvents:"none" }} />
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px", position:"relative" }}>
        <div style={{ textAlign:"center", marginBottom:56 }}>
          <div className="section-tag" style={{ justifyContent:"center", marginBottom:16 }}>Get In Touch</div>
          <h2 style={{ fontFamily:"var(--font-bebas),'Bebas Neue',cursive", fontSize:"clamp(36px,5vw,56px)", letterSpacing:"0.04em", color:"#fff", marginBottom:14 }}>
            LET&apos;S <span className="gradient-text">CONNECT</span>
          </h2>
          <p style={{ color:"#A1A1AA", fontSize:15, maxWidth:440, margin:"0 auto" }}>
            Have a project in mind or want to hire me? Reach out — I respond within 24 hours.
          </p>
        </div>

        <div className="contact-grid" style={{ maxWidth:900, margin:"0 auto" }}>
          {/* Info panel */}
          <motion.div initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} style={{ display:"flex", flexDirection:"column", gap:16 }}>
            <div style={CARD}>
              <MessageSquare size={22} color="#FF7A00" style={{ marginBottom:12 }} />
              <h3 style={{ color:"#fff", fontWeight:600, marginBottom:8 }}>Open for Opportunities</h3>
              <p style={{ color:"#A1A1AA", fontSize:13.5, lineHeight:1.75 }}>Currently open to freelance projects, internships, and full-time Android / Flutter developer roles.</p>
            </div>
            <div style={CARD}>
              <h3 style={{ color:"#fff", fontWeight:600, fontSize:13, marginBottom:18 }}>Contact Info</h3>
              {[{ Icon:Mail, label:"Email", val:"vikrantpatil.dev@gmail.com" }, { Icon:MapPin, label:"Location", val:"Pune, Maharashtra, India" }].map(({ Icon, label, val }) => (
                <div key={label} style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
                  <div style={{ width:38, height:38, borderRadius:10, background:"rgba(255,122,0,0.1)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <Icon size={15} color="#FF7A00" />
                  </div>
                  <div>
                    <p style={{ color:"#A1A1AA", fontSize:11, marginBottom:2 }}>{label}</p>
                    <p style={{ color:"#fff", fontSize:13, fontWeight:500 }}>{val}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={CARD}>
              <h3 style={{ color:"#fff", fontWeight:600, fontSize:13, marginBottom:16 }}>Social</h3>
              <div style={{ display:"flex", gap:10 }}>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link"><GitBranch size={15} /> GitHub</a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link"><ExternalLink size={15} /> LinkedIn</a>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity:0, x:20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}>
            <div style={{ ...CARD, padding:32 }}>
              {sent ? (
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", padding:"56px 0", gap:16, textAlign:"center" }}>
                  <div style={{ width:80, height:80, borderRadius:"50%", background:"rgba(255,122,0,0.1)", border:"1px solid rgba(255,122,0,0.25)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <CheckCircle size={36} color="#FF7A00" />
                  </div>
                  <h3 style={{ fontFamily:"var(--font-bebas),'Bebas Neue',cursive", fontSize:30, color:"#fff", letterSpacing:"0.06em" }}>MESSAGE SENT!</h3>
                  <p style={{ color:"#A1A1AA", fontSize:14 }}>I'll get back to you within 24 hours.</p>
                  <button onClick={() => { setSent(false); setForm({ name:"", email:"", message:"" }); }} className="btn-outline" style={{ marginTop:8 }}>Send Another</button>
                </div>
              ) : (
                <form onSubmit={submit} style={{ display:"flex", flexDirection:"column", gap:18 }}>
                  <h3 style={{ fontFamily:"var(--font-bebas),'Bebas Neue',cursive", fontSize:26, letterSpacing:"0.06em", color:"#fff", marginBottom:4 }}>SEND A MESSAGE</h3>
                  <div className="form-row">
                    <div>
                      <label style={{ color:"#A1A1AA", fontSize:10, fontFamily:"var(--font-jetbrains),'JetBrains Mono',monospace", textTransform:"uppercase", letterSpacing:"0.12em", display:"block", marginBottom:8 }}>Name *</label>
                      <input type="text" required value={form.name} onChange={e => setForm({ ...form, name:e.target.value })} placeholder="Your full name" className="form-input" />
                    </div>
                    <div>
                      <label style={{ color:"#A1A1AA", fontSize:10, fontFamily:"var(--font-jetbrains),'JetBrains Mono',monospace", textTransform:"uppercase", letterSpacing:"0.12em", display:"block", marginBottom:8 }}>Email *</label>
                      <input type="email" required value={form.email} onChange={e => setForm({ ...form, email:e.target.value })} placeholder="your@email.com" className="form-input" />
                    </div>
                  </div>
                  <div>
                    <label style={{ color:"#A1A1AA", fontSize:10, fontFamily:"var(--font-jetbrains),'JetBrains Mono',monospace", textTransform:"uppercase", letterSpacing:"0.12em", display:"block", marginBottom:8 }}>Message *</label>
                    <textarea required rows={5} value={form.message} onChange={e => setForm({ ...form, message:e.target.value })} placeholder="Tell me about your project..." className="form-input" style={{ resize:"none" }} />
                  </div>
                  <button type="submit" disabled={loading} className="btn-primary" style={{ justifyContent:"center", padding:14, opacity:loading?0.65:1, cursor:loading?"not-allowed":"pointer" }}>
                    {loading ? "Sending..." : <><Send size={15} /> Send Message</>}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      <style>{`
        .contact-grid { display:grid; grid-template-columns:1fr 1.55fr; gap:24px; }
        .form-row { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        @media (max-width:768px) { .contact-grid { grid-template-columns:1fr; } }
        @media (max-width:480px) { .form-row { grid-template-columns:1fr; } }
      `}</style>
    </section>
  );
}
