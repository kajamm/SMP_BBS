import Image from "next/image";
import db from "@/lib/db";
import { IconQuote } from "./icons";

interface TestimoniItem {
  id: number;
  name: string;
  title: string;
  quote: string;
  image: string;
}

export default async function Testimoni() {
  let testimonis: TestimoniItem[] = [];
  
  try {
    const [rows] = await db.query("SELECT * FROM testimoni ORDER BY id DESC LIMIT 3");
    testimonis = rows as TestimoniItem[];
  } catch (error) {
    console.error("Error fetching testimoni for public:", error);
  }

  if (testimonis.length === 0) return null;

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
              <div className="testimoni-avatar">
                <Image src={item.image || "https://placehold.co/100"} alt={item.name} fill style={{ objectFit: "cover" }} />
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
