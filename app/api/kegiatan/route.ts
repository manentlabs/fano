import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM kegiatan ORDER BY bulan ASC, id ASC"
    );
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ message: "Gagal mengambil data kegiatan" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { bulan, kategori_id, kegiatan, penanggung_jawab, keterangan, status } = body;

    if (!kegiatan?.trim()) {
      return NextResponse.json({ message: "Field kegiatan wajib diisi" }, { status: 400 });
    }

    const [result]: any = await pool.query(
      `INSERT INTO kegiatan (bulan, kategori_id, kegiatan, penanggung_jawab, keterangan, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [bulan, kategori_id, kegiatan.trim(), penanggung_jawab ?? "", keterangan ?? "", status ?? "Belum Mulai"]
    );

    return NextResponse.json({ ok: true, id: result.insertId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Gagal menyimpan kegiatan" }, { status: 500 });
  }
}