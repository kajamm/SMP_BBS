"use client";

import type { MouseEvent } from "react";
import { sekolah } from "@/data/sekolah";
import Counter from "./Counter";
import {
  IconStar,
  IconInfo,
  IconPhoneCall,
  IconUsers,
  IconGraduation,
  IconBuilding,
  IconCalendar,
  IconSchool,
  IconBadgeCheck,
  IconTrophy,
} from "./icons";

const scrollTo = (href: string) => (e: MouseEvent) => {
  e.preventDefault();
  const target = document.querySelector(href);
  if (target) {
    const offsetTop = (target as HTMLElement).offsetTop - 70;
    window.scrollTo({ top: offsetTop, behavior: "smooth" });
  }
};

export default function Hero() {
  return (
    <section id="home" aria-label="Beranda">
      <div className="hero-bg"></div>
      <div className="hero-bg-pattern"></div>

      <div className="hero-shapes" aria-hidden="true">
        <div className="hero-shape hero-shape-1"></div>
        <div className="hero-shape hero-shape-2"></div>
        <div className="hero-shape hero-shape-3"></div>
      </div>

      <div className="hero-content">
        <div>
          <div className="hero-badge fade-in">
            <IconStar />
            Sekolah Terakreditasi {sekolah.akreditasi}
          </div>

          <h1 className="hero-title fade-in fade-in-delay-1">
            Selamat Datang di
            <br />
            <span>
              SMP Plus
              <br />
              Babussalam
            </span>
          </h1>

          <p className="hero-motto fade-in fade-in-delay-2">&ldquo;{sekolah.motto}&rdquo;</p>

          <div className="hero-buttons fade-in fade-in-delay-3">
            <a href="#profil" className="btn-primary" onClick={scrollTo("#profil")}>
              <IconInfo />
              Tentang Kami
            </a>
            <a href="#kontak" className="btn-secondary" onClick={scrollTo("#kontak")}>
              <IconPhoneCall />
              Hubungi Kami
            </a>
          </div>

          <div className="hero-stats fade-in fade-in-delay-4">
            <div className="hero-stat-card">
              <div className="hero-stat-number">
                <Counter target={30} suffix="+" />
              </div>
              <div className="hero-stat-label">
                <IconUsers
                  width={12}
                  height={12}
                  style={{ display: "inline-block", marginRight: 4, verticalAlign: "middle" }}
                />
                Guru & Staff
              </div>
            </div>
            <div className="hero-stat-card">
              <div className="hero-stat-number">
                <Counter target={103} suffix="+" />
              </div>
              <div className="hero-stat-label">
                <IconGraduation
                  width={12}
                  height={12}
                  style={{ display: "inline-block", marginRight: 4, verticalAlign: "middle" }}
                />
                Siswa Aktif
              </div>
            </div>
            <div className="hero-stat-card">
              <div className="hero-stat-number">
                <Counter target={6} />
              </div>
              <div className="hero-stat-label">
                <IconBuilding
                  width={12}
                  height={12}
                  style={{ display: "inline-block", marginRight: 4, verticalAlign: "middle" }}
                />
                Rombel/Kelas
              </div>
            </div>
            <div className="hero-stat-card">
              <div className="hero-stat-number">
                <Counter target={1983} />
              </div>
              <div className="hero-stat-label">
                <IconCalendar
                  width={12}
                  height={12}
                  style={{ display: "inline-block", marginRight: 4, verticalAlign: "middle" }}
                />
                Tahun Berdiri
              </div>
            </div>
          </div>
        </div>

        <div className="hero-image-side fade-in-right fade-in-delay-2">
          <div className="hero-image-wrapper">
            <div className="hero-image-main">
              <div className="hero-image-placeholder">
                <IconSchool strokeWidth={1.5} />
                <p>{sekolah.namaSingkat}</p>
                <p style={{ fontSize: "0.75rem", opacity: 0.6 }}>Gedung Sekolah Modern</p>
              </div>
            </div>

            <div className="hero-badge-float hero-badge-float-1">
              <IconBadgeCheck />
              <div>
                <div className="hero-badge-float-text">Akreditasi {sekolah.akreditasi}</div>
                <div className="hero-badge-float-sub">BAN-S/M 2023</div>
              </div>
            </div>

            <div className="hero-badge-float hero-badge-float-2">
              <IconTrophy />
              <div>
                <div className="hero-badge-float-text">Sekolah Unggulan</div>
                <div className="hero-badge-float-sub">Sejak {sekolah.tahunBerdiri}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
