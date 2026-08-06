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
          
          <div className="glass p-8 rounded-xl text-center fade-in">
            <h3 className="text-xl font-bold mb-4">Halaman sedang dalam pengembangan</h3>
            <p className="text-gray-500">Informasi detail mengenai program ekstrakurikuler akan segera hadir di sini.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
