"use client";

import { sekolah, timeline } from "@/data/sekolah";
import { IconClock } from "./icons";

export default function Sejarah() {
  return (
    <section id="sejarah" aria-label="Sejarah Sekolah">
      <div className="section-container">
        <div className="section-header centered fade-in">
          <div className="section-badge">
            <IconClock />
            Sejarah
          </div>
          <h2 className="section-title">Perjalanan Panjang Sekolah</h2>
          <p className="section-subtitle">
            Lebih dari tiga dekade berdiri, {sekolah.namaSingkat} terus bertumbuh dan
            berkontribusi bagi dunia pendidikan.
          </p>
        </div>

        <div className="sejarah-steps" role="list">
          {timeline.map((item, i) => (
            <div className="sejarah-step fade-in" key={item.year} role="listitem"
              style={{ transitionDelay: `${i * 0.15}s` }}>
              <div className="sejarah-step-num">{String(i + 1).padStart(2, "0")}</div>
              <div className="sejarah-step-body">
                <div className="sejarah-step-year">{item.year}</div>
                <h3 className="sejarah-step-title">{item.title}</h3>
                <p className="sejarah-step-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
