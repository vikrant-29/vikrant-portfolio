"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Terminal } from "lucide-react";

const LINKS = [
  { href:"/", label:"Home" },
  { href:"/apps", label:"Apps" },
  { href:"/about", label:"About" },
  { href:"/contact", label:"Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header style={{
      position:"fixed", top:0, left:0, right:0, zIndex:50,
      padding: scrolled ? "12px 0" : "20px 0",
      background: scrolled ? "rgba(5,5,5,0.9)" : "transparent",
      backdropFilter: scrolled ? "blur(24px)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      transition:"all 0.4s",
    }}>
      <nav style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <Link href="/" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none" }}>
          <div style={{ width:34, height:34, borderRadius:8, background:"#FF7A00", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 0 20px rgba(255,122,0,0.4)" }}>
            <Terminal size={16} color="#fff" />
          </div>
          <span style={{ fontFamily:"'Bebas Neue',cursive", fontSize:20, letterSpacing:"0.15em", color:"#fff" }}>
            VIKRANT<span style={{ color:"#FF7A00" }}>.EXE</span>
          </span>
        </Link>

        <ul className="desk-nav" style={{ display:"flex", alignItems:"center", gap:36, listStyle:"none", margin:0, padding:0 }}>
          {LINKS.map(l => <li key={l.href}><Link href={l.href} className="nav-link">{l.label}</Link></li>)}
        </ul>

        <div className="desk-cta">
          <Link href="/contact" className="btn-primary" style={{ fontSize:13, padding:"9px 20px" }}>Hire Me</Link>
        </div>

        <button onClick={() => setOpen(!open)} className="mob-btn"
          style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:8, padding:8, cursor:"pointer", color:"#fff", display:"flex", alignItems:"center" }}>
          {open ? <X size={20}/> : <Menu size={20}/>}
        </button>
      </nav>

      {open && (
        <div style={{ background:"rgba(5,5,5,0.97)", backdropFilter:"blur(24px)", borderTop:"1px solid rgba(255,255,255,0.06)", padding:"16px 24px 24px" }}>
          {LINKS.map(l => (
            <div key={l.href} style={{ borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
              <Link href={l.href} onClick={() => setOpen(false)} className="footer-link"
                style={{ display:"block", padding:"14px 0", fontSize:16, fontWeight:500 }}>
                {l.label}
              </Link>
            </div>
          ))}
          <Link href="/contact" className="btn-primary" onClick={() => setOpen(false)}
            style={{ marginTop:16, width:"100%", justifyContent:"center", fontSize:14 }}>
            Hire Me
          </Link>
        </div>
      )}

      <style>{`
        .desk-nav { display:flex !important; }
        .desk-cta { display:flex !important; }
        .mob-btn  { display:none !important; }
        @media (max-width:768px) {
          .desk-nav,.desk-cta { display:none !important; }
          .mob-btn { display:flex !important; }
        }
      `}</style>
    </header>
  );
}
