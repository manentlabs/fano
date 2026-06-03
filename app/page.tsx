"use client";

import { useEffect, useRef } from "react";

const services = [
  {
    num: "01",
    icon: "🎓",
    title: "Narasumber Pelatihan Anggota",
    desc: "Penyediaan narasumber profesional untuk pelatihan manajemen koperasi, simpan pinjam, akuntansi, dan literasi keuangan.",
    tag: "KSP · Koperasi Primer",
  },
  {
    num: "02",
    icon: "📄",
    title: "Penyusunan ART, Persus, SOP & SOM",
    desc: "Penyusunan Anggaran Rumah Tangga, Peraturan Khusus, dan Standar Operasional sesuai regulasi terkini.",
    tag: "Semua Jenis Koperasi",
  },
  {
    num: "03",
    icon: "📊",
    title: "Laporan Keuangan & Perpajakan",
    desc: "Penyusunan neraca, SHU, arus kas, dan pelaporan pajak sesuai standar akuntansi koperasi (SAK ETAP).",
    tag: "KSP · KSPPS",
  },
  {
    num: "04",
    icon: "⚖️",
    title: "Pembuatan / Perubahan Anggaran Dasar",
    desc: "Penyusunan dan perubahan AD koperasi bekerja sama dengan notaris, termasuk pengurusan legalitas lengkap.",
    tag: "Koperasi Baru & Perubahan",
  },
  {
    num: "05",
    icon: "📱",
    title: "Pemasaran Aplikasi Operasional Koperasi",
    desc: "Implementasi dan pendampingan adopsi aplikasi manajemen koperasi berbasis digital.",
    tag: "Semua Jenis Koperasi",
  },
  {
    num: "06",
    icon: "🗺️",
    title: "Rencana Kerja, RAPBK, Renstra & Roadmap",
    desc: "Penyusunan dokumen perencanaan strategis: RK Tahunan, RAPBK, Rencana Strategis 5 tahun, dan Roadmap.",
    tag: "Pengurus & Manajemen",
  },
  {
    num: "07",
    icon: "💬",
    title: "Konsultasi Perkoperasian",
    desc: "Layanan konsultasi menyeluruh: regulasi, tata kelola, kelembagaan, pengembangan bisnis, dan pemecahan masalah.",
    tag: "Semua Jenis Koperasi",
  },
  {
    num: "08",
    icon: "🏦",
    title: "Pendampingan Persiapan Pembiayaan",
    desc: "Pendampingan intensif persiapan proposal ke LPDB, bank, dan lembaga keuangan, termasuk studi kelayakan.",
    tag: "KSP · KSPPS",
  },
];

function useAnimatedCounter(
  ref: React.RefObject<HTMLSpanElement | null>,
  target: number,
  suffix: string,
  delay = 0
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const steps = 60;
    const step = target / steps;
    let current = 0;
    let raf: number;
    const timeout = setTimeout(() => {
      const tick = () => {
        current = Math.min(current + step, target);
        el.textContent = Math.round(current) + suffix;
        if (current < target) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [ref, target, suffix, delay]);
}

export default function Home() {
  const heroBgRef = useRef<HTMLDivElement>(null);
  const stat1Ref = useRef<HTMLSpanElement>(null);
  const stat2Ref = useRef<HTMLSpanElement>(null);

  useAnimatedCounter(stat1Ref, 127, "K+", 600);
  useAnimatedCounter(stat2Ref, 8, "", 800);

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
          background-image: url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80');
          background-size: cover; background-position: center;
          transform: scale(1.05);
          transition: transform 8s ease;
          will-change: transform;
        }
        .hero-bg.loaded { transform: scale(1); }

        .btn-primary {
          background: #d4b06a; color: #0f1623;
          padding: 12px 28px; font-size: 13px; font-weight: 500;
          letter-spacing: 0.08em; text-transform: uppercase;
          border: none; cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          white-space: nowrap; display: inline-block;
        }
        .btn-primary:hover { background: #e2c47f; transform: translateY(-2px); }
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
          color: #f5f0e8; border-color: rgba(255,255,255,0.35);
          transform: translateY(-2px);
        }

        .service-card {
          background: #fff; border: 1px solid rgba(139,111,46,0.1);
          padding: 20px; position: relative; overflow: hidden;
          transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
        }
        .service-card::before {
          content: ''; position: absolute; inset: 0;
          background: rgba(212,176,106,0.04); opacity: 0;
          transition: opacity 0.25s;
        }
        .service-card:hover {
          border-color: rgba(212,176,106,0.5);
          transform: translateY(-3px);
          box-shadow: 0 8px 32px rgba(212,176,106,0.12);
        }
        .service-card:hover::before { opacity: 1; }
        .service-card:hover .card-num { color: rgba(212,176,106,0.35); }
        .service-card:hover .card-icon {
          border-color: rgba(212,176,106,0.7);
          background: rgba(212,176,106,0.07);
        }
        .service-card:hover .card-tag { background: rgba(212,176,106,0.18); }

        .card-num {
          position: absolute; top: 16px; right: 16px;
          font-family: 'Playfair Display', serif; font-weight: 700;
          font-size: 26px; color: rgba(212,176,106,0.18);
          line-height: 1; transition: color 0.25s;
        }
        .card-icon {
          width: 38px; height: 38px;
          border: 1px solid rgba(212,176,106,0.35);
          display: flex; align-items: center; justify-content: center;
          font-size: 17px; margin-bottom: 14px;
          transition: border-color 0.25s, background 0.25s;
        }
        .card-tag {
          display: inline-block; margin-top: 10px;
          padding: 4px 9px; font-size: 10px;
          letter-spacing: 0.1em; text-transform: uppercase;
          background: rgba(212,176,106,0.1); color: #8b6f2e;
          border: 1px solid rgba(212,176,106,0.25);
          transition: background 0.25s;
        }

        .banner {
          background: #0f1623; padding: 28px 32px;
          display: flex; align-items: center;
          justify-content: space-between; gap: 20px;
          flex-wrap: wrap; margin-top: 32px;
          border: 1px solid rgba(212,176,106,0.1);
          transition: border-color 0.3s;
        }
        .banner:hover { border-color: rgba(212,176,106,0.28); }

        /* ── Hero full-bleed (no container constraint) ── */
        .hero-section {
          position: relative; overflow: hidden;
          background: #0f1623; min-height: 520px;
        }

        /* ── Hero inner uses container pattern ── */
        .hero-inner {
          position: relative; z-index: 10;
          padding-top: 60px; padding-bottom: 52px;
        }

        /* ── Services uses container pattern ── */
        .services-section {
          background: #f5f0e8;
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
        <div style={{ position: "absolute", inset: 0, background: "rgba(15,22,35,0.8)" }} />
        <div
          style={{
            position: "absolute", inset: 0,
            backgroundImage:
              "linear-gradient(rgba(212,176,106,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(212,176,106,0.04) 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Content — container pattern */}
        <div className="max-w-7xl mx-auto px-10 hero-inner">

          {/* Eyebrow */}
          <div
            style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, animation: "fadeUp 0.8s ease both" }}
          >
            <div style={{ width: 32, height: 1, background: "#d4b06a", animation: "slideInLeft 1s ease both" }} />
            <span style={{ color: "#d4b06a", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 300 }}>
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
            <em style={{ color: "#d4b06a", fontStyle: "italic" }}>Terpercaya</em>
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

          {/* CTA */}
          <div
            className="hero-cta"
            style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 52, animation: "fadeUp 0.8s 0.3s ease both" }}
          >
            <button className="btn-primary">Konsultasi Gratis</button>
            <button className="btn-ghost">Lihat Layanan Kami</button>
          </div>

          {/* Stats */}
          <div
            className="hero-stats"
            style={{
              display: "flex", gap: 32,
              borderTop: "1px solid rgba(212,176,106,0.15)",
              paddingTop: 24,
              animation: "fadeUp 0.8s 0.4s ease both",
              flexWrap: "wrap",
            }}
          >
            {[
              { ref: stat1Ref, defaultVal: "0K+", label: "Koperasi Aktif di Indonesia" },
              { ref: stat2Ref, defaultVal: "0", label: "Paket Layanan Profesional" },
              { ref: null, defaultVal: "One-Stop", label: "Solusi Lengkap Koperasi" },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "stretch", gap: 32 }}>
                {i > 0 && (
                  <div
                    className="stat-divider"
                    style={{ width: 1, background: "rgba(212,176,106,0.15)", alignSelf: "stretch" }}
                  />
                )}
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span
                    ref={s.ref}
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 600, fontSize: 28, color: "#f5f0e8", lineHeight: 1,
                    }}
                  >
                    {s.defaultVal}
                  </span>
                  <span style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b7280" }}>
                    {s.label}
                  </span>
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
            <div style={{ width: 28, height: 1, background: "#8b6f2e" }} />
            <span style={{ color: "#8b6f2e", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500 }}>
              Portofolio Layanan
            </span>
          </div>

          <h2
            className="reveal"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 600, fontSize: 28, color: "#0f1623",
              marginBottom: 8, lineHeight: 1.3,
            }}
          >
            8 Layanan Komprehensif untuk Koperasi Anda
          </h2>

          <p
            className="reveal"
            style={{ color: "#6b7280", fontSize: 14, fontWeight: 300, lineHeight: 1.7, maxWidth: 480, marginBottom: 36 }}
          >
            Dirancang untuk memenuhi seluruh kebutuhan operasional, legalitas, dan pengembangan koperasi di Indonesia.
          </p>

          {/* Cards */}
          <div
            className="services-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}
          >
            {services.map((s, i) => (
              <div
                key={s.num}
                className="service-card reveal"
                style={{ transitionDelay: `${i * 0.07}s` }}
              >
                <span className="card-num">{s.num}</span>
                <div className="card-icon">{s.icon}</div>
                <p style={{ color: "#0f1623", fontSize: 13.5, fontWeight: 500, lineHeight: 1.4, marginBottom: 7, paddingRight: 28 }}>
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
              <div style={{ color: "#d4b06a", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500, marginBottom: 4 }}>
                Layanan Gratis
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: "#f5f0e8", marginBottom: 4 }}>
                Konsultasi Awal &amp; Template Dokumen
              </div>
              <div style={{ color: "#6b7280", fontSize: 13, fontWeight: 300, maxWidth: 360, lineHeight: 1.6 }}>
                Konsultasi singkat gratis hingga 2 jam, template buku 16 koperasi, format RAT, dan Peraturan Khusus standar.
              </div>
            </div>
            <button className="btn-primary" style={{ flexShrink: 0 }}>
              Hubungi Kami
            </button>
          </div>

        </div>
      </section>
    </>
  );
}