import type { Metadata } from "next";
import VisiMisi from "@/components/VisiMisi";
import ScrollReveal from "@/components/ScrollReveal";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Visi & Misi | SMP Plus Babussalam",
  description:
    "Visi, misi, dan sistem kekhasan pendidikan SMP PLUS BABUSSALAM dalam mewujudkan peserta didik yang unggul, beriman, berkarakter, dan berwawasan global.",
};

export default function VisiMisiPage() {
  return (
    <>
      <ScrollReveal />
      <VisiMisi />
    </>
  );
}
