"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Sambutan() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

  return (
    <section id="sambutan" className="section-container" style={{ padding: "80px 24px" }} ref={sectionRef}>
      <div className="sambutan-grid fade-in-up">
        {/* Left Side: Image */}
        <div className="sambutan-image-wrapper">
          <Image
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop"
            alt="H. Andi Rustandi, S.S"
            width={400}
            height={500}
            className="sambutan-image"
          />
        </div>

        {/* Right Side: Content */}
        <div className="sambutan-content">
          <h2 className="sambutan-title">H. Andi Rustandi, S.S</h2>
          <h3 className="sambutan-subtitle">Mudir Ma&apos;had Pesantren Sains &amp; Teknologi Babussalam</h3>
          
          <div className="sambutan-text">
            <p className="sambutan-greeting">Assalamu&apos;alaikum Warrohmatullohi WabaroKatuh</p>
            <p>
              Selamat datang di website resmi SMP Plus Babussalam, media informasi dan komunikasi yang kami hadirkan untuk memperkenalkan program, kegiatan, serta perkembangan pesantren. 
            </p>
            <p>
              Kami berkomitmen menyelenggarakan pendidikan Islam terpadu yang terintegrasikan nilai keislaman, sains, dan teknologi guna membentuk generasi yang beriman, berakhlak mulia, berilmu, dan siap menghadapi tantangan zaman.
            </p>
          </div>

          <Link href="/profil" className="btn-primary" style={{ display: "inline-flex", marginTop: "24px" }}>
            Profile Pesantren
          </Link>
        </div>
      </div>
    </section>
  );
}
