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

const NAVY = "#254a76";          // ← background navbar (baru)
const NAVY_DEEP = "#0a1e30";     // ← hover text tombol (tetap gelap)
const TEAL = "#5fc9c2";
const CREAM = "#f5f0e8";
const MUTED = "#dbe4ee";         // abu terang, kontras di atas #254a76

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <nav
        className="sticky top-0 z-50 border-b"
        style={{ backgroundColor: NAVY, borderColor: "rgba(95,201,194,0.25)" }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 h-[68px] flex items-center justify-between">

          {/* ── Brand ── */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/logo.png"
              alt="Fona Mitra Konsultan"
              style={{ width: 38, height: 38, objectFit: "contain" }}
              className="flex-shrink-0"
            />
            <div className="flex flex-col gap-px">
              <span
                className="text-[1.1rem] leading-none tracking-wide"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, color: CREAM }}
              >
                Fona Consulting
              </span>
              <span
                className="text-[9px] tracking-[0.28em] uppercase font-light leading-none"
                style={{ color: TEAL }}
              >
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
                    className="relative px-[14px] py-2 text-[11.5px] tracking-[0.13em] uppercase transition-colors duration-200 group inline-block font-normal"
                    style={{ color: isActive ? TEAL : MUTED }}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-px transition-all duration-300 ease-out ${isActive ? "w-[55%]" : "w-0 group-hover:w-[55%]"}`}
                      style={{ backgroundColor: TEAL }}
                    />
                  </Link>
                </li>
              );
            })}

            <div className="w-px h-4 mx-2.5" style={{ backgroundColor: "rgba(255,255,255,0.2)" }} />

            <li>
              <Link
                href="/contact"
                className="px-5 py-2 text-[11px] tracking-[0.12em] uppercase font-normal inline-block transition-all duration-200 hover:bg-[#5fc9c2] hover:-translate-y-px"
                style={{ border: `1px solid ${TEAL}`, color: TEAL }}
                onMouseEnter={(e) => (e.currentTarget.style.color = NAVY_DEEP)}
                onMouseLeave={(e) => (e.currentTarget.style.color = TEAL)}
              >
                Contact Us
              </Link>
            </li>
          </ul>

          {/* ── Hamburger ── */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            className="md:hidden flex flex-col gap-[5px] p-1 z-60"
          >
            <span className={`block w-6 h-[1.5px] transition-all duration-300 origin-center ${isOpen ? "translate-y-[6.5px] rotate-45" : ""}`} style={{ backgroundColor: TEAL }} />
            <span className={`block w-6 h-[1.5px] transition-all duration-300 ${isOpen ? "opacity-0 scale-x-0" : ""}`} style={{ backgroundColor: TEAL }} />
            <span className={`block w-6 h-[1.5px] transition-all duration-300 origin-center ${isOpen ? "-translate-y-[6.5px] -rotate-45" : ""}`} style={{ backgroundColor: TEAL }} />
          </button>
        </div>
      </nav>

      {/* ── Overlay ── */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* ── Mobile Menu ── */}
      <div
        className={`fixed top-[68px] left-0 right-0 z-50 md:hidden border-b transition-all duration-300 ease-in-out ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}
        style={{ backgroundColor: NAVY, borderColor: "rgba(95,201,194,0.25)" }}
      >
        <ul>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href} className="border-b border-white/[0.08]">
                <Link
                  href={link.href}
                  className={`block px-6 py-4 text-[11px] tracking-[0.15em] uppercase font-normal transition-all duration-200 ${isActive ? "pl-8" : "hover:pl-8"}`}
                  style={{
                    color: isActive ? TEAL : MUTED,
                    backgroundColor: isActive ? "rgba(95,201,194,0.08)" : "transparent",
                  }}
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
            className="block text-center py-3 px-5 text-[11px] tracking-[0.12em] uppercase font-normal transition-all duration-200 hover:bg-[#5fc9c2]"
            style={{ border: `1px solid ${TEAL}`, color: TEAL }}
            onMouseEnter={(e) => (e.currentTarget.style.color = NAVY_DEEP)}
            onMouseLeave={(e) => (e.currentTarget.style.color = TEAL)}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </>
  );
}