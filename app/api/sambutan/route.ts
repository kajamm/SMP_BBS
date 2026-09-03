import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM sambutan WHERE id = 1") as any[];
    const row = (rows as any[])[0];
    if (!row) {
      return NextResponse.json({ id: 1, nama: "", jabatan: "", foto: "", teks: "" });
    }
    return NextResponse.json(row);
  } catch (error) {
    console.error("Error fetching sambutan:", error);
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { nama, jabatan, foto, teks } = body;

    await db.query(
      `INSERT INTO sambutan (id, nama, jabatan, foto, teks) VALUES (1, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE nama=VALUES(nama), jabatan=VALUES(jabatan), foto=VALUES(foto), teks=VALUES(teks)`,
      [nama || "", jabatan || "", foto || "", teks || ""]
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating sambutan:", error);
    return NextResponse.json({ error: "Gagal menyimpan data" }, { status: 500 });
  }
}
