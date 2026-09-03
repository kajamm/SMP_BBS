"use client";

import { useEffect, useState } from "react";
import { IconUsers } from "@/components/icons";

interface OfficialItem {
  id: number;
  nama: string;
  jabatan: string;
  kategori: string;
  urutan: number;
}

interface StrukturData {
  bagan?: {
    bagan_url?: string;
    keterangan?: string;
  };
  pengurus?: OfficialItem[];
}

export default function StrukturPage() {
  const [data, setData] = useState<StrukturData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    fetch("/api/struktur", { cache: "no-store" })
      .then((res) => res.json())
      .then((d) => {
        if (d && !d.error) setData(d);
      })
      .catch((err) => console.error("Error fetching struktur:", err))
      .finally(() => setLoading(false));
  }, []);

  const baganUrl = data?.bagan?.bagan_url;
  const baganKet = data?.bagan?.keterangan;
  const pengurusList = data?.pengurus || [];

  return (
    <main className="pt-24 pb-16">
      <section id="struktur" aria-label="Struktur Organisasi">
        <div className="section-container" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
          {/* Header */}
          <div className="section-header centered fade-in" style={{ marginBottom: "48px" }}>
            <div className="section-badge" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
              <IconUsers width={14} height={14} />
              Struktur Organisasi
            </div>
            <h1 className="section-title" style={{ color: "var(--primary)", fontSize: "2.2rem", marginBottom: 12 }}>
              Struktur Kepegawaian &amp; Manajemen
            </h1>
            <p className="section-subtitle" style={{ maxWidth: "750px", margin: "0 auto", color: "var(--text-muted)", fontSize: "1rem" }}>
              Bagan hierarki kepemimpinan dan tata kelola organisasi di lingkungan SMP Plus Babussalam.
            </p>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-muted)" }}>
              Memuat data struktur organisasi...
            </div>
          ) : (
            <>
              {/* BAGAN STRUKTUR ORGANISASI (JIKA ADA) */}
              {baganUrl && (
                <div
                  className="fade-in-up"
                  style={{
                    backgroundColor: "var(--card-bg, #ffffff)",
                    borderRadius: "20px",
                    padding: "24px",
                    border: "1px solid var(--border, rgba(0,0,0,0.08))",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                    marginBottom: "56px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      borderRadius: "12px",
                      overflow: "hidden",
                      cursor: "pointer",
                      backgroundColor: "#f8fafc",
                    }}
                    onClick={() => setLightboxOpen(true)}
                    title="Klik untuk memperbesar bagan"
                  >
                    <img
                      src={baganUrl}
                      alt="Bagan Struktur Organisasi"
                      style={{
                        width: "100%",
                        maxHeight: "650px",
                        objectFit: "contain",
                        display: "block",
                        margin: "0 auto",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: 16,
                        right: 16,
                        backgroundColor: "rgba(0,0,0,0.75)",
                        color: "#ffffff",
                        padding: "6px 14px",
                        borderRadius: "8px",
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      🔍 Klik untuk memperbesar
                    </div>
                  </div>

                  {baganKet && (
                    <p style={{ marginTop: "16px", color: "var(--text-muted)", fontSize: "0.92rem", fontStyle: "italic", margin: "16px 0 0" }}>
                      {baganKet}
                    </p>
                  )}
                </div>
              )}

              {/* DAFTAR PEJABAT STRUKTURAL (JIKA ADA) */}
              {pengurusList.length > 0 && (
                <div className="fade-in-up">
                  <div style={{ textAlign: "center", marginBottom: "32px" }}>
                    <h2 style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>
                      Jajaran Pimpinan &amp; Pejabat Sekolah
                    </h2>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                      Amanah kepemimpinan dalam mengawal mutu dan visi pendidikan.
                    </p>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                      gap: "24px",
                    }}
                  >
                    {pengurusList.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          backgroundColor: "var(--card-bg, #ffffff)",
                          borderRadius: "16px",
                          padding: "24px",
                          border: "1px solid var(--border, rgba(0,0,0,0.08))",
                          boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = "translateY(-4px)";
                          e.currentTarget.style.boxShadow = "0 10px 24px rgba(22, 163, 74, 0.12)";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.04)";
                        }}
                      >
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                            <span
                              style={{
                                fontSize: "0.75rem",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                padding: "4px 10px",
                                borderRadius: "99px",
                                backgroundColor:
                                  item.kategori === "Pimpinan Utama"
                                    ? "rgba(234, 179, 8, 0.15)"
                                    : "rgba(22, 163, 74, 0.1)",
                                color:
                                  item.kategori === "Pimpinan Utama"
                                    ? "#a16207"
                                    : "#15803d",
                              }}
                            >
                              {item.kategori}
                            </span>
                          </div>

                          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>
                            {item.nama}
                          </h3>

                          <p style={{ fontSize: "0.92rem", color: "var(--primary)", fontWeight: 600, margin: 0 }}>
                            {item.jabatan}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* KONDISI JIKA BELUM ADA DATA SAMA SEKALI */}
              {!baganUrl && pengurusList.length === 0 && (
                <div
                  style={{
                    backgroundColor: "var(--card-bg, #ffffff)",
                    borderRadius: "16px",
                    padding: "48px 24px",
                    textAlign: "center",
                    border: "1px dashed var(--border, #d1d5db)",
                  }}
                >
                  <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🏛️</div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text)", marginBottom: "8px" }}>
                    Bagan Struktur Organisasi
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", maxWidth: "500px", margin: "0 auto" }}>
                    Informasi bagan struktur organisasi dan kepegawaian sedang dalam proses pembaruan.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Lightbox Preview Modal untuk Gambar Bagan */}
      {lightboxOpen && baganUrl && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            backdropFilter: "blur(6px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              maxWidth: "95vw",
              maxHeight: "92vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              style={{
                position: "absolute",
                top: -40,
                right: 0,
                background: "#ffffff",
                color: "#000000",
                border: "none",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                fontSize: "1.2rem",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ×
            </button>
            <img
              src={baganUrl}
              alt="Bagan Struktur Organisasi Fullscreen"
              style={{
                maxWidth: "100%",
                maxHeight: "88vh",
                borderRadius: "12px",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
                backgroundColor: "#ffffff",
              }}
            />
          </div>
        </div>
      )}
    </main>
  );
}
