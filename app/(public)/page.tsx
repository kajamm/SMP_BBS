import type { Metadata } from "next";
import LoadingScreen from "@/components/LoadingScreen";
import Hero from "@/components/Hero";
import Sambutan from "@/components/Sambutan";
import Berita from "@/components/Berita";
import VisiMisiCard from "@/components/VisiMisiCard";
import Testimoni from "@/components/Testimoni";
import BerandaGallery from "@/components/BerandaGallery";

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
      <Sambutan />
      <Berita />
      <VisiMisiCard />
      <Testimoni />
      <BerandaGallery />
    </>
  );
}
