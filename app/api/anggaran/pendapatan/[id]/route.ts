import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const { nomor, sumber_pendapatan, tahun1, tahun2, tahun3 } = await request.json();
    const [result] = await db.query(
      `UPDATE anggaran_pendapatan
       SET nomor = ?, sumber_pendapatan = ?, tahun1 = ?, tahun2 = ?, tahun3 = ?
       WHERE id = ?`,
      [nomor, sumber_pendapatan, tahun1, tahun2, tahun3, id]
    );
    if ((result as any).affectedRows === 0) {
      return NextResponse.json({ error: "Data tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json({ id, ...(await request.json()) });
  } catch (error: any) {
    console.error("PUT pendapatan error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const [result] = await db.query("DELETE FROM anggaran_pendapatan WHERE id = ?", [id]);
    if ((result as any).affectedRows === 0) {
      return NextResponse.json({ error: "Data tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json({ message: "Item pendapatan dihapus" });
  } catch (error: any) {
    console.error("DELETE pendapatan error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}