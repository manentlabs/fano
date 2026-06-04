import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    const body = await request.json();
    const { bulan, bulan_nama, fase, status_fase, target_klien, klien_aktual, target_omset, omset_aktual, catatan } = body;

    const [result] = await db.query(
      `UPDATE tracker_bulanan SET
        bulan = ?, bulan_nama = ?, fase = ?, status_fase = ?, target_klien = ?, klien_aktual = ?,
        target_omset = ?, omset_aktual = ?, catatan = ?
       WHERE id = ?`,
      [bulan, bulan_nama, fase, status_fase, target_klien, klien_aktual, target_omset, omset_aktual, catatan, id]
    );

    if ((result as any).affectedRows === 0) {
      return NextResponse.json({ error: "Data tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json({ id, ...body });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    const [result] = await db.query("DELETE FROM tracker_bulanan WHERE id = ?", [id]);
    if ((result as any).affectedRows === 0) {
      return NextResponse.json({ error: "Data tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json({ message: "Data berhasil dihapus" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}