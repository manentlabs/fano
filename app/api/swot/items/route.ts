import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM swot_items ORDER BY kategori, urutan");
    return NextResponse.json(rows);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { kategori, urutan, deskripsi } = await request.json();
    const [result] = await db.query(
      "INSERT INTO swot_items (kategori, urutan, deskripsi) VALUES (?, ?, ?)",
      [kategori, urutan, deskripsi]
    );
    return NextResponse.json({ id: (result as any).insertId }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}