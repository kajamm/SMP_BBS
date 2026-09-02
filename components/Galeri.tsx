import Image from "next/image";
import db from "@/lib/db";
import { IconCamera, IconExpand } from "./icons";

interface GalleryPhoto {
  id: number;
  image: string;
  caption: string;
}

export default async function Galeri() {
  let photos: GalleryPhoto[] = [];
  
  try {
    const [rows] = await db.query("SELECT * FROM galeri ORDER BY id DESC LIMIT 8");
    photos = rows as GalleryPhoto[];
  } catch (error) {
    console.error("Error fetching galeri for public:", error);
  }

  if (photos.length === 0) return null;

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
            {/* Menggunakan background image agar mengisi penuh div seperti versi sebelumnya atau gunakan Image layout fill */}
            <div style={{ position: "relative", width: "100%", height: "100%", minHeight: "250px" }}>
              <Image src={photo.image || "https://placehold.co/400x300"} alt={photo.caption || "Galeri"} fill style={{ objectFit: "cover" }} />
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
