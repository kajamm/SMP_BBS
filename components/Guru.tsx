"use client";

import { useEffect, useRef } from "react";
import { guruList } from "@/data/guru";
import { IconUsers, IconEye, IconBook, IconGraduation } from "./icons";

export default function Guru() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }, i * 80);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="guru" aria-label="Data Guru">
      <div className="section-container">
        <div className="section-header centered fade-in">
          <div className="section-badge">
            <IconUsers />
            Tenaga Pendidik
          </div>
          <h2 className="section-title">Data Guru & Staff</h2>
          <p className="section-subtitle">
            Tenaga pendidik profesional dan berdedikasi yang siap membimbing dan menginspirasi
            setiap siswa.
          </p>
        </div>

        <div className="guru-grid">
          {guruList.map((guru, i) => (
            <div
              className="guru-card"
              tabIndex={0}
              aria-label={`Profil Guru: ${guru.nama}`}
              key={guru.nama}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              style={{
                opacity: 0,
                transform: "translateY(30px)",
                transition: "opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease",
              }}
            >
              <div className="guru-photo-wrapper">
                <div
                  className="guru-photo-placeholder"
                  style={{ background: guru.gradient }}
                >
                  {guru.initial}
                </div>
                <div className="guru-photo-overlay">
                  <IconEye />
                </div>
              </div>
              <div className="guru-info">
                <span className="guru-jabatan-badge">{guru.jabatan}</span>
                <h3 className="guru-name">{guru.nama}</h3>
                <p className="guru-mapel">
                  <IconBook />
                  {guru.mapel}
                </p>
                <p className="guru-pendidikan">
                  <IconGraduation />
                  {guru.pendidikan}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
