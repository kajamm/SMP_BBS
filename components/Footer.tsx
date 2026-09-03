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

  const [pengaturan, setPengaturan] = useState<{
    telepon?: string;
    email?: string;
    whatsapp?: string;
    alamat?: string;
    instagramUrl?: string;
    tiktokUrl?: string;
    youtubeUrl?: string;
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

    fetch("/api/pengaturan", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setPengaturan(data);
        }
      })
      .catch(() => {});
  }, []);

  const logoSrc = (identitas?.logo_url && identitas.logo_url.trim()) || sekolah.logoUrl;
  const namaSingkat = (identitas?.nama_singkat && identitas.nama_singkat.trim()) || sekolah.namaSingkat;
  const inisial = (identitas?.inisial && identitas.inisial.trim()) || sekolah.inisial;

  const instagramUrl = (pengaturan?.instagramUrl && pengaturan.instagramUrl.trim()) || sekolah.instagramUrl;
  const tiktokUrl = (pengaturan?.tiktokUrl && pengaturan.tiktokUrl.trim()) || sekolah.tiktokUrl;
  const youtubeUrl = (pengaturan?.youtubeUrl && pengaturan.youtubeUrl.trim()) || sekolah.youtubeUrl;
  const alamat = (pengaturan?.alamat && pengaturan.alamat.trim()) || sekolah.alamat;
  const email = (pengaturan?.email && pengaturan.email.trim()) || sekolah.email;
  const telepon = (pengaturan?.telepon && pengaturan.telepon.trim()) || sekolah.telepon;
  const whatsapp = (pengaturan?.whatsapp && pengaturan.whatsapp.trim()) || sekolah.whatsapp;

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
                style={{ width: 44, height: 44, objectFit: "contain", borderRadius: "8px" }} />
            ) : (
              <div className="footer-logo-img">{inisial}</div>
            )}
            <div>
              <div className="footer-logo-text">{namaSingkat}</div>
              <div className="footer-logo-sub">Islamic Boarding School</div>
            </div>
          </div>

          <div className="footer-sosmed">
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="footer-sosmed-btn" aria-label="Instagram">
              <IconInstagram />
            </a>
            <a href={tiktokUrl} target="_blank" rel="noopener noreferrer" className="footer-sosmed-btn" aria-label="TikTok">
              <IconTiktok />
            </a>
            <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="footer-sosmed-btn" aria-label="YouTube">
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
              <div className="footer-contact-value">{alamat}</div>
            </div>
          </div>

          <div className="footer-contact-item">
            <div className="footer-contact-icon">
              <IconMail />
            </div>
            <div>
              <div className="footer-contact-label">E-Mail</div>
              <a href={`mailto:${email}`} className="footer-contact-value footer-contact-link">
                {email}
              </a>
            </div>
          </div>

          <div className="footer-contact-item">
            <div className="footer-contact-icon">
              <IconPhoneCall />
            </div>
            <div>
              <div className="footer-contact-label">Contact</div>
              <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="footer-contact-value footer-contact-link">
                {telepon}
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
