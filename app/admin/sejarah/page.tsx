"use client";

import { useEffect, useState } from "react";
import ImageUpload from "@/components/ImageUpload";

/* ─── TYPES ─────────────────────────────────────────── */
interface SejarahItem { id: number; tahun: string; judul: string; deskripsi: string; urutan: number; }
interface TokohItem { id: number; nama: string; jabatan: string; role: string; foto: string; deskripsi: string; urutan: number; }

const emptySejarah = { tahun: "", judul: "", deskripsi: "", urutan: 0 };
const emptyTokoh = { nama: "", jabatan: "", role: "pendiri", foto: "", deskripsi: "", urutan: 0 };

const roleOptions = [
  { value: "pendiri", label: "Pendiri Pesantren" },
  { value: "pimpinan", label: "Pimpinan Pondok" },
  { value: "ketua_yayasan", label: "Ketua Yayasan" },
];

const roleLabelMap: Record<string, string> = {
  pendiri: "Pendiri",
  pimpinan: "Pimpinan Pondok",
  ketua_yayasan: "Ketua Yayasan",
};

/* ─── ADMIN PAGE ──────────────────────────────────────── */
export default function AdminSejarah() {
  const [activeTab, setActiveTab] = useState<"sejarah" | "tokoh">("sejarah");

  // ── SEJARAH STATE ──
  const [items, setItems] = useState<SejarahItem[]>([]);
  const [sejarahModal, setSejarahModal] = useState(false);
  const [editingSejarahId, setEditingSejarahId] = useState<number | null>(null);
  const [sejarahForm, setSejarahForm] = useState(emptySejarah);
  const [deleteSejarahId, setDeleteSejarahId] = useState<number | null>(null);

  // ── TOKOH STATE ──
  const [tokohList, setTokohList] = useState<TokohItem[]>([]);
  const [tokohModal, setTokohModal] = useState(false);
  const [editingTokohId, setEditingTokohId] = useState<number | null>(null);
  const [tokohForm, setTokohForm] = useState(emptyTokoh);
  const [deleteTokohId, setDeleteTokohId] = useState<number | null>(null);

  const [loading, setLoading] = useState(true);

  /* ─── FETCH ─── */
  const fetchAll = async () => {
    const [s, t] = await Promise.all([
      fetch("/api/sejarah").then(r => r.json()),
      fetch("/api/tokoh").then(r => r.json()),
    ]);
    setItems(Array.isArray(s) ? s : []);
    setTokohList(Array.isArray(t) ? t : []);
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  /* ─── SEJARAH HANDLERS ─── */
  const openAddSejarah = () => { setEditingSejarahId(null); setSejarahForm(emptySejarah); setSejarahModal(true); };
  const openEditSejarah = (item: SejarahItem) => {
    setEditingSejarahId(item.id);
    setSejarahForm({ tahun: item.tahun, judul: item.judul, deskripsi: item.deskripsi || "", urutan: item.urutan || 0 });
    setSejarahModal(true);
  };
  const saveSejarah = async () => {
    if (!sejarahForm.tahun || !sejarahForm.judul) return;
    const method = editingSejarahId !== null ? "PUT" : "POST";
    const body = editingSejarahId !== null ? { id: editingSejarahId, ...sejarahForm } : sejarahForm;
    await fetch("/api/sejarah", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    fetchAll();
    setSejarahModal(false);
  };
  const deleteSejarah = async (id: number) => {
    await fetch(`/api/sejarah?id=${id}`, { method: "DELETE" });
    fetchAll();
    setDeleteSejarahId(null);
  };

  /* ─── TOKOH HANDLERS ─── */
  const openAddTokoh = () => { setEditingTokohId(null); setTokohForm(emptyTokoh); setTokohModal(true); };
  const openEditTokoh = (t: TokohItem) => {
    setEditingTokohId(t.id);
    setTokohForm({ nama: t.nama, jabatan: t.jabatan, role: t.role, foto: t.foto || "", deskripsi: t.deskripsi || "", urutan: t.urutan || 0 });
    setTokohModal(true);
  };
  const saveTokoh = async () => {
    if (!tokohForm.nama || !tokohForm.jabatan) return;
    const method = editingTokohId !== null ? "PUT" : "POST";
    const body = editingTokohId !== null ? { id: editingTokohId, ...tokohForm } : tokohForm;
    await fetch("/api/tokoh", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    fetchAll();
    setTokohModal(false);
  };
  const deleteTokoh = async (id: number) => {
    await fetch(`/api/tokoh?id=${id}`, { method: "DELETE" });
    fetchAll();
    setDeleteTokohId(null);
  };

  if (loading) return <div className="admin-loading"><div className="admin-loading-spinner" /></div>;

  return (
    <div>
      {/* ── PAGE HEADER ── */}
      <div className="admin-page-header">
        <div>
          <h2>Sejarah Sekolah</h2>
          <p>Kelola timeline sejarah dan foto tokoh pendiri/pimpinan pesantren.</p>
        </div>
        <button
          className="admin-btn admin-btn-primary"
          onClick={activeTab === "sejarah" ? openAddSejarah : openAddTokoh}
        >
          {activeTab === "sejarah" ? "+ Tambah Milestone" : "+ Tambah Tokoh"}
        </button>
      </div>

      {/* ── TABS ── */}
      <div style={{
        display: "flex",
        gap: "4px",
        borderBottom: "2px solid var(--border, #e5e7eb)",
        marginBottom: "28px",
      }}>
        {(["sejarah", "tokoh"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "10px 24px",
              fontSize: "0.9rem",
              fontWeight: 600,
              border: "none",
              background: "none",
              cursor: "pointer",
              borderBottom: activeTab === tab ? "2px solid #007A43" : "2px solid transparent",
              color: activeTab === tab ? "#007A43" : "#6b7280",
              marginBottom: "-2px",
              transition: "color 0.2s ease",
            }}
          >
            {tab === "sejarah" ? "📅 Timeline Sejarah" : "👤 Tokoh Pesantren"}
          </button>
        ))}
      </div>

      {/* ══════════════════════════════ TAB: SEJARAH ══════════════════════════════ */}
      {activeTab === "sejarah" && (
        <>
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
                          <button className="admin-btn admin-btn-sm admin-btn-secondary" onClick={() => openEditSejarah(item)}>Edit</button>
                          <button className="admin-btn admin-btn-sm admin-btn-danger" onClick={() => setDeleteSejarahId(item.id)}>Hapus</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* ══════════════════════════════ TAB: TOKOH ══════════════════════════════ */}
      {activeTab === "tokoh" && (
        <>
          {tokohList.length === 0 ? (
            <div className="admin-empty">Belum ada tokoh. Klik &quot;Tambah Tokoh&quot; untuk menambahkan foto pendiri/pimpinan.</div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
              {tokohList.map(t => (
                <div key={t.id} style={{
                  backgroundColor: "var(--card-bg, #ffffff)",
                  borderRadius: "16px",
                  border: "1px solid var(--border, #e5e7eb)",
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}>
                  {/* Foto Preview */}
                  <div style={{
                    width: "100%",
                    height: "160px",
                    backgroundColor: "#f8fafc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}>
                    {t.foto ? (
                      <img src={t.foto} alt={t.nama} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <span style={{ fontSize: "3rem", opacity: 0.3 }}>👤</span>
                    )}
                  </div>
                  <div style={{ padding: "16px" }}>
                    <span style={{
                      display: "inline-block",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      padding: "3px 10px",
                      borderRadius: "99px",
                      backgroundColor: "rgba(22, 163, 74, 0.1)",
                      color: "#15803d",
                      marginBottom: "8px",
                    }}>
                      {roleLabelMap[t.role] || t.role}
                    </span>
                    <div style={{ fontWeight: 700, color: "var(--text)", marginBottom: "4px" }}>{t.nama}</div>
                    <div style={{ fontSize: "0.85rem", color: "#6b7280", marginBottom: "12px" }}>{t.jabatan}</div>
                    <div className="admin-action-btns">
                      <button className="admin-btn admin-btn-sm admin-btn-secondary" onClick={() => openEditTokoh(t)}>Edit</button>
                      <button className="admin-btn admin-btn-sm admin-btn-danger" onClick={() => setDeleteTokohId(t.id)}>Hapus</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* ══════════════════════════════ MODALS: SEJARAH ══════════════════════════════ */}
      {sejarahModal && (
        <div className="admin-modal-overlay" onClick={() => setSejarahModal(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{editingSejarahId !== null ? "Edit Milestone" : "Tambah Milestone Baru"}</h3>
              <button className="admin-modal-close" onClick={() => setSejarahModal(false)}>×</button>
            </div>
            <div className="admin-modal-body">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div className="admin-form-group">
                  <label>Tahun *</label>
                  <input type="text" value={sejarahForm.tahun} onChange={e => setSejarahForm({ ...sejarahForm, tahun: e.target.value })} placeholder="1983" />
                </div>
                <div className="admin-form-group">
                  <label>Urutan Tampil</label>
                  <input type="number" value={sejarahForm.urutan} onChange={e => setSejarahForm({ ...sejarahForm, urutan: parseInt(e.target.value) || 0 })} placeholder="1" min={0} />
                </div>
              </div>
              <div className="admin-form-group">
                <label>Judul Milestone *</label>
                <input type="text" value={sejarahForm.judul} onChange={e => setSejarahForm({ ...sejarahForm, judul: e.target.value })} placeholder="Cikal Bakal: Madrasah Tsanawiyah" />
              </div>
              <div className="admin-form-group">
                <label>Deskripsi</label>
                <textarea value={sejarahForm.deskripsi} onChange={e => setSejarahForm({ ...sejarahForm, deskripsi: e.target.value })} rows={4} placeholder="Ceritakan peristiwa penting pada tahun ini..." />
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="admin-btn admin-btn-secondary" onClick={() => setSejarahModal(false)}>Batal</button>
              <button className="admin-btn admin-btn-primary" onClick={saveSejarah}>Simpan</button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════ MODALS: TOKOH ══════════════════════════════ */}
      {tokohModal && (
        <div className="admin-modal-overlay" onClick={() => setTokohModal(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{editingTokohId !== null ? "Edit Tokoh" : "Tambah Tokoh Baru"}</h3>
              <button className="admin-modal-close" onClick={() => setTokohModal(false)}>×</button>
            </div>
            <div className="admin-modal-body">
              <div className="admin-form-group">
                <label>Nama Lengkap *</label>
                <input type="text" value={tokohForm.nama} onChange={e => setTokohForm({ ...tokohForm, nama: e.target.value })} placeholder="KH. Drs. Muchtar Adam" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div className="admin-form-group">
                  <label>Role / Kedudukan *</label>
                  <select value={tokohForm.role} onChange={e => setTokohForm({ ...tokohForm, role: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #d1d5db", fontSize: "0.9rem", background: "#fff" }}>
                    {roleOptions.map(o => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
                <div className="admin-form-group">
                  <label>Urutan Tampil</label>
                  <input type="number" value={tokohForm.urutan} onChange={e => setTokohForm({ ...tokohForm, urutan: parseInt(e.target.value) || 0 })} placeholder="1" min={0} />
                </div>
              </div>
              <div className="admin-form-group">
                <label>Jabatan / Gelar</label>
                <input type="text" value={tokohForm.jabatan} onChange={e => setTokohForm({ ...tokohForm, jabatan: e.target.value })} placeholder="Mudir Ma'had / Pengasuh Pesantren" />
              </div>
              <div className="admin-form-group">
                <label>Foto</label>
                <ImageUpload value={tokohForm.foto} onChange={url => setTokohForm({ ...tokohForm, foto: url })} />
              </div>
              <div className="admin-form-group">
                <label>Deskripsi Singkat</label>
                <textarea value={tokohForm.deskripsi} onChange={e => setTokohForm({ ...tokohForm, deskripsi: e.target.value })} rows={3} placeholder="Biografi singkat atau peran tokoh..." />
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="admin-btn admin-btn-secondary" onClick={() => setTokohModal(false)}>Batal</button>
              <button className="admin-btn admin-btn-primary" onClick={saveTokoh}>Simpan</button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════ KONFIRMASI HAPUS ══════════════════════════════ */}
      {(deleteSejarahId !== null || deleteTokohId !== null) && (
        <div className="admin-modal-overlay" onClick={() => { setDeleteSejarahId(null); setDeleteTokohId(null); }}>
          <div className="admin-modal admin-modal-sm" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-body" style={{ textAlign: "center", padding: "32px" }}>
              <div style={{ fontSize: "3rem", marginBottom: 16 }}>🗑️</div>
              <h3>Hapus Data?</h3>
              <p style={{ color: "#6b7280", margin: "8px 0 24px" }}>Data yang dihapus tidak dapat dikembalikan.</p>
              <div className="admin-action-btns" style={{ justifyContent: "center" }}>
                <button className="admin-btn admin-btn-secondary" onClick={() => { setDeleteSejarahId(null); setDeleteTokohId(null); }}>Batal</button>
                <button className="admin-btn admin-btn-danger" onClick={() => {
                  if (deleteSejarahId !== null) deleteSejarah(deleteSejarahId);
                  if (deleteTokohId !== null) deleteTokoh(deleteTokohId);
                }}>Ya, Hapus</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
