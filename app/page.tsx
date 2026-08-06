import type { Metadata } from "next";
import LoadingScreen from "@/components/LoadingScreen";
import Hero from "@/components/Hero";

export const metadata: Metadata = {
  title: "Beranda | SMP Plus Babussalam",
  description:
    "Selamat datang di SMP PLUS BABUSSALAM — sekolah unggulan berbasis pesantren di Bandung. Cerdas, Berkarakter, dan Berdaya Saing Global.",
};

export default function HomePage() {
  return (
    <>
      <LoadingScreen />
      <Hero />
    </>
  );
}
