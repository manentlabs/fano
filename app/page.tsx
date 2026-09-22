"use client";

import { useEffect, useRef } from "react";

const benefits = [
  {
    num: "01",
    icon: "🏆",
    title: "Konsultan Berpengalaman",
    desc: "Ditangani tim ahli tata kelola koperasi dengan rekam jejak teruji di berbagai jenis koperasi.",
    tag: "Kredibilitas",
  },
  {
    num: "02",
    icon: "⚖️",
    title: "Legalitas Terjamin",
    desc: "ART, Persus, SOP, hingga Anggaran Dasar disusun lengkap dan sesuai regulasi terbaru.",
    tag: "Kepatuhan Hukum",
  },
  {
    num: "03",
    icon: "📊",
    title: "Laporan Keuangan Akurat",
    desc: "Neraca, SHU, arus kas, dan pajak tersusun rapi sesuai standar akuntansi koperasi (SAK ETAP).",
    tag: "Transparansi",
  },
  {
    num: "04",
    icon: "🤝",
    title: "Pendampingan Menyeluruh",
    desc: "Didampingi mulai dari perencanaan, penyusunan dokumen, hingga eksekusi di lapangan.",
    tag: "End-to-End",
  },
  {
    num: "05",
    icon: "🏦",
    title: "Akses Pembiayaan Lebih Mudah",
    desc: "Proposal ke LPDB, bank, dan lembaga keuangan disiapkan matang lewat studi kelayakan.",
    tag: "Pertumbuhan Usaha",
  },
  {
    num: "06",
    icon: "📱",
    title: "Solusi Digital Modern",
    desc: "Operasional koperasi lebih efisien dengan aplikasi manajemen berbasis digital.",
    tag: "Efisiensi",
  },
  {
    num: "07",
    icon: "🗺️",
    title: "Perencanaan Strategis Jelas",
    desc: "Arah kerja lebih terarah lewat RK Tahunan, RAPBK, Renstra, dan Roadmap yang terstruktur.",
    tag: "Visi Jangka Panjang",
  },
  {
    num: "08",
    icon: "💬",
    title: "Konsultasi Tanpa Batas",
    desc: "Siap membantu kapan pun dibutuhkan — regulasi, tata kelola, hingga pemecahan masalah.",
    tag: "Dukungan Penuh",
  },
];

// Keunggulan / manfaat yang ditonjolkan di hero — menggantikan angka statistik
const advantages = [
  {
    icon: "✅",
    title: "Legalitas Terjamin",
    desc: "Dokumen & perizinan sesuai regulasi terbaru",
  },
  {
    icon: "🤝",
    title: "Pendampingan Menyeluruh",
    desc: "Dari perencanaan hingga eksekusi di lapangan",
  },
  {
    icon: "🏆",
    title: "Konsultan Berpengalaman",
    desc: "Tim ahli tata kelola koperasi terpercaya",
  },
];

export default function Home() {
  const heroBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroBgRef.current;
    if (!el) return;
    const t = setTimeout(() => el.classList.add("loaded"), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = heroBgRef.current;
    if (!el) return;
    const onScroll = () => {
      el.style.transform = `scale(1) translateY(${window.scrollY * 0.25}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          /* Palette diambil dari logo FONA Mitra Konsultan */
          --navy-deep: #0a1e30;
          --navy: #254a76;
          --teal: #2f8f8a;
          --teal-light: #5fc9c2;
          --teal-dark: #1d6b6f;
          --cream: #f4f7f7;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .reveal {
          opacity: 0; transform: translateY(32px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal.visible { opacity: 1; transform: translateY(0); }

        .reveal-left {
          opacity: 0; transform: translateX(-24px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .reveal-left.visible { opacity: 1; transform: translateX(0); }

        .hero-bg {
          position: absolute; inset: 0;
          background-image: url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&q=80');
          background-size: cover; background-position: center;
          transform: scale(1.05);
          transition: transform 8s ease;
          will-change: transform;
        }
        .hero-bg.loaded { transform: scale(1); }

        .btn-primary {
          background: linear-gradient(135deg, var(--teal-light), var(--teal));
          color: #082022;
          padding: 12px 28px; font-size: 13px; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase;
          border: none; cursor: pointer;
          transition: filter 0.2s, transform 0.15s;
          white-space: nowrap; display: inline-block;
        }
        .btn-primary:hover { filter: brightness(1.08); transform: translateY(-2px); }
        .btn-primary:active { transform: translateY(0); }

        .btn-ghost {
          background: transparent; color: #9ca3af;
          padding: 12px 28px; font-size: 13px;
          letter-spacing: 0.08em; text-transform: uppercase;
          border: 1px solid rgba(255,255,255,0.2); cursor: pointer;
          transition: color 0.2s, border-color 0.2s, transform 0.15s;
          white-space: nowrap; display: inline-block;
        }
        .btn-ghost:hover {
          color: #f5f0e8; border-color: rgba(95,201,194,0.5);
          transform: translateY(-2px);
        }

        .service-card {
          background: #fff; border: 1px solid rgba(29,107,111,0.12);
          padding: 20px; position: relative; overflow: hidden;
          transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
        }
        .service-card::before {
          content: ''; position: absolute; inset: 0;
          background: rgba(47,143,138,0.05); opacity: 0;
          transition: opacity 0.25s;
        }
        .service-card:hover {
          border-color: rgba(47,143,138,0.55);
          transform: translateY(-3px);
          box-shadow: 0 8px 32px rgba(29,107,111,0.14);
        }
        .service-card:hover::before { opacity: 1; }
        .service-card:hover .card-num { color: rgba(47,143,138,0.4); }
        .service-card:hover .card-icon {
          border-color: rgba(47,143,138,0.75);
          background: rgba(47,143,138,0.08);
        }
        .service-card:hover .card-tag { background: rgba(47,143,138,0.2); }

        .card-num {
          position: absolute; top: 16px; right: 16px;
          font-family: 'Playfair Display', serif; font-weight: 700;
          font-size: 26px; color: rgba(29,107,111,0.2);
          line-height: 1; transition: color 0.25s;
        }
        .card-icon {
          width: 38px; height: 38px;
          border: 1px solid rgba(47,143,138,0.4);
          display: flex; align-items: center; justify-content: center;
          font-size: 17px; margin-bottom: 14px;
          transition: border-color 0.25s, background 0.25s;
        }
        .card-tag {
          display: inline-block; margin-top: 10px;
          padding: 4px 9px; font-size: 10px;
          letter-spacing: 0.1em; text-transform: uppercase;
          background: rgba(47,143,138,0.12); color: #1d6b6f;
          border: 1px solid rgba(47,143,138,0.3);
          transition: background 0.25s;
        }

        .banner {
          background: var(--navy); padding: 28px 32px;
          display: flex; align-items: center;
          justify-content: space-between; gap: 20px;
          flex-wrap: wrap; margin-top: 32px;
          border: 1px solid rgba(47,143,138,0.15);
          transition: border-color 0.3s;
        }
        .banner:hover { border-color: rgba(47,143,138,0.35); }

        /* ── Advantage items (replace numeric stats) ── */
        .advantage-item {
          display: flex; align-items: flex-start; gap: 12px;
          min-width: 200px;
        }
        .advantage-icon {
          width: 34px; height: 34px; flex-shrink: 0;
          border: 1px solid rgba(47,143,138,0.4);
          background: rgba(47,143,138,0.08);
          display: flex; align-items: center; justify-content: center;
          font-size: 15px;
        }

        /* ── Hero full-bleed (no container constraint) ── */
        .hero-section {
          position: relative; overflow: hidden;
          background: var(--navy); min-height: 520px;
        }

        /* ── Hero inner uses container pattern ── */
        .hero-inner {
          position: relative; z-index: 10;
          padding-top: 60px; padding-bottom: 52px;
        }

        /* ── Services uses container pattern ── */
        .services-section {
          background: var(--cream);
          padding-top: 72px; padding-bottom: 72px;
        }

        /* Mobile */
        @media (max-width: 768px) {
          .hero-inner {
            padding-top: 40px; padding-bottom: 40px;
          }
          .hero-h1 { font-size: 30px !important; }
          .hero-cta { flex-direction: column; }
          .hero-cta button, .hero-cta a { width: 100%; text-align: center; }
          .hero-stats { flex-direction: column; gap: 16px !important; }
          .stat-divider { display: none; }
          .services-section { padding-top: 48px; padding-bottom: 48px; }
          .services-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 10px !important;
          }
          .banner { flex-direction: column; align-items: flex-start; padding: 20px; }
          .banner .btn-primary { width: 100%; text-align: center; }
        }

        @media (max-width: 420px) {
          .hero-h1 { font-size: 26px !important; }
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── Hero — full-bleed background, container inside ── */}
      <section className="hero-section">
        {/* Background layers — deliberately outside container */}
        <div ref={heroBgRef} className="hero-bg" />
        {/* Overlay biru senada dengan palette navy-deem/navy, agar teks tetap kontras */}
        <div
          style={{
            position: "absolute", inset: 0,
            background:
              "linear-gradient(120deg, rgba(10,30,48,0.92) 0%, rgba(37,74,118,0.88) 45%, rgba(10,30,48,0.94) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute", inset: 0,
            backgroundImage:
              "linear-gradient(rgba(47,143,138,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(47,143,138,0.05) 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Content — container pattern */}
        <div className="max-w-7xl mx-auto px-10 hero-inner">

          {/* Eyebrow */}
          <div
            style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, animation: "fadeUp 0.8s ease both" }}
          >
            <div style={{ width: 32, height: 1, background: "#5fc9c2", animation: "slideInLeft 1s ease both" }} />
            <span style={{ color: "#5fc9c2", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 300 }}>
              CV Fona Mitra Konsultan
            </span>
          </div>

          {/* Heading */}
          <h1
            className="hero-h1"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700, fontSize: 48, lineHeight: 1.15,
              color: "#f5f0e8", marginBottom: 16,
              animation: "fadeUp 0.8s 0.1s ease both",
            }}
          >
            Mitra Strategis{" "}
            <em style={{ color: "#5fc9c2", fontStyle: "italic" }}>Terpercaya</em>
            <br />
            untuk Tata Kelola Koperasi
          </h1>

          {/* Description */}
          <p
            style={{
              color: "#9ca3af", fontSize: 15, fontWeight: 300,
              lineHeight: 1.75, maxWidth: 480, marginBottom: 32,
              animation: "fadeUp 0.8s 0.2s ease both",
            }}
          >
            Solusi konsultasi perkoperasian yang profesional, terstandar, dan berintegritas — dari penyusunan dokumen legalitas hingga pendampingan pembiayaan.
          </p>

          {/* Keunggulan — menggantikan angka statistik */}
          <div
            className="hero-stats"
            style={{
              display: "flex", gap: 32,
              borderTop: "1px solid rgba(47,143,138,0.2)",
              paddingTop: 24,
              animation: "fadeUp 0.8s 0.4s ease both",
              flexWrap: "wrap",
            }}
          >
            {advantages.map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "stretch", gap: 32 }}>
                {i > 0 && (
                  <div
                    className="stat-divider"
                    style={{ width: 1, background: "rgba(47,143,138,0.2)", alignSelf: "stretch" }}
                  />
                )}
                <div className="advantage-item">
                  <div className="advantage-icon">{a.icon}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <span style={{ fontSize: 14, fontWeight: 500, color: "#f5f0e8" }}>
                      {a.title}
                    </span>
                    <span style={{ fontSize: 11.5, color: "#8b98a5", lineHeight: 1.4 }}>
                      {a.desc}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="services-section">
        <div className="max-w-7xl mx-auto px-10">

          {/* Eyebrow */}
          <div className="reveal-left" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
            <div style={{ width: 28, height: 1, background: "#1d6b6f" }} />
            <span style={{ color: "#1d6b6f", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500 }}>
              Keunggulan Kami
            </span>
          </div>

          <h2
            className="reveal"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 600, fontSize: 28, color: "#254a76",
              marginBottom: 8, lineHeight: 1.3,
            }}
          >
            Kelebihan Bermitra dengan Kami
          </h2>

          <p
            className="reveal"
            style={{ color: "#6b7280", fontSize: 14, fontWeight: 300, lineHeight: 1.7, maxWidth: 480, marginBottom: 36 }}
          >
            Keuntungan nyata yang Anda dapatkan saat mempercayakan tata kelola koperasi kepada kami.
          </p>

          {/* Cards */}
          <div
            className="services-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}
          >
            {benefits.map((s, i) => (
              <div
                key={s.num}
                className="service-card reveal"
                style={{ transitionDelay: `${i * 0.07}s` }}
              >
                <span className="card-num">{s.num}</span>
                <div className="card-icon">{s.icon}</div>
                <p style={{ color: "#254a76", fontSize: 13.5, fontWeight: 500, lineHeight: 1.4, marginBottom: 7, paddingRight: 28 }}>
                  {s.title}
                </p>
                <p style={{ color: "#6b7280", fontSize: 12, fontWeight: 300, lineHeight: 1.65 }}>
                  {s.desc}
                </p>
                <span className="card-tag">{s.tag}</span>
              </div>
            ))}
          </div>

          {/* Banner */}
          <div className="banner reveal">
            <div>
              <div style={{ color: "#5fc9c2", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500, marginBottom: 4 }}>
                Layanan Gratis
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: "#f5f0e8", marginBottom: 4 }}>
                Konsultasi Awal &amp; Template Dokumen
              </div>
              <div style={{ color: "#8b98a5", fontSize: 13, fontWeight: 300, maxWidth: 360, lineHeight: 1.6 }}>
                Konsultasi singkat gratis hingga 2 jam, template buku 16 koperasi, format RAT, dan Peraturan Khusus standar.
              </div>
            </div>
            <a
            href="https://wa.me/628981344316?text=Halo%20Fona%20Mitra%20Konsultan%2C%20saya%20ingin%20berkonsultasi."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ flexShrink: 0, textAlign: "center" }}
          >
            Hubungi Kami
          </a>
          </div>

        </div>
      </section>
    </>
  );
}