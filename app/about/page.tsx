"use client";

import { useEffect } from "react";

const teamMembers = [
  {
    initials: "FJ",
    role: "Direktur Bidang Legal dan Kepatuhan",
    title: "Fajar",
    responsibilities: [
      "Mengelola aspek hukum organisasi",
      "Menyusun dan meninjau perjanjian",
      "Memastikan kepatuhan terhadap peraturan dan tata kelola",
    ],
  },
  {
    initials: "OL",
    role: "Direktur Bidang Keuangan",
    title: "Olla",
    responsibilities: [
      "Mengelola perencanaan dan pengendalian keuangan",
      "Menyusun anggaran dan laporan keuangan",
      "Mengawasi investasi, pendanaan, dan manajemen risiko keuangan",
    ],
  },
  {
    initials: "HD",
    role: "Direktur Bidang Teknologi Informasi",
    title: "Hendar",
    responsibilities: [
      "Mengembangkan strategi transformasi digital",
      "Mengelola infrastruktur dan keamanan sistem informasi",
      "Mengawasi pengembangan aplikasi, data, dan inovasi teknologi",
    ],
  },
  {
    initials: "LR",
    role: "Komisaris",
    title: "Lia & Rasid",
    responsibilities: [
      "Mengawasi jalannya perusahaan",
      "Memberikan nasihat kepada direksi",
      "Memastikan kepentingan pemegang saham terpenuhi",
    ],
  },
];

const missionPoints = [
  {
    icon: "⚖️",
    text: "Menyediakan layanan konsultasi perkoperasian yang profesional, terstandar, dan berintegritas tinggi.",
  },
  {
    icon: "🤝",
    text: "Mendampingi koperasi dalam tata kelola, administrasi, keuangan, dan pengembangan organisasi secara menyeluruh.",
  },
  {
    icon: "💻",
    text: "Memanfaatkan teknologi digital untuk meningkatkan efisiensi dan kualitas layanan kepada anggota koperasi.",
  },
  {
    icon: "📚",
    text: "Membangun ekosistem perkoperasian yang sehat melalui edukasi, pelatihan, dan pendampingan berkelanjutan.",
  },
  {
    icon: "🏛️",
    text: "Menjalin kemitraan strategis dengan notaris, lembaga keuangan, dan instansi terkait untuk layanan terpadu.",
  },
];

export default function AboutPage() {
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

        /* Page header */
        .about-header {
          background: #0f1623;
          border-bottom: 1px solid rgba(212,176,106,0.15);
          padding: 52px 0 44px;
        }

        /* Section spacing */
        .about-section {
          padding: 64px 0;
        }
        .about-section-alt {
          padding: 64px 0;
          background: #f5f0e8;
        }

        /* Eyebrow */
        .eyebrow {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 10px;
        }
        .eyebrow-line {
          width: 28px; height: 1px;
        }
        .eyebrow-text {
          font-size: 11px; letter-spacing: 0.22em;
          text-transform: uppercase; font-weight: 500;
        }

        /* Vision card */
        .vision-card {
          border: 1px solid rgba(212,176,106,0.25);
          padding: 32px;
          position: relative;
          overflow: hidden;
        }
        .vision-card::before {
          content: '"';
          position: absolute; top: -10px; right: 20px;
          font-family: 'Playfair Display', serif;
          font-size: 120px; color: rgba(212,176,106,0.06);
          line-height: 1;
        }

        /* Mission item */
        .mission-item {
          display: flex; gap: 16px; align-items: flex-start;
          padding: 16px 0;
          border-bottom: 1px solid rgba(15,22,35,0.07);
        }
        .mission-item:last-child { border-bottom: none; }
        .mission-icon {
          width: 36px; height: 36px; flex-shrink: 0;
          border: 1px solid rgba(212,176,106,0.4);
          display: flex; align-items: center; justify-content: center;
          font-size: 15px;
        }

        /* Team card */
        .team-card {
          background: #fff;
          border: 1px solid rgba(139,111,46,0.12);
          padding: 28px 24px;
          position: relative;
          transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
        }
        .team-card:hover {
          border-color: rgba(212,176,106,0.5);
          transform: translateY(-3px);
          box-shadow: 0 8px 32px rgba(212,176,106,0.1);
        }
        .team-avatar {
          width: 56px; height: 56px;
          border: 1px solid rgba(212,176,106,0.5);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 16px;
          font-family: 'Playfair Display', serif;
          font-size: 18px; font-weight: 600;
          color: #d4b06a;
          background: rgba(212,176,106,0.06);
        }
        .team-responsibility {
          display: flex; align-items: flex-start; gap: 8px;
          margin-top: 8px;
          font-size: 12.5px; color: #6b7280; font-weight: 300;
          line-height: 1.5;
        }
        .team-responsibility::before {
          content: '–';
          color: #d4b06a; font-size: 12px;
          flex-shrink: 0; margin-top: 1px;
        }

        /* Stat strip */
        .stat-strip {
          background: #0f1623;
          padding: 40px 0;
          border-top: 1px solid rgba(212,176,106,0.1);
          border-bottom: 1px solid rgba(212,176,106,0.1);
        }
        .stat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
        }
        .stat-cell {
          padding: 0 32px;
          border-right: 1px solid rgba(212,176,106,0.12);
          text-align: center;
        }
        .stat-cell:last-child { border-right: none; }

        /* Values */
        .value-item {
          padding: 20px 24px;
          border: 1px solid rgba(139,111,46,0.1);
          background: #fff;
          transition: border-color 0.2s;
        }
        .value-item:hover { border-color: rgba(212,176,106,0.4); }

        /* Commitment banner */
        .commitment-banner {
          background: #0f1623;
          border: 1px solid rgba(212,176,106,0.15);
          padding: 36px 40px;
          text-align: center;
          margin-top: 48px;
          transition: border-color 0.3s;
        }
        .commitment-banner:hover { border-color: rgba(212,176,106,0.3); }

        .btn-primary {
          background: #d4b06a; color: #0f1623;
          padding: 12px 28px; font-size: 13px; font-weight: 500;
          letter-spacing: 0.08em; text-transform: uppercase;
          border: none; cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          display: inline-block;
        }
        .btn-primary:hover { background: #e2c47f; transform: translateY(-2px); }

        /* Mobile */
        @media (max-width: 768px) {
          .about-header { padding: 40px 0 32px; }
          .about-section, .about-section-alt { padding: 48px 0; }
          .vision-mission-grid {
            grid-template-columns: 1fr !important;
          }
          .team-grid {
            grid-template-columns: 1fr !important;
          }
          .stat-grid {
            grid-template-columns: 1fr !important;
            gap: 24px;
          }
          .stat-cell { border-right: none; border-bottom: 1px solid rgba(212,176,106,0.12); padding: 0 0 24px; }
          .stat-cell:last-child { border-bottom: none; padding-bottom: 0; }
          .values-grid { grid-template-columns: 1fr !important; }
          .commitment-banner { padding: 28px 20px; }
          .about-header-h1 { font-size: 28px !important; }
        }
      `}</style>

      {/* ── Page Header ── */}
      <section className="about-header">
        <div className="max-w-7xl mx-auto px-10">
          <div className="eyebrow" style={{ animation: "fadeUp 0.7s ease both" }}>
            <div className="eyebrow-line" style={{ background: "#d4b06a" }} />
            <span className="eyebrow-text" style={{ color: "#d4b06a" }}>
              CV Fona Mitra Konsultan
            </span>
          </div>

          <h1
            className="about-header-h1"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700, fontSize: 38,
              color: "#f5f0e8", lineHeight: 1.2,
              marginBottom: 14,
              animation: "fadeUp 0.7s 0.1s ease both",
            }}
          >
            Tentang Kami
          </h1>

          <p
            style={{
              color: "#9ca3af", fontSize: 15, fontWeight: 300,
              lineHeight: 1.75, maxWidth: 560,
              animation: "fadeUp 0.7s 0.2s ease both",
            }}
          >
            Mitra konsultan perkoperasian profesional yang hadir untuk mendampingi
            koperasi Indonesia tumbuh dengan tata kelola yang kuat, dokumen yang
            terstandar, dan strategi yang tepat.
          </p>
        </div>
      </section>

      {/* ── Stat Strip ── */}
      <div className="stat-strip">
        <div className="max-w-7xl mx-auto px-10">
          <div className="stat-grid">
            {[
              { value: "127K+", label: "Koperasi Aktif di Indonesia" },
              { value: "8", label: "Paket Layanan Profesional" },
              { value: "One-Stop", label: "Solusi Lengkap Koperasi" },
            ].map((s, i) => (
              <div key={i} className="stat-cell">
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 600, fontSize: 32,
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

      {/* ── Visi & Misi ── */}
      <section className="about-section">
        <div className="max-w-7xl mx-auto px-10">
          <div className="eyebrow reveal-left">
            <div className="eyebrow-line" style={{ background: "#8b6f2e" }} />
            <span className="eyebrow-text" style={{ color: "#8b6f2e" }}>Visi & Misi</span>
          </div>

          <h2
            className="reveal"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 600, fontSize: 26,
              color: "#0f1623", marginBottom: 36, lineHeight: 1.3,
            }}
          >
            Fondasi yang Mengarahkan Setiap Langkah Kami
          </h2>

          <div
            className="vision-mission-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
          >
            {/* Visi */}
            <div className="vision-card reveal" style={{ background: "#0f1623" }}>
              <div style={{ color: "#d4b06a", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 500, marginBottom: 12 }}>
                Visi
              </div>
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 18, fontWeight: 600,
                  color: "#f5f0e8", lineHeight: 1.5,
                  fontStyle: "italic",
                }}
              >
                Menjadi perusahaan konsultan koperasi terpercaya, inovatif, dan berdampak nyata dalam pemberdayaan gerakan koperasi di Indonesia.
              </p>
              <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(212,176,106,0.15)" }}>
                <span style={{ color: "#d4b06a", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 300 }}>
                  "Tumbuh Bersama, Kuat Bersama"
                </span>
              </div>
            </div>

            {/* Misi */}
            <div className="reveal" style={{ transitionDelay: "0.1s" }}>
              <div className="eyebrow" style={{ marginBottom: 16 }}>
                <div className="eyebrow-line" style={{ background: "#8b6f2e" }} />
                <span className="eyebrow-text" style={{ color: "#8b6f2e" }}>Misi</span>
              </div>
              {missionPoints.map((m, i) => (
                <div key={i} className="mission-item">
                  <div className="mission-icon">{m.icon}</div>
                  <p style={{ fontSize: 13.5, color: "#374151", fontWeight: 300, lineHeight: 1.65 }}>
                    {m.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Tim ── */}
      <section className="about-section-alt">
        <div className="max-w-7xl mx-auto px-10">
          <div className="eyebrow reveal-left">
            <div className="eyebrow-line" style={{ background: "#8b6f2e" }} />
            <span className="eyebrow-text" style={{ color: "#8b6f2e" }}>Struktur Tim</span>
          </div>

          <h2
            className="reveal"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 600, fontSize: 26,
              color: "#0f1623", marginBottom: 8, lineHeight: 1.3,
            }}
          >
            Profesional di Balik Layanan Kami
          </h2>

          <p
            className="reveal"
            style={{
              color: "#6b7280", fontSize: 14, fontWeight: 300,
              lineHeight: 1.7, maxWidth: 480, marginBottom: 36,
            }}
          >
            Tim kami terdiri dari 3 tenaga profesional berpengalaman dengan keahlian yang saling melengkapi di bidang kelembagaan, keuangan, dan teknologi koperasi.
          </p>

          <div
            className="team-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}
          >
            {teamMembers.map((m, i) => (
              <div
                key={i}
                className="team-card reveal"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="team-avatar">{m.initials}</div>
                <div
                  style={{
                    color: "#d4b06a", fontSize: 10,
                    letterSpacing: "0.15em", textTransform: "uppercase",
                    fontWeight: 500, marginBottom: 4,
                  }}
                >
                  {m.title}
                </div>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 17, fontWeight: 600,
                    color: "#0f1623", marginBottom: 16, lineHeight: 1.3,
                  }}
                >
                  {m.role}
                </div>
                <div style={{ borderTop: "1px solid rgba(139,111,46,0.1)", paddingTop: 14 }}>
                  {m.responsibilities.map((r, j) => (
                    <div key={j} className="team-responsibility">{r}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Nilai & Komitmen ── */}
      <section className="about-section">
        <div className="max-w-7xl mx-auto px-10">
          <div className="eyebrow reveal-left">
            <div className="eyebrow-line" style={{ background: "#8b6f2e" }} />
            <span className="eyebrow-text" style={{ color: "#8b6f2e" }}>Nilai Kami</span>
          </div>

          <h2
            className="reveal"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 600, fontSize: 26,
              color: "#0f1623", marginBottom: 32, lineHeight: 1.3,
            }}
          >
            Prinsip yang Kami Pegang Teguh
          </h2>

          <div
            className="values-grid reveal"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}
          >
            {[
              { icon: "🏅", label: "Profesionalisme", desc: "Setiap layanan dikerjakan dengan standar tinggi dan tanggung jawab penuh." },
              { icon: "🔒", label: "Integritas", desc: "Kejujuran dan transparansi menjadi landasan hubungan kami dengan klien." },
              { icon: "🎯", label: "Komprehensif", desc: "Solusi satu atap yang mencakup seluruh kebutuhan koperasi Anda." },
              { icon: "⚡", label: "Inovatif", desc: "Memanfaatkan teknologi digital untuk layanan yang lebih efisien." },
              { icon: "📈", label: "Berdampak", desc: "Setiap pendampingan dirancang untuk memberi dampak nyata bagi koperasi." },
              { icon: "🤝", label: "Kemitraan", desc: "Kami bukan sekadar vendor, melainkan mitra jangka panjang koperasi Anda." },
            ].map((v, i) => (
              <div key={i} className="value-item">
                <div style={{ fontSize: 22, marginBottom: 10 }}>{v.icon}</div>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 15, fontWeight: 600,
                    color: "#0f1623", marginBottom: 6,
                  }}
                >
                  {v.label}
                </div>
                <p style={{ fontSize: 12.5, color: "#6b7280", fontWeight: 300, lineHeight: 1.6 }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Komitmen */}
          <div className="commitment-banner reveal">
            <div
              style={{
                color: "#d4b06a", fontSize: 10, letterSpacing: "0.22em",
                textTransform: "uppercase", fontWeight: 500, marginBottom: 12,
              }}
            >
              Komitmen Kami
            </div>
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 18, fontWeight: 600, fontStyle: "italic",
                color: "#f5f0e8", lineHeight: 1.6,
                maxWidth: 600, margin: "0 auto 20px",
              }}
            >
              "Kami berkomitmen menjalankan bisnis ini dengan integritas, profesionalisme, dan dedikasi penuh kepada kemajuan gerakan koperasi Indonesia."
            </p>
            <div
              style={{
                width: 40, height: 1, background: "rgba(212,176,106,0.4)",
                margin: "0 auto 20px",
              }}
            />
            <button className="btn-primary">Mulai Konsultasi Gratis</button>
          </div>
        </div>
      </section>
    </>
  );
}