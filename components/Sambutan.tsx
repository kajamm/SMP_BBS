"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Sambutan() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/sambutan")
      .then(res => res.json())
      .then(d => setData(d))
      .catch(console.error);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  if (!data) return null;

  return (
    <section id="sambutan" className="section-container" style={{ padding: "80px 24px" }} ref={sectionRef}>
      <div className="sambutan-grid fade-in-up">
        {/* Left Side: Image */}
        <div className="sambutan-image-wrapper">
          {data.foto && (
            <Image
              src={data.foto}
              alt={data.nama}
              width={400}
              height={500}
              className="sambutan-image"
              unoptimized
            />
          )}
        </div>

        {/* Right Side: Content */}
        <div className="sambutan-content">
          <h2 className="sambutan-title">{data.nama}</h2>
          <h3 className="sambutan-subtitle">{data.jabatan}</h3>
          
          <div className="sambutan-text" style={{ whiteSpace: "pre-wrap" }}>
            {data.teks}
          </div>

          <Link href="/profil" className="btn-primary" style={{ display: "inline-flex", marginTop: "40px" }}>
            Profile Pesantren
          </Link>
        </div>
      </div>
    </section>
  );
}
