import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Vikrant.exe | Android & Flutter Developer",
  description: "Premium portfolio of Vikrant Vijay Patil — Android & Flutter Developer.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background:"#050505", color:"#fff", fontFamily:"'DM Sans',sans-serif", overflowX:"hidden", minHeight:"100vh" }}>
        <div className="grid-bg" />
        <div style={{ position:"relative", zIndex:10 }}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
