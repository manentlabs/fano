import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db"; // koneksi database kamu (mysql2/promise)

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM tracker_bulanan ORDER BY bulan ASC");
    return NextResponse.json(rows);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bulan, bulan_nama, fase, status_fase, target_klien, klien_aktual, target_omset, omset_aktual, catatan } = body;

    // Validasi bulan tidak duplikat
    const [existing] = await db.query("SELECT id FROM tracker_bulanan WHERE bulan = ?", [bulan]);
    if ((existing as any[]).length > 0) {
      return NextResponse.json({ error: "Data bulan tersebut sudah ada" }, { status: 400 });
    }

    const [result] = await db.query(
      `INSERT INTO tracker_bulanan (bulan, bulan_nama, fase, status_fase, target_klien, klien_aktual, target_omset, omset_aktual, catatan)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [bulan, bulan_nama, fase, status_fase, target_klien, klien_aktual, target_omset, omset_aktual, catatan || ""]
    );

    return NextResponse.json({ id: (result as any).insertId, ...body }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}