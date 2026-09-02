import { IconUsers } from "./icons";
import db from "@/lib/db";

interface GuruItem {
  id: number;
  nama: string;
  mapel: string;
}

export default async function Guru() {
  let guruList: GuruItem[] = [];
  
  try {
    const [rows] = await db.query("SELECT * FROM guru ORDER BY id ASC");
    guruList = rows as GuruItem[];
  } catch (error) {
    console.error("Error fetching guru for public:", error);
  }

  return (
    <section id="guru" className="section-container" style={{ padding: "80px 24px" }}>
      <div className="section-header centered fade-in">
        <h2 className="section-title" style={{ color: "var(--primary)", textTransform: "uppercase", fontSize: "2rem" }}>Tenaga Pendidik</h2>
        <p className="section-subtitle" style={{ maxWidth: "800px", margin: "0 auto", color: "var(--text)" }}>
          Didukung oleh dewan guru yang profesional, berdedikasi tinggi, dan kompeten di bidangnya.
        </p>
      </div>

      <div className="guru-grid">
        {guruList.map((guru) => (
          <div key={guru.id} className="guru-card fade-in-up">
            <div className="guru-icon">
              <IconUsers width={24} height={24} />
            </div>
            <h3 className="guru-name">{guru.nama}</h3>
            <p className="guru-subject">{guru.mapel}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
