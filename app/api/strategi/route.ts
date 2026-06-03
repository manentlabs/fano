import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM strategi ORDER BY tipe, urutan");
    return NextResponse.json(rows);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { tipe, urutan, strategi } = await request.json();
    const [result] = await db.query(
      "INSERT INTO strategi (tipe, urutan, strategi) VALUES (?, ?, ?)",
      [tipe, urutan, strategi]
    );
    return NextResponse.json({ id: (result as any).insertId }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}