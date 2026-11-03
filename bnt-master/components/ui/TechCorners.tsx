import React from "react";

export const TechCorners = () => (
  <>
    <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t border-l border-transparent group-hover:border-brand-primary transition-colors duration-300 pointer-events-none z-10" />
    <div className="absolute -top-[1px] -right-[1px] w-4 h-4 border-t border-r border-transparent group-hover:border-brand-primary transition-colors duration-300 pointer-events-none z-10" />
    <div className="absolute -bottom-[1px] -left-[1px] w-4 h-4 border-b border-l border-transparent group-hover:border-brand-primary transition-colors duration-300 pointer-events-none z-10" />
    <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b border-r border-transparent group-hover:border-brand-primary transition-colors duration-300 pointer-events-none z-10" />
  </>
);
