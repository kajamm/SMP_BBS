"use client";

import { useEffect, useState } from "react";
import { IconClock } from "./icons";

interface BeritaItem {
  id: number;
  title: string;
  date: string;
  image: string;
  excerpt: string;
}

function formatBeritaDate(dStr: string) {
  if (!dStr) return "";
  if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dStr)) {
    const [d, m, y] = dStr.split("/");
    const parsed = new Date(Number(y), Number(m) - 1, Number(d));
    if (!isNaN(parsed.getTime())) {
      return parsed.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    }
    return dStr;
  }
  const parsed = new Date(dStr);
  if (!isNaN(parsed.getTime())) {
    return parsed.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  }
  return dStr;
}

export default function Berita() {
  const [beritaList, setBeritaList] = useState<BeritaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBerita, setSelectedBerita] = useState<BeritaItem | null>(null);

  useEffect(() => {
    fetch("/api/berita", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBeritaList(data.slice(0, 6));
        }
      })
      .catch((err) => console.error("Error fetching berita for public:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading || beritaList.length === 0) return null;

  return (
    <section id="berita" className="section-container" style={{ padding: "80px 24px" }}>
      <div className="section-header centered fade-in" style={{ marginBottom: "48px" }}>
        <div className="section-badge" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
          <IconClock width={14} height={14} />
          Kabar Terkini
        </div>
        <h2 className="section-title" style={{ color: "var(--primary)", textTransform: "uppercase", fontSize: "2rem", marginBottom: 12 }}>
          Berita Terbaru
        </h2>
        <p className="section-subtitle" style={{ maxWidth: "700px", margin: "0 auto", color: "var(--text-muted)", fontSize: "0.95rem" }}>
          Informasi seputar kegiatan, prestasi, dan perkembangan SMP Plus Babussalam.
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
        {beritaList.map((berita) => (
          <div
            key={berita.id}
            style={{
              backgroundColor: "var(--card-bg, #ffffff)",
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid var(--border, rgba(0,0,0,0.08))",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 12px 28px rgba(22, 163, 74, 0.15)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.05)";
            }}
          >
            {/* Image Wrapper dengan tinggi proporsional dan fixed 200px */}
            <div
              style={{
                width: "100%",
                height: "200px",
                position: "relative",
                overflow: "hidden",
                backgroundColor: "#f8fafc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={berita.image || "https://placehold.co/600x400?text=SMP+Plus+Babussalam"}
                alt={berita.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.4s ease",
                }}
              />
            </div>

            {/* Content */}
            <div style={{ padding: "20px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  color: "var(--primary)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  marginBottom: 10,
                }}
              >
                <IconClock width={13} height={13} />
                <span>{formatBeritaDate(berita.date)}</span>
              </div>

              <h3
                style={{
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  color: "var(--text)",
                  lineHeight: 1.4,
                  marginBottom: 10,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {berita.title}
              </h3>

              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.88rem",
                  lineHeight: 1.6,
                  marginBottom: 20,
                  flexGrow: 1,
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {berita.excerpt}
              </p>

              <button
                type="button"
                onClick={() => setSelectedBerita(berita)}
                style={{
                  alignSelf: "flex-start",
                  background: "var(--primary)",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background 0.2s, transform 0.1s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.filter = "brightness(1.1)")}
                onMouseOut={(e) => (e.currentTarget.style.filter = "none")}
              >
                Baca selengkapnya
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Detail Berita saat Baca Selengkapnya diklik */}
      {selectedBerita && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedBerita(null)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.65)",
            backdropFilter: "blur(4px)",
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
              backgroundColor: "var(--card-bg, #ffffff)",
              borderRadius: "20px",
              maxWidth: "600px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              border: "1px solid var(--border)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {selectedBerita.image && (
              <div style={{ width: "100%", height: "260px", overflow: "hidden", position: "relative", backgroundColor: "#f1f5f9" }}>
                <img
                  src={selectedBerita.image}
                  alt={selectedBerita.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            )}

            <div style={{ padding: "28px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  color: "var(--primary)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  marginBottom: 12,
                }}
              >
                <IconClock width={14} height={14} />
                <span>{formatBeritaDate(selectedBerita.date)}</span>
              </div>

              <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--text)", lineHeight: 1.35, marginBottom: 16 }}>
                {selectedBerita.title}
              </h2>

              <div style={{ color: "var(--text)", fontSize: "0.95rem", lineHeight: 1.7, whiteSpace: "pre-wrap", marginBottom: 28 }}>
                {selectedBerita.excerpt}
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => setSelectedBerita(null)}
                  style={{
                    padding: "10px 22px",
                    background: "var(--primary)",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "10px",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
