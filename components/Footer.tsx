import Link from "next/link";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/about", label: "Tentang Kami" },
  { href: "/services", label: "Layanan" },
  { href: "/portofolio", label: "Portofolio" },
  { href: "/contact", label: "Kontak" },
];

const serviceLinks = [
  { label: "Pelatihan Anggota" },
  { label: "ART, Persus, SOP & SOM" },
  { label: "Laporan Keuangan" },
  { label: "Anggaran Dasar" },
  { label: "Konsultasi Koperasi" },
  { label: "Pendampingan Pembiayaan" },
];

const socials = [
  { href: "https://www.instagram.com/fona.mitrakonsultan/", icon: "ti-brand-instagram", label: "Instagram" },
  { href: "#", icon: "ti-brand-facebook", label: "Facebook" },
  { href: "#", icon: "ti-brand-youtube", label: "YouTube" },
  { href: "https://api.whatsapp.com/send/?phone=628981344316", icon: "ti-brand-whatsapp", label: "WhatsApp" },
];

const socialStyle = [
  "w-[34px]",
  "h-[34px]",
  "border",
  "border-[#2f8f8a]/20",
  "flex",
  "items-center",
  "justify-center",
  "text-[#6b7280]",
  "text-base",
  "hover:border-[#5fc9c2]",
  "hover:text-[#5fc9c2]",
  "transition-colors",
].join(" ");

export default function Footer() {
  return (
    <footer
      className="bg-[#0a1e30] text-[#9ca3af]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Top */}
      <div className="max-w-7xl mx-auto px-12 pt-14 pb-10 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-1">
            <img
              src="/logo2.png"
              alt="Fona Mitra Konsultan"
              style={{ width: 38, height: 38, objectFit: "contain" }}
              className="flex-shrink-0"
            />
            <div>
              <p
                className="text-[#f5f0e8] text-lg leading-tight tracking-wide"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
              >
                Fona Mitra Konsultan
              </p>
              <p className="text-[10px] tracking-[0.25em] uppercase font-light text-[#5fc9c2]">
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
          <p className="text-[11px] font-medium tracking-[0.18em] uppercase mb-4 text-[#5fc9c2]">
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
          <p className="text-[11px] font-medium tracking-[0.18em] uppercase mb-4 text-[#5fc9c2]">
            Layanan
          </p>
          <ul className="flex flex-col gap-2.5">
            {serviceLinks.map((l) => (
              <li
                key={l.label}
                className="text-[#6b7280] text-[13px] font-light"
              >
                {l.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Kontak */}
        <div>
          <p className="text-[11px] font-medium tracking-[0.18em] uppercase mb-4 text-[#5fc9c2]">
            Kontak
          </p>
          <ul className="flex flex-col gap-3 text-[13px] font-light text-[#6b7280]">
            <li className="flex items-start gap-2">
              <i className="ti ti-map-pin text-[14px] mt-0.5 flex-shrink-0" aria-hidden="true" />
              Jawa Barat, Indonesia
            </li>
            <li className="flex items-center gap-2">
              <i className="ti ti-brand-whatsapp text-[14px] flex-shrink-0" aria-hidden="true" />
              <a href="https://wa.me/628981344316" className="hover:text-[#f5f0e8] transition-colors">
                +62 8981344316
              </a>
            </li>
            <li className="flex items-center gap-2">
              <i className="ti ti-mail text-[14px] flex-shrink-0" aria-hidden="true" />
              <a href="mailto:info@fonamitra.id" className="hover:text-[#f5f0e8] transition-colors">
                admin@fona.site
              </a>
            </li>
            <li className="mt-1 text-[11px] text-[#4b5563] leading-relaxed">
              Konsultasi gratis tersedia<br />via WhatsApp &amp; tatap muka
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto h-px bg-[#2f8f8a]/10" />

      {/* Bottom */}
      <div className="max-w-7xl mx-auto px-12 py-5 flex items-center justify-between flex-wrap gap-3">
        <span className="text-[12px] font-light text-[#4b5563]">
          © 2026 CV Fona Mitra Konsultan. Hak cipta dilindungi.
        </span>
        <span className="text-[11px] font-light text-[#374151] tracking-wide">
          Tumbuh Bersama, Kuat Bersama
        </span>
        <Link
          href="/login"
          className="flex items-center gap-1.5 text-[11px] text-[#4b5563] border border-[#2f8f8a]/15 px-3.5 py-1.5 tracking-[0.08em] uppercase hover:text-[#5fc9c2] hover:border-[#5fc9c2]/40 transition-colors"
        >
          <i className="ti ti-lock text-[13px]" aria-hidden="true" />
          Admin
        </Link>
      </div>
    </footer>
  );
}