import React from "react";
import { Reveal } from "@/components/ui/Reveal";
import ScrollFloat from "@/components/ui/ScrollFloat";
import { fixOrphans } from "@/lib/typography";

interface SectionHeaderProps {
  eyebrow?: React.ReactNode;
  title: string;
  lead?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  size?: "md" | "lg" | "xl";
  className?: string;
  delay?: number;
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "center",
  theme = "light",
  size = "lg",
  className = "",
  delay = 0,
}: SectionHeaderProps) {
  const isCenter = align === "center";
  const isDark = theme === "dark";

  const wrapperClass = `flex flex-col w-full ${
    isCenter ? "items-center text-center mx-auto" : "items-start text-left"
  } ${className}`;

  const eyebrowClass = `font-mono text-small-mobile tracking-widest uppercase mb-6 ${
    isDark ? "text-white/70" : "text-brand-primary"
  }`;

  let sizeClass = "";
  let leadSizeClass = "text-[1.125rem] md:text-[1.25rem]";
  let leadMaxW = "max-w-3xl";
  
  if (size === "md") {
    sizeClass = "text-[2rem] md:text-[2.5rem] lg:text-[3rem] max-w-2xl";
    leadMaxW = "max-w-2xl";
  } else if (size === "lg") {
    sizeClass = "text-[2rem] md:text-[2.5rem] lg:text-[3.5rem] max-w-3xl";
    leadMaxW = "max-w-3xl";
  } else if (size === "xl") {
    sizeClass = "text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] max-w-4xl";
    leadSizeClass = "text-[1.25rem] md:text-[1.5rem]";
    leadMaxW = "max-w-2xl";
  }

  const titleClass = `${sizeClass} leading-[1.1] mb-8 font-heading font-bold text-balance ${
    isDark ? "text-white" : "text-brand-text"
  } ${isCenter ? "mx-auto text-center" : ""}`;

  const leadClass = `${leadSizeClass} font-light leading-relaxed text-pretty ${leadMaxW} ${
    isDark ? "text-white/70" : "text-brand-muted"
  } ${isCenter ? "mx-auto text-center" : ""}`;

  return (
    <div className={wrapperClass}>
      {eyebrow && (
        <Reveal delay={delay} className={`w-full flex ${isCenter ? "justify-center" : "justify-start"}`}>
          <div className={eyebrowClass}>{eyebrow}</div>
        </Reveal>
      )}
      <ScrollFloat
        animationDuration={1}
        ease="power3.out"
        scrollStart="center bottom+=20%"
        scrollEnd="bottom bottom-=20%"
        stagger={0.02}
        containerClassName={titleClass}
      >
        {title}
      </ScrollFloat>
      {lead && (
        <Reveal delay={delay + 0.2} className={`w-full flex ${isCenter ? "justify-center" : "justify-start"}`}>
          <p className={leadClass}>{fixOrphans(lead)}</p>
        </Reveal>
      )}
    </div>
  );
}
