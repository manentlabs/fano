import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { bulan, kategori_id, kegiatan, penanggung_jawab, keterangan, status } = body;

    await db.query(
      `UPDATE kegiatan SET bulan=?, kategori_id=?, kegiatan=?, penanggung_jawab=?, keterangan=?, status=? WHERE id=?`,
      [bulan, kategori_id, kegiatan, penanggung_jawab, keterangan, status, id]
    );

    return NextResponse.json({ id, ...body });
  } catch (error: any) {
    console.error("PUT kegiatan error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.query("DELETE FROM kegiatan WHERE id = ?", [id]);
    return NextResponse.json({ message: "Kegiatan dihapus" });
  } catch (error: any) {
    console.error("DELETE kegiatan error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}