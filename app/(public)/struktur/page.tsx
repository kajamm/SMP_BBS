import { Metadata } from "next";
import { IconUsers } from "@/components/icons";

export const metadata: Metadata = {
  title: "Struktur Organisasi | SMP Plus Babussalam",
  description: "Struktur organisasi dan kepegawaian SMP Plus Babussalam.",
};

// Struktur organisasi image will be used instead of text data

export default function StrukturPage() {
  return (
    <main className="pt-24 pb-16">
      <section id="struktur" aria-label="Struktur Organisasi">
        <div className="section-container">
          <div className="section-header centered fade-in">
            <div className="section-badge">
              <IconUsers />
              Struktur Organisasi
            </div>
            <h2 className="section-title">Struktur Kepegawaian</h2>
            <p className="section-subtitle">
              Jajaran pengelola SMP Plus Babussalam.
            </p>
          </div>

          <div className="struktur-section fade-in" style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
            <img
              src="/struktur-organisasi.png"
              alt="Bagan Struktur Organisasi"
              style={{ maxWidth: '100%', height: 'auto', borderRadius: '12px', boxShadow: 'var(--shadow-lg)' }}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
