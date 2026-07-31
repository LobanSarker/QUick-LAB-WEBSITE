"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export default function TiltCard({
  children,
  className,
  intensity = 9,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      whileHover={reduce ? undefined : { y: -6 }}
      style={{ transformStyle: "preserve-3d" }}
      onMouseMove={(e) => {
        if (reduce) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        e.currentTarget.style.transform = `perspective(900px) rotateX(${
          -py * intensity
        }deg) rotateY(${px * intensity}deg) translateY(-4px)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
      }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      {children}
    </motion.div>
  );
}
