"use client";

import { useEffect, useState } from "react";
import { IconCamera, IconExpand } from "./icons";

interface GalleryPhoto {
  id: number;
  image: string;
  caption: string;
}

export default function Galeri() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/galeri", { cache: "no-store" })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setPhotos(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading || photos.length === 0) return null;

  return (
    <section id="galeri" className="section-container" style={{ padding: "80px 24px", backgroundColor: "#f9fafb" }}>
      <div className="section-header centered fade-in">
        <h2 className="section-title" style={{ color: "var(--primary)", textTransform: "uppercase", fontSize: "2rem" }}>Galeri Kegiatan</h2>
        <p className="section-subtitle" style={{ maxWidth: "800px", margin: "0 auto", color: "var(--text)" }}>
          Momen-momen berharga dan kegiatan inspiratif yang mewarnai keseharian di lingkungan SMP Plus Babussalam.
        </p>
      </div>

      <div className="galeri-grid">
        {photos.map((photo) => (
          <div key={photo.id} className="galeri-item fade-in-up">
            <div style={{ position: "relative", width: "100%", height: "100%", minHeight: "250px" }}>
              <img
                src={photo.image || "https://placehold.co/400x300"}
                alt={photo.caption || "Galeri"}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
            <div className="galeri-overlay">
              <div className="galeri-overlay-content">
                <span className="galeri-overlay-title">{photo.caption || "Kegiatan Sekolah"}</span>
                <IconExpand />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
