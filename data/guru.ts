export interface Guru {
  initial: string;
  gradient: string;
  jabatan: string;
  nama: string;
  mapel: string;
  pendidikan: string;
}

export const guruList: Guru[] = [
  {
    initial: "AF",
    gradient: "linear-gradient(135deg, #15803D, #16A34A)",
    jabatan: "Kepala Sekolah",
    nama: "Umar Yusuf, M.Sos",
    mapel: "Manajemen Pendidikan",
    pendidikan: "S2 Magister Sosial",
  },
  {
    initial: "SR",
    gradient: "linear-gradient(135deg, #7C3AED, #5B21B6)",
    jabatan: "Operator Dapodik",
    nama: "Fitri Mustika, S.Pd",
    mapel: "Bahasa Indonesia",
    pendidikan: "S1 Pendidikan Bahasa",
  },
  {
    initial: "BS",
    gradient: "linear-gradient(135deg, #059669, #047857)",
    jabatan: "Guru Senior",
    nama: "Budi Santoso, S.Pd, M.Si",
    mapel: "Matematika",
    pendidikan: "S2 Matematika Terapan",
  },
  {
    initial: "DL",
    gradient: "linear-gradient(135deg, #DC2626, #B91C1C)",
    jabatan: "Wali Kelas 9A",
    nama: "Dewi Lestari, S.Pd",
    mapel: "Bahasa Inggris",
    pendidikan: "S1 Pendidikan Bahasa Inggris",
  },
  {
    initial: "HW",
    gradient: "linear-gradient(135deg, #134E1C 0%, #15803D 50%, #16A34A 100%)",
    jabatan: "Koordinator TIK",
    nama: "Hendra Wijaya, S.T, S.Pd",
    mapel: "Informatika / TIK",
    pendidikan: "S1 Teknik Informatika",
  },
  {
    initial: "RA",
    gradient: "linear-gradient(135deg, #0891B2, #0E7490)",
    jabatan: "Guru IPA",
    nama: "Rini Astuti, S.Pd",
    mapel: "Ilmu Pengetahuan Alam",
    pendidikan: "S1 Pendidikan Biologi",
  },
  {
    initial: "AP",
    gradient: "linear-gradient(135deg, #7C3AED, #6D28D9)",
    jabatan: "Wali Kelas 8B",
    nama: "Agus Prasetyo, S.Pd",
    mapel: "Ilmu Pengetahuan Sosial",
    pendidikan: "S1 Pendidikan IPS",
  },
  {
    initial: "NH",
    gradient: "linear-gradient(135deg, #BE185D, #9D174D)",
    jabatan: "Guru Agama",
    nama: "Nurul Hidayah, S.Ag",
    mapel: "Pendidikan Agama Islam",
    pendidikan: "S1 Pendidikan Agama Islam",
  },
];
