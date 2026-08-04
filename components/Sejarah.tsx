"use client";

import { useEffect, useRef } from "react";
import { sekolah, timeline } from "@/data/sekolah";
import { IconClock, IconBuilding, IconTrophy } from "./icons";

const icons: Record<string, JSX.Element> = {
  school: <IconBuilding />,
  graduationCap: <IconTrophy />,
};

export default function Sejarah() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("visible");
            }, 100 * i);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

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

        <div className="timeline" role="list">
          {timeline.map((item, i) => {
            const contentBlock = (
              <div className="timeline-content">
                <div className="timeline-icon">{icons[item.icon]}</div>
                <h3 className="timeline-title">{item.title}</h3>
                <p className="timeline-desc">{item.desc}</p>
              </div>
            );
            const yearBlock = (
              <div style={{ display: "flex", justifyContent: "center", paddingTop: 20 }}>
                <div className="timeline-year-badge">{item.year}</div>
              </div>
            );

            return (
              <div
                className="timeline-item"
                role="listitem"
                key={item.year}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
              >
                {i % 2 === 0 ? (
                  <>
                    {contentBlock}
                    {yearBlock}
                    <div></div>
                  </>
                ) : (
                  <>
                    <div></div>
                    {yearBlock}
                    {contentBlock}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
