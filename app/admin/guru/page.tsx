"use client";

import { useEffect, useState } from "react";
import ImageUpload from "@/components/ImageUpload";

interface GuruItem {
  id: number;
  nama: string;
  mapel: string;
  foto?: string;
  jabatan?: string;
  pendidikan?: string;
}

const emptyForm = { nama: "", mapel: "", foto: "", jabatan: "", pendidikan: "" };

export default function AdminGuru() {
  const [items, setItems] = useState<GuruItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchGuru = async () => {
    try {
      const res = await fetch("/api/guru");
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
    fetchGuru();
  }, []);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (item: GuruItem) => {
    setEditingId(item.id);
    setForm({ 
      nama: item.nama, 
      mapel: item.mapel,
      foto: item.foto || "",
      jabatan: item.jabatan || "",
      pendidikan: item.pendidikan || ""
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.nama.trim()) return;
    
    try {
      if (editingId !== null) {
        await fetch("/api/guru", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingId, ...form }),
        });
      } else {
        await fetch("/api/guru", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      fetchGuru();
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/guru?id=${id}`, { method: "DELETE" });
      fetchGuru();
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
          <h2>Kelola Data Guru</h2>
          <p>Tambah, edit, atau hapus data guru dan staf pengajar.</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openAdd}>+ Tambah Guru</button>
      </div>

      {items.length === 0 ? (
        <div className="admin-empty">Belum ada data guru. Klik &quot;Tambah Guru&quot; untuk memulai.</div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: 60 }}>Foto</th>
                <th>Nama Guru</th>
                <th>Jabatan / Pelajaran</th>
                <th style={{ width: 140 }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    {item.foto
                      ? <img src={item.foto} alt="" style={{ width: 44, height: 44, objectFit: "cover", borderRadius: 8 }} />
                      : <div style={{ width: 44, height: 44, background: "#f3f4f6", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>👤</div>
                    }
                  </td>
                  <td>
                    <strong>{item.nama}</strong>
                    {item.pendidikan && <div style={{ fontSize: "0.8rem", color: "#6b7280", marginTop: 2 }}>{item.pendidikan}</div>}
                  </td>
                  <td>
                    {item.jabatan && <div style={{ fontWeight: 600, color: "#111827", fontSize: "0.85rem" }}>{item.jabatan}</div>}
                    <div style={{ color: "#6b7280", fontSize: "0.85rem" }}>{item.mapel}</div>
                  </td>
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
              <h3>{editingId !== null ? "Edit Data Guru" : "Tambah Guru Baru"}</h3>
              <button className="admin-modal-close" onClick={() => setModalOpen(false)}>×</button>
            </div>
            <div className="admin-modal-body">
              <div className="admin-form-group">
                <label>Nama Lengkap *</label>
                <input type="text" value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} placeholder="Contoh: H. Ahmad, S.Pd" />
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div className="admin-form-group">
                  <label>Mata Pelajaran *</label>
                  <input type="text" value={form.mapel} onChange={(e) => setForm({ ...form, mapel: e.target.value })} placeholder="Guru Matematika" />
                </div>
                <div className="admin-form-group">
                  <label>Jabatan (Opsional)</label>
                  <input type="text" value={form.jabatan} onChange={(e) => setForm({ ...form, jabatan: e.target.value })} placeholder="Wali Kelas 7A" />
                </div>
              </div>

              <div className="admin-form-group">
                <label>Pendidikan Terakhir (Opsional)</label>
                <input type="text" value={form.pendidikan} onChange={(e) => setForm({ ...form, pendidikan: e.target.value })} placeholder="S1 Pendidikan Matematika UPI" />
              </div>

              <div className="admin-form-group">
                <label>Foto (Opsional)</label>
                <ImageUpload value={form.foto} onChange={(url) => setForm({ ...form, foto: url })} />
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
              <h3>Hapus Data Guru?</h3>
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
