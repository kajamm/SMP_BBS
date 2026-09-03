import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM ppdb WHERE id = 1") as any[];
    const row = (rows as any[])[0];
    if (!row) {
      return NextResponse.json({ id: 1, tahun_ajaran: "", tanggal_buka: null, tanggal_tutup: null, syarat: [], info_biaya: "", catatan: "", is_open: 0 });
    }
    return NextResponse.json({
      ...row,
      syarat: typeof row.syarat === "string" ? JSON.parse(row.syarat) : (row.syarat || []),
      is_open: row.is_open === 1,
    });
  } catch (error) {
    console.error("Error fetching ppdb:", error);
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { tahun_ajaran, tanggal_buka, tanggal_tutup, syarat, info_biaya, catatan, is_open } = body;

    await db.query(
      `INSERT INTO ppdb (id, tahun_ajaran, tanggal_buka, tanggal_tutup, syarat, info_biaya, catatan, is_open) VALUES (1, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE tahun_ajaran=VALUES(tahun_ajaran), tanggal_buka=VALUES(tanggal_buka), tanggal_tutup=VALUES(tanggal_tutup), syarat=VALUES(syarat), info_biaya=VALUES(info_biaya), catatan=VALUES(catatan), is_open=VALUES(is_open)`,
      [
        tahun_ajaran || "",
        tanggal_buka || null,
        tanggal_tutup || null,
        JSON.stringify(Array.isArray(syarat) ? syarat : []),
        info_biaya || "",
        catatan || "",
        is_open ? 1 : 0,
      ]
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating ppdb:", error);
    return NextResponse.json({ error: "Gagal menyimpan data" }, { status: 500 });
  }
}
