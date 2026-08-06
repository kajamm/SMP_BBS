import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollTop from "@/components/ScrollTop";
import ScrollReveal from "@/components/ScrollReveal";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export const metadata: Metadata = {
  title: "SMP Plus Babussalam",
  description:
    "Website resmi SMP PLUS BABUSSALAM - Sekolah unggulan yang berdedikasi mencetak generasi cerdas, berkarakter, dan berdaya saing global.",
  keywords: "SMP Plus Babussalam, profil sekolah, SMP terbaik",
  authors: [{ name: "SMP Plus Babussalam" }],
  openGraph: {
    title: "SMP Plus Babussalam",
    description:
      "Sekolah unggulan yang berdedikasi mencetak generasi cerdas, berkarakter, dan berdaya saing global.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
        <ScrollTop />
        <ScrollReveal />
      </body>
    </html>
  );
}
