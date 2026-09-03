"use client";

import { useEffect, useState, type FormEvent } from "react";

interface SekolahSettings {
  telepon: string;
  email: string;
  whatsapp: string;
  alamat: string;
  instagram: string;
  instagramUrl: string;
  tiktokUrl: string;
  youtubeUrl: string;
  statsGuru: number;
  statsSiswa: number;
  statsKelas: number;
}

export default function AdminPengaturan() {
  const [form, setForm] = useState<SekolahSettings | null>(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPengaturan = async () => {
      try {
        const res = await fetch("/api/pengaturan");
        if (!res.ok) throw new Error("Gagal mengambil data");
        const data = await res.json();
        setForm(data);
      } catch (err) {
        console.error(err);
        setForm(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPengaturan();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form) return;
    
    try {
      await fetch("/api/pengaturan", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menyimpan pengaturan.");
    }
  };

  if (loading) return <div className="admin-loading"><div className="admin-loading-spinner"></div></div>;
  if (!form) return null;

  const update = (field: keyof SekolahSettings, value: string | number) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2>Pengaturan Sekolah</h2>
          <p>Update informasi kontak, sosial media, dan statistik sekolah.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="admin-settings-grid">
          {/* Contact Info */}
          <div className="admin-settings-section">
            <h3 className="admin-settings-title">📞 Informasi Kontak</h3>
            <div className="admin-form-group">
              <label>Telepon</label>
              <input type="text" value={form.telepon} onChange={(e) => update("telepon", e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label>Email</label>
              <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label>Nomor WhatsApp (tanpa +)</label>
              <input type="text" value={form.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} placeholder="6281234567890" />
            </div>
            <div className="admin-form-group">
              <label>Alamat</label>
              <textarea value={form.alamat} onChange={(e) => update("alamat", e.target.value)} rows={3} />
            </div>
          </div>

          {/* Social Media */}
          <div className="admin-settings-section">
            <h3 className="admin-settings-title">🌐 Sosial Media</h3>
            <div className="admin-form-group">
              <label>Username Instagram</label>
              <input type="text" value={form.instagram} onChange={(e) => update("instagram", e.target.value)} placeholder="@smpplusbabussalam" />
            </div>
            <div className="admin-form-group">
              <label>URL Instagram</label>
              <input type="text" value={form.instagramUrl} onChange={(e) => update("instagramUrl", e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label>URL TikTok</label>
              <input type="text" value={form.tiktokUrl} onChange={(e) => update("tiktokUrl", e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label>URL YouTube</label>
              <input type="text" value={form.youtubeUrl} onChange={(e) => update("youtubeUrl", e.target.value)} />
            </div>
          </div>

          {/* Stats */}
          <div className="admin-settings-section">
            <h3 className="admin-settings-title">📊 Statistik Sekolah</h3>
            <div className="admin-form-group">
              <label>Jumlah Guru & Staf</label>
              <input type="number" value={form.statsGuru} onChange={(e) => update("statsGuru", parseInt(e.target.value) || 0)} />
            </div>
            <div className="admin-form-group">
              <label>Jumlah Siswa Aktif</label>
              <input type="number" value={form.statsSiswa} onChange={(e) => update("statsSiswa", parseInt(e.target.value) || 0)} />
            </div>
            <div className="admin-form-group">
              <label>Jumlah Kelas</label>
              <input type="number" value={form.statsKelas} onChange={(e) => update("statsKelas", parseInt(e.target.value) || 0)} />
            </div>
          </div>
        </div>

        <div className="admin-settings-actions" style={{ flexDirection: "column", alignItems: "flex-end" }}>
          {saved && (
            <span className="admin-alert admin-alert-success" style={{ marginBottom: 0, alignSelf: "stretch", textAlign: "center" }}>
              ✅ Pengaturan berhasil disimpan!
            </span>
          )}
          <button type="submit" className="admin-btn admin-btn-primary">Simpan Pengaturan</button>
        </div>
      </form>
    </div>
  );
}

