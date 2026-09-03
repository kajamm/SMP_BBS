"use client";

import { useEffect, useState } from "react";
import ImageUpload from "@/components/ImageUpload";

interface EkskulItem { id: number; nama: string; deskripsi: string; foto: string; pembina: string; }
const emptyForm = { nama: "", deskripsi: "", foto: "", pembina: "" };

export default function AdminEkskul() {
  const [items, setItems] = useState<EkskulItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchEkskul = async () => {
    const res = await fetch("/api/ekskul");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { fetchEkskul(); }, []);

  const openAdd = () => { setEditingId(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (item: EkskulItem) => {
    setEditingId(item.id);
    setForm({ nama: item.nama, deskripsi: item.deskripsi || "", foto: item.foto || "", pembina: item.pembina || "" });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.nama.trim()) return;
    if (editingId !== null) {
      await fetch("/api/ekskul", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editingId, ...form }) });
    } else {
      await fetch("/api/ekskul", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    }
    fetchEkskul();
    setModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/ekskul?id=${id}`, { method: "DELETE" });
    fetchEkskul();
    setDeleteConfirm(null);
  };

  if (loading) return <div className="admin-loading"><div className="admin-loading-spinner" /></div>;

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2>Ekstrakurikuler</h2>
          <p>Kelola daftar kegiatan ekstrakurikuler sekolah.</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openAdd}>+ Tambah Ekskul</button>
      </div>

      {items.length === 0 ? (
        <div className="admin-empty">Belum ada ekskul. Klik &quot;Tambah Ekskul&quot; untuk memulai.</div>
      ) : (
        <div className="admin-gallery-grid">
          {items.map((item) => (
            <div key={item.id} className="admin-gallery-card">
              <div className="admin-gallery-img-wrapper" style={{ background: "#f3f4f6" }}>
                {item.foto
                  ? <img src={item.foto} alt={item.nama} />
                  : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem" }}>⚽</div>
                }
              </div>
              <div className="admin-gallery-card-body">
                <p style={{ fontWeight: 700, color: "#111827", margin: "0 0 4px", fontSize: "0.95rem" }}>{item.nama}</p>
                {item.pembina && <p style={{ fontSize: "0.78rem", color: "#007A43", margin: "0 0 6px" }}>Pembina: {item.pembina}</p>}
                {item.deskripsi && <p style={{ fontSize: "0.8rem", color: "#6b7280", margin: "0 0 10px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{item.deskripsi}</p>}
                <div className="admin-action-btns" style={{ flexWrap: "wrap" }}>
                  <button className="admin-btn admin-btn-sm admin-btn-secondary" style={{ flex: 1 }} onClick={() => openEdit(item)}>Edit</button>
                  <button className="admin-btn admin-btn-sm admin-btn-danger" style={{ flex: 1 }} onClick={() => setDeleteConfirm(item.id)}>Hapus</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="admin-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{editingId !== null ? "Edit Ekskul" : "Tambah Ekskul Baru"}</h3>
              <button className="admin-modal-close" onClick={() => setModalOpen(false)}>×</button>
            </div>
            <div className="admin-modal-body">
              <div className="admin-form-group">
                <label>Nama Ekskul *</label>
                <input type="text" value={form.nama} onChange={e => setForm({ ...form, nama: e.target.value })} placeholder="Pramuka, Futsal, Robotika, dll." />
              </div>
              <div className="admin-form-group">
                <label>Pembina</label>
                <input type="text" value={form.pembina} onChange={e => setForm({ ...form, pembina: e.target.value })} placeholder="Nama pembina ekskul" />
              </div>
              <div className="admin-form-group">
                <label>Deskripsi</label>
                <textarea value={form.deskripsi} onChange={e => setForm({ ...form, deskripsi: e.target.value })} rows={3} placeholder="Deskripsi singkat kegiatan ekskul..." />
              </div>
              <div className="admin-form-group">
                <label>Foto Ekskul</label>
                <ImageUpload value={form.foto} onChange={url => setForm({ ...form, foto: url })} />
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
              <h3>Hapus Ekskul?</h3>
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
