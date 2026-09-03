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
      <div className="section-header centered fade-in">
        <h2 className="section-title" style={{ color: "var(--primary)", textTransform: "uppercase", fontSize: "2rem" }}>Berita Terbaru</h2>
        <p className="section-subtitle" style={{ maxWidth: "800px", margin: "0 auto", color: "var(--text)" }}>
          Menyajikan informasi terkini seputar kegiatan, prestasi, dan perkembangan SMP Plus Babussalam sebagai pusat pendidikan yang memadukan nilai keislaman, sains, dan teknologi.
        </p>
      </div>

      <div className="berita-grid">
        {beritaList.map((berita) => (
          <div key={berita.id} className="berita-card fade-in-up">
            <div className="berita-image-wrapper">
              <img
                src={berita.image || "https://placehold.co/400x300"}
                alt={berita.title}
                className="berita-image"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div className="berita-content">
              <div className="berita-date">
                <IconClock width={14} height={14} />
                {formatBeritaDate(berita.date)}
              </div>
              <h3 className="berita-title">{berita.title}</h3>
              <p className="berita-excerpt">{berita.excerpt}</p>
              <button className="btn-berita">Baca selengkapnya</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
