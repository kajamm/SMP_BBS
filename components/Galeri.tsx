"use client";

import { useEffect, useMemo, useState } from "react";
import { sekolah } from "@/data/sekolah";
import { galeriItems, galeriFilters } from "@/data/galeri";
import { IconCamera, IconExpand } from "./icons";
import Lightbox from "./Lightbox";

export default function Galeri() {
  const [filter, setFilter] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = useMemo(
    () => (filter === "all" ? galeriItems : galeriItems.filter((i) => i.category === filter)),
    [filter]
  );

  useEffect(() => {
    setLightboxIndex(null);
  }, [filter]);

  return (
    <section id="galeri" aria-label="Galeri Foto">
      <div className="section-container">
        <div className="section-header centered fade-in">
          <div className="section-badge">
            <IconCamera />
            Galeri
          </div>
          <h2 className="section-title">Galeri Foto Sekolah</h2>
          <p className="section-subtitle">
            Momen berharga dan kegiatan seru di {sekolah.namaSingkat} yang diabadikan untuk
            kenangan.
          </p>
        </div>

        <div className="galeri-filter" role="group" aria-label="Filter galeri">
          {galeriFilters.map((f) => (
            <button
              key={f.key}
              className={`filter-btn ${filter === f.key ? "active" : ""}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="galeri-grid">
          {filteredItems.map((item, idx) => (
            <div
              className="galeri-item"
              key={item.id}
              tabIndex={0}
              role="button"
              aria-label={`Foto ${item.overlayTitle}`}
              onClick={() => setLightboxIndex(idx)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setLightboxIndex(idx);
              }}
            >
              <div className="galeri-img-placeholder" style={{ background: item.bg }}>
                {item.icon}
                <span style={{ fontSize: "0.8125rem", color: item.color, fontWeight: 600 }}>
                  {item.label}
                </span>
              </div>
              <div className="galeri-overlay">
                <div className="galeri-overlay-content">
                  <span className="galeri-overlay-title">{item.overlayTitle}</span>
                  <IconExpand />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          items={filteredItems}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  );
}
