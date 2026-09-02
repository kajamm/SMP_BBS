"use client";

import { useEffect, useState, type FormEvent } from "react";
import ImageUpload from "@/components/ImageUpload";

interface TestimoniItem {
  id: number;
  name: string;
  title: string;
  quote: string;
  image: string;
}

const emptyForm = { name: "", title: "", quote: "", image: "" };

export default function AdminTestimoni() {
  const [items, setItems] = useState<TestimoniItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchTestimoni = async () => {
    try {
      const res = await fetch("/api/testimoni");
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
    fetchTestimoni();
  }, []);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (item: TestimoniItem) => {
    setEditingId(item.id);
    setForm({ name: item.name, title: item.title, quote: item.quote, image: item.image });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) return;
    
    try {
      if (editingId !== null) {
        await fetch("/api/testimoni", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingId, ...form }),
        });
      } else {
        await fetch("/api/testimoni", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      fetchTestimoni();
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/testimoni?id=${id}`, { method: "DELETE" });
      fetchTestimoni();
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
          <h2>Kelola Testimoni</h2>
          <p>Kelola testimoni siswa yang tampil di beranda.</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openAdd}>+ Tambah Testimoni</button>
      </div>

      {items.length === 0 ? (
        <div className="admin-empty">Belum ada testimoni. Klik &quot;Tambah Testimoni&quot; untuk memulai.</div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: 60 }}>Foto</th>
                <th>Nama</th>
                <th>Prestasi / Jabatan</th>
                <th>Quote</th>
                <th style={{ width: 140 }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img src={item.image || "https://placehold.co/150"} alt="" className="admin-table-avatar" />
                  </td>
                  <td><strong>{item.name}</strong></td>
                  <td style={{ fontSize: "0.85rem", color: "#6b7280" }}>{item.title}</td>
                  <td style={{ fontSize: "0.85rem", fontStyle: "italic" }}>&quot;{item.quote}&quot;</td>
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
              <h3>{editingId !== null ? "Edit Testimoni" : "Tambah Testimoni Baru"}</h3>
              <button className="admin-modal-close" onClick={() => setModalOpen(false)}>×</button>
            </div>
            <div className="admin-modal-body">
              <div className="admin-form-group">
                <label>Nama Siswa *</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nama lengkap siswa" />
              </div>
              <div className="admin-form-group">
                <label>Prestasi / Jabatan</label>
                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Contoh: Peraih Juara 1 Olimpiade" />
              </div>
              <div className="admin-form-group">
                <label>Quote / Kesan</label>
                <textarea value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} placeholder="Kesan dan pesan siswa..." rows={3} />
              </div>
              <div className="admin-form-group">
                <label>Foto</label>
                <ImageUpload value={form.image} onChange={(url) => setForm({ ...form, image: url })} />
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
              <h3>Hapus Testimoni?</h3>
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

