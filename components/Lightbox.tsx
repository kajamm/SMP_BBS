"use client";

import { useEffect } from "react";
import type { GaleriItem } from "@/data/galeri";
import { IconX, IconChevronLeft, IconChevronRight } from "./icons";

export default function Lightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: GaleriItem[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const item = items[index];

  const go = (dir: number) => {
    const next = (index + dir + items.length) % items.length;
    onNavigate(next);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  if (!item) return null;

  return (
    <div
      id="lightbox"
      className="open"
      role="dialog"
      aria-label="Preview foto"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="lightbox-inner">
        <button className="lightbox-close" aria-label="Tutup preview" onClick={onClose}>
          <IconX />
        </button>

        <button
          className="lightbox-nav lightbox-prev"
          aria-label="Foto sebelumnya"
          onClick={() => go(-1)}
        >
          <IconChevronLeft />
        </button>

        <div
          id="lightbox-placeholder"
          className="lightbox-placeholder"
          style={{ background: item.bg, display: "flex" }}
        >
          {item.icon}
          <span style={{ fontSize: "0.9375rem", color: item.color, fontWeight: 600 }}>
            {item.label}
          </span>
        </div>

        <div id="lightbox-caption" className="lightbox-caption">
          {item.caption}
        </div>

        <button
          className="lightbox-nav lightbox-next"
          aria-label="Foto berikutnya"
          onClick={() => go(1)}
        >
          <IconChevronRight />
        </button>
      </div>
    </div>
  );
}
