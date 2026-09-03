import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM guru ORDER BY id ASC");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching guru:", error);
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nama, mapel, foto, jabatan, pendidikan } = body;
    
    if (!nama || !mapel) {
      return NextResponse.json({ error: "Nama dan Mapel harus diisi" }, { status: 400 });
    }

    const [result] = await db.query(
      "INSERT INTO guru (nama, mapel, foto, jabatan, pendidikan) VALUES (?, ?, ?, ?, ?)",
      [nama, mapel, foto || "", jabatan || "", pendidikan || ""]
    );
    
    return NextResponse.json({ success: true, id: (result as any).insertId });
  } catch (error) {
    console.error("Error adding guru:", error);
    return NextResponse.json({ error: "Gagal menambah data" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, nama, mapel, foto, jabatan, pendidikan } = body;
    
    if (!id || !nama || !mapel) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }

    await db.query(
      "UPDATE guru SET nama = ?, mapel = ?, foto = ?, jabatan = ?, pendidikan = ? WHERE id = ?",
      [nama, mapel, foto || "", jabatan || "", pendidikan || "", id]
    );
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating guru:", error);
    return NextResponse.json({ error: "Gagal mengupdate data" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json({ error: "ID harus disertakan" }, { status: 400 });
    }

    await db.query("DELETE FROM guru WHERE id = ?", [id]);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting guru:", error);
    return NextResponse.json({ error: "Gagal menghapus data" }, { status: 500 });
  }
}
