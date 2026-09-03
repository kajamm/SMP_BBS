import type { Metadata } from "next";
import Profil from "@/components/Profil";
import Prestasi from "@/components/Prestasi";
import Fasilitas from "@/components/Fasilitas";
import ScrollReveal from "@/components/ScrollReveal";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Profil Sekolah | SMP Plus Babussalam",
  description:
    "Informasi lengkap identitas, akreditasi, data resmi, prestasi, dan fasilitas SMP PLUS BABUSSALAM.",
};

export default function ProfilPage() {
  return (
    <>
      <ScrollReveal />
      <Profil />
      <Prestasi />
      <Fasilitas />
    </>
  );
}
