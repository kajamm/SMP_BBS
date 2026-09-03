import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM visi_misi WHERE id = 1") as any[];
    const row = (rows as any[])[0];
    if (!row) {
      return NextResponse.json({ id: 1, visi: "", misi: [], pilar_utama: [], sistem_pendidikan: [] });
    }
    return NextResponse.json({
      ...row,
      misi: typeof row.misi === "string" ? JSON.parse(row.misi) : (row.misi || []),
      pilar_utama: typeof row.pilar_utama === "string" ? JSON.parse(row.pilar_utama) : (row.pilar_utama || []),
      sistem_pendidikan: typeof row.sistem_pendidikan === "string" ? JSON.parse(row.sistem_pendidikan) : (row.sistem_pendidikan || []),
    });
  } catch (error) {
    console.error("Error fetching visi_misi:", error);
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { visi, misi, pilar_utama, sistem_pendidikan } = body;

    await db.query(
      `INSERT INTO visi_misi (id, visi, misi, pilar_utama, sistem_pendidikan) VALUES (1, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE visi=VALUES(visi), misi=VALUES(misi), pilar_utama=VALUES(pilar_utama), sistem_pendidikan=VALUES(sistem_pendidikan)`,
      [
        visi || "",
        JSON.stringify(Array.isArray(misi) ? misi : []),
        JSON.stringify(Array.isArray(pilar_utama) ? pilar_utama : []),
        JSON.stringify(Array.isArray(sistem_pendidikan) ? sistem_pendidikan : []),
      ]
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating visi_misi:", error);
    return NextResponse.json({ error: "Gagal menyimpan data" }, { status: 500 });
  }
}
