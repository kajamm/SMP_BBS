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
          
          <div className="glass p-8 rounded-xl text-center fade-in">
            <h3 className="text-xl font-bold mb-4">Halaman sedang dalam pengembangan</h3>
            <p className="text-gray-500">Informasi detail mengenai tugas dan fungsi wali kelas akan segera hadir di sini.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
