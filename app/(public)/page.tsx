import type { Metadata } from "next";
import LoadingScreen from "@/components/LoadingScreen";
import Hero from "@/components/Hero";
import Sambutan from "@/components/Sambutan";
import Berita from "@/components/Berita";
import Agenda from "@/components/Agenda";
import VisiMisiCard from "@/components/VisiMisiCard";
import Testimoni from "@/components/Testimoni";
import BerandaGallery from "@/components/BerandaGallery";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Beranda",
  description:
    "Website resmi SMP Plus Babussalam — sekolah menengah pertama berbasis pesantren. Daftar sekarang dan bergabunglah bersama generasi cerdas, berkarakter Islami, dan berdaya saing global.",
  keywords: [
    "SMP Plus Babussalam",
    "SMP Islam",
    "SMP berbasis pesantren",
    "pesantren",
    "sekolah Islam",
    "PPDB SMP",
    "daftar SMP Islam",
    "SMP unggulan",
    "sekolah berkarakter",
    "SMP terbaik",
    "SMP di Bandung",

  ],
  alternates: {
    canonical: "https://smpplusbabussalam.my.id",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "SMP Plus Babussalam",
  alternateName: ["SMP Babussalam", "SMP Plus Babussalam Pesantren"],
  description:
    "SMP Plus Babussalam adalah sekolah menengah pertama berbasis pesantren yang berdedikasi mencetak generasi cerdas, berkarakter Islami, dan berdaya saing global.",
  url: "https://smpplusbabussalam.my.id",
  logo: "https://smpplusbabussalam.my.id/icon.png",
  image: "https://smpplusbabussalam.my.id/gedung-sekolah.png",
  telephone: "+6283871746251",
  email: "smpbabussalamdago@gmail.com",
  sameAs: [],
  address: {
    "@type": "PostalAddress",
    addressCountry: "ID",
    addressRegion: "Jawa Barat",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Program Pendidikan",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Course",
          name: "Program SMP Plus Pesantren",
          description: "Pendidikan menengah pertama dengan kurikulum terpadu pesantren dan nasional",
        },
      },
    ],
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LoadingScreen />
      <Hero />
      <Sambutan />
      <Berita />
      <Agenda />
      <VisiMisiCard />
      <Testimoni />
      <BerandaGallery />
    </>
  );
}
