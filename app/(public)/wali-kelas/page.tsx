import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tugas dan Fungsi Wali Kelas | SMP Plus Babussalam",
  description: "Informasi mengenai tugas dan fungsi Wali Kelas di SMP Plus Babussalam.",
};

export default function WaliKelasPage() {
  return (
    <main className="pt-24 pb-16">
      <section id="wali-kelas" aria-label="Tugas dan Fungsi Wali Kelas">
        <div className="section-container">
          <div className="section-header centered fade-in">
            <h2 className="section-title">Tugas dan Fungsi Wali Kelas</h2>
            <p className="section-subtitle">
              Peran strategis wali kelas dalam mendampingi dan membimbing perkembangan akademik serta karakter siswa.
            </p>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px", marginTop: "32px" }} className="fade-in">
            {[
              { title: "Pengelolaan Kelas", desc: "Mengelola kelas yang menjadi tanggung jawabnya secara aktif dan berkesinambungan." },
              { title: "Penyelenggaraan Administrasi", desc: "Menyelenggarakan administrasi kelas seperti denah tempat duduk, absensi, dan jadwal pelajaran." },
              { title: "Penyusunan Statistik", desc: "Menyusun statistik bulanan kelas untuk memantau tingkat kehadiran dan partisipasi siswa." },
              { title: "Pengisian Daftar Kumpulan Nilai", desc: "Mengisi daftar kumpulan nilai (legger) secara akurat berdasarkan laporan setiap guru mata pelajaran." },
              { title: "Pembuatan Catatan Khusus", desc: "Membuat catatan khusus tentang siswa terkait perkembangan akademik maupun pembinaan karakter." },
              { title: "Pencatatan Mutasi", desc: "Mencatat mutasi atau perpindahan siswa yang terjadi di dalam kelasnya selama tahun ajaran berjalan." },
              { title: "Pelaporan Hasil Belajar", desc: "Mengisi dan membagikan buku laporan penilaian hasil belajar (rapor) kepada orang tua/wali murid." },
            ].map((tugas, i) => (
              <div key={i} className="glass" style={{ border: "1px solid var(--border)", borderRadius: "16px", padding: "24px", display: "flex", alignItems: "flex-start", gap: "16px" }}>
                <div style={{ flexShrink: 0, width: "40px", height: "40px", borderRadius: "50%", background: "rgba(22, 163, 74, 0.15)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "1.2rem" }}>
                  {i + 1}
                </div>
                <div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text)", marginBottom: "8px", marginTop: "0" }}>{tugas.title}</h3>
                  <p style={{ color: "var(--text-muted)", lineHeight: 1.5, margin: 0, fontSize: "0.95rem" }}>{tugas.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
