"use client";

import Image from "next/image";
import { IconClock } from "./icons";

const beritaList = [
  {
    id: 1,
    title: "Hydroponic Fun Learning with Pesantren Saintek Babussalam",
    date: "28/11/2025",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=600&auto=format&fit=crop",
    excerpt: "Serunya belajar sambil praktik! Melalui kegiatan Hydroponic Fun Learning, siswa...",
  },
  {
    id: 2,
    title: "MAHAKAM 2025 DARUL HIKAM",
    date: "23/11/2025",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=600&auto=format&fit=crop",
    excerpt: "Mahakam 2025 telah dilalui dengan penuh semangat oleh lebih dari...",
  },
  {
    id: 3,
    title: "KEMENKEU MENGAJAR di Pesantren Saintek Babussalam",
    date: "10/11/2025",
    image: "https://images.unsplash.com/photo-1523580846011-d3a5ce258281?q=80&w=600&auto=format&fit=crop",
    excerpt: "Guest Teacher: Kemenkeu Mengajar di Pesantren Saintek Babussalam...",
  },
];

export default function Berita() {
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
              <Image src={berita.image} alt={berita.title} fill className="berita-image" />
            </div>
            <div className="berita-content">
              <div className="berita-date">
                <IconClock width={14} height={14} />
                {berita.date}
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
