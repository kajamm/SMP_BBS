"use client";

import { useEffect, useState } from "react";
import ImageUpload from "@/components/ImageUpload";

interface FasilitasItem { id: number; nama: string; deskripsi: string; foto: string; kategori: string; }
const emptyForm = { nama: "", deskripsi: "", foto: "", kategori: "" };
const KATEGORI = ["Akademik", "Olahraga", "Ibadah", "Asrama", "Laboratorium", "Perpustakaan", "Umum"];

export default function AdminFasilitas() {
  const [items, setItems] = useState<FasilitasItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchFasilitas = async () => {
    const res = await fetch("/api/fasilitas");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { fetchFasilitas(); }, []);

  const openAdd = () => { setEditingId(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (item: FasilitasItem) => {
    setEditingId(item.id);
    setForm({ nama: item.nama, deskripsi: item.deskripsi || "", foto: item.foto || "", kategori: item.kategori || "" });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.nama.trim()) return;
    if (editingId !== null) {
      await fetch("/api/fasilitas", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editingId, ...form }) });
    } else {
      await fetch("/api/fasilitas", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    }
    fetchFasilitas();
    setModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/fasilitas?id=${id}`, { method: "DELETE" });
    fetchFasilitas();
    setDeleteConfirm(null);
  };

  if (loading) return <div className="admin-loading"><div className="admin-loading-spinner" /></div>;

  // Group by kategori
  const grouped = items.reduce<Record<string, FasilitasItem[]>>((acc, item) => {
    const k = item.kategori || "Umum";
    if (!acc[k]) acc[k] = [];
    acc[k].push(item);
    return acc;
  }, {});

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2>Fasilitas Sekolah</h2>
          <p>Kelola daftar fasilitas yang tersedia di sekolah.</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openAdd}>+ Tambah Fasilitas</button>
      </div>

      {items.length === 0 ? (
        <div className="admin-empty">Belum ada fasilitas. Klik &quot;Tambah Fasilitas&quot; untuk memulai.</div>
      ) : (
        Object.entries(grouped).map(([kategori, fasils]) => (
          <div key={kategori} style={{ marginBottom: 32 }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#374151", marginBottom: 16, borderBottom: "2px solid #e5e7eb", paddingBottom: 8 }}>{kategori}</h3>
            <div className="admin-gallery-grid">
              {fasils.map((item) => (
                <div key={item.id} className="admin-gallery-card">
                  <div className="admin-gallery-img-wrapper" style={{ background: "#f3f4f6" }}>
                    {item.foto
                      ? <img src={item.foto} alt={item.nama} />
                      : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem" }}>🏗️</div>
                    }
                  </div>
                  <div className="admin-gallery-card-body">
                    <p style={{ fontWeight: 700, color: "#111827", margin: "0 0 4px", fontSize: "0.95rem" }}>{item.nama}</p>
                    {item.deskripsi && <p style={{ fontSize: "0.8rem", color: "#6b7280", margin: "0 0 10px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{item.deskripsi}</p>}
                    <div className="admin-action-btns" style={{ flexWrap: "wrap" }}>
                      <button className="admin-btn admin-btn-sm admin-btn-secondary" style={{ flex: 1 }} onClick={() => openEdit(item)}>Edit</button>
                      <button className="admin-btn admin-btn-sm admin-btn-danger" style={{ flex: 1 }} onClick={() => setDeleteConfirm(item.id)}>Hapus</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}

      {modalOpen && (
        <div className="admin-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{editingId !== null ? "Edit Fasilitas" : "Tambah Fasilitas Baru"}</h3>
              <button className="admin-modal-close" onClick={() => setModalOpen(false)}>×</button>
            </div>
            <div className="admin-modal-body">
              <div className="admin-form-group">
                <label>Nama Fasilitas *</label>
                <input type="text" value={form.nama} onChange={e => setForm({ ...form, nama: e.target.value })} placeholder="Lab Sains, Masjid, Lapangan Futsal..." />
              </div>
              <div className="admin-form-group">
                <label>Kategori</label>
                <select value={form.kategori} onChange={e => setForm({ ...form, kategori: e.target.value })}>
                  <option value="">-- Pilih Kategori --</option>
                  {KATEGORI.map(k => <option key={k} value={k}>{k}</option>)}
                </select>
              </div>
              <div className="admin-form-group">
                <label>Deskripsi</label>
                <textarea value={form.deskripsi} onChange={e => setForm({ ...form, deskripsi: e.target.value })} rows={3} placeholder="Deskripsi singkat fasilitas..." />
              </div>
              <div className="admin-form-group">
                <label>Foto</label>
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
              <h3>Hapus Fasilitas?</h3>
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
