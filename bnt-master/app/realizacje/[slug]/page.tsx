import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { realizacje } from "@/lib/data/realizacje";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TechTag } from "@/components/ui/TechTag";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { ImageWithSkeleton } from "@/components/ui/ImageWithSkeleton";
import { fixOrphans } from "@/lib/typography";
import { TechCorners } from "@/components/ui/TechCorners";
import { Button } from "@/components/ui/Button";

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return realizacje.map((project) => ({
    slug: project.slug,
  }));
}

export function generateMetadata({ params }: PageProps) {
  const project = realizacje.find((p) => p.slug === params.slug);
  if (!project) return { title: "Nie znaleziono realizacji | BNT Budownictwo" };

  return {
    title: `${project.title} | Realizacje BNT Budownictwo`,
    description: project.shortDesc,
  };
}

export default function RealizacjaPage({ params }: PageProps) {
  const projectIndex = realizacje.findIndex((p) => p.slug === params.slug);
  const project = realizacje[projectIndex];

  if (!project) {
    notFound();
  }

  const prevProject = projectIndex > 0 ? realizacje[projectIndex - 1] : null;
  const nextProject = projectIndex < realizacje.length - 1 ? realizacje[projectIndex + 1] : null;

  // Parzyste: tekst z lewej (flex-row), Nieparzyste: tekst z prawej (flex-row-reverse)
  const isImageRight = projectIndex % 2 === 0;

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero */}
      <section className="pt-32 pb-24 md:pt-48 md:pb-32 lg:pt-56 lg:pb-48 bg-brand-deepDark w-full relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <ImageWithSkeleton
            src={project.mainImg}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-deepDark/80" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <Reveal>
            <div className="font-mono text-small-mobile tracking-widest text-brand-muted uppercase mb-8">
              <Link href="/" className="hover:text-white transition-colors">Strona główna</Link>
              <span className="mx-3 opacity-50">/</span>
              <Link href="/realizacje" className="hover:text-white transition-colors">Realizacje</Link>
              <span className="mx-3 opacity-50">/</span>
              <span className="text-white">{project.title}</span>
            </div>
          </Reveal>

          <SectionHeader
            title={project.title}
            lead={project.shortDesc}
            theme="dark"
            align="left"
            size="xl"
          />
        </div>
      </section>

      {/* 2. Statystyki */}
      <section className="py-16 md:py-24 bg-white border-b border-brand-border/50 relative w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 lg:gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-brand-border/40">
            {project.stats.map((stat, idx) => (
              <Reveal key={idx} delay={0.1 * (idx + 1)}>
                <div className="flex flex-col items-center justify-center h-full pt-8 sm:pt-0">
                  <div className="text-[3rem] md:text-[3.5rem] lg:text-[4.5rem] font-heading font-bold text-brand-text leading-none mb-4 tracking-tighter">
                    {stat.isNumber ? (
                      <AnimatedCounter value={stat.value as number} />
                    ) : (
                      <span>{stat.value}</span>
                    )}
                  </div>
                  <p className="font-mono text-[0.75rem] md:text-[0.85rem] text-brand-muted uppercase tracking-[0.2em] text-balance">
                    {fixOrphans(stat.label)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Pełny Opis projektu */}
      <section className="py-24 md:py-32 lg:py-48 bg-brand-surface w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${isImageRight ? '' : 'lg:flex-row-reverse'}`}>
            <Reveal delay={0.2} className="w-full lg:w-1/2">
              <SectionHeader
                eyebrow="O projekcie"
                title="Wizja i nadzór inwestorski"
                align="left"
                size="lg"
                className="mb-8"
              />
              <div className="prose prose-lg prose-zinc max-w-none text-brand-muted font-light leading-relaxed">
                <p>{fixOrphans(project.fullDesc)}</p>
              </div>
            </Reveal>

            <Reveal delay={0.4} className="w-full lg:w-1/2">
              <div className="relative border border-brand-border/40 p-4 bg-white shadow-xl shadow-brand-primary/5">
                <TechCorners />
                <ImageWithSkeleton
                  src={project.gallery[0]} // Zawsze pierwsze zdjęcie na główny obraz obok opisu
                  alt={`Widok projektu ${project.title}`}
                  wrapperClassName="aspect-[4/3] bg-zinc-200 relative"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4. Cechy / Zakres */}
      <section className="py-24 md:py-32 bg-white border-y border-brand-border/50 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <SectionHeader
            eyebrow="Specyfikacja"
            title="Charakterystyka inwestycji"
            lead="Kluczowe udogodnienia i parametry obiektu, zrealizowane pod nadzorem BNT Budownictwo."
            align="center"
            size="md"
            className="mb-16"
          />
          <Reveal delay={0.3} className="w-full">
            <div className="flex flex-wrap items-center justify-center gap-y-3">
              {project.features.map((feature, idx) => (
                <TechTag key={idx}>{feature}</TechTag>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. Galeria Zdjęć */}
      <section className="py-24 md:py-32 lg:py-48 bg-brand-surface w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Galeria"
            title="Wizualizacje i postęp prac"
            align="left"
            size="lg"
            className="mb-16"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {project.gallery.slice(1).map((imgUrl, idx) => (
              <Reveal key={idx} delay={0.1 * (idx + 1)}>
                <div className="group relative border border-brand-border/40 p-2 bg-white shadow-none">
                  <ImageWithSkeleton
                    src={imgUrl}
                    alt={`Galeria ${project.title} - ${idx + 1}`}
                    wrapperClassName="aspect-square bg-zinc-200 relative overflow-hidden"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out transform group-hover:scale-105"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Nawigacja między projektami */}
      <section className="py-16 bg-brand-deepDark w-full text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          {prevProject ? (
            <Link href={`/realizacje/${prevProject.slug}`} className="group flex items-center gap-4 hover:text-brand-primary transition-colors">
              <ArrowLeft className="w-5 h-5 text-brand-muted group-hover:text-brand-primary transition-colors" />
              <div className="text-left">
                <div className="font-mono text-[0.7rem] text-brand-muted uppercase tracking-widest mb-1">Poprzedni etap</div>
                <div className="font-heading font-semibold text-[1.125rem]">{prevProject.title}</div>
              </div>
            </Link>
          ) : <div className="w-1/2 hidden sm:block"></div>}
          
          <div className="h-10 w-px bg-white/10 hidden sm:block"></div>

          {nextProject ? (
            <Link href={`/realizacje/${nextProject.slug}`} className="group flex items-center gap-4 hover:text-brand-primary transition-colors text-right flex-row-reverse sm:flex-row">
              <div className="text-right sm:text-left">
                <div className="font-mono text-[0.7rem] text-brand-muted uppercase tracking-widest mb-1">Następny etap</div>
                <div className="font-heading font-semibold text-[1.125rem]">{nextProject.title}</div>
              </div>
              <ArrowRight className="w-5 h-5 text-brand-muted group-hover:text-brand-primary transition-colors" />
            </Link>
          ) : <div className="w-1/2 hidden sm:block"></div>}
        </div>
      </section>

      {/* 7. CTA Końcowe */}
      <section className="py-24 md:py-32 lg:py-48 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <SectionHeader
          eyebrow="Konsultacja"
          title="Zainteresowany podobną realizacją?"
          lead="Skontaktuj się w celu omówienia technicznych i finansowych aspektów Twojego projektu. Zapewniamy profesjonalny audyt i rzetelną wycenę."
          align="center"
          size="xl"
          className="mb-12"
        />
        <Reveal delay={0.4} className="flex justify-center">
          <Button variant="primary" size="lg" href="/kontakt">
            Porozmawiajmy o projekcie
          </Button>
        </Reveal>
      </section>
    </div>
  );
}
