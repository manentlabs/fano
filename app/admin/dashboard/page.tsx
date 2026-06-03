"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Konfigurasi API
const API = {
  timeline: "/api/kegiatan",
  tracker: "/api/tracker-bulanan",
  swot: "/api/swot/items",
  strategi: "/api/strategi",
  investasi: "/api/anggaran/investasi",
  pendapatan: "/api/anggaran/pendapatan",
};

// Komponen Kartu Statistik
function StatCard({
  label,
  value,
  icon,
  href,
  color = "#d4b06a",
}: {
  label: string;
  value: number | string;
  icon: string;
  href: string;
  color?: string;
}) {
  return (
    <Link
      href={href}
      style={{
        textDecoration: "none",
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: "20px",
        display: "flex",
        alignItems: "center",
        gap: 16,
        transition: "all 0.2s ease",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = color;
        e.currentTarget.style.boxShadow = `0 4px 12px rgba(0,0,0,0.1)`;
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#e5e7eb";
        e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          width: 50,
          height: 50,
          borderRadius: 12,
          background: `${color}15`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
        }}
      >
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>
          {label}
        </div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "#111827" }}>
          {value}
        </div>
      </div>
    </Link>
  );
}

export default function DashboardPage() {
  const [stats, setStats] = useState({
    timeline: 0,
    tracker: 0,
    swot: 0,
    strategi: 0,
    investasi: 0,
    pendapatan: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          resTimeline,
          resTracker,
          resSwot,
          resStrategi,
          resInvestasi,
          resPendapatan,
        ] = await Promise.all([
          fetch(API.timeline),
          fetch(API.tracker),
          fetch(API.swot),
          fetch(API.strategi),
          fetch(API.investasi),
          fetch(API.pendapatan),
        ]);

        // Jika semua gagal, jangan error, gunakan fallback 0
        const dataTimeline = resTimeline.ok ? await resTimeline.json() : [];
        const dataTracker = resTracker.ok ? await resTracker.json() : [];
        const dataSwot = resSwot.ok ? await resSwot.json() : [];
        const dataStrategi = resStrategi.ok ? await resStrategi.json() : [];
        const dataInvestasi = resInvestasi.ok ? await resInvestasi.json() : [];
        const dataPendapatan = resPendapatan.ok ? await resPendapatan.json() : [];

        setStats({
          timeline: Array.isArray(dataTimeline) ? dataTimeline.length : 0,
          tracker: Array.isArray(dataTracker) ? dataTracker.length : 0,
          swot: Array.isArray(dataSwot) ? dataSwot.length : 0,
          strategi: Array.isArray(dataStrategi) ? dataStrategi.length : 0,
          investasi: Array.isArray(dataInvestasi) ? dataInvestasi.length : 0,
          pendapatan: Array.isArray(dataPendapatan) ? dataPendapatan.length : 0,
        });
      } catch {
        // Biarkan stats tetap 0 jika gagal total
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      {/* Header Halaman */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#1f2937", margin: "0 0 6px" }}>
          Dashboard
        </h1>
        <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>
          Ringkasan seluruh data konsultan koperasi.
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 40, color: "#6b7280" }}>
          Memuat ringkasan...
        </div>
      ) : (
        <>
          {/* Grid Kartu Statistik */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 16,
              marginBottom: 32,
            }}
          >
            <StatCard
              label="Timeline Proyek"
              value={stats.timeline}
              icon="🗓️"
              href="/admin/timeline"
            />
            <StatCard
              label="Tracker Bulanan"
              value={stats.tracker}
              icon="📊"
              href="/admin/tracker"
              color="#3b82f6"
            />
            <StatCard
              label="Poin SWOT"
              value={stats.swot}
              icon="🔍"
              href="/admin/swot"
              color="#f59e0b"
            />
            <StatCard
              label="Strategi"
              value={stats.strategi}
              icon="⚡"
              href="/admin/swot" // strategi bagian dari halaman SWOT
              color="#10b981"
            />
            <StatCard
              label="Investasi"
              value={stats.investasi}
              icon="💵"
              href="/admin/anggaran"
            />
            <StatCard
              label="Pendapatan"
              value={stats.pendapatan}
              icon="💰"
              href="/admin/anggaran"
              color="#8b5cf6"
            />
          </div>

          {/* Bagian Bantuan atau Pintasan Cepat */}
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              padding: 20,
            }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "#1f2937", margin: "0 0 12px" }}>
              Akses Cepat
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {[
                { href: "/admin/timeline", label: "Kelola Timeline Kegiatan" },
                { href: "/admin/tracker", label: "Tracker Progress Bulanan" },
                { href: "/admin/swot", label: "Analisis SWOT & Strategi" },
                { href: "/admin/anggaran", label: "Rencana Anggaran Usaha" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 20,
                    border: "1px solid #d1d5db",
                    color: "#374151",
                    textDecoration: "none",
                    fontSize: 13,
                    fontWeight: 500,
                    transition: "all 0.15s",
                    background: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#f3f4f6";
                    e.currentTarget.style.borderColor = "#d4b06a";
                    e.currentTarget.style.color = "#1f2937";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = "#d1d5db";
                    e.currentTarget.style.color = "#374151";
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}