import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SMP Plus Babussalam",
  description:
    "Website resmi SMP PLUS BABUSSALAM - Sekolah unggulan yang berdedikasi mencetak generasi cerdas, berkarakter, dan berdaya saing global.",
  keywords: "SMP Plus Babussalam, profil sekolah, SMP terbaik",
  authors: [{ name: "SMP Plus Babussalam" }],
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "SMP Plus Babussalam",
    description:
      "Sekolah unggulan yang berdedikasi mencetak generasi cerdas, berkarakter, dan berdaya saing global.",
    type: "website",
    url: "https://smpplusbabussalam.my.id",
    siteName: "SMP Plus Babussalam",
    images: [
      {
        url: "https://smpplusbabussalam.my.id/icon.png",
        width: 512,
        height: 512,
        alt: "Logo SMP Plus Babussalam",
      }
    ]
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
