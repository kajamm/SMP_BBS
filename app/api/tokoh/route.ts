import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [rows] = await db.query(
      "SELECT * FROM tokoh_pesantren ORDER BY urutan ASC, id ASC"
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching tokoh:", error);
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nama, jabatan, role, foto, deskripsi, urutan } = body;
    if (!nama || !jabatan) {
      return NextResponse.json({ error: "Nama dan Jabatan harus diisi" }, { status: 400 });
    }
    const [result] = await db.query(
      "INSERT INTO tokoh_pesantren (nama, jabatan, role, foto, deskripsi, urutan) VALUES (?, ?, ?, ?, ?, ?)",
      [nama, jabatan, role || "pendiri", foto || "", deskripsi || "", urutan || 0]
    );
    return NextResponse.json({ success: true, id: (result as any).insertId });
  } catch (error) {
    console.error("Error adding tokoh:", error);
    return NextResponse.json({ error: "Gagal menambah data" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, nama, jabatan, role, foto, deskripsi, urutan } = body;
    if (!id || !nama || !jabatan) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }
    await db.query(
      "UPDATE tokoh_pesantren SET nama=?, jabatan=?, role=?, foto=?, deskripsi=?, urutan=? WHERE id=?",
      [nama, jabatan, role || "pendiri", foto || "", deskripsi || "", urutan || 0, id]
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating tokoh:", error);
    return NextResponse.json({ error: "Gagal mengupdate data" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID harus disertakan" }, { status: 400 });
    await db.query("DELETE FROM tokoh_pesantren WHERE id=?", [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting tokoh:", error);
    return NextResponse.json({ error: "Gagal menghapus data" }, { status: 500 });
  }
}
