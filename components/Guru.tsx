"use client";

import { useEffect, useRef } from "react";
import { guruList } from "@/data/guru";
import { IconUsers, IconBook } from "./icons";

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
                if (el) cardRefs.current[i] = el;
              }}
              style={{
                opacity: 0,
                transform: "translateY(30px)",
                transition: "opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                borderTop: "4px solid var(--accent)",
                background: "var(--white)",
              }}
            >
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "var(--primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--accent)",
                marginBottom: "4px",
                boxShadow: "0 4px 12px rgba(0,122,67,0.15)"
              }}>
                <IconUsers />
              </div>
              <h3 className="guru-name" style={{ fontSize: '1.125rem', marginBottom: 0, color: 'var(--text)', fontWeight: 800 }}>{guru.nama}</h3>
              <p className="guru-mapel" style={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <IconBook />
                {guru.mapel}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
