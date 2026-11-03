import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { TechCorners } from "@/components/ui/TechCorners";
import { fixOrphans } from "@/lib/typography";
import { services } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Usługi Inżynieryjno-Budowlane | BNT Budownictwo",
  description: "Kompleksowa obsługa inwestycji budowlanych. Od analizy i wyceny, przez nadzór inwestorski, aż po kierowanie budową. Poznaj nasze usługi.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-brand-surface relative z-10">
      
      {/* Hero Sekcji */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-brand-deepDark w-full border-b border-white/10">
        
        {/* Subtelny akcent wizualny (cienkie linie tła) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-brand-primary/5 to-transparent blur-3xl opacity-50" />
          <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full border-[1px] border-white/5 opacity-20" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col justify-end min-h-[320px] md:min-h-[360px]">
          <Reveal>
            <div className="flex items-center text-small-mobile font-mono text-white/50 mb-6 uppercase tracking-widest">
              <Link href="/" className="hover:text-white transition-colors">Strona główna</Link>
              <span className="mx-2">/</span>
              <span className="text-slate-300">Usługi</span>
            </div>
            <div className="font-mono text-small-mobile tracking-widest text-slate-300 mb-6 uppercase">Oferta</div>
            <h1 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] leading-[1.1] mb-8 max-w-4xl font-heading font-bold text-white text-balance">
              {fixOrphans("Usługi Inżynieryjno-Budowlane")}
            </h1>
            <p className="text-[1.25rem] md:text-[1.5rem] text-white/70 max-w-3xl font-light leading-relaxed text-pretty">
              {fixOrphans("Świadczymy kompleksowe usługi zarządzania procesem budowlanym, reprezentując interesy Inwestora na każdym etapie. Nasze wsparcie to gwarancja terminowości, optymalizacji kosztów i bezkompromisowej jakości wykonania.")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Kontener dla siatki usług */}
      <div className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Grid 5 kart */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-8 items-stretch">
          {services.map((service, idx) => {
            // Pierwsze 3 karty - po 2 kolumny (3 w rzędzie na lg), ostatnie 2 karty - po 3 kolumny (2 w rzędzie na lg, wyśrodkowane)
            const colSpan = idx < 3 ? "lg:col-span-2" : "lg:col-span-3";
            return (
              <Reveal key={service.id} delay={0.1 * (idx + 1)} className={`h-full ${colSpan}`}>
                <div className="group relative bg-white p-8 border border-brand-border/60 shadow-none hover:bg-brand-surface/30 transition-colors duration-300 flex flex-col h-full">
                  <TechCorners />
                  <div className="font-mono text-brand-muted group-hover:text-brand-primary transition-colors text-[1.25rem] mb-6">{service.id}</div>
                  <h3 className="mb-4 text-[1.5rem] md:text-[1.75rem] min-h-[4.5rem] flex items-start text-balance">{fixOrphans(service.title)}</h3>
                  <p className="mb-8 text-brand-muted flex-grow text-pretty">{fixOrphans(service.shortDesc)}</p>
                  <Button variant="secondary" size="sm" href={`/uslugi/${service.slug}`} className="mt-auto w-fit">
                    Dowiedz się więcej <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Reveal>
            );
          })}
        </div>

      </div>
    </main>
  );
}
