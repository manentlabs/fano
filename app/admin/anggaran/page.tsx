"use client";

import { useState, useEffect, useCallback } from "react";

const API_INVESTASI = "/api/anggaran/investasi";
const API_PENDAPATAN = "/api/anggaran/pendapatan";

type InvestasiItem = {
  id: number;
  kategori: string;
  nomor: number;
  uraian: string;
  volume: number;
  satuan: string;
  harga_satuan: number;
  total: number;
};

type PendapatanItem = {
  id: number;
  nomor: number;
  sumber_pendapatan: string;
  tahun1: number;
  tahun2: number;
  tahun3: number;
};

const KATEGORI_LABEL: Record<string, string> = {
  A: "BIAYA PENDIRIAN & LEGALITAS",
  B: "SARANA & PRASARANA",
  C: "PEMASARAN & BRANDING",
  D: "MODAL KERJA AWAL (3 BULAN)",
};

const formatRupiah = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(n);

// Compact rupiah for mobile cards
const formatRupiahCompact = (n: number) => {
  if (n >= 1_000_000_000) return `Rp ${(n / 1_000_000_000).toFixed(1)}M`;
  if (n >= 1_000_000) return `Rp ${(n / 1_000_000).toFixed(1)}jt`;
  if (n >= 1_000) return `Rp ${(n / 1_000).toFixed(0)}rb`;
  return `Rp ${n}`;
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  background: "#ffffff",
  border: "1px solid #d1d5db",
  borderRadius: 6,
  padding: "7px 10px",
  color: "#111827",
  fontSize: 13,
  outline: "none",
  fontFamily: "inherit",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 11,
  color: "#4b5563",
  marginBottom: 5,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};

const thStyle: React.CSSProperties = {
  padding: "8px 10px",
  textAlign: "left",
  fontSize: 11,
  fontWeight: 600,
  color: "#4b5563",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  whiteSpace: "nowrap",
};

const tdStyle: React.CSSProperties = {
  padding: "8px 10px",
  color: "#111827",
  verticalAlign: "middle",
};

export default function AnggaranPage() {
  const [investasi, setInvestasi] = useState<InvestasiItem[]>([]);
  const [pendapatan, setPendapatan] = useState<PendapatanItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editType, setEditType] = useState<"investasi" | "pendapatan">("investasi");
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [resInv, resPen] = await Promise.all([
        fetch(API_INVESTASI),
        fetch(API_PENDAPATAN),
      ]);
      if (!resInv.ok || !resPen.ok) throw new Error("Gagal mengambil data");
      const invData = await resInv.json();
      const penData = await resPen.json();
      setInvestasi(
        invData.map((i: any) => ({
          ...i,
          volume: Number(i.volume),
          harga_satuan: Number(i.harga_satuan),
          total: Number(i.total),
        }))
      );
      setPendapatan(
        penData.map((p: any) => ({
          ...p,
          tahun1: Number(p.tahun1),
          tahun2: Number(p.tahun2),
          tahun3: Number(p.tahun3),
        }))
      );
    } catch (e: any) {
      alert(e.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const openAddInvestasi = (kategori: string) => {
    setEditType("investasi");
    setEditId(null);
    const itemsInKat = investasi.filter((i) => i.kategori === kategori);
    const maxNomor = itemsInKat.reduce((max, i) => Math.max(max, i.nomor), 0);
    setForm({ kategori, nomor: maxNomor + 1, uraian: "", volume: 1, satuan: "", harga_satuan: 0 });
    setModal(true);
  };

  const openEditInvestasi = (item: InvestasiItem) => {
    setEditType("investasi");
    setEditId(item.id);
    setForm({
      kategori: item.kategori,
      nomor: item.nomor,
      uraian: item.uraian,
      volume: item.volume,
      satuan: item.satuan,
      harga_satuan: item.harga_satuan,
    });
    setModal(true);
  };

  const openAddPendapatan = () => {
    setEditType("pendapatan");
    setEditId(null);
    const maxNomor = pendapatan.reduce((max, p) => Math.max(max, p.nomor), 0);
    setForm({ nomor: maxNomor + 1, sumber_pendapatan: "", tahun1: 0, tahun2: 0, tahun3: 0 });
    setModal(true);
  };

  const openEditPendapatan = (item: PendapatanItem) => {
    setEditType("pendapatan");
    setEditId(item.id);
    setForm({
      nomor: item.nomor,
      sumber_pendapatan: item.sumber_pendapatan,
      tahun1: item.tahun1,
      tahun2: item.tahun2,
      tahun3: item.tahun3,
    });
    setModal(true);
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      const url =
        editType === "investasi"
          ? editId ? `${API_INVESTASI}/${editId}` : API_INVESTASI
          : editId ? `${API_PENDAPATAN}/${editId}` : API_PENDAPATAN;
      const method = editId ? "PUT" : "POST";
      const payload = editType === "investasi" ? { ...form, total: undefined } : { ...form };
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Gagal menyimpan");
      setModal(false);
      await fetchData();
    } catch (e: any) {
      alert(e.message);
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!confirm("Hapus item ini?")) return;
    setSaving(true);
    try {
      const url =
        editType === "investasi" ? `${API_INVESTASI}/${editId}` : `${API_PENDAPATAN}/${editId}`;
      await fetch(url, { method: "DELETE" });
      setModal(false);
      await fetchData();
    } catch {
      alert("Gagal menghapus");
    }
    setSaving(false);
  };

  const groupedInvestasi = investasi.reduce<Record<string, InvestasiItem[]>>((acc, item) => {
    (acc[item.kategori] ??= []).push(item);
    return acc;
  }, {});

  const subtotals = {
    A: (groupedInvestasi["A"] || []).reduce((s, i) => s + i.total, 0),
    B: (groupedInvestasi["B"] || []).reduce((s, i) => s + i.total, 0),
    C: (groupedInvestasi["C"] || []).reduce((s, i) => s + i.total, 0),
    D: (groupedInvestasi["D"] || []).reduce((s, i) => s + i.total, 0),
  };
  const totalInvestasi = Object.values(subtotals).reduce((s, v) => s + v, 0);
  const totalTahun1 = pendapatan.reduce((s, p) => s + p.tahun1, 0);
  const totalTahun2 = pendapatan.reduce((s, p) => s + p.tahun2, 0);
  const totalTahun3 = pendapatan.reduce((s, p) => s + p.tahun3, 0);

  if (loading)
    return <div style={{ padding: 40, textAlign: "center", color: "#6b7280" }}>Memuat data...</div>;

  return (
    <>
      <style>{`
        .anggaran-section {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 32px;
        }
        .section-header {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 16px;
          color: #1f2937;
          border-bottom: 2px solid #f59e0b;
          padding-bottom: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
        }
        /* Desktop: table view */
        .investasi-table { display: table; width: 100%; }
        .investasi-cards { display: none; }
        .pendapatan-table { display: table; width: 100%; }
        .pendapatan-cards { display: none; }
        /* Mobile grid for modal inputs */
        .modal-grid-2 { display: grid; grid-template-columns: 60px 1fr; gap: 10px; }
        .modal-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
        @media (max-width: 639px) {
          .anggaran-section { padding: 14px 12px; }
          .section-header { font-size: 14px; }
          /* Switch tables to card view */
          .investasi-table { display: none; }
          .investasi-cards { display: block; }
          .pendapatan-table { display: none; }
          .pendapatan-cards { display: block; }
          /* Stack modal grids on mobile */
          .modal-grid-2 { grid-template-columns: 60px 1fr; }
          .modal-grid-3 { grid-template-columns: 1fr; }
        }
      `}</style>

      <div
        style={{
          padding: isMobile ? "16px 14px" : "24px 28px",
          background: "#f9fafb",
          minHeight: "100vh",
          fontFamily: "system-ui, sans-serif",
          color: "#111827",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: isMobile ? 16 : 24 }}>
          <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6b7280", margin: "0 0 4px" }}>
            CV Mitra Koperasi Nusantara
          </p>
          <h1 style={{ fontSize: isMobile ? 18 : 22, fontWeight: 700, margin: 0, color: "#1f2937" }}>
            Rencana Anggaran Usaha
          </h1>
        </div>

        {/* ===== INVESTASI AWAL ===== */}
        <div className="anggaran-section">
          <h2 className="section-header">
            <span>{isMobile ? "A. INVESTASI AWAL" : "A. INVESTASI AWAL (TAHUN PERTAMA)"}</span>
          </h2>

          {(["A", "B", "C", "D"] as const).map((kat) => {
            const items = (groupedInvestasi[kat] || []).sort((a, b) => a.nomor - b.nomor);
            const subtotal = subtotals[kat];
            return (
              <div key={kat} style={{ marginBottom: 24 }}>
                {/* Kategori header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, gap: 8 }}>
                  <h3 style={{ fontSize: isMobile ? 12 : 14, fontWeight: 600, margin: 0, color: "#374151", flexShrink: 1 }}>
                    {kat}. {isMobile ? kat === "A" ? "PENDIRIAN & LEGALITAS" : kat === "B" ? "SARANA & PRASARANA" : kat === "C" ? "PEMASARAN & BRANDING" : "MODAL KERJA AWAL" : KATEGORI_LABEL[kat]}
                  </h3>
                  <button
                    onClick={() => openAddInvestasi(kat)}
                    style={{ background: "#f59e0b", border: "none", borderRadius: 6, padding: isMobile ? "5px 8px" : "4px 12px", color: "#1c1917", fontSize: isMobile ? 11 : 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}
                  >
                    + Tambah
                  </button>
                </div>

                {items.length === 0 ? (
                  <p style={{ color: "#9ca3af", fontSize: 13, fontStyle: "italic", margin: 0 }}>Belum ada item</p>
                ) : (
                  <>
                    {/* DESKTOP: table */}
                    <table className="investasi-table" style={{ borderCollapse: "collapse", fontSize: 12 }}>
                      <thead>
                        <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                          <th style={thStyle}>No</th>
                          <th style={thStyle}>Uraian</th>
                          <th style={thStyle}>Volume</th>
                          <th style={thStyle}>Satuan</th>
                          <th style={{ ...thStyle, textAlign: "right" }}>Harga Satuan (Rp)</th>
                          <th style={{ ...thStyle, textAlign: "right" }}>Total (Rp)</th>
                          <th style={{ ...thStyle, width: 40 }}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item) => (
                          <tr
                            key={item.id}
                            style={{ borderBottom: "1px solid #f3f4f6", cursor: "pointer" }}
                            onClick={() => openEditInvestasi(item)}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fafb")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                          >
                            <td style={tdStyle}>{item.nomor}</td>
                            <td style={tdStyle}>{item.uraian}</td>
                            <td style={tdStyle}>{item.volume}</td>
                            <td style={tdStyle}>{item.satuan}</td>
                            <td style={{ ...tdStyle, textAlign: "right" }}>{formatRupiah(item.harga_satuan)}</td>
                            <td style={{ ...tdStyle, textAlign: "right", fontWeight: 600 }}>{formatRupiah(item.total)}</td>
                            <td style={tdStyle}>
                              <button onClick={(e) => { e.stopPropagation(); openEditInvestasi(item); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", padding: 2 }}>✎</button>
                            </td>
                          </tr>
                        ))}
                        <tr style={{ background: "#f3f4f6", fontWeight: 600 }}>
                          <td style={tdStyle} colSpan={5} align="right">Subtotal {kat}</td>
                          <td style={{ ...tdStyle, textAlign: "right", fontWeight: 700 }}>{formatRupiah(subtotal)}</td>
                          <td style={tdStyle}></td>
                        </tr>
                      </tbody>
                    </table>

                    {/* MOBILE: cards */}
                    <div className="investasi-cards">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => openEditInvestasi(item)}
                          style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 8, padding: "10px 12px", marginBottom: 8, cursor: "pointer" }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                            <div style={{ flex: 1 }}>
                              <span style={{ fontSize: 11, color: "#6b7280", marginRight: 6 }}>#{item.nomor}</span>
                              <span style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{item.uraian}</span>
                              <div style={{ fontSize: 11, color: "#6b7280", marginTop: 3 }}>
                                {item.volume} {item.satuan} × {formatRupiahCompact(item.harga_satuan)}
                              </div>
                            </div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: "#059669", whiteSpace: "nowrap" }}>
                              {formatRupiahCompact(item.total)}
                            </div>
                          </div>
                        </div>
                      ))}
                      {/* Subtotal mobile */}
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", background: "#f3f4f6", borderRadius: 8, fontWeight: 600, fontSize: 13 }}>
                        <span>Subtotal {kat}</span>
                        <span style={{ color: "#059669" }}>{formatRupiahCompact(subtotal)}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}

          {/* TOTAL INVESTASI */}
          <div style={{ marginTop: 8, padding: "12px 0", borderTop: "2px solid #1f2937", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: isMobile ? 13 : 16, fontWeight: 700, color: "#1f2937" }}>TOTAL INVESTASI AWAL</span>
            <span style={{ fontSize: isMobile ? 16 : 20, fontWeight: 700, color: "#059669" }}>
              {isMobile ? formatRupiahCompact(totalInvestasi) : formatRupiah(totalInvestasi)}
            </span>
          </div>
        </div>

        {/* ===== PROYEKSI PENDAPATAN ===== */}
        <div className="anggaran-section" style={{ marginBottom: 0 }}>
          <h2 className="section-header">
            <span>{isMobile ? "B. PROYEKSI PENDAPATAN" : "B. PROYEKSI PENDAPATAN & LABA (3 TAHUN)"}</span>
            <button
              onClick={openAddPendapatan}
              style={{ background: "#f59e0b", border: "none", borderRadius: 6, padding: isMobile ? "6px 10px" : "6px 14px", color: "#1c1917", fontSize: isMobile ? 11 : 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}
            >
              + Tambah
            </button>
          </h2>

          {/* DESKTOP: table */}
          <table className="pendapatan-table" style={{ borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                <th style={thStyle}>No</th>
                <th style={thStyle}>Sumber Pendapatan</th>
                <th style={{ ...thStyle, textAlign: "right" }}>Tahun 1 (Rp)</th>
                <th style={{ ...thStyle, textAlign: "right" }}>Tahun 2 (Rp)</th>
                <th style={{ ...thStyle, textAlign: "right" }}>Tahun 3 (Rp)</th>
                <th style={{ ...thStyle, width: 40 }}></th>
              </tr>
            </thead>
            <tbody>
              {pendapatan.sort((a, b) => a.nomor - b.nomor).map((item) => (
                <tr
                  key={item.id}
                  style={{ borderBottom: "1px solid #f3f4f6", cursor: "pointer" }}
                  onClick={() => openEditPendapatan(item)}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fafb")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td style={tdStyle}>{item.nomor}</td>
                  <td style={tdStyle}>{item.sumber_pendapatan}</td>
                  <td style={{ ...tdStyle, textAlign: "right" }}>{formatRupiah(item.tahun1)}</td>
                  <td style={{ ...tdStyle, textAlign: "right" }}>{formatRupiah(item.tahun2)}</td>
                  <td style={{ ...tdStyle, textAlign: "right" }}>{formatRupiah(item.tahun3)}</td>
                  <td style={tdStyle}>
                    <button onClick={(e) => { e.stopPropagation(); openEditPendapatan(item); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", padding: 2 }}>✎</button>
                  </td>
                </tr>
              ))}
              <tr style={{ background: "#f3f4f6", fontWeight: 600 }}>
                <td style={tdStyle} colSpan={2} align="right">TOTAL PENDAPATAN</td>
                <td style={{ ...tdStyle, textAlign: "right", fontWeight: 700 }}>{formatRupiah(totalTahun1)}</td>
                <td style={{ ...tdStyle, textAlign: "right", fontWeight: 700 }}>{formatRupiah(totalTahun2)}</td>
                <td style={{ ...tdStyle, textAlign: "right", fontWeight: 700 }}>{formatRupiah(totalTahun3)}</td>
                <td style={tdStyle}></td>
              </tr>
            </tbody>
          </table>

          {/* MOBILE: cards */}
          <div className="pendapatan-cards">
            {pendapatan.sort((a, b) => a.nomor - b.nomor).map((item) => (
              <div
                key={item.id}
                onClick={() => openEditPendapatan(item)}
                style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 8, padding: "10px 12px", marginBottom: 8, cursor: "pointer" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div>
                    <span style={{ fontSize: 11, color: "#6b7280", marginRight: 6 }}>#{item.nomor}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{item.sumber_pendapatan}</span>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); openEditPendapatan(item); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", fontSize: 14 }}>✎</button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4 }}>
                  {[["Tahun 1", item.tahun1], ["Tahun 2", item.tahun2], ["Tahun 3", item.tahun3]].map(([label, val]) => (
                    <div key={label as string} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 6, padding: "6px 8px", textAlign: "center" }}>
                      <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 2 }}>{label}</div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#059669" }}>{formatRupiahCompact(val as number)}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {/* Total mobile */}
            <div style={{ background: "#f3f4f6", borderRadius: 8, padding: "10px 12px" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#1f2937", marginBottom: 8 }}>TOTAL PENDAPATAN</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4 }}>
                {[["Tahun 1", totalTahun1], ["Tahun 2", totalTahun2], ["Tahun 3", totalTahun3]].map(([label, val]) => (
                  <div key={label as string} style={{ background: "#fff", border: "1px solid #d1d5db", borderRadius: 6, padding: "6px 8px", textAlign: "center" }}>
                    <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 2 }}>{label}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#059669" }}>{formatRupiahCompact(val as number)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* MODAL */}
        {modal && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.4)",
              display: "flex",
              alignItems: isMobile ? "flex-end" : "center",
              justifyContent: "center",
              padding: isMobile ? 0 : 16,
              zIndex: 999,
            }}
          >
            <div
              style={{
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: isMobile ? "16px 16px 0 0" : 16,
                width: "100%",
                maxWidth: isMobile ? "100%" : 520,
                maxHeight: "90vh",
                overflowY: "auto",
              }}
            >
              {isMobile && (
                <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 0" }}>
                  <div style={{ width: 36, height: 4, borderRadius: 2, background: "#d1d5db" }} />
                </div>
              )}
              <div style={{ padding: "14px 20px", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>
                  {editType === "investasi"
                    ? editId ? "Edit Item Investasi" : "Tambah Item Investasi"
                    : editId ? "Edit Sumber Pendapatan" : "Tambah Sumber Pendapatan"}
                </h3>
                <button onClick={() => setModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", fontSize: 18, padding: "4px 6px", lineHeight: 1 }}>✕</button>
              </div>

              <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
                {editType === "investasi" ? (
                  <>
                    <div>
                      <label style={labelStyle}>Kategori</label>
                      <select value={form.kategori} onChange={(e) => setForm({ ...form, kategori: e.target.value })} style={inputStyle}>
                        <option value="A">A - {KATEGORI_LABEL["A"]}</option>
                        <option value="B">B - {KATEGORI_LABEL["B"]}</option>
                        <option value="C">C - {KATEGORI_LABEL["C"]}</option>
                        <option value="D">D - {KATEGORI_LABEL["D"]}</option>
                      </select>
                    </div>
                    <div className="modal-grid-2">
                      <div>
                        <label style={labelStyle}>No</label>
                        <input type="number" value={form.nomor} onChange={(e) => setForm({ ...form, nomor: parseInt(e.target.value) || 1 })} style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Uraian</label>
                        <input type="text" value={form.uraian} onChange={(e) => setForm({ ...form, uraian: e.target.value })} style={inputStyle} />
                      </div>
                    </div>
                    <div className="modal-grid-3">
                      <div>
                        <label style={labelStyle}>Volume</label>
                        <input type="number" value={form.volume} onChange={(e) => setForm({ ...form, volume: parseFloat(e.target.value) || 0 })} style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Satuan</label>
                        <input type="text" value={form.satuan} onChange={(e) => setForm({ ...form, satuan: e.target.value })} style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Harga Satuan (Rp)</label>
                        <input type="number" value={form.harga_satuan} onChange={(e) => setForm({ ...form, harga_satuan: parseFloat(e.target.value) || 0 })} style={inputStyle} />
                      </div>
                    </div>
                    <div>
                      <label style={labelStyle}>Total (Otomatis)</label>
                      <input type="text" readOnly value={formatRupiah((form.volume || 0) * (form.harga_satuan || 0))} style={{ ...inputStyle, background: "#f3f4f6", color: "#374151" }} />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="modal-grid-2">
                      <div>
                        <label style={labelStyle}>No</label>
                        <input type="number" value={form.nomor} onChange={(e) => setForm({ ...form, nomor: parseInt(e.target.value) || 1 })} style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Sumber Pendapatan</label>
                        <input type="text" value={form.sumber_pendapatan} onChange={(e) => setForm({ ...form, sumber_pendapatan: e.target.value })} style={inputStyle} />
                      </div>
                    </div>
                    <div className="modal-grid-3">
                      <div>
                        <label style={labelStyle}>Tahun 1 (Rp)</label>
                        <input type="number" value={form.tahun1} onChange={(e) => setForm({ ...form, tahun1: parseFloat(e.target.value) || 0 })} style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Tahun 2 (Rp)</label>
                        <input type="number" value={form.tahun2} onChange={(e) => setForm({ ...form, tahun2: parseFloat(e.target.value) || 0 })} style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Tahun 3 (Rp)</label>
                        <input type="number" value={form.tahun3} onChange={(e) => setForm({ ...form, tahun3: parseFloat(e.target.value) || 0 })} style={inputStyle} />
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div
                style={{
                  padding: "12px 20px",
                  borderTop: "1px solid #e5e7eb",
                  display: "flex",
                  justifyContent: editId ? "space-between" : "flex-end",
                  alignItems: "center",
                  paddingBottom: isMobile ? "max(12px, env(safe-area-inset-bottom))" : 12,
                }}
              >
                {editId && (
                  <button onClick={handleDelete} style={{ background: "none", border: "none", color: "#dc2626", cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", gap: 4, padding: "8px 0" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Hapus
                  </button>
                )}
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => setModal(false)} style={{ padding: isMobile ? "9px 16px" : "7px 16px", borderRadius: 8, border: "1px solid #d1d5db", background: "transparent", color: "#374151", fontSize: 13, cursor: "pointer" }}>Batal</button>
                  <button onClick={handleSubmit} disabled={saving} style={{ padding: isMobile ? "9px 18px" : "7px 18px", borderRadius: 8, border: "none", background: "#f59e0b", color: "#1c1917", fontSize: 13, fontWeight: 600, cursor: saving ? "not-allowed" : "pointer" }}>
                    {saving ? "Menyimpan..." : "Simpan"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}