"use client";

import { useEffect } from "react";

const services = [
  {
    num: "01",
    icon: "⚖️",
    title: "Konsultasi Hukum & Kekayaan Intelektual",
    desc: "Pendampingan hukum koperasi, penyusunan dan reviu dokumen kelembagaan, serta konsultasi kekayaan intelektual.",
    tag: "Legal & Kepatuhan",
    includes: [
      "Pendampingan hukum koperasi",
      "Penyusunan & reviu dokumen kelembagaan",
      "Konsultasi kekayaan intelektual",
    ],
  },
  {
    num: "02",
    icon: "📊",
    title: "Akuntansi, Pembukuan & Perpajakan",
    desc: "Jasa akuntansi dan pembukuan, pemeriksaan laporan keuangan, serta konsultasi perpajakan bagi koperasi dan anggotanya.",
    tag: "Keuangan & Pajak",
    includes: [
      "Jasa akuntansi & pembukuan",
      "Pemeriksaan laporan keuangan",
      "Konsultasi perpajakan",
    ],
  },
  {
    num: "03",
    icon: "💻",
    title: "Teknologi Informasi & Sistem Digital",
    desc: "Pengembangan aplikasi dan sistem komputer, pengolahan data dan hosting, identitas digital, serta sertifikat elektronik.",
    tag: "Digital & TI",
    includes: [
      "Pengembangan aplikasi & sistem",
      "Pengolahan data & hosting",
      "Identitas digital & sertifikat elektronik",
    ],
  },
  {
    num: "04",
    icon: "🎯",
    title: "Konsultasi Manajemen & Bisnis",
    desc: "Perencanaan strategi usaha, pengembangan organisasi, serta pendampingan tata kelola manajemen koperasi.",
    tag: "Manajemen & Bisnis",
    includes: [
      "Perencanaan strategi usaha",
      "Pengembangan organisasi",
      "Pendampingan tata kelola manajemen",
    ],
  },
  {
    num: "05",
    icon: "📚",
    title: "Pelatihan & Pengembangan SDM",
    desc: "Pelatihan kerja, kursus, dan program pendidikan bagi pengurus, pengawas, dan anggota koperasi.",
    tag: "SDM & Edukasi",
    includes: [
      "Pelatihan kerja & kursus",
      "Program pendidikan",
      "Untuk pengurus, pengawas & anggota",
    ],
  },
  {
    num: "06",
    icon: "🔍",
    title: "Pengujian, Sertifikasi & Penelitian",
    desc: "Jasa sertifikasi dan verifikasi teknis, serta penelitian dan pengembangan ilmu sosial terkait tata kelola koperasi.",
    tag: "Sertifikasi & Riset",
    includes: [
      "Jasa sertifikasi & verifikasi teknis",
      "Penelitian & pengembangan",
      "Ilmu sosial tata kelola koperasi",
    ],
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

        :root {
          --navy-deep: #0a1e30;
          --navy: #254a76;
          --teal: #2f8f8a;
          --teal-light: #5fc9c2;
          --teal-dark: #1d6b6f;
          --cream: #f4f7f7;
        }

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

        /* Header — biru navy (teks terang OK) */
        .services-header {
          background: var(--navy);
          border-bottom: 1px solid rgba(47,143,138,0.15);
          padding: 52px 0 44px;
        }

        .eyebrow { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
        .eyebrow-line { width: 28px; height: 1px; }
        .eyebrow-text { font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; font-weight: 500; }

        /* ── Service card (grid 3×2) — teks gelap di atas cream ── */
        .service-card {
          background: var(--cream);
          border: 1px solid rgba(47,143,138,0.25);
          padding: 28px 24px;
          position: relative;
          display: flex;
          flex-direction: column;
          transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
          overflow: hidden;
        }
        .service-card:hover {
          border-color: rgba(47,143,138,0.6);
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(10,30,48,0.15);
        }
        .service-card-num {
          position: absolute; top: 20px; right: 20px;
          font-family: 'Playfair Display', serif;
          font-weight: 700; font-size: 26px;
          color: rgba(37,74,118,0.25);
          line-height: 1;
          transition: color 0.25s;
        }
        .service-card:hover .service-card-num { color: rgba(37,74,118,0.5); }

        .service-icon {
          width: 40px; height: 40px;
          border: 1px solid rgba(47,143,138,0.4);
          background: rgba(47,143,138,0.08);
          display: flex; align-items: center; justify-content: center;
          font-size: 17px; margin-bottom: 16px;
          transition: border-color 0.25s, background 0.25s;
        }
        .service-card:hover .service-icon {
          border-color: rgba(47,143,138,0.7);
          background: rgba(47,143,138,0.14);
        }

        .service-tag {
          display: inline-block;
          padding: 3px 9px; font-size: 10px;
          letter-spacing: 0.1em; text-transform: uppercase;
          background: rgba(47,143,138,0.12);
          color: var(--teal-dark);
          border: 1px solid rgba(47,143,138,0.35);
          align-self: flex-start;
          margin-top: 14px;
          font-weight: 500;
        }

        .service-includes {
          list-style: none;
          padding: 0; margin: 14px 0 0;
          border-top: 1px solid rgba(47,143,138,0.2);
          padding-top: 14px;
        }
        .service-includes li {
          display: flex; align-items: flex-start; gap: 8px;
          font-size: 12px;
          color: #4b5563;
          font-weight: 400;
          line-height: 1.5; margin-bottom: 6px;
        }
        .service-includes li::before {
          content: '–';
          color: var(--teal-dark);
          flex-shrink: 0;
        }

        /* ── Free services ── */
        .free-section {
          background: var(--cream);
          padding: 64px 0;
        }
        .free-card {
          background: var(--cream);
          border: 1px solid rgba(47,143,138,0.3);
          padding: 36px 40px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: start;
          transition: border-color 0.3s;
        }
        .free-card:hover { border-color: rgba(47,143,138,0.55); }

        .free-item {
          display: flex; align-items: flex-start; gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid rgba(47,143,138,0.15);
        }
        .free-item:last-child { border-bottom: none; padding-bottom: 0; }

        .free-check {
          width: 20px; height: 20px; flex-shrink: 0;
          border: 1px solid rgba(47,143,138,0.5);
          display: flex; align-items: center; justify-content: center;
          font-size: 10px;
          color: var(--teal-dark);
          margin-top: 1px;
          font-weight: 700;
        }

        .btn-primary {
          background: linear-gradient(135deg, var(--teal-light), var(--teal));
          color: #082022;
          padding: 12px 28px; font-size: 13px; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase;
          border: none; cursor: pointer;
          transition: filter 0.2s, transform 0.15s;
          display: inline-block;
        }
        .btn-primary:hover { filter: brightness(1.08); transform: translateY(-2px); }

        /* CTA strip — bg navy, teks terang OK */
        .cta-strip {
          background: var(--navy);
          padding: 52px 0;
          border-top: 1px solid rgba(47,143,138,0.15);
        }

        @media (max-width: 768px) {
          .services-header { padding: 40px 0 32px; }
          .services-header h1 { font-size: 28px !important; }
          .services-grid {
            grid-template-columns: 1fr !important;
          }
          .free-card {
            grid-template-columns: 1fr;
            gap: 24px; padding: 24px 20px;
          }
          .free-section { padding: 48px 0; }
          .cta-strip { padding: 40px 0; }
        }
      `}</style>

      {/* ── Header (bg navy) ── */}
      <section className="services-header">
        <div className="max-w-7xl mx-auto px-10">
          <div className="eyebrow" style={{ animation: "fadeUp 0.7s ease both" }}>
            <div className="eyebrow-line" style={{ background: "#5fc9c2" }} />
            <span className="eyebrow-text" style={{ color: "#5fc9c2" }}>
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
              color: "#cbd5e1", fontSize: 15, fontWeight: 300,
              lineHeight: 1.75, maxWidth: 520,
              animation: "fadeUp 0.7s 0.2s ease both",
            }}
          >
            Enam bidang layanan resmi sesuai Akta Pendirian CV Fona Mitra Konsultan —
            mencakup hukum, keuangan, teknologi, manajemen, SDM, dan sertifikasi.
          </p>
        </div>
      </section>

      {/* ── Service Grid (6 kategori resmi) — bg cream, teks gelap ── */}
      <section style={{ background: "#f4f7f7", padding: "64px 0" }}>
        <div className="max-w-7xl mx-auto px-10">
          <div className="eyebrow reveal-left">
            <div className="eyebrow-line" style={{ background: "#1d6b6f" }} />
            <span className="eyebrow-text" style={{ color: "#1d6b6f" }}>6 Layanan Resmi</span>
          </div>
          <h2
            className="reveal"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 600, fontSize: 26,
              color: "#254a76", marginBottom: 8, lineHeight: 1.3,
            }}
          >
            Solusi Lengkap untuk Koperasi Anda
          </h2>
          <p
            className="reveal"
            style={{
              color: "#4b5563", fontSize: 14, fontWeight: 400,
              lineHeight: 1.7, maxWidth: 520, marginBottom: 36,
            }}
          >
            Sesuai ruang lingkup usaha resmi dalam Akta Pendirian CV Fona Mitra Konsultan.
          </p>

          <div
            className="services-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 14,
            }}
          >
            {services.map((s, i) => (
              <div
                key={s.num}
                className="service-card reveal"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <span className="service-card-num">{s.num}</span>
                <div className="service-icon">{s.icon}</div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 16, fontWeight: 600,
                    color: "#0a1e30",
                    lineHeight: 1.35,
                    marginBottom: 8, paddingRight: 30,
                  }}
                >
                  {s.title}
                </h3>
                <p style={{ fontSize: 12.5, color: "#4b5563", fontWeight: 400, lineHeight: 1.65 }}>
                  {s.desc}
                </p>
                <ul className="service-includes">
                  {s.includes.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
                <span className="service-tag">{s.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Free Services — bg cream, teks gelap ── */}
      <section className="free-section">
        <div className="max-w-7xl mx-auto px-10">
          <div className="eyebrow reveal-left">
            <div className="eyebrow-line" style={{ background: "#1d6b6f" }} />
            <span className="eyebrow-text" style={{ color: "#1d6b6f" }}>Tanpa Biaya</span>
          </div>
          <h2
            className="reveal"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 600, fontSize: 26,
              color: "#254a76", marginBottom: 24, lineHeight: 1.3,
            }}
          >
            Layanan Gratis untuk Koperasi
          </h2>
          <p
            className="reveal"
            style={{
              color: "#4b5563", fontSize: 14, fontWeight: 400,
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
                  <p style={{ fontSize: 13.5, color: "#374151", fontWeight: 400, lineHeight: 1.65 }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>

            {/* Right: CTA */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
              <div
                style={{
                  color: "#1d6b6f", fontSize: 10, letterSpacing: "0.22em",
                  textTransform: "uppercase", fontWeight: 600,
                }}
              >
                Mulai Sekarang
              </div>
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 20, fontWeight: 600, fontStyle: "italic",
                  color: "#0a1e30", lineHeight: 1.5,
                }}
              >
                Konsultasi awal gratis hingga 2 jam — online maupun tatap muka.
              </p>
              <p style={{ fontSize: 13, color: "#4b5563", fontWeight: 400, lineHeight: 1.65 }}>
                Tidak ada kewajiban setelah konsultasi gratis. Kami bantu Anda memahami
                kebutuhan koperasi terlebih dahulu sebelum memutuskan layanan yang tepat.
              </p>
              <div>
                <a
                  href="https://wa.me/6281807405852?text=Halo%20Fona%20Mitra%20Konsultan%2C%20saya%20ingin%20berkonsultasi."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Hubungi Kami Sekarang
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Strip (bg navy, teks terang OK) ── */}
      <section className="cta-strip">
        <div className="max-w-7xl mx-auto px-10" style={{ textAlign: "center" }}>
          <div
            style={{
              color: "#5fc9c2", fontSize: 10, letterSpacing: "0.22em",
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
          <p style={{ color: "#cbd5e1", fontSize: 14, fontWeight: 300, lineHeight: 1.7, maxWidth: 440, margin: "0 auto 28px" }}>
            Tim kami siap membantu menemukan layanan yang paling sesuai dengan kondisi
            dan kebutuhan koperasi Anda.
          </p>
          <a
            href="https://wa.me/6281807405852?text=Halo%20Fona%20Mitra%20Konsultan%2C%20saya%20ingin%20berkonsultasi."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Konsultasi Gratis
          </a>
        </div>
      </section>
    </>
  );
}