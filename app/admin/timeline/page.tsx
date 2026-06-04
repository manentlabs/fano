"use client";

import { useState, useEffect, useCallback } from "react";

const API_URL = "/api/kegiatan";
const KATEGORI_URL = "/api/kategori";

const BULAN_NAMES = ["","Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];

const WARNA: Record<number, { color: string; light: string; text: string; border: string }> = {
  1: { color: "#2563eb", light: "rgba(37,99,235,0.08)", text: "#1e40af", border: "rgba(37,99,235,0.3)" },
  2: { color: "#059669", light: "rgba(5,150,105,0.08)", text: "#047857", border: "rgba(5,150,105,0.3)" },
  3: { color: "#d97706", light: "rgba(217,119,6,0.08)",  text: "#b45309", border: "rgba(217,119,6,0.3)" },
  4: { color: "#7c3aed", light: "rgba(124,58,237,0.08)", text: "#6d28d9", border: "rgba(124,58,237,0.3)" },
  5: { color: "#dc2626", light: "rgba(220,38,38,0.08)", text: "#b91c1c", border: "rgba(220,38,38,0.3)" },
  6: { color: "#db2777", light: "rgba(219,39,119,0.08)", text: "#be185d", border: "rgba(219,39,119,0.3)" },
};
const FALLBACK_W = { color: "#6b7280", light: "rgba(107,114,128,0.08)", text: "#374151", border: "rgba(107,114,128,0.3)" };

const STATUS_STYLE: Record<string, { bg: string; text: string; dot: string }> = {
  "Belum Mulai":     { bg: "rgba(156,163,175,0.12)", text: "#4b5563", dot: "#6b7280" },
  "Sedang Berjalan": { bg: "rgba(217,119,6,0.12)",  text: "#92400e", dot: "#d97706" },
  "Selesai":         { bg: "rgba(5,150,105,0.12)",  text: "#065f46", dot: "#059669" },
};
const STATUS_LIST = ["Belum Mulai", "Sedang Berjalan", "Selesai"];

type Kategori = { id: number; nama: string };
type Kegiatan = {
  id: number; bulan: number; kategori_id: number;
  kegiatan: string; penanggung_jawab: string;
  keterangan: string; status: string;
};
const EMPTY_FORM = { bulan: 1, kategori_id: 1, kegiatan: "", penanggung_jawab: "", keterangan: "", status: "Belum Mulai" };

const card = { background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 12 };
const inputStyle: React.CSSProperties = {
  width: "100%", boxSizing: "border-box" as const,
  background: "#ffffff", border: "1px solid #d1d5db",
  borderRadius: 8, padding: "10px 12px", color: "#111827",
  fontSize: 14, outline: "none", fontFamily: "inherit",
};

// Hook sederhana untuk deteksi mobile
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

export default function TimelinePage() {
  const [rows, setRows]           = useState<Kegiatan[]>([]);
  const [katList, setKatList]     = useState<Kategori[]>([]);
  const [loading, setLoading]     = useState(true);
  const [saving, setSaving]       = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const [modal, setModal]         = useState(false);
  const [editId, setEditId]       = useState<number | null>(null);
  const [form, setForm]           = useState({ ...EMPTY_FORM });
  const [view, setView]           = useState<"timeline"|"tabel">("timeline");
  const [filterKat, setFilterKat] = useState<number|"Semua">("Semua");
  const [filterStt, setFilterStt] = useState("Semua");
  const isMobile = useIsMobile();

  const fetchAll = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const [rk, rg] = await Promise.all([fetch(KATEGORI_URL), fetch(API_URL)]);
      if (!rk.ok || !rg.ok) throw new Error("Gagal mengambil data");
      const [kat, keg] = await Promise.all([rk.json(), rg.json()]);

      const rawKat: any[] = Array.isArray(kat[0]) ? kat[0] : (Array.isArray(kat) ? kat : []);
      const rawKeg: any[] = Array.isArray(keg) ? keg : [];

      const katData = rawKat
        .filter((k: any) => k && typeof k === "object" && k.id !== undefined)
        .map((k: any) => ({ ...k, id: parseInt(k.id, 10), nama: String(k.nama ?? k.name ?? "") }))
        .filter((k: any) => !isNaN(k.id));

      const kegData = rawKeg
        .filter((r: any) => r && typeof r === "object" && r.id !== undefined)
        .map((r: any) => ({
          ...r,
          id:          parseInt(r.id, 10),
          bulan:       parseInt(r.bulan, 10),
          kategori_id: parseInt(r.kategori_id, 10),
        }))
        .filter((r: any) => !isNaN(r.id));

      setKatList(katData);
      setRows(kegData);
    } catch (e: any) { setError(e.message); }
    setLoading(false);
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const openCreate = () => { setEditId(null); setForm({ ...EMPTY_FORM, kategori_id: katList[0]?.id ?? 1 }); setModal(true); };
  const openEdit   = (item: Kegiatan) => { setEditId(item.id); setForm({ bulan: item.bulan, kategori_id: item.kategori_id, kegiatan: item.kegiatan, penanggung_jawab: item.penanggung_jawab, keterangan: item.keterangan, status: item.status }); setModal(true); };

  const submit = async () => {
    if (!form.kegiatan.trim()) return;
    setSaving(true);
    try {
      const res = await fetch(editId ? `${API_URL}/${editId}` : API_URL, {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, bulan: Number(form.bulan) }),
      });
      if (!res.ok) throw new Error("Gagal menyimpan");
      setModal(false); await fetchAll();
    } catch (e: any) { alert(e.message); }
    setSaving(false);
  };

  const del = async (id: number) => {
    if (!confirm("Hapus kegiatan ini?")) return;
    setSaving(true);
    try { await fetch(`${API_URL}/${id}`, { method: "DELETE" }); setModal(false); await fetchAll(); } catch {}
    setSaving(false);
  };

  const cycleStatus = async (item: Kegiatan) => {
    const next = STATUS_LIST[(STATUS_LIST.indexOf(item.status) + 1) % STATUS_LIST.length];
    setRows(prev => prev.map(r => r.id === item.id ? { ...r, status: next } : r));
    await fetch(`${API_URL}/${item.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...item, status: next }) });
  };

  const getW   = (id: number) => WARNA[id] ?? FALLBACK_W;
  const getS   = (s: string)  => STATUS_STYLE[s] ?? STATUS_STYLE["Belum Mulai"];
  const katName= (id: number) => katList.find(k => k.id === id)?.nama ?? `Kat ${id}`;

  const months  = Array.from({ length: 12 }, (_, i) => i + 1);
  const filtered = rows.filter(r => (filterKat === "Semua" || r.kategori_id === filterKat) && (filterStt === "Semua" || r.status === filterStt));
  const grouped  = filtered.reduce((a, r) => { (a[r.bulan] ??= []).push(r); return a; }, {} as Record<number, Kegiatan[]>);
  const stats    = { total: rows.length, selesai: rows.filter(r => r.status === "Selesai").length, berjalan: rows.filter(r => r.status === "Sedang Berjalan").length, belum: rows.filter(r => r.status === "Belum Mulai").length };

  const selStyle: React.CSSProperties = { ...inputStyle, padding: "8px 10px", cursor: "pointer", fontSize: 13 };

  if (loading) return <div style={{ color: "#6b7280", padding: 40, textAlign: "center", fontSize: 13 }}>Memuat data…</div>;
  if (error)   return <div style={{ color: "#dc2626", padding: 40, textAlign: "center", fontSize: 13 }}>{error} <button onClick={fetchAll} style={{ marginLeft: 8, color: "#2563eb", background: "none", border: "none", cursor: "pointer" }}>Coba lagi</button></div>;

  return (
    <div style={{ padding: isMobile ? "16px 14px" : "24px 28px", color: "#111827", minHeight: "100vh", background: "#f9fafb", fontFamily: "inherit" }}>

      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b7280", margin: "0 0 3px" }}>CV Mitra Koperasi Nusantara</p>
            <h1 style={{ fontSize: isMobile ? 16 : 22, fontWeight: 600, margin: 0, color: "#1f2937", lineHeight: 1.3 }}>
              Timeline Kegiatan 12 Bulan
            </h1>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
            {saving && <span style={{ fontSize: 11, color: "#6b7280" }}>Menyimpan…</span>}
            <button onClick={fetchAll} title="Refresh" style={{ background: "#ffffff", border: "1px solid #d1d5db", borderRadius: 8, padding: "8px 10px", cursor: "pointer", color: "#374151", display: "flex", alignItems: "center" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"/></svg>
            </button>
            <button onClick={openCreate} style={{ display: "flex", alignItems: "center", gap: 5, background: "#f59e0b", border: "none", borderRadius: 8, padding: isMobile ? "8px 12px" : "8px 16px", color: "#1c1917", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"/></svg>
              {isMobile ? "" : "Tambah"}
            </button>
          </div>
        </div>
      </div>

      {/* Stat cards — 2 kolom di mobile, 4 di desktop */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: 10, marginBottom: 20 }}>
        {[
          { label: "Total",    val: stats.total,    color: "#1f2937" },
          { label: "Selesai",  val: stats.selesai,  color: "#059669" },
          { label: "Berjalan", val: stats.berjalan, color: "#d97706" },
          { label: "Belum",    val: stats.belum,    color: "#6b7280" },
        ].map(s => (
          <div key={s.label} style={{ ...card, padding: isMobile ? "10px 14px" : "12px 16px" }}>
            <p style={{ fontSize: 10, color: "#6b7280", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</p>
            <p style={{ fontSize: isMobile ? 22 : 26, fontWeight: 700, margin: 0, color: s.color }}>{s.val}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginBottom: 14 }}>
        {/* View toggle */}
        <div style={{ display: "flex", border: "1px solid #d1d5db", borderRadius: 8, overflow: "hidden" }}>
          {(["timeline","tabel"] as const).map(v => (
            <button key={v} onClick={() => setView(v)} style={{ padding: "7px 14px", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 500, fontFamily: "inherit", background: view === v ? "#f59e0b" : "transparent", color: view === v ? "#1c1917" : "#374151", textTransform: "capitalize" }}>
              {v}
            </button>
          ))}
        </div>
        {/* Filters — full width di mobile */}
        <select value={filterKat === "Semua" ? "Semua" : filterKat} onChange={e => setFilterKat(e.target.value === "Semua" ? "Semua" : Number(e.target.value))}
          style={{ ...selStyle, flex: isMobile ? "1 1 calc(50% - 4px)" : "unset" }}>
          <option value="Semua">Semua Kategori</option>
          {katList.map(k => <option key={k.id} value={k.id}>{k.nama}</option>)}
        </select>
        <select value={filterStt} onChange={e => setFilterStt(e.target.value)}
          style={{ ...selStyle, flex: isMobile ? "1 1 calc(50% - 4px)" : "unset" }}>
          <option>Semua</option>
          {STATUS_LIST.map(s => <option key={s}>{s}</option>)}
        </select>
        {!isMobile && <span style={{ fontSize: 11, color: "#6b7280", marginLeft: "auto" }}>Klik status = ganti • Klik baris = edit</span>}
      </div>

      {/* Legend */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 16px", marginBottom: 16 }}>
        {katList.map(k => {
          const w = getW(k.id);
          return (
            <span key={k.id} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#374151" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: w.color, flexShrink: 0 }}></span>
              {k.nama}
            </span>
          );
        })}
      </div>

      {/* ── TIMELINE VIEW ── */}
      {view === "timeline" && (
        <>
          {/* Desktop: grid 12 bulan */}
          {!isMobile && (
            <div style={{ ...card, overflowX: "auto", padding: 16 }}>
              <div style={{ minWidth: 740 }}>
                <div style={{ display: "grid", gridTemplateColumns: "130px repeat(12,1fr)", marginBottom: 6 }}>
                  <div />
                  {months.map(m => (
                    <div key={m} style={{ textAlign: "center", fontSize: 10, fontWeight: 600, color: grouped[m] ? "#111827" : "#9ca3af", padding: "3px 0", borderLeft: "1px solid #e5e7eb" }}>
                      {BULAN_NAMES[m].slice(0,3)}
                    </div>
                  ))}
                </div>
                {katList.map(kat => {
                  if (filterKat !== "Semua" && filterKat !== kat.id) return null;
                  const w = getW(kat.id);
                  return (
                    <div key={kat.id} style={{ display: "grid", gridTemplateColumns: "130px repeat(12,1fr)", minHeight: 38, marginBottom: 3 }}>
                      <div style={{ display: "flex", alignItems: "flex-start", paddingTop: 3, paddingRight: 8 }}>
                        <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 4, background: w.light, color: w.text, border: `1px solid ${w.border}`, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 126 }}>
                          {kat.nama}
                        </span>
                      </div>
                      {months.map(m => {
                        const items = filtered.filter(r => r.kategori_id === kat.id && r.bulan === m);
                        return (
                          <div key={m} style={{ borderLeft: "1px solid #e5e7eb", padding: "2px 3px", display: "flex", flexDirection: "column", gap: 2 }}>
                            {items.map(item => {
                              const stt = getS(item.status);
                              return (
                                <div key={item.id} title={`${item.kegiatan} — ${item.penanggung_jawab}`}
                                  onClick={() => openEdit(item)}
                                  style={{ background: w.light, borderLeft: `2.5px solid ${w.color}`, borderRadius: "0 4px 4px 0", padding: "3px 5px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 3 }}>
                                  <span style={{ fontSize: 9, color: w.text, lineHeight: 1.35, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as any }}>{item.kegiatan}</span>
                                  <span onClick={e => { e.stopPropagation(); cycleStatus(item); }} title={item.status}
                                    style={{ width: 7, height: 7, borderRadius: "50%", background: stt.dot, flexShrink: 0, marginTop: 2, cursor: "pointer" }} />
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Mobile: card list per bulan */}
          {isMobile && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {months.map(m => {
                const items = filtered.filter(r => r.bulan === m);
                if (!items.length) return null;
                return (
                  <div key={m}>
                    {/* Bulan header */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 8, background: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: "#1c1917" }}>{m}</span>
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#1f2937" }}>{BULAN_NAMES[m]}</span>
                      <span style={{ fontSize: 11, color: "#6b7280" }}>{items.length} kegiatan</span>
                    </div>
                    {/* Cards */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {items.map(item => {
                        const w = getW(item.kategori_id);
                        const stt = getS(item.status);
                        return (
                          <div key={item.id} onClick={() => openEdit(item)}
                            style={{ ...card, padding: "12px 14px", borderLeft: `3px solid ${w.color}`, cursor: "pointer", borderRadius: "0 10px 10px 0" }}>
                            {/* Row 1: kategori + status */}
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6, gap: 8 }}>
                              <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 4, background: w.light, color: w.text, border: `1px solid ${w.border}` }}>
                                {katName(item.kategori_id)}
                              </span>
                              <span onClick={e => { e.stopPropagation(); cycleStatus(item); }}
                                style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 8px", borderRadius: 20, background: stt.bg, color: stt.text, fontSize: 10, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
                                <span style={{ width: 5, height: 5, borderRadius: "50%", background: stt.dot }}></span>
                                {item.status}
                              </span>
                            </div>
                            {/* Row 2: nama kegiatan */}
                            <p style={{ margin: "0 0 4px", fontSize: 13, fontWeight: 600, color: "#111827", lineHeight: 1.4 }}>{item.kegiatan}</p>
                            {/* Row 3: PJ */}
                            {item.penanggung_jawab && (
                              <p style={{ margin: 0, fontSize: 11, color: "#6b7280" }}>👤 {item.penanggung_jawab}</p>
                            )}
                            {item.keterangan && (
                              <p style={{ margin: "3px 0 0", fontSize: 11, color: "#9ca3af", lineHeight: 1.3 }}>{item.keterangan}</p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              {filtered.length === 0 && (
                <div style={{ textAlign: "center", padding: 48, color: "#6b7280", fontSize: 13 }}>Tidak ada kegiatan yang sesuai filter.</div>
              )}
            </div>
          )}
        </>
      )}

      {/* ── TABEL VIEW ── */}
      {view === "tabel" && (
        <div>
          {months.map(m => {
            const items = grouped[m];
            if (!items?.length) return null;
            return (
              <div key={m} style={{ marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.08em" }}>Bulan {m}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#1f2937" }}>{BULAN_NAMES[m]}</span>
                  <span style={{ fontSize: 11, color: "#6b7280" }}>{items.length} kegiatan</span>
                </div>

                {/* Mobile: card list */}
                {isMobile ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {items.map((item, idx) => {
                      const w = getW(item.kategori_id);
                      const stt = getS(item.status);
                      return (
                        <div key={item.id} onClick={() => openEdit(item)}
                          style={{ ...card, padding: "12px 14px", borderLeft: `3px solid ${w.color}`, cursor: "pointer", borderRadius: "0 10px 10px 0" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6, gap: 8 }}>
                            <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 4, background: w.light, color: w.text, border: `1px solid ${w.border}` }}>
                              {katName(item.kategori_id)}
                            </span>
                            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                              <span onClick={e => { e.stopPropagation(); cycleStatus(item); }}
                                style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 8px", borderRadius: 20, background: stt.bg, color: stt.text, fontSize: 10, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
                                <span style={{ width: 5, height: 5, borderRadius: "50%", background: stt.dot }}></span>
                                {item.status}
                              </span>
                              <button onClick={e => { e.stopPropagation(); del(item.id); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#dc2626", padding: 2, display: "flex", alignItems: "center" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
                              </button>
                            </div>
                          </div>
                          <p style={{ margin: "0 0 4px", fontSize: 13, fontWeight: 600, color: "#111827", lineHeight: 1.4 }}>{item.kegiatan}</p>
                          {item.penanggung_jawab && <p style={{ margin: 0, fontSize: 11, color: "#6b7280" }}>👤 {item.penanggung_jawab}</p>}
                          {item.keterangan && <p style={{ margin: "3px 0 0", fontSize: 11, color: "#9ca3af" }}>{item.keterangan}</p>}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* Desktop: tabel */
                  <div style={{ ...card, overflow: "hidden" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, tableLayout: "fixed" }}>
                      <colgroup>
                        <col style={{ width: 32 }}/><col style={{ width: 120 }}/><col/><col style={{ width: 120 }}/><col style={{ width: 130 }}/><col style={{ width: 120 }}/><col style={{ width: 36 }}/>
                      </colgroup>
                      <thead>
                        <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                          {["No","Kategori","Kegiatan","Penanggung Jawab","Keterangan","Status",""].map((h,i) => (
                            <th key={i} style={{ padding: "8px 10px", textAlign: "left", fontSize: 10, fontWeight: 600, color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item, idx) => {
                          const w = getW(item.kategori_id);
                          const stt = getS(item.status);
                          return (
                            <tr key={item.id} onClick={() => openEdit(item)} style={{ borderBottom: idx < items.length-1 ? "1px solid #e5e7eb" : "none", cursor: "pointer" }}
                              onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,0,0,0.02)")}
                              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                              <td style={{ padding: "8px 10px", color: "#6b7280", textAlign: "center" }}>{idx+1}</td>
                              <td style={{ padding: "8px 10px" }}>
                                <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 8px", borderRadius: 4, background: w.light, color: w.text, fontSize: 11, fontWeight: 600, border: `1px solid ${w.border}` }}>
                                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: w.color }}></span>
                                  {katName(item.kategori_id)}
                                </span>
                              </td>
                              <td style={{ padding: "8px 10px", color: "#111827", lineHeight: 1.4 }}>{item.kegiatan}</td>
                              <td style={{ padding: "8px 10px", color: "#374151" }}>{item.penanggung_jawab}</td>
                              <td style={{ padding: "8px 10px", color: "#6b7280", fontSize: 11 }}>{item.keterangan}</td>
                              <td style={{ padding: "8px 10px" }}>
                                <span onClick={e => { e.stopPropagation(); cycleStatus(item); }}
                                  style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 8px", borderRadius: 4, background: stt.bg, color: stt.text, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
                                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: stt.dot }}></span>
                                  {item.status}
                                </span>
                              </td>
                              <td style={{ padding: "8px 10px", textAlign: "center" }}>
                                <button onClick={e => { e.stopPropagation(); del(item.id); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", padding: 2, display: "flex", alignItems: "center" }}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}
          {filtered.length === 0 && <div style={{ textAlign: "center", padding: 48, color: "#6b7280", fontSize: 13 }}>Tidak ada kegiatan yang sesuai filter.</div>}
        </div>
      )}

      {/* ── MODAL ── */}
      {modal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: isMobile ? "flex-end" : "center", justifyContent: "center", padding: isMobile ? 0 : 16, zIndex: 999 }}>
          <div style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: isMobile ? "16px 16px 0 0" : 16,
            width: "100%",
            maxWidth: isMobile ? "100%" : 480,
            maxHeight: isMobile ? "92vh" : "90vh",
            overflowY: "auto",
          }}>
            {/* Drag handle di mobile */}
            {isMobile && (
              <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 4px" }}>
                <div style={{ width: 36, height: 4, borderRadius: 2, background: "#d1d5db" }}></div>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", borderBottom: "1px solid #e5e7eb" }}>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "#1f2937" }}>{editId ? "Edit Kegiatan" : "Tambah Kegiatan"}</h3>
              <button onClick={() => setModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", fontSize: 20, lineHeight: 1, padding: "0 4px" }}>✕</button>
            </div>
            <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <label style={{ display: "block", fontSize: 11, color: "#4b5563", marginBottom: 5, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Bulan</label>
                  <input type="number" min={1} max={12} value={form.bulan} onChange={e => setForm({ ...form, bulan: parseInt(e.target.value) || 1 })} style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 11, color: "#4b5563", marginBottom: 5, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Kategori</label>
                  <select value={form.kategori_id} onChange={e => setForm({ ...form, kategori_id: Number(e.target.value) })} style={{ ...inputStyle, cursor: "pointer" }}>
                    {katList.map(k => <option key={k.id} value={k.id}>{k.nama}</option>)}
                  </select>
                </div>
              </div>
              {[
                { label: "Kegiatan *", key: "kegiatan", textarea: true },
                { label: "Penanggung Jawab", key: "penanggung_jawab" },
                { label: "Keterangan", key: "keterangan" },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ display: "block", fontSize: 11, color: "#4b5563", marginBottom: 5, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{f.label}</label>
                  {f.textarea
                    ? <textarea rows={3} value={(form as any)[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} style={{ ...inputStyle, resize: "vertical" }} />
                    : <input type="text" value={(form as any)[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} style={inputStyle} />
                  }
                </div>
              ))}
              <div>
                <label style={{ display: "block", fontSize: 11, color: "#4b5563", marginBottom: 5, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Status</label>
                <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} style={{ ...inputStyle, cursor: "pointer" }}>
                  {STATUS_LIST.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", borderTop: "1px solid #e5e7eb", paddingBottom: isMobile ? 24 : 12 }}>
              {editId
                ? <button onClick={() => del(editId)} style={{ background: "none", border: "none", cursor: "pointer", color: "#dc2626", fontSize: 13, display: "flex", alignItems: "center", gap: 5, fontFamily: "inherit", padding: "8px 0" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
                    Hapus
                  </button>
                : <div />
              }
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setModal(false)} style={{ padding: "9px 16px", borderRadius: 8, border: "1px solid #d1d5db", background: "transparent", color: "#374151", fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>Batal</button>
                <button onClick={submit} disabled={saving || !form.kegiatan.trim()} style={{ padding: "9px 20px", borderRadius: 8, border: "none", background: form.kegiatan.trim() ? "#f59e0b" : "#e5e7eb", color: form.kegiatan.trim() ? "#1c1917" : "#9ca3af", fontSize: 14, fontWeight: 600, cursor: form.kegiatan.trim() ? "pointer" : "not-allowed", fontFamily: "inherit" }}>
                  {saving ? "Menyimpan…" : "Simpan"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}