import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM testimoni ORDER BY id DESC");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching testimoni:", error);
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, title, quote, image } = body;
    
    if (!name) {
      return NextResponse.json({ error: "Nama harus diisi" }, { status: 400 });
    }

    const [result] = await db.query(
      "INSERT INTO testimoni (name, title, quote, image) VALUES (?, ?, ?, ?)",
      [name, title || "", quote || "", image || ""]
    );
    
    return NextResponse.json({ success: true, id: (result as any).insertId });
  } catch (error) {
    console.error("Error adding testimoni:", error);
    return NextResponse.json({ error: "Gagal menambah data" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, title, quote, image } = body;
    
    if (!id || !name) {
      return NextResponse.json({ error: "ID dan Nama harus diisi" }, { status: 400 });
    }

    await db.query(
      "UPDATE testimoni SET name = ?, title = ?, quote = ?, image = ? WHERE id = ?",
      [name, title || "", quote || "", image || "", id]
    );
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating testimoni:", error);
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

    await db.query("DELETE FROM testimoni WHERE id = ?", [id]);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting testimoni:", error);
    return NextResponse.json({ error: "Gagal menghapus data" }, { status: 500 });
  }
}
