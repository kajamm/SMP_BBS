"use client";

import { useEffect, useState, type FormEvent } from "react";
import ImageUpload from "@/components/ImageUpload";

interface SambutanForm { nama: string; jabatan: string; foto: string; teks: string; }
const empty: SambutanForm = { nama: "", jabatan: "", foto: "", teks: "" };

export default function AdminSambutan() {
  const [form, setForm] = useState<SambutanForm>(empty);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/sambutan").then(r => r.json()).then(d => {
      setForm({ ...empty, ...d });
      setLoading(false);
    });
  }, []);

  const update = (field: keyof SambutanForm, val: string) => setForm(f => ({ ...f, [field]: val }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await fetch("/api/sambutan", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) return <div className="admin-loading"><div className="admin-loading-spinner" /></div>;

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2>Sambutan Kepala Sekolah</h2>
          <p>Edit nama, jabatan, foto, dan isi teks sambutan yang tampil di beranda.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <div className="admin-settings-section">
            <h3 className="admin-settings-title">👤 Data Kepala Sekolah</h3>
            <div className="admin-form-group">
              <label>Nama Lengkap *</label>
              <input type="text" value={form.nama} onChange={e => update("nama", e.target.value)} placeholder="H. Andi Rustandi, S.S" required />
            </div>
            <div className="admin-form-group">
              <label>Jabatan</label>
              <input type="text" value={form.jabatan} onChange={e => update("jabatan", e.target.value)} placeholder="Kepala Sekolah / Mudir" />
            </div>
            <div className="admin-form-group">
              <label>Foto</label>
              <ImageUpload value={form.foto} onChange={url => update("foto", url)} />
            </div>
          </div>

          <div className="admin-settings-section">
            <h3 className="admin-settings-title">✍️ Teks Sambutan</h3>
            <div className="admin-form-group">
              <label>Isi Sambutan *</label>
              <textarea
                value={form.teks}
                onChange={e => update("teks", e.target.value)}
                placeholder="Assalamu'alaikum Warrohmatullohi Wabarokatuh..."
                rows={14}
                style={{ resize: "vertical" }}
                required
              />
            </div>
          </div>
        </div>

        {/* Preview */}
        {(form.nama || form.teks) && (
          <div className="admin-settings-section" style={{ marginTop: 24 }}>
            <h3 className="admin-settings-title">👁️ Preview</h3>
            <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
              {form.foto && <img src={form.foto} alt="preview" style={{ width: 120, height: 150, objectFit: "cover", borderRadius: 12, border: "1px solid #e5e7eb" }} />}
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "#111827" }}>{form.nama || "—"}</div>
                <div style={{ color: "#007A43", fontSize: "0.9rem", marginBottom: 12 }}>{form.jabatan || "—"}</div>
                <div style={{ color: "#6b7280", fontSize: "0.9rem", lineHeight: 1.7 }}>{form.teks || "—"}</div>
              </div>
            </div>
          </div>
        )}

        <div className="admin-settings-actions" style={{ flexDirection: "column", alignItems: "flex-end", marginTop: 24 }}>
          {saved && <span className="admin-alert admin-alert-success" style={{ marginBottom: 0, alignSelf: "stretch", textAlign: "center" }}>✅ Sambutan berhasil disimpan!</span>}
          <button type="submit" className="admin-btn admin-btn-primary">Simpan Sambutan</button>
        </div>
      </form>
    </div>
  );
}
