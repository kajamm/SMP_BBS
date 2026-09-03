"use client";

import { useEffect, useState } from "react";
import { IconUsers } from "./icons";

interface GuruItem {
  id: number;
  nama: string;
  mapel: string;
  jabatan?: string;
  pendidikan?: string;
}

export default function Guru() {
  const [guruList, setGuruList] = useState<GuruItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/guru", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setGuruList(data);
      })
      .catch((err) => console.error("Error fetching guru:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading || guruList.length === 0) return null;

  return (
    <section id="guru" className="section-container" style={{ padding: "80px 24px" }}>
      <div className="section-header centered fade-in" style={{ marginBottom: "48px" }}>
        <div className="section-badge" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
          <IconUsers width={14} height={14} />
          Dewan Guru
        </div>
        <h2 className="section-title" style={{ color: "var(--primary)", textTransform: "uppercase", fontSize: "2rem", marginBottom: 12 }}>
          Tenaga Pendidik
        </h2>
        <p className="section-subtitle" style={{ maxWidth: "800px", margin: "0 auto", color: "var(--text-muted)", fontSize: "0.95rem" }}>
          Didukung oleh dewan guru yang profesional, berdedikasi tinggi, dan kompeten di bidangnya.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "24px",
        }}
        className="fade-in-up"
      >
        {guruList.map((guru) => (
          <div
            key={guru.id}
            style={{
              backgroundColor: "var(--card-bg, #ffffff)",
              borderRadius: "16px",
              padding: "28px 20px",
              border: "1px solid var(--border, rgba(0,0,0,0.08))",
              boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
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
            {/* Avatar Icon */}
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                backgroundColor: "rgba(22, 163, 74, 0.1)",
                color: "var(--primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
              }}
            >
              <IconUsers width={26} height={26} />
            </div>

            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>
              {guru.nama}
            </h3>

            {guru.jabatan && (
              <span
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "var(--primary)",
                  backgroundColor: "rgba(22, 163, 74, 0.1)",
                  padding: "4px 12px",
                  borderRadius: "99px",
                  marginBottom: 8,
                }}
              >
                {guru.jabatan}
              </span>
            )}

            <p style={{ fontSize: "0.92rem", fontWeight: 500, color: "var(--text-muted)", margin: 0 }}>
              {guru.mapel}
            </p>

            {guru.pendidikan && (
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 6 }}>
                {guru.pendidikan}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
