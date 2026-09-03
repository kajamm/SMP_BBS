"use client";

import { useEffect, useState } from "react";

interface EkskulItem {
  id?: number;
  nama: string;
  kategori: string;
  deskripsi: string;
  foto?: string;
}

const defaultEkskuls: EkskulItem[] = [
  { nama: "Pramuka", kategori: "Wajib", deskripsi: "Membentuk karakter disiplin, mandiri, dan gotong royong." },
  { nama: "Pencak Silat", kategori: "Olahraga", deskripsi: "Membina ketangkasan fisik dan pelestarian budaya bangsa." },
  { nama: "Futsal", kategori: "Olahraga", deskripsi: "Wadah penyaluran bakat olahraga sepak bola dalam ruangan." },
  { nama: "Tahfidz Quran", kategori: "Keagamaan", deskripsi: "Bimbingan hafalan Al-Quran dengan target capaian khusus." },
  { nama: "English Club", kategori: "Akademik", deskripsi: "Melatih kemampuan berbahasa Inggris aktif dan pasif." },
  { nama: "Karya Ilmiah Remaja (KIR)", kategori: "Akademik", deskripsi: "Mengembangkan nalar kritis dan budaya meneliti bagi siswa." },
];

export default function EkstrakurikulerPage() {
  const [items, setItems] = useState<EkskulItem[]>(defaultEkskuls);

  useEffect(() => {
    fetch("/api/ekskul", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setItems(data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <main className="pt-24 pb-16">
      <section id="ekskul" aria-label="Program Ekstrakurikuler">
        <div className="section-container">
          <div className="section-header centered fade-in">
            <h2 className="section-title">Program Ekstrakurikuler &amp; Klub</h2>
            <p className="section-subtitle">
              Mengembangkan minat, bakat, dan kreativitas siswa di luar jam pelajaran akademik.
            </p>
          </div>
          
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "24px", 
            marginTop: "32px", 
          }} className="fade-in"
          >
            {items.map((ekskul, i) => (
              <div key={ekskul.id || i} className="glass" style={{ display: "flex", flexDirection: "column", borderRadius: "16px", overflow: "hidden", border: "1px solid var(--border)", transition: "transform 0.3s ease, box-shadow 0.3s ease" }}>
                {/* Image or Icon Banner */}
                {ekskul.foto ? (
                  <div style={{ width: "100%", height: "180px", overflow: "hidden" }}>
                    <img src={ekskul.foto} alt={ekskul.nama} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                ) : (
                  <div style={{ width: "100%", height: "140px", backgroundColor: "rgba(22, 163, 74, 0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                  </div>
                )}
                
                <div style={{ padding: "20px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px", gap: "8px" }}>
                    <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text)", margin: 0 }}>{ekskul.nama}</h3>
                    <span style={{ fontSize: "0.75rem", padding: "4px 10px", borderRadius: "99px", background: "var(--primary)", color: "white", fontWeight: 600, flexShrink: 0 }}>{ekskul.kategori}</span>
                  </div>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.6, margin: 0 }}>{ekskul.deskripsi}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
