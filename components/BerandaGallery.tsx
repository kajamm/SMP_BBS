"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IconInstagram } from "./icons";
import { getGaleri, type GalleryPhoto } from "@/lib/store";

export default function BerandaGallery() {
  const [galleryData, setGalleryData] = useState<GalleryPhoto[]>([]);

  useEffect(() => {
    setGalleryData(getGaleri().slice(0, 8));
  }, []);

  if (galleryData.length === 0) return null;

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
            <div className="ig-logo-placeholder">BBS</div>
          </div>
          <div className="ig-profile-info">
            <div className="ig-username-row">
              <h3 className="ig-username">Pesantren Sains dan Teknologi Darul Hikam</h3>
              <Link href="https://instagram.com/smpbabussalam" target="_blank" className="ig-follow-btn">
                <IconInstagram width={16} height={16} /> Follow
              </Link>
            </div>
            <p className="ig-handle">@smpbabussalam</p>
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
            <div key={item.id} className="ig-grid-item">
              <Image src={item.image} alt={item.caption || "Gallery image"} fill className="ig-image" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

