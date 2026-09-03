import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM identitas WHERE id = 1") as any[];
    const row = (rows as any[])[0];
    if (!row) {
      return NextResponse.json({ id: 1, nama_lengkap: "", nama_singkat: "", inisial: "", npsn: "", akreditasi: "", akreditasi_sk: "", sk_pendirian: "", logo_url: "", website: "", status_sekolah: "" });
    }
    return NextResponse.json(row);
  } catch (error) {
    console.error("Error fetching identitas:", error);
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { nama_lengkap, nama_singkat, inisial, npsn, akreditasi, akreditasi_sk, sk_pendirian, logo_url, website, status_sekolah } = body;

    await db.query(
      `INSERT INTO identitas (id, nama_lengkap, nama_singkat, inisial, npsn, akreditasi, akreditasi_sk, sk_pendirian, logo_url, website, status_sekolah) VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE nama_lengkap=VALUES(nama_lengkap), nama_singkat=VALUES(nama_singkat), inisial=VALUES(inisial), npsn=VALUES(npsn), akreditasi=VALUES(akreditasi), akreditasi_sk=VALUES(akreditasi_sk), sk_pendirian=VALUES(sk_pendirian), logo_url=VALUES(logo_url), website=VALUES(website), status_sekolah=VALUES(status_sekolah)`,
      [nama_lengkap || "", nama_singkat || "", inisial || "", npsn || "", akreditasi || "", akreditasi_sk || "", sk_pendirian || "", logo_url || "", website || "", status_sekolah || ""]
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating identitas:", error);
    return NextResponse.json({ error: "Gagal menyimpan data" }, { status: 500 });
  }
}
