"use client";

import { useEffect, useState, type FormEvent } from "react";
import ImageUpload from "@/components/ImageUpload";

interface IdentitasForm {
  nama_lengkap: string;
  nama_singkat: string;
  inisial: string;
  npsn: string;
  akreditasi: string;
  akreditasi_sk: string;
  sk_pendirian: string;
  logo_url: string;
  website: string;
  status_sekolah: string;
}

const empty: IdentitasForm = {
  nama_lengkap: "", nama_singkat: "", inisial: "", npsn: "",
  akreditasi: "", akreditasi_sk: "", sk_pendirian: "",
  logo_url: "", website: "", status_sekolah: "",
};

export default function AdminIdentitas() {
  const [form, setForm] = useState<IdentitasForm>(empty);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/identitas").then(r => r.json()).then(d => {
      setForm({ ...empty, ...d });
      setLoading(false);
    });
  }, []);

  const update = (field: keyof IdentitasForm, val: string) => setForm(f => ({ ...f, [field]: val }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await fetch("/api/identitas", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) return <div className="admin-loading"><div className="admin-loading-spinner" /></div>;

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2>Identitas Sekolah</h2>
          <p>Update informasi resmi dan identitas sekolah.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="admin-settings-grid">
          <div className="admin-settings-section">
            <h3 className="admin-settings-title">🏫 Informasi Utama</h3>
            <div className="admin-form-group">
              <label>Nama Lengkap Sekolah</label>
              <input type="text" value={form.nama_lengkap} onChange={e => update("nama_lengkap", e.target.value)} placeholder="SMP PLUS BABUSSALAM" />
            </div>
            <div className="admin-form-group">
              <label>Nama Singkat</label>
              <input type="text" value={form.nama_singkat} onChange={e => update("nama_singkat", e.target.value)} placeholder="SMP Plus Babussalam" />
            </div>
            <div className="admin-form-group">
              <label>Inisial (untuk logo teks)</label>
              <input type="text" value={form.inisial} onChange={e => update("inisial", e.target.value)} placeholder="BBS" maxLength={5} />
            </div>
            <div className="admin-form-group">
              <label>Status Sekolah</label>
              <input type="text" value={form.status_sekolah} onChange={e => update("status_sekolah", e.target.value)} placeholder="Swasta, di bawah Yayasan..." />
            </div>
          </div>

          <div className="admin-settings-section">
            <h3 className="admin-settings-title">📋 Data Resmi</h3>
            <div className="admin-form-group">
              <label>NPSN</label>
              <input type="text" value={form.npsn} onChange={e => update("npsn", e.target.value)} placeholder="20252483" />
            </div>
            <div className="admin-form-group">
              <label>Akreditasi</label>
              <select value={form.akreditasi} onChange={e => update("akreditasi", e.target.value)}>
                <option value="">-- Pilih --</option>
                <option value="A">A (Unggul)</option>
                <option value="B">B (Baik)</option>
                <option value="C">C (Cukup Baik)</option>
                <option value="TT">Tidak Terakreditasi</option>
              </select>
            </div>
            <div className="admin-form-group">
              <label>SK Akreditasi</label>
              <input type="text" value={form.akreditasi_sk} onChange={e => update("akreditasi_sk", e.target.value)} placeholder="SK No. 1347/BAN-SM/SK/2021" />
            </div>
            <div className="admin-form-group">
              <label>SK Pendirian</label>
              <input type="text" value={form.sk_pendirian} onChange={e => update("sk_pendirian", e.target.value)} placeholder="No. 527/I02.7/Kep/OT/1997" />
            </div>
            <div className="admin-form-group">
              <label>Website</label>
              <input type="text" value={form.website} onChange={e => update("website", e.target.value)} placeholder="www.babussalamdago.com" />
            </div>
          </div>

          <div className="admin-settings-section" style={{ gridColumn: "1 / -1" }}>
            <h3 className="admin-settings-title">🖼️ Logo Sekolah</h3>
            <div className="admin-form-group">
              <label>URL / Upload Logo</label>
              <ImageUpload value={form.logo_url} onChange={url => update("logo_url", url)} />
            </div>
          </div>
        </div>

        <div className="admin-settings-actions" style={{ flexDirection: "column", alignItems: "flex-end" }}>
          {saved && <span className="admin-alert admin-alert-success" style={{ marginBottom: 0, alignSelf: "stretch", textAlign: "center" }}>✅ Identitas sekolah berhasil disimpan!</span>}
          <button type="submit" className="admin-btn admin-btn-primary">Simpan Identitas</button>
        </div>
      </form>
    </div>
  );
}
