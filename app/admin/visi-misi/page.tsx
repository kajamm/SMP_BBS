"use client";

import { useEffect, useState, type FormEvent } from "react";

interface VisiMisiData {
  visi: string;
  misi: string[];
  pilar_utama: string[];
  sistem_pendidikan: string[];
}

export default function AdminVisiMisi() {
  const [data, setData] = useState<VisiMisiData>({ visi: "", misi: [], pilar_utama: [], sistem_pendidikan: [] });
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/visi-misi").then(r => r.json()).then(d => {
      setData({ visi: d.visi || "", misi: d.misi || [], pilar_utama: d.pilar_utama || [], sistem_pendidikan: d.sistem_pendidikan || [] });
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await fetch("/api/visi-misi", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  // Helper: add/remove/edit array items
  const addItem = (field: keyof Omit<VisiMisiData, "visi">) =>
    setData(d => ({ ...d, [field]: [...d[field], ""] }));

  const updateItem = (field: keyof Omit<VisiMisiData, "visi">, idx: number, val: string) =>
    setData(d => ({ ...d, [field]: d[field].map((v, i) => i === idx ? val : v) }));

  const removeItem = (field: keyof Omit<VisiMisiData, "visi">, idx: number) =>
    setData(d => ({ ...d, [field]: d[field].filter((_, i) => i !== idx) }));

  if (loading) return <div className="admin-loading"><div className="admin-loading-spinner" /></div>;

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2>Visi &amp; Misi Sekolah</h2>
          <p>Edit visi, misi, pilar utama, dan sistem pendidikan yang tampil di website.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

          {/* Visi */}
          <div className="admin-settings-section">
            <h3 className="admin-settings-title">🌟 Visi Sekolah</h3>
            <div className="admin-form-group" style={{ marginBottom: 0 }}>
              <label>Teks Visi *</label>
              <textarea value={data.visi} onChange={e => setData(d => ({ ...d, visi: e.target.value }))} rows={4} placeholder="Terwujudnya peserta didik yang unggul..." required />
            </div>
          </div>

          {/* Pilar Utama */}
          <div className="admin-settings-section">
            <h3 className="admin-settings-title">🏛️ Pilar Utama</h3>
            <p style={{ fontSize: "0.85rem", color: "#6b7280", marginBottom: 16 }}>Kata kunci singkat yang muncul sebagai chip/badge di bawah visi.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {data.pilar_utama.map((p, i) => (
                <div key={i} style={{ display: "flex", gap: 8 }}>
                  <input type="text" value={p} onChange={e => updateItem("pilar_utama", i, e.target.value)} placeholder={`Pilar ${i + 1}`} style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: "0.9rem" }} />
                  <button type="button" className="admin-btn admin-btn-sm admin-btn-danger" onClick={() => removeItem("pilar_utama", i)}>✕</button>
                </div>
              ))}
              <button type="button" className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => addItem("pilar_utama")} style={{ alignSelf: "flex-start" }}>+ Tambah Pilar</button>
            </div>
          </div>

          {/* Misi */}
          <div className="admin-settings-section">
            <h3 className="admin-settings-title">🎯 Misi Sekolah</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {data.misi.map((m, i) => (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <span style={{ minWidth: 24, marginTop: 10, fontSize: "0.85rem", color: "#9ca3af", fontWeight: 600 }}>{i + 1}.</span>
                  <textarea value={m} onChange={e => updateItem("misi", i, e.target.value)} rows={2} placeholder={`Misi ke-${i + 1}`} style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: "0.9rem", resize: "vertical", fontFamily: "inherit" }} />
                  <button type="button" className="admin-btn admin-btn-sm admin-btn-danger" onClick={() => removeItem("misi", i)} style={{ marginTop: 2 }}>✕</button>
                </div>
              ))}
              <button type="button" className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => addItem("misi")} style={{ alignSelf: "flex-start" }}>+ Tambah Misi</button>
            </div>
          </div>

          {/* Sistem Pendidikan */}
          <div className="admin-settings-section">
            <h3 className="admin-settings-title">📚 Sistem &amp; Kekhasan Pendidikan</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {data.sistem_pendidikan.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <span style={{ minWidth: 24, marginTop: 10, fontSize: "0.85rem", color: "#9ca3af", fontWeight: 600 }}>{i + 1}.</span>
                  <textarea value={s} onChange={e => updateItem("sistem_pendidikan", i, e.target.value)} rows={2} placeholder={`Poin ke-${i + 1}`} style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: "0.9rem", resize: "vertical", fontFamily: "inherit" }} />
                  <button type="button" className="admin-btn admin-btn-sm admin-btn-danger" onClick={() => removeItem("sistem_pendidikan", i)} style={{ marginTop: 2 }}>✕</button>
                </div>
              ))}
              <button type="button" className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => addItem("sistem_pendidikan")} style={{ alignSelf: "flex-start" }}>+ Tambah Poin</button>
            </div>
          </div>

        </div>

        <div className="admin-settings-actions" style={{ flexDirection: "column", alignItems: "flex-end", marginTop: 24 }}>
          {saved && <span className="admin-alert admin-alert-success" style={{ marginBottom: 0, alignSelf: "stretch", textAlign: "center" }}>✅ Visi &amp; Misi berhasil disimpan!</span>}
          <button type="submit" className="admin-btn admin-btn-primary">Simpan Visi &amp; Misi</button>
        </div>
      </form>
    </div>
  );
}
