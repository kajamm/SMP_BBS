"use client";

import Image from "next/image";
import Link from "next/link";
import { IconInstagram } from "./icons";

const galleryData = [
  { id: 1, image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=400&auto=format&fit=crop" },
  { id: 2, image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=400&auto=format&fit=crop" },
  { id: 3, image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=400&auto=format&fit=crop" },
  { id: 4, image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400&auto=format&fit=crop" },
  { id: 5, image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=400&auto=format&fit=crop" },
  { id: 6, image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=400&auto=format&fit=crop" },
  { id: 7, image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=400&auto=format&fit=crop" },
  { id: 8, image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=400&auto=format&fit=crop" },
];

export default function BerandaGallery() {
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
              <Image src={item.image} alt="Gallery image" fill className="ig-image" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
