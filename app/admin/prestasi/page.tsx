"use client";

import { useEffect, useState } from "react";
import ImageUpload from "@/components/ImageUpload";

interface PrestasiItem { id: number; nama: string; kategori: "siswa" | "sekolah"; keterangan: string; tahun: string; foto: string; }
const emptyForm = { nama: "", kategori: "siswa" as const, keterangan: "", tahun: "", foto: "" };

export default function AdminPrestasi() {
  const [items, setItems] = useState<PrestasiItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"semua" | "siswa" | "sekolah">("semua");

  const fetchPrestasi = async () => {
    const res = await fetch("/api/prestasi");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { fetchPrestasi(); }, []);

  const openAdd = () => { setEditingId(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (item: PrestasiItem) => {
    setEditingId(item.id);
    setForm({ nama: item.nama, kategori: item.kategori, keterangan: item.keterangan || "", tahun: item.tahun || "", foto: item.foto || "" });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.nama.trim()) return;
    if (editingId !== null) {
      await fetch("/api/prestasi", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editingId, ...form }) });
    } else {
      await fetch("/api/prestasi", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    }
    fetchPrestasi();
    setModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/prestasi?id=${id}`, { method: "DELETE" });
    fetchPrestasi();
    setDeleteConfirm(null);
  };

  const filtered = items.filter(i => filter === "semua" || i.kategori === filter);

  if (loading) return <div className="admin-loading"><div className="admin-loading-spinner" /></div>;

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2>Kelola Prestasi</h2>
          <p>Tampilkan prestasi terbaik siswa dan sekolah.</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openAdd}>+ Tambah Prestasi</button>
      </div>

      {/* Filter */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {(["semua", "siswa", "sekolah"] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`admin-btn admin-btn-sm ${filter === f ? "admin-btn-primary" : "admin-btn-secondary"}`} style={{ textTransform: "capitalize" }}>{f}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="admin-empty">Belum ada prestasi. Klik &quot;Tambah Prestasi&quot; untuk memulai.</div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: 60 }}>Foto</th>
                <th>Nama Prestasi</th>
                <th style={{ width: 100 }}>Kategori</th>
                <th style={{ width: 80 }}>Tahun</th>
                <th style={{ width: 140 }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td>
                    {item.foto
                      ? <img src={item.foto} alt="" style={{ width: 44, height: 44, objectFit: "cover", borderRadius: 8 }} />
                      : <div style={{ width: 44, height: 44, background: "#f3f4f6", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>🏆</div>
                    }
                  </td>
                  <td>
                    <strong>{item.nama}</strong>
                    {item.keterangan && <div style={{ fontSize: "0.8rem", color: "#6b7280", marginTop: 2 }}>{item.keterangan}</div>}
                  </td>
                  <td>
                    <span style={{ padding: "2px 10px", borderRadius: 20, fontSize: "0.78rem", fontWeight: 600, background: item.kategori === "siswa" ? "#dbeafe" : "#d1fae5", color: item.kategori === "siswa" ? "#1d4ed8" : "#065f46" }}>
                      {item.kategori}
                    </span>
                  </td>
                  <td style={{ color: "#6b7280" }}>{item.tahun || "—"}</td>
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
              <h3>{editingId !== null ? "Edit Prestasi" : "Tambah Prestasi Baru"}</h3>
              <button className="admin-modal-close" onClick={() => setModalOpen(false)}>×</button>
            </div>
            <div className="admin-modal-body">
              <div className="admin-form-group">
                <label>Nama Prestasi *</label>
                <input type="text" value={form.nama} onChange={e => setForm({ ...form, nama: e.target.value })} placeholder="Juara 1 OSN Matematika Tingkat Provinsi" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div className="admin-form-group">
                  <label>Kategori</label>
                  <select value={form.kategori} onChange={e => setForm({ ...form, kategori: e.target.value as "siswa" | "sekolah" })}>
                    <option value="siswa">Siswa</option>
                    <option value="sekolah">Sekolah</option>
                  </select>
                </div>
                <div className="admin-form-group">
                  <label>Tahun</label>
                  <input type="text" value={form.tahun} onChange={e => setForm({ ...form, tahun: e.target.value })} placeholder="2025" />
                </div>
              </div>
              <div className="admin-form-group">
                <label>Keterangan / Detail</label>
                <textarea value={form.keterangan} onChange={e => setForm({ ...form, keterangan: e.target.value })} rows={3} placeholder="Diraih oleh Ahmad Fauzi, siswa kelas IX..." />
              </div>
              <div className="admin-form-group">
                <label>Foto (opsional)</label>
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
              <h3>Hapus Prestasi?</h3>
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
