"use client";

import { useEffect, useState } from "react";

interface TugasItem {
  id?: number;
  judul: string;
  deskripsi: string;
  urutan?: number;
}

const defaultTugas: TugasItem[] = [
  { judul: "Pengelolaan Kelas", deskripsi: "Mengelola kelas yang menjadi tanggung jawabnya secara aktif dan berkesinambungan.", urutan: 1 },
  { judul: "Penyelenggaraan Administrasi", deskripsi: "Menyelenggarakan administrasi kelas seperti denah tempat duduk, absensi, dan jadwal pelajaran.", urutan: 2 },
  { judul: "Penyusunan Statistik", deskripsi: "Menyusun statistik bulanan kelas untuk memantau tingkat kehadiran dan partisipasi siswa.", urutan: 3 },
  { judul: "Pengisian Daftar Kumpulan Nilai", deskripsi: "Mengisi daftar kumpulan nilai (legger) secara akurat berdasarkan laporan setiap guru mata pelajaran.", urutan: 4 },
  { judul: "Pembuatan Catatan Khusus", deskripsi: "Membuat catatan khusus tentang siswa terkait perkembangan akademik maupun pembinaan karakter.", urutan: 5 },
  { judul: "Pencatatan Mutasi", deskripsi: "Mencatat mutasi atau perpindahan siswa yang terjadi di dalam kelasnya selama tahun ajaran berjalan.", urutan: 6 },
  { judul: "Pelaporan Hasil Belajar", deskripsi: "Mengisi dan membagikan buku laporan penilaian hasil belajar (rapor) kepada orang tua/wali murid.", urutan: 7 },
];

export default function WaliKelasPage() {
  const [items, setItems] = useState<TugasItem[]>(defaultTugas);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/wali-kelas", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setItems(data);
        }
      })
      .catch((err) => console.error("Error fetching wali-kelas tugas:", err))
      .finally(() => setLoading(false));
  }, []);

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
          
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "24px",
              marginTop: "32px",
            }}
            className="fade-in"
          >
            {items.map((tugas, i) => (
              <div
                key={tugas.id || i}
                className="glass"
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: "16px",
                  padding: "24px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "16px",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.06)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "rgba(22, 163, 74, 0.15)",
                    color: "var(--primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                  }}
                >
                  {tugas.urutan || i + 1}
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: "var(--text)",
                      marginBottom: "8px",
                      marginTop: "0",
                    }}
                  >
                    {tugas.judul}
                  </h3>
                  <p
                    style={{
                      color: "var(--text-muted)",
                      lineHeight: 1.6,
                      margin: 0,
                      fontSize: "0.93rem",
                    }}
                  >
                    {tugas.deskripsi}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
