"use client";

import { useEffect, useRef, useState } from "react";
import { IconClock } from "./icons";
import Image from "next/image";

interface SejarahItem { id: number; tahun: string; judul: string; deskripsi: string; urutan: number; }
interface TokohItem { id: number; nama: string; jabatan: string; role: string; foto: string; deskripsi: string; }

const roleLabel: Record<string, string> = {
  pendiri: "Pendiri Pesantren",
  pimpinan: "Pimpinan Pondok",
  ketua_yayasan: "Ketua Yayasan",
};

const roleBadgeStyle: Record<string, React.CSSProperties> = {
  pendiri: { background: "rgba(234, 179, 8, 0.15)", color: "#92400e", border: "1px solid rgba(234, 179, 8, 0.3)" },
  pimpinan: { background: "rgba(22, 163, 74, 0.1)", color: "#15803d", border: "1px solid rgba(22, 163, 74, 0.25)" },
  ketua_yayasan: { background: "rgba(99, 102, 241, 0.1)", color: "#4338ca", border: "1px solid rgba(99, 102, 241, 0.25)" },
};

export default function Sejarah() {
  const [items, setItems] = useState<SejarahItem[]>([]);
  const [tokoh, setTokoh] = useState<TokohItem[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    fetch("/api/sejarah", { cache: "no-store" })
      .then(res => res.json())
      .then(d => { if (Array.isArray(d)) setItems(d); })
      .catch(console.error);

    fetch("/api/tokoh", { cache: "no-store" })
      .then(res => res.json())
      .then(d => { if (Array.isArray(d)) setTokoh(d); })
      .catch(console.error);
  }, []);

  if (items.length === 0 && tokoh.length === 0) return null;

  return (
    <section id="sejarah" aria-label="Sejarah Sekolah" ref={sectionRef}>
      <div className="section-container">
        {/* ── SECTION HEADER ── */}
        <div className="section-header centered fade-in">
          <div className="section-badge">
            <IconClock />
            Sejarah
          </div>
          {/* Judul tampil di sini hanya jika tidak ada tokoh */}
          {tokoh.length === 0 && (
            <>
              <h2 className="section-title">Perjalanan Panjang Sekolah</h2>
              <p className="section-subtitle" style={{ textAlign: "center" }}>
                Lebih dari tiga dekade berdiri, SMP Plus Babussalam terus bertumbuh dan
                berkontribusi bagi dunia pendidikan.
              </p>
            </>
          )}
        </div>

        {/* ── TOKOH PENDIRI & PIMPINAN ── */}
        {tokoh.length > 0 && (
          <div className="fade-in-up" style={{ marginBottom: "72px" }}>
            <div style={{ textAlign: "center", marginBottom: "36px" }}>
              <h3 style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                color: "var(--primary)",
                marginBottom: "8px",
                fontFamily: "var(--font-heading)",
              }}>
                Tokoh Pendiri &amp; Pimpinan
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                Sosok yang meletakkan fondasi dan mengawal perjalanan pesantren.
              </p>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "28px",
              justifyItems: "center",
            }}>
              {tokoh.map((t) => (
                <div key={t.id} className="tokoh-card fade-in-up" style={{
                  backgroundColor: "var(--card-bg, #ffffff)",
                  borderRadius: "20px",
                  padding: "28px 20px 24px",
                  border: "1px solid var(--border, rgba(0,0,0,0.07))",
                  boxShadow: "0 6px 24px rgba(0,0,0,0.06)",
                  textAlign: "center",
                  width: "100%",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                  onMouseOver={e => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow = "0 16px 40px rgba(6, 78, 59, 0.13)";
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,0.06)";
                  }}
                >
                  {/* Foto */}
                  <div style={{
                    width: "110px",
                    height: "110px",
                    borderRadius: "50%",
                    margin: "0 auto 16px",
                    overflow: "hidden",
                    border: "4px solid var(--primary)",
                    boxShadow: "0 4px 16px rgba(6, 78, 59, 0.18)",
                    backgroundColor: "#f1f5f9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    {t.foto ? (
                      <img
                        src={t.foto}
                        alt={t.nama}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <span style={{ fontSize: "2.5rem", color: "var(--primary)" }}>👤</span>
                    )}
                  </div>

                  {/* Badge Role */}
                  <span style={{
                    display: "inline-block",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    padding: "4px 12px",
                    borderRadius: "99px",
                    marginBottom: "12px",
                    ...(roleBadgeStyle[t.role] || roleBadgeStyle.pendiri),
                  }}>
                    {roleLabel[t.role] || t.role}
                  </span>

                  <h4 style={{
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    color: "var(--text)",
                    marginBottom: "4px",
                    lineHeight: 1.3,
                  }}>
                    {t.nama}
                  </h4>
                  <p style={{
                    fontSize: "0.875rem",
                    color: "var(--primary)",
                    fontWeight: 600,
                    marginBottom: t.deskripsi ? "12px" : "0",
                  }}>
                    {t.jabatan}
                  </p>
                  {t.deskripsi && (
                    <p style={{
                      fontSize: "0.82rem",
                      color: "var(--text-muted)",
                      lineHeight: 1.6,
                      margin: 0,
                    }}>
                      {t.deskripsi}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TIMELINE SEJARAH ── */}
        {items.length > 0 && (
          <>
            {/* Judul timeline muncul SESUDAH tokoh (jika ada tokoh) */}
            {tokoh.length > 0 && (
              <div className="section-header centered fade-in" style={{ marginBottom: "40px" }}>
                <h2 className="section-title">Perjalanan Panjang Sekolah</h2>
                <p className="section-subtitle" style={{ textAlign: "center" }}>
                  Lebih dari tiga dekade berdiri, SMP Plus Babussalam terus bertumbuh dan
                  berkontribusi bagi dunia pendidikan.
                </p>
              </div>
            )}
            <div className="sejarah-steps" role="list">
              {items.map((item, i) => (
                <div className="sejarah-step fade-in" key={item.id} role="listitem"
                  style={{ transitionDelay: `${i * 0.15}s` }}>
                  <div className="sejarah-step-num">{String(i + 1).padStart(2, "0")}</div>
                  <div className="sejarah-step-body">
                    <div className="sejarah-step-year">{item.tahun}</div>
                    <h3 className="sejarah-step-title">{item.judul}</h3>
                    <p className="sejarah-step-desc">{item.deskripsi}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </section>
  );
}
