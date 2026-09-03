"use client";

import { useEffect, useState } from "react";
import { IconAward } from "./icons";

interface PrestasiItem {
  id: number;
  nama: string;
  kategori: string;
  keterangan: string;
  tahun: string;
  foto?: string;
}

export default function Prestasi() {
  const [items, setItems] = useState<PrestasiItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/prestasi", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setItems(data);
      })
      .catch((err) => console.error("Error fetching prestasi:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading || items.length === 0) return null;

  return (
    <section id="prestasi" className="section-container" style={{ padding: "80px 24px" }}>
      <div className="section-header centered fade-in">
        <div className="section-badge">
          <IconAward />
          Prestasi
        </div>
        <h2 className="section-title">Prestasi Siswa &amp; Sekolah</h2>
        <p className="section-subtitle">
          Berbagai capaian membanggakan yang diraih oleh siswa-siswi dan keluarga besar SMP Plus Babussalam.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "24px",
          marginTop: "32px",
        }}
        className="fade-in"
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="glass"
            style={{
              display: "flex",
              flexDirection: "column",
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid var(--border)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            {item.foto ? (
              <div style={{ width: "100%", height: "180px", overflow: "hidden" }}>
                <img
                  src={item.foto}
                  alt={item.nama}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "120px",
                  background: "rgba(22, 163, 74, 0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconAward width={40} height={40} color="var(--primary)" />
              </div>
            )}

            <div style={{ padding: "20px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    padding: "3px 8px",
                    borderRadius: "6px",
                    background: item.kategori === "siswa" ? "rgba(59, 130, 246, 0.1)" : "rgba(22, 163, 74, 0.1)",
                    color: item.kategori === "siswa" ? "#2563eb" : "#16a34a",
                  }}
                >
                  {item.kategori === "siswa" ? "Prestasi Siswa" : "Prestasi Sekolah"}
                </span>
                {item.tahun && (
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>
                    {item.tahun}
                  </span>
                )}
              </div>

              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text)", marginBottom: "8px" }}>
                {item.nama}
              </h3>

              {item.keterangan && (
                <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.5, margin: 0 }}>
                  {item.keterangan}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
