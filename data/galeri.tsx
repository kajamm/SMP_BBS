import type { ReactNode } from "react";

export interface GaleriItem {
  id: number;
  category: "belajar" | "upacara" | "prestasi" | "ekskul" | "fasilitas";
  caption: string;
  label: string;
  overlayTitle: string;
  bg: string;
  color: string;
  icon: ReactNode;
}

const iconProps = (color: string) => ({
  xmlns: "http://www.w3.org/2000/svg",
  width: 40,
  height: 40,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: color,
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export const galeriItems: GaleriItem[] = [
  {
    id: 1,
    category: "belajar",
    caption: "Kegiatan Belajar Mengajar di Kelas",
    label: "Belajar Mengajar",
    overlayTitle: "Kegiatan Belajar",
    bg: "linear-gradient(135deg, #D1FAE5, #6EE7B7)",
    color: "#16A34A",
    icon: (
      <svg {...iconProps("#16A34A")}>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    id: 2,
    category: "upacara",
    caption: "Upacara Bendera Hari Senin",
    label: "Upacara Bendera",
    overlayTitle: "Upacara Bendera",
    bg: "linear-gradient(135deg, #FEF3C7, #FDE68A)",
    color: "#D97706",
    icon: (
      <svg {...iconProps("#D97706")}>
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
        <line x1="4" y1="22" x2="4" y2="15" />
      </svg>
    ),
  },
  {
    id: 3,
    category: "prestasi",
    caption: "Juara Olimpiade Matematika Nasional",
    label: "Juara Olimpiade",
    overlayTitle: "Prestasi Olimpiade",
    bg: "linear-gradient(135deg, #D1FAE5, #6EE7B7)",
    color: "#059669",
    icon: (
      <svg {...iconProps("#059669")}>
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      </svg>
    ),
  },
  {
    id: 4,
    category: "ekskul",
    caption: "Latihan Pramuka Setiap Jumat",
    label: "Pramuka",
    overlayTitle: "Pramuka",
    bg: "linear-gradient(135deg, #FCE7F3, #FBCFE8)",
    color: "#BE185D",
    icon: (
      <svg {...iconProps("#BE185D")}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: 5,
    category: "fasilitas",
    caption: "Laboratorium Komputer Modern",
    label: "Lab Komputer",
    overlayTitle: "Lab Komputer",
    bg: "linear-gradient(135deg, #EDE9FE, #C4B5FD)",
    color: "#7C3AED",
    icon: (
      <svg {...iconProps("#7C3AED")}>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    id: 6,
    category: "belajar",
    caption: "Praktikum IPA di Laboratorium",
    label: "Praktikum IPA",
    overlayTitle: "Praktikum Sains",
    bg: "linear-gradient(135deg, #CFFAFE, #67E8F9)",
    color: "#0891B2",
    icon: (
      <svg {...iconProps("#0891B2")}>
        <path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5h0c-1.4 0-2.5-1.1-2.5-2.5V2" />
        <path d="M8.5 2h7" />
        <path d="M14.5 16h-5" />
      </svg>
    ),
  },
  {
    id: 7,
    category: "prestasi",
    caption: "Peringkat 1 Lomba Seni Se-Kabupaten",
    label: "Juara Seni",
    overlayTitle: "Lomba Seni",
    bg: "linear-gradient(135deg, #FFF7ED, #FED7AA)",
    color: "#EA580C",
    icon: (
      <svg {...iconProps("#EA580C")}>
        <path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    id: 8,
    category: "ekskul",
    caption: "Tim Futsal SMP PLUS BABUSSALAM Juara Provinsi",
    label: "Tim Futsal",
    overlayTitle: "Futsal",
    bg: "linear-gradient(135deg, #DCFCE7, #86EFAC)",
    color: "#16A34A",
    icon: (
      <svg {...iconProps("#16A34A")}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
    ),
  },
  {
    id: 9,
    category: "fasilitas",
    caption: "Perpustakaan Sekolah Modern",
    label: "Perpustakaan",
    overlayTitle: "Perpustakaan",
    bg: "linear-gradient(135deg, #FEF2F2, #FECACA)",
    color: "#DC2626",
    icon: (
      <svg {...iconProps("#DC2626")}>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    id: 10,
    category: "upacara",
    caption: "Upacara Hari Kemerdekaan 17 Agustus",
    label: "HUT RI 17 Agustus",
    overlayTitle: "Upacara 17 Agustus",
    bg: "linear-gradient(135deg, #FEF9C3, #FDE047)",
    color: "#CA8A04",
    icon: (
      <svg {...iconProps("#CA8A04")}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    id: 11,
    category: "ekskul",
    caption: "Paduan Suara SMP PLUS BABUSSALAM",
    label: "Paduan Suara",
    overlayTitle: "Paduan Suara",
    bg: "linear-gradient(135deg, #F0F4FF, #C7D2FE)",
    color: "#4F46E5",
    icon: (
      <svg {...iconProps("#4F46E5")}>
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
  {
    id: 12,
    category: "belajar",
    caption: "Pembelajaran Berbasis Proyek",
    label: "Project-Based Learning",
    overlayTitle: "Project Based Learning",
    bg: "linear-gradient(135deg, #E0F2FE, #7DD3FC)",
    color: "#0369A1",
    icon: (
      <svg {...iconProps("#0369A1")}>
        <path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z" />
        <path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
        <path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z" />
        <path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z" />
        <path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z" />
        <path d="M15.5 9H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5S16.33 9 15.5 9z" />
        <path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z" />
        <path d="M8.5 15H10v-1.5c0-.83-.67-1.5-1.5-1.5S7 12.67 7 13.5 7.67 15 8.5 15z" />
      </svg>
    ),
  },
  {
    id: 13,
    category: "fasilitas",
    caption: "Lapangan Olahraga Serbaguna",
    label: "Lapangan Olahraga",
    overlayTitle: "Lapangan Olahraga",
    bg: "linear-gradient(135deg, #F0FDF4, #86EFAC)",
    color: "#15803D",
    icon: (
      <svg {...iconProps("#15803D")}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 12h18M12 3v18" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    id: 14,
    category: "prestasi",
    caption: "Penghargaan Sekolah Adiwiyata",
    label: "Sekolah Adiwiyata",
    overlayTitle: "Penghargaan Adiwiyata",
    bg: "linear-gradient(135deg, #FFFBEB, #FDE68A)",
    color: "#B45309",
    icon: (
      <svg {...iconProps("#B45309")}>
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
      </svg>
    ),
  },
  {
    id: 15,
    category: "ekskul",
    caption: "Latihan Seni Tari Tradisional",
    label: "Seni Tari",
    overlayTitle: "Seni Tari Tradisional",
    bg: "linear-gradient(135deg, #FDF2F8, #F9A8D4)",
    color: "#9D174D",
    icon: (
      <svg {...iconProps("#9D174D")}>
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="M7 13.5c0-1.5 1.5-2.5 3-2.5h4c1.5 0 3 1 3 2.5" />
        <circle cx="9" cy="9" r="1.5" />
        <circle cx="15" cy="9" r="1.5" />
      </svg>
    ),
  },
];

export const galeriFilters = [
  { key: "all", label: "Semua" },
  { key: "belajar", label: "Kegiatan Belajar" },
  { key: "upacara", label: "Upacara" },
  { key: "prestasi", label: "Prestasi" },
  { key: "ekskul", label: "Ekstrakurikuler" },
  { key: "fasilitas", label: "Fasilitas" },
] as const;
