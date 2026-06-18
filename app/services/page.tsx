"use client";

import { useEffect } from "react";

const services = [
  {
    num: "01",
    icon: "📋",
    title: "NIB (Nomor Induk Berusaha)",
    desc: "Pengurusan Nomor Induk Berusaha untuk legalitas usaha.",
    tag: "Semua Jenis Usaha",
    duration: "3–7 hari",
    price: "Rp 200.000 – 300.000",
  },
  {
    num: "02",
    icon: "⚖️",
    title: "Akta + NIB",
    desc: "Pengurusan akta pendirian beserta NIB. Koperasi, CV, dan Yayasan; serta Perseroan Terbatas (PT).",
    tag: "Kop · CV · Yayasan · PT",
    duration: "14–30 hari",
    price: "Rp 3.000.000 (Kop/CV/Yayasan) · Rp 4.000.000 (PT)",
  },
  {
    num: "03",
    icon: "📄",
    title: "Anggaran Rumah Tangga (ART)",
    desc: "Penyusunan Anggaran Rumah Tangga sesuai regulasi terkini.",
    tag: "Semua Jenis Koperasi",
    duration: "7–14 hari",
    price: "Rp 1.000.000",
  },
  {
    num: "04",
    icon: "📑",
    title: "SOP, SOM & Peraturan Khusus (Persus)",
    desc: "Penyusunan Standar Operasional dan Peraturan Khusus. Paket Premium (2,5 jt) mencakup 3–5 kali pendampingan; Paket Lite (1 jt) mencakup 1 kali pendampingan.",
    tag: "Semua Jenis Koperasi",
    duration: "7–21 hari",
    price: "Premium Rp 2.500.000 · Lite Rp 1.000.000",
  },
  {
    num: "05",
    icon: "🗺️",
    title: "Renstra & RAPBK",
    desc: "Penyusunan Rencana Strategis dan Rencana Anggaran Pendapatan & Belanja Koperasi. Paket Premium (1 jt) dan Paket Lite (500 rb).",
    tag: "Pengurus & Manajemen",
    duration: "14–21 hari",
    price: "Premium Rp 1.000.000 · Lite Rp 500.000",
  },
  {
    num: "06",
    icon: "🏛️",
    title: "Pendampingan Hukum",
    desc: "Layanan pendampingan hukum meliputi konsultasi regulasi, kepatuhan, dan penyelesaian permasalahan hukum organisasi.",
    tag: "Semua Jenis Usaha",
    duration: "Kondisional",
    price: "Negotiable",
  },
  {
    num: "07",
    icon: "📊",
    title: "Jasa Laporan Keuangan",
    desc: "Penyusunan laporan keuangan sesuai standar akuntansi. Tarif menyesuaikan omset dan volume transaksi. Premium (2–3 jt) · Lite (s.d. 500 rb).",
    tag: "KSP · KSPPS · Umum",
    duration: "Per periode",
    price: "Premium Rp 2.000.000 – 3.000.000 · Lite s.d. Rp 500.000",
  },
  {
    num: "08",
    icon: "🧾",
    title: "Tax Planning",
    desc: "Perencanaan pajak strategis untuk efisiensi kewajiban perpajakan usaha.",
    tag: "Semua Jenis Usaha",
    duration: "Kondisional",
    price: "Rp 2.000.000 – 10.000.000",
  },
  {
    num: "09",
    icon: "🗂️",
    title: "SPT Tahunan",
    desc: "Penyusunan dan pelaporan SPT Tahunan. Tarif berdasarkan omset: 0–1 M (800 rb – 1,5 jt) · 1–4,8 M (1,5 – 3,5 jt) · 4,8–6 M (3,5 – 5 jt) · 6–12 M (5,5 – 7,5 jt) · >12 M (>10 jt).",
    tag: "Semua Jenis Usaha",
    duration: "Per tahun",
    price: "Rp 800.000 – >10.000.000 (sesuai omset)",
  },
  {
    num: "10",
    icon: "📝",
    title: "Laporan RAT",
    desc: "Penyusunan laporan Rapat Anggota Tahunan secara lengkap dan terstruktur.",
    tag: "Semua Jenis Koperasi",
    duration: "7–14 hari",
    price: "Rp 500.000 – 2.000.000",
  },
  {
    num: "11",
    icon: "📱",
    title: "Aplikasi Operasional",
    desc: "Implementasi dan pendampingan adopsi aplikasi manajemen berbasis digital, disesuaikan kebutuhan organisasi.",
    tag: "Semua Jenis Usaha",
    duration: "Custom",
    price: "Negotiable",
  },
];

const freeServices = [
  "Konsultasi singkat perkoperasian (maks. 2 jam per sesi, online atau tatap muka)",
  "Format-format buku 16 koperasi (register anggota, buku simpanan, buku pinjaman, dll.)",
  "Template Peraturan Khusus (Persus) standar",
  "Template Laporan RAT (Rapat Anggota Tahunan)",
  "Template dokumen administrasi koperasi lainnya",
];

export default function ServicesPage() {
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
      { threshold: 0.1 }
    );
    document
      .querySelectorAll(".reveal, .reveal-left")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

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

        .services-header {
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

        /* Service row cards */
        .service-row {
          display: grid;
          grid-template-columns: 64px 1fr auto;
          gap: 0;
          align-items: stretch;
          background: #fff;
          border: 1px solid rgba(139,111,46,0.1);
          margin-bottom: 10px;
          transition: border-color 0.25s, transform 0.2s, box-shadow 0.25s;
          overflow: hidden;
        }
        .service-row:hover {
          border-color: rgba(212,176,106,0.5);
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(212,176,106,0.1);
        }
        .service-row-num {
          background: rgba(212,176,106,0.05);
          border-right: 1px solid rgba(212,176,106,0.12);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Playfair Display', serif;
          font-weight: 700; font-size: 18px;
          color: rgba(212,176,106,0.5);
          transition: color 0.25s, background 0.25s;
          flex-shrink: 0;
        }
        .service-row:hover .service-row-num {
          color: #d4b06a;
          background: rgba(212,176,106,0.08);
        }
        .service-row-body {
          padding: 20px 24px;
          display: flex; flex-direction: column; gap: 6px;
        }
        .service-row-meta {
          padding: 20px 24px;
          display: flex; flex-direction: column;
          align-items: flex-end; justify-content: center;
          gap: 6px; border-left: 1px solid rgba(212,176,106,0.1);
          min-width: 200px;
        }
        .service-tag {
          display: inline-block;
          padding: 3px 9px; font-size: 10px;
          letter-spacing: 0.1em; text-transform: uppercase;
          background: rgba(212,176,106,0.08); color: #8b6f2e;
          border: 1px solid rgba(212,176,106,0.2);
        }
        .service-icon {
          width: 28px; height: 28px;
          border: 1px solid rgba(212,176,106,0.3);
          display: inline-flex; align-items: center; justify-content: center;
          font-size: 13px; margin-right: 10px;
          vertical-align: middle;
        }

        /* Free services */
        .free-section {
          background: #f5f0e8;
          padding: 64px 0;
        }
        .free-card {
          background: #0f1623;
          border: 1px solid rgba(212,176,106,0.15);
          padding: 36px 40px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: start;
          transition: border-color 0.3s;
        }
        .free-card:hover { border-color: rgba(212,176,106,0.3); }
        .free-item {
          display: flex; align-items: flex-start; gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid rgba(212,176,106,0.08);
        }
        .free-item:last-child { border-bottom: none; padding-bottom: 0; }
        .free-check {
          width: 20px; height: 20px; flex-shrink: 0;
          border: 1px solid rgba(212,176,106,0.4);
          display: flex; align-items: center; justify-content: center;
          font-size: 10px; color: #d4b06a; margin-top: 1px;
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

        /* CTA strip */
        .cta-strip {
          background: #0f1623;
          padding: 52px 0;
          border-top: 1px solid rgba(212,176,106,0.1);
        }

        @media (max-width: 768px) {
          .services-header { padding: 40px 0 32px; }
          .services-header h1 { font-size: 28px !important; }
          .service-row {
            grid-template-columns: 48px 1fr;
          }
          .service-row-meta {
            display: none;
          }
          .free-card {
            grid-template-columns: 1fr;
            gap: 24px; padding: 24px 20px;
          }
          .free-section { padding: 48px 0; }
          .cta-strip { padding: 40px 0; }
        }
      `}</style>

      {/* ── Header ── */}
      <section className="services-header">
        <div className="max-w-7xl mx-auto px-10">
          <div className="eyebrow" style={{ animation: "fadeUp 0.7s ease both" }}>
            <div className="eyebrow-line" style={{ background: "#d4b06a" }} />
            <span className="eyebrow-text" style={{ color: "#d4b06a" }}>
              Portofolio Layanan
            </span>
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700, fontSize: 38,
              color: "#f5f0e8", lineHeight: 1.2, marginBottom: 14,
              animation: "fadeUp 0.7s 0.1s ease both",
            }}
          >
            Layanan Kami
          </h1>
          <p
            style={{
              color: "#9ca3af", fontSize: 15, fontWeight: 300,
              lineHeight: 1.75, maxWidth: 520,
              animation: "fadeUp 0.7s 0.2s ease both",
            }}
          >
            8 paket layanan komprehensif yang dirancang untuk memenuhi seluruh
            kebutuhan operasional, legalitas, dan pengembangan koperasi di Indonesia.
          </p>
        </div>
      </section>

      {/* ── Service List ── */}
      <section style={{ background: "#f5f0e8", padding: "64px 0" }}>
        <div className="max-w-7xl mx-auto px-10">
          <div className="eyebrow reveal-left">
            <div className="eyebrow-line" style={{ background: "#8b6f2e" }} />
            <span className="eyebrow-text" style={{ color: "#8b6f2e" }}>8 Layanan Utama</span>
          </div>
          <h2
            className="reveal"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 600, fontSize: 26,
              color: "#0f1623", marginBottom: 32, lineHeight: 1.3,
            }}
          >
            Solusi Lengkap untuk Koperasi Anda
          </h2>

          <div>
            {services.map((s, i) => (
              <div
                key={s.num}
                className="service-row reveal"
                style={{ transitionDelay: `${i * 0.06}s` }}
              >
                <div className="service-row-num">{s.num}</div>

                <div className="service-row-body">
                  <div style={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                    <span className="service-icon">{s.icon}</span>
                    <span
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 16, fontWeight: 600, color: "#0f1623",
                      }}
                    >
                      {s.title}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, color: "#6b7280", fontWeight: 300, lineHeight: 1.65 }}>
                    {s.desc}
                  </p>
                  <span className="service-tag">{s.tag}</span>
                </div>

                <div className="service-row-meta">
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 3 }}>
                      Estimasi Tarif
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "#0f1623" }}>
                      {s.price}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 3 }}>
                      Durasi
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "#0f1623" }}>
                      {s.duration}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Free Services ── */}
      <section className="free-section">
        <div className="max-w-7xl mx-auto px-10">
          <div className="eyebrow reveal-left">
            <div className="eyebrow-line" style={{ background: "#8b6f2e" }} />
            <span className="eyebrow-text" style={{ color: "#8b6f2e" }}>Tanpa Biaya</span>
          </div>
          <h2
            className="reveal"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 600, fontSize: 26,
              color: "#0f1623", marginBottom: 24, lineHeight: 1.3,
            }}
          >
            Layanan Gratis untuk Koperasi
          </h2>
          <p
            className="reveal"
            style={{
              color: "#6b7280", fontSize: 14, fontWeight: 300,
              lineHeight: 1.7, maxWidth: 480, marginBottom: 28,
            }}
          >
            Sebagai bentuk komitmen pemberdayaan koperasi, kami menyediakan sejumlah
            layanan dan sumber daya tanpa biaya.
          </p>

          <div className="free-card reveal">
            {/* Left: list */}
            <div>
              {freeServices.map((item, i) => (
                <div key={i} className="free-item">
                  <div className="free-check">✓</div>
                  <p style={{ fontSize: 13.5, color: "#9ca3af", fontWeight: 300, lineHeight: 1.65 }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>

            {/* Right: CTA */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
              <div
                style={{
                  color: "#d4b06a", fontSize: 10, letterSpacing: "0.22em",
                  textTransform: "uppercase", fontWeight: 500,
                }}
              >
                Mulai Sekarang
              </div>
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 20, fontWeight: 600, fontStyle: "italic",
                  color: "#f5f0e8", lineHeight: 1.5,
                }}
              >
                Konsultasi awal gratis hingga 2 jam — online maupun tatap muka.
              </p>
              <p style={{ fontSize: 13, color: "#6b7280", fontWeight: 300, lineHeight: 1.65 }}>
                Tidak ada kewajiban setelah konsultasi gratis. Kami bantu Anda memahami
                kebutuhan koperasi terlebih dahulu sebelum memutuskan layanan yang tepat.
              </p>
              <div>
                <button className="btn-primary">Hubungi Kami Sekarang</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Strip ── */}
      <section className="cta-strip">
        <div className="max-w-7xl mx-auto px-10" style={{ textAlign: "center" }}>
          <div
            style={{
              color: "#d4b06a", fontSize: 10, letterSpacing: "0.22em",
              textTransform: "uppercase", fontWeight: 500, marginBottom: 12,
            }}
          >
            Siap Bekerjasama?
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 600, fontSize: 26,
              color: "#f5f0e8", marginBottom: 12, lineHeight: 1.3,
            }}
          >
            Diskusikan Kebutuhan Koperasi Anda
          </h2>
          <p style={{ color: "#6b7280", fontSize: 14, fontWeight: 300, lineHeight: 1.7, maxWidth: 440, margin: "0 auto 28px" }}>
            Tim kami siap membantu menemukan layanan yang paling sesuai dengan kondisi
            dan kebutuhan koperasi Anda.
          </p>
          <button className="btn-primary">Konsultasi Gratis</button>
        </div>
      </section>
    </>
  );
}