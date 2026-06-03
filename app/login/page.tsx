"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result?.error) {
        setError("Email atau password tidak valid.");
      } else {
        router.push("/admin/dashboard"); // ganti dengan halaman dashboard admin
      }
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Inter:wght@300;400;500;600&display=swap');

        /* Hanya style untuk komponen ini – tidak mengganggu navbar global */
        .login-section {
          background: #0f1623; /* gelap seperti header portfolio */
          padding: 64px 0;
          min-height: calc(100vh - 80px);
        }

        /* Container identik dengan portfolio: max-w-7xl, mx-auto, px-10 */
        .login-container {
          max-width: 80rem;
          margin: 0 auto;
          padding: 0 40px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        /* Eyebrow */
        .eyebrow {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 10px;
        }
        .eyebrow-line {
          width: 28px;
          height: 1px;
          background: #d4b06a;
        }
        .eyebrow-text {
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          font-weight: 500;
          color: #d4b06a;
        }

        /* Brand block */
        .brand-block {
          text-align: left;
          margin-bottom: 32px;
          animation: fadeUp 0.7s ease both;
        }
        .brand-emblem {
          width: 44px;
          height: 44px;
          border: 1px solid rgba(212, 176, 106, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          margin-bottom: 18px;
          background: rgba(212, 176, 106, 0.07);
        }
        .brand-title {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: 32px;
          color: #f5f0e8;
          line-height: 1.2;
          margin-bottom: 10px;
        }
        .brand-sub {
          color: #9ca3af;
          font-size: 13.5px;
          font-weight: 300;
          line-height: 1.7;
          max-width: 340px;
        }

        /* Feature list */
        .feature-list {
          margin-top: 36px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }
        .feature-dot {
          width: 6px;
          height: 6px;
          background: #d4b06a;
          flex-shrink: 0;
          margin-top: 6px;
        }
        .feature-item-title {
          color: #d4b06a;
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 600;
          margin-bottom: 4px;
        }
        .feature-item-text {
          font-size: 12.5px;
          color: #9ca3af;
          font-weight: 300;
          line-height: 1.6;
        }

        /* Stats strip – gelap */
        .stats-strip {
          margin-top: 40px;
          border-top: 1px solid rgba(212, 176, 106, 0.2);
          border-bottom: 1px solid rgba(212, 176, 106, 0.2);
          padding: 12px 0;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
        }
        .stat-cell {
          text-align: center;
          border-right: 1px solid rgba(212, 176, 106, 0.12);
        }
        .stat-cell:last-child {
          border-right: none;
        }
        .stat-value {
          font-family: 'Playfair Display', serif;
          font-weight: 600;
          font-size: 30px;
          color: #f5f0e8;
          line-height: 1;
          margin-bottom: 6px;
        }
        .stat-label {
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #6b7280;
        }

        /* KARTU FORM – GELAP */
        .form-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(212, 176, 106, 0.2);
          backdrop-filter: blur(2px);
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
          overflow: hidden;
        }
        .form-card:hover {
          border-color: rgba(212, 176, 106, 0.6);
          box-shadow: 0 8px 32px rgba(212, 176, 106, 0.1);
          transform: translateY(-3px);
        }
        .form-panel {
          padding: 32px 28px;
        }

        /* Label – emas redup */
        .field-label {
          display: block;
          color: #d4b06a;
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-weight: 600;
          margin-bottom: 8px;
        }

        /* Input gelap */
        .input-wrap {
          position: relative;
        }
        .input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 14px;
          pointer-events: none;
          opacity: 0.6;
        }
        .login-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(212, 176, 106, 0.25);
          padding: 11px 14px 11px 40px;
          font-size: 13.5px;
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          color: #f5f0e8;
          outline: none;
          transition: all 0.2s;
        }
        .login-input:focus {
          border-color: #d4b06a;
          background: rgba(212, 176, 106, 0.05);
          box-shadow: 0 0 0 3px rgba(212, 176, 106, 0.1);
        }
        .login-input::placeholder {
          color: #6b7280;
          font-weight: 300;
        }

        /* Toggle password & forgot link – gelap */
        .toggle-pw {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #9ca3af;
          font-size: 11px;
          letter-spacing: 0.05em;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          transition: color 0.2s;
        }
        .toggle-pw:hover {
          color: #d4b06a;
        }
        .forgot-link {
          background: none;
          border: none;
          cursor: pointer;
          color: #9ca3af;
          font-size: 10px;
          font-family: 'Inter', sans-serif;
          letter-spacing: 0.04em;
          transition: color 0.2s;
        }
        .forgot-link:hover {
          color: #d4b06a;
        }

        /* Tombol tetap emas */
        .btn-submit {
          width: 100%;
          background: #d4b06a;
          color: #0f1623;
          padding: 13px 28px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: background 0.2s, transform 0.15s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-family: 'Inter', sans-serif;
        }
        .btn-submit:hover:not(:disabled) {
          background: #e2c47f;
          transform: translateY(-2px);
        }
        .btn-submit:active:not(:disabled) {
          transform: translateY(0);
        }
        .btn-submit:disabled {
          opacity: 0.75;
          cursor: not-allowed;
        }

        .spinner {
          width: 13px;
          height: 13px;
          border: 2px solid rgba(15, 22, 35, 0.25);
          border-top-color: #0f1623;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          flex-shrink: 0;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* Error box – gelap dengan aksen merah */
        .error-box {
          background: rgba(239, 68, 68, 0.1);
          border-left: 3px solid #ef4444;
          padding: 12px 14px;
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 12.5px;
          color: #fca5a5;
          font-weight: 400;
          line-height: 1.5;
          margin-bottom: 24px;
        }

        .footer-note {
          margin-top: 24px;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .footer-line {
          flex: 1;
          height: 1px;
          background: rgba(212, 176, 106, 0.2);
        }
        .footer-text {
          color: #6b7280;
          font-size: 10px;
          font-weight: 300;
          letter-spacing: 0.05em;
          text-align: center;
        }

        /* Responsif */
        @media (max-width: 1024px) {
          .login-container {
            grid-template-columns: 1fr;
            gap: 48px;
            padding: 0 24px;
          }
          .feature-list {
            display: none;
          }
        }
        @media (max-width: 768px) {
          .login-section {
            padding: 48px 0;
          }
          .brand-title {
            font-size: 26px;
          }
          .form-panel {
            padding: 24px 20px;
          }
          .login-container {
            padding: 0 20px;
          }
          .stat-value {
            font-size: 24px;
          }
        }
      `}</style>

      <section className="login-section">
        <div className="login-container">
          {/* Kiri: brand, feature, stats */}
          <div className="login-left">
            <div className="brand-block">
              <div className="brand-emblem">🏛️</div>
              <div className="eyebrow">
                <div className="eyebrow-line" />
                <span className="eyebrow-text">CV Fona Mitra Konsultan</span>
              </div>
              <h1 className="brand-title">Admin Panel</h1>
              <p className="brand-sub">
                Masuk untuk mengelola portofolio, layanan, dan konten website.
              </p>
            </div>

            <div className="feature-list">
              <div className="feature-item">
                <div className="feature-dot" />
                <div>
                  <div className="feature-item-title">PORTOFOLIO</div>
                  <div className="feature-item-text">Tambah, edit, hapus proyek & layanan.</div>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-dot" />
                <div>
                  <div className="feature-item-title">KEUANGAN & LEGALITAS</div>
                  <div className="feature-item-text">Kelola dokumen, status proyek, dan klien.</div>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-dot" />
                <div>
                  <div className="feature-item-title">KONTEN WEBSITE</div>
                  <div className="feature-item-text">Update teks, testimoni, dan kontak.</div>
                </div>
              </div>
            </div>

            <div className="stats-strip">
              <div className="stats-grid">
                <div className="stat-cell">
                  <div className="stat-value">8+</div>
                  <div className="stat-label">PROYEK</div>
                </div>
                <div className="stat-cell">
                  <div className="stat-value">100%</div>
                  <div className="stat-label">TERVERIFIKASI</div>
                </div>
                <div className="stat-cell">
                  <div className="stat-value">SSL</div>
                  <div className="stat-label">AMAN</div>
                </div>
              </div>
            </div>
          </div>

          {/* Kanan: form login gelap */}
          <div className="login-right">
            <div className="form-card">
              <div className="form-panel">
                <div className="eyebrow" style={{ marginBottom: 20 }}>
                  <div className="eyebrow-line" />
                  <span className="eyebrow-text">Masuk</span>
                </div>

                {error && (
                  <div className="error-box">
                    <span>⚠️</span>
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  <div style={{ marginBottom: 20 }}>
                    <label htmlFor="email" className="field-label">
                      Email
                    </label>
                    <div className="input-wrap">
                      <span className="input-icon">✉️</span>
                      <input
                        id="email"
                        className="login-input"
                        type="email"
                        placeholder="admin@fonamitra.id"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: 28 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 8,
                      }}
                    >
                      <label htmlFor="password" className="field-label" style={{ marginBottom: 0 }}>
                        Password
                      </label>
                      <button type="button" className="forgot-link">
                        Lupa password?
                      </button>
                    </div>
                    <div className="input-wrap">
                      <span className="input-icon">🔒</span>
                      <input
                        id="password"
                        className="login-input"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                        style={{ paddingRight: 80 }}
                      />
                      <button
                        type="button"
                        className="toggle-pw"
                        onClick={() => setShowPassword((v) => !v)}
                        tabIndex={-1}
                      >
                        {showPassword ? "Sembunyikan" : "Tampilkan"}
                      </button>
                    </div>
                  </div>

                  <button className="btn-submit" type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <div className="spinner" />
                        <span>Memverifikasi...</span>
                      </>
                    ) : (
                      <span>Masuk ke Dashboard</span>
                    )}
                  </button>
                </form>
              </div>
            </div>

            <div className="footer-note">
              <div className="footer-line" />
              <p className="footer-text">
                Akses terbatas · Administrator · &copy; {new Date().getFullYear()}
              </p>
              <div className="footer-line" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}