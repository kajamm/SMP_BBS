import type { BeritaItem, GalleryPhoto, TestimoniItem } from "@/lib/store";

export const defaultBerita: BeritaItem[] = [
  {
    id: 1,
    title: "Hydroponic Fun Learning with Pesantren Saintek Babussalam",
    date: "28/11/2025",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=600&auto=format&fit=crop",
    excerpt: "Serunya belajar sambil praktik! Melalui kegiatan Hydroponic Fun Learning, siswa...",
  },
  {
    id: 2,
    title: "MAHAKAM 2025 DARUL HIKAM",
    date: "23/11/2025",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=600&auto=format&fit=crop",
    excerpt: "Mahakam 2025 telah dilalui dengan penuh semangat oleh lebih dari...",
  },
  {
    id: 3,
    title: "KEMENKEU MENGAJAR di Pesantren Saintek Babussalam",
    date: "10/11/2025",
    image: "https://images.unsplash.com/photo-1523580846011-d3a5ce258281?q=80&w=600&auto=format&fit=crop",
    excerpt: "Guest Teacher: Kemenkeu Mengajar di Pesantren Saintek Babussalam...",
  },
];

export const defaultGallery: GalleryPhoto[] = [
  { id: 1, image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=400&auto=format&fit=crop", caption: "Kegiatan Sekolah" },
  { id: 2, image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=400&auto=format&fit=crop", caption: "Belajar Mengajar" },
  { id: 3, image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=400&auto=format&fit=crop", caption: "Aktivitas Siswa" },
  { id: 4, image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400&auto=format&fit=crop", caption: "Pembelajaran Digital" },
  { id: 5, image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=400&auto=format&fit=crop", caption: "Suasana Kelas" },
  { id: 6, image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=400&auto=format&fit=crop", caption: "Kegiatan Outdoor" },
  { id: 7, image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=400&auto=format&fit=crop", caption: "Ekstrakurikuler" },
  { id: 8, image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=400&auto=format&fit=crop", caption: "Perpustakaan" },
];

export const defaultTestimoni: TestimoniItem[] = [
  {
    id: 1,
    name: "Faza Azizan Attuhrisa",
    title: "Peraih Juara 2 Walisongo Chemistry Olympiad",
    quote: "Suasana belajar yang nyaman membuat semangat",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Setya Tegar",
    title: "Peraih Juara 3 Student Athletics Championships",
    quote: "Belajar dibimbing dengan profesional",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    id: 3,
    name: "Satria Kamil Sya'bani",
    title: "Peraih Medali Silver Thailand International Mathematical Olympiad",
    quote: "Belajar disini sangat menyenangkan",
    image: "https://randomuser.me/api/portraits/men/62.jpg",
  },
];
