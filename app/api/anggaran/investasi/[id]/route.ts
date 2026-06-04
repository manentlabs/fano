import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    const { kategori, nomor, uraian, volume, satuan, harga_satuan } = await request.json();
    const [result] = await db.query(
      `UPDATE anggaran_investasi
       SET kategori = ?, nomor = ?, uraian = ?, volume = ?, satuan = ?, harga_satuan = ?
       WHERE id = ?`,
      [kategori, nomor, uraian, volume, satuan, harga_satuan, id]
    );
    if ((result as any).affectedRows === 0) {
      return NextResponse.json({ error: "Data tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json({ id, ...(await request.json()) });
  } catch (error: any) {
    console.error("PUT investasi error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    const [result] = await db.query("DELETE FROM anggaran_investasi WHERE id = ?", [id]);
    if ((result as any).affectedRows === 0) {
      return NextResponse.json({ error: "Data tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json({ message: "Item investasi dihapus" });
  } catch (error: any) {
    console.error("DELETE investasi error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}