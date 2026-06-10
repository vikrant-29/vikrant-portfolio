import Link from "next/link";
import { Terminal, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ width:80, height:80, borderRadius:20, background:"rgba(255,122,0,0.1)", border:"1px solid rgba(255,122,0,0.25)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 24px" }}>
          <Terminal size={32} color="#FF7A00" />
        </div>
        <p style={{ fontFamily:"'JetBrains Mono',monospace", color:"#FF7A00", fontSize:12, letterSpacing:"0.15em", marginBottom:12 }}>ERROR 404</p>
        <h1 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"clamp(48px,8vw,96px)", letterSpacing:"0.04em", color:"#fff", marginBottom:16 }}>PAGE NOT FOUND</h1>
        <p style={{ color:"#A1A1AA", marginBottom:32, fontSize:15 }}>The page you are looking for does not exist or has been moved.</p>
        <Link href="/" className="btn-primary" style={{ display:"inline-flex" }}>
          <ArrowLeft size={15} /> Back to Home
        </Link>
      </div>
    </div>
  );
}
