"use client";

import { useEffect, useState } from "react";

const portfolioItems = [
  {
    num: "01",
    category: "Kelembagaan",
    title: "Penyusunan ART & SOP KSP Maju Bersama",
    desc: "Penyusunan Anggaran Rumah Tangga, Peraturan Khusus, dan SOP operasional lengkap untuk koperasi simpan pinjam dengan 450 anggota aktif.",
    tags: ["ART", "SOP", "KSP"],
    result: "Dokumen terstandar sesuai regulasi terkini",
    duration: "14 hari",
  },
  {
    num: "02",
    category: "Keuangan",
    title: "Laporan Keuangan Tahunan KSPPS Amanah",
    desc: "Penyusunan laporan keuangan lengkap (neraca, SHU, arus kas) dan pelaporan perpajakan tahunan sesuai SAK ETAP untuk koperasi syariah.",
    tags: ["Laporan Keuangan", "Pajak", "KSPPS"],
    result: "Laporan siap audit & SPT tahunan tepat waktu",
    duration: "18 hari",
  },
  {
    num: "03",
    category: "Legalitas",
    title: "Perubahan Anggaran Dasar Koperasi Sejahtera",
    desc: "Pendampingan perubahan AD koperasi menyesuaikan regulasi baru, bekerja sama dengan notaris, termasuk pengurusan NIB dan legalitas penuh.",
    tags: ["Anggaran Dasar", "Notaris", "Legalitas"],
    result: "AD baru sah & terdaftar di Kemenkop",
    duration: "21 hari",
  },
  {
    num: "04",
    category: "Pelatihan",
    title: "Pelatihan Literasi Keuangan Anggota Koptan Subur",
    desc: "Narasumber pelatihan dua hari untuk 120 anggota koperasi tani tentang manajemen simpan pinjam, pembukuan sederhana, dan literasi keuangan.",
    tags: ["Pelatihan", "Literasi Keuangan", "Koperasi Tani"],
    result: "120 anggota terlatih, modul pelatihan tersedia",
    duration: "2 hari",
  },
  {
    num: "05",
    category: "Perencanaan",
    title: "Renstra & Roadmap 5 Tahun Koperasi Karya Mandiri",
    desc: "Penyusunan Rencana Strategis 5 tahun, RAPBK, dan Roadmap pengembangan bisnis koperasi karyawan BUMN dengan total aset Rp 12 miliar.",
    tags: ["Renstra", "RAPBK", "Roadmap"],
    result: "Dokumen strategis 5 tahun siap implementasi",
    duration: "21 hari",
  },
  {
    num: "06",
    category: "Pembiayaan",
    title: "Pendampingan Proposal LPDB KSP Harapan Jaya",
    desc: "Pendampingan intensif penyusunan proposal pembiayaan ke LPDB-KUMKM senilai Rp 500 juta, termasuk studi kelayakan dan analisis keuangan.",
    tags: ["LPDB", "Proposal", "Studi Kelayakan"],
    result: "Proposal disetujui, pencairan Rp 500 juta",
    duration: "45 hari",
  },
  {
    num: "07",
    category: "Digital",
    title: "Implementasi Aplikasi Koperasi Digital Kopwan Melati",
    desc: "Pendampingan adopsi dan implementasi aplikasi manajemen koperasi berbasis digital untuk koperasi wanita dengan 280 anggota.",
    tags: ["Aplikasi Digital", "Implementasi", "Kopwan"],
    result: "Sistem digital live, 280 anggota terdaftar",
    duration: "30 hari",
  },
  {
    num: "08",
    category: "Konsultasi",
    title: "Retainer Bulanan Koperasi Karyawan PT Nusantara",
    desc: "Layanan konsultasi bulanan berkelanjutan mencakup regulasi, tata kelola, review dokumen, dan pemecahan masalah operasional koperasi karyawan.",
    tags: ["Retainer", "Konsultasi", "Koperasi Karyawan"],
    result: "12 bulan pendampingan aktif & berkelanjutan",
    duration: "Ongoing",
  },
];

const categories = ["Semua", "Kelembagaan", "Keuangan", "Legalitas", "Pelatihan", "Perencanaan", "Pembiayaan", "Digital", "Konsultasi"];

const categoryColors: Record<string, string> = {
  Kelembagaan: "#4a7c59",
  Keuangan:    "#2563a8",
  Legalitas:   "#7c4a1e",
  Pelatihan:   "#6b4fa0",
  Perencanaan: "#1e6b6b",
  Pembiayaan:  "#8b3a3a",
  Digital:     "#1e5c8b",
  Konsultasi:  "#6b6b1e",
};

export default function PortfolioPage() {
  const [active, setActive] = useState("Semua");

  const filtered = active === "Semua"
    ? portfolioItems
    : portfolioItems.filter((p) => p.category === active);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    document
      .querySelectorAll(".reveal, .reveal-left")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [active]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Inter:wght@300;400;500&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .reveal {
          opacity: 0; transform: translateY(28px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal.visible { opacity: 1; transform: translateY(0); }

        .reveal-left {
          opacity: 0; transform: translateX(-20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .reveal-left.visible { opacity: 1; transform: translateX(0); }

        .portfolio-header {
          background: #0f1623;
          border-bottom: 1px solid rgba(212,176,106,0.15);
          padding: 52px 0 44px;
        }

        .eyebrow {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 10px;
        }
        .eyebrow-line { width: 28px; height: 1px; }
        .eyebrow-text {
          font-size: 11px; letter-spacing: 0.22em;
          text-transform: uppercase; font-weight: 500;
        }

        /* Filter tabs */
        .filter-bar {
          display: flex; flex-wrap: wrap; gap: 6px;
          margin-bottom: 36px;
        }
        .filter-btn {
          padding: 7px 16px;
          font-size: 11px; letter-spacing: 0.1em;
          text-transform: uppercase; font-weight: 400;
          border: 1px solid rgba(139,111,46,0.2);
          background: transparent; cursor: pointer;
          color: #6b7280;
          transition: all 0.2s;
        }
        .filter-btn:hover {
          border-color: rgba(212,176,106,0.5);
          color: #0f1623;
        }
        .filter-btn.active {
          background: #0f1623;
          border-color: #0f1623;
          color: #d4b06a;
        }

        /* Portfolio card */
        .portfolio-card {
          background: #fff;
          border: 1px solid rgba(139,111,46,0.1);
          overflow: hidden;
          transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
          display: flex; flex-direction: column;
        }
        .portfolio-card:hover {
          border-color: rgba(212,176,106,0.5);
          transform: translateY(-3px);
          box-shadow: 0 8px 32px rgba(212,176,106,0.12);
        }
        .card-top {
          padding: 22px 22px 0;
          display: flex; justify-content: space-between; align-items: flex-start;
        }
        .card-num {
          font-family: 'Playfair Display', serif;
          font-weight: 700; font-size: 24px;
          color: rgba(212,176,106,0.25); line-height: 1;
        }
        .card-category {
          font-size: 10px; letter-spacing: 0.15em;
          text-transform: uppercase; font-weight: 500;
          padding: 4px 10px;
          border: 1px solid;
        }
        .card-body { padding: 14px 22px 18px; flex: 1; }
        .card-tags {
          display: flex; flex-wrap: wrap; gap: 6px;
          margin-top: 12px;
        }
        .card-tag {
          font-size: 10px; letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 3px 8px;
          background: rgba(212,176,106,0.08);
          color: #8b6f2e;
          border: 1px solid rgba(212,176,106,0.2);
        }
        .card-footer {
          border-top: 1px solid rgba(212,176,106,0.1);
          padding: 14px 22px;
          display: flex; justify-content: space-between; align-items: center;
          gap: 12px;
        }
        .card-result {
          display: flex; align-items: flex-start; gap: 8px;
          font-size: 12px; color: #374151; font-weight: 400; line-height: 1.5;
        }
        .card-result::before {
          content: '✓';
          color: #d4b06a; font-size: 11px; flex-shrink: 0; margin-top: 1px;
        }
        .card-duration {
          font-size: 11px; color: #9ca3af;
          letter-spacing: 0.08em; white-space: nowrap; flex-shrink: 0;
          text-align: right;
        }

        /* Stats strip */
        .stats-strip {
          background: #0f1623;
          padding: 40px 0;
          border-top: 1px solid rgba(212,176,106,0.1);
          border-bottom: 1px solid rgba(212,176,106,0.1);
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
        }
        .stat-cell {
          padding: 0 28px; text-align: center;
          border-right: 1px solid rgba(212,176,106,0.12);
        }
        .stat-cell:last-child { border-right: none; }

        /* CTA */
        .cta-strip {
          background: #0f1623; padding: 52px 0;
        }
        .btn-primary {
          background: #d4b06a; color: #0f1623;
          padding: 12px 28px; font-size: 13px; font-weight: 500;
          letter-spacing: 0.08em; text-transform: uppercase;
          border: none; cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          display: inline-block;
        }
        .btn-primary:hover { background: #e2c47f; transform: translateY(-2px); }

        @media (max-width: 768px) {
          .portfolio-header { padding: 40px 0 32px; }
          .portfolio-header h1 { font-size: 28px !important; }
          .portfolio-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 20px 0; }
          .stat-cell:nth-child(2) { border-right: none; }
          .stat-cell:nth-child(3) { border-right: 1px solid rgba(212,176,106,0.12); }
          .stat-cell { padding: 0 16px; }
          .cta-strip { padding: 40px 0; }
        }
      `}</style>

      {/* ── Header ── */}
      <section className="portfolio-header">
        <div className="max-w-7xl mx-auto px-10">
          <div className="eyebrow" style={{ animation: "fadeUp 0.7s ease both" }}>
            <div className="eyebrow-line" style={{ background: "#d4b06a" }} />
            <span className="eyebrow-text" style={{ color: "#d4b06a" }}>Rekam Jejak</span>
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700, fontSize: 38,
              color: "#f5f0e8", lineHeight: 1.2, marginBottom: 14,
              animation: "fadeUp 0.7s 0.1s ease both",
            }}
          >
            Portofolio Layanan
          </h1>
          <p
            style={{
              color: "#9ca3af", fontSize: 15, fontWeight: 300,
              lineHeight: 1.75, maxWidth: 520,
              animation: "fadeUp 0.7s 0.2s ease both",
            }}
          >
            Kumpulan proyek dan pendampingan yang telah kami selesaikan untuk
            berbagai jenis koperasi di Indonesia — dari kelembagaan, keuangan,
            hingga digitalisasi.
          </p>
        </div>
      </section>

      {/* ── Stats Strip ── */}
      <div className="stats-strip">
        <div className="max-w-7xl mx-auto px-10">
          <div className="stats-grid">
            {[
              { value: "8+", label: "Proyek Selesai" },
              { value: "6", label: "Kategori Layanan" },
              { value: "100%", label: "Klien Puas" },
              { value: "2025", label: "Mulai Beroperasi" },
            ].map((s, i) => (
              <div key={i} className="stat-cell">
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 600, fontSize: 30,
                    color: "#f5f0e8", lineHeight: 1, marginBottom: 6,
                  }}
                >
                  {s.value}
                </div>
                <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b7280" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Portfolio Grid ── */}
      <section style={{ background: "#f5f0e8", padding: "64px 0" }}>
        <div className="max-w-7xl mx-auto px-10">
          <div className="eyebrow reveal-left">
            <div className="eyebrow-line" style={{ background: "#8b6f2e" }} />
            <span className="eyebrow-text" style={{ color: "#8b6f2e" }}>Semua Proyek</span>
          </div>
          <h2
            className="reveal"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 600, fontSize: 26,
              color: "#0f1623", marginBottom: 28, lineHeight: 1.3,
            }}
          >
            Hasil Nyata untuk Koperasi Indonesia
          </h2>

          {/* Filter */}
          <div className="filter-bar reveal">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${active === cat ? "active" : ""}`}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div
            className="portfolio-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}
          >
            {filtered.map((item, i) => {
              const color = categoryColors[item.category] ?? "#6b7280";
              return (
                <div
                  key={item.num}
                  className="portfolio-card reveal"
                  style={{ transitionDelay: `${i * 0.07}s` }}
                >
                  <div className="card-top">
                    <span className="card-num">{item.num}</span>
                    <span
                      className="card-category"
                      style={{ color, borderColor: color + "40", background: color + "0d" }}
                    >
                      {item.category}
                    </span>
                  </div>

                  <div className="card-body">
                    <p
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 14.5, fontWeight: 600,
                        color: "#0f1623", lineHeight: 1.4, marginBottom: 8,
                      }}
                    >
                      {item.title}
                    </p>
                    <p style={{ fontSize: 12.5, color: "#6b7280", fontWeight: 300, lineHeight: 1.65 }}>
                      {item.desc}
                    </p>
                    <div className="card-tags">
                      {item.tags.map((t) => (
                        <span key={t} className="card-tag">{t}</span>
                      ))}
                    </div>
                  </div>

                  <div className="card-footer">
                    <div className="card-result">{item.result}</div>
                    <div className="card-duration">{item.duration}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-strip">
        <div className="max-w-7xl mx-auto px-10" style={{ textAlign: "center" }}>
          <div
            style={{
              color: "#d4b06a", fontSize: 10, letterSpacing: "0.22em",
              textTransform: "uppercase", fontWeight: 500, marginBottom: 12,
            }}
          >
            Jadilah Bagian dari Portofolio Kami
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 600, fontSize: 26,
              color: "#f5f0e8", marginBottom: 12, lineHeight: 1.3,
            }}
          >
            Koperasi Anda Bisa Menjadi Kisah Sukses Berikutnya
          </h2>
          <p style={{ color: "#6b7280", fontSize: 14, fontWeight: 300, lineHeight: 1.7, maxWidth: 420, margin: "0 auto 28px" }}>
            Konsultasikan kebutuhan koperasi Anda dan bersama kami wujudkan tata kelola yang kuat dan profesional.
          </p>
          <button className="btn-primary">Konsultasi Gratis</button>
        </div>
      </section>
    </>
  );
}