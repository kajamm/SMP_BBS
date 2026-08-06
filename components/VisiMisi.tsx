"use client";

import { sekolah, visi, pilarUtama, sistemPendidikan } from "@/data/sekolah";
import { IconStar, IconCheck } from "./icons";

export default function VisiMisi() {
  return (
    <section id="visi-misi" aria-label="Visi dan Misi">
      <div className="section-container">
        {/* Visi - centered large block */}
        <div className="visi-block fade-in">
          <div className="visi-icon-pb">
            <IconStar />
          </div>
          <h2 className="visi-heading-pb">Visi Sekolah</h2>
          <p className="visi-quote-pb">{visi}</p>

          <div className="pilar-chips">
            {pilarUtama.map((p) => (
              <span key={p} className="pilar-chip">{p}</span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="visi-divider"></div>

        {/* Sistem Pendidikan - clean list */}
        <div className="misi-block fade-in">
          <h2 className="misi-heading-pb">Sistem &amp; Kekhasan Pendidikan</h2>
          <p className="misi-sub-pb">Sistem yang diterapkan di {sekolah.namaSingkat}</p>
          <ul className="misi-list-pb" role="list">
            {sistemPendidikan.map((item, i) => (
              <li className="misi-list-item-pb" key={i}>
                <div className="misi-check-pb">
                  <IconCheck width={14} height={14} />
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
