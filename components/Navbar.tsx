"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { sekolah } from "@/data/sekolah";
import { IconMoon, IconSun } from "./icons";

const navItems = [
  { href: "#home", label: "Beranda", emoji: "🏠" },
  { href: "#profil", label: "Profil Sekolah", emoji: "🏫", shortLabel: "Profil" },
  { href: "#visi-misi", label: "Visi & Misi", emoji: "🎯" },
  { href: "#sejarah", label: "Sejarah", emoji: "📜" },
  { href: "#guru", label: "Data Guru", emoji: "👨‍🏫", shortLabel: "Guru" },
  { href: "#galeri", label: "Galeri", emoji: "🖼️" },
  { href: "#kontak", label: "Kontak", emoji: "📞" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const savedDark = localStorage.getItem("dark-mode") === "true";
    if (savedDark) {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("section[id]"));

    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      let current = "home";
      sections.forEach((section) => {
        const el = section as HTMLElement;
        const top = el.offsetTop - 100;
        const height = el.offsetHeight;
        if (window.scrollY >= top && window.scrollY < top + height) {
          current = el.id;
        }
      });
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const scrollToSection = useCallback((href: string) => {
    const target = document.querySelector(href);
    if (target) {
      const offsetTop = (target as HTMLElement).offsetTop - 70;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
    setMenuOpen(false);
  }, []);

  const toggleDark = () => {
    const isDark = !dark;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("dark-mode", String(isDark));
  };

  return (
    <>
      <nav
        id="navbar"
        className={scrolled ? "scrolled" : "top"}
        role="navigation"
        aria-label="Navigasi utama"
      >
        <div className="nav-container">
          <a
            href="#home"
            className="nav-logo"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#home");
            }}
          >
            {sekolah.logoUrl ? (
              <img src={sekolah.logoUrl} alt={`Logo ${sekolah.namaSingkat}`} style={{ width: 40, height: 40, objectFit: "contain" }} />
            ) : (
              <div className="nav-logo-img">{sekolah.inisial}</div>
            )}
            <div>
              <div style={{ fontSize: "0.9375rem", fontWeight: 700, lineHeight: 1.2 }}>
                {sekolah.namaSingkat}
              </div>
            </div>
          </a>

          <ul className="nav-menu" role="menubar">
            {navItems.map((item) => (
              <li role="none" key={item.href}>
                <a
                  href={item.href}
                  className={`nav-link ${active === item.href.slice(1) ? "active" : ""}`}
                  role="menuitem"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                >
                  {item.shortLabel ?? item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <button
              id="dark-toggle"
              aria-label="Ganti tema gelap/terang"
              title="Toggle dark mode"
              onClick={toggleDark}
            >
              {dark ? <IconSun /> : <IconMoon />}
            </button>

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
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`mobile-nav-link ${active === item.href.slice(1) ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
              >
                {item.emoji} {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
