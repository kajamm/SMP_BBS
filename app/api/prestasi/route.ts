import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM prestasi ORDER BY tahun DESC, id DESC");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching prestasi:", error);
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nama, kategori, keterangan, tahun, foto } = body;
    if (!nama) return NextResponse.json({ error: "Nama harus diisi" }, { status: 400 });
    const [result] = await db.query(
      "INSERT INTO prestasi (nama, kategori, keterangan, tahun, foto) VALUES (?, ?, ?, ?, ?)",
      [nama, kategori || "siswa", keterangan || "", tahun || "", foto || ""]
    );
    return NextResponse.json({ success: true, id: (result as any).insertId });
  } catch (error) {
    console.error("Error adding prestasi:", error);
    return NextResponse.json({ error: "Gagal menambah data" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, nama, kategori, keterangan, tahun, foto } = body;
    if (!id || !nama) return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    await db.query(
      "UPDATE prestasi SET nama=?, kategori=?, keterangan=?, tahun=?, foto=? WHERE id=?",
      [nama, kategori || "siswa", keterangan || "", tahun || "", foto || "", id]
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating prestasi:", error);
    return NextResponse.json({ error: "Gagal mengupdate data" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID harus disertakan" }, { status: 400 });
    await db.query("DELETE FROM prestasi WHERE id=?", [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting prestasi:", error);
    return NextResponse.json({ error: "Gagal menghapus data" }, { status: 500 });
  }
}
