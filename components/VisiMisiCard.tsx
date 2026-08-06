"use client";

import Image from "next/image";

const visiMisiData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600&auto=format&fit=crop",
    text: "Menyelenggarakan pendidikan sekolah Berbahasa Arab dan berbasis Saintek dalam menunjang implementasi Budaya Berakhlak Berprestasi",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop",
    text: "Melaksanakan pendidikan Islam berbasis nilai Taqwa Character Building (TCB) dalam rangka mencetak santri yang berakhlakul karimah",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=600&auto=format&fit=crop",
    text: "Mengoptimalkan profesionalisme pendidik dan tenaga kependidikan dalam mendukung mutu pendidikan di lingkungan pesantren",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600&auto=format&fit=crop",
    text: "Melakukan pemberdayaan stakeholder pesantren dalam menunjang proses pendidikan",
  }
];

export default function VisiMisiCard() {
  return (
    <section id="visi-misi-card" className="section-container" style={{ padding: "80px 24px", background: "var(--bg-alt)", borderRadius: "var(--radius-lg)" }}>
      
      {/* Visi */}
      <div className="section-header centered fade-in" style={{ marginBottom: "60px" }}>
        <h2 className="section-title" style={{ color: "var(--primary)", fontSize: "2rem" }}>Visi</h2>
        <p className="section-subtitle" style={{ maxWidth: "1000px", margin: "0 auto", color: "var(--text)", fontWeight: 500 }}>
          Menjadi Pesantren terbaik di Indonesia untuk menghasilkan cendekia muda unggul yang berakhlak berprestasi berlandaskan Al-Qur&apos;an dan Sunnah serta berkompetensi di bidang Sains dan Teknologi
        </p>
      </div>

      {/* Misi */}
      <div className="section-header centered fade-in" style={{ marginBottom: "40px" }}>
        <h2 className="section-title" style={{ color: "var(--primary)", fontSize: "2rem" }}>Misi</h2>
      </div>

      <div className="visi-misi-grid">
        {visiMisiData.map((item) => (
          <div key={item.id} className="visi-misi-card fade-in-up">
            <div className="visi-misi-image-wrapper">
              <Image src={item.image} alt="Misi" fill className="visi-misi-image" />
            </div>
            <div className="visi-misi-content">
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
