"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    berita: 0,
    galeri: 0,
    guru: 0,
    testimoni: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [berita, galeri, guru, testimoni] = await Promise.all([
          fetch("/api/berita").then(res => res.json()),
          fetch("/api/galeri").then(res => res.json()),
          fetch("/api/guru").then(res => res.json()),
          fetch("/api/testimoni").then(res => res.json()),
        ]);

        setStats({
          berita: berita.length || 0,
          galeri: galeri.length || 0,
          guru: guru.length || 0,
          testimoni: testimoni.length || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2>Dashboard</h2>
          <p>Selamat datang di panel admin SMP Plus Babussalam.</p>
        </div>
      </div>

      <div className="admin-stats-grid">
        <Link href="/admin/berita" className="admin-stat-card" style={{ borderTopColor: "#3b82f6" }}>
          <div className="admin-stat-icon" style={{ background: "#3b82f618", color: "#3b82f6" }}>📰</div>
          <div className="admin-stat-info">
            <div className="admin-stat-count">{loading ? "..." : stats.berita}</div>
            <div className="admin-stat-label">Berita</div>
          </div>
        </Link>
        <Link href="/admin/galeri" className="admin-stat-card" style={{ borderTopColor: "#8b5cf6" }}>
          <div className="admin-stat-icon" style={{ background: "#8b5cf618", color: "#8b5cf6" }}>🖼️</div>
          <div className="admin-stat-info">
            <div className="admin-stat-count">{loading ? "..." : stats.galeri}</div>
            <div className="admin-stat-label">Foto Galeri</div>
          </div>
        </Link>
        <Link href="/admin/guru" className="admin-stat-card" style={{ borderTopColor: "#10b981" }}>
          <div className="admin-stat-icon" style={{ background: "#10b98118", color: "#10b981" }}>👨‍🏫</div>
          <div className="admin-stat-info">
            <div className="admin-stat-count">{loading ? "..." : stats.guru}</div>
            <div className="admin-stat-label">Data Guru</div>
          </div>
        </Link>
        <Link href="/admin/testimoni" className="admin-stat-card" style={{ borderTopColor: "#f59e0b" }}>
          <div className="admin-stat-icon" style={{ background: "#f59e0b18", color: "#f59e0b" }}>💬</div>
          <div className="admin-stat-info">
            <div className="admin-stat-count">{loading ? "..." : stats.testimoni}</div>
            <div className="admin-stat-label">Testimoni</div>
          </div>
        </Link>
      </div>

      <div className="admin-quick-actions">
        <h3>Aksi Cepat</h3>
        <div className="admin-quick-grid">
          <Link href="/admin/berita" className="admin-quick-card">
            <span>📝</span>
            <span>Tambah Berita Baru</span>
          </Link>
          <Link href="/admin/galeri" className="admin-quick-card">
            <span>📷</span>
            <span>Upload Foto Galeri</span>
          </Link>
          <Link href="/admin/pengaturan" className="admin-quick-card">
            <span>⚙️</span>
            <span>Update Pengaturan</span>
          </Link>
          <a href="/" target="_blank" rel="noopener noreferrer" className="admin-quick-card">
            <span>🌐</span>
            <span>Lihat Website</span>
          </a>
        </div>
      </div>
    </div>
  );
}
