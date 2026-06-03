import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await pool.query("SELECT id, nama FROM kategori ORDER BY id");
    return NextResponse.json(rows);  // ← kirim rows saja, bukan pool result mentah
  } catch (error) {
    return NextResponse.json({ message: "Gagal" }, { status: 500 });
  }
}