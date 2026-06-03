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
const FASE_LIST = ["Fondasi", "Traction", "Pertumbuhan", "Konsolidasi"];
const STATUS_LIST = ["Belum dimulai", "Sedang berjalan", "Tercapai", "Tertunda"];

const formatRupiah = (n: number) => {
  if (isNaN(n)) n = 0; // fallback aman
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(n);
};

// Style helpers (light mode)
const card = {
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
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

export default function TrackerBulananPage() {
  const [rows, setRows] = useState<TrackerRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modal, setModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Gagal mengambil data");
      const data = await res.json();

      // 🔥 Pastikan semua field numerik benar-benar number
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

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const openCreate = () => {
    setEditingId(null);
    // Cari bulan berikutnya yang belum ada
    const existingMonths = rows.map(r => r.bulan);
    let nextBulan = 1;
    while (existingMonths.includes(nextBulan) && nextBulan <= 12) nextBulan++;
    if (nextBulan > 12) nextBulan = 1; // fallback
    setForm({
      ...EMPTY_FORM,
      bulan: nextBulan,
      bulan_nama: BULAN_NAMA[nextBulan] || "",
    });
    setModal(true);
  };

  const openEdit = (row: TrackerRow) => {
    setEditingId(row.id);
    setForm({
      bulan: row.bulan,
      bulan_nama: row.bulan_nama,
      fase: row.fase,
      status_fase: row.status_fase,
      target_klien: row.target_klien,
      klien_aktual: row.klien_aktual,
      target_omset: row.target_omset,
      omset_aktual: row.omset_aktual,
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
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Gagal menyimpan");
      }
      setModal(false);
      await fetchData();
    } catch (e: any) {
      alert(e.message);
    }
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus data ini?")) return;
    setSaving(true);
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      await fetchData();
    } catch {
      alert("Gagal menghapus");
    }
    setSaving(false);
  };

  // Hitung total dengan aman (field sudah number)
  const total = rows.reduce(
    (acc, row) => {
      acc.target_klien += row.target_klien;
      acc.klien_aktual += row.klien_aktual;
      acc.target_omset += row.target_omset;
      acc.omset_aktual += row.omset_aktual;
      return acc;
    },
    { target_klien: 0, klien_aktual: 0, target_omset: 0, omset_aktual: 0 }
  );
  const totalSelisih = total.omset_aktual - total.target_omset;

  if (loading) return <div style={{ padding: 40, textAlign: "center", color: "#6b7280" }}>Memuat data...</div>;
  if (error)
    return (
      <div style={{ padding: 40, textAlign: "center", color: "#dc2626" }}>
        Error: {error}{" "}
        <button onClick={fetchData} style={{ marginLeft: 8, color: "#2563eb", cursor: "pointer", background: "none", border: "none" }}>
          Coba lagi
        </button>
      </div>
    );

  return (
    <div style={{ padding: "24px 28px", background: "#f9fafb", minHeight: "100vh", fontFamily: "system-ui, sans-serif", color: "#111827" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6b7280", margin: "0 0 4px" }}>
            CV Mitra Koperasi Nusantara
          </p>
          <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: "#1f2937" }}>Tracker Progress Bulanan</h1>
        </div>
        <button
          onClick={openCreate}
          style={{
            background: "#f59e0b",
            border: "none",
            borderRadius: 8,
            padding: "8px 18px",
            color: "#1c1917",
            fontWeight: 600,
            fontSize: 13,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Tambah Bulan
        </button>
      </div>

      {/* Tabel */}
      <div style={{ ...card, overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, minWidth: 1000 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #e5e7eb", background: "#f9fafb" }}>
              <th style={thStyle}>Bln</th>
              <th style={thStyle}>Bulan</th>
              <th style={thStyle}>Fase</th>
              <th style={thStyle}>Status Fase</th>
              <th style={thStyle}>Target Klien</th>
              <th style={thStyle}>Klien Aktual</th>
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
              const isNegative = selisih < 0;
              return (
                <tr
                  key={row.id}
                  onClick={() => openEdit(row)}
                  style={{
                    borderBottom: idx < rows.length - 1 ? "1px solid #f3f4f6" : "none",
                    cursor: "pointer",
                    transition: "background 0.1s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fafb")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td style={tdStyle}>{row.bulan}</td>
                  <td style={{ ...tdStyle, fontWeight: 600 }}>{row.bulan_nama}</td>
                  <td style={tdStyle}>{row.fase}</td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "2px 8px",
                        borderRadius: 999,
                        fontSize: 11,
                        fontWeight: 500,
                        background: row.status_fase === "Belum dimulai" ? "#e5e7eb" : "#d1fae5",
                        color: row.status_fase === "Belum dimulai" ? "#374151" : "#065f46",
                      }}
                    >
                      {row.status_fase}
                    </span>
                  </td>
                  <td style={{ ...tdStyle, textAlign: "center" }}>{row.target_klien}</td>
                  <td style={{ ...tdStyle, textAlign: "center" }}>{row.klien_aktual}</td>
                  <td style={{ ...tdStyle, textAlign: "right" }}>{formatRupiah(row.target_omset)}</td>
                  <td style={{ ...tdStyle, textAlign: "right" }}>{formatRupiah(row.omset_aktual)}</td>
                  <td style={{ ...tdStyle, textAlign: "right", color: isNegative ? "#dc2626" : "#059669", fontWeight: 600 }}>
                    {formatRupiah(selisih)}
                  </td>
                  <td style={{ ...tdStyle, color: "#6b7280", fontStyle: row.catatan ? "normal" : "italic" }}>
                    {row.catatan || "-"}
                  </td>
                  <td style={tdStyle}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(row.id);
                      }}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", padding: 4 }}
                      title="Hapus"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}

            {/* TOTAL BARIS */}
            <tr style={{ borderTop: "2px solid #d1d5db", background: "#f3f4f6", fontWeight: 700 }}>
              <td style={{ ...tdStyle, fontWeight: 700 }} colSpan={2}>
                TOTAL
              </td>
              <td style={tdStyle}></td>
              <td style={tdStyle}></td>
              <td style={{ ...tdStyle, textAlign: "center", fontWeight: 700 }}>{total.target_klien}</td>
              <td style={{ ...tdStyle, textAlign: "center", fontWeight: 700 }}>{total.klien_aktual}</td>
              <td style={{ ...tdStyle, textAlign: "right", fontWeight: 700 }}>{formatRupiah(total.target_omset)}</td>
              <td style={{ ...tdStyle, textAlign: "right", fontWeight: 700 }}>{formatRupiah(total.omset_aktual)}</td>
              <td
                style={{
                  ...tdStyle,
                  textAlign: "right",
                  fontWeight: 700,
                  color: totalSelisih < 0 ? "#dc2626" : "#059669",
                }}
              >
                {formatRupiah(totalSelisih)}
              </td>
              <td style={tdStyle}></td>
              <td style={tdStyle}></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Modal Form (sama seperti sebelumnya) */}
      {modal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
            zIndex: 999,
          }}
        >
          <div
            style={{
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: 16,
              width: "100%",
              maxWidth: 560,
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "14px 20px",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "#1f2937" }}>
                {editingId ? "Edit Progress Bulanan" : "Tambah Progress Bulanan"}
              </h3>
              <button
                onClick={() => setModal(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", fontSize: 18 }}
              >
                ✕
              </button>
            </div>
            <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <label style={labelStyle}>Bulan (1-12)</label>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={form.bulan}
                    onChange={(e) => {
                      const v = parseInt(e.target.value) || 1;
                      setForm({ ...form, bulan: v, bulan_nama: BULAN_NAMA[v] || "" });
                    }}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Nama Bulan</label>
                  <input
                    type="text"
                    value={form.bulan_nama}
                    onChange={(e) => setForm({ ...form, bulan_nama: e.target.value })}
                    style={inputStyle}
                  />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <label style={labelStyle}>Fase</label>
                  <select value={form.fase} onChange={(e) => setForm({ ...form, fase: e.target.value })} style={inputStyle}>
                    {FASE_LIST.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Status Fase</label>
                  <select
                    value={form.status_fase}
                    onChange={(e) => setForm({ ...form, status_fase: e.target.value })}
                    style={inputStyle}
                  >
                    {STATUS_LIST.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <label style={labelStyle}>Target Klien</label>
                  <input
                    type="number"
                    value={form.target_klien}
                    onChange={(e) => setForm({ ...form, target_klien: parseInt(e.target.value) || 0 })}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Klien Aktual</label>
                  <input
                    type="number"
                    value={form.klien_aktual}
                    onChange={(e) => setForm({ ...form, klien_aktual: parseInt(e.target.value) || 0 })}
                    style={inputStyle}
                  />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <label style={labelStyle}>Target Omset (Rp)</label>
                  <input
                    type="number"
                    value={form.target_omset}
                    onChange={(e) => setForm({ ...form, target_omset: parseFloat(e.target.value) || 0 })}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Omset Aktual (Rp)</label>
                  <input
                    type="number"
                    value={form.omset_aktual}
                    onChange={(e) => setForm({ ...form, omset_aktual: parseFloat(e.target.value) || 0 })}
                    style={inputStyle}
                  />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Catatan</label>
                <textarea
                  rows={2}
                  value={form.catatan}
                  onChange={(e) => setForm({ ...form, catatan: e.target.value })}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 20px",
                borderTop: "1px solid #e5e7eb",
              }}
            >
              {editingId ? (
                <button
                  onClick={() => {
                    handleDelete(editingId);
                    setModal(false);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#dc2626",
                    cursor: "pointer",
                    fontSize: 13,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Hapus
                </button>
              ) : (
                <div />
              )}
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => setModal(false)}
                  style={{
                    padding: "7px 16px",
                    borderRadius: 8,
                    border: "1px solid #d1d5db",
                    background: "transparent",
                    color: "#374151",
                    fontSize: 13,
                    cursor: "pointer",
                  }}
                >
                  Batal
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={saving}
                  style={{
                    padding: "7px 18px",
                    borderRadius: 8,
                    border: "none",
                    background: "#f59e0b",
                    color: "#1c1917",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: saving ? "not-allowed" : "pointer",
                  }}
                >
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

const thStyle: React.CSSProperties = {
  padding: "10px 12px",
  textAlign: "left",
  fontSize: 11,
  fontWeight: 600,
  color: "#4b5563",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  whiteSpace: "nowrap",
};

const tdStyle: React.CSSProperties = {
  padding: "10px 12px",
  color: "#111827",
  verticalAlign: "middle",
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