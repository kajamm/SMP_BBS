"use client";

import { useEffect, useState } from "react";
import ImageUpload from "@/components/ImageUpload";

interface BeritaItem {
  id: number;
  title: string;
  date: string;
  image: string;
  excerpt: string;
}

const emptyForm = { title: "", date: "", image: "", excerpt: "" };

export default function AdminBerita() {
  const [items, setItems] = useState<BeritaItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchBerita = async () => {
    try {
      const res = await fetch("/api/berita");
      if (!res.ok) throw new Error("Gagal mengambil data");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBerita();
  }, []);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (item: BeritaItem) => {
    setEditingId(item.id);
    setForm({ title: item.title, date: item.date, image: item.image, excerpt: item.excerpt });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim()) return;
    
    try {
      if (editingId !== null) {
        await fetch("/api/berita", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingId, ...form }),
        });
      } else {
        await fetch("/api/berita", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      fetchBerita();
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/berita?id=${id}`, { method: "DELETE" });
      fetchBerita();
      setDeleteConfirm(null);
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menghapus data.");
    }
  };

  if (loading) return <div className="admin-loading"><div className="admin-loading-spinner"></div></div>;

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2>Kelola Berita</h2>
          <p>Tambah, edit, atau hapus berita sekolah.</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openAdd}>+ Tambah Berita</button>
      </div>

      {items.length === 0 ? (
        <div className="admin-empty">Belum ada berita. Klik &quot;Tambah Berita&quot; untuk memulai.</div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: 80 }}>Gambar</th>
                <th>Judul</th>
                <th style={{ width: 120 }}>Tanggal</th>
                <th style={{ width: 140 }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img src={item.image || "https://placehold.co/150"} alt={item.title} className="admin-table-img" style={{ width: 64, height: 48 }} />
                  </td>
                  <td>
                    <strong>{item.title}</strong>
                    <br />
                    <small style={{ color: "#6b7280" }}>{item.excerpt?.substring(0, 60)}...</small>
                  </td>
                  <td>{item.date}</td>
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

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="admin-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{editingId !== null ? "Edit Berita" : "Tambah Berita Baru"}</h3>
              <button className="admin-modal-close" onClick={() => setModalOpen(false)}>×</button>
            </div>
            <div className="admin-modal-body">
              <div className="admin-form-group">
                <label>Judul Berita *</label>
                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Masukkan judul berita" />
              </div>
              <div className="admin-form-group">
                <label>Tanggal</label>
                <input type="text" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} placeholder="Contoh: 28/11/2025" />
              </div>
              <div className="admin-form-group">
                <label>Gambar</label>
                <ImageUpload value={form.image} onChange={(url) => setForm({ ...form, image: url })} />
              </div>
              <div className="admin-form-group">
                <label>Ringkasan / Excerpt</label>
                <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} placeholder="Deskripsi singkat berita..." rows={3} />
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="admin-btn admin-btn-secondary" onClick={() => setModalOpen(false)}>Batal</button>
              <button className="admin-btn admin-btn-primary" onClick={handleSave}>Simpan</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm !== null && (
        <div className="admin-modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="admin-modal admin-modal-sm" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-body" style={{ textAlign: "center", padding: "32px" }}>
              <div style={{ fontSize: "3rem", marginBottom: 16 }}>🗑️</div>
              <h3>Hapus Berita?</h3>
              <p style={{ color: "#6b7280", margin: "8px 0 24px" }}>Berita yang dihapus tidak dapat dikembalikan.</p>
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

