import type { Metadata } from "next";
import Sejarah from "@/components/Sejarah";
import ScrollReveal from "@/components/ScrollReveal";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Sejarah | SMP Plus Babussalam",
  description:
    "Perjalanan panjang SMP PLUS BABUSSALAM sejak 1983 — dari Madrasah Tsanawiyah hingga menjadi sekolah unggulan terakreditasi A.",
};

export default function SejarahPage() {
  return (
    <>
      <ScrollReveal />
      <Sejarah />
    </>
  );
}
