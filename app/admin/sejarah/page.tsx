"use client";

import { useEffect, useState } from "react";

interface SejarahItem { id: number; tahun: string; judul: string; deskripsi: string; urutan: number; }
const emptyForm = { tahun: "", judul: "", deskripsi: "", urutan: 0 };

export default function AdminSejarah() {
  const [items, setItems] = useState<SejarahItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSejarah = async () => {
    const res = await fetch("/api/sejarah");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { fetchSejarah(); }, []);

  const openAdd = () => { setEditingId(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (item: SejarahItem) => {
    setEditingId(item.id);
    setForm({ tahun: item.tahun, judul: item.judul, deskripsi: item.deskripsi || "", urutan: item.urutan || 0 });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.tahun || !form.judul) return;
    if (editingId !== null) {
      await fetch("/api/sejarah", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editingId, ...form }) });
    } else {
      await fetch("/api/sejarah", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    }
    fetchSejarah();
    setModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/sejarah?id=${id}`, { method: "DELETE" });
    fetchSejarah();
    setDeleteConfirm(null);
  };

  if (loading) return <div className="admin-loading"><div className="admin-loading-spinner" /></div>;

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2>Sejarah Sekolah</h2>
          <p>Kelola timeline perjalanan sejarah SMP Plus Babussalam.</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openAdd}>+ Tambah Milestone</button>
      </div>

      {items.length === 0 ? (
        <div className="admin-empty">Belum ada data sejarah. Klik &quot;Tambah Milestone&quot; untuk memulai.</div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: 60 }}>Urutan</th>
                <th style={{ width: 100 }}>Tahun</th>
                <th>Judul</th>
                <th>Deskripsi</th>
                <th style={{ width: 140 }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td style={{ textAlign: "center", color: "#9ca3af", fontWeight: 600 }}>{item.urutan}</td>
                  <td><strong style={{ color: "#007A43" }}>{item.tahun}</strong></td>
                  <td><strong>{item.judul}</strong></td>
                  <td style={{ fontSize: "0.85rem", color: "#6b7280", maxWidth: 300, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.deskripsi}</td>
                  <td>
                    <div className="admin-action-btns">
                      <button className="admin-btn admin-btn-sm admin-btn-secondary" onClick={() => openEdit(item)}>Edit</button>
                      <button className="admin-btn admin-btn-sm admin-btn-danger" onClick={() => setDeleteConfirm(item.id)}>Hapus</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && (
        <div className="admin-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{editingId !== null ? "Edit Milestone" : "Tambah Milestone Baru"}</h3>
              <button className="admin-modal-close" onClick={() => setModalOpen(false)}>×</button>
            </div>
            <div className="admin-modal-body">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div className="admin-form-group">
                  <label>Tahun *</label>
                  <input type="text" value={form.tahun} onChange={e => setForm({ ...form, tahun: e.target.value })} placeholder="1983" />
                </div>
                <div className="admin-form-group">
                  <label>Urutan Tampil</label>
                  <input type="number" value={form.urutan} onChange={e => setForm({ ...form, urutan: parseInt(e.target.value) || 0 })} placeholder="1" min={0} />
                </div>
              </div>
              <div className="admin-form-group">
                <label>Judul Milestone *</label>
                <input type="text" value={form.judul} onChange={e => setForm({ ...form, judul: e.target.value })} placeholder="Cikal Bakal: Madrasah Tsanawiyah" />
              </div>
              <div className="admin-form-group">
                <label>Deskripsi</label>
                <textarea value={form.deskripsi} onChange={e => setForm({ ...form, deskripsi: e.target.value })} rows={4} placeholder="Ceritakan peristiwa penting pada tahun ini..." />
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="admin-btn admin-btn-secondary" onClick={() => setModalOpen(false)}>Batal</button>
              <button className="admin-btn admin-btn-primary" onClick={handleSave}>Simpan</button>
            </div>
          </div>
        </div>
      )}

      {deleteConfirm !== null && (
        <div className="admin-modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="admin-modal admin-modal-sm" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-body" style={{ textAlign: "center", padding: "32px" }}>
              <div style={{ fontSize: "3rem", marginBottom: 16 }}>🗑️</div>
              <h3>Hapus Milestone?</h3>
              <p style={{ color: "#6b7280", margin: "8px 0 24px" }}>Data yang dihapus tidak dapat dikembalikan.</p>
              <div className="admin-action-btns" style={{ justifyContent: "center" }}>
                <button className="admin-btn admin-btn-secondary" onClick={() => setDeleteConfirm(null)}>Batal</button>
                <button className="admin-btn admin-btn-danger" onClick={() => handleDelete(deleteConfirm)}>Ya, Hapus</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
