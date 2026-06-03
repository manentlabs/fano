export async function PUT(req, { params }) {
  const body = await req.json();
  await db.query(
    "UPDATE kegiatan SET bulan=?, kategori_id=?, kegiatan=?, penanggung_jawab=?, keterangan=?, status=? WHERE id=?",
    [body.bulan, body.kategori_id, body.kegiatan, body.penanggung_jawab, body.keterangan, body.status, params.id]
  );
  return NextResponse.json({ ok: true });
}
export async function DELETE(_, { params }) {
  await db.query("DELETE FROM kegiatan WHERE id=?", [params.id]);
  return NextResponse.json({ ok: true });
}