"use client";

import Image from "next/image";

const testimoniData = [
  {
    id: 1,
    name: "Faza Azizan Attuhrisa",
    title: "Peraih Juara 2 Walisongo Chemistry Olympiad",
    quote: "Suasana belajar yang nyaman membuat semangat",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Setya Tegar",
    title: "Peraih Juara 3 Student Athletics Championships",
    quote: "Belajar dibimbing dengan profesional",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    id: 3,
    name: "Satria Kamil Sya&apos;bani",
    title: "Peraih Medali Silver Thailand International Mathematical Olympiad",
    quote: "Belajar disini sangat menyenangkan",
    image: "https://randomuser.me/api/portraits/men/62.jpg",
  },
];

export default function Testimoni() {
  return (
    <section id="testimoni" className="section-container" style={{ padding: "80px 24px" }}>
      <div className="section-header centered fade-in">
        <h2 className="section-title" style={{ color: "var(--primary)", fontSize: "2.5rem" }}>Testimoni</h2>
        <p className="section-subtitle" style={{ maxWidth: "800px", margin: "0 auto", color: "var(--text)" }}>
          &quot;Apa kata mereka, tentang kami. Terima kasih atas penghargaan nya kepada kami&quot;
        </p>
      </div>

      <div className="testimoni-grid">
        {testimoniData.map((testimoni) => (
          <div key={testimoni.id} className="testimoni-card fade-in-up">
            <div className="testimoni-image-wrapper">
              <Image src={testimoni.image} alt={testimoni.name} width={120} height={120} className="testimoni-image" />
            </div>
            <div className="testimoni-content">
              <h4 className="testimoni-name">{testimoni.name}</h4>
              <p className="testimoni-title">{testimoni.title}</p>
              <div className="testimoni-divider"></div>
              <p className="testimoni-quote">{testimoni.quote}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
