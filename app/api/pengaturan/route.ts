import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM pengaturan WHERE id = 1");
    
    // Jika tidak ada data, kembalikan objek default
    if ((rows as any[]).length === 0) {
      return NextResponse.json({
        telepon: "", email: "", whatsapp: "", alamat: "",
        instagram: "", instagramUrl: "", tiktokUrl: "", youtubeUrl: "",
        statsGuru: 0, statsSiswa: 0, statsKelas: 0
      });
    }
    
    return NextResponse.json((rows as any)[0]);
  } catch (error) {
    console.error("Error fetching pengaturan:", error);
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      telepon, email, whatsapp, alamat, 
      instagram, instagramUrl, tiktokUrl, youtubeUrl, 
      statsGuru, statsSiswa, statsKelas 
    } = body;
    
    // Gunakan INSERT ... ON DUPLICATE KEY UPDATE untuk id = 1
    const query = `
      INSERT INTO pengaturan (
        id, telepon, email, whatsapp, alamat, 
        instagram, instagramUrl, tiktokUrl, youtubeUrl, 
        statsGuru, statsSiswa, statsKelas
      ) VALUES (
        1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
      ) ON DUPLICATE KEY UPDATE
        telepon = VALUES(telepon),
        email = VALUES(email),
        whatsapp = VALUES(whatsapp),
        alamat = VALUES(alamat),
        instagram = VALUES(instagram),
        instagramUrl = VALUES(instagramUrl),
        tiktokUrl = VALUES(tiktokUrl),
        youtubeUrl = VALUES(youtubeUrl),
        statsGuru = VALUES(statsGuru),
        statsSiswa = VALUES(statsSiswa),
        statsKelas = VALUES(statsKelas)
    `;

    await db.query(query, [
      telepon || "", email || "", whatsapp || "", alamat || "",
      instagram || "", instagramUrl || "", tiktokUrl || "", youtubeUrl || "",
      statsGuru || 0, statsSiswa || 0, statsKelas || 0
    ]);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating pengaturan:", error);
    return NextResponse.json({ error: "Gagal mengupdate data" }, { status: 500 });
  }
}
