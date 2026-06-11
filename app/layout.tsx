import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Fonts loaded by Next.js — bundled locally, work on ALL devices
const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "block", // no FOUT — block render until loaded
});

const dmSans = DM_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "block",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "block",
});

export const metadata: Metadata = {
  title: "Vikrant.exe | Android & Flutter Developer",
  description: "Premium portfolio of Vikrant Vijay Patil — Android & Flutter Developer.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body style={{
        background: "#050505",
        color: "#fff",
        fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
        overflowX: "hidden",
        minHeight: "100vh",
      }}>
        <div className="grid-bg" />
        <div style={{ position: "relative", zIndex: 10 }}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
