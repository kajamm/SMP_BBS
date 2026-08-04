# SMP Plus Babussalam — Website Profil Sekolah (Next.js)

## 🚀 Cara Menjalankan

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

Untuk build production:

```bash
npm run build
npm start
```

## 📁 Struktur Proyek

```
smp-babussalam/
├── app/
│   ├── layout.tsx        ← Root layout (metadata, font Google)
│   ├── page.tsx           ← Merangkai semua section jadi satu halaman
│   └── globals.css        ← Seluruh styling (porting 1:1 dari style.css asli)
├── components/
│   ├── LoadingScreen.tsx  ← Layar loading saat halaman pertama dibuka
│   ├── Navbar.tsx         ← Navbar sticky + scroll-spy + dark mode + menu mobile
│   ├── Hero.tsx           ← Section beranda dengan statistik animasi
│   ├── Profil.tsx         ← Identitas sekolah (NPSN, akreditasi, alamat, dll)
│   ├── VisiMisi.tsx       ← Visi & sistem pendidikan
│   ├── Sejarah.tsx        ← Timeline sejarah sekolah
│   ├── Guru.tsx           ← Grid data guru & staff
│   ├── Galeri.tsx         ← Galeri foto dengan filter kategori
│   ├── Lightbox.tsx       ← Modal preview foto (dipakai oleh Galeri)
│   ├── Kontak.tsx         ← Info kontak + form pesan
│   ├── Footer.tsx         ← Footer
│   ├── ScrollTop.tsx      ← Tombol kembali ke atas
│   ├── Counter.tsx        ← Animasi angka statistik
│   ├── icons.tsx          ← Kumpulan ikon SVG reusable
│   └── useScrollReveal.ts ← Hook animasi fade-in saat scroll
├── data/
│   ├── sekolah.ts          ← Data profil sekolah, visi, timeline
│   ├── guru.ts             ← Data guru & staff
│   └── galeri.tsx          ← Data item galeri foto
└── package.json
```

## ✏️ Cara Kustomisasi

Karena kontennya sudah dipisahkan ke folder `data/`, edit informasi sekolah **tidak perlu
menyentuh kode komponen**:

- **Info sekolah, visi, timeline sejarah** → edit `data/sekolah.ts`
- **Data guru & staff** → edit `data/guru.ts`
- **Item galeri foto** → edit `data/galeri.tsx`

### Mengganti Foto Sungguhan

Saat ini galeri & foto guru masih memakai placeholder warna + inisial (sama seperti versi asli).
Untuk memakai foto sungguhan:

1. Taruh file gambar di folder `public/` (misalnya `public/guru/kepsek.jpg`)
2. Di `components/Guru.tsx` atau `components/Galeri.tsx`, ganti div placeholder dengan komponen
   `next/image`, contoh:

```tsx
import Image from "next/image";

<Image src="/guru/kepsek.jpg" alt="Nama Guru" width={400} height={400} />
```

### Mengaktifkan Google Maps Asli

Ganti `<div className="maps-placeholder">` pada `components/Kontak.tsx` dengan `<iframe>` embed
Google Maps sungguhan.

### Form Kontak

Form saat ini hanya mensimulasikan pengiriman (sama seperti versi asli — tidak mengirim email
sungguhan). Untuk membuatnya benar-benar berfungsi, integrasikan `handleSubmit` di
`components/Kontak.tsx` dengan layanan seperti Formspree, EmailJS, Resend, atau API route Next.js
Anda sendiri (`app/api/kontak/route.ts`).

## 🎨 Fitur yang Dipertahankan dari Versi Asli

- ✅ Dark mode toggle (tersimpan di localStorage)
- ✅ Navbar sticky dengan efek scroll & highlight menu aktif (scroll-spy)
- ✅ Animasi loading screen
- ✅ Animasi counter statistik saat elemen terlihat (IntersectionObserver)
- ✅ Scroll reveal (fade-in) untuk section
- ✅ Timeline sejarah dengan animasi reveal bertahap
- ✅ Grid guru dengan animasi masuk bertahap
- ✅ Galeri foto dengan filter kategori & lightbox (navigasi keyboard: Esc, ←, →)
- ✅ Form kontak dengan status loading & pesan sukses
- ✅ Tombol scroll-to-top
- ✅ Fully responsive (desktop, tablet, mobile) dengan hamburger menu

## 🔧 Teknologi

| Teknologi | Kegunaan |
|-----------|----------|
| **Next.js 14** (App Router) | Framework React |
| **React 18** | UI library |
| **TypeScript** | Type safety |
| **CSS Murni** (globals.css) | Styling, animasi, dark mode — tanpa Tailwind, sesuai desain asli |

## 📝 Catatan

- Semua komponen berjalan sebagai **Client Component** (`"use client"`) karena banyak memakai
  interaktivitas browser (scroll, localStorage, IntersectionObserver). Ini bisa dioptimasi lebih
  lanjut menjadi Server Component untuk bagian yang statis bila diperlukan.
- Struktur data (`data/*.ts`) sengaja dipisah agar konten sekolah mudah diperbarui tanpa harus
  memahami kode React.
