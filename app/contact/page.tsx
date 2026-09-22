"use client";

import { useState } from "react";

type FormData = {
  nama: string;
  koperasi: string;
  email: string;
  telepon: string;
  layanan: string;
  pesan: string;
};

const layananOptions = [
  "Narasumber Pelatihan Anggota",
  "Penyusunan ART, Persus, SOP & SOM",
  "Laporan Keuangan & Perpajakan",
  "Pembuatan / Perubahan Anggaran Dasar",
  "Pemasaran Aplikasi Operasional Koperasi",
  "Rencana Kerja, RAPBK, Renstra & Roadmap",
  "Konsultasi Perkoperasian",
  "Pendampingan Persiapan Pembiayaan",
  "Konsultasi Gratis (2 jam)",
  "Lainnya",
];

const contactInfo = [
  {
    icon: "📍",
    label: "Alamat",
    value: "Jawa Barat, Indonesia",
    sub: "Layanan tersedia online & tatap muka",
    href: null,
  },
  {
    icon: "📞",
    label: "Telepon / WhatsApp",
    value: "+62 898-1344-316",
    sub: "Senin – Jumat, 08.00 – 17.00 WIB",
    href: "https://wa.me/628981344316",
  },
  {
    icon: "✉️",
    label: "Email",
    value: "admin@fona.site",
    sub: "Respon dalam 1×24 jam kerja",
    href: "mailto:admin@fona.site",
  },
];

const socials = [
  { href: "https://www.instagram.com/fona.mitrakonsultan/", icon: "ti-brand-instagram", label: "Instagram" },
  { href: "#", icon: "ti-brand-facebook", label: "Facebook" },
  { href: "#", icon: "ti-brand-youtube", label: "YouTube" },
  { href: "https://wa.me/628981344316", icon: "ti-brand-whatsapp", label: "WhatsApp" },
];

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({
    nama: "",
    koperasi: "",
    email: "",
    telepon: "",
    layanan: "",
    pesan: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ nama: "", koperasi: "", email: "", telepon: "", layanan: "", pesan: "" });
    } catch {
      setStatus("error");
    }
  }

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

        /* Header — navy (teks terang OK) */
        .contact-header {
          background: var(--navy);
          border-bottom: 1px solid rgba(47,143,138,0.15);
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

        /* Layout grid */
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 40px;
          align-items: start;
        }

        /* Info cards — bg putih, teks gelap */
        .info-card {
          display: flex; align-items: flex-start; gap: 16px;
          padding: 18px 20px;
          background: #fff;
          border: 1px solid rgba(47,143,138,0.2);
          margin-bottom: 10px;
          transition: border-color 0.2s;
        }
        .info-card:hover { border-color: rgba(47,143,138,0.55); }
        .info-icon {
          width: 38px; height: 38px; flex-shrink: 0;
          border: 1px solid rgba(47,143,138,0.4);
          background: rgba(47,143,138,0.06);
          display: flex; align-items: center; justify-content: center;
          font-size: 16px;
        }
        .info-link {
          color: var(--navy-deep);
          text-decoration: none;
          transition: color 0.2s;
        }
        .info-link:hover { color: var(--teal-dark); }

        /* Social row */
        .social-row {
          display: flex; gap: 8px;
          margin-top: 14px;
        }
        .social-btn {
          width: 34px; height: 34px;
          border: 1px solid rgba(47,143,138,0.25);
          display: flex; align-items: center; justify-content: center;
          color: #4b5563; font-size: 16px;
          text-decoration: none;
          transition: all 0.2s;
        }
        .social-btn:hover {
          border-color: var(--teal-light);
          color: var(--teal-dark);
        }

        /* Free services box — bg navy, teks terang */
        .free-box {
          background: var(--navy);
          border: 1px solid rgba(47,143,138,0.2);
          padding: 24px;
          margin-top: 10px;
        }
        .free-item {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 8px 0;
          border-bottom: 1px solid rgba(95,201,194,0.12);
          font-size: 12.5px; color: #cbd5e1; font-weight: 300; line-height: 1.5;
        }
        .free-item:last-child { border-bottom: none; padding-bottom: 0; }
        .free-check { color: var(--teal-light); font-size: 11px; flex-shrink: 0; margin-top: 2px; font-weight: 700; }

        /* Form — bg putih, teks gelap */
        .form-card {
          background: #fff;
          border: 1px solid rgba(47,143,138,0.25);
          padding: 36px;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .form-group {
          display: flex; flex-direction: column; gap: 6px;
          margin-bottom: 14px;
        }
        .form-label {
          font-size: 11px; letter-spacing: 0.12em;
          text-transform: uppercase; color: #4b5563; font-weight: 600;
        }
        .form-input {
          padding: 11px 14px;
          font-size: 13.5px; font-weight: 400;
          border: 1px solid rgba(47,143,138,0.25);
          background: var(--cream);
          color: var(--navy-deep);
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          font-family: 'Inter', sans-serif;
          width: 100%;
        }
        .form-input:focus {
          border-color: var(--teal);
          background: #fff;
        }
        .form-input::placeholder { color: #9ca3af; }
        select.form-input { cursor: pointer; appearance: none; }
        textarea.form-input { resize: vertical; min-height: 120px; }

        /* Submit — gradient teal */
        .btn-submit {
          width: 100%;
          background: linear-gradient(135deg, var(--teal-light), var(--teal));
          color: #082022;
          padding: 14px 28px; font-size: 12px; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          border: none; cursor: pointer;
          transition: filter 0.2s, transform 0.15s;
          font-family: 'Inter', sans-serif;
        }
        .btn-submit:hover:not(:disabled) {
          filter: brightness(1.08);
          transform: translateY(-2px);
        }
        .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }

        /* Status messages */
        .alert {
          padding: 14px 16px; font-size: 13px; font-weight: 400;
          margin-bottom: 20px; line-height: 1.5;
          border-left: 3px solid;
        }
        .alert-success {
          background: rgba(29,107,111,0.08);
          border-color: var(--teal-dark); color: var(--teal-dark);
        }
        .alert-error {
          background: rgba(180,30,30,0.08);
          border-color: #b41e1e; color: #8a1717;
        }

        @media (max-width: 768px) {
          .contact-header { padding: 40px 0 32px; }
          .contact-header h1 { font-size: 28px !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
          .form-card { padding: 24px 20px; }
          .contact-section { padding: 48px 0 !important; }
        }
      `}</style>

      {/* ── Header (bg navy) ── */}
      <section className="contact-header">
        <div className="max-w-7xl mx-auto px-10">
          <div className="eyebrow" style={{ animation: "fadeUp 0.7s ease both" }}>
            <div className="eyebrow-line" style={{ background: "#5fc9c2" }} />
            <span className="eyebrow-text" style={{ color: "#5fc9c2" }}>Hubungi Kami</span>
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700, fontSize: 38,
              color: "#f5f0e8", lineHeight: 1.2, marginBottom: 14,
              animation: "fadeUp 0.7s 0.1s ease both",
            }}
          >
            Mulai Konsultasi Anda
          </h1>
          <p
            style={{
              color: "#cbd5e1", fontSize: 15, fontWeight: 300,
              lineHeight: 1.75, maxWidth: 520,
              animation: "fadeUp 0.7s 0.2s ease both",
            }}
          >
            Ceritakan kebutuhan koperasi Anda dan kami akan segera merespons
            dengan solusi yang tepat. Konsultasi awal gratis hingga 2 jam.
          </p>
        </div>
      </section>

      {/* ── Main Content (bg cream) ── */}
      <section className="contact-section" style={{ background: "#f4f7f7", padding: "64px 0" }}>
        <div className="max-w-7xl mx-auto px-10">
          <div className="contact-grid">

            {/* ── Left: Info ── */}
            <div>
              <div className="eyebrow" style={{ marginBottom: 20 }}>
                <div className="eyebrow-line" style={{ background: "#1d6b6f" }} />
                <span className="eyebrow-text" style={{ color: "#1d6b6f" }}>Informasi Kontak</span>
              </div>

              {contactInfo.map((info, i) => (
                <div key={i} className="info-card">
                  <div className="info-icon">{info.icon}</div>
                  <div>
                    <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b7280", fontWeight: 600, marginBottom: 3 }}>
                      {info.label}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>
                      {info.href ? (
                        <a
                          href={info.href}
                          target={info.href.startsWith("http") ? "_blank" : undefined}
                          rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="info-link"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <span style={{ color: "var(--navy-deep)" }}>{info.value}</span>
                      )}
                    </div>
                    <div style={{ fontSize: 12, color: "#4b5563", fontWeight: 400 }}>
                      {info.sub}
                    </div>
                  </div>
                </div>
              ))}

              {/* Social media row */}
              <div className="social-row">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="social-btn"
                  >
                    <i className={`ti ${s.icon}`} aria-hidden="true" />
                  </a>
                ))}
              </div>

              {/* Free services — navy box */}
              <div className="free-box">
                <div style={{ color: "#5fc9c2", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, marginBottom: 12 }}>
                  Layanan Gratis
                </div>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, color: "#f5f0e8", marginBottom: 14, lineHeight: 1.4 }}>
                  Yang Anda dapatkan tanpa biaya:
                </p>
                {[
                  "Konsultasi singkat hingga 2 jam (online/tatap muka)",
                  "Template buku 16 koperasi",
                  "Template Peraturan Khusus standar",
                  "Template Laporan RAT",
                ].map((item, i) => (
                  <div key={i} className="free-item">
                    <span className="free-check">✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: Form ── */}
            <div className="form-card">
              <div style={{ marginBottom: 24 }}>
                <div className="eyebrow">
                  <div className="eyebrow-line" style={{ background: "#1d6b6f" }} />
                  <span className="eyebrow-text" style={{ color: "#1d6b6f" }}>Formulir Kontak</span>
                </div>
                <p style={{ fontSize: 13, color: "#4b5563", fontWeight: 400, lineHeight: 1.6, marginTop: 6 }}>
                  Isi formulir di bawah dan kami akan menghubungi Anda dalam 1×24 jam kerja.
                </p>
              </div>

              {status === "success" && (
                <div className="alert alert-success">
                  ✓ Pesan berhasil dikirim! Tim kami akan segera menghubungi Anda.
                </div>
              )}
              {status === "error" && (
                <div className="alert alert-error">
                  ✗ Terjadi kesalahan. Silakan coba lagi atau hubungi kami langsung via WhatsApp.
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Row 1 */}
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Nama Lengkap *</label>
                    <input
                      name="nama"
                      className="form-input"
                      placeholder="Nama Anda"
                      value={form.nama}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Nama Koperasi</label>
                    <input
                      name="koperasi"
                      className="form-input"
                      placeholder="Nama koperasi Anda"
                      value={form.koperasi}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input
                      name="email"
                      type="email"
                      className="form-input"
                      placeholder="email@koperasi.id"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Telepon / WhatsApp</label>
                    <input
                      name="telepon"
                      type="tel"
                      className="form-input"
                      placeholder="08xx-xxxx-xxxx"
                      value={form.telepon}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Layanan */}
                <div className="form-group">
                  <label className="form-label">Layanan yang Diminati</label>
                  <select
                    name="layanan"
                    className="form-input"
                    value={form.layanan}
                    onChange={handleChange}
                  >
                    <option value="">— Pilih layanan —</option>
                    {layananOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Pesan */}
                <div className="form-group">
                  <label className="form-label">Pesan / Kebutuhan Anda *</label>
                  <textarea
                    name="pesan"
                    className="form-input"
                    placeholder="Ceritakan kondisi koperasi dan kebutuhan Anda secara singkat..."
                    value={form.pesan}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn-submit"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Mengirim..." : "Kirim Pesan →"}
                </button>

                <p style={{ fontSize: 11, color: "#6b7280", fontWeight: 400, marginTop: 12, textAlign: "center", lineHeight: 1.6 }}>
                  Data Anda aman dan tidak akan dibagikan kepada pihak ketiga.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}