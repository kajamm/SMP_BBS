import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export const dynamic = "force-dynamic";

const defaultTugas = [
  { judul: "Pengelolaan Kelas", deskripsi: "Mengelola kelas yang menjadi tanggung jawabnya secara aktif dan berkesinambungan.", urutan: 1 },
  { judul: "Penyelenggaraan Administrasi", deskripsi: "Menyelenggarakan administrasi kelas seperti denah tempat duduk, absensi, dan jadwal pelajaran.", urutan: 2 },
  { judul: "Penyusunan Statistik", deskripsi: "Menyusun statistik bulanan kelas untuk memantau tingkat kehadiran dan partisipasi siswa.", urutan: 3 },
  { judul: "Pengisian Daftar Kumpulan Nilai", deskripsi: "Mengisi daftar kumpulan nilai (legger) secara akurat berdasarkan laporan setiap guru mata pelajaran.", urutan: 4 },
  { judul: "Pembuatan Catatan Khusus", deskripsi: "Membuat catatan khusus tentang siswa terkait perkembangan akademik maupun pembinaan karakter.", urutan: 5 },
  { judul: "Pencatatan Mutasi", deskripsi: "Mencatat mutasi atau perpindahan siswa yang terjadi di dalam kelasnya selama tahun ajaran berjalan.", urutan: 6 },
  { judul: "Pelaporan Hasil Belajar", deskripsi: "Mengisi dan membagikan buku laporan penilaian hasil belajar (rapor) kepada orang tua/wali murid.", urutan: 7 },
];

async function ensureTable() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS wali_kelas_tugas (
      id INT AUTO_INCREMENT PRIMARY KEY,
      judul VARCHAR(255) NOT NULL,
      deskripsi TEXT NOT NULL,
      urutan INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const [rows] = await db.query("SELECT COUNT(*) as cnt FROM wali_kelas_tugas");
  const count = (rows as any)[0]?.cnt || 0;

  if (count === 0) {
    for (const item of defaultTugas) {
      await db.query(
        "INSERT INTO wali_kelas_tugas (judul, deskripsi, urutan) VALUES (?, ?, ?)",
        [item.judul, item.deskripsi, item.urutan]
      );
    }
  }
}

export async function GET() {
  try {
    await ensureTable();
    const [rows] = await db.query("SELECT * FROM wali_kelas_tugas ORDER BY urutan ASC, id ASC");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching wali kelas tugas:", error);
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await ensureTable();
    const body = await req.json();
    const { judul, deskripsi, urutan } = body;

    if (!judul || !deskripsi) {
      return NextResponse.json({ error: "Judul dan Deskripsi wajib diisi" }, { status: 400 });
    }

    const [result] = await db.query(
      "INSERT INTO wali_kelas_tugas (judul, deskripsi, urutan) VALUES (?, ?, ?)",
      [judul, deskripsi, Number(urutan) || 0]
    );

    return NextResponse.json({ success: true, id: (result as any).insertId });
  } catch (error) {
    console.error("Error adding wali kelas tugas:", error);
    return NextResponse.json({ error: "Gagal menambah data" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await ensureTable();
    const body = await req.json();
    const { id, judul, deskripsi, urutan } = body;

    if (!id || !judul || !deskripsi) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }

    await db.query(
      "UPDATE wali_kelas_tugas SET judul = ?, deskripsi = ?, urutan = ? WHERE id = ?",
      [judul, deskripsi, Number(urutan) || 0, id]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating wali kelas tugas:", error);
    return NextResponse.json({ error: "Gagal memperbarui data" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await ensureTable();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID diperlukan" }, { status: 400 });
    }

    await db.query("DELETE FROM wali_kelas_tugas WHERE id = ?", [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting wali kelas tugas:", error);
    return NextResponse.json({ error: "Gagal menghapus data" }, { status: 500 });
  }
}
