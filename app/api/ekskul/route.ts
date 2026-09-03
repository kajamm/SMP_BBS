import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM ekskul ORDER BY nama ASC");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching ekskul:", error);
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nama, deskripsi, foto, pembina } = body;
    if (!nama) return NextResponse.json({ error: "Nama harus diisi" }, { status: 400 });
    const [result] = await db.query(
      "INSERT INTO ekskul (nama, deskripsi, foto, pembina) VALUES (?, ?, ?, ?)",
      [nama, deskripsi || "", foto || "", pembina || ""]
    );
    return NextResponse.json({ success: true, id: (result as any).insertId });
  } catch (error) {
    console.error("Error adding ekskul:", error);
    return NextResponse.json({ error: "Gagal menambah data" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, nama, deskripsi, foto, pembina } = body;
    if (!id || !nama) return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    await db.query(
      "UPDATE ekskul SET nama=?, deskripsi=?, foto=?, pembina=? WHERE id=?",
      [nama, deskripsi || "", foto || "", pembina || "", id]
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating ekskul:", error);
    return NextResponse.json({ error: "Gagal mengupdate data" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID harus disertakan" }, { status: 400 });
    await db.query("DELETE FROM ekskul WHERE id=?", [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting ekskul:", error);
    return NextResponse.json({ error: "Gagal menghapus data" }, { status: 500 });
  }
}
