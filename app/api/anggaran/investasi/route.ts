import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.query(
      "SELECT * FROM anggaran_investasi ORDER BY kategori, nomor"
    );
    return NextResponse.json(rows);
  } catch (error: any) {
    console.error("GET investasi error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { kategori, nomor, uraian, volume, satuan, harga_satuan } = await request.json();
    const [result] = await db.query(
      `INSERT INTO anggaran_investasi (kategori, nomor, uraian, volume, satuan, harga_satuan)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [kategori, nomor, uraian, volume, satuan, harga_satuan]
    );
    return NextResponse.json(
      { id: (result as any).insertId, ...await request.json() },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST investasi error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}