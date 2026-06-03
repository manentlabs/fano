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
    value: "Indonesia",
    sub: "Layanan tersedia online & tatap muka",
  },
  {
    icon: "📞",
    label: "Telepon / WhatsApp",
    value: "+62 xxx-xxxx-xxxx",
    sub: "Senin – Jumat, 08.00 – 17.00 WIB",
  },
  {
    icon: "✉️",
    label: "Email",
    value: "info@fonakonsultan.id",
    sub: "Respon dalam 1×24 jam kerja",
  },
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

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .contact-header {
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

        /* Layout grid */
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 40px;
          align-items: start;
        }

        /* Info cards */
        .info-card {
          display: flex; align-items: flex-start; gap: 16px;
          padding: 18px 20px;
          background: #fff;
          border: 1px solid rgba(139,111,46,0.1);
          margin-bottom: 10px;
          transition: border-color 0.2s;
        }
        .info-card:hover { border-color: rgba(212,176,106,0.4); }
        .info-icon {
          width: 38px; height: 38px; flex-shrink: 0;
          border: 1px solid rgba(212,176,106,0.35);
          display: flex; align-items: center; justify-content: center;
          font-size: 16px;
        }

        /* Free services box */
        .free-box {
          background: #0f1623;
          border: 1px solid rgba(212,176,106,0.15);
          padding: 24px;
          margin-top: 10px;
        }
        .free-item {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 8px 0;
          border-bottom: 1px solid rgba(212,176,106,0.08);
          font-size: 12.5px; color: #9ca3af; font-weight: 300; line-height: 1.5;
        }
        .free-item:last-child { border-bottom: none; padding-bottom: 0; }
        .free-check { color: #d4b06a; font-size: 11px; flex-shrink: 0; margin-top: 2px; }

        /* Form */
        .form-card {
          background: #fff;
          border: 1px solid rgba(139,111,46,0.12);
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
          text-transform: uppercase; color: #6b7280; font-weight: 500;
        }
        .form-input {
          padding: 11px 14px;
          font-size: 13.5px; font-weight: 300;
          border: 1px solid rgba(139,111,46,0.18);
          background: #fdfcf9;
          color: #0f1623;
          outline: none;
          transition: border-color 0.2s;
          font-family: 'Inter', sans-serif;
          width: 100%;
        }
        .form-input:focus { border-color: #d4b06a; }
        .form-input::placeholder { color: #9ca3af; }
        select.form-input { cursor: pointer; appearance: none; }
        textarea.form-input { resize: vertical; min-height: 120px; }

        /* Submit */
        .btn-submit {
          width: 100%;
          background: #0f1623; color: #d4b06a;
          padding: 14px 28px; font-size: 12px; font-weight: 500;
          letter-spacing: 0.12em; text-transform: uppercase;
          border: 1px solid rgba(212,176,106,0.3); cursor: pointer;
          transition: all 0.2s; font-family: 'Inter', sans-serif;
        }
        .btn-submit:hover:not(:disabled) {
          background: #d4b06a; color: #0f1623;
          border-color: #d4b06a;
        }
        .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }

        /* Status messages */
        .alert {
          padding: 14px 16px; font-size: 13px; font-weight: 300;
          margin-bottom: 20px; line-height: 1.5;
          border-left: 3px solid;
        }
        .alert-success {
          background: rgba(16,120,80,0.06);
          border-color: #10784f; color: #10784f;
        }
        .alert-error {
          background: rgba(180,30,30,0.06);
          border-color: #b41e1e; color: #b41e1e;
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

      {/* ── Header ── */}
      <section className="contact-header">
        <div className="max-w-7xl mx-auto px-10">
          <div className="eyebrow" style={{ animation: "fadeUp 0.7s ease both" }}>
            <div className="eyebrow-line" style={{ background: "#d4b06a" }} />
            <span className="eyebrow-text" style={{ color: "#d4b06a" }}>Hubungi Kami</span>
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
              color: "#9ca3af", fontSize: 15, fontWeight: 300,
              lineHeight: 1.75, maxWidth: 520,
              animation: "fadeUp 0.7s 0.2s ease both",
            }}
          >
            Ceritakan kebutuhan koperasi Anda dan kami akan segera merespons
            dengan solusi yang tepat. Konsultasi awal gratis hingga 2 jam.
          </p>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="contact-section" style={{ background: "#f5f0e8", padding: "64px 0" }}>
        <div className="max-w-7xl mx-auto px-10">
          <div className="contact-grid">

            {/* ── Left: Info ── */}
            <div>
              <div className="eyebrow" style={{ marginBottom: 20 }}>
                <div className="eyebrow-line" style={{ background: "#8b6f2e" }} />
                <span className="eyebrow-text" style={{ color: "#8b6f2e" }}>Informasi Kontak</span>
              </div>

              {contactInfo.map((info, i) => (
                <div key={i} className="info-card">
                  <div className="info-icon">{info.icon}</div>
                  <div>
                    <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9ca3af", fontWeight: 500, marginBottom: 3 }}>
                      {info.label}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: "#0f1623", marginBottom: 2 }}>
                      {info.value}
                    </div>
                    <div style={{ fontSize: 12, color: "#9ca3af", fontWeight: 300 }}>
                      {info.sub}
                    </div>
                  </div>
                </div>
              ))}

              {/* Free services */}
              <div className="free-box">
                <div style={{ color: "#d4b06a", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500, marginBottom: 12 }}>
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
                  <div className="eyebrow-line" style={{ background: "#8b6f2e" }} />
                  <span className="eyebrow-text" style={{ color: "#8b6f2e" }}>Formulir Kontak</span>
                </div>
                <p style={{ fontSize: 13, color: "#6b7280", fontWeight: 300, lineHeight: 1.6, marginTop: 6 }}>
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

                <p style={{ fontSize: 11, color: "#9ca3af", fontWeight: 300, marginTop: 12, textAlign: "center", lineHeight: 1.6 }}>
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