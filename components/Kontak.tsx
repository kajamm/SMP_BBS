"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { sekolah } from "@/data/sekolah";
import {
  IconPhoneCall,
  IconMapPin,
  IconMail,
  IconClock,
  IconFacebook,
  IconInstagram,
  IconYoutube,
  IconExternalLink,
  IconSend,
  IconCheckCircle2,
} from "./icons";

export default function Kontak() {
  const [sending, setSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [form, setForm] = useState({ nama: "", email: "", subjek: "", pesan: "" });

  const handleChange =
    (field: keyof typeof form) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
    };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setForm({ nama: "", email: "", subjek: "", pesan: "" });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section id="kontak" aria-label="Kontak dan Lokasi">
      <div className="section-container">
        <div className="section-header centered fade-in">
          <div className="section-badge">
            <IconPhoneCall />
            Hubungi Kami
          </div>
          <h2 className="section-title">Kontak & Lokasi</h2>
          <p className="section-subtitle">
            Kami siap membantu Anda. Jangan ragu untuk menghubungi kami atau mengunjungi sekolah
            kami.
          </p>
        </div>

        <div className="kontak-grid">
          <div className="kontak-info fade-in-left">
            <div className="kontak-card">
              <ul className="kontak-info-list">
                <li className="kontak-info-item">
                  <div className="kontak-info-icon">
                    <IconMapPin />
                  </div>
                  <div>
                    <div className="kontak-info-label">Alamat</div>
                    <div className="kontak-info-value">{sekolah.alamat}</div>
                  </div>
                </li>
                <li className="kontak-info-item">
                  <div className="kontak-info-icon">
                    <IconPhoneCall />
                  </div>
                  <div>
                    <div className="kontak-info-label">Instagram</div>
                    <div className="kontak-info-value">{sekolah.instagram}</div>
                  </div>
                </li>
                <li className="kontak-info-item">
                  <div className="kontak-info-icon">
                    <IconMail />
                  </div>
                  <div>
                    <div className="kontak-info-label">Email</div>
                    <div className="kontak-info-value">{sekolah.email}</div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="kontak-card">
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "var(--text)",
                  marginBottom: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <IconClock width={18} height={18} stroke="var(--primary)" />
                Jam Operasional
              </h3>
              <div className="jam-ops-grid">
                {sekolah.jamOperasional.map((j) => (
                  <div className="jam-ops-item" key={j.hari}>
                    <div className="jam-ops-day">{j.hari}</div>
                    <div
                      className="jam-ops-time"
                      style={j.waktu === "Tutup" ? { color: "var(--text-muted)" } : undefined}
                    >
                      {j.waktu}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sosmed-section">
              <h3 className="sosmed-title">Ikuti Kami di Media Sosial</h3>
              <div className="sosmed-links">
                <a href="#" className="sosmed-btn facebook" aria-label={`Facebook ${sekolah.namaSingkat}`}>
                  <IconFacebook />
                  Facebook
                </a>
                <a href="#" className="sosmed-btn instagram" aria-label={`Instagram ${sekolah.namaSingkat}`}>
                  <IconInstagram />
                  Instagram
                </a>
                <a href="#" className="sosmed-btn youtube" aria-label={`YouTube ${sekolah.namaSingkat}`}>
                  <IconYoutube />
                  YouTube
                </a>
              </div>
            </div>

            <div className="maps-card">
              <div className="maps-header">
                <h3 className="maps-title">
                  <IconMapPin />
                  Lokasi Sekolah
                </h3>
                <a href={sekolah.mapsUrl} target="_blank" rel="noopener" className="maps-btn">
                  <IconExternalLink />
                  Buka Maps
                </a>
              </div>
              <div className="maps-placeholder">
                <IconMapPin strokeWidth={1.5} />
                <p>{sekolah.alamat}</p>
              </div>
            </div>
          </div>

          <div className="fade-in-right">
            <div className="contact-form-card">
              <h3 className="form-title">
                <IconSend />
                Kirim Pesan
              </h3>
              <p className="form-subtitle">
                Ada pertanyaan? Isi formulir di bawah dan kami akan segera merespons.
              </p>

              <form id="contact-form" noValidate onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-nama">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="contact-nama"
                    name="nama"
                    className="form-input"
                    placeholder="Masukkan nama lengkap Anda"
                    required
                    value={form.nama}
                    onChange={handleChange("nama")}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-email">
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    className="form-input"
                    placeholder="contoh@email.com"
                    required
                    value={form.email}
                    onChange={handleChange("email")}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-subjek">
                    Subjek
                  </label>
                  <input
                    type="text"
                    id="contact-subjek"
                    name="subjek"
                    className="form-input"
                    placeholder="Perihal pesan Anda"
                    value={form.subjek}
                    onChange={handleChange("subjek")}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-pesan">
                    Pesan
                  </label>
                  <textarea
                    id="contact-pesan"
                    name="pesan"
                    className="form-input"
                    placeholder="Tulis pesan Anda di sini..."
                    required
                    value={form.pesan}
                    onChange={handleChange("pesan")}
                  />
                </div>

                <button type="submit" className="form-submit-btn" id="submit-btn" disabled={sending}>
                  {sending ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ animation: "spin 1s linear infinite" }}
                      >
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <IconSend />
                      Kirim Pesan
                    </>
                  )}
                </button>
              </form>

              <div id="form-success" className={`form-success ${showSuccess ? "show" : ""}`} role="alert">
                <IconCheckCircle2 />
                <p className="form-success-title">Pesan Berhasil Terkirim!</p>
                <p className="form-success-text">
                  Terima kasih telah menghubungi kami. Kami akan segera merespons pesan Anda dalam
                  1x24 jam kerja.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
