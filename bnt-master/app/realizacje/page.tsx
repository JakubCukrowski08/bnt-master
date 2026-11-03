import React from "react";
import Link from "next/link";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { TechCorners } from "@/components/ui/TechCorners";
import { TechTag } from "@/components/ui/TechTag";
import { ImageWithSkeleton } from "@/components/ui/ImageWithSkeleton";
import { fixOrphans } from "@/lib/typography";
import { realizacje } from "@/lib/data/realizacje";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Realizacje | BNT Budownictwo",
  description: "Poznaj dorobek firmy BNT Budownictwo. Zobacz nasze realizacje w zakresie budownictwa mieszkaniowego i przemysłowego.",
};

export default function RealizacjePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero */}
      <section className="pt-32 pb-24 md:pt-48 md:pb-32 lg:pt-56 lg:pb-48 bg-brand-deepDark w-full relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-brand-primary/5 to-transparent blur-3xl opacity-50 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <Reveal>
            <div className="font-mono text-small-mobile tracking-widest text-brand-muted uppercase mb-8">
              <Link href="/" className="hover:text-white transition-colors">Strona główna</Link>
              <span className="mx-3 opacity-50">/</span>
              <span className="text-white">Realizacje</span>
            </div>
          </Reveal>

          <SectionHeader
            title="Nasze Realizacje"
            lead="Przestrzenie, które zbudowaliśmy z myślą o ludziach i ich potrzebach. Zobacz nasze najważniejsze projekty deweloperskie i inwestycje budowlane."
            theme="dark"
            align="left"
            size="xl"
          />
        </div>
      </section>

      {/* 2. Grid Realizacji */}
      <section className="py-24 md:py-32 lg:py-48 w-full bg-brand-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16 lg:mb-24">
            {realizacje.map((project, idx) => (
              <Reveal key={project.id} delay={0.1 * (idx + 1)}>
                <Link href={`/realizacje/${project.slug}`} className="group block relative border border-brand-border/40 p-6 lg:p-8 shadow-none bg-white">
                  <TechCorners />
                  <ImageWithSkeleton
                    src={project.mainImg}
                    alt={project.title}
                    wrapperClassName="aspect-[16/9] bg-zinc-200 mb-6 relative"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ease-out"
                  />
                  
                  <div className="mb-4">
                    <TechTag className="inline-flex">{project.type} {"//"} {project.year}</TechTag>
                  </div>
                  
                  <h3 className="mb-3 text-[1.5rem] md:text-[1.75rem] group-hover:text-brand-primary transition-colors text-balance font-heading font-semibold text-brand-text leading-tight">{fixOrphans(project.title)}</h3>
                  <p className="text-brand-muted text-pretty text-[1rem] leading-relaxed">{fixOrphans(project.shortDesc)}</p>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="flex flex-col items-center justify-center border-t border-brand-border/40 pt-16">
              <h3 className="text-[2rem] md:text-[2.5rem] font-heading font-bold text-brand-text mb-6">Planujesz nową inwestycję?</h3>
              <Button variant="primary" size="lg" href="/kontakt">Porozmawiajmy o współpracy</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
