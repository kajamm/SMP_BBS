"use client";

import { useEffect, useState } from "react";
import ImageUpload from "@/components/ImageUpload";

interface GalleryPhoto {
  id: number;
  image: string;
  caption: string;
}

const emptyForm = { image: "", caption: "" };

export default function AdminGaleri() {
  const [items, setItems] = useState<GalleryPhoto[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchGaleri = async () => {
    try {
      const res = await fetch("/api/galeri");
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
    fetchGaleri();
  }, []);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (item: GalleryPhoto) => {
    setEditingId(item.id);
    setForm({ image: item.image, caption: item.caption || "" });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.image.trim()) return;
    
    try {
      if (editingId !== null) {
        await fetch("/api/galeri", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingId, ...form }),
        });
      } else {
        await fetch("/api/galeri", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      fetchGaleri();
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/galeri?id=${id}`, { method: "DELETE" });
      fetchGaleri();
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
          <h2>Kelola Galeri</h2>
          <p>Kelola foto-foto yang tampil di galeri website.</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openAdd}>+ Tambah Foto</button>
      </div>

      {items.length === 0 ? (
        <div className="admin-empty">Belum ada foto. Klik &quot;Tambah Foto&quot; untuk memulai.</div>
      ) : (
        <div className="admin-gallery-grid">
          {items.map((item) => (
            <div key={item.id} className="admin-gallery-card">
              <div className="admin-gallery-img-wrapper">
                <img src={item.image} alt={item.caption || "Gallery"} />
              </div>
              <div className="admin-gallery-card-body">
                <p className="admin-gallery-caption">{item.caption || "Tanpa caption"}</p>
                <div className="admin-action-btns">
                  <button className="admin-btn admin-btn-sm admin-btn-secondary" onClick={() => openEdit(item)}>Edit</button>
                  <button className="admin-btn admin-btn-sm admin-btn-danger" onClick={() => setDeleteConfirm(item.id)}>Hapus</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="admin-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{editingId !== null ? "Edit Foto" : "Tambah Foto Baru"}</h3>
              <button className="admin-modal-close" onClick={() => setModalOpen(false)}>×</button>
            </div>
            <div className="admin-modal-body">
              <div className="admin-form-group">
                <label>Gambar *</label>
                <ImageUpload value={form.image} onChange={(url) => setForm({ ...form, image: url })} />
              </div>
              <div className="admin-form-group">
                <label>Caption</label>
                <input type="text" value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })} placeholder="Keterangan foto" />
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
              <h3>Hapus Foto?</h3>
              <p style={{ color: "#6b7280", margin: "8px 0 24px" }}>Foto yang dihapus tidak dapat dikembalikan.</p>
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

