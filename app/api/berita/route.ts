import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM berita ORDER BY id DESC");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching berita:", error);
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, date, image, excerpt } = body;
    
    if (!title) {
      return NextResponse.json({ error: "Judul harus diisi" }, { status: 400 });
    }

    const [result] = await db.query(
      "INSERT INTO berita (title, date, image, excerpt) VALUES (?, ?, ?, ?)",
      [title, date || "", image || "", excerpt || ""]
    );
    
    return NextResponse.json({ success: true, id: (result as any).insertId });
  } catch (error) {
    console.error("Error adding berita:", error);
    return NextResponse.json({ error: "Gagal menambah data" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, title, date, image, excerpt } = body;
    
    if (!id || !title) {
      return NextResponse.json({ error: "ID dan Judul harus diisi" }, { status: 400 });
    }

    await db.query(
      "UPDATE berita SET title = ?, date = ?, image = ?, excerpt = ? WHERE id = ?",
      [title, date || "", image || "", excerpt || "", id]
    );
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating berita:", error);
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

    await db.query("DELETE FROM berita WHERE id = ?", [id]);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting berita:", error);
    return NextResponse.json({ error: "Gagal menghapus data" }, { status: 500 });
  }
}
