"use client";

import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Profil from "@/components/Profil";
import VisiMisi from "@/components/VisiMisi";
import Sejarah from "@/components/Sejarah";
import Guru from "@/components/Guru";
import Galeri from "@/components/Galeri";
import Kontak from "@/components/Kontak";
import Footer from "@/components/Footer";
import ScrollTop from "@/components/ScrollTop";
import useScrollReveal from "@/components/useScrollReveal";

export default function Home() {
  useScrollReveal();

  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main>
        <Hero />
        <Profil />
        <VisiMisi />
        <Sejarah />
        <Guru />
        <Galeri />
        <Kontak />
      </main>
      <Footer />
      <ScrollTop />
    </>
  );
}
