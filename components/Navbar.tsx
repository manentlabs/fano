"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portofolio", label: "Portfolio" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Tutup menu saat route berubah
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Cegah scroll saat menu mobile terbuka
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[#0f1623] border-b border-[#d4b06a]/20">
        <div className="max-w-7xl mx-auto px-5 md:px-10 h-[68px] flex items-center justify-between">

          {/* ── Brand ── */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-[34px] h-[34px] border border-[#d4b06a] rotate-45 flex items-center justify-center flex-shrink-0 transition-colors duration-200 group-hover:bg-[#d4b06a]/8">
              <span className="block w-[9px] h-[9px] bg-[#d4b06a]" />
            </div>
            <div className="flex flex-col gap-px">
              <span
                className="text-[#f5f0e8] text-[1.1rem] leading-none tracking-wide"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
              >
                Fona Consulting
              </span>
              <span className="text-[#d4b06a] text-[9px] tracking-[0.28em] uppercase font-light leading-none">
                Strategic Advisory
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <ul className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`
                      relative px-[14px] py-2 text-[11.5px] tracking-[0.13em] uppercase
                      transition-colors duration-200 group inline-block font-normal
                      ${isActive ? "text-[#d4b06a]" : "text-[#9ca3af] hover:text-[#f5f0e8]"}
                    `}
                  >
                    {link.label}
                    <span
                      className={`
                        absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-[#d4b06a]
                        transition-all duration-300 ease-out
                        ${isActive ? "w-[55%]" : "w-0 group-hover:w-[55%]"}
                      `}
                    />
                  </Link>
                </li>
              );
            })}

            <div className="w-px h-4 bg-white/10 mx-2.5" />

            <li>
              <Link
                href="/contact"
                className="
                  px-5 py-2 text-[11px] tracking-[0.12em] uppercase font-normal
                  border border-[#d4b06a] text-[#d4b06a] inline-block
                  transition-all duration-200
                  hover:bg-[#d4b06a] hover:text-[#0f1623] hover:-translate-y-px
                "
              >
                Contact Us
              </Link>
            </li>
          </ul>

          {/* ── Hamburger Button ── */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            className="md:hidden flex flex-col gap-[5px] p-1 z-60"
          >
            <span
              className={`block w-6 h-[1.5px] bg-[#d4b06a] transition-all duration-300 origin-center
                ${isOpen ? "translate-y-[6.5px] rotate-45" : ""}`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-[#d4b06a] transition-all duration-300
                ${isOpen ? "opacity-0 scale-x-0" : ""}`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-[#d4b06a] transition-all duration-300 origin-center
                ${isOpen ? "-translate-y-[6.5px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      {/* ── Overlay ── */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* ── Mobile Menu ── */}
      <div
        className={`fixed top-[68px] left-0 right-0 z-50 bg-[#0f1623]
          border-b border-[#d4b06a]/20 md:hidden
          transition-all duration-300 ease-in-out
          ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}
      >
        <ul>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href} className="border-b border-white/[0.04]">
                <Link
                  href={link.href}
                  className={`
                    block px-6 py-4 text-[11px] tracking-[0.15em] uppercase font-normal
                    transition-all duration-200
                    ${isActive
                      ? "text-[#d4b06a] bg-[#d4b06a]/[0.04] pl-8"
                      : "text-[#9ca3af] hover:text-[#d4b06a] hover:bg-[#d4b06a]/[0.04] hover:pl-8"}
                  `}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="px-6 py-5">
          <Link
            href="/contact"
            className="
              block text-center py-3 px-5
              text-[11px] tracking-[0.12em] uppercase font-normal
              border border-[#d4b06a] text-[#d4b06a]
              transition-all duration-200
              hover:bg-[#d4b06a] hover:text-[#0f1623]
            "
          >
            Contact Us
          </Link>
        </div>
      </div>
    </>
  );
}