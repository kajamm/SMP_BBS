"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const fallbackImages = [
  "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600&auto=format&fit=crop",
];

export default function VisiMisiCard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/visi-misi", { cache: "no-store" })
      .then(res => res.json())
      .then(d => setData(d))
      .catch(console.error);
  }, []);

  if (!data) return null;

  return (
    <section id="visi-misi-card" className="section-container" style={{ padding: "80px 24px", background: "var(--bg-alt)", borderRadius: "var(--radius-lg)" }}>
      
      {/* Visi */}
      <div className="section-header centered fade-in" style={{ marginBottom: "60px" }}>
        <h2 className="section-title" style={{ color: "var(--primary)", fontSize: "2rem" }}>Visi</h2>
        <p className="section-subtitle" style={{ maxWidth: "1000px", margin: "0 auto", color: "var(--text)", fontWeight: 500 }}>
          {data.visi}
        </p>
      </div>

      {/* Misi */}
      <div className="section-header centered fade-in" style={{ marginBottom: "40px" }}>
        <h2 className="section-title" style={{ color: "var(--primary)", fontSize: "2rem" }}>Misi</h2>
      </div>

      <div className="visi-misi-grid">
        {data.misi?.map((item: string, idx: number) => {
          const imgUrl = fallbackImages[idx % fallbackImages.length];
          return (
            <div key={idx} className="visi-misi-card fade-in-up">
              <div className="visi-misi-image-wrapper">
                <Image src={imgUrl} alt="Misi" fill className="visi-misi-image" unoptimized />
              </div>
              <div className="visi-misi-content">
                <p>{item}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
