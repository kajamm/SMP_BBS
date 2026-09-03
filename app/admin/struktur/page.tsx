"use client";

import { useEffect, useState } from "react";
import ImageUpload from "@/components/ImageUpload";

interface OfficialItem {
  id: number;
  nama: string;
  jabatan: string;
  kategori: string;
  urutan: number;
  foto?: string;
}

const emptyForm = {
  nama: "",
  jabatan: "",
  kategori: "Pimpinan Utama",
  urutan: 1,
};

export default function AdminStruktur() {
  const [activeTab, setActiveTab] = useState<"bagan" | "pejabat">("bagan");
  const [loading, setLoading] = useState(true);

  // Bagan State
  const [baganUrl, setBaganUrl] = useState("");
  const [baganKeterangan, setBaganKeterangan] = useState("");
  const [savingBagan, setSavingBagan] = useState(false);
  const [baganSavedMsg, setBaganSavedMsg] = useState(false);

  // Pejabat State
  const [pejabatList, setPejabatList] = useState<OfficialItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/struktur", { cache: "no-store" });
      if (!res.ok) throw new Error("Gagal mengambil data struktur");
      const data = await res.json();

      if (data.bagan) {
        setBaganUrl(data.bagan.bagan_url || "");
        setBaganKeterangan(data.bagan.keterangan || "");
      }

      setPejabatList(Array.isArray(data.pengurus) ? data.pengurus : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveBagan = async () => {
    setSavingBagan(true);
    try {
      const res = await fetch("/api/struktur", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "save_bagan",
          bagan_url: baganUrl,
          keterangan: baganKeterangan,
        }),
      });
      if (res.ok) {
        setBaganSavedMsg(true);
        setTimeout(() => setBaganSavedMsg(false), 3000);
      }
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan bagan struktur");
    } finally {
      setSavingBagan(false);
    }
  };

  const openAdd = () => {
    setEditingId(null);
    setForm({
      nama: "",
      jabatan: "",
      kategori: "Pimpinan Utama",
      urutan: pejabatList.length + 1,
    });
    setModalOpen(true);
  };

  const openEdit = (item: OfficialItem) => {
    setEditingId(item.id);
    setForm({
      nama: item.nama,
      jabatan: item.jabatan,
      kategori: item.kategori || "Pimpinan Utama",
      urutan: item.urutan || 1,
    });
    setModalOpen(true);
  };

  const handleSavePejabat = async () => {
    if (!form.nama.trim() || !form.jabatan.trim()) {
      alert("Nama dan Jabatan harus diisi.");
      return;
    }

    try {
      if (editingId !== null) {
        await fetch("/api/struktur", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingId, ...form }),
        });
      } else {
        await fetch("/api/struktur", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      fetchData();
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menyimpan data pejabat.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/struktur?id=${id}`, { method: "DELETE" });
      fetchData();
      setDeleteConfirm(null);
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus data.");
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
          <h2>Struktur Organisasi</h2>
          <p>Kelola gambar bagan alur organisasi dan daftar pejabat pimpinan sekolah.</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          borderBottom: "1px solid var(--border, #e5e7eb)",
          marginBottom: "24px",
        }}
      >
        <button
          type="button"
          onClick={() => setActiveTab("bagan")}
          style={{
            padding: "10px 20px",
            fontSize: "0.95rem",
            fontWeight: 600,
            border: "none",
            background: "none",
            cursor: "pointer",
            borderBottom: activeTab === "bagan" ? "3px solid #16a34a" : "3px solid transparent",
            color: activeTab === "bagan" ? "#16a34a" : "#6b7280",
            transition: "all 0.2s",
          }}
        >
          🖼️ Bagan / Gambar Struktur
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("pejabat")}
          style={{
            padding: "10px 20px",
            fontSize: "0.95rem",
            fontWeight: 600,
            border: "none",
            background: "none",
            cursor: "pointer",
            borderBottom: activeTab === "pejabat" ? "3px solid #16a34a" : "3px solid transparent",
            color: activeTab === "pejabat" ? "#16a34a" : "#6b7280",
            transition: "all 0.2s",
          }}
        >
          👥 Daftar Jajaran Pejabat ({pejabatList.length})
        </button>
      </div>

      {/* TAB 1: BAGAN STRUKTUR */}
      {activeTab === "bagan" && (
        <div
          style={{
            background: "var(--card-bg, #ffffff)",
            padding: "28px",
            borderRadius: "16px",
            border: "1px solid var(--border, #e5e7eb)",
            maxWidth: "800px",
          }}
        >
          <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "8px", color: "var(--text)" }}>
            Bagan Struktur Organisasi
          </h3>
          <p style={{ fontSize: "0.88rem", color: "#6b7280", marginBottom: "20px" }}>
            Upload gambar diagram bagan alur organisasi sekolah (format JPG, PNG, atau WebP).
          </p>

          <div className="admin-form-group" style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "8px" }}>
              Upload Gambar Bagan
            </label>
            <ImageUpload value={baganUrl} onChange={(url) => setBaganUrl(url)} />
          </div>

          <div className="admin-form-group" style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontWeight: 600, marginBottom: "8px" }}>
              Keterangan / Deskripsi Bagan
            </label>
            <textarea
              rows={3}
              value={baganKeterangan}
              onChange={(e) => setBaganKeterangan(e.target.value)}
              placeholder="Contoh: Bagan Struktur Organisasi dan Tata Kerja SMP Plus Babussalam Periode 2024-2028."
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

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              type="button"
              className="admin-btn admin-btn-primary"
              onClick={handleSaveBagan}
              disabled={savingBagan}
            >
              {savingBagan ? "Menyimpan..." : "Simpan Bagan"}
            </button>

            {baganSavedMsg && (
              <span style={{ color: "#16a34a", fontSize: "0.9rem", fontWeight: 600 }}>
                ✓ Bagan berhasil disimpan!
              </span>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: DAFTAR PEJABAT */}
      {activeTab === "pejabat" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <p style={{ color: "#6b7280", fontSize: "0.9rem", margin: 0 }}>
              Daftar pejabat ini akan ditampilkan dalam bentuk kartu hierarki di halaman Struktur Organisasi.
            </p>
            <button className="admin-btn admin-btn-primary" onClick={openAdd}>
              + Tambah Pejabat
            </button>
          </div>

          {pejabatList.length === 0 ? (
            <div className="admin-empty">
              Belum ada data pejabat. Klik &quot;+ Tambah Pejabat&quot; untuk menambahkan pimpinan / pengelola sekolah.
            </div>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th style={{ width: 60 }}>No</th>
                    <th>Nama Pejabat</th>
                    <th>Jabatan</th>
                    <th>Kategori</th>
                    <th style={{ width: 140 }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {pejabatList.map((item, idx) => (
                    <tr key={item.id}>
                      <td style={{ textAlign: "center", fontWeight: 600, color: "#6b7280" }}>
                        {item.urutan || idx + 1}
                      </td>
                      <td>
                        <strong>{item.nama}</strong>
                      </td>
                      <td>
                        <span style={{ color: "#111827", fontWeight: 600 }}>{item.jabatan}</span>
                      </td>
                      <td>
                        <span
                          style={{
                            fontSize: "0.78rem",
                            fontWeight: 600,
                            padding: "3px 8px",
                            borderRadius: "6px",
                            backgroundColor:
                              item.kategori === "Pimpinan Utama"
                                ? "#fef3c7"
                                : item.kategori === "Komite Sekolah"
                                ? "#e0e7ff"
                                : "#f0fdf4",
                            color:
                              item.kategori === "Pimpinan Utama"
                                ? "#92400e"
                                : item.kategori === "Komite Sekolah"
                                ? "#3730a3"
                                : "#166534",
                          }}
                        >
                          {item.kategori}
                        </span>
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
        </div>
      )}

      {/* Modal Add / Edit Pejabat */}
      {modalOpen && (
        <div className="admin-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{editingId !== null ? "Edit Data Pejabat" : "Tambah Pejabat Baru"}</h3>
              <button className="admin-modal-close" onClick={() => setModalOpen(false)}>
                ×
              </button>
            </div>
            <div className="admin-modal-body">
              <div className="admin-form-group">
                <label>Nama Lengkap *</label>
                <input
                  type="text"
                  value={form.nama}
                  onChange={(e) => setForm({ ...form, nama: e.target.value })}
                  placeholder="Contoh: Drs. H. Ahmad Fauzi, M.Pd"
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Jabatan *</label>
                <input
                  type="text"
                  value={form.jabatan}
                  onChange={(e) => setForm({ ...form, jabatan: e.target.value })}
                  placeholder="Contoh: Kepala Sekolah / Waka Kurikulum"
                  required
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "16px" }}>
                <div className="admin-form-group">
                  <label>Kategori / Level Hierarki</label>
                  <select
                    value={form.kategori}
                    onChange={(e) => setForm({ ...form, kategori: e.target.value })}
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
                  >
                    <option value="Pimpinan Utama">Pimpinan Utama</option>
                    <option value="Komite Sekolah">Komite Sekolah / Pembina</option>
                    <option value="Wakil Kepala Sekolah">Wakil Kepala Sekolah</option>
                    <option value="Tata Usaha & Staf">Tata Usaha &amp; Staf</option>
                    <option value="Koordinator Bidang">Koordinator Bidang / BP BK</option>
                  </select>
                </div>

                <div className="admin-form-group">
                  <label>Urutan</label>
                  <input
                    type="number"
                    value={form.urutan}
                    onChange={(e) => setForm({ ...form, urutan: Number(e.target.value) })}
                    min={1}
                  />
                </div>
              </div>
            </div>

            <div className="admin-modal-footer">
              <button className="admin-btn admin-btn-secondary" onClick={() => setModalOpen(false)}>
                Batal
              </button>
              <button className="admin-btn admin-btn-primary" onClick={handleSavePejabat}>
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Delete Confirmation */}
      {deleteConfirm !== null && (
        <div className="admin-modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="admin-modal admin-modal-sm" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-body" style={{ textAlign: "center", padding: "32px" }}>
              <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🗑️</div>
              <h3>Hapus Pejabat?</h3>
              <p style={{ color: "#6b7280", margin: "8px 0 24px" }}>
                Data pejabat ini akan dihapus dari struktur organisasi.
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
