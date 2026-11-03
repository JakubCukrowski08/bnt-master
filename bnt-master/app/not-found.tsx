import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import FuzzyText from "@/components/ui/FuzzyText";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-brand-deepDark relative z-10 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Subtelne tło - ciemna przestrzeń z ledwo widocznym detalem */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-primary/5 rounded-full blur-[120px] opacity-30" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        
        {/* Komponent FuzzyText */}
        <FuzzyText
          fontSize="clamp(4rem, 20vw, 14rem)"
          fontWeight={700}
          fontFamily="inherit"
          color="#ffffff"
          baseIntensity={0.12}
          hoverIntensity={0.45}
          direction="horizontal"
          transitionDuration={8}
          enableHover={true}
          className="mb-8 font-heading"
        >
          404
        </FuzzyText>

        {/* Tekst pod błędem */}
        <div className="font-mono text-small-mobile tracking-widest text-slate-300 mb-6 uppercase">
          Błąd 404
        </div>
        <p className="text-[1.25rem] md:text-[1.5rem] text-slate-300 max-w-2xl font-light leading-relaxed mb-12">
          Strona, której szukasz, nie istnieje lub została przeniesiona.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Button variant="primary" size="lg" href="/">
            Wróć na stronę główną
          </Button>
          <Link 
            href="/uslugi" 
            className="group flex items-center text-[1.125rem] text-slate-300 hover:text-white transition-colors duration-300 font-medium"
          >
            Zobacz nasze usługi 
            <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

      </div>
    </main>
  );
}
