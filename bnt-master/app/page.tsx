import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { ProcessTimeline } from "@/components/ui/ProcessTimeline";
import { ImageWithSkeleton } from "@/components/ui/ImageWithSkeleton";
import { ArrowRight } from "lucide-react";
import ScrollExpand from "@/components/ui/ScrollExpand";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { fixOrphans } from "@/lib/typography";
import { TechCorners } from "@/components/ui/TechCorners";
import { TechTag } from "@/components/ui/TechTag";
import { services } from "@/lib/data/services";
import { realizacje } from "@/lib/data/realizacje";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero - ScrollExpand */}
      <section id="hero" className="relative w-full bg-brand-deepDark">
        <ScrollExpand
          style={{}}
          src="https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&q=80&w=2000" // TODO: Podmienić na nasze realne zdjęcie z budowy/biura (np. plac budowy z lotu ptaka)
          alt="Plac budowy - generalne wykonawstwo"
          title="Generalny Wykonawca i Nadzór Inwestorski"
          scrollHint="Przewiń, aby zobaczyć więcej"
          useWindowScroll={true}
          mediaZoom={1.3}
          overlayScrim={0.5}
        >
          <div className="flex flex-col items-center justify-center pt-8 md:pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 relative">
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
              <div className="font-mono text-small-mobile md:text-small-desktop tracking-[0.2em] text-slate-300 mb-4 md:mb-6 uppercase drop-shadow-sm">
                ZARZĄDZANIE INWESTYCJAMI // WROCŁAW
              </div>
              <p className="text-white/90 text-[1.125rem] md:text-[1.5rem] leading-relaxed max-w-2xl mb-8 md:mb-12 font-light drop-shadow-sm text-pretty">
              {fixOrphans("Bezkompromisowa kontrola nad jakością, harmonogramem i budżetem na każdym etapie budowy.")}
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Button variant="primary" size="md" href="/kontakt">Rozpocznij projekt</Button>
              <Button variant="secondary" size="md" tone="dark" href="/realizacje">
                Zobacz realizacje <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            </div>
          </div>
        </ScrollExpand>
      </section>

      {/* 2. Trust bar - Infinite Marquee */}
      <section className="w-full bg-brand-surface border-b border-brand-border overflow-hidden relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-20 md:h-24 w-full">
          
          {/* Lewa strona - Nieruchoma etykieta */}
          <div className="flex-shrink-0 pr-3 sm:pr-6 lg:pr-8 border-r border-brand-border/70 h-full flex items-center bg-brand-surface z-10 shadow-[10px_0_15px_-10px_rgba(0,0,0,0.05)] relative">
            <span className="font-mono text-[10px] sm:text-small-mobile md:text-small-desktop tracking-widest uppercase font-bold text-brand-primary">
              ZAUFALI NAM:
            </span>
          </div>

          {/* Prawa strona - Marquee */}
          <div className="flex-grow min-w-0 overflow-hidden flex items-center h-full group relative z-0">
            <div className="flex w-max animate-custom-marquee group-hover:[animation-play-state:paused]">
              <div className="flex gap-8 sm:gap-12 lg:gap-16 px-4 sm:px-6 lg:px-8 items-center">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={`logo-1-${i}`} className="w-36 sm:w-32 lg:w-44 h-12 sm:h-10 lg:h-12 bg-brand-border/50 flex items-center justify-center text-xs sm:text-[10px] md:text-xs lg:text-sm font-mono text-brand-muted/60 uppercase tracking-widest rounded-[2px] transition-all">Logo {i}</div>
                ))}
              </div>
              <div className="flex gap-8 sm:gap-12 lg:gap-16 px-4 sm:px-6 lg:px-8 items-center" aria-hidden="true">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={`logo-2-${i}`} className="w-36 sm:w-32 lg:w-44 h-12 sm:h-10 lg:h-12 bg-brand-border/50 flex items-center justify-center text-xs sm:text-[10px] md:text-xs lg:text-sm font-mono text-brand-muted/60 uppercase tracking-widest rounded-[2px] transition-all">Logo {i}</div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Usługi - Breathing Section */}
      <section className="py-24 md:py-32 lg:py-48 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Kompetencje"
            title="Twój interes, nasza odpowiedzialność."
            lead="Od pierwszego szkicu po końcowe odbiory, bierzemy na siebie pełen ciężar koordynacji, pozwalając Ci skupić się na biznesie."
            size="xl"
          />
        </div>
      </section>

      {/* 3.1 Usługi - Grid */}
      <section className="pb-24 md:pb-32 lg:pb-48 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-8 items-stretch">
          {services.map((service, idx) => {
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

        <Reveal delay={0.4}>
          <div className="flex justify-center mt-12 lg:mt-16">
            <Button variant="outline" size="md" href="/kontakt" className="mx-auto lg:mx-0">
              Nie wiesz, która usługa pasuje do Twojej inwestycji? Porozmawiajmy <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Reveal>
      </section>

      {/* 3.2 Dlaczego my */}
      <section className="py-24 md:py-32 lg:py-48 bg-zinc-50 border-t border-brand-border/50 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center">
          <SectionHeader
            eyebrow="Wartości"
            title="Dlaczego my"
            size="xl"
            className="mb-8"
          />

          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch text-left">
            {[
              { num: "01", title: "Osobisty nadzór na każdym etapie", desc: "Kierownik Projektu osobiście koordynuje i kontroluje przebieg inwestycji, nie zleca tego anonimowemu zespołowi." },
              { num: "02", title: "Transparentne rozliczenia", desc: "Jasny harmonogram płatności powiązany z realnym postępem prac, bez ukrytych kosztów." },
              { num: "03", title: "Terminowość zapisana w umowie", desc: "Konkretne terminy i konsekwencje ich niedotrzymania, nie ogólnikowe deklaracje." },
              { num: "04", title: "Pełna dokumentacja i zgodność prawna", desc: "Kompletna dokumentacja odbiorowa i bezkompromisowa zgodność z przepisami na każdym etapie." },
            ].map((feature, idx) => (
              <Reveal key={idx} delay={0.1 * (idx + 1)} className="h-full">
                <div className="group relative bg-white p-6 md:p-8 border border-brand-border/60 shadow-none hover:bg-brand-surface/30 transition-colors duration-300 flex flex-col h-full">
                  <TechCorners />
                  <div className="font-mono text-brand-muted group-hover:text-brand-primary transition-colors text-[1rem] mb-4">{feature.num}</div>
                  <h3 className="mb-3 text-[1.25rem] md:text-[1.35rem] font-heading font-semibold leading-tight text-brand-text text-balance">{fixOrphans(feature.title)}</h3>
                  <p className="text-[0.9375rem] md:text-[1rem] text-brand-muted flex-grow text-pretty leading-relaxed">{fixOrphans(feature.desc)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        </div>
      </section>

      {/* 4. Proces - Breathing Section */}
      <section className="py-24 md:py-32 lg:py-48 bg-brand-surface border-t border-brand-border w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Proces"
            title="Porządek w chaosie budowy."
            lead="Wdrożyliśmy rygorystyczne standardy zarządzania, dzięki którym każda inwestycja przebiega transparentnie, terminowo i w założonym budżecie."
            size="xl"
          />
        </div>
      </section>

      {/* 4.1 Proces - Grid */}
      <section className="pb-24 md:pb-32 lg:pb-48 bg-brand-surface overflow-hidden">
        <ProcessTimeline steps={[
          { num: "01", title: "Analiza i wycena", desc: "Szczegółowy audyt dokumentacji i rzetelny kosztorys." },
          { num: "02", title: "Harmonogram", desc: "Ścieżka krytyczna i logistyka dostaw." },
          { num: "03", title: "Realizacja", desc: "Nadzór nad wykonawcami i zgodnością prac." },
          { num: "04", title: "Kontrola jakości", desc: "Odbiory zanikające i weryfikacja techniczna." },
          { num: "05", title: "Przekazanie", desc: "Końcowa inspekcja i kompletowanie dokumentacji." },
        ]} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Reveal delay={0.4}>
            <div className="flex justify-center mt-16 lg:mt-24">
              <Button variant="secondary" size="md" href="/kontakt" className="mx-auto lg:mx-0">
                Zobacz jak zaczynamy Twój projekt <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. Liczniki - Czysta Typografia */}
      <section className="py-24 md:py-32 lg:py-48 bg-white border-y border-brand-border/50 text-brand-text relative w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 lg:gap-8 text-center">
            
            <Reveal delay={0.1}>
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-[3.5rem] md:text-[4rem] lg:text-[5.5rem] font-heading font-bold text-brand-text leading-none mb-4 tracking-tighter">
                  <AnimatedCounter value={40} suffix="+" />
                </div>
                <p className="font-mono text-[0.75rem] md:text-[0.85rem] text-brand-muted uppercase tracking-[0.2em] text-balance">{fixOrphans("Aktywne / Zrealizowane")}</p>
              </div>
            </Reveal>
            
            <Reveal delay={0.2}>
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-[3.5rem] md:text-[4rem] lg:text-[5.5rem] font-heading font-bold text-brand-text leading-none mb-4 tracking-tighter">
                  <AnimatedCounter value={32} suffix="" />
                </div>
                <p className="font-mono text-[0.75rem] md:text-[0.85rem] text-brand-muted uppercase tracking-[0.2em] text-balance">{fixOrphans("Lata Doświadczenia")}</p>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-[3.5rem] md:text-[4rem] lg:text-[5.5rem] font-heading font-bold text-brand-text leading-none mb-4 tracking-tighter flex items-baseline">
                  <AnimatedCounter value={800} suffix="" />
                  <span className="text-[1.5rem] md:text-[2rem] ml-2 tracking-normal">mln zł</span>
                </div>
                <p className="font-mono text-[0.75rem] md:text-[0.85rem] text-brand-muted uppercase tracking-[0.2em] text-balance">{fixOrphans("Łączna wartość inwestycji")}</p>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-[3.5rem] md:text-[4rem] lg:text-[5.5rem] font-heading font-bold text-brand-primary leading-none mb-4 tracking-tighter">
                  <AnimatedCounter value={100} suffix="%" />
                </div>
                <p className="font-mono text-[0.75rem] md:text-[0.85rem] text-brand-muted uppercase tracking-[0.2em] text-balance">{fixOrphans("Gotowość Operacyjna")}</p>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* 6. Realizacje - Breathing Section */}
      <section className="py-24 md:py-32 lg:py-48 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Portfolio"
            title="Dowody, nie obietnice."
            lead="Przestrzenie przemysłowe i komercyjne, które zrealizowaliśmy, każdego dnia pracują na sukces biznesowy naszych klientów."
            size="xl"
          />
        </div>
      </section>

      {/* 6.1 Realizacje - Grid */}
      <section className="pb-24 md:pb-32 lg:pb-48 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12 lg:mb-16">
          {realizacje.filter(p => p.featured).slice(0, 4).map((project, idx) => (
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
                
                <h3 className="mb-3 text-[1.5rem] md:text-[1.75rem] group-hover:text-brand-primary transition-colors text-balance">{fixOrphans(project.title)}</h3>
                <p className="text-brand-muted text-pretty text-[1rem] leading-relaxed">{fixOrphans(project.shortDesc)}</p>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="secondary" size="md" href="/realizacje" className="w-full sm:w-auto">
              Zobacz wszystkie realizacje <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="primary" size="md" href="/kontakt" className="w-full sm:w-auto">
              Umów bezpłatną konsultację
            </Button>
          </div>
        </Reveal>
      </section>

      {/* 6.2 FAQ */}
      <section className="py-24 md:py-32 lg:py-48 bg-white border-t border-brand-border/50 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl mx-auto">
          <SectionHeader
            eyebrow="FAQ"
            title="Najczęściej zadawane pytania"
            align="center"
            size="lg"
            className="mb-12"
          />
          <Reveal delay={0.2}>
            <Accordion items={[
              {
                question: "Ile kosztuje wycena i czy jest bezpłatna?",
                answer: "Wstępna wycena oraz audyt dokumentacji są całkowicie bezpłatne i niezobowiązujące. Dopiero po akceptacji warunków przechodzimy do podpisania umowy."
              },
              {
                question: "Jak długo trwa realizacja typowej inwestycji?",
                answer: "Czas trwania zależy od skali projektu, jednak dla standardowych hal magazynowych czy mniejszych obiektów komercyjnych wynosi średnio od 6 do 12 miesięcy."
              },
              {
                question: "Jaki jest zakres nadzoru inwestorskiego?",
                answer: "Nadzór obejmuje m.in. kontrolę jakości wykonywanych robót, weryfikację kosztorysów, odbiory częściowe oraz dbanie o zgodność z projektem i przepisami Prawa Budowlanego."
              },
              {
                question: "Na jakim obszarze działacie?",
                answer: "Realizujemy inwestycje na terenie całego kraju, ze szczególnym uwzględnieniem województwa dolnośląskiego, wielkopolskiego i mazowieckiego."
              },
              {
                question: "Co się dzieje, jeśli harmonogram się opóźni?",
                answer: "Wszelkie terminy oraz ewentualne konsekwencje ich niedotrzymania (kary umowne) są rygorystycznie określone w umowie. Chroni to Inwestora przed nieuzasadnionymi przestojami."
              }
            ]} />
          </Reveal>
          </div>
        </div>
      </section>

      {/* 7. Referencje */}
      <section className="py-24 md:py-32 lg:py-48 bg-brand-surface border-y border-brand-border/50 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          <div className="mb-16 lg:mb-24">
            <SectionHeader
              eyebrow="Rekomendacje"
              title="Głosy naszych inwestorów."
              size="lg"
              delay={0.1}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mb-16">
            {[
              {
                quote: "Współpraca z BNT charakteryzowała się wysoką kulturą techniczną. Dostarczyli precyzyjne raporty i optymalizacje, które przełożyły się na realne oszczędności finansowe.",
                name: "Jan Kowalski",
                role: "Prezes Zarządu, ABC Inwestycje"
              },
              {
                quote: "Pełen profesjonalizm i dbałość o detale. Przez cały proces budowy mieliśmy poczucie pełnej kontroli nad inwestycją. Zdecydowanie polecamy BNT jako zaufanego partnera.",
                name: "Michał Nowak",
                role: "Dyrektor ds. Rozwoju, Logistics Group"
              },
              {
                quote: "Terminowość i transparentność kosztów to największe atuty BNT. Reagowali na wyzwania projektowe natychmiastowo, co pozwoliło uniknąć opóźnień i przestojów na budowie.",
                name: "Anna Wiśniewska",
                role: "Członek Zarządu, Developer Sp. z o.o."
              }
            ].map((testimonial, idx) => (
              <Reveal key={idx} delay={0.1 * (idx + 1)} className="h-full">
                <div className="flex flex-col h-full pl-6 md:pl-8 border-l border-brand-border hover:border-brand-primary transition-colors duration-300 relative group">
                  <p className="text-[1.125rem] md:text-[1.25rem] italic text-brand-text leading-relaxed font-light mb-8 flex-grow text-pretty">
                    {fixOrphans(`"${testimonial.quote}"`)}
                  </p>
                  <div>
                    <p className="font-heading font-semibold text-[1rem] md:text-[1.125rem] text-brand-text uppercase tracking-wide text-balance">{fixOrphans(testimonial.name)}</p>
                    <p className="font-mono text-[0.75rem] text-brand-muted uppercase tracking-widest mt-1 text-balance">{fixOrphans(testimonial.role)}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.4}>
            <div className="flex justify-center">
              <Button variant="secondary" size="md" href="/referencje" className="mx-auto lg:mx-0">
                Czytaj pełne referencje <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Reveal>

        </div>
      </section>

      {/* 8. CTA Końcowe */}
      <section className="py-32 md:py-48 lg:py-56 bg-brand-deepDark text-center relative overflow-hidden w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex flex-col items-center">
          <SectionHeader
            title="Zaplanujmy Twoją inwestycję"
            lead="Skontaktuj się w celu omówienia technicznych i finansowych aspektów Twojego projektu. Zapewniamy profesjonalny audyt i rzetelną wycenę."
            theme="dark"
            size="xl"
            className="mb-10 md:mb-12"
          />
          <Reveal delay={0.4}>
            <Button variant="primary" size="lg" href="/kontakt">Porozmawiajmy o projekcie</Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
