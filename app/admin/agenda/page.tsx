"use client";

import { useEffect, useState } from "react";

interface AgendaItem { id: number; judul: string; tanggal_mulai: string; tanggal_selesai?: string; deskripsi: string; kategori: string; }
const emptyForm = { judul: "", tanggal_mulai: "", tanggal_selesai: "", deskripsi: "", kategori: "" };

const KATEGORI_OPTIONS = ["Akademik", "Ujian", "Kegiatan Sekolah", "Libur", "PPDB", "Ekskul", "Lainnya"];

const formatTanggal = (dateStr: string) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
};

export default function AdminAgenda() {
  const [items, setItems] = useState<AgendaItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAgenda = async () => {
    const res = await fetch("/api/agenda");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { fetchAgenda(); }, []);

  const openAdd = () => { setEditingId(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (item: AgendaItem) => {
    setEditingId(item.id);
    setForm({
      judul: item.judul, tanggal_mulai: item.tanggal_mulai?.split("T")[0] || "",
      tanggal_selesai: item.tanggal_selesai?.split("T")[0] || "",
      deskripsi: item.deskripsi || "", kategori: item.kategori || "",
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.judul.trim() || !form.tanggal_mulai) return;
    const body = { ...form, tanggal_selesai: form.tanggal_selesai || null };
    if (editingId !== null) {
      await fetch("/api/agenda", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editingId, ...body }) });
    } else {
      await fetch("/api/agenda", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    }
    fetchAgenda();
    setModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/agenda?id=${id}`, { method: "DELETE" });
    fetchAgenda();
    setDeleteConfirm(null);
  };

  const kategoriColor: Record<string, { bg: string; color: string }> = {
    "Akademik": { bg: "#dbeafe", color: "#1d4ed8" },
    "Ujian": { bg: "#fef3c7", color: "#b45309" },
    "Kegiatan Sekolah": { bg: "#d1fae5", color: "#065f46" },
    "Libur": { bg: "#fee2e2", color: "#b91c1c" },
    "PPDB": { bg: "#ede9fe", color: "#6d28d9" },
    "Ekskul": { bg: "#fce7f3", color: "#9d174d" },
    "Lainnya": { bg: "#f3f4f6", color: "#374151" },
  };

  if (loading) return <div className="admin-loading"><div className="admin-loading-spinner" /></div>;

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2>Agenda Sekolah</h2>
          <p>Kelola kalender kegiatan dan agenda sekolah.</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openAdd}>+ Tambah Agenda</button>
      </div>

      {items.length === 0 ? (
        <div className="admin-empty">Belum ada agenda. Klik &quot;Tambah Agenda&quot; untuk memulai.</div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Judul</th>
                <th style={{ width: 160 }}>Tanggal Mulai</th>
                <th style={{ width: 160 }}>Tanggal Selesai</th>
                <th style={{ width: 130 }}>Kategori</th>
                <th style={{ width: 140 }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const c = kategoriColor[item.kategori] || kategoriColor["Lainnya"];
                return (
                  <tr key={item.id}>
                    <td>
                      <strong>{item.judul}</strong>
                      {item.deskripsi && <div style={{ fontSize: "0.8rem", color: "#6b7280", marginTop: 2 }}>{item.deskripsi.substring(0, 60)}{item.deskripsi.length > 60 ? "..." : ""}</div>}
                    </td>
                    <td style={{ fontSize: "0.87rem" }}>{formatTanggal(item.tanggal_mulai)}</td>
                    <td style={{ fontSize: "0.87rem", color: "#6b7280" }}>{item.tanggal_selesai ? formatTanggal(item.tanggal_selesai) : "—"}</td>
                    <td>
                      {item.kategori && (
                        <span style={{ padding: "2px 10px", borderRadius: 20, fontSize: "0.78rem", fontWeight: 600, background: c.bg, color: c.color }}>
                          {item.kategori}
                        </span>
                      )}
                    </td>
                    <td>
                      <div className="admin-action-btns">
                        <button className="admin-btn admin-btn-sm admin-btn-secondary" onClick={() => openEdit(item)}>Edit</button>
                        <button className="admin-btn admin-btn-sm admin-btn-danger" onClick={() => setDeleteConfirm(item.id)}>Hapus</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && (
        <div className="admin-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{editingId !== null ? "Edit Agenda" : "Tambah Agenda Baru"}</h3>
              <button className="admin-modal-close" onClick={() => setModalOpen(false)}>×</button>
            </div>
            <div className="admin-modal-body">
              <div className="admin-form-group">
                <label>Judul Kegiatan *</label>
                <input type="text" value={form.judul} onChange={e => setForm({ ...form, judul: e.target.value })} placeholder="Ujian Tengah Semester Ganjil" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div className="admin-form-group">
                  <label>Tanggal Mulai *</label>
                  <input type="date" value={form.tanggal_mulai} onChange={e => setForm({ ...form, tanggal_mulai: e.target.value })} />
                </div>
                <div className="admin-form-group">
                  <label>Tanggal Selesai (opsional)</label>
                  <input type="date" value={form.tanggal_selesai} onChange={e => setForm({ ...form, tanggal_selesai: e.target.value })} />
                </div>
              </div>
              <div className="admin-form-group">
                <label>Kategori</label>
                <select value={form.kategori} onChange={e => setForm({ ...form, kategori: e.target.value })}>
                  <option value="">-- Pilih Kategori --</option>
                  {KATEGORI_OPTIONS.map(k => <option key={k} value={k}>{k}</option>)}
                </select>
              </div>
              <div className="admin-form-group">
                <label>Deskripsi (opsional)</label>
                <textarea value={form.deskripsi} onChange={e => setForm({ ...form, deskripsi: e.target.value })} rows={3} placeholder="Keterangan tambahan kegiatan..." />
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
              <h3>Hapus Agenda?</h3>
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
