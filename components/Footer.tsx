import Link from "next/link";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/about", label: "Tentang Kami" },
  { href: "/services", label: "Layanan" },
  { href: "/portofolio", label: "Portofolio" },
  { href: "/contact", label: "Kontak" },
];

const serviceLinks = [
  { href: "/services#pelatihan", label: "Pelatihan Anggota" },
  { href: "/services#art", label: "ART, Persus, SOP & SOM" },
  { href: "/services#keuangan", label: "Laporan Keuangan" },
  { href: "/services#ad", label: "Anggaran Dasar" },
  { href: "/services#konsultasi", label: "Konsultasi Koperasi" },
  { href: "/services#pembiayaan", label: "Pendampingan Pembiayaan" },
];

const socials = [
  { href: "#", icon: "ti-brand-instagram", label: "Instagram" },
  { href: "#", icon: "ti-brand-facebook", label: "Facebook" },
  { href: "#", icon: "ti-brand-youtube", label: "YouTube" },
  { href: "#", icon: "ti-brand-whatsapp", label: "WhatsApp" },
];

const socialStyle = [
  "w-[34px]",
  "h-[34px]",
  "border",
  "border-[#d4b06a]/20",
  "flex",
  "items-center",
  "justify-center",
  "text-[#6b7280]",
  "text-base",
  "hover:border-[#d4b06a]",
  "hover:text-[#d4b06a]",
  "transition-colors",
].join(" ");

export default function Footer() {
  return (
    <footer
      className="bg-[#0f1623] text-[#9ca3af]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Top */}
      <div className="max-w-7xl mx-auto px-12 pt-14 pb-10 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-[34px] h-[34px] border border-[#d4b06a] rotate-45 flex items-center justify-center flex-shrink-0">
              <span className="block w-[9px] h-[9px] bg-[#d4b06a]" />
            </div>
            <div>
              <p
                className="text-[#f5f0e8] text-lg leading-tight tracking-wide"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
              >
                Fona Mitra Konsultan
              </p>
              <p className="text-[10px] tracking-[0.25em] uppercase font-light text-[#d4b06a]">
                Strategic Advisory
              </p>
            </div>
          </div>
          <p className="text-[#6b7280] text-[13px] font-light leading-7 mt-4 max-w-[280px]">
            Mitra konsultan koperasi terpercaya dan terdepan di Indonesia.
            Tumbuh Bersama, Kuat Bersama.
          </p>
          <div className="flex gap-2.5 mt-5">
            {socials.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} className={socialStyle}>
                <i className={`ti ${s.icon}`} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        {/* Navigasi */}
        <div>
          <p className="text-[11px] font-medium tracking-[0.18em] uppercase mb-4 text-[#d4b06a]">
            Navigasi
          </p>
          <ul className="flex flex-col gap-2.5">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-[#6b7280] text-[13px] font-light hover:text-[#f5f0e8] transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Layanan */}
        <div>
          <p className="text-[11px] font-medium tracking-[0.18em] uppercase mb-4 text-[#d4b06a]">
            Layanan
          </p>
          <ul className="flex flex-col gap-2.5">
            {serviceLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-[#6b7280] text-[13px] font-light hover:text-[#f5f0e8] transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kontak */}
        <div>
          <p className="text-[11px] font-medium tracking-[0.18em] uppercase mb-4 text-[#d4b06a]">
            Kontak
          </p>
          <ul className="flex flex-col gap-3 text-[13px] font-light text-[#6b7280]">
            <li className="flex items-start gap-2">
              <i className="ti ti-map-pin text-[14px] mt-0.5 flex-shrink-0" aria-hidden="true" />
              Jawa Barat, Indonesia
            </li>
            <li className="flex items-center gap-2">
              <i className="ti ti-brand-whatsapp text-[14px] flex-shrink-0" aria-hidden="true" />
              <a href="https://wa.me/628000000000" className="hover:text-[#f5f0e8] transition-colors">
                +62 800-0000-0000
              </a>
            </li>
            <li className="flex items-center gap-2">
              <i className="ti ti-mail text-[14px] flex-shrink-0" aria-hidden="true" />
              <a href="mailto:info@fonamitra.id" className="hover:text-[#f5f0e8] transition-colors">
                info@fonamitra.id
              </a>
            </li>
            <li className="mt-1 text-[11px] text-[#4b5563] leading-relaxed">
              Konsultasi gratis tersedia<br />via WhatsApp &amp; tatap muka
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto h-px bg-[#d4b06a]/10" />

      {/* Bottom */}
      <div className="max-w-7xl mx-auto px-12 py-5 flex items-center justify-between flex-wrap gap-3">
        <span className="text-[12px] font-light text-[#4b5563]">
          © 2026 CV Fona Mitra Konsultan. Hak cipta dilindungi.
        </span>
        <span className="text-[11px] font-light text-[#374151] tracking-wide">
          Tumbuh Bersama, Kuat Bersama
        </span>
        <Link
          href="/admin"
          className="flex items-center gap-1.5 text-[11px] text-[#4b5563] border border-[#d4b06a]/15 px-3.5 py-1.5 tracking-[0.08em] uppercase hover:text-[#d4b06a] hover:border-[#d4b06a]/40 transition-colors"
        >
          <i className="ti ti-lock text-[13px]" aria-hidden="true" />
          Admin
        </Link>
      </div>
    </footer>
  );
}