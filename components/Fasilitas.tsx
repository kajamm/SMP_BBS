"use client";

import { useEffect, useState } from "react";
import { IconBuilding } from "./icons";

interface FasilitasItem {
  id: number;
  nama: string;
  kategori: string;
  deskripsi: string;
  foto?: string;
}

export default function Fasilitas() {
  const [items, setItems] = useState<FasilitasItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/fasilitas", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setItems(data);
      })
      .catch((err) => console.error("Error fetching fasilitas:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading || items.length === 0) return null;

  return (
    <section id="fasilitas" className="section-container" style={{ padding: "80px 24px", background: "var(--bg-alt)" }}>
      <div className="section-header centered fade-in">
        <div className="section-badge">
          <IconBuilding />
          Fasilitas
        </div>
        <h2 className="section-title">Sarana &amp; Prasarana</h2>
        <p className="section-subtitle">
          Fasilitas pendukung pembelajaran yang lengkap dan nyaman untuk menunjang potensi siswa secara optimal.
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
                <IconBuilding width={40} height={40} stroke="var(--primary)" />
              </div>
            )}

            <div style={{ padding: "20px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
              {item.kategori && (
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    padding: "3px 8px",
                    borderRadius: "6px",
                    background: "rgba(22, 163, 74, 0.1)",
                    color: "var(--primary)",
                    alignSelf: "flex-start",
                    marginBottom: "8px",
                  }}
                >
                  {item.kategori}
                </span>
              )}

              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text)", marginBottom: "8px" }}>
                {item.nama}
              </h3>

              {item.deskripsi && (
                <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.5, margin: 0 }}>
                  {item.deskripsi}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
