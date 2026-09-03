import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM sejarah ORDER BY urutan ASC, tahun ASC");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching sejarah:", error);
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tahun, judul, deskripsi, urutan } = body;
    if (!tahun || !judul) {
      return NextResponse.json({ error: "Tahun dan Judul harus diisi" }, { status: 400 });
    }
    const [result] = await db.query(
      "INSERT INTO sejarah (tahun, judul, deskripsi, urutan) VALUES (?, ?, ?, ?)",
      [tahun, judul, deskripsi || "", urutan || 0]
    );
    return NextResponse.json({ success: true, id: (result as any).insertId });
  } catch (error) {
    console.error("Error adding sejarah:", error);
    return NextResponse.json({ error: "Gagal menambah data" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, tahun, judul, deskripsi, urutan } = body;
    if (!id || !tahun || !judul) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }
    await db.query(
      "UPDATE sejarah SET tahun=?, judul=?, deskripsi=?, urutan=? WHERE id=?",
      [tahun, judul, deskripsi || "", urutan || 0, id]
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating sejarah:", error);
    return NextResponse.json({ error: "Gagal mengupdate data" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID harus disertakan" }, { status: 400 });
    await db.query("DELETE FROM sejarah WHERE id=?", [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting sejarah:", error);
    return NextResponse.json({ error: "Gagal menghapus data" }, { status: 500 });
  }
}
