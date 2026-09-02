export interface BeritaItem {
  id: number;
  title: string;
  date: string;
  image: string;
  excerpt: string;
}

export interface GalleryPhoto {
  id: number;
  image: string;
  caption?: string;
}

export interface GuruItem {
  id: number;
  nama: string;
  mapel: string;
}

export interface TestimoniItem {
  id: number;
  name: string;
  title: string;
  quote: string;
  image: string;
}

export interface SekolahSettings {
  telepon: string;
  email: string;
  whatsapp: string;
  instagram: string;
  instagramUrl: string;
  tiktokUrl: string;
  youtubeUrl: string;
  alamat: string;
  statsGuru: number;
  statsSiswa: number;
  statsKelas: number;
}

// --- Default data imports ---
import { defaultBerita, defaultGallery, defaultTestimoni } from "@/data/defaults";
import { guruList } from "@/data/guru";
import { sekolah } from "@/data/sekolah";

// --- Storage keys ---
const KEYS = {
  BERITA: "smp_bbs_berita",
  GALERI: "smp_bbs_galeri",
  GURU: "smp_bbs_guru",
  TESTIMONI: "smp_bbs_testimoni",
  SEKOLAH: "smp_bbs_sekolah",
};

// ========== BERITA ==========
export function getBerita(): BeritaItem[] {
  if (typeof window === "undefined") return defaultBerita;
  const stored = localStorage.getItem(KEYS.BERITA);
  return stored ? JSON.parse(stored) : defaultBerita;
}

export function saveBerita(items: BeritaItem[]): void {
  localStorage.setItem(KEYS.BERITA, JSON.stringify(items));
}

// ========== GALERI ==========
export function getGaleri(): GalleryPhoto[] {
  if (typeof window === "undefined") return defaultGallery;
  const stored = localStorage.getItem(KEYS.GALERI);
  return stored ? JSON.parse(stored) : defaultGallery;
}

export function saveGaleri(items: GalleryPhoto[]): void {
  localStorage.setItem(KEYS.GALERI, JSON.stringify(items));
}

// ========== GURU ==========
export function getGuru(): GuruItem[] {
  if (typeof window === "undefined") return guruList.map((g, i) => ({ id: i + 1, ...g }));
  const stored = localStorage.getItem(KEYS.GURU);
  return stored ? JSON.parse(stored) : guruList.map((g, i) => ({ id: i + 1, ...g }));
}

export function saveGuru(items: GuruItem[]): void {
  localStorage.setItem(KEYS.GURU, JSON.stringify(items));
}

// ========== TESTIMONI ==========
export function getTestimoni(): TestimoniItem[] {
  if (typeof window === "undefined") return defaultTestimoni;
  const stored = localStorage.getItem(KEYS.TESTIMONI);
  return stored ? JSON.parse(stored) : defaultTestimoni;
}

export function saveTestimoni(items: TestimoniItem[]): void {
  localStorage.setItem(KEYS.TESTIMONI, JSON.stringify(items));
}

// ========== SEKOLAH SETTINGS ==========
export function getSekolahSettings(): SekolahSettings {
  const defaults: SekolahSettings = {
    telepon: sekolah.telepon,
    email: sekolah.email,
    whatsapp: sekolah.whatsapp,
    instagram: sekolah.instagram,
    instagramUrl: sekolah.instagramUrl,
    tiktokUrl: sekolah.tiktokUrl,
    youtubeUrl: sekolah.youtubeUrl,
    alamat: sekolah.alamat,
    statsGuru: 30,
    statsSiswa: 103,
    statsKelas: 6,
  };
  if (typeof window === "undefined") return defaults;
  const stored = localStorage.getItem(KEYS.SEKOLAH);
  return stored ? { ...defaults, ...JSON.parse(stored) } : defaults;
}

export function saveSekolahSettings(settings: SekolahSettings): void {
  localStorage.setItem(KEYS.SEKOLAH, JSON.stringify(settings));
}
