import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM agenda ORDER BY tanggal_mulai DESC");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching agenda:", error);
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { judul, tanggal_mulai, tanggal_selesai, deskripsi, kategori } = body;
    if (!judul || !tanggal_mulai) return NextResponse.json({ error: "Judul dan tanggal mulai harus diisi" }, { status: 400 });
    const [result] = await db.query(
      "INSERT INTO agenda (judul, tanggal_mulai, tanggal_selesai, deskripsi, kategori) VALUES (?, ?, ?, ?, ?)",
      [judul, tanggal_mulai, tanggal_selesai || null, deskripsi || "", kategori || ""]
    );
    return NextResponse.json({ success: true, id: (result as any).insertId });
  } catch (error) {
    console.error("Error adding agenda:", error);
    return NextResponse.json({ error: "Gagal menambah data" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, judul, tanggal_mulai, tanggal_selesai, deskripsi, kategori } = body;
    if (!id || !judul || !tanggal_mulai) return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    await db.query(
      "UPDATE agenda SET judul=?, tanggal_mulai=?, tanggal_selesai=?, deskripsi=?, kategori=? WHERE id=?",
      [judul, tanggal_mulai, tanggal_selesai || null, deskripsi || "", kategori || "", id]
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating agenda:", error);
    return NextResponse.json({ error: "Gagal mengupdate data" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID harus disertakan" }, { status: 400 });
    await db.query("DELETE FROM agenda WHERE id=?", [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting agenda:", error);
    return NextResponse.json({ error: "Gagal menghapus data" }, { status: 500 });
  }
}
