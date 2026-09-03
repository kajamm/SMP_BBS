"use client";

import { useEffect, useState } from "react";
import { IconClock } from "./icons";

interface SejarahItem { id: number; tahun: string; judul: string; deskripsi: string; urutan: number; }

export default function Sejarah() {
  const [items, setItems] = useState<SejarahItem[]>([]);

  useEffect(() => {
    fetch("/api/sejarah", { cache: "no-store" })
      .then(res => res.json())
      .then(d => {
        if (Array.isArray(d)) setItems(d);
      })
      .catch(console.error);
  }, []);

  if (items.length === 0) return null;

  return (
    <section id="sejarah" aria-label="Sejarah Sekolah">
      <div className="section-container">
        <div className="section-header centered fade-in">
          <div className="section-badge">
            <IconClock />
            Sejarah
          </div>
          <h2 className="section-title">Perjalanan Panjang Sekolah</h2>
          <p className="section-subtitle">
            Lebih dari tiga dekade berdiri, SMP Plus Babussalam terus bertumbuh dan
            berkontribusi bagi dunia pendidikan.
          </p>
        </div>

        <div className="sejarah-steps" role="list">
          {items.map((item, i) => (
            <div className="sejarah-step fade-in" key={item.id} role="listitem"
              style={{ transitionDelay: `${i * 0.15}s` }}>
              <div className="sejarah-step-num">{String(i + 1).padStart(2, "0")}</div>
              <div className="sejarah-step-body">
                <div className="sejarah-step-year">{item.tahun}</div>
                <h3 className="sejarah-step-title">{item.judul}</h3>
                <p className="sejarah-step-desc">{item.deskripsi}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
