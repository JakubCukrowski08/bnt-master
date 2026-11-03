"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fixOrphans } from "@/lib/typography";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ProcessStep {
  num: string;
  title: string;
  desc: string;
}

interface ProcessTimelineProps {
  steps: ProcessStep[];
}

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileLineRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isReducedMotion) {
      gsap.set(lineRef.current, { scaleX: 1 });
      gsap.set(dotRefs.current, { backgroundColor: "#1E3A5F", borderColor: "#1E3A5F", color: "#ffffff" });
      gsap.set(textRefs.current, { opacity: 1 });
      gsap.set(mobileLineRefs.current, { scaleY: 1 });
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center+=20%",
        end: "bottom center",
        scrub: true,
      },
    });

    // 1. Pozioma linia (desktop) - od lewej do prawej
    tl.to(lineRef.current, { scaleX: 1, ease: "none", duration: 1 }, 0);

    // 2. Kropki i tekst oraz pionowe linie (mobile)
    steps.forEach((_, i) => {
      // Progress w skali 0-1 wzdłuż osi czasu (każdy krok to ułamek całkowitego czasu)
      const progress = i / (steps.length - 1 || 1);
      
      // Punkt aktywacji - natychmiastowa zmiana koloru kropki
      tl.to(
        dotRefs.current[i],
        {
          backgroundColor: "#1E3A5F",
          borderColor: "#1E3A5F",
          color: "#ffffff",
          duration: 0.05,
        },
        progress
      );

      // Fade in tekstu (wchodzenie od 0.3 do 1.0 opacity)
      tl.fromTo(
        textRefs.current[i],
        { opacity: 0.4 },
        { opacity: 1, duration: 0.15 },
        progress
      );

      // Pionowa linia do następnego punktu (na mobile) - wypełnia się między progresem i następnym progresem
      if (i < steps.length - 1 && mobileLineRefs.current[i]) {
        const nextProgress = (i + 1) / (steps.length - 1);
        const segmentDuration = nextProgress - progress;
        tl.fromTo(
          mobileLineRefs.current[i],
          { scaleY: 0 },
          { scaleY: 1, ease: "none", duration: segmentDuration },
          progress
        );
      }
    });

    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, [steps]);

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Pozioma linia przerywana (Tło) - tylko Desktop */}
      <div className="hidden lg:block absolute top-[15px] left-10 right-10 h-[2px] border-b-[2px] border-dashed border-brand-border" />
      
      {/* Pozioma linia wypełniająca (Postęp) - tylko Desktop */}
      <div 
        ref={lineRef}
        className="hidden lg:block absolute top-[15px] left-10 right-10 h-[2px] bg-brand-primary origin-left scale-x-0 z-0" 
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
        {steps.map((step, idx) => (
          <div key={idx} className="relative pl-12 lg:pl-0">
            
            {/* Pionowa linia przerywana (Tło) - tylko Mobile */}
            {idx < steps.length - 1 && (
              <div className="block lg:hidden absolute left-[15px] top-8 bottom-[-2rem] w-[2px] border-l-[2px] border-dashed border-brand-border" />
            )}
            
            {/* Pionowa linia wypełniająca (Postęp) - tylko Mobile */}
            {idx < steps.length - 1 && (
              <div 
                ref={(el) => { mobileLineRefs.current[idx] = el; }}
                className="block lg:hidden absolute left-[15px] top-8 bottom-[-2rem] w-[2px] bg-brand-primary origin-top scale-y-0" 
              />
            )}

            <div className="flex lg:flex-col gap-4 lg:gap-6 items-start">
              {/* Kropka / Numer */}
              <div 
                ref={(el) => { dotRefs.current[idx] = el; }}
                className="absolute left-0 lg:static flex-shrink-0 w-8 h-8 rounded-full bg-brand-surface border-[2px] border-brand-border text-brand-muted flex items-center justify-center font-mono text-[11px] font-bold transition-colors z-10"
              >
                {step.num}
              </div>

              {/* Tekst (Tytuł i Opis) */}
              <div ref={(el) => { textRefs.current[idx] = el; }} className="opacity-40 lg:pt-2">
                <h4 className="mb-2 text-[1.125rem] lg:text-[1.25rem] leading-tight text-balance text-brand-text font-heading font-semibold">
                  {fixOrphans(step.title)}
                </h4>
                <p className="text-[0.9375rem] lg:text-[1rem] text-brand-muted text-pretty">
                  {fixOrphans(step.desc)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
