import React from "react";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`relative overflow-hidden bg-zinc-100 ${className}`}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 -translate-x-full animate-shimmer"
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent 0%, rgba(228, 228, 231, 0.6) 50%, transparent 100%)",
        }}
      />
    </div>
  );
}
