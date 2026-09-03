import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export const dynamic = "force-dynamic";

// Ensure tables exist
async function ensureTables() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS struktur_bagan (
      id INT PRIMARY KEY DEFAULT 1,
      bagan_url TEXT,
      keterangan TEXT,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await db.query(`
    INSERT IGNORE INTO struktur_bagan (id, bagan_url, keterangan)
    VALUES (1, '', 'Bagan Struktur Organisasi dan Manajemen SMP Plus Babussalam')
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS struktur_organisasi (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nama VARCHAR(255) NOT NULL,
      jabatan VARCHAR(255) NOT NULL,
      kategori VARCHAR(100) DEFAULT 'Pimpinan',
      urutan INT DEFAULT 0,
      foto TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

export async function GET() {
  try {
    await ensureTables();

    const [baganRows] = await db.query("SELECT * FROM struktur_bagan WHERE id = 1");
    const [pengurusRows] = await db.query(
      "SELECT * FROM struktur_organisasi ORDER BY urutan ASC, id ASC"
    );

    const bagan = Array.isArray(baganRows) && baganRows.length > 0 ? baganRows[0] : null;

    return NextResponse.json({
      bagan: bagan || { bagan_url: "", keterangan: "" },
      pengurus: pengurusRows || [],
    });
  } catch (error) {
    console.error("Error fetching struktur organisasi:", error);
    return NextResponse.json({ error: "Gagal mengambil data struktur" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await ensureTables();
    const body = await req.json();

    // Check if updating bagan
    if (body.action === "save_bagan") {
      const { bagan_url, keterangan } = body;
      await db.query(
        "UPDATE struktur_bagan SET bagan_url = ?, keterangan = ? WHERE id = 1",
        [bagan_url || "", keterangan || ""]
      );
      return NextResponse.json({ success: true, message: "Bagan berhasil disimpan" });
    }

    // Otherwise add official
    const { nama, jabatan, kategori, urutan, foto } = body;
    if (!nama || !jabatan) {
      return NextResponse.json({ error: "Nama dan Jabatan wajib diisi" }, { status: 400 });
    }

    const [result] = await db.query(
      "INSERT INTO struktur_organisasi (nama, jabatan, kategori, urutan, foto) VALUES (?, ?, ?, ?, ?)",
      [nama, jabatan, kategori || "Pimpinan", Number(urutan) || 0, foto || ""]
    );

    return NextResponse.json({ success: true, id: (result as any).insertId });
  } catch (error) {
    console.error("Error saving struktur organisasi:", error);
    return NextResponse.json({ error: "Gagal menyimpan data" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await ensureTables();
    const body = await req.json();
    const { id, nama, jabatan, kategori, urutan, foto } = body;

    if (!id || !nama || !jabatan) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }

    await db.query(
      "UPDATE struktur_organisasi SET nama = ?, jabatan = ?, kategori = ?, urutan = ?, foto = ? WHERE id = ?",
      [nama, jabatan, kategori || "Pimpinan", Number(urutan) || 0, foto || "", id]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating struktur official:", error);
    return NextResponse.json({ error: "Gagal memperbarui data" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await ensureTables();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID diperlukan" }, { status: 400 });
    }

    await db.query("DELETE FROM struktur_organisasi WHERE id = ?", [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting struktur official:", error);
    return NextResponse.json({ error: "Gagal menghapus data" }, { status: 500 });
  }
}
