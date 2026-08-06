"use client";

import { sekolah } from "@/data/sekolah";
import Counter from "./Counter";
import {
  IconUsers,
  IconGraduation,
  IconBuilding,
  IconCalendar,
} from "./icons";

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

      {/* Main Hero Content - full width, text anchored to bottom-left */}
      <div className="hero-content-pb">
        <div className="hero-main-area">


          {/* Big heading */}
          <div className="hero-text-block">
            <h1 className="hero-title-pb">
              {sekolah.namaSingkat}
            </h1>
            <p className="hero-motto-pb">&ldquo;{sekolah.motto}&rdquo;</p>
          </div>
        </div>

        {/* Stats Strip at bottom */}
        <div className="hero-stats-strip">
          <div className="hero-stat-item">
            <div className="hero-stat-num"><Counter target={30} suffix="+" /></div>
            <div className="hero-stat-lbl">
              <IconUsers width={13} height={13} />
              Guru &amp; Staff
            </div>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat-item">
            <div className="hero-stat-num"><Counter target={103} suffix="+" /></div>
            <div className="hero-stat-lbl">
              <IconGraduation width={13} height={13} />
              Siswa Aktif
            </div>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat-item">
            <div className="hero-stat-num"><Counter target={6} /></div>
            <div className="hero-stat-lbl">
              <IconBuilding width={13} height={13} />
              Kelas
            </div>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat-item">
            <div className="hero-stat-num"><Counter target={1983} /></div>
            <div className="hero-stat-lbl">
              <IconCalendar width={13} height={13} />
              Tahun Berdiri
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
