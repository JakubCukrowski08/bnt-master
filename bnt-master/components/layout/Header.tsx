"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
  { label: "Usługi", href: "/uslugi" },
  { label: "Realizacje", href: "/realizacje" },
  { label: "Referencje", href: "/referencje" },
  { label: "O nas", href: "/o-nas" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Pomocnik — ustawia stan menu (zostawiłem tę funkcję, by nie musieć zmieniać wszędzie wywołań w pliku)
  const setMenuOpen = (value: boolean) => {
    setIsMobileMenuOpen(value);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Zamknij menu po zmianie trasy
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);


  // Blokuj scroll body gdy menu otwarte
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);


  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out flex justify-center w-full px-2 sm:px-4 lg:px-8 pointer-events-none ${
          isScrolled ? "pt-2 lg:pt-3" : "pt-4 lg:pt-5"
        } ${isMobileMenuOpen ? "lg:flex hidden" : "flex"}`}
      >
        <div
          className={`w-full max-w-7xl mx-auto rounded-[24px] transition-all duration-300 ease-out border pointer-events-auto flex items-center justify-between px-4 sm:px-5 lg:px-8 py-3 lg:py-4 ${
            isScrolled
              ? "bg-brand-deepDark/90 backdrop-blur-md border-white/10 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)]"
              : "bg-brand-deepDark/80 backdrop-blur-md border-white/10 shadow-lg"
          }`}
        >
          <Link
            href="/"
            className="flex flex-col items-start flex-shrink-0 group"
          >
            <span className="font-heading font-bold text-white leading-none tracking-tight transition-all duration-300 ease-out text-[1.5rem] lg:text-[1.75rem]">
              BNT<span className="text-brand-primary">.</span>
            </span>
            <span className="font-mono tracking-[0.25em] text-white/60 uppercase group-hover:text-white transition-all duration-300 ease-out text-[8px] sm:text-[9px] lg:text-[10px] mt-1 whitespace-nowrap">
              Generalne Wykonawstwo
            </span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-10 ml-auto mr-8 xl:mr-12">
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(`${link.href}/`));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-[0.9375rem] font-medium transition-colors duration-200 ease-out group px-2 py-1 ${
                    isActive ? "text-white" : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute left-1/2 bottom-0 h-[2px] bg-brand-primary transition-all duration-300 ease-out -translate-x-1/2 ${
                      isActive
                        ? "w-[calc(100%-16px)]"
                        : "w-0 group-hover:w-[calc(100%-16px)]"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center space-x-6 flex-shrink-0">
            <a
              href="tel:+48000000000"
              className="hidden xl:flex items-center text-[0.9375rem] font-medium text-white/80 hover:text-white transition-colors group"
            >
              <Phone
                className="w-4 h-4 mr-2 text-white/60 group-hover:text-white transition-colors"
                aria-hidden="true"
                strokeWidth={2}
              />
              <span>+48 000 000 000</span>
            </a>
            <Button
              variant="secondary"
              size="md"
              href="/kontakt"
              className="shadow-sm px-8"
            >
              Kontakt
            </Button>
          </div>

          {/* Mobile: Kontakt + hamburger */}
          <div className="flex items-center lg:hidden ml-auto gap-3 flex-shrink-0">
            <Button
              variant="secondary"
              size="sm"
              href="/kontakt"
              className="shadow-sm"
            >
              Kontakt
            </Button>
            <button
              type="button"
              className="flex items-center justify-center w-10 h-10 text-white hover:text-brand-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm"
              onClick={() => setMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Zamknij menu" : "Otwórz menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" strokeWidth={1.5} />
              ) : (
                <Menu
                  className="w-6 h-6"
                  aria-hidden="true"
                  strokeWidth={1.5}
                />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <div
        className={`fixed inset-0 z-[60] flex flex-col lg:hidden transition-opacity duration-300 ease-out ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: "#0A0E14" }}
        aria-hidden={!isMobileMenuOpen}
      >
        {/* Top bar — logo + zamknij */}
        <div className="flex items-center justify-between px-4 sm:px-6 pt-4 pb-0 flex-shrink-0">
          <Link
            href="/"
            className="flex flex-col items-start group"
            onClick={() => setMenuOpen(false)}
          >
            <span className="font-heading font-bold text-white leading-none tracking-tight text-[1.5rem]">
              BNT<span className="text-brand-primary">.</span>
            </span>
            <span className="font-mono tracking-[0.25em] text-white/60 uppercase text-[8px] mt-1 whitespace-nowrap">
              Generalne Wykonawstwo
            </span>
          </Link>
          <button
            type="button"
            className="flex items-center justify-center w-10 h-10 text-white hover:text-brand-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm"
            onClick={() => setMenuOpen(false)}
            aria-label="Zamknij menu"
          >
            <X className="w-6 h-6" aria-hidden="true" strokeWidth={1.5} />
          </button>
        </div>

        {/* Nawigacja — lista linków */}
        <nav className="flex-1 px-4 sm:px-6 pt-10 overflow-y-auto">
          <ul role="list" className="list-none p-0 m-0">
            {NAV_LINKS.map((link, index) => (
              <li
                key={link.href}
                className="border-b border-white/10 last:border-b-0"
                style={{
                  opacity: isMobileMenuOpen ? 1 : 0,
                  transform: isMobileMenuOpen
                    ? "translateY(0)"
                    : "translateY(12px)",
                  transition: `opacity 300ms ease-out ${index * 70}ms, transform 300ms ease-out ${index * 70}ms`,
                }}
              >
                <Link
                  href={link.href}
                  className="flex items-center justify-between w-full py-6 group"
                  onClick={() => setMenuOpen(false)}
                >
                  <div className="flex items-center gap-4">
                    {/* Numer techniczny */}
                    <span
                      className="font-mono text-[14px] leading-none select-none flex-shrink-0"
                      style={{ color: "#8A94A6" }}
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {/* Nazwa linku */}
                    <span
                      className="font-semibold text-white leading-none tracking-tight group-hover:text-brand-primary transition-colors duration-200"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "32px",
                      }}
                    >
                      {link.label}
                    </span>
                  </div>
                  {/* Strzałka */}
                  <ArrowRight
                    className="w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                    style={{ color: "#8A94A6" }}
                    aria-hidden="true"
                    strokeWidth={1.5}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>


      </div>
    </>
  );
}
