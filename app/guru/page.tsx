import type { Metadata } from "next";
import Guru from "@/components/Guru";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Data Guru | SMP Plus Babussalam",
  description:
    "Tenaga pendidik profesional dan berdedikasi SMP PLUS BABUSSALAM yang siap membimbing dan menginspirasi setiap siswa.",
};

export default function GuruPage() {
  return (
    <>
      <ScrollReveal />
      <Guru />
    </>
  );
}
