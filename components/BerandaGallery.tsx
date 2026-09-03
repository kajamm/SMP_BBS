"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IconInstagram } from "./icons";
import { getGaleri, type GalleryPhoto } from "@/lib/store";

export default function BerandaGallery() {
  const [galleryData, setGalleryData] = useState<GalleryPhoto[]>([]);
  const [identitas, setIdentitas] = useState<{ nama_lengkap?: string; logo_url?: string } | null>(null);
  const [pengaturan, setPengaturan] = useState<{ instagram?: string; instagramUrl?: string } | null>(null);

  useEffect(() => {
    fetch("/api/galeri", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setGalleryData(data.slice(0, 8));
        } else {
          setGalleryData(getGaleri().slice(0, 8));
        }
      })
      .catch(() => setGalleryData(getGaleri().slice(0, 8)));

    fetch("/api/identitas", { cache: "no-store" })
      .then((res) => res.json())
      .then((d) => {
        if (d && !d.error) setIdentitas(d);
      })
      .catch(() => {});

    fetch("/api/pengaturan", { cache: "no-store" })
      .then((res) => res.json())
      .then((d) => {
        if (d && !d.error) setPengaturan(d);
      })
      .catch(() => {});
  }, []);

  if (galleryData.length === 0) return null;

  const namaSekolah = identitas?.nama_lengkap || "SMP Plus Babussalam Bandung";
  const igHandleRaw = pengaturan?.instagram || "smpbabussalam";
  const igHandle = igHandleRaw.startsWith("@") ? igHandleRaw : `@${igHandleRaw}`;
  const igUrl = pengaturan?.instagramUrl || `https://instagram.com/${igHandleRaw.replace(/^@/, "")}`;
  const logoUrl = identitas?.logo_url;

  return (
    <section id="gallery" className="section-container" style={{ padding: "80px 24px", background: "var(--bg-alt)" }}>
      <div className="section-header centered fade-in">
        <h2 className="section-title" style={{ color: "var(--primary)", fontSize: "2.5rem" }}>Gallery</h2>
        <p className="section-subtitle" style={{ maxWidth: "800px", margin: "0 auto", color: "var(--text)" }}>
          &quot;Setiap moment adalah berharga, maka selama kita bersama akan terus terwujud kebahagiaan&quot;
        </p>
      </div>

      <div className="gallery-container fade-in-up">
        {/* Instagram Header Mockup */}
        <div className="ig-header">
          <div className="ig-profile-pic">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="Logo Sekolah"
                style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "50%" }}
              />
            ) : (
              <div className="ig-logo-placeholder">BBS</div>
            )}
          </div>
          <div className="ig-profile-info">
            <div className="ig-username-row">
              <h3 className="ig-username">{namaSekolah}</h3>
              <Link href={igUrl} target="_blank" rel="noopener noreferrer" className="ig-follow-btn">
                <IconInstagram width={16} height={16} /> Follow
              </Link>
            </div>
            <p className="ig-handle">{igHandle}</p>
            <div className="ig-stats">
              <div className="ig-stat"><strong>932</strong> Posts</div>
              <div className="ig-stat"><strong>3.2K</strong> Followers</div>
              <div className="ig-stat"><strong>696</strong> Following</div>
            </div>
          </div>
        </div>

        {/* Instagram Grid */}
        <div className="ig-grid">
          {galleryData.map((item) => (
            <div key={item.id} className="ig-grid-item" style={{ position: "relative", overflow: "hidden" }}>
              <img
                src={item.image}
                alt={item.caption || "Gallery image"}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
