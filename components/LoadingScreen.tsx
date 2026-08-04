"use client";

import { useEffect, useState } from "react";
import { IconSchool } from "./icons";
import { sekolah } from "@/data/sekolah";

export default function LoadingScreen() {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setHidden(true), 1200);
    const t2 = setTimeout(() => setRemoved(true), 1900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (removed) return null;

  return (
    <div
      id="loading-screen"
      role="status"
      aria-label="Memuat halaman..."
      className={hidden ? "hidden" : ""}
    >
      <div className="loading-logo">
        <IconSchool strokeWidth={2} width={36} height={36} />
      </div>
      <p className="loading-text">{sekolah.namaSingkat}</p>
      <div className="loading-bar-container">
        <div className="loading-bar"></div>
      </div>
    </div>
  );
}
