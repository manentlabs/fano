import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const { kategori, urutan, deskripsi } = await request.json();
    const [result] = await db.query(
      "UPDATE swot_items SET kategori = ?, urutan = ?, deskripsi = ? WHERE id = ?",
      [kategori, urutan, deskripsi, id]
    );
    if ((result as any).affectedRows === 0) {
      return NextResponse.json({ error: "Data tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json({ id, kategori, urutan, deskripsi });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const [result] = await db.query("DELETE FROM swot_items WHERE id = ?", [id]);
    if ((result as any).affectedRows === 0) {
      return NextResponse.json({ error: "Data tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json({ message: "Item SWOT dihapus" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}