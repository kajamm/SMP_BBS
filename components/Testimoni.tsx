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
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setTestimonis(data.slice(0, 6));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading || testimonis.length === 0) return null;

  return (
    <section id="testimoni" className="section-container" style={{ padding: "80px 24px", backgroundColor: "#f9fafb" }}>
      <div className="section-header centered fade-in">
        <h2 className="section-title" style={{ color: "var(--primary)", textTransform: "uppercase", fontSize: "2rem" }}>Kata Mereka</h2>
        <p className="section-subtitle" style={{ maxWidth: "800px", margin: "0 auto", color: "var(--text)" }}>
          Apa kata siswa dan alumni tentang pengalaman belajar di SMP Plus Babussalam?
        </p>
      </div>

      <div className="testimoni-grid">
        {testimonis.map((item) => (
          <div key={item.id} className="testimoni-card fade-in-up">
            <div className="testimoni-quote-icon">
              <IconQuote width={32} height={32} color="var(--primary)" />
            </div>
            <p className="testimoni-text">&quot;{item.quote}&quot;</p>
            <div className="testimoni-author">
              <div className="testimoni-avatar" style={{ position: "relative", overflow: "hidden" }}>
                <img
                  src={item.image || "https://placehold.co/100"}
                  alt={item.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div className="testimoni-info">
                <h4 className="testimoni-name">{item.name}</h4>
                <p className="testimoni-title">{item.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
