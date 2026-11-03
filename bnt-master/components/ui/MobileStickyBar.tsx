"use client";

import React, { useState, useEffect } from "react";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { usePathname } from "next/navigation";

export function MobileStickyBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Nasłuchuj na zdarzenie emitowane przez Header gdy mobilne menu się otwiera/zamyka
  useEffect(() => {
    const handler = (e: Event) => {
      setIsMobileMenuOpen((e as CustomEvent<boolean>).detail);
    };
    window.addEventListener("mobilemenuchange", handler);
    return () => window.removeEventListener("mobilemenuchange", handler);
  }, []);

  useEffect(() => {
    const heroElement = document.getElementById("hero");

    if (heroElement) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(!entry.isIntersecting);
        },
        { root: null, threshold: 0 }
      );
      observer.observe(heroElement);
      return () => observer.disconnect();
    } else {
      const handleScroll = () => setIsVisible(window.scrollY > 100);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [pathname]);

  // Gdy mobilne menu jest otwarte — całkowicie ukryj pasek (nie tylko translate)
  if (isMobileMenuOpen) return null;

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-out transform ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div 
        className="rounded-t-[16px] border-t border-white/10 shadow-[0_-8px_32px_rgba(0,0,0,0.6)] p-4 flex flex-col"
        style={{ backgroundColor: "#0A0E14" }}
      >
        <a
          href="tel:+48000000000"
          className="flex items-center gap-2 text-white/80 active:text-white transition-colors mb-3"
        >
          <Phone className="w-5 h-5 text-brand-primary flex-shrink-0" aria-hidden="true" strokeWidth={1.5} />
          <span className="font-heading font-semibold text-[1.125rem]">
            +48 000 000 000
          </span>
        </a>
        
        <Button variant="primary" size="md" href="/kontakt" className="w-full">
          Bezpłatna wycena
        </Button>
      </div>
    </div>
  );
}
