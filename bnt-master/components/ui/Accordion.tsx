"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { fixOrphans } from "@/lib/typography";

export interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Pierwsze otwarte domyślnie? User says: "tylko jedno pytanie rozwinięte naraz", let's default to null to be clean, or 0. Let's do 0.

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full divide-y divide-brand-border/60 border-t border-b border-brand-border/60">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="w-full">
            <button
              onClick={() => toggle(index)}
              className="w-full py-6 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary group"
              aria-expanded={isOpen}
            >
              <h3 className="text-[1.125rem] md:text-[1.25rem] font-heading font-semibold text-brand-text group-hover:text-brand-primary transition-colors pr-8">
                {fixOrphans(item.question)}
              </h3>
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center border border-brand-border rounded-full group-hover:border-brand-primary transition-colors">
                {isOpen ? (
                  <Minus className="w-4 h-4 text-brand-primary" />
                ) : (
                  <Plus className="w-4 h-4 text-brand-muted group-hover:text-brand-primary transition-colors" />
                )}
              </div>
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100 mb-6" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="text-[1rem] lg:text-[1.125rem] text-brand-muted leading-relaxed font-light text-pretty pr-8 md:pr-16">
                  {fixOrphans(item.answer)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
