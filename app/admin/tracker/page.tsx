"use client";

import { useState, useEffect, useCallback } from "react";

const API_URL = "/api/tracker-bulanan";

type TrackerRow = {
  id: number;
  bulan: number;
  bulan_nama: string;
  fase: string;
  status_fase: string;
  target_klien: number;
  klien_aktual: number;
  target_omset: number;
  omset_aktual: number;
  catatan: string;
};

const EMPTY_FORM: Omit<TrackerRow, "id"> = {
  bulan: 1,
  bulan_nama: "Jan",
  fase: "Fondasi",
  status_fase: "Belum dimulai",
  target_klien: 0,
  klien_aktual: 0,
  target_omset: 0,
  omset_aktual: 0,
  catatan: "",
};

const BULAN_NAMA = ["", "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
const BULAN_PANJANG = ["","Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
const FASE_LIST = ["Fondasi", "Traction", "Pertumbuhan", "Konsolidasi"];
const STATUS_LIST = ["Belum dimulai", "Sedang berjalan", "Tercapai", "Tertunda"];

const FASE_COLOR: Record<string, { bg: string; text: string }> = {
  "Fondasi":      { bg: "rgba(37,99,235,0.1)",   text: "#1e40af" },
  "Traction":     { bg: "rgba(217,119,6,0.1)",   text: "#92400e" },
  "Pertumbuhan":  { bg: "rgba(5,150,105,0.1)",   text: "#065f46" },
  "Konsolidasi":  { bg: "rgba(124,58,237,0.1)",  text: "#5b21b6" },
};

const STATUS_COLOR: Record<string, { bg: string; text: string; dot: string }> = {
  "Belum dimulai":   { bg: "#f3f4f6", text: "#4b5563", dot: "#9ca3af" },
  "Sedang berjalan": { bg: "rgba(217,119,6,0.1)", text: "#92400e", dot: "#d97706" },
  "Tercapai":        { bg: "rgba(5,150,105,0.1)", text: "#065f46", dot: "#059669" },
  "Tertunda":        { bg: "rgba(220,38,38,0.1)", text: "#991b1b", dot: "#dc2626" },
};

const formatRupiah = (n: number) => {
  if (isNaN(n)) n = 0;
  if (Math.abs(n) >= 1_000_000) {
    return (n < 0 ? "-" : "") + "Rp " + (Math.abs(n) / 1_000_000).toFixed(1).replace(".0", "") + " jt";
  }
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);
};
const formatRupiahFull = (n: number) => {
  if (isNaN(n)) n = 0;
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);
};

const card = {
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box" as const,
  background: "#ffffff",
  border: "1px solid #d1d5db",
  borderRadius: 6,
  padding: "10px 12px",
  color: "#111827",
  fontSize: 14,
  outline: "none",
  fontFamily: "inherit",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 11,
  color: "#4b5563",
  marginBottom: 5,
  fontWeight: 600,
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
};

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

export default function TrackerBulananPage() {
  const [rows, setRows] = useState<TrackerRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modal, setModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const isMobile = useIsMobile();

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Gagal mengambil data");
      const data = await res.json();
      const sanitized = data.map((row: any) => ({
        ...row,
        bulan: Number(row.bulan),
        target_klien: Number(row.target_klien) || 0,
        klien_aktual: Number(row.klien_aktual) || 0,
        target_omset: Number(row.target_omset) || 0,
        omset_aktual: Number(row.omset_aktual) || 0,
      }));
      setRows(sanitized);
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openCreate = () => {
    setEditingId(null);
    const existingMonths = rows.map(r => r.bulan);
    let nextBulan = 1;
    while (existingMonths.includes(nextBulan) && nextBulan <= 12) nextBulan++;
    if (nextBulan > 12) nextBulan = 1;
    setForm({ ...EMPTY_FORM, bulan: nextBulan, bulan_nama: BULAN_NAMA[nextBulan] || "" });
    setModal(true);
  };

  const openEdit = (row: TrackerRow) => {
    setEditingId(row.id);
    setForm({
      bulan: row.bulan, bulan_nama: row.bulan_nama,
      fase: row.fase, status_fase: row.status_fase,
      target_klien: row.target_klien, klien_aktual: row.klien_aktual,
      target_omset: row.target_omset, omset_aktual: row.omset_aktual,
      catatan: row.catatan || "",
    });
    setModal(true);
  };

  const handleSubmit = async () => {
    if (!form.bulan || !form.bulan_nama) return;
    setSaving(true);
    try {
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;
      const method = editingId ? "PUT" : "POST";
      const payload = {
        ...form,
        target_klien: Number(form.target_klien),
        klien_aktual: Number(form.klien_aktual),
        target_omset: Number(form.target_omset),
        omset_aktual: Number(form.omset_aktual),
      };
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) { const err = await res.json(); throw new Error(err.error || "Gagal menyimpan"); }
      setModal(false);
      await fetchData();
    } catch (e: any) { alert(e.message); }
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus data ini?")) return;
    setSaving(true);
    try { await fetch(`${API_URL}/${id}`, { method: "DELETE" }); setModal(false); await fetchData(); }
    catch { alert("Gagal menghapus"); }
    setSaving(false);
  };

  const total = rows.reduce(
    (acc, row) => {
      acc.target_klien += row.target_klien; acc.klien_aktual += row.klien_aktual;
      acc.target_omset += row.target_omset; acc.omset_aktual += row.omset_aktual;
      return acc;
    },
    { target_klien: 0, klien_aktual: 0, target_omset: 0, omset_aktual: 0 }
  );
  const totalSelisih = total.omset_aktual - total.target_omset;

  if (loading) return <div style={{ padding: 40, textAlign: "center", color: "#6b7280" }}>Memuat data...</div>;
  if (error) return (
    <div style={{ padding: 40, textAlign: "center", color: "#dc2626" }}>
      Error: {error}{" "}
      <button onClick={fetchData} style={{ marginLeft: 8, color: "#2563eb", cursor: "pointer", background: "none", border: "none" }}>Coba lagi</button>
    </div>
  );

  const thStyle: React.CSSProperties = {
    padding: "10px 12px", textAlign: "left", fontSize: 11,
    fontWeight: 600, color: "#4b5563", textTransform: "uppercase",
    letterSpacing: "0.05em", whiteSpace: "nowrap",
  };
  const tdStyle: React.CSSProperties = { padding: "10px 12px", color: "#111827", verticalAlign: "middle" };

  return (
    <div style={{ padding: isMobile ? "16px 14px" : "24px 28px", background: "#f9fafb", minHeight: "100vh", fontFamily: "system-ui, sans-serif", color: "#111827" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, gap: 10 }}>
        <div style={{ minWidth: 0 }}>
          <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6b7280", margin: "0 0 3px" }}>
            CV Mitra Koperasi Nusantara
          </p>
          <h1 style={{ fontSize: isMobile ? 16 : 20, fontWeight: 700, margin: 0, color: "#1f2937", lineHeight: 1.3 }}>
            Tracker Progress Bulanan
          </h1>
        </div>
        <button
          onClick={openCreate}
          style={{ background: "#f59e0b", border: "none", borderRadius: 8, padding: isMobile ? "8px 12px" : "8px 18px", color: "#1c1917", fontWeight: 600, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          {isMobile ? "" : "Tambah Bulan"}
        </button>
      </div>

      {/* Ringkasan total — mobile only */}
      {isMobile && rows.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          {[
            { label: "Total Klien Target", val: total.target_klien, isNum: true },
            { label: "Klien Aktual", val: total.klien_aktual, isNum: true },
            { label: "Target Omset", val: formatRupiah(total.target_omset), isNum: false },
            { label: "Omset Aktual", val: formatRupiah(total.omset_aktual), isNum: false },
          ].map(s => (
            <div key={s.label} style={{ ...card, padding: "10px 14px" }}>
              <p style={{ fontSize: 10, color: "#6b7280", margin: "0 0 3px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{s.label}</p>
              <p style={{ fontSize: 18, fontWeight: 700, margin: 0, color: "#1f2937" }}>{s.isNum ? s.val : s.val}</p>
            </div>
          ))}
          {/* Selisih full width */}
          <div style={{ ...card, padding: "10px 14px", gridColumn: "1 / -1", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontSize: 10, color: "#6b7280", margin: 0, textTransform: "uppercase", letterSpacing: "0.07em" }}>Selisih Total</p>
            <p style={{ fontSize: 18, fontWeight: 700, margin: 0, color: totalSelisih < 0 ? "#dc2626" : "#059669" }}>{formatRupiah(totalSelisih)}</p>
          </div>
        </div>
      )}

      {/* ── DESKTOP: Tabel ── */}
      {!isMobile && (
        <div style={{ ...card, overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, minWidth: 1000 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #e5e7eb", background: "#f9fafb" }}>
                <th style={thStyle}>Bln</th>
                <th style={thStyle}>Bulan</th>
                <th style={thStyle}>Fase</th>
                <th style={thStyle}>Status Fase</th>
                <th style={{ ...thStyle, textAlign: "center" }}>Target Klien</th>
                <th style={{ ...thStyle, textAlign: "center" }}>Klien Aktual</th>
                <th style={{ ...thStyle, textAlign: "right" }}>Target Omset (Rp)</th>
                <th style={{ ...thStyle, textAlign: "right" }}>Omset Aktual (Rp)</th>
                <th style={{ ...thStyle, textAlign: "right" }}>Selisih (Rp)</th>
                <th style={thStyle}>Catatan</th>
                <th style={{ ...thStyle, width: 70 }}></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => {
                const selisih = row.omset_aktual - row.target_omset;
                const sc = STATUS_COLOR[row.status_fase] ?? STATUS_COLOR["Belum dimulai"];
                const fc = FASE_COLOR[row.fase] ?? { bg: "#f3f4f6", text: "#374151" };
                return (
                  <tr key={row.id} onClick={() => openEdit(row)}
                    style={{ borderBottom: idx < rows.length - 1 ? "1px solid #f3f4f6" : "none", cursor: "pointer" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#f9fafb")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                    <td style={tdStyle}>{row.bulan}</td>
                    <td style={{ ...tdStyle, fontWeight: 600 }}>{row.bulan_nama}</td>
                    <td style={tdStyle}>
                      <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 999, fontSize: 11, fontWeight: 500, background: fc.bg, color: fc.text }}>{row.fase}</span>
                    </td>
                    <td style={tdStyle}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "2px 8px", borderRadius: 999, fontSize: 11, fontWeight: 500, background: sc.bg, color: sc.text }}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: sc.dot }}></span>
                        {row.status_fase}
                      </span>
                    </td>
                    <td style={{ ...tdStyle, textAlign: "center" }}>{row.target_klien}</td>
                    <td style={{ ...tdStyle, textAlign: "center" }}>{row.klien_aktual}</td>
                    <td style={{ ...tdStyle, textAlign: "right" }}>{formatRupiahFull(row.target_omset)}</td>
                    <td style={{ ...tdStyle, textAlign: "right" }}>{formatRupiahFull(row.omset_aktual)}</td>
                    <td style={{ ...tdStyle, textAlign: "right", color: selisih < 0 ? "#dc2626" : "#059669", fontWeight: 600 }}>{formatRupiahFull(selisih)}</td>
                    <td style={{ ...tdStyle, color: "#6b7280", fontStyle: row.catatan ? "normal" : "italic" }}>{row.catatan || "-"}</td>
                    <td style={tdStyle}>
                      <button onClick={e => { e.stopPropagation(); handleDelete(row.id); }}
                        style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", padding: 4 }} title="Hapus">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                      </button>
                    </td>
                  </tr>
                );
              })}
              {/* Total row */}
              <tr style={{ borderTop: "2px solid #d1d5db", background: "#f3f4f6", fontWeight: 700 }}>
                <td style={{ ...tdStyle, fontWeight: 700 }} colSpan={2}>TOTAL</td>
                <td style={tdStyle}></td><td style={tdStyle}></td>
                <td style={{ ...tdStyle, textAlign: "center", fontWeight: 700 }}>{total.target_klien}</td>
                <td style={{ ...tdStyle, textAlign: "center", fontWeight: 700 }}>{total.klien_aktual}</td>
                <td style={{ ...tdStyle, textAlign: "right", fontWeight: 700 }}>{formatRupiahFull(total.target_omset)}</td>
                <td style={{ ...tdStyle, textAlign: "right", fontWeight: 700 }}>{formatRupiahFull(total.omset_aktual)}</td>
                <td style={{ ...tdStyle, textAlign: "right", fontWeight: 700, color: totalSelisih < 0 ? "#dc2626" : "#059669" }}>{formatRupiahFull(totalSelisih)}</td>
                <td style={tdStyle}></td><td style={tdStyle}></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* ── MOBILE: Card list ── */}
      {isMobile && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {rows.length === 0 && (
            <div style={{ textAlign: "center", padding: 48, color: "#6b7280", fontSize: 13 }}>Belum ada data. Tap + untuk menambah.</div>
          )}
          {rows.map(row => {
            const selisih = row.omset_aktual - row.target_omset;
            const sc = STATUS_COLOR[row.status_fase] ?? STATUS_COLOR["Belum dimulai"];
            const fc = FASE_COLOR[row.fase] ?? { bg: "#f3f4f6", text: "#374151" };
            const pctKlien = row.target_klien > 0 ? Math.min(100, Math.round((row.klien_aktual / row.target_klien) * 100)) : 0;
            const pctOmset = row.target_omset > 0 ? Math.min(100, Math.round((row.omset_aktual / row.target_omset) * 100)) : 0;
            return (
              <div key={row.id} onClick={() => openEdit(row)}
                style={{ ...card, padding: "14px 16px", cursor: "pointer" }}>
                {/* Row 1: Bulan + badges */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#92400e" }}>{BULAN_NAMA[row.bulan] || row.bulan_nama}</span>
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#111827" }}>{BULAN_PANJANG[row.bulan] || row.bulan_nama}</p>
                      <span style={{ fontSize: 10, fontWeight: 600, padding: "1px 7px", borderRadius: 999, background: fc.bg, color: fc.text }}>{row.fase}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 8px", borderRadius: 999, background: sc.bg, color: sc.text, fontSize: 10, fontWeight: 600, whiteSpace: "nowrap" }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: sc.dot }}></span>
                      {row.status_fase}
                    </span>
                    <button onClick={e => { e.stopPropagation(); handleDelete(row.id); }}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "#dc2626", padding: 4, display: "flex", alignItems: "center" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                    </button>
                  </div>
                </div>

                {/* Row 2: Klien progress */}
                <div style={{ marginBottom: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 11, color: "#6b7280" }}>Klien</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#111827" }}>{row.klien_aktual} / {row.target_klien} <span style={{ color: "#6b7280", fontWeight: 400 }}>({pctKlien}%)</span></span>
                  </div>
                  <div style={{ height: 5, background: "#e5e7eb", borderRadius: 999, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${pctKlien}%`, background: pctKlien >= 100 ? "#059669" : "#f59e0b", borderRadius: 999, transition: "width 0.3s" }}></div>
                  </div>
                </div>

                {/* Row 3: Omset progress */}
                <div style={{ marginBottom: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 11, color: "#6b7280" }}>Omset</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#111827" }}>{formatRupiah(row.omset_aktual)} / {formatRupiah(row.target_omset)} <span style={{ color: "#6b7280", fontWeight: 400 }}>({pctOmset}%)</span></span>
                  </div>
                  <div style={{ height: 5, background: "#e5e7eb", borderRadius: 999, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${pctOmset}%`, background: pctOmset >= 100 ? "#059669" : "#2563eb", borderRadius: 999, transition: "width 0.3s" }}></div>
                  </div>
                </div>

                {/* Row 4: Selisih */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 8, borderTop: "1px solid #f3f4f6" }}>
                  <span style={{ fontSize: 11, color: "#6b7280" }}>Selisih</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: selisih < 0 ? "#dc2626" : "#059669" }}>{formatRupiah(selisih)}</span>
                </div>

                {/* Row 5: Catatan */}
                {row.catatan && (
                  <p style={{ margin: "8px 0 0", fontSize: 11, color: "#9ca3af", fontStyle: "italic", lineHeight: 1.4 }}>📝 {row.catatan}</p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── MODAL ── */}
      {modal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: isMobile ? "flex-end" : "center", justifyContent: "center", padding: isMobile ? 0 : 16, zIndex: 999 }}>
          <div style={{
            background: "#fff", border: "1px solid #e5e7eb",
            borderRadius: isMobile ? "16px 16px 0 0" : 16,
            width: "100%", maxWidth: isMobile ? "100%" : 560,
            maxHeight: isMobile ? "92vh" : "90vh", overflowY: "auto",
          }}>
            {/* Drag handle */}
            {isMobile && (
              <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 4px" }}>
                <div style={{ width: 36, height: 4, borderRadius: 2, background: "#d1d5db" }}></div>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", borderBottom: "1px solid #e5e7eb" }}>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "#1f2937" }}>
                {editingId ? "Edit Progress Bulanan" : "Tambah Progress Bulanan"}
              </h3>
              <button onClick={() => setModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", fontSize: 20, padding: "0 4px" }}>✕</button>
            </div>

            <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <label style={labelStyle}>Bulan (1-12)</label>
                  <input type="number" min={1} max={12} value={form.bulan}
                    onChange={e => { const v = parseInt(e.target.value) || 1; setForm({ ...form, bulan: v, bulan_nama: BULAN_NAMA[v] || "" }); }}
                    style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Nama Bulan</label>
                  <input type="text" value={form.bulan_nama} onChange={e => setForm({ ...form, bulan_nama: e.target.value })} style={inputStyle} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <label style={labelStyle}>Fase</label>
                  <select value={form.fase} onChange={e => setForm({ ...form, fase: e.target.value })} style={inputStyle}>
                    {FASE_LIST.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Status Fase</label>
                  <select value={form.status_fase} onChange={e => setForm({ ...form, status_fase: e.target.value })} style={inputStyle}>
                    {STATUS_LIST.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <label style={labelStyle}>Target Klien</label>
                  <input type="number" value={form.target_klien} onChange={e => setForm({ ...form, target_klien: parseInt(e.target.value) || 0 })} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Klien Aktual</label>
                  <input type="number" value={form.klien_aktual} onChange={e => setForm({ ...form, klien_aktual: parseInt(e.target.value) || 0 })} style={inputStyle} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <label style={labelStyle}>Target Omset (Rp)</label>
                  <input type="number" value={form.target_omset} onChange={e => setForm({ ...form, target_omset: parseFloat(e.target.value) || 0 })} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Omset Aktual (Rp)</label>
                  <input type="number" value={form.omset_aktual} onChange={e => setForm({ ...form, omset_aktual: parseFloat(e.target.value) || 0 })} style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Catatan</label>
                <textarea rows={2} value={form.catatan} onChange={e => setForm({ ...form, catatan: e.target.value })} style={{ ...inputStyle, resize: "vertical" }} />
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", borderTop: "1px solid #e5e7eb", paddingBottom: isMobile ? 28 : 12 }}>
              {editingId ? (
                <button onClick={() => { handleDelete(editingId); setModal(false); }}
                  style={{ background: "none", border: "none", color: "#dc2626", cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", gap: 4, padding: "8px 0", fontFamily: "inherit" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                  Hapus
                </button>
              ) : <div />}
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setModal(false)}
                  style={{ padding: "9px 16px", borderRadius: 8, border: "1px solid #d1d5db", background: "transparent", color: "#374151", fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>
                  Batal
                </button>
                <button onClick={handleSubmit} disabled={saving}
                  style={{ padding: "9px 20px", borderRadius: 8, border: "none", background: "#f59e0b", color: "#1c1917", fontSize: 14, fontWeight: 600, cursor: saving ? "not-allowed" : "pointer", fontFamily: "inherit" }}>
                  {saving ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}