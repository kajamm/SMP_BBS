"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sekolah } from "@/data/sekolah";
import { IconInstagram, IconYoutube, IconTiktok, IconMapPin, IconMail, IconPhoneCall } from "./icons";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/profil", label: "Profil Sekolah" },
  { href: "/visi-misi", label: "Visi & Misi" },
  { href: "/sejarah", label: "Sejarah" },
  { href: "/guru", label: "Data Guru" },
  { href: "/galeri", label: "Galeri" },
  { href: "/kontak", label: "Kontak" },
];

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [identitas, setIdentitas] = useState<{
    logo_url?: string;
    nama_singkat?: string;
    inisial?: string;
  } | null>(null);

  useEffect(() => {
    fetch("/api/identitas", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setIdentitas(data);
        }
      })
      .catch(() => {});
  }, []);

  const logoSrc = (identitas?.logo_url && identitas.logo_url.trim()) || sekolah.logoUrl;
  const namaSingkat = (identitas?.nama_singkat && identitas.nama_singkat.trim()) || sekolah.namaSingkat;
  const inisial = (identitas?.inisial && identitas.inisial.trim()) || sekolah.inisial;

  return (
    <footer role="contentinfo">
      {/* CTA Banner */}
      {isHome && (
        <div className="footer-cta">
          <div className="footer-cta-inner">
            <div className="footer-cta-text">
              <h3 className="footer-cta-heading">Bergabung Bersama Kami!</h3>
              <p className="footer-cta-sub">Buka pintu masa depanmu di {namaSingkat}</p>
            </div>
            <Link href="/daftar" className="footer-cta-btn">
              Daftar Sekarang
            </Link>
          </div>
        </div>
      )}

      {/* Footer Main */}
      <div className="footer-main">
        {/* Top Row: Logo + Sosmed */}
        <div className="footer-top-row">
          <div className="footer-logo">
            {logoSrc ? (
              <img src={logoSrc} alt={`Logo ${namaSingkat}`}
                style={{ width: 44, height: 44, objectFit: "contain" }} />
            ) : (
              <div className="footer-logo-img">{inisial}</div>
            )}
            <div>
              <div className="footer-logo-text">{namaSingkat}</div>
              <div className="footer-logo-sub">Islamic Boarding School</div>
            </div>
          </div>

          <div className="footer-sosmed">
            <a href={sekolah.instagramUrl} target="_blank" rel="noopener noreferrer" className="footer-sosmed-btn" aria-label="Instagram">
              <IconInstagram />
            </a>
            <a href={sekolah.tiktokUrl} target="_blank" rel="noopener noreferrer" className="footer-sosmed-btn" aria-label="TikTok">
              <IconTiktok />
            </a>
            <a href={sekolah.youtubeUrl} target="_blank" rel="noopener noreferrer" className="footer-sosmed-btn" aria-label="YouTube">
              <IconYoutube />
            </a>
          </div>
        </div>

        <div className="footer-divider"></div>

        {/* Contact 3-columns */}
        <div className="footer-contact-row">
          <div className="footer-contact-item">
            <div className="footer-contact-icon">
              <IconMapPin />
            </div>
            <div>
              <div className="footer-contact-label">Address</div>
              <div className="footer-contact-value">{sekolah.alamat}</div>
            </div>
          </div>

          <div className="footer-contact-item">
            <div className="footer-contact-icon">
              <IconMail />
            </div>
            <div>
              <div className="footer-contact-label">E-Mail</div>
              <a href={`mailto:${sekolah.email}`} className="footer-contact-value footer-contact-link">
                {sekolah.email}
              </a>
            </div>
          </div>

          <div className="footer-contact-item">
            <div className="footer-contact-icon">
              <IconPhoneCall />
            </div>
            <div>
              <div className="footer-contact-label">Contact</div>
              <a href={`https://wa.me/${sekolah.whatsapp}`} target="_blank" rel="noopener noreferrer" className="footer-contact-value footer-contact-link">
                {sekolah.telepon}
              </a>
            </div>
          </div>
        </div>

        <div className="footer-divider"></div>

        {/* Bottom: Copyright */}
        <div className="footer-bottom-row">
          <p>
            {new Date().getFullYear()} &copy; {namaSingkat}. Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
