"use client";
import useScrollReveal from "./useScrollReveal";

/** Komponen tanpa UI — hanya menjalankan scroll reveal hook di setiap halaman */
export default function ScrollReveal() {
  useScrollReveal();
  return null;
}
