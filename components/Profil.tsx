"use client";

import { useEffect, useState } from "react";
import {
  IconBuilding,
  IconAward,
  IconInfo,
  IconSchool,
  IconCheckCircle,
  IconGrid,
  IconMapPin,
  IconMail,
  IconGlobe,
  IconCalendar,
  IconInstagram,
} from "./icons";

export default function Profil() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/identitas", { cache: "no-store" })
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch(console.error);
  }, []);

  if (!data) return null;

  const items = [
    { icon: <IconSchool />, label: "Nama Sekolah", value: data.nama_lengkap },
    { icon: <IconCheckCircle />, label: "Status Sekolah", value: data.status_sekolah },
    { icon: <IconGrid />, label: "NPSN", value: data.npsn },
    {
      icon: <IconAward />,
      label: "Akreditasi",
      value: `${data.akreditasi} — ${data.akreditasi_sk}`,
    },
    // We didn't add alamat to identitas schema, so let's skip or hardcode
    // { icon: <IconMapPin />, label: "Alamat Lengkap", value: "Jl. Babakan Nusantara...", full: true },
    { icon: <IconGlobe />, label: "Website", value: data.website },
    { icon: <IconCalendar />, label: "SK Pendirian", value: data.sk_pendirian },
  ];

  return (
    <section id="profil" aria-label="Profil Sekolah">
      <div className="section-container">
        <div className="section-header fade-in">
          <div className="section-badge">
            <IconBuilding />
            Profil Sekolah
          </div>
          <h2 className="section-title">Identitas Sekolah</h2>
          <p className="section-subtitle">
            Informasi lengkap mengenai {data.nama_singkat} sebagai lembaga pendidikan formal
            tingkat menengah pertama.
          </p>
        </div>

        <div className="profil-grid">
          <div className="profil-logo-card fade-in-left">
            {data.logo_url ? (
              <img
                src={data.logo_url}
                alt={`Logo ${data.nama_singkat}`}
                style={{
                  width: 130,
                  height: 130,
                  objectFit: "contain",
                  display: "block",
                  margin: "0 auto 1.25rem auto",
                  borderRadius: "16px",
                  boxShadow: "0 6px 18px rgba(0, 0, 0, 0.08)",
                }}
              />
            ) : (
              <div className="profil-logo-wrapper">{data.inisial}</div>
            )}
            <h3 className="profil-school-name">{data.nama_singkat}</h3>
            <p className="profil-school-sub">
              Sekolah Menengah Pertama
              <br />
            </p>
            <div className="profil-akreditasi-badge">
              <IconAward width={14} height={14} />
              Akreditasi {data.akreditasi}
            </div>
            <div
              style={{
                marginTop: 24,
                paddingTop: 20,
                borderTop: "1px solid var(--border)",
              }}
            >
              <div style={{ fontSize: "0.8125rem", color: "var(--text-muted)", marginBottom: 8 }}>
                NPSN
              </div>
              <div
                style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "var(--text)",
                  fontFamily: "'Inter',sans-serif",
                  letterSpacing: "0.08em",
                }}
              >
                {data.npsn}
              </div>
            </div>
          </div>

          <div className="profil-info-card fade-in-right">
            <h3 className="profil-info-title">
              <IconInfo />
              Informasi Lengkap Sekolah
            </h3>

            <div className="profil-info-grid">
              {items.map((item) => (
                <div
                  className="profil-info-item"
                  style={(item as any).full ? { gridColumn: "1/-1" } : undefined}
                  key={item.label}
                >
                  <div className="profil-info-icon">{item.icon}</div>
                  <div>
                    <div className="profil-info-label">{item.label}</div>
                    {(item as any).href ? (
                      <a href={(item as any).href} target="_blank" rel="noopener noreferrer" className="profil-info-value" style={{ textDecoration: "none", color: "var(--primary)" }}>
                        {item.value}
                      </a>
                    ) : (
                      <div className="profil-info-value">{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
