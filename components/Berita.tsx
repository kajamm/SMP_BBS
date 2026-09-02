import Image from "next/image";
import { IconClock } from "./icons";
import db from "@/lib/db";

interface BeritaItem {
  id: number;
  title: string;
  date: string;
  image: string;
  excerpt: string;
}

export default async function Berita() {
  let beritaList: BeritaItem[] = [];
  
  try {
    const [rows] = await db.query("SELECT * FROM berita ORDER BY id DESC LIMIT 6");
    beritaList = rows as BeritaItem[];
  } catch (error) {
    console.error("Error fetching berita for public:", error);
  }

  if (beritaList.length === 0) return null;

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
              <Image src={berita.image || "https://placehold.co/400x300"} alt={berita.title} fill className="berita-image" />
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
