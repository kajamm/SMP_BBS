import type { Metadata } from "next";
import Kontak from "@/components/Kontak";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Kontak | SMP Plus Babussalam",
  description:
    "Hubungi SMP PLUS BABUSSALAM — informasi jam operasional, alamat, email, dan rekening pembayaran sekolah.",
};

export default function KontakPage() {
  return (
    <>
      <ScrollReveal />
      <Kontak />
    </>
  );
}
