import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://smpplusbabussalam.my.id"),
  title: {
    default: "SMP Plus Babussalam",
    template: "%s | SMP Plus Babussalam",
  },
  description:
    "Website resmi SMP PLUS BABUSSALAM — sekolah menengah pertama berbasis pesantren yang berdedikasi mencetak generasi cerdas, berkarakter Islami, dan berdaya saing global.",
  keywords: [
    "SMP Plus Babussalam",
    "SMP Babussalam",
    "SMP Islam Babussalam",
    "SMP berbasis pesantren",
    "pesantren Babussalam",
    "sekolah Islam terbaik",
    "SMP unggulan",
    "SMP Islam unggulan",
    "sekolah menengah pertama Islam",
    "pendaftaran SMP Islam",
    "PPDB SMP Babussalam",
    "SMP pesantren terbaik",
    "sekolah Islam berkarakter",
    "SMP Plus",
    "smpplusbabussalam",
  ],
  authors: [{ name: "SMP Plus Babussalam", url: "https://smpplusbabussalam.my.id" }],
  creator: "SMP Plus Babussalam",
  publisher: "SMP Plus Babussalam",
  category: "education",
  alternates: {
    canonical: "https://smpplusbabussalam.my.id",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "SMP Plus Babussalam",
    description:
      "Sekolah menengah pertama berbasis pesantren yang berdedikasi mencetak generasi cerdas, berkarakter Islami, dan berdaya saing global.",
    type: "website",
    url: "https://smpplusbabussalam.my.id",
    siteName: "SMP Plus Babussalam",
    locale: "id_ID",
    images: [
      {
        url: "https://smpplusbabussalam.my.id/gedung-sekolah.png",
        width: 1200,
        height: 630,
        alt: "SMP Plus Babussalam - Sekolah Islam Unggulan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SMP Plus Babussalam",
    description:
      "Sekolah menengah pertama berbasis pesantren yang berdedikasi mencetak generasi cerdas, berkarakter Islami, dan berdaya saing global.",
    images: ["https://smpplusbabussalam.my.id/gedung-sekolah.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
