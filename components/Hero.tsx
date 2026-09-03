"use client";

import { sekolah } from "@/data/sekolah";
import Counter from "./Counter";
import {
  IconUsers,
  IconGraduation,
  IconBuilding,
  IconCalendar,
} from "./icons";

export default function Hero() {
  return (
    <section id="home" aria-label="Beranda">
      <div className="hero-bg"></div>
      <div className="hero-bg-pattern"></div>

      <div className="hero-shapes" aria-hidden="true">
        <div className="hero-shape hero-shape-1"></div>
        <div className="hero-shape hero-shape-2"></div>
        <div className="hero-shape hero-shape-3"></div>
      </div>

      {/* Main Hero Content - full width, text anchored to bottom-left */}
      <div className="hero-content-pb" style={{
        padding: "100px 24px 80px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        background: "linear-gradient(rgba(252, 252, 249, 0.85), rgba(252, 252, 249, 0.95)), url('https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop') center/cover no-repeat",
        position: "relative",
        overflow: "hidden"
      }}>

        {/* Modern Education Floating Shapes */}
        <div style={{ position: "absolute", top: "15%", left: "10%", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(250, 204, 21, 0.15) 0%, transparent 70%)", borderRadius: "50%", zIndex: 1 }}></div>
        <div style={{ position: "absolute", bottom: "10%", right: "5%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(6, 78, 59, 0.08) 0%, transparent 70%)", borderRadius: "50%", zIndex: 1 }}></div>
        <div style={{ position: "absolute", top: "40%", right: "15%", width: "80px", height: "80px", border: "4px solid var(--accent)", borderRadius: "24px", transform: "rotate(15deg)", opacity: 0.2, zIndex: 1 }}></div>
        <div style={{ position: "absolute", bottom: "30%", left: "15%", width: "60px", height: "60px", backgroundColor: "var(--primary)", borderRadius: "50%", opacity: 0.05, zIndex: 1 }}></div>

        <div className="hero-main-area" style={{ width: "100%", maxWidth: "1000px", margin: "0 auto", position: "relative", zIndex: 10 }}>

          {/* Big heading */}
          <div className="hero-text-block fade-in-up" style={{ textAlign: "center", margin: "0 auto" }}>
            <span style={{
              color: "var(--primary)",
              fontWeight: 800,
              letterSpacing: "1px",
              textTransform: "uppercase",
              fontSize: "0.85rem",
              marginBottom: "24px",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "var(--accent)",
              padding: "8px 24px",
              borderRadius: "99px",
              boxShadow: "0 4px 15px rgba(250, 204, 21, 0.3)"
            }}>
              Selamat Datang di {sekolah.namaSingkat}
            </span>
            <h1 style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontWeight: 900,
              color: "var(--primary)",
              lineHeight: 1.15,
              marginBottom: "24px",
              fontFamily: "var(--font-heading)"
            }}>
              Rumah Kedua untuk Mencetak <br />
              <span style={{
                display: "inline-block",
                position: "relative",
                whiteSpace: "nowrap",
                background: "var(--accent)",
                padding: "0 16px",
                borderRadius: "16px",
                transform: "rotate(-1deg)",
                boxShadow: "0 8px 20px rgba(250, 204, 21, 0.4)",
                color: "var(--primary)",
                margin: "4px 0"
              }}>
                Generasi Qur'ani
              </span> Berwawasan Global.
            </h1>
            <p style={{
              fontSize: "1.1rem",
              color: "#334155",
              fontWeight: 500,
              marginBottom: "32px",
              maxWidth: "680px",
              margin: "0 auto 32px auto",
              lineHeight: 1.6
            }}>
              Membangun fondasi akhlak islami, karakter tangguh, dan kecakapan abad 21 melalui pendekatan belajar yang smart, modern, dan penuh kekeluargaan.
            </p>

            <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href="/profil"
                style={{
                  padding: "18px 40px",
                  backgroundColor: "var(--brand-green)",
                  color: "black",
                  borderRadius: "99px",
                  fontWeight: 700,
                  fontSize: "1.05rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  transition: "all 0.3s ease",
                  boxShadow: "0 10px 25px rgba(22, 163, 74, 0.3)"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 15px 35px rgba(22, 163, 74, 0.45)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 10px 25px rgba(22, 163, 74, 0.3)";
                }}
              >
                Mulai Eksplorasi
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
              <a
                href="/ekstrakurikuler"
                style={{
                  padding: "18px 40px",
                  backgroundColor: "var(--brand-green)",
                  color: "black",
                  borderRadius: "99px",
                  fontWeight: 700,
                  fontSize: "1.05rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  transition: "all 0.3s ease",
                  boxShadow: "0 10px 25px rgba(22, 163, 74, 0.3)"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 15px 35px rgba(22, 163, 74, 0.45)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 10px 25px rgba(22, 163, 74, 0.3)";
                }}
              >
                Lihat Program Kami
              </a>
            </div>
          </div>
        </div>

        {/* Stats Strip at bottom */}
        <div className="hero-stats-strip">
          <div className="hero-stat-item">
            <div className="hero-stat-num"><Counter target={30} suffix="+" /></div>
            <div className="hero-stat-lbl">
              <IconUsers width={13} height={13} />
              Guru &amp; Staff
            </div>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat-item">
            <div className="hero-stat-num"><Counter target={103} suffix="+" /></div>
            <div className="hero-stat-lbl">
              <IconGraduation width={13} height={13} />
              Siswa Aktif
            </div>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat-item">
            <div className="hero-stat-num"><Counter target={6} /></div>
            <div className="hero-stat-lbl">
              <IconBuilding width={13} height={13} />
              Kelas
            </div>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat-item">
            <div className="hero-stat-num"><Counter target={1983} useSeparator={false} /></div>
            <div className="hero-stat-lbl">
              <IconCalendar width={13} height={13} />
              Tahun Berdiri
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
