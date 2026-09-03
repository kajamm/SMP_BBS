"use client";

import { useEffect, useState } from "react";

interface TugasItem {
  id: number;
  judul: string;
  deskripsi: string;
  urutan: number;
}

const emptyForm = { judul: "", deskripsi: "", urutan: 1 };

export default function AdminWaliKelas() {
  const [items, setItems] = useState<TugasItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchTugas = async () => {
    try {
      const res = await fetch("/api/wali-kelas", { cache: "no-store" });
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
    fetchTugas();
  }, []);

  const openAdd = () => {
    setEditingId(null);
    setForm({
      judul: "",
      deskripsi: "",
      urutan: items.length + 1,
    });
    setModalOpen(true);
  };

  const openEdit = (item: TugasItem) => {
    setEditingId(item.id);
    setForm({
      judul: item.judul,
      deskripsi: item.deskripsi,
      urutan: item.urutan || 1,
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.judul.trim() || !form.deskripsi.trim()) {
      alert("Judul dan Deskripsi wajib diisi.");
      return;
    }

    try {
      if (editingId !== null) {
        await fetch("/api/wali-kelas", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingId, ...form }),
        });
      } else {
        await fetch("/api/wali-kelas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      fetchTugas();
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/wali-kelas?id=${id}`, { method: "DELETE" });
      fetchTugas();
      setDeleteConfirm(null);
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menghapus data.");
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-loading-spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2>Tugas &amp; Fungsi Wali Kelas</h2>
          <p>Kelola butir-butir tugas pokok dan fungsi pembinaan wali kelas di website sekolah.</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openAdd}>
          + Tambah Tugas
        </button>
      </div>

      {items.length === 0 ? (
        <div className="admin-empty">Belum ada data tugas wali kelas. Klik &quot;+ Tambah Tugas&quot; untuk memulai.</div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: 60, textAlign: "center" }}>No</th>
                <th style={{ width: 260 }}>Tugas &amp; Fungsi</th>
                <th>Deskripsi Rincian</th>
                <th style={{ width: 140 }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={item.id}>
                  <td style={{ textAlign: "center", fontWeight: 700, color: "#16a34a" }}>
                    {item.urutan || idx + 1}
                  </td>
                  <td>
                    <strong style={{ fontSize: "0.95rem", color: "#111827" }}>{item.judul}</strong>
                  </td>
                  <td>
                    <p style={{ margin: 0, color: "#4b5563", fontSize: "0.9rem", lineHeight: 1.5 }}>
                      {item.deskripsi}
                    </p>
                  </td>
                  <td>
                    <div className="admin-action-btns">
                      <button
                        className="admin-btn admin-btn-sm admin-btn-secondary"
                        onClick={() => openEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="admin-btn admin-btn-sm admin-btn-danger"
                        onClick={() => setDeleteConfirm(item.id)}
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Add/Edit */}
      {modalOpen && (
        <div className="admin-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{editingId !== null ? "Edit Tugas Wali Kelas" : "Tambah Tugas Wali Kelas"}</h3>
              <button className="admin-modal-close" onClick={() => setModalOpen(false)}>
                ×
              </button>
            </div>
            <div className="admin-modal-body">
              <div className="admin-form-group">
                <label>Judul Tugas &amp; Fungsi *</label>
                <input
                  type="text"
                  value={form.judul}
                  onChange={(e) => setForm({ ...form, judul: e.target.value })}
                  placeholder="Contoh: Pengelolaan Kelas"
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Deskripsi / Rincian Tanggung Jawab *</label>
                <textarea
                  rows={4}
                  value={form.deskripsi}
                  onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
                  placeholder="Contoh: Mengelola kelas yang menjadi tanggung jawabnya secara aktif dan berkesinambungan."
                  required
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1px solid var(--border, #d1d5db)",
                    background: "var(--bg, #ffffff)",
                    color: "var(--text)",
                    outline: "none",
                    fontSize: "0.95rem",
                  }}
                />
              </div>

              <div className="admin-form-group" style={{ maxWidth: 160 }}>
                <label>Nomor Urut</label>
                <input
                  type="number"
                  value={form.urutan}
                  onChange={(e) => setForm({ ...form, urutan: Number(e.target.value) })}
                  min={1}
                />
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="admin-btn admin-btn-secondary" onClick={() => setModalOpen(false)}>
                Batal
              </button>
              <button className="admin-btn admin-btn-primary" onClick={handleSave}>
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm !== null && (
        <div className="admin-modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="admin-modal admin-modal-sm" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-body" style={{ textAlign: "center", padding: "32px" }}>
              <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🗑️</div>
              <h3>Hapus Tugas Ini?</h3>
              <p style={{ color: "#6b7280", margin: "8px 0 24px" }}>
                Poin tugas dan fungsi ini akan dihapus dari daftar.
              </p>
              <div className="admin-action-btns" style={{ justifyContent: "center" }}>
                <button className="admin-btn admin-btn-secondary" onClick={() => setDeleteConfirm(null)}>
                  Batal
                </button>
                <button
                  className="admin-btn admin-btn-danger"
                  onClick={() => handleDelete(deleteConfirm)}
                >
                  Ya, Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
