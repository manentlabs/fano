"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const navItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: "🏠" },
    { href: "/admin/timeline", label: "Timeline Proyek", icon: "🗓️" },
    { href: "/admin/tracker", label: "Tracker Bulanan", icon: "📊" },
    { href: "/admin/swot", label: "Analisis SWOT", icon: "🔍" },
    { href: "/admin/anggaran", label: "Rencana Anggaran", icon: "💵" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        background: "#0f1623",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Sidebar (fixed) */}
      <aside
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "280px",
          height: "100vh",
          background: "rgba(255, 255, 255, 0.03)",
          borderRight: "1px solid rgba(212, 176, 106, 0.15)",
          padding: "28px 20px",
          backdropFilter: "blur(4px)",
          zIndex: 10,
          overflowY: "auto", // jika menu banyak, sidebar sendiri bisa discroll
        }}
      >
        <div style={{ marginBottom: "32px", paddingLeft: "12px" }}>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "22px",
              color: "#f5f0e8",
              letterSpacing: "0.02em",
              marginBottom: "6px",
            }}
          >
            Fano Admin
          </div>
          <div
            style={{
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#d4b06a",
              fontWeight: 500,
            }}
          >
            Konsultan Koperasi
          </div>
        </div>

        <nav>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "10px 16px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: isActive(item.href) ? "#d4b06a" : "#9ca3af",
                    background: isActive(item.href)
                      ? "rgba(212, 176, 106, 0.1)"
                      : "transparent",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(item.href)) {
                      e.currentTarget.style.background = "rgba(212, 176, 106, 0.05)";
                      e.currentTarget.style.color = "#f5f0e8";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(item.href)) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#9ca3af";
                    }
                  }}
                >
                  <span style={{ fontSize: "18px" }}>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Tombol logout di bagian bawah sidebar */}
        <div style={{ marginTop: "40px", paddingTop: "20px", borderTop: "1px solid rgba(212, 176, 106, 0.15)" }}>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 16px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 500,
              color: "#9ca3af",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s ease",
              textAlign: "left",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)";
              e.currentTarget.style.color = "#fca5a5";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#9ca3af";
            }}
          >
            <span style={{ fontSize: "18px" }}>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Konten utama (di kanan sidebar) */}
      <div
        style={{
          marginLeft: "280px", // lebar sidebar
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {/* Header (tetap di atas, tidak ikut discroll) */}
        <header
          style={{
            background: "rgba(255, 255, 255, 0.02)",
            borderBottom: "1px solid rgba(212, 176, 106, 0.15)",
            padding: "0 32px",
            height: "70px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "20px",
            flexShrink: 0, // mencegah mengecil
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "#f5f0e8",
              fontSize: "13px",
            }}
          >
            <span>👤</span>
            <span style={{ fontWeight: 500 }}>Admin</span>
          </div>
        </header>

        {/* Area konten yang dapat discroll */}
        <div
          style={{
            flex: 1,
            overflowY: "auto", // hanya bagian ini yang scroll
            background: "#f5f0e8",
            padding: "32px",
            color: "#0f1623",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}