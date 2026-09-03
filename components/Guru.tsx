"use client";

import { useEffect, useState } from "react";
import { IconUsers } from "./icons";

interface GuruItem {
  id: number;
  nama: string;
  mapel: string;
  foto?: string;
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
      <div className="section-header centered fade-in">
        <h2 className="section-title" style={{ color: "var(--primary)", textTransform: "uppercase", fontSize: "2rem" }}>Tenaga Pendidik</h2>
        <p className="section-subtitle" style={{ maxWidth: "800px", margin: "0 auto", color: "var(--text)" }}>
          Didukung oleh dewan guru yang profesional, berdedikasi tinggi, dan kompeten di bidangnya.
        </p>
      </div>

      <div className="guru-grid">
        {guruList.map((guru) => (
          <div key={guru.id} className="guru-card fade-in-up" style={{ textAlign: "center" }}>
            {guru.foto ? (
              <div style={{ width: 80, height: 80, margin: "0 auto 16px", borderRadius: "50%", overflow: "hidden", border: "3px solid var(--accent)", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
                <img
                  src={guru.foto}
                  alt={guru.nama}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            ) : (
              <div className="guru-icon" style={{ margin: "0 auto 16px" }}>
                <IconUsers width={24} height={24} />
              </div>
            )}
            <h3 className="guru-name">{guru.nama}</h3>
            {guru.jabatan && (
              <div style={{ fontSize: "0.8rem", color: "var(--primary)", fontWeight: 600, marginBottom: 4 }}>
                {guru.jabatan}
              </div>
            )}
            <p className="guru-subject">{guru.mapel}</p>
            {guru.pendidikan && (
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>
                {guru.pendidikan}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
