import React from "react";

interface TechTagProps {
  children: React.ReactNode;
  className?: string;
}

export function TechTag({ children, className = "" }: TechTagProps) {
  return (
    <div className={`flex items-center text-zinc-600 font-mono text-[13px] leading-none uppercase tracking-widest border-l border-brand-border/40 pl-3 pr-3 first:border-l-0 first:pl-0 last:pr-0 ${className}`}>
      <span className="mt-[1px]">{children}</span>
    </div>
  );
}
