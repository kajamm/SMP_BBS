import { sekolah } from "@/data/sekolah";
import {
  IconBuilding,
  IconAward,
  IconInfo,
  IconSchool,
  IconCheckCircle,
  IconGrid,
  IconMapPin,
  IconMail,
  IconPhoneCall,
  IconGlobe,
  IconCalendar,
} from "./icons";

const items = [
  { icon: <IconSchool />, label: "Nama Sekolah", value: sekolah.namaLengkap },
  { icon: <IconCheckCircle />, label: "Status Sekolah", value: sekolah.status },
  { icon: <IconGrid />, label: "NPSN", value: sekolah.npsn },
  {
    icon: <IconAward />,
    label: "Akreditasi",
    value: `${sekolah.akreditasi} — ${sekolah.akreditasiSk}`,
  },
  { icon: <IconMapPin />, label: "Alamat Lengkap", value: sekolah.alamat, full: true },
  { icon: <IconMail />, label: "Email", value: sekolah.email },
  { icon: <IconPhoneCall />, label: "Instagram", value: sekolah.instagram },
  { icon: <IconGlobe />, label: "Website", value: sekolah.website },
  { icon: <IconCalendar />, label: "SK Pendirian", value: sekolah.skPendirian },
];

export default function Profil() {
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
            Informasi lengkap mengenai {sekolah.namaSingkat} sebagai lembaga pendidikan formal
            tingkat menengah pertama.
          </p>
        </div>

        <div className="profil-grid">
          <div className="profil-logo-card fade-in-left">
            <div className="profil-logo-wrapper">{sekolah.inisial}</div>
            <h3 className="profil-school-name">{sekolah.namaSingkat}</h3>
            <p className="profil-school-sub">
              Sekolah Menengah Pertama
              <br />
              {sekolah.namaSub}
            </p>
            <div className="profil-akreditasi-badge">
              <IconAward width={14} height={14} />
              Akreditasi {sekolah.akreditasi}
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
                {sekolah.npsn}
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
                  style={item.full ? { gridColumn: "1/-1" } : undefined}
                  key={item.label}
                >
                  <div className="profil-info-icon">{item.icon}</div>
                  <div>
                    <div className="profil-info-label">{item.label}</div>
                    <div className="profil-info-value">{item.value}</div>
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
