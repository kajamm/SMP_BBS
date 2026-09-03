import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM fasilitas ORDER BY kategori ASC, nama ASC");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching fasilitas:", error);
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nama, deskripsi, foto, kategori } = body;
    if (!nama) return NextResponse.json({ error: "Nama harus diisi" }, { status: 400 });
    const [result] = await db.query(
      "INSERT INTO fasilitas (nama, deskripsi, foto, kategori) VALUES (?, ?, ?, ?)",
      [nama, deskripsi || "", foto || "", kategori || ""]
    );
    return NextResponse.json({ success: true, id: (result as any).insertId });
  } catch (error) {
    console.error("Error adding fasilitas:", error);
    return NextResponse.json({ error: "Gagal menambah data" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, nama, deskripsi, foto, kategori } = body;
    if (!id || !nama) return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    await db.query(
      "UPDATE fasilitas SET nama=?, deskripsi=?, foto=?, kategori=? WHERE id=?",
      [nama, deskripsi || "", foto || "", kategori || "", id]
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating fasilitas:", error);
    return NextResponse.json({ error: "Gagal mengupdate data" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID harus disertakan" }, { status: 400 });
    await db.query("DELETE FROM fasilitas WHERE id=?", [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting fasilitas:", error);
    return NextResponse.json({ error: "Gagal menghapus data" }, { status: 500 });
  }
}
