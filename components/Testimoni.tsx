"use client";

import { useEffect, useState } from "react";
import { IconQuote } from "./icons";

interface TestimoniItem {
  id: number;
  name: string;
  title: string;
  quote: string;
  image: string;
}

export default function Testimoni() {
  const [testimonis, setTestimonis] = useState<TestimoniItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/testimoni", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setTestimonis(data.slice(0, 6));
      })
      .catch((err) => console.error("Error fetching testimoni for public:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading || testimonis.length === 0) return null;

  return (
    <section id="testimoni" className="section-container" style={{ padding: "80px 24px", backgroundColor: "#f9fafb" }}>
      <div className="section-header centered fade-in" style={{ marginBottom: "48px" }}>
        <div className="section-badge" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
          <IconQuote width={14} height={14} />
          Testimoni
        </div>
        <h2 className="section-title" style={{ color: "var(--primary)", textTransform: "uppercase", fontSize: "2rem", marginBottom: 12 }}>
          Kata Mereka
        </h2>
        <p className="section-subtitle" style={{ maxWidth: "700px", margin: "0 auto", color: "var(--text-muted)", fontSize: "0.95rem" }}>
          Apa kata siswa, alumni, dan orang tua tentang pengalaman belajar di SMP Plus Babussalam?
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 360px))",
          justifyContent: "center",
          gap: "28px",
        }}
        className="fade-in-up"
      >
        {testimonis.map((item) => (
          <div
            key={item.id}
            style={{
              backgroundColor: "var(--card-bg, #ffffff)",
              borderRadius: "16px",
              padding: "32px 28px",
              border: "1px solid var(--border, rgba(0, 0, 0, 0.08))",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 12px 28px rgba(22, 163, 74, 0.12)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.04)";
            }}
          >
            <div>
              {/* Quote Icon */}
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(22, 163, 74, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px",
                }}
              >
                <IconQuote width={22} height={22} color="var(--primary)" />
              </div>

              {/* Quote text */}
              <p
                style={{
                  fontSize: "0.98rem",
                  color: "var(--text)",
                  lineHeight: 1.7,
                  fontStyle: "italic",
                  marginBottom: "24px",
                  margin: "0 0 24px 0",
                }}
              >
                &quot;{item.quote}&quot;
              </p>
            </div>

            {/* Author Info */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                borderTop: "1px solid var(--border, rgba(0, 0, 0, 0.06))",
                paddingTop: "18px",
              }}
            >
              {/* Avatar fixed circular size (52x52px) */}
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  minWidth: "52px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "2px solid var(--primary)",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                  backgroundColor: "#f3f4f6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                ) : (
                  <span style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--primary)" }}>
                    {item.name ? item.name.charAt(0).toUpperCase() : "U"}
                  </span>
                )}
              </div>

              <div style={{ overflow: "hidden" }}>
                <h4
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    color: "var(--text)",
                    margin: 0,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.name}
                </h4>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text-muted)",
                    margin: "2px 0 0",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
