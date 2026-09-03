"use client";

import { useEffect, useState, type FormEvent } from "react";

interface PPDBData { tahun_ajaran: string; tanggal_buka: string; tanggal_tutup: string; syarat: string[]; info_biaya: string; catatan: string; is_open: boolean; }
const empty: PPDBData = { tahun_ajaran: "", tanggal_buka: "", tanggal_tutup: "", syarat: [], info_biaya: "", catatan: "", is_open: false };

export default function AdminPPDB() {
  const [data, setData] = useState<PPDBData>(empty);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [newSyarat, setNewSyarat] = useState("");

  useEffect(() => {
    fetch("/api/ppdb").then(r => r.json()).then(d => {
      setData({
        tahun_ajaran: d.tahun_ajaran || "",
        tanggal_buka: d.tanggal_buka?.split("T")[0] || "",
        tanggal_tutup: d.tanggal_tutup?.split("T")[0] || "",
        syarat: Array.isArray(d.syarat) ? d.syarat : [],
        info_biaya: d.info_biaya || "",
        catatan: d.catatan || "",
        is_open: Boolean(d.is_open),
      });
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await fetch("/api/ppdb", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const addSyarat = () => {
    if (!newSyarat.trim()) return;
    setData(d => ({ ...d, syarat: [...d.syarat, newSyarat.trim()] }));
    setNewSyarat("");
  };

  const removeSyarat = (idx: number) => setData(d => ({ ...d, syarat: d.syarat.filter((_, i) => i !== idx) }));

  if (loading) return <div className="admin-loading"><div className="admin-loading-spinner" /></div>;

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2>PPDB</h2>
          <p>Kelola informasi Penerimaan Peserta Didik Baru (PPDB).</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: "0.9rem", color: "#6b7280" }}>Status:</span>
          <button
            type="button"
            onClick={() => setData(d => ({ ...d, is_open: !d.is_open }))}
            style={{
              padding: "6px 16px", borderRadius: 20, border: "none", cursor: "pointer", fontWeight: 600,
              background: data.is_open ? "#d1fae5" : "#fee2e2", color: data.is_open ? "#065f46" : "#b91c1c",
              transition: "all 0.2s",
            }}
          >
            {data.is_open ? "🟢 PPDB Dibuka" : "🔴 PPDB Ditutup"}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
          <div className="admin-settings-section">
            <h3 className="admin-settings-title">📅 Informasi Dasar</h3>
            <div className="admin-form-group">
              <label>Tahun Ajaran</label>
              <input type="text" value={data.tahun_ajaran} onChange={e => setData(d => ({ ...d, tahun_ajaran: e.target.value }))} placeholder="2025/2026" />
            </div>
            <div className="admin-form-group">
              <label>Tanggal Buka Pendaftaran</label>
              <input type="date" value={data.tanggal_buka} onChange={e => setData(d => ({ ...d, tanggal_buka: e.target.value }))} />
            </div>
            <div className="admin-form-group">
              <label>Tanggal Tutup Pendaftaran</label>
              <input type="date" value={data.tanggal_tutup} onChange={e => setData(d => ({ ...d, tanggal_tutup: e.target.value }))} />
            </div>
          </div>

          <div className="admin-settings-section">
            <h3 className="admin-settings-title">💰 Info Biaya &amp; Catatan</h3>
            <div className="admin-form-group">
              <label>Informasi Biaya</label>
              <textarea value={data.info_biaya} onChange={e => setData(d => ({ ...d, info_biaya: e.target.value }))} rows={5} placeholder="Detail biaya pendaftaran, uang pangkal, SPP..." />
            </div>
            <div className="admin-form-group">
              <label>Catatan Tambahan</label>
              <textarea value={data.catatan} onChange={e => setData(d => ({ ...d, catatan: e.target.value }))} rows={3} placeholder="Informasi lain yang perlu disampaikan..." />
            </div>
          </div>
        </div>

        <div className="admin-settings-section" style={{ marginBottom: 24 }}>
          <h3 className="admin-settings-title">📋 Syarat Pendaftaran</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
            {data.syarat.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ minWidth: 24, fontSize: "0.85rem", color: "#9ca3af", fontWeight: 600 }}>{i + 1}.</span>
                <span style={{ flex: 1, padding: "8px 12px", background: "#f9fafb", borderRadius: 8, fontSize: "0.9rem", border: "1px solid #e5e7eb" }}>{s}</span>
                <button type="button" className="admin-btn admin-btn-sm admin-btn-danger" onClick={() => removeSyarat(i)}>✕</button>
              </div>
            ))}
            {data.syarat.length === 0 && <p style={{ color: "#9ca3af", fontSize: "0.87rem" }}>Belum ada syarat yang ditambahkan.</p>}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              type="text" value={newSyarat} onChange={e => setNewSyarat(e.target.value)}
              onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addSyarat())}
              placeholder="Tambah syarat baru, tekan Enter..." style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: "0.9rem" }}
            />
            <button type="button" className="admin-btn admin-btn-secondary" onClick={addSyarat}>Tambah</button>
          </div>
        </div>

        <div className="admin-settings-actions" style={{ flexDirection: "column", alignItems: "flex-end" }}>
          {saved && <span className="admin-alert admin-alert-success" style={{ marginBottom: 0, alignSelf: "stretch", textAlign: "center" }}>✅ Informasi PPDB berhasil disimpan!</span>}
          <button type="submit" className="admin-btn admin-btn-primary">Simpan PPDB</button>
        </div>
      </form>
    </div>
  );
}
