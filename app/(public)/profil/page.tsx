import type { Metadata } from "next";
import Profil from "@/components/Profil";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Profil Sekolah | SMP Plus Babussalam",
  description:
    "Informasi lengkap identitas, akreditasi, dan data resmi SMP PLUS BABUSSALAM sebagai lembaga pendidikan formal tingkat menengah pertama.",
};

export default function ProfilPage() {
  return (
    <>
      <ScrollReveal />
      <Profil />
    </>
  );
}
