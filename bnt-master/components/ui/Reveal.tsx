"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

export function Reveal({ children, delay = 0, direction = "up", className = "" }: RevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const getInitial = () => {
    switch (direction) {
      case "up":
        return { y: 60, opacity: 0 };
      case "down":
        return { y: -60, opacity: 0 };
      case "left":
        return { x: 60, opacity: 0 };
      case "right":
        return { x: -60, opacity: 0 };
      default:
        return { y: 60, opacity: 0 };
    }
  };

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="w-full h-full"
        variants={{
          hidden: getInitial(),
          visible: { 
            y: 0, 
            x: 0, 
            opacity: 1, 
            // Ostre, "mechaniczne" zwolnienie na końcu ruchu
            transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] } 
          },
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {children}
      </motion.div>
    </div>
  );
}
