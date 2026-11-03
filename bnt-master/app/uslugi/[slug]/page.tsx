import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/data/services";
import { fixOrphans } from "@/lib/typography";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TechTag } from "@/components/ui/TechTag";
import { TechCorners } from "@/components/ui/TechCorners";

export function generateStaticParams() {
  return services.map((s) => ({
    slug: s.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return {};
  
  return {
    title: `${service.title} | BNT Budownictwo`,
    description: service.shortDesc,
  };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);
  
  if (!service) {
    notFound();
  }

  // FAQ Schema JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Czym jest ${service.title}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: service.shortDesc,
        },
      },
    ],
  };

  const isNewTemplate = !!service.introSection;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-brand-surface relative z-10 overflow-hidden">
        
        {/* WSPÓLNY HERO */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-brand-deepDark w-full border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col justify-end min-h-[300px]">
            <Reveal>
              <div className="flex items-center text-small-mobile font-mono text-white/50 mb-6 uppercase tracking-widest">
                <Link href="/" className="hover:text-white transition-colors">Strona główna</Link>
                <span className="mx-2">/</span>
                <Link href="/uslugi" className="hover:text-white transition-colors">Usługi</Link>
                <span className="mx-2">/</span>
                <span className="text-slate-300">{service.title}</span>
              </div>
              <div className="font-mono text-small-mobile tracking-widest text-slate-300 mb-6 uppercase">Oferta</div>
              <h1 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] leading-[1.1] mb-8 max-w-4xl font-heading font-bold text-white text-balance">
                {fixOrphans(service.title)}
              </h1>
              <p className="text-[1.25rem] md:text-[1.5rem] text-white/70 max-w-3xl font-light leading-relaxed text-pretty">
                {fixOrphans(service.lead)}
              </p>
            </Reveal>
          </div>
        </section>

        {isNewTemplate ? (
          /* =========================================
             NOWY, ROZBUDOWANY SZABLON USŁUGI 
             ========================================= */
          <>
            {/* Sekcja 2: Wprowadzająca (jasne tło) */}
            <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div>
                  <SectionHeader
                    title={service.introSection!.heading}
                    align="left"
                    size="md"
                    className="mb-8"
                  />
                  <Reveal delay={0.2}>
                    <div className="space-y-6">
                      {service.introSection!.paragraphs.map((p, idx) => (
                        <p key={idx} className="text-[1.125rem] text-brand-muted leading-relaxed text-pretty">
                          {fixOrphans(p)}
                        </p>
                      ))}
                    </div>
                  </Reveal>
                </div>
                <Reveal delay={0.4} className="h-full">
                  <div className="relative w-full aspect-square lg:aspect-[4/5] bg-brand-border/30 rounded-xl overflow-hidden flex items-center justify-center">
                    {/* Placeholder image */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-200 to-slate-100" />
                    <span className="relative font-mono text-brand-muted/50 text-sm uppercase">[{service.introSection!.imagePlaceholder}]</span>
                  </div>
                </Reveal>
              </div>
            </section>

            {/* Sekcja 3: Karta-callout (jasnoszare tło) */}
            <section className="py-16 md:py-24 bg-slate-50 border-y border-brand-border/50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader
                  title={service.calloutSection!.heading}
                  size="md"
                  className="mb-12"
                />
                
                <Reveal delay={0.2} className="w-full flex justify-center">
                  <div className="relative bg-white p-8 md:p-12 border border-brand-border/60 shadow-sm w-full max-w-3xl text-left mx-auto">
                    <TechCorners />
                    <p className="text-[1.25rem] text-brand-text font-light leading-relaxed text-pretty mb-8">
                      {fixOrphans(service.calloutSection!.content)}
                    </p>
                    
                    <div className="pt-8 border-t border-brand-border/40 flex flex-wrap items-center gap-y-3">
                      {service.calloutSection!.tags.map((tag, idx) => (
                        <TechTag key={idx}>{tag}</TechTag>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>
            </section>

            {/* Sekcja 4: Grid ikon (jasne tło) */}
            <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeader
                title={service.gridSection!.heading}
                lead={service.gridSection!.content}
                size="lg"
                className="mb-16"
              />

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 w-full">
                {service.gridSection!.items.map((item, idx) => (
                  <Reveal key={idx} delay={0.1 * idx}>
                    <div className="group relative bg-white p-8 border border-brand-border/60 shadow-none transition-colors duration-300 h-full flex flex-col">
                      <TechCorners />
                      <div className="font-mono text-brand-muted group-hover:text-brand-primary transition-colors text-[1.25rem] mb-6">
                        {(idx + 1).toString().padStart(2, '0')}
                      </div>
                      <h3 className="text-[1.5rem] md:text-[1.75rem] text-brand-text flex items-start text-balance">
                        {item}
                      </h3>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* Sekcja 5: Ciemna (rytmiczny układ naprzemienny) */}
            <section className="py-16 md:py-24 bg-brand-deepDark w-full border-t border-white/10 relative overflow-hidden">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full bg-gradient-to-l from-brand-primary/10 to-transparent blur-3xl opacity-30 pointer-events-none" />
              
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                  <div className="order-2 lg:order-1">
                    <SectionHeader
                      title={service.darkSection!.heading}
                      lead={service.darkSection!.content}
                      align="left"
                      theme="dark"
                      size="md"
                    />
                  </div>
                  <Reveal delay={0.4} className="h-full order-1 lg:order-2">
                    <div className="relative w-full aspect-square lg:aspect-[4/3] bg-white/5 rounded-xl overflow-hidden flex items-center justify-center border border-white/10">
                      {/* Placeholder image */}
                      <span className="relative font-mono text-white/30 text-sm uppercase">[{service.darkSection!.imagePlaceholder}]</span>
                    </div>
                  </Reveal>
                </div>
              </div>
            </section>

            {/* Sekcja 6: CTA (spójne z resztą podstron) */}
            <section className="py-24 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
              <SectionHeader
                eyebrow="Współpraca"
                title="Porozmawiajmy o Twojej inwestycji"
                lead="Zapewnij swojej inwestycji fachowy nadzór od pierwszego dnia budowy. Umów się z nami na spotkanie, aby omówić szczegóły."
                size="xl"
                className="mb-12"
              />
              <Reveal delay={0.4} className="flex justify-center">
                <Button variant="primary" size="lg" href="/kontakt">
                  Umów bezpłatną konsultację
                </Button>
              </Reveal>
            </section>
          </>
        ) : (
          /* =========================================
             STARY SZABLON USŁUGI (FALLBACK)
             ========================================= */
          <>
            {/* Sekcja 1: Zakres / Obowiązki */}
            <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
              <SectionHeader
                title={service.sections?.first.title || "Zakres usług"}
                size="lg"
                className="mb-12"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-5xl w-full">
                {service.sections?.first.items.map((item, index) => (
                  <Reveal key={index} delay={index * 0.1}>
                    <div className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-brand-primary mt-2.5 mr-4 flex-shrink-0" />
                      <p className="text-[1.125rem] text-brand-muted leading-relaxed text-pretty">
                        {fixOrphans(item)}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* Sekcja 2: Dla kogo / Dlaczego warto */}
            <section className="py-16 md:py-24 bg-white border-y border-brand-border/50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader
                  title={service.sections?.second.title || "Szczegóły"}
                  lead={service.sections?.second.content || ""}
                  size="lg"
                />
              </div>
            </section>

            {/* Sekcja CTA */}
            <section className="py-24 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
              <SectionHeader
                eyebrow="Konsultacja"
                title="Gotowy na współpracę?"
                lead="Porozmawiajmy o Twojej inwestycji i dopasujmy najlepsze rozwiązania techniczne i organizacyjne."
                size="xl"
                className="mb-12"
              />
              <Reveal delay={0.4} className="flex justify-center">
                <Button variant="primary" size="lg" href="/kontakt">
                  Umów bezpłatną konsultację
                </Button>
              </Reveal>
            </section>
          </>
        )}

      </main>
    </>
  );
}
