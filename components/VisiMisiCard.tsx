"use client";

import { useEffect, useState } from "react";

export default function VisiMisiCard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/visi-misi", { cache: "no-store" })
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch(console.error);
  }, []);

  if (!data) return null;

  return (
    <section
      id="visi-misi-card"
      className="section-container"
      style={{
        padding: "80px 24px",
        background: "var(--bg-alt)",
        borderRadius: "var(--radius-lg, 24px)",
      }}
    >
      {/* Visi */}
      <div className="section-header centered fade-in" style={{ marginBottom: "56px" }}>
        <div className="section-badge" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
          Prinsip &amp; Landasan
        </div>
        <h2 className="section-title" style={{ color: "var(--primary)", fontSize: "2rem", marginBottom: 16 }}>
          Visi Sekolah
        </h2>
        <p
          className="section-subtitle"
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            color: "var(--text)",
            fontWeight: 500,
            fontSize: "1.15rem",
            lineHeight: 1.7,
            fontStyle: "italic",
          }}
        >
          &quot;{data.visi}&quot;
        </p>

        {/* Pilar Utama */}
        {data.pilar_utama && data.pilar_utama.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              justifyContent: "center",
              marginTop: "24px",
            }}
          >
            {data.pilar_utama.map((pilar: string, i: number) => (
              <span
                key={i}
                style={{
                  backgroundColor: "rgba(22, 163, 74, 0.12)",
                  color: "var(--primary)",
                  padding: "6px 16px",
                  borderRadius: "99px",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  border: "1px solid rgba(22, 163, 74, 0.2)",
                }}
              >
                ★ {pilar}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Misi */}
      <div className="section-header centered fade-in" style={{ marginBottom: "36px" }}>
        <h2 className="section-title" style={{ color: "var(--primary)", fontSize: "2rem", marginBottom: 8 }}>
          Misi Sekolah
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
          Langkah nyata dalam mewujudkan cita-cita dan visi pendidikan.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "24px",
          maxWidth: "1150px",
          margin: "0 auto",
        }}
        className="fade-in-up"
      >
        {data.misi?.map((item: string, idx: number) => (
          <div
            key={idx}
            style={{
              backgroundColor: "var(--card-bg, #ffffff)",
              borderRadius: "16px",
              padding: "28px 24px",
              border: "1px solid var(--border, rgba(0,0,0,0.08))",
              boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
              display: "flex",
              flexDirection: "column",
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
            {/* Number badge */}
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                backgroundColor: "rgba(22, 163, 74, 0.12)",
                color: "var(--primary)",
                fontWeight: 800,
                fontSize: "1.1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
              }}
            >
              {String(idx + 1).padStart(2, "0")}
            </div>

            <p
              style={{
                color: "var(--text)",
                fontSize: "0.98rem",
                lineHeight: 1.65,
                fontWeight: 500,
                margin: 0,
              }}
            >
              {item}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
