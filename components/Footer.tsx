import type { MouseEvent } from "react";
import { sekolah } from "@/data/sekolah";
import { IconFacebook, IconInstagram, IconYoutube } from "./icons";

const navLinks = [
  { href: "#home", label: "Beranda" },
  { href: "#profil", label: "Profil Sekolah" },
  { href: "#visi-misi", label: "Visi & Misi" },
  { href: "#sejarah", label: "Sejarah" },
  { href: "#guru", label: "Data Guru" },
  { href: "#galeri", label: "Galeri" },
  { href: "#kontak", label: "Kontak" },
];

const scrollTo = (href: string) => (e: MouseEvent) => {
  e.preventDefault();
  const target = document.querySelector(href);
  if (target) {
    const offsetTop = (target as HTMLElement).offsetTop - 70;
    window.scrollTo({ top: offsetTop, behavior: "smooth" });
  }
};

export default function Footer() {
  return (
    <footer role="contentinfo">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="footer-logo-img">{sekolah.inisial}</div>
            <div>
              <div className="footer-logo-text">{sekolah.namaSingkat}</div>
              <div className="footer-logo-sub">NPSN: {sekolah.npsn}</div>
            </div>
          </div>
          <p className="footer-desc">
            Sekolah unggulan yang berdedikasi mencetak generasi cerdas, berkarakter, dan berdaya
            saing global sejak tahun {sekolah.tahunBerdiri}.
          </p>
          <div className="footer-sosmed">
            <a href="#" className="footer-sosmed-btn" aria-label="Facebook">
              <IconFacebook />
            </a>
            <a href="#" className="footer-sosmed-btn" aria-label="Instagram">
              <IconInstagram />
            </a>
            <a href="#" className="footer-sosmed-btn" aria-label="YouTube">
              <IconYoutube />
            </a>
          </div>
        </div>

        <div>
          <h4 className="footer-links-title">Navigasi</h4>
          <ul className="footer-links-list" role="list">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="footer-link" onClick={scrollTo(l.href)}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="footer-links-title">Info Kontak</h4>
          <ul className="footer-links-list" role="list">
            <li>
              <a href="https://instagram.com" className="footer-link">
                {sekolah.instagram}
              </a>
            </li>
            <li>
              <a href={`mailto:${sekolah.email}`} className="footer-link">
                {sekolah.email}
              </a>
            </li>
            <li>
              <a href="#kontak" className="footer-link" onClick={scrollTo("#kontak")}>
                {sekolah.website}
              </a>
            </li>
            <li>
              <span
                className="footer-link"
                style={{ cursor: "default", transform: "none", color: "var(--accent)", fontWeight: "bold" }}
              >
                Info Rekening:
              </span>
            </li>
            <li>
              <span
                className="footer-link"
                style={{ cursor: "default", transform: "none", fontSize: "0.875rem" }}
              >
                {sekolah.rekening.bank}
                <br />
                Rek: {sekolah.rekening.nomor}
                <br />
                a.n. {sekolah.rekening.atasNama}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © <span id="current-year">{new Date().getFullYear()}</span> {sekolah.namaSingkat}. Hak
          Cipta Dilindungi. | Dibuat dengan ❤️ untuk Pendidikan Indonesia
        </p>
      </div>
    </footer>
  );
}
