import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

// Endpoint to authenticate and to change password
export async function POST(req: NextRequest) {
  try {
    const { action, password, newPassword } = await req.json();

    // Ensure the admin_password column exists
    try {
      await db.query("ALTER TABLE pengaturan ADD COLUMN admin_password VARCHAR(255) DEFAULT 'admin123'");
    } catch (e: any) {
      // Ignore if it already exists (Error code ER_DUP_FIELDNAME)
    }

    if (action === "login") {
      const [rows] = await db.query("SELECT admin_password FROM pengaturan WHERE id = 1");
      const dbPassword = (rows as any)[0]?.admin_password || "admin123";

      if (password === dbPassword) {
        return NextResponse.json({ success: true });
      }
      return NextResponse.json({ error: "Password salah" }, { status: 401 });
    }

    if (action === "change_password") {
      const [rows] = await db.query("SELECT admin_password FROM pengaturan WHERE id = 1");
      const dbPassword = (rows as any)[0]?.admin_password || "admin123";

      if (password !== dbPassword) {
        return NextResponse.json({ error: "Password lama salah" }, { status: 401 });
      }

      await db.query("UPDATE pengaturan SET admin_password = ? WHERE id = 1", [newPassword]);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });

  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}
