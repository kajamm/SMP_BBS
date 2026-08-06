import type { Metadata } from "next";
import Galeri from "@/components/Galeri";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Galeri | SMP Plus Babussalam",
  description:
    "Galeri foto momen berharga dan kegiatan seru di SMP PLUS BABUSSALAM — diabadikan untuk kenangan bersama.",
};

export default function GaleriPage() {
  return (
    <>
      <ScrollReveal />
      <Galeri />
    </>
  );
}
