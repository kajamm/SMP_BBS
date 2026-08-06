"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sekolah } from "@/data/sekolah";
import { IconMoon, IconSun } from "./icons";

type NavItem = {
  href?: string;
  label: string;
  emoji: string;
  shortLabel?: string;
  subItems?: { href: string; label: string }[];
};

const navItems: NavItem[] = [
  { href: "/", label: "Beranda", emoji: "🏠" },
  {
    label: "Tentang Kami",
    emoji: "🏫",
    shortLabel: "Tentang Kami",
    subItems: [
      { href: "/profil", label: "Profil Sekolah" },
      { href: "/visi-misi", label: "Visi & Misi" },
      { href: "/sejarah", label: "Sejarah" },
      { href: "/struktur", label: "Struktur Organisasi" },
      { href: "/guru", label: "Daftar Guru" },
    ]
  },
  {
    label: "Program",
    emoji: "🎯",
    subItems: [
      { href: "/ekstrakurikuler", label: "Program Ekstrakurikuler/Klub" },
      { href: "/wali-kelas", label: "Tugas dan Fungsi Wali Kelas" },
    ]
  },
  { href: "/galeri", label: "Galeri", emoji: "🖼️" },
  { href: "/kontak", label: "Kontak", emoji: "📞" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(!isHome);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Restore dark mode preference
  useEffect(() => {
    const savedDark = localStorage.getItem("dark-mode") === "true";
    if (savedDark) {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  // Scroll handler — on sub-pages, always stay "scrolled"
  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }

    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // Close menu when clicking outside
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !hamburgerRef.current?.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, [menuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const toggleDark = useCallback(() => {
    const isDark = !dark;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("dark-mode", String(isDark));
  }, [dark]);

  return (
    <>
      <nav
        id="navbar"
        className={scrolled ? "scrolled" : "top"}
        role="navigation"
        aria-label="Navigasi utama"
      >
        <div className="nav-container">
          <Link href="/" className="nav-logo">
            {sekolah.logoUrl ? (
              <img
                src={sekolah.logoUrl}
                alt={`Logo ${sekolah.namaSingkat}`}
                style={{ width: 40, height: 40, objectFit: "contain" }}
              />
            ) : (
              <div className="nav-logo-img">{sekolah.inisial}</div>
            )}
            <div>
              <div style={{ fontSize: "0.9375rem", fontWeight: 700, lineHeight: 1.2 }}>
                {sekolah.namaSingkat}
              </div>
            </div>
          </Link>

          <ul className="nav-menu" role="menubar">
            {navItems.map((item) => {
              if (item.subItems) {
                const isActive = item.subItems.some(sub => pathname.startsWith(sub.href));
                return (
                  <li role="none" key={item.label} className="nav-dropdown">
                    <button className={`nav-dropdown-btn ${isActive ? "active" : ""}`} aria-haspopup="true" aria-expanded="false">
                      {item.shortLabel ?? item.label}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </button>
                    <div className="nav-dropdown-menu">
                      {item.subItems.map(sub => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className={`nav-dropdown-item ${pathname.startsWith(sub.href) ? "active" : ""}`}
                          role="menuitem"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </li>
                );
              }

              const isActive = item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href!);
              return (
                <li role="none" key={item.href}>
                  <Link
                    href={item.href!}
                    className={`nav-link ${isActive ? "active" : ""}`}
                    role="menuitem"
                  >
                    {item.shortLabel ?? item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="nav-actions">

            <Link href="/daftar" className="nav-cta-btn">
              Penerimaan Siswa Baru
            </Link>

            <button
              id="hamburger"
              ref={hamburgerRef}
              className={menuOpen ? "open" : ""}
              aria-label="Buka menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
        </div>
      </nav>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={menuOpen ? "open" : ""}
        role="dialog"
        aria-label="Menu navigasi mobile"
      >
        <ul>
          {navItems.map((item) => {
            if (item.subItems) {
               return (
                 <li key={item.label} style={{display: "flex", flexDirection: "column"}}>
                   <div style={{fontWeight: 600, color: "var(--text)", padding: "10px 0", fontSize: "0.9375rem"}}>
                     {item.emoji} {item.label}
                   </div>
                   <div style={{display: "flex", flexDirection: "column", paddingLeft: "24px", gap: "8px", borderLeft: "2px solid var(--border)", marginLeft: "12px", marginBottom: "8px"}}>
                      {item.subItems.map(sub => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className={`mobile-nav-link ${pathname.startsWith(sub.href) ? "active" : ""}`}
                          style={{padding: "6px 0", fontSize: "0.875rem"}}
                        >
                          {sub.label}
                        </Link>
                      ))}
                   </div>
                 </li>
               );
            }
            const isActive = item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href!);
            return (
              <li key={item.href}>
                <Link
                  href={item.href!}
                  className={`mobile-nav-link ${isActive ? "active" : ""}`}
                >
                  {item.emoji} {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
