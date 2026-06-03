import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.query(
      "SELECT * FROM anggaran_pendapatan ORDER BY nomor"
    );
    return NextResponse.json(rows);
  } catch (error: any) {
    console.error("GET pendapatan error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { nomor, sumber_pendapatan, tahun1, tahun2, tahun3 } = await request.json();
    const [result] = await db.query(
      `INSERT INTO anggaran_pendapatan (nomor, sumber_pendapatan, tahun1, tahun2, tahun3)
       VALUES (?, ?, ?, ?, ?)`,
      [nomor, sumber_pendapatan, tahun1, tahun2, tahun3]
    );
    return NextResponse.json(
      { id: (result as any).insertId, ...(await request.json()) },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST pendapatan error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}