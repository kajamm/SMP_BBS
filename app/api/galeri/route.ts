import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM galeri ORDER BY id DESC");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching galeri:", error);
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { image, caption } = body;
    
    if (!image) {
      return NextResponse.json({ error: "Gambar harus diisi" }, { status: 400 });
    }

    const [result] = await db.query(
      "INSERT INTO galeri (image, caption) VALUES (?, ?)",
      [image, caption || ""]
    );
    
    return NextResponse.json({ success: true, id: (result as any).insertId });
  } catch (error) {
    console.error("Error adding galeri:", error);
    return NextResponse.json({ error: "Gagal menambah data" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, image, caption } = body;
    
    if (!id || !image) {
      return NextResponse.json({ error: "ID dan Gambar harus diisi" }, { status: 400 });
    }

    await db.query(
      "UPDATE galeri SET image = ?, caption = ? WHERE id = ?",
      [image, caption || "", id]
    );
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating galeri:", error);
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

    await db.query("DELETE FROM galeri WHERE id = ?", [id]);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting galeri:", error);
    return NextResponse.json({ error: "Gagal menghapus data" }, { status: 500 });
  }
}
