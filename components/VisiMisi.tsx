import { sekolah, visi, pilarUtama, sistemPendidikan } from "@/data/sekolah";
import { IconTarget, IconEye, IconClipboardCheck, IconCheck } from "./icons";

export default function VisiMisi() {
  return (
    <section id="visi-misi" aria-label="Visi dan Misi">
      <div className="section-container">
        <div className="section-header centered fade-in">
          <div className="section-badge">
            <IconTarget />
            Visi & Misi
          </div>
          <h2 className="section-title">Visi dan Sistem & Kekhasan Pendidikan</h2>
          <p className="section-subtitle">
            Landasan dan arah perjuangan {sekolah.namaSingkat} dalam mewujudkan pendidikan
            berkualitas.
          </p>
        </div>

        <div className="visi-misi-grid">
          <div className="visi-card fade-in-left">
            <div className="visi-icon">
              <IconEye />
            </div>
            <h3 className="visi-title">Visi Sekolah</h3>
            <p className="visi-text">{visi}</p>

            <div
              style={{
                marginTop: 32,
                paddingTop: 24,
                borderTop: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <div
                style={{
                  fontSize: "0.8125rem",
                  color: "rgba(255,255,255,0.7)",
                  marginBottom: 12,
                  fontWeight: 500,
                }}
              >
                Pilar Utama
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {pilarUtama.map((p) => (
                  <span
                    key={p}
                    style={{
                      background: "rgba(255,255,255,0.15)",
                      padding: "6px 14px",
                      borderRadius: 999,
                      fontSize: "0.8125rem",
                      color: "rgba(255,255,255,0.9)",
                    }}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="misi-card fade-in-right">
            <h3 className="misi-title">
              <IconClipboardCheck />
              Sistem & Kekhasan Pendidikan
            </h3>
            <p className="misi-subtitle">Sistem yang diterapkan di {sekolah.namaSingkat}</p>

            <ul className="misi-list" role="list">
              {sistemPendidikan.map((item) => (
                <li className="misi-item" key={item}>
                  <div className="misi-check">
                    <IconCheck />
                  </div>
                  <span className="misi-item-text">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
