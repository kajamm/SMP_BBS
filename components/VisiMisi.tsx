"use client";

import { useEffect, useState } from "react";
import { IconStar, IconCheck } from "./icons";

export default function VisiMisi() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/visi-misi")
      .then(res => res.json())
      .then(d => setData(d))
      .catch(console.error);
  }, []);

  if (!data) return null;

  return (
    <section id="visi-misi" aria-label="Visi dan Misi">
      <div className="section-container">
        {/* Visi - centered large block */}
        <div className="visi-block fade-in">
          <div className="visi-icon-pb">
            <IconStar />
          </div>
          <h2 className="visi-heading-pb">Visi Sekolah</h2>
          <p className="visi-quote-pb">{data.visi}</p>

          <div className="pilar-chips">
            {data.pilar_utama?.map((p: string) => (
              <span key={p} className="pilar-chip">{p}</span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="visi-divider"></div>

        {/* Misi Sekolah */}
        <div className="misi-block fade-in" style={{ marginBottom: "56px" }}>
          <h2 className="misi-heading-pb">Misi Sekolah</h2>
          <p className="misi-sub-pb">Langkah-langkah mewujudkan visi sekolah</p>
          <ul className="misi-list-pb" role="list">
            {data.misi?.map((item: string, i: number) => (
              <li className="misi-list-item-pb" key={i}>
                <div className="misi-check-pb">
                  <IconCheck width={14} height={14} />
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Sistem Pendidikan - clean list */}
        <div className="misi-block fade-in">
          <h2 className="misi-heading-pb">Sistem &amp; Kekhasan Pendidikan</h2>
          <p className="misi-sub-pb">Sistem yang diterapkan di sekolah</p>
          <ul className="misi-list-pb" role="list">
            {data.sistem_pendidikan?.map((item: string, i: number) => (
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
