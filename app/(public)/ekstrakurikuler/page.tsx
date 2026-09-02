import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Program Ekstrakurikuler/Klub | SMP Plus Babussalam",
  description: "Informasi mengenai program ekstrakurikuler dan klub yang ada di SMP Plus Babussalam.",
};

export default function EkstrakurikulerPage() {
  return (
    <main className="pt-24 pb-16">
      <section id="ekskul" aria-label="Program Ekstrakurikuler">
        <div className="section-container">
          <div className="section-header centered fade-in">
            <h2 className="section-title">Program Ekstrakurikuler & Klub</h2>
            <p className="section-subtitle">
              Mengembangkan minat, bakat, dan kreativitas siswa di luar jam pelajaran akademik.
            </p>
          </div>
          
          <div style={{ 
            display: "flex", 
            gap: "32px", 
            marginTop: "32px", 
            overflowX: "auto", 
            paddingBottom: "32px", 
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            msOverflowStyle: "none"
          }} className="fade-in hide-scrollbar"
          >
            <style>{`
              .hide-scrollbar::-webkit-scrollbar { display: none; }
            `}</style>
            {[
              { nama: "Pramuka", kategori: "Wajib", deskripsi: "Membentuk karakter disiplin, mandiri, dan gotong royong." },
              { nama: "Pencak Silat", kategori: "Olahraga", deskripsi: "Membina ketangkasan fisik dan pelestarian budaya bangsa." },
              { nama: "Futsal", kategori: "Olahraga", deskripsi: "Wadah penyaluran bakat olahraga sepak bola dalam ruangan." },
              { nama: "Tahfidz Quran", kategori: "Keagamaan", deskripsi: "Bimbingan hafalan Al-Quran dengan target capaian khusus." },
              { nama: "English Club", kategori: "Akademik", deskripsi: "Melatih kemampuan berbahasa Inggris aktif dan pasif." },
              { nama: "Karya Ilmiah Remaja (KIR)", kategori: "Akademik", deskripsi: "Mengembangkan nalar kritis dan budaya meneliti bagi siswa." },
            ].map((ekskul, i) => (
              <div key={i} className="glass" style={{ display: "flex", flexDirection: "column", borderRadius: "16px", overflow: "hidden", border: "1px solid var(--border)", transition: "transform 0.3s ease, box-shadow 0.3s ease", minWidth: "320px", flexShrink: 0, scrollSnapAlign: "start" }}>
                {/* Image Placeholder */}
                <div style={{ width: "100%", height: "200px", backgroundColor: "rgba(22, 163, 74, 0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                </div>
                
                <div style={{ padding: "24px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text)", margin: 0 }}>{ekskul.nama}</h3>
                    <span style={{ fontSize: "0.75rem", padding: "6px 12px", borderRadius: "99px", background: "var(--primary)", color: "white", fontWeight: 600 }}>{ekskul.kategori}</span>
                  </div>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>{ekskul.deskripsi}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
