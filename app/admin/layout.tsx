"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState, useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const isActive = (path: string) => pathname === path;

  const navItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: "🏠" },
    { href: "/admin/timeline", label: "Timeline Proyek", icon: "🗓️" },
    { href: "/admin/tracker", label: "Tracker Bulanan", icon: "📊" },
    { href: "/admin/swot", label: "Analisis SWOT", icon: "🔍" },
    { href: "/admin/anggaran", label: "Rencana Anggaran", icon: "💵" },
  ];

  // Detect mobile breakpoint
  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(false); // tutup overlay saat resize ke desktop
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Tutup sidebar saat navigasi (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Cegah scroll body saat sidebar mobile terbuka
  useEffect(() => {
    if (isMobile && sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobile, sidebarOpen]);

  const SidebarContent = () => (
    <>
      {/* Brand */}
      <div style={{ marginBottom: "32px", paddingLeft: "12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
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
            Fona Admin
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

        {/* Tombol close di mobile */}
        {isMobile && (
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Tutup menu"
            style={{
              background: "rgba(212, 176, 106, 0.1)",
              border: "1px solid rgba(212, 176, 106, 0.25)",
              borderRadius: "8px",
              color: "#d4b06a",
              cursor: "pointer",
              padding: "6px 10px",
              fontSize: "18px",
              lineHeight: 1,
              flexShrink: 0,
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Nav */}
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
                  padding: "12px 16px",
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

      {/* Logout */}
      <div
        style={{
          marginTop: "40px",
          paddingTop: "20px",
          borderTop: "1px solid rgba(212, 176, 106, 0.15)",
        }}
      >
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px 16px",
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
    </>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        background: "#0f1623",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* ── DESKTOP SIDEBAR (fixed, selalu tampil ≥768px) ── */}
      {!isMobile && (
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
            overflowY: "auto",
          }}
        >
          <SidebarContent />
        </aside>
      )}

      {/* ── MOBILE OVERLAY BACKDROP ── */}
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            zIndex: 20,
            backdropFilter: "blur(2px)",
          }}
        />
      )}

      {/* ── MOBILE SIDEBAR (drawer, tampil saat sidebarOpen) ── */}
      {isMobile && (
        <aside
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "280px",
            height: "100vh",
            background: "#131c2e",
            borderRight: "1px solid rgba(212, 176, 106, 0.2)",
            padding: "28px 20px",
            zIndex: 30,
            overflowY: "auto",
            transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
            transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <SidebarContent />
        </aside>
      )}

      {/* ── KONTEN UTAMA ── */}
      <div
        style={{
          marginLeft: isMobile ? "0" : "280px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {/* Header */}
        <header
          style={{
            background: "rgba(255, 255, 255, 0.02)",
            borderBottom: "1px solid rgba(212, 176, 106, 0.15)",
            padding: "0 20px 0 20px",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
            gap: "12px",
          }}
        >
          {/* Hamburger — hanya tampil di mobile */}
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="Buka menu"
              style={{
                background: "rgba(212, 176, 106, 0.08)",
                border: "1px solid rgba(212, 176, 106, 0.2)",
                borderRadius: "8px",
                color: "#d4b06a",
                cursor: "pointer",
                padding: "8px 10px",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                flexShrink: 0,
              }}
            >
              <span style={{ display: "block", width: "20px", height: "2px", background: "#d4b06a", borderRadius: "2px" }} />
              <span style={{ display: "block", width: "14px", height: "2px", background: "#d4b06a", borderRadius: "2px" }} />
              <span style={{ display: "block", width: "20px", height: "2px", background: "#d4b06a", borderRadius: "2px" }} />
            </button>
          )}

          {/* Brand di header — hanya tampil di mobile */}
          {isMobile && (
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: "18px",
                color: "#f5f0e8",
                letterSpacing: "0.02em",
                flex: 1,
              }}
            >
              Fona Admin
            </div>
          )}

          {/* User info */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#f5f0e8",
              fontSize: "13px",
              marginLeft: isMobile ? "auto" : undefined,
            }}
          >
            <span>👤</span>
            <span style={{ fontWeight: 500 }}>Admin</span>
          </div>
        </header>

        {/* Area konten */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            background: "#f5f0e8",
            padding: isMobile ? "20px 16px" : "32px",
            color: "#0f1623",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}