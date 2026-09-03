import Daftar from "@/components/Daftar";
import { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Pendaftaran Siswa Baru | SMP Plus Babussalam",
  description: "Informasi Pendaftaran Peserta Didik Baru (PPDB) SMP Plus Babussalam",
};

export default function DaftarPage() {
  return (
    <main>
      <Daftar />
    </main>
  );
}
