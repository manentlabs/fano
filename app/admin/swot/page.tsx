"use client";

import { useState, useEffect, useCallback } from "react";

const API_SWOT = "/api/swot/items";
const API_STRATEGI = "/api/strategi";

type SwotItem = { id: number; kategori: "S" | "W" | "O" | "T"; urutan: number; deskripsi: string };
type StrategiItem = { id: number; tipe: "SO" | "WO" | "ST" | "WT"; urutan: number; strategi: string };

const KATEGORI_LABEL: Record<string, string> = {
  S: "KEKUATAN (Strengths)",
  W: "KELEMAHAN (Weaknesses)",
  O: "PELUANG (Opportunities)",
  T: "ANCAMAN (Threats)",
};

const WARNA_KATEGORI: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  S: { bg: "#f0fdf4", border: "#bbf7d0", text: "#166534", badge: "#22c55e" },
  W: { bg: "#fef2f2", border: "#fecaca", text: "#991b1b", badge: "#ef4444" },
  O: { bg: "#eff6ff", border: "#bfdbfe", text: "#1e40af", badge: "#3b82f6" },
  T: { bg: "#fff7ed", border: "#fed7aa", text: "#9a3412", badge: "#f97316" },
};

const TIPE_STRATEGI_LABEL: Record<string, string> = {
  SO: "SO — Strategi Pertumbuhan",
  WO: "WO — Strategi Perbaikan",
  ST: "ST — Strategi Kompetitif",
  WT: "WT — Strategi Defensif",
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

export default function SwotPage() {
  const [swotItems, setSwotItems] = useState<SwotItem[]>([]);
  const [strategiItems, setStrategiItems] = useState<StrategiItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editType, setEditType] = useState<"swot" | "strategi">("swot");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<any>({});
  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [resSwot, resStr] = await Promise.all([fetch(API_SWOT), fetch(API_STRATEGI)]);
      if (!resSwot.ok || !resStr.ok) throw new Error("Gagal mengambil data");
      const swotData = await resSwot.json();
      const strData = await resStr.json();
      setSwotItems(swotData);
      setStrategiItems(strData);
    } catch (e: any) {
      alert(e.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const openAddSwot = (kategori: string) => {
    setEditType("swot");
    setEditingId(null);
    const maxUrutan = swotItems
      .filter((item) => item.kategori === kategori)
      .reduce((max, item) => Math.max(max, item.urutan), 0);
    setForm({ kategori, urutan: maxUrutan + 1, deskripsi: "" });
    setModal(true);
  };

  const openEditSwot = (item: SwotItem) => {
    setEditType("swot");
    setEditingId(item.id);
    setForm({ kategori: item.kategori, urutan: item.urutan, deskripsi: item.deskripsi });
    setModal(true);
  };

  const openAddStrategi = (tipe: string) => {
    setEditType("strategi");
    setEditingId(null);
    const maxUrutan = strategiItems
      .filter((item) => item.tipe === tipe)
      .reduce((max, item) => Math.max(max, item.urutan), 0);
    setForm({ tipe, urutan: maxUrutan + 1, strategi: "" });
    setModal(true);
  };

  const openEditStrategi = (item: StrategiItem) => {
    setEditType("strategi");
    setEditingId(item.id);
    setForm({ tipe: item.tipe, urutan: item.urutan, strategi: item.strategi });
    setModal(true);
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      const url =
        editType === "swot"
          ? editingId
            ? `${API_SWOT}/${editingId}`
            : API_SWOT
          : editingId
          ? `${API_STRATEGI}/${editingId}`
          : API_STRATEGI;
      const method = editingId ? "PUT" : "POST";
      const payload = editType === "swot" ? { ...form } : { ...form };
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
      const url = editType === "swot" ? `${API_SWOT}/${editingId}` : `${API_STRATEGI}/${editingId}`;
      await fetch(url, { method: "DELETE" });
      setModal(false);
      await fetchData();
    } catch {
      alert("Gagal menghapus");
    }
    setSaving(false);
  };

  const groupSwot = () => {
    const map: Record<string, SwotItem[]> = { S: [], W: [], O: [], T: [] };
    swotItems.forEach((item) => {
      map[item.kategori].push(item);
    });
    return map;
  };

  const groupStrategi = () => {
    const map: Record<string, StrategiItem[]> = { SO: [], WO: [], ST: [], WT: [] };
    strategiItems.forEach((item) => {
      map[item.tipe].push(item);
    });
    return map;
  };

  if (loading) return <div style={{ padding: 40, textAlign: "center", color: "#6b7280" }}>Memuat data...</div>;

  const swotGroups = groupSwot();
  const strategiGroups = groupStrategi();

  return (
    <div style={{ padding: "24px 28px", background: "#f9fafb", minHeight: "100vh", fontFamily: "system-ui, sans-serif", color: "#111827" }}>
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6b7280", margin: "0 0 4px" }}>
          CV Mitra Koperasi Nusantara
        </p>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, color: "#1f2937" }}>Analisa SWOT</h1>
      </div>

      {/* Matriks SWOT 2x2 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 40 }}>
        {(["S", "W", "O", "T"] as const).map((kat) => {
          const w = WARNA_KATEGORI[kat];
          const items = swotGroups[kat] || [];
          return (
            <div key={kat} style={{ background: w.bg, border: `1px solid ${w.border}`, borderRadius: 12, padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: w.text }}>
                  {kat} — {KATEGORI_LABEL[kat]}
                </h3>
                <button
                  onClick={() => openAddSwot(kat)}
                  style={{
                    background: w.badge,
                    border: "none",
                    borderRadius: 6,
                    padding: "4px 10px",
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  + Tambah
                </button>
              </div>
              {items.length === 0 ? (
                <p style={{ color: "#6b7280", fontSize: 13, fontStyle: "italic" }}>Belum ada poin</p>
              ) : (
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {items
                    .sort((a, b) => a.urutan - b.urutan)
                    .map((item) => (
                      <li
                        key={item.id}
                        style={{ marginBottom: 6, fontSize: 13, lineHeight: 1.5, color: w.text, cursor: "pointer" }}
                        onClick={() => openEditSwot(item)}
                      >
                        {item.deskripsi}
                      </li>
                    ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      {/* Strategi */}
      <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1f2937", marginBottom: 16 }}>Strategi Utama Berdasarkan SWOT</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {(["SO", "WO", "ST", "WT"] as const).map((tipe) => {
          const items = strategiGroups[tipe] || [];
          return (
            <div key={tipe} style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <h4 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#1f2937" }}>
                  {TIPE_STRATEGI_LABEL[tipe]}
                </h4>
                <button
                  onClick={() => openAddStrategi(tipe)}
                  style={{
                    background: "#f59e0b",
                    border: "none",
                    borderRadius: 6,
                    padding: "4px 10px",
                    color: "#1c1917",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  + Tambah
                </button>
              </div>
              {items.length === 0 ? (
                <p style={{ color: "#6b7280", fontSize: 13, fontStyle: "italic" }}>Belum ada strategi</p>
              ) : (
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {items
                    .sort((a, b) => a.urutan - b.urutan)
                    .map((item) => (
                      <li
                        key={item.id}
                        style={{ marginBottom: 6, fontSize: 13, lineHeight: 1.5, color: "#111827", cursor: "pointer" }}
                        onClick={() => openEditStrategi(item)}
                      >
                        {item.strategi}
                      </li>
                    ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {modal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, zIndex: 999 }}>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, width: "100%", maxWidth: 480, maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ padding: "14px 20px", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>
                {editType === "swot" ? (editingId ? "Edit Poin SWOT" : "Tambah Poin SWOT") : editingId ? "Edit Strategi" : "Tambah Strategi"}
              </h3>
              <button onClick={() => setModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", fontSize: 18 }}>✕</button>
            </div>
            <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
              {editType === "swot" ? (
                <>
                  <div>
                    <label style={labelStyle}>Kategori</label>
                    <select value={form.kategori} onChange={(e) => setForm({ ...form, kategori: e.target.value })} style={inputStyle}>
                      <option value="S">S - Kekuatan</option>
                      <option value="W">W - Kelemahan</option>
                      <option value="O">O - Peluang</option>
                      <option value="T">T - Ancaman</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Urutan</label>
                    <input type="number" value={form.urutan} onChange={(e) => setForm({ ...form, urutan: parseInt(e.target.value) || 1 })} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Deskripsi</label>
                    <textarea rows={3} value={form.deskripsi} onChange={(e) => setForm({ ...form, deskripsi: e.target.value })} style={{ ...inputStyle, resize: "vertical" }} />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label style={labelStyle}>Tipe Strategi</label>
                    <select value={form.tipe} onChange={(e) => setForm({ ...form, tipe: e.target.value })} style={inputStyle}>
                      <option value="SO">SO - Pertumbuhan</option>
                      <option value="WO">WO - Perbaikan</option>
                      <option value="ST">ST - Kompetitif</option>
                      <option value="WT">WT - Defensif</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Urutan</label>
                    <input type="number" value={form.urutan} onChange={(e) => setForm({ ...form, urutan: parseInt(e.target.value) || 1 })} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Strategi</label>
                    <textarea rows={3} value={form.strategi} onChange={(e) => setForm({ ...form, strategi: e.target.value })} style={{ ...inputStyle, resize: "vertical" }} />
                  </div>
                </>
              )}
            </div>
            <div style={{ padding: "12px 20px", borderTop: "1px solid #e5e7eb", display: "flex", justifyContent: editingId ? "space-between" : "flex-end", alignItems: "center" }}>
              {editingId && (
                <button onClick={handleDelete} style={{ background: "none", border: "none", color: "#dc2626", fontSize: 13, display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
                  Hapus
                </button>
              )}
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setModal(false)} style={{ padding: "7px 16px", borderRadius: 8, border: "1px solid #d1d5db", background: "transparent", color: "#374151", fontSize: 13, cursor: "pointer" }}>Batal</button>
                <button onClick={handleSubmit} disabled={saving} style={{ padding: "7px 18px", borderRadius: 8, border: "none", background: "#f59e0b", color: "#1c1917", fontSize: 13, fontWeight: 600, cursor: saving ? "not-allowed" : "pointer" }}>
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

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 11,
  color: "#4b5563",
  marginBottom: 5,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};