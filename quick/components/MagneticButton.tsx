"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode, MouseEvent } from "react";
import { useRef } from "react";

export default function MagneticButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    ref.current.style.transform = `translate(${x * 0.18}px, ${y * 0.22}px)`;
  }

  function reset() {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  }

  return (
    <motion.div
      ref={ref}
      className="inline-block transition-transform duration-200 ease-out"
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
