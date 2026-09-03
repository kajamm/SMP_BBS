"use client";

import { useState, useEffect, type FormEvent, type ChangeEvent } from "react";
import { sekolah } from "@/data/sekolah";
import { IconCheckCircle2, IconSend } from "./icons";

export default function Daftar() {
  const [ppdbInfo, setPpdbInfo] = useState<any>(null);
  const [adminWA, setAdminWA] = useState("6281234567890");

  const [form, setForm] = useState({
    namaSiswa: "",
    nisn: "",
    tempatTanggalLahir: "",
    asalSekolah: "",
    namaOrtu: "",
    noWhatsapp: "",
    email: "",
  });

  useEffect(() => {
    fetch("/api/ppdb", { cache: "no-store" })
      .then(res => res.json())
      .then(d => { if (d && !d.error) setPpdbInfo(d); })
      .catch(() => {});

    fetch("/api/pengaturan", { cache: "no-store" })
      .then(res => res.json())
      .then(d => {
        if (d && d.whatsapp) {
          setAdminWA(d.whatsapp.replace(/[^0-9]/g, ""));
        }
      })
      .catch(() => {});
  }, []);

  const handleChange =
    (field: keyof typeof form) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
    };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Format pesan
    const message = `Halo Admin PPDB ${sekolah.namaSingkat},
Saya ingin mendaftarkan calon siswa baru dengan data sebagai berikut:

*Nama Lengkap:* ${form.namaSiswa}
*NISN:* ${form.nisn}
*Tempat, Tanggal Lahir:* ${form.tempatTanggalLahir}
*Asal Sekolah:* ${form.asalSekolah}
*Nama Orang Tua/Wali:* ${form.namaOrtu}
*No. WhatsApp aktif:* ${form.noWhatsapp}
*Email:* ${form.email}

Mohon informasi mengenai langkah selanjutnya. Terima kasih.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${adminWA}?text=${encodedMessage}`, "_blank");
  };

  return (
    <section id="daftar" aria-label="Pendaftaran" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 0 80px" }}>
      <div className="section-container" style={{ width: "100%" }}>
        <div className="section-header centered fade-in">
        <div className="section-badge">
          <IconCheckCircle2 />
          Penerimaan Siswa Baru
        </div>
        <h2 className="section-title">Formulir Pendaftaran</h2>
        <p className="section-subtitle">
          Silakan lengkapi formulir di bawah ini. Data Anda akan dikirimkan langsung ke WhatsApp Admin PPDB {sekolah.namaLengkap}.
        </p>
      </div>

      <div
        className="fade-in-up"
        style={{
          maxWidth: 600,
          margin: "0 auto",
          background: "var(--card-bg)",
          padding: "40px",
          borderRadius: 24,
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        {ppdbInfo && (
          <div style={{ marginBottom: 24 }}>
            <div
              style={{
                padding: "12px 18px",
                borderRadius: 12,
                textAlign: "center",
                fontWeight: 600,
                fontSize: "0.95rem",
                background: ppdbInfo.is_open ? "rgba(22, 163, 74, 0.1)" : "rgba(239, 68, 68, 0.1)",
                color: ppdbInfo.is_open ? "#15803d" : "#b91c1c",
                border: `1px solid ${ppdbInfo.is_open ? "rgba(22, 163, 74, 0.3)" : "rgba(239, 68, 68, 0.3)"}`,
                marginBottom: 16
              }}
            >
              {ppdbInfo.is_open
                ? `🟢 Pendaftaran PPDB ${ppdbInfo.tahun_ajaran ? `Tahun Ajaran ${ppdbInfo.tahun_ajaran}` : ""} Sedang DIBUKA`
                : `🔴 Pendaftaran PPDB ${ppdbInfo.tahun_ajaran ? `Tahun Ajaran ${ppdbInfo.tahun_ajaran}` : ""} Saat Ini DITUTUP`}
            </div>

            {ppdbInfo.info_biaya && (
              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", background: "var(--bg-alt)", padding: "10px 14px", borderRadius: 8, marginBottom: 12 }}>
                ℹ️ <strong>Informasi Biaya:</strong> {ppdbInfo.info_biaya}
              </div>
            )}
          </div>
        )}

        <form id="daftar-form" noValidate onSubmit={handleSubmit}>
          
          <div className="form-group" style={{ marginBottom: 20 }}>
            <label className="form-label" htmlFor="namaSiswa" style={{ display: "block", marginBottom: 8, fontWeight: 500, color: "var(--text)" }}>
              Nama Lengkap Calon Siswa *
            </label>
            <input
              type="text"
              id="namaSiswa"
              className="form-input"
              placeholder="Masukkan nama lengkap siswa"
              required
              value={form.namaSiswa}
              onChange={handleChange("namaSiswa")}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 8,
                border: "1px solid var(--border)",
                background: "var(--bg)",
                color: "var(--text)",
                outline: "none",
                fontSize: "1rem"
              }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 20 }}>
            <label className="form-label" htmlFor="nisn" style={{ display: "block", marginBottom: 8, fontWeight: 500, color: "var(--text)" }}>
              NISN *
            </label>
            <input
              type="text"
              id="nisn"
              className="form-input"
              placeholder="Masukkan NISN siswa"
              required
              value={form.nisn}
              onChange={handleChange("nisn")}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 8,
                border: "1px solid var(--border)",
                background: "var(--bg)",
                color: "var(--text)",
                outline: "none",
                fontSize: "1rem"
              }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 20 }}>
            <label className="form-label" htmlFor="tempatTanggalLahir" style={{ display: "block", marginBottom: 8, fontWeight: 500, color: "var(--text)" }}>
              Tempat, Tanggal Lahir *
            </label>
            <input
              type="text"
              id="tempatTanggalLahir"
              className="form-input"
              placeholder="Contoh: Bandung, 15 Agustus 2012"
              required
              value={form.tempatTanggalLahir}
              onChange={handleChange("tempatTanggalLahir")}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 8,
                border: "1px solid var(--border)",
                background: "var(--bg)",
                color: "var(--text)",
                outline: "none",
                fontSize: "1rem"
              }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 20 }}>
            <label className="form-label" htmlFor="asalSekolah" style={{ display: "block", marginBottom: 8, fontWeight: 500, color: "var(--text)" }}>
              Asal Sekolah (SD/MI) *
            </label>
            <input
              type="text"
              id="asalSekolah"
              className="form-input"
              placeholder="Masukkan nama SD/MI asal"
              required
              value={form.asalSekolah}
              onChange={handleChange("asalSekolah")}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 8,
                border: "1px solid var(--border)",
                background: "var(--bg)",
                color: "var(--text)",
                outline: "none",
                fontSize: "1rem"
              }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 20 }}>
            <label className="form-label" htmlFor="namaOrtu" style={{ display: "block", marginBottom: 8, fontWeight: 500, color: "var(--text)" }}>
              Nama Orang Tua / Wali *
            </label>
            <input
              type="text"
              id="namaOrtu"
              className="form-input"
              placeholder="Masukkan nama orang tua/wali"
              required
              value={form.namaOrtu}
              onChange={handleChange("namaOrtu")}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 8,
                border: "1px solid var(--border)",
                background: "var(--bg)",
                color: "var(--text)",
                outline: "none",
                fontSize: "1rem"
              }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 32 }}>
            <label className="form-label" htmlFor="noWhatsapp" style={{ display: "block", marginBottom: 8, fontWeight: 500, color: "var(--text)" }}>
              Nomor WhatsApp Aktif *
            </label>
            <input
              type="tel"
              id="noWhatsapp"
              className="form-input"
              placeholder="Contoh: 081234567890"
              required
              value={form.noWhatsapp}
              onChange={handleChange("noWhatsapp")}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 8,
                border: "1px solid var(--border)",
                background: "var(--bg)",
                color: "var(--text)",
                outline: "none",
                fontSize: "1rem"
              }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 32 }}>
            <label className="form-label" htmlFor="email" style={{ display: "block", marginBottom: 8, fontWeight: 500, color: "var(--text)" }}>
              Email Aktif *
            </label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="Contoh: email@domain.com"
              required
              value={form.email}
              onChange={handleChange("email")}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 8,
                border: "1px solid var(--border)",
                background: "var(--bg)",
                color: "var(--text)",
                outline: "none",
                fontSize: "1rem"
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "16px",
              background: "var(--primary)", 
              color: "#fff",
              border: "none",
              borderRadius: 12,
              fontSize: "1.1rem",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              boxShadow: "var(--shadow-md)",
              transition: "transform 0.2s, background 0.2s"
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    </section>
  );
}
