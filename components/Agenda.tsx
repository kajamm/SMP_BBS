"use client";

import { useEffect, useState } from "react";
import { IconCalendar, IconMapPin } from "./icons";

interface AgendaItem {
  id: number;
  judul: string;
  deskripsi: string;
  tanggal_mulai: string;
  tanggal_selesai?: string;
  lokasi: string;
  status: "akan_datang" | "berlangsung" | "selesai";
}

function formatTanggal(tglStr?: string) {
  if (!tglStr) return "";
  const d = new Date(tglStr);
  if (isNaN(d.getTime())) return tglStr;
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

export default function Agenda() {
  const [items, setItems] = useState<AgendaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/agenda", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setItems(data);
      })
      .catch((err) => console.error("Error fetching agenda:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading || items.length === 0) return null;

  return (
    <section id="agenda" className="section-container" style={{ padding: "80px 24px" }}>
      <div className="section-header centered fade-in">
        <div className="section-badge">
          <IconCalendar />
          Agenda
        </div>
        <h2 className="section-title">Agenda &amp; Kegiatan Mendatang</h2>
        <p className="section-subtitle">
          Jadwal kegiatan akademik dan non-akademik di lingkungan SMP Plus Babussalam.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
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
              padding: "24px",
              borderRadius: "16px",
              border: "1px solid var(--border)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    padding: "4px 8px",
                    borderRadius: "6px",
                    background:
                      item.status === "berlangsung"
                        ? "rgba(22, 163, 74, 0.15)"
                        : item.status === "selesai"
                        ? "rgba(156, 163, 175, 0.2)"
                        : "rgba(59, 130, 246, 0.15)",
                    color:
                      item.status === "berlangsung"
                        ? "#15803d"
                        : item.status === "selesai"
                        ? "#6b7280"
                        : "#2563eb",
                  }}
                >
                  {item.status === "berlangsung"
                    ? "Sedang Berlangsung"
                    : item.status === "selesai"
                    ? "Selesai"
                    : "Akan Datang"}
                </span>

                <span style={{ fontSize: "0.85rem", color: "var(--primary)", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                  <IconCalendar width={14} height={14} />
                  {formatTanggal(item.tanggal_mulai)}
                </span>
              </div>

              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text)", marginBottom: "8px" }}>
                {item.judul}
              </h3>

              {item.lokasi && (
                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 4, marginBottom: "10px" }}>
                  <IconMapPin width={14} height={14} />
                  {item.lokasi}
                </div>
              )}

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
