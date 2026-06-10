import Link from "next/link";
import { Terminal, Heart, GitBranch, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ borderTop:"1px solid rgba(255,255,255,0.06)", marginTop:80 }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"48px 24px 32px" }}>
        <div className="footer-grid">
          <div>
            <Link href="/" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none", marginBottom:16 }}>
              <div style={{ width:32, height:32, borderRadius:8, background:"#FF7A00", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Terminal size={14} color="#fff" />
              </div>
              <span style={{ fontFamily:"'Bebas Neue',cursive", fontSize:18, letterSpacing:"0.15em", color:"#fff" }}>
                VIKRANT<span style={{ color:"#FF7A00" }}>.EXE</span>
              </span>
            </Link>
            <p style={{ color:"#A1A1AA", fontSize:13, lineHeight:1.7, maxWidth:240 }}>
              Building modern mobile experiences with Android & Flutter. One app at a time.
            </p>
          </div>

          <div>
            <h3 style={{ color:"#fff", fontWeight:600, fontSize:12, textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:16 }}>Navigation</h3>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {[{href:"/",l:"Home"},{href:"/apps",l:"Apps"},{href:"/about",l:"About"},{href:"/contact",l:"Contact"}].map(({href,l}) => (
                <Link key={href} href={href} className="footer-link">{l}</Link>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ color:"#fff", fontWeight:600, fontSize:12, textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:16 }}>Connect</h3>
            <div style={{ display:"flex", gap:10, marginBottom:16 }}>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <GitBranch size={15} /> GitHub
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <ExternalLink size={15} /> LinkedIn
              </a>
            </div>
            <p style={{ color:"#A1A1AA", fontSize:12 }}>vikrantpatil.dev@gmail.com</p>
          </div>
        </div>

        <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)", paddingTop:24, display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"center", gap:12 }}>
          <p style={{ color:"#A1A1AA", fontSize:12 }}>© 2025 Vikrant Vijay Patil. All rights reserved.</p>
          <p style={{ color:"#A1A1AA", fontSize:12, display:"flex", alignItems:"center", gap:6 }}>
            Built with <Heart size={11} style={{ color:"#FF7A00", fill:"#FF7A00" }} /> using Next.js & Supabase
          </p>
        </div>
      </div>
      <style>{`
        .footer-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:40px; margin-bottom:40px; }
        @media (max-width:768px) { .footer-grid { grid-template-columns:1fr 1fr; gap:28px; } }
        @media (max-width:480px) { .footer-grid { grid-template-columns:1fr; } }
      `}</style>
    </footer>
  );
}
